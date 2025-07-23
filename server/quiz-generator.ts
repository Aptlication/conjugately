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
    },
    plus_que_parfait: {
      je: "avais été", tu: "avais été", il: "avait été", elle: "avait été",
      nous: "avions été", vous: "aviez été", ils: "avaient été", elles: "avaient été"
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
    },
    plus_que_parfait: {
      je: "avais eu", tu: "avais eu", il: "avait eu", elle: "avait eu",
      nous: "avions eu", vous: "aviez eu", ils: "avaient eu", elles: "avaient eu"
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
    },
    plus_que_parfait: {
      je: "avais fait", tu: "avais fait", il: "avait fait", elle: "avait fait",
      nous: "avions fait", vous: "aviez fait", ils: "avaient fait", elles: "avaient fait"
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
    },
    plus_que_parfait: {
      je: "étais allé(e)", tu: "étais allé(e)", il: "était allé", elle: "était allée",
      nous: "étions allé(e)s", vous: "étiez allé(e)s", ils: "étaient allés", elles: "étaient allées"
    }
  },
  voir: {
    present: {
      je: "vois", tu: "vois", il: "voit", elle: "voit",
      nous: "voyons", vous: "voyez", ils: "voient", elles: "voient"
    },
    passé_composé: {
      je: "ai vu", tu: "as vu", il: "a vu", elle: "a vu",
      nous: "avons vu", vous: "avez vu", ils: "ont vu", elles: "ont vu"
    },
    imparfait: {
      je: "voyais", tu: "voyais", il: "voyait", elle: "voyait",
      nous: "voyions", vous: "voyiez", ils: "voyaient", elles: "voyaient"
    },
    plus_que_parfait: {
      je: "avais vu", tu: "avais vu", il: "avait vu", elle: "avait vu",
      nous: "avions vu", vous: "aviez vu", ils: "avaient vu", elles: "avaient vu"
    }
  },
  dire: {
    present: {
      je: "dis", tu: "dis", il: "dit", elle: "dit",
      nous: "disons", vous: "dites", ils: "disent", elles: "disent"
    },
    passé_composé: {
      je: "ai dit", tu: "as dit", il: "a dit", elle: "a dit",
      nous: "avons dit", vous: "avez dit", ils: "ont dit", elles: "ont dit"
    },
    imparfait: {
      je: "disais", tu: "disais", il: "disait", elle: "disait",
      nous: "disions", vous: "disiez", ils: "disaient", elles: "disaient"
    },
    plus_que_parfait: {
      je: "avais dit", tu: "avais dit", il: "avait dit", elle: "avait dit",
      nous: "avions dit", vous: "aviez dit", ils: "avaient dit", elles: "avaient dit"
    }
  },
  savoir: {
    present: {
      je: "sais", tu: "sais", il: "sait", elle: "sait",
      nous: "savons", vous: "savez", ils: "savent", elles: "savent"
    },
    passé_composé: {
      je: "ai su", tu: "as su", il: "a su", elle: "a su",
      nous: "avons su", vous: "avez su", ils: "ont su", elles: "ont su"
    },
    imparfait: {
      je: "savais", tu: "savais", il: "savait", elle: "savait",
      nous: "savions", vous: "saviez", ils: "savaient", elles: "savaient"
    },
    plus_que_parfait: {
      je: "avais su", tu: "avais su", il: "avait su", elle: "avait su",
      nous: "avions su", vous: "aviez su", ils: "avaient su", elles: "avaient su"
    }
  },
  pouvoir: {
    present: {
      je: "peux", tu: "peux", il: "peut", elle: "peut",
      nous: "pouvons", vous: "pouvez", ils: "peuvent", elles: "peuvent"
    },
    passé_composé: {
      je: "ai pu", tu: "as pu", il: "a pu", elle: "a pu",
      nous: "avons pu", vous: "avez pu", ils: "ont pu", elles: "ont pu"
    },
    imparfait: {
      je: "pouvais", tu: "pouvais", il: "pouvait", elle: "pouvait",
      nous: "pouvions", vous: "pouviez", ils: "pouvaient", elles: "pouvaient"
    },
    plus_que_parfait: {
      je: "avais pu", tu: "avais pu", il: "avait pu", elle: "avait pu",
      nous: "avions pu", vous: "aviez pu", ils: "avaient pu", elles: "avaient pu"
    }
  },
  vouloir: {
    present: {
      je: "veux", tu: "veux", il: "veut", elle: "veut",
      nous: "voulons", vous: "voulez", ils: "veulent", elles: "veulent"
    },
    passé_composé: {
      je: "ai voulu", tu: "as voulu", il: "a voulu", elle: "a voulu",
      nous: "avons voulu", vous: "avez voulu", ils: "ont voulu", elles: "ont voulu"
    },
    imparfait: {
      je: "voulais", tu: "voulais", il: "voulait", elle: "voulait",
      nous: "voulions", vous: "vouliez", ils: "voulaient", elles: "voulaient"
    },
    plus_que_parfait: {
      je: "avais voulu", tu: "avais voulu", il: "avait voulu", elle: "avait voulu",
      nous: "avions voulu", vous: "aviez voulu", ils: "avaient voulu", elles: "avaient voulu"
    }
  },
  venir: {
    present: {
      je: "viens", tu: "viens", il: "vient", elle: "vient",
      nous: "venons", vous: "venez", ils: "viennent", elles: "viennent"
    },
    passé_composé: {
      je: "suis venu(e)", tu: "es venu(e)", il: "est venu", elle: "est venue",
      nous: "sommes venu(e)s", vous: "êtes venu(e)s", ils: "sont venus", elles: "sont venues"
    },
    imparfait: {
      je: "venais", tu: "venais", il: "venait", elle: "venait",
      nous: "venions", vous: "veniez", ils: "venaient", elles: "venaient"
    },
    plus_que_parfait: {
      je: "étais venu(e)", tu: "étais venu(e)", il: "était venu", elle: "était venue",
      nous: "étions venu(e)s", vous: "étiez venu(e)s", ils: "étaient venus", elles: "étaient venues"
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
  ],
  voir: [
    { en: "I see the problem", fr_context: "le problème", pronoun: "je" },
    { en: "You see the movie", fr_context: "le film", pronoun: "tu" },
    { en: "He sees his friend", fr_context: "son ami", pronoun: "il" },
    { en: "She sees the cat", fr_context: "le chat", pronoun: "elle" },
    { en: "We see the truth", fr_context: "la vérité", pronoun: "nous" },
    { en: "You (plural) see the light", fr_context: "la lumière", pronoun: "vous" },
    { en: "They see the ocean", fr_context: "l'océan", pronoun: "ils" },
    { en: "I don't see anything", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She doesn't see well", fr_context: "bien", negative: true, pronoun: "elle" },
    { en: "We don't see him", fr_context: "pas", negative: true, pronoun: "nous" }
  ],
  dire: [
    { en: "I say hello", fr_context: "bonjour", pronoun: "je" },
    { en: "You say the truth", fr_context: "la vérité", pronoun: "tu" },
    { en: "He says yes", fr_context: "oui", pronoun: "il" },
    { en: "She says no", fr_context: "non", pronoun: "elle" },
    { en: "We say goodbye", fr_context: "au revoir", pronoun: "nous" },
    { en: "You (plural) say thanks", fr_context: "merci", pronoun: "vous" },
    { en: "They say nothing", fr_context: "rien", pronoun: "ils" },
    { en: "I don't say anything", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She doesn't say that", fr_context: "pas ça", negative: true, pronoun: "elle" },
    { en: "We don't say bad words", fr_context: "pas de gros mots", negative: true, pronoun: "nous" }
  ],
  savoir: [
    { en: "I know the answer", fr_context: "la réponse", pronoun: "je" },
    { en: "You know French", fr_context: "le français", pronoun: "tu" },
    { en: "He knows the way", fr_context: "le chemin", pronoun: "il" },
    { en: "She knows the secret", fr_context: "le secret", pronoun: "elle" },
    { en: "We know the truth", fr_context: "la vérité", pronoun: "nous" },
    { en: "You (plural) know music", fr_context: "la musique", pronoun: "vous" },
    { en: "They know everything", fr_context: "tout", pronoun: "ils" },
    { en: "I don't know anything", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She doesn't know him", fr_context: "pas", negative: true, pronoun: "elle" },
    { en: "We don't know where", fr_context: "pas où", negative: true, pronoun: "nous" }
  ],
  pouvoir: [
    { en: "I can swim", fr_context: "nager", pronoun: "je" },
    { en: "You can dance", fr_context: "danser", pronoun: "tu" },
    { en: "He can run", fr_context: "courir", pronoun: "il" },
    { en: "She can sing", fr_context: "chanter", pronoun: "elle" },
    { en: "We can help", fr_context: "aider", pronoun: "nous" },
    { en: "You (plural) can come", fr_context: "venir", pronoun: "vous" },
    { en: "They can work", fr_context: "travailler", pronoun: "ils" },
    { en: "I can't sleep", fr_context: "pas dormir", negative: true, pronoun: "je" },
    { en: "She can't come", fr_context: "pas venir", negative: true, pronoun: "elle" },
    { en: "We can't wait", fr_context: "pas attendre", negative: true, pronoun: "nous" }
  ],
  vouloir: [
    { en: "I want coffee", fr_context: "du café", pronoun: "je" },
    { en: "You want to go", fr_context: "partir", pronoun: "tu" },
    { en: "He wants money", fr_context: "de l'argent", pronoun: "il" },
    { en: "She wants to learn", fr_context: "apprendre", pronoun: "elle" },
    { en: "We want peace", fr_context: "la paix", pronoun: "nous" },
    { en: "You (plural) want to eat", fr_context: "manger", pronoun: "vous" },
    { en: "They want freedom", fr_context: "la liberté", pronoun: "ils" },
    { en: "I don't want anything", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She doesn't want to go", fr_context: "pas partir", negative: true, pronoun: "elle" },
    { en: "We don't want problems", fr_context: "pas de problèmes", negative: true, pronoun: "nous" }
  ],
  venir: [
    { en: "I come home", fr_context: "à la maison", pronoun: "je" },
    { en: "You come early", fr_context: "tôt", pronoun: "tu" },
    { en: "He comes here", fr_context: "ici", pronoun: "il" },
    { en: "She comes tomorrow", fr_context: "demain", pronoun: "elle" },
    { en: "We come together", fr_context: "ensemble", pronoun: "nous" },
    { en: "You (plural) come often", fr_context: "souvent", pronoun: "vous" },
    { en: "They come late", fr_context: "en retard", pronoun: "ils" },
    { en: "I don't come often", fr_context: "pas souvent", negative: true, pronoun: "je" },
    { en: "She doesn't come today", fr_context: "pas aujourd'hui", negative: true, pronoun: "elle" },
    { en: "We don't come here", fr_context: "pas ici", negative: true, pronoun: "nous" }
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
    .replace('plus-que-parfait', 'plus_que_parfait')
    .replace('imparfait', 'imparfait')
    .replace(/\s+/g, '_');
  
  console.log(`🔧 Tense normalization: "${tense}" → "${normalizedTense}"`);
  
  const verbData = VERB_CONJUGATIONS[verb as keyof typeof VERB_CONJUGATIONS];
  const contexts = QUESTION_CONTEXTS[verb as keyof typeof QUESTION_CONTEXTS] || [];
  
  console.log(`🔧 Available verbs: ${Object.keys(VERB_CONJUGATIONS)}`);
  console.log(`🔧 Available tenses for ${verb}: ${verbData ? Object.keys(verbData) : 'none'}`);
  
  if (!verbData || !contexts.length) {
    throw new Error(`No internal data available for ${verb} - ${tense}`);
  }
  
  const tenseData = verbData[normalizedTense as keyof typeof verbData] as any;
  if (!tenseData) {
    console.log(`🔧 Tense lookup failed: "${normalizedTense}" not found in ${JSON.stringify(Object.keys(verbData))}`);
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