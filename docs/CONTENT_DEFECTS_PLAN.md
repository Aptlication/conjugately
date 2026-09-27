# Content defects — scan results and remediation plan

Scanned 27 September 2026, all 2,845 curated questions in 143 unit-tenses.
Status: PLAN. Nothing here is fixed yet.

---

## 1. What the scan found

| Class | Count | Severity |
|---|---|---|
| A. Correct answer contradicts the English prompt | **43** | **Ship blocker** |
| B. Duplicate questions within a pool | 53 | High |
| C. Reflexive pronoun missing from the correct answer | 11 | High |
| Duplicate answer options within a question | 0 | — |
| Questions with no correct answer, or more than one | 0 | — |

Classes A, B and C overlap heavily and sit in the **same five Intermediate
verbs**. This is one bad authoring batch, not scattered rot.

## 2. Class A is the serious one

43 questions whose English prompt is negative but whose **correct** French
answer carries no negation at all, or is in the wrong tense, or is affirmative.
The learner who answers correctly is marked **wrong**, and the app then displays
the defective form as the right answer.

Examples, all currently marked correct:

| Unit | English prompt | Marked correct | What is wrong |
|---|---|---|---|
| s'ennuyer / futur simple | "I will not get bored." | `Je ennuierai pas.` | no `ne`, no reflexive pronoun |
| s'ennuyer / futur simple | "You (vous) will not get bored." | `Vous avez ennuyé ?` | wrong auxiliary, wrong tense, affirmative |
| s'adapter / futur simple | "He will not adapt." | `Il adapterait pas.` | conditional, not future; no `ne` |
| s'adapter / présent | "They (fem.) do not adapt." | `Elles adaptent pas.` | no `ne`, no reflexive pronoun |
| se souvenir / futur simple | "Will you (tu) not remember?" | `Te souviendras-tu?` | affirmative answer to a negative prompt |
| s'ennuyer / passé composé | "Did she not get bored?" | `S'est-elle ennuyé ?` | affirmative; agreement wrong |

Distribution:

| Verb | Questions | Class A | Class C |
|---|---|---|---|
| s'adapter | 60 | 14 | 6 |
| s'ennuyer | 60 | 9 | 4 |
| parler | 60 | 8 | 0 |
| se souvenir | 60 | 6 | 1 |
| se réjouir | 60 | 6 | 0 |

## 3. Why this blocks 1.1 specifically

Before 24 September the Intermediate course taught
`être / avoir / faire / aller / voir / dire / pouvoir / vouloir / prendre /
venir / savoir`. Commit `ad6d2c8b` re-pointed it at the eighteen verbs of
`EXAM_VERB_SETS.Intermediate`.

**All five defective verbs are in that new eighteen. None was in the old
eleven.** So these 43 wrong answers are not a live 1.0 problem quietly
tolerated — they are content **1.1 newly exposes to learners**, in the same
release that is meant to be the App Store featuring candidate.

Pools are 20 and unit quizzes serve 20, so every affected question is served in
every attempt of that unit. There is no sampling that hides it.

## 4. Class B — duplicates

53 questions repeated inside their own pool.

| Unit | Pool | Duplicate pairs | Learner sees a repeat |
|---|---|---|---|
| Elementary dire / présent | 85 | 20 (Q1–Q20 copied verbatim at Q46–Q65) | ~1 per quiz on average |
| s'entraîner, s'ennuyer, se souvenir, s'adapter, se réjouir — all 3 tenses | 20 | 2 each (Q2/Q14 and Q4/Q10) | every quiz |
| Intermediate trouver / passé composé | 20 | 1 | every quiz |
| Elementary dire / futur simple | 20 | 1 (Q3/Q14) | every quiz |
| Elementary savoir / passé composé | 40 | 1 | occasionally |

The Q2/Q14 and Q4/Q10 regularity across five verbs and three tenses is a
generator artefact, not hand-editing.

Of the 53, twenty are byte-identical copies; the other 33 share the English
prompt but differ in their options, and **25 of those have a different correct
answer between the two copies** — which is how Class A was found.

## 5. The rule that governs every fix: OVERWRITE, NEVER DELETE

Question audio is `Q<audioIndex>.mp3`, and `audioIndex` is the question's
position in the pool array, tagged before the shuffle. Deleting a duplicate
shifts every index after it, and the audio silently detaches from the questions
for the rest of the unit — every learner hears the previous question's recording
over the next question's text, nothing fails a build, and nothing looks wrong in
the data.

So:

> Each defective question is **rewritten in place at its existing index**. Then
> only that one `Q<n>.mp3` is regenerated. Pool lengths do not change.

The generators skip files that already exist, so a replaced question's mp3 must
be removed before regenerating. `device_bash` cannot delete inside a connected
folder, so that step runs in Jonathan's own shell.

## 6. Work breakdown

| Step | Work | Audio |
|---|---|---|
| 1. Class A — fix 43 wrong correct answers | rewrite the French; English prompt unchanged | none (question audio is the English prompt, unchanged) |
| 2. Class C — 11 missing reflexive pronouns | rewrite the French | none |
| 3. Class B — 53 duplicates | write 53 new English prompts + options at the same indices | 53 mp3s to regenerate |
| 4. Validator CHECK 10 + 11 | duplicate detection; negation parity | — |

**Step 1 is the cheapest and the most valuable**: the English prompts do not
change, so no question audio needs regenerating at all. Only the French answer
text changes, and answer audio is looked up by phrase text through the manifest,
so new phrases need answer audio but no `Q<n>.mp3` is touched.

Steps 1 and 2 are therefore a pure data fix with no `audioIndex` risk whatsoever.
They can ship on their own.

## 7. Proposed validator additions

- **CHECK 10 — duplicates.** Fail on a duplicate question within a pool;
  duplicate answer options within a question; a question with anything other
  than exactly one correct answer. The scan already proves the last two are
  clean, so this is a ratchet.
- **CHECK 11 — negation parity.** Warn when the English prompt is negative
  (`not`, `n't`, `never`, `nothing`) and the correct French carries no `ne` or
  `n'`. This is what found Class A. Note the inverse check produces false
  positives — an affirmative English question can legitimately have a negated
  French answer — so only the one direction is worth enforcing.
- Both belong in `scripts/validate-quiz-data.mjs` beside CHECK 9.

## 8. Recommended sequence

1. **CHECK 10 and 11 first**, so the fixes are measurable and the defects cannot
   come back.
2. **Class A and C** — 54 French answers rewritten in place. No question audio.
   This is what unblocks 1.1.
3. Re-run the validator; A and C should go to zero.
4. **Class B** — 53 replacement questions, then regenerate exactly 53 mp3s.
5. Only then Phase 1a audio and the impersonal work in
   `CONTENT_PLAN_impersonal.md`.

Steps 1–3 are the ship gate. Step 4 is quality and can follow 1.1 if the
schedule demands it — a repeated question is irritating; a correct answer marked
wrong is corrosive.
