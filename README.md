# Conjugately

French verb conjugation practice with personalized quizzes and optional mini-courses, powered by AI. Conjugately is the rebrand of FrenchVerbMaster.

## Status

Active development. The site is migrating from frenchverbmaster.com to conjugately.com, after which it gains user accounts and a Stripe subscription wall with a 14 day free trial.

## Tech stack

Server is Express with TypeScript, run via tsx. Client is React with Vite. Data is stored in Neon Postgres through the Drizzle ORM. Authentication is moving from Replit Auth to email and password plus Google sign in.

## Roadmap

First, the domain migration from frenchverbmaster.com to conjugately.com, currently in progress. Second, user accounts and authentication. Third, a Stripe subscription wall, 14 day trial then monthly. Fourth, a six month Google Ads acquisition campaign.

## Local development

Run `npm install`, then `npm run dev` to serve the API and client on port 5000. For production, run `npm run build` followed by `npm run start`.

See `DOMAIN_MIGRATION_RUNBOOK.md` for the domain cutover procedure.
