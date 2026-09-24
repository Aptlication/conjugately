# App Store featuring nomination — Conjugately 1.1

**Submit by:** 18 September 2026 (Apple asks 3–4 weeks' lead; release is 12 October)
**Where:** App Store Connect › Featuring › Nominations
**Type:** App Enhancements
**Status:** draft for Jonathan to paste and edit — nothing here is submitted

> Written from the spec, not from the build. That is the point: the nomination
> deadline sits three weeks ahead of feature-complete, so waiting for the build
> means missing the window. Describe what 1.1 does; do not describe what is
> finished.

---

## What's new in this version

Conjugately 1.1 adds **Masters Mic** — you speak the conjugation instead of
picking it from four options.

Tap the microphone in any quiz and the A–D answers give way to an equaliser.
The question is read aloud, you say the conjugated verb, and the waveform shows
your voice arriving. What happens next depends on what was heard, not on a
binary right-or-wrong:

- Said clearly, it is accepted and the quiz moves on — no confirmation step.
- Close but ambiguous, the app answers **in French** — *« Pardon — vous avez dit
  parlé, ou parler ? »* — and you choose. The two options are ordered at random,
  so the correct one is never reliably first.
- Not caught, it asks **« Comment ? »** and listens once more before moving on.

Recognition runs entirely on the device through Apple's Speech framework, so
Masters Mic works on a plane, in the Métro, and with no audio leaving the phone.

1.1 also adds **twelve examinations** — every level across the *présent*,
*passé composé* and *futur simple* — each requiring 90% to pass. Everyday
quizzes stay unscored practice; the gate is on exams alone.

## Why it's worth featuring

Verb conjugation is the wall every French learner hits, and it is the one skill
that flashcards teach worst — because recognising a conjugation on a card is a
different act from producing it out loud. Masters Mic closes exactly that gap.
It is a voice-first grammar drill, not another vocabulary app with a microphone
bolted on.

The design detail we are most pleased with is the middle branch. Speech
recognisers are not binary, and pretending they are means either waving through
near-misses as correct — teaching the wrong conjugation — or failing a student
who said the right thing. The disambiguation step keeps the app honest about
what it heard, and doubles as the teaching moment: the two forms it offers are
usually the exact pair the learner is confusing.

Accents are preserved all the way through the comparison, because *parlè* versus
*parlé* is the thing being taught.

## Platform technologies

- **Speech framework**, on-device — recognition, privacy and offline use in one
  decision.
- **Liquid Glass** materials on the quiz chrome and the mic control, adopted for
  iOS 27.
- **AVFoundation** audio session management, so the question audio ducks cleanly
  as listening begins.
- Built with SwiftUI-era system materials throughout; no audio is transmitted
  or stored.

## Accessibility

Masters Mic is optional everywhere and is never the only route through a quiz
or an exam — anyone who cannot or would rather not speak to their phone has the
full app. VoiceOver labels cover every control, Dynamic Type is supported
through the largest accessibility sizes, contrast is checked against WCAG AA,
and the equaliser respects Reduce Motion.

## Localisation

English and **French**. A French interface on a French-learning app is the
obvious first localisation, and it lets intermediate learners run the whole app
in the language they are studying.

## Demo path for an editor (under 30 seconds)

1. Open the app, tap **Beginner › Present**.
2. Tap the microphone.
3. Say *« je suis »* — accepted, advances immediately.
4. On the next question say *« je ai parle »* — the app asks, in French, whether
   you meant *j'ai parlé* or *j'ai parler*.

---

## Naming and store copy — approved 15 September 2026

**Feature name: "Masters Mic".** Used verbatim everywhere the name is doing
branding work — in-app control, What's New, this nomination, screenshot
captions. Not varied, not abbreviated.

**"Hands-free" is descriptive copy, not the name.** It says what the feature
does in words people actually search, so it belongs in the places that are read
and indexed rather than in the places that are branded.

**App Store subtitle (30 characters, visible under the app name, indexed):**

> `French conjugation, hands-free`

Exactly 30 characters, and it keeps all three of the words that matter —
*French*, *conjugation*, *hands-free* — in the visible line. The temptation is
to spend the subtitle on the feature name, but nobody searches "Masters Mic",
and that field is the highest-value 30 characters on the product page.

**Keywords field (100 characters, invisible):** voice, speaking, pronunciation,
speech, oral, aloud. Never spend visible characters on words the keyword field
indexes for free.

**In-app:** "Masters Mic" as the control name, with a supporting line such as
"answer out loud" or "hands-free practice". Avoid "also hands-free" — the
"also" frames the defining behaviour as an afterthought.

## Checklist before submitting

- [ ] Product page updated: new screenshots and an app preview video that open
      on Masters Mic (editors judge the page alongside the nomination)
- [ ] 1.1 metadata staged on the draft — subtitle, keywords, extra English
      localisations
- [ ] The demo path above actually works on the current build, or is honestly
      described as scoped rather than shipped
- [ ] French localisation confirmed as in-scope before it is claimed here
- [ ] Accessibility claims confirmed as in-scope before they are claimed here

**Do not claim anything in this document that 1.1 will not ship.** A nomination
that oversells is worse than no nomination — editors check, and the app gets
remembered for the gap.
