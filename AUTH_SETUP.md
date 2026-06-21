# Workstream 2 — Accounts & Authentication (setup)

Last updated: 2026-06-20

This replaces Replit Auth with real accounts: email/password (Passport local) plus Google sign-in, with password reset. Built on the Passport + express-session + Postgres session stack you already had.

> Build and test this on a branch. Don't deploy until you've verified login locally. Nothing here changes the live site until you deploy.

## What changed

| File | Change |
|------|--------|
| `shared/schema.ts` | `users` table: added `emailVerified`, `authProvider`, `googleId`, `resetToken`, `resetTokenExpiry`; relaxed `username`/`password` to nullable (Google accounts have no password). `password` now stores a bcrypt hash. |
| `server/auth.ts` | New. Passport local + Google strategies, session config, and routes: register, login, logout, me, password reset, Google. |
| `server/storage.ts` | Added `getUserByEmail`, `getUserByGoogleId`, `getUserByResetToken`, `createLocalUser`, `createGoogleUser`, `setResetToken`, `updatePassword`, `markEmailVerified`. |
| `server/routes.ts` | Imports auth from `./auth` instead of `./replitAuth`; removed the old Replit `/api/auth/user` (the new module defines it). |
| `package.json` | Added `passport-google-oauth20`, `bcryptjs`, and their `@types`. (`passport`/`passport-local` were already present.) |

`server/replitAuth.ts` is left in place but no longer imported. Delete it once the new auth is confirmed working.

## Run it (in the project folder, on a branch)

```bash
git checkout -b accounts
npm install            # pulls bcryptjs + passport-google-oauth20
npm run db:push        # applies the new user columns to Neon
npm run dev            # starts on port 5000
```

`db:push` will add columns and relax the `username`/`password` NOT NULL constraints. Those are non-destructive; if drizzle-kit prompts, review and accept. Your existing rows are preserved.

### Required environment variables

- `DATABASE_URL` — already set (Neon).
- `SESSION_SECRET` — set a long random string. Required in production; in dev it falls back to an insecure default with a warning.

### Test the flow

```bash
# Register
curl -i -c cookies.txt -X POST localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"supersecret"}'

# Who am I (uses the cookie from register)
curl -i -b cookies.txt localhost:5000/api/auth/user

# Login
curl -i -c cookies.txt -X POST localhost:5000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"you@example.com","password":"supersecret"}'
```

## API endpoints

- `POST /api/register` — `{ email, password, firstName?, lastName? }` → creates account, logs in.
- `POST /api/login` — `{ email, password }`.
- `POST /api/logout`.
- `GET  /api/auth/user` — current user (401 if not logged in). Password/reset fields are stripped.
- `POST /api/forgot-password` — `{ email }`. Generates a reset token (1-hour expiry).
- `POST /api/reset-password` — `{ token, password }`.
- `GET  /api/auth/google` and `/api/auth/google/callback` — return 404 until Google creds are set.

## Enabling Google sign-in (when you're ready)

1. Google Cloud Console → create an OAuth 2.0 Client ID (type: Web application).
2. Authorized redirect URI: `https://conjugately.com/api/auth/google/callback` (and `http://localhost:5000/api/auth/google/callback` for local testing).
3. Set env vars on your host: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_CALLBACK_URL=https://conjugately.com/api/auth/google/callback`.

The Google strategy is inert until those three are present, so it can't break anything before then.

## Deferred to the next slices (not built yet)

1. **Email delivery.** Password-reset (and future email-verification) currently log the reset link to the server console instead of emailing it. Pick a provider (Resend or SendGrid are simplest) and we'll wire the actual send. This is the one external dependency blocking a complete reset flow.
2. **Client UI.** The React app still has no login/register/reset screens or a `useAuth` hook calling these endpoints — that's the next build step.
3. **Per-user data.** Quiz progress, completed courses, and vocabulary currently default to `userId = 1` (everyone shares one record). Tying them to the logged-in user is required before launch and pairs naturally with this workstream.

## Why this matters for Workstream 3

The Stripe paywall gates content using `isAuthenticated` plus the user's subscription status. That requires exactly this: real accounts with a stable `users.id`. With this in place, W3 adds `stripeCustomerId`, `subscriptionStatus`, and `trialEndsAt` to the user and checks them in middleware.
