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
      {"question": "I am going / I go to the market. (Présent)", "options": ["Je vais au marché.", "Tu vas au marché.", "Il va au marché.", "Nous allons au marché."], "answer": "A"},
      {"question": "You are not going / You do not go to school. (Présent - Negative, informal)", "options": ["Tu ne vas pas à l'école.", "Je ne vais pas à l'école.", "Il ne va pas à l'école.", "Nous n'allons pas à l'école."], "answer": "A"},
      {"question": "Is he going / Does he go home? (Présent - Question)", "options": ["Va-t-il à la maison ?", "Vas-tu à la maison ?", "Allons-nous à la maison ?", "Vont-ils à la maison ?"], "answer": "A"},
      {"question": "We are going / We go to the beach. (Présent)", "options": ["Nous allons à la plage.", "Vous allez à la plage.", "Ils vont à la plage.", "Je vais à la plage."], "answer": "A"},
      {"question": "She is not going / She does not go to the store. (Présent - Negative)", "options": ["Elle ne va pas au magasin.", "Il ne va pas au magasin.", "Tu ne vas pas au magasin.", "Nous n'allons pas au magasin."], "answer": "A"},
      {"question": "Are you going / Do you go with us? (Présent - Question, formal/plural)", "options": ["Allez-vous avec nous ?", "Vas-tu avec nous ?", "Va-t-elle avec nous ?", "Vont-ils avec nous ?"], "answer": "A"},
      {"question": "They are going / They go to the cinema. (Présent, male/mixed)", "options": ["Ils vont au cinéma.", "Elles vont au cinéma.", "Ils allaient au cinéma.", "Ils iront au cinéma."], "answer": "A"},
      {"question": "I am not going / I do not go to work today. (Présent - Negative)", "options": ["Je ne vais pas au travail aujourd'hui.", "Tu ne vas pas au travail aujourd'hui.", "Il ne va pas au travail aujourd'hui.", "Nous n'allons pas au travail aujourd'hui."], "answer": "A"},
      {"question": "Are we going / Do we go to the market? (Présent - Question)", "options": ["Allons-nous au marché ?", "Vas-tu au marché ?", "Va-t-il au marché ?", "Vont-ils au marché ?"], "answer": "A"},
      {"question": "You are going / You go to the party. (Présent, informal)", "options": ["Tu vas à la fête.", "Je vais à la fête.", "Il va à la fête.", "Vous allez à la fête."], "answer": "A"},
      {"question": "I am going / I go sometimes to the park. (Présent)", "options": ["Je vais parfois au parc.", "Tu vas parfois au parc.", "Il va parfois au parc.", "Nous allons parfois au parc."], "answer": "A"},
      {"question": "She is going / She goes every day to school. (Présent)", "options": ["Elle va tous les jours à l'école.", "Il va tous les jours à l'école.", "Tu vas tous les jours à l'école.", "Nous allons tous les jours à l'école."], "answer": "A"},
      {"question": "They are not going / They do not go to the gym. (Présent - Negative, female)", "options": ["Elles ne vont pas au gymnase.", "Ils ne vont pas au gymnase.", "Vous n'allez pas au gymnase.", "Nous n'allons pas au gymnase."], "answer": "A"},
      {"question": "Are you going / Do you go to the library? (Présent - Question, informal)", "options": ["Vas-tu à la bibliothèque ?", "Va-t-il à la bibliothèque ?", "Allons-nous à la bibliothèque ?", "Vont-ils à la bibliothèque ?"], "answer": "A"},
      {"question": "He is going / He goes to work. (Présent)", "options": ["Il va au travail.", "Elle va au travail.", "Tu vas au travail.", "Ils vont au travail."], "answer": "A"},
      {"question": "I am not going / I do not go to the market today. (Présent - Negative)", "options": ["Je ne vais pas au marché aujourd'hui.", "Tu ne vas pas au marché aujourd'hui.", "Il ne va pas au marché aujourd'hui.", "Nous n'allons pas au marché aujourd'hui."], "answer": "A"},
      {"question": "Are they going / Do they go to the museum? (Présent - Question, male)", "options": ["Vont-ils au musée ?", "Vont-elles au musée ?", "Allez-vous au musée ?", "Vas-tu au musée ?"], "answer": "A"},
      {"question": "She is going / She goes with her friends. (Présent)", "options": ["Elle va avec ses amis.", "Il va avec ses amis.", "Tu vas avec tes amis.", "Nous allons avec nos amis."], "answer": "A"},
      {"question": "We are not going / We do not go to the city. (Présent - Negative)", "options": ["Nous n'allons pas en ville.", "Vous n'allez pas en ville.", "Ils ne vont pas en ville.", "Je ne vais pas en ville."], "answer": "A"},
      {"question": "Are you going / Do you go to the stadium? (Présent - Question, formal)", "options": ["Allez-vous au stade ?", "Vas-tu au stade ?", "Va-t-il au stade ?", "Vont-ils au stade ?"], "answer": "A"}
    ],
    "passé_composé": [
      {"question": "I went to the store. (Passé Composé)", "options": ["Je suis allé au magasin.", "Tu es allé au magasin.", "Il est allé au magasin.", "Nous sommes allés au magasin."], "answer": "A"},
      {"question": "You did not go to school. (Passé Composé - Negative, informal)", "options": ["Tu n'es pas allé à l'école.", "Je ne suis pas allé à l'école.", "Il n'est pas allé à l'école.", "Nous ne sommes pas allés à l'école."], "answer": "A"},
      {"question": "Did she go to the park? (Passé Composé - Question)", "options": ["Est-elle allée au parc ?", "Est-il allé au parc ?", "Es-tu allé au parc ?", "Sont-ils allés au parc ?"], "answer": "A"},
      {"question": "We went to Paris last summer. (Passé Composé)", "options": ["Nous sommes allés à Paris l'été dernier.", "Vous êtes allés à Paris l'été dernier.", "Ils sont allés à Paris l'été dernier.", "Je suis allé à Paris l'été dernier."], "answer": "A"},
      {"question": "He did not go to the party. (Passé Composé - Negative)", "options": ["Il n'est pas allé à la fête.", "Je ne suis pas allé à la fête.", "Tu n'es pas allé à la fête.", "Ils ne sont pas allés à la fête."], "answer": "A"},
      {"question": "Did you (formal) go to the meeting? (Passé Composé - Question)", "options": ["Êtes-vous allé à la réunion ?", "Es-tu allé à la réunion ?", "Est-il allé à la réunion ?", "Sont-ils allés à la réunion ?"], "answer": "A"},
      {"question": "They went by car. (Passé Composé, male/mixed)", "options": ["Ils sont allés en voiture.", "Elles sont allées en voiture.", "Ils allaient en voiture.", "Ils iront en voiture."], "answer": "A"},
      {"question": "I did not go yesterday. (Passé Composé - Negative)", "options": ["Je ne suis pas allé hier.", "Tu n'es pas allé hier.", "Il n'est pas allé hier.", "Nous ne sommes pas allés hier."], "answer": "A"},
      {"question": "Did we go to the restaurant? (Passé Composé - Question)", "options": ["Sommes-nous allés au restaurant ?", "Es-tu allé au restaurant ?", "Est-il allé au restaurant ?", "Sont-ils allés au restaurant ?"], "answer": "A"},
      {"question": "You went to the library. (Passé Composé, informal)", "options": ["Tu es allé à la bibliothèque.", "Je suis allé à la bibliothèque.", "Il est allé à la bibliothèque.", "Vous êtes allé à la bibliothèque."], "answer": "A"},
      {"question": "I went yesterday to the market. (Passé Composé)", "options": ["Je suis allé hier au marché.", "Tu es allé hier au marché.", "Il est allé hier au marché.", "Nous sommes allés hier au marché."], "answer": "A"},
      {"question": "She did not go to school last week. (Passé Composé - Negative)", "options": ["Elle n'est pas allée à l'école la semaine dernière.", "Il n'est pas allé à l'école la semaine dernière.", "Tu n'es pas allé à l'école la semaine dernière.", "Nous ne sommes pas allés à l'école la semaine dernière."], "answer": "A"},
      {"question": "Did you go to the gym yesterday? (Passé Composé - Question, informal)", "options": ["Es-tu allé au gymnase hier ?", "Suis-je allé au gymnase hier ?", "Est-il allé au gymnase hier ?", "Êtes-vous allés au gymnase hier ?"], "answer": "A"},
      {"question": "We went to the cinema last weekend. (Passé Composé)", "options": ["Nous sommes allés au cinéma le week-end dernier.", "Vous êtes allés au cinéma le week-end dernier.", "Ils sont allés au cinéma le week-end dernier.", "Je suis allé au cinéma le week-end dernier."], "answer": "A"},
      {"question": "Didn't he go to work yesterday? (Passé Composé - Question)", "options": ["N'est-il pas allé au travail hier ?", "N'est-elle pas allée au travail hier ?", "N'es-tu pas allé au travail hier ?", "N'avons-nous pas allés au travail hier ?"], "answer": "A"},
      {"question": "They did not go to the restaurant last night. (Passé Composé - Negative, male/mixed)", "options": ["Ils ne sont pas allés au restaurant hier soir.", "Elles ne sont pas allées au restaurant hier soir.", "Vous n'êtes pas allés au restaurant hier soir.", "Nous ne sommes pas allés au restaurant hier soir."], "answer": "A"},
      {"question": "Did I go to the market this morning? (Passé Composé - Question)", "options": ["Suis-je allé au marché ce matin ?", "Es-tu allé au marché ce matin ?", "Est-il allé au marché ce matin ?", "Sont-ils allés au marché ce matin ?"], "answer": "A"},
      {"question": "You went to the library last week. (Passé Composé, informal)", "options": ["Tu es allé à la bibliothèque la semaine dernière.", "Je suis allé à la bibliothèque la semaine dernière.", "Il est allé à la bibliothèque la semaine dernière.", "Vous êtes allé à la bibliothèque la semaine dernière."], "answer": "A"},
      {"question": "I did not go to the park last Sunday. (Passé Composé - Negative)", "options": ["Je ne suis pas allé au parc dimanche dernier.", "Tu n'es pas allé au parc dimanche dernier.", "Il n'est pas allé au parc dimanche dernier.", "Nous ne sommes pas allés au parc dimanche dernier."], "answer": "A"},
      {"question": "Did we go to the museum yesterday? (Passé Composé - Question)", "options": ["Sommes-nous allés au musée hier ?", "Es-tu allé au musée hier ?", "Est-il allé au musée hier ?", "Sont-ils allés au musée hier ?"], "answer": "A"}
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
      {"question": "I am happy. (Présent)", "options": ["Je suis heureux.", "Je es heureux.", "Je est heureux.", "J'étais heureux."], "answer": "A"},
      {"question": "You are tired. (Présent - informal)", "options": ["Tu es fatigué.", "Tu suis fatigué.", "Tu êtes fatigué.", "Tu sera fatigué."], "answer": "A"},
      {"question": "He is a student. (Présent)", "options": ["Il est étudiant.", "Il es étudiant.", "Il suis étudiant.", "Il était étudiant."], "answer": "A"},
      {"question": "We are friends. (Présent)", "options": ["Nous sommes amis.", "Nous sont amis.", "Nous êtes amis.", "Nous avons amis."], "answer": "A"},
      {"question": "You are ready. (Présent, formal/plural)", "options": ["Vous êtes prêts.", "Vous es prêts.", "Vous sommes prêts.", "Vous serez prêts."], "answer": "A"},
      {"question": "She is not here. (Présent - Negative)", "options": ["Elle n'est pas ici.", "Elle ne pas est ici.", "Elle est ne pas ici.", "Elle n'était pas ici."], "answer": "A"},
      {"question": "They are busy. (Présent - masculine/mixed)", "options": ["Ils sont occupés.", "Ils es occupés.", "Ils sommes occupés.", "Ils étaient occupés."], "answer": "A"},
      {"question": "She is a teacher. (Présent)", "options": ["Elle est professeure.", "Elle suis professeure.", "Elle sont professeure.", "Elle sera professeure."], "answer": "A"},
      {"question": "We are not late. (Présent - Negative)", "options": ["Nous ne sommes pas en retard.", "Nous sommes pas en retard.", "Nous ne sont pas en retard.", "Nous avons en retard."], "answer": "A"},
      {"question": "I am not here. (Présent - Negative)", "options": ["Je ne suis pas ici.", "Je suis pas ici.", "Je es pas ici.", "J'ai pas ici."], "answer": "A"},
      {"question": "Are you tired? (Présent - Question, formal)", "options": ["Êtes-vous fatigué ?", "Es-tu fatigué ?", "Est-il fatigué ?", "Sont-ils fatigués ?"], "answer": "A"},
      {"question": "Is he ready? (Présent - Question)", "options": ["Est-il prêt ?", "Est-elle prête ?", "Es-tu prêt ?", "Êtes-vous prêts ?"], "answer": "A"},
      {"question": "Are we happy? (Présent - Question)", "options": ["Sommes-nous heureux ?", "Suis-je heureux ?", "Êtes-vous heureux ?", "Sont-ils heureux ?"], "answer": "A"},
      {"question": "They are not at school. (Présent - Negative, feminine)", "options": ["Elles ne sont pas à l'école.", "Ils ne sont pas à l'école.", "Vous n'êtes pas à l'école.", "Nous ne sommes pas à l'école."], "answer": "A"},
      {"question": "Is she a doctor? (Présent - Question)", "options": ["Est-elle docteur ?", "Est-il docteur ?", "Es-tu docteur ?", "Êtes-vous docteur ?"], "answer": "A"},
      {"question": "You are not sick. (Présent - Negative, informal)", "options": ["Tu n'es pas malade.", "Je ne suis pas malade.", "Il n'est pas malade.", "Nous ne sommes pas malades."], "answer": "A"},
      {"question": "They are at home. (Présent - masculine/mixed)", "options": ["Ils sont à la maison.", "Elles sont à la maison.", "Ils étaient à la maison.", "Ils seront à la maison."], "answer": "A"},
      {"question": "Am I late? (Présent - Question)", "options": ["Suis-je en retard ?", "Es-tu en retard ?", "Est-il en retard ?", "Sommes-nous en retard ?"], "answer": "A"},
      {"question": "You are very kind. (Présent - formal)", "options": ["Vous êtes très gentil.", "Tu es très gentil.", "Il est très gentil.", "Nous sommes très gentils."], "answer": "A"},
      {"question": "He is not French. (Présent - Negative)", "options": ["Il n'est pas français.", "Elle n'est pas française.", "Tu n'es pas français.", "Nous ne sommes pas français."], "answer": "A"}
    ],
    "passé_composé": [
      // Positive statements (8 questions)
      {"question": "I have been", "options": ["Tu as été", "J'ai été", "Il a été", "Nous avons été"], "answer": "B"},
      {"question": "You have been (informal)", "options": ["J'ai été", "Vous avez été", "Tu as été", "Ils ont été"], "answer": "C"},
      {"question": "He has been", "options": ["Elle a été", "Tu as été", "Ils ont été", "Il a été"], "answer": "D"},
      {"question": "She has been", "options": ["Il a été", "Elle a été", "Elles ont été", "Tu as été"], "answer": "B"},
      {"question": "We have been", "options": ["Vous avez été", "Ils ont été", "J'ai été", "Nous avons été"], "answer": "D"},
      {"question": "You have been (formal/plural)", "options": ["Tu as été", "Nous avons été", "Vous avez été", "Ils ont été"], "answer": "C"},
      {"question": "They have been (male/mixed)", "options": ["Elles ont été", "Ils étaient", "Ils ont été", "Ils ont été"], "answer": "D"},
      {"question": "They have been (female)", "options": ["Ils ont été", "Elles ont été", "Elles étaient", "Elles ont été"], "answer": "B"},

      // Negative statements (6 questions)
      {"question": "I have not been", "options": ["Tu n'as pas été", "Il n'a pas été", "Je n'ai pas été", "Nous n'avons pas été"], "answer": "C"},
      {"question": "You have not been (informal)", "options": ["Je n'ai pas été", "Tu n'as pas été", "Vous n'avez pas été", "Ils n'ont pas été"], "answer": "B"},
      {"question": "He has not been", "options": ["Elle n'a pas été", "Tu n'as pas été", "Ils n'ont pas été", "Il n'a pas été"], "answer": "D"},
      {"question": "She has not been", "options": ["Il n'a pas été", "Elle n'a pas été", "Elles n'ont pas été", "Tu n'as pas été"], "answer": "B"},
      {"question": "We have not been", "options": ["Vous n'avez pas été", "Ils n'ont pas été", "Je n'ai pas été", "Nous n'avons pas été"], "answer": "D"},
      {"question": "You have not been (formal/plural)", "options": ["Tu n'as pas été", "Vous n'avez pas été", "Nous n'avons pas été", "Ils n'ont pas été"], "answer": "B"},

      // Positive questions (3 questions)
      {"question": "Have I been?", "options": ["As-tu été ?", "A-t-il été ?", "Ai-je été ?", "Avons-nous été ?"], "answer": "C"},
      {"question": "Have you been? (informal)", "options": ["Ai-je été ?", "As-tu été ?", "A-t-il été ?", "Avez-vous été ?"], "answer": "B"},
      {"question": "Has he been?", "options": ["A-t-elle été ?", "Ai-je été ?", "As-tu été ?", "A-t-il été ?"], "answer": "D"},

      // Negative questions (3 questions)
      {"question": "Haven't I been?", "options": ["N'as-tu pas été ?", "N'a-t-il pas été ?", "N'avons-nous pas été ?", "N'ai-je pas été ?"], "answer": "D"},
      {"question": "Haven't you been? (informal)", "options": ["N'ai-je pas été ?", "N'as-tu pas été ?", "N'a-t-il pas été ?", "N'avez-vous pas été ?"], "answer": "B"},
      {"question": "Hasn't he been?", "options": ["N'a-t-elle pas été ?", "N'ai-je pas été ?", "N'a-t-il pas été ?", "N'as-tu pas été ?"], "answer": "C"}
    ],
    "futur_simple": [
      {"question": "I will be happy. (Futur Simple)", "options": ["Je serai heureux.", "Tu seras heureux.", "Il sera heureux.", "Nous serons heureux."], "answer": "A"},
      {"question": "You will not be tired. (Futur Simple - Negative, informal)", "options": ["Tu ne seras pas fatigué.", "Je ne serai pas fatigué.", "Il ne sera pas fatigué.", "Nous ne serons pas fatigués."], "answer": "A"},
      {"question": "Will he be ready? (Futur Simple - Question)", "options": ["Sera-t-il prêt ?", "Seras-tu prêt ?", "Serai-je prêt ?", "Serez-vous prêts ?"], "answer": "A"},
      {"question": "We will be happy tomorrow. (Futur Simple)", "options": ["Nous serons heureux demain.", "Vous serez heureux demain.", "Ils seront heureux demain.", "Je serai heureux demain."], "answer": "A"},
      {"question": "She will not be here. (Futur Simple - Negative)", "options": ["Elle ne sera pas ici.", "Il ne sera pas ici.", "Tu ne seras pas ici.", "Nous ne serons pas ici."], "answer": "A"},
      {"question": "Will you (formal) be tired? (Futur Simple - Question)", "options": ["Serez-vous fatigué ?", "Seras-tu fatigué ?", "Sera-t-il fatigué ?", "Seront-ils fatigués ?"], "answer": "A"},
      {"question": "They will be at home. (male/mixed) (Futur Simple)", "options": ["Ils seront à la maison.", "Elles seront à la maison.", "Ils seraient à la maison.", "Ils étaient à la maison."], "answer": "A"},
      {"question": "They will not be here. (female) (Futur Simple - Negative)", "options": ["Elles ne seront pas ici.", "Ils ne seront pas ici.", "Vous ne serez pas ici.", "Nous ne serons pas ici."], "answer": "A"},
      {"question": "Will I be late? (Futur Simple - Question)", "options": ["Serai-je en retard ?", "Seras-tu en retard ?", "Sera-t-il en retard ?", "Serons-nous en retard ?"], "answer": "A"},
      {"question": "Will you (informal) be ready? (Futur Simple - Question)", "options": ["Seras-tu prêt ?", "Serai-je prêt ?", "Sera-t-il prêt ?", "Serez-vous prêts ?"], "answer": "A"},
      {"question": "Will he be here? (Futur Simple - Question)", "options": ["Sera-t-il ici ?", "Sera-t-elle ici ?", "Seras-tu ici ?", "Serez-vous ici ?"], "answer": "A"},
      {"question": "Will she be tired? (Futur Simple - Question)", "options": ["Sera-t-elle fatiguée ?", "Sera-t-il fatigué ?", "Seras-tu fatigué ?", "Serez-vous fatigués ?"], "answer": "A"},
      {"question": "Will we be ready? (Futur Simple - Question)", "options": ["Serons-nous prêts ?", "Serai-je prêt ?", "Serez-vous prêts ?", "Seront-ils prêts ?"], "answer": "A"},
      {"question": "Will you (formal) be happy? (Futur Simple - Question)", "options": ["Serez-vous heureux ?", "Seras-tu heureux ?", "Serai-je heureux ?", "Seront-ils heureux ?"], "answer": "A"},
      {"question": "Will they be here? (male/mixed) (Futur Simple - Question)", "options": ["Seront-ils ici ?", "Seront-elles ici ?", "Serez-vous ici ?", "Seras-tu ici ?"], "answer": "A"},
      {"question": "Will they be here? (female) (Futur Simple - Question)", "options": ["Seront-elles ici ?", "Seront-ils ici ?", "Serez-vous ici ?", "Seras-tu ici ?"], "answer": "A"},
      {"question": "I will not be busy. (Futur Simple - Negative)", "options": ["Je ne serai pas occupé.", "Tu ne seras pas occupé.", "Il ne sera pas occupé.", "Nous ne serons pas occupés."], "answer": "A"},
      {"question": "He will not be late. (Futur Simple - Negative)", "options": ["Il ne sera pas en retard.", "Je ne serai pas en retard.", "Tu ne seras pas en retard.", "Ils ne seront pas en retard."], "answer": "A"},
      {"question": "Won't we be ready? (Futur Simple - Negative Question)", "options": ["Ne serons-nous pas prêts ?", "Ne serez-vous pas prêts ?", "Ne seront-ils pas prêts ?", "Ne serai-je pas prêt ?"], "answer": "A"},
      {"question": "Won't they be tired? (female) (Futur Simple - Negative Question)", "options": ["Ne seront-elles pas fatiguées ?", "Ne seront-ils pas fatigués ?", "Ne serez-vous pas fatigués ?", "Ne serons-nous pas fatigués ?"], "answer": "A"}
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
      {"question": "I have a car. (Présent)", "options": ["J'ai une voiture.", "Tu as une voiture.", "Il a une voiture.", "Nous avons une voiture."], "answer": "A"},
      {"question": "You do not have a dog. (Présent - Negative, informal)", "options": ["Tu n'as pas de chien.", "Je n'ai pas de chien.", "Il n'a pas de chien.", "Nous n'avons pas de chien."], "answer": "A"},
      {"question": "Does he have a house? (Présent - Question)", "options": ["A-t-il une maison ?", "As-tu une maison ?", "Ai-je une maison ?", "Avez-vous une maison ?"], "answer": "A"},
      {"question": "We have time today. (Présent)", "options": ["Nous avons du temps aujourd'hui.", "Vous avez du temps aujourd'hui.", "Ils ont du temps aujourd'hui.", "J'ai du temps aujourd'hui."], "answer": "A"},
      {"question": "She does not have a bag. (Présent - Negative)", "options": ["Elle n'a pas de sac.", "Il n'a pas de sac.", "Tu n'as pas de sac.", "Nous n'avons pas de sac."], "answer": "A"},
      {"question": "Do you (formal) have many friends? (Présent - Question)", "options": ["Avez-vous beaucoup d'amis ?", "As-tu beaucoup d'amis ?", "Ai-je beaucoup d'amis ?", "Avons-nous beaucoup d'amis ?"], "answer": "A"},
      {"question": "They have bikes. (male/mixed) (Présent)", "options": ["Ils ont des vélos.", "Elles ont des vélos.", "Ils avaient des vélos.", "Ils auront des vélos."], "answer": "A"},
      {"question": "I do not have your keys. (Présent - Negative)", "options": ["Je n'ai pas tes clés.", "Tu n'as pas mes clés.", "Il n'a pas ses clés.", "Nous n'avons pas leurs clés."], "answer": "A"},
      {"question": "Do we have bread? (Présent - Question)", "options": ["Avons-nous du pain ?", "Ai-je du pain ?", "Avez-vous du pain ?", "Ont-ils du pain ?"], "answer": "A"},
      {"question": "You have many books. (Présent, informal)", "options": ["Tu as beaucoup de livres.", "J'ai beaucoup de livres.", "Il a beaucoup de livres.", "Vous avez beaucoup de livres."], "answer": "A"},
      {"question": "I have a good job. (Présent)", "options": ["J'ai un bon travail.", "Tu as un bon travail.", "Il a un bon travail.", "Nous avons un bon travail."], "answer": "A"},
      {"question": "She does not have money. (Présent - Negative)", "options": ["Elle n'a pas d'argent.", "Il n'a pas d'argent.", "Tu n'as pas d'argent.", "Nous n'avons pas d'argent."], "answer": "A"},
      {"question": "Do you have water? (Présent - Question, informal)", "options": ["As-tu de l'eau ?", "Ai-je de l'eau ?", "A-t-il de l'eau ?", "Avez-vous de l'eau ?"], "answer": "A"},
      {"question": "We have a beautiful house. (Présent)", "options": ["Nous avons une belle maison.", "Vous avez une belle maison.", "Ils ont une belle maison.", "J'ai une belle maison."], "answer": "A"},
      {"question": "He does not have patience. (Présent - Negative)", "options": ["Il n'a pas de patience.", "Je n'ai pas de patience.", "Tu n'as pas de patience.", "Ils n'ont pas de patience."], "answer": "A"},
      {"question": "Do they have children? (Présent - Question, male/mixed)", "options": ["Ont-ils des enfants ?", "Ont-elles des enfants ?", "Avez-vous des enfants ?", "As-tu des enfants ?"], "answer": "A"},
      {"question": "I do not have problems. (Présent - Negative)", "options": ["Je n'ai pas de problèmes.", "Tu n'as pas de problèmes.", "Il n'a pas de problèmes.", "Nous n'avons pas de problèmes."], "answer": "A"},
      {"question": "Do we have enough food? (Présent - Question)", "options": ["Avons-nous assez de nourriture ?", "Ai-je assez de nourriture ?", "Avez-vous assez de nourriture ?", "Ont-ils assez de nourriture ?"], "answer": "A"},
      {"question": "You have great ideas. (Présent, informal)", "options": ["Tu as de bonnes idées.", "J'ai de bonnes idées.", "Il a de bonnes idées.", "Vous avez de bonnes idées."], "answer": "A"},
      {"question": "They do not have luck. (Présent - Negative, female)", "options": ["Elles n'ont pas de chance.", "Ils n'ont pas de chance.", "Vous n'avez pas de chance.", "Nous n'avons pas de chance."], "answer": "A"}
    ],
    "passé_composé": [
      {"question": "I had a good day. (Passé Composé)", "options": ["J'ai eu une bonne journée.", "Tu as eu une bonne journée.", "Il a eu une bonne journée.", "Nous avons eu une bonne journée."], "answer": "A"},
      {"question": "You did not have coffee. (Passé Composé - Negative)", "options": ["Tu n'as pas eu de café.", "Je n'ai pas eu de café.", "Il n'a pas eu de café.", "Nous n'avons pas eu de café."], "answer": "A"},
      {"question": "Did he have problems? (Passé Composé - Question)", "options": ["A-t-il eu des problèmes ?", "As-tu eu des problèmes ?", "Ai-je eu des problèmes ?", "Avez-vous eu des problèmes ?"], "answer": "A"},
      {"question": "We had some rain. (Passé Composé)", "options": ["Nous avons eu de la pluie.", "Vous avez eu de la pluie.", "Ils ont eu de la pluie.", "J'ai eu de la pluie."], "answer": "A"},
      {"question": "She did not have luck. (Passé Composé - Negative)", "options": ["Elle n'a pas eu de chance.", "Il n'a pas eu de chance.", "Tu n'as pas eu de chance.", "Nous n'avons pas eu de chance."], "answer": "A"},
      {"question": "Did you (formal) have dinner? (Passé Composé - Question)", "options": ["Avez-vous eu le dîner ?", "As-tu eu le dîner ?", "Ai-je eu le dîner ?", "Avons-nous eu le dîner ?"], "answer": "A"},
      {"question": "They had gifts. (male/mixed) (Passé Composé)", "options": ["Ils ont eu des cadeaux.", "Elles ont eu des cadeaux.", "Ils avaient des cadeaux.", "Ils auront des cadeaux."], "answer": "A"},
      {"question": "I did not have problems. (Passé Composé - Negative)", "options": ["Je n'ai pas eu de problèmes.", "Tu n'as pas eu de problèmes.", "Il n'a pas eu de problèmes.", "Nous n'avons pas eu de problèmes."], "answer": "A"},
      {"question": "Did we have time? (Passé Composé - Question)", "options": ["Avons-nous eu du temps ?", "Ai-je eu du temps ?", "Avez-vous eu du temps ?", "Ont-ils eu du temps ?"], "answer": "A"},
      {"question": "You had many friends. (Passé Composé)", "options": ["Tu as eu beaucoup d'amis.", "J'ai eu beaucoup d'amis.", "Il a eu beaucoup d'amis.", "Vous avez eu beaucoup d'amis."], "answer": "A"},
      {"question": "I had a meeting yesterday. (Passé Composé)", "options": ["J'ai eu une réunion hier.", "Tu as eu une réunion hier.", "Il a eu une réunion hier.", "Nous avons eu une réunion hier."], "answer": "A"},
      {"question": "She did not have money. (Passé Composé - Negative)", "options": ["Elle n'a pas eu d'argent.", "Il n'a pas eu d'argent.", "Tu n'as pas eu d'argent.", "Nous n'avons pas eu d'argent."], "answer": "A"},
      {"question": "Did you have water? (Passé Composé - Question, informal)", "options": ["As-tu eu de l'eau ?", "Ai-je eu de l'eau ?", "A-t-il eu de l'eau ?", "Avez-vous eu de l'eau ?"], "answer": "A"},
      {"question": "We had a beautiful vacation. (Passé Composé)", "options": ["Nous avons eu de belles vacances.", "Vous avez eu de belles vacances.", "Ils ont eu de belles vacances.", "J'ai eu de belles vacances."], "answer": "A"},
      {"question": "He did not have patience. (Passé Composé - Negative)", "options": ["Il n'a pas eu de patience.", "Je n'ai pas eu de patience.", "Tu n'as pas eu de patience.", "Ils n'ont pas eu de patience."], "answer": "A"},
      {"question": "Did they have children? (Passé Composé - Question, male/mixed)", "options": ["Ont-ils eu des enfants ?", "Ont-elles eu des enfants ?", "Avez-vous eu des enfants ?", "As-tu eu des enfants ?"], "answer": "A"},
      {"question": "I did not have troubles. (Passé Composé - Negative)", "options": ["Je n'ai pas eu d'ennuis.", "Tu n'as pas eu d'ennuis.", "Il n'a pas eu d'ennuis.", "Nous n'avons pas eu d'ennuis."], "answer": "A"},
      {"question": "Did we have enough food? (Passé Composé - Question)", "options": ["Avons-nous eu assez de nourriture ?", "Ai-je eu assez de nourriture ?", "Avez-vous eu assez de nourriture ?", "Ont-ils eu assez de nourriture ?"], "answer": "A"},
      {"question": "You had great ideas. (Passé Composé)", "options": ["Tu as eu de bonnes idées.", "J'ai eu de bonnes idées.", "Il a eu de bonnes idées.", "Vous avez eu de bonnes idées."], "answer": "A"},
      {"question": "They did not have luck (female). (Passé Composé - Negative)", "options": ["Elles n'ont pas eu de chance.", "Ils n'ont pas eu de chance.", "Vous n'avez pas eu de chance.", "Nous n'avons pas eu de chance."], "answer": "A"}
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
    
    // Remove tense indicators from question text (e.g., "(Futur Simple)", "(Présent - Negative)")
    const cleanQuestion = q.question.replace(/\s*\([^)]*\)\s*$/g, '').trim();
    
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