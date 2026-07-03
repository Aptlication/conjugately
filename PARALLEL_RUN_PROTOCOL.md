# Domain & Deployment Protocol — conjugately.com live, frenchverbmaster.com dormant

Last updated: 2026-07-03 (supersedes the original parallel-run plan: Replit hosting was deactivated to avoid the expense, so the old site is offline rather than a live fallback). Read this before changing branding, auth, hosting, DNS, or the database schema.

## The arrangement

**conjugately.com is the primary site and the only live deployment.** It deploys from `main` to Render (free tier), with the database on a Neon free-tier project. All new development happens here: auth replacement, React Native app, subscriptions.

**frenchverbmaster.com is dormant.** The domain stays registered at Namecheap but points nowhere. The complete pre-rebrand site is preserved on the `fvm-legacy` branch. Resurrection, if there is ever a fatal issue with Conjugately: deploy `fvm-legacy` to any Node host (it needs Replit Auth env vars or the guest-mode patch cherry-picked), point frenchverbmaster.com's DNS at it. Do not let the domain registration lapse.

**Guest mode is in effect.** The server boots without any Replit env vars (`server/replitAuth.ts` → `authEnabled = false`): every quiz feature works anonymously, `/api/auth/user` returns 401, `/api/login` no-ops to `/`, vocabulary persists in localStorage. Real accounts arrive with the auth replacement (email/password + Google + Sign in with Apple — see the App Store upgrade report §4). The visible Login button is a known cosmetic leftover until then.

## Branch map

| Branch | Purpose | Rules |
|---|---|---|
| `main` | Conjugately development; auto-deploys to Render | Normal development |
| `fvm-legacy` | Frozen French Verb Master site, created at `5acbd7a` (last pre-rebrand commit) | Never rebase, never delete, never merge `main` into it |

In GitHub → Settings → Branches, keep a protection rule on `fvm-legacy` (block force-push and deletion).

## Deployment map

| Domain | Serves | Branch | Host | Env vars |
|---|---|---|---|---|
| conjugately.com | Conjugately (guest mode) | `main` | Render free tier | `DATABASE_URL` (Neon), `CANONICAL_HOST=conjugately.com`, `GEMINI_API_KEY`, `REDIRECT_TO_CANONICAL` unset |
| frenchverbmaster.com | Nothing (dormant) | — | — | — |

## Database

Neon free tier, connected via `DATABASE_URL`. The old Replit-provisioned database is assumed gone; the Neon project starts fresh (`npx drizzle-kit push` once to create tables). With FVM offline, there is no shared-database constraint — but if `fvm-legacy` is ever resurrected against this same database, additive-only schema rules apply from that moment (no dropping/renaming columns the legacy code reads).

## Standing checklist (current status)

- [x] Rebrand + protocol committed and pushed to `origin/main`
- [x] `fvm-legacy` branch created at `5acbd7a` and pushed
- [x] Guest-mode patch (server boots without Replit env vars)
- [ ] `fvm-legacy` branch protection enabled on GitHub
- [ ] Neon project created; `DATABASE_URL` set on Render; `npx drizzle-kit push` run once
- [ ] Render web service created from GitHub `main` (build `npm run build`, start `npm run start`)
- [ ] conjugately.com + www linked on Render; Namecheap DNS records added
- [ ] conjugately.com verified: HTTPS certificate, `/api/health`, `/robots.txt`, `/sitemap.xml`
- [ ] Feature-graphic PNGs regenerated from the rebranded SVGs (SVGs done; PNG pixels still old brand)
- [ ] Google Search Console: verify conjugately.com property, submit sitemap

## Redirecting the old domain (optional, later)

When you want frenchverbmaster.com's residual traffic and SEO value: point its DNS at the same Render service (add it as a custom domain there), set `REDIRECT_TO_CANONICAL=true`, and verify old URLs 301 to `https://conjugately.com/...`. Then do Google Search Console's Change of Address. Until then, the old domain simply resolves nowhere and `REDIRECT_TO_CANONICAL` stays unset.

## Rollback / resurrection

If conjugately.com has a fatal issue: fix forward on Render if possible (redeploys are one click, and Render keeps previous deploys for instant rollback). Catastrophic case: deploy `fvm-legacy` per "The arrangement" above and repoint frenchverbmaster.com — users get the old site while Conjugately is repaired. Tag `fvm-legacy` (e.g. `v1-fvm-final`) rather than ever deleting it.
