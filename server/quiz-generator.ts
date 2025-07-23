import { GeneratedQuiz } from "./gemini-quiz";

// French verb conjugation data
const VERB_CONJUGATIONS = {
  être: {
    present: {
      je: "suis", tu: "es", il: "est", elle: "est", 
      nous: "sommes", vous: "êtes", ils: "sont", elles: "sont"
    },
    passé_composé: {
      je: "ai été", tu: "as été", il: "a été", elle: "a été",
      nous: "avons été", vous: "avez été", ils: "ont été", elles: "ont été"
    },
    imparfait: {
      je: "étais", tu: "étais", il: "était", elle: "était",
      nous: "étions", vous: "étiez", ils: "étaient", elles: "étaient"
    }
  },
  avoir: {
    present: {
      je: "ai", tu: "as", il: "a", elle: "a",
      nous: "avons", vous: "avez", ils: "ont", elles: "ont"
    },
    passé_composé: {
      je: "ai eu", tu: "as eu", il: "a eu", elle: "a eu",
      nous: "avons eu", vous: "avez eu", ils: "ont eu", elles: "ont eu"
    },
    imparfait: {
      je: "avais", tu: "avais", il: "avait", elle: "avait",
      nous: "avions", vous: "aviez", ils: "avaient", elles: "avaient"
    }
  },
  faire: {
    present: {
      je: "fais", tu: "fais", il: "fait", elle: "fait",
      nous: "faisons", vous: "faites", ils: "font", elles: "font"
    },
    passé_composé: {
      je: "ai fait", tu: "as fait", il: "a fait", elle: "a fait",
      nous: "avons fait", vous: "avez fait", ils: "ont fait", elles: "ont fait"
    },
    imparfait: {
      je: "faisais", tu: "faisais", il: "faisait", elle: "faisait",
      nous: "faisions", vous: "faisiez", ils: "faisaient", elles: "faisaient"
    }
  },
  aller: {
    present: {
      je: "vais", tu: "vas", il: "va", elle: "va",
      nous: "allons", vous: "allez", ils: "vont", elles: "vont"
    },
    passé_composé: {
      je: "suis allé(e)", tu: "es allé(e)", il: "est allé", elle: "est allée",
      nous: "sommes allé(e)s", vous: "êtes allé(e)s", ils: "sont allés", elles: "sont allées"
    },
    imparfait: {
      je: "allais", tu: "allais", il: "allait", elle: "allait",
      nous: "allions", vous: "alliez", ils: "allaient", elles: "allaient"
    }
  }
};

// Question templates with contexts
const QUESTION_CONTEXTS = {
  être: [
    { en: "I am happy", fr_context: "heureux/heureuse", pronoun: "je" },
    { en: "You are tired", fr_context: "fatigué(e)", pronoun: "tu" },
    { en: "He is a student", fr_context: "étudiant", pronoun: "il" },
    { en: "She is a teacher", fr_context: "professeure", pronoun: "elle" },
    { en: "We are friends", fr_context: "amis", pronoun: "nous" },
    { en: "You (plural) are ready", fr_context: "prêts", pronoun: "vous" },
    { en: "They are busy", fr_context: "occupés", pronoun: "ils" },
    { en: "I am not here", fr_context: "ici", negative: true, pronoun: "je" },
    { en: "She is not sick", fr_context: "malade", negative: true, pronoun: "elle" },
    { en: "We are not late", fr_context: "en retard", negative: true, pronoun: "nous" }
  ],
  avoir: [
    { en: "I have a car", fr_context: "une voiture", pronoun: "je" },
    { en: "You have time", fr_context: "du temps", pronoun: "tu" },
    { en: "He has money", fr_context: "de l'argent", pronoun: "il" },
    { en: "She has a dog", fr_context: "un chien", pronoun: "elle" },
    { en: "We have homework", fr_context: "des devoirs", pronoun: "nous" },
    { en: "You (plural) have luck", fr_context: "de la chance", pronoun: "vous" },
    { en: "They have problems", fr_context: "des problèmes", pronoun: "ils" },
    { en: "I don't have anything", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She has no choice", fr_context: "pas le choix", negative: true, pronoun: "elle" },
    { en: "We don't have time", fr_context: "pas le temps", negative: true, pronoun: "nous" }
  ],
  faire: [
    { en: "I do homework", fr_context: "mes devoirs", pronoun: "je" },
    { en: "You make dinner", fr_context: "le dîner", pronoun: "tu" },
    { en: "He does exercise", fr_context: "du sport", pronoun: "il" },
    { en: "She makes a cake", fr_context: "un gâteau", pronoun: "elle" },
    { en: "We do shopping", fr_context: "les courses", pronoun: "nous" },
    { en: "You (plural) make music", fr_context: "de la musique", pronoun: "vous" },
    { en: "They do work", fr_context: "du travail", pronoun: "ils" },
    { en: "I don't do anything", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She doesn't make mistakes", fr_context: "pas d'erreurs", negative: true, pronoun: "elle" },
    { en: "We don't do that", fr_context: "pas ça", negative: true, pronoun: "nous" }
  ]
};

// Generate wrong answers by using different conjugations
function generateDistractors(correctForm: string, verb: string, tense: string, pronoun: string): string[] {
  const distractors: string[] = [];
  const verbData = VERB_CONJUGATIONS[verb as keyof typeof VERB_CONJUGATIONS];
  
  if (!verbData) return ["incorrect1", "incorrect2", "incorrect3"];
  
  // Wrong pronouns for same tense
  const currentTense = verbData[tense as keyof typeof verbData] as any;
  if (currentTense) {
    Object.entries(currentTense).forEach(([p, form]) => {
      if (p !== pronoun && form !== correctForm) {
        distractors.push(form as string);
      }
    });
  }
  
  // Wrong tenses for same pronoun
  Object.entries(verbData).forEach(([t, conjugations]) => {
    if (t !== tense) {
      const wrongForm = (conjugations as any)[pronoun];
      if (wrongForm && wrongForm !== correctForm) {
        distractors.push(wrongForm);
      }
    }
  });
  
  // Shuffle and take first 3
  return distractors.sort(() => Math.random() - 0.5).slice(0, 3);
}

export function generateInternalQuiz(verb: string, tense: string): GeneratedQuiz {
  console.log(`🔧 Generating internal quiz for ${verb} - ${tense}`);
  
  // Normalize tense names
  const normalizedTense = tense.toLowerCase()
    .replace('présent', 'present')
    .replace('passé composé', 'passé_composé')
    .replace(/\s+/g, '_');
  
  const verbData = VERB_CONJUGATIONS[verb as keyof typeof VERB_CONJUGATIONS];
  const contexts = QUESTION_CONTEXTS[verb as keyof typeof QUESTION_CONTEXTS] || [];
  
  if (!verbData || !contexts.length) {
    throw new Error(`No internal data available for ${verb} - ${tense}`);
  }
  
  const tenseData = verbData[normalizedTense as keyof typeof verbData] as any;
  if (!tenseData) {
    throw new Error(`Tense ${normalizedTense} not available for ${verb}`);
  }
  
  const questions = [];
  const pronouns = ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles'];
  
  // Generate 20 questions by cycling through contexts and pronouns
  for (let i = 0; i < 20; i++) {
    const context = contexts[i % contexts.length];
    
    // Use specified pronoun from context, or cycle through pronouns
    const pronoun = (context as any).pronoun || pronouns[i % pronouns.length];
    const correctForm = tenseData[pronoun];
    
    if (!correctForm) continue;
    
    // Build correct answer
    let correctAnswer;
    if (context.negative && normalizedTense === 'present') {
      // Handle negation properly for present tense
      if (verb === 'avoir' && context.fr_context === 'rien') {
        correctAnswer = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} n'${correctForm} ${context.fr_context}`;
      } else {
        correctAnswer = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ne ${correctForm} pas ${context.fr_context}`;
      }
    } else {
      correctAnswer = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${correctForm}`;
      if (context.fr_context && !context.negative) {
        correctAnswer += ` ${context.fr_context}`;
      }
    }
    
    // Generate distractors with proper French grammar
    const wrongAnswers = [];
    
    // Generate distractors using correct pronoun but wrong conjugations
    const distractors = generateDistractors(correctForm, verb, normalizedTense, pronoun);
    distractors.slice(0, 3).forEach(form => {
      let wrong = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${form}`;
      if (context.fr_context && !context.negative) {
        wrong += ` ${context.fr_context}`;
      } else if (context.negative && normalizedTense === 'present') {
        if (verb === 'avoir' && context.fr_context === 'rien') {
          wrong = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} n'${form} ${context.fr_context}`;
        } else {
          wrong = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ne ${form} pas ${context.fr_context}`;
        }
      }
      wrongAnswers.push(wrong);
    });
    
    // Ensure we have exactly 4 options
    while (wrongAnswers.length < 3) {
      wrongAnswers.push(`${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} [incorrect]`);
    }
    
    const allAnswers = [
      { text: correctAnswer, rationale: `Correct conjugation of ${verb} for ${pronoun} in ${tense}.`, isCorrect: true },
      { text: wrongAnswers[0], rationale: `Incorrect conjugation for ${pronoun}.`, isCorrect: false },
      { text: wrongAnswers[1], rationale: `Wrong tense or wrong pronoun conjugation.`, isCorrect: false },
      { text: wrongAnswers[2], rationale: `This uses an incorrect form of ${verb}.`, isCorrect: false }
    ];
    
    // Shuffle answers
    const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);
    
    questions.push({
      question: context.en,
      hint: `Conjugate ${verb} for ${pronoun} in ${tense}`,
      answerOptions: shuffledAnswers
    });
  }
  
  return { questions };
}