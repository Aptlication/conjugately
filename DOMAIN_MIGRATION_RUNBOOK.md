# Domain Migration Runbook — frenchverbmaster.com → conjugately.com

Last updated: 2026-06-20

This is the exact, ordered procedure to move the live site to **conjugately.com** without losing search rankings. The code side is already done (see "What's already in the code" below); the rest is account/DNS work that only you can perform because it needs your Namecheap, host, and Google logins.

> **One safety rule above all:** do not point the old domain's redirect ON until the new domain is verified serving the app over HTTPS. The code is built so redirects stay OFF until you set an environment variable. Follow the order below and there is no downtime.

---

## What's already in the code (branch: `domain-migration`)

| File | Change |
|------|--------|
| `server/canonicalHost.ts` | New. 301-redirects old domain, `www.`, and `http` → `https://conjugately.com`, preserving path + query. **Inert until `REDIRECT_TO_CANONICAL=true`.** |
| `server/index.ts` | Wires the redirect in as the first middleware; sets `trust proxy`. |
| `server/routes.ts` | Adds `/robots.txt` and `/sitemap.xml`, both pointing at the canonical domain via `CANONICAL_HOST`. |
| `client/index.html` | Rebranded title/description to Conjugately; added `<link rel="canonical">`, Open Graph + Twitter tags; removed the Replit dev-banner script. |

Two environment variables control everything:

- `CANONICAL_HOST` — set to `conjugately.com` (default already).
- `REDIRECT_TO_CANONICAL` — leave **unset/false** until Step 5, then set `true`.

---

## Step 0 — Confirm where the app actually runs

The domain is managed at **Namecheap** (registrar + DNS). The app itself is almost certainly deployed on **Replit Deployments** (the repo's `.replit` file has `deploymentTarget = "autoscale"` and Replit Auth). Confirm this before touching DNS, because the DNS records differ by host. The DNS step (Step 3) covers the two likely cases.

## Step 1 — Buy / secure conjugately.com

In Namecheap, register **conjugately.com** if you haven't. (Note: the project folder is currently spelled "Congugately" — the live brand and domain are **Conjugately**. Keep them consistent.)

## Step 2 — Add conjugately.com as a custom domain on your host

**If Replit Deployments:** open your Deployment → Settings → Domains → "Link a domain" → enter `conjugately.com`. Replit shows the DNS records to create (an A record + a TXT verification record, or a CNAME). Also add `www.conjugately.com`.

**If Railway:** project → service → Settings → Networking → Custom Domain → add `conjugately.com`; Railway returns a CNAME target like `xxx.up.railway.app`.

Wait for the host to issue the TLS certificate (automatic, can take a few minutes to an hour).

## Step 3 — Point Namecheap DNS at the host

In Namecheap → Domain List → conjugately.com → **Advanced DNS**, add the records your host gave you in Step 2:

- **Replit:** add the **A record** (host `@`) to the IP Replit provides, the **TXT** verification record, and a **CNAME** for `www` → the target Replit shows.
- **Railway:** add a **CNAME** (host `@` or `www`) → `xxx.up.railway.app`. For a root/apex domain, use Namecheap's ALIAS/CNAME-flattening if A records aren't provided.

Remove any old parking-page records. DNS propagation is usually minutes but can take up to a few hours.

## Step 4 — Verify the new domain serves the app

Before touching redirects, confirm in a browser:

- `https://conjugately.com` loads the app over HTTPS (valid certificate, no warning).
- `https://conjugately.com/api/health` returns the health JSON.
- `https://conjugately.com/robots.txt` and `/sitemap.xml` render with conjugately.com URLs.

Do not proceed until all of these pass. At this point both domains serve the app; nothing is broken.

## Step 5 — Turn on the 301 redirects

Set the environment variable on your host and redeploy/restart:

```
CANONICAL_HOST=conjugately.com
REDIRECT_TO_CANONICAL=true
```

Now verify the redirects (a 301 is what you want, not 302):

```bash
curl -sI http://frenchverbmaster.com/        | grep -i -E "HTTP|location"
curl -sI https://www.frenchverbmaster.com/    | grep -i -E "HTTP|location"
curl -sI https://frenchverbmaster.com/frenchverb?x=1 | grep -i -E "HTTP|location"
curl -sI https://www.conjugately.com/         | grep -i -E "HTTP|location"
```

Each old/`www`/`http` URL should return `301` with `Location: https://conjugately.com/<same path + query>`. The canonical `https://conjugately.com/...` should return `200`.

> Keep frenchverbmaster.com registered and pointed at the app for at least **6–12 months** so these redirects keep firing. Don't let it expire — that throws away the redirected SEO value.

## Step 6 — Google Search Console: Change of Address

1. In GSC, add and **verify both** properties: frenchverbmaster.com and conjugately.com (DNS TXT verification via Namecheap is easiest).
2. Old property → Settings → **Change of Address** → select conjugately.com → submit. This forwards ranking signals and prioritizes the new site for ~180 days.
3. Submit `https://conjugately.com/sitemap.xml` under the new property.

## Step 7 — Update everything else that hard-codes the old domain

- Replit Auth / OAuth callback URLs and allowed domains (the login flow will break on the new domain until its callback URL is whitelisted — test login on conjugately.com).
- Google Analytics / Tag Manager property URL.
- Stripe settings later (when billing is added).
- Social profiles, Google Business, any backlinks you control, email signatures.
- Bing Webmaster Tools has its own Site Move tool — repeat Step 6 there if you use Bing.

## Step 8 — Monitor for 60+ days

- GSC Coverage/Indexing on both properties: new URLs should climb, old ones fall.
- GSC Performance: total clicks/impressions should stay roughly flat (a small temporary dip is normal).
- Crawl errors / 404s on the new domain — fix any broken redirect mappings.

---

## Rollback

If something goes wrong after Step 5, set `REDIRECT_TO_CANONICAL=false` and redeploy. Redirects stop immediately; both domains serve the app directly again. No data is affected.

## Known follow-up (not part of migration)

Login today uses **Replit Auth** (`server/replitAuth.ts`), which is tied to Replit and won't work off-Replit. The "user accounts" workstream will replace it with email/password + Google sign-in. The Replit Auth callback URL must include conjugately.com for login to keep working in the meantime.
