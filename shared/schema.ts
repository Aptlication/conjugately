import { pgTable, text, serial, integer, boolean, json, varchar, timestamp, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from 'drizzle-orm';

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: json("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - keeping existing structure for now
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  // Add Replit Auth fields while preserving existing structure
  replitUserId: varchar("replit_user_id").unique(), // Replit's actual user ID
  email: varchar("email"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  verb: text("verb").notNull(),
  timeFrame: text("time_frame").notNull(),
  tenseType: text("tense_type").notNull(),
  questions: json("questions").notNull(),
});

export const courseProgress = pgTable("course_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().default(1), // Keep existing integer structure
  courseType: text("course_type").notNull(), // "beginner", "moderate", etc.
  timeFrame: text("time_frame").notNull(), // "Past", "Present", "Future"
  tense: text("tense").notNull(), // "Passé Simple", "Présent", etc.
  currentVerbIndex: integer("current_verb_index").notNull().default(0),
  completedVerbs: json("completed_verbs").notNull().default([]),
  totalScore: integer("total_score").notNull().default(0),
  totalQuestions: integer("total_questions").notNull().default(0),
  isCompleted: boolean("is_completed").notNull().default(false),
  examPassed: boolean("exam_passed").default(false),
  // New fields for unit-based progress tracking
  currentSection: text("current_section").default("units"), // "units" or "finalExam"
  currentUnit: integer("current_unit").default(1), // 1, 2, 3, etc. for unit numbers
  unitVerb: text("unit_verb"), // 'être', 'avoir', etc. the specific verb for current unit
  completedUnits: json("completed_units").default([]), // [{"unit": 1, "verb": "être", "score": 18, "total": 20}, ...]
  unitScores: text("unit_scores").default("{}"), // JSON string: {"unit-1": {"score": 18, "total": 20}, "unit-2": {...}, ...}
  // Legacy part fields for backward compatibility
  currentPart: text("current_part").default("A"), // "A", "B", "C", etc.
  completedParts: json("completed_parts").default([]), // ["section1-A", "section1-B", "finalExam-A"]
  partScores: text("part_scores").default("{}"), // JSON string: {"section1-A": {"score": 35, "total": 40}, ...}
});

export const completedCourses = pgTable("completed_courses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().default(1),
  courseType: text("course_type").notNull(),
  timeFrame: text("time_frame").notNull(),
  tense: text("tense").notNull(),
  totalScore: integer("total_score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  examScore: integer("exam_score"),
  examPassed: boolean("exam_passed").notNull(),
});

export const insertQuizSchema = createInsertSchema(quizzes).pick({
  verb: true,
  timeFrame: true,
  tenseType: true,
  questions: true,
});

export const insertCourseProgressSchema = createInsertSchema(courseProgress).omit({
  id: true,
});

export const insertCompletedCourseSchema = createInsertSchema(completedCourses).omit({
  id: true,
});

export const quizRequestSchema = z.object({
  verb: z.string().min(1, "French verb is required"),
  timeFrame: z.enum(["past", "present", "future"], { required_error: "Time frame is required" }),
  tenseType: z.string().min(1, "Tense type is required"),
  difficulty: z.string().optional(),
  isExam: z.boolean().optional(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Quiz = typeof quizzes.$inferSelect;
export type QuizRequest = z.infer<typeof quizRequestSchema>;
export type CourseProgress = typeof courseProgress.$inferSelect;
export type InsertCourseProgress = z.infer<typeof insertCourseProgressSchema>;
export type CompletedCourse = typeof completedCourses.$inferSelect;
export type InsertCompletedCourse = z.infer<typeof insertCompletedCourseSchema>;

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
