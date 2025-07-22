import { GoogleGenAI } from "@google/genai";

// DON'T DELETE THIS COMMENT
// Follow these instructions when using this blueprint:
// - Note that the newest Gemini model series is "gemini-2.5-flash" or gemini-2.5-pro"
//   - do not change this unless explicitly requested by the user

// This API key is from Gemini Developer API Key, not vertex AI API Key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateFrenchVerbQuiz(verb: string, timeFrame: string, tenseType: string): Promise<any> {
  // Map the timeFrame and tenseType to actual French tense names
  const getTenseName = (timeFrame: string, tenseType: string): string => {
    const tenseMap: { [key: string]: { [key: string]: string } } = {
      past: {
        simple: 'Passé Composé',
        perfect: 'Plus-que-parfait',
        continuous: 'Imparfait',
        conditional: 'Conditionnel Passé'
      },
      present: {
        simple: 'Présent',
        perfect: 'Passé Composé',
        continuous: 'Présent Progressif',
        conditional: 'Conditionnel Présent'
      },
      future: {
        simple: 'Futur Simple',
        perfect: 'Futur Antérieur',
        continuous: 'Futur Proche',
        conditional: 'Conditionnel Présent'
      }
    };

    return tenseMap[timeFrame]?.[tenseType] || `${timeFrame} ${tenseType}`;
  };

  const tenseName = getTenseName(timeFrame, tenseType);

  const prompt = `*****Expert French Verb Quiz Generator: Master Prompt
Objective: Act as an expert French language tutor. Your task is to generate a complete, 20-question, multiple-choice quiz based on the parameters provided below. The output must strictly adhere to the specified learning immersive format, producing a single, valid JSON object.

1. Quiz Parameters
Verb: "${verb}"
Tense: "${tenseName}"
Number of Questions: 20

2. Tense Interpretation Guide (CRITICAL)
You must interpret the Tense parameter according to the following rules:
Présent (Present): e.g., "I do" -> Je fais.
Passé Composé (Past Perfect): e.g., "I did" / "I have done" -> J'ai fait.
Imparfait (Imperfect): e.g., "I was doing" / "I used to do" -> Je faisais.
Futur Simple (Simple Future): e.g., "I will do" -> Je ferai.
Présent Progressif (Present Continuous): e.g., "I am doing" -> Je suis en train de faire.
Présent + depuis (Present Perfect Continuous): e.g., "I have been doing" -> Je fais... depuis... OR Ça fait... que je fais....
Conditionnel Présent (Present Conditional): e.g., "I would do" -> Je ferais.
Conditionnel Passé (Conditional Perfect): e.g., "I would have done" -> J'aurais fait.

3. Content & Structure Requirements
Question Format: Each question must be an English sentence to be translated.
Answer Format: Provide four complete French sentences as answerOptions.
Subject Pronouns: Distribute questions across all subject pronouns (je, tu, il, elle, nous, vous, ils, elles).
Negation: Include approximately 4-5 negative sentences, correctly wrapping the negation (ne...pas, ne...rien, etc.) around the conjugated auxiliary verb in compound tenses.
Plausible Distractors: Incorrect options must target common errors, such as using the wrong tense, incorrect auxiliary verb, wrong subject-verb agreement, or incorrect negation placement.
Hints: Provide a concise hint that guides the user's thinking without revealing the answer.
Rationales: For every answer option, provide a clear, one-sentence rationale.
For the correct answer: Explain why it is correct by referencing the grammatical rule (e.g., "This correctly uses the conditional of 'avoir' with the past participle.").
For incorrect answers: Explain the specific error (e.g., "This is the Pluperfect tense, not the Conditional Perfect.", "This uses the wrong auxiliary verb.").
Crucially: Do not state "This is correct" or "This is incorrect."

4. Technical Format (MANDATORY)
The response must be a valid JSON object with the following structure:
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
        },
        {
          "text": "...",
          "rationale": "...",
          "isCorrect": false
        },
        {
          "text": "...",
          "rationale": "...",
          "isCorrect": false
        },
        {
          "text": "...",
          "rationale": "...",
          "isCorrect": false
        }
      ]
    }
  ]
}

Generate exactly 20 questions following these specifications. Respond only with the JSON object, no additional text.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      config: {
        systemInstruction: "You are an expert French language tutor. Generate a complete French verb quiz in valid JSON format according to the specifications provided.",
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            questions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  question: { type: "string" },
                  hint: { type: "string" },
                  answerOptions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        text: { type: "string" },
                        rationale: { type: "string" },
                        isCorrect: { type: "boolean" }
                      },
                      required: ["text", "rationale", "isCorrect"]
                    }
                  }
                },
                required: ["question", "hint", "answerOptions"]
              }
            }
          },
          required: ["questions"]
        }
      },
      contents: prompt,
    });

    const rawJson = response.text;
    
    if (rawJson) {
      const result = JSON.parse(rawJson);
      return result;
    } else {
      throw new Error("Empty response from Gemini model");
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate quiz: " + (error as Error).message);
  }
}
