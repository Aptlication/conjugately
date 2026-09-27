# Content plan — impersonal "it"

Status: PLAN ONLY. Nothing here is implemented.
Written 27 September 2026. Does not block 1.1.

---

## 1. The finding

Across all four levels — 2,805 curated questions — **not one has "it" as its
subject.**

| Level | Questions | Subject is "it" |
|---|---|---|
| Beginner | 180 | 0 |
| Novice | 240 | 0 |
| Elementary | 505 | 0 |
| Intermediate | 1,880 | 0 |

The 44 questions that contain the word "it" all use it as an object — "I will
say it", "put it in the box". On the French side the absence is just as clean:
`C'est`, `Ce sera`, `C'était`, `Il y a` and `Il y aura` appear **nowhere in any
data file**. The twelve `Il fait` hits are the personal "he does / he makes"
from the faire units, not weather.

So a learner can finish every course in the app without meeting `c'est`.

## 2. Why it matters more than the count suggests

`c'est` is plausibly the highest-frequency construction in spoken French. So is
`il y a`. A learner who has drilled six persons of être across three tenses and
still cannot say "it's cold" or "there's a problem" has a conspicuous hole, and
it is the kind a beginner notices immediately in the wild.

It is also cheap to close. Impersonal forms live on three verbs, and all three
are already Beginner and Novice units.

## 3. The constraint that shapes everything: APPEND ONLY

Question audio is `Q<audioIndex>.mp3`, where `audioIndex` is the question's
**position in the pool array**, tagged before the shuffle
(`getRandomBeginnerPronounQuestions`, `getRandomNoviceQuestions`, and the
Elementary/Intermediate equivalents).

Therefore:

> **New questions are appended to the end of a tense array. Never inserted,
> never reordered.**

Insert one question at position 5 of a 20-question pool and every index from 5
upward shifts by one. Every learner then hears the recording of the previous
question while reading the next. Nothing fails a build, nothing looks wrong in
the data, and the app keeps working — it just teaches the wrong thing to
everyone. It is the most dangerous edit available in this repo.

`scripts/validate-quiz-data.mjs` CHECK 9 now compares the real pool length
against the files on disk and flags orphaned recordings numbered past the end of
a pool, so the aftermath is at least visible. It cannot detect a shift where the
counts still line up. Discipline is the control here, not the validator.

## 4. Scope

Impersonal constructions belong to three verbs, in both levels that teach them.

| Level | Verb | Tense key in data | Audio folder |
|---|---|---|---|
| Beginner | être, avoir, faire | `Présent` | `present` |
| Beginner | être, avoir, faire | `Passé Composé` | `passe_compose` |
| Beginner | être, avoir, faire | `Futur Simple` | `futur_simple` |
| Novice | être, avoir, faire | `present` | `present` |
| Novice | être, avoir, faire | `passé_composé` | `passe_compose` |
| Novice | être, avoir, faire | `futur_simple` | `futur_simple` |

Note the tense keys differ between the two files — Beginner is title-cased with
spaces, Novice is lower-case with an accent. The audio folder name is the same
in both cases.

**17 unit-tenses × 5 questions = 85 new questions and 85 new recordings.**
(Revised from 18/90 by the decision in section 5a.)

Split into two shippable halves:

- **Phase 1a — Beginner.** 8 unit-tenses, 40 questions. Beginner is atomic
  pronoun drilling ("I am" → "Je suis"), so the impersonal items are short:
  "It is" → "C'est".
- **Phase 1b — Novice.** 9 unit-tenses, 45 questions. Novice is full-sentence
  with context, so the same ground is covered in a sentence: "It's cold today"
  → "Il fait froid aujourd'hui."

Optional extra: Novice `aller` supports `ça va` ("it's going well" / "how's it
going"), another very high-frequency impersonal. 3 unit-tenses, 15 questions.

Elementary and Intermediate are out of scope — their verbs (dire, voir, savoir,
se débrouiller, …) have no natural impersonal use.

## 5. DECIDED — "it was"

**Decision, 27 Sep (Jonathan): option 1. Keep the three existing tenses. The
past impersonal is taught through avoir and faire, where it is genuinely passé
composé. No imparfait, no `ça a été`.**

Consequence: see section 5a. The original reasoning is kept below.

The natural French for "it was" is **`c'était`, which is imparfait, not passé
composé.** The app teaches présent, passé composé and futur simple only. So the
passé-composé slot for être has no idiomatic impersonal filler: `ç'a été` is
grammatical but stilted, and putting `c'était` in a unit labelled passé composé
would be teaching the wrong tense name for a correct phrase — precisely the
class of defect the validator exists to prevent.

Three options:

1. **Cover the past impersonal under avoir and faire instead.** `Il y a eu un
   problème` and `Il a fait beau` are genuine passé composé and idiomatic. Leave
   être's past-impersonal slot to the other two verbs. Cheapest, teaches nothing
   false, but leaves `c'était` untaught.
2. **Add an imparfait tense.** The Intermediate generator's `TENSES` array
   already lists `imparfait`; no data or audio folders exist for it anywhere.
   The infrastructure anticipates it. This is a much larger project than Phase 1
   and should not be bolted onto it.
3. **Accept `ça a été`.** Correct, attested, colloquial. Risks sounding odd to a
   native-speaker reviewer.

Recommendation: **option 1 for Phase 1**, and log imparfait as its own future
item. It closes the high-frequency gap without inventing scope.

## 5a. What the decision does to the unit list

Ruling out `c'était` and `ça a été` leaves **être's passé composé slot with no
`ce`-form filler**. The other eight Beginner unit-tenses are unaffected.

There is one honest way to fill it, and it uses the *other* impersonal pronoun:
**`il`** in the fixed construction `Il a été + adjectif + de + infinitif`.

- `Il a été difficile de trouver la maison.` — "It was difficult to find the house."
- `Il a été décidé que nous partons demain.` — "It was decided that we leave tomorrow."

This is correct, idiomatic and genuinely passé composé. It also teaches that
impersonal "it" is sometimes `ce` and sometimes `il`, which is a real
distinction learners trip on.

But it is a full-sentence construction, and Beginner is atomic pronoun drilling
("I am" → "Je suis"). It does not fit there.

**Resolved scope:**

| Level | Unit-tenses in scope | Questions |
|---|---|---|
| Beginner | 8 (être passé composé excluded — no atomic form exists) | 40 |
| Novice | 9 (être passé composé uses `Il a été … de …`) | 45 |
| **Total** | **17** | **85** |

Beginner's être passé composé pool stays at 20. That is the correct outcome:
better an honest gap than a stilted phrase drilled as though it were common.

## 6. Effect on quiz length

`COURSES` in `apps/mobile/lib/courses.ts` carries `questions:` **per unit**, so
nothing global changes.

Leave every unit at `questions: 20`. The pools in scope grow from 20 to 25, and
the server keeps slicing to 20. `shared/exams.ts` notes that at pool 20 and quiz
20 the quiz already serves the entire pool — a learner replaying a unit gets the
same twenty questions reshuffled. **Widening the pool to 25 while still serving
20 gives these units genuine question variety for the first time**, which is a
better argument for the change than the extra five questions.

If a wider quiz is wanted later, raising `questions:` to 25 on a per-unit basis
is a one-line change once the pool supports it.

## 7. Worked examples

### Beginner — `server/beginner-pronoun-data.ts`

Shape: `{ question, hint, answerOptions: [{ text, rationale, isCorrect }] }`.
Rationales here are explanatory sentences, not the literal "Option A" used in
the Elementary file. Distractors are other conjugations of the same verb.

```ts
{
  question: "It is (impersonal)",
  hint: "Impersonal 'it' with être — use ce, not il or elle",
  answerOptions: [
    { text: "Il est", rationale: "This is 'he is' — a person, not an impersonal 'it'.", isCorrect: false },
    { text: "C'est", rationale: "Correct! 'C'est' is the impersonal 'it is'.", isCorrect: true },
    { text: "Elle est", rationale: "This is 'she is' — a person, not an impersonal 'it'.", isCorrect: false },
    { text: "Ils sont", rationale: "This is 'they are', plural.", isCorrect: false }
  ]
}
```

### Novice — `server/novice-quiz-data.ts`

Shape: `{"question", "options": [four strings], "answer": "A"|"B"|"C"|"D"}`.
No rationales at this level.

```ts
{"question": "There is a problem / There's a problem", "options": ["Il a un problème", "Il y a un problème", "Ils ont un problème", "Il y aura un problème"], "answer": "B"}
```

Note the first distractor: `Il a un problème` means "he has a problem" and is
exactly the confusion the question is testing. Distractors should be the
learner's likely wrong turn, not arbitrary.

## 8. Order of work

1. ~~Decide the "it was" question in section 5.~~ DONE 27 Sep — option 1.
2. Author the 40 Beginner questions, appended to the end of each tense array.
   Correct answer should not always sit in slot A — the validator reports slot
   distribution, and although `server/routes.ts` Fisher–Yates-shuffles options
   before serving, a clean source distribution keeps that warning meaningful.
3. `npm run validate:quiz` — the pools become 25 and CHECK 9 should report
   40 missing recordings, `Q21`–`Q25` in each of the eight units. That is the
   proof the append landed in the right places.
4. Generate the audio LAST:
   `npx tsx server/scripts/generate-beginner-audio.ts --questions-only`
   (Léa, `EXAVITQu4vr4xnSDxMaL`; existing files are skipped.)
5. `npm run validate:quiz` again — clean.
6. Repeat 2–5 for Novice with
   `generate-novice-audio.ts` (Thomas, `GBv7mTt0atIp3Br8iCZE`).

Roughly 18,000 characters of ElevenLabs credit for the full 85, against 121,000
a month on the Creator plan. The cost of this work is authoring, not audio.

## 9. Explicitly out of scope

- Raising any unit to `questions: 25`.
- An imparfait tense (logged separately; the generators anticipate it, nothing
  populates it).
- Elementary and Intermediate impersonal content.
- Anything in the 1.1 release path.
