// Elementary Level Quiz Question Interface
export interface ElementaryQuizQuestion {
  question: string;
  hint: string;
  answerOptions: Array<{
    text: string;
    rationale: string;
    isCorrect: boolean;
  }>;
}

// Elementary Level Present Tense Quiz Data
export const ELEMENTARY_PRESENT_QUESTIONS: Record<string, ElementaryQuizQuestion[]> = {
  "besoin": [
    // Positive statements
    {
      question: "I need a book / I am needing a book",
      hint: "Use present tense of 'avoir besoin de' with je and un livre",
      answerOptions: [
        { text: "Tu as besoin d'un livre", rationale: "Wrong person - this is 'you need', not 'I need'.", isCorrect: false },
        { text: "J'ai besoin d'un livre", rationale: "Correct! 'J'ai besoin d'un livre' means 'I need a book' in present tense.", isCorrect: true },
        { text: "Il a besoin d'un livre", rationale: "Wrong person - this is 'he needs', not 'I need'.", isCorrect: false },
        { text: "Nous avons besoin d'un livre", rationale: "Wrong person - this is 'we need', not 'I need'.", isCorrect: false }
      ]
    },
    {
      question: "You need a problem / You are needing a problem (informal)",
      hint: "Use present tense of 'avoir besoin de' with tu (informal)",
      answerOptions: [
        { text: "J'ai besoin d'un problème", rationale: "Wrong person - this is 'I need', not 'you need'.", isCorrect: false },
        { text: "Vous avez besoin d'un problème", rationale: "Wrong formality - this is formal 'you', question asks for informal.", isCorrect: false },
        { text: "Ils ont besoin d'un problème", rationale: "Wrong person - this is 'they need', not 'you need'.", isCorrect: false },
        { text: "Tu as besoin d'un problème", rationale: "Correct! 'Tu as besoin d'un problème' means 'you need a problem' (informal).", isCorrect: true }
      ]
    },
    {
      question: "He needs help / He is needing help",
      hint: "Use present tense of 'avoir besoin de' with il and aide",
      answerOptions: [
        { text: "Elle a besoin d'aide", rationale: "Wrong gender - this is 'she needs', not 'he needs'.", isCorrect: false },
        { text: "Tu as besoin d'aide", rationale: "Wrong person - this is 'you need', not 'he needs'.", isCorrect: false },
        { text: "Il a besoin d'aide", rationale: "Correct! 'Il a besoin d'aide' means 'he needs help'.", isCorrect: true },
        { text: "Ils ont besoin d'aide", rationale: "Wrong person - this is 'they need', not 'he needs'.", isCorrect: false }
      ]
    },
    {
      question: "She needs a rest / She is needing a rest",
      hint: "Use present tense of 'avoir besoin de' with elle and repos",
      answerOptions: [
        { text: "Il a besoin de repos", rationale: "Wrong gender - this is 'he needs', not 'she needs'.", isCorrect: false },
        { text: "Elles ont besoin de repos", rationale: "Wrong number - this is 'they need' (feminine plural), not 'she needs'.", isCorrect: false },
        { text: "Tu as besoin de repos", rationale: "Wrong person - this is 'you need', not 'she needs'.", isCorrect: false },
        { text: "Elle a besoin de repos", rationale: "Correct! 'Elle a besoin de repos' means 'she needs a rest'.", isCorrect: true }
      ]
    },
    {
      question: "We need water / We are needing water",
      hint: "Use present tense of 'avoir besoin de' with nous and eau",
      answerOptions: [
        { text: "Nous avons besoin d'eau", rationale: "Correct! 'Nous avons besoin d'eau' means 'we need water'.", isCorrect: true },
        { text: "Vous avez besoin d'eau", rationale: "Wrong person - this is 'you need', not 'we need'.", isCorrect: false },
        { text: "Ils ont besoin d'eau", rationale: "Wrong person - this is 'they need', not 'we need'.", isCorrect: false },
        { text: "J'ai besoin d'eau", rationale: "Wrong person - this is 'I need', not 'we need'.", isCorrect: false }
      ]
    },
    {
      question: "You need to eat / You are needing to eat (formal / plural)",
      hint: "Use present tense of 'avoir besoin de' with vous (formal/plural)",
      answerOptions: [
        { text: "Tu as besoin de manger", rationale: "Wrong formality - this is informal 'you', question asks for formal/plural.", isCorrect: false },
        { text: "Nous avons besoin de manger", rationale: "Wrong person - this is 'we need', not 'you need'.", isCorrect: false },
        { text: "Vous avez besoin de manger", rationale: "Correct! 'Vous avez besoin de manger' means 'you need to eat' (formal/plural).", isCorrect: true },
        { text: "Ils ont besoin de manger", rationale: "Wrong person - this is 'they need', not 'you need'.", isCorrect: false }
      ]
    },
    {
      question: "They need to go (male / mixed)",
      hint: "Use present tense of 'avoir besoin de' with ils and aller",
      answerOptions: [
        { text: "Elles ont besoin d'aller", rationale: "Wrong gender - this is feminine 'they', question specifies masculine/mixed.", isCorrect: false },
        { text: "Ils ont besoin d'aller", rationale: "Correct! 'Ils ont besoin d'aller' means 'they need to go' (masculine/mixed).", isCorrect: true },
        { text: "Ils avaient besoin d'aller", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ils auront besoin d'aller", rationale: "Wrong tense - this is future, not present.", isCorrect: false }
      ]
    },
    {
      question: "They need to sleep (female)",
      hint: "Use present tense of 'avoir besoin de' with elles and dormir",
      answerOptions: [
        { text: "Ils ont besoin de dormir", rationale: "Wrong gender - this is masculine 'they', question specifies feminine.", isCorrect: false },
        { text: "Elles avaient besoin de dormir", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Elles auront besoin de dormir", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Elles ont besoin de dormir", rationale: "Correct! 'Elles ont besoin de dormir' means 'they need to sleep' (feminine).", isCorrect: true }
      ]
    },
    // Negative statements
    {
      question: "I do not need a book / I am not needing a book",
      hint: "Use negative present tense 'ne...pas' with avoir besoin de",
      answerOptions: [
        { text: "Tu n'as pas besoin d'un livre", rationale: "Wrong person - this is 'you don't need', not 'I don't need'.", isCorrect: false },
        { text: "Je n'ai pas besoin d'un livre", rationale: "Correct! 'Je n'ai pas besoin d'un livre' means 'I do not need a book'.", isCorrect: true },
        { text: "Il n'a pas besoin d'un livre", rationale: "Wrong person - this is 'he doesn't need', not 'I don't need'.", isCorrect: false },
        { text: "Nous n'avons pas besoin d'un livre", rationale: "Wrong person - this is 'we don't need', not 'I don't need'.", isCorrect: false }
      ]
    },
    {
      question: "You do not need a problem / You are not needing a problem (informal)",
      hint: "Use negative present tense with tu (informal)",
      answerOptions: [
        { text: "Je n'ai pas besoin d'un problème", rationale: "Wrong person - this is 'I don't need', not 'you don't need'.", isCorrect: false },
        { text: "Vous n'avez pas besoin d'un problème", rationale: "Wrong formality - this is formal 'you', question asks for informal.", isCorrect: false },
        { text: "Ils n'ont pas besoin d'un problème", rationale: "Wrong person - this is 'they don't need', not 'you don't need'.", isCorrect: false },
        { text: "Tu n'as pas besoin d'un problème", rationale: "Correct! 'Tu n'as pas besoin d'un problème' means 'you don't need a problem' (informal).", isCorrect: true }
      ]
    },
    {
      question: "He does not need help / He is not needing help",
      hint: "Use negative present tense with il",
      answerOptions: [
        { text: "Elle n'a pas besoin d'aide", rationale: "Wrong gender - this is 'she doesn't need', not 'he doesn't need'.", isCorrect: false },
        { text: "Tu n'as pas besoin d'aide", rationale: "Wrong person - this is 'you don't need', not 'he doesn't need'.", isCorrect: false },
        { text: "Il n'a pas besoin d'aide", rationale: "Correct! 'Il n'a pas besoin d'aide' means 'he does not need help'.", isCorrect: true },
        { text: "Ils n'ont pas besoin d'aide", rationale: "Wrong person - this is 'they don't need', not 'he doesn't need'.", isCorrect: false }
      ]
    },
    {
      question: "She does not need rest / She is not needing rest",
      hint: "Use negative present tense with elle",
      answerOptions: [
        { text: "Il n'a pas besoin de repos", rationale: "Wrong gender - this is 'he doesn't need', not 'she doesn't need'.", isCorrect: false },
        { text: "Elles n'ont pas besoin de repos", rationale: "Wrong number - this is 'they don't need' (feminine plural), not 'she doesn't need'.", isCorrect: false },
        { text: "Tu n'as pas besoin de repos", rationale: "Wrong person - this is 'you don't need', not 'she doesn't need'.", isCorrect: false },
        { text: "Elle n'a pas besoin de repos", rationale: "Correct! 'Elle n'a pas besoin de repos' means 'she does not need rest'.", isCorrect: true }
      ]
    },
    {
      question: "We do not need water / We are not needing water",
      hint: "Use negative present tense with nous",
      answerOptions: [
        { text: "Vous n'avez pas besoin d'eau", rationale: "Wrong person - this is 'you don't need', not 'we don't need'.", isCorrect: false },
        { text: "Nous n'avons pas besoin d'eau", rationale: "Correct! 'Nous n'avons pas besoin d'eau' means 'we do not need water'.", isCorrect: true },
        { text: "Ils n'ont pas besoin d'eau", rationale: "Wrong person - this is 'they don't need', not 'we don't need'.", isCorrect: false },
        { text: "Je n'ai pas besoin d'eau", rationale: "Wrong person - this is 'I don't need', not 'we don't need'.", isCorrect: false }
      ]
    },
    {
      question: "You do not need to eat / You are not needing to eat (formal / plural)",
      hint: "Use negative present tense with vous (formal/plural)",
      answerOptions: [
        { text: "Tu n'as pas besoin de manger", rationale: "Wrong formality - this is informal 'you', question asks for formal/plural.", isCorrect: false },
        { text: "Nous n'avons pas besoin de manger", rationale: "Wrong person - this is 'we don't need', not 'you don't need'.", isCorrect: false },
        { text: "Vous n'avez pas besoin de manger", rationale: "Correct! 'Vous n'avez pas besoin de manger' means 'you do not need to eat' (formal/plural).", isCorrect: true },
        { text: "Ils n'ont pas besoin de manger", rationale: "Wrong person - this is 'they don't need', not 'you don't need'.", isCorrect: false }
      ]
    },
    // Positive questions
    {
      question: "Do I need a book? / Am I needing a book?",
      hint: "Use interrogative form with inversion: Ai-je",
      answerOptions: [
        { text: "As-tu besoin d'un livre ?", rationale: "Wrong person - this is 'Do you need?', not 'Do I need?'.", isCorrect: false },
        { text: "A-t-il besoin d'un livre ?", rationale: "Wrong person - this is 'Does he need?', not 'Do I need?'.", isCorrect: false },
        { text: "Ai-je besoin d'un livre ?", rationale: "Correct! 'Ai-je besoin d'un livre ?' means 'Do I need a book?' in interrogative form.", isCorrect: true },
        { text: "Avons-nous besoin d'un livre ?", rationale: "Wrong person - this is 'Do we need?', not 'Do I need?'.", isCorrect: false }
      ]
    },
    {
      question: "Do you need a problem? / Are you needing a problem? (informal)",
      hint: "Use interrogative form with inversion: As-tu",
      answerOptions: [
        { text: "Ai-je besoin d'un problème ?", rationale: "Wrong person - this is 'Do I need?', not 'Do you need?'.", isCorrect: false },
        { text: "A-t-il besoin d'un problème ?", rationale: "Wrong person - this is 'Does he need?', not 'Do you need?'.", isCorrect: false },
        { text: "Avez-vous besoin d'un problème ?", rationale: "Wrong formality - this is formal 'you', question asks for informal.", isCorrect: false },
        { text: "As-tu besoin d'un problème ?", rationale: "Correct! 'As-tu besoin d'un problème ?' means 'Do you need a problem?' (informal).", isCorrect: true }
      ]
    },
    {
      question: "Does he need help? / Is he needing help?",
      hint: "Use interrogative form with inversion: A-t-il",
      answerOptions: [
        { text: "A-t-elle besoin d'aide ?", rationale: "Wrong gender - this is 'Does she need?', not 'Does he need?'.", isCorrect: false },
        { text: "Ai-je besoin d'aide ?", rationale: "Wrong person - this is 'Do I need?', not 'Does he need?'.", isCorrect: false },
        { text: "A-t-il besoin d'aide ?", rationale: "Correct! 'A-t-il besoin d'aide ?' means 'Does he need help?'.", isCorrect: true },
        { text: "As-tu besoin d'aide ?", rationale: "Wrong person - this is 'Do you need?', not 'Does he need?'.", isCorrect: false }
      ]
    },
    // Negative questions
    {
      question: "Don't I need a book? / Am I not needing a book?",
      hint: "Use negative interrogative form: N'ai-je pas",
      answerOptions: [
        { text: "N'as-tu pas besoin d'un livre ?", rationale: "Wrong person - this is 'Don't you need?', not 'Don't I need?'.", isCorrect: false },
        { text: "N'ai-je pas besoin d'un livre ?", rationale: "Correct! 'N'ai-je pas besoin d'un livre ?' means 'Don't I need a book?'.", isCorrect: true },
        { text: "N'a-t-il pas besoin d'un livre ?", rationale: "Wrong person - this is 'Doesn't he need?', not 'Don't I need?'.", isCorrect: false },
        { text: "N'avons-nous pas besoin d'un livre ?", rationale: "Wrong person - this is 'Don't we need?', not 'Don't I need?'.", isCorrect: false }
      ]
    },
    {
      question: "Don't you need a problem? / Are you not needing a problem? (informal)",
      hint: "Use negative interrogative form: N'as-tu pas",
      answerOptions: [
        { text: "N'ai-je pas besoin d'un problème ?", rationale: "Wrong person - this is 'Don't I need?', not 'Don't you need?'.", isCorrect: false },
        { text: "N'a-t-il pas besoin d'un problème ?", rationale: "Wrong person - this is 'Doesn't he need?', not 'Don't you need?'.", isCorrect: false },
        { text: "N'avez-vous pas besoin d'un problème ?", rationale: "Wrong formality - this is formal 'you', question asks for informal.", isCorrect: false },
        { text: "N'as-tu pas besoin d'un problème ?", rationale: "Correct! 'N'as-tu pas besoin d'un problème ?' means 'Don't you need a problem?' (informal).", isCorrect: true }
      ]
    },
    {
      question: "Doesn't he need help? / Isn't he needing help?",
      hint: "Use negative interrogative form: N'a-t-il pas",
      answerOptions: [
        { text: "N'a-t-elle pas besoin d'aide ?", rationale: "Wrong gender - this is 'Doesn't she need?', not 'Doesn't he need?'.", isCorrect: false },
        { text: "N'ai-je pas besoin d'aide ?", rationale: "Wrong person - this is 'Don't I need?', not 'Doesn't he need?'.", isCorrect: false },
        { text: "N'as-tu pas besoin d'aide ?", rationale: "Wrong person - this is 'Don't you need?', not 'Doesn't he need?'.", isCorrect: false },
        { text: "N'a-t-il pas besoin d'aide ?", rationale: "Correct! 'N'a-t-il pas besoin d'aide ?' means 'Doesn't he need help?'.", isCorrect: true }
      ]
    }
  ],
  "dire": [
    {
      question: "He says / He is saying the answer.",
      hint: "Use third person singular: il dit",
      answerOptions: [
        { text: "Il dit la réponse.", rationale: "Option A", isCorrect: true },
        { text: "Ils disent la réponse.", rationale: "Option B", isCorrect: false },
        { text: "Il disent la réponse.", rationale: "Option C", isCorrect: false },
        { text: "Ils dit la réponse.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) say / are saying that every day.",
      hint: "Use informal second person: tu dis",
      answerOptions: [
        { text: "Tu dis ça tous les jours.", rationale: "Option A", isCorrect: true },
        { text: "Tu disons ça tous les jours.", rationale: "Option B", isCorrect: false },
        { text: "Vous dites ça tous les jours.", rationale: "Option C", isCorrect: false },
        { text: "Tu dites ça tous les jours.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We say / We are saying the truth.",
      hint: "Use first person plural: nous disons",
      answerOptions: [
        { text: "Nous dites la vérité.", rationale: "Option A", isCorrect: false },
        { text: "Nous disons la vérité.", rationale: "Option B", isCorrect: true },
        { text: "Nous dis la vérité.", rationale: "Option C", isCorrect: false },
        { text: "Nous disent la vérité.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female group) do not say / are not saying anything.",
      hint: "Use feminine plural with negation: elles ne disent rien",
      answerOptions: [
        { text: "Elles ne disons rien.", rationale: "Option A", isCorrect: false },
        { text: "Elles ne dites rien.", rationale: "Option B", isCorrect: false },
        { text: "Elles ne disent rien.", rationale: "Option C", isCorrect: true },
        { text: "Elles ne dis rien.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Does she say / is she saying the answer?",
      hint: "Use 'est-ce que' structure: est-ce qu'elle dit",
      answerOptions: [
        { text: "Est-ce qu'elle dites la réponse ?", rationale: "Option A", isCorrect: false },
        { text: "Est-ce qu'elle dit la réponse ?", rationale: "Option B", isCorrect: true },
        { text: "Est-ce qu'elle dis la réponse ?", rationale: "Option C", isCorrect: false },
        { text: "Est-ce qu'elle disent la réponse ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He does not say / is not saying much.",
      hint: "Use third person singular with negation: il ne dit pas",
      answerOptions: [
        { text: "Il ne dit pas grand-chose.", rationale: "Option A", isCorrect: true },
        { text: "Ils ne disent pas grand-chose.", rationale: "Option B", isCorrect: false },
        { text: "Il ne dis pas grand-chose.", rationale: "Option C", isCorrect: false },
        { text: "Il ne disent pas grand-chose.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I do not say / am not saying anything.",
      hint: "Use first person singular with negation: je ne dis rien",
      answerOptions: [
        { text: "Je ne dis rien.", rationale: "Option A", isCorrect: true },
        { text: "Je ne disons rien.", rationale: "Option B", isCorrect: false },
        { text: "Je ne dites rien.", rationale: "Option C", isCorrect: false },
        { text: "Je ne disent rien.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) say / are saying important things.",
      hint: "Use formal second person: vous dites",
      answerOptions: [
        { text: "Tu dis des choses importantes.", rationale: "Option A", isCorrect: false },
        { text: "Vous dites des choses importantes.", rationale: "Option B", isCorrect: true },
        { text: "Vous disons des choses importantes.", rationale: "Option C", isCorrect: false },
        { text: "Vous dis des choses importantes.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We never say / are never saying that.",
      hint: "Use first person plural with negation: nous ne disons jamais",
      answerOptions: [
        { text: "Nous ne disons jamais ça.", rationale: "Option A", isCorrect: true },
        { text: "Nous ne dites jamais ça.", rationale: "Option B", isCorrect: false },
        { text: "Nous ne disent jamais ça.", rationale: "Option C", isCorrect: false },
        { text: "Nous ne dis jamais ça.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Do you (plural) say / are you saying good morning every day?",
      hint: "Use plural interrogative inversion: dites-vous",
      answerOptions: [
        { text: "Dites-vous bonjour chaque jour ?", rationale: "Option A", isCorrect: true },
        { text: "Dis-tu bonjour chaque jour ?", rationale: "Option B", isCorrect: false },
        { text: "Disons-vous bonjour chaque jour ?", rationale: "Option C", isCorrect: false },
        { text: "Disez-vous bonjour chaque jour ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) say / are saying the truth.",
      hint: "Use masculine plural: ils disent",
      answerOptions: [
        { text: "Ils disent la vérité.", rationale: "Option A", isCorrect: true },
        { text: "Ils dites la vérité.", rationale: "Option B", isCorrect: false },
        { text: "Ils disons la vérité.", rationale: "Option C", isCorrect: false },
        { text: "Ils dit la vérité.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) do not say / are not saying please.",
      hint: "Use informal 'tu' with negation: tu ne dis pas",
      answerOptions: [
        { text: "Tu ne dis pas s'il te plaît.", rationale: "Option A", isCorrect: true },
        { text: "Vous ne dites pas s'il te plaît.", rationale: "Option B", isCorrect: false },
        { text: "Tu ne dites pas s'il te plaît.", rationale: "Option C", isCorrect: false },
        { text: "Vous ne dis pas s'il te plaît.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) say / are saying thank you.",
      hint: "Use feminine plural: elles disent",
      answerOptions: [
        { text: "Elles disent merci.", rationale: "Option A", isCorrect: true },
        { text: "Elles dites merci.", rationale: "Option B", isCorrect: false },
        { text: "Elles disons merci.", rationale: "Option C", isCorrect: false },
        { text: "Elles dit merci.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We are saying / say goodbye now.",
      hint: "Use first person plural: nous disons",
      answerOptions: [
        { text: "Nous disons au revoir maintenant.", rationale: "Option A", isCorrect: true },
        { text: "Nous dites au revoir maintenant.", rationale: "Option B", isCorrect: false },
        { text: "Nous disent au revoir maintenant.", rationale: "Option C", isCorrect: false },
        { text: "Nous dis au revoir maintenant.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Do you (informal) say / are you saying your name?",
      hint: "Use informal interrogative inversion: dis-tu",
      answerOptions: [
        { text: "Dis-tu ton nom ?", rationale: "Option A", isCorrect: true },
        { text: "Dites-tu ton nom ?", rationale: "Option B", isCorrect: false },
        { text: "Dites-vous ton nom ?", rationale: "Option C", isCorrect: false },
        { text: "Dis-tu ton noms ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She says / is saying everything now.",
      hint: "Use third person singular feminine: elle dit",
      answerOptions: [
        { text: "Elle dit tout maintenant.", rationale: "Option A", isCorrect: true },
        { text: "Elle dites tout maintenant.", rationale: "Option B", isCorrect: false },
        { text: "Elle disent tout maintenant.", rationale: "Option C", isCorrect: false },
        { text: "Elle dis tout maintenant.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He says / is saying nothing.",
      hint: "Use third person singular with negation: il ne dit rien",
      answerOptions: [
        { text: "Il ne dit rien.", rationale: "Option A", isCorrect: true },
        { text: "Ils ne disent rien.", rationale: "Option B", isCorrect: false },
        { text: "Il ne dis rien.", rationale: "Option C", isCorrect: false },
        { text: "Il ne disent rien.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We do not say / are not saying that often.",
      hint: "Use first person plural with negation: nous ne disons pas",
      answerOptions: [
        { text: "Nous ne disons pas ça souvent.", rationale: "Option A", isCorrect: true },
        { text: "Nous ne dites pas ça souvent.", rationale: "Option B", isCorrect: false },
        { text: "Nous ne disent pas ça souvent.", rationale: "Option C", isCorrect: false },
        { text: "Nous ne dis pas ça souvent.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I say / am saying the truth now.",
      hint: "Use first person singular: je dis",
      answerOptions: [
        { text: "Je dis la vérité maintenant.", rationale: "Option A", isCorrect: true },
        { text: "Je dites la vérité maintenant.", rationale: "Option B", isCorrect: false },
        { text: "Je disent la vérité maintenant.", rationale: "Option C", isCorrect: false },
        { text: "Je disons la vérité maintenant.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They do not say / are not saying anything.",
      hint: "Use third person plural with negation: ils ne disent rien",
      answerOptions: [
        { text: "Ils ne disent rien.", rationale: "Option A", isCorrect: true },
        { text: "Ils ne dites rien.", rationale: "Option B", isCorrect: false },
        { text: "Ils ne disons rien.", rationale: "Option C", isCorrect: false },
        { text: "Ils ne dis rien.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "What are we saying?",
      hint: "Use first person plural interrogative: que disons-nous",
      answerOptions: [
        { text: "Que dit-il ?", rationale: "Option A", isCorrect: false },
        { text: "Que disons-nous ?", rationale: "Option B", isCorrect: true },
        { text: "Que dites-vous ?", rationale: "Option C", isCorrect: false },
        { text: "Que disent-ils ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) are not telling the truth.",
      hint: "Use informal negation: tu ne dis pas",
      answerOptions: [
        { text: "Tu ne dit pas la vérité.", rationale: "Option A", isCorrect: false },
        { text: "Tu ne dis pas la vérité.", rationale: "Option B", isCorrect: true },
        { text: "Tu ne disons pas la vérité.", rationale: "Option C", isCorrect: false },
        { text: "Tu ne dites pas la vérité.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She says that she is tired.",
      hint: "Use third person singular: elle dit",
      answerOptions: [
        { text: "Elle dis qu'elle est fatiguée.", rationale: "Option A", isCorrect: false },
        { text: "Elle dit qu'elle est fatiguée.", rationale: "Option B", isCorrect: true },
        { text: "Elle dites qu'elle est fatiguée.", rationale: "Option C", isCorrect: false },
        { text: "Elle disent qu'elle est fatiguée.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (masculine) say goodbye.",
      hint: "Use third person plural masculine: ils disent",
      answerOptions: [
        { text: "Ils dis au revoir.", rationale: "Option A", isCorrect: false },
        { text: "Ils disent au revoir.", rationale: "Option B", isCorrect: true },
        { text: "Ils dit au revoir.", rationale: "Option C", isCorrect: false },
        { text: "Ils disons au revoir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I'm telling you (plural) something.",
      hint: "Use first person with plural object: je vous dis",
      answerOptions: [
        { text: "Je vous dit quelque chose.", rationale: "Option A", isCorrect: false },
        { text: "Je vous dis quelque chose.", rationale: "Option B", isCorrect: true },
        { text: "Je vous disons quelque chose.", rationale: "Option C", isCorrect: false },
        { text: "Je vous disez quelque chose.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) say that it's important.",
      hint: "Use formal vous conjugation: vous dites",
      answerOptions: [
        { text: "Vous disent que c'est important.", rationale: "Option A", isCorrect: false },
        { text: "Vous dis que c'est important.", rationale: "Option B", isCorrect: false },
        { text: "Vous dites que c'est important.", rationale: "Option C", isCorrect: true },
        { text: "Vous dit que c'est important.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We say what we think.",
      hint: "Use first person plural: nous disons",
      answerOptions: [
        { text: "Nous disons ce que nous pensons.", rationale: "Option A", isCorrect: true },
        { text: "Nous dit ce que nous pensons.", rationale: "Option B", isCorrect: false },
        { text: "Nous disent ce que nous pensons.", rationale: "Option C", isCorrect: false },
        { text: "Nous dis ce que nous pensons.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (feminine) always say hello.",
      hint: "Use feminine plural: elles disent",
      answerOptions: [
        { text: "Elles dit toujours bonjour.", rationale: "Option A", isCorrect: false },
        { text: "Elles disons toujours bonjour.", rationale: "Option B", isCorrect: false },
        { text: "Elles dis toujours bonjour.", rationale: "Option C", isCorrect: false },
        { text: "Elles disent toujours bonjour.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "He doesn't say a word.",
      hint: "Use masculine singular with negation: il ne dit pas",
      answerOptions: [
        { text: "Il ne disons pas un mot.", rationale: "Option A", isCorrect: false },
        { text: "Il ne dit pas un mot.", rationale: "Option B", isCorrect: true },
        { text: "Il ne dis pas un mot.", rationale: "Option C", isCorrect: false },
        { text: "Il ne disent pas un mot.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I say that it's possible.",
      hint: "Use first person singular: je dis",
      answerOptions: [
        { text: "Je dis que c'est possible.", rationale: "Option A", isCorrect: true },
        { text: "Je dit que c'est possible.", rationale: "Option B", isCorrect: false },
        { text: "Je disons que c'est possible.", rationale: "Option C", isCorrect: false },
        { text: "Je dites que c'est possible.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) say something interesting.",
      hint: "Use informal tu conjugation: tu dis",
      answerOptions: [
        { text: "Tu dit quelque chose d'intéressant.", rationale: "Option A", isCorrect: false },
        { text: "Tu dis quelque chose d'intéressant.", rationale: "Option B", isCorrect: true },
        { text: "Tu disons quelque chose d'intéressant.", rationale: "Option C", isCorrect: false },
        { text: "Tu dites quelque chose d'intéressant.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "What are you (formal) saying?",
      hint: "Use formal interrogative: que dites-vous",
      answerOptions: [
        { text: "Que disent-ils ?", rationale: "Option A", isCorrect: false },
        { text: "Que dis-tu ?", rationale: "Option B", isCorrect: false },
        { text: "Que dites-vous ?", rationale: "Option C", isCorrect: true },
        { text: "Que dit-il ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (masculine) say that they are ready.",
      hint: "Use masculine plural: ils disent",
      answerOptions: [
        { text: "Ils dit qu'ils sont prêts.", rationale: "Option A", isCorrect: false },
        { text: "Ils disons qu'ils sont prêts.", rationale: "Option B", isCorrect: false },
        { text: "Ils dis qu'ils sont prêts.", rationale: "Option C", isCorrect: false },
        { text: "Ils disent qu'ils sont prêts.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "She says no.",
      hint: "Use feminine singular: elle dit",
      answerOptions: [
        { text: "Elle dit non.", rationale: "Option A", isCorrect: true },
        { text: "Elle dis non.", rationale: "Option B", isCorrect: false },
        { text: "Elle disons non.", rationale: "Option C", isCorrect: false },
        { text: "Elle disent non.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Do we say the truth?",
      hint: "Use first person plural interrogative: disons-nous",
      answerOptions: [
        { text: "Dit-on la vérité ?", rationale: "Option A", isCorrect: false },
        { text: "Disons-nous la vérité ?", rationale: "Option B", isCorrect: true },
        { text: "Dites-vous la vérité ?", rationale: "Option C", isCorrect: false },
        { text: "Disent-ils la vérité ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) don't say that.",
      hint: "Use informal negation: tu ne dis pas",
      answerOptions: [
        { text: "Tu ne dites pas ça.", rationale: "Option A", isCorrect: false },
        { text: "Tu ne dit pas ça.", rationale: "Option B", isCorrect: false },
        { text: "Tu ne dis pas ça.", rationale: "Option C", isCorrect: true },
        { text: "Tu ne disons pas ça.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Why does he say that?",
      hint: "Use masculine singular interrogative: pourquoi dit-il",
      answerOptions: [
        { text: "Pourquoi dis-tu cela ?", rationale: "Option A", isCorrect: false },
        { text: "Pourquoi dit-il cela ?", rationale: "Option B", isCorrect: true },
        { text: "Pourquoi disons-nous cela ?", rationale: "Option C", isCorrect: false },
        { text: "Pourquoi disent-ils cela ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I never say that.",
      hint: "Use first person with negation: je ne dis jamais",
      answerOptions: [
        { text: "Je ne dit jamais ça.", rationale: "Option A", isCorrect: false },
        { text: "Je ne disons jamais ça.", rationale: "Option B", isCorrect: false },
        { text: "Je ne dis jamais ça.", rationale: "Option C", isCorrect: true },
        { text: "Je ne dites jamais ça.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We say goodbye to our friends.",
      hint: "Use first person plural: nous disons",
      answerOptions: [
        { text: "Nous disons au revoir à nos amis.", rationale: "Option A", isCorrect: true },
        { text: "Nous dit au revoir à nos amis.", rationale: "Option B", isCorrect: false },
        { text: "Nous disent au revoir à nos amis.", rationale: "Option C", isCorrect: false },
        { text: "Nous dis au revoir à nos amis.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "What do you (informal) say?",
      hint: "Use informal interrogative: que dis-tu",
      answerOptions: [
        { text: "Que dit-il ?", rationale: "Option A", isCorrect: false },
        { text: "Que disons-nous ?", rationale: "Option B", isCorrect: false },
        { text: "Que dites-vous ?", rationale: "Option C", isCorrect: false },
        { text: "Que dis-tu ?", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "She says it is false.",
      hint: "Use feminine singular: elle dit",
      answerOptions: [
        { text: "Elle disons que c'est faux.", rationale: "Option A", isCorrect: false },
        { text: "Elle dit que c'est faux.", rationale: "Option B", isCorrect: true },
        { text: "Elle dis que c'est faux.", rationale: "Option C", isCorrect: false },
        { text: "Elle disent que c'est faux.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I say yes!",
      hint: "Use first person singular: je dis",
      answerOptions: [
        { text: "Je dis oui !", rationale: "Option A", isCorrect: true },
        { text: "Je dit oui !", rationale: "Option B", isCorrect: false },
        { text: "Je disons oui !", rationale: "Option C", isCorrect: false },
        { text: "Je dites oui !", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) are not saying anything.",
      hint: "Use formal negation: vous ne dites rien",
      answerOptions: [
        { text: "Vous ne dis rien.", rationale: "Option A", isCorrect: false },
        { text: "Vous ne dit rien.", rationale: "Option B", isCorrect: false },
        { text: "Vous ne disent rien.", rationale: "Option C", isCorrect: false },
        { text: "Vous ne dites rien.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "They (feminine) do not say their names.",
      hint: "Use feminine plural with negation: elles ne disent pas",
      answerOptions: [
        { text: "Elles ne dit pas leurs noms.", rationale: "Option A", isCorrect: false },
        { text: "Elles ne disons pas leurs noms.", rationale: "Option B", isCorrect: false },
        { text: "Elles ne disent pas leurs noms.", rationale: "Option C", isCorrect: true },
        { text: "Elles ne dis pas leurs noms.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (masculine) say good evening.",
      hint: "Use masculine plural: ils disent",
      answerOptions: [
        { text: "Ils disent bonsoir.", rationale: "Option A", isCorrect: true },
        { text: "Ils dit bonsoir.", rationale: "Option B", isCorrect: false },
        { text: "Ils disons bonsoir.", rationale: "Option C", isCorrect: false },
        { text: "Ils dis bonsoir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He says / He is saying the answer.",
      hint: "Use third person singular: il dit",
      answerOptions: [
        { text: "Il dit la réponse.", rationale: "Option A", isCorrect: true },
        { text: "Ils disent la réponse.", rationale: "Option B", isCorrect: false },
        { text: "Il disent la réponse.", rationale: "Option C", isCorrect: false },
        { text: "Ils dit la réponse.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) say / are saying that every day.",
      hint: "Use informal tu conjugation: tu dis",
      answerOptions: [
        { text: "Tu dis ça tous les jours.", rationale: "Option A", isCorrect: true },
        { text: "Tu disons ça tous les jours.", rationale: "Option B", isCorrect: false },
        { text: "Vous dites ça tous les jours.", rationale: "Option C", isCorrect: false },
        { text: "Tu dites ça tous les jours.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We say / We are saying the truth.",
      hint: "Use first person plural: nous disons",
      answerOptions: [
        { text: "Nous dites la vérité.", rationale: "Option A", isCorrect: false },
        { text: "Nous disons la vérité.", rationale: "Option B", isCorrect: true },
        { text: "Nous dis la vérité.", rationale: "Option C", isCorrect: false },
        { text: "Nous disent la vérité.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female group) do not say / are not saying anything.",
      hint: "Use feminine plural with negation: elles ne disent pas",
      answerOptions: [
        { text: "Elles ne disons rien.", rationale: "Option A", isCorrect: false },
        { text: "Elles ne dites rien.", rationale: "Option B", isCorrect: false },
        { text: "Elles ne disent rien.", rationale: "Option C", isCorrect: true },
        { text: "Elles ne dis rien.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Does she say / is she saying the answer?",
      hint: "Use feminine singular interrogative: est-ce qu'elle dit",
      answerOptions: [
        { text: "Est-ce qu'elle dites la réponse ?", rationale: "Option A", isCorrect: false },
        { text: "Est-ce qu'elle dit la réponse ?", rationale: "Option B", isCorrect: true },
        { text: "Est-ce qu'elle dis la réponse ?", rationale: "Option C", isCorrect: false },
        { text: "Est-ce qu'elle disent la réponse ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He does not say / is not saying much.",
      hint: "Use masculine singular with negation: il ne dit pas",
      answerOptions: [
        { text: "Il ne dit pas grand-chose.", rationale: "Option A", isCorrect: true },
        { text: "Ils ne disent pas grand-chose.", rationale: "Option B", isCorrect: false },
        { text: "Il ne dis pas grand-chose.", rationale: "Option C", isCorrect: false },
        { text: "Il ne disent pas grand-chose.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I do not say / am not saying anything.",
      hint: "Use first person singular with negation: je ne dis rien",
      answerOptions: [
        { text: "Je ne dis rien.", rationale: "Option A", isCorrect: true },
        { text: "Je ne disons rien.", rationale: "Option B", isCorrect: false },
        { text: "Je ne dites rien.", rationale: "Option C", isCorrect: false },
        { text: "Je ne disent rien.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) say / are saying important things.",
      hint: "Use formal vous conjugation: vous dites",
      answerOptions: [
        { text: "Tu dis des choses importantes.", rationale: "Option A", isCorrect: false },
        { text: "Vous dites des choses importantes.", rationale: "Option B", isCorrect: true },
        { text: "Vous disons des choses importantes.", rationale: "Option C", isCorrect: false },
        { text: "Vous dis des choses importantes.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We never say / are never saying that.",
      hint: "Use first person plural with negation: nous ne disons jamais",
      answerOptions: [
        { text: "Nous ne disons jamais ça.", rationale: "Option A", isCorrect: true },
        { text: "Nous ne dites jamais ça.", rationale: "Option B", isCorrect: false },
        { text: "Nous ne disent jamais ça.", rationale: "Option C", isCorrect: false },
        { text: "Nous ne dis jamais ça.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Do you (plural) say / are you saying good morning every day?",
      hint: "Use formal plural interrogative: dites-vous",
      answerOptions: [
        { text: "Dites-vous bonjour chaque jour ?", rationale: "Option A", isCorrect: true },
        { text: "Dis-tu bonjour chaque jour ?", rationale: "Option B", isCorrect: false },
        { text: "Disons-vous bonjour chaque jour ?", rationale: "Option C", isCorrect: false },
        { text: "Disez-vous bonjour chaque jour ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) say / are saying the truth.",
      hint: "Use masculine plural: ils disent",
      answerOptions: [
        { text: "Ils disent la vérité.", rationale: "Option A", isCorrect: true },
        { text: "Ils dites la vérité.", rationale: "Option B", isCorrect: false },
        { text: "Ils disons la vérité.", rationale: "Option C", isCorrect: false },
        { text: "Ils dit la vérité.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) do not say / are not saying please.",
      hint: "Use informal negation: tu ne dis pas",
      answerOptions: [
        { text: "Tu ne dis pas s'il te plaît.", rationale: "Option A", isCorrect: true },
        { text: "Vous ne dites pas s'il te plaît.", rationale: "Option B", isCorrect: false },
        { text: "Tu ne dites pas s'il te plaît.", rationale: "Option C", isCorrect: false },
        { text: "Vous ne dis pas s'il te plaît.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) say / are saying thank you.",
      hint: "Use feminine plural: elles disent",
      answerOptions: [
        { text: "Elles disent merci.", rationale: "Option A", isCorrect: true },
        { text: "Elles dites merci.", rationale: "Option B", isCorrect: false },
        { text: "Elles disons merci.", rationale: "Option C", isCorrect: false },
        { text: "Elles dit merci.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We are saying / say goodbye now.",
      hint: "Use first person plural: nous disons",
      answerOptions: [
        { text: "Nous disons au revoir maintenant.", rationale: "Option A", isCorrect: true },
        { text: "Nous dites au revoir maintenant.", rationale: "Option B", isCorrect: false },
        { text: "Nous disent au revoir maintenant.", rationale: "Option C", isCorrect: false },
        { text: "Nous dis au revoir maintenant.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Do you (informal) say / are you saying your name?",
      hint: "Use informal interrogative: dis-tu",
      answerOptions: [
        { text: "Dis-tu ton nom ?", rationale: "Option A", isCorrect: true },
        { text: "Dites-tu ton nom ?", rationale: "Option B", isCorrect: false },
        { text: "Dites-vous ton nom ?", rationale: "Option C", isCorrect: false },
        { text: "Dis-tu ton noms ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She says / is saying everything now.",
      hint: "Use feminine singular: elle dit",
      answerOptions: [
        { text: "Elle dit tout maintenant.", rationale: "Option A", isCorrect: true },
        { text: "Elle dites tout maintenant.", rationale: "Option B", isCorrect: false },
        { text: "Elle disent tout maintenant.", rationale: "Option C", isCorrect: false },
        { text: "Elle dis tout maintenant.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He says / is saying nothing.",
      hint: "Use masculine singular with negation: il ne dit rien",
      answerOptions: [
        { text: "Il ne dit rien.", rationale: "Option A", isCorrect: true },
        { text: "Ils ne disent rien.", rationale: "Option B", isCorrect: false },
        { text: "Il ne dis rien.", rationale: "Option C", isCorrect: false },
        { text: "Il ne disent rien.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We do not say / are not saying that often.",
      hint: "Use first person plural with negation: nous ne disons pas",
      answerOptions: [
        { text: "Nous ne disons pas ça souvent.", rationale: "Option A", isCorrect: true },
        { text: "Nous ne dites pas ça souvent.", rationale: "Option B", isCorrect: false },
        { text: "Nous ne disent pas ça souvent.", rationale: "Option C", isCorrect: false },
        { text: "Nous ne dis pas ça souvent.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I say / am saying the truth now.",
      hint: "Use first person singular: je dis",
      answerOptions: [
        { text: "Je dis la vérité maintenant.", rationale: "Option A", isCorrect: true },
        { text: "Je dites la vérité maintenant.", rationale: "Option B", isCorrect: false },
        { text: "Je disent la vérité maintenant.", rationale: "Option C", isCorrect: false },
        { text: "Je disons la vérité maintenant.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They do not say / are not saying anything.",
      hint: "Use third person plural with negation: ils ne disent rien",
      answerOptions: [
        { text: "Ils ne disent rien.", rationale: "Option A", isCorrect: true },
        { text: "Ils ne dites rien.", rationale: "Option B", isCorrect: false },
        { text: "Ils ne disons rien.", rationale: "Option C", isCorrect: false },
        { text: "Ils ne dis rien.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) say / are saying that it's important.",
      hint: "Use formal vous conjugation: vous dites",
      answerOptions: [
        { text: "Vous disent que c'est important.", rationale: "Option A", isCorrect: false },
        { text: "Vous dis que c'est important.", rationale: "Option B", isCorrect: false },
        { text: "Vous dites que c'est important.", rationale: "Option C", isCorrect: true },
        { text: "Vous dit que c'est important.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We say / are saying what we think.",
      hint: "Use first person plural: nous disons",
      answerOptions: [
        { text: "Nous disons ce que nous pensons.", rationale: "Option A", isCorrect: true },
        { text: "Nous dit ce que nous pensons.", rationale: "Option B", isCorrect: false },
        { text: "Nous disent ce que nous pensons.", rationale: "Option C", isCorrect: false },
        { text: "Nous dis ce que nous pensons.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (feminine) always say / are always saying hello.",
      hint: "Use feminine plural: elles disent",
      answerOptions: [
        { text: "Elles dit toujours bonjour.", rationale: "Option A", isCorrect: false },
        { text: "Elles disons toujours bonjour.", rationale: "Option B", isCorrect: false },
        { text: "Elles dis toujours bonjour.", rationale: "Option C", isCorrect: false },
        { text: "Elles disent toujours bonjour.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "He doesn't say / isn't saying a word.",
      hint: "Use masculine singular with negation: il ne dit pas",
      answerOptions: [
        { text: "Il ne disons pas un mot.", rationale: "Option A", isCorrect: false },
        { text: "Il ne dit pas un mot.", rationale: "Option B", isCorrect: true },
        { text: "Il ne dis pas un mot.", rationale: "Option C", isCorrect: false },
        { text: "Il ne disent pas un mot.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I say / am saying that it's possible.",
      hint: "Use first person singular: je dis",
      answerOptions: [
        { text: "Je dis que c'est possible.", rationale: "Option A", isCorrect: true },
        { text: "Je dit que c'est possible.", rationale: "Option B", isCorrect: false },
        { text: "Je disons que c'est possible.", rationale: "Option C", isCorrect: false },
        { text: "Je dites que c'est possible.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) say / are saying something interesting.",
      hint: "Use informal tu conjugation: tu dis",
      answerOptions: [
        { text: "Tu dit quelque chose d'intéressant.", rationale: "Option A", isCorrect: false },
        { text: "Tu dis quelque chose d'intéressant.", rationale: "Option B", isCorrect: true },
        { text: "Tu disons quelque chose d'intéressant.", rationale: "Option C", isCorrect: false },
        { text: "Tu dites quelque chose d'intéressant.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "What are you (formal) saying / do you say?",
      hint: "Use formal interrogative: que dites-vous",
      answerOptions: [
        { text: "Que disent-ils ?", rationale: "Option A", isCorrect: false },
        { text: "Que dis-tu ?", rationale: "Option B", isCorrect: false },
        { text: "Que dites-vous ?", rationale: "Option C", isCorrect: true },
        { text: "Que dit-il ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (masculine) say / are saying that they are ready.",
      hint: "Use masculine plural: ils disent",
      answerOptions: [
        { text: "Ils dit qu'ils sont prêts.", rationale: "Option A", isCorrect: false },
        { text: "Ils disons qu'ils sont prêts.", rationale: "Option B", isCorrect: false },
        { text: "Ils dis qu'ils sont prêts.", rationale: "Option C", isCorrect: false },
        { text: "Ils disent qu'ils sont prêts.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "She says / is saying no.",
      hint: "Use feminine singular: elle dit",
      answerOptions: [
        { text: "Elle dit non.", rationale: "Option A", isCorrect: true },
        { text: "Elle dis non.", rationale: "Option B", isCorrect: false },
        { text: "Elle disons non.", rationale: "Option C", isCorrect: false },
        { text: "Elle disent non.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Do we say / are we saying the truth?",
      hint: "Use first person plural interrogative: disons-nous",
      answerOptions: [
        { text: "Dit-on la vérité ?", rationale: "Option A", isCorrect: false },
        { text: "Disons-nous la vérité ?", rationale: "Option B", isCorrect: true },
        { text: "Dites-vous la vérité ?", rationale: "Option C", isCorrect: false },
        { text: "Disent-ils la vérité ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) don't say / aren't saying that.",
      hint: "Use informal negation: tu ne dis pas",
      answerOptions: [
        { text: "Tu ne dites pas ça.", rationale: "Option A", isCorrect: false },
        { text: "Tu ne dit pas ça.", rationale: "Option B", isCorrect: false },
        { text: "Tu ne dis pas ça.", rationale: "Option C", isCorrect: true },
        { text: "Tu ne disons pas ça.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Why does he say / is he saying that?",
      hint: "Use masculine singular interrogative: pourquoi dit-il",
      answerOptions: [
        { text: "Pourquoi dis-tu cela ?", rationale: "Option A", isCorrect: false },
        { text: "Pourquoi dit-il cela ?", rationale: "Option B", isCorrect: true },
        { text: "Pourquoi disons-nous cela ?", rationale: "Option C", isCorrect: false },
        { text: "Pourquoi disent-ils cela ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I never say / am never saying that.",
      hint: "Use first person singular with negation: je ne dis jamais",
      answerOptions: [
        { text: "Je ne dit jamais ça.", rationale: "Option A", isCorrect: false },
        { text: "Je ne disons jamais ça.", rationale: "Option B", isCorrect: false },
        { text: "Je ne dis jamais ça.", rationale: "Option C", isCorrect: true },
        { text: "Je ne dites jamais ça.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We say / are saying goodbye to our friends.",
      hint: "Use first person plural: nous disons",
      answerOptions: [
        { text: "Nous disons au revoir à nos amis.", rationale: "Option A", isCorrect: true },
        { text: "Nous dit au revoir à nos amis.", rationale: "Option B", isCorrect: false },
        { text: "Nous disent au revoir à nos amis.", rationale: "Option C", isCorrect: false },
        { text: "Nous dis au revoir à nos amis.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "What do you (informal) say / are you saying?",
      hint: "Use informal interrogative: que dis-tu",
      answerOptions: [
        { text: "Que dit-il ?", rationale: "Option A", isCorrect: false },
        { text: "Que disons-nous ?", rationale: "Option B", isCorrect: false },
        { text: "Que dites-vous ?", rationale: "Option C", isCorrect: false },
        { text: "Que dis-tu ?", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "She says / is saying it is false.",
      hint: "Use feminine singular: elle dit",
      answerOptions: [
        { text: "Elle disons que c'est faux.", rationale: "Option A", isCorrect: false },
        { text: "Elle dit que c'est faux.", rationale: "Option B", isCorrect: true },
        { text: "Elle dis que c'est faux.", rationale: "Option C", isCorrect: false },
        { text: "Elle disent que c'est faux.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I say / am saying yes!",
      hint: "Use first person singular: je dis",
      answerOptions: [
        { text: "Je dis oui !", rationale: "Option A", isCorrect: true },
        { text: "Je dit oui !", rationale: "Option B", isCorrect: false },
        { text: "Je disons oui !", rationale: "Option C", isCorrect: false },
        { text: "Je dites oui !", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) are not saying / do not say anything.",
      hint: "Use formal negation: vous ne dites rien",
      answerOptions: [
        { text: "Vous ne dis rien.", rationale: "Option A", isCorrect: false },
        { text: "Vous ne dit rien.", rationale: "Option B", isCorrect: false },
        { text: "Vous ne disent rien.", rationale: "Option C", isCorrect: false },
        { text: "Vous ne dites rien.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "They (feminine) do not say / are not saying their names.",
      hint: "Use feminine plural with negation: elles ne disent pas",
      answerOptions: [
        { text: "Elles ne dit pas leurs noms.", rationale: "Option A", isCorrect: false },
        { text: "Elles ne disons pas leurs noms.", rationale: "Option B", isCorrect: false },
        { text: "Elles ne disent pas leurs noms.", rationale: "Option C", isCorrect: true },
        { text: "Elles ne dis pas leurs noms.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (masculine) say / are saying good evening.",
      hint: "Use masculine plural: ils disent",
      answerOptions: [
        { text: "Ils disent bonsoir.", rationale: "Option A", isCorrect: true },
        { text: "Ils dit bonsoir.", rationale: "Option B", isCorrect: false },
        { text: "Ils disons bonsoir.", rationale: "Option C", isCorrect: false },
        { text: "Ils dis bonsoir.", rationale: "Option D", isCorrect: false }
      ]
    }
  ],
  "savoir": [
    {
      question: "He knows / is knowing how to drive.",
      hint: "Use third person singular: il sait",
      answerOptions: [
        { text: "Il savais conduire.", rationale: "Option A", isCorrect: false },
        { text: "Il sait conduire.", rationale: "Option B", isCorrect: true },
        { text: "Il sais conduire.", rationale: "Option C", isCorrect: false },
        { text: "Il saura conduire.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She knows / is knowing how to draw.",
      hint: "Use feminine singular: elle sait",
      answerOptions: [
        { text: "Elle savais dessiner.", rationale: "Option A", isCorrect: false },
        { text: "Elle sais dessiner.", rationale: "Option B", isCorrect: false },
        { text: "Elle saura dessiner.", rationale: "Option C", isCorrect: false },
        { text: "Elle sait dessiner.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "I know / am knowing the answer.",
      hint: "Use first person singular: je sais",
      answerOptions: [
        { text: "Je sais la réponse.", rationale: "Option A", isCorrect: true },
        { text: "Je savais la réponse.", rationale: "Option B", isCorrect: false },
        { text: "Je saurai la réponse.", rationale: "Option C", isCorrect: false },
        { text: "J'ai su la réponse.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) know / are knowing the answer.",
      hint: "Use formal vous conjugation: vous savez",
      answerOptions: [
        { text: "Vous saviez la réponse.", rationale: "Option A", isCorrect: false },
        { text: "Vous saurez la réponse.", rationale: "Option B", isCorrect: false },
        { text: "Vous savez la réponse.", rationale: "Option C", isCorrect: true },
        { text: "Vous savent la réponse.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We know / are knowing the address.",
      hint: "Use first person plural: nous savons",
      answerOptions: [
        { text: "Nous savions l'adresse.", rationale: "Option A", isCorrect: false },
        { text: "Nous savons l'adresse.", rationale: "Option B", isCorrect: true },
        { text: "Nous savent l'adresse.", rationale: "Option C", isCorrect: false },
        { text: "Nous avons su l'adresse.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Do they (female) know / are they knowing the news?",
      hint: "Use feminine plural interrogative form",
      answerOptions: [
        { text: "Saviez-elles les nouvelles ?", rationale: "Option A", isCorrect: false },
        { text: "Sait-elle les nouvelles ?", rationale: "Option B", isCorrect: false },
        { text: "Sauront-elles les nouvelles ?", rationale: "Option C", isCorrect: false },
        { text: "Elles savent les nouvelles ?", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "You (informal) know / are knowing how to cook.",
      hint: "Use informal tu conjugation: tu sais",
      answerOptions: [
        { text: "Tu sais cuisiner.", rationale: "Option A", isCorrect: true },
        { text: "Tu sait cuisiner.", rationale: "Option B", isCorrect: false },
        { text: "Tu savais cuisiner.", rationale: "Option C", isCorrect: false },
        { text: "Tu sauras cuisiner.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) know / are knowing everything.",
      hint: "Use masculine plural: ils savent",
      answerOptions: [
        { text: "Ils sait tout.", rationale: "Option A", isCorrect: false },
        { text: "Ils savions tout.", rationale: "Option B", isCorrect: false },
        { text: "Ils savent tout.", rationale: "Option C", isCorrect: true },
        { text: "Ils sauront tout.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) know / are knowing how to swim.",
      hint: "Use feminine plural: elles savent",
      answerOptions: [
        { text: "Elles sait nager.", rationale: "Option A", isCorrect: false },
        { text: "Elles savent nager.", rationale: "Option B", isCorrect: true },
        { text: "Elles savons nager.", rationale: "Option C", isCorrect: false },
        { text: "Elles savaient nager.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We don't know / aren't knowing the answer.",
      hint: "Use first person plural with negation: nous ne savons pas",
      answerOptions: [
        { text: "Nous ne savent pas la réponse.", rationale: "Option A", isCorrect: false },
        { text: "Nous ne savions pas la réponse.", rationale: "Option B", isCorrect: false },
        { text: "Nous n'avons pas su la réponse.", rationale: "Option C", isCorrect: false },
        { text: "Nous ne savons pas la réponse.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "She knows / is knowing the truth.",
      hint: "Use feminine singular: elle sait",
      answerOptions: [
        { text: "Elle sait la vérité.", rationale: "Option A", isCorrect: true },
        { text: "Elle sais la vérité.", rationale: "Option B", isCorrect: false },
        { text: "Elle savons la vérité.", rationale: "Option C", isCorrect: false },
        { text: "Elle savaient la vérité.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He doesn't know / isn't knowing the story.",
      hint: "Use masculine singular with negation: il ne sait pas",
      answerOptions: [
        { text: "Il ne savait pas l'histoire.", rationale: "Option A", isCorrect: false },
        { text: "Il n'a pas su l'histoire.", rationale: "Option B", isCorrect: false },
        { text: "Il ne sait pas l'histoire.", rationale: "Option C", isCorrect: true },
        { text: "Il ne sais pas l'histoire.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Do you (formal) know / are you knowing the time?",
      hint: "Use formal interrogative: vous savez",
      answerOptions: [
        { text: "Savez-vous l'heure ?", rationale: "Option A", isCorrect: false },
        { text: "Vous savez l'heure ?", rationale: "Option B", isCorrect: true },
        { text: "Vous saviez l'heure ?", rationale: "Option C", isCorrect: false },
        { text: "Vous saurez l'heure ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) know / are knowing nothing.",
      hint: "Use formal negation: vous ne savez rien",
      answerOptions: [
        { text: "Vous ne savez.", rationale: "Option A", isCorrect: false },
        { text: "Vous ne saviez rien.", rationale: "Option B", isCorrect: false },
        { text: "Vous n'avez rien su.", rationale: "Option C", isCorrect: false },
        { text: "Vous ne savez rien.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "We know / are knowing that it's important.",
      hint: "Use first person plural: nous savons",
      answerOptions: [
        { text: "Nous savons que c'est important.", rationale: "Option A", isCorrect: true },
        { text: "Nous savent que c'est important.", rationale: "Option B", isCorrect: false },
        { text: "Nous savions que c'est important.", rationale: "Option C", isCorrect: false },
        { text: "Nous saurons que c'est important.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We know / are knowing how to play the guitar.",
      hint: "Use first person plural: nous savons",
      answerOptions: [
        { text: "Nous savent jouer de la guitare.", rationale: "Option A", isCorrect: false },
        { text: "Nous savions jouer de la guitare.", rationale: "Option B", isCorrect: false },
        { text: "Nous savons jouer de la guitare.", rationale: "Option C", isCorrect: true },
        { text: "Nous saurons jouer de la guitare.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I don't know / am not knowing.",
      hint: "Use first person singular with negation: je ne sais pas",
      answerOptions: [
        { text: "Je ne sais.", rationale: "Option A", isCorrect: false },
        { text: "Je ne sais pas.", rationale: "Option B", isCorrect: true },
        { text: "Je ne savais pas.", rationale: "Option C", isCorrect: false },
        { text: "Je n'ai pas su.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I know / am knowing what he thinks.",
      hint: "Use first person singular: je sais",
      answerOptions: [
        { text: "J'ai su ce qu'il pense.", rationale: "Option A", isCorrect: false },
        { text: "Je savais ce qu'il pense.", rationale: "Option B", isCorrect: false },
        { text: "Je saurai ce qu'il pense.", rationale: "Option C", isCorrect: false },
        { text: "Je sais ce qu'il pense.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "They (male/mixed) know / are knowing the rules.",
      hint: "Use masculine plural: ils savent",
      answerOptions: [
        { text: "Ils savent les règles.", rationale: "Option A", isCorrect: true },
        { text: "Ils sait les règles.", rationale: "Option B", isCorrect: false },
        { text: "Ils savons les règles.", rationale: "Option C", isCorrect: false },
        { text: "Ils savaient les règles.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Do you (informal) know / are you knowing the password?",
      hint: "Use informal interrogative: tu sais",
      answerOptions: [
        { text: "Tu savais le mot de passe ?", rationale: "Option A", isCorrect: false },
        { text: "Tu sauras le mot de passe ?", rationale: "Option B", isCorrect: false },
        { text: "Tu sais le mot de passe ?", rationale: "Option C", isCorrect: true },
        { text: "Tu sait le mot de passe ?", rationale: "Option D", isCorrect: false }
      ]
    }
  ],
  "voir": [
    {
      question: "She sees / is seeing a movie tonight.",
      hint: "Use present tense of voir: elle voit",
      answerOptions: [
        { text: "Elle voyons un film ce soir.", rationale: "Option A", isCorrect: false },
        { text: "Elle vois un film ce soir.", rationale: "Option B", isCorrect: false },
        { text: "Elle voit un film ce soir.", rationale: "Option C", isCorrect: true },
        { text: "Elle voient un film ce soir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I see / am seeing the birds in the sky.",
      hint: "Use present tense of voir: je vois",
      answerOptions: [
        { text: "Je vois les oiseaux dans le ciel.", rationale: "Option A", isCorrect: true },
        { text: "Je voient les oiseaux dans le ciel.", rationale: "Option B", isCorrect: false },
        { text: "Je voyons les oiseaux dans le ciel.", rationale: "Option C", isCorrect: false },
        { text: "Je voit les oiseaux dans le ciel.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Why do you (formal) see / are you seeing a doctor?",
      hint: "Use present tense interrogative: pourquoi vous voyez",
      answerOptions: [
        { text: "Pourquoi vous voient un médecin ?", rationale: "Option A", isCorrect: false },
        { text: "Pourquoi vous vois un médecin ?", rationale: "Option B", isCorrect: false },
        { text: "Pourquoi vous voyons un médecin ?", rationale: "Option C", isCorrect: false },
        { text: "Pourquoi vous voyez un médecin ?", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "He sees / is seeing his reflection in the mirror.",
      hint: "Use present tense of voir: il voit",
      answerOptions: [
        { text: "Il voit son reflet dans le miroir.", rationale: "Option A", isCorrect: true },
        { text: "Il voient son reflet dans le miroir.", rationale: "Option B", isCorrect: false },
        { text: "Il vois son reflet dans le miroir.", rationale: "Option C", isCorrect: false },
        { text: "Il voyons son reflet dans le miroir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We see / are seeing our parents this weekend.",
      hint: "Use present tense of voir: nous voyons",
      answerOptions: [
        { text: "Nous voyons nos parents ce week-end.", rationale: "Option A", isCorrect: true },
        { text: "Nous voit nos parents ce week-end.", rationale: "Option B", isCorrect: false },
        { text: "Nous voient nos parents ce week-end.", rationale: "Option C", isCorrect: false },
        { text: "Nous vois nos parents ce week-end.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We see / are seeing what you mean.",
      hint: "Use present tense of voir: nous voyons",
      answerOptions: [
        { text: "Nous voient ce que tu veux dire.", rationale: "Option A", isCorrect: false },
        { text: "Nous vois ce que tu veux dire.", rationale: "Option B", isCorrect: false },
        { text: "Nous voit ce que tu veux dire.", rationale: "Option C", isCorrect: false },
        { text: "Nous voyons ce que tu veux dire.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "They (male/mixed) see / are seeing a better future.",
      hint: "Use present tense of voir: ils voient",
      answerOptions: [
        { text: "Ils voit un avenir meilleur.", rationale: "Option A", isCorrect: false },
        { text: "Ils vois un avenir meilleur.", rationale: "Option B", isCorrect: false },
        { text: "Ils voyez un avenir meilleur.", rationale: "Option C", isCorrect: false },
        { text: "Ils voient un avenir meilleur.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "One sees / is seeing the Eiffel Tower from here.",
      hint: "Use present tense of voir: on voit",
      answerOptions: [
        { text: "On voient la Tour Eiffel d'ici.", rationale: "Option A", isCorrect: false },
        { text: "On vois la Tour Eiffel d'ici.", rationale: "Option B", isCorrect: false },
        { text: "On voyez la Tour Eiffel d'ici.", rationale: "Option C", isCorrect: false },
        { text: "On voit la Tour Eiffel d'ici.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "Do we see / Are we seeing the same thing?",
      hint: "Use present tense interrogative: est-ce que nous voyons",
      answerOptions: [
        { text: "Est-ce que nous voient la même chose ?", rationale: "Option A", isCorrect: false },
        { text: "Est-ce que nous voyons la même chose ?", rationale: "Option B", isCorrect: true },
        { text: "Est-ce que nous voit la même chose ?", rationale: "Option C", isCorrect: false },
        { text: "Est-ce que nous vois la même chose ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I see / am seeing my cat.",
      hint: "Use present tense of voir: je vois",
      answerOptions: [
        { text: "Je voit mon chat.", rationale: "Option A", isCorrect: false },
        { text: "Je vois mon chat.", rationale: "Option B", isCorrect: true },
        { text: "Je voient mon chat.", rationale: "Option C", isCorrect: false },
        { text: "Je voyez mon chat.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Do you (informal) see / Are you seeing that star?",
      hint: "Use present tense interrogative: est-ce que tu vois",
      answerOptions: [
        { text: "Est-ce que tu voient cette étoile ?", rationale: "Option A", isCorrect: false },
        { text: "Est-ce que tu voit cette étoile ?", rationale: "Option B", isCorrect: false },
        { text: "Est-ce que tu vois cette étoile ?", rationale: "Option C", isCorrect: true },
        { text: "Est-ce que tu voyons cette étoile ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) see / are seeing the red car.",
      hint: "Use present tense of voir: tu vois",
      answerOptions: [
        { text: "Tu voient la voiture rouge.", rationale: "Option A", isCorrect: false },
        { text: "Tu vois la voiture rouge.", rationale: "Option B", isCorrect: true },
        { text: "Tu voyons la voiture rouge.", rationale: "Option C", isCorrect: false },
        { text: "Tu voit la voiture rouge.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) don't see / aren't seeing the problem.",
      hint: "Use present tense negative: vous ne voyez pas",
      answerOptions: [
        { text: "Vous ne voyez pas le problème.", rationale: "Option A", isCorrect: true },
        { text: "Vous ne voyons pas le problème.", rationale: "Option B", isCorrect: false },
        { text: "Vous ne voient pas le problème.", rationale: "Option C", isCorrect: false },
        { text: "Vous ne vois pas le problème.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "What do you (formal) see / are you seeing?",
      hint: "Use present tense interrogative: que voyez-vous",
      answerOptions: [
        { text: "Que voient-vous ?", rationale: "Option A", isCorrect: false },
        { text: "Que voyez-vous ?", rationale: "Option B", isCorrect: true },
        { text: "Que vois-vous ?", rationale: "Option C", isCorrect: false },
        { text: "Que voyons-vous ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He doesn't see / isn't seeing us.",
      hint: "Use present tense negative: il ne voit pas",
      answerOptions: [
        { text: "Il ne voient pas nous.", rationale: "Option A", isCorrect: false },
        { text: "Il ne voit pas nous.", rationale: "Option B", isCorrect: true },
        { text: "Il ne voyez pas nous.", rationale: "Option C", isCorrect: false },
        { text: "Il ne vois pas nous.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) see / are seeing their family often.",
      hint: "Use present tense of voir: ils voient",
      answerOptions: [
        { text: "Ils voit leur famille souvent.", rationale: "Option A", isCorrect: false },
        { text: "Ils voient leur famille souvent.", rationale: "Option B", isCorrect: true },
        { text: "Ils voyons leur famille souvent.", rationale: "Option C", isCorrect: false },
        { text: "Ils vois leur famille souvent.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I don't see / am not seeing my keys.",
      hint: "Use present tense negative: je ne vois pas",
      answerOptions: [
        { text: "Je ne voient pas mes clés.", rationale: "Option A", isCorrect: false },
        { text: "Je ne voit pas mes clés.", rationale: "Option B", isCorrect: false },
        { text: "Je ne voyez pas mes clés.", rationale: "Option C", isCorrect: false },
        { text: "Je ne vois pas mes clés.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "They (female) don't see / aren't seeing the point.",
      hint: "Use present tense negative: elles ne voient pas",
      answerOptions: [
        { text: "Elles ne voit pas l'intérêt.", rationale: "Option A", isCorrect: false },
        { text: "Elles ne voyons pas l'intérêt.", rationale: "Option B", isCorrect: false },
        { text: "Elles ne voient pas l'intérêt.", rationale: "Option C", isCorrect: true },
        { text: "Elles ne vois pas l'intérêt.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) see / are seeing the beautiful landscape.",
      hint: "Use present tense of voir: elles voient",
      answerOptions: [
        { text: "Elles voient le beau paysage.", rationale: "Option A", isCorrect: true },
        { text: "Elles voit le beau paysage.", rationale: "Option B", isCorrect: false },
        { text: "Elles voyons le beau paysage.", rationale: "Option C", isCorrect: false },
        { text: "Elles vois le beau paysage.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We don't see / aren't seeing anything.",
      hint: "Use present tense negative: nous ne voyons rien",
      answerOptions: [
        { text: "Nous ne voient rien.", rationale: "Option A", isCorrect: false },
        { text: "Nous ne vois rien.", rationale: "Option B", isCorrect: false },
        { text: "Nous ne voyons rien.", rationale: "Option C", isCorrect: true },
        { text: "Nous ne voit rien.", rationale: "Option D", isCorrect: false }
      ]
    }
  ],
  "pouvoir": [
    {
      question: "You (formal) can / are able to see it.",
      hint: "Use present tense of pouvoir: vous pouvez",
      answerOptions: [
        { text: "Vous pouvez le voir.", rationale: "Option A", isCorrect: true },
        { text: "Vous pouvons le voir.", rationale: "Option B", isCorrect: false },
        { text: "Vous peuvent le voir.", rationale: "Option C", isCorrect: false },
        { text: "Vous peux le voir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She can / is able to drive.",
      hint: "Use present tense of pouvoir: elle peut",
      answerOptions: [
        { text: "Elle peuvent conduire.", rationale: "Option A", isCorrect: false },
        { text: "Elle peux conduire.", rationale: "Option B", isCorrect: false },
        { text: "Elle pouvons conduire.", rationale: "Option C", isCorrect: false },
        { text: "Elle peut conduire.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "They (female) can / are able to win.",
      hint: "Use present tense of pouvoir: elles peuvent",
      answerOptions: [
        { text: "Elles peut gagner.", rationale: "Option A", isCorrect: false },
        { text: "Elles pouvons gagner.", rationale: "Option B", isCorrect: false },
        { text: "Elles peuvent gagner.", rationale: "Option C", isCorrect: true },
        { text: "Elles peux gagner.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He cannot / is not able to sleep.",
      hint: "Use present tense negative: il ne peut pas",
      answerOptions: [
        { text: "Il ne pouvons pas dormir.", rationale: "Option A", isCorrect: false },
        { text: "Il ne peuvent pas dormir.", rationale: "Option B", isCorrect: false },
        { text: "Il ne peut pas dormir.", rationale: "Option C", isCorrect: true },
        { text: "Il ne peux pas dormir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I can / am able to do better.",
      hint: "Use present tense of pouvoir: je peux",
      answerOptions: [
        { text: "Je peut faire mieux.", rationale: "Option A", isCorrect: false },
        { text: "Je pouvons faire mieux.", rationale: "Option B", isCorrect: false },
        { text: "Je peux faire mieux.", rationale: "Option C", isCorrect: true },
        { text: "Je peuvent faire mieux.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Can you (formal) / Are you able to repeat?",
      hint: "Use present tense interrogative: pouvez-vous",
      answerOptions: [
        { text: "Peut-vous répéter ?", rationale: "Option A", isCorrect: false },
        { text: "Pouvons-vous répéter ?", rationale: "Option B", isCorrect: false },
        { text: "Peux-tu répéter ?", rationale: "Option C", isCorrect: false },
        { text: "Pouvez-vous répéter ?", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "You (formal) cannot / are not able to leave.",
      hint: "Use present tense negative: vous ne pouvez pas",
      answerOptions: [
        { text: "Vous ne peut pas partir.", rationale: "Option A", isCorrect: false },
        { text: "Vous ne pouvez pas partir.", rationale: "Option B", isCorrect: true },
        { text: "Vous ne pouvons pas partir.", rationale: "Option C", isCorrect: false },
        { text: "Vous ne peuvent pas partir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "One can / is able to try.",
      hint: "Use present tense of pouvoir: on peut",
      answerOptions: [
        { text: "On pouvons essayer.", rationale: "Option A", isCorrect: false },
        { text: "On peut essayer.", rationale: "Option B", isCorrect: true },
        { text: "On peuvent essayer.", rationale: "Option C", isCorrect: false },
        { text: "On peux essayer.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We cannot / are not able to come.",
      hint: "Use present tense negative: nous ne pouvons pas",
      answerOptions: [
        { text: "Nous ne pouvons pas venir.", rationale: "Option A", isCorrect: true },
        { text: "Nous ne peuvent pas venir.", rationale: "Option B", isCorrect: false },
        { text: "Nous ne pouvez pas venir.", rationale: "Option C", isCorrect: false },
        { text: "Nous ne peut pas venir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Can I / Am I able to enter?",
      hint: "Use present tense interrogative: puis-je",
      answerOptions: [
        { text: "Peux-je entrer ?", rationale: "Option A", isCorrect: false },
        { text: "Puis-je entrer ?", rationale: "Option B", isCorrect: true },
        { text: "Peut-je entrer ?", rationale: "Option C", isCorrect: false },
        { text: "Pouvons-je entrer ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We can / are able to start.",
      hint: "Use present tense of pouvoir: nous pouvons",
      answerOptions: [
        { text: "Nous peuvent commencer.", rationale: "Option A", isCorrect: false },
        { text: "Nous peux commencer.", rationale: "Option B", isCorrect: false },
        { text: "Nous pouvons commencer.", rationale: "Option C", isCorrect: true },
        { text: "Nous peut commencer.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Can you (informal) / Are you able to explain?",
      hint: "Use present tense interrogative: peux-tu",
      answerOptions: [
        { text: "Peut-tu expliquer ?", rationale: "Option A", isCorrect: false },
        { text: "Pouvez-vous expliquer ?", rationale: "Option B", isCorrect: false },
        { text: "Peux-tu expliquer ?", rationale: "Option C", isCorrect: true },
        { text: "Pouvons-tu expliquer ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) can / are able to choose.",
      hint: "Use present tense of pouvoir: tu peux",
      answerOptions: [
        { text: "Tu peut choisir.", rationale: "Option A", isCorrect: false },
        { text: "Tu peux choisir.", rationale: "Option B", isCorrect: true },
        { text: "Tu peuvent choisir.", rationale: "Option C", isCorrect: false },
        { text: "Tu pouvons choisir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) cannot / are not able to decide.",
      hint: "Use present tense negative: ils ne peuvent pas",
      answerOptions: [
        { text: "Ils ne peut pas décider.", rationale: "Option A", isCorrect: false },
        { text: "Ils ne pouvons pas décider.", rationale: "Option B", isCorrect: false },
        { text: "Ils ne pouvez pas décider.", rationale: "Option C", isCorrect: false },
        { text: "Ils ne peuvent pas décider.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "I can / am able to help.",
      hint: "Use present tense of pouvoir: je peux",
      answerOptions: [
        { text: "Je peux aider.", rationale: "Option A", isCorrect: true },
        { text: "Je peut aider.", rationale: "Option B", isCorrect: false },
        { text: "Je pouvons aider.", rationale: "Option C", isCorrect: false },
        { text: "Je peuvent aider.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We cannot / are not able to see anything.",
      hint: "Use present tense negative: nous ne pouvons rien voir",
      answerOptions: [
        { text: "Nous ne pouvons rien voir.", rationale: "Option A", isCorrect: false },
        { text: "Nous ne peuvent rien voir.", rationale: "Option B", isCorrect: false },
        { text: "Nous ne pouvez rien voir.", rationale: "Option C", isCorrect: false },
        { text: "Nous ne pouvons rien voir.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "They (female) cannot / are not able to hear.",
      hint: "Use present tense negative: elles ne peuvent pas",
      answerOptions: [
        { text: "Elles ne peut pas entendre.", rationale: "Option A", isCorrect: false },
        { text: "Elles ne peuvent pas entendre.", rationale: "Option B", isCorrect: true },
        { text: "Elles ne pouvons pas entendre.", rationale: "Option C", isCorrect: false },
        { text: "Elles ne peux pas entendre.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Can she / Is she able to do it?",
      hint: "Use present tense interrogative: peut-elle",
      answerOptions: [
        { text: "Peut-elle le faire ?", rationale: "Option A", isCorrect: true },
        { text: "Pouvons-elle le faire ?", rationale: "Option B", isCorrect: false },
        { text: "Peux-elle le faire ?", rationale: "Option C", isCorrect: false },
        { text: "Peuvent-elle le faire ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) can / are able to wait.",
      hint: "Use present tense of pouvoir: ils peuvent",
      answerOptions: [
        { text: "Ils peuvent attendre.", rationale: "Option A", isCorrect: true },
        { text: "Ils peut attendre.", rationale: "Option B", isCorrect: false },
        { text: "Ils pouvons attendre.", rationale: "Option C", isCorrect: false },
        { text: "Ils peux attendre.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) cannot / are not able to do that.",
      hint: "Use present tense negative: tu ne peux pas",
      answerOptions: [
        { text: "Tu ne pouvons pas faire ça.", rationale: "Option A", isCorrect: false },
        { text: "Tu ne peuvent pas faire ça.", rationale: "Option B", isCorrect: false },
        { text: "Tu ne peut pas faire ça.", rationale: "Option C", isCorrect: false },
        { text: "Tu ne peux pas faire ça.", rationale: "Option D", isCorrect: true }
      ]
    }
  ],
  "venir": [
    {
      question: "She comes / is coming to the party.",
      hint: "Use present tense of venir: elle vient",
      answerOptions: [
        { text: "Elle viennent à la fête.", rationale: "Option A", isCorrect: false },
        { text: "Elle vient à la fête.", rationale: "Option B", isCorrect: true },
        { text: "Elle venons à la fête.", rationale: "Option C", isCorrect: false },
        { text: "Elle viens à la fête.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) come / are coming with us.",
      hint: "Use present tense of venir: vous venez",
      answerOptions: [
        { text: "Vous venons avec nous.", rationale: "Option A", isCorrect: false },
        { text: "Vous venez avec nous.", rationale: "Option B", isCorrect: true },
        { text: "Vous viennent avec nous.", rationale: "Option C", isCorrect: false },
        { text: "Vous viens avec nous.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "When do you (informal) come / are you coming?",
      hint: "Use present tense interrogative: quand viens-tu",
      answerOptions: [
        { text: "Quand viens-tu ?", rationale: "Option A", isCorrect: true },
        { text: "Quand venez-vous ?", rationale: "Option B", isCorrect: false },
        { text: "Quand vient-il ?", rationale: "Option C", isCorrect: false },
        { text: "Quand venons-nous ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He doesn't come / isn't coming from Spain.",
      hint: "Use present tense negative: il ne vient pas",
      answerOptions: [
        { text: "Il ne vient pas d'Espagne.", rationale: "Option A", isCorrect: true },
        { text: "Il ne viens pas d'Espagne.", rationale: "Option B", isCorrect: false },
        { text: "Il ne venons pas d'Espagne.", rationale: "Option C", isCorrect: false },
        { text: "Il ne viennent pas d'Espagne.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We come / are coming to see you.",
      hint: "Use present tense of venir: nous venons",
      answerOptions: [
        { text: "Nous viennent vous voir.", rationale: "Option A", isCorrect: false },
        { text: "Nous venez vous voir.", rationale: "Option B", isCorrect: false },
        { text: "Nous venons vous voir.", rationale: "Option C", isCorrect: true },
        { text: "Nous viens vous voir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) come / are coming from the same city.",
      hint: "Use present tense of venir: ils viennent",
      answerOptions: [
        { text: "Ils vient de la même ville.", rationale: "Option A", isCorrect: false },
        { text: "Ils venons de la même ville.", rationale: "Option B", isCorrect: false },
        { text: "Ils viennent de la même ville.", rationale: "Option C", isCorrect: true },
        { text: "Ils viens de la même ville.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) don't come / aren't coming today.",
      hint: "Use present tense negative: elles ne viennent pas",
      answerOptions: [
        { text: "Elles ne vient pas aujourd'hui.", rationale: "Option A", isCorrect: false },
        { text: "Elles ne viennent pas aujourd'hui.", rationale: "Option B", isCorrect: true },
        { text: "Elles ne venons pas aujourd'hui.", rationale: "Option C", isCorrect: false },
        { text: "Elles ne venez pas aujourd'hui.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I don't come / am not coming from Paris.",
      hint: "Use present tense negative: je ne viens pas",
      answerOptions: [
        { text: "Je ne vient pas de Paris.", rationale: "Option A", isCorrect: false },
        { text: "Je ne venons pas de Paris.", rationale: "Option B", isCorrect: false },
        { text: "Je ne viennent pas de Paris.", rationale: "Option C", isCorrect: false },
        { text: "Je ne viens pas de Paris.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "One comes / is coming to help.",
      hint: "Use present tense of venir: on vient",
      answerOptions: [
        { text: "On vient pour aider.", rationale: "Option A", isCorrect: true },
        { text: "On venons pour aider.", rationale: "Option B", isCorrect: false },
        { text: "On viennent pour aider.", rationale: "Option C", isCorrect: false },
        { text: "On viens pour aider.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I come / am coming from the office.",
      hint: "Use present tense of venir: je viens",
      answerOptions: [
        { text: "Je vient du bureau.", rationale: "Option A", isCorrect: false },
        { text: "Je venons du bureau.", rationale: "Option B", isCorrect: false },
        { text: "Je viens du bureau.", rationale: "Option C", isCorrect: true },
        { text: "Je viennent du bureau.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We don't come / aren't coming to the meeting.",
      hint: "Use present tense negative: nous ne venons pas",
      answerOptions: [
        { text: "Nous ne venons pas à la réunion.", rationale: "Option A", isCorrect: true },
        { text: "Nous ne viennent pas à la réunion.", rationale: "Option B", isCorrect: false },
        { text: "Nous ne venez pas à la réunion.", rationale: "Option C", isCorrect: false },
        { text: "Nous ne vient pas à la réunion.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He comes / is coming to visit.",
      hint: "Use present tense of venir: il vient",
      answerOptions: [
        { text: "Il vient rendre visite.", rationale: "Option A", isCorrect: true },
        { text: "Il viens rendre visite.", rationale: "Option B", isCorrect: false },
        { text: "Il venons rendre visite.", rationale: "Option C", isCorrect: false },
        { text: "Il viennent rendre visite.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) come / are coming for dinner.",
      hint: "Use present tense of venir: elles viennent",
      answerOptions: [
        { text: "Elles vient pour le dîner.", rationale: "Option A", isCorrect: false },
        { text: "Elles venons pour le dîner.", rationale: "Option B", isCorrect: false },
        { text: "Elles viennent pour le dîner.", rationale: "Option C", isCorrect: true },
        { text: "Elles venez pour le dîner.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Do you (formal) come / are you coming from far?",
      hint: "Use present tense interrogative: venez-vous",
      answerOptions: [
        { text: "Venez-vous de loin ?", rationale: "Option A", isCorrect: true },
        { text: "Viens-tu de loin ?", rationale: "Option B", isCorrect: false },
        { text: "Vient-il de loin ?", rationale: "Option C", isCorrect: false },
        { text: "Venons-nous de loin ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) come / are coming with me.",
      hint: "Use present tense of venir: tu viens",
      answerOptions: [
        { text: "Tu viens avec moi.", rationale: "Option A", isCorrect: true },
        { text: "Tu vient avec moi.", rationale: "Option B", isCorrect: false },
        { text: "Tu venons avec moi.", rationale: "Option C", isCorrect: false },
        { text: "Tu viennent avec moi.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) do not come / are not coming from here.",
      hint: "Use present tense negative: ils ne viennent pas",
      answerOptions: [
        { text: "Ils ne vient pas d'ici.", rationale: "Option A", isCorrect: false },
        { text: "Ils ne venons pas d'ici.", rationale: "Option B", isCorrect: false },
        { text: "Ils ne viennent pas d'ici.", rationale: "Option C", isCorrect: true },
        { text: "Ils ne venez pas d'ici.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Does he come / is he coming alone?",
      hint: "Use present tense interrogative: vient-il",
      answerOptions: [
        { text: "Viennent-ils seuls ?", rationale: "Option A", isCorrect: false },
        { text: "Vient-il seul ?", rationale: "Option B", isCorrect: true },
        { text: "Viens-tu seul ?", rationale: "Option C", isCorrect: false },
        { text: "Venez-vous seul ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Why do we come / are we coming so late?",
      hint: "Use present tense interrogative: pourquoi venons-nous",
      answerOptions: [
        { text: "Pourquoi venons-nous si tard ?", rationale: "Option A", isCorrect: true },
        { text: "Pourquoi venez-vous si tard ?", rationale: "Option B", isCorrect: false },
        { text: "Pourquoi viennent-ils si tard ?", rationale: "Option C", isCorrect: false },
        { text: "Pourquoi vient-il si tard ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) don't come / aren't coming from the right direction.",
      hint: "Use present tense negative: tu ne viens pas",
      answerOptions: [
        { text: "Tu ne viens pas de la bonne direction.", rationale: "Option A", isCorrect: true },
        { text: "Tu ne vient pas de la bonne direction.", rationale: "Option B", isCorrect: false },
        { text: "Tu ne venons pas de la bonne direction.", rationale: "Option C", isCorrect: false },
        { text: "Tu ne viennent pas de la bonne direction.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Why don't they (female) come / aren't they coming?",
      hint: "Use present tense interrogative negative: pourquoi ne viennent-elles pas",
      answerOptions: [
        { text: "Pourquoi ne vient-elle pas ?", rationale: "Option A", isCorrect: false },
        { text: "Pourquoi ne venons-nous pas ?", rationale: "Option B", isCorrect: false },
        { text: "Pourquoi ne viennent-elles pas ?", rationale: "Option C", isCorrect: true },
        { text: "Pourquoi ne venez-vous pas ?", rationale: "Option D", isCorrect: false }
      ]
    }
  ],
  "vouloir": [
    {
      question: "She wants / is wanting a new car.",
      hint: "Use irregular present form: elle veut",
      answerOptions: [
        { text: "Elle veut une nouvelle voiture.", rationale: "Option A", isCorrect: true },
        { text: "Elle veux une nouvelle voiture.", rationale: "Option B", isCorrect: false },
        { text: "Elle voulons une nouvelle voiture.", rationale: "Option C", isCorrect: false },
        { text: "Elle veulent une nouvelle voiture.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) want / are wanting to leave.",
      hint: "Use irregular present form: ils veulent",
      answerOptions: [
        { text: "Ils voulons partir.", rationale: "Option A", isCorrect: false },
        { text: "Ils voulez partir.", rationale: "Option B", isCorrect: false },
        { text: "Ils veut partir.", rationale: "Option C", isCorrect: false },
        { text: "Ils veulent partir.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "What do you (formal) want / are you wanting?",
      hint: "Use irregular present interrogative: que voulez-vous",
      answerOptions: [
        { text: "Que voulez-vous ?", rationale: "Option A", isCorrect: true },
        { text: "Que voulons-nous ?", rationale: "Option B", isCorrect: false },
        { text: "Que veulent-ils ?", rationale: "Option C", isCorrect: false },
        { text: "Que veux-tu ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) want / are wanting to go out.",
      hint: "Use irregular present form: tu veux",
      answerOptions: [
        { text: "Tu veut sortir.", rationale: "Option A", isCorrect: false },
        { text: "Tu veux sortir.", rationale: "Option B", isCorrect: true },
        { text: "Tu voulons sortir.", rationale: "Option C", isCorrect: false },
        { text: "Tu voulez sortir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) do not want / are not wanting to eat.",
      hint: "Use irregular present negative: elles ne veulent pas",
      answerOptions: [
        { text: "Elles ne veut pas manger.", rationale: "Option A", isCorrect: false },
        { text: "Elles ne voulons pas manger.", rationale: "Option B", isCorrect: false },
        { text: "Elles ne veulent pas manger.", rationale: "Option C", isCorrect: true },
        { text: "Elles ne veux pas manger.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He does not want / is not wanting to work.",
      hint: "Use irregular present negative: il ne veut pas",
      answerOptions: [
        { text: "Il ne veut pas travailler.", rationale: "Option A", isCorrect: true },
        { text: "Il ne veux pas travailler.", rationale: "Option B", isCorrect: false },
        { text: "Il ne voulons pas travailler.", rationale: "Option C", isCorrect: false },
        { text: "Il ne veulent pas travailler.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I want / am wanting a coffee.",
      hint: "Use irregular present form: je veux",
      answerOptions: [
        { text: "Je veut un café.", rationale: "Option A", isCorrect: false },
        { text: "Je veux un café.", rationale: "Option B", isCorrect: true },
        { text: "Je voulons un café.", rationale: "Option C", isCorrect: false },
        { text: "Je voulez un café.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "One wants / is wanting to be happy.",
      hint: "Use irregular present form: on veut",
      answerOptions: [
        { text: "On veux être heureux.", rationale: "Option A", isCorrect: false },
        { text: "On voulons être heureux.", rationale: "Option B", isCorrect: false },
        { text: "On veulent être heureux.", rationale: "Option C", isCorrect: false },
        { text: "On veut être heureux.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "Do you (informal) want / are you wanting a piece of cake?",
      hint: "Use irregular present interrogative: veux-tu",
      answerOptions: [
        { text: "Veux-tu un morceau de gâteau ?", rationale: "Option A", isCorrect: true },
        { text: "Veut-il un morceau de gâteau ?", rationale: "Option B", isCorrect: false },
        { text: "Voulez-vous un morceau de gâteau ?", rationale: "Option C", isCorrect: false },
        { text: "Voulons-nous un morceau de gâteau ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) do not want / are not wanting to listen.",
      hint: "Use irregular present negative: vous ne voulez pas",
      answerOptions: [
        { text: "Vous ne veut pas écouter.", rationale: "Option A", isCorrect: false },
        { text: "Vous ne voulez pas écouter.", rationale: "Option B", isCorrect: true },
        { text: "Vous ne voulons pas écouter.", rationale: "Option C", isCorrect: false },
        { text: "Vous ne veulent pas écouter.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I do not want / am not wanting to disturb.",
      hint: "Use irregular present negative: je ne veux pas",
      answerOptions: [
        { text: "Je ne veux pas déranger.", rationale: "Option A", isCorrect: true },
        { text: "Je ne veut pas déranger.", rationale: "Option B", isCorrect: false },
        { text: "Je ne voulons pas déranger.", rationale: "Option C", isCorrect: false },
        { text: "Je ne voulez pas déranger.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We do not want / are not wanting to be late.",
      hint: "Use irregular present negative: nous ne voulons pas",
      answerOptions: [
        { text: "Nous ne veut pas être en retard.", rationale: "Option A", isCorrect: false },
        { text: "Nous ne voulons pas être en retard.", rationale: "Option B", isCorrect: true },
        { text: "Nous ne voulez pas être en retard.", rationale: "Option C", isCorrect: false },
        { text: "Nous ne veulent pas être en retard.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We want / are wanting to see the manager.",
      hint: "Use irregular present form: nous voulons",
      answerOptions: [
        { text: "Nous veut voir le directeur.", rationale: "Option A", isCorrect: false },
        { text: "Nous voulons voir le directeur.", rationale: "Option B", isCorrect: true },
        { text: "Nous voulez voir le directeur.", rationale: "Option C", isCorrect: false },
        { text: "Nous veulent voir le directeur.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "What do they (male/mixed) want / are they wanting?",
      hint: "Use irregular present interrogative: que veulent-ils",
      answerOptions: [
        { text: "Que veulent-ils ?", rationale: "Option A", isCorrect: true },
        { text: "Que veut-il ?", rationale: "Option B", isCorrect: false },
        { text: "Que voulons-nous ?", rationale: "Option C", isCorrect: false },
        { text: "Que voulez-vous ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She does not want / is not wanting to answer.",
      hint: "Use irregular present negative: elle ne veut pas",
      answerOptions: [
        { text: "Elle ne veux pas répondre.", rationale: "Option A", isCorrect: false },
        { text: "Elle ne veut pas répondre.", rationale: "Option B", isCorrect: true },
        { text: "Elle ne voulons pas répondre.", rationale: "Option C", isCorrect: false },
        { text: "Elle ne veulent pas répondre.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I do not want / am not wanting this.",
      hint: "Use irregular present negative: je ne veux pas",
      answerOptions: [
        { text: "Je ne veux pas ça.", rationale: "Option A", isCorrect: true },
        { text: "Je ne veut pas ça.", rationale: "Option B", isCorrect: false },
        { text: "Je ne voulons pas ça.", rationale: "Option C", isCorrect: false },
        { text: "Je ne veulent pas ça.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Do you (formal) want / are you wanting something else?",
      hint: "Use irregular present interrogative: voulez-vous",
      answerOptions: [
        { text: "Voulez-vous autre chose ?", rationale: "Option A", isCorrect: true },
        { text: "Veux-tu autre chose ?", rationale: "Option B", isCorrect: false },
        { text: "Voulons-nous autre chose ?", rationale: "Option C", isCorrect: false },
        { text: "Veulent-ils autre chose ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) want / are wanting to dance.",
      hint: "Use irregular present form: elles veulent",
      answerOptions: [
        { text: "Elles veulent danser.", rationale: "Option A", isCorrect: true },
        { text: "Elles veut danser.", rationale: "Option B", isCorrect: false },
        { text: "Elles voulons danser.", rationale: "Option C", isCorrect: false },
        { text: "Elles veux danser.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He wants / is wanting to travel.",
      hint: "Use irregular present form: il veut",
      answerOptions: [
        { text: "Il veux voyager.", rationale: "Option A", isCorrect: false },
        { text: "Il voulons voyager.", rationale: "Option B", isCorrect: false },
        { text: "Il veut voyager.", rationale: "Option C", isCorrect: true },
        { text: "Il veulent voyager.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We want / are wanting a dog.",
      hint: "Use irregular present form: nous voulons",
      answerOptions: [
        { text: "Nous veut un chien.", rationale: "Option A", isCorrect: false },
        { text: "Nous voulons un chien.", rationale: "Option B", isCorrect: true },
        { text: "Nous voulez un chien.", rationale: "Option C", isCorrect: false },
        { text: "Nous veulent un chien.", rationale: "Option D", isCorrect: false }
      ]
    }
  ]
};

// Elementary Level Passé Composé Quiz Data
export const ELEMENTARY_PASSE_COMPOSE_QUESTIONS: Record<string, ElementaryQuizQuestion[]> = {
  "besoin": [
    // Positive statements
    {
      question: "I needed a book / I have needed a book",
      hint: "Use passé composé of 'avoir besoin de' with je and un livre",
      answerOptions: [
        { text: "J'ai eu besoin d'un livre", rationale: "Correct! 'J'ai eu besoin d'un livre' means 'I needed a book' in passé composé.", isCorrect: true },
        { text: "Tu as eu besoin d'un livre", rationale: "Wrong person - this is 'you needed', not 'I needed'.", isCorrect: false },
        { text: "Il a eu besoin d'un livre", rationale: "Wrong person - this is 'he needed', not 'I needed'.", isCorrect: false },
        { text: "Nous avons eu besoin d'un livre", rationale: "Wrong person - this is 'we needed', not 'I needed'.", isCorrect: false }
      ]
    },
    {
      question: "You needed a problem / You have needed a problem (informal)",
      hint: "Use passé composé of 'avoir besoin de' with tu (informal)",
      answerOptions: [
        { text: "Tu as eu besoin d'un problème", rationale: "Correct! 'Tu as eu besoin d'un problème' means 'you needed a problem' (informal).", isCorrect: true },
        { text: "J'ai eu besoin d'un problème", rationale: "Wrong person - this is 'I needed', not 'you needed'.", isCorrect: false },
        { text: "Vous avez eu besoin d'un problème", rationale: "Wrong formality - this is formal 'you', question asks for informal.", isCorrect: false },
        { text: "Ils ont eu besoin d'un problème", rationale: "Wrong person - this is 'they needed', not 'you needed'.", isCorrect: false }
      ]
    },
    {
      question: "He needed help / He has needed help",
      hint: "Use passé composé of 'avoir besoin de' with il and aide",
      answerOptions: [
        { text: "Il a eu besoin d'aide", rationale: "Correct! 'Il a eu besoin d'aide' means 'he needed help'.", isCorrect: true },
        { text: "Elle a eu besoin d'aide", rationale: "Wrong gender - this is 'she needed', not 'he needed'.", isCorrect: false },
        { text: "Tu as eu besoin d'aide", rationale: "Wrong person - this is 'you needed', not 'he needed'.", isCorrect: false },
        { text: "Ils ont eu besoin d'aide", rationale: "Wrong person - this is 'they needed', not 'he needed'.", isCorrect: false }
      ]
    },
    {
      question: "She needed rest / She has needed rest",
      hint: "Use passé composé of 'avoir besoin de' with elle and repos",
      answerOptions: [
        { text: "Elle a eu besoin de repos", rationale: "Correct! 'Elle a eu besoin de repos' means 'she needed rest'.", isCorrect: true },
        { text: "Il a eu besoin de repos", rationale: "Wrong gender - this is 'he needed', not 'she needed'.", isCorrect: false },
        { text: "Elles ont eu besoin de repos", rationale: "Wrong number - this is 'they needed' (feminine plural), not 'she needed'.", isCorrect: false },
        { text: "Tu as eu besoin de repos", rationale: "Wrong person - this is 'you needed', not 'she needed'.", isCorrect: false }
      ]
    },
    {
      question: "We needed water / We have needed water",
      hint: "Use passé composé of 'avoir besoin de' with nous and eau",
      answerOptions: [
        { text: "Nous avons eu besoin d'eau", rationale: "Correct! 'Nous avons eu besoin d'eau' means 'we needed water'.", isCorrect: true },
        { text: "Vous avez eu besoin d'eau", rationale: "Wrong person - this is 'you needed', not 'we needed'.", isCorrect: false },
        { text: "Ils ont eu besoin d'eau", rationale: "Wrong person - this is 'they needed', not 'we needed'.", isCorrect: false },
        { text: "J'ai eu besoin d'eau", rationale: "Wrong person - this is 'I needed', not 'we needed'.", isCorrect: false }
      ]
    },
    {
      question: "You needed to eat / You have needed to eat (formal / plural)",
      hint: "Use passé composé of 'avoir besoin de' with vous (formal/plural)",
      answerOptions: [
        { text: "Vous avez eu besoin de manger", rationale: "Correct! 'Vous avez eu besoin de manger' means 'you needed to eat' (formal/plural).", isCorrect: true },
        { text: "Tu as eu besoin de manger", rationale: "Wrong formality - this is informal 'you', question asks for formal/plural.", isCorrect: false },
        { text: "Nous avons eu besoin de manger", rationale: "Wrong person - this is 'we needed', not 'you needed'.", isCorrect: false },
        { text: "Ils ont eu besoin de manger", rationale: "Wrong person - this is 'they needed', not 'you needed'.", isCorrect: false }
      ]
    },
    {
      question: "They needed to go (male / mixed)",
      hint: "Use passé composé of 'avoir besoin de' with ils and aller",
      answerOptions: [
        { text: "Ils ont eu besoin d'aller", rationale: "Correct! 'Ils ont eu besoin d'aller' means 'they needed to go' (masculine/mixed).", isCorrect: true },
        { text: "Elles ont eu besoin d'aller", rationale: "Wrong gender - this is feminine 'they', question specifies masculine/mixed.", isCorrect: false },
        { text: "Ils avaient besoin d'aller", rationale: "Wrong tense - this is imperfect past, not passé composé.", isCorrect: false },
        { text: "Ils auront besoin d'aller", rationale: "Wrong tense - this is future, not passé composé.", isCorrect: false }
      ]
    },
    {
      question: "They needed to sleep (female)",
      hint: "Use passé composé of 'avoir besoin de' with elles and dormir",
      answerOptions: [
        { text: "Elles ont eu besoin de dormir", rationale: "Correct! 'Elles ont eu besoin de dormir' means 'they needed to sleep' (feminine).", isCorrect: true },
        { text: "Ils ont eu besoin de dormir", rationale: "Wrong gender - this is masculine 'they', question specifies feminine.", isCorrect: false },
        { text: "Elles avaient besoin de dormir", rationale: "Wrong tense - this is imperfect past, not passé composé.", isCorrect: false },
        { text: "Elles auront besoin de dormir", rationale: "Wrong tense - this is future, not passé composé.", isCorrect: false }
      ]
    },
    // Negative statements
    {
      question: "I did not need a book / I have not needed a book",
      hint: "Use negative passé composé 'ne...pas' with avoir eu besoin de",
      answerOptions: [
        { text: "Je n'ai pas eu besoin d'un livre", rationale: "Correct! 'Je n'ai pas eu besoin d'un livre' means 'I did not need a book'.", isCorrect: true },
        { text: "Tu n'as pas eu besoin d'un livre", rationale: "Wrong person - this is 'you didn't need', not 'I didn't need'.", isCorrect: false },
        { text: "Il n'a pas eu besoin d'un livre", rationale: "Wrong person - this is 'he didn't need', not 'I didn't need'.", isCorrect: false },
        { text: "Nous n'avons pas eu besoin d'un livre", rationale: "Wrong person - this is 'we didn't need', not 'I didn't need'.", isCorrect: false }
      ]
    },
    {
      question: "You did not need a problem / You have not needed a problem (informal)",
      hint: "Use negative passé composé with tu (informal)",
      answerOptions: [
        { text: "Tu n'as pas eu besoin d'un problème", rationale: "Correct! 'Tu n'as pas eu besoin d'un problème' means 'you didn't need a problem' (informal).", isCorrect: true },
        { text: "Je n'ai pas eu besoin d'un problème", rationale: "Wrong person - this is 'I didn't need', not 'you didn't need'.", isCorrect: false },
        { text: "Vous n'avez pas eu besoin d'un problème", rationale: "Wrong formality - this is formal 'you', question asks for informal.", isCorrect: false },
        { text: "Ils n'ont pas eu besoin d'un problème", rationale: "Wrong person - this is 'they didn't need', not 'you didn't need'.", isCorrect: false }
      ]
    },
    {
      question: "He did not need help / He has not needed help",
      hint: "Use negative passé composé with il",
      answerOptions: [
        { text: "Il n'a pas eu besoin d'aide", rationale: "Correct! 'Il n'a pas eu besoin d'aide' means 'he did not need help'.", isCorrect: true },
        { text: "Elle n'a pas eu besoin d'aide", rationale: "Wrong gender - this is 'she didn't need', not 'he didn't need'.", isCorrect: false },
        { text: "Tu n'as pas eu besoin d'aide", rationale: "Wrong person - this is 'you didn't need', not 'he didn't need'.", isCorrect: false },
        { text: "Ils n'ont pas eu besoin d'aide", rationale: "Wrong person - this is 'they didn't need', not 'he didn't need'.", isCorrect: false }
      ]
    },
    {
      question: "She did not need rest / She has not needed rest",
      hint: "Use negative passé composé with elle",
      answerOptions: [
        { text: "Elle n'a pas eu besoin de repos", rationale: "Correct! 'Elle n'a pas eu besoin de repos' means 'she did not need rest'.", isCorrect: true },
        { text: "Il n'a pas eu besoin de repos", rationale: "Wrong gender - this is 'he didn't need', not 'she didn't need'.", isCorrect: false },
        { text: "Elles n'ont pas eu besoin de repos", rationale: "Wrong number - this is 'they didn't need' (feminine plural), not 'she didn't need'.", isCorrect: false },
        { text: "Tu n'as pas eu besoin de repos", rationale: "Wrong person - this is 'you didn't need', not 'she didn't need'.", isCorrect: false }
      ]
    },
    {
      question: "We did not need water / We have not needed water",
      hint: "Use negative passé composé with nous",
      answerOptions: [
        { text: "Nous n'avons pas eu besoin d'eau", rationale: "Correct! 'Nous n'avons pas eu besoin d'eau' means 'we did not need water'.", isCorrect: true },
        { text: "Vous n'avez pas eu besoin d'eau", rationale: "Wrong person - this is 'you didn't need', not 'we didn't need'.", isCorrect: false },
        { text: "Ils n'ont pas eu besoin d'eau", rationale: "Wrong person - this is 'they didn't need', not 'we didn't need'.", isCorrect: false },
        { text: "Je n'ai pas eu besoin d'eau", rationale: "Wrong person - this is 'I didn't need', not 'we didn't need'.", isCorrect: false }
      ]
    },
    {
      question: "You did not need to eat / You have not needed to eat (formal / plural)",
      hint: "Use negative passé composé with vous (formal/plural)",
      answerOptions: [
        { text: "Vous n'avez pas eu besoin de manger", rationale: "Correct! 'Vous n'avez pas eu besoin de manger' means 'you did not need to eat' (formal/plural).", isCorrect: true },
        { text: "Tu n'as pas eu besoin de manger", rationale: "Wrong formality - this is informal 'you', question asks for formal/plural.", isCorrect: false },
        { text: "Nous n'avons pas eu besoin de manger", rationale: "Wrong person - this is 'we didn't need', not 'you didn't need'.", isCorrect: false },
        { text: "Ils n'ont pas eu besoin de manger", rationale: "Wrong person - this is 'they didn't need', not 'you didn't need'.", isCorrect: false }
      ]
    },
    // Positive questions
    {
      question: "Did I need a book? / Have I needed a book?",
      hint: "Use interrogative passé composé with inversion: Ai-je eu",
      answerOptions: [
        { text: "Ai-je eu besoin d'un livre ?", rationale: "Correct! 'Ai-je eu besoin d'un livre ?' means 'Did I need a book?' in passé composé.", isCorrect: true },
        { text: "As-tu eu besoin d'un livre ?", rationale: "Wrong person - this is 'Did you need?', not 'Did I need?'.", isCorrect: false },
        { text: "A-t-il eu besoin d'un livre ?", rationale: "Wrong person - this is 'Did he need?', not 'Did I need?'.", isCorrect: false },
        { text: "Avons-nous eu besoin d'un livre ?", rationale: "Wrong person - this is 'Did we need?', not 'Did I need?'.", isCorrect: false }
      ]
    },
    {
      question: "Did you need a problem? / Have you needed a problem? (informal)",
      hint: "Use interrogative passé composé with inversion: As-tu eu",
      answerOptions: [
        { text: "As-tu eu besoin d'un problème ?", rationale: "Correct! 'As-tu eu besoin d'un problème ?' means 'Did you need a problem?' (informal).", isCorrect: true },
        { text: "Ai-je eu besoin d'un problème ?", rationale: "Wrong person - this is 'Did I need?', not 'Did you need?'.", isCorrect: false },
        { text: "A-t-il eu besoin d'un problème ?", rationale: "Wrong person - this is 'Did he need?', not 'Did you need?'.", isCorrect: false },
        { text: "Avez-vous eu besoin d'un problème ?", rationale: "Wrong formality - this is formal 'you', question asks for informal.", isCorrect: false }
      ]
    },
    {
      question: "Did he need help? / Has he needed help?",
      hint: "Use interrogative passé composé with inversion: A-t-il eu",
      answerOptions: [
        { text: "A-t-il eu besoin d'aide ?", rationale: "Correct! 'A-t-il eu besoin d'aide ?' means 'Did he need help?'.", isCorrect: true },
        { text: "A-t-elle eu besoin d'aide ?", rationale: "Wrong gender - this is 'Did she need?', not 'Did he need?'.", isCorrect: false },
        { text: "Ai-je eu besoin d'aide ?", rationale: "Wrong person - this is 'Did I need?', not 'Did he need?'.", isCorrect: false },
        { text: "As-tu eu besoin d'aide ?", rationale: "Wrong person - this is 'Did you need?', not 'Did he need?'.", isCorrect: false }
      ]
    },
    // Negative questions
    {
      question: "Didn't I need a book? / Haven't I needed a book?",
      hint: "Use negative interrogative passé composé: N'ai-je pas eu",
      answerOptions: [
        { text: "N'ai-je pas eu besoin d'un livre ?", rationale: "Correct! 'N'ai-je pas eu besoin d'un livre ?' means 'Didn't I need a book?'.", isCorrect: true },
        { text: "N'as-tu pas eu besoin d'un livre ?", rationale: "Wrong person - this is 'Didn't you need?', not 'Didn't I need?'.", isCorrect: false },
        { text: "N'a-t-il pas eu besoin d'un livre ?", rationale: "Wrong person - this is 'Didn't he need?', not 'Didn't I need?'.", isCorrect: false },
        { text: "N'avons-nous pas eu besoin d'un livre ?", rationale: "Wrong person - this is 'Didn't we need?', not 'Didn't I need?'.", isCorrect: false }
      ]
    },
    {
      question: "Didn't you need a problem? / Haven't you needed a problem? (informal)",
      hint: "Use negative interrogative passé composé: N'as-tu pas eu",
      answerOptions: [
        { text: "N'as-tu pas eu besoin d'un problème ?", rationale: "Correct! 'N'as-tu pas eu besoin d'un problème ?' means 'Didn't you need a problem?' (informal).", isCorrect: true },
        { text: "N'ai-je pas eu besoin d'un problème ?", rationale: "Wrong person - this is 'Didn't I need?', not 'Didn't you need?'.", isCorrect: false },
        { text: "N'a-t-il pas eu besoin d'un problème ?", rationale: "Wrong person - this is 'Didn't he need?', not 'Didn't you need?'.", isCorrect: false },
        { text: "N'avez-vous pas eu besoin d'un problème ?", rationale: "Wrong formality - this is formal 'you', question asks for informal.", isCorrect: false }
      ]
    },
    {
      question: "Didn't he need help? / Haven't he needed help?",
      hint: "Use negative interrogative passé composé: N'a-t-il pas eu",
      answerOptions: [
        { text: "N'a-t-il pas eu besoin d'aide ?", rationale: "Correct! 'N'a-t-il pas eu besoin d'aide ?' means 'Didn't he need help?'.", isCorrect: true },
        { text: "N'a-t-elle pas eu besoin d'aide ?", rationale: "Wrong gender - this is 'Didn't she need?', not 'Didn't he need?'.", isCorrect: false },
        { text: "N'ai-je pas eu besoin d'aide ?", rationale: "Wrong person - this is 'Didn't I need?', not 'Didn't he need?'.", isCorrect: false },
        { text: "N'as-tu pas eu besoin d'aide ?", rationale: "Wrong person - this is 'Didn't you need?', not 'Didn't he need?'.", isCorrect: false }
      ]
    }
  ],
  "voir": [
    {
      question: "I saw / have seen that movie.",
      hint: "Use passé composé of voir: j'ai vu",
      answerOptions: [
        { text: "Je suis vu ce film.", rationale: "Option A", isCorrect: false },
        { text: "J'ai vu ce film.", rationale: "Option B", isCorrect: true },
        { text: "J'ai vus ce film.", rationale: "Option C", isCorrect: false },
        { text: "Je voyais ce film.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Did you (informal) see / have you seen his new car?",
      hint: "Use passé composé interrogative: as-tu vu",
      answerOptions: [
        { text: "As-tu vu sa nouvelle voiture ?", rationale: "Option A", isCorrect: true },
        { text: "As-tu vus sa nouvelle voiture ?", rationale: "Option B", isCorrect: false },
        { text: "Voyais-tu sa nouvelle voiture ?", rationale: "Option C", isCorrect: false },
        { text: "Es-tu vu sa nouvelle voiture ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) saw / have seen the results.",
      hint: "Use passé composé of voir: vous avez vu",
      answerOptions: [
        { text: "Vous êtes vu les résultats.", rationale: "Option A", isCorrect: false },
        { text: "Vous voyiez les résultats.", rationale: "Option B", isCorrect: false },
        { text: "Vous avez vus les résultats.", rationale: "Option C", isCorrect: false },
        { text: "Vous avez vu les résultats.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "We saw / have seen the exhibition.",
      hint: "Use passé composé of voir: nous avons vu",
      answerOptions: [
        { text: "Nous sommes vus l'exposition.", rationale: "Option A", isCorrect: false },
        { text: "Nous voyions l'exposition.", rationale: "Option B", isCorrect: false },
        { text: "Nous avons vu l'exposition.", rationale: "Option C", isCorrect: true },
        { text: "Nous avons vus l'exposition.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He saw / has seen a ghost.",
      hint: "Use passé composé of voir: il a vu",
      answerOptions: [
        { text: "Il a vu un fantôme.", rationale: "Option A", isCorrect: true },
        { text: "Il voyait un fantôme.", rationale: "Option B", isCorrect: false },
        { text: "Il est vu un fantôme.", rationale: "Option C", isCorrect: false },
        { text: "Il a vus un fantôme.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She didn't see / hasn't seen the message.",
      hint: "Use passé composé negative: elle n'a pas vu",
      answerOptions: [
        { text: "Elle ne voyait pas le message.", rationale: "Option A", isCorrect: false },
        { text: "Elle n'a pas vu le message.", rationale: "Option B", isCorrect: true },
        { text: "Elle n'est pas vue le message.", rationale: "Option C", isCorrect: false },
        { text: "Elle n'a pas vue le message.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) saw / have seen everything.",
      hint: "Use passé composé of voir: elles ont vu",
      answerOptions: [
        { text: "Elles ont vu tout.", rationale: "Option A", isCorrect: true },
        { text: "Elles sont vues tout.", rationale: "Option B", isCorrect: false },
        { text: "Elles ont vues tout.", rationale: "Option C", isCorrect: false },
        { text: "Elles voyaient tout.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) saw / have seen the match.",
      hint: "Use passé composé of voir: ils ont vu",
      answerOptions: [
        { text: "Ils sont vus le match.", rationale: "Option A", isCorrect: false },
        { text: "Ils voyaient le match.", rationale: "Option B", isCorrect: false },
        { text: "Ils ont vus le match.", rationale: "Option C", isCorrect: false },
        { text: "Ils ont vu le match.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "She saw / has seen her friends yesterday.",
      hint: "Use passé composé of voir: elle a vu",
      answerOptions: [
        { text: "Elle voyait ses amis hier.", rationale: "Option A", isCorrect: false },
        { text: "Elle est vue ses amis hier.", rationale: "Option B", isCorrect: false },
        { text: "Elle a vu ses amis hier.", rationale: "Option C", isCorrect: true },
        { text: "Elle a vue ses amis hier.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We never saw / have never seen such a thing.",
      hint: "Use passé composé negative: nous n'avons jamais vu",
      answerOptions: [
        { text: "Nous n'avons jamais vu une telle chose.", rationale: "Option A", isCorrect: true },
        { text: "Nous ne sommes jamais vus une telle chose.", rationale: "Option B", isCorrect: false },
        { text: "Nous ne voyions jamais une telle chose.", rationale: "Option C", isCorrect: false },
        { text: "Nous n'avons jamais vus une telle chose.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Did he see / Has he seen the email?",
      hint: "Use passé composé interrogative: a-t-il vu",
      answerOptions: [
        { text: "A-t-il vu l'email ?", rationale: "Option A", isCorrect: true },
        { text: "Voyait-il l'email ?", rationale: "Option B", isCorrect: false },
        { text: "Est-il vu l'email ?", rationale: "Option C", isCorrect: false },
        { text: "A-t-il vus l'email ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) didn't see / haven't seen the film.",
      hint: "Use passé composé negative: ils n'ont pas vu",
      answerOptions: [
        { text: "Ils ne voyaient pas le film.", rationale: "Option A", isCorrect: false },
        { text: "Ils ne sont pas vus le film.", rationale: "Option B", isCorrect: false },
        { text: "Ils n'ont pas vus le film.", rationale: "Option C", isCorrect: false },
        { text: "Ils n'ont pas vu le film.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "Have you (formal) seen / Did you see the news?",
      hint: "Use passé composé interrogative: avez-vous vu",
      answerOptions: [
        { text: "Avez-vous vus les nouvelles ?", rationale: "Option A", isCorrect: false },
        { text: "Voyiez-vous les nouvelles ?", rationale: "Option B", isCorrect: false },
        { text: "Avez-vous vu les nouvelles ?", rationale: "Option C", isCorrect: true },
        { text: "Êtes-vous vu les nouvelles ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I haven't seen / didn't see anything.",
      hint: "Use passé composé negative: je n'ai rien vu",
      answerOptions: [
        { text: "Je n'ai pas vus rien.", rationale: "Option A", isCorrect: false },
        { text: "Je n'ai pas vu rien.", rationale: "Option B", isCorrect: false },
        { text: "Je n'ai rien vu.", rationale: "Option C", isCorrect: true },
        { text: "Je ne voyais rien.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I haven't seen / didn't see my glasses.",
      hint: "Use passé composé negative: je n'ai pas vu",
      answerOptions: [
        { text: "Je ne voyais pas mes lunettes.", rationale: "Option A", isCorrect: false },
        { text: "Je n'ai pas vu mes lunettes.", rationale: "Option B", isCorrect: true },
        { text: "Je ne suis pas vu mes lunettes.", rationale: "Option C", isCorrect: false },
        { text: "Je n'ai pas vus mes lunettes.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) haven't seen / didn't see the stop sign.",
      hint: "Use passé composé negative: tu n'as pas vu",
      answerOptions: [
        { text: "Tu n'as pas vus le panneau stop.", rationale: "Option A", isCorrect: false },
        { text: "Tu ne voyais pas le panneau stop.", rationale: "Option B", isCorrect: false },
        { text: "Tu n'es pas vu le panneau stop.", rationale: "Option C", isCorrect: false },
        { text: "Tu n'as pas vu le panneau stop.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "We didn't see / haven't seen them.",
      hint: "Use passé composé negative: nous ne les avons pas vu",
      answerOptions: [
        { text: "Nous ne les avons pas vus.", rationale: "Option A", isCorrect: false },
        { text: "Nous ne les voyions pas.", rationale: "Option B", isCorrect: false },
        { text: "Nous ne les avons pas vu.", rationale: "Option C", isCorrect: true },
        { text: "Nous ne les sommes pas vus.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He hasn't seen / didn't see his keys.",
      hint: "Use passé composé negative: il n'a pas vu",
      answerOptions: [
        { text: "Il ne voyait pas ses clés.", rationale: "Option A", isCorrect: false },
        { text: "Il n'a pas vu ses clés.", rationale: "Option B", isCorrect: true },
        { text: "Il n'est pas vu ses clés.", rationale: "Option C", isCorrect: false },
        { text: "Il n'a pas vus ses clés.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) haven't seen / didn't see the show.",
      hint: "Use passé composé negative: elles n'ont pas vu",
      answerOptions: [
        { text: "Elles n'ont pas vu le spectacle.", rationale: "Option A", isCorrect: true },
        { text: "Elles ne sont pas vues le spectacle.", rationale: "Option B", isCorrect: false },
        { text: "Elles n'ont pas vues le spectacle.", rationale: "Option C", isCorrect: false },
        { text: "Elles ne voyaient pas le spectacle.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She has already seen / already saw this play.",
      hint: "Use passé composé of voir: elle a déjà vu",
      answerOptions: [
        { text: "Elle a déjà vus cette pièce.", rationale: "Option A", isCorrect: false },
        { text: "Elle voyait déjà cette pièce.", rationale: "Option B", isCorrect: false },
        { text: "Elle est déjà vue cette pièce.", rationale: "Option C", isCorrect: false },
        { text: "Elle a déjà vu cette pièce.", rationale: "Option D", isCorrect: true }
      ]
    }
  ],
  "dire": [
    {
      question: "You (formal) said goodbye.",
      hint: "Use passé composé of dire: vous avez dit",
      answerOptions: [
        { text: "Vous ont dit au revoir.", rationale: "Option A", isCorrect: false },
        { text: "Vous avez dit au revoir.", rationale: "Option B", isCorrect: true },
        { text: "Vous a dit au revoir.", rationale: "Option C", isCorrect: false },
        { text: "Vous as dit au revoir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) said thank you.",
      hint: "Use passé composé of dire: elles ont dit",
      answerOptions: [
        { text: "Elles as dit merci.", rationale: "Option A", isCorrect: false },
        { text: "Elles avons dit merci.", rationale: "Option B", isCorrect: false },
        { text: "Elles ont dit merci.", rationale: "Option C", isCorrect: true },
        { text: "Elles a dit merci.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Did you (informal) say that?",
      hint: "Use passé composé interrogative: as-tu dit",
      answerOptions: [
        { text: "As-tu dit cela ?", rationale: "Option A", isCorrect: true },
        { text: "Ont-ils dit cela ?", rationale: "Option B", isCorrect: false },
        { text: "A-t-il dit cela ?", rationale: "Option C", isCorrect: false },
        { text: "Avons-nous dit cela ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "What did he say?",
      hint: "Use passé composé interrogative: qu'est-ce qu'il a dit",
      answerOptions: [
        { text: "Qu'est-ce qu'il ont dit ?", rationale: "Option A", isCorrect: false },
        { text: "Qu'est-ce qu'il as dit ?", rationale: "Option B", isCorrect: false },
        { text: "Qu'est-ce qu'il a dit ?", rationale: "Option C", isCorrect: true },
        { text: "Qu'est-ce qu'il avons dit ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She said it was important.",
      hint: "Use passé composé of dire: elle a dit",
      answerOptions: [
        { text: "Elle avons dit que c'était important.", rationale: "Option A", isCorrect: false },
        { text: "Elle as dit que c'était important.", rationale: "Option B", isCorrect: false },
        { text: "Elle ont dit que c'était important.", rationale: "Option C", isCorrect: false },
        { text: "Elle a dit que c'était important.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "We said hello.",
      hint: "Use passé composé of dire: nous avons dit",
      answerOptions: [
        { text: "Nous avons dit bonjour.", rationale: "Option A", isCorrect: true },
        { text: "Nous a dit bonjour.", rationale: "Option B", isCorrect: false },
        { text: "Nous ont dit bonjour.", rationale: "Option C", isCorrect: false },
        { text: "Nous as dit bonjour.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Did they (male) say when?",
      hint: "Use passé composé interrogative: ont-ils dit",
      answerOptions: [
        { text: "A-t-il dit quand ?", rationale: "Option A", isCorrect: false },
        { text: "Ont-ils dit quand ?", rationale: "Option B", isCorrect: true },
        { text: "Avez-vous dit quand ?", rationale: "Option C", isCorrect: false },
        { text: "As-tu dit quand ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) didn't say why.",
      hint: "Use passé composé negative: tu n'as pas dit",
      answerOptions: [
        { text: "Tu n'avons pas dit pourquoi.", rationale: "Option A", isCorrect: false },
        { text: "Tu n'a pas dit pourquoi.", rationale: "Option B", isCorrect: false },
        { text: "Tu n'ont pas dit pourquoi.", rationale: "Option C", isCorrect: false },
        { text: "Tu n'as pas dit pourquoi.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "I didn't say that.",
      hint: "Use passé composé negative: je n'ai pas dit",
      answerOptions: [
        { text: "Je n'as pas dit ça.", rationale: "Option A", isCorrect: false },
        { text: "Je n'a pas dit ça.", rationale: "Option B", isCorrect: false },
        { text: "Je n'ai pas dit ça.", rationale: "Option C", isCorrect: true },
        { text: "Je n'ont pas dit ça.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He said the truth.",
      hint: "Use passé composé of dire: il a dit",
      answerOptions: [
        { text: "Il a dit la vérité.", rationale: "Option A", isCorrect: true },
        { text: "Il ont dit la vérité.", rationale: "Option B", isCorrect: false },
        { text: "Il as dit la vérité.", rationale: "Option C", isCorrect: false },
        { text: "Il avons dit la vérité.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (plural) said nothing.",
      hint: "Use passé composé negative: vous n'avez rien dit",
      answerOptions: [
        { text: "Vous n'ont rien dit.", rationale: "Option A", isCorrect: false },
        { text: "Vous n'as rien dit.", rationale: "Option B", isCorrect: false },
        { text: "Vous n'a rien dit.", rationale: "Option C", isCorrect: false },
        { text: "Vous n'avez rien dit.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "I said yes.",
      hint: "Use passé composé of dire: j'ai dit",
      answerOptions: [
        { text: "J'ai dit oui.", rationale: "Option A", isCorrect: true },
        { text: "J'as dit oui.", rationale: "Option B", isCorrect: false },
        { text: "J'a dit oui.", rationale: "Option C", isCorrect: false },
        { text: "J'ont dit oui.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) didn't say anything.",
      hint: "Use passé composé negative: elles n'ont rien dit",
      answerOptions: [
        { text: "Elles n'ont rien dit.", rationale: "Option A", isCorrect: true },
        { text: "Elles n'a rien dit.", rationale: "Option B", isCorrect: false },
        { text: "Elles n'avons rien dit.", rationale: "Option C", isCorrect: false },
        { text: "Elles n'as rien dit.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We said the same thing.",
      hint: "Use passé composé of dire: nous avons dit",
      answerOptions: [
        { text: "Nous a dit la même chose.", rationale: "Option A", isCorrect: false },
        { text: "Nous as dit la même chose.", rationale: "Option B", isCorrect: false },
        { text: "Nous avons dit la même chose.", rationale: "Option C", isCorrect: true },
        { text: "Nous ont dit la même chose.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We didn't say a word.",
      hint: "Use passé composé negative: nous n'avons pas dit",
      answerOptions: [
        { text: "Nous n'a pas dit un mot.", rationale: "Option A", isCorrect: false },
        { text: "Nous n'avons pas dit un mot.", rationale: "Option B", isCorrect: true },
        { text: "Nous n'as pas dit un mot.", rationale: "Option C", isCorrect: false },
        { text: "Nous n'ont pas dit un mot.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male) said so.",
      hint: "Use passé composé of dire: ils l'ont dit",
      answerOptions: [
        { text: "Ils l'a dit.", rationale: "Option A", isCorrect: false },
        { text: "Ils l'avons dit.", rationale: "Option B", isCorrect: false },
        { text: "Ils l'as dit.", rationale: "Option C", isCorrect: false },
        { text: "Ils l'ont dit.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "You (informal) said everything.",
      hint: "Use passé composé of dire: tu as dit",
      answerOptions: [
        { text: "Tu a dit tout.", rationale: "Option A", isCorrect: false },
        { text: "Tu as dit tout.", rationale: "Option B", isCorrect: true },
        { text: "Tu avons dit tout.", rationale: "Option C", isCorrect: false },
        { text: "Tu ont dit tout.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She said no.",
      hint: "Use passé composé of dire: elle a dit",
      answerOptions: [
        { text: "Elle avons dit non.", rationale: "Option A", isCorrect: false },
        { text: "Elle a dit non.", rationale: "Option B", isCorrect: true },
        { text: "Elle as dit non.", rationale: "Option C", isCorrect: false },
        { text: "Elle ont dit non.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "What have I said?",
      hint: "Use passé composé interrogative: qu'est-ce que j'ai dit",
      answerOptions: [
        { text: "Qu'est-ce que j'a dit ?", rationale: "Option A", isCorrect: false },
        { text: "Qu'est-ce que j'ont dit ?", rationale: "Option B", isCorrect: false },
        { text: "Qu'est-ce que j'as dit ?", rationale: "Option C", isCorrect: false },
        { text: "Qu'est-ce que j'ai dit ?", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "You (formal) never said it.",
      hint: "Use passé composé negative: vous ne l'avez jamais dit",
      answerOptions: [
        { text: "Vous ne l'a jamais dit.", rationale: "Option A", isCorrect: false },
        { text: "Vous ne l'ont jamais dit.", rationale: "Option B", isCorrect: false },
        { text: "Vous ne l'avez jamais dit.", rationale: "Option C", isCorrect: true },
        { text: "Vous ne l'as jamais dit.", rationale: "Option D", isCorrect: false }
      ]
    }
  ],
  "savoir": [
    {
      question: "He knew / has known how to drive.",
      hint: "Use passé composé of savoir: il a su",
      answerOptions: [
        { text: "Il savait conduire.", rationale: "Option A", isCorrect: false },
        { text: "Il a su conduire.", rationale: "Option B", isCorrect: true },
        { text: "Il sait conduire.", rationale: "Option C", isCorrect: false },
        { text: "Il saura conduire.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She knew / has known how to draw.",
      hint: "Use passé composé of savoir: elle a su",
      answerOptions: [
        { text: "Elle savait dessiner.", rationale: "Option A", isCorrect: false },
        { text: "Elle sait dessiner.", rationale: "Option B", isCorrect: false },
        { text: "Elle saura dessiner.", rationale: "Option C", isCorrect: false },
        { text: "Elle a su dessiner.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "I knew / have known the answer.",
      hint: "Use passé composé of savoir: j'ai su",
      answerOptions: [
        { text: "Je sais la réponse.", rationale: "Option A", isCorrect: false },
        { text: "Je savais la réponse.", rationale: "Option B", isCorrect: false },
        { text: "Je saurai la réponse.", rationale: "Option C", isCorrect: false },
        { text: "J'ai su la réponse.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "You (formal) knew / have known the answer.",
      hint: "Use passé composé of savoir: vous avez su",
      answerOptions: [
        { text: "Vous saviez la réponse.", rationale: "Option A", isCorrect: false },
        { text: "Vous saurez la réponse.", rationale: "Option B", isCorrect: false },
        { text: "Vous avez su la réponse.", rationale: "Option C", isCorrect: true },
        { text: "Vous savent la réponse.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We knew / have known the address.",
      hint: "Use passé composé of savoir: nous avons su",
      answerOptions: [
        { text: "Nous savions l'adresse.", rationale: "Option A", isCorrect: false },
        { text: "Nous avons su l'adresse.", rationale: "Option B", isCorrect: true },
        { text: "Nous savent l'adresse.", rationale: "Option C", isCorrect: false },
        { text: "Nous savons l'adresse.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Did they (female) know / have they known the news?",
      hint: "Use passé composé interrogative: ont-elles su",
      answerOptions: [
        { text: "Saviez-elles les nouvelles ?", rationale: "Option A", isCorrect: false },
        { text: "Sait-elle les nouvelles ?", rationale: "Option B", isCorrect: false },
        { text: "Sauront-elles les nouvelles ?", rationale: "Option C", isCorrect: false },
        { text: "Ont-elles su les nouvelles ?", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "You (informal) knew / have known how to cook.",
      hint: "Use passé composé of savoir: tu as su",
      answerOptions: [
        { text: "Tu as su cuisiner.", rationale: "Option A", isCorrect: true },
        { text: "Tu sait cuisiner.", rationale: "Option B", isCorrect: false },
        { text: "Tu savais cuisiner.", rationale: "Option C", isCorrect: false },
        { text: "Tu sauras cuisiner.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) knew / have known everything.",
      hint: "Use passé composé of savoir: ils ont su",
      answerOptions: [
        { text: "Ils sait tout.", rationale: "Option A", isCorrect: false },
        { text: "Ils savions tout.", rationale: "Option B", isCorrect: false },
        { text: "Ils ont su tout.", rationale: "Option C", isCorrect: true },
        { text: "Ils sauront tout.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) knew / have known how to swim.",
      hint: "Use passé composé of savoir: elles ont su",
      answerOptions: [
        { text: "Elles sait nager.", rationale: "Option A", isCorrect: false },
        { text: "Elles ont su nager.", rationale: "Option B", isCorrect: true },
        { text: "Elles savons nager.", rationale: "Option C", isCorrect: false },
        { text: "Elles savaient nager.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We didn't know / haven't known the answer.",
      hint: "Use passé composé negative: nous n'avons pas su",
      answerOptions: [
        { text: "Nous ne savent pas la réponse.", rationale: "Option A", isCorrect: false },
        { text: "Nous ne savions pas la réponse.", rationale: "Option B", isCorrect: false },
        { text: "Nous n'avons pas su la réponse.", rationale: "Option C", isCorrect: true },
        { text: "Nous ne savons pas la réponse.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She knew / has known the truth.",
      hint: "Use passé composé of savoir: elle a su",
      answerOptions: [
        { text: "Elle a su la vérité.", rationale: "Option A", isCorrect: true },
        { text: "Elle sais la vérité.", rationale: "Option B", isCorrect: false },
        { text: "Elle savons la vérité.", rationale: "Option C", isCorrect: false },
        { text: "Elle savaient la vérité.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He didn't know / hasn't known the story.",
      hint: "Use passé composé negative: il n'a pas su",
      answerOptions: [
        { text: "Il ne savait pas l'histoire.", rationale: "Option A", isCorrect: false },
        { text: "Il n'a pas su l'histoire.", rationale: "Option B", isCorrect: true },
        { text: "Il ne sait pas l'histoire.", rationale: "Option C", isCorrect: false },
        { text: "Il ne sais pas l'histoire.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Did you (formal) know / have you known the time?",
      hint: "Use passé composé interrogative: avez-vous su",
      answerOptions: [
        { text: "Savez-vous l'heure ?", rationale: "Option A", isCorrect: false },
        { text: "Avez-vous su l'heure ?", rationale: "Option B", isCorrect: true },
        { text: "Vous saviez l'heure ?", rationale: "Option C", isCorrect: false },
        { text: "Vous saurez l'heure ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) knew / have known nothing.",
      hint: "Use passé composé negative: vous n'avez rien su",
      answerOptions: [
        { text: "Vous ne savez.", rationale: "Option A", isCorrect: false },
        { text: "Vous ne saviez rien.", rationale: "Option B", isCorrect: false },
        { text: "Vous n'avez rien su.", rationale: "Option C", isCorrect: true },
        { text: "Vous ne savez rien.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We knew / have known that it was important.",
      hint: "Use passé composé of savoir: nous avons su",
      answerOptions: [
        { text: "Nous avons su que c'est important.", rationale: "Option A", isCorrect: true },
        { text: "Nous savent que c'est important.", rationale: "Option B", isCorrect: false },
        { text: "Nous savions que c'est important.", rationale: "Option C", isCorrect: false },
        { text: "Nous saurons que c'est important.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We knew / have known how to play the guitar.",
      hint: "Use passé composé of savoir: nous avons su",
      answerOptions: [
        { text: "Nous savent jouer de la guitare.", rationale: "Option A", isCorrect: false },
        { text: "Nous savions jouer de la guitare.", rationale: "Option B", isCorrect: false },
        { text: "Nous avons su jouer de la guitare.", rationale: "Option C", isCorrect: true },
        { text: "Nous saurons jouer de la guitare.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I didn't know / haven't known.",
      hint: "Use passé composé negative: je n'ai pas su",
      answerOptions: [
        { text: "Je ne sais.", rationale: "Option A", isCorrect: false },
        { text: "Je n'ai pas su.", rationale: "Option B", isCorrect: true },
        { text: "Je ne savais pas.", rationale: "Option C", isCorrect: false },
        { text: "Je ne sais pas.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I knew / have known what he was thinking.",
      hint: "Use passé composé of savoir: j'ai su",
      answerOptions: [
        { text: "J'ai su ce qu'il pense.", rationale: "Option A", isCorrect: true },
        { text: "Je savais ce qu'il pense.", rationale: "Option B", isCorrect: false },
        { text: "Je saurai ce qu'il pense.", rationale: "Option C", isCorrect: false },
        { text: "Je sais ce qu'il pense.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) knew / have known the rules.",
      hint: "Use passé composé of savoir: ils ont su",
      answerOptions: [
        { text: "Ils ont su les règles.", rationale: "Option A", isCorrect: true },
        { text: "Ils sait les règles.", rationale: "Option B", isCorrect: false },
        { text: "Ils savons les règles.", rationale: "Option C", isCorrect: false },
        { text: "Ils savaient les règles.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Did you (informal) know / have you known the password?",
      hint: "Use passé composé interrogative: as-tu su",
      answerOptions: [
        { text: "Tu savais le mot de passe ?", rationale: "Option A", isCorrect: false },
        { text: "Tu sauras le mot de passe ?", rationale: "Option B", isCorrect: false },
        { text: "As-tu su le mot de passe ?", rationale: "Option C", isCorrect: true },
        { text: "Tu sait le mot de passe ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We never knew / found out her name.",
      hint: "Use passé composé negative: nous n'avons jamais su",
      answerOptions: [
        { text: "Nous ne savions jamais son nom.", rationale: "Option A", isCorrect: false },
        { text: "Nous n'avons jamais su son nom.", rationale: "Option B", isCorrect: true },
        { text: "Nous ne sommes jamais su son nom.", rationale: "Option C", isCorrect: false },
        { text: "Nous n'avons jamais sus son nom.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I knew / have known the answer.",
      hint: "Use passé composé of savoir: j'ai su",
      answerOptions: [
        { text: "Je suis su la réponse.", rationale: "Option A", isCorrect: false },
        { text: "Je savais la réponse.", rationale: "Option B", isCorrect: false },
        { text: "J'ai su la réponse.", rationale: "Option C", isCorrect: true },
        { text: "J'ai sus la réponse.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She found out / has found out the truth.",
      hint: "Use passé composé of savoir: elle a su",
      answerOptions: [
        { text: "Elle a su la vérité.", rationale: "Option A", isCorrect: true },
        { text: "Elle est sue la vérité.", rationale: "Option B", isCorrect: false },
        { text: "Elle a sue la vérité.", rationale: "Option C", isCorrect: false },
        { text: "Elle savait la vérité.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) knew / found out the news yesterday.",
      hint: "Use passé composé of savoir: vous avez su",
      answerOptions: [
        { text: "Vous saviez la nouvelle hier.", rationale: "Option A", isCorrect: false },
        { text: "Vous avez su la nouvelle hier.", rationale: "Option B", isCorrect: true },
        { text: "Vous êtes su la nouvelle hier.", rationale: "Option C", isCorrect: false },
        { text: "Vous avez sus la nouvelle hier.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Why did they (female) not know / find out?",
      hint: "Use passé composé negative interrogative: pourquoi n'ont-elles pas su",
      answerOptions: [
        { text: "Pourquoi ne savaient-elles pas ?", rationale: "Option A", isCorrect: false },
        { text: "Pourquoi n'ont-elles pas su ?", rationale: "Option B", isCorrect: true },
        { text: "Pourquoi ne sont-elles pas sues ?", rationale: "Option C", isCorrect: false },
        { text: "Pourquoi n'ont-elles pas sues ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Did she know / find out that we were here?",
      hint: "Use passé composé interrogative: a-t-elle su",
      answerOptions: [
        { text: "Savait-elle que nous étions là ?", rationale: "Option A", isCorrect: false },
        { text: "A-t-elle sue que nous étions là ?", rationale: "Option B", isCorrect: false },
        { text: "A-t-elle su que nous étions là ?", rationale: "Option C", isCorrect: true },
        { text: "Est-elle sue que nous étions là ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We found out / have found out the secret.",
      hint: "Use passé composé of savoir: nous avons su",
      answerOptions: [
        { text: "Nous avons su le secret.", rationale: "Option A", isCorrect: true },
        { text: "Nous sommes su le secret.", rationale: "Option B", isCorrect: false },
        { text: "Nous avons sus le secret.", rationale: "Option C", isCorrect: false },
        { text: "Nous savions le secret.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) did not know / find out the answer.",
      hint: "Use passé composé negative: ils n'ont pas su",
      answerOptions: [
        { text: "Ils n'ont pas su la réponse.", rationale: "Option A", isCorrect: true },
        { text: "Ils ne sont pas su la réponse.", rationale: "Option B", isCorrect: false },
        { text: "Ils ne savaient pas la réponse.", rationale: "Option C", isCorrect: false },
        { text: "Ils n'ont pas sus la réponse.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He knew / found out how to fix it.",
      hint: "Use passé composé of savoir: il a su",
      answerOptions: [
        { text: "Il est su comment le réparer.", rationale: "Option A", isCorrect: false },
        { text: "Il a su comment le réparer.", rationale: "Option B", isCorrect: true },
        { text: "Il savait comment le réparer.", rationale: "Option C", isCorrect: false },
        { text: "Il a sus comment le réparer.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) knew / have known the risks.",
      hint: "Use passé composé of savoir: elles ont su",
      answerOptions: [
        { text: "Elles sont sues les risques.", rationale: "Option A", isCorrect: false },
        { text: "Elles savaient les risques.", rationale: "Option B", isCorrect: false },
        { text: "Elles ont sues les risques.", rationale: "Option C", isCorrect: false },
        { text: "Elles ont su les risques.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "We didn't know / find out the result.",
      hint: "Use passé composé negative: nous n'avons pas su",
      answerOptions: [
        { text: "Nous ne sommes pas su le résultat.", rationale: "Option A", isCorrect: false },
        { text: "Nous ne savions pas le résultat.", rationale: "Option B", isCorrect: false },
        { text: "Nous n'avons pas sus le résultat.", rationale: "Option C", isCorrect: false },
        { text: "Nous n'avons pas su le résultat.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "She has known / found out how to swim since last year.",
      hint: "Use passé composé of savoir: elle a su",
      answerOptions: [
        { text: "Elle est sue nager depuis l'année dernière.", rationale: "Option A", isCorrect: false },
        { text: "Elle savait nager depuis l'année dernière.", rationale: "Option B", isCorrect: false },
        { text: "Elle a sue nager depuis l'année dernière.", rationale: "Option C", isCorrect: false },
        { text: "Elle a su nager depuis l'année dernière.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "He didn't know / find out what to do.",
      hint: "Use passé composé negative: il n'a pas su",
      answerOptions: [
        { text: "Il ne savait pas quoi faire.", rationale: "Option A", isCorrect: false },
        { text: "Il n'est pas su quoi faire.", rationale: "Option B", isCorrect: false },
        { text: "Il n'a pas sus quoi faire.", rationale: "Option C", isCorrect: false },
        { text: "Il n'a pas su quoi faire.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "Did you (informal) know / find out how to get here?",
      hint: "Use passé composé interrogative: as-tu su",
      answerOptions: [
        { text: "As-tu su comment venir ici ?", rationale: "Option A", isCorrect: true },
        { text: "As-tu sus comment venir ici ?", rationale: "Option B", isCorrect: false },
        { text: "Savais-tu comment venir ici ?", rationale: "Option C", isCorrect: false },
        { text: "Es-tu su comment venir ici ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) suddenly knew / found out where to go.",
      hint: "Use passé composé of savoir: ils ont su",
      answerOptions: [
        { text: "Ils sont su soudainement où aller.", rationale: "Option A", isCorrect: false },
        { text: "Ils savaient soudainement où aller.", rationale: "Option B", isCorrect: false },
        { text: "Ils ont su soudainement où aller.", rationale: "Option C", isCorrect: true },
        { text: "Ils ont sus soudainement où aller.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Did you (informal) find out the time of the meeting?",
      hint: "Use passé composé interrogative: as-tu su",
      answerOptions: [
        { text: "Savais-tu l'heure de la réunion ?", rationale: "Option A", isCorrect: false },
        { text: "Es-tu su l'heure de la réunion ?", rationale: "Option B", isCorrect: false },
        { text: "As-tu sus l'heure de la réunion ?", rationale: "Option C", isCorrect: false },
        { text: "As-tu su l'heure de la réunion ?", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "At that moment, you (informal) knew / found out.",
      hint: "Use passé composé of savoir: tu as su",
      answerOptions: [
        { text: "À ce moment, tu as sus.", rationale: "Option A", isCorrect: false },
        { text: "À ce moment, tu savais.", rationale: "Option B", isCorrect: false },
        { text: "À ce moment, tu as su.", rationale: "Option C", isCorrect: true },
        { text: "À ce moment, tu es su.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Have you (formal) known / found out how to do that for a long time?",
      hint: "Use passé composé interrogative: avez-vous su",
      answerOptions: [
        { text: "Avez-vous sus faire cela depuis longtemps ?", rationale: "Option A", isCorrect: false },
        { text: "Saviez-vous faire cela depuis longtemps ?", rationale: "Option B", isCorrect: false },
        { text: "Avez-vous su faire cela depuis longtemps ?", rationale: "Option C", isCorrect: true },
        { text: "Êtes-vous su faire cela depuis longtemps ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I knew / found out that he was right.",
      hint: "Use passé composé of savoir: j'ai su",
      answerOptions: [
        { text: "J'ai su qu'il avait raison.", rationale: "Option A", isCorrect: true },
        { text: "Je suis su qu'il avait raison.", rationale: "Option B", isCorrect: false },
        { text: "Je savais qu'il avait raison.", rationale: "Option C", isCorrect: false },
        { text: "J'ai sus qu'il avait raison.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I did not know / find out what to say.",
      hint: "Use passé composé negative: je n'ai pas su",
      answerOptions: [
        { text: "Je ne savais pas quoi dire.", rationale: "Option A", isCorrect: false },
        { text: "Je n'ai pas su quoi dire.", rationale: "Option B", isCorrect: true },
        { text: "Je ne suis pas su quoi dire.", rationale: "Option C", isCorrect: false },
        { text: "Je n'ai pas sus quoi dire.", rationale: "Option D", isCorrect: false }
      ]
    }
  ],
  "pouvoir": [
    {
      question: "She could / was able to finish her work.",
      hint: "Use passé composé of pouvoir: elle a pu",
      answerOptions: [
        { text: "Elle a pu finir son travail.", rationale: "Option A", isCorrect: true },
        { text: "Elle a pue finir son travail.", rationale: "Option B", isCorrect: false },
        { text: "Elle est pue finir son travail.", rationale: "Option C", isCorrect: false },
        { text: "Elle pouvait finir son travail.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I couldn't / wasn't able to come yesterday.",
      hint: "Use passé composé negative: je n'ai pas pu",
      answerOptions: [
        { text: "Je n'ai pas pus venir hier.", rationale: "Option A", isCorrect: false },
        { text: "Je n'ai pas pu venir hier.", rationale: "Option B", isCorrect: true },
        { text: "Je ne suis pas pu venir hier.", rationale: "Option C", isCorrect: false },
        { text: "Je ne pouvais pas venir hier.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) could / were able to solve the problem.",
      hint: "Use passé composé of pouvoir: elles ont pu",
      answerOptions: [
        { text: "Elles ont pu résoudre le problème.", rationale: "Option A", isCorrect: true },
        { text: "Elles sont pues résoudre le problème.", rationale: "Option B", isCorrect: false },
        { text: "Elles ont pues résoudre le problème.", rationale: "Option C", isCorrect: false },
        { text: "Elles pouvaient résoudre le problème.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) couldn't / weren't able to find the keys.",
      hint: "Use passé composé negative: ils n'ont pas pu",
      answerOptions: [
        { text: "Ils n'ont pas pus trouver les clés.", rationale: "Option A", isCorrect: false },
        { text: "Ils ne pouvaient pas trouver les clés.", rationale: "Option B", isCorrect: false },
        { text: "Ils ne sont pas pu trouver les clés.", rationale: "Option C", isCorrect: false },
        { text: "Ils n'ont pas pu trouver les clés.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "Could you (formal) / Were you able to speak to him?",
      hint: "Use passé composé interrogative: avez-vous pu",
      answerOptions: [
        { text: "Avez-vous pus lui parler ?", rationale: "Option A", isCorrect: false },
        { text: "Avez-vous pu lui parler ?", rationale: "Option B", isCorrect: true },
        { text: "Pouviez-vous lui parler ?", rationale: "Option C", isCorrect: false },
        { text: "Êtes-vous pu lui parler ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He could / was able to open the door.",
      hint: "Use passé composé of pouvoir: il a pu",
      answerOptions: [
        { text: "Il pouvait ouvrir la porte.", rationale: "Option A", isCorrect: false },
        { text: "Il a pus ouvrir la porte.", rationale: "Option B", isCorrect: false },
        { text: "Il a pu ouvrir la porte.", rationale: "Option C", isCorrect: true },
        { text: "Il est pu ouvrir la porte.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) couldn't / weren't able to see the show.",
      hint: "Use passé composé negative: tu n'as pas pu",
      answerOptions: [
        { text: "Tu ne pouvais pas voir le spectacle.", rationale: "Option A", isCorrect: false },
        { text: "Tu n'as pas pu voir le spectacle.", rationale: "Option B", isCorrect: true },
        { text: "Tu n'as pas pus voir le spectacle.", rationale: "Option C", isCorrect: false },
        { text: "Tu n'es pas pu voir le spectacle.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Could she / Was she able to call you?",
      hint: "Use passé composé interrogative: a-t-elle pu",
      answerOptions: [
        { text: "A-t-elle pu t'appeler ?", rationale: "Option A", isCorrect: true },
        { text: "Pouvait-elle t'appeler ?", rationale: "Option B", isCorrect: false },
        { text: "A-t-elle pue t'appeler ?", rationale: "Option C", isCorrect: false },
        { text: "Est-elle pue t'appeler ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We could / were able to leave earlier.",
      hint: "Use passé composé of pouvoir: nous avons pu",
      answerOptions: [
        { text: "Nous avons pu partir plus tôt.", rationale: "Option A", isCorrect: true },
        { text: "Nous pouvions partir plus tôt.", rationale: "Option B", isCorrect: false },
        { text: "Nous sommes pu partir plus tôt.", rationale: "Option C", isCorrect: false },
        { text: "Nous avons pus partir plus tôt.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He finally could / was finally able to do it.",
      hint: "Use passé composé of pouvoir: il a enfin pu",
      answerOptions: [
        { text: "Il pouvait enfin le faire.", rationale: "Option A", isCorrect: false },
        { text: "Il a enfin pus le faire.", rationale: "Option B", isCorrect: false },
        { text: "Il est enfin pu le faire.", rationale: "Option C", isCorrect: false },
        { text: "Il a enfin pu le faire.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "They (female) could not / were not able to come.",
      hint: "Use passé composé negative: elles n'ont pas pu",
      answerOptions: [
        { text: "Elles n'ont pas pues venir.", rationale: "Option A", isCorrect: false },
        { text: "Elles ne sont pas pues venir.", rationale: "Option B", isCorrect: false },
        { text: "Elles ne pouvaient pas venir.", rationale: "Option C", isCorrect: false },
        { text: "Elles n'ont pas pu venir.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "Did you (informal) / Were you able to find your keys?",
      hint: "Use passé composé interrogative: as-tu pu",
      answerOptions: [
        { text: "As-tu pus trouver tes clés ?", rationale: "Option A", isCorrect: false },
        { text: "Pouvais-tu trouver tes clés ?", rationale: "Option B", isCorrect: false },
        { text: "As-tu pu trouver tes clés ?", rationale: "Option C", isCorrect: true },
        { text: "Es-tu pu trouver tes clés ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We couldn't / weren't able to help.",
      hint: "Use passé composé negative: nous n'avons pas pu",
      answerOptions: [
        { text: "Nous ne pouvions pas aider.", rationale: "Option A", isCorrect: false },
        { text: "Nous n'avons pas pu aider.", rationale: "Option B", isCorrect: true },
        { text: "Nous n'avons pas pus aider.", rationale: "Option C", isCorrect: false },
        { text: "Nous ne sommes pas pu aider.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) could / were able to convince them.",
      hint: "Use passé composé of pouvoir: vous avez pu",
      answerOptions: [
        { text: "Vous avez pus les convaincre.", rationale: "Option A", isCorrect: false },
        { text: "Vous pouviez les convaincre.", rationale: "Option B", isCorrect: false },
        { text: "Vous avez pu les convaincre.", rationale: "Option C", isCorrect: true },
        { text: "Vous êtes pu les convaincre.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I could / was able to get some rest.",
      hint: "Use passé composé of pouvoir: j'ai pu",
      answerOptions: [
        { text: "J'ai pu me reposer.", rationale: "Option A", isCorrect: true },
        { text: "Je pouvais me reposer.", rationale: "Option B", isCorrect: false },
        { text: "J'ai pus me reposer.", rationale: "Option C", isCorrect: false },
        { text: "Je suis pu me reposer.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Could they (male/mixed) / Were they able to understand?",
      hint: "Use passé composé interrogative: ont-ils pu",
      answerOptions: [
        { text: "Pouvaient-ils comprendre ?", rationale: "Option A", isCorrect: false },
        { text: "Ont-ils pus comprendre ?", rationale: "Option B", isCorrect: false },
        { text: "Ont-ils pu comprendre ?", rationale: "Option C", isCorrect: true },
        { text: "Sont-ils pu comprendre ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She couldn't / wasn't able to say anything.",
      hint: "Use passé composé negative: elle n'a rien pu dire",
      answerOptions: [
        { text: "Elle n'a pas pu rien dire.", rationale: "Option A", isCorrect: false },
        { text: "Elle n'a rien pu dire.", rationale: "Option B", isCorrect: true },
        { text: "Elle ne pouvait rien dire.", rationale: "Option C", isCorrect: false },
        { text: "Elle n'a rien pue dire.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We couldn't / weren't able to believe it.",
      hint: "Use passé composé negative: nous n'avons pas pu",
      answerOptions: [
        { text: "Nous n'avons pas cru le croire.", rationale: "Option A", isCorrect: false },
        { text: "Nous ne pouvions pas le croire.", rationale: "Option B", isCorrect: false },
        { text: "Nous n'avons pas pu le croire.", rationale: "Option C", isCorrect: true },
        { text: "Nous n'avons pas pus le croire.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I couldn't / wasn't able to sleep all night.",
      hint: "Use passé composé negative: je n'ai pas pu",
      answerOptions: [
        { text: "Je n'ai pas pus dormir de la nuit.", rationale: "Option A", isCorrect: false },
        { text: "Je ne pouvais pas dormir de la nuit.", rationale: "Option B", isCorrect: false },
        { text: "Je ne suis pas pu dormir de la nuit.", rationale: "Option C", isCorrect: false },
        { text: "Je n'ai pas pu dormir de la nuit.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "You (informal) could / were able to succeed.",
      hint: "Use passé composé of pouvoir: tu as pu",
      answerOptions: [
        { text: "Tu pouvais réussir.", rationale: "Option A", isCorrect: false },
        { text: "Tu as pus réussir.", rationale: "Option B", isCorrect: false },
        { text: "Tu es pu réussir.", rationale: "Option C", isCorrect: false },
        { text: "Tu as pu réussir.", rationale: "Option D", isCorrect: true }
      ]
    }
  ],
  "venir": [
    {
      question: "She came / has come to see the new house.",
      hint: "Use passé composé with être: elle est venue",
      answerOptions: [
        { text: "Elle est venue voir la nouvelle maison.", rationale: "Option A", isCorrect: true },
        { text: "Elle a venue voir la nouvelle maison.", rationale: "Option B", isCorrect: false },
        { text: "Elle est veni voir la nouvelle maison.", rationale: "Option C", isCorrect: false },
        { text: "Elle venait voir la nouvelle maison.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) came / have come at the right time.",
      hint: "Use passé composé with être: vous êtes venus (assuming mixed/male group)",
      answerOptions: [
        { text: "Vous avez venu au bon moment.", rationale: "Option A", isCorrect: false },
        { text: "Vous êtes venu au bon moment.", rationale: "Option B", isCorrect: false },
        { text: "Vous veniez au bon moment.", rationale: "Option C", isCorrect: false },
        { text: "Vous êtes venus au bon moment.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "They (male/mixed) came / have come to help.",
      hint: "Use passé composé with être: ils sont venus",
      answerOptions: [
        { text: "Ils ont venus pour aider.", rationale: "Option A", isCorrect: false },
        { text: "Ils venaient pour aider.", rationale: "Option B", isCorrect: false },
        { text: "Ils sont venus pour aider.", rationale: "Option C", isCorrect: true },
        { text: "Ils sont venu pour aider.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I came / have come with my family.",
      hint: "Use passé composé with être: je suis venu (assuming masculine speaker)",
      answerOptions: [
        { text: "Je suis venu avec ma famille.", rationale: "Option A", isCorrect: true },
        { text: "J'ai venu avec ma famille.", rationale: "Option B", isCorrect: false },
        { text: "Je venais avec ma famille.", rationale: "Option C", isCorrect: false },
        { text: "Je suis venue avec ma famille.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He came / has come alone.",
      hint: "Use passé composé with être: il est venu",
      answerOptions: [
        { text: "Il est venu seul.", rationale: "Option A", isCorrect: true },
        { text: "Il a venu seul.", rationale: "Option B", isCorrect: false },
        { text: "Il venait seul.", rationale: "Option C", isCorrect: false },
        { text: "Il est venus seul.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) came / have come to the party.",
      hint: "Use passé composé with être: elles sont venues",
      answerOptions: [
        { text: "Elles sont venues à la fête.", rationale: "Option A", isCorrect: true },
        { text: "Elles ont venues à la fête.", rationale: "Option B", isCorrect: false },
        { text: "Elles venaient à la fête.", rationale: "Option C", isCorrect: false },
        { text: "Elles sont venu à la fête.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We did not come / have not come to disturb.",
      hint: "Use passé composé negative with être: nous ne sommes pas venus",
      answerOptions: [
        { text: "Nous ne sommes pas venus pour déranger.", rationale: "Option A", isCorrect: true },
        { text: "Nous n'avons pas venus pour déranger.", rationale: "Option B", isCorrect: false },
        { text: "Nous ne venions pas pour déranger.", rationale: "Option C", isCorrect: false },
        { text: "Nous ne sommes pas venu pour déranger.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She did not come / has not come yesterday.",
      hint: "Use passé composé negative with être: elle n'est pas venue",
      answerOptions: [
        { text: "Elle ne venait pas hier.", rationale: "Option A", isCorrect: false },
        { text: "Elle n'est pas venue hier.", rationale: "Option B", isCorrect: true },
        { text: "Elle n'a pas venue hier.", rationale: "Option C", isCorrect: false },
        { text: "Elle n'est pas venu hier.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) came / have come to my house.",
      hint: "Use passé composé with être: tu es venu",
      answerOptions: [
        { text: "Tu as venu chez moi.", rationale: "Option A", isCorrect: false },
        { text: "Tu es venu chez moi.", rationale: "Option B", isCorrect: true },
        { text: "Tu venais chez moi.", rationale: "Option C", isCorrect: false },
        { text: "Tu es venus chez moi.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Did you (formal) come / Have you come by car?",
      hint: "Use passé composé interrogative with être: êtes-vous venus",
      answerOptions: [
        { text: "Avez-vous venu en voiture ?", rationale: "Option A", isCorrect: false },
        { text: "Êtes-vous venus en voiture ?", rationale: "Option B", isCorrect: true },
        { text: "Veniez-vous en voiture ?", rationale: "Option C", isCorrect: false },
        { text: "Êtes-vous venu en voiture ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) did not come / have not come.",
      hint: "Use passé composé negative with être: ils ne sont pas venus",
      answerOptions: [
        { text: "Ils n'ont pas venus.", rationale: "Option A", isCorrect: false },
        { text: "Ils ne sont pas venus.", rationale: "Option B", isCorrect: true },
        { text: "Ils ne venaient pas.", rationale: "Option C", isCorrect: false },
        { text: "Ils ne sont pas venu.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We came / have come on foot.",
      hint: "Use passé composé with être: nous sommes venus",
      answerOptions: [
        { text: "Nous avons venus à pied.", rationale: "Option A", isCorrect: false },
        { text: "Nous sommes venus à pied.", rationale: "Option B", isCorrect: true },
        { text: "Nous venions à pied.", rationale: "Option C", isCorrect: false },
        { text: "Nous sommes venu à pied.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Why did he come / has he come so late?",
      hint: "Use passé composé interrogative with être: pourquoi est-il venu",
      answerOptions: [
        { text: "Pourquoi a-t-il venu si tard ?", rationale: "Option A", isCorrect: false },
        { text: "Pourquoi venait-il si tard ?", rationale: "Option B", isCorrect: false },
        { text: "Pourquoi est-il venu si tard ?", rationale: "Option C", isCorrect: true },
        { text: "Pourquoi est-il venus si tard ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Why did you (informal) come / have you come?",
      hint: "Use passé composé interrogative with être: pourquoi es-tu venu",
      answerOptions: [
        { text: "Pourquoi as-tu venu ?", rationale: "Option A", isCorrect: false },
        { text: "Pourquoi venais-tu ?", rationale: "Option B", isCorrect: false },
        { text: "Pourquoi es-tu venu ?", rationale: "Option C", isCorrect: true },
        { text: "Pourquoi es-tu venus ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "When did they (female) come / have they come?",
      hint: "Use passé composé interrogative with être: quand sont-elles venues",
      answerOptions: [
        { text: "Quand ont-elles venues ?", rationale: "Option A", isCorrect: false },
        { text: "Quand venaient-elles ?", rationale: "Option B", isCorrect: false },
        { text: "Quand sont-elles venues ?", rationale: "Option C", isCorrect: true },
        { text: "Quand sont-elles venu ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She came / has come back from her trip.",
      hint: "Use passé composé with être: elle est revenue",
      answerOptions: [
        { text: "Elle a revenue de son voyage.", rationale: "Option A", isCorrect: false },
        { text: "Elle venait de son voyage.", rationale: "Option B", isCorrect: false },
        { text: "Elle est revenue de son voyage.", rationale: "Option C", isCorrect: true },
        { text: "Elle est revenu de son voyage.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He did not come / has not come with his friends.",
      hint: "Use passé composé negative with être: il n'est pas venu",
      answerOptions: [
        { text: "Il n'a pas venu avec ses amis.", rationale: "Option A", isCorrect: false },
        { text: "Il ne venait pas avec ses amis.", rationale: "Option B", isCorrect: false },
        { text: "Il n'est pas venus avec ses amis.", rationale: "Option C", isCorrect: false },
        { text: "Il n'est pas venu avec ses amis.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "They (female) did not come / have not come to the cinema.",
      hint: "Use passé composé negative with être: elles ne sont pas venues",
      answerOptions: [
        { text: "Elles n'ont pas venues au cinéma.", rationale: "Option A", isCorrect: false },
        { text: "Elles ne venaient pas au cinéma.", rationale: "Option B", isCorrect: false },
        { text: "Elles ne sont pas venu au cinéma.", rationale: "Option C", isCorrect: false },
        { text: "Elles ne sont pas venues au cinéma.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "We did not come / have not come for nothing.",
      hint: "Use passé composé negative with être: nous ne sommes pas venus",
      answerOptions: [
        { text: "Nous n'avons pas venus pour rien.", rationale: "Option A", isCorrect: false },
        { text: "Nous ne venions pas pour rien.", rationale: "Option B", isCorrect: false },
        { text: "Nous ne sommes pas venu pour rien.", rationale: "Option C", isCorrect: false },
        { text: "Nous ne sommes pas venus pour rien.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "I did not come / have not come to bother you.",
      hint: "Use passé composé negative with être: je ne suis pas venu",
      answerOptions: [
        { text: "Je n'ai pas venu te déranger.", rationale: "Option A", isCorrect: false },
        { text: "Je ne venais pas te déranger.", rationale: "Option B", isCorrect: false },
        { text: "Je ne suis pas venus te déranger.", rationale: "Option C", isCorrect: false },
        { text: "Je ne suis pas venu te déranger.", rationale: "Option D", isCorrect: true }
      ]
    }
  ],
  "vouloir": [
    {
      question: "She wanted / has wanted to leave.",
      hint: "Use passé composé with avoir: elle a voulu",
      answerOptions: [
        { text: "Elle a voulu partir.", rationale: "Option A", isCorrect: true },
        { text: "Elle est voulue partir.", rationale: "Option B", isCorrect: false },
        { text: "Elle a voulue partir.", rationale: "Option C", isCorrect: false },
        { text: "Elle voulait partir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) did not want / have not wanted to listen.",
      hint: "Use passé composé negative with avoir: elles n'ont pas voulu",
      answerOptions: [
        { text: "Elles n'ont pas voulu écouter.", rationale: "Option A", isCorrect: true },
        { text: "Elles ne sont pas voulues écouter.", rationale: "Option B", isCorrect: false },
        { text: "Elles n'ont pas voulues écouter.", rationale: "Option C", isCorrect: false },
        { text: "Elles ne voulaient pas écouter.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We wanted / have wanted to see you.",
      hint: "Use passé composé with avoir: nous avons voulu",
      answerOptions: [
        { text: "Nous avons voulu te voir.", rationale: "Option A", isCorrect: true },
        { text: "Nous avons voulus te voir.", rationale: "Option B", isCorrect: false },
        { text: "Nous sommes voulus te voir.", rationale: "Option C", isCorrect: false },
        { text: "Nous voulions te voir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Did they (male/mixed) want / have they wanted to help?",
      hint: "Use passé composé interrogative with avoir: ont-ils voulu",
      answerOptions: [
        { text: "Ont-ils voulus aider ?", rationale: "Option A", isCorrect: false },
        { text: "Voulaient-ils aider ?", rationale: "Option B", isCorrect: false },
        { text: "Ont-ils voulu aider ?", rationale: "Option C", isCorrect: true },
        { text: "Sont-ils voulu aider ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I wanted / have wanted to call you.",
      hint: "Use passé composé with avoir: j'ai voulu",
      answerOptions: [
        { text: "J'ai voulu t'appeler.", rationale: "Option A", isCorrect: true },
        { text: "J'ai voulus t'appeler.", rationale: "Option B", isCorrect: false },
        { text: "Je suis voulu t'appeler.", rationale: "Option C", isCorrect: false },
        { text: "Je voulais t'appeler.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) wanted / have wanted a dog.",
      hint: "Use passé composé with avoir: tu as voulu",
      answerOptions: [
        { text: "Tu as voulu un chien.", rationale: "Option A", isCorrect: true },
        { text: "Tu es voulu un chien.", rationale: "Option B", isCorrect: false },
        { text: "Tu as voulus un chien.", rationale: "Option C", isCorrect: false },
        { text: "Tu voulais un chien.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He did not want / has not wanted to say anything.",
      hint: "Use passé composé negative with avoir: il n'a rien voulu dire",
      answerOptions: [
        { text: "Il n'a rien voulu dire.", rationale: "Option A", isCorrect: true },
        { text: "Il n'a pas voulu rien dire.", rationale: "Option B", isCorrect: false },
        { text: "Il ne voulait rien dire.", rationale: "Option C", isCorrect: false },
        { text: "Il n'est rien voulu dire.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) wanted / have wanted to speak.",
      hint: "Use passé composé with avoir: vous avez voulu",
      answerOptions: [
        { text: "Vous avez voulus parler.", rationale: "Option A", isCorrect: false },
        { text: "Vous vouliez parler.", rationale: "Option B", isCorrect: false },
        { text: "Vous avez voulu parler.", rationale: "Option C", isCorrect: true },
        { text: "Vous êtes voulu parler.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He wanted / has wanted to travel.",
      hint: "Use passé composé with avoir: il a voulu",
      answerOptions: [
        { text: "Il a voulu voyager.", rationale: "Option A", isCorrect: true },
        { text: "Il est voulu voyager.", rationale: "Option B", isCorrect: false },
        { text: "Il a voulus voyager.", rationale: "Option C", isCorrect: false },
        { text: "Il voulait voyager.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Why did she not want / has she not wanted to come?",
      hint: "Use passé composé interrogative negative with avoir: pourquoi n'a-t-elle pas voulu",
      answerOptions: [
        { text: "Pourquoi n'a-t-elle pas voulu venir ?", rationale: "Option A", isCorrect: true },
        { text: "Pourquoi n'est-elle pas voulue venir ?", rationale: "Option B", isCorrect: false },
        { text: "Pourquoi ne voulait-elle pas venir ?", rationale: "Option C", isCorrect: false },
        { text: "Pourquoi n'a-t-elle pas voulue venir ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I did not want / have not wanted that.",
      hint: "Use passé composé negative with avoir: je n'ai pas voulu",
      answerOptions: [
        { text: "Je n'ai pas voulu cela.", rationale: "Option A", isCorrect: true },
        { text: "Je n'ai pas voulus cela.", rationale: "Option B", isCorrect: false },
        { text: "Je ne suis pas voulu cela.", rationale: "Option C", isCorrect: false },
        { text: "Je ne voulais pas cela.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) wanted / have wanted to change.",
      hint: "Use passé composé with avoir: ils ont voulu",
      answerOptions: [
        { text: "Ils voulaient changer.", rationale: "Option A", isCorrect: false },
        { text: "Ils ont voulu changer.", rationale: "Option B", isCorrect: true },
        { text: "Ils sont voulus changer.", rationale: "Option C", isCorrect: false },
        { text: "Ils ont voulus changer.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She never wanted / has never wanted to get married.",
      hint: "Use passé composé negative with avoir: elle n'a jamais voulu",
      answerOptions: [
        { text: "Elle n'a jamais voulue se marier.", rationale: "Option A", isCorrect: false },
        { text: "Elle n'a jamais voulu se marier.", rationale: "Option B", isCorrect: true },
        { text: "Elle ne voulait jamais se marier.", rationale: "Option C", isCorrect: false },
        { text: "Elle n'est jamais voulue se marier.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We didn't want / haven't wanted to bother you.",
      hint: "Use passé composé negative with avoir: nous n'avons pas voulu",
      answerOptions: [
        { text: "Nous n'avons pas voulus vous déranger.", rationale: "Option A", isCorrect: false },
        { text: "Nous ne voulions pas vous déranger.", rationale: "Option B", isCorrect: false },
        { text: "Nous ne sommes pas voulus vous déranger.", rationale: "Option C", isCorrect: false },
        { text: "Nous n'avons pas voulu vous déranger.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "You (informal) didn't want / haven't wanted to believe me.",
      hint: "Use passé composé negative with avoir: tu n'as pas voulu",
      answerOptions: [
        { text: "Tu n'as pas voulus me croire.", rationale: "Option A", isCorrect: false },
        { text: "Tu ne voulais pas me croire.", rationale: "Option B", isCorrect: false },
        { text: "Tu ne m'as pas voulu croire.", rationale: "Option C", isCorrect: false },
        { text: "Tu n'as pas voulu me croire.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "Did you (formal) want / Have you wanted to eat?",
      hint: "Use passé composé interrogative with avoir: avez-vous voulu",
      answerOptions: [
        { text: "Avez-vous voulus manger ?", rationale: "Option A", isCorrect: false },
        { text: "Vouliez-vous manger ?", rationale: "Option B", isCorrect: false },
        { text: "Avez-vous voulu manger ?", rationale: "Option C", isCorrect: true },
        { text: "Êtes-vous voulu manger ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) wanted / have wanted to stay.",
      hint: "Use passé composé with avoir: elles ont voulu",
      answerOptions: [
        { text: "Elles ont voulues rester.", rationale: "Option A", isCorrect: false },
        { text: "Elles voulaient rester.", rationale: "Option B", isCorrect: false },
        { text: "Elles sont voulues rester.", rationale: "Option C", isCorrect: false },
        { text: "Elles ont voulu rester.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "We wanted / have wanted to buy a house.",
      hint: "Use passé composé with avoir: nous avons voulu",
      answerOptions: [
        { text: "Nous voulions acheter une maison.", rationale: "Option A", isCorrect: false },
        { text: "Nous avons voulu acheter une maison.", rationale: "Option B", isCorrect: true },
        { text: "Nous sommes voulus acheter une maison.", rationale: "Option C", isCorrect: false },
        { text: "Nous avons voulus acheter une maison.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) always wanted / have always wanted this.",
      hint: "Use passé composé with avoir: tu as toujours voulu",
      answerOptions: [
        { text: "Tu as toujours voulu ça.", rationale: "Option A", isCorrect: true },
        { text: "Tu as toujours voulus ça.", rationale: "Option B", isCorrect: false },
        { text: "Tu voulais toujours ça.", rationale: "Option C", isCorrect: false },
        { text: "Tu es toujours voulu ça.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "What did you (informal) want / have you wanted to do?",
      hint: "Use passé composé interrogative with avoir: qu'as-tu voulu",
      answerOptions: [
        { text: "Qu'as-tu voulus faire ?", rationale: "Option A", isCorrect: false },
        { text: "Que voulais-tu faire ?", rationale: "Option B", isCorrect: false },
        { text: "Qu'as-tu voulu faire ?", rationale: "Option C", isCorrect: true },
        { text: "Qu'es-tu voulu faire ?", rationale: "Option D", isCorrect: false }
      ]
    }
  ]
};

// Elementary Level Future Simple Quiz Data  
export const ELEMENTARY_FUTURE_SIMPLE_QUESTIONS: Record<string, ElementaryQuizQuestion[]> = {
  "besoin": [
    // Positive statements
    {
      question: "I will need a book / I am going to need a book",
      hint: "Use future simple of 'avoir besoin de' with je and un livre",
      answerOptions: [
        { text: "Tu auras besoin d'un livre", rationale: "Wrong person - this is 'you will need', not 'I will need'.", isCorrect: false },
        { text: "J'aurai besoin d'un livre", rationale: "Correct! 'J'aurai besoin d'un livre' means 'I will need a book' in future simple.", isCorrect: true },
        { text: "Il aura besoin d'un livre", rationale: "Wrong person - this is 'he will need', not 'I will need'.", isCorrect: false },
        { text: "Nous aurons besoin d'un livre", rationale: "Wrong person - this is 'we will need', not 'I will need'.", isCorrect: false }
      ]
    },
    {
      question: "You will need a problem / You are going to need a problem (informal)",
      hint: "Use future simple of 'avoir besoin de' with tu (informal)",
      answerOptions: [
        { text: "J'aurai besoin d'un problème", rationale: "Wrong person - this is 'I will need', not 'you will need'.", isCorrect: false },
        { text: "Vous aurez besoin d'un problème", rationale: "Wrong formality - this is formal 'you', question asks for informal.", isCorrect: false },
        { text: "Ils auront besoin d'un problème", rationale: "Wrong person - this is 'they will need', not 'you will need'.", isCorrect: false },
        { text: "Tu auras besoin d'un problème", rationale: "Correct! 'Tu auras besoin d'un problème' means 'you will need a problem' (informal).", isCorrect: true }
      ]
    },
    {
      question: "He will need help / He is going to need help",
      hint: "Use future simple of 'avoir besoin de' with il and aide",
      answerOptions: [
        { text: "Elle aura besoin d'aide", rationale: "Wrong gender - this is 'she will need', not 'he will need'.", isCorrect: false },
        { text: "Tu auras besoin d'aide", rationale: "Wrong person - this is 'you will need', not 'he will need'.", isCorrect: false },
        { text: "Il aura besoin d'aide", rationale: "Correct! 'Il aura besoin d'aide' means 'he will need help'.", isCorrect: true },
        { text: "Ils auront besoin d'aide", rationale: "Wrong person - this is 'they will need', not 'he will need'.", isCorrect: false }
      ]
    },
    {
      question: "She will need rest / She is going to need rest",
      hint: "Use future simple of 'avoir besoin de' with elle and repos",
      answerOptions: [
        { text: "Il aura besoin de repos", rationale: "Wrong gender - this is 'he will need', not 'she will need'.", isCorrect: false },
        { text: "Elles auront besoin de repos", rationale: "Wrong number - this is 'they will need' (feminine plural), not 'she will need'.", isCorrect: false },
        { text: "Tu auras besoin de repos", rationale: "Wrong person - this is 'you will need', not 'she will need'.", isCorrect: false },
        { text: "Elle aura besoin de repos", rationale: "Correct! 'Elle aura besoin de repos' means 'she will need rest'.", isCorrect: true }
      ]
    },
    {
      question: "We will need water / We are going to need water",
      hint: "Use future simple of 'avoir besoin de' with nous and eau",
      answerOptions: [
        { text: "Nous aurons besoin d'eau", rationale: "Correct! 'Nous aurons besoin d'eau' means 'we will need water'.", isCorrect: true },
        { text: "Vous aurez besoin d'eau", rationale: "Wrong person - this is 'you will need', not 'we will need'.", isCorrect: false },
        { text: "Ils auront besoin d'eau", rationale: "Wrong person - this is 'they will need', not 'we will need'.", isCorrect: false },
        { text: "J'aurai besoin d'eau", rationale: "Wrong person - this is 'I will need', not 'we will need'.", isCorrect: false }
      ]
    },
    {
      question: "You will need to eat / You are going to need to eat (formal / plural)",
      hint: "Use future simple of 'avoir besoin de' with vous (formal/plural)",
      answerOptions: [
        { text: "Tu auras besoin de manger", rationale: "Wrong formality - this is informal 'you', question asks for formal/plural.", isCorrect: false },
        { text: "Vous aurez besoin de manger", rationale: "Correct! 'Vous aurez besoin de manger' means 'you will need to eat' (formal/plural).", isCorrect: true },
        { text: "Nous aurons besoin de manger", rationale: "Wrong person - this is 'we will need', not 'you will need'.", isCorrect: false },
        { text: "Ils auront besoin de manger", rationale: "Wrong person - this is 'they will need', not 'you will need'.", isCorrect: false }
      ]
    },
    {
      question: "They will need to go (male / mixed)",
      hint: "Use future simple of 'avoir besoin de' with ils and aller",
      answerOptions: [
        { text: "Elles auront besoin d'aller", rationale: "Wrong gender - this is feminine 'they', question specifies masculine/mixed.", isCorrect: false },
        { text: "Ils avaient besoin d'aller", rationale: "Wrong tense - this is imperfect past, not future simple.", isCorrect: false },
        { text: "Ils auront besoin d'aller", rationale: "Correct! 'Ils auront besoin d'aller' means 'they will need to go' (masculine/mixed).", isCorrect: true },
        { text: "Ils ont eu besoin d'aller", rationale: "Wrong tense - this is passé composé, not future simple.", isCorrect: false }
      ]
    },
    {
      question: "They will need to sleep (female)",
      hint: "Use future simple of 'avoir besoin de' with elles and dormir",
      answerOptions: [
        { text: "Ils auront besoin de dormir", rationale: "Wrong gender - this is masculine 'they', question specifies feminine.", isCorrect: false },
        { text: "Elles avaient besoin de dormir", rationale: "Wrong tense - this is imperfect past, not future simple.", isCorrect: false },
        { text: "Elles ont eu besoin de dormir", rationale: "Wrong tense - this is passé composé, not future simple.", isCorrect: false },
        { text: "Elles auront besoin de dormir", rationale: "Correct! 'Elles auront besoin de dormir' means 'they will need to sleep' (feminine).", isCorrect: true }
      ]
    },
    // Negative statements
    {
      question: "I will not need a book / I am not going to need a book",
      hint: "Use negative future simple 'ne...pas' with avoir besoin de",
      answerOptions: [
        { text: "Tu n'auras pas besoin d'un livre", rationale: "Wrong person - this is 'you won't need', not 'I won't need'.", isCorrect: false },
        { text: "Je n'aurai pas besoin d'un livre", rationale: "Correct! 'Je n'aurai pas besoin d'un livre' means 'I will not need a book'.", isCorrect: true },
        { text: "Il n'aura pas besoin d'un livre", rationale: "Wrong person - this is 'he won't need', not 'I won't need'.", isCorrect: false },
        { text: "Nous n'aurons pas besoin d'un livre", rationale: "Wrong person - this is 'we won't need', not 'I won't need'.", isCorrect: false }
      ]
    },
    {
      question: "You will not need a problem / You are not going to need a problem (informal)",
      hint: "Use negative future simple with tu (informal)",
      answerOptions: [
        { text: "Je n'aurai pas besoin d'un problème", rationale: "Wrong person - this is 'I won't need', not 'you won't need'.", isCorrect: false },
        { text: "Vous n'aurez pas besoin d'un problème", rationale: "Wrong formality - this is formal 'you', question asks for informal.", isCorrect: false },
        { text: "Ils n'auront pas besoin d'un problème", rationale: "Wrong person - this is 'they won't need', not 'you won't need'.", isCorrect: false },
        { text: "Tu n'auras pas besoin d'un problème", rationale: "Correct! 'Tu n'auras pas besoin d'un problème' means 'you won't need a problem' (informal).", isCorrect: true }
      ]
    },
    {
      question: "He will not need help / He is not going to need help",
      hint: "Use negative future simple with il",
      answerOptions: [
        { text: "Elle n'aura pas besoin d'aide", rationale: "Wrong gender - this is 'she won't need', not 'he won't need'.", isCorrect: false },
        { text: "Tu n'auras pas besoin d'aide", rationale: "Wrong person - this is 'you won't need', not 'he won't need'.", isCorrect: false },
        { text: "Il n'aura pas besoin d'aide", rationale: "Correct! 'Il n'aura pas besoin d'aide' means 'he will not need help'.", isCorrect: true },
        { text: "Ils n'auront pas besoin d'aide", rationale: "Wrong person - this is 'they won't need', not 'he won't need'.", isCorrect: false }
      ]
    },
    {
      question: "She will not need rest / She is not going to need rest",
      hint: "Use negative future simple with elle",
      answerOptions: [
        { text: "Il n'aura pas besoin de repos", rationale: "Wrong gender - this is 'he won't need', not 'she won't need'.", isCorrect: false },
        { text: "Elles n'auront pas besoin de repos", rationale: "Wrong number - this is 'they won't need' (feminine plural), not 'she won't need'.", isCorrect: false },
        { text: "Tu n'auras pas besoin de repos", rationale: "Wrong person - this is 'you won't need', not 'she won't need'.", isCorrect: false },
        { text: "Elle n'aura pas besoin de repos", rationale: "Correct! 'Elle n'aura pas besoin de repos' means 'she will not need rest'.", isCorrect: true }
      ]
    },
    {
      question: "We will not need water / We are not going to need water",
      hint: "Use negative future simple with nous",
      answerOptions: [
        { text: "Vous n'aurez pas besoin d'eau", rationale: "Wrong person - this is 'you won't need', not 'we won't need'.", isCorrect: false },
        { text: "Nous n'aurons pas besoin d'eau", rationale: "Correct! 'Nous n'aurons pas besoin d'eau' means 'we will not need water'.", isCorrect: true },
        { text: "Ils n'auront pas besoin d'eau", rationale: "Wrong person - this is 'they won't need', not 'we won't need'.", isCorrect: false },
        { text: "Je n'aurai pas besoin d'eau", rationale: "Wrong person - this is 'I won't need', not 'we won't need'.", isCorrect: false }
      ]
    },
    {
      question: "You will not need to eat / You are not going to need to eat (formal / plural)",
      hint: "Use negative future simple with vous (formal/plural)",
      answerOptions: [
        { text: "Tu n'auras pas besoin de manger", rationale: "Wrong formality - this is informal 'you', question asks for formal/plural.", isCorrect: false },
        { text: "Nous n'aurons pas besoin de manger", rationale: "Wrong person - this is 'we won't need', not 'you won't need'.", isCorrect: false },
        { text: "Vous n'aurez pas besoin de manger", rationale: "Correct! 'Vous n'aurez pas besoin de manger' means 'you will not need to eat' (formal/plural).", isCorrect: true },
        { text: "Ils n'auront pas besoin de manger", rationale: "Wrong person - this is 'they won't need', not 'you won't need'.", isCorrect: false }
      ]
    },
    // Positive questions
    {
      question: "Will I need a book? / Am I going to need a book?",
      hint: "Use interrogative future simple with inversion: Aurai-je",
      answerOptions: [
        { text: "Auras-tu besoin d'un livre ?", rationale: "Wrong person - this is 'Will you need?', not 'Will I need?'.", isCorrect: false },
        { text: "Aurai-je besoin d'un livre ?", rationale: "Correct! 'Aurai-je besoin d'un livre ?' means 'Will I need a book?' in future simple.", isCorrect: true },
        { text: "Aura-t-il besoin d'un livre ?", rationale: "Wrong person - this is 'Will he need?', not 'Will I need?'.", isCorrect: false },
        { text: "Aurons-nous besoin d'un livre ?", rationale: "Wrong person - this is 'Will we need?', not 'Will I need?'.", isCorrect: false }
      ]
    },
    {
      question: "Will you need a problem? / Are you going to need a problem? (informal)",
      hint: "Use interrogative future simple with inversion: Auras-tu",
      answerOptions: [
        { text: "Aurai-je besoin d'un problème ?", rationale: "Wrong person - this is 'Will I need?', not 'Will you need?'.", isCorrect: false },
        { text: "Aura-t-il besoin d'un problème ?", rationale: "Wrong person - this is 'Will he need?', not 'Will you need?'.", isCorrect: false },
        { text: "Aurez-vous besoin d'un problème ?", rationale: "Wrong formality - this is formal 'you', question asks for informal.", isCorrect: false },
        { text: "Auras-tu besoin d'un problème ?", rationale: "Correct! 'Auras-tu besoin d'un problème ?' means 'Will you need a problem?' (informal).", isCorrect: true }
      ]
    },
    {
      question: "Will he need help? / Is he going to need help?",
      hint: "Use interrogative future simple with inversion: Aura-t-il",
      answerOptions: [
        { text: "Aura-t-elle besoin d'aide ?", rationale: "Wrong gender - this is 'Will she need?', not 'Will he need?'.", isCorrect: false },
        { text: "Aurai-je besoin d'aide ?", rationale: "Wrong person - this is 'Will I need?', not 'Will he need?'.", isCorrect: false },
        { text: "Aura-t-il besoin d'aide ?", rationale: "Correct! 'Aura-t-il besoin d'aide ?' means 'Will he need help?'.", isCorrect: true },
        { text: "Auras-tu besoin d'aide ?", rationale: "Wrong person - this is 'Will you need?', not 'Will he need?'.", isCorrect: false }
      ]
    },
    // Negative questions
    {
      question: "Won't I need a book? / Am I not going to need a book?",
      hint: "Use negative interrogative future simple: N'aurai-je pas",
      answerOptions: [
        { text: "N'auras-tu pas besoin d'un livre ?", rationale: "Wrong person - this is 'Won't you need?', not 'Won't I need?'.", isCorrect: false },
        { text: "N'aurai-je pas besoin d'un livre ?", rationale: "Correct! 'N'aurai-je pas besoin d'un livre ?' means 'Won't I need a book?'.", isCorrect: true },
        { text: "N'aura-t-il pas besoin d'un livre ?", rationale: "Wrong person - this is 'Won't he need?', not 'Won't I need?'.", isCorrect: false },
        { text: "N'aurons-nous pas besoin d'un livre ?", rationale: "Wrong person - this is 'Won't we need?', not 'Won't I need?'.", isCorrect: false }
      ]
    },
    {
      question: "Won't you need a problem? / Are you not going to need a problem? (informal)",
      hint: "Use negative interrogative future simple: N'auras-tu pas",
      answerOptions: [
        { text: "N'aurai-je pas besoin d'un problème ?", rationale: "Wrong person - this is 'Won't I need?', not 'Won't you need?'.", isCorrect: false },
        { text: "N'aura-t-il pas besoin d'un problème ?", rationale: "Wrong person - this is 'Won't he need?', not 'Won't you need?'.", isCorrect: false },
        { text: "N'aurez-vous pas besoin d'un problème ?", rationale: "Wrong formality - this is formal 'you', question asks for informal.", isCorrect: false },
        { text: "N'auras-tu pas besoin d'un problème ?", rationale: "Correct! 'N'auras-tu pas besoin d'un problème ?' means 'Won't you need a problem?' (informal).", isCorrect: true }
      ]
    },
    {
      question: "Won't he need help? / Isn't he going to need help?",
      hint: "Use negative interrogative future simple: N'aura-t-il pas",
      answerOptions: [
        { text: "N'aura-t-elle pas besoin d'aide ?", rationale: "Wrong gender - this is 'Won't she need?', not 'Won't he need?'.", isCorrect: false },
        { text: "N'aurai-je pas besoin d'aide ?", rationale: "Wrong person - this is 'Won't I need?', not 'Won't he need?'.", isCorrect: false },
        { text: "N'auras-tu pas besoin d'aide ?", rationale: "Wrong person - this is 'Won't you need?', not 'Won't he need?'.", isCorrect: false },
        { text: "N'aura-t-il pas besoin d'aide ?", rationale: "Correct! 'N'aura-t-il pas besoin d'aide ?' means 'Won't he need help?'.", isCorrect: true }
      ]
    }
  ],
  "dire": [
    {
      question: "I will say / am going to say the truth.",
      hint: "Use future simple of dire: je dirai",
      answerOptions: [
        { text: "Je dirai la vérité.", rationale: "Option A", isCorrect: true },
        { text: "Je dira la vérité.", rationale: "Option B", isCorrect: false },
        { text: "Je diront la vérité.", rationale: "Option C", isCorrect: false },
        { text: "Je diras la vérité.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) will say / are going to say that soon.",
      hint: "Use future simple of dire: tu diras",
      answerOptions: [
        { text: "Tu diras ça bientôt.", rationale: "Option A", isCorrect: false },
        { text: "Tu dirai ça bientôt.", rationale: "Option B", isCorrect: false },
        { text: "Tu direz ça bientôt.", rationale: "Option C", isCorrect: false },
        { text: "Tu diront ça bientôt.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "He will say / is going to say something important.",
      hint: "Use future simple of dire: il dira",
      answerOptions: [
        { text: "Il dira quelque chose d'important.", rationale: "Option A", isCorrect: false },
        { text: "Il diras quelque chose d'important.", rationale: "Option B", isCorrect: true },
        { text: "Il dirai quelque chose d'important.", rationale: "Option C", isCorrect: false },
        { text: "Il diront quelque chose d'important.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We will say / are going to say hello.",
      hint: "Use future simple of dire: nous dirons",
      answerOptions: [
        { text: "Nous dirons bonjour.", rationale: "Option A", isCorrect: false },
        { text: "Nous diras bonjour.", rationale: "Option B", isCorrect: false },
        { text: "Nous direz bonjour.", rationale: "Option C", isCorrect: true },
        { text: "Nous diront bonjour.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal/plural) will say / are going to say the same thing.",
      hint: "Use future simple of dire: vous direz",
      answerOptions: [
        { text: "Vous direz la même chose.", rationale: "Option A", isCorrect: true },
        { text: "Vous diront la même chose.", rationale: "Option B", isCorrect: false },
        { text: "Vous diras la même chose.", rationale: "Option C", isCorrect: false },
        { text: "Vous dirai la même chose.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed group) will say / are going to say nothing.",
      hint: "Use future simple of dire: ils ne diront rien",
      answerOptions: [
        { text: "Ils ne diront rien.", rationale: "Option A", isCorrect: false },
        { text: "Ils ne diras rien.", rationale: "Option B", isCorrect: false },
        { text: "Ils ne dira rien.", rationale: "Option C", isCorrect: false },
        { text: "Ils ne dirai rien.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "They (female) will say / are going to say everything.",
      hint: "Use future simple of dire: elles diront",
      answerOptions: [
        { text: "Elles diront tout.", rationale: "Option A", isCorrect: false },
        { text: "Elles diras tout.", rationale: "Option B", isCorrect: true },
        { text: "Elles dira tout.", rationale: "Option C", isCorrect: false },
        { text: "Elles dirai tout.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I will not say / am not going to say that.",
      hint: "Use future simple of dire: je ne dirai pas",
      answerOptions: [
        { text: "Je ne dirai pas ça.", rationale: "Option A", isCorrect: false },
        { text: "Je ne diras pas ça.", rationale: "Option B", isCorrect: false },
        { text: "Je ne dira pas ça.", rationale: "Option C", isCorrect: true },
        { text: "Je ne diront pas ça.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She will not say / is not going to say anything.",
      hint: "Use future simple of dire: elle ne dira rien",
      answerOptions: [
        { text: "Elle ne dira rien.", rationale: "Option A", isCorrect: true },
        { text: "Elle ne diras rien.", rationale: "Option B", isCorrect: false },
        { text: "Elle ne diront rien.", rationale: "Option C", isCorrect: false },
        { text: "Elle ne dirai rien.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We will not say / are not going to say a word.",
      hint: "Use future simple of dire: nous ne dirons pas",
      answerOptions: [
        { text: "Nous ne dirons pas un mot.", rationale: "Option A", isCorrect: false },
        { text: "Nous ne diras pas un mot.", rationale: "Option B", isCorrect: true },
        { text: "Nous ne dira pas un mot.", rationale: "Option C", isCorrect: false },
        { text: "Nous ne diront pas un mot.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) will not say / are not going to say please.",
      hint: "Use future simple of dire: tu ne diras pas",
      answerOptions: [
        { text: "Tu ne diras pas s'il te plaît.", rationale: "Option A", isCorrect: false },
        { text: "Tu ne dira pas s'il te plaît.", rationale: "Option B", isCorrect: false },
        { text: "Tu ne diront pas s'il te plaît.", rationale: "Option C", isCorrect: false },
        { text: "Tu ne dirai pas s'il te plaît.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "They (male/mixed) will not say / are not going to say the truth.",
      hint: "Use future simple of dire: ils ne diront pas",
      answerOptions: [
        { text: "Ils ne diront pas la vérité.", rationale: "Option A", isCorrect: true },
        { text: "Ils ne diras pas la vérité.", rationale: "Option B", isCorrect: false },
        { text: "Ils ne dira pas la vérité.", rationale: "Option C", isCorrect: false },
        { text: "Ils ne dirai pas la vérité.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal/plural) will not say / are not going to say that.",
      hint: "Use future simple of dire: vous ne direz pas",
      answerOptions: [
        { text: "Vous ne direz pas ça.", rationale: "Option A", isCorrect: false },
        { text: "Vous ne diront pas ça.", rationale: "Option B", isCorrect: false },
        { text: "Vous ne diras pas ça.", rationale: "Option C", isCorrect: true },
        { text: "Vous ne dirai pas ça.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He will say / is going to say something important.",
      hint: "Use future simple of dire: il dira",
      answerOptions: [
        { text: "Il dira quelque chose d'important.", rationale: "Option A", isCorrect: false },
        { text: "Il diras quelque chose d'important.", rationale: "Option B", isCorrect: true },
        { text: "Il dira quelque chose d'important.", rationale: "Option C", isCorrect: false },
        { text: "Il dirai quelque chose d'important.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She will say / is going to say nothing.",
      hint: "Use future simple of dire: elle ne dira rien",
      answerOptions: [
        { text: "Elle ne dira rien.", rationale: "Option A", isCorrect: true },
        { text: "Elle ne diras rien.", rationale: "Option B", isCorrect: false },
        { text: "Elle ne dira rien.", rationale: "Option C", isCorrect: false },
        { text: "Elle ne dirai rien.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We will say / are going to say yes.",
      hint: "Use future simple of dire: nous dirons",
      answerOptions: [
        { text: "Nous dirons oui.", rationale: "Option A", isCorrect: false },
        { text: "Nous diras oui.", rationale: "Option B", isCorrect: false },
        { text: "Nous dira oui.", rationale: "Option C", isCorrect: false },
        { text: "Nous dirai oui.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "You (informal) will say / are going to say a lie.",
      hint: "Use future simple of dire: tu diras",
      answerOptions: [
        { text: "Tu diras un mensonge.", rationale: "Option A", isCorrect: false },
        { text: "Tu dira un mensonge.", rationale: "Option B", isCorrect: true },
        { text: "Tu diront un mensonge.", rationale: "Option C", isCorrect: false },
        { text: "Tu dirai un mensonge.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) will say / are going to say something.",
      hint: "Use future simple of dire: elles diront",
      answerOptions: [
        { text: "Elles diront quelque chose.", rationale: "Option A", isCorrect: true },
        { text: "Elles diras quelque chose.", rationale: "Option B", isCorrect: false },
        { text: "Elles dira quelque chose.", rationale: "Option C", isCorrect: false },
        { text: "Elles dirai quelque chose.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I will say / am going to say it before.",
      hint: "Use future simple of dire: je le dirai",
      answerOptions: [
        { text: "Je le dirai avant.", rationale: "Option A", isCorrect: true },
        { text: "Je le diras avant.", rationale: "Option B", isCorrect: false },
        { text: "Je le dira avant.", rationale: "Option C", isCorrect: false },
        { text: "Je le diront avant.", rationale: "Option D", isCorrect: false }
      ]
    }
  ],
  "savoir": [
    {
      question: "She will know / is going to know the results tomorrow.",
      hint: "Use future simple of savoir: elle saura",
      answerOptions: [
        { text: "Elle saura les résultats demain.", rationale: "Option A", isCorrect: true },
        { text: "Elle sauras les résultats demain.", rationale: "Option B", isCorrect: false },
        { text: "Elle saurez les résultats demain.", rationale: "Option C", isCorrect: false },
        { text: "Elle sauront les résultats demain.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) will know / are going to know the answer soon.",
      hint: "Use future simple of savoir: ils sauront",
      answerOptions: [
        { text: "Ils saura la réponse bientôt.", rationale: "Option A", isCorrect: false },
        { text: "Ils saurez la réponse bientôt.", rationale: "Option B", isCorrect: false },
        { text: "Ils saurons la réponse bientôt.", rationale: "Option C", isCorrect: false },
        { text: "Ils sauront la réponse bientôt.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "I will not know / am not going to know what to do.",
      hint: "Use future simple negative of savoir: je ne saurai pas",
      answerOptions: [
        { text: "Je ne sauras pas quoi faire.", rationale: "Option A", isCorrect: false },
        { text: "Je ne saurai pas quoi faire.", rationale: "Option B", isCorrect: true },
        { text: "Je ne saura pas quoi faire.", rationale: "Option C", isCorrect: false },
        { text: "Je ne saurons pas quoi faire.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We will know / are going to know how to respond.",
      hint: "Use future simple of savoir: nous saurons",
      answerOptions: [
        { text: "Nous saurons comment répondre.", rationale: "Option A", isCorrect: true },
        { text: "Nous saurez comment répondre.", rationale: "Option B", isCorrect: false },
        { text: "Nous saura comment répondre.", rationale: "Option C", isCorrect: false },
        { text: "Nous sauront comment répondre.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Will you (informal) know / be going to know the way?",
      hint: "Use future simple interrogative: sauras-tu",
      answerOptions: [
        { text: "Sauras-tu le chemin ?", rationale: "Option A", isCorrect: true },
        { text: "Saurez-tu le chemin ?", rationale: "Option B", isCorrect: false },
        { text: "Saurai-tu le chemin ?", rationale: "Option C", isCorrect: false },
        { text: "Saurons-tu le chemin ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) will know / are going to know everything.",
      hint: "Use future simple of savoir: vous saurez",
      answerOptions: [
        { text: "Vous saurons tout.", rationale: "Option A", isCorrect: false },
        { text: "Vous saurez tout.", rationale: "Option B", isCorrect: true },
        { text: "Vous sauras tout.", rationale: "Option C", isCorrect: false },
        { text: "Vous sauront tout.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) will not know / are not going to know the secret.",
      hint: "Use future simple negative of savoir: elles ne sauront pas",
      answerOptions: [
        { text: "Elles ne saurez pas le secret.", rationale: "Option A", isCorrect: false },
        { text: "Elles ne saurons pas le secret.", rationale: "Option B", isCorrect: false },
        { text: "Elles ne sauront pas le secret.", rationale: "Option C", isCorrect: true },
        { text: "Elles ne saura pas le secret.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "One day, he will know / is going to know.",
      hint: "Use future simple of savoir: il saura",
      answerOptions: [
        { text: "Un jour, il saurez.", rationale: "Option A", isCorrect: false },
        { text: "Un jour, il sauras.", rationale: "Option B", isCorrect: false },
        { text: "Un jour, il saura.", rationale: "Option C", isCorrect: true },
        { text: "Un jour, il saurons.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I will know / am going to know the truth.",
      hint: "Use future simple of savoir: je saurai",
      answerOptions: [
        { text: "Je saura la vérité.", rationale: "Option A", isCorrect: false },
        { text: "Je sauras la vérité.", rationale: "Option B", isCorrect: false },
        { text: "Je saurez la vérité.", rationale: "Option C", isCorrect: false },
        { text: "Je saurai la vérité.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "When will we know / are we going to know the date?",
      hint: "Use future simple interrogative: quand saurons-nous",
      answerOptions: [
        { text: "Quand saura-nous la date ?", rationale: "Option A", isCorrect: false },
        { text: "Quand saurez-nous la date ?", rationale: "Option B", isCorrect: false },
        { text: "Quand saurons-nous la date ?", rationale: "Option C", isCorrect: true },
        { text: "Quand sauront-nous la date ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) will know / are going to know how to drive.",
      hint: "Use future simple of savoir: ils sauront",
      answerOptions: [
        { text: "Ils saurons conduire.", rationale: "Option A", isCorrect: false },
        { text: "Ils saurez conduire.", rationale: "Option B", isCorrect: false },
        { text: "Ils sauront conduire.", rationale: "Option C", isCorrect: true },
        { text: "Ils saura conduire.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She will not know / is not going to know my address.",
      hint: "Use future simple negative of savoir: elle ne saura pas",
      answerOptions: [
        { text: "Elle ne saura pas mon adresse.", rationale: "Option A", isCorrect: true },
        { text: "Elle ne saurez pas mon adresse.", rationale: "Option B", isCorrect: false },
        { text: "Elle ne sauras pas mon adresse.", rationale: "Option C", isCorrect: false },
        { text: "Elle ne saurons pas mon adresse.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) will know / are going to know how to swim.",
      hint: "Use future simple of savoir: tu sauras",
      answerOptions: [
        { text: "Tu saurai nager.", rationale: "Option A", isCorrect: false },
        { text: "Tu sauras nager.", rationale: "Option B", isCorrect: true },
        { text: "Tu saura nager.", rationale: "Option C", isCorrect: false },
        { text: "Tu saurez nager.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "How will you (formal) know / are you going to know?",
      hint: "Use future simple interrogative: comment saurez-vous",
      answerOptions: [
        { text: "Comment sauras-vous ?", rationale: "Option A", isCorrect: false },
        { text: "Comment saurons-vous ?", rationale: "Option B", isCorrect: false },
        { text: "Comment saurez-vous ?", rationale: "Option C", isCorrect: true },
        { text: "Comment sauront-vous ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He will not know / is not going to know the answer.",
      hint: "Use future simple negative of savoir: il ne saura pas",
      answerOptions: [
        { text: "Il ne sauras pas la réponse.", rationale: "Option A", isCorrect: false },
        { text: "Il ne saurons pas la réponse.", rationale: "Option B", isCorrect: false },
        { text: "Il ne saura pas la réponse.", rationale: "Option C", isCorrect: true },
        { text: "Il ne saurez pas la réponse.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) will not know / are not going to know the details.",
      hint: "Use future simple negative of savoir: vous ne saurez pas",
      answerOptions: [
        { text: "Vous ne saurez pas les détails.", rationale: "Option A", isCorrect: true },
        { text: "Vous ne saurons pas les détails.", rationale: "Option B", isCorrect: false },
        { text: "Vous ne sauras pas les détails.", rationale: "Option C", isCorrect: false },
        { text: "Vous ne sauront pas les détails.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We will not know / are not going to know the time.",
      hint: "Use future simple negative of savoir: nous ne saurons pas",
      answerOptions: [
        { text: "Nous ne saurez pas l'heure.", rationale: "Option A", isCorrect: false },
        { text: "Nous ne saurons pas l'heure.", rationale: "Option B", isCorrect: true },
        { text: "Nous ne saura pas l'heure.", rationale: "Option C", isCorrect: false },
        { text: "Nous ne sauront pas l'heure.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) will know / are going to know the story.",
      hint: "Use future simple of savoir: elles sauront",
      answerOptions: [
        { text: "Elles saura l'histoire.", rationale: "Option A", isCorrect: false },
        { text: "Elles saurons l'histoire.", rationale: "Option B", isCorrect: false },
        { text: "Elles saurez l'histoire.", rationale: "Option C", isCorrect: false },
        { text: "Elles sauront l'histoire.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "I will know / am going to know how to do it.",
      hint: "Use future simple of savoir: je saurai",
      answerOptions: [
        { text: "Je sauras le faire.", rationale: "Option A", isCorrect: false },
        { text: "Je saura le faire.", rationale: "Option B", isCorrect: false },
        { text: "Je saurons le faire.", rationale: "Option C", isCorrect: false },
        { text: "Je saurai le faire.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "Will he know / Is he going to know that I am here?",
      hint: "Use future simple interrogative: saura-t-il",
      answerOptions: [
        { text: "Saurez-il que je suis là ?", rationale: "Option A", isCorrect: false },
        { text: "Sauras-il que je suis là ?", rationale: "Option B", isCorrect: false },
        { text: "Saurons-il que je suis là ?", rationale: "Option C", isCorrect: false },
        { text: "Saura-t-il que je suis là ?", rationale: "Option D", isCorrect: true }
      ]
    }
  ],
  "voir": [
    {
      question: "She will not see / is not going to see her friends.",
      hint: "Use future simple negative: elle ne verra pas",
      answerOptions: [
        { text: "Elle ne verront pas ses amis.", rationale: "Option A", isCorrect: false },
        { text: "Elle ne verra pas ses amis.", rationale: "Option B", isCorrect: true },
        { text: "Elle ne verras pas ses amis.", rationale: "Option C", isCorrect: false },
        { text: "Elle ne verrez pas ses amis.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Will you (formal) see / Are you going to see the difference?",
      hint: "Use future simple interrogative: verrez-vous",
      answerOptions: [
        { text: "Verrez-vous la différence ?", rationale: "Option A", isCorrect: true },
        { text: "Verrons-vous la différence ?", rationale: "Option B", isCorrect: false },
        { text: "Verra-vous la différence ?", rationale: "Option C", isCorrect: false },
        { text: "Verras-vous la différence ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We will see / are going to see a play.",
      hint: "Use future simple of voir: nous verrons",
      answerOptions: [
        { text: "Nous verrons une pièce de théâtre.", rationale: "Option A", isCorrect: true },
        { text: "Nous verrez une pièce de théâtre.", rationale: "Option B", isCorrect: false },
        { text: "Nous verront une pièce de théâtre.", rationale: "Option C", isCorrect: false },
        { text: "Nous verra une pièce de théâtre.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) will see / are going to see the new exhibition.",
      hint: "Use future simple of voir: elles verront",
      answerOptions: [
        { text: "Elles verrons la nouvelle exposition.", rationale: "Option A", isCorrect: false },
        { text: "Elles verra la nouvelle exposition.", rationale: "Option B", isCorrect: false },
        { text: "Elles verrez la nouvelle exposition.", rationale: "Option C", isCorrect: false },
        { text: "Elles verront la nouvelle exposition.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "You (informal) will see / are going to see for yourself.",
      hint: "Use future simple of voir: tu verras",
      answerOptions: [
        { text: "Tu verrai par toi-même.", rationale: "Option A", isCorrect: false },
        { text: "Tu verras par toi-même.", rationale: "Option B", isCorrect: true },
        { text: "Tu verra par toi-même.", rationale: "Option C", isCorrect: false },
        { text: "Tu verrez par toi-même.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He will see / is going to see you tomorrow.",
      hint: "Use future simple of voir: il te verra",
      answerOptions: [
        { text: "Il te verra demain.", rationale: "Option A", isCorrect: true },
        { text: "Il te verras demain.", rationale: "Option B", isCorrect: false },
        { text: "Il te verrons demain.", rationale: "Option C", isCorrect: false },
        { text: "Il te verrez demain.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) will not see / are not going to see anything.",
      hint: "Use future simple negative: vous ne verrez rien",
      answerOptions: [
        { text: "Vous ne verrez rien.", rationale: "Option A", isCorrect: true },
        { text: "Vous ne verrons rien.", rationale: "Option B", isCorrect: false },
        { text: "Vous ne verras rien.", rationale: "Option C", isCorrect: false },
        { text: "Vous ne verront rien.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I will see / am going to see what I can do.",
      hint: "Use future simple of voir: je verrai",
      answerOptions: [
        { text: "Je verrai ce que je peux faire.", rationale: "Option A", isCorrect: true },
        { text: "Je verras ce que je peux faire.", rationale: "Option B", isCorrect: false },
        { text: "Je verra ce que je peux faire.", rationale: "Option C", isCorrect: false },
        { text: "Je verrons ce que je peux faire.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) will see / are going to see the consequences.",
      hint: "Use future simple of voir: ils verront",
      answerOptions: [
        { text: "Ils verrons les conséquences.", rationale: "Option A", isCorrect: false },
        { text: "Ils verra les conséquences.", rationale: "Option B", isCorrect: false },
        { text: "Ils verront les conséquences.", rationale: "Option C", isCorrect: true },
        { text: "Ils verrez les conséquences.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "When will we see / are we going to see each other?",
      hint: "Use future simple interrogative: nous verrons-nous",
      answerOptions: [
        { text: "Quand nous verrons-nous ?", rationale: "Option A", isCorrect: false },
        { text: "Quand nous verrez-nous ?", rationale: "Option B", isCorrect: false },
        { text: "Quand nous verrons-nous ?", rationale: "Option C", isCorrect: true },
        { text: "Quand nous verront-nous ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I will not see / am not going to see him today.",
      hint: "Use future simple negative: je ne le verrai pas",
      answerOptions: [
        { text: "Je ne le verras pas aujourd'hui.", rationale: "Option A", isCorrect: false },
        { text: "Je ne le verra pas aujourd'hui.", rationale: "Option B", isCorrect: false },
        { text: "Je ne le verrons pas aujourd'hui.", rationale: "Option C", isCorrect: false },
        { text: "Je ne le verrai pas aujourd'hui.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "Will they (female) see / Are they going to see us?",
      hint: "Use future simple interrogative: nous verront-elles",
      answerOptions: [
        { text: "Nous verrons-elles ?", rationale: "Option A", isCorrect: false },
        { text: "Nous verront-elles ?", rationale: "Option B", isCorrect: true },
        { text: "Nous verra-elles ?", rationale: "Option C", isCorrect: false },
        { text: "Nous verrez-elles ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He will not see / is not going to see the problem.",
      hint: "Use future simple negative: il ne verra pas",
      answerOptions: [
        { text: "Il ne verras pas le problème.", rationale: "Option A", isCorrect: false },
        { text: "Il ne verrons pas le problème.", rationale: "Option B", isCorrect: false },
        { text: "Il ne verra pas le problème.", rationale: "Option C", isCorrect: true },
        { text: "Il ne verrez pas le problème.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) will see / are going to see that it's easy.",
      hint: "Use future simple of voir: tu verras",
      answerOptions: [
        { text: "Tu verras que c'est facile.", rationale: "Option A", isCorrect: true },
        { text: "Tu verra que c'est facile.", rationale: "Option B", isCorrect: false },
        { text: "Tu verrez que c'est facile.", rationale: "Option C", isCorrect: false },
        { text: "Tu verrons que c'est facile.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She will see / is going to see the doctor.",
      hint: "Use future simple of voir: elle verra",
      answerOptions: [
        { text: "Elle verras le médecin.", rationale: "Option A", isCorrect: false },
        { text: "Elle verra le médecin.", rationale: "Option B", isCorrect: true },
        { text: "Elle verrons le médecin.", rationale: "Option C", isCorrect: false },
        { text: "Elle verrez le médecin.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I will see / am going to see my family next week.",
      hint: "Use future simple of voir: je verrai",
      answerOptions: [
        { text: "Je verrai ma famille la semaine prochaine.", rationale: "Option A", isCorrect: true },
        { text: "Je verras ma famille la semaine prochaine.", rationale: "Option B", isCorrect: false },
        { text: "Je verra ma famille la semaine prochaine.", rationale: "Option C", isCorrect: false },
        { text: "Je verrons ma famille la semaine prochaine.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) will see / are going to see a big change.",
      hint: "Use future simple of voir: vous verrez",
      answerOptions: [
        { text: "Vous verrons un grand changement.", rationale: "Option A", isCorrect: false },
        { text: "Vous verras un grand changement.", rationale: "Option B", isCorrect: false },
        { text: "Vous verrez un grand changement.", rationale: "Option C", isCorrect: true },
        { text: "Vous verront un grand changement.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We will not see / are not going to see the end of it.",
      hint: "Use future simple negative: nous n'en verrons pas",
      answerOptions: [
        { text: "Nous n'en verrons pas la fin.", rationale: "Option A", isCorrect: true },
        { text: "Nous n'en verrez pas la fin.", rationale: "Option B", isCorrect: false },
        { text: "Nous n'en verront pas la fin.", rationale: "Option C", isCorrect: false },
        { text: "Nous n'en verra pas la fin.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "One day you (informal) will see / are going to see.",
      hint: "Use future simple of voir: tu verras",
      answerOptions: [
        { text: "Un jour tu verra.", rationale: "Option A", isCorrect: false },
        { text: "Un jour tu verrez.", rationale: "Option B", isCorrect: false },
        { text: "Un jour tu verrons.", rationale: "Option C", isCorrect: false },
        { text: "Un jour tu verras.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "They (male/mixed) will not see / are not going to see us.",
      hint: "Use future simple negative: ils ne nous verront pas",
      answerOptions: [
        { text: "Ils ne nous verrons pas.", rationale: "Option A", isCorrect: false },
        { text: "Ils ne nous verrez pas.", rationale: "Option B", isCorrect: false },
        { text: "Ils ne nous verras pas.", rationale: "Option C", isCorrect: false },
        { text: "Ils ne nous verront pas.", rationale: "Option D", isCorrect: true }
      ]
    }
  ],
  "pouvoir": [
    {
      question: "She will be able / is going to be able to come.",
      hint: "Use future simple of pouvoir: elle pourra",
      answerOptions: [
        { text: "Elle pourra venir.", rationale: "Option A", isCorrect: true },
        { text: "Elle pourras venir.", rationale: "Option B", isCorrect: false },
        { text: "Elle pourrez venir.", rationale: "Option C", isCorrect: false },
        { text: "Elle pourront venir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We will be able / are going to be able to see it.",
      hint: "Use future simple of pouvoir: nous pourrons",
      answerOptions: [
        { text: "Nous pourrez le voir.", rationale: "Option A", isCorrect: false },
        { text: "Nous pourrons le voir.", rationale: "Option B", isCorrect: true },
        { text: "Nous pourront le voir.", rationale: "Option C", isCorrect: false },
        { text: "Nous pourra le voir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Will you (formal) be able / Are you going to be able to help?",
      hint: "Use future simple interrogative: pourrez-vous",
      answerOptions: [
        { text: "Pourrez-vous aider ?", rationale: "Option A", isCorrect: true },
        { text: "Pourrons-vous aider ?", rationale: "Option B", isCorrect: false },
        { text: "Pourras-tu aider ?", rationale: "Option C", isCorrect: false },
        { text: "Pourra-t-il aider ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) will not be able / are not going to be able to win.",
      hint: "Use future simple negative: ils ne pourront pas",
      answerOptions: [
        { text: "Ils ne pourra pas gagner.", rationale: "Option A", isCorrect: false },
        { text: "Ils ne pourront pas gagner.", rationale: "Option B", isCorrect: true },
        { text: "Ils ne pourrons pas gagner.", rationale: "Option C", isCorrect: false },
        { text: "Ils ne pourrez pas gagner.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I will not be able / am not going to be able to finish.",
      hint: "Use future simple negative: je ne pourrai pas",
      answerOptions: [
        { text: "Je ne pourrai pas finir.", rationale: "Option A", isCorrect: true },
        { text: "Je ne pourras pas finir.", rationale: "Option B", isCorrect: false },
        { text: "Je ne pourra pas finir.", rationale: "Option C", isCorrect: false },
        { text: "Je ne pourront pas finir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) will be able / are going to be able to do it.",
      hint: "Use future simple of pouvoir: tu pourras",
      answerOptions: [
        { text: "Tu pourra le faire.", rationale: "Option A", isCorrect: false },
        { text: "Tu pourras le faire.", rationale: "Option B", isCorrect: true },
        { text: "Tu pourrai le faire.", rationale: "Option C", isCorrect: false },
        { text: "Tu pourrez le faire.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) will be able / are going to be able to participate.",
      hint: "Use future simple of pouvoir: elles pourront",
      answerOptions: [
        { text: "Elles pourront participer.", rationale: "Option A", isCorrect: true },
        { text: "Elles pourra participer.", rationale: "Option B", isCorrect: false },
        { text: "Elles pourrons participer.", rationale: "Option C", isCorrect: false },
        { text: "Elles pourrez participer.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He will not be able / is not going to be able to come.",
      hint: "Use future simple negative: il ne pourra pas",
      answerOptions: [
        { text: "Il ne pourras pas venir.", rationale: "Option A", isCorrect: false },
        { text: "Il ne pourra pas venir.", rationale: "Option B", isCorrect: true },
        { text: "Il ne pourrons pas venir.", rationale: "Option C", isCorrect: false },
        { text: "Il ne pourront pas venir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "One day, we will be able / are going to be able to travel.",
      hint: "Use future simple of pouvoir: nous pourrons",
      answerOptions: [
        { text: "Un jour, nous pourrez voyager.", rationale: "Option A", isCorrect: false },
        { text: "Un jour, nous pourront voyager.", rationale: "Option B", isCorrect: false },
        { text: "Un jour, nous pourrons voyager.", rationale: "Option C", isCorrect: true },
        { text: "Un jour, nous pourras voyager.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) will not be able / are not going to be able to see him.",
      hint: "Use future simple negative: vous ne pourrez pas",
      answerOptions: [
        { text: "Vous ne pourront pas le voir.", rationale: "Option A", isCorrect: false },
        { text: "Vous ne pourrons pas le voir.", rationale: "Option B", isCorrect: false },
        { text: "Vous ne pourrez pas le voir.", rationale: "Option C", isCorrect: true },
        { text: "Vous ne pourras pas le voir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) will be able / are going to be able to help us.",
      hint: "Use future simple of pouvoir: ils pourront",
      answerOptions: [
        { text: "Ils pourront nous aider.", rationale: "Option A", isCorrect: true },
        { text: "Ils pourra nous aider.", rationale: "Option B", isCorrect: false },
        { text: "Ils pourrons nous aider.", rationale: "Option C", isCorrect: false },
        { text: "Ils pourrez nous aider.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He will be able / is going to be able to explain.",
      hint: "Use future simple of pouvoir: il pourra",
      answerOptions: [
        { text: "Il pourras expliquer.", rationale: "Option A", isCorrect: false },
        { text: "Il pourront expliquer.", rationale: "Option B", isCorrect: false },
        { text: "Il pourra expliquer.", rationale: "Option C", isCorrect: true },
        { text: "Il pourrons expliquer.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I will be able / am going to be able to call you.",
      hint: "Use future simple of pouvoir: je pourrai",
      answerOptions: [
        { text: "Je pourras t'appeler.", rationale: "Option A", isCorrect: false },
        { text: "Je pourra t'appeler.", rationale: "Option B", isCorrect: false },
        { text: "Je pourrai t'appeler.", rationale: "Option C", isCorrect: true },
        { text: "Je pourront t'appeler.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I will be able / am going to be able to succeed.",
      hint: "Use future simple of pouvoir: je pourrai",
      answerOptions: [
        { text: "Je pourras réussir.", rationale: "Option A", isCorrect: false },
        { text: "Je pourra réussir.", rationale: "Option B", isCorrect: false },
        { text: "Je pourrai réussir.", rationale: "Option C", isCorrect: true },
        { text: "Je pourront réussir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) will not be able / are not going to be able to do this.",
      hint: "Use future simple negative: tu ne pourras pas",
      answerOptions: [
        { text: "Tu ne pourras pas faire ça.", rationale: "Option A", isCorrect: true },
        { text: "Tu ne pourra pas faire ça.", rationale: "Option B", isCorrect: false },
        { text: "Tu ne pourrai pas faire ça.", rationale: "Option C", isCorrect: false },
        { text: "Tu ne pourrez pas faire ça.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "When will she be able / is she going to be able to answer?",
      hint: "Use future simple interrogative: quand pourra-t-elle",
      answerOptions: [
        { text: "Quand pourra-t-elle répondre ?", rationale: "Option A", isCorrect: true },
        { text: "Quand pourras-t-elle répondre ?", rationale: "Option B", isCorrect: false },
        { text: "Quand pourront-elles répondre ?", rationale: "Option C", isCorrect: false },
        { text: "Quand pourrons-nous répondre ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) will not be able / are not going to be able to stay.",
      hint: "Use future simple negative: elles ne pourront pas",
      answerOptions: [
        { text: "Elles ne pourront pas rester.", rationale: "Option A", isCorrect: true },
        { text: "Elles ne pourra pas rester.", rationale: "Option B", isCorrect: false },
        { text: "Elles ne pourrons pas rester.", rationale: "Option C", isCorrect: false },
        { text: "Elles ne pourrez pas rester.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We will not be able / are not going to be able to come back.",
      hint: "Use future simple negative: nous ne pourrons pas",
      answerOptions: [
        { text: "Nous ne pourrons pas revenir.", rationale: "Option A", isCorrect: true },
        { text: "Nous ne pourront pas revenir.", rationale: "Option B", isCorrect: false },
        { text: "Nous ne pourrai pas revenir.", rationale: "Option C", isCorrect: false },
        { text: "Nous ne pourrez pas revenir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "When will you (informal) be able / are you going to be able to leave?",
      hint: "Use future simple interrogative: quand pourras-tu",
      answerOptions: [
        { text: "Quand pourras-tu partir ?", rationale: "Option A", isCorrect: true },
        { text: "Quand pourrai-tu partir ?", rationale: "Option B", isCorrect: false },
        { text: "Quand pourra-tu partir ?", rationale: "Option C", isCorrect: false },
        { text: "Quand pourrez-tu partir ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "How will they (male/mixed) be able / are they going to be able to know?",
      hint: "Use future simple interrogative: comment pourront-ils",
      answerOptions: [
        { text: "Comment pourras-ils savoir ?", rationale: "Option A", isCorrect: false },
        { text: "Comment pourront-ils savoir ?", rationale: "Option B", isCorrect: true },
        { text: "Comment pourrez-ils savoir ?", rationale: "Option C", isCorrect: false },
        { text: "Comment pourra-ils savoir ?", rationale: "Option D", isCorrect: false }
      ]
    }
  ],
  "vouloir": [
    {
      question: "She will want / is going to want a new dress.",
      hint: "Use irregular future form: elle voudra",
      answerOptions: [
        { text: "Elle voudra une nouvelle robe.", rationale: "Option A", isCorrect: true },
        { text: "Elle voudras une nouvelle robe.", rationale: "Option B", isCorrect: false },
        { text: "Elle voudrez une nouvelle robe.", rationale: "Option C", isCorrect: false },
        { text: "Elle voudront une nouvelle robe.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I will want / am going to want to leave early.",
      hint: "Use irregular future form: je voudrai",
      answerOptions: [
        { text: "Je voudrai partir tôt.", rationale: "Option A", isCorrect: true },
        { text: "Je voudras partir tôt.", rationale: "Option B", isCorrect: false },
        { text: "Je voudra partir tôt.", rationale: "Option C", isCorrect: false },
        { text: "Je voudrons partir tôt.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We will not want / are not going to want to miss that.",
      hint: "Use irregular future negative: nous ne voudrons pas",
      answerOptions: [
        { text: "Nous ne voudra pas manquer ça.", rationale: "Option A", isCorrect: false },
        { text: "Nous ne voudrez pas manquer ça.", rationale: "Option B", isCorrect: false },
        { text: "Nous ne voudrons pas manquer ça.", rationale: "Option C", isCorrect: true },
        { text: "Nous ne voudront pas manquer ça.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He will not want / is not going to want to come.",
      hint: "Use irregular future negative: il ne voudra pas",
      answerOptions: [
        { text: "Il ne voudra pas venir.", rationale: "Option A", isCorrect: true },
        { text: "Il ne voudras pas venir.", rationale: "Option B", isCorrect: false },
        { text: "Il ne voudrons pas venir.", rationale: "Option C", isCorrect: false },
        { text: "Il ne voudrez pas venir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) will want / are going to want to rest.",
      hint: "Use irregular future form: vous voudrez",
      answerOptions: [
        { text: "Vous voudrez vous reposer.", rationale: "Option A", isCorrect: true },
        { text: "Vous voudrons vous reposer.", rationale: "Option B", isCorrect: false },
        { text: "Vous voudras vous reposer.", rationale: "Option C", isCorrect: false },
        { text: "Vous voudront vous reposer.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) will want / are going to want another piece.",
      hint: "Use irregular future form: tu voudras",
      answerOptions: [
        { text: "Tu voudra un autre morceau.", rationale: "Option A", isCorrect: false },
        { text: "Tu voudrez un autre morceau.", rationale: "Option B", isCorrect: false },
        { text: "Tu voudras un autre morceau.", rationale: "Option C", isCorrect: true },
        { text: "Tu voudrai un autre morceau.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) will want / are going to want to know the truth.",
      hint: "Use irregular future form: ils voudront",
      answerOptions: [
        { text: "Ils voudra savoir la vérité.", rationale: "Option A", isCorrect: false },
        { text: "Ils voudrez savoir la vérité.", rationale: "Option B", isCorrect: false },
        { text: "Ils voudrons savoir la vérité.", rationale: "Option C", isCorrect: false },
        { text: "Ils voudront savoir la vérité.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "Will you (formal) want / Are you going to want to join us?",
      hint: "Use irregular future interrogative: voudrez-vous",
      answerOptions: [
        { text: "Voudrez-vous nous joindre ?", rationale: "Option A", isCorrect: true },
        { text: "Voudrons-nous nous joindre ?", rationale: "Option B", isCorrect: false },
        { text: "Voudra-t-il nous joindre ?", rationale: "Option C", isCorrect: false },
        { text: "Voudras-tu nous joindre ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We will want / are going to want to try.",
      hint: "Use irregular future form: nous voudrons",
      answerOptions: [
        { text: "Nous voudrons essayer.", rationale: "Option A", isCorrect: true },
        { text: "Nous voudrez essayer.", rationale: "Option B", isCorrect: false },
        { text: "Nous voudra essayer.", rationale: "Option C", isCorrect: false },
        { text: "Nous voudront essayer.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I will not want / am not going to want to do that.",
      hint: "Use irregular future negative: je ne voudrai pas",
      answerOptions: [
        { text: "Je ne voudras pas faire ça.", rationale: "Option A", isCorrect: false },
        { text: "Je ne voudrai pas faire ça.", rationale: "Option B", isCorrect: true },
        { text: "Je ne voudra pas faire ça.", rationale: "Option C", isCorrect: false },
        { text: "Je ne voudrons pas faire ça.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) will want / are going to want to see the show.",
      hint: "Use irregular future form: elles voudront",
      answerOptions: [
        { text: "Elles voudra voir le spectacle.", rationale: "Option A", isCorrect: false },
        { text: "Elles voudrons voir le spectacle.", rationale: "Option B", isCorrect: false },
        { text: "Elles voudrez voir le spectacle.", rationale: "Option C", isCorrect: false },
        { text: "Elles voudront voir le spectacle.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "You (informal) will not want / are not going to want to wait.",
      hint: "Use irregular future negative: tu ne voudras pas",
      answerOptions: [
        { text: "Tu ne voudra pas attendre.", rationale: "Option A", isCorrect: false },
        { text: "Tu ne voudrez pas attendre.", rationale: "Option B", isCorrect: false },
        { text: "Tu ne voudras pas attendre.", rationale: "Option C", isCorrect: true },
        { text: "Tu ne voudrai pas attendre.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He will want / is going to want to sleep.",
      hint: "Use irregular future form: il voudra",
      answerOptions: [
        { text: "Il voudra dormir.", rationale: "Option A", isCorrect: true },
        { text: "Il voudras dormir.", rationale: "Option B", isCorrect: false },
        { text: "Il voudrez dormir.", rationale: "Option C", isCorrect: false },
        { text: "Il voudront dormir.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) will not want / are not going to want to come.",
      hint: "Use irregular future negative: ils ne voudront pas",
      answerOptions: [
        { text: "Ils ne voudra pas venir.", rationale: "Option A", isCorrect: false },
        { text: "Ils ne voudrez pas venir.", rationale: "Option B", isCorrect: false },
        { text: "Ils ne voudrons pas venir.", rationale: "Option C", isCorrect: false },
        { text: "Ils ne voudront pas venir.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "I will want / am going to want a better explanation.",
      hint: "Use irregular future form: je voudrai",
      answerOptions: [
        { text: "Je voudras une meilleure explication.", rationale: "Option A", isCorrect: false },
        { text: "Je voudra une meilleure explication.", rationale: "Option B", isCorrect: false },
        { text: "Je voudrons une meilleure explication.", rationale: "Option C", isCorrect: false },
        { text: "Je voudrai une meilleure explication.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "We will not want / are not going to want to participate.",
      hint: "Use irregular future negative: nous ne voudrons pas",
      answerOptions: [
        { text: "Nous ne voudra pas participer.", rationale: "Option A", isCorrect: false },
        { text: "Nous ne voudrez pas participer.", rationale: "Option B", isCorrect: false },
        { text: "Nous ne voudrons pas participer.", rationale: "Option C", isCorrect: true },
        { text: "Nous ne voudront pas participer.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "What will you (informal) want / are you going to want to do?",
      hint: "Use irregular future interrogative: que voudras-tu",
      answerOptions: [
        { text: "Que voudra-t-il faire ?", rationale: "Option A", isCorrect: false },
        { text: "Que voudras-tu faire ?", rationale: "Option B", isCorrect: true },
        { text: "Que voudrez-vous faire ?", rationale: "Option C", isCorrect: false },
        { text: "Que voudrons-nous faire ?", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) will not want / are not going to want to stay.",
      hint: "Use irregular future negative: elles ne voudront pas",
      answerOptions: [
        { text: "Elles ne voudra pas rester.", rationale: "Option A", isCorrect: false },
        { text: "Elles ne voudront pas rester.", rationale: "Option B", isCorrect: true },
        { text: "Elles ne voudrons pas rester.", rationale: "Option C", isCorrect: false },
        { text: "Elles ne voudrez pas rester.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She will not want / is not going to want to share.",
      hint: "Use irregular future negative: elle ne voudra pas",
      answerOptions: [
        { text: "Elle ne voudra pas partager.", rationale: "Option A", isCorrect: true },
        { text: "Elle ne voudras pas partager.", rationale: "Option B", isCorrect: false },
        { text: "Elle ne voudrons pas partager.", rationale: "Option C", isCorrect: false },
        { text: "Elle ne voudrez pas partager.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal) will not want / are not going to want to lose.",
      hint: "Use irregular future negative: vous ne voudrez pas",
      answerOptions: [
        { text: "Vous ne voudra pas perdre.", rationale: "Option A", isCorrect: false },
        { text: "Vous ne voudrons pas perdre.", rationale: "Option B", isCorrect: false },
        { text: "Vous ne voudrez pas perdre.", rationale: "Option C", isCorrect: true },
        { text: "Vous ne voudront pas perdre.", rationale: "Option D", isCorrect: false }
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

// Function to get random Elementary Passé Composé questions for a specific verb
export function getRandomElementaryPasseComposeQuestions(verb: string, count: number): ElementaryQuizQuestion[] {
  const questions = ELEMENTARY_PASSE_COMPOSE_QUESTIONS[verb] || [];
  
  if (questions.length === 0) {
    console.log(`⚠️  No Elementary passé composé questions found for verb: ${verb}`);
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

// Function to get random Elementary future simple questions for a specific verb
export function getRandomElementaryFutureSimpleQuestions(verb: string, count: number): ElementaryQuizQuestion[] {
  const questions = ELEMENTARY_FUTURE_SIMPLE_QUESTIONS[verb] || [];
  
  if (questions.length === 0) {
    console.log(`⚠️  No Elementary future simple questions found for verb: ${verb}`);
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
