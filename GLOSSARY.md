# Glossary and exemption ledger

## Environment nomenclature (agreed 2026-08-09)

| Term | Meaning |
|---|---|
| **main** | conjugately.com — the live website. Source of truth for all content and design (see DESIGN_PARITY.md). |
| **staging** | conjugately-preview.onrender.com / preview.conjugately.com — browser-rendered twin of the iOS app, used for rapid parity checking. Noindexed, unlisted. |
| **production** | The TestFlight build installed on iPhone via EAS. When the App Store release exists, that will be called **release**. |

Deploy paths: main deploys from `client/` + `server/` via Render web service (manual deploy). Staging deploys from `apps/mobile` via Render static site (manual deploy). Production ships via `eas build` + `eas submit` from `apps/mobile`.

## Approved exemptions from strict site parity

The app mirrors main exactly (DESIGN_PARITY.md), except where Jonathan has granted an explicit exemption:

1. **Answer audio delay: 0.5s** after answer confirmation in the app (main uses 1.5s). Granted 2026-08-09.
2. **Live score in quiz header** — originated as an app request, then added to main first as a new feature (site-first rule respected), so both now show it. No longer a divergence; recorded for history.

Rule of engagement: any instruction that would make the app diverge from main gets flagged before implementation, then either (a) the feature is added to main first, or (b) an exemption is recorded here.

## Content-locking formula (audio)

Quiz content is pre-authored server-side and paired to pre-recorded ElevenLabs audio. Question audio: `/attached_assets/audio/quizzes/{difficulty}/{verb}/{tense_path}/questions/Q{audioIndex}.mp3` (audioIndex travels with the question). Answer audio: exact phrase looked up in `/attached_assets/tts-manifest.json` (per-difficulty maps + shared fallback); **no manifest entry → no playback, never generated**. New question/audio combinations are not created at runtime anywhere.
