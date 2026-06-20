import type { Request, Response, NextFunction } from "express";

/**
 * Canonical-host redirect middleware (SEO-safe domain migration).
 *
 * Sends permanent (301) redirects from the old domain, the `www.` variant,
 * and plain http to the single canonical host (https, non-www). Path and
 * query string are preserved exactly, which is what Google's Change of
 * Address process expects.
 *
 * SAFETY: redirects only fire when REDIRECT_TO_CANONICAL === "true". Until
 * you flip that flag (after conjugately.com is verified live), this middleware
 * is inert and the live site keeps serving normally. This prevents the old
 * domain from 301-ing to a not-yet-live new domain and taking the site down.
 *
 * Env:
 *   CANONICAL_HOST          canonical bare host (default "conjugately.com")
 *   REDIRECT_TO_CANONICAL   "true" to activate redirects (default off)
 */

const CANONICAL_HOST = (process.env.CANONICAL_HOST || "conjugately.com").toLowerCase();
const REDIRECT_ENABLED = process.env.REDIRECT_TO_CANONICAL === "true";

// Hosts we must never redirect: local dev and platform preview/internal domains.
const SAFE_HOST_PATTERNS: RegExp[] = [
  /^localhost(:\d+)?$/,
  /^127\.0\.0\.1(:\d+)?$/,
  /^0\.0\.0\.0(:\d+)?$/,
  /\.replit\.dev$/,
  /\.repl\.co$/,
  /\.replit\.app$/,
  /\.railway\.app$/,
  /\.up\.railway\.app$/,
];

function requestHost(req: Request): string {
  const raw =
    (req.headers["x-forwarded-host"] as string | undefined) ||
    req.headers.host ||
    "";
  // X-Forwarded-Host can be a comma-separated list; take the first.
  return raw.split(",")[0].trim().toLowerCase();
}

export function canonicalHost(req: Request, res: Response, next: NextFunction) {
  // Never interfere with health checks (load balancers hit these by IP).
  if (req.path === "/api/health") return next();

  if (!REDIRECT_ENABLED) return next();

  const host = requestHost(req);
  if (!host) return next();
  if (SAFE_HOST_PATTERNS.some((re) => re.test(host))) return next();

  const proto =
    (req.headers["x-forwarded-proto"] as string | undefined) ||
    req.protocol ||
    "https";

  const bareHost = host.replace(/^www\./, "");
  const isCanonical = bareHost === CANONICAL_HOST && !host.startsWith("www.") && proto === "https";

  if (isCanonical) return next();

  // Permanent redirect to the canonical origin, preserving the full path+query.
  const target = `https://${CANONICAL_HOST}${req.originalUrl}`;
  return res.redirect(301, target);
}
