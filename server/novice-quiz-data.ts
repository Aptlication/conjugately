// Novice Level Subject-Verb Conjugation Quiz Data
// Corrected and validated content from user
// Verbs: être, avoir, faire, aller
// Tenses: Présent, Passé Composé, Futur Simple
// 20 questions per verb per tense = 240 total questions

export interface NoviceQuizQuestion {
  question: string;
  options: string[];
  answer: string; // A, B, C, or D
}

export const NOVICE_QUIZ_DATA: Record<string, Record<string, NoviceQuizQuestion[]>> = {
  "être": {
    "present": [
      {"question": "I am (Présent)", "options": ["Je suis", "Tu es", "Il est", "Nous sommes"], "answer": "A"},
      {"question": "You are (informal)", "options": ["Tu es", "Je suis", "Il est", "Ils sont"], "answer": "A"},
      {"question": "He is (Présent)", "options": ["Il est", "Elle est", "Tu es", "Ils sont"], "answer": "A"},
      {"question": "She is (Présent)", "options": ["Elle est", "Il est", "Elles sont", "Tu es"], "answer": "A"},
      {"question": "We are (Présent)", "options": ["Nous sommes", "Vous êtes", "Ils sont", "Je suis"], "answer": "A"},
      {"question": "You are (formal/plural)", "options": ["Vous êtes", "Tu es", "Nous sommes", "Ils sont"], "answer": "A"},
      {"question": "They are (male/mixed)", "options": ["Ils sont", "Elles sont", "Ils étaient", "Ils seront"], "answer": "A"},
      {"question": "They are (female)", "options": ["Elles sont", "Ils sont", "Elles étaient", "Elles seront"], "answer": "A"},
      {"question": "Am I?", "options": ["Suis-je ?", "Es-tu ?", "Est-il ?", "Sommes-nous ?"], "answer": "A"},
      {"question": "Are you? (informal)", "options": ["Es-tu ?", "Suis-je ?", "Est-il ?", "Êtes-vous ?"], "answer": "A"},
      {"question": "Is he?", "options": ["Est-il ?", "Est-elle ?", "Suis-je ?", "Es-tu ?"], "answer": "A"},
      {"question": "Is she?", "options": ["Est-elle ?", "Est-il ?", "Es-tu ?", "Êtes-vous ?"], "answer": "A"},
      {"question": "Are we?", "options": ["Sommes-nous ?", "Suis-je ?", "Êtes-vous ?", "Sont-ils ?"], "answer": "A"},
      {"question": "Are you? (formal/plural)", "options": ["Êtes-vous ?", "Es-tu ?", "Sommes-nous ?", "Sont-ils ?"], "answer": "A"},
      {"question": "Are they? (male/mixed)", "options": ["Sont-ils ?", "Sont-elles ?", "Êtes-vous ?", "Es-tu ?"], "answer": "A"},
      {"question": "Are they? (female)", "options": ["Sont-elles ?", "Sont-ils ?", "Êtes-vous ?", "Es-tu ?"], "answer": "A"},
      {"question": "I am not", "options": ["Je ne suis pas", "Tu n'es pas", "Il n'est pas", "Nous ne sommes pas"], "answer": "A"},
      {"question": "He is not", "options": ["Il n'est pas", "Je ne suis pas", "Tu n'es pas", "Ils ne sont pas"], "answer": "A"},
      {"question": "Aren't we?", "options": ["Ne sommes-nous pas ?", "N'êtes-vous pas ?", "Ne sont-ils pas ?", "Ne suis-je pas ?"], "answer": "A"},
      {"question": "Aren't they? (female)", "options": ["Ne sont-elles pas ?", "Ne sont-ils pas ?", "N'êtes-vous pas ?", "Ne sommes-nous pas ?"], "answer": "A"}
    ],
    "passé_composé": [
      {"question": "I have been", "options": ["J'ai été", "Tu as été", "Il a été", "Nous avons été"], "answer": "A"},
      {"question": "You have been (informal)", "options": ["Tu as été", "J'ai été", "Il a été", "Vous avez été"], "answer": "A"},
      {"question": "He has been", "options": ["Il a été", "Elle a été", "Tu as été", "Ils ont été"], "answer": "A"},
      {"question": "She has been", "options": ["Elle a été", "Il a été", "Elles ont été", "Tu as été"], "answer": "A"},
      {"question": "We have been", "options": ["Nous avons été", "Vous avez été", "Ils ont été", "J'ai été"], "answer": "A"},
      {"question": "You have been (formal/plural)", "options": ["Vous avez été", "Tu as été", "Nous avons été", "Ils ont été"], "answer": "A"},
      {"question": "They have been (male/mixed)", "options": ["Ils ont été", "Elles ont été", "Ils avaient été", "Ils auront été"], "answer": "A"},
      {"question": "They have been (female)", "options": ["Elles ont été", "Ils ont été", "Elles avaient été", "Elles auront été"], "answer": "A"},
      {"question": "Have I been?", "options": ["Ai-je été ?", "As-tu été ?", "A-t-il été ?", "Avons-nous été ?"], "answer": "A"},
      {"question": "Have you been? (informal)", "options": ["As-tu été ?", "Ai-je été ?", "A-t-il été ?", "Avez-vous été ?"], "answer": "A"},
      {"question": "Has he been?", "options": ["A-t-il été ?", "A-t-elle été ?", "Ai-je été ?", "As-tu été ?"], "answer": "A"},
      {"question": "Has she been?", "options": ["A-t-elle été ?", "A-t-il été ?", "As-tu été ?", "Avez-vous été ?"], "answer": "A"},
      {"question": "Have we been?", "options": ["Avons-nous été ?", "Ai-je été ?", "Avez-vous été ?", "Ont-ils été ?"], "answer": "A"},
      {"question": "Have you been? (formal/plural)", "options": ["Avez-vous été ?", "As-tu été ?", "Avons-nous été ?", "Ont-ils été ?"], "answer": "A"},
      {"question": "Have they been? (male/mixed)", "options": ["Ont-ils été ?", "Ont-elles été ?", "Avez-vous été ?", "As-tu été ?"], "answer": "A"},
      {"question": "Have they been? (female)", "options": ["Ont-elles été ?", "Ont-ils été ?", "Avez-vous été ?", "As-tu été ?"], "answer": "A"},
      {"question": "I have not been", "options": ["Je n'ai pas été", "Tu n'as pas été", "Il n'a pas été", "Nous n'avons pas été"], "answer": "A"},
      {"question": "He has not been", "options": ["Il n'a pas été", "Je n'ai pas été", "Tu n'as pas été", "Ils n'ont pas été"], "answer": "A"},
      {"question": "Haven't we been?", "options": ["N'avons-nous pas été ?", "N'avez-vous pas été ?", "N'ont-ils pas été ?", "N'ai-je pas été ?"], "answer": "A"},
      {"question": "Haven't they been? (female)", "options": ["N'ont-elles pas été ?", "N'ont-ils pas été ?", "N'avez-vous pas été ?", "N'avons-nous pas été ?"], "answer": "A"}
    ],
    "futur_simple": [
      {"question": "I will be", "options": ["Je serai", "Tu seras", "Il sera", "Nous serons"], "answer": "A"},
      {"question": "You will be (informal)", "options": ["Tu seras", "Je serai", "Il sera", "Vous serez"], "answer": "A"},
      {"question": "He will be", "options": ["Il sera", "Elle sera", "Tu seras", "Ils seront"], "answer": "A"},
      {"question": "She will be", "options": ["Elle sera", "Il sera", "Elles seront", "Tu seras"], "answer": "A"},
      {"question": "We will be", "options": ["Nous serons", "Vous serez", "Ils seront", "Je serai"], "answer": "A"},
      {"question": "You will be (formal/plural)", "options": ["Vous serez", "Tu seras", "Nous serons", "Ils seront"], "answer": "A"},
      {"question": "They will be (male/mixed)", "options": ["Ils seront", "Elles seront", "Ils étaient", "Ils ont été"], "answer": "A"},
      {"question": "They will be (female)", "options": ["Elles seront", "Ils seront", "Elles étaient", "Elles ont été"], "answer": "A"},
      {"question": "Will I be?", "options": ["Serai-je ?", "Seras-tu ?", "Sera-t-il ?", "Serons-nous ?"], "answer": "A"},
      {"question": "Will you be? (informal)", "options": ["Seras-tu ?", "Serai-je ?", "Sera-t-il ?", "Serez-vous ?"], "answer": "A"},
      {"question": "Will he be?", "options": ["Sera-t-il ?", "Sera-t-elle ?", "Serai-je ?", "Seras-tu ?"], "answer": "A"},
      {"question": "Will she be?", "options": ["Sera-t-elle ?", "Sera-t-il ?", "Seras-tu ?", "Serez-vous ?"], "answer": "A"},
      {"question": "Will we be?", "options": ["Serons-nous ?", "Serai-je ?", "Serez-vous ?", "Seront-ils ?"], "answer": "A"},
      {"question": "Will you be? (formal/plural)", "options": ["Serez-vous ?", "Seras-tu ?", "Serons-nous ?", "Seront-ils ?"], "answer": "A"},
      {"question": "Will they be? (male/mixed)", "options": ["Seront-ils ?", "Seront-elles ?", "Serez-vous ?", "Seras-tu ?"], "answer": "A"},
      {"question": "Will they be? (female)", "options": ["Seront-elles ?", "Seront-ils ?", "Serez-vous ?", "Seras-tu ?"], "answer": "A"},
      {"question": "I will not be", "options": ["Je ne serai pas", "Tu ne seras pas", "Il ne sera pas", "Nous ne serons pas"], "answer": "A"},
      {"question": "He will not be", "options": ["Il ne sera pas", "Je ne serai pas", "Tu ne seras pas", "Ils ne seront pas"], "answer": "A"},
      {"question": "Won't we be?", "options": ["Ne serons-nous pas ?", "Ne serez-vous pas ?", "Ne seront-ils pas ?", "Ne serai-je pas ?"], "answer": "A"},
      {"question": "Won't they be? (female)", "options": ["Ne seront-elles pas ?", "Ne seront-ils pas ?", "Ne serez-vous pas ?", "Ne serons-nous pas ?"], "answer": "A"}
    ]
  },
  
  "avoir": {
    "present": [
      {"question": "I have", "options": ["J'ai", "Tu as", "Il a", "Nous avons"], "answer": "A"},
      {"question": "You have (informal)", "options": ["Tu as", "J'ai", "Il a", "Ils ont"], "answer": "A"},
      {"question": "He has", "options": ["Il a", "Elle a", "Tu as", "Ils ont"], "answer": "A"},
      {"question": "She has", "options": ["Elle a", "Il a", "Elles ont", "Tu as"], "answer": "A"},
      {"question": "We have", "options": ["Nous avons", "Vous avez", "Ils ont", "J'ai"], "answer": "A"},
      {"question": "You have (formal/plural)", "options": ["Vous avez", "Tu as", "Nous avons", "Ils ont"], "answer": "A"},
      {"question": "They have (male/mixed)", "options": ["Ils ont", "Elles ont", "Ils avaient", "Ils auront"], "answer": "A"},
      {"question": "They have (female)", "options": ["Elles ont", "Ils ont", "Elles avaient", "Elles auront"], "answer": "A"},
      {"question": "Do I have?", "options": ["Ai-je ?", "As-tu ?", "A-t-il ?", "Avons-nous ?"], "answer": "A"},
      {"question": "Do you have? (informal)", "options": ["As-tu ?", "Ai-je ?", "A-t-il ?", "Avez-vous ?"], "answer": "A"},
      {"question": "Does he have?", "options": ["A-t-il ?", "A-t-elle ?", "Ai-je ?", "As-tu ?"], "answer": "A"},
      {"question": "Does she have?", "options": ["A-t-elle ?", "A-t-il ?", "As-tu ?", "Avez-vous ?"], "answer": "A"},
      {"question": "Do we have?", "options": ["Avons-nous ?", "Ai-je ?", "Avez-vous ?", "Ont-ils ?"], "answer": "A"},
      {"question": "Do you have? (formal/plural)", "options": ["Avez-vous ?", "As-tu ?", "Avons-nous ?", "Ont-ils ?"], "answer": "A"},
      {"question": "Do they have? (male/mixed)", "options": ["Ont-ils ?", "Ont-elles ?", "Avez-vous ?", "As-tu ?"], "answer": "A"},
      {"question": "Do they have? (female)", "options": ["Ont-elles ?", "Ont-ils ?", "Avez-vous ?", "As-tu ?"], "answer": "A"},
      {"question": "I don't have", "options": ["Je n'ai pas", "Tu n'as pas", "Il n'a pas", "Nous n'avons pas"], "answer": "A"},
      {"question": "He doesn't have", "options": ["Il n'a pas", "Je n'ai pas", "Tu n'as pas", "Ils n'ont pas"], "answer": "A"},
      {"question": "Don't we have?", "options": ["N'avons-nous pas ?", "N'avez-vous pas ?", "N'ont-ils pas ?", "N'ai-je pas ?"], "answer": "A"},
      {"question": "Don't they have? (female)", "options": ["N'ont-elles pas ?", "N'ont-ils pas ?", "N'avez-vous pas ?", "N'avons-nous pas ?"], "answer": "A"}
    ],
    "passé_composé": [
      {"question": "I had", "options": ["J'ai eu", "Tu as eu", "Il a eu", "Nous avons eu"], "answer": "A"},
      {"question": "You had (informal)", "options": ["Tu as eu", "J'ai eu", "Il a eu", "Vous avez eu"], "answer": "A"},
      {"question": "He had", "options": ["Il a eu", "Elle a eu", "Tu as eu", "Ils ont eu"], "answer": "A"},
      {"question": "She had", "options": ["Elle a eu", "Il a eu", "Elles ont eu", "Tu as eu"], "answer": "A"},
      {"question": "We had", "options": ["Nous avons eu", "Vous avez eu", "Ils ont eu", "J'ai eu"], "answer": "A"},
      {"question": "You had (formal/plural)", "options": ["Vous avez eu", "Tu as eu", "Nous avons eu", "Ils ont eu"], "answer": "A"},
      {"question": "They had (male/mixed)", "options": ["Ils ont eu", "Elles ont eu", "Ils avaient eu", "Ils auront eu"], "answer": "A"},
      {"question": "They had (female)", "options": ["Elles ont eu", "Ils ont eu", "Elles avaient eu", "Elles auront eu"], "answer": "A"},
      {"question": "Did I have?", "options": ["Ai-je eu ?", "As-tu eu ?", "A-t-il eu ?", "Avons-nous eu ?"], "answer": "A"},
      {"question": "Did you have? (informal)", "options": ["As-tu eu ?", "Ai-je eu ?", "A-t-il eu ?", "Avez-vous eu ?"], "answer": "A"},
      {"question": "Did he have?", "options": ["A-t-il eu ?", "A-t-elle eu ?", "Ai-je eu ?", "As-tu eu ?"], "answer": "A"},
      {"question": "Did she have?", "options": ["A-t-elle eu ?", "A-t-il eu ?", "As-tu eu ?", "Avez-vous eu ?"], "answer": "A"},
      {"question": "Did we have?", "options": ["Avons-nous eu ?", "Ai-je eu ?", "Avez-vous eu ?", "Ont-ils eu ?"], "answer": "A"},
      {"question": "Did you have? (formal/plural)", "options": ["Avez-vous eu ?", "As-tu eu ?", "Avons-nous eu ?", "Ont-ils eu ?"], "answer": "A"},
      {"question": "Did they have? (male/mixed)", "options": ["Ont-ils eu ?", "Ont-elles eu ?", "Avez-vous eu ?", "As-tu eu ?"], "answer": "A"},
      {"question": "Did they have? (female)", "options": ["Ont-elles eu ?", "Ont-ils eu ?", "Avez-vous eu ?", "As-tu eu ?"], "answer": "A"},
      {"question": "I didn't have", "options": ["Je n'ai pas eu", "Tu n'as pas eu", "Il n'a pas eu", "Nous n'avons pas eu"], "answer": "A"},
      {"question": "He didn't have", "options": ["Il n'a pas eu", "Je n'ai pas eu", "Tu n'as pas eu", "Ils n'ont pas eu"], "answer": "A"},
      {"question": "Didn't we have?", "options": ["N'avons-nous pas eu ?", "N'avez-vous pas eu ?", "N'ont-ils pas eu ?", "N'ai-je pas eu ?"], "answer": "A"},
      {"question": "Didn't they have? (female)", "options": ["N'ont-elles pas eu ?", "N'ont-ils pas eu ?", "N'avez-vous pas eu ?", "N'avons-nous pas eu ?"], "answer": "A"}
    ],
    "futur_simple": [
      {"question": "I will have", "options": ["J'aurai", "Tu auras", "Il aura", "Nous aurons"], "answer": "A"},
      {"question": "You will have (informal)", "options": ["Tu auras", "J'aurai", "Il aura", "Vous aurez"], "answer": "A"},
      {"question": "He will have", "options": ["Il aura", "Elle aura", "Tu auras", "Ils auront"], "answer": "A"},
      {"question": "She will have", "options": ["Elle aura", "Il aura", "Elles auront", "Tu auras"], "answer": "A"},
      {"question": "We will have", "options": ["Nous aurons", "Vous aurez", "Ils auront", "J'aurai"], "answer": "A"},
      {"question": "You will have (formal/plural)", "options": ["Vous aurez", "Tu auras", "Nous aurons", "Ils auront"], "answer": "A"},
      {"question": "They will have (male/mixed)", "options": ["Ils auront", "Elles auront", "Ils avaient", "Ils ont eu"], "answer": "A"},
      {"question": "They will have (female)", "options": ["Elles auront", "Ils auront", "Elles avaient", "Elles ont eu"], "answer": "A"},
      {"question": "Will I have?", "options": ["Aurai-je ?", "Auras-tu ?", "Aura-t-il ?", "Aurons-nous ?"], "answer": "A"},
      {"question": "Will you have? (informal)", "options": ["Auras-tu ?", "Aurai-je ?", "Aura-t-il ?", "Aurez-vous ?"], "answer": "A"},
      {"question": "Will he have?", "options": ["Aura-t-il ?", "Aura-t-elle ?", "Aurai-je ?", "Auras-tu ?"], "answer": "A"},
      {"question": "Will she have?", "options": ["Aura-t-elle ?", "Aura-t-il ?", "Auras-tu ?", "Aurez-vous ?"], "answer": "A"},
      {"question": "Will we have?", "options": ["Aurons-nous ?", "Aurai-je ?", "Aurez-vous ?", "Auront-ils ?"], "answer": "A"},
      {"question": "Will you have? (formal/plural)", "options": ["Aurez-vous ?", "Auras-tu ?", "Aurons-nous ?", "Auront-ils ?"], "answer": "A"},
      {"question": "Will they have? (male/mixed)", "options": ["Auront-ils ?", "Auront-elles ?", "Aurez-vous ?", "Auras-tu ?"], "answer": "A"},
      {"question": "Will they have? (female)", "options": ["Auront-elles ?", "Auront-ils ?", "Aurez-vous ?", "Auras-tu ?"], "answer": "A"},
      {"question": "I will not have", "options": ["Je n'aurai pas", "Tu n'auras pas", "Il n'aura pas", "Nous n'aurons pas"], "answer": "A"},
      {"question": "He will not have", "options": ["Il n'aura pas", "Je n'aurai pas", "Tu n'auras pas", "Ils n'auront pas"], "answer": "A"},
      {"question": "Won't we have?", "options": ["N'aurons-nous pas ?", "N'aurez-vous pas ?", "N'auront-ils pas ?", "N'aurai-je pas ?"], "answer": "A"},
      {"question": "Won't they have? (female)", "options": ["N'auront-elles pas ?", "N'auront-ils pas ?", "N'aurez-vous pas ?", "N'aurons-nous pas ?"], "answer": "A"}
    ]
  },

  "faire": {
    "present": [
      {"question": "I do/make", "options": ["Je fais", "Tu fais", "Il fait", "Nous faisons"], "answer": "A"},
      {"question": "You do/make (informal)", "options": ["Tu fais", "Je fais", "Il fait", "Ils font"], "answer": "A"},
      {"question": "He does/makes", "options": ["Il fait", "Elle fait", "Tu fais", "Ils font"], "answer": "A"},
      {"question": "She does/makes", "options": ["Elle fait", "Il fait", "Elles font", "Tu fais"], "answer": "A"},
      {"question": "We do/make", "options": ["Nous faisons", "Vous faites", "Ils font", "Je fais"], "answer": "A"},
      {"question": "You do/make (formal/plural)", "options": ["Vous faites", "Tu fais", "Nous faisons", "Ils font"], "answer": "A"},
      {"question": "They do/make (male/mixed)", "options": ["Ils font", "Elles font", "Ils faisaient", "Ils feront"], "answer": "A"},
      {"question": "They do/make (female)", "options": ["Elles font", "Ils font", "Elles faisaient", "Elles feront"], "answer": "A"},
      {"question": "Do I do/make?", "options": ["Fais-je ?", "Fais-tu ?", "Fait-il ?", "Faisons-nous ?"], "answer": "A"},
      {"question": "Do you do/make? (informal)", "options": ["Fais-tu ?", "Fais-je ?", "Fait-il ?", "Faites-vous ?"], "answer": "A"},
      {"question": "Does he do/make?", "options": ["Fait-il ?", "Fait-elle ?", "Fais-je ?", "Fais-tu ?"], "answer": "A"},
      {"question": "Does she do/make?", "options": ["Fait-elle ?", "Fait-il ?", "Fais-tu ?", "Faites-vous ?"], "answer": "A"},
      {"question": "Do we do/make?", "options": ["Faisons-nous ?", "Fais-je ?", "Faites-vous ?", "Font-ils ?"], "answer": "A"},
      {"question": "Do you do/make? (formal/plural)", "options": ["Faites-vous ?", "Fais-tu ?", "Faisons-nous ?", "Font-ils ?"], "answer": "A"},
      {"question": "Do they do/make? (male/mixed)", "options": ["Font-ils ?", "Font-elles ?", "Faites-vous ?", "Fais-tu ?"], "answer": "A"},
      {"question": "Do they do/make? (female)", "options": ["Font-elles ?", "Font-ils ?", "Faites-vous ?", "Fais-tu ?"], "answer": "A"},
      {"question": "I don't do/make", "options": ["Je ne fais pas", "Tu ne fais pas", "Il ne fait pas", "Nous ne faisons pas"], "answer": "A"},
      {"question": "He doesn't do/make", "options": ["Il ne fait pas", "Je ne fais pas", "Tu ne fais pas", "Ils ne font pas"], "answer": "A"},
      {"question": "Don't we do/make?", "options": ["Ne faisons-nous pas ?", "Ne faites-vous pas ?", "Ne font-ils pas ?", "Ne fais-je pas ?"], "answer": "A"},
      {"question": "Don't they do/make? (female)", "options": ["Ne font-elles pas ?", "Ne font-ils pas ?", "Ne faites-vous pas ?", "Ne faisons-nous pas ?"], "answer": "A"}
    ],
    "passé_composé": [
      {"question": "I did/made", "options": ["J'ai fait", "Tu as fait", "Il a fait", "Nous avons fait"], "answer": "A"},
      {"question": "You did/made (informal)", "options": ["Tu as fait", "J'ai fait", "Il a fait", "Vous avez fait"], "answer": "A"},
      {"question": "He did/made", "options": ["Il a fait", "Elle a fait", "Tu as fait", "Ils ont fait"], "answer": "A"},
      {"question": "She did/made", "options": ["Elle a fait", "Il a fait", "Elles ont fait", "Tu as fait"], "answer": "A"},
      {"question": "We did/made", "options": ["Nous avons fait", "Vous avez fait", "Ils ont fait", "J'ai fait"], "answer": "A"},
      {"question": "You did/made (formal/plural)", "options": ["Vous avez fait", "Tu as fait", "Nous avons fait", "Ils ont fait"], "answer": "A"},
      {"question": "They did/made (male/mixed)", "options": ["Ils ont fait", "Elles ont fait", "Ils avaient fait", "Ils auront fait"], "answer": "A"},
      {"question": "They did/made (female)", "options": ["Elles ont fait", "Ils ont fait", "Elles avaient fait", "Elles auront fait"], "answer": "A"},
      {"question": "Did I do/make?", "options": ["Ai-je fait ?", "As-tu fait ?", "A-t-il fait ?", "Avons-nous fait ?"], "answer": "A"},
      {"question": "Did you do/make? (informal)", "options": ["As-tu fait ?", "Ai-je fait ?", "A-t-il fait ?", "Avez-vous fait ?"], "answer": "A"},
      {"question": "Did he do/make?", "options": ["A-t-il fait ?", "A-t-elle fait ?", "Ai-je fait ?", "As-tu fait ?"], "answer": "A"},
      {"question": "Did she do/make?", "options": ["A-t-elle fait ?", "A-t-il fait ?", "As-tu fait ?", "Avez-vous fait ?"], "answer": "A"},
      {"question": "Did we do/make?", "options": ["Avons-nous fait ?", "Ai-je fait ?", "Avez-vous fait ?", "Ont-ils fait ?"], "answer": "A"},
      {"question": "Did you do/make? (formal/plural)", "options": ["Avez-vous fait ?", "As-tu fait ?", "Avons-nous fait ?", "Ont-ils fait ?"], "answer": "A"},
      {"question": "Did they do/make? (male/mixed)", "options": ["Ont-ils fait ?", "Ont-elles fait ?", "Avez-vous fait ?", "As-tu fait ?"], "answer": "A"},
      {"question": "Did they do/make? (female)", "options": ["Ont-elles fait ?", "Ont-ils fait ?", "Avez-vous fait ?", "As-tu fait ?"], "answer": "A"},
      {"question": "I didn't do/make", "options": ["Je n'ai pas fait", "Tu n'as pas fait", "Il n'a pas fait", "Nous n'avons pas fait"], "answer": "A"},
      {"question": "He didn't do/make", "options": ["Il n'a pas fait", "Je n'ai pas fait", "Tu n'as pas fait", "Ils n'ont pas fait"], "answer": "A"},
      {"question": "Didn't we do/make?", "options": ["N'avons-nous pas fait ?", "N'avez-vous pas fait ?", "N'ont-ils pas fait ?", "N'ai-je pas fait ?"], "answer": "A"},
      {"question": "Didn't they do/make? (female)", "options": ["N'ont-elles pas fait ?", "N'ont-ils pas fait ?", "N'avez-vous pas fait ?", "N'avons-nous pas fait ?"], "answer": "A"}
    ],
    "futur_simple": [
      {"question": "I will do/make", "options": ["Je ferai", "Tu feras", "Il fera", "Nous ferons"], "answer": "A"},
      {"question": "You will do/make (informal)", "options": ["Tu feras", "Je ferai", "Il fera", "Vous ferez"], "answer": "A"},
      {"question": "He will do/make", "options": ["Il fera", "Elle fera", "Tu feras", "Ils feront"], "answer": "A"},
      {"question": "She will do/make", "options": ["Elle fera", "Il fera", "Elles feront", "Tu feras"], "answer": "A"},
      {"question": "We will do/make", "options": ["Nous ferons", "Vous ferez", "Ils feront", "Je ferai"], "answer": "A"},
      {"question": "You will do/make (formal/plural)", "options": ["Vous ferez", "Tu feras", "Nous ferons", "Ils feront"], "answer": "A"},
      {"question": "They will do/make (male/mixed)", "options": ["Ils feront", "Elles feront", "Ils faisaient", "Ils ont fait"], "answer": "A"},
      {"question": "They will do/make (female)", "options": ["Elles feront", "Ils feront", "Elles faisaient", "Elles ont fait"], "answer": "A"},
      {"question": "Will I do/make?", "options": ["Ferai-je ?", "Feras-tu ?", "Fera-t-il ?", "Ferons-nous ?"], "answer": "A"},
      {"question": "Will you do/make? (informal)", "options": ["Feras-tu ?", "Ferai-je ?", "Fera-t-il ?", "Ferez-vous ?"], "answer": "A"},
      {"question": "Will he do/make?", "options": ["Fera-t-il ?", "Fera-t-elle ?", "Ferai-je ?", "Feras-tu ?"], "answer": "A"},
      {"question": "Will she do/make?", "options": ["Fera-t-elle ?", "Fera-t-il ?", "Feras-tu ?", "Ferez-vous ?"], "answer": "A"},
      {"question": "Will we do/make?", "options": ["Ferons-nous ?", "Ferai-je ?", "Ferez-vous ?", "Feront-ils ?"], "answer": "A"},
      {"question": "Will you do/make? (formal/plural)", "options": ["Ferez-vous ?", "Feras-tu ?", "Ferons-nous ?", "Feront-ils ?"], "answer": "A"},
      {"question": "Will they do/make? (male/mixed)", "options": ["Feront-ils ?", "Feront-elles ?", "Ferez-vous ?", "Feras-tu ?"], "answer": "A"},
      {"question": "Will they do/make? (female)", "options": ["Feront-elles ?", "Feront-ils ?", "Ferez-vous ?", "Feras-tu ?"], "answer": "A"},
      {"question": "I will not do/make", "options": ["Je ne ferai pas", "Tu ne feras pas", "Il ne fera pas", "Nous ne ferons pas"], "answer": "A"},
      {"question": "He will not do/make", "options": ["Il ne fera pas", "Je ne ferai pas", "Tu ne feras pas", "Ils ne feront pas"], "answer": "A"},
      {"question": "Won't we do/make?", "options": ["Ne ferons-nous pas ?", "Ne ferez-vous pas ?", "Ne feront-ils pas ?", "Ne ferai-je pas ?"], "answer": "A"},
      {"question": "Won't they do/make? (female)", "options": ["Ne feront-elles pas ?", "Ne feront-ils pas ?", "Ne ferez-vous pas ?", "Ne ferons-nous pas ?"], "answer": "A"}
    ]
  },

  "aller": {
    "present": [
      {"question": "I go", "options": ["Je vais", "Tu vas", "Il va", "Nous allons"], "answer": "A"},
      {"question": "You go (informal)", "options": ["Tu vas", "Je vais", "Il va", "Ils vont"], "answer": "A"},
      {"question": "He goes", "options": ["Il va", "Elle va", "Tu vas", "Ils vont"], "answer": "A"},
      {"question": "She goes", "options": ["Elle va", "Il va", "Elles vont", "Tu vas"], "answer": "A"},
      {"question": "We go", "options": ["Nous allons", "Vous allez", "Ils vont", "Je vais"], "answer": "A"},
      {"question": "You go (formal/plural)", "options": ["Vous allez", "Tu vas", "Nous allons", "Ils vont"], "answer": "A"},
      {"question": "They go (male/mixed)", "options": ["Ils vont", "Elles vont", "Ils allaient", "Ils iront"], "answer": "A"},
      {"question": "They go (female)", "options": ["Elles vont", "Ils vont", "Elles allaient", "Elles iront"], "answer": "A"},
      {"question": "Do I go?", "options": ["Vais-je ?", "Vas-tu ?", "Va-t-il ?", "Allons-nous ?"], "answer": "A"},
      {"question": "Do you go? (informal)", "options": ["Vas-tu ?", "Vais-je ?", "Va-t-il ?", "Allez-vous ?"], "answer": "A"},
      {"question": "Does he go?", "options": ["Va-t-il ?", "Va-t-elle ?", "Vais-je ?", "Vas-tu ?"], "answer": "A"},
      {"question": "Does she go?", "options": ["Va-t-elle ?", "Va-t-il ?", "Vas-tu ?", "Allez-vous ?"], "answer": "A"},
      {"question": "Do we go?", "options": ["Allons-nous ?", "Vais-je ?", "Allez-vous ?", "Vont-ils ?"], "answer": "A"},
      {"question": "Do you go? (formal/plural)", "options": ["Allez-vous ?", "Vas-tu ?", "Allons-nous ?", "Vont-ils ?"], "answer": "A"},
      {"question": "Do they go? (male/mixed)", "options": ["Vont-ils ?", "Vont-elles ?", "Allez-vous ?", "Vas-tu ?"], "answer": "A"},
      {"question": "Do they go? (female)", "options": ["Vont-elles ?", "Vont-ils ?", "Allez-vous ?", "Vas-tu ?"], "answer": "A"},
      {"question": "I don't go", "options": ["Je ne vais pas", "Tu ne vas pas", "Il ne va pas", "Nous n'allons pas"], "answer": "A"},
      {"question": "He doesn't go", "options": ["Il ne va pas", "Je ne vais pas", "Tu ne vas pas", "Ils ne vont pas"], "answer": "A"},
      {"question": "Don't we go?", "options": ["N'allons-nous pas ?", "N'allez-vous pas ?", "Ne vont-ils pas ?", "Ne vais-je pas ?"], "answer": "A"},
      {"question": "Don't they go? (female)", "options": ["Ne vont-elles pas ?", "Ne vont-ils pas ?", "N'allez-vous pas ?", "N'allons-nous pas ?"], "answer": "A"}
    ],
    "passé_composé": [
      {"question": "I went", "options": ["Je suis allé(e)", "Tu es allé(e)", "Il est allé", "Nous sommes allé(e)s"], "answer": "A"},
      {"question": "You went (informal)", "options": ["Tu es allé(e)", "Je suis allé(e)", "Il est allé", "Vous êtes allé(e)(s)"], "answer": "A"},
      {"question": "He went", "options": ["Il est allé", "Elle est allée", "Tu es allé(e)", "Ils sont allés"], "answer": "A"},
      {"question": "She went", "options": ["Elle est allée", "Il est allé", "Elles sont allées", "Tu es allé(e)"], "answer": "A"},
      {"question": "We went", "options": ["Nous sommes allé(e)s", "Vous êtes allé(e)(s)", "Ils sont allés", "Je suis allé(e)"], "answer": "A"},
      {"question": "You went (formal/plural)", "options": ["Vous êtes allé(e)(s)", "Tu es allé(e)", "Nous sommes allé(e)s", "Ils sont allés"], "answer": "A"},
      {"question": "They went (male/mixed)", "options": ["Ils sont allés", "Elles sont allées", "Ils étaient allés", "Ils seront allés"], "answer": "A"},
      {"question": "They went (female)", "options": ["Elles sont allées", "Ils sont allés", "Elles étaient allées", "Elles seront allées"], "answer": "A"},
      {"question": "Did I go?", "options": ["Suis-je allé(e) ?", "Es-tu allé(e) ?", "Est-il allé ?", "Sommes-nous allé(e)s ?"], "answer": "A"},
      {"question": "Did you go? (informal)", "options": ["Es-tu allé(e) ?", "Suis-je allé(e) ?", "Est-il allé ?", "Êtes-vous allé(e)(s) ?"], "answer": "A"},
      {"question": "Did he go?", "options": ["Est-il allé ?", "Est-elle allée ?", "Suis-je allé(e) ?", "Es-tu allé(e) ?"], "answer": "A"},
      {"question": "Did she go?", "options": ["Est-elle allée ?", "Est-il allé ?", "Es-tu allé(e) ?", "Êtes-vous allé(e)(s) ?"], "answer": "A"},
      {"question": "Did we go?", "options": ["Sommes-nous allé(e)s ?", "Suis-je allé(e) ?", "Êtes-vous allé(e)(s) ?", "Sont-ils allés ?"], "answer": "A"},
      {"question": "Did you go? (formal/plural)", "options": ["Êtes-vous allé(e)(s) ?", "Es-tu allé(e) ?", "Sommes-nous allé(e)s ?", "Sont-ils allés ?"], "answer": "A"},
      {"question": "Did they go? (male/mixed)", "options": ["Sont-ils allés ?", "Sont-elles allées ?", "Êtes-vous allé(e)(s) ?", "Es-tu allé(e) ?"], "answer": "A"},
      {"question": "Did they go? (female)", "options": ["Sont-elles allées ?", "Sont-ils allés ?", "Êtes-vous allé(e)(s) ?", "Es-tu allé(e) ?"], "answer": "A"},
      {"question": "I didn't go", "options": ["Je ne suis pas allé(e)", "Tu n'es pas allé(e)", "Il n'est pas allé", "Nous ne sommes pas allé(e)s"], "answer": "A"},
      {"question": "He didn't go", "options": ["Il n'est pas allé", "Je ne suis pas allé(e)", "Tu n'es pas allé(e)", "Ils ne sont pas allés"], "answer": "A"},
      {"question": "Didn't we go?", "options": ["Ne sommes-nous pas allé(e)s ?", "N'êtes-vous pas allé(e)(s) ?", "Ne sont-ils pas allés ?", "Ne suis-je pas allé(e) ?"], "answer": "A"},
      {"question": "Didn't they go? (female)", "options": ["Ne sont-elles pas allées ?", "Ne sont-ils pas allés ?", "N'êtes-vous pas allé(e)(s) ?", "Ne sommes-nous pas allé(e)s ?"], "answer": "A"}
    ],
    "futur_simple": [
      {"question": "I will go", "options": ["J'irai", "Tu iras", "Il ira", "Nous irons"], "answer": "A"},
      {"question": "You will go (informal)", "options": ["Tu iras", "J'irai", "Il ira", "Vous irez"], "answer": "A"},
      {"question": "He will go", "options": ["Il ira", "Elle ira", "Tu iras", "Ils iront"], "answer": "A"},
      {"question": "She will go", "options": ["Elle ira", "Il ira", "Elles iront", "Tu iras"], "answer": "A"},
      {"question": "We will go", "options": ["Nous irons", "Vous irez", "Ils iront", "J'irai"], "answer": "A"},
      {"question": "You will go (formal/plural)", "options": ["Vous irez", "Tu iras", "Nous irons", "Ils iront"], "answer": "A"},
      {"question": "They will go (male/mixed)", "options": ["Ils iront", "Elles iront", "Ils allaient", "Ils sont allés"], "answer": "A"},
      {"question": "They will go (female)", "options": ["Elles iront", "Ils iront", "Elles allaient", "Elles sont allées"], "answer": "A"},
      {"question": "Will I go?", "options": ["Irai-je ?", "Iras-tu ?", "Ira-t-il ?", "Irons-nous ?"], "answer": "A"},
      {"question": "Will you go? (informal)", "options": ["Iras-tu ?", "Irai-je ?", "Ira-t-il ?", "Irez-vous ?"], "answer": "A"},
      {"question": "Will he go?", "options": ["Ira-t-il ?", "Ira-t-elle ?", "Irai-je ?", "Iras-tu ?"], "answer": "A"},
      {"question": "Will she go?", "options": ["Ira-t-elle ?", "Ira-t-il ?", "Iras-tu ?", "Irez-vous ?"], "answer": "A"},
      {"question": "Will we go?", "options": ["Irons-nous ?", "Irai-je ?", "Irez-vous ?", "Iront-ils ?"], "answer": "A"},
      {"question": "Will you go? (formal/plural)", "options": ["Irez-vous ?", "Iras-tu ?", "Irons-nous ?", "Iront-ils ?"], "answer": "A"},
      {"question": "Will they go? (male/mixed)", "options": ["Iront-ils ?", "Iront-elles ?", "Irez-vous ?", "Iras-tu ?"], "answer": "A"},
      {"question": "Will they go? (female)", "options": ["Iront-elles ?", "Iront-ils ?", "Irez-vous ?", "Iras-tu ?"], "answer": "A"},
      {"question": "I will not go", "options": ["Je n'irai pas", "Tu n'iras pas", "Il n'ira pas", "Nous n'irons pas"], "answer": "A"},
      {"question": "He will not go", "options": ["Il n'ira pas", "Je n'irai pas", "Tu n'iras pas", "Ils n'iront pas"], "answer": "A"},
      {"question": "Won't we go?", "options": ["N'irons-nous pas ?", "N'irez-vous pas ?", "N'iront-ils pas ?", "N'irai-je pas ?"], "answer": "A"},
      {"question": "Won't they go? (female)", "options": ["N'iront-elles pas ?", "N'iront-ils pas ?", "N'irez-vous pas ?", "N'irons-nous pas ?"], "answer": "A"}
    ]
  }
};

// Function to get random Novice questions for a specific verb and tense
export function getRandomNoviceQuestions(verb: string, tense: string, count: number): NoviceQuizQuestion[] {
  const verbData = NOVICE_QUIZ_DATA[verb];
  if (!verbData) {
    console.log(`⚠️  No Novice questions found for verb: ${verb}`);
    return [];
  }
  
  const questions = verbData[tense];
  if (!questions) {
    console.log(`⚠️  No Novice questions found for verb: ${verb}, tense: ${tense}`);
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
      // Create variation with shuffled options
      const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
      const correctIndex = q.options.findIndex((_, i) => String.fromCharCode(65 + i) === q.answer);
      const correctText = q.options[correctIndex];
      const newCorrectIndex = shuffledOptions.findIndex(opt => opt === correctText);
      const newAnswer = String.fromCharCode(65 + newCorrectIndex);
      
      result.push({
        ...q,
        options: shuffledOptions,
        answer: newAnswer
      });
    }
  }
  
  return result.slice(0, count);
}

// Convert Novice quiz data to the format expected by the quiz generator
export function convertNoviceToQuizFormat(noviceQuestions: NoviceQuizQuestion[]): any[] {
  return noviceQuestions.map(q => {
    const correctIndex = q.options.findIndex((_, i) => String.fromCharCode(65 + i) === q.answer);
    
    return {
      question: q.question,
      hint: `Select the correct conjugation`,
      answerOptions: q.options.map((option, index) => ({
        text: option,
        rationale: index === correctIndex ? "Correct conjugation!" : "Incorrect conjugation.",
        isCorrect: index === correctIndex
      }))
    };
  });
}