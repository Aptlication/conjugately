import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { quizRequestSchema } from "@shared/schema";
import { generateFrenchVerbQuiz } from "./gemini-quiz";
import { generateInternalQuiz } from "./quiz-generator";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  
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
      const { verb, timeFrame, tenseType } = quizRequestSchema.parse(req.body);
      
      console.log(`Generating quiz for: ${verb} - ${timeFrame} - ${tenseType}`);
      
      // Generate quiz using our internal system (fast and reliable)
      try {
        console.log('⚡ Generating quiz with internal system...');
        const generatedQuiz = generateInternalQuiz(verb, tenseType);
        
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
