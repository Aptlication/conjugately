import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { quizRequestSchema, insertCourseProgressSchema, insertCompletedCourseSchema } from "@shared/schema";
import { generateFrenchVerbQuiz } from "./gemini-quiz";
import { generateInternalQuiz } from "./quiz-generator";
import { getRandomIntermediateQuestions } from "./intermediate-quiz-data";
import { ZodError } from "zod";
import { db } from "./db";
import { courseProgress, completedCourses } from "@shared/schema";
import { eq, and } from "drizzle-orm";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { storage } from "./storage";
import { isAdvancedDifficultyEnabled, isDifficultyAllowed } from "@shared/config";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const replitUserId = req.user.claims.sub;
      const user = await storage.getUserByReplitId(replitUserId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  
  // Serve the fresh French Verb Master app
  app.get("/verbmaster", (req, res) => {
    res.sendFile(path.join(import.meta.dirname, "french-master.html"));
  });
  
  // Serve FrenchQuiz component at /frenchverb route (fresh slug to bypass cache)
  app.get("/frenchverb", (req, res) => {
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>French Verb Master</title>
    <script type="module" src="/@vite/client"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main-frenchverb.tsx?v=${Date.now()}"></script>
  </body>
</html>`;
    res.set('Cache-Control', 'no-cache');
    res.send(html);
  });

  // Generate French verb quiz using Gemini AI
  app.post("/api/get-quiz", async (req, res, next) => {
    try {
      console.log('📝 Raw request body:', JSON.stringify(req.body, null, 2));
      const { verb, timeFrame, tenseType, difficulty, isExam } = quizRequestSchema.parse(req.body);
      
      // Backend validation: Check if Advanced difficulty is allowed
      if (difficulty === "Advanced" && !isAdvancedDifficultyEnabled()) {
        console.log('🔒 Blocked Advanced difficulty request - feature disabled');
        return res.status(403).json({
          success: false,
          error: "Advanced difficulty is not available in this version",
          code: "ADVANCED_LOCKED"
        });
      }
      
      console.log(`Generating quiz for: ${verb} - ${tenseType}${difficulty ? ` (${difficulty})` : ''}`);
      
      // Generate quiz using our internal system (fast and reliable)
      try {
        console.log('⚡ Generating quiz with internal system...');
        
        let generatedQuiz;
        
        // Check if this is an intermediate level quiz with available data
        if (difficulty === 'Intermediate') {
          console.log('🔧 Checking intermediate quiz data...');
          
          // Normalize tense for intermediate data lookup
          let normalizedTense = tenseType.toLowerCase().replace(/\s+/g, '_');
          if (normalizedTense === 'présent') {
            normalizedTense = 'present';
          } else if (normalizedTense === 'passé_composé') {
            normalizedTense = 'passé_composé';  
          } else if (normalizedTense === 'futur_simple') {
            normalizedTense = 'futur_simple';
          }
          
          console.log(`🔧 Looking for intermediate data: ${verb} - ${normalizedTense}`);
          const intermediateQuestions = getRandomIntermediateQuestions(verb, normalizedTense, 20);
          
          if (intermediateQuestions.length > 0) {
            console.log(`✅ Found ${intermediateQuestions.length} intermediate questions`);
            
            // Convert intermediate questions to the format expected by the frontend
            const convertedQuestions = intermediateQuestions.map((q, index) => ({
              id: `q${index + 1}`,
              question: q.question,
              answerOptions: q.options.map((option, optIndex) => ({
                text: option,
                rationale: `Option ${String.fromCharCode(65 + optIndex)}: ${option}`,
                isCorrect: String.fromCharCode(65 + optIndex) === q.answer
              }))
            }));
            
            generatedQuiz = { questions: convertedQuestions };
            console.log(`🎯 Using intermediate quiz data for ${verb} - ${normalizedTense}`);
          } else {
            console.log('⚠️ No intermediate data found, falling back to regular generation');
            generatedQuiz = generateInternalQuiz(verb, tenseType, difficulty, isExam);
          }
        } else {
          // Use regular internal quiz generation for non-intermediate levels  
          generatedQuiz = generateInternalQuiz(verb, tenseType, difficulty, isExam);
        }
        
        res.json({
          success: true,
          quiz: {
            id: Date.now(),
            verb: verb,
            tense: `${timeFrame}-${tenseType}`,
            questions: generatedQuiz.questions
          },
          source: 'internal'
        });
        console.log(`✅ Generated ${generatedQuiz.questions.length} questions instantly`);
      } catch (internalError) {
        console.error('❌ Internal generation failed, trying AI fallback:', internalError);
        
        // Fallback to AI if our internal system doesn't have the data
        try {
          console.log('🤖 Falling back to AI generation...');
          const generatedQuiz = await generateFrenchVerbQuiz(verb, tenseType, difficulty);
          
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
          // Final fallback to templates
          const { getQuizTemplate, expandQuizTo20Questions } = await import('./quiz-templates');
          console.log('📚 Final fallback to templates...');
          
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
            throw new Error(`No quiz available for ${verb} - ${tenseType}`);
          }
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

  // Get course progress for a user
  app.get("/api/course-progress/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId) || 1;
      const progress = await db.select().from(courseProgress).where(eq(courseProgress.userId, userId));
      res.json({ success: true, progress });
    } catch (error) {
      console.error("Error fetching course progress:", error);
      res.status(500).json({ success: false, error: "Failed to fetch course progress" });
    }
  });

  // Save or update course progress
  app.post("/api/course-progress", async (req, res) => {
    try {
      const progressData = insertCourseProgressSchema.parse(req.body);
      
      // Check if progress already exists for this course
      const existing = await db.select().from(courseProgress).where(
        and(
          eq(courseProgress.userId, progressData.userId),
          eq(courseProgress.courseType, progressData.courseType),
          eq(courseProgress.timeFrame, progressData.timeFrame)
        )
      );

      let result;
      if (existing.length > 0) {
        // Update existing progress
        result = await db
          .update(courseProgress)
          .set(progressData)
          .where(eq(courseProgress.id, existing[0].id))
          .returning();
      } else {
        // Create new progress
        result = await db.insert(courseProgress).values(progressData).returning();
      }
      
      res.json({ success: true, progress: result[0] });
    } catch (error) {
      console.error("Error saving course progress:", error);
      res.status(500).json({ success: false, error: "Failed to save course progress" });
    }
  });

  // Get completed courses for a user
  app.get("/api/completed-courses/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId) || 1;
      const completed = await db.select().from(completedCourses).where(eq(completedCourses.userId, userId));
      res.json({ success: true, completedCourses: completed });
    } catch (error) {
      console.error("Error fetching completed courses:", error);
      res.status(500).json({ success: false, error: "Failed to fetch completed courses" });
    }
  });

  // Save completed course
  app.post("/api/completed-courses", async (req, res) => {
    try {
      const courseData = insertCompletedCourseSchema.parse(req.body);
      const result = await db.insert(completedCourses).values(courseData).returning();
      res.json({ success: true, completedCourse: result[0] });
    } catch (error) {
      console.error("Error saving completed course:", error);
      res.status(500).json({ success: false, error: "Failed to save completed course" });
    }
  });

  // Reset/delete completed course (to retake)
  app.delete("/api/completed-courses/:userId/:courseType/:timeFrame", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId) || 1;
      const { courseType, timeFrame } = req.params;
      
      // Delete completed course record
      await db.delete(completedCourses).where(
        and(
          eq(completedCourses.userId, userId),
          eq(completedCourses.courseType, courseType),
          eq(completedCourses.timeFrame, timeFrame)
        )
      );
      
      // Also delete any progress for this course
      await db.delete(courseProgress).where(
        and(
          eq(courseProgress.userId, userId),
          eq(courseProgress.courseType, courseType),
          eq(courseProgress.timeFrame, timeFrame)
        )
      );
      
      res.json({ success: true, message: "Course reset successfully" });
    } catch (error) {
      console.error("Error resetting course:", error);
      res.status(500).json({ success: false, error: "Failed to reset course" });
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
