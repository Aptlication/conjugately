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
        { text: "Tu dis ça tous les jours.", rationale: "Option A", isCorrect: false },
        { text: "Tu disons ça tous les jours.", rationale: "Option B", isCorrect: false },
        { text: "Vous dites ça tous les jours.", rationale: "Option C", isCorrect: false },
        { text: "Tu dites ça tous les jours.", rationale: "Option D", isCorrect: true }
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
        { text: "Il ne dit pas grand-chose.", rationale: "Option A", isCorrect: false },
        { text: "Ils ne disent pas grand-chose.", rationale: "Option B", isCorrect: false },
        { text: "Il ne dis pas grand-chose.", rationale: "Option C", isCorrect: false },
        { text: "Il ne disent pas grand-chose.", rationale: "Option D", isCorrect: true }
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
        { text: "Nous ne disons jamais ça.", rationale: "Option A", isCorrect: false },
        { text: "Nous ne dites jamais ça.", rationale: "Option B", isCorrect: false },
        { text: "Nous ne disent jamais ça.", rationale: "Option C", isCorrect: true },
        { text: "Nous ne dis jamais ça.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Do you (plural) say / are you saying good morning every day?",
      hint: "Use plural interrogative inversion: dites-vous",
      answerOptions: [
        { text: "Dites-vous bonjour chaque jour ?", rationale: "Option A", isCorrect: false },
        { text: "Dis-tu bonjour chaque jour ?", rationale: "Option B", isCorrect: false },
        { text: "Disons-vous bonjour chaque jour ?", rationale: "Option C", isCorrect: false },
        { text: "Disez-vous bonjour chaque jour ?", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "They (male/mixed) say / are saying the truth.",
      hint: "Use masculine plural: ils disent",
      answerOptions: [
        { text: "Ils disent la vérité.", rationale: "Option A", isCorrect: false },
        { text: "Ils dites la vérité.", rationale: "Option B", isCorrect: false },
        { text: "Ils disons la vérité.", rationale: "Option C", isCorrect: true },
        { text: "Ils dit la vérité.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) do not say / are not saying please.",
      hint: "Use informal 'tu' with negation: tu ne dis pas",
      answerOptions: [
        { text: "Tu ne dis pas s'il te plaît.", rationale: "Option A", isCorrect: false },
        { text: "Vous ne dites pas s'il te plaît.", rationale: "Option B", isCorrect: true },
        { text: "Tu ne dites pas s'il te plaît.", rationale: "Option C", isCorrect: false },
        { text: "Vous ne dis pas s'il te plaît.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) say / are saying thank you.",
      hint: "Use feminine plural: elles disent",
      answerOptions: [
        { text: "Elles disent merci.", rationale: "Option A", isCorrect: false },
        { text: "Elles dites merci.", rationale: "Option B", isCorrect: false },
        { text: "Elles disons merci.", rationale: "Option C", isCorrect: false },
        { text: "Elles dit merci.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "We are saying / say goodbye now.",
      hint: "Use first person plural: nous disons",
      answerOptions: [
        { text: "Nous disons au revoir maintenant.", rationale: "Option A", isCorrect: false },
        { text: "Nous dites au revoir maintenant.", rationale: "Option B", isCorrect: true },
        { text: "Nous disent au revoir maintenant.", rationale: "Option C", isCorrect: false },
        { text: "Nous dis au revoir maintenant.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "Do you (informal) say / are you saying your name?",
      hint: "Use informal interrogative inversion: dis-tu",
      answerOptions: [
        { text: "Dis-tu ton nom ?", rationale: "Option A", isCorrect: false },
        { text: "Dites-tu ton nom ?", rationale: "Option B", isCorrect: false },
        { text: "Dites-vous ton nom ?", rationale: "Option C", isCorrect: false },
        { text: "Dis-tu ton noms ?", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "She says / is saying everything now.",
      hint: "Use third person singular feminine: elle dit",
      answerOptions: [
        { text: "Elle dit tout maintenant.", rationale: "Option A", isCorrect: false },
        { text: "Elle dites tout maintenant.", rationale: "Option B", isCorrect: false },
        { text: "Elle disent tout maintenant.", rationale: "Option C", isCorrect: true },
        { text: "Elle dis tout maintenant.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He says / is saying nothing.",
      hint: "Use third person singular with negation: il ne dit rien",
      answerOptions: [
        { text: "Il ne dit rien.", rationale: "Option A", isCorrect: false },
        { text: "Ils ne disent rien.", rationale: "Option B", isCorrect: true },
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
        { text: "Je dis la vérité maintenant.", rationale: "Option A", isCorrect: false },
        { text: "Je dites la vérité maintenant.", rationale: "Option B", isCorrect: false },
        { text: "Je disent la vérité maintenant.", rationale: "Option C", isCorrect: false },
        { text: "Je disons la vérité maintenant.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "They do not say / are not saying anything.",
      hint: "Use third person plural with negation: ils ne disent rien",
      answerOptions: [
        { text: "Ils ne disent rien.", rationale: "Option A", isCorrect: false },
        { text: "Ils ne dites rien.", rationale: "Option B", isCorrect: false },
        { text: "Ils ne disons rien.", rationale: "Option C", isCorrect: true },
        { text: "Ils ne dis rien.", rationale: "Option D", isCorrect: false }
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
  "dire": [
    {
      question: "I said / have said the truth.",
      hint: "Use passé composé of dire: j'ai dit",
      answerOptions: [
        { text: "J'ai dit la vérité.", rationale: "Option A", isCorrect: true },
        { text: "J'as dit la vérité.", rationale: "Option B", isCorrect: false },
        { text: "J'ai dits la vérité.", rationale: "Option C", isCorrect: false },
        { text: "J'ai dite la vérité.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) said / have said that yesterday.",
      hint: "Use passé composé of dire: tu as dit",
      answerOptions: [
        { text: "Tu a dit ça hier.", rationale: "Option A", isCorrect: false },
        { text: "Tu as dit ça hier.", rationale: "Option B", isCorrect: true },
        { text: "Tu as dits ça hier.", rationale: "Option C", isCorrect: false },
        { text: "Tu as dite ça hier.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He said / has said something important.",
      hint: "Use passé composé of dire: il a dit",
      answerOptions: [
        { text: "Il a dit quelque chose d'important.", rationale: "Option A", isCorrect: true },
        { text: "Il as dit quelque chose d'important.", rationale: "Option B", isCorrect: false },
        { text: "Il a dite quelque chose d'important.", rationale: "Option C", isCorrect: false },
        { text: "Il a dits quelque chose d'important.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We said / have said hello.",
      hint: "Use passé composé of dire: nous avons dit",
      answerOptions: [
        { text: "Nous avons dit bonjour.", rationale: "Option A", isCorrect: true },
        { text: "Nous avons dite bonjour.", rationale: "Option B", isCorrect: false },
        { text: "Nous avons dits bonjour.", rationale: "Option C", isCorrect: false },
        { text: "Nous avons dit bonjours.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal/plural) said / have said the same thing.",
      hint: "Use passé composé of dire: vous avez dit",
      answerOptions: [
        { text: "Vous avez dit la même chose.", rationale: "Option A", isCorrect: true },
        { text: "Vous avez dite la même chose.", rationale: "Option B", isCorrect: false },
        { text: "Vous avez dits la même chose.", rationale: "Option C", isCorrect: false },
        { text: "Vous avez dit la mêmes choses.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed group) said / have said nothing.",
      hint: "Use passé composé of dire: ils n'ont rien dit",
      answerOptions: [
        { text: "Ils ont dit rien.", rationale: "Option A", isCorrect: false },
        { text: "Ils ont rien dit.", rationale: "Option B", isCorrect: false },
        { text: "Ils ont dites rien.", rationale: "Option C", isCorrect: false },
        { text: "Ils n'ont rien dit.", rationale: "Option D", isCorrect: true }
      ]
    },
    {
      question: "They (female) said / have said everything.",
      hint: "Use passé composé of dire: elles ont dit",
      answerOptions: [
        { text: "Elles ont dit tout.", rationale: "Option A", isCorrect: true },
        { text: "Elles ont dites tout.", rationale: "Option B", isCorrect: false },
        { text: "Elles ont dit toute.", rationale: "Option C", isCorrect: false },
        { text: "Elles ont dits toute.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I did not say / have not said that.",
      hint: "Use passé composé of dire: je n'ai pas dit",
      answerOptions: [
        { text: "Je n'ai pas dit ça.", rationale: "Option A", isCorrect: true },
        { text: "Je n'ai pas dite ça.", rationale: "Option B", isCorrect: false },
        { text: "Je n'ai pas dits ça.", rationale: "Option C", isCorrect: false },
        { text: "Je n'ai pas dit ça pas.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She did not say / has not said anything.",
      hint: "Use passé composé of dire: elle n'a rien dit",
      answerOptions: [
        { text: "Elle n'a rien dit.", rationale: "Option A", isCorrect: true },
        { text: "Elle n'a rien dite.", rationale: "Option B", isCorrect: false },
        { text: "Elle n'a rien dits.", rationale: "Option C", isCorrect: false },
        { text: "Elle n'a rien dites.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We did not say / have not said a word.",
      hint: "Use passé composé of dire: nous n'avons pas dit",
      answerOptions: [
        { text: "Nous n'avons pas dit un mot.", rationale: "Option A", isCorrect: true },
        { text: "Nous n'avons pas dite un mot.", rationale: "Option B", isCorrect: false },
        { text: "Nous n'avons pas dits un mot.", rationale: "Option C", isCorrect: false },
        { text: "Nous n'avons pas dit un mots.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) didn't say / haven't said anything.",
      hint: "Use passé composé of dire: tu n'as rien dit",
      answerOptions: [
        { text: "Tu n'as rien dit.", rationale: "Option A", isCorrect: true },
        { text: "Tu n'as rien dites.", rationale: "Option B", isCorrect: false },
        { text: "Tu n'as rien dite.", rationale: "Option C", isCorrect: false },
        { text: "Tu n'as rien dits.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (male/mixed) have not said the truth.",
      hint: "Use passé composé of dire: ils n'ont pas dit",
      answerOptions: [
        { text: "Ils n'ont pas dit la vérité.", rationale: "Option A", isCorrect: true },
        { text: "Ils n'ont pas dite la vérité.", rationale: "Option B", isCorrect: false },
        { text: "Ils n'ont pas dits la vérité.", rationale: "Option C", isCorrect: false },
        { text: "Ils n'ont pas dite la vérités.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (formal/plural) did not say / have not said that.",
      hint: "Use passé composé of dire: vous n'avez pas dit",
      answerOptions: [
        { text: "Vous n'avez pas dit ça.", rationale: "Option A", isCorrect: true },
        { text: "Vous n'avez pas dite ça.", rationale: "Option B", isCorrect: false },
        { text: "Vous n'avez pas dits ça.", rationale: "Option C", isCorrect: false },
        { text: "Vous n'avez pas dit ça pas.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "He has said / said something important.",
      hint: "Use passé composé of dire: il a dit",
      answerOptions: [
        { text: "Il a dit quelque chose d'important.", rationale: "Option A", isCorrect: true },
        { text: "Il a dite quelque chose d'important.", rationale: "Option B", isCorrect: false },
        { text: "Il a dits quelque chose d'important.", rationale: "Option C", isCorrect: false },
        { text: "Il a dit quelque chose d'importants.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "She has said / said nothing.",
      hint: "Use passé composé of dire: elle n'a rien dit",
      answerOptions: [
        { text: "Elle n'a rien dit.", rationale: "Option A", isCorrect: true },
        { text: "Elle n'a rien dite.", rationale: "Option B", isCorrect: false },
        { text: "Elle n'a rien dits.", rationale: "Option C", isCorrect: false },
        { text: "Elle n'a rien dites.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "We have said / said yes.",
      hint: "Use passé composé of dire: nous avons dit",
      answerOptions: [
        { text: "Nous avons dit oui.", rationale: "Option A", isCorrect: true },
        { text: "Nous avons dite oui.", rationale: "Option B", isCorrect: false },
        { text: "Nous avons dits oui.", rationale: "Option C", isCorrect: false },
        { text: "Nous avons dit ouis.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "You (informal) said / have said a lie.",
      hint: "Use passé composé of dire: tu as dit",
      answerOptions: [
        { text: "Tu as dit un mensonge.", rationale: "Option A", isCorrect: true },
        { text: "Tu as dite un mensonge.", rationale: "Option B", isCorrect: false },
        { text: "Tu as dits un mensonge.", rationale: "Option C", isCorrect: false },
        { text: "Tu as dit un mensonges.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "They (female) said / have said something.",
      hint: "Use passé composé of dire: elles ont dit",
      answerOptions: [
        { text: "Elles ont dit quelque chose.", rationale: "Option A", isCorrect: true },
        { text: "Elles ont dites quelque chose.", rationale: "Option B", isCorrect: false },
        { text: "Elles ont dits quelque chose.", rationale: "Option C", isCorrect: false },
        { text: "Elles ont dite quelque chosé.", rationale: "Option D", isCorrect: false }
      ]
    },
    {
      question: "I have said / said it before.",
      hint: "Use passé composé of dire: je l'ai dit",
      answerOptions: [
        { text: "Je l'ai dit avant.", rationale: "Option A", isCorrect: true },
        { text: "Je l'ai dite avant.", rationale: "Option B", isCorrect: false },
        { text: "Je l'ai dits avant.", rationale: "Option C", isCorrect: false },
        { text: "Je l'ai dite avont.", rationale: "Option D", isCorrect: false }
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
