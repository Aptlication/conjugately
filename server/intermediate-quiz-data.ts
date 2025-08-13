// Intermediate Level Quiz Data - Perplexity Validated
// 11 verbs × 4 tenses × 20 questions = 880 total MCQs
// Verbs: être, avoir, faire, aller, voir, dire, pouvoir, vouloir, prendre, savoir, venir
// Tenses: Présent, Passé Composé, Futur Simple, Imparfait

export interface IntermediateQuizQuestion {
  question: string;
  options: string[];
  answer: string; // A, B, C, or D
}

export const INTERMEDIATE_QUIZ_DATA: Record<string, Record<string, IntermediateQuizQuestion[]>> = {
  "être": {
    "present": [
      {"question": "I am happy. (male) (Présent)", "options": ["Je suis heureux.", "Je suis heureuse.", "Il est heureux.", "Nous sommes heureux."], "answer": "A"},
      {"question": "You are happy. (female, informal) (Présent)", "options": ["Tu es heureuse.", "Tu es heureux.", "Vous êtes heureuses.", "Elle est heureuse."], "answer": "A"},
      {"question": "He is tall. (Présent)", "options": ["Il est grand.", "Elle est grande.", "Tu es grand.", "Ils sont grands."], "answer": "A"},
      {"question": "She is ready. (Présent)", "options": ["Elle est prête.", "Il est prêt.", "Elles sont prêtes.", "Tu es prêt."], "answer": "A"},
      {"question": "We are tired. (male/mixed) (Présent)", "options": ["Nous sommes fatigués.", "Vous êtes fatigués.", "Ils sont fatigués.", "Je suis fatigué."], "answer": "A"},
      {"question": "You are ready. (formal/plural, male) (Présent)", "options": ["Vous êtes prêts.", "Tu es prêt.", "Nous sommes prêts.", "Ils sont prêts."], "answer": "A"},
      {"question": "They are at home. (male/mixed) (Présent)", "options": ["Ils sont à la maison.", "Elles sont à la maison.", "Ils étaient à la maison.", "Ils seront à la maison."], "answer": "A"},
      {"question": "They are in France. (female) (Présent)", "options": ["Elles sont en France.", "Ils sont en France.", "Elles étaient en France.", "Elles seront en France."], "answer": "A"},
      {"question": "Am I late? (Présent)", "options": ["Suis-je en retard ?", "Es-tu en retard ?", "Est-il en retard ?", "Sommes-nous en retard ?"], "answer": "A"},
      {"question": "Are you ready? (informal, male) (Présent)", "options": ["Es-tu prêt ?", "Suis-je prêt ?", "Est-il prêt ?", "Êtes-vous prêts ?"], "answer": "A"},
      {"question": "Is he tired? (Présent)", "options": ["Est-il fatigué ?", "Est-elle fatiguée ?", "Suis-je fatigué ?", "Es-tu fatigué ?"], "answer": "A"},
      {"question": "Is she in Paris? (Présent)", "options": ["Est-elle à Paris ?", "Est-il à Paris ?", "Es-tu à Paris ?", "Êtes-vous à Paris ?"], "answer": "A"},
      {"question": "Are we hungry? (Présent)", "options": ["Avons-nous faim ?", "Ai-je faim ?", "Avez-vous faim ?", "Ont-ils faim ?"], "answer": "A"},
      {"question": "Are you at home? (formal/plural) (Présent)", "options": ["Êtes-vous à la maison ?", "Es-tu à la maison ?", "Sommes-nous à la maison ?", "Sont-ils à la maison ?"], "answer": "A"},
      {"question": "Are they ready? (male/mixed) (Présent)", "options": ["Sont-ils prêts ?", "Sont-elles prêtes ?", "Êtes-vous prêts ?", "Es-tu prêt ?"], "answer": "A"},
      {"question": "Are they here? (female) (Présent)", "options": ["Sont-elles ici ?", "Sont-ils ici ?", "Êtes-vous ici ?", "Es-tu ici ?"], "answer": "A"},
      {"question": "I am not happy. (male) (Présent)", "options": ["Je ne suis pas heureux.", "Tu n'es pas heureux.", "Il n'est pas heureux.", "Nous ne sommes pas heureux."], "answer": "A"},
      {"question": "He is not tired. (Présent)", "options": ["Il n'est pas fatigué.", "Je ne suis pas fatigué.", "Tu n'es pas fatigué.", "Ils ne sont pas fatigués."], "answer": "A"},
      {"question": "Aren't we late? (Présent)", "options": ["Ne sommes-nous pas en retard ?", "N'êtes-vous pas en retard ?", "Ne sont-ils pas en retard ?", "Ne suis-je pas en retard ?"], "answer": "A"},
      {"question": "Aren't they ready? (female) (Présent)", "options": ["Ne sont-elles pas prêtes ?", "Ne sont-ils pas prêts ?", "N'êtes-vous pas prêts ?", "Ne sommes-nous pas prêts ?"], "answer": "A"}
    ],
    "passé_composé": [
      {"question": "I have been happy. (male) (Passé Composé)", "options": ["J'ai été heureux.", "Tu as été heureux.", "Il a été heureux.", "Nous avons été heureux."], "answer": "A"},
      {"question": "You have been in Paris. (informal) (Passé Composé)", "options": ["Tu as été à Paris.", "J'ai été à Paris.", "Il a été à Paris.", "Vous avez été à Paris."], "answer": "A"},
      {"question": "He has been tired. (Passé Composé)", "options": ["Il a été fatigué.", "Elle a été fatiguée.", "Tu as été fatigué.", "Nous avons été fatigués."], "answer": "A"},
      {"question": "She has been ready. (Passé Composé)", "options": ["Elle a été prête.", "Il a été prêt.", "Elles ont été prêtes.", "Tu as été prêt."], "answer": "A"},
      {"question": "We have been late. (Passé Composé)", "options": ["Nous avons été en retard.", "Vous avez été en retard.", "Ils ont été en retard.", "J'ai été en retard."], "answer": "A"},
      {"question": "You have been tired. (formal/plural, male) (Passé Composé)", "options": ["Vous avez été fatigués.", "Tu as été fatigué.", "Nous avons été fatigués.", "Ils ont été fatigués."], "answer": "A"},
      {"question": "They have been happy. (male/mixed) (Passé Composé)", "options": ["Ils ont été heureux.", "Elles ont été heureuses.", "Ils étaient heureux.", "Ils seront heureux."], "answer": "A"},
      {"question": "They have been in London. (female) (Passé Composé)", "options": ["Elles ont été à Londres.", "Ils ont été à Londres.", "Elles étaient à Londres.", "Elles seront à Londres."], "answer": "A"},
      {"question": "Have I been ready? (Passé Composé)", "options": ["Ai-je été prêt ?", "As-tu été prêt ?", "A-t-il été prêt ?", "Avons-nous été prêts ?"], "answer": "A"},
      {"question": "Have you been happy? (informal) (Passé Composé)", "options": ["As-tu été heureux ?", "Ai-je été heureux ?", "A-t-il été heureux ?", "Avez-vous été heureux ?"], "answer": "A"},
      {"question": "Has he been late? (Passé Composé)", "options": ["A-t-il été en retard ?", "A-t-elle été en retard ?", "Ai-je été en retard ?", "As-tu été en retard ?"], "answer": "A"},
      {"question": "Has she been in Paris? (Passé Composé)", "options": ["A-t-elle été à Paris ?", "A-t-il été à Paris ?", "As-tu été à Paris ?", "Avez-vous été à Paris ?"], "answer": "A"},
      {"question": "Have we been tired? (Passé Composé)", "options": ["Avons-nous été fatigués ?", "Ai-je été fatigué ?", "Avez-vous été fatigués ?", "Ont-ils été fatigués ?"], "answer": "A"},
      {"question": "Have you been ready? (formal/plural) (Passé Composé)", "options": ["Avez-vous été prêts ?", "As-tu été prêt ?", "Avons-nous été prêts ?", "Ont-ils été prêts ?"], "answer": "A"},
      {"question": "Have they been happy? (male/mixed) (Passé Composé)", "options": ["Ont-ils été heureux ?", "Ont-elles été heureuses ?", "Avez-vous été heureux ?", "As-tu été heureux ?"], "answer": "A"},
      {"question": "Have they been happy? (female) (Passé Composé)", "options": ["Ont-elles été heureuses ?", "Ont-ils été heureux ?", "Avez-vous été heureuses ?", "As-tu été heureuse ?"], "answer": "A"},
      {"question": "I have not been happy. (male) (Passé Composé)", "options": ["Je n'ai pas été heureux.", "Tu n'as pas été heureux.", "Il n'a pas été heureux.", "Nous n'avons pas été heureux."], "answer": "A"},
      {"question": "He has not been late. (Passé Composé)", "options": ["Il n'a pas été en retard.", "Je n'ai pas été en retard.", "Tu n'as pas été en retard.", "Ils n'ont pas été en retard."], "answer": "A"},
      {"question": "Haven't we been ready? (Passé Composé)", "options": ["N'avons-nous pas été prêts ?", "N'avez-vous pas été prêts ?", "N'ont-ils pas été prêts ?", "N'ai-je pas été prêt ?"], "answer": "A"},
      {"question": "Haven't they been ready? (female) (Passé Composé)", "options": ["N'ont-elles pas été prêtes ?", "N'ont-ils pas été prêts ?", "N'avez-vous pas été prêtes ?", "N'avons-nous pas été prêts ?"], "answer": "A"}
    ],
    "futur_simple": [
      {"question": "I will be happy. (male) (Futur Simple)", "options": ["Je serai heureux.", "Tu seras heureux.", "Il sera heureux.", "Nous serons heureux."], "answer": "A"},
      {"question": "You will be tired. (female, informal) (Futur Simple)", "options": ["Tu seras fatiguée.", "Je serai fatiguée.", "Elle sera fatiguée.", "Vous serez fatiguées."], "answer": "A"},
      {"question": "He will be ready. (Futur Simple)", "options": ["Il sera prêt.", "Elle sera prête.", "Tu seras prêt.", "Ils seront prêts."], "answer": "A"},
      {"question": "She will be in Paris. (Futur Simple)", "options": ["Elle sera à Paris.", "Il sera à Paris.", "Elles seront à Paris.", "Tu seras à Paris."], "answer": "A"},
      {"question": "We will be on time. (Futur Simple)", "options": ["Nous serons à l'heure.", "Vous serez à l'heure.", "Ils seront à l'heure.", "Je serai à l'heure."], "answer": "A"},
      {"question": "You will be late. (formal/plural) (Futur Simple)", "options": ["Vous serez en retard.", "Tu seras en retard.", "Nous serons en retard.", "Ils seront en retard."], "answer": "A"},
      {"question": "They will be at home. (male/mixed) (Futur Simple)", "options": ["Ils seront à la maison.", "Elles seront à la maison.", "Ils seraient à la maison.", "Ils étaient à la maison."], "answer": "A"},
      {"question": "They will be at the office. (female) (Futur Simple)", "options": ["Elles seront au bureau.", "Ils seront au bureau.", "Elles seraient au bureau.", "Elles étaient au bureau."], "answer": "A"},
      {"question": "Will I be ready? (Futur Simple)", "options": ["Serai-je prêt ?", "Seras-tu prêt ?", "Sera-t-il prêt ?", "Serons-nous prêts ?"], "answer": "A"},
      {"question": "Will you be happy? (informal) (Futur Simple)", "options": ["Seras-tu heureux ?", "Serai-je heureux ?", "Sera-t-il heureux ?", "Serez-vous heureux ?"], "answer": "A"},
      {"question": "Will he be late? (Futur Simple)", "options": ["Sera-t-il en retard ?", "Sera-t-elle en retard ?", "Serai-je en retard ?", "Seras-tu en retard ?"], "answer": "A"},
      {"question": "Will she be at home? (Futur Simple)", "options": ["Sera-t-elle à la maison ?", "Sera-t-il à la maison ?", "Seras-tu à la maison ?", "Serez-vous à la maison ?"], "answer": "A"},
      {"question": "Will we be on time? (Futur Simple)", "options": ["Serons-nous à l'heure ?", "Serai-je à l'heure ?", "Serez-vous à l'heure ?", "Seront-ils à l'heure ?"], "answer": "A"},
      {"question": "Will you be tired? (formal/plural) (Futur Simple)", "options": ["Serez-vous fatigués ?", "Seras-tu fatigué ?", "Serons-nous fatigués ?", "Seront-ils fatigués ?"], "answer": "A"},
      {"question": "Will they be ready? (male/mixed) (Futur Simple)", "options": ["Seront-ils prêts ?", "Seront-elles prêtes ?", "Serez-vous prêts ?", "Es-tu prêt ?"], "answer": "A"},
      {"question": "Will they be ready? (female) (Futur Simple)", "options": ["Seront-elles prêtes ?", "Seront-ils prêts ?", "Serez-vous prêtes ?", "Es-tu prête ?"], "answer": "A"},
      {"question": "I will not be happy. (male) (Futur Simple)", "options": ["Je ne serai pas heureux.", "Tu ne seras pas heureux.", "Il ne sera pas heureux.", "Nous ne serons pas heureux."], "answer": "A"},
      {"question": "He will not be late. (Futur Simple)", "options": ["Il ne sera pas en retard.", "Je ne serai pas en retard.", "Tu ne seras pas en retard.", "Ils ne seront pas en retard."], "answer": "A"},
      {"question": "Won't we be ready? (Futur Simple)", "options": ["Ne serons-nous pas prêts ?", "Ne serez-vous pas prêts ?", "Ne seront-ils pas prêts ?", "Ne serai-je pas prêt ?"], "answer": "A"},
      {"question": "Won't they be happy? (female) (Futur Simple)", "options": ["Ne seront-elles pas heureuses ?", "Ne seront-ils pas heureux ?", "Ne serez-vous pas heureuses ?", "Ne serons-nous pas heureuses ?"], "answer": "A"}
    ],
    "imparfait": [
      {"question": "I was happy. (male) (Imparfait)", "options": ["J'étais heureux.", "Tu étais heureux.", "Il était heureux.", "Nous étions heureux."], "answer": "A"},
      {"question": "You were happy. (female, informal) (Imparfait)", "options": ["Tu étais heureuse.", "Je étais heureuse.", "Elle était heureuse.", "Vous étiez heureuses."], "answer": "A"},
      {"question": "He was tired. (Imparfait)", "options": ["Il était fatigué.", "Elle était fatiguée.", "Tu étais fatigué.", "Ils étaient fatigués."], "answer": "A"},
      {"question": "She was ready. (Imparfait)", "options": ["Elle était prête.", "Il était prêt.", "Elles étaient prêtes.", "Tu étais prêt."], "answer": "A"},
      {"question": "We were at home. (Imparfait)", "options": ["Nous étions à la maison.", "Vous étiez à la maison.", "Ils étaient à la maison.", "J'étais à la maison."], "answer": "A"},
      {"question": "You were at the office. (formal/plural) (Imparfait)", "options": ["Vous étiez au bureau.", "Tu étais au bureau.", "Nous étions au bureau.", "Ils étaient au bureau."], "answer": "A"},
      {"question": "They were in Paris. (male/mixed) (Imparfait)", "options": ["Ils étaient à Paris.", "Elles étaient à Paris.", "Ils seront à Paris.", "Ils seraient à Paris."], "answer": "A"},
      {"question": "They were in France. (female) (Imparfait)", "options": ["Elles étaient en France.", "Ils étaient en France.", "Elles seront en France.", "Elles seraient en France."], "answer": "A"},
      {"question": "Was I happy? (male) (Imparfait)", "options": ["Étais-je heureux ?", "Étais-tu heureux ?", "Était-il heureux ?", "Étions-nous heureux ?"], "answer": "A"},
      {"question": "Were you ready? (informal, male) (Imparfait)", "options": ["Étais-tu prêt ?", "Étais-je prêt ?", "Était-il prêt ?", "Étiez-vous prêts ?"], "answer": "A"},
      {"question": "Was he late? (Imparfait)", "options": ["Était-il en retard ?", "Était-elle en retard ?", "Étais-je en retard ?", "Étais-tu en retard ?"], "answer": "A"},
      {"question": "Was she tired? (Imparfait)", "options": ["Était-elle fatiguée ?", "Était-il fatigué ?", "Étais-tu fatigué ?", "Étiez-vous fatigués ?"], "answer": "A"},
      {"question": "Were we ready? (Imparfait)", "options": ["Étions-nous prêts ?", "Étais-je prêt ?", "Étiez-vous prêts ?", "Étaient-ils prêts ?"], "answer": "A"},
      {"question": "Were you happy? (formal/plural, male) (Imparfait)", "options": ["Étiez-vous heureux ?", "Étais-tu heureux ?", "Étions-nous heureux ?", "Étaient-ils heureux ?"], "answer": "A"},
      {"question": "Were they ready? (male/mixed) (Imparfait)", "options": ["Étaient-ils prêts ?", "Étaient-elles prêtes ?", "Étiez-vous prêts ?", "Es-tu prêt ?"], "answer": "A"},
      {"question": "Were they ready? (female) (Imparfait)", "options": ["Étaient-elles prêtes ?", "Étaient-ils prêts ?", "Étiez-vous prêtes ?", "Es-tu prête ?"], "answer": "A"},
      {"question": "I was not happy. (male) (Imparfait)", "options": ["Je n'étais pas heureux.", "Tu n'étais pas heureux.", "Il n'était pas heureux.", "Nous n'étions pas heureux."], "answer": "A"},
      {"question": "He was not tired. (Imparfait)", "options": ["Il n'était pas fatigué.", "Je n'étais pas fatigué.", "Tu n'étais pas fatigué.", "Ils n'étaient pas fatigués."], "answer": "A"},
      {"question": "Weren't we ready? (Imparfait)", "options": ["N'étions-nous pas prêts ?", "N'étiez-vous pas prêts ?", "N'étaient-ils pas prêts ?", "N'étais-je pas prêt ?"], "answer": "A"},
      {"question": "Weren't they happy? (female) (Imparfait)", "options": ["N'étaient-elles pas heureuses ?", "N'étaient-ils pas heureux ?", "N'étiez-vous pas heureuses ?", "N'étions-nous pas heureuses ?"], "answer": "A"}
    ]
  },

  "avoir": {
    "present": [
      // TODO: Awaiting 20 Présent questions from Perplexity validation
    ],
    "passé_composé": [
      // TODO: Awaiting 20 Passé Composé questions from Perplexity validation
    ],
    "futur_simple": [
      {"question": "I will have a car. (Futur Simple)", "options": ["J'aurai une voiture.", "Tu auras une voiture.", "Il aura une voiture.", "Nous aurons une voiture."], "answer": "A"},
      {"question": "You will have a dog. (informal) (Futur Simple)", "options": ["Tu auras un chien.", "J'aurai un chien.", "Il aura un chien.", "Vous aurez un chien."], "answer": "A"},
      {"question": "He will have a house. (Futur Simple)", "options": ["Il aura une maison.", "Elle aura une maison.", "Tu auras une maison.", "Ils auront une maison."], "answer": "A"},
      {"question": "She will have a bag. (Futur Simple)", "options": ["Elle aura un sac.", "Il aura un sac.", "Elles auront un sac.", "Tu auras un sac."], "answer": "A"},
      {"question": "We will have time. (Futur Simple)", "options": ["Nous aurons du temps.", "Vous aurez du temps.", "Ils auront du temps.", "J'aurai du temps."], "answer": "A"},
      {"question": "You will have many friends. (formal/plural) (Futur Simple)", "options": ["Vous aurez beaucoup d'amis.", "Tu auras beaucoup d'amis.", "Nous aurons beaucoup d'amis.", "Ils auront beaucoup d'amis."], "answer": "A"},
      {"question": "They will have bikes. (male/mixed) (Futur Simple)", "options": ["Ils auront des vélos.", "Elles auront des vélos.", "Ils auraient des vélos.", "Ils avaient des vélos."], "answer": "A"},
      {"question": "They will have cats. (female) (Futur Simple)", "options": ["Elles auront des chats.", "Ils auront des chats.", "Elles auraient des chats.", "Elles avaient des chats."], "answer": "A"},
      {"question": "Will I have your keys? (Futur Simple)", "options": ["Aurai-je tes clés ?", "Auras-tu mes clés ?", "Aura-t-il tes clés ?", "aurons-nous tes clés ?"], "answer": "A"},
      {"question": "Will you have my book? (informal) (Futur Simple)", "options": ["Auras-tu mon livre ?", "Aurai-je ton livre ?", "Aura-t-il mon livre ?", "Aurez-vous mon livre ?"], "answer": "A"},
      {"question": "Will he have our address? (Futur Simple)", "options": ["Aura-t-il notre adresse ?", "Aura-t-elle notre adresse ?", "Aurai-je notre adresse ?", "Auras-tu notre adresse ?"], "answer": "A"},
      {"question": "Will she have the tickets? (Futur Simple)", "options": ["Aura-t-elle les billets ?", "Aura-t-il les billets ?", "Auras-tu les billets ?", "Aurez-vous les billets ?"], "answer": "A"},
      {"question": "Will we have bread? (Futur Simple)", "options": ["Aurons-nous du pain ?", "Aurai-je du pain ?", "Aurez-vous du pain ?", "Auront-ils du pain ?"], "answer": "A"},
      {"question": "Will you have the maps? (formal/plural) (Futur Simple)", "options": ["Aurez-vous les cartes ?", "Auras-tu les cartes ?", "Aurons-nous les cartes ?", "Auront-ils les cartes ?"], "answer": "A"},
      {"question": "Will they have water? (male/mixed) (Futur Simple)", "options": ["Auront-ils de l'eau ?", "Auront-elles de l'eau ?", "Aurez-vous de l'eau ?", "Auras-tu de l'eau ?"], "answer": "A"},
      {"question": "Will they have water? (female) (Futur Simple)", "options": ["Auront-elles de l'eau ?", "Auront-ils de l'eau ?", "Aurez-vous de l'eau ?", "Auras-tu de l'eau ?"], "answer": "A"},
      {"question": "I will not have a car. (Futur Simple)", "options": ["Je n'aurai pas de voiture.", "Tu n'auras pas de voiture.", "Il n'aura pas de voiture.", "Nous n'aurons pas de voiture."], "answer": "A"},
      {"question": "He will not have a house. (Futur Simple)", "options": ["Il n'aura pas de maison.", "Je n'aurai pas de maison.", "Tu n'auras pas de maison.", "Ils n'auront pas de maison."], "answer": "A"},
      {"question": "Won't we have time? (Futur Simple)", "options": ["N'aurons-nous pas de temps ?", "N'aurez-vous pas de temps ?", "N'auront-ils pas de temps ?", "N'aurai-je pas de temps ?"], "answer": "A"},
      {"question": "Won't they have bikes? (female) (Futur Simple)", "options": ["N'auront-elles pas de vélos ?", "N'auront-ils pas de vélos ?", "N'aurez-vous pas de vélos ?", "N'aurons-nous pas de vélos ?"], "answer": "A"}
    ],
    "imparfait": [
      {"question": "I had a car. (Imparfait)", "options": ["J'avais une voiture.", "Tu avais une voiture.", "Il avait une voiture.", "Nous avions une voiture."], "answer": "A"},
      {"question": "You had a dog. (informal) (Imparfait)", "options": ["Tu avais un chien.", "J'avais un chien.", "Il avait un chien.", "Vous aviez un chien."], "answer": "A"},
      {"question": "He had a house. (Imparfait)", "options": ["Il avait une maison.", "Elle avait une maison.", "Tu avais une maison.", "Ils avaient une maison."], "answer": "A"},
      {"question": "She had a bag. (Imparfait)", "options": ["Elle avait un sac.", "Il avait un sac.", "Elles avaient un sac.", "Tu avais un sac."], "answer": "A"},
      {"question": "We had time. (Imparfait)", "options": ["Nous avions du temps.", "Vous aviez du temps.", "Ils avaient du temps.", "J'avais du temps."], "answer": "A"},
      {"question": "You had many friends. (formal/plural) (Imparfait)", "options": ["Vous aviez beaucoup d'amis.", "Tu avais beaucoup d'amis.", "Nous avions beaucoup d'amis.", "Ils avaient beaucoup d'amis."], "answer": "A"},
      {"question": "They had bikes. (male/mixed) (Imparfait)", "options": ["Ils avaient des vélos.", "Elles avaient des vélos.", "Ils auront des vélos.", "Ils auraient des vélos."], "answer": "A"},
      {"question": "They had cats. (female) (Imparfait)", "options": ["Elles avaient des chats.", "Ils avaient des chats.", "Elles auront des chats.", "Elles auraient des chats."], "answer": "A"},
      {"question": "Did I have your keys? (Imparfait)", "options": ["Avais-je tes clés ?", "Avais-tu mes clés ?", "Avait-il tes clés ?", "Avions-nous tes clés ?"], "answer": "A"},
      {"question": "Did you have my book? (informal) (Imparfait)", "options": ["Avais-tu mon livre ?", "Avais-je ton livre ?", "Avait-il mon livre ?", "Aviez-vous mon livre ?"], "answer": "A"},
      {"question": "Did he have our address? (Imparfait)", "options": ["Avait-il notre adresse ?", "Avait-elle notre adresse ?", "Avais-je notre adresse ?", "Avais-tu notre adresse ?"], "answer": "A"},
      {"question": "Did she have the tickets? (Imparfait)", "options": ["Avait-elle les billets ?", "Avait-il les billets ?", "Avais-tu les billets ?", "Aviez-vous les billets ?"], "answer": "A"},
      {"question": "Did we have bread? (Imparfait)", "options": ["Avions-nous du pain ?", "Avais-je du pain ?", "Aviez-vous du pain ?", "Avaient-ils du pain ?"], "answer": "A"},
      {"question": "Did you have the maps? (formal/plural) (Imparfait)", "options": ["Aviez-vous les cartes ?", "Avais-tu les cartes ?", "Avions-nous les cartes ?", "Avaient-ils les cartes ?"], "answer": "A"},
      {"question": "Did they have water? (male/mixed) (Imparfait)", "options": ["Avaient-ils de l'eau ?", "Avaient-elles de l'eau ?", "Aviez-vous de l'eau ?", "Avais-tu de l'eau ?"], "answer": "A"},
      {"question": "Did they have water? (female) (Imparfait)", "options": ["Avaient-elles de l'eau ?", "Avaient-ils de l'eau ?", "Aviez-vous de l'eau ?", "Avais-tu de l'eau ?"], "answer": "A"},
      {"question": "I did not have a car. (Imparfait)", "options": ["Je n'avais pas de voiture.", "Tu n'avais pas de voiture.", "Il n'avait pas de voiture.", "Nous n'avions pas de voiture."], "answer": "A"},
      {"question": "He did not have a house. (Imparfait)", "options": ["Il n'avait pas de maison.", "Je n'avais pas de maison.", "Tu n'avais pas de maison.", "Ils n'avaient pas de maison."], "answer": "A"},
      {"question": "Didn't we have time? (Imparfait)", "options": ["N'avions-nous pas de temps ?", "N'aviez-vous pas de temps ?", "N'avaient-ils pas de temps ?", "N'avais-je pas de temps ?"], "answer": "A"},
      {"question": "Didn't they have bikes? (female) (Imparfait)", "options": ["N'avaient-elles pas de vélos ?", "N'avaient-ils pas de vélos ?", "N'aviez-vous pas de vélos ?", "N'avions-nous pas de vélos ?"], "answer": "A"}
    ]
  },

  "faire": {
    "present": [
      {"question": "I do my homework. (Présent)", "options": ["Je fais mes devoirs.", "Tu fais tes devoirs.", "Il fait ses devoirs.", "Nous faisons nos devoirs."], "answer": "A"},
      {"question": "You do the dishes. (informal) (Présent)", "options": ["Tu fais la vaisselle.", "Je fais la vaisselle.", "Il fait la vaisselle.", "Vous faites la vaisselle."], "answer": "A"},
      {"question": "He does the cooking. (Présent)", "options": ["Il fait la cuisine.", "Elle fait la cuisine.", "Tu fais la cuisine.", "Ils font la cuisine."], "answer": "A"},
      {"question": "She does the shopping. (Présent)", "options": ["Elle fait les courses.", "Il fait les courses.", "Elles font les courses.", "Tu fais les courses."], "answer": "A"},
      {"question": "We do sport. (Présent)", "options": ["Nous faisons du sport.", "Vous faites du sport.", "Ils font du sport.", "Je fais du sport."], "answer": "A"},
      {"question": "You do your work. (formal/plural) (Présent)", "options": ["Vous faites votre travail.", "Tu fais ton travail.", "Nous faisons notre travail.", "Ils font leur travail."], "answer": "A"},
      {"question": "They do their homework. (male/mixed) (Présent)", "options": ["Ils font leurs devoirs.", "Elles font leurs devoirs.", "Ils faisaient leurs devoirs.", "Ils feront leurs devoirs."], "answer": "A"},
      {"question": "They do the cleaning. (female) (Présent)", "options": ["Elles font le ménage.", "Ils font le ménage.", "Elles faisaient le ménage.", "Elles feront le ménage."], "answer": "A"},
      {"question": "Do I do it well? (Présent)", "options": ["Est-ce que je le fais bien ?", "Le fais-tu bien ?", "Le fait-il bien ?", "Le faisons-nous bien ?"], "answer": "A"},
      {"question": "Do you do it often? (informal) (Présent)", "options": ["Le fais-tu souvent ?", "Le fais-je souvent ?", "Le fait-il souvent ?", "Le faites-vous souvent ?"], "answer": "A"},
      {"question": "Does he do the shopping? (Présent)", "options": ["Fait-il les courses ?", "Fait-elle les courses ?", "Fais-je les courses ?", "Fais-tu les courses ?"], "answer": "A"},
      {"question": "Does she do sports? (Présent)", "options": ["Fait-elle du sport ?", "Fait-il du sport ?", "Fais-tu du sport ?", "Faites-vous du sport ?"], "answer": "A"},
      {"question": "Do we do everything? (Présent)", "options": ["Faisons-nous tout ?", "Fais-je tout ?", "Faites-vous tout ?", "Font-ils tout ?"], "answer": "A"},
      {"question": "Do you do enough? (formal/plural) (Présent)", "options": ["Faites-vous assez ?", "Fais-tu assez ?", "Faisons-nous assez ?", "Font-ils assez ?"], "answer": "A"},
      {"question": "Do they do the cooking? (male/mixed) (Présent)", "options": ["Font-ils la cuisine ?", "Font-elles la cuisine ?", "Faites-vous la cuisine ?", "Fais-tu la cuisine ?"], "answer": "A"},
      {"question": "Do they do the cooking? (female) (Présent)", "options": ["Font-elles la cuisine ?", "Font-ils la cuisine ?", "Faites-vous la cuisine ?", "Fais-tu la cuisine ?"], "answer": "A"},
      {"question": "I do not do my homework. (Présent)", "options": ["Je ne fais pas mes devoirs.", "Tu ne fais pas mes devoirs.", "Il ne fait pas mes devoirs.", "Nous ne faisons pas mes devoirs."], "answer": "A"},
      {"question": "He does not do the cooking. (Présent)", "options": ["Il ne fait pas la cuisine.", "Je ne fais pas la cuisine.", "Tu ne fais pas la cuisine.", "Ils ne font pas la cuisine."], "answer": "A"},
      {"question": "Don't we do enough? (Présent)", "options": ["Ne faisons-nous pas assez ?", "Ne faites-vous pas assez ?", "Ne font-ils pas assez ?", "Ne fais-je pas assez ?"], "answer": "A"},
      {"question": "Don't they do the dishes? (female) (Présent)", "options": ["Ne font-elles pas la vaisselle ?", "Ne font-ils pas la vaisselle ?", "Ne faites-vous pas la vaisselle ?", "Ne faisons-nous pas la vaisselle ?"], "answer": "A"}
    ],
    "passé_composé": [
      {"question": "I have done my homework. (Passé Composé)", "options": ["J'ai fait mes devoirs.", "Tu as fait tes devoirs.", "Il a fait ses devoirs.", "Nous avons fait nos devoirs."], "answer": "A"},
      {"question": "You have done the dishes. (informal) (Passé Composé)", "options": ["Tu as fait la vaisselle.", "J'ai fait la vaisselle.", "Il a fait la vaisselle.", "Vous avez fait la vaisselle."], "answer": "A"},
      {"question": "He has done the cooking. (Passé Composé)", "options": ["Il a fait la cuisine.", "Elle a fait la cuisine.", "Tu as fait la cuisine.", "Ils ont fait la cuisine."], "answer": "A"},
      {"question": "She has done the shopping. (Passé Composé)", "options": ["Elle a fait les courses.", "Il a fait les courses.", "Elles ont fait les courses.", "Tu as fait les courses."], "answer": "A"},
      {"question": "We have done sport. (Passé Composé)", "options": ["Nous avons fait du sport.", "Vous avez fait du sport.", "Ils ont fait du sport.", "J'ai fait du sport."], "answer": "A"},
      {"question": "You have done your work. (formal/plural) (Passé Composé)", "options": ["Vous avez fait votre travail.", "Tu as fait ton travail.", "Nous avons fait notre travail.", "Ils ont fait leur travail."], "answer": "A"},
      {"question": "They have done their homework. (male/mixed) (Passé Composé)", "options": ["Ils ont fait leurs devoirs.", "Elles ont fait leurs devoirs.", "Ils avaient fait leurs devoirs.", "Ils feront leurs devoirs."], "answer": "A"},
      {"question": "They have done the cleaning. (female) (Passé Composé)", "options": ["Elles ont fait le ménage.", "Ils ont fait le ménage.", "Elles avaient fait le ménage.", "Elles feront le ménage."], "answer": "A"},
      {"question": "Have I done it well? (Passé Composé)", "options": ["Ai-je bien fait ?", "As-tu bien fait ?", "A-t-il bien fait ?", "Avons-nous bien fait ?"], "answer": "A"},
      {"question": "Have you done it often? (informal) (Passé Composé)", "options": ["As-tu souvent fait ?", "Ai-je souvent fait ?", "A-t-il souvent fait ?", "Avez-vous souvent fait ?"], "answer": "A"},
      {"question": "Has he done the shopping? (Passé Composé)", "options": ["A-t-il fait les courses ?", "A-t-elle fait les courses ?", "Ai-je fait les courses ?", "As-tu fait les courses ?"], "answer": "A"},
      {"question": "Has she done sports? (Passé Composé)", "options": ["A-t-elle fait du sport ?", "A-t-il fait du sport ?", "As-tu fait du sport ?", "Avez-vous fait du sport ?"], "answer": "A"},
      {"question": "Have we done everything? (Passé Composé)", "options": ["Avons-nous tout fait ?", "Ai-je tout fait ?", "Avez-vous tout fait ?", "Ont-ils tout fait ?"], "answer": "A"},
      {"question": "Have you done enough? (formal/plural) (Passé Composé)", "options": ["Avez-vous fait assez ?", "As-tu fait assez ?", "Avons-nous fait assez ?", "Ont-ils fait assez ?"], "answer": "A"},
      {"question": "Have they done the cooking? (male/mixed) (Passé Composé)", "options": ["Ont-ils fait la cuisine ?", "Ont-elles fait la cuisine ?", "Avez-vous fait la cuisine ?", "As-tu fait la cuisine ?"], "answer": "A"},
      {"question": "Have they done the cooking? (female) (Passé Composé)", "options": ["Ont-elles fait la cuisine ?", "Ont-ils fait la cuisine ?", "Avez-vous fait la cuisine ?", "As-tu fait la cuisine ?"], "answer": "A"},
      {"question": "I have not done my homework. (Passé Composé)", "options": ["Je n'ai pas fait mes devoirs.", "Tu n'as pas fait mes devoirs.", "Il n'a pas fait mes devoirs.", "Nous n'avons pas fait mes devoirs."], "answer": "A"},
      {"question": "He has not done the cooking. (Passé Composé)", "options": ["Il n'a pas fait la cuisine.", "Je n'ai pas fait la cuisine.", "Tu n'as pas fait la cuisine.", "Ils n'ont pas fait la cuisine."], "answer": "A"},
      {"question": "Haven't we done enough? (Passé Composé)", "options": ["N'avons-nous pas fait assez ?", "N'avez-vous pas fait assez ?", "N'ont-ils pas fait assez ?", "N'ai-je pas fait assez ?"], "answer": "A"},
      {"question": "Haven't they done the dishes? (female) (Passé Composé)", "options": ["N'ont-elles pas fait la vaisselle ?", "N'ont-ils pas fait la vaisselle ?", "N'avez-vous pas fait la vaisselle ?", "N'avons-nous pas fait la vaisselle ?"], "answer": "A"}
    ],
    "futur_simple": [
      {"question": "I will do my homework. (Futur Simple)", "options": ["Je ferai mes devoirs.", "Tu feras tes devoirs.", "Il fera ses devoirs.", "Nous ferons nos devoirs."], "answer": "A"},
      {"question": "You will do the dishes. (informal) (Futur Simple)", "options": ["Tu feras la vaisselle.", "Je ferai la vaisselle.", "Il fera la vaisselle.", "Vous ferez la vaisselle."], "answer": "A"},
      {"question": "He will do the cooking. (Futur Simple)", "options": ["Il fera la cuisine.", "Elle fera la cuisine.", "Tu feras la cuisine.", "Ils feront la cuisine."], "answer": "A"},
      {"question": "She will do the shopping. (Futur Simple)", "options": ["Elle fera les courses.", "Il fera les courses.", "Elles feront les courses.", "Tu feras les courses."], "answer": "A"},
      {"question": "We will do sport. (Futur Simple)", "options": ["Nous ferons du sport.", "Vous ferez du sport.", "Ils feront du sport.", "Je ferai du sport."], "answer": "A"},
      {"question": "You will do your work. (formal/plural) (Futur Simple)", "options": ["Vous ferez votre travail.", "Tu feras ton travail.", "Nous ferons notre travail.", "Ils feront leur travail."], "answer": "A"},
      {"question": "They will do their homework. (male/mixed) (Futur Simple)", "options": ["Ils feront leurs devoirs.", "Elles feront leurs devoirs.", "Ils feraient leurs devoirs.", "Ils faisaient leurs devoirs."], "answer": "A"},
      {"question": "They will do the cleaning. (female) (Futur Simple)", "options": ["Elles feront le ménage.", "Ils feront le ménage.", "Elles feraient le ménage.", "Elles faisaient le ménage."], "answer": "A"},
      {"question": "Will I do it well? (Futur Simple)", "options": ["Ferai-je bien ?", "Feras-tu bien ?", "Fera-t-il bien ?", "Ferons-nous bien ?"], "answer": "A"},
      {"question": "Will you do it often? (informal) (Futur Simple)", "options": ["Feras-tu souvent ?", "Ferai-je souvent ?", "Fera-t-il souvent ?", "Ferez-vous souvent ?"], "answer": "A"},
      {"question": "Will he do the shopping? (Futur Simple)", "options": ["Fera-t-il les courses ?", "Fera-t-elle les courses ?", "Ferai-je les courses ?", "Feras-tu les courses ?"], "answer": "A"},
      {"question": "Will she do sports? (Futur Simple)", "options": ["Fera-t-elle du sport ?", "Fera-t-il du sport ?", "Feras-tu du sport ?", "Ferez-vous du sport ?"], "answer": "A"},
      {"question": "Will we do everything? (Futur Simple)", "options": ["Ferons-nous tout ?", "Ferai-je tout ?", "Ferez-vous tout ?", "Feront-ils tout ?"], "answer": "A"},
      {"question": "Will you do enough? (formal/plural) (Futur Simple)", "options": ["Ferez-vous assez ?", "Feras-tu assez ?", "Ferons-nous assez ?", "Feront-ils assez ?"], "answer": "A"},
      {"question": "Will they do the cooking? (male/mixed) (Futur Simple)", "options": ["Feront-ils la cuisine ?", "Feront-elles la cuisine ?", "Ferez-vous la cuisine ?", "Feras-tu la cuisine ?"], "answer": "A"},
      {"question": "Will they do the cooking? (female) (Futur Simple)", "options": ["Feront-elles la cuisine ?", "Feront-ils la cuisine ?", "Ferez-vous la cuisine ?", "Feras-tu la cuisine ?"], "answer": "A"},
      {"question": "I will not do my homework. (Futur Simple)", "options": ["Je ne ferai pas mes devoirs.", "Tu ne feras pas mes devoirs.", "Il ne fera pas mes devoirs.", "Nous ne ferons pas mes devoirs."], "answer": "A"},
      {"question": "He will not do the cooking. (Futur Simple)", "options": ["Il ne fera pas la cuisine.", "Je ne ferai pas la cuisine.", "Tu ne feras pas la cuisine.", "Ils ne feront pas la cuisine."], "answer": "A"},
      {"question": "Won't we do enough? (Futur Simple)", "options": ["Ne ferons-nous pas assez ?", "Ne ferez-vous pas assez ?", "Ne feront-ils pas assez ?", "Ne ferai-je pas assez ?"], "answer": "A"},
      {"question": "Won't they do the dishes? (female) (Futur Simple)", "options": ["Ne feront-elles pas la vaisselle ?", "Ne feront-ils pas la vaisselle ?", "Ne ferez-vous pas la vaisselle ?", "Ne ferons-nous pas la vaisselle ?"], "answer": "A"}
    ],
    "imparfait": [
      {"question": "I was doing my homework. (Imparfait)", "options": ["Je faisais mes devoirs.", "Tu faisais tes devoirs.", "Il faisait ses devoirs.", "Nous faisions nos devoirs."], "answer": "A"},
      {"question": "You were doing the dishes. (informal) (Imparfait)", "options": ["Tu faisais la vaisselle.", "Je faisais la vaisselle.", "Il faisait la vaisselle.", "Vous faisiez la vaisselle."], "answer": "A"},
      {"question": "He was doing the cooking. (Imparfait)", "options": ["Il faisait la cuisine.", "Elle faisait la cuisine.", "Tu faisais la cuisine.", "Ils faisaient la cuisine."], "answer": "A"},
      {"question": "She was doing the shopping. (Imparfait)", "options": ["Elle faisait les courses.", "Il faisait les courses.", "Elles faisaient les courses.", "Tu faisais les courses."], "answer": "A"},
      {"question": "We were doing sport. (Imparfait)", "options": ["Nous faisions du sport.", "Vous faisiez du sport.", "Ils faisaient du sport.", "Je faisais du sport."], "answer": "A"},
      {"question": "You were doing your work. (formal/plural) (Imparfait)", "options": ["Vous faisiez votre travail.", "Tu faisais ton travail.", "Nous faisions notre travail.", "Ils faisaient leur travail."], "answer": "A"},
      {"question": "They were doing their homework. (male/mixed) (Imparfait)", "options": ["Ils faisaient leurs devoirs.", "Elles faisaient leurs devoirs.", "Ils feront leurs devoirs.", "Ils feraient leurs devoirs."], "answer": "A"},
      {"question": "They were doing the cleaning. (female) (Imparfait)", "options": ["Elles faisaient le ménage.", "Ils faisaient le ménage.", "Elles feront le ménage.", "Elles feraient le ménage."], "answer": "A"},
      {"question": "Was I doing it well? (Imparfait)", "options": ["Est-ce que je faisais bien ?", "Faisais-tu bien ?", "Faisait-il bien ?", "Faisions-nous bien ?"], "answer": "A"},
      {"question": "Were you doing it often? (informal) (Imparfait)", "options": ["Faisais-tu souvent ?", "Faisais-je souvent ?", "Faisait-il souvent ?", "Faisiez-vous souvent ?"], "answer": "A"},
      {"question": "Was he doing the shopping? (Imparfait)", "options": ["Faisait-il les courses ?", "Faisait-elle les courses ?", "Faisais-je les courses ?", "Faisais-tu les courses ?"], "answer": "A"},
      {"question": "Was she doing sports? (Imparfait)", "options": ["Faisait-elle du sport ?", "Faisait-il du sport ?", "Faisais-tu du sport ?", "Faisiez-vous du sport ?"], "answer": "A"},
      {"question": "Were we doing everything? (Imparfait)", "options": ["Faisions-nous tout ?", "Faisais-je tout ?", "Faisiez-vous tout ?", "Faisaient-ils tout ?"], "answer": "A"},
      {"question": "Were you doing enough? (formal/plural) (Imparfait)", "options": ["Faisiez-vous assez ?", "Faisais-tu assez ?", "Faisions-nous assez ?", "Faisaient-ils assez ?"], "answer": "A"},
      {"question": "Were they doing the cooking? (male/mixed) (Imparfait)", "options": ["Faisaient-ils la cuisine ?", "Faisaient-elles la cuisine ?", "Faisiez-vous la cuisine ?", "Faisais-tu la cuisine ?"], "answer": "A"},
      {"question": "Were they doing the cooking? (female) (Imparfait)", "options": ["Faisaient-elles la cuisine ?", "Faisaient-ils la cuisine ?", "Faisiez-vous la cuisine ?", "Faisais-tu la cuisine ?"], "answer": "A"},
      {"question": "I was not doing my homework. (Imparfait)", "options": ["Je ne faisais pas mes devoirs.", "Tu ne faisais pas mes devoirs.", "Il ne faisait pas mes devoirs.", "Nous ne faisions pas mes devoirs."], "answer": "A"},
      {"question": "He was not doing the cooking. (Imparfait)", "options": ["Il ne faisait pas la cuisine.", "Je ne faisais pas la cuisine.", "Tu ne faisais pas la cuisine.", "Ils ne faisaient pas la cuisine."], "answer": "A"},
      {"question": "Weren't we doing enough? (Imparfait)", "options": ["Ne faisions-nous pas assez ?", "Ne faisiez-vous pas assez ?", "Ne faisaient-ils pas assez ?", "Ne faisais-je pas assez ?"], "answer": "A"},
      {"question": "Weren't they doing the dishes? (female) (Imparfait)", "options": ["Ne faisaient-elles pas la vaisselle ?", "Ne faisaient-ils pas la vaisselle ?", "Ne faisiez-vous pas la vaisselle ?", "Ne faisions-nous pas la vaisselle ?"], "answer": "A"}
    ]
  }

  // TODO: Continue adding other verbs (aller, voir, dire, pouvoir, vouloir, prendre, savoir, venir)
  // Each will have 4 tenses × 20 questions = 80 questions per verb
  // Total: 11 verbs × 80 questions = 880 questions
};

// Function to get random Intermediate questions for a specific verb and tense
export function getRandomIntermediateQuestions(verb: string, tense: string, count: number): IntermediateQuizQuestion[] {
  const verbData = INTERMEDIATE_QUIZ_DATA[verb];
  if (!verbData) {
    console.log(`⚠️  No Intermediate questions found for verb: ${verb}`);
    return [];
  }
  
  const questions = verbData[tense];
  if (!questions) {
    console.log(`⚠️  No Intermediate questions found for verb: ${verb}, tense: ${tense}`);
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

// Convert Intermediate quiz data to the format expected by the quiz generator
export function convertIntermediateToQuizFormat(intermediateQuestions: IntermediateQuizQuestion[]): any[] {
  return intermediateQuestions.map(q => {
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