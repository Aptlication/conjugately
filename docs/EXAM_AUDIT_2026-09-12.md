# Exam audit — what is already on main, and four defects in it

Read of `client/src/App.tsx`, `server/routes.ts`, `server/quiz-generator.ts` and
`shared/schema.ts` on 12 September 2026.

> **STATUS — all four fixed in code, 12 September, approved by Jonathan.**
> `shared/exams.ts` is the source of truth and `client/src/App.tsx` now reads
> from it. Nothing is deployed: the changes are on disk, uncommitted, and have
> not run against a server. Verify on main before the app mirrors anything.
>
> | Defect | Resolution |
> |---|---|
> | 1 — 180-question Intermediate exam | `questionsPerVerb` is now per-level: 10 / 10 / 6 / 6 → **30 / 40 / 42 / 66**, pass **27 / 36 / 38 / 60**. Six rather than five for the long levels, decided 14 Sep: five slots cannot hold six grammatical persons, so every verb was guaranteed to go untested on one. |
> | 2 — Passé Simple in past-tense exams | Passé Composé throughout, from the registry. |
> | 3 — passes never saved | Written to `conjugately_exam_results` in localStorage for every visitor, signed in or not. The "log in to save" dead end is gone. |
> | 4 — sequential, silently-failing fetches | `loadExamQuestions` runs them in parallel, throws on any failure, and asserts the assembled count against the definition before anyone answers. |
>
> Two things were fixed in passing: the exam shuffle was
> `sort(() => Math.random() - 0.5)`, which is not a shuffle and left question
> order partly predictable — now Fisher–Yates; and the pass mark is taken from
> the definition rather than recomputed from however many questions loaded.

## The headline: exams are not new work

The 1.1 board treats twelve examinations as a large new feature. They are
already built on conjugately.com, end to end:

| Layer | State |
|---|---|
| `quizRequestSchema` | already accepts `isExam` |
| `generateInternalQuiz(verb, tense, difficulty, isExam)` | already branches on it |
| `generateExamDistractors` | already swaps in harder cross-level distractors for exams |
| `DIFFICULTY_CONFIGS[level].courseStructure.finalExam` | length, questions-per-verb and pass threshold per level |
| `handleStartCourseOverviewFinalExam` | generates the exam, one API call per verb, shuffles |
| exam scoring | `Math.ceil(totalQuestions * 0.9)` — the 90% gate exists |
| `completedCourses` table | has `examScore` and `examPassed` columns |
| `courseProgress` table | has `examPassed` and `currentSection: "units" \| "finalExam"` |

So package 2 of the plan is not "build exams" — it is **extract the definitions
so the app can mirror them, and fix the four defects below**. That is a much
smaller job, and it moves the critical path onto Masters Mic where it belongs.

`shared/exams.ts` is the extraction. It encodes the intended behaviour, with
the three behaviour changes marked `FIXES:` in the source. Nothing is wired in
yet — App.tsx keeps working untouched until it is pointed at the module.

---

## Defect 1 — the Intermediate exam is 180 questions, recorded as 110

`handleStartCourseOverviewFinalExam` loops `config.verbs`, which for
Intermediate is **18 verbs**, at `questionsPerVerb: 10` — so it generates 180
questions. But `finalExam.questions` declares **110**, and that declared figure
is what gets written to `courseInfo.totalQuestions` and saved to
`completed_courses`.

Two consequences:

- The user sits a **180-question exam** — on a phone, roughly an hour of
  unbroken multiple choice with no save point. Nobody finishes that, and an App
  Review tester certainly will not.
- The saved record says 110, so the stored score and the sat score disagree.

Advanced has the same shape (23 verbs declared as 130). Beginner (3→30), Novice
(4→40) and Elementary (7→70) are consistent.

`shared/exams.ts` sets Intermediate to the **eleven** verbs that match both the
declared 110 and the eleven course units.

**Still your call:** even 110 questions is long for a phone. The honest options
are to cut `questionsPerVerb` to 5 for the larger levels (Intermediate becomes
55, pass 50), or to keep the length and add resumable progress. I have not
assumed either — the registry makes the number a one-line change.

## Defect 2 — three of the four exams test a tense the course never taught

The exam handler maps `Past` like this:

```ts
"Past": courseLevel === "Elementary" ? "Passé Composé" : "Passé Simple",
```

Every other part of the product — the course units, `DIFFICULTY_CONFIGS.tenses`,
the audio path map, the mobile app's `TENSE_BY_TIMEFRAME` — uses **Passé
Composé**. So for Beginner, Novice and Intermediate, the past-tense final exam
asks for a tense that was never taught, and `TENSE_PATH_MAP` then maps
`Passé Simple` back onto the `passe_compose` audio folder, which is the tell
that this was never intended.

`shared/exams.ts` uses Passé Composé throughout.

## Defect 3 — passing an exam saves nothing, because there are no accounts

The save is guarded:

```ts
if (examPassed && hasUserId(user) && !completedCourses.some(...))
```

Guest mode is in effect (`server/replitAuth.ts` → `authEnabled = false`, per
PARALLEL_RUN_PROTOCOL.md), so `hasUserId(user)` is false for every visitor on
conjugately.com today. **No exam pass has ever been persisted.** There is an
`else if (examPassed && !hasUserId(user))` branch further down — worth checking
what it actually does before assuming localStorage covers it.

This matters for 1.1 because the app has no accounts either. `shared/exams.ts`
defines `EXAM_RESULTS_STORAGE_KEY` for a device-local record, deliberately
separate from `conjugately_quiz_history` so pass/fail scores don't pollute the
practice average. Say plainly in the release notes that exam progress is
device-local until accounts land.

## Defect 4 — an exam is N sequential API calls with no failure handling

One `fetch` per verb, awaited in series: 3 for Beginner, 18 for Intermediate. A
failed call is silently skipped (`if (data.success)`), so a dropped request
produces a *shorter exam* with no warning — and the 90% gate is then computed
against however many questions happened to arrive.

On the free Render tier the first of those calls also pays the ~50s cold start.
This is the strongest argument for the paid instance, independent of App Review.

Minimum fix: request the verbs in parallel, fail the whole exam loudly if any
request fails, and assert the assembled question count matches
`exam.totalQuestions` before starting.

---

## What this changes in the plan

- Package 2 shrinks from "build exams" to "extract, fix four defects, wire up".
- Package 5 (exams in the app) is now mostly importing `shared/exams.ts`.
- The freed time goes to Masters Mic, which is the real critical path.
- Defect 1 needs a decision from you before the app mirrors anything.
