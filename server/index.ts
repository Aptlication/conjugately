import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { canonicalHost } from "./canonicalHost";

const app = express();

// Trust the platform proxy so req.protocol / X-Forwarded-* are read correctly.
app.set("trust proxy", true);

// Canonical-host 301 redirects must run before anything else. Inert until
// REDIRECT_TO_CANONICAL=true (see server/canonicalHost.ts).
app.use(canonicalHost);

// CORS for the RN-web staging preview only (native apps are unaffected).
const CORS_ALLOWED = new Set([
  "https://conjugately-preview.onrender.com",
  "https://preview.conjugately.com",
]);
app.use((req, res, next) => {
  const origin = req.headers.origin as string | undefined;
  if (origin && CORS_ALLOWED.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });

    // Do NOT rethrow. This handler runs after the response has been sent, so a
    // rethrow escapes into the async context, Node treats it as an uncaught
    // exception and the process exits. That is a crash-on-any-500: locally it
    // killed the dev server on the first request that touched an unreachable
    // database, and in production it takes the Render instance down until it
    // restarts. Log it instead.
    console.error(`[error] ${status} ${message}`, err?.stack ?? err);
  });

  // Last line of defence. An unhandled rejection anywhere else should be loud
  // in the log, not fatal to a server that is otherwise serving fine.
  process.on("unhandledRejection", (reason) => {
    console.error("[unhandledRejection]", reason);
  });
  process.on("uncaughtException", (error) => {
    console.error("[uncaughtException]", error);
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  const nodeEnv = process.env.NODE_ENV || app.get("env");
  if (nodeEnv === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    // reusePort needs SO_REUSEPORT, which Windows does not have: setting it
    // there throws ENOTSUP and the dev server never starts at all. It was only
    // ever here for the old Replit environment, and does nothing for a
    // single-process server, so it is applied on Linux only. Render is Linux,
    // so production behaviour is unchanged.
    ...(process.platform === "linux" ? { reusePort: true } : {}),
  }, () => {
    log(`serving on port ${port}`);
  });
})();
