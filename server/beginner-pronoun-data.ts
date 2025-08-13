// Beginner level pronoun-focused questions for être, avoir, faire
// Focus on simple subject pronoun conjugations (Je suis, Tu es, Il/Elle est, etc.)

export interface BeginnerPronounQuestion {
  question: string;
  hint: string;
  answerOptions: Array<{
    text: string;
    rationale: string;
    isCorrect: boolean;
  }>;
}

// Complete beginner pronoun questions based on provided curriculum
export const BEGINNER_PRONOUN_QUESTIONS: Record<string, Record<string, BeginnerPronounQuestion[]>> = {
  "être": {
    "Présent": [
      {
        question: "I am",
        hint: "First person singular of être in present tense",
        answerOptions: [
          { text: "Je suis", rationale: "Correct! 'Je suis' is 'I am' in French.", isCorrect: true },
          { text: "Tu es", rationale: "This means 'you are' (informal).", isCorrect: false },
          { text: "Il est", rationale: "This means 'he is'.", isCorrect: false },
          { text: "Nous sommes", rationale: "This means 'we are'.", isCorrect: false }
        ]
      },
      {
        question: "You are (informal)",
        hint: "Second person singular informal of être",
        answerOptions: [
          { text: "Tu es", rationale: "Correct! 'Tu es' is 'you are' (informal).", isCorrect: true },
          { text: "Je suis", rationale: "This means 'I am'.", isCorrect: false },
          { text: "Il est", rationale: "This means 'he is'.", isCorrect: false },
          { text: "Elles sont", rationale: "This means 'they are' (feminine).", isCorrect: false }
        ]
      },
      {
        question: "He is",
        hint: "Third person singular masculine of être",
        answerOptions: [
          { text: "Il est", rationale: "Correct! 'Il est' is 'he is' in French.", isCorrect: true },
          { text: "Elle est", rationale: "This means 'she is'.", isCorrect: false },
          { text: "Tu es", rationale: "This means 'you are' (informal).", isCorrect: false },
          { text: "Ils sont", rationale: "This means 'they are' (masculine/mixed).", isCorrect: false }
        ]
      },
      {
        question: "We are",
        hint: "First person plural of être",
        answerOptions: [
          { text: "Nous sommes", rationale: "Correct! 'Nous sommes' is 'we are' in French.", isCorrect: true },
          { text: "Vous êtes", rationale: "This means 'you are' (formal/plural).", isCorrect: false },
          { text: "Ils sont", rationale: "This means 'they are' (masculine/mixed).", isCorrect: false },
          { text: "Je suis", rationale: "This means 'I am'.", isCorrect: false }
        ]
      },
      {
        question: "They are (female)",
        hint: "Third person plural feminine of être",
        answerOptions: [
          { text: "Elles sont", rationale: "Correct! 'Elles sont' is 'they are' (feminine) in French.", isCorrect: true },
          { text: "Ils sont", rationale: "This means 'they are' (masculine/mixed).", isCorrect: false },
          { text: "Elles étaient", rationale: "This is past tense (imperfect).", isCorrect: false },
          { text: "Elles seront", rationale: "This is future tense.", isCorrect: false }
        ]
      }
    ],
    "Passé Composé": [
      {
        question: "I have been",
        hint: "Past participle of être with auxiliary avoir",
        answerOptions: [
          { text: "J'ai été", rationale: "Correct! 'J'ai été' is 'I have been' in French.", isCorrect: true },
          { text: "Tu as été", rationale: "This means 'you have been' (informal).", isCorrect: false },
          { text: "Il a été", rationale: "This means 'he has been'.", isCorrect: false },
          { text: "Nous avons été", rationale: "This means 'we have been'.", isCorrect: false }
        ]
      },
      {
        question: "She has been",
        hint: "Third person singular feminine of être in passé composé",
        answerOptions: [
          { text: "Elle a été", rationale: "Correct! 'Elle a été' is 'she has been' in French.", isCorrect: true },
          { text: "Il a été", rationale: "This means 'he has been'.", isCorrect: false },
          { text: "Tu as été", rationale: "This means 'you have been' (informal).", isCorrect: false },
          { text: "Elles ont été", rationale: "This means 'they have been' (feminine plural).", isCorrect: false }
        ]
      },
      {
        question: "We have been",
        hint: "First person plural of être in passé composé",
        answerOptions: [
          { text: "Nous avons été", rationale: "Correct! 'Nous avons été' is 'we have been' in French.", isCorrect: true },
          { text: "Vous avez été", rationale: "This means 'you have been' (formal/plural).", isCorrect: false },
          { text: "Ils ont été", rationale: "This means 'they have been' (masculine/mixed).", isCorrect: false },
          { text: "J'ai été", rationale: "This means 'I have been'.", isCorrect: false }
        ]
      }
    ],
    "Futur Simple": [
      {
        question: "I will be",
        hint: "First person singular of être in future tense",
        answerOptions: [
          { text: "Je serai", rationale: "Correct! 'Je serai' is 'I will be' in French.", isCorrect: true },
          { text: "Tu seras", rationale: "This means 'you will be' (informal).", isCorrect: false },
          { text: "Il sera", rationale: "This means 'he will be'.", isCorrect: false },
          { text: "Nous serons", rationale: "This means 'we will be'.", isCorrect: false }
        ]
      },
      {
        question: "He will be",
        hint: "Third person singular masculine of être in future",
        answerOptions: [
          { text: "Il sera", rationale: "Correct! 'Il sera' is 'he will be' in French.", isCorrect: true },
          { text: "Je serai", rationale: "This means 'I will be'.", isCorrect: false },
          { text: "Tu seras", rationale: "This means 'you will be' (informal).", isCorrect: false },
          { text: "Ils seront", rationale: "This means 'they will be' (masculine/mixed).", isCorrect: false }
        ]
      },
      {
        question: "You will be (formal/plural)",
        hint: "Second person plural/formal of être in future",
        answerOptions: [
          { text: "Vous serez", rationale: "Correct! 'Vous serez' is 'you will be' (formal/plural) in French.", isCorrect: true },
          { text: "Nous serons", rationale: "This means 'we will be'.", isCorrect: false },
          { text: "Ils seront", rationale: "This means 'they will be' (masculine/mixed).", isCorrect: false },
          { text: "Je serai", rationale: "This means 'I will be'.", isCorrect: false }
        ]
      }
    ]
  },
  "avoir": {
    "Présent": [
      {
        question: "I have",
        hint: "First person singular of avoir in present tense",
        answerOptions: [
          { text: "J'ai", rationale: "Correct! 'J'ai' is 'I have' in French.", isCorrect: true },
          { text: "Il a", rationale: "This means 'he has'.", isCorrect: false },
          { text: "Elle a", rationale: "This means 'she has'.", isCorrect: false },
          { text: "Tu as", rationale: "This means 'you have' (informal).", isCorrect: false }
        ]
      },
      {
        question: "He has",
        hint: "Third person singular masculine of avoir",
        answerOptions: [
          { text: "Il a", rationale: "Correct! 'Il a' is 'he has' in French.", isCorrect: true },
          { text: "J'ai", rationale: "This means 'I have'.", isCorrect: false },
          { text: "Elle a", rationale: "This means 'she has'.", isCorrect: false },
          { text: "Tu as", rationale: "This means 'you have' (informal).", isCorrect: false }
        ]
      },
      {
        question: "They have (male/mixed)",
        hint: "Third person plural masculine/mixed of avoir",
        answerOptions: [
          { text: "Ils ont", rationale: "Correct! 'Ils ont' is 'they have' (masculine/mixed) in French.", isCorrect: true },
          { text: "Elles ont", rationale: "This means 'they have' (feminine only).", isCorrect: false },
          { text: "Nous avons", rationale: "This means 'we have'.", isCorrect: false },
          { text: "Il a", rationale: "This means 'he has' (singular).", isCorrect: false }
        ]
      }
    ],
    "Passé Composé": [
      {
        question: "I had",
        hint: "First person singular of avoir in passé composé",
        answerOptions: [
          { text: "J'ai eu", rationale: "Correct! 'J'ai eu' is 'I had' in French.", isCorrect: true },
          { text: "Tu as eu", rationale: "This means 'you had' (informal).", isCorrect: false },
          { text: "Il a eu", rationale: "This means 'he had'.", isCorrect: false },
          { text: "Nous avons eu", rationale: "This means 'we had'.", isCorrect: false }
        ]
      },
      {
        question: "You had (informal)",
        hint: "Second person singular of avoir in passé composé",
        answerOptions: [
          { text: "Tu as eu", rationale: "Correct! 'Tu as eu' is 'you had' (informal) in French.", isCorrect: true },
          { text: "J'ai eu", rationale: "This means 'I had'.", isCorrect: false },
          { text: "Elle a eu", rationale: "This means 'she had'.", isCorrect: false },
          { text: "Nous avons eu", rationale: "This means 'we had'.", isCorrect: false }
        ]
      }
    ],
    "Futur Simple": [
      {
        question: "I will have",
        hint: "First person singular of avoir in future tense",
        answerOptions: [
          { text: "J'aurai", rationale: "Correct! 'J'aurai' is 'I will have' in French.", isCorrect: true },
          { text: "Il aura", rationale: "This means 'he will have'.", isCorrect: false },
          { text: "Tu auras", rationale: "This means 'you will have' (informal).", isCorrect: false },
          { text: "Nous aurons", rationale: "This means 'we will have'.", isCorrect: false }
        ]
      },
      {
        question: "They will have (female)",
        hint: "Third person plural feminine of avoir in future",
        answerOptions: [
          { text: "Elles auront", rationale: "Correct! 'Elles auront' is 'they will have' (feminine) in French.", isCorrect: true },
          { text: "Ils auront", rationale: "This means 'they will have' (masculine/mixed).", isCorrect: false },
          { text: "Nous aurons", rationale: "This means 'we will have'.", isCorrect: false },
          { text: "Elle aura", rationale: "This means 'she will have' (singular).", isCorrect: false }
        ]
      }
    ]
  },
  "faire": {
    "Présent": [
      {
        question: "I do",
        hint: "First person singular of faire in present tense",
        answerOptions: [
          { text: "Je fais", rationale: "Correct! 'Je fais' is 'I do' in French.", isCorrect: true },
          { text: "Tu fais", rationale: "This means 'you do' (informal).", isCorrect: false },
          { text: "Il fait", rationale: "This means 'he does'.", isCorrect: false },
          { text: "Nous faisons", rationale: "This means 'we do'.", isCorrect: false }
        ]
      },
      {
        question: "He does",
        hint: "Third person singular masculine of faire",
        answerOptions: [
          { text: "Il fait", rationale: "Correct! 'Il fait' is 'he does' in French.", isCorrect: true },
          { text: "Je fais", rationale: "This means 'I do'.", isCorrect: false },
          { text: "Nous faisons", rationale: "This means 'we do'.", isCorrect: false },
          { text: "Ils font", rationale: "This means 'they do'.", isCorrect: false }
        ]
      },
      {
        question: "You do (plural/formal)",
        hint: "Second person plural/formal of faire",
        answerOptions: [
          { text: "Vous faites", rationale: "Correct! 'Vous faites' is 'you do' (plural/formal) in French.", isCorrect: true },
          { text: "Tu fais", rationale: "This means 'you do' (informal, singular).", isCorrect: false },
          { text: "Nous faisons", rationale: "This means 'we do'.", isCorrect: false },
          { text: "Ils font", rationale: "This means 'they do'.", isCorrect: false }
        ]
      }
    ],
    "Passé Composé": [
      {
        question: "I did",
        hint: "First person singular of faire in passé composé",
        answerOptions: [
          { text: "J'ai fait", rationale: "Correct! 'J'ai fait' is 'I did' in French.", isCorrect: true },
          { text: "Tu as fait", rationale: "This means 'you did' (informal).", isCorrect: false },
          { text: "Il a fait", rationale: "This means 'he did'.", isCorrect: false },
          { text: "Nous avons fait", rationale: "This means 'we did'.", isCorrect: false }
        ]
      },
      {
        question: "They did (male/mixed)",
        hint: "Third person plural masculine/mixed of faire in passé composé",
        answerOptions: [
          { text: "Ils ont fait", rationale: "Correct! 'Ils ont fait' is 'they did' (masculine/mixed) in French.", isCorrect: true },
          { text: "Elles ont fait", rationale: "This means 'they did' (feminine only).", isCorrect: false },
          { text: "Nous avons fait", rationale: "This means 'we did'.", isCorrect: false },
          { text: "J'ai fait", rationale: "This means 'I did'.", isCorrect: false }
        ]
      }
    ],
    "Futur Simple": [
      {
        question: "I will do",
        hint: "First person singular of faire in future tense",
        answerOptions: [
          { text: "Je ferai", rationale: "Correct! 'Je ferai' is 'I will do' in French.", isCorrect: true },
          { text: "Tu feras", rationale: "This means 'you will do' (informal).", isCorrect: false },
          { text: "Il fera", rationale: "This means 'he will do'.", isCorrect: false },
          { text: "Nous ferons", rationale: "This means 'we will do'.", isCorrect: false }
        ]
      },
      {
        question: "We will do",
        hint: "First person plural of faire in future tense",
        answerOptions: [
          { text: "Nous ferons", rationale: "Correct! 'Nous ferons' is 'we will do' in French.", isCorrect: true },
          { text: "Vous ferez", rationale: "This means 'you will do' (plural/formal).", isCorrect: false },
          { text: "Ils feront", rationale: "This means 'they will do'.", isCorrect: false },
          { text: "Je ferai", rationale: "This means 'I will do'.", isCorrect: false }
        ]
      }
    ]
  }
};

// Function to get random beginner pronoun questions for a specific verb and tense
export function getRandomBeginnerPronounQuestions(verb: string, tense: string, count: number): BeginnerPronounQuestion[] {
  const questions = BEGINNER_PRONOUN_QUESTIONS[verb]?.[tense] || [];
  
  if (questions.length === 0) {
    console.log(`No beginner pronoun questions found for ${verb} - ${tense}`);
    return [];
  }
  
  // Shuffle questions and take the requested count
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}