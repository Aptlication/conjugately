# Conjugately — Updates & Corrections Log

Running register of defects and change items for Conjugately.

**Sources:** `1.1 Updates and Corrections for Conjugately 15.08.26.xlsx` (15 Aug 2026), plus items reported in conversation and found by audit.
**Numbering:** follows the spreadsheet scheme — `1.1.x` = scoped for the 1.1 release (target ~12 Oct 2026); `2.1.x` = later release. Items `1.1.5` and above were added after the spreadsheet, during the 12–14 Sep work.

**Status vocabulary:** *Live* = shipped to conjugately.com and verified on the deployed site. *In code* = written and compiling, not yet committed or deployed. *Open* = not started or awaiting a decision.

Last updated: **14 September 2026**.

---

## Register

| Item | Level | Area | Status |
|---|---|---|---|
| 1.1.1 | All levels | Mini-Courses — end-of-tense exam appears missing | Decided (14 Sep) — composition in code; app side still to build |
| 1.1.2 | All levels | Microphone alternative ("Hands Free" / "Masters Mic") | Scope decided; **name still open** |
| 1.1.3 | All levels | Randomisation of answer positions (A–D) | **Live** (13 Sep) |
| 1.1.4 | Elementary | `dire` futur simple — wrong answer key | **Live** (13 Sep) |
| 1.1.5 | Elementary | Answer key flagged on the wrong option (12 questions) | **Live** (13 Sep) |
| 1.1.6 | Elementary | Duplicate distractors served as 3-option questions (4) | **Live** (13 Sep) |
| 1.1.7 | All levels | Quiz-data validator reads only a quarter of the corpus | Open — ~1 hour |
| 1.1.8 | Intermediate | 61% of answer keys sit in slot A | Mitigated by 1.1.3; data unfixed |
| 1.1.9 | All levels | Exams draw only questions the learner has already seen | **Decided (14 Sep)** — option A, renamed *Final Level Exam* |
| 1.1.10 | All levels | Exam passes were never saved; guest hit a dead end | In code |
| 1.1.11 | All levels | Exam length, tense and assembly defects | In code |
| 2.1.1 | All levels | Cross-reference difficulty with CEFR (A1–C2) | Open — later release |

**Deployed to conjugately.com on 13 September:** `479f107`, `147b2ab`, `5901ed6`.

---

## Fixed and live

### 1.1.4 — `dire` futur simple, wrong answer key (Elementary)

**Reported** as "app displays *tu dira*, should be *tu diras*", diagnosed in the log as a copy-paste of the *il/elle* form into the *tu* slot.

**That diagnosis was wrong, and the real fault was worse.** The conjugation forms in the options were all correct. What was wrong was the `isCorrect` flag: across the whole Elementary `dire` futur block it sat on a *wrong* option. So a learner who picked the right answer was **marked wrong**, and the app then displayed a wrong conjugation as the correct one. Those questions also feed the exams.

Ten questions repaired against each question's own hint, which states the correct form. Shipped in `479f107`, verified on the deployed site: 20 of 20 questions correct.

### 1.1.5 — Answer key on the wrong option (the wider class)

Two further questions were missed by the first repair because the audit compared with `String.includes()` — `"il diras…"` contains `"il dira"`, so the check passed. Substring matching, blind to exactly the `-s` / `-i` / `-ai` suffix confusion the app exists to teach.

Re-audited with whole-token matching. Two more repaired (`Il diras` → `Il dira`, both copies of the same question). Shipped in `5901ed6`.

**Total across both rounds: 12 questions had the answer key on the wrong option.**

### 1.1.6 — Duplicate distractors (4 questions)

Four questions carried the same option text twice. `polishQuestions()` dedupes options by text before serving, so these silently became **three-option** questions — a 33% guess rate instead of 25%. Replaced each duplicate with a distinct wrong-person form. Shipped in `5901ed6`.

Replacements written by Claude, worth a native-speaker glance: `Nous ne peux rien voir.` · `Elle ne diront rien.` · `Quand nous verra-nous ?`

### 1.1.3 — Randomisation of answer positions

Only the internal generator shuffled, and it used `sort(() => Math.random() - 0.5)` — which is not a shuffle; comparator-based shuffles skew measurably. The curated per-level datasets were served in **file order every time**.

The effect was worse than "repeatable". Measured on the live site before the fix, one Elementary block returned the correct answer in slot A **18 times out of 20** — pressing A twenty times scored 90%, which is the exam pass mark.

Fixed with one Fisher–Yates pass at the single `/api/get-quiz` response boundary, covering all three question sources at once; `Option A`–`Option D` labels follow their new slots. Shipped in `147b2ab`.

Verified live: six consecutive calls returned six distinct orderings, and across 240 questions spanning three verb/tense/level combinations there were zero wrong keys, zero three-option questions and zero mislabelled options.

**Impact raised from Med to High** — this was the difference between an exam that tests French and one passable by pattern-matching.

### Guard against recurrence

`npm run validate:quiz` (`scripts/validate-quiz-data.mjs`) now checks: exactly one correct option; no duplicate option text; the flagged option matches the hint's named form by whole-token comparison; futur/conditionnel *tu* forms end in `-s` (handling inversion, where the verb precedes the pronoun); corpus-wide position uniformity by chi-square; and per-quiz position skew as a warning. Verified by deliberately reintroducing the bug the first version missed.

**Still to do:** wire it into CI before the 1 October freeze — and close 1.1.7 first, or it is guarding a quarter of the corpus.

---

## Open

### 1.1.1 — Mini-Courses: end-of-tense exam appears missing

**Diagnosed 13 Sep.** `apps/mobile/lib/courses.ts` declares a `finalExam` for every level and the course blurbs promise "+ Final Level Exam (30 questions, 90% to pass)" with no caveat — but there is **no exam entry point, handler or route anywhere in `apps/mobile/app`**. To be fair to the app, the exam row on the mini-course screen does say "arrives in the next update", so it is mixed messaging rather than a bare false promise. On conjugately.com the exam exists and works.

All wording is now **"Final Level Exam"** on both surfaces (14 Sep) — one term for every difficulty level, no per-level variation.

**The log's open question is settled:** the Mini-Course end-of-tense exam **is** the level × tense examination of the 1.1 scope. `courses.ts` already carries the same numbers as the website, so they were always the same object, implemented on one surface only. The 90% gate applies.

**Composition — confirmed feasible with no new content.** Exams already draw from the same curated question pools as the unit quizzes, tagged so the existing ElevenLabs recordings play. No new questions, no new TTS. (`isExam: true` is in fact a no-op for Beginner, Novice, Elementary and Intermediate — the curated path returns before reaching the exam-distractor branches.)

**Composition decided 14 Sep — see 1.1.9.** What remains for 1.1.1 is the app side: an exam entry point in `apps/mobile`, reading `shared/exams.ts` so both surfaces share the numbers.

Note: the mobile blurbs are hardcoded and now disagree with the agreed exam lengths (30 / 40 / 42 / 66); Elementary also says "6 Units" while its exam covers 7 verbs. They should read from `shared/exams.ts`.

### 1.1.9 — Exams draw only questions the learner has already seen

**DECIDED 14 September: option A — shared pool, stratified, renamed "Final Level Exam".**

Every verb × tense block holds **exactly 20 questions**, and the unit quiz requests 20. The quiz serves the entire pool, so there is nothing to hold back without shortening the units. Rather than pretend otherwise, the exam is named for what it is: a Final Level Exam of material already practised. The 90% gate stays.

What the review has to earn instead is **coverage**, and that is now enforced rather than left to chance. `selectExamQuestions()` in `shared/exams.ts` stratifies by grammatical person — every person contributes one question before any contributes a second — and guarantees at least one negative and one interrogative form where the pool holds them.

Measured over 4,000 simulated reviews against the real Elementary pools:

| per verb | distinct persons (of 5 picks) | same person 3+ times | verb never tested on *tu* |
|---|---|---|---|
| naive slice | 3.85 | 11.7% | 40.6% |
| stratified | 4.65 | **0%** | 28.9% |

The gain is per-verb, not per-exam: across 35 questions an unweighted sample already hit every person by chance, but a *single verb* could come up five times as *il* and never as *tu*.

**Questions per verb raised 5 → 6** for Elementary and Intermediate at the same time, because five slots cannot hold six persons — at five, every verb was guaranteed to miss one. At six, 73% of verbs cover all six persons, averaging 5.7. Beginner and Novice stay at 10; at six their reviews would be 18 and 24 questions, too thin for the end of a whole course.

New lengths: **30 / 40 / 42 / 66**, pass **27 / 36 / 38 / 60**.

One implementation note worth keeping: pools contain an "other" bucket for answers whose subject is a noun rather than a pronoun. Treating it as a seventh person let it consume one of the six slots, and 61% of verbs then missed a real person outright. It is pinned last in the round-robin.

Options B (split the pool 15/5) and C (author a separate exam bank, ~600 sentences plus ElevenLabs generation) were considered and not taken — B shortens the units, C cannot be done before 12 October.

### 1.1.2 — Microphone alternative

**Scope decided 13 Sep: ships on all levels**, not Intermediate-only as the spreadsheet scoped it. The matcher and ladder are level-agnostic; restricting it would mean writing gating code rather than saving work, and an App Store editor demoing at Beginner would otherwise never see the signature feature.

**Name still open** — "Masters Mic" vs "Hands Free". This blocks the featuring nomination, which is due **18 September**, and then the ASO copy and screenshots.

Recommendation: **Masters Mic** as the feature name (in-app, What's New, nomination, screenshot captions), with *hands-free* as descriptive copy. The 30-character App Store subtitle then carries `French conjugation, hands-free` — exactly 30 characters, keeping *French*, *conjugation* and *hands-free* in the visible line, with voice/speaking/pronunciation in the invisible keyword field.

Also decided: the mic is **not permitted in exams** in 1.1 (progression must not hang on speech recognition, and it keeps the accessibility claim honest); a confirmed disambiguation alternative scores **full marks**; accept band **0.90**, disambiguate 0.75–0.89, confidence floor 0.4.

### 1.1.7 — The validator only reads a quarter of the corpus

Intermediate and Novice use a different schema — `{question, options[], answer: "A"}` rather than `{text, isCorrect}` — so the validator's parser silently matches nothing in them. It reports "684 questions parsed" and reads as complete; the real corpus is roughly 2,760.

Same family of fault as the substring bug: a check that looks like it passed because it never ran. Needs a second parser for that shape. **~1 hour.**

### 1.1.8 — Intermediate answer keys are 61% slot A

1,124 of 1,840 Intermediate questions have the answer in position A. Before 1.1.3 shipped, pressing A on every Intermediate question scored about 61%.

Now mitigated at serve time by the shuffle, so it is not user-visible and rewriting the data buys nothing — but it becomes load-bearing again the moment that shuffle is removed. The validator reports per-quiz skew as a warning for exactly this reason, and will cover Intermediate once 1.1.7 is closed.

### 2.1.1 — Cross-reference with CEFR (A1–C2)

Unchanged, later release. Map the four levels onto CEFR bands and check tense coverage at each band matches what CEFR expects. Strong App Store and featuring material — but only if the mapping is real. Worth doing properly rather than asserting.

---

## In code, not yet shipped

Written, compiling (confirmed by `npm run build`), **not committed and not exercised at runtime**. These need a local pass before they go near main.

### 1.1.11 — Exam length, tense and assembly

Found during the 12 Sep audit of the existing exam implementation (`docs/EXAM_AUDIT_2026-09-12.md`):

- **The Intermediate exam ran 180 questions** — it looped all 18 verbs at 10 each while declaring 110, so the learner sat 180 and the record saved 110. Now per-level counts: **30 / 40 / 42 / 66**, pass **27 / 36 / 38 / 60**, from `shared/exams.ts`.
- **Past-tense exams asked for *Passé Simple*** for every level but Elementary, while the courses, tense lists, audio paths and the app all use *Passé Composé*. The exam tested a tense the course never taught.
- **Exam assembly was N sequential fetches that failed silently** — a dropped request produced a shorter exam, and the 90% gate was then computed against however many questions arrived. Now parallel, throws on any failure, and asserts the assembled count before anyone answers.
- The exam question shuffle was also `sort(() => Math.random() - 0.5)` — replaced with Fisher–Yates.

### 1.1.10 — Exam passes were never saved

The save was guarded by `hasUserId(user)`, and guest mode makes that false for every visitor, so **no exam pass had ever been persisted**. Worse, passing showed a "log in to save your progress" screen whose button goes to `/api/login` — which no-ops back to the home page in guest mode. The only thing that screen reliably did was tell someone who had just passed that their result was lost, and then lose it.

Now written to `conjugately_exam_results` in localStorage for every visitor, with a plain "saved on this device" pass screen. Device-local until accounts exist — worth stating in the release notes.

---

## Environment note

`GLOSSARY.md` binds: **main** = conjugately.com (the live site), **staging** = preview.conjugately.com (the browser twin of the app, noindexed), **production** = the TestFlight build. The phrase "staging on conjugately.com" is wrong and has been corrected — read literally it means pushing unfinished code to the live public site.

Routing for 1.1: exams land on **main** first and mirror into the app; Masters Mic takes a recorded exemption (Apple's on-device Speech framework has no web equivalent) and is proved on staging plus a physical device.
