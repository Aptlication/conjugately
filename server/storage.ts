import {
  users,
  type User,
  type UpsertUser,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations for Replit Auth
  getUser(id: number): Promise<User | undefined>;
  getUserByReplitId(replitUserId: string): Promise<User | undefined>;
  upsertUser(user: Partial<UpsertUser>): Promise<User>;
}

export class DatabaseStorage implements IStorage {
  // User operations for hybrid auth system
  
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByReplitId(replitUserId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.replitUserId, replitUserId));
    return user;
  }

  async upsertUser(userData: Partial<UpsertUser>): Promise<User> {
    if (userData.replitUserId) {
      // Try to find existing user by Replit ID
      const existing = await this.getUserByReplitId(userData.replitUserId);
      if (existing) {
        // Update existing user
        const [user] = await db
          .update(users)
          .set({
            ...userData,
            updatedAt: new Date(),
          })
          .where(eq(users.id, existing.id))
          .returning();
        return user;
      }
    }
    
    // Create new user
    const [user] = await db
      .insert(users)
      .values({
        username: userData.email || `user_${Date.now()}`,
        password: 'replit_auth', // Placeholder for Replit auth users
        ...userData,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();
    return user;
  }
}

export const storage = new DatabaseStorage();