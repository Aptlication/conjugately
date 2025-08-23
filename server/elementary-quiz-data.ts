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
  ],

  "besoin": [
    // Positive statements (8 questions)
    {
      question: "I need a book / I am needing a book",
      hint: "Use 'avoir besoin de' with je and un livre",
      answerOptions: [
        { text: "Tu as besoin d'un livre", rationale: "Wrong person - this is 'you need', not 'I need'.", isCorrect: false },
        { text: "J'ai besoin d'un livre", rationale: "Correct! 'J'ai besoin d'un livre' means 'I need a book'.", isCorrect: true },
        { text: "Il a besoin d'un livre", rationale: "Wrong person - this is 'he needs', not 'I need'.", isCorrect: false },
        { text: "Nous avons besoin d'un livre", rationale: "Wrong person - this is 'we need', not 'I need'.", isCorrect: false }
      ]
    },
    {
      question: "You need a problem / You are needing a problem (informal)",
      hint: "Use 'avoir besoin de' with tu and un problème",
      answerOptions: [
        { text: "J'ai besoin d'un problème", rationale: "Wrong person - this is 'I need', not 'you need'.", isCorrect: false },
        { text: "Vous avez besoin d'un problème", rationale: "Wrong formality - this is formal/plural, question asks for informal tu.", isCorrect: false },
        { text: "Tu as besoin d'un problème", rationale: "Correct! 'Tu as besoin d'un problème' means 'You need a problem' (informal).", isCorrect: true },
        { text: "Ils ont besoin d'un problème", rationale: "Wrong person - this is 'they need', not 'you need'.", isCorrect: false }
      ]
    },
    {
      question: "He needs help / He is needing help",
      hint: "Use 'avoir besoin de' with il and aide",
      answerOptions: [
        { text: "Elle a besoin d'aide", rationale: "Wrong gender - this is 'she needs', not 'he needs'.", isCorrect: false },
        { text: "Tu as besoin d'aide", rationale: "Wrong person - this is 'you need', not 'he needs'.", isCorrect: false },
        { text: "Ils ont besoin d'aide", rationale: "Wrong number - this is 'they need', not 'he needs'.", isCorrect: false },
        { text: "Il a besoin d'aide", rationale: "Correct! 'Il a besoin d'aide' means 'He needs help'.", isCorrect: true }
      ]
    },
    {
      question: "She needs a rest / She is needing a rest",
      hint: "Use 'avoir besoin de' with elle and repos",
      answerOptions: [
        { text: "Il a besoin de repos", rationale: "Wrong gender - this is 'he needs', not 'she needs'.", isCorrect: false },
        { text: "Elle a besoin de repos", rationale: "Correct! 'Elle a besoin de repos' means 'She needs a rest'.", isCorrect: true },
        { text: "Elles ont besoin de repos", rationale: "Wrong number - this is 'they need' (fem. plural), not 'she needs'.", isCorrect: false },
        { text: "Tu as besoin de repos", rationale: "Wrong person - this is 'you need', not 'she needs'.", isCorrect: false }
      ]
    },
    {
      question: "We need water / We are needing water",
      hint: "Use 'avoir besoin de' with nous and eau",
      answerOptions: [
        { text: "Vous avez besoin d'eau", rationale: "Wrong person - this is 'you need' (formal/plural), not 'we need'.", isCorrect: false },
        { text: "Ils ont besoin d'eau", rationale: "Wrong person - this is 'they need', not 'we need'.", isCorrect: false },
        { text: "J'ai besoin d'eau", rationale: "Wrong person - this is 'I need', not 'we need'.", isCorrect: false },
        { text: "Nous avons besoin d'eau", rationale: "Correct! 'Nous avons besoin d'eau' means 'We need water'.", isCorrect: true }
      ]
    },
    {
      question: "You need to eat / You are needing to eat (formal / plural)",
      hint: "Use 'avoir besoin de' with vous and manger",
      answerOptions: [
        { text: "Tu as besoin de manger", rationale: "Wrong formality - this is informal tu, question asks for formal/plural vous.", isCorrect: false },
        { text: "Nous avons besoin de manger", rationale: "Wrong person - this is 'we need', not 'you need'.", isCorrect: false },
        { text: "Vous avez besoin de manger", rationale: "Correct! 'Vous avez besoin de manger' means 'You need to eat' (formal/plural).", isCorrect: true },
        { text: "Ils ont besoin de manger", rationale: "Wrong person - this is 'they need', not 'you need'.", isCorrect: false }
      ]
    },
    {
      question: "They need to go (male / mixed)",
      hint: "Use 'avoir besoin de' with ils and aller",
      answerOptions: [
        { text: "Elles ont besoin d'aller", rationale: "Wrong gender - this is feminine they, question asks for male/mixed.", isCorrect: false },
        { text: "Ils avaient besoin d'aller", rationale: "Wrong tense - this is imperfect, not present.", isCorrect: false },
        { text: "Ils auront besoin d'aller", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ils ont besoin d'aller", rationale: "Correct! 'Ils ont besoin d'aller' means 'They need to go' (male/mixed).", isCorrect: true }
      ]
    },
    {
      question: "They need to sleep (female)",
      hint: "Use 'avoir besoin de' with elles and dormir",
      answerOptions: [
        { text: "Ils ont besoin de dormir", rationale: "Wrong gender - this is masculine they, question asks for female.", isCorrect: false },
        { text: "Elles avaient besoin de dormir", rationale: "Wrong tense - this is imperfect, not present.", isCorrect: false },
        { text: "Elles auront besoin de dormir", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Elles ont besoin de dormir", rationale: "Correct! 'Elles ont besoin de dormir' means 'They need to sleep' (female).", isCorrect: true }
      ]
    },

    // Negative statements (6 questions)
    {
      question: "I do not need a book / I am not needing a book",
      hint: "Use negative 'avoir besoin de' with je and un livre",
      answerOptions: [
        { text: "Tu n'as pas besoin d'un livre", rationale: "Wrong person - this is 'you don't need', not 'I don't need'.", isCorrect: false },
        { text: "Il n'a pas besoin d'un livre", rationale: "Wrong person - this is 'he doesn't need', not 'I don't need'.", isCorrect: false },
        { text: "Je n'ai pas besoin d'un livre", rationale: "Correct! 'Je n'ai pas besoin d'un livre' means 'I do not need a book'.", isCorrect: true },
        { text: "Nous n'avons pas besoin d'un livre", rationale: "Wrong person - this is 'we don't need', not 'I don't need'.", isCorrect: false }
      ]
    },
    {
      question: "You do not need a problem / You are not needing a problem (informal)",
      hint: "Use negative 'avoir besoin de' with tu and un problème",
      answerOptions: [
        { text: "Je n'ai pas besoin d'un problème", rationale: "Wrong person - this is 'I don't need', not 'you don't need'.", isCorrect: false },
        { text: "Tu n'as pas besoin d'un problème", rationale: "Correct! 'Tu n'as pas besoin d'un problème' means 'You do not need a problem' (informal).", isCorrect: true },
        { text: "Vous n'avez pas besoin d'un problème", rationale: "Wrong formality - this is formal/plural, question asks for informal tu.", isCorrect: false },
        { text: "Ils n'ont pas besoin d'un problème", rationale: "Wrong person - this is 'they don't need', not 'you don't need'.", isCorrect: false }
      ]
    },
    {
      question: "He does not need help / He is not needing help",
      hint: "Use negative 'avoir besoin de' with il and aide",
      answerOptions: [
        { text: "Elle n'a pas besoin d'aide", rationale: "Wrong gender - this is 'she doesn't need', not 'he doesn't need'.", isCorrect: false },
        { text: "Tu n'as pas besoin d'aide", rationale: "Wrong person - this is 'you don't need', not 'he doesn't need'.", isCorrect: false },
        { text: "Ils n'ont pas besoin d'aide", rationale: "Wrong number - this is 'they don't need', not 'he doesn't need'.", isCorrect: false },
        { text: "Il n'a pas besoin d'aide", rationale: "Correct! 'Il n'a pas besoin d'aide' means 'He does not need help'.", isCorrect: true }
      ]
    },
    {
      question: "She does not need rest / She is not needing rest",
      hint: "Use negative 'avoir besoin de' with elle and repos",
      answerOptions: [
        { text: "Il n'a pas besoin de repos", rationale: "Wrong gender - this is 'he doesn't need', not 'she doesn't need'.", isCorrect: false },
        { text: "Elle n'a pas besoin de repos", rationale: "Correct! 'Elle n'a pas besoin de repos' means 'She does not need rest'.", isCorrect: true },
        { text: "Elles n'ont pas besoin de repos", rationale: "Wrong number - this is 'they don't need' (fem. plural), not 'she doesn't need'.", isCorrect: false },
        { text: "Tu n'as pas besoin de repos", rationale: "Wrong person - this is 'you don't need', not 'she doesn't need'.", isCorrect: false }
      ]
    },
    {
      question: "We do not need water / We are not needing water",
      hint: "Use negative 'avoir besoin de' with nous and eau",
      answerOptions: [
        { text: "Vous n'avez pas besoin d'eau", rationale: "Wrong person - this is 'you don't need' (formal/plural), not 'we don't need'.", isCorrect: false },
        { text: "Ils n'ont pas besoin d'eau", rationale: "Wrong person - this is 'they don't need', not 'we don't need'.", isCorrect: false },
        { text: "Je n'ai pas besoin d'eau", rationale: "Wrong person - this is 'I don't need', not 'we don't need'.", isCorrect: false },
        { text: "Nous n'avons pas besoin d'eau", rationale: "Correct! 'Nous n'avons pas besoin d'eau' means 'We do not need water'.", isCorrect: true }
      ]
    },
    {
      question: "You do not need to eat / You are not needing to eat (formal / plural)",
      hint: "Use negative 'avoir besoin de' with vous and manger",
      answerOptions: [
        { text: "Tu n'as pas besoin de manger", rationale: "Wrong formality - this is informal tu, question asks for formal/plural vous.", isCorrect: false },
        { text: "Vous n'avez pas besoin de manger", rationale: "Correct! 'Vous n'avez pas besoin de manger' means 'You do not need to eat' (formal/plural).", isCorrect: true },
        { text: "Nous n'avons pas besoin de manger", rationale: "Wrong person - this is 'we don't need', not 'you don't need'.", isCorrect: false },
        { text: "Ils n'ont pas besoin de manger", rationale: "Wrong person - this is 'they don't need', not 'you don't need'.", isCorrect: false }
      ]
    },

    // Positive questions (3 questions)
    {
      question: "Do I need a book? / Am I needing a book?",
      hint: "Use question form of 'avoir besoin de' with je and un livre",
      answerOptions: [
        { text: "As-tu besoin d'un livre ?", rationale: "Wrong person - this asks 'Do you need', not 'Do I need'.", isCorrect: false },
        { text: "A-t-il besoin d'un livre ?", rationale: "Wrong person - this asks 'Does he need', not 'Do I need'.", isCorrect: false },
        { text: "Ai-je besoin d'un livre ?", rationale: "Correct! 'Ai-je besoin d'un livre ?' means 'Do I need a book?'", isCorrect: true },
        { text: "Avons-nous besoin d'un livre ?", rationale: "Wrong person - this asks 'Do we need', not 'Do I need'.", isCorrect: false }
      ]
    },
    {
      question: "Do you need a problem? / Are you needing a problem? (informal)",
      hint: "Use question form of 'avoir besoin de' with tu and un problème",
      answerOptions: [
        { text: "Ai-je besoin d'un problème ?", rationale: "Wrong person - this asks 'Do I need', not 'Do you need'.", isCorrect: false },
        { text: "As-tu besoin d'un problème ?", rationale: "Correct! 'As-tu besoin d'un problème ?' means 'Do you need a problem?' (informal).", isCorrect: true },
        { text: "A-t-il besoin d'un problème ?", rationale: "Wrong person - this asks 'Does he need', not 'Do you need'.", isCorrect: false },
        { text: "Avez-vous besoin d'un problème ?", rationale: "Wrong formality - this is formal/plural, question asks for informal tu.", isCorrect: false }
      ]
    },
    {
      question: "Does he need help? / Is he needing help?",
      hint: "Use question form of 'avoir besoin de' with il and aide",
      answerOptions: [
        { text: "A-t-elle besoin d'aide ?", rationale: "Wrong gender - this asks 'Does she need', not 'Does he need'.", isCorrect: false },
        { text: "Ai-je besoin d'aide ?", rationale: "Wrong person - this asks 'Do I need', not 'Does he need'.", isCorrect: false },
        { text: "As-tu besoin d'aide ?", rationale: "Wrong person - this asks 'Do you need', not 'Does he need'.", isCorrect: false },
        { text: "A-t-il besoin d'aide ?", rationale: "Correct! 'A-t-il besoin d'aide ?' means 'Does he need help?'", isCorrect: true }
      ]
    },

    // Negative questions (3 questions)
    {
      question: "Don't I need a book? / Am I not needing a book?",
      hint: "Use negative question form of 'avoir besoin de' with je and un livre",
      answerOptions: [
        { text: "N'as-tu pas besoin d'un livre ?", rationale: "Wrong person - this asks 'Don't you need', not 'Don't I need'.", isCorrect: false },
        { text: "N'a-t-il pas besoin d'un livre ?", rationale: "Wrong person - this asks 'Doesn't he need', not 'Don't I need'.", isCorrect: false },
        { text: "N'avons-nous pas besoin d'un livre ?", rationale: "Wrong person - this asks 'Don't we need', not 'Don't I need'.", isCorrect: false },
        { text: "N'ai-je pas besoin d'un livre ?", rationale: "Correct! 'N'ai-je pas besoin d'un livre ?' means 'Don't I need a book?'", isCorrect: true }
      ]
    },
    {
      question: "Don't you need a problem? / Are you not needing a problem? (informal)",
      hint: "Use negative question form of 'avoir besoin de' with tu and un problème",
      answerOptions: [
        { text: "N'ai-je pas besoin d'un problème ?", rationale: "Wrong person - this asks 'Don't I need', not 'Don't you need'.", isCorrect: false },
        { text: "N'as-tu pas besoin d'un problème ?", rationale: "Correct! 'N'as-tu pas besoin d'un problème ?' means 'Don't you need a problem?' (informal).", isCorrect: true },
        { text: "N'a-t-il pas besoin d'un problème ?", rationale: "Wrong person - this asks 'Doesn't he need', not 'Don't you need'.", isCorrect: false },
        { text: "N'avez-vous pas besoin d'un problème ?", rationale: "Wrong formality - this is formal/plural, question asks for informal tu.", isCorrect: false }
      ]
    },
    {
      question: "Doesn't he need help? / Isn't he needing help?",
      hint: "Use negative question form of 'avoir besoin de' with il and aide",
      answerOptions: [
        { text: "N'a-t-elle pas besoin d'aide ?", rationale: "Wrong gender - this asks 'Doesn't she need', not 'Doesn't he need'.", isCorrect: false },
        { text: "N'ai-je pas besoin d'aide ?", rationale: "Wrong person - this asks 'Don't I need', not 'Doesn't he need'.", isCorrect: false },
        { text: "N'as-tu pas besoin d'aide ?", rationale: "Wrong person - this asks 'Don't you need', not 'Doesn't he need'.", isCorrect: false },
        { text: "N'a-t-il pas besoin d'aide ?", rationale: "Correct! 'N'a-t-il pas besoin d'aide ?' means 'Doesn't he need help?'", isCorrect: true }
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