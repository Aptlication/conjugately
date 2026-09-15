# App Store Subscription Runbook — Conjugately Pro

Ship the subscription with the 1.0 build. Two products, one group, a two-week free
trial on both.

- Bundle: `com.conjugately.app`
- App: `apps/mobile` — Expo SDK 54, RN 0.81.5, expo-router 6, new architecture on
- EAS project: `8532aabd-2434-49e0-8f31-978683c0f547`
- Prices: $4.99/month, $29.99/year

---

## 0. Three things in this repo that shaped the plan

**Every quiz costs money.** `app/quiz.tsx` fetches from `${API_BASE}/api/get-quiz`
(`lib/data.ts` → conjugately.onrender.com) and the workspace pulls a generative-AI
SDK. Each free user is a recurring variable cost — the argument against granting an
unbounded early cohort permanent free access, and against a 30-day trial.

**The curriculum is short, so 14 days is right.** `lib/courses.ts`: Beginner is 3
units × 20 questions + a 30-question exam; Novice adds a fourth verb. A motivated
learner clears that in two or three sittings. The value lands inside week one, so a
two-week trial ends while the habit is warm.

**The paywall will be client-side only.** No auth; progress is AsyncStorage
(`lib/progress.ts`). The entitlement check runs on device while `/api/get-quiz` stays
open. Not a launch blocker — it means the paywall protects revenue, not cost. If
server spend becomes the problem, that's when the endpoint needs a token.

---

## 1. Products

One subscription group, `Conjugately Pro`. A customer can hold only one subscription
from a group at a time, which makes monthly ↔ annual a switch rather than a double
charge.

| Reference name | Product ID | Duration | Price | Level |
|---|---|---|---|---|
| Conjugately Pro Annual | `com.conjugately.app.pro.annual` | 1 year | $29.99 | 1 |
| Conjugately Pro Monthly | `com.conjugately.app.pro.monthly` | 1 month | $4.99 | 2 |

Level 1 ranks highest. Annual above monthly makes monthly → annual an **upgrade**
(immediate, unused time refunded pro rata) and annual → monthly a **downgrade**
(waits for the renewal date). Reversed, people get charged twice in a week.

Proceeds: 70% in a customer's first year, 85% after — or 85% from day one under the
App Store Small Business Program. Enrol.

---

## 2. App Store Connect, in order

> Browser handover version of this section, written as prompts for Claude in
> Chrome: `APP_STORE_CHROME_HANDOVER.md`

1. **Paid Applications agreement** — Business → Agreements. Until it's active with
   banking and tax accepted, subscriptions can't be sold. Do it first; it's the step
   with an unpredictable delay.
2. **Subscription group** — Monetization → Subscriptions → `+`. Reference name
   `Conjugately Pro` (internal). Add a group display name and description: that's
   what shows in the customer's Manage Subscriptions screen.
3. **Both products** — duration, price, availability, and at least one localization
   (display name + description shown at purchase). Each product needs review
   information: a paywall screenshot and notes on how to reach it. A missing
   screenshot holds the submission.
4. **Two-week free trial on BOTH products** — Subscription Prices → Introductory
   Offer → Create. Free, 2 weeks, all territories, no end date. A customer is
   eligible for exactly one introductory offer per subscription group, ever — so if
   only the monthly carried a trial, anyone wanting annual would either route through
   monthly or pay $29.99 unseen.
5. **Billing grace period** — same group screen. 6 or 16 days of continued access
   while Apple retries a failed card. Free churn recovery, no downside.
6. **Attach both products to the 1.0 version and submit together** — the first
   subscription must be submitted with an app version. Add them in the In-App
   Purchases section of the version page before submitting. Later changes go alone.

---

## 3. Implementation

No purchase library in `apps/mobile` yet. Neither option runs in Expo Go — IAP needs
native code, so it's a development build and an EAS rebuild either way. On CNG, that
means a config plugin entry in `app.json` and a rebuild, not an eject.

| Option | Case for it | Cost |
|---|---|---|
| RevenueCat (`react-native-purchases`) | Trial starts, trial→paid conversion, churn and cohorts as a dashboard on day one. Server-side receipt validation. Android for free later. | Free to $2,500/mo tracked revenue, then 1%. Third party in the purchase path. |
| `expo-iap` | No third party, no fee. OpenIAP spec, built for dev builds. | You write validation and your own conversion analytics — the thing you wanted the data for. |

**Recommendation: RevenueCat for this launch.** No backend auth to hang entitlements
off, no analytics pipeline, and the point of the exercise is finding out whether
$4.99 is the right number. Revisit above $2,500/month.

### Entitlement states to handle

The gate is not a boolean.

| State | What happened | What the app does |
|---|---|---|
| Active | Paid, renewing | Full access |
| In trial | Inside the 2-week intro offer | Full access; show days remaining and what happens on day 14 |
| Billing retry | Card declined, Apple retrying | Keep access + dismissible banner. Never a hard lock — they didn't choose to leave |
| Grace period | The window enabled in step 5 | Keep access, same banner |
| Cancelled, not expired | Auto-renew off, still paid through | Full access to expiry. Win-back window |
| Expired | Period ended | Paywall — keep local progress visible |
| Revoked | Refund or family sharing withdrawn | Revoke immediately |

Progress stays in AsyncStorage, so an expired subscriber keeps their history on
device. Show it on the paywall rather than hiding it.

---

## 4. Rejection checklist

- [ ] Terms of Use and Privacy Policy links **on the paywall screen itself** — most
      common subscription rejection
- [ ] Title, duration, price and what's included, stated before the buy button
- [ ] Visible Restore Purchases control
- [ ] Privacy Policy URL in app metadata; own EULA or Apple's standard one
- [ ] Review notes spelling out the taps to reach the paywall
- [ ] Paywall copy reads prices off the fetched product, not hard-coded strings
- [ ] Both products attached to the 1.0 version

A Guideline 2.1 rejection saying the in-app purchases weren't submitted is almost
always the last one: products exist, never attached to the version.

---

## 5. Sandbox testing

Users and Access → Sandbox. Renewal rate is a per-tester setting.

| Real duration | 5-min rate (default) | 1-hour rate |
|---|---|---|
| 1 month | 5 minutes | 1 hour |
| 1 year | 1 hour | 12 hours |

Auto-renews up to 12 times, then auto-renew switches off on the 13th attempt. Clear
purchase history to re-run a first-time trial (irreversible). Enable interrupted
purchases for at least one run.

Five runs before submitting:

1. Fresh install → start trial → access unlocks without a restart
2. Trial converts → charge lands, access uninterrupted
3. Cancel mid-trial → access survives to the end date, then paywall returns with
   local progress intact
4. Delete, reinstall, Restore Purchases → entitlement returns
5. Buy monthly, upgrade to annual → immediate, not two subscriptions

---

## 6. What to read after launch

Check at day 20 and again at day 45:

- **Paywall views → trials started.** Low = positioning problem.
- **Trial → paid conversion.** The headline. Double digits is fine for an unknown app.
- **Activity on day 13.** Still using it and not converting = price/paywall problem.
  Gone by day five = onboarding problem. Opposite fixes; conversion rate alone can't
  tell them apart.
- **Monthly vs annual split.** Heavy annual early means the annual is priced too
  generously — better to know before thousands are locked in.

Trial length is a field you can change in any later release. Price is not. Tune the
trial; the price is what this launch exists to test.

---

## Sources

- [Set up introductory offers](https://developer.apple.com/help/app-store-connect/manage-subscriptions/set-up-introductory-offers-for-auto-renewable-subscriptions/) — trial durations, one-offer-per-group eligibility
- [Offer auto-renewable subscriptions](https://developer.apple.com/help/app-store-connect/manage-subscriptions/offer-auto-renewable-subscriptions/) — groups, levels, proceeds, grace period
- [Manage Sandbox Apple Account settings](https://developer.apple.com/help/app-store-connect/test-in-app-purchases/manage-sandbox-apple-account-settings/) — renewal rates, 12-renewal limit
- [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) — 3.1.1 restore, 3.1.2 disclosures
- [Using in-app purchases — Expo](https://docs.expo.dev/guides/in-app-purchases/) — library options, dev build requirement
- [RevenueCat pricing](https://www.revenuecat.com/pricing/) — free to $2,500 MTR, then 1%
