import {
  users,
  type User,
  type UpsertUser,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gt } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // Lookups
  getUser(id: number): Promise<User | undefined>;
  getUserById(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByGoogleId(googleId: string): Promise<User | undefined>;
  getUserByReplitId(replitUserId: string): Promise<User | undefined>;
  getUserByResetToken(token: string): Promise<User | undefined>;
  // Account creation
  createLocalUser(data: { email: string; passwordHash: string; firstName?: string; lastName?: string }): Promise<User>;
  createGoogleUser(data: { googleId: string; email: string; firstName?: string; lastName?: string; profileImageUrl?: string }): Promise<User>;
  // Mutations
  setResetToken(userId: number, token: string, expiry: Date): Promise<void>;
  updatePassword(userId: number, passwordHash: string): Promise<void>;
  markEmailVerified(userId: number): Promise<void>;
  // Legacy (Replit) — retained for backward compatibility
  upsertUser(user: Partial<UpsertUser>): Promise<User>;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserById(id: number): Promise<User | undefined> {
    return this.getUser(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, normalizeEmail(email)));
    return user;
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.googleId, googleId));
    return user;
  }

  async getUserByReplitId(replitUserId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.replitUserId, replitUserId));
    return user;
  }

  async getUserByResetToken(token: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(and(eq(users.resetToken, token), gt(users.resetTokenExpiry, new Date())));
    return user;
  }

  async createLocalUser(data: {
    email: string;
    passwordHash: string;
    firstName?: string;
    lastName?: string;
  }): Promise<User> {
    const email = normalizeEmail(data.email);
    const [user] = await db
      .insert(users)
      .values({
        username: email,
        email,
        password: data.passwordHash,
        authProvider: "local",
        emailVerified: false,
        firstName: data.firstName,
        lastName: data.lastName,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return user;
  }

  async createGoogleUser(data: {
    googleId: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string;
  }): Promise<User> {
    const email = normalizeEmail(data.email);
    const [user] = await db
      .insert(users)
      .values({
        username: email,
        email,
        googleId: data.googleId,
        authProvider: "google",
        emailVerified: true, // Google has already verified the address
        firstName: data.firstName,
        lastName: data.lastName,
        profileImageUrl: data.profileImageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return user;
  }

  async setResetToken(userId: number, token: string, expiry: Date): Promise<void> {
    await db
      .update(users)
      .set({ resetToken: token, resetTokenExpiry: expiry, updatedAt: new Date() })
      .where(eq(users.id, userId));
  }

  async updatePassword(userId: number, passwordHash: string): Promise<void> {
    await db
      .update(users)
      .set({ password: passwordHash, resetToken: null, resetTokenExpiry: null, updatedAt: new Date() })
      .where(eq(users.id, userId));
  }

  async markEmailVerified(userId: number): Promise<void> {
    await db
      .update(users)
      .set({ emailVerified: true, updatedAt: new Date() })
      .where(eq(users.id, userId));
  }

  // ---- Legacy Replit upsert (kept so existing imports don't break) ----
  async upsertUser(userData: Partial<UpsertUser>): Promise<User> {
    if (userData.replitUserId) {
      const existing = await this.getUserByReplitId(userData.replitUserId);
      if (existing) {
        const [user] = await db
          .update(users)
          .set({ ...userData, updatedAt: new Date() })
          .where(eq(users.id, existing.id))
          .returning();
        return user;
      }
    }
    const [user] = await db
      .insert(users)
      .values({
        username: userData.email || `user_${Date.now()}`,
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return user;
  }
}

export const storage = new DatabaseStorage();
