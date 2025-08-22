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
      {
        question: "I am",
        hint: "First person singular of être in present tense",
        answerOptions: [
          { text: "Je suis", rationale: "Correct! 'Je suis' is 'I am' in French.", isCorrect: true },
          { text: "Tu es", rationale: "This means 'you are' (informal).", isCorrect: false },
          { text: "Il est", rationale: "This means 'he is'.", isCorrect: false },
          { text: "Nous sommes", rationale: "This means 'we are'.", isCorrect: false }
        ]
      },
      {
        question: "You are (informal)",
        hint: "Second person singular informal of être",
        answerOptions: [
          { text: "Tu es", rationale: "Correct! 'Tu es' is 'you are' (informal).", isCorrect: true },
          { text: "Je suis", rationale: "This means 'I am'.", isCorrect: false },
          { text: "Il est", rationale: "This means 'he is'.", isCorrect: false },
          { text: "Elles sont", rationale: "This means 'they are' (feminine).", isCorrect: false }
        ]
      },
      {
        question: "He is",
        hint: "Third person singular masculine of être",
        answerOptions: [
          { text: "Il est", rationale: "Correct! 'Il est' is 'he is' in French.", isCorrect: true },
          { text: "Elle est", rationale: "This means 'she is'.", isCorrect: false },
          { text: "Tu es", rationale: "This means 'you are' (informal).", isCorrect: false },
          { text: "Ils sont", rationale: "This means 'they are' (masculine/mixed).", isCorrect: false }
        ]
      },
      {
        question: "We are",
        hint: "First person plural of être",
        answerOptions: [
          { text: "Nous sommes", rationale: "Correct! 'Nous sommes' is 'we are' in French.", isCorrect: true },
          { text: "Vous êtes", rationale: "This means 'you are' (formal/plural).", isCorrect: false },
          { text: "Ils sont", rationale: "This means 'they are' (masculine/mixed).", isCorrect: false },
          { text: "Je suis", rationale: "This means 'I am'.", isCorrect: false }
        ]
      },
      {
        question: "She is",
        hint: "Third person singular feminine of être",
        answerOptions: [
          { text: "Elle est", rationale: "Correct! 'Elle est' is 'she is' in French.", isCorrect: true },
          { text: "Il est", rationale: "This means 'he is'.", isCorrect: false },
          { text: "Tu es", rationale: "This means 'you are' (informal).", isCorrect: false },
          { text: "Elles sont", rationale: "This means 'they are' (feminine).", isCorrect: false }
        ]
      },
      {
        question: "You are (formal/plural)",
        hint: "Second person formal/plural of être",
        answerOptions: [
          { text: "Vous êtes", rationale: "Correct! 'Vous êtes' is 'you are' (formal/plural) in French.", isCorrect: true },
          { text: "Tu es", rationale: "This means 'you are' (informal).", isCorrect: false },
          { text: "Nous sommes", rationale: "This means 'we are'.", isCorrect: false },
          { text: "Ils sont", rationale: "This means 'they are' (masculine/mixed).", isCorrect: false }
        ]
      },
      {
        question: "They are (male/mixed)",
        hint: "Third person plural masculine/mixed of être",
        answerOptions: [
          { text: "Ils sont", rationale: "Correct! 'Ils sont' is 'they are' (masculine/mixed) in French.", isCorrect: true },
          { text: "Elles sont", rationale: "This means 'they are' (feminine only).", isCorrect: false },
          { text: "Vous êtes", rationale: "This means 'you are' (formal/plural).", isCorrect: false },
          { text: "Nous sommes", rationale: "This means 'we are'.", isCorrect: false }
        ]
      },
      {
        question: "They are (female)",
        hint: "Third person plural feminine of être",
        answerOptions: [
          { text: "Elles sont", rationale: "Correct! 'Elles sont' is 'they are' (feminine) in French.", isCorrect: true },
          { text: "Ils sont", rationale: "This means 'they are' (masculine/mixed).", isCorrect: false },
          { text: "Elles étaient", rationale: "This is past tense (imperfect).", isCorrect: false },
          { text: "Elles seront", rationale: "This is future tense.", isCorrect: false }
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
      {
        question: "I have",
        hint: "First person singular of avoir in present tense",
        answerOptions: [
          { text: "J'ai", rationale: "Correct! 'J'ai' is 'I have' in French.", isCorrect: true },
          { text: "Il a", rationale: "This means 'he has'.", isCorrect: false },
          { text: "Elle a", rationale: "This means 'she has'.", isCorrect: false },
          { text: "Tu as", rationale: "This means 'you have' (informal).", isCorrect: false }
        ]
      },
      {
        question: "He has",
        hint: "Third person singular masculine of avoir",
        answerOptions: [
          { text: "Il a", rationale: "Correct! 'Il a' is 'he has' in French.", isCorrect: true },
          { text: "J'ai", rationale: "This means 'I have'.", isCorrect: false },
          { text: "Elle a", rationale: "This means 'she has'.", isCorrect: false },
          { text: "Tu as", rationale: "This means 'you have' (informal).", isCorrect: false }
        ]
      },
      {
        question: "They have (male/mixed)",
        hint: "Third person plural masculine/mixed of avoir",
        answerOptions: [
          { text: "Ils ont", rationale: "Correct! 'Ils ont' is 'they have' (masculine/mixed) in French.", isCorrect: true },
          { text: "Elles ont", rationale: "This means 'they have' (feminine only).", isCorrect: false },
          { text: "Nous avons", rationale: "This means 'we have'.", isCorrect: false },
          { text: "Il a", rationale: "This means 'he has' (singular).", isCorrect: false }
        ]
      }
    ],
    "Passé Composé": [
      {
        question: "I had",
        hint: "First person singular of avoir in passé composé",
        answerOptions: [
          { text: "J'ai eu", rationale: "Correct! 'J'ai eu' is 'I had' in French.", isCorrect: true },
          { text: "Tu as eu", rationale: "This means 'you had' (informal).", isCorrect: false },
          { text: "Il a eu", rationale: "This means 'he had'.", isCorrect: false },
          { text: "Nous avons eu", rationale: "This means 'we had'.", isCorrect: false }
        ]
      },
      {
        question: "You had (informal)",
        hint: "Second person singular of avoir in passé composé",
        answerOptions: [
          { text: "Tu as eu", rationale: "Correct! 'Tu as eu' is 'you had' (informal) in French.", isCorrect: true },
          { text: "J'ai eu", rationale: "This means 'I had'.", isCorrect: false },
          { text: "Elle a eu", rationale: "This means 'she had'.", isCorrect: false },
          { text: "Nous avons eu", rationale: "This means 'we had'.", isCorrect: false }
        ]
      }
    ],
    "Futur Simple": [
      {
        question: "I will have",
        hint: "First person singular of avoir in future tense",
        answerOptions: [
          { text: "J'aurai", rationale: "Correct! 'J'aurai' is 'I will have' in French.", isCorrect: true },
          { text: "Il aura", rationale: "This means 'he will have'.", isCorrect: false },
          { text: "Tu auras", rationale: "This means 'you will have' (informal).", isCorrect: false },
          { text: "Nous aurons", rationale: "This means 'we will have'.", isCorrect: false }
        ]
      },
      {
        question: "They will have (female)",
        hint: "Third person plural feminine of avoir in future",
        answerOptions: [
          { text: "Elles auront", rationale: "Correct! 'Elles auront' is 'they will have' (feminine) in French.", isCorrect: true },
          { text: "Ils auront", rationale: "This means 'they will have' (masculine/mixed).", isCorrect: false },
          { text: "Nous aurons", rationale: "This means 'we will have'.", isCorrect: false },
          { text: "Elle aura", rationale: "This means 'she will have' (singular).", isCorrect: false }
        ]
      }
    ]
  },
  "faire": {
    "Présent": [
      {
        question: "I do",
        hint: "First person singular of faire in present tense",
        answerOptions: [
          { text: "Je fais", rationale: "Correct! 'Je fais' is 'I do' in French.", isCorrect: true },
          { text: "Tu fais", rationale: "This means 'you do' (informal).", isCorrect: false },
          { text: "Il fait", rationale: "This means 'he does'.", isCorrect: false },
          { text: "Nous faisons", rationale: "This means 'we do'.", isCorrect: false }
        ]
      },
      {
        question: "He does",
        hint: "Third person singular masculine of faire",
        answerOptions: [
          { text: "Il fait", rationale: "Correct! 'Il fait' is 'he does' in French.", isCorrect: true },
          { text: "Je fais", rationale: "This means 'I do'.", isCorrect: false },
          { text: "Nous faisons", rationale: "This means 'we do'.", isCorrect: false },
          { text: "Ils font", rationale: "This means 'they do'.", isCorrect: false }
        ]
      },
      {
        question: "You do (plural/formal)",
        hint: "Second person plural/formal of faire",
        answerOptions: [
          { text: "Vous faites", rationale: "Correct! 'Vous faites' is 'you do' (plural/formal) in French.", isCorrect: true },
          { text: "Tu fais", rationale: "This means 'you do' (informal, singular).", isCorrect: false },
          { text: "Nous faisons", rationale: "This means 'we do'.", isCorrect: false },
          { text: "Ils font", rationale: "This means 'they do'.", isCorrect: false }
        ]
      }
    ],
    "Passé Composé": [
      {
        question: "I have made",
        hint: "First person singular of faire in passé composé",
        answerOptions: [
          { text: "J'ai fait", rationale: "Correct! 'J'ai fait' is 'I have made' in French.", isCorrect: true },
          { text: "Tu as fait", rationale: "This means 'you have made' (informal).", isCorrect: false },
          { text: "Il a fait", rationale: "This means 'he has made'.", isCorrect: false },
          { text: "Nous avons fait", rationale: "This means 'we have made'.", isCorrect: false }
        ]
      },
      {
        question: "You have made (informal)",
        hint: "Second person singular informal of faire in passé composé",
        answerOptions: [
          { text: "Tu as fait", rationale: "Correct! 'Tu as fait' is 'you have made' (informal) in French.", isCorrect: true },
          { text: "J'ai fait", rationale: "This means 'I have made'.", isCorrect: false },
          { text: "Vous avez fait", rationale: "This means 'you have made' (formal/plural).", isCorrect: false },
          { text: "Ils ont fait", rationale: "This means 'they have made'.", isCorrect: false }
        ]
      },
      {
        question: "He has made",
        hint: "Third person singular masculine of faire in passé composé",
        answerOptions: [
          { text: "Il a fait", rationale: "Correct! 'Il a fait' is 'he has made' in French.", isCorrect: true },
          { text: "Elle a fait", rationale: "This means 'she has made'.", isCorrect: false },
          { text: "Tu as fait", rationale: "This means 'you have made' (informal).", isCorrect: false },
          { text: "Ils ont fait", rationale: "This means 'they have made'.", isCorrect: false }
        ]
      },
      {
        question: "She has made",
        hint: "Third person singular feminine of faire in passé composé",
        answerOptions: [
          { text: "Elle a fait", rationale: "Correct! 'Elle a fait' is 'she has made' in French.", isCorrect: true },
          { text: "Il a fait", rationale: "This means 'he has made'.", isCorrect: false },
          { text: "Elles ont fait", rationale: "This means 'they have made' (feminine).", isCorrect: false },
          { text: "Tu as fait", rationale: "This means 'you have made' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We have made",
        hint: "First person plural of faire in passé composé",
        answerOptions: [
          { text: "Nous avons fait", rationale: "Correct! 'Nous avons fait' is 'we have made' in French.", isCorrect: true },
          { text: "Vous avez fait", rationale: "This means 'you have made' (formal/plural).", isCorrect: false },
          { text: "Ils ont fait", rationale: "This means 'they have made'.", isCorrect: false },
          { text: "J'ai fait", rationale: "This means 'I have made'.", isCorrect: false }
        ]
      },
      {
        question: "You have made (formal/plural)",
        hint: "Second person formal/plural of faire in passé composé",
        answerOptions: [
          { text: "Vous avez fait", rationale: "Correct! 'Vous avez fait' is 'you have made' (formal/plural) in French.", isCorrect: true },
          { text: "Tu as fait", rationale: "This means 'you have made' (informal).", isCorrect: false },
          { text: "Nous avons fait", rationale: "This means 'we have made'.", isCorrect: false },
          { text: "Ils ont fait", rationale: "This means 'they have made'.", isCorrect: false }
        ]
      },
      {
        question: "They have made (male/mixed)",
        hint: "Third person plural masculine/mixed of faire in passé composé",
        answerOptions: [
          { text: "Ils ont fait", rationale: "Correct! 'Ils ont fait' is 'they have made' (masculine/mixed) in French.", isCorrect: true },
          { text: "Elles ont fait", rationale: "This means 'they have made' (feminine).", isCorrect: false },
          { text: "Ils étaient faits", rationale: "This is incorrect - wrong tense/form.", isCorrect: false },
          { text: "Ils feront", rationale: "This means 'they will make' (future tense).", isCorrect: false }
        ]
      },
      {
        question: "They have made (female)",
        hint: "Third person plural feminine of faire in passé composé",
        answerOptions: [
          { text: "Elles ont fait", rationale: "Correct! 'Elles ont fait' is 'they have made' (feminine) in French.", isCorrect: true },
          { text: "Ils ont fait", rationale: "This means 'they have made' (masculine/mixed).", isCorrect: false },
          { text: "Elles étaient faites", rationale: "This is incorrect - wrong tense/form.", isCorrect: false },
          { text: "Elles feront", rationale: "This means 'they will make' (future tense).", isCorrect: false }
        ]
      },
      {
        question: "I have not made",
        hint: "First person singular negative of faire in passé composé",
        answerOptions: [
          { text: "Je n'ai pas fait", rationale: "Correct! 'Je n'ai pas fait' is 'I have not made' in French.", isCorrect: true },
          { text: "Tu n'as pas fait", rationale: "This means 'you have not made' (informal).", isCorrect: false },
          { text: "Il n'a pas fait", rationale: "This means 'he has not made'.", isCorrect: false },
          { text: "Nous n'avons pas fait", rationale: "This means 'we have not made'.", isCorrect: false }
        ]
      },
      {
        question: "You have not made (informal)",
        hint: "Second person singular informal negative of faire in passé composé",
        answerOptions: [
          { text: "Tu n'as pas fait", rationale: "Correct! 'Tu n'as pas fait' is 'you have not made' (informal) in French.", isCorrect: true },
          { text: "Je n'ai pas fait", rationale: "This means 'I have not made'.", isCorrect: false },
          { text: "Vous n'avez pas fait", rationale: "This means 'you have not made' (formal/plural).", isCorrect: false },
          { text: "Ils n'ont pas fait", rationale: "This means 'they have not made'.", isCorrect: false }
        ]
      },
      {
        question: "He has not made",
        hint: "Third person singular masculine negative of faire in passé composé",
        answerOptions: [
          { text: "Il n'a pas fait", rationale: "Correct! 'Il n'a pas fait' is 'he has not made' in French.", isCorrect: true },
          { text: "Elle n'a pas fait", rationale: "This means 'she has not made'.", isCorrect: false },
          { text: "Tu n'as pas fait", rationale: "This means 'you have not made' (informal).", isCorrect: false },
          { text: "Ils n'ont pas fait", rationale: "This means 'they have not made'.", isCorrect: false }
        ]
      },
      {
        question: "She has not made",
        hint: "Third person singular feminine negative of faire in passé composé",
        answerOptions: [
          { text: "Elle n'a pas fait", rationale: "Correct! 'Elle n'a pas fait' is 'she has not made' in French.", isCorrect: true },
          { text: "Il n'a pas fait", rationale: "This means 'he has not made'.", isCorrect: false },
          { text: "Elles n'ont pas fait", rationale: "This means 'they have not made' (feminine).", isCorrect: false },
          { text: "Tu n'as pas fait", rationale: "This means 'you have not made' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We have not made",
        hint: "First person plural negative of faire in passé composé",
        answerOptions: [
          { text: "Nous n'avons pas fait", rationale: "Correct! 'Nous n'avons pas fait' is 'we have not made' in French.", isCorrect: true },
          { text: "Vous n'avez pas fait", rationale: "This means 'you have not made' (formal/plural).", isCorrect: false },
          { text: "Ils n'ont pas fait", rationale: "This means 'they have not made'.", isCorrect: false },
          { text: "Je n'ai pas fait", rationale: "This means 'I have not made'.", isCorrect: false }
        ]
      },
      {
        question: "You have not made (formal/plural)",
        hint: "Second person formal/plural negative of faire in passé composé",
        answerOptions: [
          { text: "Vous n'avez pas fait", rationale: "Correct! 'Vous n'avez pas fait' is 'you have not made' (formal/plural) in French.", isCorrect: true },
          { text: "Tu n'as pas fait", rationale: "This means 'you have not made' (informal).", isCorrect: false },
          { text: "Nous n'avons pas fait", rationale: "This means 'we have not made'.", isCorrect: false },
          { text: "Ils n'ont pas fait", rationale: "This means 'they have not made'.", isCorrect: false }
        ]
      },
      {
        question: "They have not made (male/mixed)",
        hint: "Third person plural masculine/mixed negative of faire in passé composé",
        answerOptions: [
          { text: "Ils n'ont pas fait", rationale: "Correct! 'Ils n'ont pas fait' is 'they have not made' (masculine/mixed) in French.", isCorrect: true },
          { text: "Elles n'ont pas fait", rationale: "This means 'they have not made' (feminine).", isCorrect: false },
          { text: "Ils n'étaient pas faits", rationale: "This is incorrect - wrong tense/form.", isCorrect: false },
          { text: "Ils ne feront pas", rationale: "This means 'they will not make' (future tense).", isCorrect: false }
        ]
      },
      {
        question: "They have not made (female)",
        hint: "Third person plural feminine negative of faire in passé composé",
        answerOptions: [
          { text: "Elles n'ont pas fait", rationale: "Correct! 'Elles n'ont pas fait' is 'they have not made' (feminine) in French.", isCorrect: true },
          { text: "Ils n'ont pas fait", rationale: "This means 'they have not made' (masculine/mixed).", isCorrect: false },
          { text: "Elles n'étaient pas faites", rationale: "This is incorrect - wrong tense/form.", isCorrect: false },
          { text: "Elles ne feront pas", rationale: "This means 'they will not make' (future tense).", isCorrect: false }
        ]
      },
      {
        question: "Have I made?",
        hint: "First person singular interrogative of faire in passé composé",
        answerOptions: [
          { text: "Ai-je fait ?", rationale: "Correct! 'Ai-je fait ?' is 'Have I made?' in French.", isCorrect: true },
          { text: "As-tu fait ?", rationale: "This means 'Have you made?' (informal).", isCorrect: false },
          { text: "A-t-il fait ?", rationale: "This means 'Has he made?'", isCorrect: false },
          { text: "Avons-nous fait ?", rationale: "This means 'Have we made?'", isCorrect: false }
        ]
      },
      {
        question: "Have you made? (informal)",
        hint: "Second person singular informal interrogative of faire in passé composé",
        answerOptions: [
          { text: "As-tu fait ?", rationale: "Correct! 'As-tu fait ?' is 'Have you made?' (informal) in French.", isCorrect: true },
          { text: "Ai-je fait ?", rationale: "This means 'Have I made?'", isCorrect: false },
          { text: "A-t-il fait ?", rationale: "This means 'Has he made?'", isCorrect: false },
          { text: "Avez-vous fait ?", rationale: "This means 'Have you made?' (formal/plural).", isCorrect: false }
        ]
      },
      {
        question: "Has he made?",
        hint: "Third person singular masculine interrogative of faire in passé composé",
        answerOptions: [
          { text: "A-t-il fait ?", rationale: "Correct! 'A-t-il fait ?' is 'Has he made?' in French.", isCorrect: true },
          { text: "A-t-elle fait ?", rationale: "This means 'Has she made?'", isCorrect: false },
          { text: "Ai-je fait ?", rationale: "This means 'Have I made?'", isCorrect: false },
          { text: "As-tu fait ?", rationale: "This means 'Have you made?' (informal).", isCorrect: false }
        ]
      },
      {
        question: "Has she made?",
        hint: "Third person singular feminine interrogative of faire in passé composé",
        answerOptions: [
          { text: "A-t-elle fait ?", rationale: "Correct! 'A-t-elle fait ?' is 'Has she made?' in French.", isCorrect: true },
          { text: "A-t-il fait ?", rationale: "This means 'Has he made?'", isCorrect: false },
          { text: "As-tu fait ?", rationale: "This means 'Have you made?' (informal).", isCorrect: false },
          { text: "Avez-vous fait ?", rationale: "This means 'Have you made?' (formal/plural).", isCorrect: false }
        ]
      }
    ],
    "Futur Simple": [
      {
        question: "I will do",
        hint: "First person singular of faire in future tense",
        answerOptions: [
          { text: "Je ferai", rationale: "Correct! 'Je ferai' is 'I will do' in French.", isCorrect: true },
          { text: "Tu feras", rationale: "This means 'you will do' (informal).", isCorrect: false },
          { text: "Il fera", rationale: "This means 'he will do'.", isCorrect: false },
          { text: "Nous ferons", rationale: "This means 'we will do'.", isCorrect: false }
        ]
      },
      {
        question: "We will do",
        hint: "First person plural of faire in future tense",
        answerOptions: [
          { text: "Nous ferons", rationale: "Correct! 'Nous ferons' is 'we will do' in French.", isCorrect: true },
          { text: "Vous ferez", rationale: "This means 'you will do' (plural/formal).", isCorrect: false },
          { text: "Ils feront", rationale: "This means 'they will do'.", isCorrect: false },
          { text: "Je ferai", rationale: "This means 'I will do'.", isCorrect: false }
        ]
      }
    ],
    "Futur Simple": [
      {
        question: "I will do / I will make",
        hint: "First person singular of faire in future tense",
        answerOptions: [
          { text: "Je ferai", rationale: "Correct! 'Je ferai' is 'I will do/make' in French.", isCorrect: true },
          { text: "Tu feras", rationale: "This means 'you will do/make' (informal).", isCorrect: false },
          { text: "Il fera", rationale: "This means 'he will do/make'.", isCorrect: false },
          { text: "Nous ferons", rationale: "This means 'we will do/make'.", isCorrect: false }
        ]
      },
      {
        question: "You will do / You will make (informal)",
        hint: "Second person singular informal of faire in future",
        answerOptions: [
          { text: "Tu feras", rationale: "Correct! 'Tu feras' is 'you will do/make' (informal) in French.", isCorrect: true },
          { text: "Je ferai", rationale: "This means 'I will do/make'.", isCorrect: false },
          { text: "Vous ferez", rationale: "This means 'you will do/make' (formal/plural).", isCorrect: false },
          { text: "Ils feront", rationale: "This means 'they will do/make'.", isCorrect: false }
        ]
      },
      {
        question: "He will do / He will make",
        hint: "Third person singular masculine of faire in future",
        answerOptions: [
          { text: "Il fera", rationale: "Correct! 'Il fera' is 'he will do/make' in French.", isCorrect: true },
          { text: "Elle fera", rationale: "This means 'she will do/make'.", isCorrect: false },
          { text: "Tu feras", rationale: "This means 'you will do/make' (informal).", isCorrect: false },
          { text: "Ils feront", rationale: "This means 'they will do/make'.", isCorrect: false }
        ]
      },
      {
        question: "She will do / She will make",
        hint: "Third person singular feminine of faire in future",
        answerOptions: [
          { text: "Elle fera", rationale: "Correct! 'Elle fera' is 'she will do/make' in French.", isCorrect: true },
          { text: "Il fera", rationale: "This means 'he will do/make'.", isCorrect: false },
          { text: "Elles feront", rationale: "This means 'they will do/make' (feminine).", isCorrect: false },
          { text: "Tu feras", rationale: "This means 'you will do/make' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We will do / We will make",
        hint: "First person plural of faire in future",
        answerOptions: [
          { text: "Nous ferons", rationale: "Correct! 'Nous ferons' is 'we will do/make' in French.", isCorrect: true },
          { text: "Vous ferez", rationale: "This means 'you will do/make' (formal/plural).", isCorrect: false },
          { text: "Ils feront", rationale: "This means 'they will do/make'.", isCorrect: false },
          { text: "Je ferai", rationale: "This means 'I will do/make'.", isCorrect: false }
        ]
      },
      {
        question: "You will do / You will make (formal/plural)",
        hint: "Second person formal/plural of faire in future",
        answerOptions: [
          { text: "Vous ferez", rationale: "Correct! 'Vous ferez' is 'you will do/make' (formal/plural) in French.", isCorrect: true },
          { text: "Tu feras", rationale: "This means 'you will do/make' (informal).", isCorrect: false },
          { text: "Nous ferons", rationale: "This means 'we will do/make'.", isCorrect: false },
          { text: "Ils feront", rationale: "This means 'they will do/make'.", isCorrect: false }
        ]
      },
      {
        question: "They will do / They will make (male/mixed)",
        hint: "Third person plural masculine/mixed of faire in future",
        answerOptions: [
          { text: "Ils feront", rationale: "Correct! 'Ils feront' is 'they will do/make' (masculine/mixed) in French.", isCorrect: true },
          { text: "Elles feront", rationale: "This means 'they will do/make' (feminine).", isCorrect: false },
          { text: "Ils faisaient", rationale: "This means 'they were doing/making' (past tense).", isCorrect: false },
          { text: "Ils ont fait", rationale: "This means 'they have done/made' (past tense).", isCorrect: false }
        ]
      },
      {
        question: "They will do / They will make (female)",
        hint: "Third person plural feminine of faire in future",
        answerOptions: [
          { text: "Elles feront", rationale: "Correct! 'Elles feront' is 'they will do/make' (feminine) in French.", isCorrect: true },
          { text: "Ils feront", rationale: "This means 'they will do/make' (masculine/mixed).", isCorrect: false },
          { text: "Elles faisaient", rationale: "This means 'they were doing/making' (past tense).", isCorrect: false },
          { text: "Elles ont fait", rationale: "This means 'they have done/made' (past tense).", isCorrect: false }
        ]
      },
      {
        question: "I will not do / I will not make",
        hint: "First person singular negative of faire in future",
        answerOptions: [
          { text: "Je ne ferai pas", rationale: "Correct! 'Je ne ferai pas' is 'I will not do/make' in French.", isCorrect: true },
          { text: "Tu ne feras pas", rationale: "This means 'you will not do/make' (informal).", isCorrect: false },
          { text: "Il ne fera pas", rationale: "This means 'he will not do/make'.", isCorrect: false },
          { text: "Nous ne ferons pas", rationale: "This means 'we will not do/make'.", isCorrect: false }
        ]
      },
      {
        question: "You will not do / You will not make (informal)",
        hint: "Second person singular negative of faire in future",
        answerOptions: [
          { text: "Tu ne feras pas", rationale: "Correct! 'Tu ne feras pas' is 'you will not do/make' (informal) in French.", isCorrect: true },
          { text: "Je ne ferai pas", rationale: "This means 'I will not do/make'.", isCorrect: false },
          { text: "Vous ne ferez pas", rationale: "This means 'you will not do/make' (formal/plural).", isCorrect: false },
          { text: "Ils ne feront pas", rationale: "This means 'they will not do/make'.", isCorrect: false }
        ]
      },
      {
        question: "He will not do / He will not make",
        hint: "Third person singular masculine negative of faire in future",
        answerOptions: [
          { text: "Il ne fera pas", rationale: "Correct! 'Il ne fera pas' is 'he will not do/make' in French.", isCorrect: true },
          { text: "Elle ne fera pas", rationale: "This means 'she will not do/make'.", isCorrect: false },
          { text: "Tu ne feras pas", rationale: "This means 'you will not do/make' (informal).", isCorrect: false },
          { text: "Ils ne feront pas", rationale: "This means 'they will not do/make'.", isCorrect: false }
        ]
      },
      {
        question: "She will not do / She will not make",
        hint: "Third person singular feminine negative of faire in future",
        answerOptions: [
          { text: "Elle ne fera pas", rationale: "Correct! 'Elle ne fera pas' is 'she will not do/make' in French.", isCorrect: true },
          { text: "Il ne fera pas", rationale: "This means 'he will not do/make'.", isCorrect: false },
          { text: "Elles ne feront pas", rationale: "This means 'they will not do/make' (feminine).", isCorrect: false },
          { text: "Tu ne feras pas", rationale: "This means 'you will not do/make' (informal).", isCorrect: false }
        ]
      },
      {
        question: "We will not do / We will not make",
        hint: "First person plural negative of faire in future",
        answerOptions: [
          { text: "Nous ne ferons pas", rationale: "Correct! 'Nous ne ferons pas' is 'we will not do/make' in French.", isCorrect: true },
          { text: "Vous ne ferez pas", rationale: "This means 'you will not do/make' (formal/plural).", isCorrect: false },
          { text: "Ils ne feront pas", rationale: "This means 'they will not do/make'.", isCorrect: false },
          { text: "Je ne ferai pas", rationale: "This means 'I will not do/make'.", isCorrect: false }
        ]
      },
      {
        question: "You will not do / You will not make (formal/plural)",
        hint: "Second person formal/plural negative of faire in future",
        answerOptions: [
          { text: "Vous ne ferez pas", rationale: "Correct! 'Vous ne ferez pas' is 'you will not do/make' (formal/plural) in French.", isCorrect: true },
          { text: "Tu ne feras pas", rationale: "This means 'you will not do/make' (informal).", isCorrect: false },
          { text: "Nous ne ferons pas", rationale: "This means 'we will not do/make'.", isCorrect: false },
          { text: "Ils ne feront pas", rationale: "This means 'they will not do/make'.", isCorrect: false }
        ]
      },
      {
        question: "They will not do / They will not make (male/mixed)",
        hint: "Third person plural masculine/mixed negative of faire in future",
        answerOptions: [
          { text: "Ils ne feront pas", rationale: "Correct! 'Ils ne feront pas' is 'they will not do/make' (masculine/mixed) in French.", isCorrect: true },
          { text: "Elles ne feront pas", rationale: "This means 'they will not do/make' (feminine).", isCorrect: false },
          { text: "Ils n'ont pas fait", rationale: "This means 'they have not done/made' (past tense).", isCorrect: false },
          { text: "Ils ne faisaient pas", rationale: "This means 'they were not doing/making' (past tense).", isCorrect: false }
        ]
      },
      {
        question: "They will not do / They will not make (female)",
        hint: "Third person plural feminine negative of faire in future",
        answerOptions: [
          { text: "Elles ne feront pas", rationale: "Correct! 'Elles ne feront pas' is 'they will not do/make' (feminine) in French.", isCorrect: true },
          { text: "Ils ne feront pas", rationale: "This means 'they will not do/make' (masculine/mixed).", isCorrect: false },
          { text: "Elles n'ont pas fait", rationale: "This means 'they have not done/made' (past tense).", isCorrect: false },
          { text: "Elles ne faisaient pas", rationale: "This means 'they were not doing/making' (past tense).", isCorrect: false }
        ]
      },
      {
        question: "Will I do / Will I make?",
        hint: "First person singular interrogative of faire in future",
        answerOptions: [
          { text: "Ferai-je ?", rationale: "Correct! 'Ferai-je ?' is 'Will I do/make?' in French.", isCorrect: true },
          { text: "Feras-tu ?", rationale: "This means 'Will you do/make?' (informal).", isCorrect: false },
          { text: "Fera-t-il ?", rationale: "This means 'Will he do/make?'.", isCorrect: false },
          { text: "Ferons-nous ?", rationale: "This means 'Will we do/make?'.", isCorrect: false }
        ]
      },
      {
        question: "Will you do / Will you make? (informal)",
        hint: "Second person singular interrogative of faire in future",
        answerOptions: [
          { text: "Feras-tu ?", rationale: "Correct! 'Feras-tu ?' is 'Will you do/make?' (informal) in French.", isCorrect: true },
          { text: "Ferai-je ?", rationale: "This means 'Will I do/make?'.", isCorrect: false },
          { text: "Fera-t-il ?", rationale: "This means 'Will he do/make?'.", isCorrect: false },
          { text: "Ferez-vous ?", rationale: "This means 'Will you do/make?' (formal/plural).", isCorrect: false }
        ]
      },
      {
        question: "Will he do / Will he make?",
        hint: "Third person singular masculine interrogative of faire in future",
        answerOptions: [
          { text: "Fera-t-il ?", rationale: "Correct! 'Fera-t-il ?' is 'Will he do/make?' in French.", isCorrect: true },
          { text: "Fera-t-elle ?", rationale: "This means 'Will she do/make?'.", isCorrect: false },
          { text: "Ferai-je ?", rationale: "This means 'Will I do/make?'.", isCorrect: false },
          { text: "Feras-tu ?", rationale: "This means 'Will you do/make?' (informal).", isCorrect: false }
        ]
      },
      {
        question: "Will she do / Will she make?",
        hint: "Third person singular feminine interrogative of faire in future",
        answerOptions: [
          { text: "Fera-t-elle ?", rationale: "Correct! 'Fera-t-elle ?' is 'Will she do/make?' in French.", isCorrect: true },
          { text: "Fera-t-il ?", rationale: "This means 'Will he do/make?'.", isCorrect: false },
          { text: "Feras-tu ?", rationale: "This means 'Will you do/make?' (informal).", isCorrect: false },
          { text: "Ferez-vous ?", rationale: "This means 'Will you do/make?' (formal/plural).", isCorrect: false }
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