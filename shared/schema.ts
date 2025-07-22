import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  verb: text("verb").notNull(),
  tense: text("tense").notNull(),
  questions: json("questions").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).pick({
  verb: true,
  tense: true,
  questions: true,
});

export const quizRequestSchema = z.object({
  verb: z.string().min(1, "French verb is required"),
  timeFrame: z.enum(["past", "present", "future"], { required_error: "Time frame is required" }),
  tenseType: z.string().min(1, "Tense type is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Quiz = typeof quizzes.$inferSelect;
export type QuizRequest = z.infer<typeof quizRequestSchema>;

export interface QuizQuestion {
  question: string;
  hint: string;
  answerOptions: {
    text: string;
    rationale: string;
    isCorrect: boolean;
  }[];
}

export interface GeneratedQuiz {
  questions: QuizQuestion[];
}
