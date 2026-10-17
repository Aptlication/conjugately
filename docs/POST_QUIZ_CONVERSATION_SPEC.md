# Post-quiz conversation (1.2.5) — design for approval

Date: 18 October 2026 · Owner: Jonathan · Status: **draft for approval** · **Release: 1.3** (moved out of 1.2 by Jonathan, 18 Oct)

Item 5 on the "V2 Conjugately update 1.2.0" list: *a 10–30 second conversation built from the language just used in the quiz.*

## Decided by Jonathan (18 Oct)

1. **Written in advance.** The dialogues are written and checked ahead of time, not generated per quiz.
2. **A real conversation.** The app speaks a line and the learner answers out loud with the record (Masters Mic) feature.
3. **White background.** The conversation screen uses white instead of the app's dark blue, with the record button and the usual coloured buttons, so the learner knows they are in a different mode.
4. **Pro only.**
5. **Course units only.** It follows course units, never Build Your Quiz quizzes and never exams.
6. **Entry modal.** A modal titled **"Final conversation"** has two buttons: **Continue** and **Opt out**. Opt out goes straight on to the next part of the course.

## Can it be generated on the spot? (Jonathan's question)

Technically yes. The server already calls Gemini to write quiz questions, and ElevenLabs can voice text through its API on demand. **Recommendation: don't.** Write the lines in advance and record them in advance:

- **Correct French every time.** A generated line can't be checked before a learner hears it. A written one can.
- **Same voices and quality as the existing audio.** It uses the same ElevenLabs voices and the same repo scripts (`server/scripts/generate-*-audio.ts`) that made every current recording.
- **Works offline and costs nothing per play.** There's no API call when the learner taps Continue, so there's no wait and no running cost.
- **Speech recognition is already on the phone.** Masters Mic recognises French on the device (`expo-speech-recognition`), so listening to the learner needs nothing new from a server.

## How it works

1. **Unit finished (Pro learner).** The results screen plays as now: the score, the coin animation, and any exam invitation.
2. **Modal: "Final conversation".** Subtitle: *A 20-second chat using **dire** in the passé composé.* Buttons: **Continue** · **Opt out**.
   - **Opt out** closes the modal and the course carries on as it does today.
3. **Conversation screen (white).** It runs 2–3 exchanges:
   - **The app speaks** a French line. The text appears too, with an English line the learner can show.
   - **The learner is shown an English cue** for their reply (e.g. *"Say: I said hello to her."*). They hold the record button, the equaliser moves, and they release.
   - **Clear match:** a green tick, and the conversation moves on.
   - **Not understood:** *« Comment ? »* and one more try. If it still doesn't match, the app shows the French model reply and moves on. Nothing is marked wrong.
   - **Closing line:** the app ends the exchange (« Bonne idée. À demain ! »).
4. **Done.** A **Continue** button takes the learner on to the next part of the course.

**Length:** each app line takes about 2–3 s and each reply about 3–4 s, so 2–3 exchanges come to roughly 15–25 s.

**Matching:** this reuses `shared/answerMatch.ts`, with its thresholds and accent guard. Each reply has a short list of accepted answers (e.g. *Je lui ai dit bonjour* / *J'ai dit bonjour à Marie*). The conjugated form being practised has to be heard.

**Coins and marks:** none. It's practice, and the coin economy stays as agreed.

**Web twin (staging):** the mic can't run on the web (GLOSSARY exemption 3). On preview.conjugately.com the learner taps the reply instead, so the flow and screens can still be checked there. Speech is checked on a physical device.

## Sample dialogues (for tone; all 96 to follow)

**Beginner · être · Présent**
- App: « Bonjour ! Tu es français ? » → cue *"No, I'm Australian."* → **Non, je suis australien.** (also accepts *australienne*)
- App: « Et tes parents, ils sont où ? » → cue *"They are in Sydney."* → **Ils sont à Sydney.**
- App: « Moi aussi, je suis de Sydney ! »

**Elementary · dire · Passé composé**
- App: « Qu'est-ce que tu as dit à Marie ? » → cue *"I said hello to her."* → **Je lui ai dit bonjour.** (also accepts *J'ai dit bonjour à Marie.*)
- App: « Et elle, qu'est-ce qu'elle a dit ? » → cue *"She said nothing."* → **Elle n'a rien dit.**
- App: « Ah bon ? Vous ne vous êtes pas dit grand-chose ! »

**Intermediate · prendre · Futur simple**
- App: « Demain, tu prendras le train ou le bus ? » → cue *"I will take the train."* → **Je prendrai le train.**
- App: « Et tes amis, ils prendront le train aussi ? » → cue *"No, they will take the bus."* → **Non, ils prendront le bus.**
- App: « D'accord. Bon voyage ! »

## Size of the job

- **Dialogues:** one per course unit per tense. Beginner 3 + Novice 4 + Elementary 7 + Intermediate 18 = 32 units × 3 tenses = **96 dialogues**.
- **Recordings:** about 3 app lines each, so **~290 recordings** and roughly 12,000 French characters. That is more than the 10,000-credit allowance noted in `COC_ELEVENLABS_BRIEF.md`, and **the licence question in that brief has to be settled first**.
- **Code:**
  - Dialogue data in `shared/conversations.ts` (one source for both surfaces).
  - Recordings at `attached_assets/audio/conversations/<level>/<verb>/<tense>/L<n>.mp3`.
  - A new `generate-conversation-audio.ts` script, the white conversation screen, and the modal.
- **Checking:** Jonathan, or a native speaker, approves the French in batches before anything is recorded.

## Open — Jonathan to decide

1. **Free users:** hide the modal completely (recommended, so there's no upsell after every unit), or show it with "Requires Conjugately Pro"?
2. **Reply cue:** an English cue (recommended, because it makes the learner produce the French), or a choice of two French replies to read aloud?
3. **Release:** decided 18 Oct — **1.3**.
5. **Voice:** ElevenLabs lines generated by script in one batch (recommended), or the iPhone's built-in French voices (free and instant, but a different and more synthetic voice than the quiz audio). A quick prototype with the built-in voices would settle it by ear.
4. **Marketing copy:** no prices, never "text-to-speech", never "hands-free", and Pro is always named (2-week free trial).
