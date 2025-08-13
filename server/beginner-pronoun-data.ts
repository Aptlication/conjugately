// beginner-pronoun-data.ts
// Beginner French Verb Master – Subject Pronoun Focus
// Covers être, avoir, faire in Présent, Passé Composé, Futur Simple
// Each question has 4 answer choices, focusing on subject pronoun conjugations

// Type definition for a beginner pronoun question
export interface BeginnerPronounQuestion {
  question: string;
  verb: string;
  tense: string;
  hint: string;
  answerOptions: {
    text: string;
    rationale: string;
    isCorrect: boolean;
  }[];
}

// Complete dataset of beginner pronoun questions
export const BEGINNER_PRONOUN_QUESTIONS: BeginnerPronounQuestion[] = [
  // ===== ÊTRE – Présent =====
  {
    question: "I am",
    verb: "être",
    tense: "Présent",
    hint: "Choose the correct present tense form of être for 'I'",
    answerOptions: [
      {
        text: "Je suis",
        rationale: "Correct! 'Je suis' is the present tense form of être for the first person singular.",
        isCorrect: true
      },
      {
        text: "Tu es",
        rationale: "Incorrect. 'Tu es' is for 'you' (informal), not 'I'.",
        isCorrect: false
      },
      {
        text: "Il est",
        rationale: "Incorrect. 'Il est' is for 'he', not 'I'.",
        isCorrect: false
      },
      {
        text: "Nous sommes",
        rationale: "Incorrect. 'Nous sommes' is for 'we', not 'I'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "You are (informal)",
    verb: "être",
    tense: "Présent",
    hint: "Choose the correct present tense form of être for 'you' (informal)",
    answerOptions: [
      {
        text: "Tu es",
        rationale: "Correct! 'Tu es' is the present tense form of être for the second person singular (informal).",
        isCorrect: true
      },
      {
        text: "Je suis",
        rationale: "Incorrect. 'Je suis' is for 'I', not 'you'.",
        isCorrect: false
      },
      {
        text: "Il est",
        rationale: "Incorrect. 'Il est' is for 'he', not 'you'.",
        isCorrect: false
      },
      {
        text: "Elles sont",
        rationale: "Incorrect. 'Elles sont' is for 'they' (feminine), not 'you'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "He is",
    verb: "être",
    tense: "Présent",
    hint: "Choose the correct present tense form of être for 'he'",
    answerOptions: [
      {
        text: "Il est",
        rationale: "Correct! 'Il est' is the present tense form of être for the third person singular masculine.",
        isCorrect: true
      },
      {
        text: "Elle est",
        rationale: "Incorrect. 'Elle est' is for 'she', not 'he'.",
        isCorrect: false
      },
      {
        text: "Tu es",
        rationale: "Incorrect. 'Tu es' is for 'you', not 'he'.",
        isCorrect: false
      },
      {
        text: "Ils sont",
        rationale: "Incorrect. 'Ils sont' is for 'they', not 'he'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "We are",
    verb: "être",
    tense: "Présent",
    hint: "Choose the correct present tense form of être for 'we'",
    answerOptions: [
      {
        text: "Nous sommes",
        rationale: "Correct! 'Nous sommes' is the present tense form of être for the first person plural.",
        isCorrect: true
      },
      {
        text: "Vous êtes",
        rationale: "Incorrect. 'Vous êtes' is for 'you' (formal/plural), not 'we'.",
        isCorrect: false
      },
      {
        text: "Ils sont",
        rationale: "Incorrect. 'Ils sont' is for 'they', not 'we'.",
        isCorrect: false
      },
      {
        text: "Je suis",
        rationale: "Incorrect. 'Je suis' is for 'I', not 'we'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "They are (feminine)",
    verb: "être",
    tense: "Présent",
    hint: "Choose the correct present tense form of être for 'they' (feminine)",
    answerOptions: [
      {
        text: "Elles sont",
        rationale: "Correct! 'Elles sont' is the present tense form of être for the third person plural feminine.",
        isCorrect: true
      },
      {
        text: "Ils sont",
        rationale: "Incorrect. 'Ils sont' is for 'they' masculine/mixed, not feminine.",
        isCorrect: false
      },
      {
        text: "Elles étaient",
        rationale: "Incorrect. 'Elles étaient' is past tense, not present.",
        isCorrect: false
      },
      {
        text: "Elles seront",
        rationale: "Incorrect. 'Elles seront' is future tense, not present.",
        isCorrect: false
      }
    ]
  },

  // ===== ÊTRE – Passé Composé =====
  {
    question: "I have been",
    verb: "être",
    tense: "Passé Composé",
    hint: "Choose the correct passé composé form of être for 'I'",
    answerOptions: [
      {
        text: "J'ai été",
        rationale: "Correct! 'J'ai été' is the passé composé form of être for the first person singular.",
        isCorrect: true
      },
      {
        text: "Tu as été",
        rationale: "Incorrect. 'Tu as été' is for 'you', not 'I'.",
        isCorrect: false
      },
      {
        text: "Il a été",
        rationale: "Incorrect. 'Il a été' is for 'he', not 'I'.",
        isCorrect: false
      },
      {
        text: "Nous avons été",
        rationale: "Incorrect. 'Nous avons été' is for 'we', not 'I'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "She has been",
    verb: "être",
    tense: "Passé Composé",
    hint: "Choose the correct passé composé form of être for 'she'",
    answerOptions: [
      {
        text: "Elle a été",
        rationale: "Correct! 'Elle a été' is the passé composé form of être for the third person singular feminine.",
        isCorrect: true
      },
      {
        text: "Il a été",
        rationale: "Incorrect. 'Il a été' is for 'he', not 'she'.",
        isCorrect: false
      },
      {
        text: "Tu as été",
        rationale: "Incorrect. 'Tu as été' is for 'you', not 'she'.",
        isCorrect: false
      },
      {
        text: "Elles ont été",
        rationale: "Incorrect. 'Elles ont été' is for 'they' feminine, not 'she'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "We have been",
    verb: "être",
    tense: "Passé Composé",
    hint: "Choose the correct passé composé form of être for 'we'",
    answerOptions: [
      {
        text: "Nous avons été",
        rationale: "Correct! 'Nous avons été' is the passé composé form of être for the first person plural.",
        isCorrect: true
      },
      {
        text: "Vous avez été",
        rationale: "Incorrect. 'Vous avez été' is for 'you' (formal/plural), not 'we'.",
        isCorrect: false
      },
      {
        text: "Ils ont été",
        rationale: "Incorrect. 'Ils ont été' is for 'they', not 'we'.",
        isCorrect: false
      },
      {
        text: "J'ai été",
        rationale: "Incorrect. 'J'ai été' is for 'I', not 'we'.",
        isCorrect: false
      }
    ]
  },

  // ===== ÊTRE – Futur Simple =====
  {
    question: "I will be",
    verb: "être",
    tense: "Futur Simple",
    hint: "Choose the correct future tense form of être for 'I'",
    answerOptions: [
      {
        text: "Je serai",
        rationale: "Correct! 'Je serai' is the future tense form of être for the first person singular.",
        isCorrect: true
      },
      {
        text: "Tu seras",
        rationale: "Incorrect. 'Tu seras' is for 'you', not 'I'.",
        isCorrect: false
      },
      {
        text: "Il sera",
        rationale: "Incorrect. 'Il sera' is for 'he', not 'I'.",
        isCorrect: false
      },
      {
        text: "Nous serons",
        rationale: "Incorrect. 'Nous serons' is for 'we', not 'I'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "He will be",
    verb: "être",
    tense: "Futur Simple",
    hint: "Choose the correct future tense form of être for 'he'",
    answerOptions: [
      {
        text: "Il sera",
        rationale: "Correct! 'Il sera' is the future tense form of être for the third person singular masculine.",
        isCorrect: true
      },
      {
        text: "Je serai",
        rationale: "Incorrect. 'Je serai' is for 'I', not 'he'.",
        isCorrect: false
      },
      {
        text: "Tu seras",
        rationale: "Incorrect. 'Tu seras' is for 'you', not 'he'.",
        isCorrect: false
      },
      {
        text: "Ils seront",
        rationale: "Incorrect. 'Ils seront' is for 'they', not 'he'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "You will be (formal/plural)",
    verb: "être",
    tense: "Futur Simple",
    hint: "Choose the correct future tense form of être for 'you' (formal/plural)",
    answerOptions: [
      {
        text: "Vous serez",
        rationale: "Correct! 'Vous serez' is the future tense form of être for the second person formal/plural.",
        isCorrect: true
      },
      {
        text: "Nous serons",
        rationale: "Incorrect. 'Nous serons' is for 'we', not 'you'.",
        isCorrect: false
      },
      {
        text: "Ils seront",
        rationale: "Incorrect. 'Ils seront' is for 'they', not 'you'.",
        isCorrect: false
      },
      {
        text: "Je serai",
        rationale: "Incorrect. 'Je serai' is for 'I', not 'you'.",
        isCorrect: false
      }
    ]
  },

  // ===== AVOIR – Présent =====
  {
    question: "I have",
    verb: "avoir",
    tense: "Présent",
    hint: "Choose the correct present tense form of avoir for 'I'",
    answerOptions: [
      {
        text: "J'ai",
        rationale: "Correct! 'J'ai' is the present tense form of avoir for the first person singular.",
        isCorrect: true
      },
      {
        text: "Il a",
        rationale: "Incorrect. 'Il a' is for 'he', not 'I'.",
        isCorrect: false
      },
      {
        text: "Elle a",
        rationale: "Incorrect. 'Elle a' is for 'she', not 'I'.",
        isCorrect: false
      },
      {
        text: "Tu as",
        rationale: "Incorrect. 'Tu as' is for 'you', not 'I'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "He has",
    verb: "avoir",
    tense: "Présent",
    hint: "Choose the correct present tense form of avoir for 'he'",
    answerOptions: [
      {
        text: "Il a",
        rationale: "Correct! 'Il a' is the present tense form of avoir for the third person singular masculine.",
        isCorrect: true
      },
      {
        text: "J'ai",
        rationale: "Incorrect. 'J'ai' is for 'I', not 'he'.",
        isCorrect: false
      },
      {
        text: "Elle a",
        rationale: "Incorrect. 'Elle a' is for 'she', not 'he'.",
        isCorrect: false
      },
      {
        text: "Tu as",
        rationale: "Incorrect. 'Tu as' is for 'you', not 'he'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "They have (masculine/mixed)",
    verb: "avoir",
    tense: "Présent",
    hint: "Choose the correct present tense form of avoir for 'they' (masculine/mixed)",
    answerOptions: [
      {
        text: "Ils ont",
        rationale: "Correct! 'Ils ont' is the present tense form of avoir for the third person plural masculine/mixed.",
        isCorrect: true
      },
      {
        text: "Elles ont",
        rationale: "Incorrect. 'Elles ont' is for 'they' feminine, not masculine/mixed.",
        isCorrect: false
      },
      {
        text: "Nous avons",
        rationale: "Incorrect. 'Nous avons' is for 'we', not 'they'.",
        isCorrect: false
      },
      {
        text: "Il a",
        rationale: "Incorrect. 'Il a' is for 'he', not 'they'.",
        isCorrect: false
      }
    ]
  },

  // ===== AVOIR – Passé Composé =====
  {
    question: "I had",
    verb: "avoir",
    tense: "Passé Composé",
    hint: "Choose the correct passé composé form of avoir for 'I'",
    answerOptions: [
      {
        text: "J'ai eu",
        rationale: "Correct! 'J'ai eu' is the passé composé form of avoir for the first person singular.",
        isCorrect: true
      },
      {
        text: "Tu as eu",
        rationale: "Incorrect. 'Tu as eu' is for 'you', not 'I'.",
        isCorrect: false
      },
      {
        text: "Il a eu",
        rationale: "Incorrect. 'Il a eu' is for 'he', not 'I'.",
        isCorrect: false
      },
      {
        text: "Nous avons eu",
        rationale: "Incorrect. 'Nous avons eu' is for 'we', not 'I'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "You had (informal)",
    verb: "avoir",
    tense: "Passé Composé",
    hint: "Choose the correct passé composé form of avoir for 'you' (informal)",
    answerOptions: [
      {
        text: "Tu as eu",
        rationale: "Correct! 'Tu as eu' is the passé composé form of avoir for the second person singular (informal).",
        isCorrect: true
      },
      {
        text: "J'ai eu",
        rationale: "Incorrect. 'J'ai eu' is for 'I', not 'you'.",
        isCorrect: false
      },
      {
        text: "Elle a eu",
        rationale: "Incorrect. 'Elle a eu' is for 'she', not 'you'.",
        isCorrect: false
      },
      {
        text: "Nous avons eu",
        rationale: "Incorrect. 'Nous avons eu' is for 'we', not 'you'.",
        isCorrect: false
      }
    ]
  },

  // ===== AVOIR – Futur Simple =====
  {
    question: "I will have",
    verb: "avoir",
    tense: "Futur Simple",
    hint: "Choose the correct future tense form of avoir for 'I'",
    answerOptions: [
      {
        text: "J'aurai",
        rationale: "Correct! 'J'aurai' is the future tense form of avoir for the first person singular.",
        isCorrect: true
      },
      {
        text: "Il aura",
        rationale: "Incorrect. 'Il aura' is for 'he', not 'I'.",
        isCorrect: false
      },
      {
        text: "Tu auras",
        rationale: "Incorrect. 'Tu auras' is for 'you', not 'I'.",
        isCorrect: false
      },
      {
        text: "Nous aurons",
        rationale: "Incorrect. 'Nous aurons' is for 'we', not 'I'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "They will have (feminine)",
    verb: "avoir",
    tense: "Futur Simple",
    hint: "Choose the correct future tense form of avoir for 'they' (feminine)",
    answerOptions: [
      {
        text: "Elles auront",
        rationale: "Correct! 'Elles auront' is the future tense form of avoir for the third person plural feminine.",
        isCorrect: true
      },
      {
        text: "Ils auront",
        rationale: "Incorrect. 'Ils auront' is for 'they' masculine/mixed, not feminine.",
        isCorrect: false
      },
      {
        text: "Nous aurons",
        rationale: "Incorrect. 'Nous aurons' is for 'we', not 'they'.",
        isCorrect: false
      },
      {
        text: "Elle aura",
        rationale: "Incorrect. 'Elle aura' is for 'she', not 'they'.",
        isCorrect: false
      }
    ]
  },

  // ===== FAIRE – Présent =====
  {
    question: "I do",
    verb: "faire",
    tense: "Présent",
    hint: "Choose the correct present tense form of faire for 'I'",
    answerOptions: [
      {
        text: "Je fais",
        rationale: "Correct! 'Je fais' is the present tense form of faire for the first person singular.",
        isCorrect: true
      },
      {
        text: "Tu fais",
        rationale: "Incorrect. 'Tu fais' is for 'you', not 'I'.",
        isCorrect: false
      },
      {
        text: "Il fait",
        rationale: "Incorrect. 'Il fait' is for 'he', not 'I'.",
        isCorrect: false
      },
      {
        text: "Nous faisons",
        rationale: "Incorrect. 'Nous faisons' is for 'we', not 'I'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "He does",
    verb: "faire",
    tense: "Présent",
    hint: "Choose the correct present tense form of faire for 'he'",
    answerOptions: [
      {
        text: "Il fait",
        rationale: "Correct! 'Il fait' is the present tense form of faire for the third person singular masculine.",
        isCorrect: true
      },
      {
        text: "Je fais",
        rationale: "Incorrect. 'Je fais' is for 'I', not 'he'.",
        isCorrect: false
      },
      {
        text: "Nous faisons",
        rationale: "Incorrect. 'Nous faisons' is for 'we', not 'he'.",
        isCorrect: false
      },
      {
        text: "Ils font",
        rationale: "Incorrect. 'Ils font' is for 'they', not 'he'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "You do (plural/formal)",
    verb: "faire",
    tense: "Présent",
    hint: "Choose the correct present tense form of faire for 'you' (plural/formal)",
    answerOptions: [
      {
        text: "Vous faites",
        rationale: "Correct! 'Vous faites' is the present tense form of faire for the second person formal/plural.",
        isCorrect: true
      },
      {
        text: "Tu fais",
        rationale: "Incorrect. 'Tu fais' is for 'you' informal, not formal/plural.",
        isCorrect: false
      },
      {
        text: "Nous faisons",
        rationale: "Incorrect. 'Nous faisons' is for 'we', not 'you'.",
        isCorrect: false
      },
      {
        text: "Ils font",
        rationale: "Incorrect. 'Ils font' is for 'they', not 'you'.",
        isCorrect: false
      }
    ]
  },

  // ===== FAIRE – Passé Composé =====
  {
    question: "I did",
    verb: "faire",
    tense: "Passé Composé",
    hint: "Choose the correct passé composé form of faire for 'I'",
    answerOptions: [
      {
        text: "J'ai fait",
        rationale: "Correct! 'J'ai fait' is the passé composé form of faire for the first person singular.",
        isCorrect: true
      },
      {
        text: "Tu as fait",
        rationale: "Incorrect. 'Tu as fait' is for 'you', not 'I'.",
        isCorrect: false
      },
      {
        text: "Il a fait",
        rationale: "Incorrect. 'Il a fait' is for 'he', not 'I'.",
        isCorrect: false
      },
      {
        text: "Nous avons fait",
        rationale: "Incorrect. 'Nous avons fait' is for 'we', not 'I'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "They did (masculine/mixed)",
    verb: "faire",
    tense: "Passé Composé",
    hint: "Choose the correct passé composé form of faire for 'they' (masculine/mixed)",
    answerOptions: [
      {
        text: "Ils ont fait",
        rationale: "Correct! 'Ils ont fait' is the passé composé form of faire for the third person plural masculine/mixed.",
        isCorrect: true
      },
      {
        text: "Elles ont fait",
        rationale: "Incorrect. 'Elles ont fait' is for 'they' feminine, not masculine/mixed.",
        isCorrect: false
      },
      {
        text: "Nous avons fait",
        rationale: "Incorrect. 'Nous avons fait' is for 'we', not 'they'.",
        isCorrect: false
      },
      {
        text: "J'ai fait",
        rationale: "Incorrect. 'J'ai fait' is for 'I', not 'they'.",
        isCorrect: false
      }
    ]
  },

  // ===== FAIRE – Futur Simple =====
  {
    question: "I will do",
    verb: "faire",
    tense: "Futur Simple",
    hint: "Choose the correct future tense form of faire for 'I'",
    answerOptions: [
      {
        text: "Je ferai",
        rationale: "Correct! 'Je ferai' is the future tense form of faire for the first person singular.",
        isCorrect: true
      },
      {
        text: "Tu feras",
        rationale: "Incorrect. 'Tu feras' is for 'you', not 'I'.",
        isCorrect: false
      },
      {
        text: "Il fera",
        rationale: "Incorrect. 'Il fera' is for 'he', not 'I'.",
        isCorrect: false
      },
      {
        text: "Nous ferons",
        rationale: "Incorrect. 'Nous ferons' is for 'we', not 'I'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "We will do",
    verb: "faire",
    tense: "Futur Simple",
    hint: "Choose the correct future tense form of faire for 'we'",
    answerOptions: [
      {
        text: "Nous ferons",
        rationale: "Correct! 'Nous ferons' is the future tense form of faire for the first person plural.",
        isCorrect: true
      },
      {
        text: "Vous ferez",
        rationale: "Incorrect. 'Vous ferez' is for 'you' (formal/plural), not 'we'.",
        isCorrect: false
      },
      {
        text: "Ils feront",
        rationale: "Incorrect. 'Ils feront' is for 'they', not 'we'.",
        isCorrect: false
      },
      {
        text: "Je ferai",
        rationale: "Incorrect. 'Je ferai' is for 'I', not 'we'.",
        isCorrect: false
      }
    ]
  }
];

// Helper function to get questions by verb and tense
export function getBeginnerPronounQuestions(verb: string, tense: string): BeginnerPronounQuestion[] {
  return BEGINNER_PRONOUN_QUESTIONS.filter(q => 
    q.verb === verb && q.tense === tense
  );
}

// Helper function to get random questions for a quiz
export function getRandomBeginnerPronounQuestions(verb: string, tense: string, count: number = 20): BeginnerPronounQuestion[] {
  const questions = getBeginnerPronounQuestions(verb, tense);
  
  // If we have fewer questions than requested, duplicate them to reach the count
  if (questions.length === 0) {
    return [];
  }
  
  if (questions.length >= count) {
    // Shuffle and return requested count
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }
  
  // If we have fewer questions, duplicate them intelligently to reach 20
  const result: BeginnerPronounQuestion[] = [];
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < count; i++) {
    const questionIndex = i % shuffled.length;
    result.push(shuffled[questionIndex]);
  }
  
  return result;
}

// Get all questions for a specific verb (all tenses)
export function getAllBeginnerPronounQuestionsByVerb(verb: string): BeginnerPronounQuestion[] {
  return BEGINNER_PRONOUN_QUESTIONS.filter(q => q.verb === verb);
}

// Get random mix of questions across all verbs for a specific tense
export function getRandomMixedBeginnerPronounQuestions(tense: string, count: number = 20): BeginnerPronounQuestion[] {
  const questions = BEGINNER_PRONOUN_QUESTIONS.filter(q => q.tense === tense);
  
  if (questions.length === 0) {
    return [];
  }
  
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  
  if (questions.length >= count) {
    return shuffled.slice(0, count);
  }
  
  // Duplicate to reach count
  const result: BeginnerPronounQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const questionIndex = i % shuffled.length;
    result.push(shuffled[questionIndex]);
  }
  
  return result;
}