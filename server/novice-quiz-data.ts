// Novice Level Full-Sentence Quiz Data
// Corrected and validated content from user
// Verbs: aller, faire, avoir, être (4 verbs)
// Tenses: Présent, Passé Composé, Futur Simple (3 tenses each)
// 20 questions per verb per tense = 240 total questions
// Enhanced full-sentence approach with context

export interface NoviceQuizQuestion {
  question: string;
  options: string[];
  answer: string; // A, B, C, or D
}

export const NOVICE_QUIZ_DATA: Record<string, Record<string, NoviceQuizQuestion[]>> = {
  "aller": {
    "present": [
      // Positive statements (8 questions)
      {"question": "I go to school / I am going to school", "options": ["Tu vas à l'école", "Je vais à l'école", "Il va à l'école", "Nous allons à l'école"], "answer": "B"},
      {"question": "You go to the park / You are going to the park (informal)", "options": ["Je vais au parc", "Vous allez au parc", "Tu vas au parc", "Ils vont au parc"], "answer": "C"},
      {"question": "He goes to the market / He is going to the market", "options": ["Elle va au marché", "Tu vas au marché", "Ils vont au marché", "Il va au marché"], "answer": "D"},
      {"question": "She goes to the store / She is going to the store", "options": ["Il va au magasin", "Elle va au magasin", "Elles vont au magasin", "Tu vas au magasin"], "answer": "B"},
      {"question": "We go to the cinema / We are going to the cinema", "options": ["Vous allez au cinéma", "Ils vont au cinéma", "Je vais au cinéma", "Nous allons au cinéma"], "answer": "D"},
      {"question": "You go to the party / You are going to the party (formal / plural)", "options": ["Tu vas à la fête", "Nous allons à la fête", "Vous allez à la fête", "Ils vont à la fête"], "answer": "C"},
      {"question": "They go to the museum / They are going to the museum (male / mixed)", "options": ["Elles vont au musée", "Ils étaient au musée", "Ils iront au musée", "Ils vont au musée"], "answer": "D"},
      {"question": "They go to the museum / They are going to the museum (female)", "options": ["Ils vont au musée", "Elles étaient au musée", "Elles iront au musée", "Elles vont au musée"], "answer": "D"},

      // Negative statements (6 questions)
      {"question": "I do not go to school / I am not going to school", "options": ["Tu ne vas pas à l'école", "Il ne va pas à l'école", "Je ne vais pas à l'école", "Nous n'allons pas à l'école"], "answer": "C"},
      {"question": "You do not go to the park / You are not going to the park (informal)", "options": ["Je ne vais pas au parc", "Tu ne vas pas au parc", "Vous n'allez pas au parc", "Ils ne vont pas au parc"], "answer": "B"},
      {"question": "He does not go to the market / He is not going to the market", "options": ["Elle ne va pas au marché", "Tu ne vas pas au marché", "Ils ne vont pas au marché", "Il ne va pas au marché"], "answer": "D"},
      {"question": "She does not go to the store / She is not going to the store", "options": ["Il ne va pas au magasin", "Elle ne va pas au magasin", "Elles ne vont pas au magasin", "Tu ne vas pas au magasin"], "answer": "B"},
      {"question": "We do not go to the cinema / We are not going to the cinema", "options": ["Vous n'allez pas au cinéma", "Ils ne vont pas au cinéma", "Je ne vais pas au cinéma", "Nous n'allons pas au cinéma"], "answer": "D"},
      {"question": "You do not go to the party / You are not going to the party (formal / plural)", "options": ["Tu ne vas pas à la fête", "Vous n'allez pas à la fête", "Nous n'allons pas à la fête", "Ils ne vont pas à la fête"], "answer": "B"},

      // Positive questions (3 questions)
      {"question": "Do I go to school / Am I going to school?", "options": ["Vas-tu à l'école ?", "Va-t-il à l'école ?", "Vais-je à l'école ?", "Allons-nous à l'école ?"], "answer": "C"},
      {"question": "Do you go to the park / Are you going to the park? (informal)", "options": ["Vais-je au parc ?", "Vas-tu au parc ?", "Va-t-il au parc ?", "Allez-vous au parc ?"], "answer": "B"},
      {"question": "Does he go to the market / Is he going to the market?", "options": ["Va-t-elle au marché ?", "Vais-je au marché ?", "Vas-tu au marché ?", "Va-t-il au marché ?"], "answer": "D"},

      // Negative questions (3 questions)
      {"question": "Don't I go to school / Am I not going to school?", "options": ["Ne vas-tu pas à l'école ?", "Ne va-t-il pas à l'école ?", "N'allons-nous pas à l'école ?", "Ne vais-je pas à l'école ?"], "answer": "D"},
      {"question": "Don't you go to the park / Are you not going to the park? (informal)", "options": ["Ne vais-je pas au parc ?", "Ne vas-tu pas au parc ?", "Ne va-t-il pas au parc ?", "N'allez-vous pas au parc ?"], "answer": "B"},
      {"question": "Doesn't he go to the market / Is he not going to the market?", "options": ["Ne va-t-elle pas au marché ?", "Ne vais-je pas au marché ?", "Ne vas-tu pas au marché ?", "Ne va-t-il pas au marché ?"], "answer": "D"}
    ],
    "passé_composé": [
      // Positive statements (8 questions)
      {"question": "I went to school / I have gone to school", "options": ["Tu es allé à l'école", "Je suis allé à l'école", "Il est allé à l'école", "Nous sommes allés à l'école"], "answer": "B"},
      {"question": "You went to the park / You have gone to the park (informal)", "options": ["Je suis allé au parc", "Vous êtes allés au parc", "Tu es allé au parc", "Ils sont allés au parc"], "answer": "C"},
      {"question": "He went to the market / He has gone to the market", "options": ["Elle est allée au marché", "Tu es allé au marché", "Ils sont allés au marché", "Il est allé au marché"], "answer": "D"},
      {"question": "She went to the store / She has gone to the store", "options": ["Il est allé au magasin", "Elle est allée au magasin", "Elles sont allées au magasin", "Tu es allé au magasin"], "answer": "B"},
      {"question": "We went to the cinema / We have gone to the cinema", "options": ["Vous êtes allés au cinéma", "Ils sont allés au cinéma", "Je suis allé au cinéma", "Nous sommes allés au cinéma"], "answer": "D"},
      {"question": "You went to the party / You have gone to the party (formal / plural)", "options": ["Tu es allé à la fête", "Nous sommes allés à la fête", "Vous êtes allés à la fête", "Ils sont allés à la fête"], "answer": "C"},
      {"question": "They went to the museum / They have gone to the museum (male / mixed)", "options": ["Elles sont allées au musée", "Ils étaient au musée", "Ils iront au musée", "Ils sont allés au musée"], "answer": "D"},
      {"question": "They went to the museum / They have gone to the museum (female)", "options": ["Ils sont allés au musée", "Elles étaient au musée", "Elles iront au musée", "Elles sont allées au musée"], "answer": "D"},

      // Negative statements (6 questions)
      {"question": "I did not go to school / I have not gone to school", "options": ["Tu n'es pas allé à l'école", "Il n'est pas allé à l'école", "Je ne suis pas allé à l'école", "Nous ne sommes pas allés à l'école"], "answer": "C"},
      {"question": "You did not go to the park / You have not gone to the park (informal)", "options": ["Je ne suis pas allé au parc", "Tu n'es pas allé au parc", "Vous n'êtes pas allés au parc", "Ils ne sont pas allés au parc"], "answer": "B"},
      {"question": "He did not go to the market / He has not gone to the market", "options": ["Elle n'est pas allée au marché", "Tu n'es pas allé au marché", "Ils ne sont pas allés au marché", "Il n'est pas allé au marché"], "answer": "D"},
      {"question": "She did not go to the store / She has not gone to the store", "options": ["Il n'est pas allé au magasin", "Elle n'est pas allée au magasin", "Elles ne sont pas allées au magasin", "Tu n'es pas allé au magasin"], "answer": "B"},
      {"question": "We did not go to the cinema / We have not gone to the cinema", "options": ["Vous n'êtes pas allés au cinéma", "Ils ne sont pas allés au cinéma", "Je ne suis pas allé au cinéma", "Nous ne sommes pas allés au cinéma"], "answer": "D"},
      {"question": "You did not go to the party / You have not gone to the party (formal / plural)", "options": ["Tu n'es pas allé à la fête", "Vous n'êtes pas allés à la fête", "Nous ne sommes pas allés à la fête", "Ils ne sont pas allés à la fête"], "answer": "B"},

      // Positive questions (3 questions)
      {"question": "Did I go to school? / Have I gone to school?", "options": ["Es-tu allé à l'école ?", "Est-il allé à l'école ?", "Suis-je allé à l'école ?", "Sommes-nous allés à l'école ?"], "answer": "C"},
      {"question": "Did you go to the park? / Have you gone to the park? (informal)", "options": ["Suis-je allé au parc ?", "Es-tu allé au parc ?", "Est-il allé au parc ?", "Êtes-vous allés au parc ?"], "answer": "B"},
      {"question": "Did he go to the market? / Has he gone to the market?", "options": ["Est-elle allée au marché ?", "Suis-je allé au marché ?", "Es-tu allé au marché ?", "Est-il allé au marché ?"], "answer": "D"},

      // Negative questions (3 questions)
      {"question": "Didn't I go to school? / Haven't I gone to school?", "options": ["N'es-tu pas allé à l'école ?", "N'est-il pas allé à l'école ?", "Ne sommes-nous pas allés à l'école ?", "Ne suis-je pas allé à l'école ?"], "answer": "D"},
      {"question": "Didn't you go to the park? / Haven't you gone to the park? (informal)", "options": ["Ne suis-je pas allé au parc ?", "N'es-tu pas allé au parc ?", "N'est-il pas allé au parc ?", "N'êtes-vous pas allés au parc ?"], "answer": "B"},
      {"question": "Didn't he go to the market? / Hasn't he gone to the market?", "options": ["N'est-elle pas allée au marché ?", "Ne suis-je pas allé au marché ?", "N'es-tu pas allé au marché ?", "N'est-il pas allé au marché ?"], "answer": "D"}
    ],
    "futur_simple": [
      {"question": "I will go to the beach. (Futur Simple)", "options": ["J'irai à la plage.", "Tu iras à la plage.", "Il ira à la plage.", "Nous irons à la plage."], "answer": "A"},
      {"question": "You will not go to the party. (Futur Simple - Negative, informal)", "options": ["Tu n'iras pas à la fête.", "Je n'irai pas à la fête.", "Il n'ira pas à la fête.", "Nous n'irons pas à la fête."], "answer": "A"},
      {"question": "Will he go to the market? (Futur Simple - Question)", "options": ["Ira-t-il au marché ?", "Iras-tu au marché ?", "Irai-je au marché ?", "Irons-nous au marché ?"], "answer": "A"},
      {"question": "We will go to school tomorrow. (Futur Simple)", "options": ["Nous irons à l'école demain.", "Vous irez à l'école demain.", "Ils iront à l'école demain.", "Je irai à l'école demain."], "answer": "A"},
      {"question": "She will not go to work. (Futur Simple - Negative)", "options": ["Elle n'ira pas au travail.", "Il n'ira pas au travail.", "Tu n'iras pas au travail.", "Nous n'irons pas au travail."], "answer": "A"},
      {"question": "Will you come with me? (Futur Simple - Question, formal/plural)", "options": ["Irez-vous avec moi ?", "Iras-tu avec moi ?", "Ira-t-il avec moi ?", "Irons-nous avec moi ?"], "answer": "A"},
      {"question": "They will go to the cinema for sure. (Futur Simple, male/mixed)", "options": ["Ils iront au cinéma sûrement.", "Elles iront au cinéma sûrement.", "Ils iraient au cinéma sûrement.", "Ils allaient au cinéma sûrement."], "answer": "A"},
      {"question": "I will not go to the city tomorrow. (Futur Simple - Negative)", "options": ["Je n'irai pas en ville demain.", "Tu n'iras pas en ville demain.", "Il n'ira pas en ville demain.", "Nous n'irons pas en ville demain."], "answer": "A"},
      {"question": "Will we go together? (Futur Simple - Question)", "options": ["Irons-nous ensemble ?", "Irai-je ensemble ?", "Irez-vous ensemble ?", "Iront-ils ensemble ?"], "answer": "A"},
      {"question": "You will go to the museum. (Futur Simple, informal)", "options": ["Tu iras au musée.", "Je irai au musée.", "Il ira au musée.", "Vous irez au musée."], "answer": "A"},
      {"question": "I will go to the market next week. (Futur Simple)", "options": ["J'irai au marché la semaine prochaine.", "Tu iras au marché la semaine prochaine.", "Il ira au marché la semaine prochaine.", "Nous irons au marché la semaine prochaine."], "answer": "A"},
      {"question": "She will not go to school tomorrow. (Futur Simple - Negative)", "options": ["Elle n'ira pas à l'école demain.", "Il n'ira pas à l'école demain.", "Tu n'iras pas à l'école demain.", "Nous n'irons pas à l'école demain."], "answer": "A"},
      {"question": "Will you (informal) go to the party? (Futur Simple - Question)", "options": ["Iras-tu à la fête ?", "Irai-je à la fête ?", "Ira-t-il à la fête ?", "Irez-vous à la fête ?"], "answer": "A"},
      {"question": "We will go by car next month. (Futur Simple)", "options": ["Nous irons en voiture le mois prochain.", "Vous irez en voiture le mois prochain.", "Ils iront en voiture le mois prochain.", "Je irai en voiture le mois prochain."], "answer": "A"},
      {"question": "He will not go to the gym tomorrow. (Futur Simple - Negative)", "options": ["Il n'ira pas au gymnase demain.", "Je n'irai pas au gymnase demain.", "Tu n'iras pas au gymnase demain.", "Ils n'iront pas au gymnase demain."], "answer": "A"},
      {"question": "Will they go to the library next week? (Futur Simple - Question, male/mixed)", "options": ["Iront-ils à la bibliothèque la semaine prochaine ?", "Iront-elles à la bibliothèque la semaine prochaine ?", "Irez-vous à la bibliothèque la semaine prochaine ?", "Iras-tu à la bibliothèque la semaine prochaine ?"], "answer": "A"},
      {"question": "I will not go to the cinema next weekend. (Futur Simple - Negative)", "options": ["Je n'irai pas au cinéma le week-end prochain.", "Tu n'iras pas au cinéma le week-end prochain.", "Il n'ira pas au cinéma le week-end prochain.", "Nous n'irons pas au cinéma le week-end prochain."], "answer": "A"},
      {"question": "Will we go to the stadium tomorrow? (Futur Simple - Question)", "options": ["Irons-nous au stade demain ?", "Irai-je au stade demain ?", "Irez-vous au stade demain ?", "Iront-ils au stade demain ?"], "answer": "A"},
      {"question": "You will go to the restaurant next Friday. (Futur Simple, informal)", "options": ["Tu iras au restaurant vendredi prochain.", "Je irai au restaurant vendredi prochain.", "Il ira au restaurant vendredi prochain.", "Vous irez au restaurant vendredi prochain."], "answer": "A"},
      {"question": "We will go to the concert tomorrow evening. (Futur Simple)", "options": ["Nous irons au concert demain soir.", "Vous irez au concert demain soir.", "Ils iront au concert demain soir.", "Je irai au concert demain soir."], "answer": "A"}
    ]
  },
  
  "être": {
    "present": [
      // Positive statements (8 questions)
      {"question": "I am happy", "options": ["Tu es heureux", "Je suis heureux", "Il est heureux", "Nous sommes heureux"], "answer": "B"},
      {"question": "You are ready (informal)", "options": ["Je suis prêt", "Vous êtes prêts", "Tu es prêt", "Ils sont prêts"], "answer": "C"},
      {"question": "He is tired / He is feeling tired", "options": ["Elle est fatiguée", "Tu es fatigué", "Ils sont fatigués", "Il est fatigué"], "answer": "D"},
      {"question": "She is late", "options": ["Il est en retard", "Elle est en retard", "Elles sont en retard", "Tu es en retard"], "answer": "B"},
      {"question": "We are happy", "options": ["Vous êtes heureux", "Ils sont heureux", "Je suis heureux", "Nous sommes heureux"], "answer": "D"},
      {"question": "You are kind (formal / plural)", "options": ["Tu es gentil", "Nous sommes gentils", "Vous êtes gentils", "Ils sont gentils"], "answer": "C"},
      {"question": "They are teachers (male / mixed)", "options": ["Elles sont professeures", "Ils étaient professeurs", "Ils seront professeurs", "Ils sont professeurs"], "answer": "D"},
      {"question": "They are friends (female)", "options": ["Ils sont amis", "Elles sont amies", "Elles étaient amies", "Elles seront amies"], "answer": "B"},

      // Negative statements (6 questions)
      {"question": "I am not tired", "options": ["Tu n'es pas fatigué", "Il n'est pas fatigué", "Je ne suis pas fatigué", "Nous ne sommes pas fatigués"], "answer": "C"},
      {"question": "You are not late (informal)", "options": ["Je ne suis pas en retard", "Tu n'es pas en retard", "Vous n'êtes pas en retard", "Ils ne sont pas en retard"], "answer": "B"},
      {"question": "He is not ready", "options": ["Elle n'est pas prête", "Tu n'es pas prêt", "Ils ne sont pas prêts", "Il n'est pas prêt"], "answer": "D"},
      {"question": "She is not kind", "options": ["Il n'est pas gentil", "Elle n'est pas gentille", "Elles ne sont pas gentilles", "Tu n'es pas gentil"], "answer": "B"},
      {"question": "We are not happy", "options": ["Vous n'êtes pas heureux", "Ils ne sont pas heureux", "Je ne suis pas heureux", "Nous ne sommes pas heureux"], "answer": "D"},
      {"question": "You are not teachers (formal / plural)", "options": ["Tu n'es pas professeur", "Vous n'êtes pas professeurs", "Nous ne sommes pas professeurs", "Ils ne sont pas professeurs"], "answer": "B"},

      // Positive questions (3 questions)
      {"question": "Am I happy?", "options": ["Es-tu heureux ?", "Est-il heureux ?", "Suis-je heureux ?", "Sommes-nous heureux ?"], "answer": "C"},
      {"question": "Are you ready? (informal)", "options": ["Suis-je prêt ?", "Es-tu prêt ?", "Est-il prêt ?", "Êtes-vous prêts ?"], "answer": "B"},
      {"question": "Is he tired / Is he feeling tired?", "options": ["Est-elle fatiguée ?", "Suis-je fatigué ?", "Es-tu fatigué ?", "Est-il fatigué ?"], "answer": "D"},

      // Negative questions (3 questions)
      {"question": "Aren't I happy?", "options": ["N'es-tu pas heureux ?", "N'est-il pas heureux ?", "Ne sommes-nous pas heureux ?", "Ne suis-je pas heureux ?"], "answer": "D"},
      {"question": "Aren't you late? (informal)", "options": ["Ne suis-je pas en retard ?", "N'es-tu pas en retard ?", "N'est-il pas en retard ?", "N'êtes-vous pas en retard ?"], "answer": "B"},
      {"question": "Isn't he kind?", "options": ["N'est-elle pas gentille ?", "Ne suis-je pas gentil ?", "N'est-il pas gentil ?", "N'es-tu pas gentil ?"], "answer": "C"}
    ],
    "passé_composé": [
      // Positive statements (8 questions)
      {"question": "I have been happy / I was happy", "options": ["Tu as été heureux", "J'ai été heureux", "Il a été heureux", "Nous avons été heureux"], "answer": "B"},
      {"question": "You have been ready / You were ready (informal)", "options": ["J'ai été prêt", "Vous avez été prêts", "Tu as été prêt", "Ils ont été prêts"], "answer": "C"},
      {"question": "He has been tired / He was tired", "options": ["Elle a été fatiguée", "Tu as été fatigué", "Ils ont été fatigués", "Il a été fatigué"], "answer": "D"},
      {"question": "She has been late / She was late", "options": ["Il a été en retard", "Elle a été en retard", "Elles ont été en retard", "Tu as été en retard"], "answer": "B"},
      {"question": "We have been happy / We were happy", "options": ["Vous avez été heureux", "Ils ont été heureux", "J'ai été heureux", "Nous avons été heureux"], "answer": "D"},
      {"question": "You have been kind / You were kind (formal / plural)", "options": ["Tu as été gentil", "Nous avons été gentils", "Vous avez été gentils", "Ils ont été gentils"], "answer": "C"},
      {"question": "They have been teachers / They were teachers (male / mixed)", "options": ["Elles ont été professeures", "Ils étaient professeurs", "Ils seront professeurs", "Ils ont été professeurs"], "answer": "D"},
      {"question": "They have been friends / They were friends (female)", "options": ["Ils ont été amis", "Elles ont été amies", "Elles étaient amies", "Elles seront amies"], "answer": "B"},

      // Negative statements (6 questions)
      {"question": "I have not been tired / I was not tired", "options": ["Tu n'as pas été fatigué", "Il n'a pas été fatigué", "Je n'ai pas été fatigué", "Nous n'avons pas été fatigués"], "answer": "C"},
      {"question": "You have not been late / You were not late (informal)", "options": ["Je n'ai pas été en retard", "Tu n'as pas été en retard", "Vous n'avez pas été en retard", "Ils n'ont pas été en retard"], "answer": "B"},
      {"question": "He has not been ready / He was not ready", "options": ["Elle n'a pas été prête", "Tu n'as pas été prêt", "Ils n'ont pas été prêts", "Il n'a pas été prêt"], "answer": "D"},
      {"question": "She has not been kind / She was not kind", "options": ["Il n'a pas été gentil", "Elle n'a pas été gentille", "Elles n'ont pas été gentilles", "Tu n'as pas été gentil"], "answer": "B"},
      {"question": "We have not been happy / We were not happy", "options": ["Vous n'avez pas été heureux", "Ils n'ont pas été heureux", "Je n'ai pas été heureux", "Nous n'avons pas été heureux"], "answer": "D"},
      {"question": "You have not been teachers / You were not teachers (formal / plural)", "options": ["Tu n'as pas été professeur", "Vous n'avez pas été professeurs", "Nous n'avons pas été professeurs", "Ils n'ont pas été professeurs"], "answer": "B"},

      // Positive questions (3 questions)
      {"question": "Have I been happy? / Was I happy?", "options": ["As-tu été heureux ?", "A-t-il été heureux ?", "Ai-je été heureux ?", "Avons-nous été heureux ?"], "answer": "C"},
      {"question": "Have you been ready? / Were you ready? (informal)", "options": ["Ai-je été prêt ?", "As-tu été prêt ?", "A-t-il été prêt ?", "Avez-vous été prêts ?"], "answer": "B"},
      {"question": "Has he been tired? / Was he tired?", "options": ["A-t-elle été fatiguée ?", "Ai-je été fatigué ?", "As-tu été fatigué ?", "A-t-il été fatigué ?"], "answer": "D"},

      // Negative questions (3 questions)
      {"question": "Haven't I been happy? / Wasn't I happy?", "options": ["N'as-tu pas été heureux ?", "N'a-t-il pas été heureux ?", "N'avons-nous pas été heureux ?", "N'ai-je pas été heureux ?"], "answer": "D"},
      {"question": "Haven't you been late? / Weren't you late? (informal)", "options": ["N'ai-je pas été en retard ?", "N'as-tu pas été en retard ?", "N'a-t-il pas été en retard ?", "N'avez-vous pas été en retard ?"], "answer": "B"},
      {"question": "Hasn't he been kind? / Wasn't he kind?", "options": ["N'a-t-elle pas été gentille ?", "N'ai-je pas été gentil ?", "N'a-t-il pas été gentil ?", "N'as-tu pas été gentil ?"], "answer": "C"}
    ],
    "futur_simple": [
      // Positive statements (8 questions)
      {"question": "I will be / I shall be happy", "options": ["Tu seras heureux", "Je serai heureux", "Il sera heureux", "Nous serons heureux"], "answer": "B"},
      {"question": "You will be / You shall be ready (informal)", "options": ["Je serai prêt", "Vous serez prêts", "Tu seras prêt", "Ils seront prêts"], "answer": "C"},
      {"question": "He will be / He shall be tired", "options": ["Elle sera fatiguée", "Tu seras fatigué", "Ils seront fatigués", "Il sera fatigué"], "answer": "D"},
      {"question": "She will be / She shall be late", "options": ["Il sera en retard", "Elle sera en retard", "Elles seront en retard", "Tu seras en retard"], "answer": "B"},
      {"question": "We will be / We shall be happy", "options": ["Vous serez heureux", "Ils seront heureux", "Je serai heureux", "Nous serons heureux"], "answer": "D"},
      {"question": "You will be / You shall be kind (formal / plural)", "options": ["Tu seras gentil", "Nous serons gentils", "Vous serez gentils", "Ils seront gentils"], "answer": "C"},
      {"question": "They will be / They shall be teachers (male / mixed)", "options": ["Elles seront professeures", "Ils étaient professeurs", "Ils seront professeurs", "Ils seront professeurs"], "answer": "D"},
      {"question": "They will be / They shall be friends (female)", "options": ["Ils seront amis", "Elles seront amies", "Elles étaient amies", "Elles seront amies"], "answer": "B"},

      // Negative statements (6 questions)
      {"question": "I will not be / I shall not be tired", "options": ["Tu ne seras pas fatigué", "Il ne sera pas fatigué", "Je ne serai pas fatigué", "Nous ne serons pas fatigués"], "answer": "C"},
      {"question": "You will not be / You shall not be late (informal)", "options": ["Je ne serai pas en retard", "Tu ne seras pas en retard", "Vous ne serez pas en retard", "Ils ne seront pas en retard"], "answer": "B"},
      {"question": "He will not be / He shall not be ready", "options": ["Elle ne sera pas prête", "Tu ne seras pas prêt", "Ils ne seront pas prêts", "Il ne sera pas prêt"], "answer": "D"},
      {"question": "She will not be / She shall not be kind", "options": ["Il ne sera pas gentil", "Elle ne sera pas gentille", "Elles ne seront pas gentilles", "Tu ne seras pas gentil"], "answer": "B"},
      {"question": "We will not be / We shall not be happy", "options": ["Vous ne serez pas heureux", "Ils ne seront pas heureux", "Je ne serai pas heureux", "Nous ne serons pas heureux"], "answer": "D"},
      {"question": "You will not be / You shall not be teachers (formal / plural)", "options": ["Tu ne seras pas professeur", "Vous ne serez pas professeurs", "Nous ne serons pas professeurs", "Ils ne seront pas professeurs"], "answer": "B"},

      // Positive questions (3 questions)
      {"question": "Will I be happy?", "options": ["Seras-tu heureux ?", "Sera-t-il heureux ?", "Serai-je heureux ?", "Serons-nous heureux ?"], "answer": "C"},
      {"question": "Will you be ready? (informal)", "options": ["Serai-je prêt ?", "Seras-tu prêt ?", "Sera-t-il prêt ?", "Serez-vous prêts ?"], "answer": "B"},
      {"question": "Will he be tired?", "options": ["Sera-t-elle fatiguée ?", "Serai-je fatigué ?", "Seras-tu fatigué ?", "Sera-t-il fatigué ?"], "answer": "D"},

      // Negative questions (3 questions)
      {"question": "Won't I be happy?", "options": ["Ne seras-tu pas heureux ?", "Ne sera-t-il pas heureux ?", "Ne serons-nous pas heureux ?", "Ne serai-je pas heureux ?"], "answer": "D"},
      {"question": "Won't you be late? (informal)", "options": ["Ne serai-je pas en retard ?", "Ne seras-tu pas en retard ?", "Ne sera-t-il pas en retard ?", "Ne serez-vous pas en retard ?"], "answer": "B"},
      {"question": "Won't he be kind?", "options": ["Ne sera-t-elle pas gentille ?", "Ne serai-je pas gentil ?", "Ne sera-t-il pas gentil ?", "Ne seras-tu pas gentil ?"], "answer": "C"}
    ]
  },

  "faire": {
    "present": [
      {"question": "I do / I am doing my homework. (Présent)", "options": ["Je fais mes devoirs.", "Tu fais tes devoirs.", "Il fait ses devoirs.", "Nous faisons nos devoirs."], "answer": "A"},
      {"question": "You are not doing the dishes. (Présent - Negative, informal)", "options": ["Tu ne fais pas la vaisselle.", "Je ne fais pas la vaisselle.", "Il ne fait pas la vaisselle.", "Nous ne faisons pas la vaisselle."], "answer": "A"},
      {"question": "Is he doing the cooking? (Présent - Question)", "options": ["Fait-il la cuisine ?", "Fais-tu la cuisine ?", "Fait-elle la cuisine ?", "Font-ils la cuisine ?"], "answer": "A"},
      {"question": "We do / we are doing sports every day. (Présent)", "options": ["Nous faisons du sport tous les jours.", "Vous faites du sport tous les jours.", "Ils font du sport tous les jours.", "Je fais du sport tous les jours."], "answer": "A"},
      {"question": "She is not doing the shopping today. (Présent - Negative)", "options": ["Elle ne fait pas les courses aujourd'hui.", "Il ne fait pas les courses aujourd'hui.", "Tu ne fais pas les courses aujourd'hui.", "Nous ne faisons pas les courses aujourd'hui."], "answer": "A"},
      {"question": "Are you (formal) doing your work? (Présent - Question)", "options": ["Faites-vous votre travail ?", "Fais-tu ton travail ?", "Fait-il son travail ?", "Font-ils leur travail ?"], "answer": "A"},
      {"question": "They are doing their homework. (Présent, male/mixed)", "options": ["Ils font leurs devoirs.", "Elles font leurs devoirs.", "Ils faisaient leurs devoirs.", "Ils feront leurs devoirs."], "answer": "A"},
      {"question": "I am not doing the cleaning. (Présent - Negative)", "options": ["Je ne fais pas le ménage.", "Tu ne fais pas le ménage.", "Il ne fait pas le ménage.", "Nous ne faisons pas le ménage."], "answer": "A"},
      {"question": "Are we doing enough? (Présent - Question)", "options": ["Faisons-nous assez ?", "Faites-vous assez ?", "Font-ils assez ?", "Fais-je assez ?"], "answer": "A"},
      {"question": "You do a good job. (Présent, informal)", "options": ["Tu fais un bon travail.", "Je fais un bon travail.", "Il fait un bon travail.", "Vous faites un bon travail."], "answer": "A"},
      {"question": "I do / I am doing exercise every morning. (Présent)", "options": ["Je fais de l'exercice tous les matins.", "Tu fais de l'exercice tous les matins.", "Il fait de l'exercice tous les matins.", "Nous faisons de l'exercice tous les matins."], "answer": "A"},
      {"question": "She is not doing her project. (Présent - Negative)", "options": ["Elle ne fait pas son projet.", "Il ne fait pas son projet.", "Tu ne fais pas ton projet.", "Nous ne faisons pas notre projet."], "answer": "A"},
      {"question": "Are you doing well? (Présent - Question, informal)", "options": ["Fais-tu bien ?", "Fait-il bien ?", "Faisons-nous bien ?", "Font-ils bien ?"], "answer": "A"},
      {"question": "We are doing our best. (Présent)", "options": ["Nous faisons de notre mieux.", "Vous faites de votre mieux.", "Ils font de leur mieux.", "Je fais de mon mieux."], "answer": "A"},
      {"question": "He is not doing the laundry. (Présent - Negative)", "options": ["Il ne fait pas la lessive.", "Je ne fais pas la lessive.", "Tu ne fais pas la lessive.", "Ils ne font pas la lessive."], "answer": "A"},
      {"question": "Are they doing the work? (Présent - Question, male/mixed)", "options": ["Font-ils le travail ?", "Font-elles le travail ?", "Faites-vous le travail ?", "Fais-tu le travail ?"], "answer": "A"},
      {"question": "I am not doing mistakes. (Présent - Negative)", "options": ["Je ne fais pas d'erreurs.", "Tu ne fais pas d'erreurs.", "Il ne fait pas d'erreurs.", "Nous ne faisons pas d'erreurs."], "answer": "A"},
      {"question": "Are we doing the right thing? (Présent - Question)", "options": ["Faisons-nous la bonne chose ?", "Faites-vous la bonne chose ?", "Font-ils la bonne chose ?", "Fais-je la bonne chose ?"], "answer": "A"},
      {"question": "You are doing great work. (Présent, informal)", "options": ["Tu fais un excellent travail.", "Je fais un excellent travail.", "Il fait un excellent travail.", "Vous faites un excellent travail."], "answer": "A"},
      {"question": "They are not doing their duty. (Présent - Negative, female)", "options": ["Elles ne font pas leur devoir.", "Ils ne font pas leur devoir.", "Vous ne faites pas votre devoir.", "Nous ne faisons pas notre devoir."], "answer": "A"}
    ],
    "passé_composé": [
      {"question": "I did / I have done my homework. (Passé Composé)", "options": ["J'ai fait mes devoirs.", "Tu as fait tes devoirs.", "Il a fait ses devoirs.", "Nous avons fait nos devoirs."], "answer": "A"},
      {"question": "You did not do the dishes. (Passé Composé - Negative, informal)", "options": ["Tu n'as pas fait la vaisselle.", "Je n'ai pas fait la vaisselle.", "Il n'a pas fait la vaisselle.", "Nous n'avons pas fait la vaisselle."], "answer": "A"},
      {"question": "Did he do the cooking? (Passé Composé - Question)", "options": ["A-t-il fait la cuisine ?", "As-tu fait la cuisine ?", "Ai-je fait la cuisine ?", "Avez-vous fait la cuisine ?"], "answer": "A"},
      {"question": "We did sport yesterday. (Passé Composé)", "options": ["Nous avons fait du sport hier.", "Vous avez fait du sport hier.", "Ils ont fait du sport hier.", "J'ai fait du sport hier."], "answer": "A"},
      {"question": "She did not do the shopping. (Passé Composé - Negative)", "options": ["Elle n'a pas fait les courses.", "Il n'a pas fait les courses.", "Tu n'as pas fait les courses.", "Nous n'avons pas fait les courses."], "answer": "A"},
      {"question": "Did you (formal) do your work? (Passé Composé - Question)", "options": ["Avez-vous fait votre travail ?", "As-tu fait ton travail ?", "A-t-il fait son travail ?", "Ont-ils fait leur travail ?"], "answer": "A"},
      {"question": "They did their homework. (Passé Composé, male/mixed)", "options": ["Ils ont fait leurs devoirs.", "Elles ont fait leurs devoirs.", "Ils avaient fait leurs devoirs.", "Ils feront leurs devoirs."], "answer": "A"},
      {"question": "I did not do the cleaning. (Passé Composé - Negative)", "options": ["Je n'ai pas fait le ménage.", "Tu n'as pas fait le ménage.", "Il n'a pas fait le ménage.", "Nous n'avons pas fait le ménage."], "answer": "A"},
      {"question": "Did we do everything? (Passé Composé - Question)", "options": ["Avons-nous tout fait ?", "Ai-je tout fait ?", "Avez-vous tout fait ?", "Ont-ils tout fait ?"], "answer": "A"},
      {"question": "You did a great job. (Passé Composé, informal)", "options": ["Tu as fait un excellent travail.", "J'ai fait un excellent travail.", "Il a fait un excellent travail.", "Vous avez fait un excellent travail."], "answer": "A"},
      {"question": "I did exercise this morning. (Passé Composé)", "options": ["J'ai fait de l'exercice ce matin.", "Tu as fait de l'exercice ce matin.", "Il a fait de l'exercice ce matin.", "Nous avons fait de l'exercice ce matin."], "answer": "A"},
      {"question": "She did not do her project. (Passé Composé - Negative)", "options": ["Elle n'a pas fait son projet.", "Il n'a pas fait son projet.", "Tu n'as pas fait ton projet.", "Nous n'avons pas fait notre projet."], "answer": "A"},
      {"question": "Did you do well? (Passé Composé - Question, informal)", "options": ["As-tu bien fait ?", "A-t-il bien fait ?", "Avons-nous bien fait ?", "Ont-ils bien fait ?"], "answer": "A"},
      {"question": "We did our best. (Passé Composé)", "options": ["Nous avons fait de notre mieux.", "Vous avez fait de votre mieux.", "Ils ont fait de leur mieux.", "J'ai fait de mon mieux."], "answer": "A"},
      {"question": "He did not do the laundry. (Passé Composé - Negative)", "options": ["Il n'a pas fait la lessive.", "Je n'ai pas fait la lessive.", "Tu n'as pas fait la lessive.", "Ils n'ont pas fait la lessive."], "answer": "A"},
      {"question": "Did they do the work? (Passé Composé - Question, male/mixed)", "options": ["Ont-ils fait le travail ?", "Ont-elles fait le travail ?", "Avez-vous fait le travail ?", "As-tu fait le travail ?"], "answer": "A"},
      {"question": "I did not do mistakes. (Passé Composé - Negative)", "options": ["Je n'ai pas fait d'erreurs.", "Tu n'as pas fait d'erreurs.", "Il n'a pas fait d'erreurs.", "Nous n'avons pas fait d'erreurs."], "answer": "A"},
      {"question": "Did we do the right thing? (Passé Composé - Question)", "options": ["Avons-nous fait la bonne chose ?", "Avez-vous fait la bonne chose ?", "Ont-ils fait la bonne chose ?", "Ai-je fait la bonne chose ?"], "answer": "A"},
      {"question": "You did great work yesterday. (Passé Composé, informal)", "options": ["Tu as fait un excellent travail hier.", "J'ai fait un excellent travail hier.", "Il a fait un excellent travail hier.", "Vous avez fait un excellent travail hier."], "answer": "A"},
      {"question": "They did not do their duty. (Passé Composé - Negative, female)", "options": ["Elles n'ont pas fait leur devoir.", "Ils n'ont pas fait leur devoir.", "Vous n'avez pas fait votre devoir.", "Nous n'avons pas fait notre devoir."], "answer": "A"}
    ],
    "futur_simple": [
      {"question": "I will do my homework tomorrow. (Futur Simple)", "options": ["Je ferai mes devoirs demain.", "Tu feras tes devoirs demain.", "Il fera ses devoirs demain.", "Nous ferons nos devoirs demain."], "answer": "A"},
      {"question": "You will not do the dishes. (Futur Simple - Negative, informal)", "options": ["Tu ne feras pas la vaisselle.", "Je ne ferai pas la vaisselle.", "Il ne fera pas la vaisselle.", "Nous ne ferons pas la vaisselle."], "answer": "A"},
      {"question": "Will he do the cooking? (Futur Simple - Question)", "options": ["Fera-t-il la cuisine ?", "Feras-tu la cuisine ?", "Ferai-je la cuisine ?", "Ferez-vous la cuisine ?"], "answer": "A"},
      {"question": "We will do sports next week. (Futur Simple)", "options": ["Nous ferons du sport la semaine prochaine.", "Vous ferez du sport la semaine prochaine.", "Ils feront du sport la semaine prochaine.", "Je ferai du sport la semaine prochaine."], "answer": "A"},
      {"question": "She will not do the shopping. (Futur Simple - Negative)", "options": ["Elle ne fera pas les courses.", "Il ne fera pas les courses.", "Tu ne feras pas les courses.", "Nous ne ferons pas les courses."], "answer": "A"},
      {"question": "Will you (formal) do your work? (Futur Simple - Question)", "options": ["Ferez-vous votre travail ?", "Feras-tu ton travail ?", "Fera-t-il son travail ?", "Feront-ils leur travail ?"], "answer": "A"},
      {"question": "They will do their homework. (Futur Simple, male/mixed)", "options": ["Ils feront leurs devoirs.", "Elles feront leurs devoirs.", "Ils feraient leurs devoirs.", "Ils faisaient leurs devoirs."], "answer": "A"},
      {"question": "I will not do the cleaning. (Futur Simple - Negative)", "options": ["Je ne ferai pas le ménage.", "Tu ne feras pas le ménage.", "Il ne fera pas le ménage.", "Nous ne ferons pas le ménage."], "answer": "A"},
      {"question": "Will we do all the tasks? (Futur Simple - Question)", "options": ["Ferons-nous toutes les tâches ?", "Ferai-je toutes les tâches ?", "Ferez-vous toutes les tâches ?", "Feront-ils toutes les tâches ?"], "answer": "A"},
      {"question": "You will do a great job. (Futur Simple, informal)", "options": ["Tu feras un excellent travail.", "Je ferai un excellent travail.", "Il fera un excellent travail.", "Vous ferez un excellent travail."], "answer": "A"},
      {"question": "I will do exercise tomorrow morning. (Futur Simple)", "options": ["Je ferai de l'exercice demain matin.", "Tu feras de l'exercice demain matin.", "Il fera de l'exercice demain matin.", "Nous ferons de l'exercice demain matin."], "answer": "A"},
      {"question": "She will not do her project. (Futur Simple - Negative)", "options": ["Elle ne fera pas son projet.", "Il ne fera pas son projet.", "Tu ne feras pas ton projet.", "Nous ne ferons pas notre projet."], "answer": "A"},
      {"question": "Will you do well? (Futur Simple - Question, informal)", "options": ["Feras-tu bien ?", "Fera-t-il bien ?", "Ferons-nous bien ?", "Feront-ils bien ?"], "answer": "A"},
      {"question": "We will do our best. (Futur Simple)", "options": ["Nous ferons de notre mieux.", "Vous ferez de votre mieux.", "Ils feront de leur mieux.", "Je ferai de mon mieux."], "answer": "A"},
      {"question": "He will not do the laundry. (Futur Simple - Negative)", "options": ["Il ne fera pas la lessive.", "Je ne ferai pas la lessive.", "Tu ne feras pas la lessive.", "Ils ne feront pas la lessive."], "answer": "A"},
      {"question": "Will they do the work? (Futur Simple - Question, male/mixed)", "options": ["Feront-ils le travail ?", "Feront-elles le travail ?", "Ferez-vous le travail ?", "Feras-tu le travail ?"], "answer": "A"},
      {"question": "I will not do mistakes. (Futur Simple - Negative)", "options": ["Je ne ferai pas d'erreurs.", "Tu ne feras pas d'erreurs.", "Il ne fera pas d'erreurs.", "Nous ne ferons pas d'erreurs."], "answer": "A"},
      {"question": "Will we do the right thing? (Futur Simple - Question)", "options": ["Ferons-nous la bonne chose ?", "Ferez-vous la bonne chose ?", "Feront-ils la bonne chose ?", "Ferai-je la bonne chose ?"], "answer": "A"},
      {"question": "You will do great work tomorrow. (Futur Simple, informal)", "options": ["Tu feras un excellent travail demain.", "Je ferai un excellent travail demain.", "Il fera un excellent travail demain.", "Vous ferez un excellent travail demain."], "answer": "A"},
      {"question": "They will not do their duty. (Futur Simple - Negative, female)", "options": ["Elles ne feront pas leur devoir.", "Ils ne feront pas leur devoir.", "Vous ne ferez pas votre devoir.", "Nous ne ferons pas notre devoir."], "answer": "A"}
    ]
  },

  "avoir": {
    "present": [
      // Positive statements (8 questions)
      {"question": "I have a car", "options": ["Tu as une voiture", "J'ai une voiture", "Il a une voiture", "Nous avons une voiture"], "answer": "B"},
      {"question": "You have / You are having a problem (informal)", "options": ["J'ai un problème", "Vous avez un problème", "Tu as un problème", "Ils ont un problème"], "answer": "C"},
      {"question": "He has a dog", "options": ["Elle a un chien", "Tu as un chien", "Ils ont un chien", "Il a un chien"], "answer": "D"},
      {"question": "She has a cat", "options": ["Il a un chat", "Elle a un chat", "Elles ont un chat", "Tu as un chat"], "answer": "B"},
      {"question": "We have a house", "options": ["Vous avez une maison", "Ils ont une maison", "J'ai une maison", "Nous avons une maison"], "answer": "D"},
      {"question": "You have / You are having a party (formal / plural)", "options": ["Tu as une fête", "Nous avons une fête", "Vous avez une fête", "Ils ont une fête"], "answer": "C"},
      {"question": "They have books (male / mixed)", "options": ["Elles ont des livres", "Ils avaient des livres", "Ils auront des livres", "Ils ont des livres"], "answer": "D"},
      {"question": "They have keys (female)", "options": ["Ils ont des clés", "Elles avaient des clés", "Elles auront des clés", "Elles ont des clés"], "answer": "D"},

      // Negative statements (6 questions)
      {"question": "I do not have a car", "options": ["Tu n'as pas de voiture", "Il n'a pas de voiture", "Je n'ai pas de voiture", "Nous n'avons pas de voiture"], "answer": "C"},
      {"question": "You do not have / You are not having a problem (informal)", "options": ["Je n'ai pas de problème", "Tu n'as pas de problème", "Vous n'avez pas de problème", "Ils n'ont pas de problème"], "answer": "B"},
      {"question": "He does not have a dog", "options": ["Elle n'a pas de chien", "Tu n'as pas de chien", "Ils n'ont pas de chien", "Il n'a pas de chien"], "answer": "D"},
      {"question": "She does not have a cat", "options": ["Il n'a pas de chat", "Elle n'a pas de chat", "Elles n'ont pas de chat", "Tu n'as pas de chat"], "answer": "B"},
      {"question": "We do not have a house", "options": ["Vous n'avez pas de maison", "Ils n'ont pas de maison", "Je n'ai pas de maison", "Nous n'avons pas de maison"], "answer": "D"},
      {"question": "You do not have / You are not having a party (formal / plural)", "options": ["Tu n'as pas de fête", "Vous n'avez pas de fête", "Nous n'avons pas de fête", "Ils n'ont pas de fête"], "answer": "B"},

      // Positive questions (3 questions)
      {"question": "Do I have a car?", "options": ["As-tu une voiture ?", "A-t-il une voiture ?", "Ai-je une voiture ?", "Avons-nous une voiture ?"], "answer": "C"},
      {"question": "Do you have / Are you having a problem? (informal)", "options": ["Ai-je un problème ?", "As-tu un problème ?", "A-t-il un problème ?", "Avez-vous un problème ?"], "answer": "B"},
      {"question": "Does he have a dog?", "options": ["A-t-elle un chien ?", "Ai-je un chien ?", "As-tu un chien ?", "A-t-il un chien ?"], "answer": "D"},

      // Negative questions (3 questions)
      {"question": "Don't I have a car?", "options": ["N'as-tu pas de voiture ?", "N'a-t-il pas de voiture ?", "N'avons-nous pas de voiture ?", "N'ai-je pas de voiture ?"], "answer": "D"},
      {"question": "Don't you have / Aren't you having a problem? (informal)", "options": ["N'ai-je pas de problème ?", "N'as-tu pas de problème ?", "N'a-t-il pas de problème ?", "N'avez-vous pas de problème ?"], "answer": "B"},
      {"question": "Doesn't he have a dog?", "options": ["N'a-t-elle pas de chien ?", "N'ai-je pas de chien ?", "N'as-tu pas de chien ?", "N'a-t-il pas de chien ?"], "answer": "D"}
    ],
    "passé_composé": [
      // Positive statements (8 questions)
      {"question": "I had a car / I have had a car", "options": ["Tu as eu une voiture", "J'ai eu une voiture", "Il a eu une voiture", "Nous avons eu une voiture"], "answer": "B"},
      {"question": "You had a problem / You have had a problem (informal)", "options": ["J'ai eu un problème", "Vous avez eu un problème", "Tu as eu un problème", "Ils ont eu un problème"], "answer": "C"},
      {"question": "He had a dog / He has had a dog", "options": ["Elle a eu un chien", "Tu as eu un chien", "Ils ont eu un chien", "Il a eu un chien"], "answer": "D"},
      {"question": "She had a cat / She has had a cat", "options": ["Il a eu un chat", "Elle a eu un chat", "Elles ont eu un chat", "Tu as eu un chat"], "answer": "B"},
      {"question": "We had a house / We have had a house", "options": ["Vous avez eu une maison", "Ils ont eu une maison", "J'ai eu une maison", "Nous avons eu une maison"], "answer": "D"},
      {"question": "You had a party / You have had a party (formal / plural)", "options": ["Tu as eu une fête", "Nous avons eu une fête", "Vous avez eu une fête", "Ils ont eu une fête"], "answer": "C"},
      {"question": "They had books / They have had books (male / mixed)", "options": ["Elles ont eu des livres", "Ils avaient des livres", "Ils auront des livres", "Ils ont eu des livres"], "answer": "D"},
      {"question": "They had keys / They have had keys (female)", "options": ["Ils ont eu des clés", "Elles avaient des clés", "Elles auront des clés", "Elles ont eu des clés"], "answer": "D"},

      // Negative statements (6 questions)
      {"question": "I did not have a car / I have not had a car", "options": ["Tu n'as pas eu de voiture", "Il n'a pas eu de voiture", "Je n'ai pas eu de voiture", "Nous n'avons pas eu de voiture"], "answer": "C"},
      {"question": "You did not have a problem / You have not had a problem (informal)", "options": ["Je n'ai pas eu de problème", "Tu n'as pas eu de problème", "Vous n'avez pas eu de problème", "Ils n'ont pas eu de problème"], "answer": "B"},
      {"question": "He did not have a dog / He has not had a dog", "options": ["Elle n'a pas eu de chien", "Tu n'as pas eu de chien", "Ils n'ont pas eu de chien", "Il n'a pas eu de chien"], "answer": "D"},
      {"question": "She did not have a cat / She has not had a cat", "options": ["Il n'a pas eu de chat", "Elle n'a pas eu de chat", "Elles n'ont pas eu de chat", "Tu n'as pas eu de chat"], "answer": "B"},
      {"question": "We did not have a house / We have not had a house", "options": ["Vous n'avez pas eu de maison", "Ils n'ont pas eu de maison", "Je n'ai pas eu de maison", "Nous n'avons pas eu de maison"], "answer": "D"},
      {"question": "You did not have a party / You have not had a party (formal / plural)", "options": ["Tu n'as pas eu de fête", "Vous n'avez pas eu de fête", "Nous n'avons pas eu de fête", "Ils n'ont pas eu de fête"], "answer": "B"},

      // Positive questions (3 questions)
      {"question": "Did I have a car? / Have I had a car?", "options": ["As-tu eu une voiture ?", "A-t-il eu une voiture ?", "Ai-je eu une voiture ?", "Avons-nous eu une voiture ?"], "answer": "C"},
      {"question": "Did you have a problem? / Have you had a problem? (informal)", "options": ["Ai-je eu un problème ?", "As-tu eu un problème ?", "A-t-il eu un problème ?", "Avez-vous eu un problème ?"], "answer": "B"},
      {"question": "Did he have a dog? / Has he had a dog?", "options": ["A-t-elle eu un chien ?", "Ai-je eu un chien ?", "As-tu eu un chien ?", "A-t-il eu un chien ?"], "answer": "D"},

      // Negative questions (3 questions)
      {"question": "Didn't I have a car? / Haven't I had a car?", "options": ["N'as-tu pas eu de voiture ?", "N'a-t-il pas eu de voiture ?", "N'avons-nous pas eu de voiture ?", "N'ai-je pas eu de voiture ?"], "answer": "D"},
      {"question": "Didn't you have a problem? / Haven't you had a problem? (informal)", "options": ["N'ai-je pas eu de problème ?", "N'as-tu pas eu de problème ?", "N'a-t-il pas eu de problème ?", "N'avez-vous pas eu de problème ?"], "answer": "B"},
      {"question": "Didn't he have a dog? / Hasn't he had a dog?", "options": ["N'a-t-elle pas eu de chien ?", "N'ai-je pas eu de chien ?", "N'as-tu pas eu de chien ?", "N'a-t-il pas eu de chien ?"], "answer": "D"}
    ],
    "futur_simple": [
      {"question": "I will have a car. (Futur Simple)", "options": ["J'aurai une voiture.", "Tu auras une voiture.", "Il aura une voiture.", "Nous aurons une voiture."], "answer": "A"},
      {"question": "You will not have a dog. (Futur Simple - Negative)", "options": ["Tu n'auras pas de chien.", "Je n'aurai pas de chien.", "Il n'aura pas de chien.", "Nous n'aurons pas de chien."], "answer": "A"},
      {"question": "Will he have a house? (Futur Simple - Question)", "options": ["Aura-t-il une maison ?", "Auras-tu une maison ?", "Aurai-je une maison ?", "Aurez-vous une maison ?"], "answer": "A"},
      {"question": "We will have time tomorrow. (Futur Simple)", "options": ["Nous aurons du temps demain.", "Vous aurez du temps demain.", "Ils auront du temps demain.", "J'aurai du temps demain."], "answer": "A"},
      {"question": "She will not have a bag. (Futur Simple - Negative)", "options": ["Elle n'aura pas de sac.", "Il n'aura pas de sac.", "Tu n'auras pas de sac.", "Nous n'aurons pas de sac."], "answer": "A"},
      {"question": "Will you (formal) have many friends? (Futur Simple - Question)", "options": ["Aurez-vous beaucoup d'amis ?", "Auras-tu beaucoup d'amis ?", "Aura-t-il beaucoup d'amis ?", "Auront-ils beaucoup d'amis ?"], "answer": "A"},
      {"question": "They will have bikes. (male/mixed) (Futur Simple)", "options": ["Ils auront des vélos.", "Elles auront des vélos.", "Ils auraient des vélos.", "Ils avaient des vélos."], "answer": "A"},
      {"question": "I will not have your keys. (Futur Simple - Negative)", "options": ["Je n'aurai pas tes clés.", "Tu n'auras pas mes clés.", "Il n'aura pas ses clés.", "Nous n'aurons pas leurs clés."], "answer": "A"},
      {"question": "Will we have bread? (Futur Simple - Question)", "options": ["Aurons-nous du pain ?", "Aurai-je du pain ?", "Aurez-vous du pain ?", "Auront-ils du pain ?"], "answer": "A"},
      {"question": "You will have many books. (Futur Simple)", "options": ["Tu auras beaucoup de livres.", "J'aurai beaucoup de livres.", "Il aura beaucoup de livres.", "Vous aurez beaucoup de livres."], "answer": "A"},
      {"question": "I will have a good job. (Futur Simple)", "options": ["J'aurai un bon travail.", "Tu auras un bon travail.", "Il aura un bon travail.", "Nous aurons un bon travail."], "answer": "A"},
      {"question": "She will not have money. (Futur Simple - Negative)", "options": ["Elle n'aura pas d'argent.", "Il n'aura pas d'argent.", "Tu n'auras pas d'argent.", "Nous n'aurons pas d'argent."], "answer": "A"},
      {"question": "Will you have water? (Futur Simple - Question, informal)", "options": ["Auras-tu de l'eau ?", "Aurai-je de l'eau ?", "Aura-t-il de l'eau ?", "Aurez-vous de l'eau ?"], "answer": "A"},
      {"question": "We will have a beautiful house. (Futur Simple)", "options": ["Nous aurons une belle maison.", "Vous aurez une belle maison.", "Ils auront une belle maison.", "J'aurai une belle maison."], "answer": "A"},
      {"question": "He will not have patience. (Futur Simple - Negative)", "options": ["Il n'aura pas de patience.", "Je n'aurai pas de patience.", "Tu n'auras pas de patience.", "Ils n'auront pas de patience."], "answer": "A"},
      {"question": "Will they have children? (Futur Simple - Question, male/mixed)", "options": ["Auront-ils des enfants ?", "Auront-elles des enfants ?", "Aurez-vous des enfants ?", "Auras-tu des enfants ?"], "answer": "A"},
      {"question": "I will not have problems. (Futur Simple - Negative)", "options": ["Je n'aurai pas de problèmes.", "Tu n'auras pas de problèmes.", "Il n'aura pas de problèmes.", "Nous n'aurons pas de problèmes."], "answer": "A"},
      {"question": "Will we have enough food? (Futur Simple - Question)", "options": ["Aurons-nous assez de nourriture ?", "Aurai-je assez de nourriture ?", "Aurez-vous assez de nourriture ?", "Auront-ils assez de nourriture ?"], "answer": "A"},
      {"question": "You will have great ideas. (Futur Simple)", "options": ["Tu auras de bonnes idées.", "J'aurai de bonnes idées.", "Il aura de bonnes idées.", "Vous aurez de bonnes idées."], "answer": "A"},
      {"question": "They will not have luck (female). (Futur Simple - Negative)", "options": ["Elles n'auront pas de chance.", "Ils n'auront pas de chance.", "Vous n'aurez pas de chance.", "Nous n'aurons pas de chance."], "answer": "A"}
    ]
  }
};

// Helper functions for quiz generation
export function getRandomNoviceQuestions(verb: string, tense: string, count: number = 20): NoviceQuizQuestion[] {
  const verbData = NOVICE_QUIZ_DATA[verb];
  if (!verbData) {
    throw new Error(`Verb '${verb}' not found in novice quiz data`);
  }
  
  const tenseData = verbData[tense];
  if (!tenseData) {
    throw new Error(`Tense '${tense}' not found for verb '${verb}' in novice quiz data`);
  }
  
  // Shuffle the questions and return the requested count
  const shuffled = [...tenseData].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function convertNoviceToQuizFormat(noviceQuestions: NoviceQuizQuestion[]) {
  return noviceQuestions.map((q, index) => {
    // Determine correct answer index (A=0, B=1, C=2, D=3)
    const correctIndex = q.answer === 'A' ? 0 : q.answer === 'B' ? 1 : q.answer === 'C' ? 2 : 3;
    
    // Remove only tense indicators from question text, preserve formality/gender labels
    // Remove patterns like "(Futur Simple)", "(Présent - Negative)", but keep "(informal)", "(formal / plural)", "(male / mixed)", "(female)"
    const cleanQuestion = q.question.replace(/\s*\((Futur Simple|Présent|Passé Composé|Imparfait|Plus-que-parfait|Passé Simple)([^)]*)\)\s*$/g, '').trim();
    
    // Convert options to answerOptions format
    const answerOptions = q.options.map((optionText, optionIndex) => ({
      text: optionText,
      rationale: optionIndex === correctIndex 
        ? "Correct! This follows proper French conjugation rules."
        : "This is not the correct conjugation for this subject and tense.",
      isCorrect: optionIndex === correctIndex
    }));

    // Shuffle the answer options to randomize correct answer position
    const shuffledAnswerOptions = [...answerOptions].sort(() => Math.random() - 0.5);

    return {
      id: index + 1,
      question: cleanQuestion,
      hint: `Focus on the subject and verb agreement.`,
      answerOptions: shuffledAnswerOptions
    };
  });
}