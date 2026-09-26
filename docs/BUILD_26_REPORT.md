# Conjugately 1.1 — Build 26 report

26 September 2026. Covers two things: why Elementary and Intermediate quizzes
are silent, and the Masters Mic interface changes agreed for build 26.

---

## Part 1 — The English question is not read aloud on Elementary and Intermediate

### What is actually wrong

One line, `apps/mobile/app/quiz.tsx:113`:

```ts
const questionAudioOn = difficulty === "Beginner" || difficulty === "Novice";
```

Everything downstream is fine. Three lines later the URL is built correctly for
any level:

```ts
const audioLevel = (exam ? exam.level : difficulty).toLowerCase();
const questionUrl = q && questionAudioOn
  ? `${API_BASE}/attached_assets/audio/quizzes/${audioLevel}/${encodeURIComponent(qVerb)}/${qTensePath}/questions/Q${q.audioIndex || idx + 1}.mp3`
  : null;
```

With `questionAudioOn` false the URL is never built, the player is handed
`null`, and nothing plays. The levels are not missing a feature — they are
switched off.

### The audio already exists

| Level | Verb folders | Question files |
|---|---|---|
| beginner | 3 | 180 |
| novice | 4 | 240 |
| **elementary** | **7** | **419** |
| **intermediate** | **26** | **1,720** |

`audioIndex` is tagged before shuffling in both `server/elementary-quiz-data.ts`
and `server/intermediate-quiz-data.ts`, so the Q-number in the filename still
lines up with the question after the options are shuffled. Tense folder names
(`present`, `passe_compose`, `futur_simple`) match `TENSE_PATH`. Verb folder
names match the `verb` values in `lib/courses.ts`, accents included, and the URL
already percent-encodes them.

So the wiring is correct and the files are on disk. That is the good news.

### The gaps, which is why it was probably switched off

**Elementary — one missing file.**

- `elementary/dire/futur_simple/questions/Q20.mp3`

Unit 1, Futur Simple, last question. Everything else is a complete 20.

**Intermediate — 160 missing files.**

The course was corrected on 24 September to the eighteen verbs of
`EXAM_VERB_SETS.Intermediate`. The audio was recorded against the *old* list and
never caught up:

- **`mettre`** (Unit 8) — no folder at all. 60 files.
- **`croire`** (Unit 10) — no folder at all. 60 files.
- **`se débrouiller`** (Unit 2) — `present` has its 20, `passe_compose` and
  `futur_simple` have none. 40 files. These are the ones already listed in
  `docs/AUDIO_TODO_se_debrouiller.md` with their exact target filenames.

There are also ten leftover folders from the old verb list — `aller`, `avoir`,
`dire`, `faire`, `pouvoir`, `savoir`, `venir`, `voir`, `vouloir`, `être`. They
are dead weight, not a fault; no unit points at them. Leave them or delete them,
it makes no difference to the app.

### How to rectify

**Step 1 — turn it on, and stop it failing silently.**

Replace the hardcoded level check with one that simply tries, and falls back to
the device voice when a recording is missing:

```ts
const questionAudioOn = !exam;            // every level, not just two
```

and, in the player's error path, fall back to `expo-speech`:

```ts
// The question text is English, so the device voice is a fair substitute
// when a recording has not been made yet. Silence is not.
Speech.speak(q.question, { language: "en-US", rate: 0.95 });
```

That single change makes Elementary fully audible today and Intermediate audible
on 16 of its 18 units, with the remaining two spoken by the device rather than
silent. Nobody meets a dead question.

**Step 2 — record the 161 missing files.** Same ElevenLabs pipeline as the rest:

| What | Files | Path |
|---|---|---|
| `dire` futur simple Q20 | 1 | `elementary/dire/futur_simple/questions/` |
| `se débrouiller` passé composé | 20 | `intermediate/se débrouiller/passe_compose/questions/` |
| `se débrouiller` futur simple | 20 | `intermediate/se débrouiller/futur_simple/questions/` |
| `mettre` × 3 tenses | 60 | `intermediate/mettre/<tense>/questions/` |
| `croire` × 3 tenses | 60 | `intermediate/croire/<tense>/questions/` |

The source text for each is the `question` field of the matching entry in the
server data file, in `audioIndex` order — which is the order before shuffling, so
generate from the untagged array.

**Step 3 — add a validator check.** This failed quietly for weeks because
nothing compares the course to the audio. A ninth check in
`scripts/validate-quiz-data.mjs` should walk every unit in `COURSES`, and for
each tense assert that `attached_assets/audio/quizzes/<level>/<verb>/<tense>/questions/`
holds exactly as many files as the unit has questions, naming any gaps. That
turns "the audio is missing" from something a user notices into something the
build says out loud.

### One open question

`questionAudioOn` is currently false during exams as well, because `difficulty`
is undefined there. The URL builder already handles exams properly via
`exam.level`, so exam audio would work if enabled. Masters Mic is off in exams
deliberately — progression must never depend on speech recognition — but *audio*
is not the same thing, and a silent exam after audible practice is a jarring
change. Worth a decision either way, rather than leaving it as an accident of
how `difficulty` is set.

---

## Part 2 — Masters Mic interface, build 26

Mockup: the Design canvas, boards A–F.

### The control row: three buttons, not four

| | Size | Was |
|---|---|---|
| Show A–D | 80 × 80 | 62 × 56 |
| **Record** | **124 × 112** | 62 × 56 |
| Enter | 80 × 80 | 62 × 56 |

Record is four times the area of its neighbours. It is the control the learner
reaches for on every single question, often without looking at the screen,
which is exactly the case for a large target. Show A–D sits left, Enter right.

### Delete is removed

Delete did one thing: clear the current attempt. But holding Record again
already replaces whatever was there, so it was a second route to the same
outcome — wearing a bin icon, next to a microphone, where it reads as
destructive.

The label carries the meaning instead: once there is a draft, the button reads
**Re-record** and switches from filled red to outlined red. The first-run notice
should also say in as many words that recording again replaces the last
attempt, since that is the one thing Delete made obvious.

### Pause symbol replaces the flat equaliser

A flat equaliser and a broken one look identical. Whenever no audio is
arriving, the equaliser is replaced by a large pause glyph:

- **Idle**, before the first press
- **Warming up** — held down, but no audio yet. This is the state that made
  build 24 feel broken: Record went solid red and nothing else on screen moved.
  It now shows the pause symbol and the line "Getting ready — hold on a moment".
- **After release**, while the transcript is being read

The equaliser appears only while audio is genuinely arriving.

### Board map

| Board | State |
|---|---|
| A | Mic OFF — today's screen plus the mic pill |
| B | Ready to record — pause symbol, Record flashing between two solid reds |
| C | Starting to listen — pause symbol, Record solid red, "Getting ready" |
| D | Recording — equaliser live, red dot pulsing, transcript provisional in grey |
| E | Ready to submit — pause symbol, transcript white, Enter green and flashing, Record reads Re-record |
| F | First-run notice |

### Carried over from build 25, unchanged

- Mic mode survives an answer being marked. Ending it there reverted to the
  light A–D screen for two seconds before advancing, showing the learner the
  options they had just answered without — and, when right, the answer itself.
- Enter always submits and always advances, right or wrong.
- Anything heard snaps to the nearest of the four options. Only silence has
  nothing to snap to, and that advances without attributing an answer.
- Thresholds: `acceptAt` 0.75, `disambiguateAt` 0.60.

---

## Suggested order for build 26

1. `questionAudioOn` — one line, plus the `expo-speech` fallback
2. The control row: bigger Record, Delete out, Re-record label
3. Pause symbol for the three idle states
4. First-run notice: add the re-record line
5. Validator check 9, so this cannot happen quietly again
6. Record the 161 missing audio files — does not block the build

Items 1 to 5 are a single build. Item 6 is independent and can land whenever the
recordings are done.
