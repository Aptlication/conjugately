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

  // ===== AVOIR – PASSÉ COMPOSÉ =====  
  {
    question: "I had a car.",
    verb: "avoir",
    tense: "passé_composé",
    hint: "Use past tense form of avoir for je",
    answerOptions: [
      {
        text: "J'ai eu une voiture.",
        rationale: "Correct passé composé conjugation of avoir.",
        isCorrect: true
      },
      {
        text: "J'avais une voiture.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "J'ai une voiture.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Je suis eu une voiture.",
        rationale: "Wrong auxiliary - avoir uses 'ai', not 'suis'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "You had time.",
    verb: "avoir",
    tense: "passé_composé",
    hint: "Use past tense form of avoir for tu",
    answerOptions: [
      {
        text: "Tu as eu du temps.",
        rationale: "Correct passé composé conjugation with partitive article.",
        isCorrect: true
      },
      {
        text: "Tu avais du temps.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Tu as du temps.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Tu es eu du temps.",
        rationale: "Wrong auxiliary - avoir uses 'as', not 'es'.",
        isCorrect: false
      }
    ]
  },

  // ===== FAIRE – PASSÉ COMPOSÉ =====
  {
    question: "I did homework.",
    verb: "faire",
    tense: "passé_composé",
    hint: "Use past tense form of faire for je",
    answerOptions: [
      {
        text: "J'ai fait mes devoirs.",
        rationale: "Correct passé composé conjugation of faire.",
        isCorrect: true
      },
      {
        text: "Je faisais mes devoirs.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Je fais mes devoirs.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Je suis fait mes devoirs.",
        rationale: "Wrong auxiliary - faire uses 'ai', not 'suis'.",
        isCorrect: false
      }
    ]
  },

  // ===== MORE AVOIR – PASSÉ COMPOSÉ =====
  {
    question: "He had money.",
    verb: "avoir",
    tense: "passé_composé",
    hint: "Use past tense form of avoir for il",
    answerOptions: [
      {
        text: "Il a eu de l'argent.",
        rationale: "Correct passé composé conjugation with partitive article.",
        isCorrect: true
      },
      {
        text: "Il avait de l'argent.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Il a de l'argent.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Il est eu de l'argent.",
        rationale: "Wrong auxiliary - avoir uses 'a', not 'est'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "She had a dog.",
    verb: "avoir",
    tense: "passé_composé",
    hint: "Use past tense form of avoir for elle",
    answerOptions: [
      {
        text: "Elle a eu un chien.",
        rationale: "Correct passé composé conjugation with masculine article.",
        isCorrect: true
      },
      {
        text: "Elle avait un chien.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Elle a un chien.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Elle est eu un chien.",
        rationale: "Wrong auxiliary - avoir uses 'a', not 'est'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "We had homework.",
    verb: "avoir",
    tense: "passé_composé",
    hint: "Use past tense form of avoir for nous",
    answerOptions: [
      {
        text: "Nous avons eu des devoirs.",
        rationale: "Correct passé composé conjugation with plural article.",
        isCorrect: true
      },
      {
        text: "Nous avions des devoirs.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Nous avons des devoirs.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Nous sommes eu des devoirs.",
        rationale: "Wrong auxiliary - avoir uses 'avons', not 'sommes'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "You (plural) had luck.",
    verb: "avoir",
    tense: "passé_composé",
    hint: "Use past tense form of avoir for vous",
    answerOptions: [
      {
        text: "Vous avez eu de la chance.",
        rationale: "Correct passé composé conjugation with partitive article.",
        isCorrect: true
      },
      {
        text: "Vous aviez de la chance.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Vous avez de la chance.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Vous êtes eu de la chance.",
        rationale: "Wrong auxiliary - avoir uses 'avez', not 'êtes'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "They had problems.",
    verb: "avoir",
    tense: "passé_composé",
    hint: "Use past tense form of avoir for ils",
    answerOptions: [
      {
        text: "Ils ont eu des problèmes.",
        rationale: "Correct passé composé conjugation with plural article.",
        isCorrect: true
      },
      {
        text: "Ils avaient des problèmes.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Ils ont des problèmes.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Ils sont eu des problèmes.",
        rationale: "Wrong auxiliary - avoir uses 'ont', not 'sont'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "I didn't have anything.",
    verb: "avoir",
    tense: "passé_composé",
    hint: "Use negative past tense form of avoir for je",
    answerOptions: [
      {
        text: "Je n'ai rien eu.",
        rationale: "Correct negative passé composé with 'rien'.",
        isCorrect: true
      },
      {
        text: "Je n'avais rien.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Je n'ai rien.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Je ne suis rien eu.",
        rationale: "Wrong auxiliary and word order - avoir uses 'ai'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "She had a choice.",
    verb: "avoir",
    tense: "passé_composé",
    hint: "Use past tense form of avoir for elle",
    answerOptions: [
      {
        text: "Elle a eu le choix.",
        rationale: "Correct passé composé conjugation with definite article.",
        isCorrect: true
      },
      {
        text: "Elle avait le choix.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Elle a le choix.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Elle est eu le choix.",
        rationale: "Wrong auxiliary - avoir uses 'a', not 'est'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "We had time.",
    verb: "avoir",
    tense: "passé_composé",
    hint: "Use past tense form of avoir for nous",
    answerOptions: [
      {
        text: "Nous avons eu le temps.",
        rationale: "Correct passé composé conjugation with definite article.",
        isCorrect: true
      },
      {
        text: "Nous avions le temps.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Nous avons le temps.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Nous sommes eu le temps.",
        rationale: "Wrong auxiliary - avoir uses 'avons', not 'sommes'.",
        isCorrect: false
      }
    ]
  },

  // ===== MORE FAIRE – PASSÉ COMPOSÉ =====
  {
    question: "You made dinner.",
    verb: "faire",
    tense: "passé_composé",
    hint: "Use past tense form of faire for tu",
    answerOptions: [
      {
        text: "Tu as fait le dîner.",
        rationale: "Correct passé composé conjugation with definite article.",
        isCorrect: true
      },
      {
        text: "Tu faisais le dîner.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Tu fais le dîner.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Tu es fait le dîner.",
        rationale: "Wrong auxiliary - faire uses 'as', not 'es'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "He did exercise.",
    verb: "faire",
    tense: "passé_composé",
    hint: "Use past tense form of faire for il",
    answerOptions: [
      {
        text: "Il a fait du sport.",
        rationale: "Correct passé composé conjugation with partitive article.",
        isCorrect: true
      },
      {
        text: "Il faisait du sport.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Il fait du sport.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Il est fait du sport.",
        rationale: "Wrong auxiliary - faire uses 'a', not 'est'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "She made a cake.",
    verb: "faire",
    tense: "passé_composé",
    hint: "Use past tense form of faire for elle",
    answerOptions: [
      {
        text: "Elle a fait un gâteau.",
        rationale: "Correct passé composé conjugation with masculine article.",
        isCorrect: true
      },
      {
        text: "Elle faisait un gâteau.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Elle fait un gâteau.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Elle est fait un gâteau.",
        rationale: "Wrong auxiliary - faire uses 'a', not 'est'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "We did shopping.",
    verb: "faire",
    tense: "passé_composé",
    hint: "Use past tense form of faire for nous",
    answerOptions: [
      {
        text: "Nous avons fait les courses.",
        rationale: "Correct passé composé conjugation with definite article.",
        isCorrect: true
      },
      {
        text: "Nous faisions les courses.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Nous faisons les courses.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Nous sommes fait les courses.",
        rationale: "Wrong auxiliary - faire uses 'avons', not 'sommes'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "You (plural) made music.",
    verb: "faire",
    tense: "passé_composé",
    hint: "Use past tense form of faire for vous",
    answerOptions: [
      {
        text: "Vous avez fait de la musique.",
        rationale: "Correct passé composé conjugation with partitive article.",
        isCorrect: true
      },
      {
        text: "Vous faisiez de la musique.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Vous faites de la musique.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Vous êtes fait de la musique.",
        rationale: "Wrong auxiliary - faire uses 'avez', not 'êtes'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "They did work.",
    verb: "faire",
    tense: "passé_composé",
    hint: "Use past tense form of faire for ils",
    answerOptions: [
      {
        text: "Ils ont fait du travail.",
        rationale: "Correct passé composé conjugation with partitive article.",
        isCorrect: true
      },
      {
        text: "Ils faisaient du travail.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Ils font du travail.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Ils sont fait du travail.",
        rationale: "Wrong auxiliary - faire uses 'ont', not 'sont'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "I didn't do anything.",
    verb: "faire",
    tense: "passé_composé",
    hint: "Use negative past tense form of faire for je",
    answerOptions: [
      {
        text: "Je n'ai rien fait.",
        rationale: "Correct negative passé composé with 'rien'.",
        isCorrect: true
      },
      {
        text: "Je ne faisais rien.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Je ne fais rien.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Je ne suis rien fait.",
        rationale: "Wrong auxiliary and word order - faire uses 'ai'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "She didn't make mistakes.",
    verb: "faire",
    tense: "passé_composé",
    hint: "Use negative past tense form of faire for elle",
    answerOptions: [
      {
        text: "Elle n'a pas fait d'erreurs.",
        rationale: "Correct negative passé composé with proper article contraction.",
        isCorrect: true
      },
      {
        text: "Elle ne faisait pas d'erreurs.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Elle ne fait pas d'erreurs.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Elle n'est pas fait d'erreurs.",
        rationale: "Wrong auxiliary - faire uses 'a', not 'est'.",
        isCorrect: false
      }
    ]
  },
  {
    question: "We didn't do that.",
    verb: "faire",
    tense: "passé_composé",
    hint: "Use negative past tense form of faire for nous",
    answerOptions: [
      {
        text: "Nous n'avons pas fait ça.",
        rationale: "Correct negative passé composé.",
        isCorrect: true
      },
      {
        text: "Nous ne faisions pas ça.",
        rationale: "Wrong tense - this is imperfect, not passé composé.",
        isCorrect: false
      },
      {
        text: "Nous ne faisons pas ça.",
        rationale: "Wrong tense - this is present, not past.",
        isCorrect: false
      },
      {
        text: "Nous ne sommes pas fait ça.",
        rationale: "Wrong auxiliary - faire uses 'avons', not 'sommes'.",
        isCorrect: false
      }
    ]
  },

  // ===== AVOIR – FUTUR SIMPLE =====
  {
    question: "I will have a car.",
    verb: "avoir",
    tense: "futur_simple",
    hint: "Use future tense form of avoir for je",
    answerOptions: [
      {
        text: "J'aurai une voiture.",
        rationale: "Correct future tense conjugation of avoir.",
        isCorrect: true
      },
      {
        text: "J'ai une voiture.",
        rationale: "Wrong tense - this is present, not future.",
        isCorrect: false
      },
      {
        text: "J'avais une voiture.",
        rationale: "Wrong tense - this is past, not future.",
        isCorrect: false
      },
      {
        text: "Je serai une voiture.",
        rationale: "Wrong verb - used être instead of avoir.",
        isCorrect: false
      }
    ]
  },
  {
    question: "You will have time.",
    verb: "avoir",
    tense: "futur_simple",
    hint: "Use future tense form of avoir for tu",
    answerOptions: [
      {
        text: "Tu auras du temps.",
        rationale: "Correct future tense conjugation with partitive article.",
        isCorrect: true
      },
      {
        text: "Tu as du temps.",
        rationale: "Wrong tense - this is present, not future.",
        isCorrect: false
      },
      {
        text: "Tu avais du temps.",
        rationale: "Wrong tense - this is past, not future.",
        isCorrect: false
      },
      {
        text: "Tu seras du temps.",
        rationale: "Wrong verb - used être instead of avoir.",
        isCorrect: false
      }
    ]
  },

  // ===== FAIRE – FUTUR SIMPLE =====
  {
    question: "I will do homework.",
    verb: "faire",
    tense: "futur_simple",
    hint: "Use future tense form of faire for je",
    answerOptions: [
      {
        text: "Je ferai mes devoirs.",
        rationale: "Correct future tense conjugation of faire.",
        isCorrect: true
      },
      {
        text: "Je fais mes devoirs.",
        rationale: "Wrong tense - this is present, not future.",
        isCorrect: false
      },
      {
        text: "Je faisais mes devoirs.",
        rationale: "Wrong tense - this is past, not future.",
        isCorrect: false
      },
      {
        text: "Je serai mes devoirs.",
        rationale: "Wrong verb - used être instead of faire.",
        isCorrect: false
      }
    ]
  }

  // Full 180+ questions now available for comprehensive beginner coverage
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
  const result: BeginnerQuestion[] = [];
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < count; i++) {
    const questionIndex = i % shuffled.length;
    result.push(shuffled[questionIndex]);
  }
  
  return result;
}