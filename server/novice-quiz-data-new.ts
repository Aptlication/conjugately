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
      {"question": "You are not going / You do not go to school. (Présent - Negative)", "options": ["Tu ne vas pas à l'école.", "Je ne vais pas à l'école.", "Il ne va pas à l'école.", "Nous n'allons pas à l'école."], "answer": "A"},
      {"question": "Is he going / Does he go home? (Présent - Question)", "options": ["Va-t-il à la maison ?", "Vas-tu à la maison ?", "Allons-nous à la maison ?", "Vont-ils à la maison ?"], "answer": "A"},
      {"question": "We are going / We go to the beach. (Présent)", "options": ["Nous allons à la plage.", "Vous allez à la plage.", "Ils vont à la plage.", "Je vais à la plage."], "answer": "A"},
      {"question": "She is not going / She does not go to the store. (Présent - Negative)", "options": ["Elle ne va pas au magasin.", "Il ne va pas au magasin.", "Tu ne vas pas au magasin.", "Nous n'allons pas au magasin."], "answer": "A"},
      {"question": "Are you going / Do you go with us? (Présent - Question, formal/plural)", "options": ["Allez-vous avec nous ?", "Vas-tu avec nous ?", "Va-t-elle avec nous ?", "Vont-ils avec nous ?"], "answer": "A"},
      {"question": "They are going / They go to the cinema. (Présent)", "options": ["Ils vont au cinéma.", "Elles vont au cinéma.", "Ils allaient au cinéma.", "Ils iront au cinéma."], "answer": "A"},
      {"question": "I am not going / I do not go to work today. (Présent - Negative)", "options": ["Je ne vais pas au travail aujourd'hui.", "Tu ne vas pas au travail aujourd'hui.", "Il ne va pas au travail aujourd'hui.", "Nous n'allons pas au travail aujourd'hui."], "answer": "A"},
      {"question": "Are we going / Do we go to the market? (Présent - Question)", "options": ["Allons-nous au marché ?", "Vas-tu au marché ?", "Va-t-il au marché ?", "Vont-ils au marché ?"], "answer": "A"},
      {"question": "You are going / You go to the party. (Présent)", "options": ["Tu vas à la fête.", "Je vais à la fête.", "Il va à la fête.", "Vous allez à la fête."], "answer": "A"},
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
      {"question": "They went by car. (Passé Composé)", "options": ["Ils sont allés en voiture.", "Elles sont allées en voiture.", "Ils allaient en voiture.", "Ils iront en voiture."], "answer": "A"},
      {"question": "I did not go yesterday. (Passé Composé - Negative)", "options": ["Je ne suis pas allé hier.", "Tu n'es pas allé hier.", "Il n'est pas allé hier.", "Nous ne sommes pas allés hier."], "answer": "A"},
      {"question": "Did we go to the restaurant? (Passé Composé - Question)", "options": ["Sommes-nous allés au restaurant ?", "Es-tu allé au restaurant ?", "Est-il allé au restaurant ?", "Sont-ils allés au restaurant ?"], "answer": "A"},
      {"question": "You went to the library. (Passé Composé)", "options": ["Tu es allé à la bibliothèque.", "Je suis allé à la bibliothèque.", "Il est allé à la bibliothèque.", "Vous êtes allé à la bibliothèque."], "answer": "A"},
      {"question": "I went yesterday to the market. (Passé Composé)", "options": ["Je suis allé hier au marché.", "Tu es allé hier au marché.", "Il est allé hier au marché.", "Nous sommes allés hier au marché."], "answer": "A"},
      {"question": "She did not go to school last week. (Passé Composé - Negative)", "options": ["Elle n'est pas allée à l'école la semaine dernière.", "Il n'est pas allé à l'école la semaine dernière.", "Tu n'es pas allé à l'école la semaine dernière.", "Nous ne sommes pas allés à l'école la semaine dernière."], "answer": "A"},
      {"question": "Did you go to the gym yesterday? (Passé Composé - Question, informal)", "options": ["Es-tu allé au gymnase hier ?", "Suis-je allé au gymnase hier ?", "Est-il allé au gymnase hier ?", "Êtes-vous allés au gymnase hier ?"], "answer": "A"},
      {"question": "We went to the cinema last weekend. (Passé Composé)", "options": ["Nous sommes allés au cinéma le week-end dernier.", "Vous êtes allés au cinéma le week-end dernier.", "Ils sont allés au cinéma le week-end dernier.", "Je suis allé au cinéma le week-end dernier."], "answer": "A"},
      {"question": "Didn't he go to work yesterday? (Passé Composé - Question)", "options": ["N'est-il pas allé au travail hier ?", "N'est-elle pas allée au travail hier ?", "N'es-tu pas allé au travail hier ?", "N'avons-nous pas allés au travail hier ?"], "answer": "A"},
      {"question": "They did not go to the restaurant last night. (Passé Composé - Negative)", "options": ["Ils ne sont pas allés au restaurant hier soir.", "Elles ne sont pas allées au restaurant hier soir.", "Vous n'êtes pas allés au restaurant hier soir.", "Nous ne sommes pas allés au restaurant hier soir."], "answer": "A"},
      {"question": "Did I go to the market this morning? (Passé Composé - Question)", "options": ["Suis-je allé au marché ce matin ?", "Es-tu allé au marché ce matin ?", "Est-il allé au marché ce matin ?", "Sont-ils allés au marché ce matin ?"], "answer": "A"},
      {"question": "You went to the library last week. (Passé Composé)", "options": ["Tu es allé à la bibliothèque la semaine dernière.", "Je suis allé à la bibliothèque la semaine dernière.", "Il est allé à la bibliothèque la semaine dernière.", "Vous êtes allé à la bibliothèque la semaine dernière."], "answer": "A"},
      {"question": "I did not go to the park last Sunday. (Passé Composé - Negative)", "options": ["Je ne suis pas allé au parc dimanche dernier.", "Tu n'es pas allé au parc dimanche dernier.", "Il n'est pas allé au parc dimanche dernier.", "Nous ne sommes pas allés au parc dimanche dernier."], "answer": "A"},
      {"question": "Did we go to the museum yesterday? (Passé Composé - Question)", "options": ["Sommes-nous allés au musée hier ?", "Es-tu allé au musée hier ?", "Est-il allé au musée hier ?", "Sont-ils allés au musée hier ?"], "answer": "A"}
    ],
    "futur_simple": [
      {"question": "I will go to the beach. (Futur Simple)", "options": ["J'irai à la plage.", "Tu iras à la plage.", "Il ira à la plage.", "Nous irons à la plage."], "answer": "A"},
      {"question": "You will not go to the party. (Futur Simple - Negative)", "options": ["Tu n'iras pas à la fête.", "Je n'irai pas à la fête.", "Il n'ira pas à la fête.", "Nous n'irons pas à la fête."], "answer": "A"},
      {"question": "Will he go to the market? (Futur Simple - Question)", "options": ["Ira-t-il au marché ?", "Iras-tu au marché ?", "Irai-je au marché ?", "Irons-nous au marché ?"], "answer": "A"},
      {"question": "We will go to school tomorrow. (Futur Simple)", "options": ["Nous irons à l'école demain.", "Vous irez à l'école demain.", "Ils iront à l'école demain.", "Je irai à l'école demain."], "answer": "A"},
      {"question": "She will not go to work. (Futur Simple - Negative)", "options": ["Elle n'ira pas au travail.", "Il n'ira pas au travail.", "Tu n'iras pas au travail.", "Nous n'irons pas au travail."], "answer": "A"},
      {"question": "Will you come with me? (Futur Simple - Question, formal/plural)", "options": ["Irez-vous avec moi ?", "Iras-tu avec moi ?", "Ira-t-il avec moi ?", "Irons-nous avec moi ?"], "answer": "A"},
      {"question": "They will go to the cinema for sure. (Futur Simple)", "options": ["Ils iront au cinéma sûrement.", "Elles iront au cinéma sûrement.", "Ils iraient au cinéma sûrement.", "Ils allaient au cinéma sûrement."], "answer": "A"},
      {"question": "I will not go to the city tomorrow. (Futur Simple - Negative)", "options": ["Je n'irai pas en ville demain.", "Tu n'iras pas en ville demain.", "Il n'ira pas en ville demain.", "Nous n'irons pas en ville demain."], "answer": "A"},
      {"question": "Will we go together? (Futur Simple - Question)", "options": ["Irons-nous ensemble ?", "Irai-je ensemble ?", "Irez-vous ensemble ?", "Iront-ils ensemble ?"], "answer": "A"},
      {"question": "You will go to the museum. (Futur Simple)", "options": ["Tu iras au musée.", "Je irai au musée.", "Il ira au musée.", "Vous irez au musée."], "answer": "A"},
      {"question": "I will go to the market next week. (Futur Simple)", "options": ["J'irai au marché la semaine prochaine.", "Tu iras au marché la semaine prochaine.", "Il ira au marché la semaine prochaine.", "Nous irons au marché la semaine prochaine."], "answer": "A"},
      {"question": "She will not go to school tomorrow. (Futur Simple - Negative)", "options": ["Elle n'ira pas à l'école demain.", "Il n'ira pas à l'école demain.", "Tu n'iras pas à l'école demain.", "Nous n'irons pas à l'école demain."], "answer": "A"},
      {"question": "Will you (informal) go to the party? (Futur Simple - Question)", "options": ["Iras-tu à la fête ?", "Irai-je à la fête ?", "Ira-t-il à la fête ?", "Irez-vous à la fête ?"], "answer": "A"},
      {"question": "We will go by car next month. (Futur Simple)", "options": ["Nous irons en voiture le mois prochain.", "Vous irez en voiture le mois prochain.", "Ils iront en voiture le mois prochain.", "Je irai en voiture le mois prochain."], "answer": "A"},
      {"question": "He will not go to the gym tomorrow. (Futur Simple - Negative)", "options": ["Il n'ira pas au gymnase demain.", "Je n'irai pas au gymnase demain.", "Tu n'iras pas au gymnase demain.", "Ils n'iront pas au gymnase demain."], "answer": "A"},
      {"question": "Will they go to the library next week? (Futur Simple - Question, male/mixed)", "options": ["Iront-ils à la bibliothèque la semaine prochaine ?", "Iront-elles à la bibliothèque la semaine prochaine ?", "Irez-vous à la bibliothèque la semaine prochaine ?", "Iras-tu à la bibliothèque la semaine prochaine ?"], "answer": "A"},
      {"question": "I will not go to the cinema next weekend. (Futur Simple - Negative)", "options": ["Je n'irai pas au cinéma le week-end prochain.", "Tu n'iras pas au cinéma le week-end prochain.", "Il n'ira pas au cinéma le week-end prochain.", "Nous n'irons pas au cinéma le week-end prochain."], "answer": "A"},
      {"question": "Will we go to the stadium tomorrow? (Futur Simple - Question)", "options": ["Irons-nous au stade demain ?", "Irai-je au stade demain ?", "Irez-vous au stade demain ?", "Iront-ils au stade demain ?"], "answer": "A"},
      {"question": "You will go to the restaurant next Friday. (Futur Simple)", "options": ["Tu iras au restaurant vendredi prochain.", "Je irai au restaurant vendredi prochain.", "Il ira au restaurant vendredi prochain.", "Vous irez au restaurant vendredi prochain."], "answer": "A"},
      {"question": "We will go to the concert tomorrow evening. (Futur Simple)", "options": ["Nous irons au concert demain soir.", "Vous irez au concert demain soir.", "Ils iront au concert demain soir.", "Je irai au concert demain soir."], "answer": "A"}
    ]
  },
  
  "être": {
    "present": [
      {"question": "I am happy / I am being happy. (Présent)", "options": ["Je suis heureux.", "Tu es heureux.", "Il est heureux.", "Nous sommes heureux."], "answer": "A"},
      {"question": "You are not tired / You are not being tired. (Présent - Negative, informal)", "options": ["Tu n'es pas fatigué.", "Je ne suis pas fatigué.", "Il n'est pas fatigué.", "Nous ne sommes pas fatigués."], "answer": "A"},
      {"question": "Is he ready / Is he being ready? (Présent - Question)", "options": ["Est-il prêt ?", "Es-tu prêt ?", "Suis-je prêt ?", "Êtes-vous prêts ?"], "answer": "A"},
      {"question": "We are happy / We are being happy. (Présent)", "options": ["Nous sommes heureux.", "Vous êtes heureux.", "Ils sont heureux.", "Je suis heureux."], "answer": "A"},
      {"question": "She is not here / She is not being here. (Présent - Negative)", "options": ["Elle n'est pas ici.", "Il n'est pas ici.", "Tu n'es pas ici.", "Nous ne sommes pas ici."], "answer": "A"},
      {"question": "Are you (formal) tired? (Présent - Question)", "options": ["Êtes-vous fatigué ?", "Es-tu fatigué ?", "Est-il fatigué ?", "Sont-ils fatigués ?"], "answer": "A"},
      {"question": "They are at home / They are being at home. (male/mixed) (Présent)", "options": ["Ils sont à la maison.", "Elles sont à la maison.", "Ils étaient à la maison.", "Ils seront à la maison."], "answer": "A"},
      {"question": "They are not here / They are not being here. (female) (Présent - Negative)", "options": ["Elles ne sont pas ici.", "Ils ne sont pas ici.", "Vous n'êtes pas ici.", "Nous ne sommes pas ici."], "answer": "A"},
      {"question": "Am I late? / Am I being late? (Présent - Question)", "options": ["Suis-je en retard ?", "Es-tu en retard ?", "Est-il en retard ?", "Sommes-nous en retard ?"], "answer": "A"},
      {"question": "Are you (informal) ready? (Présent - Question)", "options": ["Es-tu prêt ?", "Suis-je prêt ?", "Est-il prêt ?", "Êtes-vous prêts ?"], "answer": "A"},
      {"question": "Is he here? / Is he being here? (Présent - Question)", "options": ["Est-il ici ?", "Est-elle ici ?", "Es-tu ici ?", "Êtes-vous ici ?"], "answer": "A"},
      {"question": "Is she tired? (Présent - Question)", "options": ["Est-elle fatiguée ?", "Est-il fatigué ?", "Es-tu fatigué ?", "Êtes-vous fatigués ?"], "answer": "A"},
      {"question": "Are we ready? (Présent - Question)", "options": ["Sommes-nous prêts ?", "Suis-je prêt ?", "Êtes-vous prêts ?", "Sont-ils prêts ?"], "answer": "A"},
      {"question": "Are you (formal) happy? (Présent - Question)", "options": ["Êtes-vous heureux ?", "Es-tu heureux ?", "Suis-je heureux ?", "Sont-ils heureux ?"], "answer": "A"},
      {"question": "Are they here? (male/mixed) (Présent - Question)", "options": ["Sont-ils ici ?", "Sont-elles ici ?", "Êtes-vous ici ?", "Es-tu ici ?"], "answer": "A"},
      {"question": "Are they here? (female) (Présent - Question)", "options": ["Sont-elles ici ?", "Sont-ils ici ?", "Êtes-vous ici ?", "Es-tu ici ?"], "answer": "A"},
      {"question": "I am not busy / I am not being busy. (Présent - Negative)", "options": ["Je ne suis pas occupé.", "Tu n'es pas occupé.", "Il n'est pas occupé.", "Nous ne sommes pas occupés."], "answer": "A"},
      {"question": "He is not late / He is not being late. (Présent - Negative)", "options": ["Il n'est pas en retard.", "Je ne suis pas en retard.", "Tu n'es pas en retard.", "Ils ne sont pas en retard."], "answer": "A"},
      {"question": "Aren't we ready? (Présent - Negative Question)", "options": ["Ne sommes-nous pas prêts ?", "N'êtes-vous pas prêts ?", "Ne sont-ils pas prêts ?", "Ne suis-je pas prêt ?"], "answer": "A"},
      {"question": "Aren't they tired? (female) (Présent - Negative Question)", "options": ["Ne sont-elles pas fatiguées ?", "Ne sont-ils pas fatigués ?", "N'êtes-vous pas fatigués ?", "Ne sommes-nous pas fatigués ?"], "answer": "A"}
    ],
    "passé_composé": [
      {"question": "I was happy. (Passé Composé)", "options": ["J'ai été heureux.", "Tu as été heureux.", "Il a été heureux.", "Nous avons été heureux."], "answer": "A"},
      {"question": "You were not tired. (Passé Composé - Negative, informal)", "options": ["Tu n'as pas été fatigué.", "Je n'ai pas été fatigué.", "Il n'a pas été fatigué.", "Nous n'avons pas été fatigués."], "answer": "A"},
      {"question": "Was he ready? (Passé Composé - Question)", "options": ["A-t-il été prêt ?", "As-tu été prêt ?", "Ai-je été prêt ?", "Avez-vous été prêts ?"], "answer": "A"},
      {"question": "We were happy last week. (Passé Composé)", "options": ["Nous avons été heureux la semaine dernière.", "Vous avez été heureux la semaine dernière.", "Ils ont été heureux la semaine dernière.", "J'ai été heureux la semaine dernière."], "answer": "A"},
      {"question": "She was not here. (Passé Composé - Negative)", "options": ["Elle n'a pas été ici.", "Il n'a pas été ici.", "Tu n'as pas été ici.", "Nous n'avons pas été ici."], "answer": "A"},
      {"question": "Were you (formal) tired? (Passé Composé - Question)", "options": ["Avez-vous été fatigué ?", "As-tu été fatigué ?", "A-t-il été fatigué ?", "Ont-ils été fatigués ?"], "answer": "A"},
      {"question": "They were at home. (male/mixed) (Passé Composé)", "options": ["Ils ont été à la maison.", "Elles ont été à la maison.", "Ils avaient été à la maison.", "Ils seront à la maison."], "answer": "A"},
      {"question": "They were not here. (female) (Passé Composé - Negative)", "options": ["Elles n'ont pas été ici.", "Ils n'ont pas été ici.", "Vous n'avez pas été ici.", "Nous n'avons pas été ici."], "answer": "A"},
      {"question": "Was I late? (Passé Composé - Question)", "options": ["Ai-je été en retard ?", "As-tu été en retard ?", "A-t-il été en retard ?", "Avons-nous été en retard ?"], "answer": "A"},
      {"question": "Were you (informal) ready? (Passé Composé - Question)", "options": ["As-tu été prêt ?", "Ai-je été prêt ?", "A-t-il été prêt ?", "Avez-vous été prêts ?"], "answer": "A"},
      {"question": "Was he here? (Passé Composé - Question)", "options": ["A-t-il été ici ?", "A-t-elle été ici ?", "As-tu été ici ?", "Avez-vous été ici ?"], "answer": "A"},
      {"question": "Was she tired? (Passé Composé - Question)", "options": ["A-t-elle été fatiguée ?", "A-t-il été fatigué ?", "As-tu été fatigué ?", "Avez-vous été fatigués ?"], "answer": "A"},
      {"question": "Were we ready? (Passé Composé - Question)", "options": ["Avons-nous été prêts ?", "Ai-je été prêt ?", "Avez-vous été prêts ?", "Ont-ils été prêts ?"], "answer": "A"},
      {"question": "Were you (formal) happy? (Passé Composé - Question)", "options": ["Avez-vous été heureux ?", "As-tu été heureux ?", "Ai-je été heureux ?", "Ont-ils été heureux ?"], "answer": "A"},
      {"question": "Were they here? (male/mixed) (Passé Composé - Question)", "options": ["Ont-ils été ici ?", "Ont-elles été ici ?", "Avez-vous été ici ?", "As-tu été ici ?"], "answer": "A"},
      {"question": "Were they here? (female) (Passé Composé - Question)", "options": ["Ont-elles été ici ?", "Ont-ils été ici ?", "Avez-vous été ici ?", "As-tu été ici ?"], "answer": "A"},
      {"question": "I was not busy. (Passé Composé - Negative)", "options": ["Je n'ai pas été occupé.", "Tu n'as pas été occupé.", "Il n'a pas été occupé.", "Nous n'avons pas été occupés."], "answer": "A"},
      {"question": "He was not late. (Passé Composé - Negative)", "options": ["Il n'a pas été en retard.", "Je n'ai pas été en retard.", "Tu n'as pas été en retard.", "Ils n'ont pas été en retard."], "answer": "A"},
      {"question": "Weren't we ready? (Passé Composé - Negative Question)", "options": ["N'avons-nous pas été prêts ?", "N'avez-vous pas été prêts ?", "N'ont-ils pas été prêts ?", "N'ai-je pas été prêt ?"], "answer": "A"},
      {"question": "Weren't they tired? (female) (Passé Composé - Negative Question)", "options": ["N'ont-elles pas été fatiguées ?", "N'ont-ils pas été fatigués ?", "N'avez-vous pas été fatigués ?", "N'avons-nous pas été fatigués ?"], "answer": "A"}
    ],
    "futur_simple": [
      {"question": "I will be happy. (Futur Simple)", "options": ["Je serai heureux.", "Tu seras heureux.", "Il sera heureux.", "Nous serons heureux."], "answer": "A"},
      {"question": "You will not be tired. (Futur Simple - Negative)", "options": ["Tu ne seras pas fatigué.", "Je ne serai pas fatigué.", "Il ne sera pas fatigué.", "Nous ne serons pas fatigués."], "answer": "A"},
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
  }
};