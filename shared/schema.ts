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
  timeFrame: text("time_frame").notNull(),
  tenseType: text("tense_type").notNull(),
  questions: json("questions").notNull(),
});

export const courseProgress = pgTable("course_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().default(1), // Default user for now
  courseType: text("course_type").notNull(), // "beginner", "moderate", etc.
  timeFrame: text("time_frame").notNull(), // "Past", "Present", "Future"
  tense: text("tense").notNull(), // "Passé Simple", "Présent", etc.
  currentVerbIndex: integer("current_verb_index").notNull().default(0),
  completedVerbs: json("completed_verbs").notNull().default([]),
  totalScore: integer("total_score").notNull().default(0),
  totalQuestions: integer("total_questions").notNull().default(0),
  isCompleted: boolean("is_completed").notNull().default(false),
  examPassed: boolean("exam_passed").default(false),
  // New fields for part-based progress tracking
  currentSection: text("current_section").default("section1"), // "section1" or "finalExam"
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

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
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
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
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
