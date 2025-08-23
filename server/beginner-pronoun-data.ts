// Beginner level pronoun-focused questions for être, avoir, faire
// Focus on simple subject pronoun conjugations (Je suis, Tu es, Il/Elle est, etc.)

export interface BeginnerPronounQuestion {
  question: string;
  hint: string;
  answerOptions: Array<{
    text: string;
    rationale: string;
    isCorrect: boolean;
  }>;
}

// Complete beginner pronoun questions based on provided curriculum
export const BEGINNER_PRONOUN_QUESTIONS: Record<string, Record<string, BeginnerPronounQuestion[]>> = {
  "être": {
    "Présent": [
      // Positive statements (8 questions)
      {
        question: "I am",
        hint: "First person singular of être in present tense",
        answerOptions: [
          { text: "Tu es", rationale: "This means 'you are' (informal).", isCorrect: false },
          { text: "Je suis", rationale: "Correct! 'Je suis' is 'I am' in French present tense.", isCorrect: true },
          { text: "Il est", rationale: "This means 'he is'.", isCorrect: false },
          { text: "Nous sommes", rationale: "This means 'we are'.", isCorrect: false }
        ]
      },
      {
        question: "You are (informal)",
        hint: "Second person singular of être in present tense",
        answerOptions: [
          { text: "Je suis", rationale: "This means 'I am'.", isCorrect: false },
          { text: "Vous êtes", rationale: "This means 'you are' (formal/plural).", isCorrect: false },
          { text: "Tu es", rationale: "Correct! 'Tu es' is 'you are' (informal) in French present tense.", isCorrect: true },
          { text: "Ils sont", rationale: "This means 'they are'.", isCorrect: false }
        ]
      },
      {
        question: "He is",
        hint: "Third person singular masculine of être in present tense",
        answerOptions: [
          { text: "Elle est", rationale: "This means 'she is'.", isCorrect: false },
          { text: "Tu es", rationale: "This means 'you are' (informal).", isCorrect: false },
          { text: "Ils sont", rationale: "This means 'they are'.", isCorrect: false },
          { text: "Il est", rationale: "Correct! 'Il est' is 'he is' in French present tense.", isCorrect: true }
        ]
      },
      {
        question: "She is",
        hint: "Third person singular feminine of être in present tense",
        answerOptions: [
          { text: "Il est", rationale: "This means 'he is'.", isCorrect: false },
          { text: "Elle est", rationale: "Correct! 'Elle est' is 'she is' in French present tense.", isCorrect: true },
          { text: "Elles sont", rationale: "This means 'they are' (feminine).", isCorrect: false },
          { text: "Tu es", rationale: "This means 'you are' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We are",
        hint: "First person plural of être in present tense",
        answerOptions: [
          { text: "Vous êtes", rationale: "This means 'you are' (formal/plural).", isCorrect: false },
          { text: "Ils sont", rationale: "This means 'they are'.", isCorrect: false },
          { text: "Je suis", rationale: "This means 'I am'.", isCorrect: false },
          { text: "Nous sommes", rationale: "Correct! 'Nous sommes' is 'we are' in French present tense.", isCorrect: true }
        ]
      },
      {
        question: "You are (formal/plural)",
        hint: "Second person formal/plural of être in present tense",
        answerOptions: [
          { text: "Tu es", rationale: "This means 'you are' (informal).", isCorrect: false },
          { text: "Nous sommes", rationale: "This means 'we are'.", isCorrect: false },
          { text: "Vous êtes", rationale: "Correct! 'Vous êtes' is 'you are' (formal/plural) in French present tense.", isCorrect: true },
          { text: "Ils sont", rationale: "This means 'they are'.", isCorrect: false }
        ]
      },
      {
        question: "They are (male/mixed)",
        hint: "Third person plural masculine/mixed of être in present tense",
        answerOptions: [
          { text: "Elles sont", rationale: "This means 'they are' (feminine only).", isCorrect: false },
          { text: "Ils étaient", rationale: "This is imperfect past tense, not present tense.", isCorrect: false },
          { text: "Ils seront", rationale: "This is future tense, not present tense.", isCorrect: false },
          { text: "Ils sont", rationale: "Correct! 'Ils sont' is 'they are' (masculine/mixed) in French present tense.", isCorrect: true }
        ]
      },
      {
        question: "They are (female)",
        hint: "Third person plural feminine of être in present tense",
        answerOptions: [
          { text: "Ils sont", rationale: "This means 'they are' (masculine/mixed).", isCorrect: false },
          { text: "Elles sont", rationale: "Correct! 'Elles sont' is 'they are' (feminine) in French present tense.", isCorrect: true },
          { text: "Elles étaient", rationale: "This is imperfect past tense, not present tense.", isCorrect: false },
          { text: "Elles seront", rationale: "This is future tense, not present tense.", isCorrect: false }
        ]
      },

      // Negative statements (6 questions)
      {
        question: "I am not",
        hint: "First person singular negative of être in present tense",
        answerOptions: [
          { text: "Tu n'es pas", rationale: "This means 'you are not' (informal).", isCorrect: false },
          { text: "Il n'est pas", rationale: "This means 'he is not'.", isCorrect: false },
          { text: "Je ne suis pas", rationale: "Correct! 'Je ne suis pas' is 'I am not' using French negation ne...pas.", isCorrect: true },
          { text: "Nous ne sommes pas", rationale: "This means 'we are not'.", isCorrect: false }
        ]
      },
      {
        question: "You are not (informal)",
        hint: "Second person singular negative of être in present tense",
        answerOptions: [
          { text: "Je ne suis pas", rationale: "This means 'I am not'.", isCorrect: false },
          { text: "Tu n'es pas", rationale: "Correct! 'Tu n'es pas' is 'you are not' (informal) using French negation.", isCorrect: true },
          { text: "Vous n'êtes pas", rationale: "This means 'you are not' (formal/plural).", isCorrect: false },
          { text: "Ils ne sont pas", rationale: "This means 'they are not'.", isCorrect: false }
        ]
      },
      {
        question: "He is not",
        hint: "Third person singular masculine negative of être in present tense",
        answerOptions: [
          { text: "Elle n'est pas", rationale: "This means 'she is not'.", isCorrect: false },
          { text: "Tu n'es pas", rationale: "This means 'you are not' (informal).", isCorrect: false },
          { text: "Ils ne sont pas", rationale: "This means 'they are not'.", isCorrect: false },
          { text: "Il n'est pas", rationale: "Correct! 'Il n'est pas' is 'he is not' using French negation ne...pas.", isCorrect: true }
        ]
      },
      {
        question: "She is not",
        hint: "Third person singular feminine negative of être in present tense",
        answerOptions: [
          { text: "Il n'est pas", rationale: "This means 'he is not'.", isCorrect: false },
          { text: "Elle n'est pas", rationale: "Correct! 'Elle n'est pas' is 'she is not' using French negation ne...pas.", isCorrect: true },
          { text: "Elles ne sont pas", rationale: "This means 'they are not' (feminine).", isCorrect: false },
          { text: "Tu n'es pas", rationale: "This means 'you are not' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We are not",
        hint: "First person plural negative of être in present tense",
        answerOptions: [
          { text: "Vous n'êtes pas", rationale: "This means 'you are not' (formal/plural).", isCorrect: false },
          { text: "Ils ne sont pas", rationale: "This means 'they are not'.", isCorrect: false },
          { text: "Je ne suis pas", rationale: "This means 'I am not'.", isCorrect: false },
          { text: "Nous ne sommes pas", rationale: "Correct! 'Nous ne sommes pas' is 'we are not' using French negation ne...pas.", isCorrect: true }
        ]
      },
      {
        question: "You are not (formal/plural)",
        hint: "Second person formal/plural negative of être in present tense",
        answerOptions: [
          { text: "Tu n'es pas", rationale: "This means 'you are not' (informal).", isCorrect: false },
          { text: "Vous n'êtes pas", rationale: "Correct! 'Vous n'êtes pas' is 'you are not' (formal/plural) using French negation.", isCorrect: true },
          { text: "Nous ne sommes pas", rationale: "This means 'we are not'.", isCorrect: false },
          { text: "Ils ne sont pas", rationale: "This means 'they are not'.", isCorrect: false }
        ]
      },

      // Positive questions (3 questions)
      {
        question: "Am I?",
        hint: "Interrogative form of first person singular être in present tense",
        answerOptions: [
          { text: "Es-tu ?", rationale: "This means 'Are you?' (informal).", isCorrect: false },
          { text: "Est-il ?", rationale: "This means 'Is he?'.", isCorrect: false },
          { text: "Suis-je ?", rationale: "Correct! 'Suis-je ?' is 'Am I?' in French interrogative form with inversion.", isCorrect: true },
          { text: "Sommes-nous ?", rationale: "This means 'Are we?'.", isCorrect: false }
        ]
      },
      {
        question: "Are you? (informal)",
        hint: "Interrogative form of second person singular être in present tense",
        answerOptions: [
          { text: "Suis-je ?", rationale: "This means 'Am I?'.", isCorrect: false },
          { text: "Es-tu ?", rationale: "Correct! 'Es-tu ?' is 'Are you?' (informal) in French interrogative form.", isCorrect: true },
          { text: "Est-il ?", rationale: "This means 'Is he?'.", isCorrect: false },
          { text: "Êtes-vous ?", rationale: "This means 'Are you?' (formal/plural).", isCorrect: false }
        ]
      },
      {
        question: "Is he?",
        hint: "Interrogative form of third person singular masculine être in present tense",
        answerOptions: [
          { text: "Est-elle ?", rationale: "This means 'Is she?'.", isCorrect: false },
          { text: "Suis-je ?", rationale: "This means 'Am I?'.", isCorrect: false },
          { text: "Es-tu ?", rationale: "This means 'Are you?' (informal).", isCorrect: false },
          { text: "Est-il ?", rationale: "Correct! 'Est-il ?' is 'Is he?' in French interrogative form with inversion.", isCorrect: true }
        ]
      },

      // Negative questions (3 questions)
      {
        question: "Aren't I?",
        hint: "Negative interrogative form of first person singular être in present tense",
        answerOptions: [
          { text: "N'es-tu pas ?", rationale: "This means 'Aren't you?' (informal).", isCorrect: false },
          { text: "N'est-il pas ?", rationale: "This means 'Isn't he?'.", isCorrect: false },
          { text: "Ne sommes-nous pas ?", rationale: "This means 'Aren't we?'.", isCorrect: false },
          { text: "Ne suis-je pas ?", rationale: "Correct! 'Ne suis-je pas ?' is 'Aren't I?' in French negative interrogative form.", isCorrect: true }
        ]
      },
      {
        question: "Aren't you? (informal)",
        hint: "Negative interrogative form of second person singular être in present tense",
        answerOptions: [
          { text: "Ne suis-je pas ?", rationale: "This means 'Aren't I?'.", isCorrect: false },
          { text: "N'es-tu pas ?", rationale: "Correct! 'N'es-tu pas ?' is 'Aren't you?' (informal) in French negative interrogative.", isCorrect: true },
          { text: "N'est-il pas ?", rationale: "This means 'Isn't he?'.", isCorrect: false },
          { text: "N'êtes-vous pas ?", rationale: "This means 'Aren't you?' (formal/plural).", isCorrect: false }
        ]
      },
      {
        question: "Isn't he?",
        hint: "Negative interrogative form of third person singular masculine être in present tense",
        answerOptions: [
          { text: "N'est-elle pas ?", rationale: "This means 'Isn't she?'.", isCorrect: false },
          { text: "Ne suis-je pas ?", rationale: "This means 'Aren't I?'.", isCorrect: false },
          { text: "N'est-il pas ?", rationale: "Correct! 'N'est-il pas ?' is 'Isn't he?' in French negative interrogative form.", isCorrect: true },
          { text: "N'es-tu pas ?", rationale: "This means 'Aren't you?' (informal).", isCorrect: false }
        ]
      }
    ],
    "Passé Composé": [
      {
        question: "I have been",
        hint: "Past participle of être with auxiliary avoir",
        answerOptions: [
          { text: "J'ai été", rationale: "Correct! 'J'ai été' is 'I have been' in French.", isCorrect: true },
          { text: "Tu as été", rationale: "This means 'you have been' (informal).", isCorrect: false },
          { text: "Il a été", rationale: "This means 'he has been'.", isCorrect: false },
          { text: "Nous avons été", rationale: "This means 'we have been'.", isCorrect: false }
        ]
      },
      {
        question: "She has been",
        hint: "Third person singular feminine of être in passé composé",
        answerOptions: [
          { text: "Elle a été", rationale: "Correct! 'Elle a été' is 'she has been' in French.", isCorrect: true },
          { text: "Il a été", rationale: "This means 'he has been'.", isCorrect: false },
          { text: "Tu as été", rationale: "This means 'you have been' (informal).", isCorrect: false },
          { text: "Elles ont été", rationale: "This means 'they have been' (feminine plural).", isCorrect: false }
        ]
      },
      {
        question: "We have been",
        hint: "First person plural of être in passé composé",
        answerOptions: [
          { text: "Nous avons été", rationale: "Correct! 'Nous avons été' is 'we have been' in French.", isCorrect: true },
          { text: "Vous avez été", rationale: "This means 'you have been' (formal/plural).", isCorrect: false },
          { text: "Ils ont été", rationale: "This means 'they have been' (masculine/mixed).", isCorrect: false },
          { text: "J'ai été", rationale: "This means 'I have been'.", isCorrect: false }
        ]
      }
    ],
    "Futur Simple": [
      {
        question: "I will be",
        hint: "First person singular of être in future tense",
        answerOptions: [
          { text: "Je serai", rationale: "Correct! 'Je serai' is 'I will be' in French.", isCorrect: true },
          { text: "Tu seras", rationale: "This means 'you will be' (informal).", isCorrect: false },
          { text: "Il sera", rationale: "This means 'he will be'.", isCorrect: false },
          { text: "Nous serons", rationale: "This means 'we will be'.", isCorrect: false }
        ]
      },
      {
        question: "He will be",
        hint: "Third person singular masculine of être in future",
        answerOptions: [
          { text: "Il sera", rationale: "Correct! 'Il sera' is 'he will be' in French.", isCorrect: true },
          { text: "Je serai", rationale: "This means 'I will be'.", isCorrect: false },
          { text: "Tu seras", rationale: "This means 'you will be' (informal).", isCorrect: false },
          { text: "Ils seront", rationale: "This means 'they will be' (masculine/mixed).", isCorrect: false }
        ]
      },
      {
        question: "You will be (formal/plural)",
        hint: "Second person plural/formal of être in future",
        answerOptions: [
          { text: "Vous serez", rationale: "Correct! 'Vous serez' is 'you will be' (formal/plural) in French.", isCorrect: true },
          { text: "Nous serons", rationale: "This means 'we will be'.", isCorrect: false },
          { text: "Ils seront", rationale: "This means 'they will be' (masculine/mixed).", isCorrect: false },
          { text: "Je serai", rationale: "This means 'I will be'.", isCorrect: false }
        ]
      }
    ]
  },
  "avoir": {
    "Présent": [
      // Positive statements (8 questions)
      {
        question: "I have",
        hint: "First person singular of avoir in present tense",
        answerOptions: [
          { text: "Tu as", rationale: "This means 'you have' (informal).", isCorrect: false },
          { text: "J'ai", rationale: "Correct! 'J'ai' is 'I have' in French present tense.", isCorrect: true },
          { text: "Il a", rationale: "This means 'he has'.", isCorrect: false },
          { text: "Nous avons", rationale: "This means 'we have'.", isCorrect: false }
        ]
      },
      {
        question: "You have (informal)",
        hint: "Second person singular of avoir in present tense",
        answerOptions: [
          { text: "J'ai", rationale: "This means 'I have'.", isCorrect: false },
          { text: "Vous avez", rationale: "This means 'you have' (formal/plural).", isCorrect: false },
          { text: "Tu as", rationale: "Correct! 'Tu as' is 'you have' (informal) in French present tense.", isCorrect: true },
          { text: "Ils ont", rationale: "This means 'they have'.", isCorrect: false }
        ]
      },
      {
        question: "He has",
        hint: "Third person singular masculine of avoir in present tense",
        answerOptions: [
          { text: "Elle a", rationale: "This means 'she has'.", isCorrect: false },
          { text: "Tu as", rationale: "This means 'you have' (informal).", isCorrect: false },
          { text: "Ils ont", rationale: "This means 'they have'.", isCorrect: false },
          { text: "Il a", rationale: "Correct! 'Il a' is 'he has' in French present tense.", isCorrect: true }
        ]
      },
      {
        question: "She has",
        hint: "Third person singular feminine of avoir in present tense",
        answerOptions: [
          { text: "Il a", rationale: "This means 'he has'.", isCorrect: false },
          { text: "Elle a", rationale: "Correct! 'Elle a' is 'she has' in French present tense.", isCorrect: true },
          { text: "Elles ont", rationale: "This means 'they have' (feminine).", isCorrect: false },
          { text: "Tu as", rationale: "This means 'you have' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We have",
        hint: "First person plural of avoir in present tense",
        answerOptions: [
          { text: "Vous avez", rationale: "This means 'you have' (formal/plural).", isCorrect: false },
          { text: "Ils ont", rationale: "This means 'they have'.", isCorrect: false },
          { text: "J'ai", rationale: "This means 'I have'.", isCorrect: false },
          { text: "Nous avons", rationale: "Correct! 'Nous avons' is 'we have' in French present tense.", isCorrect: true }
        ]
      },
      {
        question: "You have (formal/plural)",
        hint: "Second person formal/plural of avoir in present tense",
        answerOptions: [
          { text: "Tu as", rationale: "This means 'you have' (informal).", isCorrect: false },
          { text: "Nous avons", rationale: "This means 'we have'.", isCorrect: false },
          { text: "Vous avez", rationale: "Correct! 'Vous avez' is 'you have' (formal/plural) in French present tense.", isCorrect: true },
          { text: "Ils ont", rationale: "This means 'they have'.", isCorrect: false }
        ]
      },
      {
        question: "They have (male/mixed)",
        hint: "Third person plural masculine/mixed of avoir in present tense",
        answerOptions: [
          { text: "Elles ont", rationale: "This means 'they have' (feminine only).", isCorrect: false },
          { text: "Ils avaient", rationale: "This is imperfect past tense, not present.", isCorrect: false },
          { text: "Ils ont été", rationale: "This means 'they have been' (être), not 'they have' (avoir).", isCorrect: false },
          { text: "Ils ont", rationale: "Correct! 'Ils ont' is 'they have' (masculine/mixed) in French present tense.", isCorrect: true }
        ]
      },
      {
        question: "They have (female)",
        hint: "Third person plural feminine of avoir in present tense",
        answerOptions: [
          { text: "Ils ont", rationale: "This means 'they have' (masculine/mixed).", isCorrect: false },
          { text: "Elles ont", rationale: "Correct! 'Elles ont' is 'they have' (feminine) in French present tense.", isCorrect: true },
          { text: "Elles avaient", rationale: "This is imperfect past tense, not present.", isCorrect: false },
          { text: "Elles ont été", rationale: "This means 'they have been' (être), not 'they have' (avoir).", isCorrect: false }
        ]
      },

      // Negative statements (6 questions)
      {
        question: "I do not have",
        hint: "First person singular negative of avoir in present tense",
        answerOptions: [
          { text: "Tu n'as pas", rationale: "This means 'you do not have' (informal).", isCorrect: false },
          { text: "Il n'a pas", rationale: "This means 'he does not have'.", isCorrect: false },
          { text: "Je n'ai pas", rationale: "Correct! 'Je n'ai pas' is 'I do not have' using French negation ne...pas.", isCorrect: true },
          { text: "Nous n'avons pas", rationale: "This means 'we do not have'.", isCorrect: false }
        ]
      },
      {
        question: "You do not have (informal)",
        hint: "Second person singular negative of avoir in present tense",
        answerOptions: [
          { text: "Je n'ai pas", rationale: "This means 'I do not have'.", isCorrect: false },
          { text: "Tu n'as pas", rationale: "Correct! 'Tu n'as pas' is 'you do not have' (informal) using French negation.", isCorrect: true },
          { text: "Vous n'avez pas", rationale: "This means 'you do not have' (formal/plural).", isCorrect: false },
          { text: "Ils n'ont pas", rationale: "This means 'they do not have'.", isCorrect: false }
        ]
      },
      {
        question: "He does not have",
        hint: "Third person singular masculine negative of avoir in present tense",
        answerOptions: [
          { text: "Elle n'a pas", rationale: "This means 'she does not have'.", isCorrect: false },
          { text: "Tu n'as pas", rationale: "This means 'you do not have' (informal).", isCorrect: false },
          { text: "Ils n'ont pas", rationale: "This means 'they do not have'.", isCorrect: false },
          { text: "Il n'a pas", rationale: "Correct! 'Il n'a pas' is 'he does not have' using French negation ne...pas.", isCorrect: true }
        ]
      },
      {
        question: "She does not have",
        hint: "Third person singular feminine negative of avoir in present tense",
        answerOptions: [
          { text: "Il n'a pas", rationale: "This means 'he does not have'.", isCorrect: false },
          { text: "Elle n'a pas", rationale: "Correct! 'Elle n'a pas' is 'she does not have' using French negation ne...pas.", isCorrect: true },
          { text: "Elles n'ont pas", rationale: "This means 'they do not have' (feminine).", isCorrect: false },
          { text: "Tu n'as pas", rationale: "This means 'you do not have' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We do not have",
        hint: "First person plural negative of avoir in present tense",
        answerOptions: [
          { text: "Vous n'avez pas", rationale: "This means 'you do not have' (formal/plural).", isCorrect: false },
          { text: "Ils n'ont pas", rationale: "This means 'they do not have'.", isCorrect: false },
          { text: "Je n'ai pas", rationale: "This means 'I do not have'.", isCorrect: false },
          { text: "Nous n'avons pas", rationale: "Correct! 'Nous n'avons pas' is 'we do not have' using French negation ne...pas.", isCorrect: true }
        ]
      },
      {
        question: "You do not have (formal/plural)",
        hint: "Second person formal/plural negative of avoir in present tense",
        answerOptions: [
          { text: "Tu n'as pas", rationale: "This means 'you do not have' (informal).", isCorrect: false },
          { text: "Vous n'avez pas", rationale: "Correct! 'Vous n'avez pas' is 'you do not have' (formal/plural) using French negation.", isCorrect: true },
          { text: "Nous n'avons pas", rationale: "This means 'we do not have'.", isCorrect: false },
          { text: "Ils n'ont pas", rationale: "This means 'they do not have'.", isCorrect: false }
        ]
      },

      // Positive questions (3 questions)
      {
        question: "Do I have?",
        hint: "Interrogative form of first person singular avoir in present tense",
        answerOptions: [
          { text: "As-tu ?", rationale: "This means 'Do you have?' (informal).", isCorrect: false },
          { text: "A-t-il ?", rationale: "This means 'Does he have?'.", isCorrect: false },
          { text: "Ai-je ?", rationale: "Correct! 'Ai-je ?' is 'Do I have?' in French interrogative form with inversion.", isCorrect: true },
          { text: "Avons-nous ?", rationale: "This means 'Do we have?'.", isCorrect: false }
        ]
      },
      {
        question: "Do you have? (informal)",
        hint: "Interrogative form of second person singular avoir in present tense",
        answerOptions: [
          { text: "Ai-je ?", rationale: "This means 'Do I have?'.", isCorrect: false },
          { text: "As-tu ?", rationale: "Correct! 'As-tu ?' is 'Do you have?' (informal) in French interrogative form.", isCorrect: true },
          { text: "A-t-il ?", rationale: "This means 'Does he have?'.", isCorrect: false },
          { text: "Avez-vous ?", rationale: "This means 'Do you have?' (formal/plural).", isCorrect: false }
        ]
      },
      {
        question: "Does he have?",
        hint: "Interrogative form of third person singular masculine avoir in present tense",
        answerOptions: [
          { text: "A-t-elle ?", rationale: "This means 'Does she have?'.", isCorrect: false },
          { text: "Ai-je ?", rationale: "This means 'Do I have?'.", isCorrect: false },
          { text: "As-tu ?", rationale: "This means 'Do you have?' (informal).", isCorrect: false },
          { text: "A-t-il ?", rationale: "Correct! 'A-t-il ?' is 'Does he have?' in French interrogative form with liaison 't'.", isCorrect: true }
        ]
      },

      // Negative questions (3 questions) - Fixed contractions
      {
        question: "Don't I have?",
        hint: "Negative interrogative form of first person singular avoir in present tense",
        answerOptions: [
          { text: "N'as-tu pas ?", rationale: "This means 'Don't you have?' (informal).", isCorrect: false },
          { text: "N'a-t-il pas ?", rationale: "This means 'Doesn't he have?'.", isCorrect: false },
          { text: "N'avons-nous pas ?", rationale: "This means 'Don't we have?'.", isCorrect: false },
          { text: "N'ai-je pas ?", rationale: "Correct! 'N'ai-je pas ?' is 'Don't I have?' in French negative interrogative form.", isCorrect: true }
        ]
      },
      {
        question: "Don't you have? (informal)",
        hint: "Negative interrogative form of second person singular avoir in present tense",
        answerOptions: [
          { text: "N'ai-je pas ?", rationale: "This means 'Don't I have?'.", isCorrect: false },
          { text: "N'as-tu pas ?", rationale: "Correct! 'N'as-tu pas ?' is 'Don't you have?' (informal) in French negative interrogative.", isCorrect: true },
          { text: "N'a-t-il pas ?", rationale: "This means 'Doesn't he have?'.", isCorrect: false },
          { text: "N'avez-vous pas ?", rationale: "This means 'Don't you have?' (formal/plural).", isCorrect: false }
        ]
      },
      {
        question: "Doesn't he have?",
        hint: "Negative interrogative form of third person singular masculine avoir in present tense",
        answerOptions: [
          { text: "N'a-t-elle pas ?", rationale: "This means 'Doesn't she have?'.", isCorrect: false },
          { text: "N'ai-je pas ?", rationale: "This means 'Don't I have?'.", isCorrect: false },
          { text: "N'a-t-il pas ?", rationale: "Correct! 'N'a-t-il pas ?' is 'Doesn't he have?' in French negative interrogative with liaison 't'.", isCorrect: true },
          { text: "N'as-tu pas ?", rationale: "This means 'Don't you have?' (informal).", isCorrect: false }
        ]
      }
    ],
    "Passé Composé": [
      // Positive statements (8 questions)
      {
        question: "I have had",
        hint: "First person singular of avoir in passé composé",
        answerOptions: [
          { text: "Tu as eu", rationale: "This means 'you have had' (informal).", isCorrect: false },
          { text: "J'ai eu", rationale: "Correct! 'J'ai eu' is 'I have had' in French passé composé.", isCorrect: true },
          { text: "Il a eu", rationale: "This means 'he has had'.", isCorrect: false },
          { text: "Nous avons eu", rationale: "This means 'we have had'.", isCorrect: false }
        ]
      },
      {
        question: "You have had (informal)",
        hint: "Second person singular of avoir in passé composé",
        answerOptions: [
          { text: "J'ai eu", rationale: "This means 'I have had'.", isCorrect: false },
          { text: "Vous avez eu", rationale: "This means 'you have had' (formal/plural).", isCorrect: false },
          { text: "Tu as eu", rationale: "Correct! 'Tu as eu' is 'you have had' (informal) in French passé composé.", isCorrect: true },
          { text: "Ils ont eu", rationale: "This means 'they have had'.", isCorrect: false }
        ]
      },
      {
        question: "He has had",
        hint: "Third person singular masculine of avoir in passé composé",
        answerOptions: [
          { text: "Elle a eu", rationale: "This means 'she has had'.", isCorrect: false },
          { text: "Tu as eu", rationale: "This means 'you have had' (informal).", isCorrect: false },
          { text: "Ils ont eu", rationale: "This means 'they have had'.", isCorrect: false },
          { text: "Il a eu", rationale: "Correct! 'Il a eu' is 'he has had' in French passé composé.", isCorrect: true }
        ]
      },
      {
        question: "She has had",
        hint: "Third person singular feminine of avoir in passé composé",
        answerOptions: [
          { text: "Il a eu", rationale: "This means 'he has had'.", isCorrect: false },
          { text: "Elle a eu", rationale: "Correct! 'Elle a eu' is 'she has had' in French passé composé.", isCorrect: true },
          { text: "Elles ont eu", rationale: "This means 'they have had' (feminine).", isCorrect: false },
          { text: "Tu as eu", rationale: "This means 'you have had' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We have had",
        hint: "First person plural of avoir in passé composé",
        answerOptions: [
          { text: "Vous avez eu", rationale: "This means 'you have had' (formal/plural).", isCorrect: false },
          { text: "Ils ont eu", rationale: "This means 'they have had'.", isCorrect: false },
          { text: "J'ai eu", rationale: "This means 'I have had'.", isCorrect: false },
          { text: "Nous avons eu", rationale: "Correct! 'Nous avons eu' is 'we have had' in French passé composé.", isCorrect: true }
        ]
      },
      {
        question: "You have had (formal/plural)",
        hint: "Second person formal/plural of avoir in passé composé",
        answerOptions: [
          { text: "Tu as eu", rationale: "This means 'you have had' (informal).", isCorrect: false },
          { text: "Nous avons eu", rationale: "This means 'we have had'.", isCorrect: false },
          { text: "Vous avez eu", rationale: "Correct! 'Vous avez eu' is 'you have had' (formal/plural) in French passé composé.", isCorrect: true },
          { text: "Ils ont eu", rationale: "This means 'they have had'.", isCorrect: false }
        ]
      },
      {
        question: "They have had (male/mixed)",
        hint: "Third person plural masculine/mixed of avoir in passé composé",
        answerOptions: [
          { text: "Elles ont eu", rationale: "This means 'they have had' (feminine only).", isCorrect: false },
          { text: "Ils avaient", rationale: "This is imperfect past tense, not passé composé.", isCorrect: false },
          { text: "Ils ont été", rationale: "This means 'they have been' (être), not 'they have had' (avoir).", isCorrect: false },
          { text: "Ils ont eu", rationale: "Correct! 'Ils ont eu' is 'they have had' (masculine/mixed) in French passé composé.", isCorrect: true }
        ]
      },
      {
        question: "They have had (female)",
        hint: "Third person plural feminine of avoir in passé composé",
        answerOptions: [
          { text: "Ils ont eu", rationale: "This means 'they have had' (masculine/mixed).", isCorrect: false },
          { text: "Elles ont eu", rationale: "Correct! 'Elles ont eu' is 'they have had' (feminine) in French passé composé.", isCorrect: true },
          { text: "Elles avaient", rationale: "This is imperfect past tense, not passé composé.", isCorrect: false },
          { text: "Elles ont été", rationale: "This means 'they have been' (être), not 'they have had' (avoir).", isCorrect: false }
        ]
      },

      // Negative statements (6 questions)
      {
        question: "I have not had",
        hint: "First person singular negative of avoir in passé composé",
        answerOptions: [
          { text: "Tu n'as pas eu", rationale: "This means 'you have not had' (informal).", isCorrect: false },
          { text: "Il n'a pas eu", rationale: "This means 'he has not had'.", isCorrect: false },
          { text: "Je n'ai pas eu", rationale: "Correct! 'Je n'ai pas eu' is 'I have not had' using French negation ne...pas.", isCorrect: true },
          { text: "Nous n'avons pas eu", rationale: "This means 'we have not had'.", isCorrect: false }
        ]
      },
      {
        question: "You have not had (informal)",
        hint: "Second person singular negative of avoir in passé composé",
        answerOptions: [
          { text: "Je n'ai pas eu", rationale: "This means 'I have not had'.", isCorrect: false },
          { text: "Tu n'as pas eu", rationale: "Correct! 'Tu n'as pas eu' is 'you have not had' (informal) using French negation.", isCorrect: true },
          { text: "Vous n'avez pas eu", rationale: "This means 'you have not had' (formal/plural).", isCorrect: false },
          { text: "Ils n'ont pas eu", rationale: "This means 'they have not had'.", isCorrect: false }
        ]
      },
      {
        question: "He has not had",
        hint: "Third person singular masculine negative of avoir in passé composé",
        answerOptions: [
          { text: "Elle n'a pas eu", rationale: "This means 'she has not had'.", isCorrect: false },
          { text: "Tu n'as pas eu", rationale: "This means 'you have not had' (informal).", isCorrect: false },
          { text: "Ils n'ont pas eu", rationale: "This means 'they have not had'.", isCorrect: false },
          { text: "Il n'a pas eu", rationale: "Correct! 'Il n'a pas eu' is 'he has not had' using French negation ne...pas.", isCorrect: true }
        ]
      },
      {
        question: "She has not had",
        hint: "Third person singular feminine negative of avoir in passé composé",
        answerOptions: [
          { text: "Il n'a pas eu", rationale: "This means 'he has not had'.", isCorrect: false },
          { text: "Elle n'a pas eu", rationale: "Correct! 'Elle n'a pas eu' is 'she has not had' using French negation ne...pas.", isCorrect: true },
          { text: "Elles n'ont pas eu", rationale: "This means 'they have not had' (feminine).", isCorrect: false },
          { text: "Tu n'as pas eu", rationale: "This means 'you have not had' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We have not had",
        hint: "First person plural negative of avoir in passé composé",
        answerOptions: [
          { text: "Vous n'avez pas eu", rationale: "This means 'you have not had' (formal/plural).", isCorrect: false },
          { text: "Ils n'ont pas eu", rationale: "This means 'they have not had'.", isCorrect: false },
          { text: "Je n'ai pas eu", rationale: "This means 'I have not had'.", isCorrect: false },
          { text: "Nous n'avons pas eu", rationale: "Correct! 'Nous n'avons pas eu' is 'we have not had' using French negation ne...pas.", isCorrect: true }
        ]
      },
      {
        question: "You have not had (formal/plural)",
        hint: "Second person formal/plural negative of avoir in passé composé",
        answerOptions: [
          { text: "Tu n'as pas eu", rationale: "This means 'you have not had' (informal).", isCorrect: false },
          { text: "Vous n'avez pas eu", rationale: "Correct! 'Vous n'avez pas eu' is 'you have not had' (formal/plural) using French negation.", isCorrect: true },
          { text: "Nous n'avons pas eu", rationale: "This means 'we have not had'.", isCorrect: false },
          { text: "Ils n'ont pas eu", rationale: "This means 'they have not had'.", isCorrect: false }
        ]
      },

      // Positive questions (3 questions)
      {
        question: "Have I had?",
        hint: "Interrogative form of first person singular avoir in passé composé",
        answerOptions: [
          { text: "As-tu eu ?", rationale: "This means 'Have you had?' (informal).", isCorrect: false },
          { text: "A-t-il eu ?", rationale: "This means 'Has he had?'.", isCorrect: false },
          { text: "Ai-je eu ?", rationale: "Correct! 'Ai-je eu ?' is 'Have I had?' in French interrogative form with inversion.", isCorrect: true },
          { text: "Avons-nous eu ?", rationale: "This means 'Have we had?'.", isCorrect: false }
        ]
      },
      {
        question: "Have you had? (informal)",
        hint: "Interrogative form of second person singular avoir in passé composé",
        answerOptions: [
          { text: "Ai-je eu ?", rationale: "This means 'Have I had?'.", isCorrect: false },
          { text: "As-tu eu ?", rationale: "Correct! 'As-tu eu ?' is 'Have you had?' (informal) in French interrogative form.", isCorrect: true },
          { text: "A-t-il eu ?", rationale: "This means 'Has he had?'.", isCorrect: false },
          { text: "Avez-vous eu ?", rationale: "This means 'Have you had?' (formal/plural).", isCorrect: false }
        ]
      },
      {
        question: "Has he had?",
        hint: "Interrogative form of third person singular masculine avoir in passé composé",
        answerOptions: [
          { text: "A-t-elle eu ?", rationale: "This means 'Has she had?'.", isCorrect: false },
          { text: "Ai-je eu ?", rationale: "This means 'Have I had?'.", isCorrect: false },
          { text: "As-tu eu ?", rationale: "This means 'Have you had?' (informal).", isCorrect: false },
          { text: "A-t-il eu ?", rationale: "Correct! 'A-t-il eu ?' is 'Has he had?' in French interrogative form with liaison 't'.", isCorrect: true }
        ]
      },

      // Negative questions (3 questions)
      {
        question: "Haven't I had?",
        hint: "Negative interrogative form of first person singular avoir in passé composé",
        answerOptions: [
          { text: "N'as-tu pas eu ?", rationale: "This means 'Haven't you had?' (informal).", isCorrect: false },
          { text: "N'a-t-il pas eu ?", rationale: "This means 'Hasn't he had?'.", isCorrect: false },
          { text: "N'avons-nous pas eu ?", rationale: "This means 'Haven't we had?'.", isCorrect: false },
          { text: "N'ai-je pas eu ?", rationale: "Correct! 'N'ai-je pas eu ?' is 'Haven't I had?' in French negative interrogative form.", isCorrect: true }
        ]
      },
      {
        question: "Haven't you had? (informal)",
        hint: "Negative interrogative form of second person singular avoir in passé composé",
        answerOptions: [
          { text: "N'ai-je pas eu ?", rationale: "This means 'Haven't I had?'.", isCorrect: false },
          { text: "N'as-tu pas eu ?", rationale: "Correct! 'N'as-tu pas eu ?' is 'Haven't you had?' (informal) in French negative interrogative.", isCorrect: true },
          { text: "N'a-t-il pas eu ?", rationale: "This means 'Hasn't he had?'.", isCorrect: false },
          { text: "N'avez-vous pas eu ?", rationale: "This means 'Haven't you had?' (formal/plural).", isCorrect: false }
        ]
      },
      {
        question: "Hasn't he had?",
        hint: "Negative interrogative form of third person singular masculine avoir in passé composé",
        answerOptions: [
          { text: "N'a-t-elle pas eu ?", rationale: "This means 'Hasn't she had?'.", isCorrect: false },
          { text: "N'ai-je pas eu ?", rationale: "This means 'Haven't I had?'.", isCorrect: false },
          { text: "N'a-t-il pas eu ?", rationale: "Correct! 'N'a-t-il pas eu ?' is 'Hasn't he had?' in French negative interrogative with liaison 't'.", isCorrect: true },
          { text: "N'as-tu pas eu ?", rationale: "This means 'Haven't you had?' (informal).", isCorrect: false }
        ]
      }
    ],
    "Futur Simple": [
      // Positive statements (8 questions)
      {
        question: "I will have",
        hint: "First person singular of avoir in future tense",
        answerOptions: [
          { text: "Tu auras", rationale: "This means 'you will have' (informal).", isCorrect: false },
          { text: "J'aurai", rationale: "Correct! 'J'aurai' is 'I will have' in French future tense.", isCorrect: true },
          { text: "Il aura", rationale: "This means 'he will have'.", isCorrect: false },
          { text: "Nous aurons", rationale: "This means 'we will have'.", isCorrect: false }
        ]
      },
      {
        question: "You will have (informal)",
        hint: "Second person singular of avoir in future tense",
        answerOptions: [
          { text: "J'aurai", rationale: "This means 'I will have'.", isCorrect: false },
          { text: "Vous aurez", rationale: "This means 'you will have' (formal/plural).", isCorrect: false },
          { text: "Tu auras", rationale: "Correct! 'Tu auras' is 'you will have' (informal) in French future tense.", isCorrect: true },
          { text: "Ils auront", rationale: "This means 'they will have'.", isCorrect: false }
        ]
      },
      {
        question: "He will have",
        hint: "Third person singular masculine of avoir in future tense",
        answerOptions: [
          { text: "Elle aura", rationale: "This means 'she will have'.", isCorrect: false },
          { text: "Tu auras", rationale: "This means 'you will have' (informal).", isCorrect: false },
          { text: "Ils auront", rationale: "This means 'they will have'.", isCorrect: false },
          { text: "Il aura", rationale: "Correct! 'Il aura' is 'he will have' in French future tense.", isCorrect: true }
        ]
      },
      {
        question: "She will have",
        hint: "Third person singular feminine of avoir in future tense",
        answerOptions: [
          { text: "Il aura", rationale: "This means 'he will have'.", isCorrect: false },
          { text: "Elle aura", rationale: "Correct! 'Elle aura' is 'she will have' in French future tense.", isCorrect: true },
          { text: "Elles auront", rationale: "This means 'they will have' (feminine).", isCorrect: false },
          { text: "Tu auras", rationale: "This means 'you will have' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We will have",
        hint: "First person plural of avoir in future tense",
        answerOptions: [
          { text: "Vous aurez", rationale: "This means 'you will have' (formal/plural).", isCorrect: false },
          { text: "Ils auront", rationale: "This means 'they will have'.", isCorrect: false },
          { text: "J'aurai", rationale: "This means 'I will have'.", isCorrect: false },
          { text: "Nous aurons", rationale: "Correct! 'Nous aurons' is 'we will have' in French future tense.", isCorrect: true }
        ]
      },
      {
        question: "You will have (formal/plural)",
        hint: "Second person formal/plural of avoir in future tense",
        answerOptions: [
          { text: "Tu auras", rationale: "This means 'you will have' (informal).", isCorrect: false },
          { text: "Nous aurons", rationale: "This means 'we will have'.", isCorrect: false },
          { text: "Vous aurez", rationale: "Correct! 'Vous aurez' is 'you will have' (formal/plural) in French future tense.", isCorrect: true },
          { text: "Ils auront", rationale: "This means 'they will have'.", isCorrect: false }
        ]
      },
      {
        question: "They will have (male/mixed)",
        hint: "Third person plural masculine/mixed of avoir in future tense",
        answerOptions: [
          { text: "Elles auront", rationale: "This means 'they will have' (feminine only).", isCorrect: false },
          { text: "Ils avaient", rationale: "This is imperfect past tense, not future.", isCorrect: false },
          { text: "Ils ont eu", rationale: "This is passé composé (past), not future.", isCorrect: false },
          { text: "Ils auront", rationale: "Correct! 'Ils auront' is 'they will have' (masculine/mixed) in French future tense.", isCorrect: true }
        ]
      },
      {
        question: "They will have (female)",
        hint: "Third person plural feminine of avoir in future tense",
        answerOptions: [
          { text: "Ils auront", rationale: "This means 'they will have' (masculine/mixed).", isCorrect: false },
          { text: "Elles auront", rationale: "Correct! 'Elles auront' is 'they will have' (feminine) in French future tense.", isCorrect: true },
          { text: "Elles avaient", rationale: "This is imperfect past tense, not future.", isCorrect: false },
          { text: "Elles ont eu", rationale: "This is passé composé (past), not future.", isCorrect: false }
        ]
      },

      // Negative statements (6 questions)
      {
        question: "I will not have",
        hint: "First person singular negative of avoir in future tense",
        answerOptions: [
          { text: "Tu n'auras pas", rationale: "This means 'you will not have' (informal).", isCorrect: false },
          { text: "Il n'aura pas", rationale: "This means 'he will not have'.", isCorrect: false },
          { text: "Je n'aurai pas", rationale: "Correct! 'Je n'aurai pas' is 'I will not have' using French negation ne...pas.", isCorrect: true },
          { text: "Nous n'aurons pas", rationale: "This means 'we will not have'.", isCorrect: false }
        ]
      },
      {
        question: "You will not have (informal)",
        hint: "Second person singular negative of avoir in future tense",
        answerOptions: [
          { text: "Je n'aurai pas", rationale: "This means 'I will not have'.", isCorrect: false },
          { text: "Tu n'auras pas", rationale: "Correct! 'Tu n'auras pas' is 'you will not have' (informal) using French negation.", isCorrect: true },
          { text: "Vous n'aurez pas", rationale: "This means 'you will not have' (formal/plural).", isCorrect: false },
          { text: "Ils n'auront pas", rationale: "This means 'they will not have'.", isCorrect: false }
        ]
      },
      {
        question: "He will not have",
        hint: "Third person singular masculine negative of avoir in future tense",
        answerOptions: [
          { text: "Elle n'aura pas", rationale: "This means 'she will not have'.", isCorrect: false },
          { text: "Tu n'auras pas", rationale: "This means 'you will not have' (informal).", isCorrect: false },
          { text: "Ils n'auront pas", rationale: "This means 'they will not have'.", isCorrect: false },
          { text: "Il n'aura pas", rationale: "Correct! 'Il n'aura pas' is 'he will not have' using French negation ne...pas.", isCorrect: true }
        ]
      },
      {
        question: "She will not have",
        hint: "Third person singular feminine negative of avoir in future tense",
        answerOptions: [
          { text: "Il n'aura pas", rationale: "This means 'he will not have'.", isCorrect: false },
          { text: "Elle n'aura pas", rationale: "Correct! 'Elle n'aura pas' is 'she will not have' using French negation ne...pas.", isCorrect: true },
          { text: "Elles n'auront pas", rationale: "This means 'they will not have' (feminine).", isCorrect: false },
          { text: "Tu n'auras pas", rationale: "This means 'you will not have' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We will not have",
        hint: "First person plural negative of avoir in future tense",
        answerOptions: [
          { text: "Vous n'aurez pas", rationale: "This means 'you will not have' (formal/plural).", isCorrect: false },
          { text: "Ils n'auront pas", rationale: "This means 'they will not have'.", isCorrect: false },
          { text: "Je n'aurai pas", rationale: "This means 'I will not have'.", isCorrect: false },
          { text: "Nous n'aurons pas", rationale: "Correct! 'Nous n'aurons pas' is 'we will not have' using French negation ne...pas.", isCorrect: true }
        ]
      },
      {
        question: "You will not have (formal/plural)",
        hint: "Second person formal/plural negative of avoir in future tense",
        answerOptions: [
          { text: "Tu n'auras pas", rationale: "This means 'you will not have' (informal).", isCorrect: false },
          { text: "Vous n'aurez pas", rationale: "Correct! 'Vous n'aurez pas' is 'you will not have' (formal/plural) using French negation.", isCorrect: true },
          { text: "Nous n'aurons pas", rationale: "This means 'we will not have'.", isCorrect: false },
          { text: "Ils n'auront pas", rationale: "This means 'they will not have'.", isCorrect: false }
        ]
      },

      // Positive questions (3 questions)
      {
        question: "Will I have?",
        hint: "Interrogative form of first person singular avoir in future tense",
        answerOptions: [
          { text: "Auras-tu ?", rationale: "This means 'Will you have?' (informal).", isCorrect: false },
          { text: "Aura-t-il ?", rationale: "This means 'Will he have?'.", isCorrect: false },
          { text: "Aurai-je ?", rationale: "Correct! 'Aurai-je ?' is 'Will I have?' in French interrogative form with inversion.", isCorrect: true },
          { text: "Aurons-nous ?", rationale: "This means 'Will we have?'.", isCorrect: false }
        ]
      },
      {
        question: "Will you have? (informal)",
        hint: "Interrogative form of second person singular avoir in future tense",
        answerOptions: [
          { text: "Aurai-je ?", rationale: "This means 'Will I have?'.", isCorrect: false },
          { text: "Auras-tu ?", rationale: "Correct! 'Auras-tu ?' is 'Will you have?' (informal) in French interrogative form.", isCorrect: true },
          { text: "Aura-t-il ?", rationale: "This means 'Will he have?'.", isCorrect: false },
          { text: "Aurez-vous ?", rationale: "This means 'Will you have?' (formal/plural).", isCorrect: false }
        ]
      },
      {
        question: "Will he have?",
        hint: "Interrogative form of third person singular masculine avoir in future tense",
        answerOptions: [
          { text: "Aura-t-elle ?", rationale: "This means 'Will she have?'.", isCorrect: false },
          { text: "Aurai-je ?", rationale: "This means 'Will I have?'.", isCorrect: false },
          { text: "Auras-tu ?", rationale: "This means 'Will you have?' (informal).", isCorrect: false },
          { text: "Aura-t-il ?", rationale: "Correct! 'Aura-t-il ?' is 'Will he have?' in French interrogative form with liaison 't'.", isCorrect: true }
        ]
      },

      // Negative questions (3 questions)
      {
        question: "Won't I have?",
        hint: "Negative interrogative form of first person singular avoir in future tense",
        answerOptions: [
          { text: "N'auras-tu pas ?", rationale: "This means 'Won't you have?' (informal).", isCorrect: false },
          { text: "N'aura-t-il pas ?", rationale: "This means 'Won't he have?'.", isCorrect: false },
          { text: "N'aurons-nous pas ?", rationale: "This means 'Won't we have?'.", isCorrect: false },
          { text: "N'aurai-je pas ?", rationale: "Correct! 'N'aurai-je pas ?' is 'Won't I have?' in French negative interrogative form.", isCorrect: true }
        ]
      },
      {
        question: "Won't you have? (informal)",
        hint: "Negative interrogative form of second person singular avoir in future tense",
        answerOptions: [
          { text: "N'aurai-je pas ?", rationale: "This means 'Won't I have?'.", isCorrect: false },
          { text: "N'auras-tu pas ?", rationale: "Correct! 'N'auras-tu pas ?' is 'Won't you have?' (informal) in French negative interrogative.", isCorrect: true },
          { text: "N'aura-t-il pas ?", rationale: "This means 'Won't he have?'.", isCorrect: false },
          { text: "N'aurez-vous pas ?", rationale: "This means 'Won't you have?' (formal/plural).", isCorrect: false }
        ]
      },
      {
        question: "Won't he have?",
        hint: "Negative interrogative form of third person singular masculine avoir in future tense",
        answerOptions: [
          { text: "N'aura-t-elle pas ?", rationale: "This means 'Won't she have?'.", isCorrect: false },
          { text: "N'aurai-je pas ?", rationale: "This means 'Won't I have?'.", isCorrect: false },
          { text: "N'aura-t-il pas ?", rationale: "Correct! 'N'aura-t-il pas ?' is 'Won't he have?' in French negative interrogative with liaison 't'.", isCorrect: true },
          { text: "N'auras-tu pas ?", rationale: "This means 'Won't you have?' (informal).", isCorrect: false }
        ]
      }
    ]
  },
  "faire": {
    "Présent": [
      // Positive statements (8 questions)
      {
        question: "I do / I make",
        hint: "First person singular of faire in present tense",
        answerOptions: [
          { text: "Tu fais", rationale: "This means 'you do / you make' (informal).", isCorrect: false },
          { text: "Je fais", rationale: "Correct! 'Je fais' is 'I do / I make' in French present tense.", isCorrect: true },
          { text: "Il fait", rationale: "This means 'he does / he makes'.", isCorrect: false },
          { text: "Nous faisons", rationale: "This means 'we do / we make'.", isCorrect: false }
        ]
      },
      {
        question: "You do / You make (informal)",
        hint: "Second person singular of faire in present tense",
        answerOptions: [
          { text: "Je fais", rationale: "This means 'I do / I make'.", isCorrect: false },
          { text: "Vous faites", rationale: "This means 'you do / you make' (formal/plural).", isCorrect: false },
          { text: "Tu fais", rationale: "Correct! 'Tu fais' is 'you do / you make' (informal) in French present tense.", isCorrect: true },
          { text: "Ils font", rationale: "This means 'they do / they make'.", isCorrect: false }
        ]
      },
      {
        question: "He does / He makes",
        hint: "Third person singular masculine of faire in present tense",
        answerOptions: [
          { text: "Elle fait", rationale: "This means 'she does / she makes'.", isCorrect: false },
          { text: "Tu fais", rationale: "This means 'you do / you make' (informal).", isCorrect: false },
          { text: "Ils font", rationale: "This means 'they do / they make'.", isCorrect: false },
          { text: "Il fait", rationale: "Correct! 'Il fait' is 'he does / he makes' in French present tense.", isCorrect: true }
        ]
      },
      {
        question: "She does / She makes",
        hint: "Third person singular feminine of faire in present tense",
        answerOptions: [
          { text: "Il fait", rationale: "This means 'he does / he makes'.", isCorrect: false },
          { text: "Elle fait", rationale: "Correct! 'Elle fait' is 'she does / she makes' in French present tense.", isCorrect: true },
          { text: "Elles font", rationale: "This means 'they do / they make' (feminine).", isCorrect: false },
          { text: "Tu fais", rationale: "This means 'you do / you make' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We do / We make",
        hint: "First person plural of faire in present tense",
        answerOptions: [
          { text: "Vous faites", rationale: "This means 'you do / you make' (formal/plural).", isCorrect: false },
          { text: "Ils font", rationale: "This means 'they do / they make'.", isCorrect: false },
          { text: "Je fais", rationale: "This means 'I do / I make'.", isCorrect: false },
          { text: "Nous faisons", rationale: "Correct! 'Nous faisons' is 'we do / we make' in French present tense.", isCorrect: true }
        ]
      },
      {
        question: "You do / You make (formal/plural)",
        hint: "Second person formal/plural of faire in present tense",
        answerOptions: [
          { text: "Tu fais", rationale: "This means 'you do / you make' (informal).", isCorrect: false },
          { text: "Nous faisons", rationale: "This means 'we do / we make'.", isCorrect: false },
          { text: "Vous faites", rationale: "Correct! 'Vous faites' is 'you do / you make' (formal/plural) in French present tense.", isCorrect: true },
          { text: "Ils font", rationale: "This means 'they do / they make'.", isCorrect: false }
        ]
      },
      {
        question: "They do / They make (male/mixed)",
        hint: "Third person plural masculine/mixed of faire in present tense",
        answerOptions: [
          { text: "Elles font", rationale: "This means 'they do / they make' (feminine only).", isCorrect: false },
          { text: "Ils faisaient", rationale: "This is imperfect past tense, not present tense.", isCorrect: false },
          { text: "Ils ont fait", rationale: "This is passé composé (past), not present tense.", isCorrect: false },
          { text: "Ils font", rationale: "Correct! 'Ils font' is 'they do / they make' (masculine/mixed) in French present tense.", isCorrect: true }
        ]
      },
      {
        question: "They do / They make (female)",
        hint: "Third person plural feminine of faire in present tense",
        answerOptions: [
          { text: "Ils font", rationale: "This means 'they do / they make' (masculine/mixed).", isCorrect: false },
          { text: "Elles font", rationale: "Correct! 'Elles font' is 'they do / they make' (feminine) in French present tense.", isCorrect: true },
          { text: "Elles faisaient", rationale: "This is imperfect past tense, not present tense.", isCorrect: false },
          { text: "Elles ont fait", rationale: "This is passé composé (past), not present tense.", isCorrect: false }
        ]
      },

      // Negative statements (6 questions)
      {
        question: "I do not do / I do not make",
        hint: "First person singular negative of faire in present tense",
        answerOptions: [
          { text: "Tu ne fais pas", rationale: "This means 'you do not do / you do not make' (informal).", isCorrect: false },
          { text: "Il ne fait pas", rationale: "This means 'he does not do / he does not make'.", isCorrect: false },
          { text: "Je ne fais pas", rationale: "Correct! 'Je ne fais pas' is 'I do not do / I do not make' using French negation ne...pas.", isCorrect: true },
          { text: "Nous ne faisons pas", rationale: "This means 'we do not do / we do not make'.", isCorrect: false }
        ]
      },
      {
        question: "You do not do / You do not make (informal)",
        hint: "Second person singular negative of faire in present tense",
        answerOptions: [
          { text: "Je ne fais pas", rationale: "This means 'I do not do / I do not make'.", isCorrect: false },
          { text: "Tu ne fais pas", rationale: "Correct! 'Tu ne fais pas' is 'you do not do / you do not make' (informal) using French negation.", isCorrect: true },
          { text: "Vous ne faites pas", rationale: "This means 'you do not do / you do not make' (formal/plural).", isCorrect: false },
          { text: "Ils ne font pas", rationale: "This means 'they do not do / they do not make'.", isCorrect: false }
        ]
      },
      {
        question: "He does not do / He does not make",
        hint: "Third person singular masculine negative of faire in present tense",
        answerOptions: [
          { text: "Elle ne fait pas", rationale: "This means 'she does not do / she does not make'.", isCorrect: false },
          { text: "Tu ne fais pas", rationale: "This means 'you do not do / you do not make' (informal).", isCorrect: false },
          { text: "Ils ne font pas", rationale: "This means 'they do not do / they do not make'.", isCorrect: false },
          { text: "Il ne fait pas", rationale: "Correct! 'Il ne fait pas' is 'he does not do / he does not make' using French negation ne...pas.", isCorrect: true }
        ]
      },
      {
        question: "She does not do / She does not make",
        hint: "Third person singular feminine negative of faire in present tense",
        answerOptions: [
          { text: "Il ne fait pas", rationale: "This means 'he does not do / he does not make'.", isCorrect: false },
          { text: "Elle ne fait pas", rationale: "Correct! 'Elle ne fait pas' is 'she does not do / she does not make' using French negation ne...pas.", isCorrect: true },
          { text: "Elles ne font pas", rationale: "This means 'they do not do / they do not make' (feminine).", isCorrect: false },
          { text: "Tu ne fais pas", rationale: "This means 'you do not do / you do not make' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We do not do / We do not make",
        hint: "First person plural negative of faire in present tense",
        answerOptions: [
          { text: "Vous ne faites pas", rationale: "This means 'you do not do / you do not make' (formal/plural).", isCorrect: false },
          { text: "Ils ne font pas", rationale: "This means 'they do not do / they do not make'.", isCorrect: false },
          { text: "Je ne fais pas", rationale: "This means 'I do not do / I do not make'.", isCorrect: false },
          { text: "Nous ne faisons pas", rationale: "Correct! 'Nous ne faisons pas' is 'we do not do / we do not make' using French negation ne...pas.", isCorrect: true }
        ]
      },
      {
        question: "You do not do / You do not make (formal/plural)",
        hint: "Second person formal/plural negative of faire in present tense",
        answerOptions: [
          { text: "Tu ne fais pas", rationale: "This means 'you do not do / you do not make' (informal).", isCorrect: false },
          { text: "Vous ne faites pas", rationale: "Correct! 'Vous ne faites pas' is 'you do not do / you do not make' (formal/plural) using French negation.", isCorrect: true },
          { text: "Nous ne faisons pas", rationale: "This means 'we do not do / we do not make'.", isCorrect: false },
          { text: "Ils ne font pas", rationale: "This means 'they do not do / they do not make'.", isCorrect: false }
        ]
      },

      // Positive questions (3 questions)
      {
        question: "Do I do / Do I make?",
        hint: "Interrogative form of first person singular faire in present tense",
        answerOptions: [
          { text: "Fais-tu ?", rationale: "This means 'Do you do / Do you make?' (informal).", isCorrect: false },
          { text: "Fait-il ?", rationale: "This means 'Does he do / Does he make?'.", isCorrect: false },
          { text: "Fais-je ?", rationale: "Correct! 'Fais-je ?' is 'Do I do / Do I make?' in French interrogative form with inversion.", isCorrect: true },
          { text: "Faisons-nous ?", rationale: "This means 'Do we do / Do we make?'.", isCorrect: false }
        ]
      },
      {
        question: "Do you do / Do you make? (informal)",
        hint: "Interrogative form of second person singular faire in present tense",
        answerOptions: [
          { text: "Fais-je ?", rationale: "This means 'Do I do / Do I make?'.", isCorrect: false },
          { text: "Fais-tu ?", rationale: "Correct! 'Fais-tu ?' is 'Do you do / Do you make?' (informal) in French interrogative form.", isCorrect: true },
          { text: "Fait-il ?", rationale: "This means 'Does he do / Does he make?'.", isCorrect: false },
          { text: "Faites-vous ?", rationale: "This means 'Do you do / Do you make?' (formal/plural).", isCorrect: false }
        ]
      },
      {
        question: "Does he do / Does he make?",
        hint: "Interrogative form of third person singular masculine faire in present tense",
        answerOptions: [
          { text: "Fait-elle ?", rationale: "This means 'Does she do / Does she make?'.", isCorrect: false },
          { text: "Fais-je ?", rationale: "This means 'Do I do / Do I make?'.", isCorrect: false },
          { text: "Fais-tu ?", rationale: "This means 'Do you do / Do you make?' (informal).", isCorrect: false },
          { text: "Fait-il ?", rationale: "Correct! 'Fait-il ?' is 'Does he do / Does he make?' in French interrogative form with inversion.", isCorrect: true }
        ]
      },

      // Negative questions (3 questions)
      {
        question: "Don't I do / Don't I make?",
        hint: "Negative interrogative form of first person singular faire in present tense",
        answerOptions: [
          { text: "Ne fais-tu pas ?", rationale: "This means 'Don't you do / Don't you make?' (informal).", isCorrect: false },
          { text: "Ne fait-il pas ?", rationale: "This means 'Doesn't he do / Doesn't he make?'.", isCorrect: false },
          { text: "Ne faisons-nous pas ?", rationale: "This means 'Don't we do / Don't we make?'.", isCorrect: false },
          { text: "Ne fais-je pas ?", rationale: "Correct! 'Ne fais-je pas ?' is 'Don't I do / Don't I make?' in French negative interrogative form.", isCorrect: true }
        ]
      },
      {
        question: "Don't you do / Don't you make? (informal)",
        hint: "Negative interrogative form of second person singular faire in present tense",
        answerOptions: [
          { text: "Ne fais-je pas ?", rationale: "This means 'Don't I do / Don't I make?'.", isCorrect: false },
          { text: "Ne fais-tu pas ?", rationale: "Correct! 'Ne fais-tu pas ?' is 'Don't you do / Don't you make?' (informal) in French negative interrogative.", isCorrect: true },
          { text: "Ne fait-il pas ?", rationale: "This means 'Doesn't he do / Doesn't he make?'.", isCorrect: false },
          { text: "Ne faites-vous pas ?", rationale: "This means 'Don't you do / Don't you make?' (formal/plural).", isCorrect: false }
        ]
      },
      {
        question: "Doesn't he do / Doesn't he make?",
        hint: "Negative interrogative form of third person singular masculine faire in present tense",
        answerOptions: [
          { text: "Ne fait-elle pas ?", rationale: "This means 'Doesn't she do / Doesn't she make?'.", isCorrect: false },
          { text: "Ne fais-je pas ?", rationale: "This means 'Don't I do / Don't I make?'.", isCorrect: false },
          { text: "Ne fait-il pas ?", rationale: "Correct! 'Ne fait-il pas ?' is 'Doesn't he do / Doesn't he make?' in French negative interrogative form.", isCorrect: true },
          { text: "Ne fais-tu pas ?", rationale: "This means 'Don't you do / Don't you make?' (informal).", isCorrect: false }
        ]
      }
    ],
    "Passé Composé": [
      // Positive statements (8 questions)
      {
        question: "I have made",
        hint: "First person singular of faire in passé composé",
        answerOptions: [
          { text: "Tu as fait", rationale: "This means 'you have made' (informal).", isCorrect: false },
          { text: "J'ai fait", rationale: "Correct! 'J'ai fait' is 'I have made' in French passé composé.", isCorrect: true },
          { text: "Il a fait", rationale: "This means 'he has made'.", isCorrect: false },
          { text: "Nous avons fait", rationale: "This means 'we have made'.", isCorrect: false }
        ]
      },
      {
        question: "You have made (informal)",
        hint: "Second person singular of faire in passé composé",
        answerOptions: [
          { text: "J'ai fait", rationale: "This means 'I have made'.", isCorrect: false },
          { text: "Vous avez fait", rationale: "This means 'you have made' (formal/plural).", isCorrect: false },
          { text: "Tu as fait", rationale: "Correct! 'Tu as fait' is 'you have made' (informal) in French passé composé.", isCorrect: true },
          { text: "Ils ont fait", rationale: "This means 'they have made'.", isCorrect: false }
        ]
      },
      {
        question: "He has made",
        hint: "Third person singular masculine of faire in passé composé",
        answerOptions: [
          { text: "Elle a fait", rationale: "This means 'she has made'.", isCorrect: false },
          { text: "Tu as fait", rationale: "This means 'you have made' (informal).", isCorrect: false },
          { text: "Ils ont fait", rationale: "This means 'they have made'.", isCorrect: false },
          { text: "Il a fait", rationale: "Correct! 'Il a fait' is 'he has made' in French passé composé.", isCorrect: true }
        ]
      },
      {
        question: "She has made",
        hint: "Third person singular feminine of faire in passé composé",
        answerOptions: [
          { text: "Il a fait", rationale: "This means 'he has made'.", isCorrect: false },
          { text: "Elle a fait", rationale: "Correct! 'Elle a fait' is 'she has made' in French passé composé.", isCorrect: true },
          { text: "Elles ont fait", rationale: "This means 'they have made' (feminine).", isCorrect: false },
          { text: "Tu as fait", rationale: "This means 'you have made' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We have made",
        hint: "First person plural of faire in passé composé",
        answerOptions: [
          { text: "Vous avez fait", rationale: "This means 'you have made' (formal/plural).", isCorrect: false },
          { text: "Ils ont fait", rationale: "This means 'they have made'.", isCorrect: false },
          { text: "J'ai fait", rationale: "This means 'I have made'.", isCorrect: false },
          { text: "Nous avons fait", rationale: "Correct! 'Nous avons fait' is 'we have made' in French passé composé.", isCorrect: true }
        ]
      },
      {
        question: "You have made (formal/plural)",
        hint: "Second person formal/plural of faire in passé composé",
        answerOptions: [
          { text: "Tu as fait", rationale: "This means 'you have made' (informal).", isCorrect: false },
          { text: "Nous avons fait", rationale: "This means 'we have made'.", isCorrect: false },
          { text: "Vous avez fait", rationale: "Correct! 'Vous avez fait' is 'you have made' (formal/plural) in French passé composé.", isCorrect: true },
          { text: "Ils ont fait", rationale: "This means 'they have made'.", isCorrect: false }
        ]
      },
      {
        question: "They have made (male/mixed)",
        hint: "Third person plural masculine/mixed of faire in passé composé",
        answerOptions: [
          { text: "Elles ont fait", rationale: "This means 'they have made' (feminine only).", isCorrect: false },
          { text: "Ils faisaient", rationale: "This is imperfect past tense, not passé composé.", isCorrect: false },
          { text: "Ils ont été", rationale: "This means 'they have been' (être), not 'they have made' (faire).", isCorrect: false },
          { text: "Ils ont fait", rationale: "Correct! 'Ils ont fait' is 'they have made' (masculine/mixed) in French passé composé.", isCorrect: true }
        ]
      },
      {
        question: "They have made (female)",
        hint: "Third person plural feminine of faire in passé composé",
        answerOptions: [
          { text: "Ils ont fait", rationale: "This means 'they have made' (masculine/mixed).", isCorrect: false },
          { text: "Elles ont fait", rationale: "Correct! 'Elles ont fait' is 'they have made' (feminine) in French passé composé.", isCorrect: true },
          { text: "Elles faisaient", rationale: "This is imperfect past tense, not passé composé.", isCorrect: false },
          { text: "Elles ont été", rationale: "This means 'they have been' (être), not 'they have made' (faire).", isCorrect: false }
        ]
      },

      // Negative statements (6 questions)
      {
        question: "I have not made",
        hint: "First person singular negative of faire in passé composé",
        answerOptions: [
          { text: "Tu n'as pas fait", rationale: "This means 'you have not made' (informal).", isCorrect: false },
          { text: "Il n'a pas fait", rationale: "This means 'he has not made'.", isCorrect: false },
          { text: "Je n'ai pas fait", rationale: "Correct! 'Je n'ai pas fait' is 'I have not made' using French negation ne...pas.", isCorrect: true },
          { text: "Nous n'avons pas fait", rationale: "This means 'we have not made'.", isCorrect: false }
        ]
      },
      {
        question: "You have not made (informal)",
        hint: "Second person singular negative of faire in passé composé",
        answerOptions: [
          { text: "Je n'ai pas fait", rationale: "This means 'I have not made'.", isCorrect: false },
          { text: "Tu n'as pas fait", rationale: "Correct! 'Tu n'as pas fait' is 'you have not made' (informal) using French negation.", isCorrect: true },
          { text: "Vous n'avez pas fait", rationale: "This means 'you have not made' (formal/plural).", isCorrect: false },
          { text: "Ils n'ont pas fait", rationale: "This means 'they have not made'.", isCorrect: false }
        ]
      },
      {
        question: "He has not made",
        hint: "Third person singular masculine negative of faire in passé composé",
        answerOptions: [
          { text: "Elle n'a pas fait", rationale: "This means 'she has not made'.", isCorrect: false },
          { text: "Tu n'as pas fait", rationale: "This means 'you have not made' (informal).", isCorrect: false },
          { text: "Ils n'ont pas fait", rationale: "This means 'they have not made'.", isCorrect: false },
          { text: "Il n'a pas fait", rationale: "Correct! 'Il n'a pas fait' is 'he has not made' using French negation ne...pas.", isCorrect: true }
        ]
      },
      {
        question: "She has not made",
        hint: "Third person singular feminine negative of faire in passé composé",
        answerOptions: [
          { text: "Il n'a pas fait", rationale: "This means 'he has not made'.", isCorrect: false },
          { text: "Elle n'a pas fait", rationale: "Correct! 'Elle n'a pas fait' is 'she has not made' using French negation ne...pas.", isCorrect: true },
          { text: "Elles n'ont pas fait", rationale: "This means 'they have not made' (feminine).", isCorrect: false },
          { text: "Tu n'as pas fait", rationale: "This means 'you have not made' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We have not made",
        hint: "First person plural negative of faire in passé composé",
        answerOptions: [
          { text: "Vous n'avez pas fait", rationale: "This means 'you have not made' (formal/plural).", isCorrect: false },
          { text: "Ils n'ont pas fait", rationale: "This means 'they have not made'.", isCorrect: false },
          { text: "Je n'ai pas fait", rationale: "This means 'I have not made'.", isCorrect: false },
          { text: "Nous n'avons pas fait", rationale: "Correct! 'Nous n'avons pas fait' is 'we have not made' using French negation ne...pas.", isCorrect: true }
        ]
      },
      {
        question: "You have not made (formal/plural)",
        hint: "Second person formal/plural negative of faire in passé composé",
        answerOptions: [
          { text: "Tu n'as pas fait", rationale: "This means 'you have not made' (informal).", isCorrect: false },
          { text: "Vous n'avez pas fait", rationale: "Correct! 'Vous n'avez pas fait' is 'you have not made' (formal/plural) using French negation.", isCorrect: true },
          { text: "Nous n'avons pas fait", rationale: "This means 'we have not made'.", isCorrect: false },
          { text: "Ils n'ont pas fait", rationale: "This means 'they have not made'.", isCorrect: false }
        ]
      },

      // Positive questions (3 questions)
      {
        question: "Have I made?",
        hint: "Interrogative form of first person singular faire in passé composé",
        answerOptions: [
          { text: "As-tu fait ?", rationale: "This means 'Have you made?' (informal).", isCorrect: false },
          { text: "A-t-il fait ?", rationale: "This means 'Has he made?'.", isCorrect: false },
          { text: "Ai-je fait ?", rationale: "Correct! 'Ai-je fait ?' is 'Have I made?' in French interrogative form with inversion.", isCorrect: true },
          { text: "Avons-nous fait ?", rationale: "This means 'Have we made?'.", isCorrect: false }
        ]
      },
      {
        question: "Have you made? (informal)",
        hint: "Interrogative form of second person singular faire in passé composé",
        answerOptions: [
          { text: "Ai-je fait ?", rationale: "This means 'Have I made?'.", isCorrect: false },
          { text: "As-tu fait ?", rationale: "Correct! 'As-tu fait ?' is 'Have you made?' (informal) in French interrogative form.", isCorrect: true },
          { text: "A-t-il fait ?", rationale: "This means 'Has he made?'.", isCorrect: false },
          { text: "Avez-vous fait ?", rationale: "This means 'Have you made?' (formal/plural).", isCorrect: false }
        ]
      },
      {
        question: "Has he made?",
        hint: "Interrogative form of third person singular masculine faire in passé composé",
        answerOptions: [
          { text: "A-t-elle fait ?", rationale: "This means 'Has she made?'.", isCorrect: false },
          { text: "Ai-je fait ?", rationale: "This means 'Have I made?'.", isCorrect: false },
          { text: "As-tu fait ?", rationale: "This means 'Have you made?' (informal).", isCorrect: false },
          { text: "A-t-il fait ?", rationale: "Correct! 'A-t-il fait ?' is 'Has he made?' in French interrogative form with liaison 't'.", isCorrect: true }
        ]
      },

      // Negative questions (3 questions)
      {
        question: "Haven't I made?",
        hint: "Negative interrogative form of first person singular faire in passé composé",
        answerOptions: [
          { text: "N'as-tu pas fait ?", rationale: "This means 'Haven't you made?' (informal).", isCorrect: false },
          { text: "N'a-t-il pas fait ?", rationale: "This means 'Hasn't he made?'.", isCorrect: false },
          { text: "N'avons-nous pas fait ?", rationale: "This means 'Haven't we made?'.", isCorrect: false },
          { text: "N'ai-je pas fait ?", rationale: "Correct! 'N'ai-je pas fait ?' is 'Haven't I made?' in French negative interrogative form.", isCorrect: true }
        ]
      },
      {
        question: "Haven't you made? (informal)",
        hint: "Negative interrogative form of second person singular faire in passé composé",
        answerOptions: [
          { text: "N'ai-je pas fait ?", rationale: "This means 'Haven't I made?'.", isCorrect: false },
          { text: "N'as-tu pas fait ?", rationale: "Correct! 'N'as-tu pas fait ?' is 'Haven't you made?' (informal) in French negative interrogative.", isCorrect: true },
          { text: "N'a-t-il pas fait ?", rationale: "This means 'Hasn't he made?'.", isCorrect: false },
          { text: "N'avez-vous pas fait ?", rationale: "This means 'Haven't you made?' (formal/plural).", isCorrect: false }
        ]
      },
      {
        question: "Hasn't he made?",
        hint: "Negative interrogative form of third person singular masculine faire in passé composé",
        answerOptions: [
          { text: "N'a-t-elle pas fait ?", rationale: "This means 'Hasn't she made?'.", isCorrect: false },
          { text: "N'ai-je pas fait ?", rationale: "This means 'Haven't I made?'.", isCorrect: false },
          { text: "N'a-t-il pas fait ?", rationale: "Correct! 'N'a-t-il pas fait ?' is 'Hasn't he made?' in French negative interrogative with liaison 't'.", isCorrect: true },
          { text: "N'as-tu pas fait ?", rationale: "This means 'Haven't you made?' (informal).", isCorrect: false }
        ]
      }
    ],
    "Futur Simple": [
      // Positive statements (8 questions)
      {
        question: "I will do / I will make",
        hint: "First person singular of faire in future tense",
        answerOptions: [
          { text: "Tu feras", rationale: "This means 'you will do / you will make' (informal).", isCorrect: false },
          { text: "Je ferai", rationale: "Correct! 'Je ferai' is 'I will do / I will make' in French future tense.", isCorrect: true },
          { text: "Il fera", rationale: "This means 'he will do / he will make'.", isCorrect: false },
          { text: "Nous ferons", rationale: "This means 'we will do / we will make'.", isCorrect: false }
        ]
      },
      {
        question: "You will do / You will make (informal)",
        hint: "Second person singular of faire in future tense",
        answerOptions: [
          { text: "Je ferai", rationale: "This means 'I will do / I will make'.", isCorrect: false },
          { text: "Vous ferez", rationale: "This means 'you will do / you will make' (formal/plural).", isCorrect: false },
          { text: "Tu feras", rationale: "Correct! 'Tu feras' is 'you will do / you will make' (informal) in French future tense.", isCorrect: true },
          { text: "Ils feront", rationale: "This means 'they will do / they will make'.", isCorrect: false }
        ]
      },
      {
        question: "He will do / He will make",
        hint: "Third person singular masculine of faire in future tense",
        answerOptions: [
          { text: "Elle fera", rationale: "This means 'she will do / she will make'.", isCorrect: false },
          { text: "Tu feras", rationale: "This means 'you will do / you will make' (informal).", isCorrect: false },
          { text: "Ils feront", rationale: "This means 'they will do / they will make'.", isCorrect: false },
          { text: "Il fera", rationale: "Correct! 'Il fera' is 'he will do / he will make' in French future tense.", isCorrect: true }
        ]
      },
      {
        question: "She will do / She will make",
        hint: "Third person singular feminine of faire in future tense",
        answerOptions: [
          { text: "Il fera", rationale: "This means 'he will do / he will make'.", isCorrect: false },
          { text: "Elle fera", rationale: "Correct! 'Elle fera' is 'she will do / she will make' in French future tense.", isCorrect: true },
          { text: "Elles feront", rationale: "This means 'they will do / they will make' (feminine).", isCorrect: false },
          { text: "Tu feras", rationale: "This means 'you will do / you will make' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We will do / We will make",
        hint: "First person plural of faire in future tense",
        answerOptions: [
          { text: "Vous ferez", rationale: "This means 'you will do / you will make' (formal/plural).", isCorrect: false },
          { text: "Ils feront", rationale: "This means 'they will do / they will make'.", isCorrect: false },
          { text: "Je ferai", rationale: "This means 'I will do / I will make'.", isCorrect: false },
          { text: "Nous ferons", rationale: "Correct! 'Nous ferons' is 'we will do / we will make' in French future tense.", isCorrect: true }
        ]
      },
      {
        question: "You will do / You will make (formal/plural)",
        hint: "Second person formal/plural of faire in future tense",
        answerOptions: [
          { text: "Tu feras", rationale: "This means 'you will do / you will make' (informal).", isCorrect: false },
          { text: "Nous ferons", rationale: "This means 'we will do / we will make'.", isCorrect: false },
          { text: "Vous ferez", rationale: "Correct! 'Vous ferez' is 'you will do / you will make' (formal/plural) in French future tense.", isCorrect: true },
          { text: "Ils feront", rationale: "This means 'they will do / they will make'.", isCorrect: false }
        ]
      },
      {
        question: "They will do / They will make (male/mixed)",
        hint: "Third person plural masculine/mixed of faire in future tense",
        answerOptions: [
          { text: "Elles feront", rationale: "This means 'they will do / they will make' (feminine only).", isCorrect: false },
          { text: "Ils faisaient", rationale: "This is imperfect past tense, not future.", isCorrect: false },
          { text: "Ils ont fait", rationale: "This is passé composé (past), not future.", isCorrect: false },
          { text: "Ils feront", rationale: "Correct! 'Ils feront' is 'they will do / they will make' (masculine/mixed) in French future tense.", isCorrect: true }
        ]
      },
      {
        question: "They will do / They will make (female)",
        hint: "Third person plural feminine of faire in future tense",
        answerOptions: [
          { text: "Ils feront", rationale: "This means 'they will do / they will make' (masculine/mixed).", isCorrect: false },
          { text: "Elles feront", rationale: "Correct! 'Elles feront' is 'they will do / they will make' (feminine) in French future tense.", isCorrect: true },
          { text: "Elles faisaient", rationale: "This is imperfect past tense, not future.", isCorrect: false },
          { text: "Elles ont fait", rationale: "This is passé composé (past), not future.", isCorrect: false }
        ]
      },

      // Negative statements (6 questions)
      {
        question: "I will not do / I will not make",
        hint: "First person singular negative of faire in future tense",
        answerOptions: [
          { text: "Tu ne feras pas", rationale: "This means 'you will not do / you will not make' (informal).", isCorrect: false },
          { text: "Il ne fera pas", rationale: "This means 'he will not do / he will not make'.", isCorrect: false },
          { text: "Je ne ferai pas", rationale: "Correct! 'Je ne ferai pas' is 'I will not do / I will not make' using French negation ne...pas.", isCorrect: true },
          { text: "Nous ne ferons pas", rationale: "This means 'we will not do / we will not make'.", isCorrect: false }
        ]
      },
      {
        question: "You will not do / You will not make (informal)",
        hint: "Second person singular negative of faire in future tense",
        answerOptions: [
          { text: "Je ne ferai pas", rationale: "This means 'I will not do / I will not make'.", isCorrect: false },
          { text: "Tu ne feras pas", rationale: "Correct! 'Tu ne feras pas' is 'you will not do / you will not make' (informal) using French negation.", isCorrect: true },
          { text: "Vous ne ferez pas", rationale: "This means 'you will not do / you will not make' (formal/plural).", isCorrect: false },
          { text: "Ils ne feront pas", rationale: "This means 'they will not do / they will not make'.", isCorrect: false }
        ]
      },
      {
        question: "He will not do / He will not make",
        hint: "Third person singular masculine negative of faire in future tense",
        answerOptions: [
          { text: "Elle ne fera pas", rationale: "This means 'she will not do / she will not make'.", isCorrect: false },
          { text: "Tu ne feras pas", rationale: "This means 'you will not do / you will not make' (informal).", isCorrect: false },
          { text: "Ils ne feront pas", rationale: "This means 'they will not do / they will not make'.", isCorrect: false },
          { text: "Il ne fera pas", rationale: "Correct! 'Il ne fera pas' is 'he will not do / he will not make' using French negation ne...pas.", isCorrect: true }
        ]
      },
      {
        question: "She will not do / She will not make",
        hint: "Third person singular feminine negative of faire in future tense",
        answerOptions: [
          { text: "Il ne fera pas", rationale: "This means 'he will not do / he will not make'.", isCorrect: false },
          { text: "Elle ne fera pas", rationale: "Correct! 'Elle ne fera pas' is 'she will not do / she will not make' using French negation ne...pas.", isCorrect: true },
          { text: "Elles ne feront pas", rationale: "This means 'they will not do / they will not make' (feminine).", isCorrect: false },
          { text: "Tu ne feras pas", rationale: "This means 'you will not do / you will not make' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We will not do / We will not make",
        hint: "First person plural negative of faire in future tense",
        answerOptions: [
          { text: "Vous ne ferez pas", rationale: "This means 'you will not do / you will not make' (formal/plural).", isCorrect: false },
          { text: "Ils ne feront pas", rationale: "This means 'they will not do / they will not make'.", isCorrect: false },
          { text: "Je ne ferai pas", rationale: "This means 'I will not do / I will not make'.", isCorrect: false },
          { text: "Nous ne ferons pas", rationale: "Correct! 'Nous ne ferons pas' is 'we will not do / we will not make' using French negation ne...pas.", isCorrect: true }
        ]
      },
      {
        question: "You will not do / You will not make (formal/plural)",
        hint: "Second person formal/plural negative of faire in future tense",
        answerOptions: [
          { text: "Tu ne feras pas", rationale: "This means 'you will not do / you will not make' (informal).", isCorrect: false },
          { text: "Vous ne ferez pas", rationale: "Correct! 'Vous ne ferez pas' is 'you will not do / you will not make' (formal/plural) using French negation.", isCorrect: true },
          { text: "Nous ne ferons pas", rationale: "This means 'we will not do / we will not make'.", isCorrect: false },
          { text: "Ils ne feront pas", rationale: "This means 'they will not do / they will not make'.", isCorrect: false }
        ]
      },

      // Positive questions (3 questions)
      {
        question: "Will I do / Will I make?",
        hint: "Interrogative form of first person singular faire in future tense",
        answerOptions: [
          { text: "Feras-tu ?", rationale: "This means 'Will you do / Will you make?' (informal).", isCorrect: false },
          { text: "Fera-t-il ?", rationale: "This means 'Will he do / Will he make?'.", isCorrect: false },
          { text: "Ferai-je ?", rationale: "Correct! 'Ferai-je ?' is 'Will I do / Will I make?' in French interrogative form with inversion.", isCorrect: true },
          { text: "Ferons-nous ?", rationale: "This means 'Will we do / Will we make?'.", isCorrect: false }
        ]
      },
      {
        question: "Will you do / Will you make? (informal)",
        hint: "Interrogative form of second person singular faire in future tense",
        answerOptions: [
          { text: "Ferai-je ?", rationale: "This means 'Will I do / Will I make?'.", isCorrect: false },
          { text: "Feras-tu ?", rationale: "Correct! 'Feras-tu ?' is 'Will you do / Will you make?' (informal) in French interrogative form.", isCorrect: true },
          { text: "Fera-t-il ?", rationale: "This means 'Will he do / Will he make?'.", isCorrect: false },
          { text: "Ferez-vous ?", rationale: "This means 'Will you do / Will you make?' (formal/plural).", isCorrect: false }
        ]
      },
      {
        question: "Will he do / Will he make?",
        hint: "Interrogative form of third person singular masculine faire in future tense",
        answerOptions: [
          { text: "Fera-t-elle ?", rationale: "This means 'Will she do / Will she make?'.", isCorrect: false },
          { text: "Ferai-je ?", rationale: "This means 'Will I do / Will I make?'.", isCorrect: false },
          { text: "Feras-tu ?", rationale: "This means 'Will you do / Will you make?' (informal).", isCorrect: false },
          { text: "Fera-t-il ?", rationale: "Correct! 'Fera-t-il ?' is 'Will he do / Will he make?' in French interrogative form with liaison 't'.", isCorrect: true }
        ]
      },

      // Negative questions (3 questions)
      {
        question: "Won't I do / Won't I make?",
        hint: "Negative interrogative form of first person singular faire in future tense",
        answerOptions: [
          { text: "Ne feras-tu pas ?", rationale: "This means 'Won't you do / Won't you make?' (informal).", isCorrect: false },
          { text: "Ne fera-t-il pas ?", rationale: "This means 'Won't he do / Won't he make?'.", isCorrect: false },
          { text: "Ne ferons-nous pas ?", rationale: "This means 'Won't we do / Won't we make?'.", isCorrect: false },
          { text: "Ne ferai-je pas ?", rationale: "Correct! 'Ne ferai-je pas ?' is 'Won't I do / Won't I make?' in French negative interrogative form.", isCorrect: true }
        ]
      },
      {
        question: "Won't you do / Won't you make? (informal)",
        hint: "Negative interrogative form of second person singular faire in future tense",
        answerOptions: [
          { text: "Ne ferai-je pas ?", rationale: "This means 'Won't I do / Won't I make?'.", isCorrect: false },
          { text: "Ne feras-tu pas ?", rationale: "Correct! 'Ne feras-tu pas ?' is 'Won't you do / Won't you make?' (informal) in French negative interrogative.", isCorrect: true },
          { text: "Ne fera-t-il pas ?", rationale: "This means 'Won't he do / Won't he make?'.", isCorrect: false },
          { text: "Ne ferez-vous pas ?", rationale: "This means 'Won't you do / Won't you make?' (formal/plural).", isCorrect: false }
        ]
      },
      {
        question: "Won't he do / Won't he make?",
        hint: "Negative interrogative form of third person singular masculine faire in future tense",
        answerOptions: [
          { text: "Ne fera-t-elle pas ?", rationale: "This means 'Won't she do / Won't she make?'.", isCorrect: false },
          { text: "Ne ferai-je pas ?", rationale: "This means 'Won't I do / Won't I make?'.", isCorrect: false },
          { text: "Ne fera-t-il pas ?", rationale: "Correct! 'Ne fera-t-il pas ?' is 'Won't he do / Won't he make?' in French negative interrogative with liaison 't'.", isCorrect: true },
          { text: "Ne feras-tu pas ?", rationale: "This means 'Won't you do / Won't you make?' (informal).", isCorrect: false }
        ]
      }
    ]
  }
};

// Comprehensive pronoun mapping for all 6 French pronouns
const PRONOUN_CONJUGATIONS: Record<string, Record<string, Record<string, string>>> = {
  "être": {
    "Présent": {
      "I am": "Je suis",
      "You are (informal)": "Tu es", 
      "He is": "Il est",
      "She is": "Elle est",
      "We are": "Nous sommes",
      "You are (formal/plural)": "Vous êtes",
      "They are (male/mixed)": "Ils sont",
      "They are (female)": "Elles sont"
    },
    "Passé Composé": {
      "I was/have been": "J'ai été",
      "You were/have been (informal)": "Tu as été",
      "He was/has been": "Il a été", 
      "She was/has been": "Elle a été",
      "We were/have been": "Nous avons été",
      "You were/have been (formal/plural)": "Vous avez été",
      "They were/have been (male/mixed)": "Ils ont été",
      "They were/have been (female)": "Elles ont été"
    },
    "Futur Simple": {
      "I will be": "Je serai",
      "You will be (informal)": "Tu seras",
      "He will be": "Il sera",
      "She will be": "Elle sera", 
      "We will be": "Nous serons",
      "You will be (formal/plural)": "Vous serez",
      "They will be (male/mixed)": "Ils seront",
      "They will be (female)": "Elles seront"
    }
  },
  "avoir": {
    "Présent": {
      "I have": "J'ai",
      "You have (informal)": "Tu as",
      "He has": "Il a",
      "She has": "Elle a",
      "We have": "Nous avons", 
      "You have (formal/plural)": "Vous avez",
      "They have (male/mixed)": "Ils ont",
      "They have (female)": "Elles ont"
    },
    "Passé Composé": {
      "I had/have had": "J'ai eu",
      "You had/have had (informal)": "Tu as eu",
      "He had/has had": "Il a eu",
      "She had/has had": "Elle a eu",
      "We had/have had": "Nous avons eu",
      "You had/have had (formal/plural)": "Vous avez eu", 
      "They had/have had (male/mixed)": "Ils ont eu",
      "They had/have had (female)": "Elles ont eu"
    },
    "Futur Simple": {
      "I will have": "J'aurai",
      "You will have (informal)": "Tu auras",
      "He will have": "Il aura",
      "She will have": "Elle aura",
      "We will have": "Nous aurons",
      "You will have (formal/plural)": "Vous aurez",
      "They will have (male/mixed)": "Ils auront", 
      "They will have (female)": "Elles auront"
    }
  },
  "faire": {
    "Présent": {
      "I do/make": "Je fais",
      "You do/make (informal)": "Tu fais",
      "He does/makes": "Il fait", 
      "She does/makes": "Elle fait",
      "We do/make": "Nous faisons",
      "You do/make (formal/plural)": "Vous faites",
      "They do/make (male/mixed)": "Ils font",
      "They do/make (female)": "Elles font"
    },
    "Passé Composé": {
      "I did/made/have done": "J'ai fait",
      "You did/made/have done (informal)": "Tu as fait",
      "He did/made/has done": "Il a fait",
      "She did/made/has done": "Elle a fait", 
      "We did/made/have done": "Nous avons fait",
      "You did/made/have done (formal/plural)": "Vous avez fait",
      "They did/made/have done (male/mixed)": "Ils ont fait",
      "They did/made/have done (female)": "Elles ont fait"
    },
    "Futur Simple": {
      "I will do/make": "Je ferai",
      "You will do/make (informal)": "Tu feras",
      "He will do/make": "Il fera",
      "She will do/make": "Elle fera",
      "We will do/make": "Nous ferons", 
      "You will do/make (formal/plural)": "Vous ferez",
      "They will do/make (male/mixed)": "Ils feront",
      "They will do/make (female)": "Elles feront"
    }
  }
};

// Generate comprehensive beginner questions using our conjugation data
function generateBeginnerQuestions(verb: string, tense: string, count: number): BeginnerPronounQuestion[] {
  const conjugations = PRONOUN_CONJUGATIONS[verb]?.[tense];
  if (!conjugations) return [];

  const questions: BeginnerPronounQuestion[] = [];
  const entries = Object.entries(conjugations);
  const allFrenchOptions = entries.map(([_, french]) => french);
  
  // Create multiple variations for each pronoun combination
  entries.forEach(([englishForm, frenchForm]) => {
    const availableWrong = allFrenchOptions.filter(option => option !== frenchForm);
    
    // Create 3 different question variations with different wrong answer combinations
    for (let variation = 0; variation < 3 && questions.length < count; variation++) {
      // Shuffle wrong options for each variation
      const shuffledWrong = [...availableWrong].sort(() => Math.random() - 0.5);
      const wrongOptions = shuffledWrong.slice(0, 3);
      
      if (wrongOptions.length >= 3) {
        // Create shuffled answer options for each variation
        const answerOptions = [
          { text: frenchForm, rationale: `Correct! '${frenchForm}' is '${englishForm}' in French.`, isCorrect: true },
          { text: wrongOptions[0], rationale: `This is a different conjugation of ${verb}.`, isCorrect: false },
          { text: wrongOptions[1], rationale: `This is a different conjugation of ${verb}.`, isCorrect: false },
          { text: wrongOptions[2], rationale: `This is a different conjugation of ${verb}.`, isCorrect: false }
        ].sort(() => Math.random() - 0.5); // Randomize order
        
        questions.push({
          question: englishForm,
          hint: `Conjugation of ${verb} for this pronoun in ${tense}`,
          answerOptions
        });
      }
    }
  });

  // Shuffle all questions and return requested count
  return questions.sort(() => Math.random() - 0.5).slice(0, count);
}

// Function to get random beginner pronoun questions for a specific verb and tense
export function getRandomBeginnerPronounQuestions(verb: string, tense: string, count: number): BeginnerPronounQuestion[] {
  // First try our curated questions
  const curatedQuestions = BEGINNER_PRONOUN_QUESTIONS[verb]?.[tense] || [];
  
  // If we don't have enough curated questions, generate comprehensive ones
  if (curatedQuestions.length < count) {
    console.log(`🔧 Generating ${count} comprehensive beginner questions for ${verb} - ${tense}`);
    const generated = generateBeginnerQuestions(verb, tense, count);
    return generated.length > 0 ? generated : curatedQuestions;
  }
  
  // Shuffle and return curated questions
  const shuffled = [...curatedQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}