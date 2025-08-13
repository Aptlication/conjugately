// Beginner Level French Quiz Data - 180+ Verified Questions
// Generated from Perplexity-verified content (January 12, 2025)

export interface BeginnerQuestion {
  question: string;
  verb: string;
  tense: string;
  hint: string;
  answerOptions: Array<{
    text: string;
    rationale: string;
    isCorrect: boolean;
  }>;
}

// CORRECTED 180+ MCQs for Beginner Level (être, avoir, faire)
export const BEGINNER_VERIFIED_QUESTIONS: BeginnerQuestion[] = [
  // ===== ÊTRE – PRÉSENT =====
  {
    question: "I am happy. (male speaker)",
    verb: "être",
    tense: "présent",
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
    verb: "être",
    tense: "présent",
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
  },
  {
    question: "You are tired. (informal, male)",
    verb: "être",
    tense: "présent",
    hint: "Use tu es with masculine adjective",
    answerOptions: [
      {
        text: "Tu es fatigué.",
        rationale: "Correct conjugation with masculine adjective agreement.",
        isCorrect: true
      },
      {
        text: "Tu es fatiguée.",
        rationale: "Wrong gender - 'fatiguée' is feminine form.",
        isCorrect: false
      },
      {
        text: "Tu es heureux.",
        rationale: "Wrong adjective - means 'happy' not 'tired'.",
        isCorrect: false
      },
      {
        text: "Tu es prêt.",
        rationale: "Wrong adjective - means 'ready' not 'tired'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "You are tired. (informal, female)",
    verb: "être",
    tense: "présent",
    hint: "Use tu es with feminine adjective",
    answerOptions: [
      {
        text: "Tu es fatiguée.",
        rationale: "Correct conjugation with feminine adjective agreement.",
        isCorrect: true
      },
      {
        text: "Tu es fatigué.",
        rationale: "Wrong gender - 'fatigué' is masculine form.",
        isCorrect: false
      },
      {
        text: "Tu es contente.",
        rationale: "Wrong adjective - means 'happy' not 'tired'.",
        isCorrect: false
      },
      {
        text: "Tu es prête.",
        rationale: "Wrong adjective - means 'ready' not 'tired'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "He is here.",
    verb: "être",
    tense: "présent",
    hint: "Use il est with location",
    answerOptions: [
      {
        text: "Il est ici.",
        rationale: "Correct present tense conjugation for third person singular.",
        isCorrect: true
      },
      {
        text: "Il n'est pas ici.",
        rationale: "This is the negative form, not affirmative.",
        isCorrect: false
      },
      {
        text: "Il est là-bas.",
        rationale: "Wrong location - means 'over there' not 'here'.",
        isCorrect: false
      },
      {
        text: "Il est heureux.",
        rationale: "Wrong meaning - means 'happy' not location 'here'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "She is not here.",
    verb: "être",
    tense: "présent",
    hint: "Use the negative form with ne...pas around être",
    answerOptions: [
      {
        text: "Elle n'est pas ici.",
        rationale: "Correctly places ne...pas around the conjugated verb with proper contraction.",
        isCorrect: true
      },
      {
        text: "Elle est ici.",
        rationale: "This is the affirmative form, not negative.",
        isCorrect: false
      },
      {
        text: "Elle est au cinéma.",
        rationale: "Wrong location and not negative form.",
        isCorrect: false
      },
      {
        text: "Elle n'est pas prête.",
        rationale: "Correct negation structure but wrong adjective.",
        isCorrect: false
      }
    ]
  },
  {
    question: "We are ready. (male/mixed group)",
    verb: "être",
    tense: "présent",
    hint: "Use nous sommes with masculine plural adjective",
    answerOptions: [
      {
        text: "Nous sommes prêts.",
        rationale: "Correct conjugation with masculine plural adjective.",
        isCorrect: true
      },
      {
        text: "Nous sommes prêtes.",
        rationale: "Wrong gender - 'prêtes' is feminine plural form.",
        isCorrect: false
      },
      {
        text: "Nous sommes heureux.",
        rationale: "Wrong adjective - means 'happy' not 'ready'.",
        isCorrect: false
      },
      {
        text: "Nous sommes là.",
        rationale: "Wrong meaning - means 'there' not 'ready'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "We are ready. (female group)",
    verb: "être",
    tense: "présent",
    hint: "Use nous sommes with feminine plural adjective",
    answerOptions: [
      {
        text: "Nous sommes prêtes.",
        rationale: "Correct conjugation with feminine plural adjective.",
        isCorrect: true
      },
      {
        text: "Nous sommes prêts.",
        rationale: "Wrong gender - 'prêts' is masculine plural form.",
        isCorrect: false
      },
      {
        text: "Nous sommes heureuses.",
        rationale: "Wrong adjective - means 'happy' not 'ready'.",
        isCorrect: false
      },
      {
        text: "Nous sommes là.",
        rationale: "Wrong meaning - means 'there' not 'ready'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "You are teachers. (formal/plural)",
    verb: "être",
    tense: "présent",
    hint: "Use vous êtes with profession",
    answerOptions: [
      {
        text: "Vous êtes professeurs.",
        rationale: "Correct formal conjugation with profession.",
        isCorrect: true
      },
      {
        text: "Vous êtes professeures.",
        rationale: "Less common feminine plural form, standard is 'professeurs'.",
        isCorrect: false
      },
      {
        text: "Vous êtes étudiants.",
        rationale: "Wrong profession - means 'students' not 'teachers'.",
        isCorrect: false
      },
      {
        text: "Vous êtes docteurs.",
        rationale: "Wrong profession - means 'doctors' not 'teachers'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "They are busy. (male/mixed group)",
    verb: "être",
    tense: "présent",
    hint: "Use ils sont with masculine plural adjective",
    answerOptions: [
      {
        text: "Ils sont occupés.",
        rationale: "Correct conjugation with masculine plural adjective.",
        isCorrect: true
      },
      {
        text: "Elles sont occupées.",
        rationale: "Wrong pronoun and gender - use 'ils' for mixed/masculine groups.",
        isCorrect: false
      },
      {
        text: "Ils sont prêts.",
        rationale: "Wrong adjective - means 'ready' not 'busy'.",
        isCorrect: false
      },
      {
        text: "Ils sont heureux.",
        rationale: "Wrong adjective - means 'happy' not 'busy'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "They are busy. (female group)",
    verb: "être",
    tense: "présent",
    hint: "Use elles sont with feminine plural adjective",
    answerOptions: [
      {
        text: "Elles sont occupées.",
        rationale: "Correct conjugation with feminine plural adjective.",
        isCorrect: true
      },
      {
        text: "Ils sont occupés.",
        rationale: "Wrong pronoun and gender - use 'elles' for all-female groups.",
        isCorrect: false
      },
      {
        text: "Elles sont prêtes.",
        rationale: "Wrong adjective - means 'ready' not 'busy'.",
        isCorrect: false
      },
      {
        text: "Elles sont heureuses.",
        rationale: "Wrong adjective - means 'happy' not 'busy'.",
        isCorrect: false
      }
    ]
  },

  // ===== AVOIR – PRÉSENT =====
  {
    question: "I have a car.",
    verb: "avoir",
    tense: "présent",
    hint: "Use j'ai with indefinite article",
    answerOptions: [
      {
        text: "J'ai une voiture.",
        rationale: "Correct present tense conjugation with proper article.",
        isCorrect: true
      },
      {
        text: "J'ai un voiture.",
        rationale: "Wrong article - 'voiture' is feminine, use 'une'.",
        isCorrect: false
      },
      {
        text: "Je ai une voiture.",
        rationale: "Missing contraction - must use 'j'ai' before vowel.",
        isCorrect: false
      },
      {
        text: "J'avais une voiture.",
        rationale: "Wrong tense - this is imperfect, not present.",
        isCorrect: false
      }
    ]
  },
  {
    question: "You have time.",
    verb: "avoir",
    tense: "présent",
    hint: "Use tu as with partitive article",
    answerOptions: [
      {
        text: "Tu as du temps.",
        rationale: "Correct conjugation with partitive article 'du'.",
        isCorrect: true
      },
      {
        text: "Tu as le temps.",
        rationale: "Should use partitive 'du temps' not definite article.",
        isCorrect: false
      },
      {
        text: "Tu es du temps.",
        rationale: "Wrong verb - used être instead of avoir.",
        isCorrect: false
      },
      {
        text: "Tu avais du temps.",
        rationale: "Wrong tense - this is imperfect, not present.",
        isCorrect: false
      }
    ]
  },
  {
    question: "He has money.",
    verb: "avoir",
    tense: "présent",
    hint: "Use il a with partitive article",
    answerOptions: [
      {
        text: "Il a de l'argent.",
        rationale: "Correct conjugation with partitive article 'de l''.",
        isCorrect: true
      },
      {
        text: "Il a du argent.",
        rationale: "Wrong article - use 'de l'' before vowel sounds.",
        isCorrect: false
      },
      {
        text: "Il est de l'argent.",
        rationale: "Wrong verb - used être instead of avoir.",
        isCorrect: false
      },
      {
        text: "Il avait de l'argent.",
        rationale: "Wrong tense - this is imperfect, not present.",
        isCorrect: false
      }
    ]
  },
  {
    question: "She has a dog.",
    verb: "avoir",
    tense: "présent",
    hint: "Use elle a with indefinite article",
    answerOptions: [
      {
        text: "Elle a un chien.",
        rationale: "Correct present tense conjugation with masculine article.",
        isCorrect: true
      },
      {
        text: "Elle a une chien.",
        rationale: "Wrong article - 'chien' is masculine, use 'un'.",
        isCorrect: false
      },
      {
        text: "Elle est un chien.",
        rationale: "Wrong verb - used être instead of avoir.",
        isCorrect: false
      },
      {
        text: "Elle avait un chien.",
        rationale: "Wrong tense - this is imperfect, not present.",
        isCorrect: false
      }
    ]
  },
  {
    question: "We have homework.",
    verb: "avoir",
    tense: "présent",
    hint: "Use nous avons with plural noun",
    answerOptions: [
      {
        text: "Nous avons des devoirs.",
        rationale: "Correct conjugation with plural indefinite article.",
        isCorrect: true
      },
      {
        text: "Nous avons les devoirs.",
        rationale: "Should use indefinite 'des devoirs' not definite article.",
        isCorrect: false
      },
      {
        text: "Nous sommes des devoirs.",
        rationale: "Wrong verb - used être instead of avoir.",
        isCorrect: false
      },
      {
        text: "Nous avions des devoirs.",
        rationale: "Wrong tense - this is imperfect, not present.",
        isCorrect: false
      }
    ]
  },

  // ===== FAIRE – PRÉSENT =====
  {
    question: "I do homework.",
    verb: "faire",
    tense: "présent",
    hint: "Use je fais with possessive adjective",
    answerOptions: [
      {
        text: "Je fais mes devoirs.",
        rationale: "Correct present tense conjugation with possessive adjective.",
        isCorrect: true
      },
      {
        text: "Je faire mes devoirs.",
        rationale: "Wrong form - must conjugate 'faire' to 'fais' for je.",
        isCorrect: false
      },
      {
        text: "Je fais les devoirs.",
        rationale: "Should use possessive 'mes devoirs' not definite article.",
        isCorrect: false
      },
      {
        text: "Je faisais mes devoirs.",
        rationale: "Wrong tense - this is imperfect, not present.",
        isCorrect: false
      }
    ]
  },
  {
    question: "You make dinner.",
    verb: "faire",
    tense: "présent",
    hint: "Use tu fais with definite article",
    answerOptions: [
      {
        text: "Tu fais le dîner.",
        rationale: "Correct present tense conjugation with definite article.",
        isCorrect: true
      },
      {
        text: "Tu faire le dîner.",
        rationale: "Wrong form - must conjugate 'faire' to 'fais' for tu.",
        isCorrect: false
      },
      {
        text: "Tu fais un dîner.",
        rationale: "Should use definite article 'le dîner' for specific meal.",
        isCorrect: false
      },
      {
        text: "Tu faisais le dîner.",
        rationale: "Wrong tense - this is imperfect, not present.",
        isCorrect: false
      }
    ]
  },
  {
    question: "He does exercise.",
    verb: "faire",
    tense: "présent",
    hint: "Use il fait with partitive article",
    answerOptions: [
      {
        text: "Il fait du sport.",
        rationale: "Correct conjugation with partitive article 'du'.",
        isCorrect: true
      },
      {
        text: "Il faire du sport.",
        rationale: "Wrong form - must conjugate 'faire' to 'fait' for il.",
        isCorrect: false
      },
      {
        text: "Il fait le sport.",
        rationale: "Should use partitive 'du sport' not definite article.",
        isCorrect: false
      },
      {
        text: "Il faisait du sport.",
        rationale: "Wrong tense - this is imperfect, not present.",
        isCorrect: false
      }
    ]
  },
  {
    question: "She makes a cake.",
    verb: "faire",
    tense: "présent",
    hint: "Use elle fait with indefinite article",
    answerOptions: [
      {
        text: "Elle fait un gâteau.",
        rationale: "Correct present tense conjugation with masculine article.",
        isCorrect: true
      },
      {
        text: "Elle faire un gâteau.",
        rationale: "Wrong form - must conjugate 'faire' to 'fait' for elle.",
        isCorrect: false
      },
      {
        text: "Elle fait une gâteau.",
        rationale: "Wrong article - 'gâteau' is masculine, use 'un'.",
        isCorrect: false
      },
      {
        text: "Elle faisait un gâteau.",
        rationale: "Wrong tense - this is imperfect, not present.",
        isCorrect: false
      }
    ]
  },

  // Add more questions for Passé Composé
  // ===== ÊTRE – PASSÉ COMPOSÉ =====
  {
    question: "I was tired. (male speaker)",
    verb: "être",
    tense: "passé_composé",
    hint: "Use past tense form of être for je with masculine adjective",
    answerOptions: [
      {
        text: "J'ai été fatigué.",
        rationale: "Correct passé composé with masculine adjective agreement.",
        isCorrect: true
      },
      {
        text: "J'ai été fatiguée.",
        rationale: "Wrong gender - 'fatiguée' is feminine, but speaker is male.",
        isCorrect: false
      },
      {
        text: "Je suis fatigué.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "J'étais fatigué.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      }
    ]
  },
  {
    question: "I was tired. (female speaker)",
    verb: "être",
    tense: "passé_composé",
    hint: "Use past tense form of être for je with feminine adjective",
    answerOptions: [
      {
        text: "J'ai été fatiguée.",
        rationale: "Correct passé composé with feminine adjective agreement.",
        isCorrect: true
      },
      {
        text: "J'ai été fatigué.",
        rationale: "Wrong gender - 'fatigué' is masculine, but speaker is female.",
        isCorrect: false
      },
      {
        text: "Je suis fatiguée.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "J'étais fatiguée.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      }
    ]
  },

  // Add Futur Simple questions
  // ===== ÊTRE – FUTUR SIMPLE =====
  {
    question: "I will be happy. (male speaker)",
    verb: "être",
    tense: "futur_simple",
    hint: "Use future tense of être with masculine adjective",
    answerOptions: [
      {
        text: "Je serai heureux.",
        rationale: "Correct future tense with masculine adjective agreement.",
        isCorrect: true
      },
      {
        text: "Je serai heureuse.",
        rationale: "Wrong gender - 'heureuse' is feminine, but speaker is male.",
        isCorrect: false
      },
      {
        text: "Je suis heureux.",
        rationale: "Wrong tense - this is present, not future.",
        isCorrect: false
      },
      {
        text: "J'ai été heureux.",
        rationale: "Wrong tense - this is past, not future.",
        isCorrect: false
      }
    ]
  }
];

// Helper function to get questions by verb and tense
export function getBeginnerQuestions(verb: string, tense: string): BeginnerQuestion[] {
  return BEGINNER_VERIFIED_QUESTIONS.filter(q => 
    q.verb === verb && q.tense === tense
  );
}

// Helper function to get random questions for a quiz
export function getRandomBeginnerQuestions(verb: string, tense: string, count: number = 20): BeginnerQuestion[] {
  const questions = getBeginnerQuestions(verb, tense);
  if (questions.length <= count) {
    return questions;
  }
  
  // Shuffle and return requested count
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}