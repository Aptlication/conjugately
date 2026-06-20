# Objective
Add full ElevenLabs audio support (questions + answers) for the Novice difficulty level, using **Thomas** voice (ID: `GBv7mTt0atIp3Br8iCZE`) instead of Léa. Novice covers 4 verbs (être, avoir, faire, aller) × 3 tenses (Présent, Passé Composé, Futur Simple) = 12 verb/tense combos, 240 questions total, 922 unique answer phrases.

# Tasks

### T001: Add audioIndex tagging to Novice questions
- **Blocked By**: []
- **Details**:
  - Tag each curated novice question with its original array index before shuffling, so question audio plays correctly after randomization
  - In `server/novice-quiz-data.ts`: modify `getRandomNoviceQuestions` to tag questions with `audioIndex: i + 1` before shuffling (same pattern as beginner)
  - In `server/novice-quiz-data.ts`: update `convertNoviceToQuizFormat` to pass `audioIndex` through to the output object
  - In `server/quiz-generator.ts`: ensure the novice code path (lines 1787-1794) passes `audioIndex` in the returned questions
  - Files: `server/novice-quiz-data.ts`, `server/quiz-generator.ts`
  - Acceptance: API response for Novice quiz includes `audioIndex` field on each question, and audioIndex values are non-sequential (shuffled)

### T002: Update frontend to play Novice question audio
- **Blocked By**: [T001]
- **Details**:
  - Extend the question audio `useEffect` in `client/src/App.tsx` to also play audio for Novice quizzes
  - Currently the audio URL uses `beginner` in the path: `/attached_assets/audio/quizzes/beginner/${verb}/${tensePath}/questions/Q${qNum}.mp3`
  - Need to detect the current difficulty level and construct the path with `novice` instead when appropriate
  - The `activeQuizVerb` and `activeQuizTense` state variables are already set for Novice quizzes
  - Need to track the active difficulty level in state (add `activeQuizDifficulty` if not present)
  - Files: `client/src/App.tsx`
  - Acceptance: Question audio plays the correct Novice MP3 file matching the displayed question text

### T003: Generate 240 Novice question MP3s via ElevenLabs (Thomas voice)
- **Blocked By**: [T001]
- **Details**:
  - Create a novice-specific audio generation script using Thomas voice (`GBv7mTt0atIp3Br8iCZE`) with `eleven_multilingual_v2` model
  - Question text is English (e.g., "I go to school / I am going to school") → generate with Thomas
  - Output path: `/attached_assets/audio/quizzes/novice/${verb}/${tensePath}/questions/Q${n}.mp3`
  - 4 verbs × 3 tenses × 20 questions = 240 files
  - Files: new script `server/scripts/generate-novice-audio.ts`, audio output files
  - Acceptance: All 240 Q*.mp3 files exist and serve HTTP 200

### T004: Generate 922 Novice answer MP3s via ElevenLabs (Thomas voice)
- **Blocked By**: []
- **Details**:
  - Generate French answer audio for all 922 unique answer texts in the novice data using Thomas voice
  - Currently 0 out of 922 have working audio files
  - These are separate from the Beginner (Léa) answer audio — novice answers should be stored with a different naming convention or in a separate manifest section to avoid overwriting Léa's versions
  - Need to decide: use a novice-specific manifest section or separate file naming (e.g., `thomas_${hash}.mp3`)
  - Output: hash-named MP3s in `attached_assets/audio/`, entries in manifest under a novice-voice key
  - Est. ~22,000 characters of ElevenLabs API usage
  - Files: new script `server/scripts/generate-novice-audio.ts`, `attached_assets/tts-manifest.json`
  - Acceptance: All 922 unique novice answer texts resolve to existing audio files via manifest lookup

### T005: Update speakAnswer to use Thomas voice for Novice quizzes
- **Blocked By**: [T004]
- **Details**:
  - Modify `useTTS.ts` `speakAnswer` function to accept a difficulty parameter or use a context to select the correct voice/manifest entry
  - When playing Novice answers, look up the Thomas-voiced file instead of the Léa-voiced one
  - Ensure Beginner answers still use Léa's audio files (no regression)
  - Files: `client/src/hooks/useTTS.ts`, `client/src/App.tsx`
  - Acceptance: Novice answer audio plays in Thomas voice; Beginner answer audio still plays in Léa voice

### T006: Verify end-to-end audio for all 12 Novice verb/tense combos
- **Blocked By**: [T002, T003, T004, T005]
- **Details**:
  - Test each verb/tense combo via API to confirm audioIndex is present and shuffled
  - Verify all question MP3s serve correctly (HTTP 200, non-empty)
  - Verify all answer texts resolve to existing Thomas-voiced audio files
  - Restart the app and check browser console for correct audio playback
  - Files: N/A (testing)
  - Acceptance: Zero missing audio files for any Novice quiz configuration; Thomas voice plays for all Novice audio
