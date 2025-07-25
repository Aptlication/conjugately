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
    { en: "I am happy.", fr_context: "heureux/heureuse", pronoun: "je" },
    { en: "You are tired.", fr_context: "fatigué(e)", pronoun: "tu" },
    { en: "He is a student.", fr_context: "étudiant", pronoun: "il" },
    { en: "She is a teacher.", fr_context: "professeure", pronoun: "elle" },
    { en: "We are friends.", fr_context: "amis", pronoun: "nous" },
    { en: "You (plural) are ready.", fr_context: "prêts", pronoun: "vous" },
    { en: "They are busy.", fr_context: "occupés", pronoun: "ils" },
    { en: "I am not here.", fr_context: "ici", negative: true, pronoun: "je" },
    { en: "She is not sick.", fr_context: "malade", negative: true, pronoun: "elle" },
    { en: "We are not late.", fr_context: "en retard", negative: true, pronoun: "nous" }
  ],
  avoir: [
    { en: "I have a car.", fr_context: "une voiture", pronoun: "je" },
    { en: "You have time.", fr_context: "du temps", pronoun: "tu" },
    { en: "He has money.", fr_context: "de l'argent", pronoun: "il" },
    { en: "She has a dog.", fr_context: "un chien", pronoun: "elle" },
    { en: "We have homework.", fr_context: "des devoirs", pronoun: "nous" },
    { en: "You (plural) have luck.", fr_context: "de la chance", pronoun: "vous" },
    { en: "They have problems.", fr_context: "des problèmes", pronoun: "ils" },
    { en: "I don't have anything.", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She has no choice.", fr_context: "pas le choix", negative: true, pronoun: "elle" },
    { en: "We don't have time.", fr_context: "pas le temps", negative: true, pronoun: "nous" }
  ],
  faire: [
    { en: "I do homework.", fr_context: "mes devoirs", pronoun: "je" },
    { en: "You make dinner.", fr_context: "le dîner", pronoun: "tu" },
    { en: "He does exercise.", fr_context: "du sport", pronoun: "il" },
    { en: "She makes a cake.", fr_context: "un gâteau", pronoun: "elle" },
    { en: "We do shopping.", fr_context: "les courses", pronoun: "nous" },
    { en: "You (plural) make music.", fr_context: "de la musique", pronoun: "vous" },
    { en: "They do work.", fr_context: "du travail", pronoun: "ils" },
    { en: "I don't do anything.", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She doesn't make mistakes.", fr_context: "pas d'erreurs", negative: true, pronoun: "elle" },
    { en: "We don't do that.", fr_context: "pas ça", negative: true, pronoun: "nous" }
  ],
  voir: [
    { en: "I see the problem.", fr_context: "le problème", pronoun: "je" },
    { en: "You see the movie.", fr_context: "le film", pronoun: "tu" },
    { en: "He sees his friend.", fr_context: "son ami", pronoun: "il" },
    { en: "She sees the cat.", fr_context: "le chat", pronoun: "elle" },
    { en: "We see the truth.", fr_context: "la vérité", pronoun: "nous" },
    { en: "You (plural) see the light.", fr_context: "la lumière", pronoun: "vous" },
    { en: "They see the ocean.", fr_context: "l'océan", pronoun: "ils" },
    { en: "I don't see anything.", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She doesn't see well.", fr_context: "bien", negative: true, pronoun: "elle" },
    { en: "We don't see him.", fr_context: "le", negative: true, pronoun: "nous" }
  ],
  dire: [
    { en: "I say hello.", fr_context: "bonjour", pronoun: "je" },
    { en: "You say the truth.", fr_context: "la vérité", pronoun: "tu" },
    { en: "He says yes.", fr_context: "oui", pronoun: "il" },
    { en: "She says no.", fr_context: "non", pronoun: "elle" },
    { en: "We say goodbye.", fr_context: "au revoir", pronoun: "nous" },
    { en: "You (plural) say thanks.", fr_context: "merci", pronoun: "vous" },
    { en: "They say nothing.", fr_context: "rien", pronoun: "ils" },
    { en: "I don't say anything.", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She doesn't say that.", fr_context: "pas ça", negative: true, pronoun: "elle" },
    { en: "We don't say bad words.", fr_context: "pas de gros mots", negative: true, pronoun: "nous" }
  ],
  savoir: [
    { en: "I know the answer.", fr_context: "la réponse", pronoun: "je" },
    { en: "You know French.", fr_context: "le français", pronoun: "tu" },
    { en: "He knows the way.", fr_context: "le chemin", pronoun: "il" },
    { en: "She knows the secret.", fr_context: "le secret", pronoun: "elle" },
    { en: "We know the truth.", fr_context: "la vérité", pronoun: "nous" },
    { en: "You (plural) know music.", fr_context: "la musique", pronoun: "vous" },
    { en: "They know everything.", fr_context: "tout", pronoun: "ils" },
    { en: "I don't know anything.", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She doesn't know him.", fr_context: "le", negative: true, pronoun: "elle" },
    { en: "We don't know where.", fr_context: "pas où", negative: true, pronoun: "nous" }
  ],
  pouvoir: [
    { en: "I can swim.", fr_context: "nager", pronoun: "je" },
    { en: "You can dance.", fr_context: "danser", pronoun: "tu" },
    { en: "He can run.", fr_context: "courir", pronoun: "il" },
    { en: "She can sing.", fr_context: "chanter", pronoun: "elle" },
    { en: "We can help.", fr_context: "aider", pronoun: "nous" },
    { en: "You (plural) can come.", fr_context: "venir", pronoun: "vous" },
    { en: "They can work.", fr_context: "travailler", pronoun: "ils" },
    { en: "I can't sleep.", fr_context: "pas dormir", negative: true, pronoun: "je" },
    { en: "She can't come.", fr_context: "pas venir", negative: true, pronoun: "elle" },
    { en: "We can't wait.", fr_context: "pas attendre", negative: true, pronoun: "nous" }
  ],
  vouloir: [
    { en: "I want coffee.", fr_context: "du café", pronoun: "je" },
    { en: "You want to go.", fr_context: "partir", pronoun: "tu" },
    { en: "He wants money.", fr_context: "de l'argent", pronoun: "il" },
    { en: "She wants to learn.", fr_context: "apprendre", pronoun: "elle" },
    { en: "We want peace.", fr_context: "la paix", pronoun: "nous" },
    { en: "You (plural) want to eat.", fr_context: "manger", pronoun: "vous" },
    { en: "They want freedom.", fr_context: "la liberté", pronoun: "ils" },
    { en: "I don't want anything.", fr_context: "rien", negative: true, pronoun: "je" },
    { en: "She doesn't want to go.", fr_context: "pas partir", negative: true, pronoun: "elle" },
    { en: "We don't want problems.", fr_context: "pas de problèmes", negative: true, pronoun: "nous" }
  ],
  venir: [
    { en: "I come home.", fr_context: "à la maison", pronoun: "je" },
    { en: "You come early.", fr_context: "tôt", pronoun: "tu" },
    { en: "He comes here.", fr_context: "ici", pronoun: "il" },
    { en: "She comes tomorrow.", fr_context: "demain", pronoun: "elle" },
    { en: "We come together.", fr_context: "ensemble", pronoun: "nous" },
    { en: "You (plural) come often.", fr_context: "souvent", pronoun: "vous" },
    { en: "They come late.", fr_context: "en retard", pronoun: "ils" },
    { en: "I don't come often.", fr_context: "pas souvent", negative: true, pronoun: "je" },
    { en: "She doesn't come today.", fr_context: "pas aujourd'hui", negative: true, pronoun: "elle" },
    { en: "We don't come here.", fr_context: "pas ici", negative: true, pronoun: "nous" }
  ]
};

// Generate wrong answers maintaining proper pronoun-verb agreement
function generateDistractors(correctForm: string, verb: string, tense: string, pronoun: string): string[] {
  const distractors: string[] = [];
  const verbData = VERB_CONJUGATIONS[verb as keyof typeof VERB_CONJUGATIONS];
  
  if (!verbData) return ["incorrect1", "incorrect2", "incorrect3"];
  
  // Wrong tenses for same pronoun (maintains proper pronoun agreement)
  Object.entries(verbData).forEach(([t, conjugations]) => {
    if (t !== tense) {
      const wrongForm = (conjugations as any)[pronoun];
      if (wrongForm && wrongForm !== correctForm) {
        distractors.push(wrongForm);
      }
    }
  });
  
  // If we need more distractors, add slightly modified forms of the correct form
  if (distractors.length < 3) {
    // Add common conjugation mistakes for the same pronoun
    const currentTense = verbData[tense as keyof typeof verbData] as any;
    if (currentTense) {
      // For 'je', add common mistakes like using 'tu' form but keeping 'je'
      if (pronoun === 'je') {
        const tuForm = currentTense['tu'];
        if (tuForm && tuForm !== correctForm) {
          distractors.push(tuForm);
        }
      }
      // For other pronouns, add slight variations
      Object.entries(currentTense).forEach(([p, form]) => {
        if (p !== pronoun && form !== correctForm && distractors.length < 3) {
          // Only add if it creates a plausible mistake
          if (!distractors.includes(form as string)) {
            distractors.push(form as string);
          }
        }
      });
    }
  }
  
  // Ensure we have exactly 3 distractors
  while (distractors.length < 3) {
    distractors.push(`${correctForm.replace(/[aeiou]$/, 'x')}`); // Simple modification
  }
  
  // Shuffle and take first 3
  return distractors.sort(() => Math.random() - 0.5).slice(0, 3);
}

// Helper function to apply French contractions
function applyContractions(pronoun: string, conjugation: string): string {
  const pronounCap = pronoun.charAt(0).toUpperCase() + pronoun.slice(1);
  
  // Handle contractions for je + vowel sounds
  if (pronoun === 'je' && /^[aeiouâêîôû]/.test(conjugation)) {
    return `J'${conjugation}`;
  }
  
  return `${pronounCap} ${conjugation}`;
}

// Helper function to apply contractions for negative forms
function applyNegativeContractions(pronoun: string, conjugation: string): string {
  const pronounCap = pronoun.charAt(0).toUpperCase() + pronoun.slice(1);
  
  // Handle contractions for ne + vowel sounds (ne + est = n'est)
  if (/^[aeiouâêîôû]/.test(conjugation)) {
    return `${pronounCap} n'${conjugation}`;
  }
  
  return `${pronounCap} ne ${conjugation}`;
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
    
    // Build correct answer with proper French contractions
    let correctAnswer;
    
    if (context.negative && normalizedTense === 'present') {
      // Handle negation properly for present tense
      if (verb === 'avoir' && context.fr_context === 'rien') {
        correctAnswer = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} n'${correctForm} ${context.fr_context}`;
      } else if (context.fr_context && (context.fr_context === 'pas' || context.fr_context.startsWith('pas '))) {
        // If context is "pas" or starts with "pas ", don't add another "pas"
        correctAnswer = `${applyNegativeContractions(pronoun, correctForm)} ${context.fr_context}`;
      } else {
        correctAnswer = `${applyNegativeContractions(pronoun, correctForm)} pas ${context.fr_context}`;
      }
    } else {
      correctAnswer = applyContractions(pronoun, correctForm);
      if (context.fr_context && !context.negative) {
        correctAnswer += ` ${context.fr_context}`;
      }
    }
    
    // Generate distractors with proper French grammar
    const wrongAnswers = [];
    
    // Generate distractors using correct pronoun but wrong conjugations
    const distractors = generateDistractors(correctForm, verb, normalizedTense, pronoun);
    distractors.slice(0, 3).forEach(form => {
      let wrong;
      
      if (context.negative && normalizedTense === 'present') {
        if (verb === 'avoir' && context.fr_context === 'rien') {
          wrong = `${pronoun.charAt(0).toUpperCase() + pronoun.slice(1)} n'${form} ${context.fr_context}`;
        } else if (context.fr_context && (context.fr_context === 'pas' || context.fr_context.startsWith('pas '))) {
          // If context is "pas" or starts with "pas ", don't add another "pas"
          wrong = `${applyNegativeContractions(pronoun, form)} ${context.fr_context}`;
        } else {
          wrong = `${applyNegativeContractions(pronoun, form)} pas ${context.fr_context}`;
        }
      } else {
        // Apply contractions to wrong answers too for consistency
        wrong = applyContractions(pronoun, form);
        if (context.fr_context && !context.negative) {
          wrong += ` ${context.fr_context}`;
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
    
    // Convert English to proper tense based on French tense
    let englishQuestion = context.en;
    
    if (normalizedTense === 'passé_composé') {
      // Passé composé = completed action ("I ate" / "I have eaten")
      englishQuestion = englishQuestion
        .replace(/I have/g, 'I had')
        .replace(/You have/g, 'You had') 
        .replace(/He has/g, 'He had')
        .replace(/She has/g, 'She had')
        .replace(/We have/g, 'We had')
        .replace(/You \(plural\) have/g, 'You (plural) had')
        .replace(/They have/g, 'They had')
        .replace(/I am/g, 'I was')
        .replace(/You are/g, 'You were')
        .replace(/He is/g, 'He was')
        .replace(/She is/g, 'She was')
        .replace(/We are/g, 'We were')
        .replace(/You \(plural\) are/g, 'You (plural) were')
        .replace(/They are/g, 'They were')
        .replace(/I do/g, 'I did')
        .replace(/You do/g, 'You did')
        .replace(/He does/g, 'He did')
        .replace(/She does/g, 'She did')
        .replace(/We do/g, 'We did')
        .replace(/You \(plural\) do/g, 'You (plural) did')
        .replace(/They do/g, 'They did')
        .replace(/I make/g, 'I made')
        .replace(/You make/g, 'You made')
        .replace(/He makes/g, 'He made')
        .replace(/She makes/g, 'She made')
        .replace(/We make/g, 'We made')
        .replace(/You \(plural\) make/g, 'You (plural) made')
        .replace(/They make/g, 'They made')
        .replace(/I go/g, 'I went')
        .replace(/You go/g, 'You went')
        .replace(/He goes/g, 'He went')
        .replace(/She goes/g, 'She went')
        .replace(/We go/g, 'We went')
        .replace(/You \(plural\) go/g, 'You (plural) went')
        .replace(/They go/g, 'They went')
        .replace(/I see/g, 'I saw')
        .replace(/You see/g, 'You saw')
        .replace(/He sees/g, 'He saw')
        .replace(/She sees/g, 'She saw')
        .replace(/We see/g, 'We saw')
        .replace(/You \(plural\) see/g, 'You (plural) saw')
        .replace(/They see/g, 'They saw')
        .replace(/I say/g, 'I said')
        .replace(/You say/g, 'You said')
        .replace(/He says/g, 'He said')
        .replace(/She says/g, 'She said')
        .replace(/We say/g, 'We said')
        .replace(/You \(plural\) say/g, 'You (plural) said')
        .replace(/They say/g, 'They said')
        .replace(/I know/g, 'I knew')
        .replace(/You know/g, 'You knew')
        .replace(/He knows/g, 'He knew')
        .replace(/She knows/g, 'She knew')
        .replace(/We know/g, 'We knew')
        .replace(/You \(plural\) know/g, 'You (plural) knew')
        .replace(/They know/g, 'They knew')
        .replace(/I can/g, 'I could')
        .replace(/You can/g, 'You could')
        .replace(/He can/g, 'He could')
        .replace(/She can/g, 'She could')
        .replace(/We can/g, 'We could')
        .replace(/You \(plural\) can/g, 'You (plural) could')
        .replace(/They can/g, 'They could')
        .replace(/I want/g, 'I wanted')
        .replace(/You want/g, 'You wanted')
        .replace(/He wants/g, 'He wanted')
        .replace(/She wants/g, 'She wanted')
        .replace(/We want/g, 'We wanted')
        .replace(/You \(plural\) want/g, 'You (plural) wanted')
        .replace(/They want/g, 'They wanted')
        .replace(/I come/g, 'I came')
        .replace(/You come/g, 'You came')
        .replace(/He comes/g, 'He came')
        .replace(/She comes/g, 'She came')
        .replace(/We come/g, 'We came')
        .replace(/You \(plural\) come/g, 'You (plural) came')
        .replace(/They come/g, 'They came')
        // Handle negative forms for passé composé
        .replace(/I don't have/g, 'I didn\'t have')
        .replace(/You don't have/g, 'You didn\'t have')
        .replace(/He doesn't have/g, 'He didn\'t have')
        .replace(/She doesn't have/g, 'She didn\'t have')
        .replace(/We don't have/g, 'We didn\'t have')
        .replace(/You \(plural\) don't have/g, 'You (plural) didn\'t have')
        .replace(/They don't have/g, 'They didn\'t have')
        .replace(/I don't/g, 'I didn\'t')
        .replace(/You don't/g, 'You didn\'t')
        .replace(/He doesn't/g, 'He didn\'t')
        .replace(/She doesn't/g, 'She didn\'t')
        .replace(/We don't/g, 'We didn\'t')
        .replace(/You \(plural\) don't/g, 'You (plural) didn\'t')
        .replace(/They don't/g, 'They didn\'t')
        .replace(/can't/g, 'couldn\'t');
    } else if (normalizedTense === 'imparfait') {
      // Imparfait = ongoing/habitual past action ("I used to eat" / "I was eating")
      englishQuestion = englishQuestion
        .replace(/I have/g, 'I used to have')
        .replace(/You have/g, 'You used to have')
        .replace(/He has/g, 'He used to have')
        .replace(/She has/g, 'She used to have')
        .replace(/We have/g, 'We used to have')
        .replace(/You \(plural\) have/g, 'You (plural) used to have')
        .replace(/They have/g, 'They used to have')
        .replace(/I am/g, 'I was')
        .replace(/You are/g, 'You were')
        .replace(/He is/g, 'He was')
        .replace(/She is/g, 'She was')
        .replace(/We are/g, 'We were')
        .replace(/You \(plural\) are/g, 'You (plural) were')
        .replace(/They are/g, 'They were')
        .replace(/I do/g, 'I used to do')
        .replace(/You do/g, 'You used to do')
        .replace(/He does/g, 'He used to do')
        .replace(/She does/g, 'She used to do')
        .replace(/We do/g, 'We used to do')
        .replace(/You \(plural\) do/g, 'You (plural) used to do')
        .replace(/They do/g, 'They used to do')
        .replace(/I make/g, 'I used to make')
        .replace(/You make/g, 'You used to make')
        .replace(/He makes/g, 'He used to make')
        .replace(/She makes/g, 'She used to make')
        .replace(/We make/g, 'We used to make')
        .replace(/You \(plural\) make/g, 'You (plural) used to make')
        .replace(/They make/g, 'They used to make')
        .replace(/I go/g, 'I used to go')
        .replace(/You go/g, 'You used to go')
        .replace(/He goes/g, 'He used to go')
        .replace(/She goes/g, 'She used to go')
        .replace(/We go/g, 'We used to go')
        .replace(/You \(plural\) go/g, 'You (plural) used to go')
        .replace(/They go/g, 'They used to go')
        .replace(/I see/g, 'I used to see')
        .replace(/You see/g, 'You used to see')
        .replace(/He sees/g, 'He used to see')
        .replace(/She sees/g, 'She used to see')
        .replace(/We see/g, 'We used to see')
        .replace(/You \(plural\) see/g, 'You (plural) used to see')
        .replace(/They see/g, 'They used to see')
        .replace(/I say/g, 'I used to say')
        .replace(/You say/g, 'You used to say')
        .replace(/He says/g, 'He used to say')
        .replace(/She says/g, 'She used to say')
        .replace(/We say/g, 'We used to say')
        .replace(/You \(plural\) say/g, 'You (plural) used to say')
        .replace(/They say/g, 'They used to say')
        .replace(/I know/g, 'I used to know')
        .replace(/You know/g, 'You used to know')
        .replace(/He knows/g, 'He used to know')
        .replace(/She knows/g, 'She used to know')
        .replace(/We know/g, 'We used to know')
        .replace(/You \(plural\) know/g, 'You (plural) used to know')
        .replace(/They know/g, 'They used to know')
        .replace(/I can/g, 'I could')
        .replace(/You can/g, 'You could')
        .replace(/He can/g, 'He could')
        .replace(/She can/g, 'She could')
        .replace(/We can/g, 'We could')
        .replace(/You \(plural\) can/g, 'You (plural) could')
        .replace(/They can/g, 'They could')
        .replace(/I want/g, 'I used to want')
        .replace(/You want/g, 'You used to want')
        .replace(/He wants/g, 'He used to want')
        .replace(/She wants/g, 'She used to want')
        .replace(/We want/g, 'We used to want')
        .replace(/You \(plural\) want/g, 'You (plural) used to want')
        .replace(/They want/g, 'They used to want')
        .replace(/I come/g, 'I used to come')
        .replace(/You come/g, 'You used to come')
        .replace(/He comes/g, 'He used to come')
        .replace(/She comes/g, 'She used to come')
        .replace(/We come/g, 'We used to come')
        .replace(/You \(plural\) come/g, 'You (plural) used to come')
        .replace(/They come/g, 'They used to come')
        // Handle negative forms for imparfait
        .replace(/I don't have/g, 'I didn\'t use to have')
        .replace(/You don't have/g, 'You didn\'t use to have')
        .replace(/He doesn't have/g, 'He didn\'t use to have')
        .replace(/She doesn't have/g, 'She didn\'t use to have')
        .replace(/We don't have/g, 'We didn\'t use to have')
        .replace(/You \(plural\) don't have/g, 'You (plural) didn\'t use to have')
        .replace(/They don't have/g, 'They didn\'t use to have')
        .replace(/I don't/g, 'I didn\'t use to')
        .replace(/You don't/g, 'You didn\'t use to')
        .replace(/He doesn't/g, 'He didn\'t use to')
        .replace(/She doesn't/g, 'She didn\'t use to')
        .replace(/We don't/g, 'We didn\'t use to')
        .replace(/You \(plural\) don't/g, 'You (plural) didn\'t use to')
        .replace(/They don't/g, 'They didn\'t use to')
        .replace(/can't/g, 'couldn\'t');
    } else if (normalizedTense === 'plus_que_parfait') {
      // Plus-que-parfait = past perfect ("I had eaten")
      englishQuestion = englishQuestion
        .replace(/I have/g, 'I had had')
        .replace(/You have/g, 'You had had')
        .replace(/He has/g, 'He had had')
        .replace(/She has/g, 'She had had')
        .replace(/We have/g, 'We had had')
        .replace(/You \(plural\) have/g, 'You (plural) had had')
        .replace(/They have/g, 'They had had')
        .replace(/I am/g, 'I had been')
        .replace(/You are/g, 'You had been')
        .replace(/He is/g, 'He had been')
        .replace(/She is/g, 'She had been')
        .replace(/We are/g, 'We had been')
        .replace(/You \(plural\) are/g, 'You (plural) had been')
        .replace(/They are/g, 'They had been')
        .replace(/I do/g, 'I had done')
        .replace(/You do/g, 'You had done')
        .replace(/He does/g, 'He had done')
        .replace(/She does/g, 'She had done')
        .replace(/We do/g, 'We had done')
        .replace(/You \(plural\) do/g, 'You (plural) had done')
        .replace(/They do/g, 'They had done')
        .replace(/I make/g, 'I had made')
        .replace(/You make/g, 'You had made')
        .replace(/He makes/g, 'He had made')
        .replace(/She makes/g, 'She had made')
        .replace(/We make/g, 'We had made')
        .replace(/You \(plural\) make/g, 'You (plural) had made')
        .replace(/They make/g, 'They had made')
        .replace(/I go/g, 'I had gone')
        .replace(/You go/g, 'You had gone')
        .replace(/He goes/g, 'He had gone')
        .replace(/She goes/g, 'She had gone')
        .replace(/We go/g, 'We had gone')
        .replace(/You \(plural\) go/g, 'You (plural) had gone')
        .replace(/They go/g, 'They had gone')
        .replace(/I see/g, 'I had seen')
        .replace(/You see/g, 'You had seen')
        .replace(/He sees/g, 'He had seen')
        .replace(/She sees/g, 'She had seen')
        .replace(/We see/g, 'We had seen')
        .replace(/You \(plural\) see/g, 'You (plural) had seen')
        .replace(/They see/g, 'They had seen')
        .replace(/I say/g, 'I had said')
        .replace(/You say/g, 'You had said')
        .replace(/He says/g, 'He had said')
        .replace(/She says/g, 'She had said')
        .replace(/We say/g, 'We had said')
        .replace(/You \(plural\) say/g, 'You (plural) had said')
        .replace(/They say/g, 'They had said')
        .replace(/I know/g, 'I had known')
        .replace(/You know/g, 'You had known')
        .replace(/He knows/g, 'He had known')
        .replace(/She knows/g, 'She had known')
        .replace(/We know/g, 'We had known')
        .replace(/You \(plural\) know/g, 'You (plural) had known')
        .replace(/They know/g, 'They had known')
        .replace(/I can/g, 'I had been able to')
        .replace(/You can/g, 'You had been able to')
        .replace(/He can/g, 'He had been able to')
        .replace(/She can/g, 'She had been able to')
        .replace(/We can/g, 'We had been able to')
        .replace(/You \(plural\) can/g, 'You (plural) had been able to')
        .replace(/They can/g, 'They had been able to')
        .replace(/I want/g, 'I had wanted')
        .replace(/You want/g, 'You had wanted')
        .replace(/He wants/g, 'He had wanted')
        .replace(/She wants/g, 'She had wanted')
        .replace(/We want/g, 'We had wanted')
        .replace(/You \(plural\) want/g, 'You (plural) had wanted')
        .replace(/They want/g, 'They had wanted')
        .replace(/I come/g, 'I had come')
        .replace(/You come/g, 'You had come')
        .replace(/He comes/g, 'He had come')
        .replace(/She comes/g, 'She had come')
        .replace(/We come/g, 'We had come')
        .replace(/You \(plural\) come/g, 'You (plural) had come')
        .replace(/They come/g, 'They had come')
        // Handle negative forms for plus-que-parfait
        .replace(/I don't have/g, 'I hadn\'t had')
        .replace(/You don't have/g, 'You hadn\'t had')
        .replace(/He doesn't have/g, 'He hadn\'t had')
        .replace(/She doesn't have/g, 'She hadn\'t had')
        .replace(/We don't have/g, 'We hadn\'t had')
        .replace(/You \(plural\) don't have/g, 'You (plural) hadn\'t had')
        .replace(/They don't have/g, 'They hadn\'t had')
        .replace(/I don't/g, 'I hadn\'t')
        .replace(/You don't/g, 'You hadn\'t')
        .replace(/He doesn't/g, 'He hadn\'t')
        .replace(/She doesn't/g, 'She hadn\'t')
        .replace(/We don't/g, 'We hadn\'t')
        .replace(/You \(plural\) don't/g, 'You (plural) hadn\'t')
        .replace(/They don't/g, 'They hadn\'t')
        .replace(/can't/g, 'couldn\'t have');
    }

    questions.push({
      question: englishQuestion,
      hint: `Conjugate ${verb} for ${pronoun} in ${tense}`,
      answerOptions: shuffledAnswers
    });
  }
  
  return { questions };
}