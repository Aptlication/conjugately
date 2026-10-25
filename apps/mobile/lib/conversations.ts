// GENERATED from the doc "Post-Quiz Dialogues" (all 96, approved 19 Oct 2026).
// Do not edit by hand: change the doc, then regenerate this file and the clips
// (scripts/generate-conversation-audio.mjs). Keys are "Level|TimeFrame|unit verb",
// the same level, time frame and verb the course quiz is launched with.

export type ConvTurn =
  | { who: "app"; fr: string; en: string; audio: string }
  | { who: "you"; fr: string; en: string; accept: string[] };

export type Conversation = {
  level: string;
  verb: string;
  tense: string;
  turns: ConvTurn[];
  newWords: { fr: string; en: string }[];
};

export const CONVERSATIONS: Record<string, Conversation> = {
 "Beginner|Present|être": {
  "level": "Beginner",
  "verb": "être",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Bonjour ! Es-tu étudiant ?",
    "en": "Hello! Are you a student?",
    "audio": "BEG_etre_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je suis étudiant.",
    "en": "Yes, I am a student.",
    "accept": [
     "Oui, je suis étudiant.",
     "Oui, je suis étudiante."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton ami, il est où ?",
    "en": "And your friend, where is he?",
    "audio": "BEG_etre_pres_3"
   },
   {
    "who": "you",
    "fr": "Il est à la maison.",
    "en": "He is at home.",
    "accept": [
     "Il est à la maison.",
     "Il est chez lui."
    ]
   },
   {
    "who": "app",
    "fr": "Super. Moi, je suis au café !",
    "en": "Great. I'm at the café!",
    "audio": "BEG_etre_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "un étudiant / une étudiante",
    "en": "student"
   },
   {
    "fr": "la maison",
    "en": "home"
   },
   {
    "fr": "le café",
    "en": "café"
   }
  ]
 },
 "Beginner|Past|être": {
  "level": "Beginner",
  "verb": "être",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "As-tu été malade hier ?",
    "en": "Were you ill yesterday?",
    "audio": "BEG_etre_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'ai été malade.",
    "en": "Yes, I was ill.",
    "accept": [
     "Oui, j'ai été malade.",
     "Oui, j'ai été malade hier."
    ]
   },
   {
    "who": "app",
    "fr": "Et vous, avez-vous été en retard ce matin ?",
    "en": "And you all, were you late this morning?",
    "audio": "BEG_etre_pc_3"
   },
   {
    "who": "you",
    "fr": "Oui, nous avons été en retard.",
    "en": "Yes, we were late.",
    "accept": [
     "Oui, nous avons été en retard.",
     "Oui, on a été en retard."
    ]
   },
   {
    "who": "app",
    "fr": "Ce n'est pas grave !",
    "en": "That's all right!",
    "audio": "BEG_etre_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "malade",
    "en": "ill"
   },
   {
    "fr": "hier",
    "en": "yesterday"
   },
   {
    "fr": "en retard",
    "en": "late"
   },
   {
    "fr": "ce matin",
    "en": "this morning"
   },
   {
    "fr": "Ce n'est pas grave",
    "en": "That's all right"
   }
  ]
 },
 "Beginner|Future|être": {
  "level": "Beginner",
  "verb": "être",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Seras-tu à Paris demain ?",
    "en": "Will you be in Paris tomorrow?",
    "audio": "BEG_etre_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je serai à Paris.",
    "en": "Yes, I will be in Paris.",
    "accept": [
     "Oui, je serai à Paris.",
     "Oui, je serai à Paris demain."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes parents, seront-ils là aussi ?",
    "en": "And your parents, will they be there too?",
    "audio": "BEG_etre_fut_3"
   },
   {
    "who": "you",
    "fr": "Non, ils seront à Lyon.",
    "en": "No, they will be in Lyon.",
    "accept": [
     "Non, ils seront à Lyon."
    ]
   },
   {
    "who": "app",
    "fr": "Bon voyage !",
    "en": "Have a good trip!",
    "audio": "BEG_etre_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "demain",
    "en": "tomorrow"
   },
   {
    "fr": "les parents",
    "en": "parents"
   },
   {
    "fr": "Bon voyage",
    "en": "Have a good trip"
   }
  ]
 },
 "Beginner|Present|avoir": {
  "level": "Beginner",
  "verb": "avoir",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "As-tu un chien ?",
    "en": "Do you have a dog?",
    "audio": "BEG_avoir_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'ai un chien.",
    "en": "Yes, I have a dog.",
    "accept": [
     "Oui, j'ai un chien."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta sœur, a-t-elle un chat ?",
    "en": "And your sister, does she have a cat?",
    "audio": "BEG_avoir_pres_3"
   },
   {
    "who": "you",
    "fr": "Non, elle a un lapin.",
    "en": "No, she has a rabbit.",
    "accept": [
     "Non, elle a un lapin."
    ]
   },
   {
    "who": "app",
    "fr": "Quelle famille !",
    "en": "What a family!",
    "audio": "BEG_avoir_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "un chien",
    "en": "dog"
   },
   {
    "fr": "une sœur",
    "en": "sister"
   },
   {
    "fr": "un chat",
    "en": "cat"
   },
   {
    "fr": "un lapin",
    "en": "rabbit"
   }
  ]
 },
 "Beginner|Past|avoir": {
  "level": "Beginner",
  "verb": "avoir",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "As-tu eu un cadeau pour ton anniversaire ?",
    "en": "Did you get a present for your birthday?",
    "audio": "BEG_avoir_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'ai eu un beau cadeau.",
    "en": "Yes, I got a lovely present.",
    "accept": [
     "Oui, j'ai eu un beau cadeau.",
     "Oui, j'ai eu un cadeau."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton frère, a-t-il eu un cadeau aussi ?",
    "en": "And your brother, did he get a present too?",
    "audio": "BEG_avoir_pc_3"
   },
   {
    "who": "you",
    "fr": "Oui, il a eu un vélo.",
    "en": "Yes, he got a bike.",
    "accept": [
     "Oui, il a eu un vélo."
    ]
   },
   {
    "who": "app",
    "fr": "Quelle chance !",
    "en": "How lucky!",
    "audio": "BEG_avoir_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "un cadeau",
    "en": "present"
   },
   {
    "fr": "un anniversaire",
    "en": "birthday"
   },
   {
    "fr": "un frère",
    "en": "brother"
   },
   {
    "fr": "un vélo",
    "en": "bike"
   },
   {
    "fr": "Quelle chance !",
    "en": "How lucky!"
   }
  ]
 },
 "Beginner|Future|avoir": {
  "level": "Beginner",
  "verb": "avoir",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Auras-tu le temps demain ?",
    "en": "Will you have time tomorrow?",
    "audio": "BEG_avoir_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'aurai le temps.",
    "en": "Yes, I will have time.",
    "accept": [
     "Oui, j'aurai le temps.",
     "Oui, j'aurai le temps demain."
    ]
   },
   {
    "who": "app",
    "fr": "Et Paul, aura-t-il le temps aussi ?",
    "en": "And Paul, will he have time too?",
    "audio": "BEG_avoir_fut_3"
   },
   {
    "who": "you",
    "fr": "Non, il aura du travail.",
    "en": "No, he will have work.",
    "accept": [
     "Non, il aura du travail."
    ]
   },
   {
    "who": "app",
    "fr": "D'accord, à demain !",
    "en": "OK, see you tomorrow!",
    "audio": "BEG_avoir_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "le temps",
    "en": "time"
   },
   {
    "fr": "le travail",
    "en": "work"
   },
   {
    "fr": "À demain",
    "en": "See you tomorrow"
   }
  ]
 },
 "Beginner|Present|faire": {
  "level": "Beginner",
  "verb": "faire",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Qu'est-ce que tu fais ce soir ?",
    "en": "What are you doing tonight?",
    "audio": "BEG_faire_pres_1"
   },
   {
    "who": "you",
    "fr": "Je fais un gâteau.",
    "en": "I'm making a cake.",
    "accept": [
     "Je fais un gâteau.",
     "Ce soir, je fais un gâteau."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes amis, qu'est-ce qu'ils font ?",
    "en": "And your friends, what are they doing?",
    "audio": "BEG_faire_pres_3"
   },
   {
    "who": "you",
    "fr": "Ils font leurs devoirs.",
    "en": "They are doing their homework.",
    "accept": [
     "Ils font leurs devoirs."
    ]
   },
   {
    "who": "app",
    "fr": "Bon courage à tous !",
    "en": "Good luck, everyone!",
    "audio": "BEG_faire_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "ce soir",
    "en": "tonight"
   },
   {
    "fr": "un gâteau",
    "en": "cake"
   },
   {
    "fr": "les devoirs",
    "en": "homework"
   },
   {
    "fr": "Bon courage",
    "en": "Good luck"
   }
  ]
 },
 "Beginner|Past|faire": {
  "level": "Beginner",
  "verb": "faire",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "Qu'est-ce que tu as fait hier ?",
    "en": "What did you do yesterday?",
    "audio": "BEG_faire_pc_1"
   },
   {
    "who": "you",
    "fr": "J'ai fait les courses.",
    "en": "I did the shopping.",
    "accept": [
     "J'ai fait les courses.",
     "Hier, j'ai fait les courses."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta mère, qu'est-ce qu'elle a fait ?",
    "en": "And your mother, what did she do?",
    "audio": "BEG_faire_pc_3"
   },
   {
    "who": "you",
    "fr": "Elle a fait une soupe.",
    "en": "She made a soup.",
    "accept": [
     "Elle a fait une soupe."
    ]
   },
   {
    "who": "app",
    "fr": "Miam, très bien !",
    "en": "Yum, lovely!",
    "audio": "BEG_faire_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "les courses",
    "en": "the shopping"
   },
   {
    "fr": "une mère",
    "en": "mother"
   },
   {
    "fr": "une soupe",
    "en": "soup"
   },
   {
    "fr": "Miam",
    "en": "Yum"
   }
  ]
 },
 "Beginner|Future|faire": {
  "level": "Beginner",
  "verb": "faire",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Qu'est-ce que tu feras samedi ?",
    "en": "What will you do on Saturday?",
    "audio": "BEG_faire_fut_1"
   },
   {
    "who": "you",
    "fr": "Je ferai une promenade.",
    "en": "I will go for a walk.",
    "accept": [
     "Je ferai une promenade.",
     "Samedi, je ferai une promenade."
    ]
   },
   {
    "who": "app",
    "fr": "Et dimanche, ferez-vous du sport ?",
    "en": "And on Sunday, will you all do some sport?",
    "audio": "BEG_faire_fut_3"
   },
   {
    "who": "you",
    "fr": "Oui, nous ferons du sport.",
    "en": "Yes, we will do some sport.",
    "accept": [
     "Oui, nous ferons du sport.",
     "Oui, on fera du sport."
    ]
   },
   {
    "who": "app",
    "fr": "Excellent !",
    "en": "Excellent!",
    "audio": "BEG_faire_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "samedi",
    "en": "Saturday"
   },
   {
    "fr": "une promenade",
    "en": "walk"
   },
   {
    "fr": "dimanche",
    "en": "Sunday"
   },
   {
    "fr": "le sport",
    "en": "sport"
   }
  ]
 },
 "Novice|Present|être": {
  "level": "Novice",
  "verb": "être",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Êtes-vous français ?",
    "en": "Are you French?",
    "audio": "NOV_etre_pres_1"
   },
   {
    "who": "you",
    "fr": "Non, nous sommes australiens.",
    "en": "No, we are Australian.",
    "accept": [
     "Non, nous sommes australiens.",
     "Non, nous sommes australiennes.",
     "Non, on est australiens."
    ]
   },
   {
    "who": "app",
    "fr": "Et êtes-vous ici en vacances ?",
    "en": "And are you here on holiday?",
    "audio": "NOV_etre_pres_3"
   },
   {
    "who": "you",
    "fr": "Oui, nous sommes en vacances.",
    "en": "Yes, we are on holiday.",
    "accept": [
     "Oui, nous sommes en vacances.",
     "Oui, on est en vacances."
    ]
   },
   {
    "who": "app",
    "fr": "Bienvenue en France !",
    "en": "Welcome to France!",
    "audio": "NOV_etre_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "français / française",
    "en": "French"
   },
   {
    "fr": "australien / australienne",
    "en": "Australian"
   },
   {
    "fr": "les vacances",
    "en": "holiday"
   },
   {
    "fr": "Bienvenue",
    "en": "Welcome"
   }
  ]
 },
 "Novice|Past|être": {
  "level": "Novice",
  "verb": "être",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "As-tu été en Italie cet été ?",
    "en": "Have you been to Italy this summer?",
    "audio": "NOV_etre_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'ai été à Rome.",
    "en": "Yes, I've been to Rome.",
    "accept": [
     "Oui, j'ai été à Rome."
    ]
   },
   {
    "who": "app",
    "fr": "Et avez-vous été contents du voyage ?",
    "en": "And were you happy with the trip?",
    "audio": "NOV_etre_pc_3"
   },
   {
    "who": "you",
    "fr": "Oui, nous avons été très contents.",
    "en": "Yes, we were very happy.",
    "accept": [
     "Oui, nous avons été très contents.",
     "Oui, on a été très contents."
    ]
   },
   {
    "who": "app",
    "fr": "Ça me fait plaisir !",
    "en": "I'm glad to hear it!",
    "audio": "NOV_etre_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "l'Italie",
    "en": "Italy"
   },
   {
    "fr": "l'été",
    "en": "summer"
   },
   {
    "fr": "content",
    "en": "happy"
   },
   {
    "fr": "le voyage",
    "en": "trip"
   },
   {
    "fr": "Ça me fait plaisir",
    "en": "I'm glad"
   }
  ]
 },
 "Novice|Future|être": {
  "level": "Novice",
  "verb": "être",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Serez-vous à la fête ce soir ?",
    "en": "Will you be at the party tonight?",
    "audio": "NOV_etre_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, nous serons là.",
    "en": "Yes, we will be there.",
    "accept": [
     "Oui, nous serons là.",
     "Oui, on sera là."
    ]
   },
   {
    "who": "app",
    "fr": "Et Julie, sera-t-elle là aussi ?",
    "en": "And Julie, will she be there too?",
    "audio": "NOV_etre_fut_3"
   },
   {
    "who": "you",
    "fr": "Non, elle sera fatiguée.",
    "en": "No, she will be tired.",
    "accept": [
     "Non, elle sera fatiguée."
    ]
   },
   {
    "who": "app",
    "fr": "Dommage ! À ce soir.",
    "en": "Shame! See you tonight.",
    "audio": "NOV_etre_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "la fête",
    "en": "party"
   },
   {
    "fr": "fatigué / fatiguée",
    "en": "tired"
   },
   {
    "fr": "Dommage",
    "en": "Shame"
   }
  ]
 },
 "Novice|Present|avoir": {
  "level": "Novice",
  "verb": "avoir",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Avez-vous des enfants ?",
    "en": "Do you have children?",
    "audio": "NOV_avoir_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, nous avons deux enfants.",
    "en": "Yes, we have two children.",
    "accept": [
     "Oui, nous avons deux enfants.",
     "Oui, on a deux enfants."
    ]
   },
   {
    "who": "app",
    "fr": "Ils ont quel âge ?",
    "en": "How old are they?",
    "audio": "NOV_avoir_pres_3"
   },
   {
    "who": "you",
    "fr": "Ils ont cinq et huit ans.",
    "en": "They are five and eight.",
    "accept": [
     "Ils ont cinq et huit ans."
    ]
   },
   {
    "who": "app",
    "fr": "Quel bel âge !",
    "en": "What a lovely age!",
    "audio": "NOV_avoir_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "les enfants",
    "en": "children"
   },
   {
    "fr": "l'âge",
    "en": "age"
   },
   {
    "fr": "ans",
    "en": "years old"
   }
  ]
 },
 "Novice|Past|avoir": {
  "level": "Novice",
  "verb": "avoir",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "As-tu eu peur pendant le film ?",
    "en": "Were you scared during the film?",
    "audio": "NOV_avoir_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'ai eu très peur.",
    "en": "Yes, I was very scared.",
    "accept": [
     "Oui, j'ai eu très peur.",
     "Oui, j'ai eu peur."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes amis, ont-ils eu peur aussi ?",
    "en": "And your friends, were they scared too?",
    "audio": "NOV_avoir_pc_3"
   },
   {
    "who": "you",
    "fr": "Non, ils n'ont pas eu peur.",
    "en": "No, they weren't scared.",
    "accept": [
     "Non, ils n'ont pas eu peur."
    ]
   },
   {
    "who": "app",
    "fr": "Ils sont courageux !",
    "en": "They're brave!",
    "audio": "NOV_avoir_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "avoir peur",
    "en": "to be scared"
   },
   {
    "fr": "le film",
    "en": "film"
   },
   {
    "fr": "courageux",
    "en": "brave"
   }
  ]
 },
 "Novice|Future|avoir": {
  "level": "Novice",
  "verb": "avoir",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Auras-tu ton permis cette année ?",
    "en": "Will you get your driving licence this year?",
    "audio": "NOV_avoir_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'aurai mon permis en mai.",
    "en": "Yes, I will get my licence in May.",
    "accept": [
     "Oui, j'aurai mon permis en mai.",
     "Oui, j'aurai mon permis."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta sœur, aura-t-elle une voiture ?",
    "en": "And your sister, will she have a car?",
    "audio": "NOV_avoir_fut_3"
   },
   {
    "who": "you",
    "fr": "Oui, elle aura une petite voiture.",
    "en": "Yes, she will have a small car.",
    "accept": [
     "Oui, elle aura une petite voiture.",
     "Oui, elle aura une voiture."
    ]
   },
   {
    "who": "app",
    "fr": "Bonne route !",
    "en": "Safe driving!",
    "audio": "NOV_avoir_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "le permis",
    "en": "driving licence"
   },
   {
    "fr": "cette année",
    "en": "this year"
   },
   {
    "fr": "mai",
    "en": "May"
   },
   {
    "fr": "une voiture",
    "en": "car"
   },
   {
    "fr": "Bonne route",
    "en": "Safe driving"
   }
  ]
 },
 "Novice|Present|faire": {
  "level": "Novice",
  "verb": "faire",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Fait-il beau aujourd'hui ?",
    "en": "Is the weather nice today?",
    "audio": "NOV_faire_pres_1"
   },
   {
    "who": "you",
    "fr": "Non, il fait froid.",
    "en": "No, it's cold.",
    "accept": [
     "Non, il fait froid."
    ]
   },
   {
    "who": "app",
    "fr": "Alors, qu'est-ce que vous faites ?",
    "en": "So, what are you doing?",
    "audio": "NOV_faire_pres_3"
   },
   {
    "who": "you",
    "fr": "Nous faisons un puzzle.",
    "en": "We are doing a jigsaw.",
    "accept": [
     "Nous faisons un puzzle.",
     "On fait un puzzle."
    ]
   },
   {
    "who": "app",
    "fr": "Bonne idée !",
    "en": "Good idea!",
    "audio": "NOV_faire_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "il fait beau",
    "en": "the weather is nice"
   },
   {
    "fr": "il fait froid",
    "en": "it's cold"
   },
   {
    "fr": "un puzzle",
    "en": "jigsaw"
   }
  ]
 },
 "Novice|Past|faire": {
  "level": "Novice",
  "verb": "faire",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "Avez-vous fait bon voyage ?",
    "en": "Did you have a good trip?",
    "audio": "NOV_faire_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, nous avons fait bon voyage.",
    "en": "Yes, we had a good trip.",
    "accept": [
     "Oui, nous avons fait bon voyage.",
     "Oui, on a fait bon voyage."
    ]
   },
   {
    "who": "app",
    "fr": "Et ce matin, qu'est-ce que vous avez fait ?",
    "en": "And this morning, what did you do?",
    "audio": "NOV_faire_pc_3"
   },
   {
    "who": "you",
    "fr": "Nous avons fait le tour de la ville.",
    "en": "We went round the town.",
    "accept": [
     "Nous avons fait le tour de la ville.",
     "On a fait le tour de la ville."
    ]
   },
   {
    "who": "app",
    "fr": "Parfait !",
    "en": "Perfect!",
    "audio": "NOV_faire_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "faire bon voyage",
    "en": "to have a good trip"
   },
   {
    "fr": "faire le tour de",
    "en": "to go round"
   },
   {
    "fr": "la ville",
    "en": "town"
   }
  ]
 },
 "Novice|Future|faire": {
  "level": "Novice",
  "verb": "faire",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Qu'est-ce que vous ferez cet été ?",
    "en": "What will you do this summer?",
    "audio": "NOV_faire_fut_1"
   },
   {
    "who": "you",
    "fr": "Nous ferons un voyage en Espagne.",
    "en": "We will take a trip to Spain.",
    "accept": [
     "Nous ferons un voyage en Espagne.",
     "On fera un voyage en Espagne."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton fils, fera-t-il le voyage aussi ?",
    "en": "And your son, will he come on the trip too?",
    "audio": "NOV_faire_fut_3"
   },
   {
    "who": "you",
    "fr": "Non, il fera un stage.",
    "en": "No, he will do an internship.",
    "accept": [
     "Non, il fera un stage."
    ]
   },
   {
    "who": "app",
    "fr": "Bonnes vacances !",
    "en": "Have a good holiday!",
    "audio": "NOV_faire_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "l'Espagne",
    "en": "Spain"
   },
   {
    "fr": "un fils",
    "en": "son"
   },
   {
    "fr": "un stage",
    "en": "internship"
   },
   {
    "fr": "Bonnes vacances",
    "en": "Have a good holiday"
   }
  ]
 },
 "Novice|Present|aller": {
  "level": "Novice",
  "verb": "aller",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Où est-ce que tu vas ?",
    "en": "Where are you going?",
    "audio": "NOV_aller_pres_1"
   },
   {
    "who": "you",
    "fr": "Je vais à la boulangerie.",
    "en": "I'm going to the bakery.",
    "accept": [
     "Je vais à la boulangerie."
    ]
   },
   {
    "who": "app",
    "fr": "Tes amis vont-ils avec toi ?",
    "en": "Are your friends going with you?",
    "audio": "NOV_aller_pres_3"
   },
   {
    "who": "you",
    "fr": "Non, ils vont au parc.",
    "en": "No, they're going to the park.",
    "accept": [
     "Non, ils vont au parc."
    ]
   },
   {
    "who": "app",
    "fr": "À tout à l'heure !",
    "en": "See you later!",
    "audio": "NOV_aller_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "la boulangerie",
    "en": "bakery"
   },
   {
    "fr": "le parc",
    "en": "park"
   },
   {
    "fr": "À tout à l'heure",
    "en": "See you later"
   }
  ]
 },
 "Novice|Past|aller": {
  "level": "Novice",
  "verb": "aller",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "Es-tu allé au cinéma hier ?",
    "en": "Did you go to the cinema yesterday?",
    "audio": "NOV_aller_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, je suis allé au cinéma.",
    "en": "Yes, I went to the cinema.",
    "accept": [
     "Oui, je suis allé au cinéma.",
     "Oui, je suis allée au cinéma."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta copine, est-elle allée avec toi ?",
    "en": "And your girlfriend, did she go with you?",
    "audio": "NOV_aller_pc_3"
   },
   {
    "who": "you",
    "fr": "Non, elle est allée à la plage.",
    "en": "No, she went to the beach.",
    "accept": [
     "Non, elle est allée à la plage."
    ]
   },
   {
    "who": "app",
    "fr": "Chacun son plaisir !",
    "en": "Each to their own!",
    "audio": "NOV_aller_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "le cinéma",
    "en": "cinema"
   },
   {
    "fr": "une copine",
    "en": "girlfriend"
   },
   {
    "fr": "la plage",
    "en": "beach"
   },
   {
    "fr": "Chacun son plaisir",
    "en": "Each to their own"
   }
  ]
 },
 "Novice|Future|aller": {
  "level": "Novice",
  "verb": "aller",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Iras-tu à la plage demain ?",
    "en": "Will you go to the beach tomorrow?",
    "audio": "NOV_aller_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'irai à la plage.",
    "en": "Yes, I will go to the beach.",
    "accept": [
     "Oui, j'irai à la plage.",
     "Oui, j'irai à la plage demain."
    ]
   },
   {
    "who": "app",
    "fr": "Et vous, irez-vous en voiture ?",
    "en": "And you all, will you go by car?",
    "audio": "NOV_aller_fut_3"
   },
   {
    "who": "you",
    "fr": "Non, nous irons à vélo.",
    "en": "No, we will go by bike.",
    "accept": [
     "Non, nous irons à vélo.",
     "Non, on ira à vélo."
    ]
   },
   {
    "who": "app",
    "fr": "Bonne journée !",
    "en": "Have a nice day!",
    "audio": "NOV_aller_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "en voiture",
    "en": "by car"
   },
   {
    "fr": "à vélo",
    "en": "by bike"
   },
   {
    "fr": "Bonne journée",
    "en": "Have a nice day"
   }
  ]
 },
 "Elementary|Present|dire": {
  "level": "Elementary",
  "verb": "dire",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Comment est-ce qu'on dit « thank you » en français ?",
    "en": "How do you say \"thank you\" in French?",
    "audio": "ELE_dire_pres_1"
   },
   {
    "who": "you",
    "fr": "On dit merci.",
    "en": "You say merci.",
    "accept": [
     "On dit merci.",
     "Nous disons merci."
    ]
   },
   {
    "who": "app",
    "fr": "Et toi, dis-tu bonjour à tes voisins ?",
    "en": "And you, do you say hello to your neighbours?",
    "audio": "ELE_dire_pres_3"
   },
   {
    "who": "you",
    "fr": "Oui, je dis bonjour tous les matins.",
    "en": "Yes, I say hello every morning.",
    "accept": [
     "Oui, je dis bonjour tous les matins.",
     "Oui, je leur dis bonjour."
    ]
   },
   {
    "who": "app",
    "fr": "C'est très poli !",
    "en": "That's very polite!",
    "audio": "ELE_dire_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "merci",
    "en": "thank you"
   },
   {
    "fr": "les voisins",
    "en": "neighbours"
   },
   {
    "fr": "tous les matins",
    "en": "every morning"
   },
   {
    "fr": "poli",
    "en": "polite"
   }
  ]
 },
 "Elementary|Past|dire": {
  "level": "Elementary",
  "verb": "dire",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "Qu'est-ce que tu as dit à Marie ?",
    "en": "What did you say to Marie?",
    "audio": "ELE_dire_pc_1"
   },
   {
    "who": "you",
    "fr": "Je lui ai dit bonjour.",
    "en": "I said hello to her.",
    "accept": [
     "Je lui ai dit bonjour.",
     "J'ai dit bonjour à Marie."
    ]
   },
   {
    "who": "app",
    "fr": "Et elle, qu'est-ce qu'elle a dit ?",
    "en": "And what did she say?",
    "audio": "ELE_dire_pc_3"
   },
   {
    "who": "you",
    "fr": "Elle n'a rien dit.",
    "en": "She said nothing.",
    "accept": [
     "Elle n'a rien dit."
    ]
   },
   {
    "who": "app",
    "fr": "Ah bon ? Vous ne vous êtes pas dit grand-chose !",
    "en": "Really? You didn't say much to each other!",
    "audio": "ELE_dire_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "ne… rien",
    "en": "nothing"
   },
   {
    "fr": "grand-chose",
    "en": "much"
   }
  ]
 },
 "Elementary|Future|dire": {
  "level": "Elementary",
  "verb": "dire",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Diras-tu la vérité à ta mère ?",
    "en": "Will you tell your mother the truth?",
    "audio": "ELE_dire_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je lui dirai la vérité.",
    "en": "Yes, I will tell her the truth.",
    "accept": [
     "Oui, je lui dirai la vérité.",
     "Oui, je dirai la vérité."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton frère, il dira quoi ?",
    "en": "And your brother, what will he say?",
    "audio": "ELE_dire_fut_3"
   },
   {
    "who": "you",
    "fr": "Il ne dira rien.",
    "en": "He will say nothing.",
    "accept": [
     "Il ne dira rien."
    ]
   },
   {
    "who": "app",
    "fr": "Sage décision !",
    "en": "Wise choice!",
    "audio": "ELE_dire_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "la vérité",
    "en": "the truth"
   },
   {
    "fr": "sage",
    "en": "wise"
   },
   {
    "fr": "une décision",
    "en": "decision"
   }
  ]
 },
 "Elementary|Present|voir": {
  "level": "Elementary",
  "verb": "voir",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Vois-tu la tour Eiffel d'ici ?",
    "en": "Can you see the Eiffel Tower from here?",
    "audio": "ELE_voir_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je la vois.",
    "en": "Yes, I can see it.",
    "accept": [
     "Oui, je la vois.",
     "Oui, je vois la tour Eiffel."
    ]
   },
   {
    "who": "app",
    "fr": "Et vous, voyez-vous la Seine ?",
    "en": "And you all, can you see the Seine?",
    "audio": "ELE_voir_pres_3"
   },
   {
    "who": "you",
    "fr": "Non, nous ne voyons pas la Seine.",
    "en": "No, we can't see the Seine.",
    "accept": [
     "Non, nous ne voyons pas la Seine.",
     "Non, on ne voit pas la Seine."
    ]
   },
   {
    "who": "app",
    "fr": "Montez plus haut, alors !",
    "en": "Go higher up, then!",
    "audio": "ELE_voir_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "la tour Eiffel",
    "en": "the Eiffel Tower"
   },
   {
    "fr": "d'ici",
    "en": "from here"
   },
   {
    "fr": "la Seine",
    "en": "the Seine"
   },
   {
    "fr": "plus haut",
    "en": "higher up"
   }
  ]
 },
 "Elementary|Past|voir": {
  "level": "Elementary",
  "verb": "voir",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "As-tu vu le match hier soir ?",
    "en": "Did you see the match last night?",
    "audio": "ELE_voir_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'ai vu le match.",
    "en": "Yes, I saw the match.",
    "accept": [
     "Oui, j'ai vu le match."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes amis, ont-ils vu le match aussi ?",
    "en": "And your friends, did they see the match too?",
    "audio": "ELE_voir_pc_3"
   },
   {
    "who": "you",
    "fr": "Non, ils ont vu un film.",
    "en": "No, they saw a film.",
    "accept": [
     "Non, ils ont vu un film."
    ]
   },
   {
    "who": "app",
    "fr": "Chacun ses goûts !",
    "en": "Each to their own!",
    "audio": "ELE_voir_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "le match",
    "en": "match"
   },
   {
    "fr": "hier soir",
    "en": "last night"
   },
   {
    "fr": "un film",
    "en": "film"
   },
   {
    "fr": "Chacun ses goûts",
    "en": "Each to their own"
   }
  ]
 },
 "Elementary|Future|voir": {
  "level": "Elementary",
  "verb": "voir",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Verras-tu tes grands-parents ce week-end ?",
    "en": "Will you see your grandparents this weekend?",
    "audio": "ELE_voir_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je les verrai dimanche.",
    "en": "Yes, I will see them on Sunday.",
    "accept": [
     "Oui, je les verrai dimanche.",
     "Oui, je verrai mes grands-parents dimanche."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta sœur, les verra-t-elle aussi ?",
    "en": "And your sister, will she see them too?",
    "audio": "ELE_voir_fut_3"
   },
   {
    "who": "you",
    "fr": "Non, elle verra ses amis.",
    "en": "No, she will see her friends.",
    "accept": [
     "Non, elle verra ses amis."
    ]
   },
   {
    "who": "app",
    "fr": "Bon week-end !",
    "en": "Have a good weekend!",
    "audio": "ELE_voir_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "les grands-parents",
    "en": "grandparents"
   },
   {
    "fr": "le week-end",
    "en": "weekend"
   },
   {
    "fr": "Bon week-end",
    "en": "Have a good weekend"
   }
  ]
 },
 "Elementary|Present|savoir": {
  "level": "Elementary",
  "verb": "savoir",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Sais-tu nager ?",
    "en": "Can you swim?",
    "audio": "ELE_savoir_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je sais nager.",
    "en": "Yes, I can swim.",
    "accept": [
     "Oui, je sais nager."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes enfants, savent-ils nager ?",
    "en": "And your children, can they swim?",
    "audio": "ELE_savoir_pres_3"
   },
   {
    "who": "you",
    "fr": "Non, ils ne savent pas encore.",
    "en": "No, they can't yet.",
    "accept": [
     "Non, ils ne savent pas encore.",
     "Non, ils ne savent pas encore nager."
    ]
   },
   {
    "who": "app",
    "fr": "Ils apprendront vite !",
    "en": "They'll learn quickly!",
    "audio": "ELE_savoir_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "nager",
    "en": "to swim"
   },
   {
    "fr": "pas encore",
    "en": "not yet"
   },
   {
    "fr": "apprendre",
    "en": "to learn"
   },
   {
    "fr": "vite",
    "en": "quickly"
   }
  ]
 },
 "Elementary|Past|savoir": {
  "level": "Elementary",
  "verb": "savoir",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "Comment tu as su la nouvelle ?",
    "en": "How did you find out the news?",
    "audio": "ELE_savoir_pc_1"
   },
   {
    "who": "you",
    "fr": "Je l'ai su ce matin.",
    "en": "I found out this morning.",
    "accept": [
     "Je l'ai su ce matin.",
     "J'ai su ce matin."
    ]
   },
   {
    "who": "app",
    "fr": "Et Marc, l'a-t-il su avant toi ?",
    "en": "And Marc, did he find out before you?",
    "audio": "ELE_savoir_pc_3"
   },
   {
    "who": "you",
    "fr": "Oui, il l'a su hier.",
    "en": "Yes, he found out yesterday.",
    "accept": [
     "Oui, il l'a su hier.",
     "Oui, il a su hier."
    ]
   },
   {
    "who": "app",
    "fr": "Les nouvelles vont vite !",
    "en": "News travels fast!",
    "audio": "ELE_savoir_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "la nouvelle",
    "en": "the news"
   },
   {
    "fr": "avant",
    "en": "before"
   },
   {
    "fr": "Les nouvelles vont vite",
    "en": "News travels fast"
   }
  ]
 },
 "Elementary|Future|savoir": {
  "level": "Elementary",
  "verb": "savoir",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Sauras-tu le résultat demain ?",
    "en": "Will you know the result tomorrow?",
    "audio": "ELE_savoir_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je saurai demain matin.",
    "en": "Yes, I will know tomorrow morning.",
    "accept": [
     "Oui, je saurai demain matin.",
     "Oui, je le saurai demain matin."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes parents, ils le sauront quand ?",
    "en": "And your parents, when will they know?",
    "audio": "ELE_savoir_fut_3"
   },
   {
    "who": "you",
    "fr": "Ils le sauront vendredi.",
    "en": "They will know on Friday.",
    "accept": [
     "Ils le sauront vendredi.",
     "Ils sauront vendredi."
    ]
   },
   {
    "who": "app",
    "fr": "Bonne chance !",
    "en": "Good luck!",
    "audio": "ELE_savoir_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "le résultat",
    "en": "result"
   },
   {
    "fr": "vendredi",
    "en": "Friday"
   },
   {
    "fr": "Bonne chance",
    "en": "Good luck"
   }
  ]
 },
 "Elementary|Present|vouloir": {
  "level": "Elementary",
  "verb": "vouloir",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Veux-tu un café ?",
    "en": "Do you want a coffee?",
    "audio": "ELE_vouloir_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je veux un café.",
    "en": "Yes, I want a coffee.",
    "accept": [
     "Oui, je veux un café.",
     "Oui, je veux bien un café."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton ami, veut-il un thé ?",
    "en": "And your friend, does he want a tea?",
    "audio": "ELE_vouloir_pres_3"
   },
   {
    "who": "you",
    "fr": "Non, il veut un chocolat chaud.",
    "en": "No, he wants a hot chocolate.",
    "accept": [
     "Non, il veut un chocolat chaud."
    ]
   },
   {
    "who": "app",
    "fr": "Tout de suite !",
    "en": "Coming right up!",
    "audio": "ELE_vouloir_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "un thé",
    "en": "tea"
   },
   {
    "fr": "un chocolat chaud",
    "en": "hot chocolate"
   },
   {
    "fr": "Tout de suite",
    "en": "Right away"
   }
  ]
 },
 "Elementary|Past|vouloir": {
  "level": "Elementary",
  "verb": "vouloir",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "Pourquoi tu as voulu partir tôt ?",
    "en": "Why did you want to leave early?",
    "audio": "ELE_vouloir_pc_1"
   },
   {
    "who": "you",
    "fr": "J'ai voulu voir le coucher du soleil.",
    "en": "I wanted to see the sunset.",
    "accept": [
     "J'ai voulu voir le coucher du soleil."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes amis, ont-ils voulu venir ?",
    "en": "And your friends, did they want to come?",
    "audio": "ELE_vouloir_pc_3"
   },
   {
    "who": "you",
    "fr": "Non, ils ont voulu rester.",
    "en": "No, they wanted to stay.",
    "accept": [
     "Non, ils ont voulu rester."
    ]
   },
   {
    "who": "app",
    "fr": "Tant pis pour eux !",
    "en": "Their loss!",
    "audio": "ELE_vouloir_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "partir",
    "en": "to leave"
   },
   {
    "fr": "tôt",
    "en": "early"
   },
   {
    "fr": "le coucher du soleil",
    "en": "sunset"
   },
   {
    "fr": "rester",
    "en": "to stay"
   },
   {
    "fr": "Tant pis",
    "en": "Too bad"
   }
  ]
 },
 "Elementary|Future|vouloir": {
  "level": "Elementary",
  "verb": "vouloir",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Qu'est-ce que tu voudras faire à Paris ?",
    "en": "What will you want to do in Paris?",
    "audio": "ELE_vouloir_fut_1"
   },
   {
    "who": "you",
    "fr": "Je voudrai voir les musées.",
    "en": "I will want to see the museums.",
    "accept": [
     "Je voudrai voir les musées."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta copine, voudra-t-elle faire du shopping ?",
    "en": "And your girlfriend, will she want to go shopping?",
    "audio": "ELE_vouloir_fut_3"
   },
   {
    "who": "you",
    "fr": "Oui, elle voudra faire du shopping.",
    "en": "Yes, she will want to go shopping.",
    "accept": [
     "Oui, elle voudra faire du shopping."
    ]
   },
   {
    "who": "app",
    "fr": "Paris vous attend !",
    "en": "Paris is waiting for you!",
    "audio": "ELE_vouloir_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "les musées",
    "en": "museums"
   },
   {
    "fr": "faire du shopping",
    "en": "to go shopping"
   }
  ]
 },
 "Elementary|Present|venir": {
  "level": "Elementary",
  "verb": "venir",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Viens-tu à la fête samedi ?",
    "en": "Are you coming to the party on Saturday?",
    "audio": "ELE_venir_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je viens avec mon frère.",
    "en": "Yes, I'm coming with my brother.",
    "accept": [
     "Oui, je viens avec mon frère."
    ]
   },
   {
    "who": "app",
    "fr": "Vos amis viennent-ils aussi ?",
    "en": "Are your friends coming too?",
    "audio": "ELE_venir_pres_3"
   },
   {
    "who": "you",
    "fr": "Oui, ils viennent à huit heures.",
    "en": "Yes, they're coming at eight.",
    "accept": [
     "Oui, ils viennent à huit heures."
    ]
   },
   {
    "who": "app",
    "fr": "Parfait, à samedi !",
    "en": "Perfect, see you Saturday!",
    "audio": "ELE_venir_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "avec",
    "en": "with"
   },
   {
    "fr": "huit heures",
    "en": "eight o'clock"
   },
   {
    "fr": "À samedi",
    "en": "See you Saturday"
   }
  ]
 },
 "Elementary|Past|venir": {
  "level": "Elementary",
  "verb": "venir",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "Es-tu venu en train ?",
    "en": "Did you come by train?",
    "audio": "ELE_venir_pc_1"
   },
   {
    "who": "you",
    "fr": "Non, je suis venu en voiture.",
    "en": "No, I came by car.",
    "accept": [
     "Non, je suis venu en voiture.",
     "Non, je suis venue en voiture."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta femme, est-elle venue avec toi ?",
    "en": "And your wife, did she come with you?",
    "audio": "ELE_venir_pc_3"
   },
   {
    "who": "you",
    "fr": "Oui, elle est venue avec moi.",
    "en": "Yes, she came with me.",
    "accept": [
     "Oui, elle est venue avec moi."
    ]
   },
   {
    "who": "app",
    "fr": "Bienvenue à tous les deux !",
    "en": "Welcome to you both!",
    "audio": "ELE_venir_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "le train",
    "en": "train"
   },
   {
    "fr": "en voiture",
    "en": "by car"
   },
   {
    "fr": "une femme",
    "en": "wife"
   },
   {
    "fr": "tous les deux",
    "en": "both"
   }
  ]
 },
 "Elementary|Future|venir": {
  "level": "Elementary",
  "verb": "venir",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Viendras-tu me voir à Noël ?",
    "en": "Will you come and see me at Christmas?",
    "audio": "ELE_venir_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je viendrai le 24.",
    "en": "Yes, I will come on the 24th.",
    "accept": [
     "Oui, je viendrai le 24.",
     "Oui, je viendrai à Noël."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes enfants, viendront-ils aussi ?",
    "en": "And your children, will they come too?",
    "audio": "ELE_venir_fut_3"
   },
   {
    "who": "you",
    "fr": "Oui, ils viendront aussi.",
    "en": "Yes, they will come too.",
    "accept": [
     "Oui, ils viendront aussi."
    ]
   },
   {
    "who": "app",
    "fr": "Quelle joie !",
    "en": "How lovely!",
    "audio": "ELE_venir_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "Noël",
    "en": "Christmas"
   },
   {
    "fr": "aussi",
    "en": "too"
   },
   {
    "fr": "Quelle joie !",
    "en": "How lovely!"
   }
  ]
 },
 "Elementary|Present|pouvoir": {
  "level": "Elementary",
  "verb": "pouvoir",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Peux-tu m'aider ?",
    "en": "Can you help me?",
    "audio": "ELE_pouvoir_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je peux t'aider.",
    "en": "Yes, I can help you.",
    "accept": [
     "Oui, je peux t'aider."
    ]
   },
   {
    "who": "app",
    "fr": "Tes amis peuvent-ils venir aussi ?",
    "en": "Can your friends come too?",
    "audio": "ELE_pouvoir_pres_3"
   },
   {
    "who": "you",
    "fr": "Non, ils ne peuvent pas venir aujourd'hui.",
    "en": "No, they can't come today.",
    "accept": [
     "Non, ils ne peuvent pas venir aujourd'hui.",
     "Non, ils ne peuvent pas."
    ]
   },
   {
    "who": "app",
    "fr": "Merci quand même !",
    "en": "Thanks anyway!",
    "audio": "ELE_pouvoir_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "aider",
    "en": "to help"
   },
   {
    "fr": "aujourd'hui",
    "en": "today"
   },
   {
    "fr": "Merci quand même",
    "en": "Thanks anyway"
   }
  ]
 },
 "Elementary|Past|pouvoir": {
  "level": "Elementary",
  "verb": "pouvoir",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "As-tu pu finir ton travail ?",
    "en": "Were you able to finish your work?",
    "audio": "ELE_pouvoir_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'ai pu finir.",
    "en": "Yes, I was able to finish.",
    "accept": [
     "Oui, j'ai pu finir.",
     "Oui, j'ai pu finir mon travail."
    ]
   },
   {
    "who": "app",
    "fr": "Et Sophie, a-t-elle pu venir à la réunion ?",
    "en": "And Sophie, was she able to come to the meeting?",
    "audio": "ELE_pouvoir_pc_3"
   },
   {
    "who": "you",
    "fr": "Non, elle n'a pas pu venir.",
    "en": "No, she couldn't come.",
    "accept": [
     "Non, elle n'a pas pu venir."
    ]
   },
   {
    "who": "app",
    "fr": "Dommage pour elle !",
    "en": "Too bad for her!",
    "audio": "ELE_pouvoir_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "finir",
    "en": "to finish"
   },
   {
    "fr": "la réunion",
    "en": "meeting"
   },
   {
    "fr": "Dommage",
    "en": "Too bad"
   }
  ]
 },
 "Elementary|Future|pouvoir": {
  "level": "Elementary",
  "verb": "pouvoir",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Pourras-tu venir demain ?",
    "en": "Will you be able to come tomorrow?",
    "audio": "ELE_pouvoir_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je pourrai venir.",
    "en": "Yes, I will be able to come.",
    "accept": [
     "Oui, je pourrai venir.",
     "Oui, je pourrai venir demain."
    ]
   },
   {
    "who": "app",
    "fr": "Et vous, pourrez-vous rester dîner ?",
    "en": "And you all, will you be able to stay for dinner?",
    "audio": "ELE_pouvoir_fut_3"
   },
   {
    "who": "you",
    "fr": "Non, nous ne pourrons pas rester.",
    "en": "No, we won't be able to stay.",
    "accept": [
     "Non, nous ne pourrons pas rester.",
     "Non, on ne pourra pas rester."
    ]
   },
   {
    "who": "app",
    "fr": "Une autre fois, alors !",
    "en": "Another time, then!",
    "audio": "ELE_pouvoir_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "rester dîner",
    "en": "to stay for dinner"
   },
   {
    "fr": "Une autre fois",
    "en": "Another time"
   }
  ]
 },
 "Elementary|Present|besoin": {
  "level": "Elementary",
  "verb": "avoir besoin de",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "As-tu besoin d'aide ?",
    "en": "Do you need help?",
    "audio": "ELE_avoir-besoin-de_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'ai besoin d'aide.",
    "en": "Yes, I need help.",
    "accept": [
     "Oui, j'ai besoin d'aide."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton voisin, a-t-il besoin de quelque chose ?",
    "en": "And your neighbour, does he need anything?",
    "audio": "ELE_avoir-besoin-de_pres_3"
   },
   {
    "who": "you",
    "fr": "Il a besoin d'un marteau.",
    "en": "He needs a hammer.",
    "accept": [
     "Il a besoin d'un marteau."
    ]
   },
   {
    "who": "app",
    "fr": "J'en ai un !",
    "en": "I've got one!",
    "audio": "ELE_avoir-besoin-de_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "l'aide",
    "en": "help"
   },
   {
    "fr": "un voisin",
    "en": "neighbour"
   },
   {
    "fr": "quelque chose",
    "en": "something"
   },
   {
    "fr": "un marteau",
    "en": "hammer"
   }
  ]
 },
 "Elementary|Past|besoin": {
  "level": "Elementary",
  "verb": "avoir besoin de",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "As-tu eu besoin d'un médecin ?",
    "en": "Did you need a doctor?",
    "audio": "ELE_avoir-besoin-de_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'ai eu besoin d'un médecin.",
    "en": "Yes, I needed a doctor.",
    "accept": [
     "Oui, j'ai eu besoin d'un médecin."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes enfants, ont-ils eu besoin de médicaments ?",
    "en": "And your children, did they need medicine?",
    "audio": "ELE_avoir-besoin-de_pc_3"
   },
   {
    "who": "you",
    "fr": "Non, ils n'en ont pas eu besoin.",
    "en": "No, they didn't need any.",
    "accept": [
     "Non, ils n'en ont pas eu besoin.",
     "Non, ils n'ont pas eu besoin de médicaments."
    ]
   },
   {
    "who": "app",
    "fr": "Tant mieux !",
    "en": "Good!",
    "audio": "ELE_avoir-besoin-de_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "un médecin",
    "en": "doctor"
   },
   {
    "fr": "des médicaments",
    "en": "medicine"
   },
   {
    "fr": "Tant mieux",
    "en": "Good"
   }
  ]
 },
 "Elementary|Future|besoin": {
  "level": "Elementary",
  "verb": "avoir besoin de",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Auras-tu besoin de la voiture demain ?",
    "en": "Will you need the car tomorrow?",
    "audio": "ELE_avoir-besoin-de_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'en aurai besoin le matin.",
    "en": "Yes, I will need it in the morning.",
    "accept": [
     "Oui, j'en aurai besoin le matin.",
     "Oui, j'aurai besoin de la voiture le matin."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton père, aura-t-il besoin de la voiture ?",
    "en": "And your father, will he need the car?",
    "audio": "ELE_avoir-besoin-de_fut_3"
   },
   {
    "who": "you",
    "fr": "Non, il aura besoin du vélo.",
    "en": "No, he will need the bike.",
    "accept": [
     "Non, il aura besoin du vélo."
    ]
   },
   {
    "who": "app",
    "fr": "Pas de problème !",
    "en": "No problem!",
    "audio": "ELE_avoir-besoin-de_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "le matin",
    "en": "the morning"
   },
   {
    "fr": "un père",
    "en": "father"
   },
   {
    "fr": "Pas de problème",
    "en": "No problem"
   }
  ]
 },
 "Intermediate|Present|s'intéresser": {
  "level": "Intermediate",
  "verb": "s'intéresser",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "T'intéresses-tu à l'histoire ?",
    "en": "Are you interested in history?",
    "audio": "INT_s-interesser_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je m'intéresse beaucoup à l'histoire.",
    "en": "Yes, I'm very interested in history.",
    "accept": [
     "Oui, je m'intéresse beaucoup à l'histoire.",
     "Oui, je m'intéresse à l'histoire."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton frère, il s'intéresse à quoi ?",
    "en": "And your brother, what is he interested in?",
    "audio": "INT_s-interesser_pres_3"
   },
   {
    "who": "you",
    "fr": "Il s'intéresse à la musique.",
    "en": "He's interested in music.",
    "accept": [
     "Il s'intéresse à la musique."
    ]
   },
   {
    "who": "app",
    "fr": "C'est passionnant !",
    "en": "That's fascinating!",
    "audio": "INT_s-interesser_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "beaucoup",
    "en": "a lot"
   },
   {
    "fr": "l'histoire",
    "en": "history"
   },
   {
    "fr": "la musique",
    "en": "music"
   },
   {
    "fr": "C'est passionnant",
    "en": "That's fascinating"
   }
  ]
 },
 "Intermediate|Past|s'intéresser": {
  "level": "Intermediate",
  "verb": "s'intéresser",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "Comment tu t'es intéressé au français ?",
    "en": "How did you get interested in French?",
    "audio": "INT_s-interesser_pc_1"
   },
   {
    "who": "you",
    "fr": "Je me suis intéressé au français en voyage.",
    "en": "I got interested in French while travelling.",
    "accept": [
     "Je me suis intéressé au français en voyage.",
     "Je me suis intéressée au français en voyage."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes amis, se sont-ils intéressés au français aussi ?",
    "en": "And your friends, did they get interested in French too?",
    "audio": "INT_s-interesser_pc_3"
   },
   {
    "who": "you",
    "fr": "Non, ils se sont intéressés à l'espagnol.",
    "en": "No, they got interested in Spanish.",
    "accept": [
     "Non, ils se sont intéressés à l'espagnol."
    ]
   },
   {
    "who": "app",
    "fr": "Pourquoi pas !",
    "en": "Why not!",
    "audio": "INT_s-interesser_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "en voyage",
    "en": "while travelling"
   },
   {
    "fr": "les amis",
    "en": "friends"
   },
   {
    "fr": "l'espagnol",
    "en": "Spanish"
   },
   {
    "fr": "Pourquoi pas",
    "en": "Why not"
   }
  ]
 },
 "Intermediate|Future|s'intéresser": {
  "level": "Intermediate",
  "verb": "s'intéresser",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "T'intéresseras-tu au jardinage à la retraite ?",
    "en": "Will you take up gardening when you retire?",
    "audio": "INT_s-interesser_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je m'intéresserai au jardinage.",
    "en": "Yes, I'll take up gardening.",
    "accept": [
     "Oui, je m'intéresserai au jardinage."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta femme, elle s'intéressera à quoi ?",
    "en": "And your wife, what will she take up?",
    "audio": "INT_s-interesser_fut_3"
   },
   {
    "who": "you",
    "fr": "Elle s'intéressera à la peinture.",
    "en": "She'll take up painting.",
    "accept": [
     "Elle s'intéressera à la peinture."
    ]
   },
   {
    "who": "app",
    "fr": "Quelle belle retraite !",
    "en": "What a lovely retirement!",
    "audio": "INT_s-interesser_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "le jardinage",
    "en": "gardening"
   },
   {
    "fr": "la retraite",
    "en": "retirement"
   },
   {
    "fr": "la peinture",
    "en": "painting"
   }
  ]
 },
 "Intermediate|Present|se débrouiller": {
  "level": "Intermediate",
  "verb": "se débrouiller",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Te débrouilles-tu en français ?",
    "en": "Do you get by in French?",
    "audio": "INT_se-debrouiller_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je me débrouille assez bien.",
    "en": "Yes, I get by quite well.",
    "accept": [
     "Oui, je me débrouille assez bien.",
     "Oui, je me débrouille."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta sœur, se débrouille-t-elle en anglais ?",
    "en": "And your sister, does she get by in English?",
    "audio": "INT_se-debrouiller_pres_3"
   },
   {
    "who": "you",
    "fr": "Oui, elle se débrouille très bien.",
    "en": "Yes, she gets by very well.",
    "accept": [
     "Oui, elle se débrouille très bien."
    ]
   },
   {
    "who": "app",
    "fr": "Bravo à vous deux !",
    "en": "Well done, both of you!",
    "audio": "INT_se-debrouiller_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "assez bien",
    "en": "quite well"
   },
   {
    "fr": "l'anglais",
    "en": "English"
   },
   {
    "fr": "Bravo",
    "en": "Well done"
   }
  ]
 },
 "Intermediate|Past|se débrouiller": {
  "level": "Intermediate",
  "verb": "se débrouiller",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "T'es-tu débrouillé à l'aéroport ?",
    "en": "Did you manage at the airport?",
    "audio": "INT_se-debrouiller_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, je me suis débrouillé tout seul.",
    "en": "Yes, I managed on my own.",
    "accept": [
     "Oui, je me suis débrouillé tout seul.",
     "Oui, je me suis débrouillée toute seule."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes parents, se sont-ils débrouillés avec les bagages ?",
    "en": "And your parents, did they manage with the luggage?",
    "audio": "INT_se-debrouiller_pc_3"
   },
   {
    "who": "you",
    "fr": "Oui, ils se sont débrouillés.",
    "en": "Yes, they managed.",
    "accept": [
     "Oui, ils se sont débrouillés."
    ]
   },
   {
    "who": "app",
    "fr": "Super !",
    "en": "Great!",
    "audio": "INT_se-debrouiller_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "l'aéroport",
    "en": "airport"
   },
   {
    "fr": "tout seul / toute seule",
    "en": "on my own"
   },
   {
    "fr": "les bagages",
    "en": "luggage"
   },
   {
    "fr": "Super",
    "en": "Great"
   }
  ]
 },
 "Intermediate|Future|se débrouiller": {
  "level": "Intermediate",
  "verb": "se débrouiller",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Te débrouilleras-tu sans moi demain ?",
    "en": "Will you manage without me tomorrow?",
    "audio": "INT_se-debrouiller_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je me débrouillerai.",
    "en": "Yes, I'll manage.",
    "accept": [
     "Oui, je me débrouillerai."
    ]
   },
   {
    "who": "app",
    "fr": "Et les enfants, se débrouilleront-ils pour le déjeuner ?",
    "en": "And the children, will they manage lunch?",
    "audio": "INT_se-debrouiller_fut_3"
   },
   {
    "who": "you",
    "fr": "Oui, ils se débrouilleront avec des sandwichs.",
    "en": "Yes, they'll manage with sandwiches.",
    "accept": [
     "Oui, ils se débrouilleront avec des sandwichs."
    ]
   },
   {
    "who": "app",
    "fr": "Parfait !",
    "en": "Perfect!",
    "audio": "INT_se-debrouiller_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "sans",
    "en": "without"
   },
   {
    "fr": "le déjeuner",
    "en": "lunch"
   },
   {
    "fr": "des sandwichs",
    "en": "sandwiches"
   },
   {
    "fr": "Parfait",
    "en": "Perfect"
   }
  ]
 },
 "Intermediate|Present|s'ennuyer": {
  "level": "Intermediate",
  "verb": "s'ennuyer",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "T'ennuies-tu le dimanche ?",
    "en": "Do you get bored on Sundays?",
    "audio": "INT_s-ennuyer_pres_1"
   },
   {
    "who": "you",
    "fr": "Non, je ne m'ennuie jamais.",
    "en": "No, I never get bored.",
    "accept": [
     "Non, je ne m'ennuie jamais.",
     "Non, je ne m'ennuie pas."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton chien, s'ennuie-t-il quand tu travailles ?",
    "en": "And your dog, does he get bored when you're working?",
    "audio": "INT_s-ennuyer_pres_3"
   },
   {
    "who": "you",
    "fr": "Oui, il s'ennuie un peu.",
    "en": "Yes, he gets a bit bored.",
    "accept": [
     "Oui, il s'ennuie un peu."
    ]
   },
   {
    "who": "app",
    "fr": "Pauvre chien !",
    "en": "Poor dog!",
    "audio": "INT_s-ennuyer_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "le dimanche",
    "en": "on Sundays"
   },
   {
    "fr": "ne… jamais",
    "en": "never"
   },
   {
    "fr": "un peu",
    "en": "a bit"
   },
   {
    "fr": "pauvre",
    "en": "poor"
   }
  ]
 },
 "Intermediate|Past|s'ennuyer": {
  "level": "Intermediate",
  "verb": "s'ennuyer",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "T'es-tu ennuyé pendant le concert ?",
    "en": "Did you get bored during the concert?",
    "audio": "INT_s-ennuyer_pc_1"
   },
   {
    "who": "you",
    "fr": "Non, je ne me suis pas ennuyé.",
    "en": "No, I didn't get bored.",
    "accept": [
     "Non, je ne me suis pas ennuyé.",
     "Non, je ne me suis pas ennuyée."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta copine, s'est-elle ennuyée ?",
    "en": "And your girlfriend, did she get bored?",
    "audio": "INT_s-ennuyer_pc_3"
   },
   {
    "who": "you",
    "fr": "Oui, elle s'est ennuyée un peu.",
    "en": "Yes, she got a bit bored.",
    "accept": [
     "Oui, elle s'est ennuyée un peu."
    ]
   },
   {
    "who": "app",
    "fr": "C'est la vie !",
    "en": "That's life!",
    "audio": "INT_s-ennuyer_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "pendant",
    "en": "during"
   },
   {
    "fr": "le concert",
    "en": "concert"
   },
   {
    "fr": "C'est la vie",
    "en": "That's life"
   }
  ]
 },
 "Intermediate|Future|s'ennuyer": {
  "level": "Intermediate",
  "verb": "s'ennuyer",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Ne t'ennuieras-tu pas pendant le long voyage ?",
    "en": "Won't you get bored on the long trip?",
    "audio": "INT_s-ennuyer_fut_1"
   },
   {
    "who": "you",
    "fr": "Non, je ne m'ennuierai pas avec un bon livre.",
    "en": "No, I won't get bored with a good book.",
    "accept": [
     "Non, je ne m'ennuierai pas avec un bon livre.",
     "Non, je ne m'ennuierai pas."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton fils, s'ennuiera-t-il ?",
    "en": "And your son, will he get bored?",
    "audio": "INT_s-ennuyer_fut_3"
   },
   {
    "who": "you",
    "fr": "Non, il ne s'ennuiera pas avec sa tablette.",
    "en": "No, he won't get bored with his tablet.",
    "accept": [
     "Non, il ne s'ennuiera pas avec sa tablette.",
     "Non, il ne s'ennuiera pas."
    ]
   },
   {
    "who": "app",
    "fr": "Bon voyage, alors !",
    "en": "Have a good trip, then!",
    "audio": "INT_s-ennuyer_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "long",
    "en": "long"
   },
   {
    "fr": "un livre",
    "en": "book"
   },
   {
    "fr": "une tablette",
    "en": "tablet"
   },
   {
    "fr": "alors",
    "en": "then"
   }
  ]
 },
 "Intermediate|Present|s'entraîner": {
  "level": "Intermediate",
  "verb": "s'entraîner",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "T'entraînes-tu souvent ?",
    "en": "Do you train often?",
    "audio": "INT_s-entrainer_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je m'entraîne trois fois par semaine.",
    "en": "Yes, I train three times a week.",
    "accept": [
     "Oui, je m'entraîne trois fois par semaine.",
     "Oui, je m'entraîne souvent."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton équipe, s'entraîne-t-elle le samedi ?",
    "en": "And your team, does it train on Saturdays?",
    "audio": "INT_s-entrainer_pres_3"
   },
   {
    "who": "you",
    "fr": "Non, elle s'entraîne le mercredi.",
    "en": "No, it trains on Wednesdays.",
    "accept": [
     "Non, elle s'entraîne le mercredi."
    ]
   },
   {
    "who": "app",
    "fr": "Bon entraînement !",
    "en": "Enjoy your training!",
    "audio": "INT_s-entrainer_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "souvent",
    "en": "often"
   },
   {
    "fr": "trois fois par semaine",
    "en": "three times a week"
   },
   {
    "fr": "une équipe",
    "en": "team"
   },
   {
    "fr": "le mercredi",
    "en": "on Wednesdays"
   },
   {
    "fr": "Bon entraînement",
    "en": "Enjoy your training"
   }
  ]
 },
 "Intermediate|Past|s'entraîner": {
  "level": "Intermediate",
  "verb": "s'entraîner",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "T'es-tu entraîné pour le marathon ?",
    "en": "Did you train for the marathon?",
    "audio": "INT_s-entrainer_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, je me suis entraîné tous les jours.",
    "en": "Yes, I trained every day.",
    "accept": [
     "Oui, je me suis entraîné tous les jours.",
     "Oui, je me suis entraînée tous les jours."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta sœur, s'est-elle entraînée avec toi ?",
    "en": "And your sister, did she train with you?",
    "audio": "INT_s-entrainer_pc_3"
   },
   {
    "who": "you",
    "fr": "Oui, nous nous sommes entraînés ensemble.",
    "en": "Yes, we trained together.",
    "accept": [
     "Oui, nous nous sommes entraînés ensemble.",
     "Oui, on s'est entraînés ensemble."
    ]
   },
   {
    "who": "app",
    "fr": "Vous êtes prêts, alors !",
    "en": "You're ready, then!",
    "audio": "INT_s-entrainer_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "le marathon",
    "en": "marathon"
   },
   {
    "fr": "tous les jours",
    "en": "every day"
   },
   {
    "fr": "ensemble",
    "en": "together"
   },
   {
    "fr": "prêt / prête",
    "en": "ready"
   }
  ]
 },
 "Intermediate|Future|s'entraîner": {
  "level": "Intermediate",
  "verb": "s'entraîner",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "T'entraîneras-tu avant l'examen ?",
    "en": "Will you practise before the exam?",
    "audio": "INT_s-entrainer_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je m'entraînerai tous les soirs.",
    "en": "Yes, I'll practise every evening.",
    "accept": [
     "Oui, je m'entraînerai tous les soirs."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes camarades, s'entraîneront-ils aussi ?",
    "en": "And your classmates, will they practise too?",
    "audio": "INT_s-entrainer_fut_3"
   },
   {
    "who": "you",
    "fr": "Oui, ils s'entraîneront avec moi.",
    "en": "Yes, they'll practise with me.",
    "accept": [
     "Oui, ils s'entraîneront avec moi."
    ]
   },
   {
    "who": "app",
    "fr": "Excellent !",
    "en": "Excellent!",
    "audio": "INT_s-entrainer_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "l'examen",
    "en": "exam"
   },
   {
    "fr": "tous les soirs",
    "en": "every evening"
   },
   {
    "fr": "les camarades",
    "en": "classmates"
   },
   {
    "fr": "Excellent",
    "en": "Excellent"
   }
  ]
 },
 "Intermediate|Present|se souvenir": {
  "level": "Intermediate",
  "verb": "se souvenir",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Te souviens-tu de ton premier jour d'école ?",
    "en": "Do you remember your first day at school?",
    "audio": "INT_se-souvenir_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je m'en souviens très bien.",
    "en": "Yes, I remember it very well.",
    "accept": [
     "Oui, je m'en souviens très bien.",
     "Oui, je me souviens de mon premier jour d'école."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta mère, s'en souvient-elle aussi ?",
    "en": "And your mother, does she remember it too?",
    "audio": "INT_se-souvenir_pres_3"
   },
   {
    "who": "you",
    "fr": "Oui, elle s'en souvient.",
    "en": "Yes, she remembers it.",
    "accept": [
     "Oui, elle s'en souvient."
    ]
   },
   {
    "who": "app",
    "fr": "Que de souvenirs !",
    "en": "So many memories!",
    "audio": "INT_se-souvenir_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "premier / première",
    "en": "first"
   },
   {
    "fr": "un jour d'école",
    "en": "school day"
   },
   {
    "fr": "un souvenir",
    "en": "memory"
   }
  ]
 },
 "Intermediate|Past|se souvenir": {
  "level": "Intermediate",
  "verb": "se souvenir",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "T'es-tu souvenu de l'anniversaire de ta sœur ?",
    "en": "Did you remember your sister's birthday?",
    "audio": "INT_se-souvenir_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, je m'en suis souvenu à temps.",
    "en": "Yes, I remembered it in time.",
    "accept": [
     "Oui, je m'en suis souvenu à temps.",
     "Oui, je m'en suis souvenue à temps."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton frère, s'en est-il souvenu ?",
    "en": "And your brother, did he remember it?",
    "audio": "INT_se-souvenir_pc_3"
   },
   {
    "who": "you",
    "fr": "Non, il ne s'en est pas souvenu.",
    "en": "No, he didn't remember it.",
    "accept": [
     "Non, il ne s'en est pas souvenu."
    ]
   },
   {
    "who": "app",
    "fr": "Oh là là !",
    "en": "Oh dear!",
    "audio": "INT_se-souvenir_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "à temps",
    "en": "in time"
   },
   {
    "fr": "Oh là là",
    "en": "Oh dear"
   }
  ]
 },
 "Intermediate|Future|se souvenir": {
  "level": "Intermediate",
  "verb": "se souvenir",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Te souviendras-tu de ce voyage ?",
    "en": "Will you remember this trip?",
    "audio": "INT_se-souvenir_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je m'en souviendrai toujours.",
    "en": "Yes, I'll always remember it.",
    "accept": [
     "Oui, je m'en souviendrai toujours."
    ]
   },
   {
    "who": "app",
    "fr": "Et les enfants, s'en souviendront-ils ?",
    "en": "And the children, will they remember it?",
    "audio": "INT_se-souvenir_fut_3"
   },
   {
    "who": "you",
    "fr": "Oui, ils s'en souviendront aussi.",
    "en": "Yes, they'll remember it too.",
    "accept": [
     "Oui, ils s'en souviendront aussi.",
     "Oui, ils s'en souviendront.",
     "Oui, ils s'en souviendront toujours."
    ]
   },
   {
    "who": "app",
    "fr": "C'est ça, les beaux voyages !",
    "en": "That's what great trips are like!",
    "audio": "INT_se-souvenir_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "toujours",
    "en": "always"
   },
   {
    "fr": "longtemps",
    "en": "a long time"
   },
   {
    "fr": "beau / belle",
    "en": "lovely"
   }
  ]
 },
 "Intermediate|Present|s'adapter": {
  "level": "Intermediate",
  "verb": "s'adapter",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "T'adaptes-tu bien à ton nouveau travail ?",
    "en": "Are you settling into your new job?",
    "audio": "INT_s-adapter_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je m'adapte bien.",
    "en": "Yes, I'm settling in well.",
    "accept": [
     "Oui, je m'adapte bien."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes collègues, s'adaptent-ils à toi ?",
    "en": "And your colleagues, are they getting used to you?",
    "audio": "INT_s-adapter_pres_3"
   },
   {
    "who": "you",
    "fr": "Oui, ils s'adaptent très vite.",
    "en": "Yes, they're getting used to me very quickly.",
    "accept": [
     "Oui, ils s'adaptent très vite."
    ]
   },
   {
    "who": "app",
    "fr": "Tout va bien, alors !",
    "en": "All's well, then!",
    "audio": "INT_s-adapter_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "nouveau / nouvelle",
    "en": "new"
   },
   {
    "fr": "les collègues",
    "en": "colleagues"
   },
   {
    "fr": "Tout va bien",
    "en": "All's well"
   }
  ]
 },
 "Intermediate|Past|s'adapter": {
  "level": "Intermediate",
  "verb": "s'adapter",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "T'es-tu adapté à la vie en France ?",
    "en": "Did you adapt to life in France?",
    "audio": "INT_s-adapter_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, je me suis vite adapté.",
    "en": "Yes, I adapted quickly.",
    "accept": [
     "Oui, je me suis vite adapté.",
     "Oui, je me suis vite adaptée."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta famille, s'est-elle adaptée aussi ?",
    "en": "And your family, did they adapt too?",
    "audio": "INT_s-adapter_pc_3"
   },
   {
    "who": "you",
    "fr": "Oui, elle s'est adaptée sans problème.",
    "en": "Yes, they adapted without any trouble.",
    "accept": [
     "Oui, elle s'est adaptée sans problème."
    ]
   },
   {
    "who": "app",
    "fr": "Félicitations !",
    "en": "Congratulations!",
    "audio": "INT_s-adapter_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "la vie",
    "en": "life"
   },
   {
    "fr": "la France",
    "en": "France"
   },
   {
    "fr": "la famille",
    "en": "family"
   },
   {
    "fr": "sans problème",
    "en": "without any trouble"
   },
   {
    "fr": "Félicitations",
    "en": "Congratulations"
   }
  ]
 },
 "Intermediate|Future|s'adapter": {
  "level": "Intermediate",
  "verb": "s'adapter",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "T'adapteras-tu au climat là-bas ?",
    "en": "Will you adapt to the climate over there?",
    "audio": "INT_s-adapter_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je m'adapterai facilement.",
    "en": "Yes, I'll adapt easily.",
    "accept": [
     "Oui, je m'adapterai facilement."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes plantes, s'adapteront-elles ?",
    "en": "And your plants, will they adapt?",
    "audio": "INT_s-adapter_fut_3"
   },
   {
    "who": "you",
    "fr": "Non, elles ne s'adapteront pas.",
    "en": "No, they won't adapt.",
    "accept": [
     "Non, elles ne s'adapteront pas."
    ]
   },
   {
    "who": "app",
    "fr": "Alors, laisse-les chez moi !",
    "en": "Then leave them at my place!",
    "audio": "INT_s-adapter_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "le climat",
    "en": "climate"
   },
   {
    "fr": "là-bas",
    "en": "over there"
   },
   {
    "fr": "facilement",
    "en": "easily"
   },
   {
    "fr": "une plante",
    "en": "plant"
   },
   {
    "fr": "chez moi",
    "en": "at my place"
   }
  ]
 },
 "Intermediate|Present|se réjouir": {
  "level": "Intermediate",
  "verb": "se réjouir",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Te réjouis-tu de partir en vacances ?",
    "en": "Are you excited to go on holiday?",
    "audio": "INT_se-rejouir_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je me réjouis beaucoup.",
    "en": "Yes, I'm really excited.",
    "accept": [
     "Oui, je me réjouis beaucoup.",
     "Oui, je me réjouis de partir en vacances."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes enfants, se réjouissent-ils aussi ?",
    "en": "And your children, are they excited too?",
    "audio": "INT_se-rejouir_pres_3"
   },
   {
    "who": "you",
    "fr": "Oui, ils se réjouissent de voir la mer.",
    "en": "Yes, they're excited to see the sea.",
    "accept": [
     "Oui, ils se réjouissent de voir la mer."
    ]
   },
   {
    "who": "app",
    "fr": "Profitez bien !",
    "en": "Enjoy it!",
    "audio": "INT_se-rejouir_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "partir en vacances",
    "en": "to go on holiday"
   },
   {
    "fr": "la mer",
    "en": "the sea"
   },
   {
    "fr": "Profitez bien",
    "en": "Enjoy it"
   }
  ]
 },
 "Intermediate|Past|se réjouir": {
  "level": "Intermediate",
  "verb": "se réjouir",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "T'es-tu réjoui de la nouvelle ?",
    "en": "Were you delighted by the news?",
    "audio": "INT_se-rejouir_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, je me suis beaucoup réjoui.",
    "en": "Yes, I was really delighted.",
    "accept": [
     "Oui, je me suis beaucoup réjoui.",
     "Oui, je me suis beaucoup réjouie."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes grands-parents, se sont-ils réjouis ?",
    "en": "And your grandparents, were they delighted?",
    "audio": "INT_se-rejouir_pc_3"
   },
   {
    "who": "you",
    "fr": "Oui, ils se sont réjouis avec nous.",
    "en": "Yes, they were delighted along with us.",
    "accept": [
     "Oui, ils se sont réjouis avec nous."
    ]
   },
   {
    "who": "app",
    "fr": "Quelle belle nouvelle !",
    "en": "What lovely news!",
    "audio": "INT_se-rejouir_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "Quelle belle nouvelle",
    "en": "What lovely news"
   }
  ]
 },
 "Intermediate|Future|se réjouir": {
  "level": "Intermediate",
  "verb": "se réjouir",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Te réjouiras-tu de le voir ?",
    "en": "Will you be glad to see him?",
    "audio": "INT_se-rejouir_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je me réjouirai de le revoir.",
    "en": "Yes, I'll be glad to see him again.",
    "accept": [
     "Oui, je me réjouirai de le revoir.",
     "Oui, je me réjouirai de le voir."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta mère, se réjouira-t-elle aussi ?",
    "en": "And your mother, will she be glad too?",
    "audio": "INT_se-rejouir_fut_3"
   },
   {
    "who": "you",
    "fr": "Oui, elle se réjouira beaucoup.",
    "en": "Yes, she'll be very glad.",
    "accept": [
     "Oui, elle se réjouira beaucoup."
    ]
   },
   {
    "who": "app",
    "fr": "Ce sera une belle journée !",
    "en": "It'll be a lovely day!",
    "audio": "INT_se-rejouir_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "revoir",
    "en": "to see again"
   },
   {
    "fr": "une journée",
    "en": "day"
   }
  ]
 },
 "Intermediate|Present|mettre": {
  "level": "Intermediate",
  "verb": "mettre",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Mets-tu un manteau aujourd'hui ?",
    "en": "Are you wearing a coat today?",
    "audio": "INT_mettre_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je mets mon manteau bleu.",
    "en": "Yes, I'm wearing my blue coat.",
    "accept": [
     "Oui, je mets mon manteau bleu.",
     "Oui, je mets un manteau."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton fils, il met quoi ?",
    "en": "And your son, what is he wearing?",
    "audio": "INT_mettre_pres_3"
   },
   {
    "who": "you",
    "fr": "Il met un pull et une écharpe.",
    "en": "He's wearing a jumper and a scarf.",
    "accept": [
     "Il met un pull et une écharpe."
    ]
   },
   {
    "who": "app",
    "fr": "Bien couverts, tous les deux !",
    "en": "Well wrapped up, both of you!",
    "audio": "INT_mettre_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "un manteau",
    "en": "coat"
   },
   {
    "fr": "bleu",
    "en": "blue"
   },
   {
    "fr": "un pull",
    "en": "jumper"
   },
   {
    "fr": "une écharpe",
    "en": "scarf"
   },
   {
    "fr": "bien couvert",
    "en": "well wrapped up"
   }
  ]
 },
 "Intermediate|Past|mettre": {
  "level": "Intermediate",
  "verb": "mettre",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "Où est-ce que tu as mis les clés ?",
    "en": "Where did you put the keys?",
    "audio": "INT_mettre_pc_1"
   },
   {
    "who": "you",
    "fr": "J'ai mis les clés sur la table.",
    "en": "I put the keys on the table.",
    "accept": [
     "J'ai mis les clés sur la table.",
     "Je les ai mises sur la table."
    ]
   },
   {
    "who": "app",
    "fr": "Et le pain, ta sœur l'a mis où ?",
    "en": "And the bread, where did your sister put it?",
    "audio": "INT_mettre_pc_3"
   },
   {
    "who": "you",
    "fr": "Elle l'a mis dans le placard.",
    "en": "She put it in the cupboard.",
    "accept": [
     "Elle l'a mis dans le placard."
    ]
   },
   {
    "who": "app",
    "fr": "Merci, c'est noté !",
    "en": "Thanks, got it!",
    "audio": "INT_mettre_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "les clés",
    "en": "keys"
   },
   {
    "fr": "la table",
    "en": "table"
   },
   {
    "fr": "le pain",
    "en": "bread"
   },
   {
    "fr": "le placard",
    "en": "cupboard"
   },
   {
    "fr": "C'est noté",
    "en": "Got it"
   }
  ]
 },
 "Intermediate|Future|mettre": {
  "level": "Intermediate",
  "verb": "mettre",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Mettras-tu la table ce soir ?",
    "en": "Will you set the table tonight?",
    "audio": "INT_mettre_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je mettrai la table.",
    "en": "Yes, I'll set the table.",
    "accept": [
     "Oui, je mettrai la table."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton frère, il mettra combien d'assiettes ?",
    "en": "And your brother, how many plates will he put out?",
    "audio": "INT_mettre_fut_3"
   },
   {
    "who": "you",
    "fr": "Il mettra six assiettes.",
    "en": "He'll put out six plates.",
    "accept": [
     "Il mettra six assiettes."
    ]
   },
   {
    "who": "app",
    "fr": "Parfait, on sera six !",
    "en": "Perfect, there'll be six of us!",
    "audio": "INT_mettre_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "mettre la table",
    "en": "to set the table"
   },
   {
    "fr": "combien",
    "en": "how many"
   },
   {
    "fr": "une assiette",
    "en": "plate"
   },
   {
    "fr": "six",
    "en": "six"
   }
  ]
 },
 "Intermediate|Present|trouver": {
  "level": "Intermediate",
  "verb": "trouver",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Trouves-tu ce livre intéressant ?",
    "en": "Do you find this book interesting?",
    "audio": "INT_trouver_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je le trouve très intéressant.",
    "en": "Yes, I find it very interesting.",
    "accept": [
     "Oui, je le trouve très intéressant."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta copine, elle le trouve comment ?",
    "en": "And your girlfriend, what does she think of it?",
    "audio": "INT_trouver_pres_3"
   },
   {
    "who": "you",
    "fr": "Elle le trouve un peu long.",
    "en": "She finds it a bit long.",
    "accept": [
     "Elle le trouve un peu long."
    ]
   },
   {
    "who": "app",
    "fr": "Chacun son avis !",
    "en": "Everyone has their own opinion!",
    "audio": "INT_trouver_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "intéressant",
    "en": "interesting"
   },
   {
    "fr": "comment",
    "en": "how"
   },
   {
    "fr": "un avis",
    "en": "opinion"
   }
  ]
 },
 "Intermediate|Past|trouver": {
  "level": "Intermediate",
  "verb": "trouver",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "As-tu trouvé ton portefeuille ?",
    "en": "Did you find your wallet?",
    "audio": "INT_trouver_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'ai trouvé mon portefeuille sous le lit.",
    "en": "Yes, I found my wallet under the bed.",
    "accept": [
     "Oui, j'ai trouvé mon portefeuille sous le lit.",
     "Oui, je l'ai trouvé."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes lunettes, ta mère les a-t-elle trouvées ?",
    "en": "And your glasses, did your mother find them?",
    "audio": "INT_trouver_pc_3"
   },
   {
    "who": "you",
    "fr": "Non, elle ne les a pas trouvées.",
    "en": "No, she didn't find them.",
    "accept": [
     "Non, elle ne les a pas trouvées."
    ]
   },
   {
    "who": "app",
    "fr": "On va chercher ensemble !",
    "en": "We'll look together!",
    "audio": "INT_trouver_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "un portefeuille",
    "en": "wallet"
   },
   {
    "fr": "sous le lit",
    "en": "under the bed"
   },
   {
    "fr": "les lunettes",
    "en": "glasses"
   },
   {
    "fr": "chercher",
    "en": "to look for"
   }
  ]
 },
 "Intermediate|Future|trouver": {
  "level": "Intermediate",
  "verb": "trouver",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Trouveras-tu un appartement à Paris ?",
    "en": "Will you find a flat in Paris?",
    "audio": "INT_trouver_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je trouverai un petit appartement.",
    "en": "Yes, I'll find a small flat.",
    "accept": [
     "Oui, je trouverai un petit appartement."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes amis, trouveront-ils du travail là-bas ?",
    "en": "And your friends, will they find work there?",
    "audio": "INT_trouver_fut_3"
   },
   {
    "who": "you",
    "fr": "Oui, ils trouveront du travail facilement.",
    "en": "Yes, they'll find work easily.",
    "accept": [
     "Oui, ils trouveront du travail facilement."
    ]
   },
   {
    "who": "app",
    "fr": "Bonne installation !",
    "en": "Good luck settling in!",
    "audio": "INT_trouver_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "un appartement",
    "en": "flat"
   },
   {
    "fr": "Paris",
    "en": "Paris"
   },
   {
    "fr": "petit",
    "en": "small"
   },
   {
    "fr": "Bonne installation",
    "en": "Good luck settling in"
   }
  ]
 },
 "Intermediate|Present|croire": {
  "level": "Intermediate",
  "verb": "croire",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Crois-tu aux fantômes ?",
    "en": "Do you believe in ghosts?",
    "audio": "INT_croire_pres_1"
   },
   {
    "who": "you",
    "fr": "Non, je ne crois pas aux fantômes.",
    "en": "No, I don't believe in ghosts.",
    "accept": [
     "Non, je ne crois pas aux fantômes.",
     "Non, je n'y crois pas."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta grand-mère, y croit-elle ?",
    "en": "And your grandmother, does she believe in them?",
    "audio": "INT_croire_pres_3"
   },
   {
    "who": "you",
    "fr": "Oui, elle y croit un peu.",
    "en": "Yes, she believes in them a little.",
    "accept": [
     "Oui, elle y croit un peu."
    ]
   },
   {
    "who": "app",
    "fr": "Chacun ses croyances !",
    "en": "Everyone has their own beliefs!",
    "audio": "INT_croire_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "un fantôme",
    "en": "ghost"
   },
   {
    "fr": "une grand-mère",
    "en": "grandmother"
   },
   {
    "fr": "y",
    "en": "in them"
   },
   {
    "fr": "une croyance",
    "en": "belief"
   }
  ]
 },
 "Intermediate|Past|croire": {
  "level": "Intermediate",
  "verb": "croire",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "As-tu cru son histoire ?",
    "en": "Did you believe his story?",
    "audio": "INT_croire_pc_1"
   },
   {
    "who": "you",
    "fr": "Non, je n'ai pas cru son histoire.",
    "en": "No, I didn't believe his story.",
    "accept": [
     "Non, je n'ai pas cru son histoire.",
     "Non, je ne l'ai pas crue."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton patron, l'a-t-il crue ?",
    "en": "And your boss, did he believe it?",
    "audio": "INT_croire_pc_3"
   },
   {
    "who": "you",
    "fr": "Oui, il l'a crue tout de suite.",
    "en": "Yes, he believed it straight away.",
    "accept": [
     "Oui, il l'a crue tout de suite."
    ]
   },
   {
    "who": "app",
    "fr": "Quel naïf !",
    "en": "How gullible!",
    "audio": "INT_croire_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "une histoire",
    "en": "story"
   },
   {
    "fr": "le patron",
    "en": "boss"
   },
   {
    "fr": "naïf / naïve",
    "en": "gullible"
   }
  ]
 },
 "Intermediate|Future|croire": {
  "level": "Intermediate",
  "verb": "croire",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Tes parents te croiront-ils ?",
    "en": "Will your parents believe you?",
    "audio": "INT_croire_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, ils me croiront.",
    "en": "Yes, they'll believe me.",
    "accept": [
     "Oui, ils me croiront."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton professeur, te croira-t-il ?",
    "en": "And your teacher, will he believe you?",
    "audio": "INT_croire_fut_3"
   },
   {
    "who": "you",
    "fr": "Non, il ne me croira jamais.",
    "en": "No, he'll never believe me.",
    "accept": [
     "Non, il ne me croira jamais."
    ]
   },
   {
    "who": "app",
    "fr": "Dis la vérité, alors !",
    "en": "Tell the truth, then!",
    "audio": "INT_croire_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "le professeur",
    "en": "teacher"
   },
   {
    "fr": "Dis la vérité",
    "en": "Tell the truth"
   }
  ]
 },
 "Intermediate|Present|parler": {
  "level": "Intermediate",
  "verb": "parler",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Tu parles quelles langues ?",
    "en": "Which languages do you speak?",
    "audio": "INT_parler_pres_1"
   },
   {
    "who": "you",
    "fr": "Je parle anglais et un peu français.",
    "en": "I speak English and a little French.",
    "accept": [
     "Je parle anglais et un peu français.",
     "Je parle anglais et français."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes voisins, parlent-ils anglais ?",
    "en": "And your neighbours, do they speak English?",
    "audio": "INT_parler_pres_3"
   },
   {
    "who": "you",
    "fr": "Non, ils parlent seulement français.",
    "en": "No, they only speak French.",
    "accept": [
     "Non, ils parlent seulement français."
    ]
   },
   {
    "who": "app",
    "fr": "Tu as de la chance, alors !",
    "en": "You're lucky, then!",
    "audio": "INT_parler_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "une langue",
    "en": "language"
   },
   {
    "fr": "seulement",
    "en": "only"
   },
   {
    "fr": "avoir de la chance",
    "en": "to be lucky"
   }
  ]
 },
 "Intermediate|Past|parler": {
  "level": "Intermediate",
  "verb": "parler",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "As-tu parlé à ton propriétaire ?",
    "en": "Did you speak to your landlord?",
    "audio": "INT_parler_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, je lui ai parlé ce matin.",
    "en": "Yes, I spoke to him this morning.",
    "accept": [
     "Oui, je lui ai parlé ce matin.",
     "Oui, j'ai parlé à mon propriétaire."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta colocataire, lui a-t-elle parlé ?",
    "en": "And your flatmate, did she speak to him?",
    "audio": "INT_parler_pc_3"
   },
   {
    "who": "you",
    "fr": "Non, elle ne lui a pas encore parlé.",
    "en": "No, she hasn't spoken to him yet.",
    "accept": [
     "Non, elle ne lui a pas encore parlé."
    ]
   },
   {
    "who": "app",
    "fr": "Il faut lui parler vite !",
    "en": "She needs to speak to him soon!",
    "audio": "INT_parler_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "le propriétaire",
    "en": "landlord"
   },
   {
    "fr": "une colocataire",
    "en": "flatmate"
   },
   {
    "fr": "il faut",
    "en": "you need to"
   }
  ]
 },
 "Intermediate|Future|parler": {
  "level": "Intermediate",
  "verb": "parler",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Parleras-tu au directeur demain ?",
    "en": "Will you speak to the manager tomorrow?",
    "audio": "INT_parler_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je lui parlerai demain matin.",
    "en": "Yes, I'll speak to him tomorrow morning.",
    "accept": [
     "Oui, je lui parlerai demain matin.",
     "Oui, je parlerai au directeur demain."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes collègues, lui parleront-ils aussi ?",
    "en": "And your colleagues, will they speak to him too?",
    "audio": "INT_parler_fut_3"
   },
   {
    "who": "you",
    "fr": "Oui, nous lui parlerons ensemble.",
    "en": "Yes, we'll speak to him together.",
    "accept": [
     "Oui, nous lui parlerons ensemble.",
     "Oui, on lui parlera ensemble."
    ]
   },
   {
    "who": "app",
    "fr": "Courage !",
    "en": "Hang in there!",
    "audio": "INT_parler_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "le directeur",
    "en": "manager"
   },
   {
    "fr": "demain matin",
    "en": "tomorrow morning"
   },
   {
    "fr": "Courage",
    "en": "Hang in there"
   }
  ]
 },
 "Intermediate|Present|prendre": {
  "level": "Intermediate",
  "verb": "prendre",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Prends-tu le bus pour aller au travail ?",
    "en": "Do you take the bus to work?",
    "audio": "INT_prendre_pres_1"
   },
   {
    "who": "you",
    "fr": "Non, je prends le métro.",
    "en": "No, I take the metro.",
    "accept": [
     "Non, je prends le métro."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta femme, prend-elle le métro aussi ?",
    "en": "And your wife, does she take the metro too?",
    "audio": "INT_prendre_pres_3"
   },
   {
    "who": "you",
    "fr": "Non, elle prend son vélo.",
    "en": "No, she takes her bike.",
    "accept": [
     "Non, elle prend son vélo."
    ]
   },
   {
    "who": "app",
    "fr": "C'est bon pour la santé !",
    "en": "That's good for your health!",
    "audio": "INT_prendre_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "le bus",
    "en": "bus"
   },
   {
    "fr": "le métro",
    "en": "metro"
   },
   {
    "fr": "la santé",
    "en": "health"
   }
  ]
 },
 "Intermediate|Past|prendre": {
  "level": "Intermediate",
  "verb": "prendre",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "Qu'est-ce que tu as pris au restaurant ?",
    "en": "What did you have at the restaurant?",
    "audio": "INT_prendre_pc_1"
   },
   {
    "who": "you",
    "fr": "J'ai pris le poisson.",
    "en": "I had the fish.",
    "accept": [
     "J'ai pris le poisson."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton ami, il a pris quoi ?",
    "en": "And your friend, what did he have?",
    "audio": "INT_prendre_pc_3"
   },
   {
    "who": "you",
    "fr": "Il a pris un steak frites.",
    "en": "He had steak and chips.",
    "accept": [
     "Il a pris un steak frites."
    ]
   },
   {
    "who": "app",
    "fr": "Ça a l'air délicieux !",
    "en": "That sounds delicious!",
    "audio": "INT_prendre_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "le restaurant",
    "en": "restaurant"
   },
   {
    "fr": "le poisson",
    "en": "fish"
   },
   {
    "fr": "un steak frites",
    "en": "steak and chips"
   },
   {
    "fr": "délicieux",
    "en": "delicious"
   }
  ]
 },
 "Intermediate|Future|prendre": {
  "level": "Intermediate",
  "verb": "prendre",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Prendras-tu des vacances cet été ?",
    "en": "Will you take a holiday this summer?",
    "audio": "INT_prendre_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je prendrai deux semaines en août.",
    "en": "Yes, I'll take two weeks in August.",
    "accept": [
     "Oui, je prendrai deux semaines en août.",
     "Oui, je prendrai des vacances."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta sœur, prendra-t-elle des vacances ?",
    "en": "And your sister, will she take a holiday?",
    "audio": "INT_prendre_fut_3"
   },
   {
    "who": "you",
    "fr": "Non, elle ne prendra pas de vacances cette année.",
    "en": "No, she won't take a holiday this year.",
    "accept": [
     "Non, elle ne prendra pas de vacances cette année.",
     "Non, elle ne prendra pas de vacances."
    ]
   },
   {
    "who": "app",
    "fr": "La pauvre !",
    "en": "Poor thing!",
    "audio": "INT_prendre_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "cet été",
    "en": "this summer"
   },
   {
    "fr": "deux semaines",
    "en": "two weeks"
   },
   {
    "fr": "août",
    "en": "August"
   },
   {
    "fr": "La pauvre",
    "en": "Poor thing"
   }
  ]
 },
 "Intermediate|Present|lire": {
  "level": "Intermediate",
  "verb": "lire",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Lis-tu le journal le matin ?",
    "en": "Do you read the paper in the morning?",
    "audio": "INT_lire_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je lis le journal en ligne.",
    "en": "Yes, I read the paper online.",
    "accept": [
     "Oui, je lis le journal en ligne.",
     "Oui, je lis le journal."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton père, lit-il le journal ?",
    "en": "And your father, does he read the paper?",
    "audio": "INT_lire_pres_3"
   },
   {
    "who": "you",
    "fr": "Oui, il lit le journal papier.",
    "en": "Yes, he reads the print edition.",
    "accept": [
     "Oui, il lit le journal papier."
    ]
   },
   {
    "who": "app",
    "fr": "À l'ancienne !",
    "en": "Old school!",
    "audio": "INT_lire_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "le journal",
    "en": "newspaper"
   },
   {
    "fr": "en ligne",
    "en": "online"
   },
   {
    "fr": "papier",
    "en": "print"
   },
   {
    "fr": "À l'ancienne",
    "en": "Old school"
   }
  ]
 },
 "Intermediate|Past|lire": {
  "level": "Intermediate",
  "verb": "lire",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "As-tu lu le dernier roman de cet auteur ?",
    "en": "Have you read this author's latest novel?",
    "audio": "INT_lire_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, je l'ai lu en deux jours.",
    "en": "Yes, I read it in two days.",
    "accept": [
     "Oui, je l'ai lu en deux jours.",
     "Oui, j'ai lu le dernier roman."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta mère, l'a-t-elle lu ?",
    "en": "And your mother, has she read it?",
    "audio": "INT_lire_pc_3"
   },
   {
    "who": "you",
    "fr": "Non, elle ne l'a pas encore lu.",
    "en": "No, she hasn't read it yet.",
    "accept": [
     "Non, elle ne l'a pas encore lu."
    ]
   },
   {
    "who": "app",
    "fr": "Elle va l'adorer !",
    "en": "She's going to love it!",
    "audio": "INT_lire_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "dernier / dernière",
    "en": "latest"
   },
   {
    "fr": "un roman",
    "en": "novel"
   },
   {
    "fr": "un auteur",
    "en": "author"
   },
   {
    "fr": "adorer",
    "en": "to love"
   }
  ]
 },
 "Intermediate|Future|lire": {
  "level": "Intermediate",
  "verb": "lire",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Liras-tu une histoire aux enfants ce soir ?",
    "en": "Will you read the children a story tonight?",
    "audio": "INT_lire_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je leur lirai une histoire.",
    "en": "Yes, I'll read them a story.",
    "accept": [
     "Oui, je leur lirai une histoire."
    ]
   },
   {
    "who": "app",
    "fr": "Et leur grand-père, leur lira-t-il aussi ?",
    "en": "And their grandfather, will he read to them too?",
    "audio": "INT_lire_fut_3"
   },
   {
    "who": "you",
    "fr": "Oui, il leur lira un conte.",
    "en": "Yes, he'll read them a fairy tale.",
    "accept": [
     "Oui, il leur lira un conte."
    ]
   },
   {
    "who": "app",
    "fr": "Quelle belle soirée !",
    "en": "What a lovely evening!",
    "audio": "INT_lire_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "un grand-père",
    "en": "grandfather"
   },
   {
    "fr": "un conte",
    "en": "fairy tale"
   },
   {
    "fr": "une soirée",
    "en": "evening"
   }
  ]
 },
 "Intermediate|Present|écrire": {
  "level": "Intermediate",
  "verb": "écrire",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Écris-tu souvent à ta famille ?",
    "en": "Do you often write to your family?",
    "audio": "INT_ecrire_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'écris à ma famille chaque semaine.",
    "en": "Yes, I write to my family every week.",
    "accept": [
     "Oui, j'écris à ma famille chaque semaine.",
     "Oui, je leur écris chaque semaine."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton cousin, t'écrit-il ?",
    "en": "And your cousin, does he write to you?",
    "audio": "INT_ecrire_pres_3"
   },
   {
    "who": "you",
    "fr": "Non, il n'écrit jamais.",
    "en": "No, he never writes.",
    "accept": [
     "Non, il n'écrit jamais."
    ]
   },
   {
    "who": "app",
    "fr": "Envoie-lui un message !",
    "en": "Send him a message!",
    "audio": "INT_ecrire_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "chaque semaine",
    "en": "every week"
   },
   {
    "fr": "un cousin",
    "en": "cousin"
   },
   {
    "fr": "envoyer",
    "en": "to send"
   },
   {
    "fr": "un message",
    "en": "message"
   }
  ]
 },
 "Intermediate|Past|écrire": {
  "level": "Intermediate",
  "verb": "écrire",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "As-tu écrit ta lettre de motivation ?",
    "en": "Have you written your cover letter?",
    "audio": "INT_ecrire_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'ai écrit ma lettre hier soir.",
    "en": "Yes, I wrote my letter last night.",
    "accept": [
     "Oui, j'ai écrit ma lettre hier soir.",
     "Oui, je l'ai écrite hier soir."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta sœur, a-t-elle écrit son CV ?",
    "en": "And your sister, has she written her CV?",
    "audio": "INT_ecrire_pc_3"
   },
   {
    "who": "you",
    "fr": "Oui, elle l'a écrit aussi.",
    "en": "Yes, she's written it too.",
    "accept": [
     "Oui, elle l'a écrit aussi."
    ]
   },
   {
    "who": "app",
    "fr": "Bonne chance à vous deux !",
    "en": "Good luck, both of you!",
    "audio": "INT_ecrire_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "une lettre de motivation",
    "en": "cover letter"
   },
   {
    "fr": "une lettre",
    "en": "letter"
   },
   {
    "fr": "un CV",
    "en": "CV"
   }
  ]
 },
 "Intermediate|Future|écrire": {
  "level": "Intermediate",
  "verb": "écrire",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "M'écriras-tu pendant ton voyage ?",
    "en": "Will you write to me during your trip?",
    "audio": "INT_ecrire_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je t'écrirai tous les jours.",
    "en": "Yes, I'll write to you every day.",
    "accept": [
     "Oui, je t'écrirai tous les jours."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes amis, m'écriront-ils aussi ?",
    "en": "And your friends, will they write to me too?",
    "audio": "INT_ecrire_fut_3"
   },
   {
    "who": "you",
    "fr": "Oui, ils t'écriront une carte postale.",
    "en": "Yes, they'll write you a postcard.",
    "accept": [
     "Oui, ils t'écriront une carte postale."
    ]
   },
   {
    "who": "app",
    "fr": "J'ai hâte !",
    "en": "I can't wait!",
    "audio": "INT_ecrire_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "une carte postale",
    "en": "postcard"
   },
   {
    "fr": "J'ai hâte",
    "en": "I can't wait"
   }
  ]
 },
 "Intermediate|Present|ouvrir": {
  "level": "Intermediate",
  "verb": "ouvrir",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Il fait chaud. Ouvres-tu la fenêtre ?",
    "en": "It's hot. Will you open the window?",
    "audio": "INT_ouvrir_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'ouvre la fenêtre.",
    "en": "Yes, I'll open the window.",
    "accept": [
     "Oui, j'ouvre la fenêtre.",
     "Oui, je l'ouvre."
    ]
   },
   {
    "who": "app",
    "fr": "Et la porte, ton frère l'ouvre-t-il aussi ?",
    "en": "And the door, will your brother open it too?",
    "audio": "INT_ouvrir_pres_3"
   },
   {
    "who": "you",
    "fr": "Oui, il ouvre la porte.",
    "en": "Yes, he's opening the door.",
    "accept": [
     "Oui, il ouvre la porte.",
     "Oui, il l'ouvre."
    ]
   },
   {
    "who": "app",
    "fr": "Ah, ça fait du bien !",
    "en": "Ah, that's better!",
    "audio": "INT_ouvrir_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "il fait chaud",
    "en": "it's hot"
   },
   {
    "fr": "la fenêtre",
    "en": "window"
   },
   {
    "fr": "la porte",
    "en": "door"
   },
   {
    "fr": "Ça fait du bien",
    "en": "That's better"
   }
  ]
 },
 "Intermediate|Past|ouvrir": {
  "level": "Intermediate",
  "verb": "ouvrir",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "As-tu ouvert tes cadeaux ?",
    "en": "Have you opened your presents?",
    "audio": "INT_ouvrir_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'ai ouvert tous mes cadeaux.",
    "en": "Yes, I've opened all my presents.",
    "accept": [
     "Oui, j'ai ouvert tous mes cadeaux.",
     "Oui, je les ai ouverts."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta petite sœur, a-t-elle ouvert les siens ?",
    "en": "And your little sister, has she opened hers?",
    "audio": "INT_ouvrir_pc_3"
   },
   {
    "who": "you",
    "fr": "Non, elle ne les a pas encore ouverts.",
    "en": "No, she hasn't opened them yet.",
    "accept": [
     "Non, elle ne les a pas encore ouverts."
    ]
   },
   {
    "who": "app",
    "fr": "Elle est patiente !",
    "en": "She's patient!",
    "audio": "INT_ouvrir_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "tous mes",
    "en": "all my"
   },
   {
    "fr": "petit / petite",
    "en": "little"
   },
   {
    "fr": "les siens",
    "en": "hers"
   },
   {
    "fr": "patient / patiente",
    "en": "patient"
   }
  ]
 },
 "Intermediate|Future|ouvrir": {
  "level": "Intermediate",
  "verb": "ouvrir",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Ouvriras-tu ton magasin dimanche ?",
    "en": "Will you open your shop on Sunday?",
    "audio": "INT_ouvrir_fut_1"
   },
   {
    "who": "you",
    "fr": "Non, je n'ouvrirai pas dimanche.",
    "en": "No, I won't open on Sunday.",
    "accept": [
     "Non, je n'ouvrirai pas dimanche."
    ]
   },
   {
    "who": "app",
    "fr": "Et la boulangerie, ouvrira-t-elle ?",
    "en": "And the bakery, will it open?",
    "audio": "INT_ouvrir_fut_3"
   },
   {
    "who": "you",
    "fr": "Oui, elle ouvrira le matin.",
    "en": "Yes, it'll open in the morning.",
    "accept": [
     "Oui, elle ouvrira le matin."
    ]
   },
   {
    "who": "app",
    "fr": "Super, j'irai chercher du pain !",
    "en": "Great, I'll go and get some bread!",
    "audio": "INT_ouvrir_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "un magasin",
    "en": "shop"
   },
   {
    "fr": "aller chercher",
    "en": "to go and get"
   }
  ]
 },
 "Intermediate|Present|fermer": {
  "level": "Intermediate",
  "verb": "fermer",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Fermes-tu la porte à clé le soir ?",
    "en": "Do you lock the door at night?",
    "audio": "INT_fermer_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je ferme toujours la porte à clé.",
    "en": "Yes, I always lock the door.",
    "accept": [
     "Oui, je ferme toujours la porte à clé.",
     "Oui, je la ferme toujours à clé."
    ]
   },
   {
    "who": "app",
    "fr": "Et tes voisins, ferment-ils leur porte ?",
    "en": "And your neighbours, do they lock their door?",
    "audio": "INT_fermer_pres_3"
   },
   {
    "who": "you",
    "fr": "Non, ils ne la ferment jamais.",
    "en": "No, they never lock it.",
    "accept": [
     "Non, ils ne la ferment jamais."
    ]
   },
   {
    "who": "app",
    "fr": "Ils ont confiance !",
    "en": "They're trusting!",
    "audio": "INT_fermer_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "fermer à clé",
    "en": "to lock"
   },
   {
    "fr": "le soir",
    "en": "at night"
   },
   {
    "fr": "avoir confiance",
    "en": "to be trusting"
   }
  ]
 },
 "Intermediate|Past|fermer": {
  "level": "Intermediate",
  "verb": "fermer",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "As-tu fermé le gaz ?",
    "en": "Did you turn off the gas?",
    "audio": "INT_fermer_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'ai fermé le gaz.",
    "en": "Yes, I turned off the gas.",
    "accept": [
     "Oui, j'ai fermé le gaz.",
     "Oui, je l'ai fermé."
    ]
   },
   {
    "who": "app",
    "fr": "Et les fenêtres, ton fils les a-t-il fermées ?",
    "en": "And the windows, did your son close them?",
    "audio": "INT_fermer_pc_3"
   },
   {
    "who": "you",
    "fr": "Oui, il les a toutes fermées.",
    "en": "Yes, he closed them all.",
    "accept": [
     "Oui, il les a toutes fermées."
    ]
   },
   {
    "who": "app",
    "fr": "On peut partir tranquilles !",
    "en": "We can leave with peace of mind!",
    "audio": "INT_fermer_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "le gaz",
    "en": "gas"
   },
   {
    "fr": "toutes",
    "en": "all"
   },
   {
    "fr": "tranquille",
    "en": "at ease"
   }
  ]
 },
 "Intermediate|Future|fermer": {
  "level": "Intermediate",
  "verb": "fermer",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "À quelle heure tu fermeras le bureau ?",
    "en": "What time will you close the office?",
    "audio": "INT_fermer_fut_1"
   },
   {
    "who": "you",
    "fr": "Je fermerai le bureau à dix-huit heures.",
    "en": "I'll close the office at 6 pm.",
    "accept": [
     "Je fermerai le bureau à dix-huit heures.",
     "Je le fermerai à dix-huit heures."
    ]
   },
   {
    "who": "app",
    "fr": "Et la banque, elle fermera à quelle heure ?",
    "en": "And the bank, what time will it close?",
    "audio": "INT_fermer_fut_3"
   },
   {
    "who": "you",
    "fr": "Elle fermera à dix-sept heures.",
    "en": "It'll close at 5 pm.",
    "accept": [
     "Elle fermera à dix-sept heures."
    ]
   },
   {
    "who": "app",
    "fr": "Alors, dépêche-toi !",
    "en": "Then hurry up!",
    "audio": "INT_fermer_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "à quelle heure",
    "en": "what time"
   },
   {
    "fr": "le bureau",
    "en": "office"
   },
   {
    "fr": "dix-huit heures",
    "en": "6 pm"
   },
   {
    "fr": "la banque",
    "en": "bank"
   },
   {
    "fr": "dix-sept heures",
    "en": "5 pm"
   },
   {
    "fr": "Dépêche-toi",
    "en": "Hurry up"
   }
  ]
 },
 "Intermediate|Present|perdre": {
  "level": "Intermediate",
  "verb": "perdre",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Perds-tu souvent tes clés ?",
    "en": "Do you often lose your keys?",
    "audio": "INT_perdre_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je perds mes clés tout le temps.",
    "en": "Yes, I lose my keys all the time.",
    "accept": [
     "Oui, je perds mes clés tout le temps.",
     "Oui, je les perds souvent."
    ]
   },
   {
    "who": "app",
    "fr": "Et ton père, perd-il ses lunettes ?",
    "en": "And your father, does he lose his glasses?",
    "audio": "INT_perdre_pres_3"
   },
   {
    "who": "you",
    "fr": "Oui, il perd ses lunettes chaque jour.",
    "en": "Yes, he loses his glasses every day.",
    "accept": [
     "Oui, il perd ses lunettes chaque jour."
    ]
   },
   {
    "who": "app",
    "fr": "C'est de famille !",
    "en": "It runs in the family!",
    "audio": "INT_perdre_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "tout le temps",
    "en": "all the time"
   },
   {
    "fr": "chaque jour",
    "en": "every day"
   },
   {
    "fr": "C'est de famille",
    "en": "It runs in the family"
   }
  ]
 },
 "Intermediate|Past|perdre": {
  "level": "Intermediate",
  "verb": "perdre",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "Avez-vous perdu le match ?",
    "en": "Did your team lose the match?",
    "audio": "INT_perdre_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, nous avons perdu trois à un.",
    "en": "Yes, we lost three–one.",
    "accept": [
     "Oui, nous avons perdu trois à un.",
     "Oui, on a perdu trois à un."
    ]
   },
   {
    "who": "app",
    "fr": "Et l'autre équipe de ton club, a-t-elle perdu aussi ?",
    "en": "And the other team at your club, did it lose too?",
    "audio": "INT_perdre_pc_3"
   },
   {
    "who": "you",
    "fr": "Non, elle n'a pas perdu.",
    "en": "No, it didn't lose.",
    "accept": [
     "Non, elle n'a pas perdu."
    ]
   },
   {
    "who": "app",
    "fr": "Au moins une victoire !",
    "en": "At least one win!",
    "audio": "INT_perdre_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "trois à un",
    "en": "three–one"
   },
   {
    "fr": "le club",
    "en": "club"
   },
   {
    "fr": "au moins",
    "en": "at least"
   },
   {
    "fr": "une victoire",
    "en": "win"
   }
  ]
 },
 "Intermediate|Future|perdre": {
  "level": "Intermediate",
  "verb": "perdre",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Ne perdras-tu pas ton passeport cette fois ?",
    "en": "You won't lose your passport this time?",
    "audio": "INT_perdre_fut_1"
   },
   {
    "who": "you",
    "fr": "Non, je ne le perdrai pas.",
    "en": "No, I won't lose it.",
    "accept": [
     "Non, je ne le perdrai pas.",
     "Non, je ne perdrai pas mon passeport."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta sœur, ne perdra-t-elle pas le sien ?",
    "en": "And your sister, won't she lose hers?",
    "audio": "INT_perdre_fut_3"
   },
   {
    "who": "you",
    "fr": "Non, elle ne perdra rien.",
    "en": "No, she won't lose anything.",
    "accept": [
     "Non, elle ne perdra rien."
    ]
   },
   {
    "who": "app",
    "fr": "Promis ?",
    "en": "Promise?",
    "audio": "INT_perdre_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "un passeport",
    "en": "passport"
   },
   {
    "fr": "cette fois",
    "en": "this time"
   },
   {
    "fr": "le sien / la sienne",
    "en": "his / hers"
   },
   {
    "fr": "Promis",
    "en": "Promise"
   }
  ]
 },
 "Intermediate|Present|garder": {
  "level": "Intermediate",
  "verb": "garder",
  "tense": "Présent",
  "turns": [
   {
    "who": "app",
    "fr": "Gardes-tu tes petits-enfants le mercredi ?",
    "en": "Do you look after your grandchildren on Wednesdays?",
    "audio": "INT_garder_pres_1"
   },
   {
    "who": "you",
    "fr": "Oui, je les garde tous les mercredis.",
    "en": "Yes, I look after them every Wednesday.",
    "accept": [
     "Oui, je les garde tous les mercredis.",
     "Oui, je garde mes petits-enfants."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta femme, les garde-t-elle aussi ?",
    "en": "And your wife, does she look after them too?",
    "audio": "INT_garder_pres_3"
   },
   {
    "who": "you",
    "fr": "Oui, elle les garde avec moi.",
    "en": "Yes, she looks after them with me.",
    "accept": [
     "Oui, elle les garde avec moi."
    ]
   },
   {
    "who": "app",
    "fr": "Quelle chance pour eux !",
    "en": "How lucky they are!",
    "audio": "INT_garder_pres_5"
   }
  ],
  "newWords": [
   {
    "fr": "les petits-enfants",
    "en": "grandchildren"
   },
   {
    "fr": "tous les mercredis",
    "en": "every Wednesday"
   },
   {
    "fr": "pour eux",
    "en": "for them"
   }
  ]
 },
 "Intermediate|Past|garder": {
  "level": "Intermediate",
  "verb": "garder",
  "tense": "Passé composé",
  "turns": [
   {
    "who": "app",
    "fr": "As-tu gardé tes vieilles photos ?",
    "en": "Did you keep your old photos?",
    "audio": "INT_garder_pc_1"
   },
   {
    "who": "you",
    "fr": "Oui, j'ai gardé toutes mes photos.",
    "en": "Yes, I kept all my photos.",
    "accept": [
     "Oui, j'ai gardé toutes mes photos.",
     "Oui, je les ai gardées."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta mère, a-t-elle gardé tes dessins d'enfant ?",
    "en": "And your mother, did she keep your childhood drawings?",
    "audio": "INT_garder_pc_3"
   },
   {
    "who": "you",
    "fr": "Oui, elle les a tous gardés.",
    "en": "Yes, she kept them all.",
    "accept": [
     "Oui, elle les a tous gardés."
    ]
   },
   {
    "who": "app",
    "fr": "Comme c'est mignon !",
    "en": "How sweet!",
    "audio": "INT_garder_pc_5"
   }
  ],
  "newWords": [
   {
    "fr": "vieux / vieille",
    "en": "old"
   },
   {
    "fr": "une photo",
    "en": "photo"
   },
   {
    "fr": "un dessin",
    "en": "drawing"
   },
   {
    "fr": "mignon",
    "en": "sweet"
   }
  ]
 },
 "Intermediate|Future|garder": {
  "level": "Intermediate",
  "verb": "garder",
  "tense": "Futur simple",
  "turns": [
   {
    "who": "app",
    "fr": "Garderas-tu mon chat pendant les vacances ?",
    "en": "Will you look after my cat during the holidays?",
    "audio": "INT_garder_fut_1"
   },
   {
    "who": "you",
    "fr": "Oui, je garderai ton chat.",
    "en": "Yes, I'll look after your cat.",
    "accept": [
     "Oui, je garderai ton chat.",
     "Oui, je le garderai."
    ]
   },
   {
    "who": "app",
    "fr": "Et ta fille, gardera-t-elle mes plantes ?",
    "en": "And your daughter, will she look after my plants?",
    "audio": "INT_garder_fut_3"
   },
   {
    "who": "you",
    "fr": "Oui, elle gardera tes plantes.",
    "en": "Yes, she'll look after your plants.",
    "accept": [
     "Oui, elle gardera tes plantes.",
     "Oui, elle les gardera."
    ]
   },
   {
    "who": "app",
    "fr": "Merci mille fois !",
    "en": "Thanks a million!",
    "audio": "INT_garder_fut_5"
   }
  ],
  "newWords": [
   {
    "fr": "une fille",
    "en": "daughter"
   },
   {
    "fr": "Merci mille fois",
    "en": "Thanks a million"
   }
  ]
 }
};

// Static requires: Metro bundles only files it can see named in the source.
export const CONVERSATION_AUDIO: Record<string, number> = {
  "BEG_avoir_fut_1": require("../assets/audio/conversations/BEG_avoir_fut_1.mp3"),
  "BEG_avoir_fut_3": require("../assets/audio/conversations/BEG_avoir_fut_3.mp3"),
  "BEG_avoir_fut_5": require("../assets/audio/conversations/BEG_avoir_fut_5.mp3"),
  "BEG_avoir_pc_1": require("../assets/audio/conversations/BEG_avoir_pc_1.mp3"),
  "BEG_avoir_pc_3": require("../assets/audio/conversations/BEG_avoir_pc_3.mp3"),
  "BEG_avoir_pc_5": require("../assets/audio/conversations/BEG_avoir_pc_5.mp3"),
  "BEG_avoir_pres_1": require("../assets/audio/conversations/BEG_avoir_pres_1.mp3"),
  "BEG_avoir_pres_3": require("../assets/audio/conversations/BEG_avoir_pres_3.mp3"),
  "BEG_avoir_pres_5": require("../assets/audio/conversations/BEG_avoir_pres_5.mp3"),
  "BEG_etre_fut_1": require("../assets/audio/conversations/BEG_etre_fut_1.mp3"),
  "BEG_etre_fut_3": require("../assets/audio/conversations/BEG_etre_fut_3.mp3"),
  "BEG_etre_fut_5": require("../assets/audio/conversations/BEG_etre_fut_5.mp3"),
  "BEG_etre_pc_1": require("../assets/audio/conversations/BEG_etre_pc_1.mp3"),
  "BEG_etre_pc_3": require("../assets/audio/conversations/BEG_etre_pc_3.mp3"),
  "BEG_etre_pc_5": require("../assets/audio/conversations/BEG_etre_pc_5.mp3"),
  "BEG_etre_pres_1": require("../assets/audio/conversations/BEG_etre_pres_1.mp3"),
  "BEG_etre_pres_3": require("../assets/audio/conversations/BEG_etre_pres_3.mp3"),
  "BEG_etre_pres_5": require("../assets/audio/conversations/BEG_etre_pres_5.mp3"),
  "BEG_faire_fut_1": require("../assets/audio/conversations/BEG_faire_fut_1.mp3"),
  "BEG_faire_fut_3": require("../assets/audio/conversations/BEG_faire_fut_3.mp3"),
  "BEG_faire_fut_5": require("../assets/audio/conversations/BEG_faire_fut_5.mp3"),
  "BEG_faire_pc_1": require("../assets/audio/conversations/BEG_faire_pc_1.mp3"),
  "BEG_faire_pc_3": require("../assets/audio/conversations/BEG_faire_pc_3.mp3"),
  "BEG_faire_pc_5": require("../assets/audio/conversations/BEG_faire_pc_5.mp3"),
  "BEG_faire_pres_1": require("../assets/audio/conversations/BEG_faire_pres_1.mp3"),
  "BEG_faire_pres_3": require("../assets/audio/conversations/BEG_faire_pres_3.mp3"),
  "BEG_faire_pres_5": require("../assets/audio/conversations/BEG_faire_pres_5.mp3"),
  "ELE_avoir-besoin-de_fut_1": require("../assets/audio/conversations/ELE_avoir-besoin-de_fut_1.mp3"),
  "ELE_avoir-besoin-de_fut_3": require("../assets/audio/conversations/ELE_avoir-besoin-de_fut_3.mp3"),
  "ELE_avoir-besoin-de_fut_5": require("../assets/audio/conversations/ELE_avoir-besoin-de_fut_5.mp3"),
  "ELE_avoir-besoin-de_pc_1": require("../assets/audio/conversations/ELE_avoir-besoin-de_pc_1.mp3"),
  "ELE_avoir-besoin-de_pc_3": require("../assets/audio/conversations/ELE_avoir-besoin-de_pc_3.mp3"),
  "ELE_avoir-besoin-de_pc_5": require("../assets/audio/conversations/ELE_avoir-besoin-de_pc_5.mp3"),
  "ELE_avoir-besoin-de_pres_1": require("../assets/audio/conversations/ELE_avoir-besoin-de_pres_1.mp3"),
  "ELE_avoir-besoin-de_pres_3": require("../assets/audio/conversations/ELE_avoir-besoin-de_pres_3.mp3"),
  "ELE_avoir-besoin-de_pres_5": require("../assets/audio/conversations/ELE_avoir-besoin-de_pres_5.mp3"),
  "ELE_dire_fut_1": require("../assets/audio/conversations/ELE_dire_fut_1.mp3"),
  "ELE_dire_fut_3": require("../assets/audio/conversations/ELE_dire_fut_3.mp3"),
  "ELE_dire_fut_5": require("../assets/audio/conversations/ELE_dire_fut_5.mp3"),
  "ELE_dire_pc_1": require("../assets/audio/conversations/ELE_dire_pc_1.mp3"),
  "ELE_dire_pc_3": require("../assets/audio/conversations/ELE_dire_pc_3.mp3"),
  "ELE_dire_pc_5": require("../assets/audio/conversations/ELE_dire_pc_5.mp3"),
  "ELE_dire_pres_1": require("../assets/audio/conversations/ELE_dire_pres_1.mp3"),
  "ELE_dire_pres_3": require("../assets/audio/conversations/ELE_dire_pres_3.mp3"),
  "ELE_dire_pres_5": require("../assets/audio/conversations/ELE_dire_pres_5.mp3"),
  "ELE_pouvoir_fut_1": require("../assets/audio/conversations/ELE_pouvoir_fut_1.mp3"),
  "ELE_pouvoir_fut_3": require("../assets/audio/conversations/ELE_pouvoir_fut_3.mp3"),
  "ELE_pouvoir_fut_5": require("../assets/audio/conversations/ELE_pouvoir_fut_5.mp3"),
  "ELE_pouvoir_pc_1": require("../assets/audio/conversations/ELE_pouvoir_pc_1.mp3"),
  "ELE_pouvoir_pc_3": require("../assets/audio/conversations/ELE_pouvoir_pc_3.mp3"),
  "ELE_pouvoir_pc_5": require("../assets/audio/conversations/ELE_pouvoir_pc_5.mp3"),
  "ELE_pouvoir_pres_1": require("../assets/audio/conversations/ELE_pouvoir_pres_1.mp3"),
  "ELE_pouvoir_pres_3": require("../assets/audio/conversations/ELE_pouvoir_pres_3.mp3"),
  "ELE_pouvoir_pres_5": require("../assets/audio/conversations/ELE_pouvoir_pres_5.mp3"),
  "ELE_savoir_fut_1": require("../assets/audio/conversations/ELE_savoir_fut_1.mp3"),
  "ELE_savoir_fut_3": require("../assets/audio/conversations/ELE_savoir_fut_3.mp3"),
  "ELE_savoir_fut_5": require("../assets/audio/conversations/ELE_savoir_fut_5.mp3"),
  "ELE_savoir_pc_1": require("../assets/audio/conversations/ELE_savoir_pc_1.mp3"),
  "ELE_savoir_pc_3": require("../assets/audio/conversations/ELE_savoir_pc_3.mp3"),
  "ELE_savoir_pc_5": require("../assets/audio/conversations/ELE_savoir_pc_5.mp3"),
  "ELE_savoir_pres_1": require("../assets/audio/conversations/ELE_savoir_pres_1.mp3"),
  "ELE_savoir_pres_3": require("../assets/audio/conversations/ELE_savoir_pres_3.mp3"),
  "ELE_savoir_pres_5": require("../assets/audio/conversations/ELE_savoir_pres_5.mp3"),
  "ELE_venir_fut_1": require("../assets/audio/conversations/ELE_venir_fut_1.mp3"),
  "ELE_venir_fut_3": require("../assets/audio/conversations/ELE_venir_fut_3.mp3"),
  "ELE_venir_fut_5": require("../assets/audio/conversations/ELE_venir_fut_5.mp3"),
  "ELE_venir_pc_1": require("../assets/audio/conversations/ELE_venir_pc_1.mp3"),
  "ELE_venir_pc_3": require("../assets/audio/conversations/ELE_venir_pc_3.mp3"),
  "ELE_venir_pc_5": require("../assets/audio/conversations/ELE_venir_pc_5.mp3"),
  "ELE_venir_pres_1": require("../assets/audio/conversations/ELE_venir_pres_1.mp3"),
  "ELE_venir_pres_3": require("../assets/audio/conversations/ELE_venir_pres_3.mp3"),
  "ELE_venir_pres_5": require("../assets/audio/conversations/ELE_venir_pres_5.mp3"),
  "ELE_voir_fut_1": require("../assets/audio/conversations/ELE_voir_fut_1.mp3"),
  "ELE_voir_fut_3": require("../assets/audio/conversations/ELE_voir_fut_3.mp3"),
  "ELE_voir_fut_5": require("../assets/audio/conversations/ELE_voir_fut_5.mp3"),
  "ELE_voir_pc_1": require("../assets/audio/conversations/ELE_voir_pc_1.mp3"),
  "ELE_voir_pc_3": require("../assets/audio/conversations/ELE_voir_pc_3.mp3"),
  "ELE_voir_pc_5": require("../assets/audio/conversations/ELE_voir_pc_5.mp3"),
  "ELE_voir_pres_1": require("../assets/audio/conversations/ELE_voir_pres_1.mp3"),
  "ELE_voir_pres_3": require("../assets/audio/conversations/ELE_voir_pres_3.mp3"),
  "ELE_voir_pres_5": require("../assets/audio/conversations/ELE_voir_pres_5.mp3"),
  "ELE_vouloir_fut_1": require("../assets/audio/conversations/ELE_vouloir_fut_1.mp3"),
  "ELE_vouloir_fut_3": require("../assets/audio/conversations/ELE_vouloir_fut_3.mp3"),
  "ELE_vouloir_fut_5": require("../assets/audio/conversations/ELE_vouloir_fut_5.mp3"),
  "ELE_vouloir_pc_1": require("../assets/audio/conversations/ELE_vouloir_pc_1.mp3"),
  "ELE_vouloir_pc_3": require("../assets/audio/conversations/ELE_vouloir_pc_3.mp3"),
  "ELE_vouloir_pc_5": require("../assets/audio/conversations/ELE_vouloir_pc_5.mp3"),
  "ELE_vouloir_pres_1": require("../assets/audio/conversations/ELE_vouloir_pres_1.mp3"),
  "ELE_vouloir_pres_3": require("../assets/audio/conversations/ELE_vouloir_pres_3.mp3"),
  "ELE_vouloir_pres_5": require("../assets/audio/conversations/ELE_vouloir_pres_5.mp3"),
  "INT_croire_fut_1": require("../assets/audio/conversations/INT_croire_fut_1.mp3"),
  "INT_croire_fut_3": require("../assets/audio/conversations/INT_croire_fut_3.mp3"),
  "INT_croire_fut_5": require("../assets/audio/conversations/INT_croire_fut_5.mp3"),
  "INT_croire_pc_1": require("../assets/audio/conversations/INT_croire_pc_1.mp3"),
  "INT_croire_pc_3": require("../assets/audio/conversations/INT_croire_pc_3.mp3"),
  "INT_croire_pc_5": require("../assets/audio/conversations/INT_croire_pc_5.mp3"),
  "INT_croire_pres_1": require("../assets/audio/conversations/INT_croire_pres_1.mp3"),
  "INT_croire_pres_3": require("../assets/audio/conversations/INT_croire_pres_3.mp3"),
  "INT_croire_pres_5": require("../assets/audio/conversations/INT_croire_pres_5.mp3"),
  "INT_ecrire_fut_1": require("../assets/audio/conversations/INT_ecrire_fut_1.mp3"),
  "INT_ecrire_fut_3": require("../assets/audio/conversations/INT_ecrire_fut_3.mp3"),
  "INT_ecrire_fut_5": require("../assets/audio/conversations/INT_ecrire_fut_5.mp3"),
  "INT_ecrire_pc_1": require("../assets/audio/conversations/INT_ecrire_pc_1.mp3"),
  "INT_ecrire_pc_3": require("../assets/audio/conversations/INT_ecrire_pc_3.mp3"),
  "INT_ecrire_pc_5": require("../assets/audio/conversations/INT_ecrire_pc_5.mp3"),
  "INT_ecrire_pres_1": require("../assets/audio/conversations/INT_ecrire_pres_1.mp3"),
  "INT_ecrire_pres_3": require("../assets/audio/conversations/INT_ecrire_pres_3.mp3"),
  "INT_ecrire_pres_5": require("../assets/audio/conversations/INT_ecrire_pres_5.mp3"),
  "INT_fermer_fut_1": require("../assets/audio/conversations/INT_fermer_fut_1.mp3"),
  "INT_fermer_fut_3": require("../assets/audio/conversations/INT_fermer_fut_3.mp3"),
  "INT_fermer_fut_5": require("../assets/audio/conversations/INT_fermer_fut_5.mp3"),
  "INT_fermer_pc_1": require("../assets/audio/conversations/INT_fermer_pc_1.mp3"),
  "INT_fermer_pc_3": require("../assets/audio/conversations/INT_fermer_pc_3.mp3"),
  "INT_fermer_pc_5": require("../assets/audio/conversations/INT_fermer_pc_5.mp3"),
  "INT_fermer_pres_1": require("../assets/audio/conversations/INT_fermer_pres_1.mp3"),
  "INT_fermer_pres_3": require("../assets/audio/conversations/INT_fermer_pres_3.mp3"),
  "INT_fermer_pres_5": require("../assets/audio/conversations/INT_fermer_pres_5.mp3"),
  "INT_garder_fut_1": require("../assets/audio/conversations/INT_garder_fut_1.mp3"),
  "INT_garder_fut_3": require("../assets/audio/conversations/INT_garder_fut_3.mp3"),
  "INT_garder_fut_5": require("../assets/audio/conversations/INT_garder_fut_5.mp3"),
  "INT_garder_pc_1": require("../assets/audio/conversations/INT_garder_pc_1.mp3"),
  "INT_garder_pc_3": require("../assets/audio/conversations/INT_garder_pc_3.mp3"),
  "INT_garder_pc_5": require("../assets/audio/conversations/INT_garder_pc_5.mp3"),
  "INT_garder_pres_1": require("../assets/audio/conversations/INT_garder_pres_1.mp3"),
  "INT_garder_pres_3": require("../assets/audio/conversations/INT_garder_pres_3.mp3"),
  "INT_garder_pres_5": require("../assets/audio/conversations/INT_garder_pres_5.mp3"),
  "INT_lire_fut_1": require("../assets/audio/conversations/INT_lire_fut_1.mp3"),
  "INT_lire_fut_3": require("../assets/audio/conversations/INT_lire_fut_3.mp3"),
  "INT_lire_fut_5": require("../assets/audio/conversations/INT_lire_fut_5.mp3"),
  "INT_lire_pc_1": require("../assets/audio/conversations/INT_lire_pc_1.mp3"),
  "INT_lire_pc_3": require("../assets/audio/conversations/INT_lire_pc_3.mp3"),
  "INT_lire_pc_5": require("../assets/audio/conversations/INT_lire_pc_5.mp3"),
  "INT_lire_pres_1": require("../assets/audio/conversations/INT_lire_pres_1.mp3"),
  "INT_lire_pres_3": require("../assets/audio/conversations/INT_lire_pres_3.mp3"),
  "INT_lire_pres_5": require("../assets/audio/conversations/INT_lire_pres_5.mp3"),
  "INT_mettre_fut_1": require("../assets/audio/conversations/INT_mettre_fut_1.mp3"),
  "INT_mettre_fut_3": require("../assets/audio/conversations/INT_mettre_fut_3.mp3"),
  "INT_mettre_fut_5": require("../assets/audio/conversations/INT_mettre_fut_5.mp3"),
  "INT_mettre_pc_1": require("../assets/audio/conversations/INT_mettre_pc_1.mp3"),
  "INT_mettre_pc_3": require("../assets/audio/conversations/INT_mettre_pc_3.mp3"),
  "INT_mettre_pc_5": require("../assets/audio/conversations/INT_mettre_pc_5.mp3"),
  "INT_mettre_pres_1": require("../assets/audio/conversations/INT_mettre_pres_1.mp3"),
  "INT_mettre_pres_3": require("../assets/audio/conversations/INT_mettre_pres_3.mp3"),
  "INT_mettre_pres_5": require("../assets/audio/conversations/INT_mettre_pres_5.mp3"),
  "INT_ouvrir_fut_1": require("../assets/audio/conversations/INT_ouvrir_fut_1.mp3"),
  "INT_ouvrir_fut_3": require("../assets/audio/conversations/INT_ouvrir_fut_3.mp3"),
  "INT_ouvrir_fut_5": require("../assets/audio/conversations/INT_ouvrir_fut_5.mp3"),
  "INT_ouvrir_pc_1": require("../assets/audio/conversations/INT_ouvrir_pc_1.mp3"),
  "INT_ouvrir_pc_3": require("../assets/audio/conversations/INT_ouvrir_pc_3.mp3"),
  "INT_ouvrir_pc_5": require("../assets/audio/conversations/INT_ouvrir_pc_5.mp3"),
  "INT_ouvrir_pres_1": require("../assets/audio/conversations/INT_ouvrir_pres_1.mp3"),
  "INT_ouvrir_pres_3": require("../assets/audio/conversations/INT_ouvrir_pres_3.mp3"),
  "INT_ouvrir_pres_5": require("../assets/audio/conversations/INT_ouvrir_pres_5.mp3"),
  "INT_parler_fut_1": require("../assets/audio/conversations/INT_parler_fut_1.mp3"),
  "INT_parler_fut_3": require("../assets/audio/conversations/INT_parler_fut_3.mp3"),
  "INT_parler_fut_5": require("../assets/audio/conversations/INT_parler_fut_5.mp3"),
  "INT_parler_pc_1": require("../assets/audio/conversations/INT_parler_pc_1.mp3"),
  "INT_parler_pc_3": require("../assets/audio/conversations/INT_parler_pc_3.mp3"),
  "INT_parler_pc_5": require("../assets/audio/conversations/INT_parler_pc_5.mp3"),
  "INT_parler_pres_1": require("../assets/audio/conversations/INT_parler_pres_1.mp3"),
  "INT_parler_pres_3": require("../assets/audio/conversations/INT_parler_pres_3.mp3"),
  "INT_parler_pres_5": require("../assets/audio/conversations/INT_parler_pres_5.mp3"),
  "INT_perdre_fut_1": require("../assets/audio/conversations/INT_perdre_fut_1.mp3"),
  "INT_perdre_fut_3": require("../assets/audio/conversations/INT_perdre_fut_3.mp3"),
  "INT_perdre_fut_5": require("../assets/audio/conversations/INT_perdre_fut_5.mp3"),
  "INT_perdre_pc_1": require("../assets/audio/conversations/INT_perdre_pc_1.mp3"),
  "INT_perdre_pc_3": require("../assets/audio/conversations/INT_perdre_pc_3.mp3"),
  "INT_perdre_pc_5": require("../assets/audio/conversations/INT_perdre_pc_5.mp3"),
  "INT_perdre_pres_1": require("../assets/audio/conversations/INT_perdre_pres_1.mp3"),
  "INT_perdre_pres_3": require("../assets/audio/conversations/INT_perdre_pres_3.mp3"),
  "INT_perdre_pres_5": require("../assets/audio/conversations/INT_perdre_pres_5.mp3"),
  "INT_prendre_fut_1": require("../assets/audio/conversations/INT_prendre_fut_1.mp3"),
  "INT_prendre_fut_3": require("../assets/audio/conversations/INT_prendre_fut_3.mp3"),
  "INT_prendre_fut_5": require("../assets/audio/conversations/INT_prendre_fut_5.mp3"),
  "INT_prendre_pc_1": require("../assets/audio/conversations/INT_prendre_pc_1.mp3"),
  "INT_prendre_pc_3": require("../assets/audio/conversations/INT_prendre_pc_3.mp3"),
  "INT_prendre_pc_5": require("../assets/audio/conversations/INT_prendre_pc_5.mp3"),
  "INT_prendre_pres_1": require("../assets/audio/conversations/INT_prendre_pres_1.mp3"),
  "INT_prendre_pres_3": require("../assets/audio/conversations/INT_prendre_pres_3.mp3"),
  "INT_prendre_pres_5": require("../assets/audio/conversations/INT_prendre_pres_5.mp3"),
  "INT_s-adapter_fut_1": require("../assets/audio/conversations/INT_s-adapter_fut_1.mp3"),
  "INT_s-adapter_fut_3": require("../assets/audio/conversations/INT_s-adapter_fut_3.mp3"),
  "INT_s-adapter_fut_5": require("../assets/audio/conversations/INT_s-adapter_fut_5.mp3"),
  "INT_s-adapter_pc_1": require("../assets/audio/conversations/INT_s-adapter_pc_1.mp3"),
  "INT_s-adapter_pc_3": require("../assets/audio/conversations/INT_s-adapter_pc_3.mp3"),
  "INT_s-adapter_pc_5": require("../assets/audio/conversations/INT_s-adapter_pc_5.mp3"),
  "INT_s-adapter_pres_1": require("../assets/audio/conversations/INT_s-adapter_pres_1.mp3"),
  "INT_s-adapter_pres_3": require("../assets/audio/conversations/INT_s-adapter_pres_3.mp3"),
  "INT_s-adapter_pres_5": require("../assets/audio/conversations/INT_s-adapter_pres_5.mp3"),
  "INT_s-ennuyer_fut_1": require("../assets/audio/conversations/INT_s-ennuyer_fut_1.mp3"),
  "INT_s-ennuyer_fut_3": require("../assets/audio/conversations/INT_s-ennuyer_fut_3.mp3"),
  "INT_s-ennuyer_fut_5": require("../assets/audio/conversations/INT_s-ennuyer_fut_5.mp3"),
  "INT_s-ennuyer_pc_1": require("../assets/audio/conversations/INT_s-ennuyer_pc_1.mp3"),
  "INT_s-ennuyer_pc_3": require("../assets/audio/conversations/INT_s-ennuyer_pc_3.mp3"),
  "INT_s-ennuyer_pc_5": require("../assets/audio/conversations/INT_s-ennuyer_pc_5.mp3"),
  "INT_s-ennuyer_pres_1": require("../assets/audio/conversations/INT_s-ennuyer_pres_1.mp3"),
  "INT_s-ennuyer_pres_3": require("../assets/audio/conversations/INT_s-ennuyer_pres_3.mp3"),
  "INT_s-ennuyer_pres_5": require("../assets/audio/conversations/INT_s-ennuyer_pres_5.mp3"),
  "INT_s-entrainer_fut_1": require("../assets/audio/conversations/INT_s-entrainer_fut_1.mp3"),
  "INT_s-entrainer_fut_3": require("../assets/audio/conversations/INT_s-entrainer_fut_3.mp3"),
  "INT_s-entrainer_fut_5": require("../assets/audio/conversations/INT_s-entrainer_fut_5.mp3"),
  "INT_s-entrainer_pc_1": require("../assets/audio/conversations/INT_s-entrainer_pc_1.mp3"),
  "INT_s-entrainer_pc_3": require("../assets/audio/conversations/INT_s-entrainer_pc_3.mp3"),
  "INT_s-entrainer_pc_5": require("../assets/audio/conversations/INT_s-entrainer_pc_5.mp3"),
  "INT_s-entrainer_pres_1": require("../assets/audio/conversations/INT_s-entrainer_pres_1.mp3"),
  "INT_s-entrainer_pres_3": require("../assets/audio/conversations/INT_s-entrainer_pres_3.mp3"),
  "INT_s-entrainer_pres_5": require("../assets/audio/conversations/INT_s-entrainer_pres_5.mp3"),
  "INT_s-interesser_fut_1": require("../assets/audio/conversations/INT_s-interesser_fut_1.mp3"),
  "INT_s-interesser_fut_3": require("../assets/audio/conversations/INT_s-interesser_fut_3.mp3"),
  "INT_s-interesser_fut_5": require("../assets/audio/conversations/INT_s-interesser_fut_5.mp3"),
  "INT_s-interesser_pc_1": require("../assets/audio/conversations/INT_s-interesser_pc_1.mp3"),
  "INT_s-interesser_pc_3": require("../assets/audio/conversations/INT_s-interesser_pc_3.mp3"),
  "INT_s-interesser_pc_5": require("../assets/audio/conversations/INT_s-interesser_pc_5.mp3"),
  "INT_s-interesser_pres_1": require("../assets/audio/conversations/INT_s-interesser_pres_1.mp3"),
  "INT_s-interesser_pres_3": require("../assets/audio/conversations/INT_s-interesser_pres_3.mp3"),
  "INT_s-interesser_pres_5": require("../assets/audio/conversations/INT_s-interesser_pres_5.mp3"),
  "INT_se-debrouiller_fut_1": require("../assets/audio/conversations/INT_se-debrouiller_fut_1.mp3"),
  "INT_se-debrouiller_fut_3": require("../assets/audio/conversations/INT_se-debrouiller_fut_3.mp3"),
  "INT_se-debrouiller_fut_5": require("../assets/audio/conversations/INT_se-debrouiller_fut_5.mp3"),
  "INT_se-debrouiller_pc_1": require("../assets/audio/conversations/INT_se-debrouiller_pc_1.mp3"),
  "INT_se-debrouiller_pc_3": require("../assets/audio/conversations/INT_se-debrouiller_pc_3.mp3"),
  "INT_se-debrouiller_pc_5": require("../assets/audio/conversations/INT_se-debrouiller_pc_5.mp3"),
  "INT_se-debrouiller_pres_1": require("../assets/audio/conversations/INT_se-debrouiller_pres_1.mp3"),
  "INT_se-debrouiller_pres_3": require("../assets/audio/conversations/INT_se-debrouiller_pres_3.mp3"),
  "INT_se-debrouiller_pres_5": require("../assets/audio/conversations/INT_se-debrouiller_pres_5.mp3"),
  "INT_se-rejouir_fut_1": require("../assets/audio/conversations/INT_se-rejouir_fut_1.mp3"),
  "INT_se-rejouir_fut_3": require("../assets/audio/conversations/INT_se-rejouir_fut_3.mp3"),
  "INT_se-rejouir_fut_5": require("../assets/audio/conversations/INT_se-rejouir_fut_5.mp3"),
  "INT_se-rejouir_pc_1": require("../assets/audio/conversations/INT_se-rejouir_pc_1.mp3"),
  "INT_se-rejouir_pc_3": require("../assets/audio/conversations/INT_se-rejouir_pc_3.mp3"),
  "INT_se-rejouir_pc_5": require("../assets/audio/conversations/INT_se-rejouir_pc_5.mp3"),
  "INT_se-rejouir_pres_1": require("../assets/audio/conversations/INT_se-rejouir_pres_1.mp3"),
  "INT_se-rejouir_pres_3": require("../assets/audio/conversations/INT_se-rejouir_pres_3.mp3"),
  "INT_se-rejouir_pres_5": require("../assets/audio/conversations/INT_se-rejouir_pres_5.mp3"),
  "INT_se-souvenir_fut_1": require("../assets/audio/conversations/INT_se-souvenir_fut_1.mp3"),
  "INT_se-souvenir_fut_3": require("../assets/audio/conversations/INT_se-souvenir_fut_3.mp3"),
  "INT_se-souvenir_fut_5": require("../assets/audio/conversations/INT_se-souvenir_fut_5.mp3"),
  "INT_se-souvenir_pc_1": require("../assets/audio/conversations/INT_se-souvenir_pc_1.mp3"),
  "INT_se-souvenir_pc_3": require("../assets/audio/conversations/INT_se-souvenir_pc_3.mp3"),
  "INT_se-souvenir_pc_5": require("../assets/audio/conversations/INT_se-souvenir_pc_5.mp3"),
  "INT_se-souvenir_pres_1": require("../assets/audio/conversations/INT_se-souvenir_pres_1.mp3"),
  "INT_se-souvenir_pres_3": require("../assets/audio/conversations/INT_se-souvenir_pres_3.mp3"),
  "INT_se-souvenir_pres_5": require("../assets/audio/conversations/INT_se-souvenir_pres_5.mp3"),
  "INT_trouver_fut_1": require("../assets/audio/conversations/INT_trouver_fut_1.mp3"),
  "INT_trouver_fut_3": require("../assets/audio/conversations/INT_trouver_fut_3.mp3"),
  "INT_trouver_fut_5": require("../assets/audio/conversations/INT_trouver_fut_5.mp3"),
  "INT_trouver_pc_1": require("../assets/audio/conversations/INT_trouver_pc_1.mp3"),
  "INT_trouver_pc_3": require("../assets/audio/conversations/INT_trouver_pc_3.mp3"),
  "INT_trouver_pc_5": require("../assets/audio/conversations/INT_trouver_pc_5.mp3"),
  "INT_trouver_pres_1": require("../assets/audio/conversations/INT_trouver_pres_1.mp3"),
  "INT_trouver_pres_3": require("../assets/audio/conversations/INT_trouver_pres_3.mp3"),
  "INT_trouver_pres_5": require("../assets/audio/conversations/INT_trouver_pres_5.mp3"),
  "NOV_aller_fut_1": require("../assets/audio/conversations/NOV_aller_fut_1.mp3"),
  "NOV_aller_fut_3": require("../assets/audio/conversations/NOV_aller_fut_3.mp3"),
  "NOV_aller_fut_5": require("../assets/audio/conversations/NOV_aller_fut_5.mp3"),
  "NOV_aller_pc_1": require("../assets/audio/conversations/NOV_aller_pc_1.mp3"),
  "NOV_aller_pc_3": require("../assets/audio/conversations/NOV_aller_pc_3.mp3"),
  "NOV_aller_pc_5": require("../assets/audio/conversations/NOV_aller_pc_5.mp3"),
  "NOV_aller_pres_1": require("../assets/audio/conversations/NOV_aller_pres_1.mp3"),
  "NOV_aller_pres_3": require("../assets/audio/conversations/NOV_aller_pres_3.mp3"),
  "NOV_aller_pres_5": require("../assets/audio/conversations/NOV_aller_pres_5.mp3"),
  "NOV_avoir_fut_1": require("../assets/audio/conversations/NOV_avoir_fut_1.mp3"),
  "NOV_avoir_fut_3": require("../assets/audio/conversations/NOV_avoir_fut_3.mp3"),
  "NOV_avoir_fut_5": require("../assets/audio/conversations/NOV_avoir_fut_5.mp3"),
  "NOV_avoir_pc_1": require("../assets/audio/conversations/NOV_avoir_pc_1.mp3"),
  "NOV_avoir_pc_3": require("../assets/audio/conversations/NOV_avoir_pc_3.mp3"),
  "NOV_avoir_pc_5": require("../assets/audio/conversations/NOV_avoir_pc_5.mp3"),
  "NOV_avoir_pres_1": require("../assets/audio/conversations/NOV_avoir_pres_1.mp3"),
  "NOV_avoir_pres_3": require("../assets/audio/conversations/NOV_avoir_pres_3.mp3"),
  "NOV_avoir_pres_5": require("../assets/audio/conversations/NOV_avoir_pres_5.mp3"),
  "NOV_etre_fut_1": require("../assets/audio/conversations/NOV_etre_fut_1.mp3"),
  "NOV_etre_fut_3": require("../assets/audio/conversations/NOV_etre_fut_3.mp3"),
  "NOV_etre_fut_5": require("../assets/audio/conversations/NOV_etre_fut_5.mp3"),
  "NOV_etre_pc_1": require("../assets/audio/conversations/NOV_etre_pc_1.mp3"),
  "NOV_etre_pc_3": require("../assets/audio/conversations/NOV_etre_pc_3.mp3"),
  "NOV_etre_pc_5": require("../assets/audio/conversations/NOV_etre_pc_5.mp3"),
  "NOV_etre_pres_1": require("../assets/audio/conversations/NOV_etre_pres_1.mp3"),
  "NOV_etre_pres_3": require("../assets/audio/conversations/NOV_etre_pres_3.mp3"),
  "NOV_etre_pres_5": require("../assets/audio/conversations/NOV_etre_pres_5.mp3"),
  "NOV_faire_fut_1": require("../assets/audio/conversations/NOV_faire_fut_1.mp3"),
  "NOV_faire_fut_3": require("../assets/audio/conversations/NOV_faire_fut_3.mp3"),
  "NOV_faire_fut_5": require("../assets/audio/conversations/NOV_faire_fut_5.mp3"),
  "NOV_faire_pc_1": require("../assets/audio/conversations/NOV_faire_pc_1.mp3"),
  "NOV_faire_pc_3": require("../assets/audio/conversations/NOV_faire_pc_3.mp3"),
  "NOV_faire_pc_5": require("../assets/audio/conversations/NOV_faire_pc_5.mp3"),
  "NOV_faire_pres_1": require("../assets/audio/conversations/NOV_faire_pres_1.mp3"),
  "NOV_faire_pres_3": require("../assets/audio/conversations/NOV_faire_pres_3.mp3"),
  "NOV_faire_pres_5": require("../assets/audio/conversations/NOV_faire_pres_5.mp3"),
};

export function conversationKey(level: string, timeFrame: string, verb: string) {
  return `${level}|${timeFrame}|${verb}`;
}

export function getConversation(level: string, timeFrame: string, verb: string): Conversation | undefined {
  return CONVERSATIONS[conversationKey(level, timeFrame, verb)];
}
