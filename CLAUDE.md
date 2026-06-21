# Conjugately — context for Claude Code

This file orients an AI assistant working on this repo. Human-facing docs: `README.md`, `DOMAIN_MIGRATION_RUNBOOK.md`, `AUTH_SETUP.md`, and the Conjugately project plan (in the parent CONJUGATELY folder).

## What this is

Conjugately is a French verb-conjugation practice web app — the rebrand of "FrenchVerbMaster". Business goal: (1) migrate the domain frenchverbmaster.com → conjugately.com, (2) add real user accounts, (3) add a Stripe subscription wall (14-day trial), then (4) run a 6-month Google Ads campaign to acquire paid subscribers.

## Stack

- **Server:** Express + TypeScript, run with `tsx` (`server/index.ts`). Serves both API and the client.
- **Client:** React + Vite (`client/`), wouter for routing, TanStack Query, Tailwind + Radix UI.
- **DB:** Neon Postgres via Drizzle ORM (`shared/schema.ts`, `server/db.ts`). Migrations: `npm run db:push`.
- **Auth:** Passport (email/password + Google) with Postgres-backed sessions. (Was Replit Auth — now deprecated.)
- **Hosting:** Almost certainly Replit Deployments (`.replit` autoscale; Replit Auth was in use). Domain/DNS at Namecheap. CONFIRM hosting before any DNS cutover.
- **Runs on port 5000.** Build = esbuild/tsx, so TS *type* errors don't block dev/build; run `npm run check` for a full tsc pass.

## Work completed

### Workstream 1 — domain migration (code on `main`)
- `server/canonicalHost.ts` — 301-redirects old domain / www / http → `https://conjugately.com`, preserving path+query. **Gated behind `REDIRECT_TO_CANONICAL=true`** so it's inert until cutover.
- `server/routes.ts` — dynamic `/robots.txt` and `/sitemap.xml` using `CANONICAL_HOST`.
- `client/index.html` — rebranded title/description, canonical + OG/Twitter tags (hardcoded to conjugately.com — must only deploy as part of cutover).
- `DOMAIN_MIGRATION_RUNBOOK.md` — full SEO-safe cutover procedure (DNS, GSC change of address, ordering, rollback).

### Workstream 2 — accounts & auth (current branch: `accounts`, uncommitted)
- `server/auth.ts` — Passport local (bcrypt) + Google OAuth (gated behind `GOOGLE_CLIENT_ID`/`SECRET`) + password-reset tokens. Routes: `/api/register`, `/api/login`, `/api/logout`, `/api/auth/user`, `/api/forgot-password`, `/api/reset-password`, `/api/auth/google[/callback]`. Session cookie `secure` only in production (so local dev login works).
- `shared/schema.ts` — `users` gained `emailVerified`, `authProvider`, `googleId`, `resetToken`, `resetTokenExpiry`; `username`/`password` relaxed to nullable; `password` now stores a bcrypt hash.
- `server/storage.ts` — `getUserByEmail/GoogleId/ResetToken`, `createLocalUser`, `createGoogleUser`, `setResetToken`, `updatePassword`, `markEmailVerified`.
- `server/routes.ts` — imports auth from `./auth` (was `./replitAuth`); old Replit `/api/auth/user` removed.
- `package.json` — added `bcryptjs`, `passport-google-oauth20`, `dotenv` (deps) and `cross-env` (dev). Scripts use `cross-env` for Windows; `dotenv/config` loaded in `server/index.ts` and `drizzle.config.ts`.
- `.env.example` added; `.env` gitignored.
- `AUTH_SETUP.md` — setup + testing steps.

## Immediate next steps (in order)

1. **Local env:** copy `.env.example` → `.env`; set `DATABASE_URL` (from Replit Secrets) and `SESSION_SECRET`.
2. `npm install` → `npm run db:push` (adds the new user columns; additive/non-destructive) → `npm run dev`.
3. **Test** `/api/register` then `/api/login` (curl examples in `AUTH_SETUP.md`). Confirm a row appears in `users`.
4. **Build the client auth UI:** React register / login / forgot-password / reset-password screens + a `useAuth` hook calling the endpoints. None exist yet.
5. **Tie data to the user:** `courseProgress`, `completedCourses`, `vocabulary` all default to `userId = 1`. Wire them to the logged-in user (`req.user.id`) and gate write routes with `isAuthenticated`.
6. **Email provider** (Resend or SendGrid — undecided) for password-reset + verification emails. Currently the reset link is only logged to the server console.
7. Delete `server/replitAuth.ts` once the new auth is confirmed working.

## Then — Workstream 3 (Stripe subscription wall)

Add `stripeCustomerId`, `subscriptionStatus`, `trialEndsAt` to `users`. Stripe Checkout in subscription mode, **14-day trial with card required** (much higher trial→paid than no-card). Handle webhooks (`checkout.session.completed`, `customer.subscription.*`, `invoice.*`) as source of truth. Gate content via `isAuthenticated` + subscription status middleware. Add Stripe Customer Portal + dunning. Push annual pricing (~$12.99/mo or ~$89/yr) to make paid acquisition viable.

## Then — Workstream 4 (Google Ads, 6 months)

Search-only, long-tail high-intent keywords; per-theme landing pages; track trial-start AND paid as separate conversions; gate spend on CAC < LTV. Unit economics are tight (education CPCs ~$6) — see the project plan. Claude drafts keywords/ad copy/landing pages and reviews performance weekly; a human owns the Ads account and spend.

## Gotchas / conventions

- **OneDrive:** the project currently lives under OneDrive, which caused git lock + stale-file issues. `git config gc.auto 0` is set. Consider moving to a non-synced path (e.g. `C:/Users/j_and/code/conjugately`).
- **Don't enable redirects early:** keep `REDIRECT_TO_CANONICAL` off and don't deploy the canonical/rebrand changes until conjugately.com is actually serving (see runbook).
- **Existing users:** old Replit-created rows have no usable password and can't log in via email/password — acceptable during transition.
- **GitHub remote:** `origin` = https://github.com/Aptlication/conjugately (private). `main` has the full project + W1 code. The `accounts` branch holds W2 (commit it).
- Secrets (`DATABASE_URL`, etc.) live in `.env` locally and in the host's environment in production — never commit them.
