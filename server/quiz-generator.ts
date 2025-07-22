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
    { en: "I am happy", fr_context: "heureux/heureuse" },
    { en: "You are tired", fr_context: "fatigué(e)" },
    { en: "He is a student", fr_context: "étudiant" },
    { en: "She is a teacher", fr_context: "professeure" },
    { en: "We are friends", fr_context: "amis" },
    { en: "You (plural) are ready", fr_context: "prêts" },
    { en: "They are busy", fr_context: "occupés" },
    { en: "I am not here", fr_context: "ici", negative: true },
    { en: "She is not sick", fr_context: "malade", negative: true },
    { en: "We are not late", fr_context: "en retard", negative: true }
  ],
  avoir: [
    { en: "I have a car", fr_context: "une voiture" },
    { en: "You have time", fr_context: "du temps" },
    { en: "He has money", fr_context: "de l'argent" },
    { en: "She has a dog", fr_context: "un chien" },
    { en: "We have homework", fr_context: "des devoirs" },
    { en: "You (plural) have luck", fr_context: "de la chance" },
    { en: "They have problems", fr_context: "des problèmes" },
    { en: "I don't have anything", fr_context: "rien", negative: true },
    { en: "She has no choice", fr_context: "pas le choix", negative: true },
    { en: "We don't have time", fr_context: "pas le temps", negative: true }
  ],
  faire: [
    { en: "I do homework", fr_context: "mes devoirs" },
    { en: "You make dinner", fr_context: "le dîner" },
    { en: "He does exercise", fr_context: "du sport" },
    { en: "She makes a cake", fr_context: "un gâteau" },
    { en: "We do shopping", fr_context: "les courses" },
    { en: "You (plural) make music", fr_context: "de la musique" },
    { en: "They do work", fr_context: "du travail" },
    { en: "I don't do anything", fr_context: "rien", negative: true },
    { en: "She doesn't make mistakes", fr_context: "pas d'erreurs", negative: true },
    { en: "We don't do that", fr_context: "pas ça", negative: true }
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
    const pronoun = pronouns[i % pronouns.length];
    const correctForm = tenseData[pronoun];
    
    if (!correctForm) continue;
    
    // Build correct answer
    let correctAnswer = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${correctForm}`;
    if (context.fr_context) {
      if (context.negative) {
        // Handle negation
        if (normalizedTense === 'present') {
          correctAnswer = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ne ${correctForm.split(' ')[0]} pas ${context.fr_context}`;
        }
      } else {
        correctAnswer += ` ${context.fr_context}`;
      }
    }
    
    // Generate distractors
    const distractors = generateDistractors(correctForm, verb, normalizedTense, pronoun);
    const wrongAnswers = distractors.map(form => {
      let wrong = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} ${form}`;
      if (context.fr_context && !context.negative) {
        wrong += ` ${context.fr_context}`;
      }
      return wrong;
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