import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

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

export async function generateFrenchVerbQuiz(verb: string, tense: string, difficulty?: string): Promise<GeneratedQuiz> {
  const prompt = `*****Expert French Verb Quiz Generator: Master Prompt
Objective: Act as an expert French language tutor. Your task is to generate a complete, 20-question, multiple-choice quiz based on the parameters provided below. The output must strictly adhere to the specified learning immersive format, producing a single, valid JSON object.

1. Quiz Parameters
Verb: "${verb}"
Tense: "${tense}"
Number of Questions: 20

2. Tense Interpretation Guide (CRITICAL)
You must interpret the Tense parameter according to the following rules:
- Présent (Present): e.g., "I do" -> Je fais.
- Passé Composé (Past Perfect): e.g., "I did" / "I have done" -> J'ai fait.
- Imparfait (Imperfect): e.g., "I was doing" / "I used to do" -> Je faisais.
- Futur Simple (Simple Future): e.g., "I will do" -> Je ferai.
- Présent Progressif (Present Continuous): e.g., "I am doing" -> Je suis en train de faire.
- Présent + depuis (Present Perfect Continuous): e.g., "I have been doing" -> Je fais... depuis... OR Ça fait... que je fais....
- Conditionnel Présent (Present Conditional): e.g., "I would do" -> Je ferais.
- Conditionnel Passé (Conditional Perfect): e.g., "I would have done" -> J'aurais fait.

3. Content & Structure Requirements
- Question Format: Each question must be an English sentence to be translated.
- Answer Format: Provide four complete French sentences as answerOptions.
- Subject Pronouns: Distribute questions across all subject pronouns (je, tu, il, elle, nous, vous, ils, elles).
- Negation: Include approximately 4-5 negative sentences, correctly wrapping the negation (ne...pas, ne...rien, etc.) around the conjugated auxiliary verb in compound tenses. CRITICAL: Never duplicate "pas" - if the context already contains "pas", do not add another "pas" (avoid "pas pas" errors).
- Plausible Distractors: Incorrect options must target common errors, such as using the wrong tense, incorrect auxiliary verb, wrong subject-verb agreement, or incorrect negation placement.
- Hints: Provide a concise hint that guides the user's thinking without revealing the answer.
- Rationales: For every answer option, provide a clear, one-sentence rationale.
  - For the correct answer: Explain why it is correct by referencing the grammatical rule.
  - For incorrect answers: Explain the specific error.
  - Crucially: Do not state "This is correct" or "This is incorrect."

4. Technical Format (MANDATORY)
The entire response must be a valid JSON object following these rules:
- Keys & Strings: All property names (keys) and string values must be enclosed in double quotes (").
- Structure: Use {} for objects and [] for arrays. No trailing commas.
- JSON Schema:
{
  "questions": [
    {
      "question": "...",
      "hint": "...",
      "answerOptions": [
        {
          "text": "...",
          "rationale": "...",
          "isCorrect": true
        }
      ]
    }
  ]
}

Generate the complete 20-question quiz now.`;

  try {
    console.log('Starting Gemini API call...');
    
    // Add timeout wrapper - reduce timeout for faster failure detection
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Gemini API timeout after 15 seconds')), 15000);
    });

    const geminiPromise = ai.models.generateContent({
      model: "gemini-2.5-flash", // Use faster model
      config: {
        responseMimeType: "application/json",
      },
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = await Promise.race([geminiPromise, timeoutPromise]) as any;
    
    console.log('Gemini API response received');
    const rawJson = response.text;
    console.log('Raw response length:', rawJson?.length);
    
    if (rawJson) {
      try {
        const quizData: GeneratedQuiz = JSON.parse(rawJson);
        
        // Validate the quiz structure
        if (!quizData.questions || !Array.isArray(quizData.questions)) {
          throw new Error("Invalid quiz structure - missing questions array");
        }
        
        console.log(`Generated ${quizData.questions.length} questions`);
        return quizData;
      } catch (parseError) {
        console.error('JSON parsing error:', parseError);
        console.error('Raw JSON sample:', rawJson?.substring(0, 500));
        throw new Error(`Failed to parse Gemini response: ${parseError}`);
      }
    } else {
      throw new Error("Empty response from Gemini");
    }
  } catch (error) {
    console.error('Gemini quiz generation error:', error);
    if (error instanceof Error && error.message.includes('timeout')) {
      throw new Error(`Quiz generation timed out. Please try again with a simpler request.`);
    }
    throw new Error(`Failed to generate French verb quiz: ${error}`);
  }
}