# Parallel-Run Protocol — conjugately.com (primary) + frenchverbmaster.com (fallback)

Decision date: 2026-07-03. This document is the standing protocol for running both sites side by side. It stays in force until the final cutover (last section). If you are about to change branding, auth, hosting, DNS, or the database schema — read this first.

## The arrangement

**conjugately.com is the primary site and the future.** All new development happens here: the rebrand, the auth replacement, the React Native app, subscriptions. It deploys from `main` to the new host (Railway/Render — see the App Store upgrade report).

**frenchverbmaster.com is the frozen fallback.** It keeps serving the original French Verb Master site from the existing Replit deployment, pinned to the `fvm-legacy` branch. It gets no new features — critical fixes only.

**Redirects stay OFF for the whole parallel-run period.** `REDIRECT_TO_CANONICAL` must remain unset/false on the FVM deployment. The moment it is set `true`, frenchverbmaster.com stops being a fallback and 301s everything to conjugately.com. That is the cutover switch; flipping it is a deliberate decision, not a config tidy-up.

## Branch map

| Branch | Purpose | Rules |
|---|---|---|
| `main` | Conjugately development | Normal development |
| `fvm-legacy` | Frozen French Verb Master fallback, created at commit `5acbd7a` (the last commit before the FVM→Conjugately rebrand) | Never rebase, never delete, never merge `main` into it. Critical hotfixes only, via cherry-pick |

In GitHub → Settings → Branches, add a protection rule for `fvm-legacy` (block force-push and deletion).

## Deployment map

| Domain | Serves | Branch | Host | Env flags |
|---|---|---|---|---|
| frenchverbmaster.com | Old FVM site (fallback) | `fvm-legacy` | Replit Deployments (existing, untouched) | `REDIRECT_TO_CANONICAL` unset |
| conjugately.com | New Conjugately site | `main` | Railway/Render (new) | `CANONICAL_HOST=conjugately.com`, `REDIRECT_TO_CANONICAL` unset |

Set the Replit deployment to deploy from `fvm-legacy`, not `main` — otherwise the next Replit deploy would push Conjugately branding onto the FVM domain.

## Shared database — the one coupling that can break the fallback

Both deployments use the **same Neon Postgres database**, so user progress is identical on either domain. This means every schema change on `main` must remain compatible with the legacy code still running against it.

Schema rules while FVM is live: additive changes only. New tables and new nullable (or defaulted) columns are fine. **Never** drop or rename a table or column the legacy branch reads, and never change a column's type. Check `fvm-legacy`'s `shared/schema.ts` before any `drizzle-kit push`. If a breaking change becomes unavoidable, that is the trigger to do the final cutover first.

The auth replacement (Replit Auth → email/password + Apple/Google) must follow the same rule: keep the `sessions` and `users` tables intact for legacy login; add new tables (`refresh_tokens`, etc.) alongside.

## Hotfix procedure for the fallback

Only for breakage (site down, login broken, data corruption) — not improvements.

1. Fix on `main` first if the bug exists there too.
2. `git checkout fvm-legacy && git cherry-pick <fix-commit>` (or write a minimal fix directly if `main` has diverged too far).
3. Push, redeploy the Replit deployment, verify frenchverbmaster.com.

## Standing checklist (current status)

- [x] `fvm-legacy` branch created at `5acbd7a` and pushed
- [ ] Rebrand + protocol commits pushed to `origin/main`
- [ ] `fvm-legacy` branch protection enabled on GitHub
- [ ] Replit deployment repointed to `fvm-legacy`
- [ ] Feature-graphic PNGs regenerated from the rebranded SVGs (SVGs are done; PNGs still show old branding)
- [ ] conjugately.com deployed from `main` on new host (blocked on auth replacement — the server currently won't boot without Replit env vars)
- [ ] Both domains verified serving correct branding
- [ ] DNS: conjugately.com → new host; frenchverbmaster.com → Replit (unchanged)

## Final cutover (ends the parallel run)

When Conjugately is stable and you no longer want the fallback: follow `DOMAIN_MIGRATION_RUNBOOK.md` from Step 5 — set `REDIRECT_TO_CANONICAL=true` on the FVM deployment, verify the 301s, do the Google Search Console Change of Address, keep the frenchverbmaster.com registration for 6–12 months, then decommission the Replit deployment and archive `fvm-legacy` (tag it, don't delete it).

## Rollback

At any point before the final cutover, the fallback is instant: frenchverbmaster.com is already serving independently. If conjugately.com breaks, users can simply use the old domain; nothing needs redeploying. After cutover, rollback = set `REDIRECT_TO_CANONICAL=false` and redeploy the FVM deployment.
