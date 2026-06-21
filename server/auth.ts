import type { Express, RequestHandler } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { z } from "zod";
import { storage } from "./storage";
import type { User } from "@shared/schema";

const BCRYPT_ROUNDS = 12;
const isProd = (process.env.NODE_ENV || "development") === "production";

// ---------- session ----------
export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET || "dev-insecure-secret-change-me",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // secure cookies require HTTPS; disable in local dev so login works there
      secure: isProd,
      sameSite: "lax",
      maxAge: sessionTtl,
    },
  });
}

// ---------- helpers ----------
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}

export async function verifyPassword(plain: string, hash: string | null): Promise<boolean> {
  if (!hash) return false;
  return bcrypt.compare(plain, hash);
}

/** Strip sensitive fields before sending a user to the client. */
export function sanitizeUser(user: User) {
  const { password, resetToken, resetTokenExpiry, ...safe } = user as any;
  return safe;
}

const registerSchema = z.object({
  email: z.string().email("A valid email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().trim().optional(),
  lastName: z.string().trim().optional(),
});

// ---------- setup ----------
export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  // Local email/password strategy
  passport.use(
    new LocalStrategy({ usernameField: "email", passwordField: "password" }, async (email, password, done) => {
      try {
        const user = await storage.getUserByEmail(email);
        if (!user || !(await verifyPassword(password, user.password))) {
          return done(null, false, { message: "Invalid email or password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    })
  );

  // Google OAuth strategy — only enabled when credentials are configured
  const googleEnabled = !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  if (googleEnabled) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          callbackURL: process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback",
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value;
            let user = await storage.getUserByGoogleId(profile.id);
            if (!user && email) {
              // Link to an existing local account with the same email, if any
              user = await storage.getUserByEmail(email);
            }
            if (!user) {
              if (!email) return done(new Error("Google account has no email"));
              user = await storage.createGoogleUser({
                googleId: profile.id,
                email,
                firstName: profile.name?.givenName,
                lastName: profile.name?.familyName,
                profileImageUrl: profile.photos?.[0]?.value,
              });
            }
            return done(null, user);
          } catch (err) {
            return done(err as Error);
          }
        }
      )
    );
  }

  passport.serializeUser((user: Express.User, cb) => cb(null, (user as User).id));
  passport.deserializeUser(async (id: number, cb) => {
    try {
      const user = await storage.getUser(id);
      cb(null, user || false);
    } catch (err) {
      cb(err as Error);
    }
  });

  // ---------- routes ----------
  app.post("/api/register", async (req, res, next) => {
    try {
      const { email, password, firstName, lastName } = registerSchema.parse(req.body);
      const existing = await storage.getUserByEmail(email);
      if (existing) {
        return res.status(409).json({ message: "An account with that email already exists" });
      }
      const passwordHash = await hashPassword(password);
      const user = await storage.createLocalUser({ email, passwordHash, firstName, lastName });
      // TODO (next slice): send verification email here.
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(sanitizeUser(user));
      });
    } catch (err: any) {
      if (err?.name === "ZodError") {
        return res.status(400).json({ message: "Invalid input", details: err.errors });
      }
      next(err);
    }
  });

  app.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err: any, user: User | false, info: any) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info?.message || "Invalid email or password" });
      req.login(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        res.json(sanitizeUser(user));
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.json({ ok: true });
      });
    });
  });

  app.get("/api/auth/user", (req, res) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    res.json(sanitizeUser(req.user as User));
  });

  // Password reset — token generated and stored; email delivery is the next slice.
  app.post("/api/forgot-password", async (req, res, next) => {
    try {
      const email = z.string().email().parse(req.body?.email);
      const user = await storage.getUserByEmail(email);
      // Always respond the same way to avoid leaking which emails exist.
      if (user) {
        const token = crypto.randomBytes(32).toString("hex");
        const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await storage.setResetToken(user.id, token, expiry);
        const link = `${req.protocol}://${req.get("host")}/reset-password?token=${token}`;
        // Until an email provider is wired up, log the link server-side.
        console.log(`[password-reset] ${email} -> ${link}`);
      }
      res.json({ ok: true, message: "If that email exists, a reset link has been sent." });
    } catch (err: any) {
      if (err?.name === "ZodError") return res.status(400).json({ message: "Invalid email" });
      next(err);
    }
  });

  app.post("/api/reset-password", async (req, res, next) => {
    try {
      const schema = z.object({ token: z.string().min(1), password: z.string().min(8) });
      const { token, password } = schema.parse(req.body);
      const user = await storage.getUserByResetToken(token);
      if (!user) return res.status(400).json({ message: "Invalid or expired reset token" });
      await storage.updatePassword(user.id, await hashPassword(password));
      res.json({ ok: true, message: "Password updated. You can now log in." });
    } catch (err: any) {
      if (err?.name === "ZodError") return res.status(400).json({ message: "Invalid input", details: err.errors });
      next(err);
    }
  });

  // Google routes (no-op-safe: return 404 when Google isn't configured)
  app.get("/api/auth/google", (req, res, next) => {
    if (!googleEnabled) return res.status(404).json({ message: "Google sign-in is not configured" });
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
  });

  app.get("/api/auth/google/callback", (req, res, next) => {
    if (!googleEnabled) return res.status(404).json({ message: "Google sign-in is not configured" });
    passport.authenticate("google", {
      successReturnToOrRedirect: "/",
      failureRedirect: "/login",
    })(req, res, next);
  });
}

// ---------- middleware ----------
export const isAuthenticated: RequestHandler = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
};
