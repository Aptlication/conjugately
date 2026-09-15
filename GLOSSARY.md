# Glossary and exemption ledger

## Environment nomenclature (agreed 2026-08-09, reaffirmed 2026-09-12)

| Term | Meaning |
|---|---|
| **main** | conjugately.com — the live website. Source of truth for all content and design (see DESIGN_PARITY.md). |
| **staging** | conjugately-preview.onrender.com / preview.conjugately.com — browser-rendered twin of the iOS app, used for rapid parity checking. Noindexed, unlisted. |
| **production** | The TestFlight build installed on iPhone via EAS. When the App Store release exists, that will be called **release**. |

Deploy paths: main deploys from `client/` + `server/` via Render web service (manual deploy). Staging deploys from `apps/mobile` via Render static site (manual deploy). Production ships via `eas build` + `eas submit` from `apps/mobile`. Both services are now described in `render.yaml`.

> **Do not write "staging on conjugately.com."** The 1.1 board carried that phrasing and it is wrong in a way that matters: read literally it means pushing unfinished code to the live public site. conjugately.com is **main**. Staging is **preview.conjugately.com**. Corrected 2026-09-12.

## Approved exemptions from strict site parity

The app mirrors main exactly (DESIGN_PARITY.md), except where Jonathan has granted an explicit exemption:

1. **Answer audio delay: 0.5s** after answer confirmation in the app (main uses 1.5s). Granted 2026-08-09.
2. **Live score in quiz header** — originated as an app request, then added to main first as a new feature (site-first rule respected), so both now show it. No longer a divergence; recorded for history.
3. **Masters Mic is app-only.** Granted 2026-09-12 for release 1.1. Speech recognition runs on Apple's on-device Speech framework, which has no web equivalent; a Web Speech API version on main would be a *different recogniser* with different accuracy, latency and confidence semantics, so building one would be divergence dressed up as parity. The mic is therefore proved on staging (ladder and matcher) plus a physical device (recognition, permissions, audio session), and never lands on main.
   - The exemption covers the **capture and the ladder UI only**. The **matcher** — `shared/answerMatch.ts` — is shared code that both surfaces run, so the comparison logic stays common and is tuned once, on staging, at `/matcher`.
   - Consequence for exams: the mic is **not permitted in exams** in 1.1. Progression must not hang on speech recognition, and exams must remain completable without speaking.

Rule of engagement: any instruction that would make the app diverge from main gets flagged before implementation, then either (a) the feature is added to main first, or (b) an exemption is recorded here.

## Routing rule for release 1.1 (agreed 2026-09-12)

Split by feature rather than one rule for the whole release:

- **Exams** are portable logic and content, so they honour site-first: they land on **main** first, then mirror into the app. The definitions now live in `shared/exams.ts` so both surfaces read the same numbers.
- **Masters Mic** takes exemption 3 above.

## Content-locking formula (audio)

Quiz content is pre-authored server-side and paired to pre-recorded ElevenLabs audio. Question audio: `/attached_assets/audio/quizzes/{difficulty}/{verb}/{tense_path}/questions/Q{audioIndex}.mp3` (audioIndex travels with the question). Answer audio: exact phrase looked up in `/attached_assets/tts-manifest.json` (per-difficulty maps + shared fallback); **no manifest entry → no playback, never generated**. New question/audio combinations are not created at runtime anywhere.

## Two percentages, two scales

**90% is an exam figure** — the share of questions answered right across a whole exam, and it applies to exams only. Everyday quizzes are unscored practice with no gate.

**The mic bands are per-answer figures** — how closely one spoken utterance matched one expected conjugation. They share a percent sign with the exam figure and nothing else, and must never appear in the same idiom in the UI.
