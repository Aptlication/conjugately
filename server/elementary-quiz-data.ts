// Elementary Level Present Tense Quiz Data
// Validated by Perplexity AI for French grammar accuracy
// Covers 7 verbs: dire, voir, savoir, vouloir, venir, pouvoir, besoin

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
  "dire": [
    {
      question: "I say the truth / I am saying the truth",
      hint: "Use present tense of 'dire' with je and la vérité",
      answerOptions: [
        { text: "Je dirai la vérité", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Je dis la vérité", rationale: "Correct! 'Je dis la vérité' means 'I say the truth' in present tense.", isCorrect: true },
        { text: "Je disais la vérité", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "J'ai dit la vérité", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "You don't say anything / You are not saying anything (informal)",
      hint: "Use negative present tense of 'dire' with tu and rien",
      answerOptions: [
        { text: "Tu ne disais rien", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Tu ne diras rien", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Tu ne dis rien", rationale: "Correct! 'Tu ne dis rien' means 'You don't say anything' (informal).", isCorrect: true },
        { text: "Tu n'as dit rien", rationale: "Wrong tense and grammar - this uses past perfect incorrectly.", isCorrect: false }
      ]
    },
    {
      question: "He says hello / He is saying hello",
      hint: "Use present tense of 'dire' with il and bonjour",
      answerOptions: [
        { text: "Il disait bonjour", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Il dit bonjour", rationale: "Correct! 'Il dit bonjour' means 'He says hello' in present tense.", isCorrect: true },
        { text: "Il dira bonjour", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Il a dit bonjour", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "She doesn't say no / She is not saying no",
      hint: "Use negative present tense of 'dire' with elle and non",
      answerOptions: [
        { text: "Elle n'a dit non", rationale: "Wrong tense and grammar - this uses past perfect incorrectly.", isCorrect: false },
        { text: "Elle ne dira pas non", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Elle ne dit pas non", rationale: "Correct! 'Elle ne dit pas non' means 'She doesn't say no'.", isCorrect: true },
        { text: "Elle ne disait pas non", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false }
      ]
    },
    {
      question: "We say yes / We are saying yes",
      hint: "Use present tense of 'dire' with nous and oui",
      answerOptions: [
        { text: "Nous avons dit oui", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false },
        { text: "Nous disons oui", rationale: "Correct! 'Nous disons oui' means 'We say yes' in present tense.", isCorrect: true },
        { text: "Nous dirons oui", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Nous disions oui", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false }
      ]
    },
    {
      question: "You say thank you / You are saying thank you (formal)",
      hint: "Use present tense of 'dire' with vous and merci",
      answerOptions: [
        { text: "Vous disiez merci", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Vous dites merci", rationale: "Correct! 'Vous dites merci' means 'You say thank you' (formal).", isCorrect: true },
        { text: "Vous direz merci", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Vous avez dit merci", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "They say good morning / They are saying good morning (male / mixed)",
      hint: "Use present tense of 'dire' with ils and bonjour",
      answerOptions: [
        { text: "Ils diront bonjour", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ils disaient bonjour", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ils disent bonjour", rationale: "Correct! 'Ils disent bonjour' means 'They say good morning' (male/mixed).", isCorrect: true },
        { text: "Ils ont dit bonjour", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "They don't say goodbye / They are not saying goodbye (female)",
      hint: "Use negative present tense of 'dire' with elles and au revoir",
      answerOptions: [
        { text: "Elles ne disaient pas au revoir", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Elles ne diront pas au revoir", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Elles ne disent pas au revoir", rationale: "Correct! 'Elles ne disent pas au revoir' means 'They don't say goodbye' (female).", isCorrect: true },
        { text: "Elles n'ont dit pas au revoir", rationale: "Wrong tense and incorrect negation structure.", isCorrect: false }
      ]
    },
    {
      question: "Do I say it correctly? / Am I saying it correctly?",
      hint: "Use question form of 'dire' with je and correctement",
      answerOptions: [
        { text: "Dirai-je cela correctement ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Est-ce que je dis cela correctement ?", rationale: "Correct! 'Est-ce que je dis cela correctement ?' means 'Do I say it correctly?'", isCorrect: true },
        { text: "Disais-je cela correctement ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ai-je dit cela correctement ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Do you say please? / Are you saying please? (informal)",
      hint: "Use question form of 'dire' with tu and s'il te plaît",
      answerOptions: [
        { text: "Disais-tu s'il te plaît ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Diras-tu s'il te plaît ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Dis-tu s'il te plaît ?", rationale: "Correct! 'Dis-tu s'il te plaît ?' means 'Do you say please?' (informal).", isCorrect: true },
        { text: "As-tu dit s'il te plaît ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Doesn't he say sorry? / Isn't he saying sorry?",
      hint: "Use negative question form of 'dire' with il and pardon",
      answerOptions: [
        { text: "Ne dira-t-il pas pardon ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ne dit-il pas pardon ?", rationale: "Correct! 'Ne dit-il pas pardon ?' means 'Doesn't he say sorry?'", isCorrect: true },
        { text: "Ne disait-il pas pardon ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "N'a-t-il pas dit pardon ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Don't they say the words? / Aren't they saying the words? (female)",
      hint: "Use negative question form of 'dire' with elles and les mots",
      answerOptions: [
        { text: "Ne diront-elles pas les mots ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ne disaient-elles pas les mots ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ne disent-elles pas les mots ?", rationale: "Correct! 'Ne disent-elles pas les mots ?' means 'Don't they say the words?' (female).", isCorrect: true },
        { text: "N'ont-elles pas dit les mots ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    }
  ],

  "voir": [
    {
      question: "I see you / I am seeing you",
      hint: "Use present tense of 'voir' with je and vous",
      answerOptions: [
        { text: "Je verrai vous", rationale: "Wrong tense and pronoun - this is future with wrong object pronoun.", isCorrect: false },
        { text: "Je vois vous", rationale: "Wrong pronoun - should use 'te' or 'vous' as object pronoun 'vous'.", isCorrect: false },
        { text: "Je vous vois", rationale: "Correct! 'Je vous vois' means 'I see you' with proper object pronoun placement.", isCorrect: true },
        { text: "J'ai vu vous", rationale: "Wrong tense and pronoun placement.", isCorrect: false }
      ]
    },
    {
      question: "You don't see the problem / You are not seeing the problem (informal)",
      hint: "Use negative present tense of 'voir' with tu and le problème",
      answerOptions: [
        { text: "Tu ne voyais pas le problème", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Tu ne vois pas le problème", rationale: "Correct! 'Tu ne vois pas le problème' means 'You don't see the problem' (informal).", isCorrect: true },
        { text: "Tu ne verras pas le problème", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Tu n'as vu pas le problème", rationale: "Wrong tense and incorrect negation structure.", isCorrect: false }
      ]
    },
    {
      question: "He sees the movie / He is seeing the movie",
      hint: "Use present tense of 'voir' with il and le film",
      answerOptions: [
        { text: "Il voyait le film", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Il voit le film", rationale: "Correct! 'Il voit le film' means 'He sees the movie' in present tense.", isCorrect: true },
        { text: "Il verra le film", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Il a vu le film", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "She doesn't see the car / She is not seeing the car",
      hint: "Use negative present tense of 'voir' with elle and la voiture",
      answerOptions: [
        { text: "Elle n'a vu la voiture", rationale: "Wrong tense and missing negation particle 'pas'.", isCorrect: false },
        { text: "Elle ne verra pas la voiture", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Elle ne voit pas la voiture", rationale: "Correct! 'Elle ne voit pas la voiture' means 'She doesn't see the car'.", isCorrect: true },
        { text: "Elle ne voyait pas la voiture", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false }
      ]
    },
    {
      question: "We see the stars / We are seeing the stars",
      hint: "Use present tense of 'voir' with nous and les étoiles",
      answerOptions: [
        { text: "Nous avons vu les étoiles", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false },
        { text: "Nous voyons les étoiles", rationale: "Correct! 'Nous voyons les étoiles' means 'We see the stars' in present tense.", isCorrect: true },
        { text: "Nous verrons les étoiles", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Nous voyions les étoiles", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false }
      ]
    },
    {
      question: "You see the doctor / You are seeing the doctor (formal)",
      hint: "Use present tense of 'voir' with vous and le médecin",
      answerOptions: [
        { text: "Vous voyiez le médecin", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Vous voyez le médecin", rationale: "Correct! 'Vous voyez le médecin' means 'You see the doctor' (formal).", isCorrect: true },
        { text: "Vous verrez le médecin", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Vous avez vu le médecin", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "They see the house / They are seeing the house (male / mixed)",
      hint: "Use present tense of 'voir' with ils and la maison",
      answerOptions: [
        { text: "Ils verront la maison", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ils voyaient la maison", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ils voient la maison", rationale: "Correct! 'Ils voient la maison' means 'They see the house' (male/mixed).", isCorrect: true },
        { text: "Ils ont vu la maison", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "They don't see the solution / They are not seeing the solution (female)",
      hint: "Use negative present tense of 'voir' with elles and la solution",
      answerOptions: [
        { text: "Elles ne voyaient pas la solution", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Elles ne verront pas la solution", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Elles ne voient pas la solution", rationale: "Correct! 'Elles ne voient pas la solution' means 'They don't see the solution' (female).", isCorrect: true },
        { text: "Elles n'ont vu pas la solution", rationale: "Wrong tense and incorrect negation structure.", isCorrect: false }
      ]
    },
    {
      question: "Do I see clearly? / Am I seeing clearly?",
      hint: "Use question form of 'voir' with je and clairement",
      answerOptions: [
        { text: "Verrai-je clairement ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Est-ce que je vois clairement ?", rationale: "Correct! 'Est-ce que je vois clairement ?' means 'Do I see clearly?'", isCorrect: true },
        { text: "Voyais-je clairement ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ai-je vu clairement ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Do you see the bird? / Are you seeing the bird? (informal)",
      hint: "Use question form of 'voir' with tu and l'oiseau",
      answerOptions: [
        { text: "Voyais-tu l'oiseau ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Verras-tu l'oiseau ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Vois-tu l'oiseau ?", rationale: "Correct! 'Vois-tu l'oiseau ?' means 'Do you see the bird?' (informal).", isCorrect: true },
        { text: "As-tu vu l'oiseau ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Doesn't she see the cat? / Isn't she seeing the cat?",
      hint: "Use negative question form of 'voir' with elle and le chat",
      answerOptions: [
        { text: "Ne verra-t-elle pas le chat ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ne voit-elle pas le chat ?", rationale: "Correct! 'Ne voit-elle pas le chat ?' means 'Doesn't she see the cat?'", isCorrect: true },
        { text: "Ne voyait-elle pas le chat ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "N'a-t-elle pas vu le chat ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Don't they see the light? / Aren't they seeing the light? (male / mixed)",
      hint: "Use negative question form of 'voir' with ils and la lumière",
      answerOptions: [
        { text: "Ne verront-ils pas la lumière ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ne voyaient-ils pas la lumière ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ne voient-ils pas la lumière ?", rationale: "Correct! 'Ne voient-ils pas la lumière ?' means 'Don't they see the light?' (male/mixed).", isCorrect: true },
        { text: "N'ont-ils pas vu la lumière ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    }
  ],

  "savoir": [
    {
      question: "I know the answer / I am knowing the answer",
      hint: "Use present tense of 'savoir' with je and la réponse",
      answerOptions: [
        { text: "Je saurai la réponse", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Je sais la réponse", rationale: "Correct! 'Je sais la réponse' means 'I know the answer' in present tense.", isCorrect: true },
        { text: "Je savais la réponse", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "J'ai su la réponse", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "You don't know French / You are not knowing French (informal)",
      hint: "Use negative present tense of 'savoir' with tu and le français",
      answerOptions: [
        { text: "Tu ne savais pas le français", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Tu ne sauras pas le français", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Tu ne sais pas le français", rationale: "Correct! 'Tu ne sais pas le français' means 'You don't know French' (informal).", isCorrect: true },
        { text: "Tu n'as su pas le français", rationale: "Wrong tense and incorrect negation structure.", isCorrect: false }
      ]
    },
    {
      question: "He knows how to swim / He is knowing how to swim",
      hint: "Use present tense of 'savoir' with il and nager",
      answerOptions: [
        { text: "Il savait nager", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Il sait nager", rationale: "Correct! 'Il sait nager' means 'He knows how to swim' in present tense.", isCorrect: true },
        { text: "Il saura nager", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Il a su nager", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "She doesn't know the truth / She is not knowing the truth",
      hint: "Use negative present tense of 'savoir' with elle and la vérité",
      answerOptions: [
        { text: "Elle n'a su la vérité", rationale: "Wrong tense and missing negation particle 'pas'.", isCorrect: false },
        { text: "Elle ne saura pas la vérité", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Elle ne sait pas la vérité", rationale: "Correct! 'Elle ne sait pas la vérité' means 'She doesn't know the truth'.", isCorrect: true },
        { text: "Elle ne savait pas la vérité", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false }
      ]
    },
    {
      question: "We know the way / We are knowing the way",
      hint: "Use present tense of 'savoir' with nous and le chemin",
      answerOptions: [
        { text: "Nous avons su le chemin", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false },
        { text: "Nous savons le chemin", rationale: "Correct! 'Nous savons le chemin' means 'We know the way' in present tense.", isCorrect: true },
        { text: "Nous saurons le chemin", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Nous savions le chemin", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false }
      ]
    },
    {
      question: "You know how to cook / You are knowing how to cook (formal)",
      hint: "Use present tense of 'savoir' with vous and cuisiner",
      answerOptions: [
        { text: "Vous saviez cuisiner", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Vous savez cuisiner", rationale: "Correct! 'Vous savez cuisiner' means 'You know how to cook' (formal).", isCorrect: true },
        { text: "Vous saurez cuisiner", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Vous avez su cuisiner", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "They know the lesson / They are knowing the lesson (male / mixed)",
      hint: "Use present tense of 'savoir' with ils and la leçon",
      answerOptions: [
        { text: "Ils sauront la leçon", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ils savaient la leçon", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ils savent la leçon", rationale: "Correct! 'Ils savent la leçon' means 'They know the lesson' (male/mixed).", isCorrect: true },
        { text: "Ils ont su la leçon", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "They don't know how to dance / They are not knowing how to dance (female)",
      hint: "Use negative present tense of 'savoir' with elles and danser",
      answerOptions: [
        { text: "Elles ne savaient pas danser", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Elles ne sauront pas danser", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Elles ne savent pas danser", rationale: "Correct! 'Elles ne savent pas danser' means 'They don't know how to dance' (female).", isCorrect: true },
        { text: "Elles n'ont su pas danser", rationale: "Wrong tense and incorrect negation structure.", isCorrect: false }
      ]
    },
    {
      question: "Do I know where it is? / Am I knowing where it is?",
      hint: "Use question form of 'savoir' with je and où c'est",
      answerOptions: [
        { text: "Saurai-je où c'est ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Est-ce que je sais où c'est ?", rationale: "Correct! 'Est-ce que je sais où c'est ?' means 'Do I know where it is?'", isCorrect: true },
        { text: "Savais-je où c'est ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ai-je su où c'est ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Do you know how to read? / Are you knowing how to read? (informal)",
      hint: "Use question form of 'savoir' with tu and lire",
      answerOptions: [
        { text: "Savais-tu lire ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Sauras-tu lire ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Sais-tu lire ?", rationale: "Correct! 'Sais-tu lire ?' means 'Do you know how to read?' (informal).", isCorrect: true },
        { text: "As-tu su lire ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Doesn't he know the name? / Isn't he knowing the name?",
      hint: "Use negative question form of 'savoir' with il and le nom",
      answerOptions: [
        { text: "Ne saura-t-il pas le nom ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ne sait-il pas le nom ?", rationale: "Correct! 'Ne sait-il pas le nom ?' means 'Doesn't he know the name?'", isCorrect: true },
        { text: "Ne savait-il pas le nom ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "N'a-t-il pas su le nom ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Don't they know the secret? / Aren't they knowing the secret? (female)",
      hint: "Use negative question form of 'savoir' with elles and le secret",
      answerOptions: [
        { text: "Ne sauront-elles pas le secret ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ne savaient-elles pas le secret ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ne savent-elles pas le secret ?", rationale: "Correct! 'Ne savent-elles pas le secret ?' means 'Don't they know the secret?' (female).", isCorrect: true },
        { text: "N'ont-elles pas su le secret ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    }
  ],

  "vouloir": [
    {
      question: "I want some water / I am wanting some water",
      hint: "Use present tense of 'vouloir' with je and de l'eau",
      answerOptions: [
        { text: "Je voudrai de l'eau", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Je veux de l'eau", rationale: "Correct! 'Je veux de l'eau' means 'I want some water' in present tense.", isCorrect: true },
        { text: "Je voulais de l'eau", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "J'ai voulu de l'eau", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "You don't want coffee / You are not wanting coffee (informal)",
      hint: "Use negative present tense of 'vouloir' with tu and du café",
      answerOptions: [
        { text: "Tu ne voulais pas du café", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Tu ne voudras pas du café", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Tu ne veux pas de café", rationale: "Correct! 'Tu ne veux pas de café' means 'You don't want coffee' (informal) - note 'de' after negation.", isCorrect: true },
        { text: "Tu n'as voulu pas du café", rationale: "Wrong tense and incorrect negation structure.", isCorrect: false }
      ]
    },
    {
      question: "He wants to go / He is wanting to go",
      hint: "Use present tense of 'vouloir' with il and aller",
      answerOptions: [
        { text: "Il voulait aller", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Il veut aller", rationale: "Correct! 'Il veut aller' means 'He wants to go' in present tense.", isCorrect: true },
        { text: "Il voudra aller", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Il a voulu aller", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "She doesn't want help / She is not wanting help",
      hint: "Use negative present tense of 'vouloir' with elle and aide",
      answerOptions: [
        { text: "Elle n'a voulu aide", rationale: "Wrong tense and missing negation particle 'pas'.", isCorrect: false },
        { text: "Elle ne voudra pas d'aide", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Elle ne veut pas d'aide", rationale: "Correct! 'Elle ne veut pas d'aide' means 'She doesn't want help' - note 'd'aide' after negation.", isCorrect: true },
        { text: "Elle ne voulait pas d'aide", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false }
      ]
    },
    {
      question: "We want to eat / We are wanting to eat",
      hint: "Use present tense of 'vouloir' with nous and manger",
      answerOptions: [
        { text: "Nous avons voulu manger", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false },
        { text: "Nous voulons manger", rationale: "Correct! 'Nous voulons manger' means 'We want to eat' in present tense.", isCorrect: true },
        { text: "Nous voudrons manger", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Nous voulions manger", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false }
      ]
    },
    {
      question: "You want to sleep / You are wanting to sleep (formal)",
      hint: "Use present tense of 'vouloir' with vous and dormir",
      answerOptions: [
        { text: "Vous vouliez dormir", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Vous voulez dormir", rationale: "Correct! 'Vous voulez dormir' means 'You want to sleep' (formal).", isCorrect: true },
        { text: "Vous voudrez dormir", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Vous avez voulu dormir", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "They want bread / They are wanting bread (male / mixed)",
      hint: "Use present tense of 'vouloir' with ils and du pain",
      answerOptions: [
        { text: "Ils voudront du pain", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ils voulaient du pain", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ils veulent du pain", rationale: "Correct! 'Ils veulent du pain' means 'They want bread' (male/mixed).", isCorrect: true },
        { text: "Ils ont voulu du pain", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "They don't want to work / They are not wanting to work (female)",
      hint: "Use negative present tense of 'vouloir' with elles and travailler",
      answerOptions: [
        { text: "Elles ne voulaient pas travailler", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Elles ne voudront pas travailler", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Elles ne veulent pas travailler", rationale: "Correct! 'Elles ne veulent pas travailler' means 'They don't want to work' (female).", isCorrect: true },
        { text: "Elles n'ont voulu pas travailler", rationale: "Wrong tense and incorrect negation structure.", isCorrect: false }
      ]
    },
    {
      question: "Do I want this? / Am I wanting this?",
      hint: "Use question form of 'vouloir' with je and cela",
      answerOptions: [
        { text: "Voudrai-je cela ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Est-ce que je veux cela ?", rationale: "Correct! 'Est-ce que je veux cela ?' means 'Do I want this?'", isCorrect: true },
        { text: "Voulais-je cela ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ai-je voulu cela ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Do you want to come? / Are you wanting to come? (informal)",
      hint: "Use question form of 'vouloir' with tu and venir",
      answerOptions: [
        { text: "Voulais-tu venir ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Voudras-tu venir ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Veux-tu venir ?", rationale: "Correct! 'Veux-tu venir ?' means 'Do you want to come?' (informal).", isCorrect: true },
        { text: "As-tu voulu venir ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Doesn't she want tea? / Isn't she wanting tea?",
      hint: "Use negative question form of 'vouloir' with elle and du thé",
      answerOptions: [
        { text: "Ne voudra-t-elle pas du thé ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ne veut-elle pas de thé ?", rationale: "Correct! 'Ne veut-elle pas de thé ?' means 'Doesn't she want tea?' - note 'de' after negation.", isCorrect: true },
        { text: "Ne voulait-elle pas du thé ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "N'a-t-elle pas voulu du thé ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Don't they want to play? / Aren't they wanting to play? (male / mixed)",
      hint: "Use negative question form of 'vouloir' with ils and jouer",
      answerOptions: [
        { text: "Ne voudront-ils pas jouer ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ne voulaient-ils pas jouer ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ne veulent-ils pas jouer ?", rationale: "Correct! 'Ne veulent-ils pas jouer ?' means 'Don't they want to play?' (male/mixed).", isCorrect: true },
        { text: "N'ont-ils pas voulu jouer ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    }
  ],

  "venir": [
    {
      question: "I come home / I am coming home",
      hint: "Use present tense of 'venir' with je and à la maison",
      answerOptions: [
        { text: "Je viendrai à la maison", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Je viens à la maison", rationale: "Correct! 'Je viens à la maison' means 'I come home' in present tense.", isCorrect: true },
        { text: "Je venais à la maison", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Je suis venu à la maison", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "You don't come here / You are not coming here (informal)",
      hint: "Use negative present tense of 'venir' with tu and ici",
      answerOptions: [
        { text: "Tu ne venais pas ici", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Tu ne viendras pas ici", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Tu ne viens pas ici", rationale: "Correct! 'Tu ne viens pas ici' means 'You don't come here' (informal).", isCorrect: true },
        { text: "Tu n'es venu pas ici", rationale: "Wrong tense and incorrect negation structure.", isCorrect: false }
      ]
    },
    {
      question: "He comes often / He is coming often",
      hint: "Use present tense of 'venir' with il and souvent",
      answerOptions: [
        { text: "Il venait souvent", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Il vient souvent", rationale: "Correct! 'Il vient souvent' means 'He comes often' in present tense.", isCorrect: true },
        { text: "Il viendra souvent", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Il est venu souvent", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "She doesn't come early / She is not coming early",
      hint: "Use negative present tense of 'venir' with elle and tôt",
      answerOptions: [
        { text: "Elle n'est venue tôt", rationale: "Wrong tense and missing negation particle 'pas'.", isCorrect: false },
        { text: "Elle ne viendra pas tôt", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Elle ne vient pas tôt", rationale: "Correct! 'Elle ne vient pas tôt' means 'She doesn't come early'.", isCorrect: true },
        { text: "Elle ne venait pas tôt", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false }
      ]
    },
    {
      question: "We come together / We are coming together",
      hint: "Use present tense of 'venir' with nous and ensemble",
      answerOptions: [
        { text: "Nous sommes venus ensemble", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false },
        { text: "Nous venons ensemble", rationale: "Correct! 'Nous venons ensemble' means 'We come together' in present tense.", isCorrect: true },
        { text: "Nous viendrons ensemble", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Nous venions ensemble", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false }
      ]
    },
    {
      question: "You come by car / You are coming by car (formal)",
      hint: "Use present tense of 'venir' with vous and en voiture",
      answerOptions: [
        { text: "Vous veniez en voiture", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Vous venez en voiture", rationale: "Correct! 'Vous venez en voiture' means 'You come by car' (formal).", isCorrect: true },
        { text: "Vous viendrez en voiture", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Vous êtes venus en voiture", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "They come late / They are coming late (male / mixed)",
      hint: "Use present tense of 'venir' with ils and en retard",
      answerOptions: [
        { text: "Ils viendront en retard", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ils venaient en retard", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ils viennent en retard", rationale: "Correct! 'Ils viennent en retard' means 'They come late' (male/mixed).", isCorrect: true },
        { text: "Ils sont venus en retard", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "They don't come tonight / They are not coming tonight (female)",
      hint: "Use negative present tense of 'venir' with elles and ce soir",
      answerOptions: [
        { text: "Elles ne venaient pas ce soir", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Elles ne viendront pas ce soir", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Elles ne viennent pas ce soir", rationale: "Correct! 'Elles ne viennent pas ce soir' means 'They don't come tonight' (female).", isCorrect: true },
        { text: "Elles ne sont venues pas ce soir", rationale: "Wrong tense and incorrect negation structure.", isCorrect: false }
      ]
    },
    {
      question: "Do I come tomorrow? / Am I coming tomorrow?",
      hint: "Use question form of 'venir' with je and demain",
      answerOptions: [
        { text: "Viendrai-je demain ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Est-ce que je viens demain ?", rationale: "Correct! 'Est-ce que je viens demain ?' means 'Do I come tomorrow?'", isCorrect: true },
        { text: "Venais-je demain ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Suis-je venu demain ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Do you come with us? / Are you coming with us? (informal)",
      hint: "Use question form of 'venir' with tu and avec nous",
      answerOptions: [
        { text: "Venais-tu avec nous ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Viendras-tu avec nous ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Viens-tu avec nous ?", rationale: "Correct! 'Viens-tu avec nous ?' means 'Do you come with us?' (informal).", isCorrect: true },
        { text: "Es-tu venu avec nous ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Doesn't he come on time? / Isn't he coming on time?",
      hint: "Use negative question form of 'venir' with il and à l'heure",
      answerOptions: [
        { text: "Ne viendra-t-il pas à l'heure ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ne vient-il pas à l'heure ?", rationale: "Correct! 'Ne vient-il pas à l'heure ?' means 'Doesn't he come on time?'", isCorrect: true },
        { text: "Ne venait-il pas à l'heure ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "N'est-il pas venu à l'heure ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Don't they come alone? / Aren't they coming alone? (female)",
      hint: "Use negative question form of 'venir' with elles and seules",
      answerOptions: [
        { text: "Ne viendront-elles pas seules ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ne venaient-elles pas seules ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ne viennent-elles pas seules ?", rationale: "Correct! 'Ne viennent-elles pas seules ?' means 'Don't they come alone?' (female).", isCorrect: true },
        { text: "Ne sont-elles pas venues seules ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    }
  ],

  "pouvoir": [
    {
      question: "I can work / I am able to work",
      hint: "Use present tense of 'pouvoir' with je and travailler",
      answerOptions: [
        { text: "Je pourrai travailler", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Je peux travailler", rationale: "Correct! 'Je peux travailler' means 'I can work' in present tense.", isCorrect: true },
        { text: "Je pouvais travailler", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "J'ai pu travailler", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "You can't drive / You are not able to drive (informal)",
      hint: "Use negative present tense of 'pouvoir' with tu and conduire",
      answerOptions: [
        { text: "Tu ne pouvais pas conduire", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Tu ne pourras pas conduire", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Tu ne peux pas conduire", rationale: "Correct! 'Tu ne peux pas conduire' means 'You can't drive' (informal).", isCorrect: true },
        { text: "Tu n'as pu pas conduire", rationale: "Wrong tense and incorrect negation structure.", isCorrect: false }
      ]
    },
    {
      question: "He can sing / He is able to sing",
      hint: "Use present tense of 'pouvoir' with il and chanter",
      answerOptions: [
        { text: "Il pouvait chanter", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Il peut chanter", rationale: "Correct! 'Il peut chanter' means 'He can sing' in present tense.", isCorrect: true },
        { text: "Il pourra chanter", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Il a pu chanter", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "She can't come / She is not able to come",
      hint: "Use negative present tense of 'pouvoir' with elle and venir",
      answerOptions: [
        { text: "Elle n'a pu venir", rationale: "Wrong tense and missing negation particle 'pas'.", isCorrect: false },
        { text: "Elle ne pourra pas venir", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Elle ne peut pas venir", rationale: "Correct! 'Elle ne peut pas venir' means 'She can't come'.", isCorrect: true },
        { text: "Elle ne pouvait pas venir", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false }
      ]
    },
    {
      question: "We can help / We are able to help",
      hint: "Use present tense of 'pouvoir' with nous and aider",
      answerOptions: [
        { text: "Nous avons pu aider", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false },
        { text: "Nous pouvons aider", rationale: "Correct! 'Nous pouvons aider' means 'We can help' in present tense.", isCorrect: true },
        { text: "Nous pourrons aider", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Nous pouvions aider", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false }
      ]
    },
    {
      question: "You can understand / You are able to understand (formal)",
      hint: "Use present tense of 'pouvoir' with vous and comprendre",
      answerOptions: [
        { text: "Vous pouviez comprendre", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Vous pouvez comprendre", rationale: "Correct! 'Vous pouvez comprendre' means 'You can understand' (formal).", isCorrect: true },
        { text: "Vous pourrez comprendre", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Vous avez pu comprendre", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "They can run / They are able to run (male / mixed)",
      hint: "Use present tense of 'pouvoir' with ils and courir",
      answerOptions: [
        { text: "Ils pourront courir", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ils pouvaient courir", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ils peuvent courir", rationale: "Correct! 'Ils peuvent courir' means 'They can run' (male/mixed).", isCorrect: true },
        { text: "Ils ont pu courir", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "They can't sleep / They are not able to sleep (female)",
      hint: "Use negative present tense of 'pouvoir' with elles and dormir",
      answerOptions: [
        { text: "Elles ne pouvaient pas dormir", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Elles ne pourront pas dormir", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Elles ne peuvent pas dormir", rationale: "Correct! 'Elles ne peuvent pas dormir' means 'They can't sleep' (female).", isCorrect: true },
        { text: "Elles n'ont pu pas dormir", rationale: "Wrong tense and incorrect negation structure.", isCorrect: false }
      ]
    },
    {
      question: "Can I call? / Am I able to call?",
      hint: "Use question form of 'pouvoir' with je and appeler",
      answerOptions: [
        { text: "Pourrai-je appeler ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Est-ce que je peux appeler ?", rationale: "Correct! 'Est-ce que je peux appeler ?' means 'Can I call?'", isCorrect: true },
        { text: "Pouvais-je appeler ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ai-je pu appeler ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Can you wait? / Are you able to wait? (informal)",
      hint: "Use question form of 'pouvoir' with tu and attendre",
      answerOptions: [
        { text: "Pouvais-tu attendre ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Pourras-tu attendre ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Peux-tu attendre ?", rationale: "Correct! 'Peux-tu attendre ?' means 'Can you wait?' (informal).", isCorrect: true },
        { text: "As-tu pu attendre ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Can't she hear? / Isn't she able to hear?",
      hint: "Use negative question form of 'pouvoir' with elle and entendre",
      answerOptions: [
        { text: "Ne pourra-t-elle pas entendre ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ne peut-elle pas entendre ?", rationale: "Correct! 'Ne peut-elle pas entendre ?' means 'Can't she hear?'", isCorrect: true },
        { text: "Ne pouvait-elle pas entendre ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "N'a-t-elle pas pu entendre ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Can't they learn? / Aren't they able to learn? (male / mixed)",
      hint: "Use negative question form of 'pouvoir' with ils and apprendre",
      answerOptions: [
        { text: "Ne pourront-ils pas apprendre ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ne pouvaient-ils pas apprendre ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ne peuvent-ils pas apprendre ?", rationale: "Correct! 'Ne peuvent-ils pas apprendre ?' means 'Can't they learn?' (male/mixed).", isCorrect: true },
        { text: "N'ont-ils pas pu apprendre ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    }
  ],

  "besoin": [
    {
      question: "I need a book / I am needing a book",
      hint: "Use present tense of 'avoir besoin de' with je and un livre",
      answerOptions: [
        { text: "J'aurai besoin d'un livre", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "J'ai besoin d'un livre", rationale: "Correct! 'J'ai besoin d'un livre' means 'I need a book' in present tense.", isCorrect: true },
        { text: "J'avais besoin d'un livre", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "J'ai eu besoin d'un livre", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "You don't need help / You are not needing help (informal)",
      hint: "Use negative present tense of 'avoir besoin de' with tu and aide",
      answerOptions: [
        { text: "Tu n'avais pas besoin d'aide", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Tu n'auras pas besoin d'aide", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Tu n'as pas besoin d'aide", rationale: "Correct! 'Tu n'as pas besoin d'aide' means 'You don't need help' (informal).", isCorrect: true },
        { text: "Tu n'as eu pas besoin d'aide", rationale: "Wrong tense and incorrect negation structure.", isCorrect: false }
      ]
    },
    {
      question: "He needs money / He is needing money",
      hint: "Use present tense of 'avoir besoin de' with il and argent",
      answerOptions: [
        { text: "Il avait besoin d'argent", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Il a besoin d'argent", rationale: "Correct! 'Il a besoin d'argent' means 'He needs money' in present tense.", isCorrect: true },
        { text: "Il aura besoin d'argent", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Il a eu besoin d'argent", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "She doesn't need a car / She is not needing a car",
      hint: "Use negative present tense of 'avoir besoin de' with elle and une voiture",
      answerOptions: [
        { text: "Elle n'a eu besoin d'une voiture", rationale: "Wrong tense and missing negation particle 'pas'.", isCorrect: false },
        { text: "Elle n'aura pas besoin d'une voiture", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Elle n'a pas besoin d'une voiture", rationale: "Correct! 'Elle n'a pas besoin d'une voiture' means 'She doesn't need a car'.", isCorrect: true },
        { text: "Elle n'avait pas besoin d'une voiture", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false }
      ]
    },
    {
      question: "We need time / We are needing time",
      hint: "Use present tense of 'avoir besoin de' with nous and temps",
      answerOptions: [
        { text: "Nous avons eu besoin de temps", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false },
        { text: "Nous avons besoin de temps", rationale: "Correct! 'Nous avons besoin de temps' means 'We need time' in present tense.", isCorrect: true },
        { text: "Nous aurons besoin de temps", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Nous avions besoin de temps", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false }
      ]
    },
    {
      question: "You need rest / You are needing rest (formal)",
      hint: "Use present tense of 'avoir besoin de' with vous and repos",
      answerOptions: [
        { text: "Vous aviez besoin de repos", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Vous avez besoin de repos", rationale: "Correct! 'Vous avez besoin de repos' means 'You need rest' (formal).", isCorrect: true },
        { text: "Vous aurez besoin de repos", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Vous avez eu besoin de repos", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "They need water / They are needing water (male / mixed)",
      hint: "Use present tense of 'avoir besoin de' with ils and eau",
      answerOptions: [
        { text: "Ils auront besoin d'eau", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Ils avaient besoin d'eau", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ils ont besoin d'eau", rationale: "Correct! 'Ils ont besoin d'eau' means 'They need water' (male/mixed).", isCorrect: true },
        { text: "Ils ont eu besoin d'eau", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "They don't need food / They are not needing food (female)",
      hint: "Use negative present tense of 'avoir besoin de' with elles and nourriture",
      answerOptions: [
        { text: "Elles n'avaient pas besoin de nourriture", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Elles n'auront pas besoin de nourriture", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Elles n'ont pas besoin de nourriture", rationale: "Correct! 'Elles n'ont pas besoin de nourriture' means 'They don't need food' (female).", isCorrect: true },
        { text: "Elles n'ont eu pas besoin de nourriture", rationale: "Wrong tense and incorrect negation structure.", isCorrect: false }
      ]
    },
    {
      question: "Do I need a break? / Am I needing a break?",
      hint: "Use question form of 'avoir besoin de' with je and une pause",
      answerOptions: [
        { text: "Aurai-je besoin d'une pause ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "Est-ce que j'ai besoin d'une pause ?", rationale: "Correct! 'Est-ce que j'ai besoin d'une pause ?' means 'Do I need a break?'", isCorrect: true },
        { text: "Avais-je besoin d'une pause ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ai-je eu besoin d'une pause ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Do you need sugar? / Are you needing sugar? (informal)",
      hint: "Use question form of 'avoir besoin de' with tu and sucre",
      answerOptions: [
        { text: "Avais-tu besoin de sucre ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Auras-tu besoin de sucre ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "As-tu besoin de sucre ?", rationale: "Correct! 'As-tu besoin de sucre ?' means 'Do you need sugar?' (informal).", isCorrect: true },
        { text: "As-tu eu besoin de sucre ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Doesn't he need sleep? / Isn't he needing sleep?",
      hint: "Use negative question form of 'avoir besoin de' with il and sommeil",
      answerOptions: [
        { text: "N'aura-t-il pas besoin de sommeil ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "N'a-t-il pas besoin de sommeil ?", rationale: "Correct! 'N'a-t-il pas besoin de sommeil ?' means 'Doesn't he need sleep?'", isCorrect: true },
        { text: "N'avait-il pas besoin de sommeil ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "N'a-t-il pas eu besoin de sommeil ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    },
    {
      question: "Don't they need permission? / Aren't they needing permission? (female)",
      hint: "Use negative question form of 'avoir besoin de' with elles and permission",
      answerOptions: [
        { text: "N'auront-elles pas besoin de permission ?", rationale: "Wrong tense - this is future, not present.", isCorrect: false },
        { text: "N'avaient-elles pas besoin de permission ?", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "N'ont-elles pas besoin de permission ?", rationale: "Correct! 'N'ont-elles pas besoin de permission ?' means 'Don't they need permission?' (female).", isCorrect: true },
        { text: "N'ont-elles pas eu besoin de permission ?", rationale: "Wrong tense - this is past perfect, not present.", isCorrect: false }
      ]
    }
  ]
};

// Elementary Level Passé Composé Quiz Data
export const ELEMENTARY_PASSE_COMPOSE_QUESTIONS: Record<string, ElementaryQuizQuestion[]> = {
  "besoin": [
    {
      question: "I needed a book / I have needed a book",
      hint: "Use passé composé of 'avoir besoin de' with je and un livre",
      answerOptions: [
        { text: "Tu as eu besoin d'un livre", rationale: "Wrong person - this is 'you needed', not 'I needed'.", isCorrect: false },
        { text: "J'ai eu besoin d'un livre", rationale: "Correct! 'J'ai eu besoin d'un livre' means 'I needed a book' in passé composé.", isCorrect: true },
        { text: "Il a eu besoin d'un livre", rationale: "Wrong person - this is 'he needed', not 'I needed'.", isCorrect: false },
        { text: "Nous avons eu besoin d'un livre", rationale: "Wrong person - this is 'we needed', not 'I needed'.", isCorrect: false }
      ]
    },
    {
      question: "You needed a problem / You have needed a problem (informal)",
      hint: "Use passé composé of 'avoir besoin de' with tu and un problème",
      answerOptions: [
        { text: "J'ai eu besoin d'un problème", rationale: "Wrong person - this is 'I needed', not 'you needed'.", isCorrect: false },
        { text: "Tu as eu besoin d'un problème", rationale: "Correct! 'Tu as eu besoin d'un problème' means 'You needed a problem' (informal).", isCorrect: true },
        { text: "Vous avez eu besoin d'un problème", rationale: "Wrong formality - this is formal/plural, question asks for informal tu.", isCorrect: false },
        { text: "Ils ont eu besoin d'un problème", rationale: "Wrong person - this is 'they needed', not 'you needed'.", isCorrect: false }
      ]
    },
    {
      question: "He needed help / He has needed help",
      hint: "Use passé composé of 'avoir besoin de' with il and aide",
      answerOptions: [
        { text: "Elle a eu besoin d'aide", rationale: "Wrong gender - this is 'she needed', not 'he needed'.", isCorrect: false },
        { text: "Il a eu besoin d'aide", rationale: "Correct! 'Il a eu besoin d'aide' means 'He needed help' in passé composé.", isCorrect: true },
        { text: "Tu as eu besoin d'aide", rationale: "Wrong person - this is 'you needed', not 'he needed'.", isCorrect: false },
        { text: "Ils ont eu besoin d'aide", rationale: "Wrong person - this is 'they needed', not 'he needed'.", isCorrect: false }
      ]
    },
    {
      question: "She needed rest / She has needed rest",
      hint: "Use passé composé of 'avoir besoin de' with elle and repos",
      answerOptions: [
        { text: "Il a eu besoin de repos", rationale: "Wrong gender - this is 'he needed', not 'she needed'.", isCorrect: false },
        { text: "Elle a eu besoin de repos", rationale: "Correct! 'Elle a eu besoin de repos' means 'She needed rest' in passé composé.", isCorrect: true },
        { text: "Elles ont eu besoin de repos", rationale: "Wrong number - this is 'they needed' (plural), not 'she needed'.", isCorrect: false },
        { text: "Tu as eu besoin de repos", rationale: "Wrong person - this is 'you needed', not 'she needed'.", isCorrect: false }
      ]
    },
    {
      question: "We needed water / We have needed water",
      hint: "Use passé composé of 'avoir besoin de' with nous and eau",
      answerOptions: [
        { text: "Vous avez eu besoin d'eau", rationale: "Wrong person - this is 'you needed', not 'we needed'.", isCorrect: false },
        { text: "Nous avons eu besoin d'eau", rationale: "Correct! 'Nous avons eu besoin d'eau' means 'We needed water' in passé composé.", isCorrect: true },
        { text: "Ils ont eu besoin d'eau", rationale: "Wrong person - this is 'they needed', not 'we needed'.", isCorrect: false },
        { text: "J'ai eu besoin d'eau", rationale: "Wrong person - this is 'I needed', not 'we needed'.", isCorrect: false }
      ]
    },
    {
      question: "You needed to eat / You have needed to eat (formal / plural)",
      hint: "Use passé composé of 'avoir besoin de' with vous and manger",
      answerOptions: [
        { text: "Tu as eu besoin de manger", rationale: "Wrong formality - this is informal, question asks for formal vous.", isCorrect: false },
        { text: "Vous avez eu besoin de manger", rationale: "Correct! 'Vous avez eu besoin de manger' means 'You needed to eat' (formal/plural).", isCorrect: true },
        { text: "Nous avons eu besoin de manger", rationale: "Wrong person - this is 'we needed', not 'you needed'.", isCorrect: false },
        { text: "Ils ont eu besoin de manger", rationale: "Wrong person - this is 'they needed', not 'you needed'.", isCorrect: false }
      ]
    },
    {
      question: "They needed to go (male / mixed)",
      hint: "Use passé composé of 'avoir besoin de' with ils and aller",
      answerOptions: [
        { text: "Elles ont eu besoin d'aller", rationale: "Wrong gender - this is feminine 'they needed', not masculine/mixed.", isCorrect: false },
        { text: "Ils ont eu besoin d'aller", rationale: "Correct! 'Ils ont eu besoin d'aller' means 'They needed to go' (male/mixed).", isCorrect: true },
        { text: "Ils avaient besoin d'aller", rationale: "Wrong tense - this is imperfect, not passé composé.", isCorrect: false },
        { text: "Ils auront besoin d'aller", rationale: "Wrong tense - this is future, not passé composé.", isCorrect: false }
      ]
    },
    {
      question: "They needed to sleep (female)",
      hint: "Use passé composé of 'avoir besoin de' with elles and dormir",
      answerOptions: [
        { text: "Ils ont eu besoin de dormir", rationale: "Wrong gender - this is masculine/mixed 'they needed', not feminine.", isCorrect: false },
        { text: "Elles ont eu besoin de dormir", rationale: "Correct! 'Elles ont eu besoin de dormir' means 'They needed to sleep' (female).", isCorrect: true },
        { text: "Elles avaient besoin de dormir", rationale: "Wrong tense - this is imperfect, not passé composé.", isCorrect: false },
        { text: "Elles auront besoin de dormir", rationale: "Wrong tense - this is future, not passé composé.", isCorrect: false }
      ]
    },
    {
      question: "I did not need a book / I have not needed a book",
      hint: "Use negative passé composé of 'avoir besoin de' with je and un livre",
      answerOptions: [
        { text: "Tu n'as pas eu besoin d'un livre", rationale: "Wrong person - this is 'you didn't need', not 'I didn't need'.", isCorrect: false },
        { text: "Je n'ai pas eu besoin d'un livre", rationale: "Correct! 'Je n'ai pas eu besoin d'un livre' means 'I did not need a book'.", isCorrect: true },
        { text: "Il n'a pas eu besoin d'un livre", rationale: "Wrong person - this is 'he didn't need', not 'I didn't need'.", isCorrect: false },
        { text: "Nous n'avons pas eu besoin d'un livre", rationale: "Wrong person - this is 'we didn't need', not 'I didn't need'.", isCorrect: false }
      ]
    },
    {
      question: "You did not need a problem / You have not needed a problem (informal)",
      hint: "Use negative passé composé of 'avoir besoin de' with tu and un problème",
      answerOptions: [
        { text: "Je n'ai pas eu besoin d'un problème", rationale: "Wrong person - this is 'I didn't need', not 'you didn't need'.", isCorrect: false },
        { text: "Tu n'as pas eu besoin d'un problème", rationale: "Correct! 'Tu n'as pas eu besoin d'un problème' means 'You did not need a problem' (informal).", isCorrect: true },
        { text: "Vous n'avez pas eu besoin d'un problème", rationale: "Wrong formality - this is formal/plural, question asks for informal tu.", isCorrect: false },
        { text: "Ils n'ont pas eu besoin d'un problème", rationale: "Wrong person - this is 'they didn't need', not 'you didn't need'.", isCorrect: false }
      ]
    },
    {
      question: "He did not need help / He has not needed help",
      hint: "Use negative passé composé of 'avoir besoin de' with il and aide",
      answerOptions: [
        { text: "Elle n'a pas eu besoin d'aide", rationale: "Wrong gender - this is 'she didn't need', not 'he didn't need'.", isCorrect: false },
        { text: "Il n'a pas eu besoin d'aide", rationale: "Correct! 'Il n'a pas eu besoin d'aide' means 'He did not need help'.", isCorrect: true },
        { text: "Tu n'as pas eu besoin d'aide", rationale: "Wrong person - this is 'you didn't need', not 'he didn't need'.", isCorrect: false },
        { text: "Ils n'ont pas eu besoin d'aide", rationale: "Wrong person - this is 'they didn't need', not 'he didn't need'.", isCorrect: false }
      ]
    },
    {
      question: "She did not need rest / She has not needed rest",
      hint: "Use negative passé composé of 'avoir besoin de' with elle and repos",
      answerOptions: [
        { text: "Il n'a pas eu besoin de repos", rationale: "Wrong gender - this is 'he didn't need', not 'she didn't need'.", isCorrect: false },
        { text: "Elle n'a pas eu besoin de repos", rationale: "Correct! 'Elle n'a pas eu besoin de repos' means 'She did not need rest'.", isCorrect: true },
        { text: "Elles n'ont pas eu besoin de repos", rationale: "Wrong number - this is 'they didn't need' (plural), not 'she didn't need'.", isCorrect: false },
        { text: "Tu n'as pas eu besoin de repos", rationale: "Wrong person - this is 'you didn't need', not 'she didn't need'.", isCorrect: false }
      ]
    },
    {
      question: "We did not need water / We have not needed water",
      hint: "Use negative passé composé of 'avoir besoin de' with nous and eau",
      answerOptions: [
        { text: "Vous n'avez pas eu besoin d'eau", rationale: "Wrong person - this is 'you didn't need', not 'we didn't need'.", isCorrect: false },
        { text: "Nous n'avons pas eu besoin d'eau", rationale: "Correct! 'Nous n'avons pas eu besoin d'eau' means 'We did not need water'.", isCorrect: true },
        { text: "Ils n'ont pas eu besoin d'eau", rationale: "Wrong person - this is 'they didn't need', not 'we didn't need'.", isCorrect: false },
        { text: "Je n'ai pas eu besoin d'eau", rationale: "Wrong person - this is 'I didn't need', not 'we didn't need'.", isCorrect: false }
      ]
    },
    {
      question: "You did not need to eat / You have not needed to eat (formal / plural)",
      hint: "Use negative passé composé of 'avoir besoin de' with vous and manger",
      answerOptions: [
        { text: "Tu n'as pas eu besoin de manger", rationale: "Wrong formality - this is informal, question asks for formal vous.", isCorrect: false },
        { text: "Vous n'avez pas eu besoin de manger", rationale: "Correct! 'Vous n'avez pas eu besoin de manger' means 'You did not need to eat' (formal/plural).", isCorrect: true },
        { text: "Nous n'avons pas eu besoin de manger", rationale: "Wrong person - this is 'we didn't need', not 'you didn't need'.", isCorrect: false },
        { text: "Ils n'ont pas eu besoin de manger", rationale: "Wrong person - this is 'they didn't need', not 'you didn't need'.", isCorrect: false }
      ]
    },
    {
      question: "Did I need a book? / Have I needed a book?",
      hint: "Use question form of passé composé 'avoir besoin de' with je and un livre",
      answerOptions: [
        { text: "As-tu eu besoin d'un livre ?", rationale: "Wrong person - this asks 'Did you need', not 'Did I need'.", isCorrect: false },
        { text: "Ai-je eu besoin d'un livre ?", rationale: "Correct! 'Ai-je eu besoin d'un livre ?' means 'Did I need a book?'", isCorrect: true },
        { text: "A-t-il eu besoin d'un livre ?", rationale: "Wrong person - this asks 'Did he need', not 'Did I need'.", isCorrect: false },
        { text: "Avons-nous eu besoin d'un livre ?", rationale: "Wrong person - this asks 'Did we need', not 'Did I need'.", isCorrect: false }
      ]
    },
    {
      question: "Did you need a problem? / Have you needed a problem? (informal)",
      hint: "Use question form of passé composé 'avoir besoin de' with tu and un problème",
      answerOptions: [
        { text: "Ai-je eu besoin d'un problème ?", rationale: "Wrong person - this asks 'Did I need', not 'Did you need'.", isCorrect: false },
        { text: "As-tu eu besoin d'un problème ?", rationale: "Correct! 'As-tu eu besoin d'un problème ?' means 'Did you need a problem?' (informal).", isCorrect: true },
        { text: "A-t-il eu besoin d'un problème ?", rationale: "Wrong person - this asks 'Did he need', not 'Did you need'.", isCorrect: false },
        { text: "Avez-vous eu besoin d'un problème ?", rationale: "Wrong formality - this is formal/plural, question asks for informal tu.", isCorrect: false }
      ]
    },
    {
      question: "Did he need help? / Has he needed help?",
      hint: "Use question form of passé composé 'avoir besoin de' with il and aide",
      answerOptions: [
        { text: "A-t-elle eu besoin d'aide ?", rationale: "Wrong gender - this asks 'Did she need', not 'Did he need'.", isCorrect: false },
        { text: "A-t-il eu besoin d'aide ?", rationale: "Correct! 'A-t-il eu besoin d'aide ?' means 'Did he need help?'", isCorrect: true },
        { text: "Ai-je eu besoin d'aide ?", rationale: "Wrong person - this asks 'Did I need', not 'Did he need'.", isCorrect: false },
        { text: "As-tu eu besoin d'aide ?", rationale: "Wrong person - this asks 'Did you need', not 'Did he need'.", isCorrect: false }
      ]
    },
    {
      question: "Didn't I need a book? / Haven't I needed a book?",
      hint: "Use negative question form of passé composé 'avoir besoin de' with je and un livre",
      answerOptions: [
        { text: "N'as-tu pas eu besoin d'un livre ?", rationale: "Wrong person - this asks 'Didn't you need', not 'Didn't I need'.", isCorrect: false },
        { text: "N'ai-je pas eu besoin d'un livre ?", rationale: "Correct! 'N'ai-je pas eu besoin d'un livre ?' means 'Didn't I need a book?'", isCorrect: true },
        { text: "N'a-t-il pas eu besoin d'un livre ?", rationale: "Wrong person - this asks 'Didn't he need', not 'Didn't I need'.", isCorrect: false },
        { text: "N'avons-nous pas eu besoin d'un livre ?", rationale: "Wrong person - this asks 'Didn't we need', not 'Didn't I need'.", isCorrect: false }
      ]
    },
    {
      question: "Didn't you need a problem? / Haven't you needed a problem? (informal)",
      hint: "Use negative question form of passé composé 'avoir besoin de' with tu and un problème",
      answerOptions: [
        { text: "N'ai-je pas eu besoin d'un problème ?", rationale: "Wrong person - this asks 'Didn't I need', not 'Didn't you need'.", isCorrect: false },
        { text: "N'as-tu pas eu besoin d'un problème ?", rationale: "Correct! 'N'as-tu pas eu besoin d'un problème ?' means 'Didn't you need a problem?' (informal).", isCorrect: true },
        { text: "N'a-t-il pas eu besoin d'un problème ?", rationale: "Wrong person - this asks 'Didn't he need', not 'Didn't you need'.", isCorrect: false },
        { text: "N'avez-vous pas eu besoin d'un problème ?", rationale: "Wrong formality - this is formal/plural, question asks for informal tu.", isCorrect: false }
      ]
    },
    {
      question: "Didn't he need help? / Hasn't he needed help?",
      hint: "Use negative question form of passé composé 'avoir besoin de' with il and aide",
      answerOptions: [
        { text: "N'a-t-elle pas eu besoin d'aide ?", rationale: "Wrong gender - this asks 'Didn't she need', not 'Didn't he need'.", isCorrect: false },
        { text: "N'a-t-il pas eu besoin d'aide ?", rationale: "Correct! 'N'a-t-il pas eu besoin d'aide ?' means 'Didn't he need help?'", isCorrect: true },
        { text: "N'ai-je pas eu besoin d'aide ?", rationale: "Wrong person - this asks 'Didn't I need', not 'Didn't he need'.", isCorrect: false },
        { text: "N'as-tu pas eu besoin d'aide ?", rationale: "Wrong person - this asks 'Didn't you need', not 'Didn't he need'.", isCorrect: false }
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