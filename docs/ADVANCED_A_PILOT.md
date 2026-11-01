# Advanced A pilot: Theme 1 on TestFlight (1 Nov 2026)

Decisions (Jonathan, 1 Nov 2026):
- **Scope:** Theme 1 pilot only (10 units, « La vie quotidienne »).
- **Marking:** AI marking of the spoken answers.
- **Placement:** a new Advanced A level, Pro, marked Beta.
- **Release route:** app first (GLOSSARY exemption 5).

## What a unit does
Read → Words → Conversation → Summary (`app/advanced-unit.tsx`).

**Read** (`components/advanced/ReadingStep.tsx`)
- Tap any word for its English; double-tap to save it. Every word has a gloss.
- The animated "How it works" pop-up shows each time until "Don't remind me again" (`components/advanced/ReadTip.tsx`).

**Words** (`components/advanced/WordsStep.tsx`)
- The learner marks each saved word Learn now (the default) or Later.
- Later words go to My Words (the Vocabulary screen).
- The lesson's 8 key words and the learn-now words are tested on the spot, like the vocab check: VIS-CUE counts as wrong, missed words come back, 1 coin per word.

**Conversation** (`components/advanced/TalkStep.tsx`)
- Same layout as the post-quiz conversation.
- Cécile asks 6 questions; the learner holds the mic and answers in at least two sentences.
- `/api/advanced/mark` (`server/advancedMark.ts`) judges the meaning generously with Claude; the app counts the sentences.
- A right answer of only one sentence gets the follow-up question.
- The yellow card gives four steps of help: chips → starter → English → French.
- Coins per answer: 3, 2 or 1, depending on how much help was used.
- Two misses show "Say it like this".
- Offline, or if the server fails, a key-word check stands in.

**Summary:** the result is saved to `advanced_progress` (best coins kept).

## Where things live
- **Content:** `scripts/data/advanced-theme1.json` (articles, key words, questions; mirrors the project doc `advanced-theme1-pilot-scripts.md`).
- **Glosses:** `scripts/data/advanced-lexicon.json`: 539 words, 52 set phrases, and per-article overrides.
- **Generated:** `shared/advanced/content.ts`, built with `node scripts/build-advanced-data.mjs`.
- **Tests:**
  - `npx tsx shared/advanced.test.ts`: every word in every article has a gloss, the text is unchanged by tokenising, and the questions are complete.
  - `npx tsx server/advancedMark.test.ts`.

## To put it on TestFlight (Jonathan, Git Bash, repo root)
1. **Record the audio:** 594 clips, about 17,900 ElevenLabs characters.
   - Run `node scripts/generate-conversation-audio.mjs --lines=scripts/data/advanced-lines.json`.
   - The clips are: articles (Cécile odd units, Maxime even), questions, follow-ups, stock lines, and one clip per word card.
2. **Bundle the clips:** `npx tsx scripts/build-advanced-audio-lines.ts --map` rewrites `apps/mobile/lib/advancedAudio.ts`.
   - Until then the app works silently: text shows, unrecorded lines wait a moment instead of playing, and the Listen button is hidden.
3. **Deploy the server** (Render, from main) so `/api/advanced/mark` exists. It uses the same `ANTHROPIC_API_KEY` as AI WHY. Optional env: `ADVANCED_MARK_MODEL`, `ADVANCED_MARK_DAILY_CAP` (default 3000).
4. **Build:** `eas build -p ios --profile production` and submit to TestFlight.
5. **Test on a phone:**
   - Mini-Courses → Advanced A → 1.1.
   - Double-tap a few words, sort them, and learn them.
   - Answer by voice: try one sentence (the follow-up should come), English (« En français »), and a wrong answer twice ("Say it like this").

## Not in the pilot
- Themes 2–10.
- A Final Level Exam for the theme.
- The website version.
- The B2-style test.
