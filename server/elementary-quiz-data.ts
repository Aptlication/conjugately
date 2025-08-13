// Elementary Level Present Tense Quiz Data
// Validated by Perplexity AI for French grammar accuracy
// Covers 6 verbs: être, avoir, faire, dire, aller, voir

export interface ElementaryQuizQuestion {
  question: string;
  hint: string;
  answerOptions: Array<{
    text: string;
    rationale: string;
    isCorrect: boolean;
  }>;
}

export const ELEMENTARY_PRESENT_QUESTIONS: Record<string, ElementaryQuizQuestion[]> = {
  "être": [
    {
      question: "I am happy. (male)",
      hint: "Conjugate être for je in Présent with masculine adjective",
      answerOptions: [
        { text: "Je fus heureux", rationale: "Wrong tense - this is passé simple, not present.", isCorrect: false },
        { text: "J'ai été heureux", rationale: "Wrong tense - this is passé composé, not present.", isCorrect: false },
        { text: "Je suis heureux", rationale: "Correct! Present tense of être with masculine adjective agreement.", isCorrect: true },
        { text: "Je étais heureux", rationale: "Wrong tense - this is imparfait, not present.", isCorrect: false }
      ]
    },
    {
      question: "I am happy. (female)",
      hint: "Conjugate être for je in Présent with feminine adjective",
      answerOptions: [
        { text: "Je serai heureuse", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Je suis heureuse", rationale: "Correct! Present tense of être with feminine adjective agreement.", isCorrect: true },
        { text: "Je vais être heureuse", rationale: "Wrong tense - this is futur proche, not present.", isCorrect: false },
        { text: "Je suis en train d'être heureuse", rationale: "Wrong tense - this is présent progressif, not simple present.", isCorrect: false }
      ]
    },
    {
      question: "You are not tired. (tu, male)",
      hint: "Conjugate être for tu in Présent with negation",
      answerOptions: [
        { text: "Tu n'es en train d'être pas fatigué", rationale: "Wrong tense and incorrect negation placement.", isCorrect: false },
        { text: "Tu n'as été pas fatigué", rationale: "Wrong tense and incorrect negation structure.", isCorrect: false },
        { text: "Tu ne vas être pas fatigué", rationale: "Wrong tense and incorrect negation placement.", isCorrect: false },
        { text: "Tu n'es pas fatigué", rationale: "Correct! Present tense negative form with proper negation structure.", isCorrect: true }
      ]
    },
    {
      question: "You are tired. (tu, female)",
      hint: "Conjugate être for tu in Présent with feminine adjective",
      answerOptions: [
        { text: "Tu avais été fatiguée", rationale: "Wrong tense - this is plus-que-parfait.", isCorrect: false },
        { text: "Tu seras fatiguée", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "Tu es fatiguée", rationale: "Correct! Present tense with feminine adjective agreement.", isCorrect: true },
        { text: "Tu es en train d'être fatiguée", rationale: "Wrong tense - this is présent progressif, not simple present.", isCorrect: false }
      ]
    },
    {
      question: "He is not here.",
      hint: "Conjugate être for il in Présent with negation",
      answerOptions: [
        { text: "Il n'est en train d'être pas ici", rationale: "Wrong tense and incorrect negation placement.", isCorrect: false },
        { text: "Il ne serait pas ici", rationale: "Wrong tense - this is conditional.", isCorrect: false },
        { text: "Il n'est pas ici", rationale: "Correct! Present tense negative form with proper structure.", isCorrect: true },
        { text: "Il n'a été pas ici", rationale: "Wrong tense and incorrect negation structure.", isCorrect: false }
      ]
    },
    {
      question: "She is a teacher.",
      hint: "Conjugate être for elle in Présent with profession",
      answerOptions: [
        { text: "Elle est professeure", rationale: "Correct! Present tense with feminine profession form.", isCorrect: true },
        { text: "Elle va être professeure", rationale: "Wrong tense - this is futur proche.", isCorrect: false },
        { text: "Elle sera professeure", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "Elle serait professeure", rationale: "Wrong tense - this is conditional.", isCorrect: false }
      ]
    },
    {
      question: "We are not ready. (nous, male)",
      hint: "Conjugate être for nous in Présent with masculine plural adjective",
      answerOptions: [
        { text: "Nous ne sommes pas prêts", rationale: "Correct! Present tense negative with masculine plural adjective.", isCorrect: true },
        { text: "Nous ne serons pas prêts", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "Nous n'avions été pas prêts", rationale: "Wrong tense and incorrect negation structure.", isCorrect: false },
        { text: "Nous n'avons été pas prêts", rationale: "Wrong tense and incorrect negation placement.", isCorrect: false }
      ]
    },
    {
      question: "We are not ready. (nous, female)",
      hint: "Conjugate être for nous in Présent with feminine plural adjective",
      answerOptions: [
        { text: "Nous ne sommes pas prêtes", rationale: "Correct! Present tense negative with feminine plural adjective.", isCorrect: true },
        { text: "Nous n'avons été pas prêtes", rationale: "Wrong tense and incorrect negation structure.", isCorrect: false },
        { text: "Nous ne fûmes pas prêtes", rationale: "Wrong tense - this is passé simple.", isCorrect: false },
        { text: "Nous ne serons pas prêtes", rationale: "Wrong tense - this is future.", isCorrect: false }
      ]
    },
    {
      question: "You (plural) are teachers.",
      hint: "Conjugate être for vous in Présent with masculine plural profession",
      answerOptions: [
        { text: "Vous avez été professeurs", rationale: "Wrong tense - this is passé composé.", isCorrect: false },
        { text: "Vous aviez été professeurs", rationale: "Wrong tense - this is plus-que-parfait.", isCorrect: false },
        { text: "Vous seriez professeurs", rationale: "Wrong tense - this is conditional.", isCorrect: false },
        { text: "Vous êtes professeurs", rationale: "Correct! Present tense with masculine plural profession.", isCorrect: true }
      ]
    },
    {
      question: "You (plural) are teachers. (female teachers)",
      hint: "Conjugate être for vous in Présent with feminine plural profession",
      answerOptions: [
        { text: "Vous êtes professeures", rationale: "Correct! Present tense with feminine plural profession.", isCorrect: true },
        { text: "Vous seriez professeures", rationale: "Wrong tense - this is conditional.", isCorrect: false },
        { text: "Vous aviez été professeures", rationale: "Wrong tense - this is plus-que-parfait.", isCorrect: false },
        { text: "Vous avez été professeures", rationale: "Wrong tense - this is passé composé.", isCorrect: false }
      ]
    }
  ],

  "avoir": [
    {
      question: "I have a cat.",
      hint: "Conjugate avoir for je in Présent",
      answerOptions: [
        { text: "J'ai un chat", rationale: "Correct! Present tense of avoir for je.", isCorrect: true },
        { text: "Je ai un chat", rationale: "Missing apostrophe - should be J'ai.", isCorrect: false },
        { text: "J'avais un chat", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "J'aurai un chat", rationale: "Wrong tense - this is future.", isCorrect: false }
      ]
    },
    {
      question: "I don't have time.",
      hint: "Conjugate avoir for je in Présent with negation",
      answerOptions: [
        { text: "Je n'ai pas le temps", rationale: "Correct! Present tense negative form of avoir.", isCorrect: true },
        { text: "Je ne ai pas le temps", rationale: "Wrong contraction - should be n'ai.", isCorrect: false },
        { text: "Je n'avais pas le temps", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Je n'aurai pas le temps", rationale: "Wrong tense - this is future.", isCorrect: false }
      ]
    },
    {
      question: "You have a question.",
      hint: "Conjugate avoir for tu in Présent",
      answerOptions: [
        { text: "Tu as une question", rationale: "Correct! Present tense of avoir for tu.", isCorrect: true },
        { text: "Tu avais une question", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Tu auras une question", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "Tu aurais une question", rationale: "Wrong tense - this is conditional.", isCorrect: false }
      ]
    },
    {
      question: "You don't have a car.",
      hint: "Conjugate avoir for tu in Présent with negation",
      answerOptions: [
        { text: "Tu n'as pas de voiture", rationale: "Correct! Present tense negative with partitive article.", isCorrect: true },
        { text: "Tu ne as pas de voiture", rationale: "Wrong contraction - should be n'as.", isCorrect: false },
        { text: "Tu n'avais pas de voiture", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Tu n'auras pas de voiture", rationale: "Wrong tense - this is future.", isCorrect: false }
      ]
    },
    {
      question: "He has money.",
      hint: "Conjugate avoir for il in Présent",
      answerOptions: [
        { text: "Il a de l'argent", rationale: "Correct! Present tense with partitive article.", isCorrect: true },
        { text: "Il avait de l'argent", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Il aura de l'argent", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "Il aurait de l'argent", rationale: "Wrong tense - this is conditional.", isCorrect: false }
      ]
    },
    {
      question: "She doesn't have children.",
      hint: "Conjugate avoir for elle in Présent with negation",
      answerOptions: [
        { text: "Elle n'a pas d'enfants", rationale: "Correct! Present tense negative with partitive article.", isCorrect: true },
        { text: "Elle ne a pas d'enfants", rationale: "Wrong contraction - should be n'a.", isCorrect: false },
        { text: "Elle n'avait pas d'enfants", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Elle n'aura pas d'enfants", rationale: "Wrong tense - this is future.", isCorrect: false }
      ]
    },
    {
      question: "We have homework.",
      hint: "Conjugate avoir for nous in Présent",
      answerOptions: [
        { text: "Nous avons des devoirs", rationale: "Correct! Present tense with plural indefinite article.", isCorrect: true },
        { text: "Nous avions des devoirs", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Nous aurons des devoirs", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "Nous aurions des devoirs", rationale: "Wrong tense - this is conditional.", isCorrect: false }
      ]
    },
    {
      question: "We don't have problems.",
      hint: "Conjugate avoir for nous in Présent with negation",
      answerOptions: [
        { text: "Nous n'avons pas de problèmes", rationale: "Correct! Present tense negative with partitive article.", isCorrect: true },
        { text: "Nous ne avons pas de problèmes", rationale: "Wrong contraction - should be n'avons.", isCorrect: false },
        { text: "Nous n'avions pas de problèmes", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Nous n'aurons pas de problèmes", rationale: "Wrong tense - this is future.", isCorrect: false }
      ]
    },
    {
      question: "You (plural) have experience.",
      hint: "Conjugate avoir for vous in Présent",
      answerOptions: [
        { text: "Vous avez de l'expérience", rationale: "Correct! Present tense with partitive article.", isCorrect: true },
        { text: "Vous aviez de l'expérience", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Vous aurez de l'expérience", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "Vous auriez de l'expérience", rationale: "Wrong tense - this is conditional.", isCorrect: false }
      ]
    },
    {
      question: "They have keys.",
      hint: "Conjugate avoir for ils in Présent",
      answerOptions: [
        { text: "Ils ont des clés", rationale: "Correct! Present tense with plural indefinite article.", isCorrect: true },
        { text: "Ils avaient des clés", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Ils auront des clés", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "Ils auraient des clés", rationale: "Wrong tense - this is conditional.", isCorrect: false }
      ]
    }
  ],

  "faire": [
    {
      question: "I do my homework.",
      hint: "Conjugate faire for je in Présent",
      answerOptions: [
        { text: "Je fais mes devoirs", rationale: "Correct! Present tense of faire for je.", isCorrect: true },
        { text: "Je faisais mes devoirs", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Je ferai mes devoirs", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "J'ai fait mes devoirs", rationale: "Wrong tense - this is passé composé.", isCorrect: false }
      ]
    },
    {
      question: "I don't make mistakes.",
      hint: "Conjugate faire for je in Présent with negation",
      answerOptions: [
        { text: "Je ne fais pas d'erreurs", rationale: "Correct! Present tense negative with partitive article.", isCorrect: true },
        { text: "Je ne faisais pas d'erreurs", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Je ne ferai pas d'erreurs", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "Je n'ai pas fait d'erreurs", rationale: "Wrong tense - this is passé composé.", isCorrect: false }
      ]
    },
    {
      question: "You do sports.",
      hint: "Conjugate faire for tu in Présent",
      answerOptions: [
        { text: "Tu fais du sport", rationale: "Correct! Present tense with partitive article.", isCorrect: true },
        { text: "Tu faisais du sport", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Tu feras du sport", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "Tu as fait du sport", rationale: "Wrong tense - this is passé composé.", isCorrect: false }
      ]
    },
    {
      question: "You don't do the cooking.",
      hint: "Conjugate faire for tu in Présent with negation",
      answerOptions: [
        { text: "Tu ne fais pas la cuisine", rationale: "Correct! Present tense negative form.", isCorrect: true },
        { text: "Tu ne faisais pas la cuisine", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Tu ne feras pas la cuisine", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "Tu n'as pas fait la cuisine", rationale: "Wrong tense - this is passé composé.", isCorrect: false }
      ]
    },
    {
      question: "He makes coffee.",
      hint: "Conjugate faire for il in Présent",
      answerOptions: [
        { text: "Il fait du café", rationale: "Correct! Present tense with partitive article.", isCorrect: true },
        { text: "Il faisait du café", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Il fera du café", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "Il a fait du café", rationale: "Wrong tense - this is passé composé.", isCorrect: false }
      ]
    },
    {
      question: "She doesn't do the shopping.",
      hint: "Conjugate faire for elle in Présent with negation",
      answerOptions: [
        { text: "Elle ne fait pas les courses", rationale: "Correct! Present tense negative form.", isCorrect: true },
        { text: "Elle ne faisait pas les courses", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Elle ne fera pas les courses", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "Elle n'a pas fait les courses", rationale: "Wrong tense - this is passé composé.", isCorrect: false }
      ]
    },
    {
      question: "We do projects.",
      hint: "Conjugate faire for nous in Présent",
      answerOptions: [
        { text: "Nous faisons des projets", rationale: "Correct! Present tense with plural indefinite article.", isCorrect: true },
        { text: "Nous faisions des projets", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Nous ferons des projets", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "Nous avons fait des projets", rationale: "Wrong tense - this is passé composé.", isCorrect: false }
      ]
    },
    {
      question: "We don't make noise.",
      hint: "Conjugate faire for nous in Présent with negation",
      answerOptions: [
        { text: "Nous ne faisons pas de bruit", rationale: "Correct! Present tense negative with partitive article.", isCorrect: true },
        { text: "Nous ne faisions pas de bruit", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Nous ne ferons pas de bruit", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "Nous n'avons pas fait de bruit", rationale: "Wrong tense - this is passé composé.", isCorrect: false }
      ]
    },
    {
      question: "You (plural) do exercises.",
      hint: "Conjugate faire for vous in Présent",
      answerOptions: [
        { text: "Vous faites des exercices", rationale: "Correct! Present tense with plural indefinite article.", isCorrect: true },
        { text: "Vous faisiez des exercices", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Vous ferez des exercices", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "Vous avez fait des exercices", rationale: "Wrong tense - this is passé composé.", isCorrect: false }
      ]
    },
    {
      question: "They make plans.",
      hint: "Conjugate faire for ils in Présent",
      answerOptions: [
        { text: "Ils font des plans", rationale: "Correct! Present tense with plural indefinite article.", isCorrect: true },
        { text: "Ils faisaient des plans", rationale: "Wrong tense - this is imparfait.", isCorrect: false },
        { text: "Ils feront des plans", rationale: "Wrong tense - this is future.", isCorrect: false },
        { text: "Ils ont fait des plans", rationale: "Wrong tense - this is passé composé.", isCorrect: false }
      ]
    }
  ]
};

// Function to get random Elementary present tense questions for a specific verb
export function getRandomElementaryPresentQuestions(verb: string, count: number): ElementaryQuizQuestion[] {
  const questions = ELEMENTARY_PRESENT_QUESTIONS[verb] || [];
  
  if (questions.length === 0) {
    console.log(`⚠️  No Elementary present questions found for verb: ${verb}`);
    return [];
  }
  
  // Shuffle and return requested count
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  const result = shuffled.slice(0, Math.min(count, shuffled.length));
  
  // If we need more questions than available, repeat with shuffled options
  while (result.length < count && questions.length > 0) {
    const additional = [...questions].sort(() => Math.random() - 0.5);
    for (const q of additional) {
      if (result.length >= count) break;
      // Create variation with shuffled answer options
      const shuffledOptions = [...q.answerOptions].sort(() => Math.random() - 0.5);
      result.push({
        ...q,
        answerOptions: shuffledOptions
      });
    }
  }
  
  return result.slice(0, count);
}