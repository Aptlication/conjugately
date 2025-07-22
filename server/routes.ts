import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { quizRequestSchema } from "@shared/schema";
import { generateFrenchVerbQuiz } from "./services/gemini";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve the app on a new slug to bypass cache
  app.get("/frenchverb", (req, res) => {
    res.set({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache', 
      'Expires': '0'
    });
    res.redirect(302, '/?v=' + Date.now());
  });

  // Get French verb quiz from database
  app.post("/api/get-quiz", async (req, res, next) => {
    try {
      const { verb, timeFrame, tenseType } = quizRequestSchema.parse(req.body);
      
      // Look for existing quiz in database
      const existingQuiz = await storage.getQuizByParams(verb, timeFrame, tenseType);
      
      if (existingQuiz) {
        res.json({
          success: true,
          quiz: {
            id: existingQuiz.id,
            verb: existingQuiz.verb,
            tense: `${existingQuiz.timeFrame}-${existingQuiz.tenseType}`,
            questions: existingQuiz.questions
          }
        });
      } else {
        res.status(404).json({
          success: false,
          error: "Quiz not found for this combination. Please check back later as we're expanding our quiz library.",
        });
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          error: "Invalid input",
          details: error.errors
        });
      }
      
      console.error("Quiz retrieval error:", error);
      res.status(500).json({
        success: false,
        error: (error as Error).message || "Failed to retrieve quiz"
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
