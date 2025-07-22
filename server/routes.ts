import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { quizRequestSchema } from "@shared/schema";
import { generateFrenchVerbQuiz } from "./services/gemini";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate French verb quiz
  app.post("/api/generate-quiz", async (req, res, next) => {
    try {
      const { verb, timeFrame, tenseType } = quizRequestSchema.parse(req.body);
      
      const quiz = await generateFrenchVerbQuiz(verb, timeFrame, tenseType);
      
      // Store the quiz in database
      const storedQuiz = await storage.createQuiz({
        verb,
        tense: `${timeFrame}-${tenseType}`,
        questions: quiz.questions
      });
      
      res.json({
        success: true,
        quiz: {
          id: storedQuiz.id,
          verb: storedQuiz.verb,
          tense: storedQuiz.tense,
          questions: storedQuiz.questions
        }
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: "Invalid input",
          details: error.errors
        });
      }
      
      console.error("Quiz generation error:", error);
      res.status(500).json({
        success: false,
        error: (error as Error).message || "Failed to generate quiz"
      });
    }
  });

  // Get quiz by ID
  app.get("/api/quiz/:id", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      const quiz = await storage.getQuiz(id);
      
      if (!quiz) {
        return res.status(404).json({
          success: false,
          error: "Quiz not found"
        });
      }
      
      res.json({
        success: true,
        quiz
      });
    } catch (error) {
      console.error("Get quiz error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to retrieve quiz"
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
