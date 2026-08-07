# Dial Spec — native wheel pickers + "Choose for me" (iOS app)

Status: approved 2026-07-03. Applies to the Expo app in `apps/mobile` (not the website — web keeps its existing selectors).

## What replaces the dropdowns

Quiz setup uses three side-by-side spinning wheel dials — Level · Tense · Verb — styled like the iOS alarm-clock picker: 3D barrel curvature, center row highlighted, rows above/below tilting away and fading. The stock native picker cannot be spun programmatically, so this is one custom `Dial` component (Reanimated) used for all three columns.

Feel requirements: momentum scrolling with snap-to-row; a haptic tick on every detent crossed; the wheel is cyclic (scrolling past the end wraps), which manual users barely notice but the spin effect requires.

## "Choose for me" mode

One button under the dials. On tap:

1. All three dials launch into a fast spin simultaneously (several full revolutions).
2. They settle left-to-right, staggered — Level lands first, then Tense, then Verb (casino effect) — each with a decelerating curve, slight overshoot past the target row, and a settle-back.
3. Stronger haptic thunk on each landing; a brief beat after the last one, then auto-advance to the quiz with the landed selection.

Randomness v1 is uniform. v2 (post-auth): weight toward the user's current level and least-practiced verbs, so "random" is quietly smart. Respect iOS Reduce Motion: skip the spin animation, jump to the result with haptics only.

## Build plan to TestFlight

1. Expo scaffold in `apps/mobile` (expo-router, TypeScript), guest-mode API client → https://conjugately.onrender.com. **← current step**
2. `Dial` component + selection screen with Choose-for-me.
3. Quiz flow: selection → quiz (port `ReactNative_QuizScreen_READY` prototype) → results; audio via expo-audio.
4. EAS Build → TestFlight (Apple Developer account: already enrolled). App icon 1024px from the "C" mark.

Estimate: ~3 weeks to first TestFlight build.
