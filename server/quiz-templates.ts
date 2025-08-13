import { GeneratedQuiz } from "./gemini-quiz";

// Pre-generated quiz templates for common verb/tense combinations
// This serves as a fallback when AI generation times out
export const QUIZ_TEMPLATES: Record<string, GeneratedQuiz> = {
  "être-présent": {
    questions: [
      {
        question: "I am happy. (male speaker)",
        hint: "Use the present tense form of être for je, masculine adjective",
        answerOptions: [
          {
            text: "Je suis heureux.",
            rationale: "Correct present tense conjugation with masculine adjective agreement.",
            isCorrect: true
          },
          {
            text: "Je suis heureuse.",
            rationale: "Wrong gender - 'heureuse' is feminine, but speaker is male.",
            isCorrect: false
          },
          {
            text: "Je suis contentes.",
            rationale: "Wrong adjective and gender - should be 'heureux' for masculine singular.",
            isCorrect: false
          },
          {
            text: "Je suis prêt.",
            rationale: "Wrong adjective - means 'ready' not 'happy'.",
            isCorrect: false
          }
        ]
      },
      {
        question: "I am happy. (female speaker)",
        hint: "Use the present tense form of être for je, feminine adjective",
        answerOptions: [
          {
            text: "Je suis heureuse.",
            rationale: "Correct present tense conjugation with feminine adjective agreement.",
            isCorrect: true
          },
          {
            text: "Je suis heureux.",
            rationale: "Wrong gender - 'heureux' is masculine, but speaker is female.",
            isCorrect: false
          },
          {
            text: "Je suis occupée.",
            rationale: "Wrong adjective - means 'busy' not 'happy'.",
            isCorrect: false
          },
          {
            text: "Je suis prête.",
            rationale: "Wrong adjective - means 'ready' not 'happy'.",
            isCorrect: false
          }
        ]
      }
    ]
  },
  "avoir-présent": {
    questions: [
      {
        question: "I am happy.",
        hint: "Use the present tense form of être for je",
        answerOptions: [
          {
            text: "Je suis heureux.",
            rationale: "This uses the correct present tense conjugation of être for je.",
            isCorrect: true
          },
          {
            text: "Je es heureux.",
            rationale: "The conjugation 'es' is for tu, not je.",
            isCorrect: false
          },
          {
            text: "Je est heureux.",
            rationale: "The conjugation 'est' is for il/elle, not je.",
            isCorrect: false
          },
          {
            text: "J'étais heureux.",
            rationale: "This uses the imperfect tense, not present tense.",
            isCorrect: false
          }
        ]
      },
      {
        question: "You are tired.",
        hint: "Use the present tense form of être for tu",
        answerOptions: [
          {
            text: "Tu es fatigué.",
            rationale: "This is the correct present tense conjugation of être for tu.",
            isCorrect: true
          },
          {
            text: "Tu suis fatigué.",
            rationale: "The conjugation 'suis' is for je, not tu.",
            isCorrect: false
          },
          {
            text: "Tu êtes fatigué.",
            rationale: "The conjugation 'êtes' is for vous, not tu.",
            isCorrect: false
          },
          {
            text: "Tu sera fatigué.",
            rationale: "This uses the future tense, not present tense.",
            isCorrect: false
          }
        ]
      },
      {
        question: "He is a student.",
        hint: "Use the present tense form of être for il",
        answerOptions: [
          {
            text: "Il est étudiant.",
            rationale: "This is the correct present tense conjugation of être for il.",
            isCorrect: true
          },
          {
            text: "Il es étudiant.",
            rationale: "The conjugation 'es' is for tu, not il.",
            isCorrect: false
          },
          {
            text: "Il suis étudiant.",
            rationale: "The conjugation 'suis' is for je, not il.",
            isCorrect: false
          },
          {
            text: "Il était étudiant.",
            rationale: "This uses the imperfect tense, not present tense.",
            isCorrect: false
          }
        ]
      },
      {
        question: "We are friends.",
        hint: "Use the present tense form of être for nous",
        answerOptions: [
          {
            text: "Nous sommes amis.",
            rationale: "This is the correct present tense conjugation of être for nous.",
            isCorrect: true
          },
          {
            text: "Nous sont amis.",
            rationale: "The conjugation 'sont' is for ils/elles, not nous.",
            isCorrect: false
          },
          {
            text: "Nous êtes amis.",
            rationale: "The conjugation 'êtes' is for vous, not nous.",
            isCorrect: false
          },
          {
            text: "Nous avons amis.",
            rationale: "This uses the wrong verb 'avoir' instead of être.",
            isCorrect: false
          }
        ]
      },
      {
        question: "You (plural) are ready.",
        hint: "Use the present tense form of être for vous",
        answerOptions: [
          {
            text: "Vous êtes prêts.",
            rationale: "This is the correct present tense conjugation of être for vous.",
            isCorrect: true
          },
          {
            text: "Vous es prêts.",
            rationale: "The conjugation 'es' is for tu, not vous.",
            isCorrect: false
          },
          {
            text: "Vous sommes prêts.",
            rationale: "The conjugation 'sommes' is for nous, not vous.",
            isCorrect: false
          },
          {
            text: "Vous serez prêts.",
            rationale: "This uses the future tense, not present tense.",
            isCorrect: false
          }
        ]
      }
    ]
  }
};

export function getQuizTemplate(verb: string, tense: string): GeneratedQuiz | null {
  const key = `${verb}-${tense.toLowerCase().replace(/\s+/g, '')}`;
  console.log(`Looking for template: ${key}`);
  console.log('Available templates:', Object.keys(QUIZ_TEMPLATES));
  return QUIZ_TEMPLATES[key] || null;
}

// Generate additional questions to reach 20 total
export function expandQuizTo20Questions(baseQuiz: GeneratedQuiz): GeneratedQuiz {
  if (baseQuiz.questions.length >= 20) {
    return { questions: baseQuiz.questions.slice(0, 20) };
  }

  const expandedQuestions = [...baseQuiz.questions];
  
  // Add more variations by duplicating and modifying existing questions
  const additionalQuestions = [
    {
      question: "She is not here.",
      hint: "Use the negative form with ne...pas around être",
      answerOptions: [
        {
          text: "Elle n'est pas ici.",
          rationale: "This correctly places ne...pas around the conjugated verb.",
          isCorrect: true
        },
        {
          text: "Elle ne pas est ici.",
          rationale: "The negation is incorrectly placed before the verb.",
          isCorrect: false
        },
        {
          text: "Elle est ne pas ici.",
          rationale: "The negation should wrap around the verb, not come after.",
          isCorrect: false
        },
        {
          text: "Elle n'était pas ici.",
          rationale: "This uses the imperfect tense instead of present tense.",
          isCorrect: false
        }
      ]
    }
  ];

  expandedQuestions.push(...additionalQuestions);

  // If still not 20 questions, repeat with variations
  while (expandedQuestions.length < 20) {
    const baseQuestion = expandedQuestions[expandedQuestions.length % baseQuiz.questions.length];
    expandedQuestions.push({
      ...baseQuestion,
      question: `${baseQuestion.question} (variation ${Math.floor(expandedQuestions.length / baseQuiz.questions.length)})`
    });
  }

  return { questions: expandedQuestions.slice(0, 20) };
}