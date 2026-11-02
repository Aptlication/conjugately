# Advanced A pilot: Theme 1 on TestFlight (1 Nov 2026)

Decisions (Jonathan, 1 Nov 2026):
- **Scope:** Theme 1 pilot only (10 units, « La vie quotidienne »).
- **Marking:** AI marking of the spoken answers.
- **Placement:** a new Advanced A level, Pro, marked Beta.
- **Release route:** app first (GLOSSARY exemption 5).

## What a unit does
Read → Words → Verb quiz → Conversation → Summary (`app/advanced-unit.tsx`). Revised 2 Nov 2026: the AI-marked spoken comprehension conversation was dropped (spontaneous answers don't work); each unit now has a unit verb, a 10-question verb quiz and the old translate-format conversation.

**Read** (`components/advanced/ReadingStep.tsx`)
- Tap any word for its English; double-tap to save it. Every word has a gloss.
- The animated "How it works" pop-up shows each time until "Don't remind me again" (`components/advanced/ReadTip.tsx`).

**Words** (`components/advanced/WordsStep.tsx`)
- The learner marks each saved word Learn now (the default) or Later.
- Later words go to My Words (the Vocabulary screen).
- The lesson's 8 key words and the learn-now words are tested on the spot, like the vocab check: VIS-CUE counts as wrong, missed words come back, 1 coin per word.

**Unit verb.** Each article has one verb, taken from the text and not taught in an earlier level. If an article has several, the one it uses most is chosen, or else the most useful. Theme 1: visiter, demander, recevoir, donner, réserver, aider, servir, apporter, vivre, commencer.

**Verb quiz** (`components/advanced/QuizStep.tsx`)
- Ten questions on the unit verb, in the conjugation-quiz format: 3 présent, 3 passé composé, 2 futur simple, 2 imparfait.
- The correct French is played after each answer.
- 1 coin per right answer.

**Conversation** (`components/advanced/ConvStep.tsx`)
- The old translate format, laid out like the post-quiz conversation.
- Cécile speaks; the learner says the English cue in French, using the unit verb in five tenses (including the conditionnel).
- What's heard snaps to the nearest of four sentences built around the verb. Sounding the same as the right answer counts as right.
- A miss (2 Nov 2026, same as the earlier levels): no list of options. The wrong match is struck through under "Ruled out" and Cécile says « Pas tout à fait. Essayez encore. ».
- The next attempt is matched only against what's left, so the field narrows to the right one.
- Speech that sounds like none of the remaining sentences gets « Comment ? » and rules nothing out.

**Summary:** the result is saved to `advanced_progress` (best coins kept).

## Where things live
- **Content:**
  - `scripts/data/advanced-theme1.json`: articles and key words.
  - `scripts/data/advanced-theme1-verbs.json`: unit verbs, verb quizzes and conversations; independently reviewed on 2 Nov 2026.
- **Glosses:** `scripts/data/advanced-lexicon.json`: 539 words, 52 set phrases, and per-article overrides.
- **Generated:** `shared/advanced/content.ts`, built with `node scripts/build-advanced-data.mjs`.
- **Tests:**
  - `npx tsx shared/advanced.test.ts` checks:
    - every word has a gloss;
    - each unit verb is untaught, unrepeated and in its article;
    - the quiz's tense spread and its four options;
    - five replies in five tenses;
    - inversion in questions;
    - no option sounds like another, and no -rai/-rais pairs.

## To put it on TestFlight (Jonathan, Git Bash, repo root)
1. **Record the audio:** `node scripts/generate-conversation-audio.mjs --lines=scripts/data/advanced-lines.json`. That's 626 clips; clips already recorded are skipped, so only the new conversation and quiz lines are made.
2. **Bundle the clips:** `npx tsx scripts/build-advanced-audio-lines.ts --map`. Until then, missing lines are silent.
3. **Build:** `eas build -p ios --profile production` and submit to TestFlight.
4. **Test on a phone:**
   - Mini-Courses → Advanced A → 1.1.
   - Double-tap a few words, sort them, and learn them.
   - Do the verb quiz.
   - In the conversation, say one reply in the wrong tense: « Pas tout à fait » should come, the wrong sentence should be struck through under "Ruled out", and no list should appear.

## Not in the pilot
- Themes 2–10.
- A Final Level Exam for the theme.
- The website version.
- The B2-style test.
