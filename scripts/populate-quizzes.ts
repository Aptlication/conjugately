#!/usr/bin/env tsx

// Simple script to seed a few sample quizzes for demo purposes
import { db } from "../server/db";
import { quizzes } from "../shared/schema";

const sampleQuizzes = [
  {
    verb: "être",
    timeFrame: "present",
    tenseType: "simple",
    questions: [
      {
        question: "Which form means 'I am'?",
        hint: "Choose the present tense form of 'être' for 'je'",
        answerOptions: [
          {
            text: "Je suis",
            rationale: "Correct! 'Je suis' is the first person singular present form of être.",
            isCorrect: true
          },
          {
            text: "Tu es",
            rationale: "This is the second person singular form (you are).",
            isCorrect: false
          },
          {
            text: "Il est",
            rationale: "This is the third person singular form (he is).",
            isCorrect: false
          },
          {
            text: "Nous sommes",
            rationale: "This is the first person plural form (we are).",
            isCorrect: false
          }
        ]
      },
      {
        question: "Complete: Tu ___ professeur.",
        hint: "Choose the correct form of 'être' for 'tu'",
        answerOptions: [
          {
            text: "es",
            rationale: "Correct! 'Tu es' is the second person singular present form of être.",
            isCorrect: true
          },
          {
            text: "suis",
            rationale: "This is the first person singular form (je suis).",
            isCorrect: false
          },
          {
            text: "est",
            rationale: "This is the third person singular form (il/elle est).",
            isCorrect: false
          },
          {
            text: "êtes",
            rationale: "This is the second person plural form (vous êtes).",
            isCorrect: false
          }
        ]
      }
    ]
  },
  {
    verb: "avoir",
    timeFrame: "present",
    tenseType: "simple",
    questions: [
      {
        question: "Which form means 'I have'?",
        hint: "Choose the present tense form of 'avoir' for 'je'",
        answerOptions: [
          {
            text: "J'ai",
            rationale: "Correct! 'J'ai' is the first person singular present form of avoir.",
            isCorrect: true
          },
          {
            text: "Tu as",
            rationale: "This is the second person singular form (you have).",
            isCorrect: false
          },
          {
            text: "Il a",
            rationale: "This is the third person singular form (he has).",
            isCorrect: false
          },
          {
            text: "J'ai eu",
            rationale: "This is the past perfect form (I have had).",
            isCorrect: false
          }
        ]
      },
      {
        question: "Complete: Nous ___ une voiture.",
        hint: "Choose the correct form of 'avoir' for 'nous'",
        answerOptions: [
          {
            text: "avons",
            rationale: "Correct! 'Nous avons' is the first person plural present form of avoir.",
            isCorrect: true
          },
          {
            text: "as",
            rationale: "This is the second person singular form (tu as).",
            isCorrect: false
          },
          {
            text: "ont",
            rationale: "This is the third person plural form (ils ont).",
            isCorrect: false
          },
          {
            text: "avez",
            rationale: "This is the second person plural form (vous avez).",
            isCorrect: false
          }
        ]
      }
    ]
  }
];

async function seedQuizzes() {
  console.log("Seeding sample quizzes...");
  
  for (const quiz of sampleQuizzes) {
    try {
      await db.insert(quizzes).values(quiz);
      console.log(`✓ Added quiz: ${quiz.verb} - ${quiz.timeFrame} - ${quiz.tenseType}`);
    } catch (error) {
      console.log(`Quiz already exists or error: ${quiz.verb} - ${quiz.timeFrame} - ${quiz.tenseType}`);
    }
  }
  
  console.log("Sample quizzes seeded!");
}

seedQuizzes().catch(console.error);