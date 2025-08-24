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
        { text: "J'ai besoin d'un livre", rationale: "Correct! 'J'ai besoin d'un livre' means 'I need a book' in present tense.", isCorrect: true },
        { text: "Tu as besoin d'un livre", rationale: "Wrong person - this is 'you need', not 'I need'.", isCorrect: false },
        { text: "Il a besoin d'un livre", rationale: "Wrong person - this is 'he needs', not 'I need'.", isCorrect: false },
        { text: "Nous avons besoin d'un livre", rationale: "Wrong person - this is 'we need', not 'I need'.", isCorrect: false }
      ]
    },
    {
      question: "You need a problem / You are needing a problem (informal)",
      hint: "Use present tense of 'avoir besoin de' with tu (informal)",
      answerOptions: [
        { text: "Tu as besoin d'un problème", rationale: "Correct! 'Tu as besoin d'un problème' means 'you need a problem' (informal).", isCorrect: true },
        { text: "J'ai besoin d'un problème", rationale: "Wrong person - this is 'I need', not 'you need'.", isCorrect: false },
        { text: "Vous avez besoin d'un problème", rationale: "Wrong formality - this is formal 'you', question asks for informal.", isCorrect: false },
        { text: "Ils ont besoin d'un problème", rationale: "Wrong person - this is 'they need', not 'you need'.", isCorrect: false }
      ]
    },
    {
      question: "He needs help / He is needing help",
      hint: "Use present tense of 'avoir besoin de' with il and aide",
      answerOptions: [
        { text: "Il a besoin d'aide", rationale: "Correct! 'Il a besoin d'aide' means 'he needs help'.", isCorrect: true },
        { text: "Elle a besoin d'aide", rationale: "Wrong gender - this is 'she needs', not 'he needs'.", isCorrect: false },
        { text: "Tu as besoin d'aide", rationale: "Wrong person - this is 'you need', not 'he needs'.", isCorrect: false },
        { text: "Ils ont besoin d'aide", rationale: "Wrong person - this is 'they need', not 'he needs'.", isCorrect: false }
      ]
    },
    {
      question: "She needs a rest / She is needing a rest",
      hint: "Use present tense of 'avoir besoin de' with elle and repos",
      answerOptions: [
        { text: "Elle a besoin de repos", rationale: "Correct! 'Elle a besoin de repos' means 'she needs a rest'.", isCorrect: true },
        { text: "Il a besoin de repos", rationale: "Wrong gender - this is 'he needs', not 'she needs'.", isCorrect: false },
        { text: "Elles ont besoin de repos", rationale: "Wrong number - this is 'they need' (feminine plural), not 'she needs'.", isCorrect: false },
        { text: "Tu as besoin de repos", rationale: "Wrong person - this is 'you need', not 'she needs'.", isCorrect: false }
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
        { text: "Vous avez besoin de manger", rationale: "Correct! 'Vous avez besoin de manger' means 'you need to eat' (formal/plural).", isCorrect: true },
        { text: "Tu as besoin de manger", rationale: "Wrong formality - this is informal 'you', question asks for formal/plural.", isCorrect: false },
        { text: "Nous avons besoin de manger", rationale: "Wrong person - this is 'we need', not 'you need'.", isCorrect: false },
        { text: "Ils ont besoin de manger", rationale: "Wrong person - this is 'they need', not 'you need'.", isCorrect: false }
      ]
    },
    {
      question: "They need to go (male / mixed)",
      hint: "Use present tense of 'avoir besoin de' with ils and aller",
      answerOptions: [
        { text: "Ils ont besoin d'aller", rationale: "Correct! 'Ils ont besoin d'aller' means 'they need to go' (masculine/mixed).", isCorrect: true },
        { text: "Elles ont besoin d'aller", rationale: "Wrong gender - this is feminine 'they', question specifies masculine/mixed.", isCorrect: false },
        { text: "Ils avaient besoin d'aller", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Ils auront besoin d'aller", rationale: "Wrong tense - this is future, not present.", isCorrect: false }
      ]
    },
    {
      question: "They need to sleep (female)",
      hint: "Use present tense of 'avoir besoin de' with elles and dormir",
      answerOptions: [
        { text: "Elles ont besoin de dormir", rationale: "Correct! 'Elles ont besoin de dormir' means 'they need to sleep' (feminine).", isCorrect: true },
        { text: "Ils ont besoin de dormir", rationale: "Wrong gender - this is masculine 'they', question specifies feminine.", isCorrect: false },
        { text: "Elles avaient besoin de dormir", rationale: "Wrong tense - this is imperfect past, not present.", isCorrect: false },
        { text: "Elles auront besoin de dormir", rationale: "Wrong tense - this is future, not present.", isCorrect: false }
      ]
    },
    // Negative statements
    {
      question: "I do not need a book / I am not needing a book",
      hint: "Use negative present tense 'ne...pas' with avoir besoin de",
      answerOptions: [
        { text: "Je n'ai pas besoin d'un livre", rationale: "Correct! 'Je n'ai pas besoin d'un livre' means 'I do not need a book'.", isCorrect: true },
        { text: "Tu n'as pas besoin d'un livre", rationale: "Wrong person - this is 'you don't need', not 'I don't need'.", isCorrect: false },
        { text: "Il n'a pas besoin d'un livre", rationale: "Wrong person - this is 'he doesn't need', not 'I don't need'.", isCorrect: false },
        { text: "Nous n'avons pas besoin d'un livre", rationale: "Wrong person - this is 'we don't need', not 'I don't need'.", isCorrect: false }
      ]
    },
    {
      question: "You do not need a problem / You are not needing a problem (informal)",
      hint: "Use negative present tense with tu (informal)",
      answerOptions: [
        { text: "Tu n'as pas besoin d'un problème", rationale: "Correct! 'Tu n'as pas besoin d'un problème' means 'you don't need a problem' (informal).", isCorrect: true },
        { text: "Je n'ai pas besoin d'un problème", rationale: "Wrong person - this is 'I don't need', not 'you don't need'.", isCorrect: false },
        { text: "Vous n'avez pas besoin d'un problème", rationale: "Wrong formality - this is formal 'you', question asks for informal.", isCorrect: false },
        { text: "Ils n'ont pas besoin d'un problème", rationale: "Wrong person - this is 'they don't need', not 'you don't need'.", isCorrect: false }
      ]
    },
    {
      question: "He does not need help / He is not needing help",
      hint: "Use negative present tense with il",
      answerOptions: [
        { text: "Il n'a pas besoin d'aide", rationale: "Correct! 'Il n'a pas besoin d'aide' means 'he does not need help'.", isCorrect: true },
        { text: "Elle n'a pas besoin d'aide", rationale: "Wrong gender - this is 'she doesn't need', not 'he doesn't need'.", isCorrect: false },
        { text: "Tu n'as pas besoin d'aide", rationale: "Wrong person - this is 'you don't need', not 'he doesn't need'.", isCorrect: false },
        { text: "Ils n'ont pas besoin d'aide", rationale: "Wrong person - this is 'they don't need', not 'he doesn't need'.", isCorrect: false }
      ]
    },
    {
      question: "She does not need rest / She is not needing rest",
      hint: "Use negative present tense with elle",
      answerOptions: [
        { text: "Elle n'a pas besoin de repos", rationale: "Correct! 'Elle n'a pas besoin de repos' means 'she does not need rest'.", isCorrect: true },
        { text: "Il n'a pas besoin de repos", rationale: "Wrong gender - this is 'he doesn't need', not 'she doesn't need'.", isCorrect: false },
        { text: "Elles n'ont pas besoin de repos", rationale: "Wrong number - this is 'they don't need' (feminine plural), not 'she doesn't need'.", isCorrect: false },
        { text: "Tu n'as pas besoin de repos", rationale: "Wrong person - this is 'you don't need', not 'she doesn't need'.", isCorrect: false }
      ]
    },
    {
      question: "We do not need water / We are not needing water",
      hint: "Use negative present tense with nous",
      answerOptions: [
        { text: "Nous n'avons pas besoin d'eau", rationale: "Correct! 'Nous n'avons pas besoin d'eau' means 'we do not need water'.", isCorrect: true },
        { text: "Vous n'avez pas besoin d'eau", rationale: "Wrong person - this is 'you don't need', not 'we don't need'.", isCorrect: false },
        { text: "Ils n'ont pas besoin d'eau", rationale: "Wrong person - this is 'they don't need', not 'we don't need'.", isCorrect: false },
        { text: "Je n'ai pas besoin d'eau", rationale: "Wrong person - this is 'I don't need', not 'we don't need'.", isCorrect: false }
      ]
    },
    {
      question: "You do not need to eat / You are not needing to eat (formal / plural)",
      hint: "Use negative present tense with vous (formal/plural)",
      answerOptions: [
        { text: "Vous n'avez pas besoin de manger", rationale: "Correct! 'Vous n'avez pas besoin de manger' means 'you do not need to eat' (formal/plural).", isCorrect: true },
        { text: "Tu n'as pas besoin de manger", rationale: "Wrong formality - this is informal 'you', question asks for formal/plural.", isCorrect: false },
        { text: "Nous n'avons pas besoin de manger", rationale: "Wrong person - this is 'we don't need', not 'you don't need'.", isCorrect: false },
        { text: "Ils n'ont pas besoin de manger", rationale: "Wrong person - this is 'they don't need', not 'you don't need'.", isCorrect: false }
      ]
    },
    // Positive questions
    {
      question: "Do I need a book? / Am I needing a book?",
      hint: "Use interrogative form with inversion: Ai-je",
      answerOptions: [
        { text: "Ai-je besoin d'un livre ?", rationale: "Correct! 'Ai-je besoin d'un livre ?' means 'Do I need a book?' in interrogative form.", isCorrect: true },
        { text: "As-tu besoin d'un livre ?", rationale: "Wrong person - this is 'Do you need?', not 'Do I need?'.", isCorrect: false },
        { text: "A-t-il besoin d'un livre ?", rationale: "Wrong person - this is 'Does he need?', not 'Do I need?'.", isCorrect: false },
        { text: "Avons-nous besoin d'un livre ?", rationale: "Wrong person - this is 'Do we need?', not 'Do I need?'.", isCorrect: false }
      ]
    },
    {
      question: "Do you need a problem? / Are you needing a problem? (informal)",
      hint: "Use interrogative form with inversion: As-tu",
      answerOptions: [
        { text: "As-tu besoin d'un problème ?", rationale: "Correct! 'As-tu besoin d'un problème ?' means 'Do you need a problem?' (informal).", isCorrect: true },
        { text: "Ai-je besoin d'un problème ?", rationale: "Wrong person - this is 'Do I need?', not 'Do you need?'.", isCorrect: false },
        { text: "A-t-il besoin d'un problème ?", rationale: "Wrong person - this is 'Does he need?', not 'Do you need?'.", isCorrect: false },
        { text: "Avez-vous besoin d'un problème ?", rationale: "Wrong formality - this is formal 'you', question asks for informal.", isCorrect: false }
      ]
    },
    {
      question: "Does he need help? / Is he needing help?",
      hint: "Use interrogative form with inversion: A-t-il",
      answerOptions: [
        { text: "A-t-il besoin d'aide ?", rationale: "Correct! 'A-t-il besoin d'aide ?' means 'Does he need help?'.", isCorrect: true },
        { text: "A-t-elle besoin d'aide ?", rationale: "Wrong gender - this is 'Does she need?', not 'Does he need?'.", isCorrect: false },
        { text: "Ai-je besoin d'aide ?", rationale: "Wrong person - this is 'Do I need?', not 'Does he need?'.", isCorrect: false },
        { text: "As-tu besoin d'aide ?", rationale: "Wrong person - this is 'Do you need?', not 'Does he need?'.", isCorrect: false }
      ]
    },
    // Negative questions
    {
      question: "Don't I need a book? / Am I not needing a book?",
      hint: "Use negative interrogative form: N'ai-je pas",
      answerOptions: [
        { text: "N'ai-je pas besoin d'un livre ?", rationale: "Correct! 'N'ai-je pas besoin d'un livre ?' means 'Don't I need a book?'.", isCorrect: true },
        { text: "N'as-tu pas besoin d'un livre ?", rationale: "Wrong person - this is 'Don't you need?', not 'Don't I need?'.", isCorrect: false },
        { text: "N'a-t-il pas besoin d'un livre ?", rationale: "Wrong person - this is 'Doesn't he need?', not 'Don't I need?'.", isCorrect: false },
        { text: "N'avons-nous pas besoin d'un livre ?", rationale: "Wrong person - this is 'Don't we need?', not 'Don't I need?'.", isCorrect: false }
      ]
    },
    {
      question: "Don't you need a problem? / Are you not needing a problem? (informal)",
      hint: "Use negative interrogative form: N'as-tu pas",
      answerOptions: [
        { text: "N'as-tu pas besoin d'un problème ?", rationale: "Correct! 'N'as-tu pas besoin d'un problème ?' means 'Don't you need a problem?' (informal).", isCorrect: true },
        { text: "N'ai-je pas besoin d'un problème ?", rationale: "Wrong person - this is 'Don't I need?', not 'Don't you need?'.", isCorrect: false },
        { text: "N'a-t-il pas besoin d'un problème ?", rationale: "Wrong person - this is 'Doesn't he need?', not 'Don't you need?'.", isCorrect: false },
        { text: "N'avez-vous pas besoin d'un problème ?", rationale: "Wrong formality - this is formal 'you', question asks for informal.", isCorrect: false }
      ]
    },
    {
      question: "Doesn't he need help? / Isn't he needing help?",
      hint: "Use negative interrogative form: N'a-t-il pas",
      answerOptions: [
        { text: "N'a-t-il pas besoin d'aide ?", rationale: "Correct! 'N'a-t-il pas besoin d'aide ?' means 'Doesn't he need help?'.", isCorrect: true },
        { text: "N'a-t-elle pas besoin d'aide ?", rationale: "Wrong gender - this is 'Doesn't she need?', not 'Doesn't he need?'.", isCorrect: false },
        { text: "N'ai-je pas besoin d'aide ?", rationale: "Wrong person - this is 'Don't I need?', not 'Doesn't he need?'.", isCorrect: false },
        { text: "N'as-tu pas besoin d'aide ?", rationale: "Wrong person - this is 'Don't you need?', not 'Doesn't he need?'.", isCorrect: false }
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