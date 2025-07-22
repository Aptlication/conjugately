import type { Express } from "express";
import { createServer, type Server } from "http";
import { quizRequestSchema } from "@shared/schema";
import { generateFrenchVerbQuiz } from "./gemini-quiz";
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

  // Generate French verb quiz using Gemini AI
  app.post("/api/get-quiz", async (req, res, next) => {
    try {
      const { verb, timeFrame, tenseType } = quizRequestSchema.parse(req.body);
      
      console.log(`Generating quiz for: ${verb} - ${timeFrame} - ${tenseType}`);
      
      // Generate quiz using Gemini AI with fallback to templates
      try {
        console.log('🤖 Attempting AI-powered quiz generation...');
        const generatedQuiz = await generateFrenchVerbQuiz(verb, tenseType);
        
        res.json({
          success: true,
          quiz: {
            id: Date.now(),
            verb: verb,
            tense: `${timeFrame}-${tenseType}`,
            questions: generatedQuiz.questions
          },
          source: 'ai'
        });
        console.log(`✅ AI generated ${generatedQuiz.questions.length} questions`);
      } catch (aiError) {
        console.error('❌ AI generation failed:', aiError);
        
        // Try fallback to template system
        const { getQuizTemplate, expandQuizTo20Questions } = await import('./quiz-templates');
        console.log('⚡ Attempting fallback to quiz template...');
        
        let templateQuiz = getQuizTemplate(verb, tenseType);
        
        if (templateQuiz) {
          templateQuiz = expandQuizTo20Questions(templateQuiz);
          
          res.json({
            success: true,
            quiz: {
              id: Date.now(),
              verb: verb,
              tense: `${timeFrame}-${tenseType}`,
              questions: templateQuiz.questions
            },
            source: 'template'
          });
          console.log(`✅ Using template with ${templateQuiz.questions.length} questions`);
        } else {
          throw new Error(`No template available for ${verb} - ${tenseType}. Please try a different combination.`);
        }
      }
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

  // Simple health check
  app.get("/api/health", (req, res) => {
    res.json({
      success: true,
      message: "French Verb Master API is running",
      timestamp: new Date().toISOString()
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
