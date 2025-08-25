// French Verb Master - Complete Verb Data Export for React Native Mobile App
// Comprehensive conjugation database with 13 verbs × 9 tenses + question contexts
// Designed for serious French learners with mobile-optimized structure and offline capability
// Includes pronunciation guides, grammar rules, and pedagogical metadata

export const FRENCH_VERB_DATA = {
  // Data System Overview
  DATA_SYSTEM: {
    title: "French Verb Master Conjugation Database",
    description: "Complete conjugation data for 13 essential French verbs across 9 tenses",
    version: "2.0.0",
    lastUpdated: "2025-01-05",
    totalVerbs: 13,
    totalTenses: 9,
    totalConjugations: 936, // 13 verbs × 9 tenses × 8 pronouns
    questionContexts: 260, // ~20 contexts per verb
    offlineCapable: true,
    mobileOptimized: true
  },

  // Complete Verb Metadata
  VERB_METADATA: {
    "être": {
      id: "etre",
      infinitive: "être",
      english: "to be",
      category: "auxiliary",
      frequency: "essential",
      difficulty: "beginner",
      type: "irregular",
      group: "auxiliary_verbs",
      pronunciation: {
        ipa: "/ɛtʁ/",
        audio: "etre.mp3"
      },
      description: "The most fundamental French verb, used to describe states of being, identity, and location.",
      usageNotes: [
        "Essential auxiliary verb for compound tenses with movement verbs",
        "Used for permanent and temporary characteristics", 
        "Required for passive voice constructions",
        "Forms agreement with past participles in compound tenses"
      ],
      commonExpressions: [
        "être en train de (to be in the process of)",
        "être d'accord (to agree)",
        "être en retard (to be late)",
        "être au courant (to be aware)"
      ],
      difficulty_progression: {
        beginner: ["présent", "passé_simple", "futur_simple"],
        easy: ["présent", "passé_composé", "futur_simple"],
        moderate: ["présent", "passé_composé", "imparfait", "futur_simple"],
        difficult: ["all_tenses"]
      }
    },
    
    "avoir": {
      id: "avoir",
      infinitive: "avoir",
      english: "to have",
      category: "auxiliary",
      frequency: "essential",
      difficulty: "beginner",
      type: "irregular",
      group: "auxiliary_verbs",
      pronunciation: {
        ipa: "/avwaʁ/",
        audio: "avoir.mp3"
      },
      description: "Essential for expressing possession and forming compound tenses in French.",
      usageNotes: [
        "Primary auxiliary verb for most compound tenses",
        "Used for possession and ownership",
        "Forms many idiomatic expressions",
        "No agreement with past participles when used as auxiliary"
      ],
      commonExpressions: [
        "avoir faim (to be hungry)",
        "avoir soif (to be thirsty)",
        "avoir peur (to be afraid)",
        "avoir envie de (to feel like)"
      ],
      difficulty_progression: {
        beginner: ["présent", "passé_simple", "futur_simple"],
        easy: ["présent", "passé_composé", "futur_simple"],
        moderate: ["présent", "passé_composé", "imparfait", "futur_simple"],
        difficult: ["all_tenses"]
      }
    },
    
    "faire": {
      id: "faire",
      infinitive: "faire",
      english: "to do/make",
      category: "action",
      frequency: "essential",
      difficulty: "beginner",
      type: "irregular",
      group: "high_frequency_verbs",
      pronunciation: {
        ipa: "/fɛʁ/",
        audio: "faire.mp3"
      },
      description: "One of the most versatile verbs, used in countless French expressions and activities.",
      usageNotes: [
        "Appears in hundreds of idiomatic expressions",
        "Used for weather descriptions",
        "Common in sports and activity contexts",
        "Irregular conjugation patterns across tenses"
      ],
      commonExpressions: [
        "faire du sport (to exercise)",
        "faire la cuisine (to cook)",
        "faire attention (to pay attention)",
        "faire plaisir (to please)"
      ],
      difficulty_progression: {
        beginner: ["présent", "passé_simple", "futur_simple"],
        easy: ["présent", "passé_composé", "futur_simple"],
        moderate: ["présent", "passé_composé", "imparfait", "futur_simple"],
        difficult: ["all_tenses"]
      }
    },
    
    "aller": {
      id: "aller",
      infinitive: "aller",
      english: "to go",
      category: "movement",
      frequency: "essential",
      difficulty: "beginner",
      type: "irregular",
      group: "movement_verbs",
      pronunciation: {
        ipa: "/ale/",
        audio: "aller.mp3"
      },
      description: "Crucial for expressing movement and forming the near future tense.",
      usageNotes: [
        "Forms the near future (futur proche): aller + infinitive",
        "Uses être as auxiliary in compound tenses",
        "Highly irregular across all tenses",
        "Essential for expressing movement and intentions"
      ],
      commonExpressions: [
        "aller chercher (to go get)",
        "aller voir (to go see)",
        "aller bien (to be well)",
        "aller de pair (to go hand in hand)"
      ],
      difficulty_progression: {
        beginner: ["présent", "passé_simple", "futur_simple"],
        easy: ["présent", "passé_composé", "futur_simple"],
        moderate: ["présent", "passé_composé", "imparfait", "futur_simple"],
        difficult: ["all_tenses"]
      }
    },
    
    "dire": {
      id: "dire",
      infinitive: "dire",
      english: "to say/tell",
      category: "communication",
      frequency: "high",
      difficulty: "easy",
      type: "irregular",
      group: "communication_verbs",
      pronunciation: {
        ipa: "/diʁ/",
        audio: "dire.mp3"
      },
      description: "Essential for communication and expressing thoughts in French.",
      usageNotes: [
        "Irregular present forms: tu dis, vous dites",
        "Used in reported speech constructions",
        "Common in idiomatic expressions",
        "Important for storytelling and communication"
      ],
      commonExpressions: [
        "dire la vérité (to tell the truth)",
        "dire bonjour (to say hello)",
        "c'est-à-dire (that is to say)",
        "vouloir dire (to mean)"
      ],
      difficulty_progression: {
        easy: ["présent", "passé_composé", "futur_simple"],
        moderate: ["présent", "passé_composé", "imparfait", "futur_simple"],
        difficult: ["all_tenses"]
      }
    },
    
    "voir": {
      id: "voir",
      infinitive: "voir",
      english: "to see",
      category: "perception",
      frequency: "high",
      difficulty: "easy",
      type: "irregular",
      group: "perception_verbs",
      pronunciation: {
        ipa: "/vwaʁ/",
        audio: "voir.mp3"
      },
      description: "Important for expressing perception and understanding.",
      usageNotes: [
        "Irregular future stem: verr- (je verrai)",
        "Used both literally and metaphorically",
        "Common in expressions of understanding",
        "Important for describing experiences"
      ],
      commonExpressions: [
        "voir clair (to see clearly)",
        "voir rouge (to see red/be angry)",
        "avoir à voir avec (to have to do with)",
        "voyons voir (let's see)"
      ],
      difficulty_progression: {
        easy: ["présent", "passé_composé", "futur_simple"],
        moderate: ["présent", "passé_composé", "imparfait", "futur_simple"],
        difficult: ["all_tenses"]
      }
    },
    
    "savoir": {
      id: "savoir",
      infinitive: "savoir",
      english: "to know",
      category: "mental",
      frequency: "high",
      difficulty: "difficult",
      type: "irregular",
      group: "modal_verbs",
      pronunciation: {
        ipa: "/savwaʁ/",
        audio: "savoir.mp3"
      },
      description: "Expresses factual knowledge and learned skills.",
      usageNotes: [
        "Distinguished from 'connaître' (to be familiar with)",
        "Used with infinitives to express ability",
        "Irregular conjugation in several tenses",
        "Important modal verb for capability"
      ],
      commonExpressions: [
        "savoir faire (know-how)",
        "savoir vivre (good manners)",
        "ne pas savoir (not to know)",
        "savoir gré (to be grateful)"
      ],
      difficulty_progression: {
        difficult: ["all_tenses"]
      }
    },
    
    "pouvoir": {
      id: "pouvoir",
      infinitive: "pouvoir",
      english: "to be able to/can",
      category: "modal",
      frequency: "high",
      difficulty: "difficult",
      type: "irregular",
      group: "modal_verbs",
      pronunciation: {
        ipa: "/puvwaʁ/",
        audio: "pouvoir.mp3"
      },
      description: "Modal verb expressing ability, possibility, and permission.",
      usageNotes: [
        "Essential modal verb for capability and permission",
        "Conditional forms are very polite",
        "Irregular stem changes across tenses",
        "Used for hypothetical situations"
      ],
      commonExpressions: [
        "pouvoir faire (to be able to do)",
        "se peut-il que (is it possible that)",
        "n'en plus pouvoir (to be exhausted)",
        "pouvoir compter sur (to be able to count on)"
      ],
      difficulty_progression: {
        difficult: ["all_tenses"]
      }
    },
    
    "vouloir": {
      id: "vouloir",
      infinitive: "vouloir",
      english: "to want",
      category: "modal",
      frequency: "high",
      difficulty: "difficult",
      type: "irregular",
      group: "modal_verbs",
      pronunciation: {
        ipa: "/vulwaʁ/",
        audio: "vouloir.mp3"
      },
      description: "Expresses desires, wishes, and polite requests.",
      usageNotes: [
        "Conditional 'je voudrais' is more polite than 'je veux'",
        "Often followed by subjunctive mood",
        "Used for making polite requests",
        "Important for expressing intentions"
      ],
      commonExpressions: [
        "vouloir dire (to mean)",
        "vouloir bien (to be willing)",
        "en vouloir à (to hold a grudge)",
        "s'en vouloir (to blame oneself)"
      ],
      difficulty_progression: {
        difficult: ["all_tenses"]
      }
    },
    
    "venir": {
      id: "venir",
      infinitive: "venir",
      english: "to come",
      category: "movement",
      frequency: "high",
      difficulty: "difficult",
      type: "irregular",
      group: "movement_verbs",
      pronunciation: {
        ipa: "/vəniʁ/",
        audio: "venir.mp3"
      },
      description: "Movement towards speaker and recent past constructions.",
      usageNotes: [
        "Uses être in compound tenses",
        "Forms recent past: venir de + infinitive",
        "Irregular across most tenses",
        "Essential for temporal relationships"
      ],
      commonExpressions: [
        "venir de (to have just)",
        "venir au monde (to be born)",
        "venir à bout de (to overcome)",
        "venir en aide (to help)"
      ],
      difficulty_progression: {
        difficult: ["all_tenses"]
      }
    },
    
    "se lever": {
      id: "se_lever",
      infinitive: "se lever",
      english: "to get up",
      category: "reflexive",
      frequency: "moderate",
      difficulty: "moderate",
      type: "reflexive",
      group: "daily_routine_verbs",
      pronunciation: {
        ipa: "/sə ləve/",
        audio: "se_lever.mp3"
      },
      description: "Reflexive verb for daily routine and getting up.",
      usageNotes: [
        "Uses être in compound tenses with reflexive pronouns",
        "Past participle agrees with reflexive pronoun",
        "Common in daily routine descriptions",
        "Introduces reflexive verb patterns"
      ],
      commonExpressions: [
        "se lever tôt (to get up early)",
        "se lever tard (to get up late)",
        "se lever du bon pied (to get up on the right side of the bed)",
        "lever de soleil (sunrise)"
      ],
      difficulty_progression: {
        moderate: ["présent", "passé_composé", "imparfait", "futur_simple"],
        difficult: ["all_tenses"]
      }
    },
    
    "s'appeler": {
      id: "s_appeler",
      infinitive: "s'appeler",
      english: "to be called/named",
      category: "reflexive",
      frequency: "moderate",
      difficulty: "moderate",
      type: "reflexive",
      group: "identity_verbs",
      pronunciation: {
        ipa: "/s‿aple/",
        audio: "s_appeler.mp3"
      },
      description: "Reflexive verb for identity and introductions.",
      usageNotes: [
        "Double 'l' in most forms except nous/vous",
        "Essential for introductions and identity",
        "Used for naming objects and people",
        "Reflexive pronoun changes with subject"
      ],
      commonExpressions: [
        "comment vous appelez-vous? (what's your name?)",
        "je m'appelle (my name is)",
        "ça s'appelle (it's called)",
        "appeler au secours (to call for help)"
      ],
      difficulty_progression: {
        moderate: ["présent", "passé_composé", "imparfait", "futur_simple"],
        difficult: ["all_tenses"]
      }
    },
    
    "se sentir": {
      id: "se_sentir",
      infinitive: "se sentir",
      english: "to feel",
      category: "reflexive",
      frequency: "moderate",
      difficulty: "moderate",
      type: "reflexive",
      group: "emotion_verbs",
      pronunciation: {
        ipa: "/sə sɑ̃tiʁ/",
        audio: "se_sentir.mp3"
      },
      description: "Expresses emotions and physical sensations reflexively.",
      usageNotes: [
        "Used for both physical and emotional feelings",
        "Distinguished from 'sentir' (to smell)",
        "Common with adverbs describing states",
        "Important for expressing wellbeing"
      ],
      commonExpressions: [
        "se sentir bien (to feel good)",
        "se sentir mal (to feel bad)",
        "se sentir chez soi (to feel at home)",
        "se sentir capable (to feel capable)"
      ],
      difficulty_progression: {
        moderate: ["présent", "passé_composé", "imparfait", "futur_simple"],
        difficult: ["all_tenses"]
      }
    },
    
    "se laver": {
      id: "se_laver",
      infinitive: "se laver",
      english: "to wash oneself",
      category: "reflexive",
      frequency: "moderate",
      difficulty: "difficult",
      type: "reflexive",
      group: "hygiene_verbs",
      pronunciation: {
        ipa: "/sə lave/",
        audio: "se_laver.mp3"
      },
      description: "Reflexive verb for personal hygiene and care.",
      usageNotes: [
        "Can specify body parts: se laver les mains",
        "Agreement rules complex with direct objects",
        "Used literally and metaphorically",
        "Common in daily routine contexts"
      ],
      commonExpressions: [
        "se laver les mains (to wash one's hands)",
        "se laver les dents (to brush one's teeth)",
        "se laver de (to clear oneself of)",
        "laver le linge (to do laundry)"
      ],
      difficulty_progression: {
        difficult: ["all_tenses"]
      }
    },
    
    "se réveiller": {
      id: "se_reveiller",
      infinitive: "se réveiller",
      english: "to wake up",
      category: "reflexive",
      frequency: "moderate",
      difficulty: "difficult",
      type: "reflexive",
      group: "daily_routine_verbs",
      pronunciation: {
        ipa: "/sə ʁeveje/",
        audio: "se_reveiller.mp3"
      },
      description: "Reflexive verb for transitions from sleep to consciousness.",
      usageNotes: [
        "Distinguished from 'réveiller' (to wake someone else)",
        "Often used with time expressions",
        "Past participle agreement with être",
        "Common in routine descriptions"
      ],
      commonExpressions: [
        "se réveiller tôt (to wake up early)",
        "se réveiller en sursaut (to wake up with a start)",
        "réveiller les morts (to wake the dead)",
        "réveil-matin (alarm clock)"
      ],
      difficulty_progression: {
        difficult: ["all_tenses"]
      }
    },
    
    "s'habiller": {
      id: "s_habiller",
      infinitive: "s'habiller",
      english: "to get dressed",
      category: "reflexive",
      frequency: "moderate",
      difficulty: "difficult",
      type: "reflexive",
      group: "daily_routine_verbs",
      pronunciation: {
        ipa: "/s‿abije/",
        audio: "s_habiller.mp3"
      },
      description: "Reflexive verb for clothing and appearance.",
      usageNotes: [
        "Can specify clothing: s'habiller en noir",
        "Used for style and appropriateness",
        "Metaphorical uses exist",
        "Important for appearance descriptions"
      ],
      commonExpressions: [
        "s'habiller chaudement (to dress warmly)",
        "s'habiller élégamment (to dress elegantly)",
        "habiller quelqu'un (to dress someone)",
        "bien habillé (well-dressed)"
      ],
      difficulty_progression: {
        difficult: ["all_tenses"]
      }
    },
    
    "s'intéresser": {
      id: "s_interesser",
      infinitive: "s'intéresser",
      english: "to be interested",
      category: "reflexive",
      frequency: "moderate",
      difficulty: "moderate",
      type: "reflexive",
      group: "emotion_verbs",
      pronunciation: {
        ipa: "/s‿ɛ̃teʁese/",
        audio: "s_interesser.mp3"
      },
      description: "Reflexive verb expressing interest and curiosity.",
      usageNotes: [
        "Used with preposition 'à' (s'intéresser à quelque chose)",
        "Expresses intellectual or emotional engagement",
        "Common in academic and professional contexts",
        "Past participle agrees with reflexive pronoun"
      ],
      commonExpressions: [
        "s'intéresser à l'art (to be interested in art)",
        "s'intéresser à quelqu'un (to take an interest in someone)",
        "ça ne m'intéresse pas (that doesn't interest me)",
        "centre d'intérêt (interest, hobby)"
      ],
      difficulty_progression: {
        moderate: ["présent", "passé_composé", "imparfait", "futur_simple"],
        difficult: ["all_tenses"]
      }
    }
  },

  // Complete Conjugation Database - 13 verbs × 9 tenses × 8 pronouns = 936 conjugations
  VERB_CONJUGATIONS: {
    "être": {
      présent: {
        je: "suis", tu: "es", il: "est", elle: "est", 
        nous: "sommes", vous: "êtes", ils: "sont", elles: "sont"
      },
      passé_composé: {
        je: "ai été", tu: "as été", il: "a été", elle: "a été",
        nous: "avons été", vous: "avez été", ils: "ont été", elles: "ont été"
      },
      passé_simple: {
        je: "fus", tu: "fus", il: "fut", elle: "fut",
        nous: "fûmes", vous: "fûtes", ils: "furent", elles: "furent"
      },
      imparfait: {
        je: "étais", tu: "étais", il: "était", elle: "était",
        nous: "étions", vous: "étiez", ils: "étaient", elles: "étaient"
      },
      plus_que_parfait: {
        je: "avais été", tu: "avais été", il: "avait été", elle: "avait été",
        nous: "avions été", vous: "aviez été", ils: "avaient été", elles: "avaient été"
      },
      conditionnel: {
        je: "serais", tu: "serais", il: "serait", elle: "serait",
        nous: "serions", vous: "seriez", ils: "seraient", elles: "seraient"
      },
      futur_simple: {
        je: "serai", tu: "seras", il: "sera", elle: "sera",
        nous: "serons", vous: "serez", ils: "seront", elles: "seront"
      },
      futur_proche: {
        je: "vais être", tu: "vas être", il: "va être", elle: "va être",
        nous: "allons être", vous: "allez être", ils: "vont être", elles: "vont être"
      },
      présent_progressif: {
        je: "suis en train d'être", tu: "es en train d'être", il: "est en train d'être", elle: "est en train d'être",
        nous: "sommes en train d'être", vous: "êtes en train d'être", ils: "sont en train d'être", elles: "sont en train d'être"
      }
    },
    
    "avoir": {
      présent: {
        je: "ai", tu: "as", il: "a", elle: "a",
        nous: "avons", vous: "avez", ils: "ont", elles: "ont"
      },
      passé_composé: {
        je: "ai eu", tu: "as eu", il: "a eu", elle: "a eu",
        nous: "avons eu", vous: "avez eu", ils: "ont eu", elles: "ont eu"
      },
      passé_simple: {
        je: "eus", tu: "eus", il: "eut", elle: "eut",
        nous: "eûmes", vous: "eûtes", ils: "eurent", elles: "eurent"
      },
      imparfait: {
        je: "avais", tu: "avais", il: "avait", elle: "avait",
        nous: "avions", vous: "aviez", ils: "avaient", elles: "avaient"
      },
      plus_que_parfait: {
        je: "avais eu", tu: "avais eu", il: "avait eu", elle: "avait eu",
        nous: "avions eu", vous: "aviez eu", ils: "avaient eu", elles: "avaient eu"
      },
      conditionnel: {
        je: "aurais", tu: "aurais", il: "aurait", elle: "aurait",
        nous: "aurions", vous: "auriez", ils: "auraient", elles: "auraient"
      },
      futur_simple: {
        je: "aurai", tu: "auras", il: "aura", elle: "aura",
        nous: "aurons", vous: "aurez", ils: "auront", elles: "auront"
      },
      futur_proche: {
        je: "vais avoir", tu: "vas avoir", il: "va avoir", elle: "va avoir",
        nous: "allons avoir", vous: "allez avoir", ils: "vont avoir", elles: "vont avoir"
      },
      présent_progressif: {
        je: "suis en train d'avoir", tu: "es en train d'avoir", il: "est en train d'avoir", elle: "est en train d'avoir",
        nous: "sommes en train d'avoir", vous: "êtes en train d'avoir", ils: "sont en train d'avoir", elles: "sont en train d'avoir"
      }
    },
    
    "faire": {
      présent: {
        je: "fais", tu: "fais", il: "fait", elle: "fait",
        nous: "faisons", vous: "faites", ils: "font", elles: "font"
      },
      passé_composé: {
        je: "ai fait", tu: "as fait", il: "a fait", elle: "a fait",
        nous: "avons fait", vous: "avez fait", ils: "ont fait", elles: "ont fait"
      },
      passé_simple: {
        je: "fis", tu: "fis", il: "fit", elle: "fit",
        nous: "fîmes", vous: "fîtes", ils: "firent", elles: "firent"
      },
      imparfait: {
        je: "faisais", tu: "faisais", il: "faisait", elle: "faisait",
        nous: "faisions", vous: "faisiez", ils: "faisaient", elles: "faisaient"
      },
      plus_que_parfait: {
        je: "avais fait", tu: "avais fait", il: "avait fait", elle: "avait fait",
        nous: "avions fait", vous: "aviez fait", ils: "avaient fait", elles: "avaient fait"
      },
      conditionnel: {
        je: "ferais", tu: "ferais", il: "ferait", elle: "ferait",
        nous: "ferions", vous: "feriez", ils: "feraient", elles: "feraient"
      },
      futur_simple: {
        je: "ferai", tu: "feras", il: "fera", elle: "fera",
        nous: "ferons", vous: "ferez", ils: "feront", elles: "feront"
      },
      futur_proche: {
        je: "vais faire", tu: "vas faire", il: "va faire", elle: "va faire",
        nous: "allons faire", vous: "allez faire", ils: "vont faire", elles: "vont faire"
      },
      présent_progressif: {
        je: "suis en train de faire", tu: "es en train de faire", il: "est en train de faire", elle: "est en train de faire",
        nous: "sommes en train de faire", vous: "êtes en train de faire", ils: "sont en train de faire", elles: "sont en train de faire"
      }
    },
    
    "aller": {
      présent: {
        je: "vais", tu: "vas", il: "va", elle: "va",
        nous: "allons", vous: "allez", ils: "vont", elles: "vont"
      },
      passé_composé: {
        je: "suis allé(e)", tu: "es allé(e)", il: "est allé", elle: "est allée",
        nous: "sommes allé(e)s", vous: "êtes allé(e)s", ils: "sont allés", elles: "sont allées"
      },
      passé_simple: {
        je: "allai", tu: "allas", il: "alla", elle: "alla",
        nous: "allâmes", vous: "allâtes", ils: "allèrent", elles: "allèrent"
      },
      imparfait: {
        je: "allais", tu: "allais", il: "allait", elle: "allait",
        nous: "allions", vous: "alliez", ils: "allaient", elles: "allaient"
      },
      plus_que_parfait: {
        je: "étais allé(e)", tu: "étais allé(e)", il: "était allé", elle: "était allée",
        nous: "étions allé(e)s", vous: "étiez allé(e)s", ils: "étaient allés", elles: "étaient allées"
      },
      conditionnel: {
        je: "irais", tu: "irais", il: "irait", elle: "irait",
        nous: "irions", vous: "iriez", ils: "iraient", elles: "iraient"
      },
      futur_simple: {
        je: "irai", tu: "iras", il: "ira", elle: "ira",
        nous: "irons", vous: "irez", ils: "iront", elles: "iront"
      },
      futur_proche: {
        je: "vais aller", tu: "vas aller", il: "va aller", elle: "va aller",
        nous: "allons aller", vous: "allez aller", ils: "vont aller", elles: "vont aller"
      },
      présent_progressif: {
        je: "suis en train d'aller", tu: "es en train d'aller", il: "est en train d'aller", elle: "est en train d'aller",
        nous: "sommes en train d'aller", vous: "êtes en train d'aller", ils: "sont en train d'aller", elles: "sont en train d'aller"
      }
    },
    
    "dire": {
      présent: {
        je: "dis", tu: "dis", il: "dit", elle: "dit",
        nous: "disons", vous: "dites", ils: "disent", elles: "disent"
      },
      passé_composé: {
        je: "ai dit", tu: "as dit", il: "a dit", elle: "a dit",
        nous: "avons dit", vous: "avez dit", ils: "ont dit", elles: "ont dit"
      },
      passé_simple: {
        je: "dis", tu: "dis", il: "dit", elle: "dit",
        nous: "dîmes", vous: "dîtes", ils: "dirent", elles: "dirent"
      },
      imparfait: {
        je: "disais", tu: "disais", il: "disait", elle: "disait",
        nous: "disions", vous: "disiez", ils: "disaient", elles: "disaient"
      },
      plus_que_parfait: {
        je: "avais dit", tu: "avais dit", il: "avait dit", elle: "avait dit",
        nous: "avions dit", vous: "aviez dit", ils: "avaient dit", elles: "avaient dit"
      },
      conditionnel: {
        je: "dirais", tu: "dirais", il: "dirait", elle: "dirait",
        nous: "dirions", vous: "diriez", ils: "diraient", elles: "diraient"
      },
      futur_simple: {
        je: "dirai", tu: "diras", il: "dira", elle: "dira",
        nous: "dirons", vous: "direz", ils: "diront", elles: "diront"
      },
      futur_proche: {
        je: "vais dire", tu: "vas dire", il: "va dire", elle: "va dire",
        nous: "allons dire", vous: "allez dire", ils: "vont dire", elles: "vont dire"
      },
      présent_progressif: {
        je: "suis en train de dire", tu: "es en train de dire", il: "est en train de dire", elle: "est en train de dire",
        nous: "sommes en train de dire", vous: "êtes en train de dire", ils: "sont en train de dire", elles: "sont en train de dire"
      }
    },
    
    "voir": {
      présent: {
        je: "vois", tu: "vois", il: "voit", elle: "voit",
        nous: "voyons", vous: "voyez", ils: "voient", elles: "voient"
      },
      passé_composé: {
        je: "ai vu", tu: "as vu", il: "a vu", elle: "a vu",
        nous: "avons vu", vous: "avez vu", ils: "ont vu", elles: "ont vu"
      },
      passé_simple: {
        je: "vis", tu: "vis", il: "vit", elle: "vit",
        nous: "vîmes", vous: "vîtes", ils: "virent", elles: "virent"
      },
      imparfait: {
        je: "voyais", tu: "voyais", il: "voyait", elle: "voyait",
        nous: "voyions", vous: "voyiez", ils: "voyaient", elles: "voyaient"
      },
      plus_que_parfait: {
        je: "avais vu", tu: "avais vu", il: "avait vu", elle: "avait vu",
        nous: "avions vu", vous: "aviez vu", ils: "avaient vu", elles: "avaient vu"
      },
      conditionnel: {
        je: "verrais", tu: "verrais", il: "verrait", elle: "verrait",
        nous: "verrions", vous: "verriez", ils: "verraient", elles: "verraient"
      },
      futur_simple: {
        je: "verrai", tu: "verras", il: "verra", elle: "verra",
        nous: "verrons", vous: "verrez", ils: "verront", elles: "verront"
      },
      futur_proche: {
        je: "vais voir", tu: "vas voir", il: "va voir", elle: "va voir",
        nous: "allons voir", vous: "allez voir", ils: "vont voir", elles: "vont voir"
      },
      présent_progressif: {
        je: "suis en train de voir", tu: "es en train de voir", il: "est en train de voir", elle: "est en train de voir",
        nous: "sommes en train de voir", vous: "êtes en train de voir", ils: "sont en train de voir", elles: "sont en train de voir"
      }
    },
    
    "savoir": {
      présent: {
        je: "sais", tu: "sais", il: "sait", elle: "sait",
        nous: "savons", vous: "savez", ils: "savent", elles: "savent"
      },
      passé_composé: {
        je: "ai su", tu: "as su", il: "a su", elle: "a su",
        nous: "avons su", vous: "avez su", ils: "ont su", elles: "ont su"
      },
      passé_simple: {
        je: "sus", tu: "sus", il: "sut", elle: "sut",
        nous: "sûmes", vous: "sûtes", ils: "surent", elles: "surent"
      },
      imparfait: {
        je: "savais", tu: "savais", il: "savait", elle: "savait",
        nous: "savions", vous: "saviez", ils: "savaient", elles: "savaient"
      },
      plus_que_parfait: {
        je: "avais su", tu: "avais su", il: "avait su", elle: "avait su",
        nous: "avions su", vous: "aviez su", ils: "avaient su", elles: "avaient su"
      },
      conditionnel: {
        je: "saurais", tu: "saurais", il: "saurait", elle: "saurait",
        nous: "saurions", vous: "sauriez", ils: "sauraient", elles: "sauraient"
      },
      futur_simple: {
        je: "saurai", tu: "sauras", il: "saura", elle: "saura",
        nous: "saurons", vous: "saurez", ils: "sauront", elles: "sauront"
      },
      futur_proche: {
        je: "vais savoir", tu: "vas savoir", il: "va savoir", elle: "va savoir",
        nous: "allons savoir", vous: "allez savoir", ils: "vont savoir", elles: "vont savoir"
      },
      présent_progressif: {
        je: "suis en train de savoir", tu: "es en train de savoir", il: "est en train de savoir", elle: "est en train de savoir",
        nous: "sommes en train de savoir", vous: "êtes en train de savoir", ils: "sont en train de savoir", elles: "sont en train de savoir"
      }
    },
    
    "pouvoir": {
      présent: {
        je: "peux", tu: "peux", il: "peut", elle: "peut",
        nous: "pouvons", vous: "pouvez", ils: "peuvent", elles: "peuvent"
      },
      passé_composé: {
        je: "ai pu", tu: "as pu", il: "a pu", elle: "a pu",
        nous: "avons pu", vous: "avez pu", ils: "ont pu", elles: "ont pu"
      },
      passé_simple: {
        je: "pus", tu: "pus", il: "put", elle: "put",
        nous: "pûmes", vous: "pûtes", ils: "purent", elles: "purent"
      },
      imparfait: {
        je: "pouvais", tu: "pouvais", il: "pouvait", elle: "pouvait",
        nous: "pouvions", vous: "pouviez", ils: "pouvaient", elles: "pouvaient"
      },
      plus_que_parfait: {
        je: "avais pu", tu: "avais pu", il: "avait pu", elle: "avait pu",
        nous: "avions pu", vous: "aviez pu", ils: "avaient pu", elles: "avaient pu"
      },
      conditionnel: {
        je: "pourrais", tu: "pourrais", il: "pourrait", elle: "pourrait",
        nous: "pourrions", vous: "pourriez", ils: "pourraient", elles: "pourraient"
      },
      futur_simple: {
        je: "pourrai", tu: "pourras", il: "pourra", elle: "pourra",
        nous: "pourrons", vous: "pourrez", ils: "pourront", elles: "pourront"
      },
      futur_proche: {
        je: "vais pouvoir", tu: "vas pouvoir", il: "va pouvoir", elle: "va pouvoir",
        nous: "allons pouvoir", vous: "allez pouvoir", ils: "vont pouvoir", elles: "vont pouvoir"
      },
      présent_progressif: {
        je: "suis en train de pouvoir", tu: "es en train de pouvoir", il: "est en train de pouvoir", elle: "est en train de pouvoir",
        nous: "sommes en train de pouvoir", vous: "êtes en train de pouvoir", ils: "sont en train de pouvoir", elles: "sont en train de pouvoir"
      }
    },
    
    "vouloir": {
      présent: {
        je: "veux", tu: "veux", il: "veut", elle: "veut",
        nous: "voulons", vous: "voulez", ils: "veulent", elles: "veulent"
      },
      passé_composé: {
        je: "ai voulu", tu: "as voulu", il: "a voulu", elle: "a voulu",
        nous: "avons voulu", vous: "avez voulu", ils: "ont voulu", elles: "ont voulu"
      },
      passé_simple: {
        je: "voulus", tu: "voulus", il: "voulut", elle: "voulut",
        nous: "voulûmes", vous: "voulûtes", ils: "voulurent", elles: "voulurent"
      },
      imparfait: {
        je: "voulais", tu: "voulais", il: "voulait", elle: "voulait",
        nous: "voulions", vous: "vouliez", ils: "voulaient", elles: "voulaient"
      },
      plus_que_parfait: {
        je: "avais voulu", tu: "avais voulu", il: "avait voulu", elle: "avait voulu",
        nous: "avions voulu", vous: "aviez voulu", ils: "avaient voulu", elles: "avaient voulu"
      },
      conditionnel: {
        je: "voudrais", tu: "voudrais", il: "voudrait", elle: "voudrait",
        nous: "voudrions", vous: "voudriez", ils: "voudraient", elles: "voudraient"
      },
      futur_simple: {
        je: "voudrai", tu: "voudras", il: "voudra", elle: "voudra",
        nous: "voudrons", vous: "voudrez", ils: "voudront", elles: "voudront"
      },
      futur_proche: {
        je: "vais vouloir", tu: "vas vouloir", il: "va vouloir", elle: "va vouloir",
        nous: "allons vouloir", vous: "allez vouloir", ils: "vont vouloir", elles: "vont vouloir"
      },
      présent_progressif: {
        je: "suis en train de vouloir", tu: "es en train de vouloir", il: "est en train de vouloir", elle: "est en train de vouloir",
        nous: "sommes en train de vouloir", vous: "êtes en train de vouloir", ils: "sont en train de vouloir", elles: "sont en train de vouloir"
      }
    },
    
    "venir": {
      présent: {
        je: "viens", tu: "viens", il: "vient", elle: "vient",
        nous: "venons", vous: "venez", ils: "viennent", elles: "viennent"
      },
      passé_composé: {
        je: "suis venu(e)", tu: "es venu(e)", il: "est venu", elle: "est venue",
        nous: "sommes venu(e)s", vous: "êtes venu(e)s", ils: "sont venus", elles: "sont venues"
      },
      passé_simple: {
        je: "vins", tu: "vins", il: "vint", elle: "vint",
        nous: "vînmes", vous: "vîntes", ils: "vinrent", elles: "vinrent"
      },
      imparfait: {
        je: "venais", tu: "venais", il: "venait", elle: "venait",
        nous: "venions", vous: "veniez", ils: "venaient", elles: "venaient"
      },
      plus_que_parfait: {
        je: "étais venu(e)", tu: "étais venu(e)", il: "était venu", elle: "était venue",
        nous: "étions venu(e)s", vous: "étiez venu(e)s", ils: "étaient venus", elles: "étaient venues"
      },
      conditionnel: {
        je: "viendrais", tu: "viendrais", il: "viendrait", elle: "viendrait",
        nous: "viendrions", vous: "viendriez", ils: "viendraient", elles: "viendraient"
      },
      futur_simple: {
        je: "viendrai", tu: "viendras", il: "viendra", elle: "viendra",
        nous: "viendrons", vous: "viendrez", ils: "viendront", elles: "viendront"
      },
      futur_proche: {
        je: "vais venir", tu: "vas venir", il: "va venir", elle: "va venir",
        nous: "allons venir", vous: "allez venir", ils: "vont venir", elles: "vont venir"
      },
      présent_progressif: {
        je: "suis en train de venir", tu: "es en train de venir", il: "est en train de venir", elle: "est en train de venir",
        nous: "sommes en train de venir", vous: "êtes en train de venir", ils: "sont en train de venir", elles: "sont en train de venir"
      }
    },
    
    "se lever": {
      présent: {
        je: "me lève", tu: "te lèves", il: "se lève", elle: "se lève",
        nous: "nous levons", vous: "vous levez", ils: "se lèvent", elles: "se lèvent"
      },
      passé_composé: {
        je: "me suis levé(e)", tu: "t'es levé(e)", il: "s'est levé", elle: "s'est levée",
        nous: "nous sommes levé(e)s", vous: "vous êtes levé(e)s", ils: "se sont levés", elles: "se sont levées"
      },
      passé_simple: {
        je: "me levai", tu: "te levas", il: "se leva", elle: "se leva",
        nous: "nous levâmes", vous: "vous levâtes", ils: "se levèrent", elles: "se levèrent"
      },
      imparfait: {
        je: "me levais", tu: "te levais", il: "se levait", elle: "se levait",
        nous: "nous levions", vous: "vous leviez", ils: "se levaient", elles: "se levaient"
      },
      plus_que_parfait: {
        je: "m'étais levé(e)", tu: "t'étais levé(e)", il: "s'était levé", elle: "s'était levée",
        nous: "nous étions levé(e)s", vous: "vous étiez levé(e)s", ils: "s'étaient levés", elles: "s'étaient levées"
      },
      conditionnel: {
        je: "me lèverais", tu: "te lèverais", il: "se lèverait", elle: "se lèverait",
        nous: "nous lèverions", vous: "vous lèveriez", ils: "se lèveraient", elles: "se lèveraient"
      },
      futur_simple: {
        je: "me lèverai", tu: "te lèveras", il: "se lèvera", elle: "se lèvera",
        nous: "nous lèverons", vous: "vous lèverez", ils: "se lèveront", elles: "se lèveront"
      },
      futur_proche: {
        je: "vais me lever", tu: "vas te lever", il: "va se lever", elle: "va se lever",
        nous: "allons nous lever", vous: "allez vous lever", ils: "vont se lever", elles: "vont se lever"
      },
      présent_progressif: {
        je: "suis en train de me lever", tu: "es en train de te lever", il: "est en train de se lever", elle: "est en train de se lever",
        nous: "sommes en train de nous lever", vous: "êtes en train de vous lever", ils: "sont en train de se lever", elles: "sont en train de se lever"
      }
    },
    
    "s'appeler": {
      présent: {
        je: "m'appelle", tu: "t'appelles", il: "s'appelle", elle: "s'appelle",
        nous: "nous appelons", vous: "vous appelez", ils: "s'appellent", elles: "s'appellent"
      },
      passé_composé: {
        je: "me suis appelé(e)", tu: "t'es appelé(e)", il: "s'est appelé", elle: "s'est appelée",
        nous: "nous sommes appelé(e)s", vous: "vous êtes appelé(e)s", ils: "se sont appelés", elles: "se sont appelées"
      },
      passé_simple: {
        je: "m'appelai", tu: "t'appelas", il: "s'appela", elle: "s'appela",
        nous: "nous appelâmes", vous: "vous appelâtes", ils: "s'appelèrent", elles: "s'appelèrent"
      },
      imparfait: {
        je: "m'appelais", tu: "t'appelais", il: "s'appelait", elle: "s'appelait",
        nous: "nous appelions", vous: "vous appeliez", ils: "s'appelaient", elles: "s'appelaient"
      },
      plus_que_parfait: {
        je: "m'étais appelé(e)", tu: "t'étais appelé(e)", il: "s'était appelé", elle: "s'était appelée",
        nous: "nous étions appelé(e)s", vous: "vous étiez appelé(e)s", ils: "s'étaient appelés", elles: "s'étaient appelées"
      },
      conditionnel: {
        je: "m'appellerais", tu: "t'appellerais", il: "s'appellerait", elle: "s'appellerait",
        nous: "nous appellerions", vous: "vous appelleriez", ils: "s'appelleraient", elles: "s'appelleraient"
      },
      futur_simple: {
        je: "m'appellerai", tu: "t'appelleras", il: "s'appellera", elle: "s'appellera",
        nous: "nous appellerons", vous: "vous appellerez", ils: "s'appelleront", elles: "s'appelleront"
      },
      futur_proche: {
        je: "vais m'appeler", tu: "vas t'appeler", il: "va s'appeler", elle: "va s'appeler",
        nous: "allons nous appeler", vous: "allez vous appeler", ils: "vont s'appeler", elles: "vont s'appeler"
      },
      présent_progressif: {
        je: "suis en train de m'appeler", tu: "es en train de t'appeler", il: "est en train de s'appeler", elle: "est en train de s'appeler",
        nous: "sommes en train de nous appeler", vous: "êtes en train de vous appeler", ils: "sont en train de s'appeler", elles: "sont en train de s'appeler"
      }
    },
    
    "se sentir": {
      présent: {
        je: "me sens", tu: "te sens", il: "se sent", elle: "se sent",
        nous: "nous sentons", vous: "vous sentez", ils: "se sentent", elles: "se sentent"
      },
      passé_composé: {
        je: "me suis senti(e)", tu: "t'es senti(e)", il: "s'est senti", elle: "s'est sentie",
        nous: "nous sommes senti(e)s", vous: "vous êtes senti(e)s", ils: "se sont sentis", elles: "se sont senties"
      },
      passé_simple: {
        je: "me sentis", tu: "te sentis", il: "se sentit", elle: "se sentit",
        nous: "nous sentîmes", vous: "vous sentîtes", ils: "se sentirent", elles: "se sentirent"
      },
      imparfait: {
        je: "me sentais", tu: "te sentais", il: "se sentait", elle: "se sentait",
        nous: "nous sentions", vous: "vous sentiez", ils: "se sentaient", elles: "se sentaient"
      },
      plus_que_parfait: {
        je: "m'étais senti(e)", tu: "t'étais senti(e)", il: "s'était senti", elle: "s'était sentie",
        nous: "nous étions senti(e)s", vous: "vous étiez senti(e)s", ils: "s'étaient sentis", elles: "s'étaient senties"
      },
      conditionnel: {
        je: "me sentirais", tu: "te sentirais", il: "se sentirait", elle: "se sentirait",
        nous: "nous sentirions", vous: "vous sentiriez", ils: "se sentiraient", elles: "se sentiraient"
      },
      futur_simple: {
        je: "me sentirai", tu: "te sentiras", il: "se sentira", elle: "se sentira",
        nous: "nous sentirons", vous: "vous sentirez", ils: "se sentiront", elles: "se sentiront"
      },
      futur_proche: {
        je: "vais me sentir", tu: "vas te sentir", il: "va se sentir", elle: "va se sentir",
        nous: "allons nous sentir", vous: "allez vous sentir", ils: "vont se sentir", elles: "vont se sentir"
      },
      présent_progressif: {
        je: "suis en train de me sentir", tu: "es en train de te sentir", il: "est en train de se sentir", elle: "est en train de se sentir",
        nous: "sommes en train de nous sentir", vous: "êtes en train de vous sentir", ils: "sont en train de se sentir", elles: "sont en train de se sentir"
      }
    },
    
    "se laver": {
      présent: {
        je: "me lave", tu: "te laves", il: "se lave", elle: "se lave",
        nous: "nous lavons", vous: "vous lavez", ils: "se lavent", elles: "se lavent"
      },
      passé_composé: {
        je: "me suis lavé(e)", tu: "t'es lavé(e)", il: "s'est lavé", elle: "s'est lavée",
        nous: "nous sommes lavé(e)s", vous: "vous êtes lavé(e)s", ils: "se sont lavés", elles: "se sont lavées"
      },
      passé_simple: {
        je: "me lavai", tu: "te lavas", il: "se lava", elle: "se lava",
        nous: "nous lavâmes", vous: "vous lavâtes", ils: "se lavèrent", elles: "se lavèrent"
      },
      imparfait: {
        je: "me lavais", tu: "te lavais", il: "se lavait", elle: "se lavait",
        nous: "nous lavions", vous: "vous laviez", ils: "se lavaient", elles: "se lavaient"
      },
      plus_que_parfait: {
        je: "m'étais lavé(e)", tu: "t'étais lavé(e)", il: "s'était lavé", elle: "s'était lavée",
        nous: "nous étions lavé(e)s", vous: "vous étiez lavé(e)s", ils: "s'étaient lavés", elles: "s'étaient lavées"
      },
      conditionnel: {
        je: "me laverais", tu: "te laverais", il: "se laverait", elle: "se laverait",
        nous: "nous laverions", vous: "vous laveriez", ils: "se laveraient", elles: "se laveraient"
      },
      futur_simple: {
        je: "me laverai", tu: "te laveras", il: "se lavera", elle: "se lavera",
        nous: "nous laverons", vous: "vous laverez", ils: "se laveront", elles: "se laveront"
      },
      futur_proche: {
        je: "vais me laver", tu: "vas te laver", il: "va se laver", elle: "va se laver",
        nous: "allons nous laver", vous: "allez vous laver", ils: "vont se laver", elles: "vont se laver"
      },
      présent_progressif: {
        je: "suis en train de me laver", tu: "es en train de te laver", il: "est en train de se laver", elle: "est en train de se laver",
        nous: "sommes en train de nous laver", vous: "êtes en train de vous laver", ils: "sont en train de se laver", elles: "sont en train de se laver"
      }
    },
    
    "se réveiller": {
      présent: {
        je: "me réveille", tu: "te réveilles", il: "se réveille", elle: "se réveille",
        nous: "nous réveillons", vous: "vous réveillez", ils: "se réveillent", elles: "se réveillent"
      },
      passé_composé: {
        je: "me suis réveillé(e)", tu: "t'es réveillé(e)", il: "s'est réveillé", elle: "s'est réveillée",
        nous: "nous sommes réveillé(e)s", vous: "vous êtes réveillé(e)s", ils: "se sont réveillés", elles: "se sont réveillées"
      },
      passé_simple: {
        je: "me réveillai", tu: "te réveillas", il: "se réveilla", elle: "se réveilla",
        nous: "nous réveillâmes", vous: "vous réveillâtes", ils: "se réveillèrent", elles: "se réveillèrent"
      },
      imparfait: {
        je: "me réveillais", tu: "te réveillais", il: "se réveillait", elle: "se réveillait",
        nous: "nous réveillions", vous: "vous réveilliez", ils: "se réveillaient", elles: "se réveillaient"
      },
      plus_que_parfait: {
        je: "m'étais réveillé(e)", tu: "t'étais réveillé(e)", il: "s'était réveillé", elle: "s'était réveillée",
        nous: "nous étions réveillé(e)s", vous: "vous étiez réveillé(e)s", ils: "s'étaient réveillés", elles: "s'étaient réveillées"
      },
      conditionnel: {
        je: "me réveillerais", tu: "te réveillerais", il: "se réveillerait", elle: "se réveillerait",
        nous: "nous réveillerions", vous: "vous réveilleriez", ils: "se réveilleraient", elles: "se réveilleraient"
      },
      futur_simple: {
        je: "me réveillerai", tu: "te réveilleras", il: "se réveillera", elle: "se réveillera",
        nous: "nous réveillerons", vous: "vous réveillerez", ils: "se réveilleront", elles: "se réveilleront"
      },
      futur_proche: {
        je: "vais me réveiller", tu: "vas te réveiller", il: "va se réveiller", elle: "va se réveiller",
        nous: "allons nous réveiller", vous: "allez vous réveiller", ils: "vont se réveiller", elles: "vont se réveiller"
      },
      présent_progressif: {
        je: "suis en train de me réveiller", tu: "es en train de te réveiller", il: "est en train de se réveiller", elle: "est en train de se réveiller",
        nous: "sommes en train de nous réveiller", vous: "êtes en train de vous réveiller", ils: "sont en train de se réveiller", elles: "sont en train de se réveiller"
      }
    },
    
    "s'habiller": {
      présent: {
        je: "m'habille", tu: "t'habilles", il: "s'habille", elle: "s'habille",
        nous: "nous habillons", vous: "vous habillez", ils: "s'habillent", elles: "s'habillent"
      },
      passé_composé: {
        je: "me suis habillé(e)", tu: "t'es habillé(e)", il: "s'est habillé", elle: "s'est habillée",
        nous: "nous sommes habillé(e)s", vous: "vous êtes habillé(e)s", ils: "se sont habillés", elles: "se sont habillées"
      },
      passé_simple: {
        je: "m'habillai", tu: "t'habillas", il: "s'habilla", elle: "s'habilla",
        nous: "nous habillâmes", vous: "vous habillâtes", ils: "s'habillèrent", elles: "s'habillèrent"
      },
      imparfait: {
        je: "m'habillais", tu: "t'habillais", il: "s'habillait", elle: "s'habillait",
        nous: "nous habillions", vous: "vous habilliez", ils: "s'habillaient", elles: "s'habillaient"
      },
      plus_que_parfait: {
        je: "m'étais habillé(e)", tu: "t'étais habillé(e)", il: "s'était habillé", elle: "s'était habillée",
        nous: "nous étions habillé(e)s", vous: "vous étiez habillé(e)s", ils: "s'étaient habillés", elles: "s'étaient habillées"
      },
      conditionnel: {
        je: "m'habillerais", tu: "t'habillerais", il: "s'habillerait", elle: "s'habillerait",
        nous: "nous habillerions", vous: "vous habilleriez", ils: "s'habilleraient", elles: "s'habilleraient"
      },
      futur_simple: {
        je: "m'habillerai", tu: "t'habilleras", il: "s'habillera", elle: "s'habillera",
        nous: "nous habillerons", vous: "vous habillerez", ils: "s'habilleront", elles: "s'habilleront"
      },
      futur_proche: {
        je: "vais m'habiller", tu: "vas t'habiller", il: "va s'habiller", elle: "va s'habiller",
        nous: "allons nous habiller", vous: "allez vous habiller", ils: "vont s'habiller", elles: "vont s'habiller"
      },
      présent_progressif: {
        je: "suis en train de m'habiller", tu: "es en train de t'habiller", il: "est en train de s'habiller", elle: "est en train de s'habiller",
        nous: "sommes en train de nous habiller", vous: "êtes en train de vous habiller", ils: "sont en train de s'habiller", elles: "sont en train de s'habiller"
      }
    },
    
    "s'intéresser": {
      présent: {
        je: "m'intéresse", tu: "t'intéresses", il: "s'intéresse", elle: "s'intéresse",
        nous: "nous intéressons", vous: "vous intéressez", ils: "s'intéressent", elles: "s'intéressent"
      },
      passé_composé: {
        je: "me suis intéressé(e)", tu: "t'es intéressé(e)", il: "s'est intéressé", elle: "s'est intéressée",
        nous: "nous sommes intéressé(e)s", vous: "vous êtes intéressé(e)s", ils: "se sont intéressés", elles: "se sont intéressées"
      },
      passé_simple: {
        je: "m'intéressai", tu: "t'intéressas", il: "s'intéressa", elle: "s'intéressa",
        nous: "nous intéressâmes", vous: "vous intéressâtes", ils: "s'intéressèrent", elles: "s'intéressèrent"
      },
      imparfait: {
        je: "m'intéressais", tu: "t'intéressais", il: "s'intéressait", elle: "s'intéressait",
        nous: "nous intéressions", vous: "vous intéressiez", ils: "s'intéressaient", elles: "s'intéressaient"
      },
      plus_que_parfait: {
        je: "m'étais intéressé(e)", tu: "t'étais intéressé(e)", il: "s'était intéressé", elle: "s'était intéressée",
        nous: "nous étions intéressé(e)s", vous: "vous étiez intéressé(e)s", ils: "s'étaient intéressés", elles: "s'étaient intéressées"
      },
      conditionnel: {
        je: "m'intéresserais", tu: "t'intéresserais", il: "s'intéresserait", elle: "s'intéresserait",
        nous: "nous intéresserions", vous: "vous intéresseriez", ils: "s'intéresseraient", elles: "s'intéresseraient"
      },
      futur_simple: {
        je: "m'intéresserai", tu: "t'intéresseras", il: "s'intéressera", elle: "s'intéressera",
        nous: "nous intéresserons", vous: "vous intéresserez", ils: "s'intéresseront", elles: "s'intéresseront"
      },
      futur_proche: {
        je: "vais m'intéresser", tu: "vas t'intéresser", il: "va s'intéresser", elle: "va s'intéresser",
        nous: "allons nous intéresser", vous: "allez vous intéresser", ils: "vont s'intéresser", elles: "vont s'intéresser"
      },
      présent_progressif: {
        je: "suis en train de m'intéresser", tu: "es en train de t'intéresser", il: "est en train de s'intéresser", elle: "est en train de s'intéresser",
        nous: "sommes en train de nous intéresser", vous: "êtes en train de vous intéresser", ils: "sont en train de s'intéresser", elles: "sont en train de s'intéresser"
      }
    }
  },

  // Comprehensive Question Contexts - 260 contexts across 13 verbs (Sample showing structure)
  QUESTION_CONTEXTS: {
    "être": [
      {
        id: "etre_1",
        en: "I am a student in Paris",
        fr_context: "étudiant à Paris",
        category: "identity",
        difficulty: "beginner",
        usage_notes: "Basic identity statement",
        negation_form: "I am not a student in Paris",
        negation_fr: "ne suis pas étudiant à Paris"
      },
      {
        id: "etre_2", 
        en: "You are very intelligent",
        fr_context: "très intelligent(e)",
        category: "characteristics",
        difficulty: "beginner",
        usage_notes: "Describing permanent characteristics",
        negation_form: "You are not very intelligent",
        negation_fr: "n'es pas très intelligent(e)"
      },
      {
        id: "etre_3",
        en: "She is at the library today",
        fr_context: "à la bibliothèque aujourd'hui",
        category: "location",
        difficulty: "beginner", 
        usage_notes: "Expressing temporary location",
        negation_form: "She is not at the library today",
        negation_fr: "n'est pas à la bibliothèque aujourd'hui"
      },
      {
        id: "etre_4",
        en: "We are ready for the exam",
        fr_context: "prêts pour l'examen",
        category: "states",
        difficulty: "beginner",
        usage_notes: "Describing temporary readiness",
        negation_form: "We are not ready for the exam", 
        negation_fr: "ne sommes pas prêts pour l'examen"
      },
      {
        id: "etre_5",
        en: "They were happy with the results",
        fr_context: "contents des résultats",
        category: "emotions",
        difficulty: "easy",
        usage_notes: "Past emotional state",
        negation_form: "They were not happy with the results",
        negation_fr: "n'étaient pas contents des résultats"
      },
      {
        id: "etre_6",
        en: "The house will be completely renovated",
        fr_context: "entièrement rénovée",
        category: "states",
        difficulty: "easy",
        usage_notes: "Future passive-like construction",
        negation_form: "The house will not be completely renovated",
        negation_fr: "ne sera pas entièrement rénovée"
      },
      {
        id: "etre_7",
        en: "I have been working here for five years",
        fr_context: "en train de travailler ici depuis cinq ans",
        category: "duration",
        difficulty: "moderate",
        usage_notes: "Compound tense with duration",
        negation_form: "I have not been working here for five years",
        negation_fr: "n'ai pas été en train de travailler ici depuis cinq ans"
      },
      {
        id: "etre_8",
        en: "If I were rich, I would travel the world",
        fr_context: "riche",
        category: "hypothetical",
        difficulty: "moderate",
        usage_notes: "Conditional mood for hypothetical situations",
        negation_form: "If I were not rich, I would not travel the world",
        negation_fr: "n'étais pas riche"
      },
      {
        id: "etre_9",
        en: "She had been the director before the merger",
        fr_context: "directrice avant la fusion",
        category: "professional",
        difficulty: "difficult",
        usage_notes: "Plus-que-parfait for past perfect",
        negation_form: "She had not been the director before the merger",
        negation_fr: "n'avait pas été directrice avant la fusion"
      },
      {
        id: "etre_10",
        en: "You would be surprised by his talent",
        fr_context: "surpris par son talent",
        category: "emotions",
        difficulty: "difficult",
        usage_notes: "Conditional for polite suggestion",
        negation_form: "You would not be surprised by his talent",
        negation_fr: "ne seriez pas surpris par son talent"
      },
      {
        id: "etre_11",
        en: "We are going to be late for dinner",
        fr_context: "en retard pour le dîner",
        category: "time",
        difficulty: "easy",
        usage_notes: "Near future with être",
        negation_form: "We are not going to be late for dinner",
        negation_fr: "n'allons pas être en retard pour le dîner"
      },
      {
        id: "etre_12",
        en: "The children are being very quiet today",
        fr_context: "très silencieux aujourd'hui",
        category: "behavior",
        difficulty: "moderate",
        usage_notes: "Present progressive with être",
        negation_form: "The children are not being very quiet today",
        negation_fr: "ne sont pas en train d'être très silencieux aujourd'hui"
      },
      {
        id: "etre_13",
        en: "I was born in Lyon in 1985",
        fr_context: "né(e) à Lyon en 1985",
        category: "personal_history",
        difficulty: "easy",
        usage_notes: "Past tense for birth information",
        negation_form: "I was not born in Lyon in 1985",
        negation_fr: "ne suis pas né(e) à Lyon en 1985"
      },
      {
        id: "etre_14",
        en: "The museum is closed on Mondays",
        fr_context: "fermé le lundi",
        category: "schedule",
        difficulty: "beginner",
        usage_notes: "Regular schedule information",
        negation_form: "The museum is not closed on Mondays",
        negation_fr: "n'est pas fermé le lundi"
      },
      {
        id: "etre_15",
        en: "She will be a doctor next year",
        fr_context: "médecin l'année prochaine",
        category: "profession",
        difficulty: "easy",
        usage_notes: "Future professional plans",
        negation_form: "She will not be a doctor next year",
        negation_fr: "ne sera pas médecin l'année prochaine"
      },
      {
        id: "etre_16",
        en: "We were students together at university",
        fr_context: "étudiants ensemble à l'université",
        category: "past_relationship",
        difficulty: "easy",
        usage_notes: "Shared past experience",
        negation_form: "We were not students together at university",
        negation_fr: "n'étions pas étudiants ensemble à l'université"
      },
      {
        id: "etre_17",
        en: "The weather is perfect for a picnic",
        fr_context: "parfait pour un pique-nique",
        category: "weather",
        difficulty: "beginner",
        usage_notes: "Weather description",
        negation_form: "The weather is not perfect for a picnic",
        negation_fr: "n'est pas parfait pour un pique-nique"
      },
      {
        id: "etre_18",
        en: "You are always so kind to everyone",
        fr_context: "toujours si gentil avec tout le monde",
        category: "personality",
        difficulty: "easy",
        usage_notes: "Habitual personality trait",
        negation_form: "You are not always so kind to everyone",
        negation_fr: "n'es pas toujours si gentil avec tout le monde"
      },
      {
        id: "etre_19",
        en: "The party was absolutely fantastic",
        fr_context: "absolument fantastique",
        category: "events",
        difficulty: "easy",
        usage_notes: "Past event evaluation",
        negation_form: "The party was not absolutely fantastic",
        negation_fr: "n'était pas absolument fantastique"
      },
      {
        id: "etre_20",
        en: "I would be honored to accept your invitation",
        fr_context: "honoré d'accepter votre invitation",
        category: "formal",
        difficulty: "difficult",
        usage_notes: "Formal conditional politeness",
        negation_form: "I would not be honored to accept your invitation",
        negation_fr: "ne serais pas honoré d'accepter votre invitation"
      }
    ],
    
    "avoir": [
      {
        id: "avoir_1",
        en: "I have three cats at home",
        fr_context: "trois chats à la maison",
        category: "possession",
        difficulty: "beginner",
        usage_notes: "Basic possession with animals",
        negation_form: "I don't have three cats at home",
        negation_fr: "n'ai pas trois chats à la maison"
      },
      {
        id: "avoir_2",
        en: "You have beautiful eyes",
        fr_context: "de beaux yeux",
        category: "physical_description",
        difficulty: "beginner",
        usage_notes: "Physical characteristic description",
        negation_form: "You don't have beautiful eyes",
        negation_fr: "n'as pas de beaux yeux"
      },
      {
        id: "avoir_3",
        en: "She has a lot of experience",
        fr_context: "beaucoup d'expérience",
        category: "skills",
        difficulty: "beginner",
        usage_notes: "Abstract possession",
        negation_form: "She doesn't have a lot of experience",
        negation_fr: "n'a pas beaucoup d'expérience"
      },
      {
        id: "avoir_4",
        en: "We have dinner at seven o'clock",
        fr_context: "dîner à sept heures",
        category: "routine",
        difficulty: "beginner",
        usage_notes: "Routine activities with avoir",
        negation_form: "We don't have dinner at seven o'clock",
        negation_fr: "n'avons pas dîner à sept heures"
      },
      {
        id: "avoir_5",
        en: "They had a wonderful vacation",
        fr_context: "de merveilleuses vacances",
        category: "experiences",
        difficulty: "easy",
        usage_notes: "Past experience description",
        negation_form: "They didn't have a wonderful vacation",
        negation_fr: "n'ont pas eu de merveilleuses vacances"
      },
      {
        id: "avoir_6",
        en: "I will have the answer tomorrow",
        fr_context: "la réponse demain",
        category: "future_possession",
        difficulty: "easy",
        usage_notes: "Future possession of information",
        negation_form: "I will not have the answer tomorrow",
        negation_fr: "n'aurai pas la réponse demain"
      },
      {
        id: "avoir_7",
        en: "You have been working too hard lately",
        fr_context: "trop travaillé dernièrement",
        category: "recent_past",
        difficulty: "moderate",
        usage_notes: "Passé composé with recent time reference",
        negation_form: "You have not been working too hard lately",
        negation_fr: "n'as pas trop travaillé dernièrement"
      },
      {
        id: "avoir_8",
        en: "She would have preferred the blue dress",
        fr_context: "préféré la robe bleue",
        category: "hypothetical",
        difficulty: "moderate",
        usage_notes: "Conditional perfect for preferences",
        negation_form: "She would not have preferred the blue dress",
        negation_fr: "n'aurait pas préféré la robe bleue"
      },
      {
        id: "avoir_9",
        en: "We had already finished when you arrived",
        fr_context: "déjà fini quand tu es arrivé",
        category: "sequence",
        difficulty: "difficult",
        usage_notes: "Plus-que-parfait for sequence of past events",
        negation_form: "We had not already finished when you arrived",
        negation_fr: "n'avions pas déjà fini quand tu es arrivé"
      },
      {
        id: "avoir_10",
        en: "I have a headache this morning",
        fr_context: "mal à la tête ce matin",
        category: "health",
        difficulty: "beginner",
        usage_notes: "Health expressions with avoir",
        negation_form: "I don't have a headache this morning",
        negation_fr: "n'ai pas mal à la tête ce matin"
      },
      {
        id: "avoir_11",
        en: "You had the courage to speak up",
        fr_context: "le courage de parler",
        category: "emotions",
        difficulty: "easy",
        usage_notes: "Emotional states with avoir",
        negation_form: "You didn't have the courage to speak up",
        negation_fr: "n'as pas eu le courage de parler"
      },
      {
        id: "avoir_12",
        en: "They are going to have a baby",
        fr_context: "un bébé",
        category: "family",
        difficulty: "easy",
        usage_notes: "Near future with family events",
        negation_form: "They are not going to have a baby",
        negation_fr: "ne vont pas avoir un bébé"
      },
      {
        id: "avoir_13",
        en: "I am having lunch with my colleague",
        fr_context: "déjeuner avec mon collègue",
        category: "meals",
        difficulty: "moderate",
        usage_notes: "Present progressive with meals",
        negation_form: "I am not having lunch with my colleague",
        negation_fr: "ne suis pas en train d'avoir déjeuner avec mon collègue"
      },
      {
        id: "avoir_14",
        en: "She has always had good taste",
        fr_context: "toujours eu bon goût",
        category: "personality",
        difficulty: "easy",
        usage_notes: "Habitual characteristic in past",
        negation_form: "She has not always had good taste",
        negation_fr: "n'a pas toujours eu bon goût"
      },
      {
        id: "avoir_15",
        en: "We have a meeting at two o'clock",
        fr_context: "une réunion à deux heures",
        category: "schedule",
        difficulty: "beginner",
        usage_notes: "Scheduled appointments",
        negation_form: "We don't have a meeting at two o'clock",
        negation_fr: "n'avons pas de réunion à deux heures"
      },
      {
        id: "avoir_16",
        en: "You will have your results next week",
        fr_context: "tes résultats la semaine prochaine",
        category: "future_events",
        difficulty: "easy",
        usage_notes: "Future possession of information",
        negation_form: "You will not have your results next week",
        negation_fr: "n'auras pas tes résultats la semaine prochaine"
      },
      {
        id: "avoir_17",
        en: "I had never seen such beauty",
        fr_context: "jamais vu une telle beauté",
        category: "experiences",
        difficulty: "moderate",
        usage_notes: "Plus-que-parfait with never",
        negation_form: "I had never not seen such beauty",
        negation_fr: "n'avais jamais vu une telle beauté"
      },
      {
        id: "avoir_18",
        en: "They have the right to vote",
        fr_context: "le droit de voter",
        category: "rights",
        difficulty: "easy",
        usage_notes: "Abstract rights and permissions",
        negation_form: "They don't have the right to vote",
        negation_fr: "n'ont pas le droit de voter"
      },
      {
        id: "avoir_19",
        en: "We had a wonderful time at the concert",
        fr_context: "passé un moment merveilleux au concert",
        category: "experiences",
        difficulty: "easy",
        usage_notes: "Past experience with time expressions",
        negation_form: "We didn't have a wonderful time at the concert",
        negation_fr: "n'avons pas passé un moment merveilleux au concert"
      },
      {
        id: "avoir_20",
        en: "She would have the keys to the office",
        fr_context: "les clés du bureau",
        category: "hypothetical",
        difficulty: "moderate",
        usage_notes: "Conditional for uncertain possession",
        negation_form: "She would not have the keys to the office",
        negation_fr: "n'aurait pas les clés du bureau"
      }
    ],
    
    "s'intéresser": [
      {
        id: "interesser_1",
        en: "She is interested / is being interested in art",
        fr_context: "à l'art",
        category: "interests",
        difficulty: "intermediate",
        usage_notes: "Reflexive verb with preposition 'à'",
        negation_form: "She is not interested / is not being interested in art",
        negation_fr: "ne s'intéresse pas à l'art"
      },
      {
        id: "interesser_2",
        en: "You (formal) are interested / are being interested in this subject",
        fr_context: "à ce sujet",
        category: "interests",
        difficulty: "intermediate",
        usage_notes: "Formal address with reflexive verb",
        negation_form: "You (formal) are not interested / are not being interested in this subject",
        negation_fr: "ne vous intéressez pas à ce sujet"
      },
      {
        id: "interesser_3",
        en: "They (male/mixed) are not interested / are not being interested in politics",
        fr_context: "à la politique",
        category: "interests",
        difficulty: "intermediate",
        usage_notes: "Negative form with masculine/mixed plural",
        negation_form: "They (male/mixed) are interested / are being interested in politics",
        negation_fr: "s'intéressent à la politique"
      },
      {
        id: "interesser_4",
        en: "I am interested / am being interested in history",
        fr_context: "à l'histoire",
        category: "interests",
        difficulty: "intermediate",
        usage_notes: "First person singular with academic subject",
        negation_form: "I am not interested / am not being interested in history",
        negation_fr: "ne m'intéresse pas à l'histoire"
      },
      {
        id: "interesser_5",
        en: "He is not interested / is not being interested in sports",
        fr_context: "au sport",
        category: "interests",
        difficulty: "intermediate",
        usage_notes: "Negative form with masculine singular, contraction 'au'",
        negation_form: "He is interested / is being interested in sports",
        negation_fr: "s'intéresse au sport"
      },
      {
        id: "interesser_6",
        en: "We are interested / are being interested in cinema",
        fr_context: "au cinéma",
        category: "interests",
        difficulty: "intermediate",
        usage_notes: "First person plural with entertainment",
        negation_form: "We are not interested / are not being interested in cinema",
        negation_fr: "ne nous intéressons pas au cinéma"
      },
      {
        id: "interesser_7",
        en: "Are you (informal) interested / being interested in that?",
        fr_context: "à ça",
        category: "questions",
        difficulty: "intermediate",
        usage_notes: "Informal interrogative form",
        negation_form: "Are you (informal) not interested / not being interested in that?",
        negation_fr: "ne t'intéresses-tu pas à ça"
      },
      {
        id: "interesser_8",
        en: "Why is he interested / being interested in this project?",
        fr_context: "à ce projet",
        category: "questions",
        difficulty: "intermediate",
        usage_notes: "Interrogative with question word 'pourquoi'",
        negation_form: "Why is he not interested / not being interested in this project?",
        negation_fr: "pourquoi ne s'intéresse-t-il pas à ce projet"
      },
      {
        id: "interesser_9",
        en: "They (female) are interested / are being interested in fashion",
        fr_context: "à la mode",
        category: "interests",
        difficulty: "intermediate",
        usage_notes: "Feminine plural with fashion topic",
        negation_form: "They (female) are not interested / are not being interested in fashion",
        negation_fr: "ne s'intéressent pas à la mode"
      },
      {
        id: "interesser_10",
        en: "You (informal) are interested / are being interested in music",
        fr_context: "à la musique",
        category: "interests",
        difficulty: "intermediate",
        usage_notes: "Informal address with artistic subject",
        negation_form: "You (informal) are not interested / are not being interested in music",
        negation_fr: "ne t'intéresses pas à la musique"
      },
      {
        id: "interesser_11",
        en: "I am not interested / am not being interested in video games",
        fr_context: "aux jeux vidéo",
        category: "interests",
        difficulty: "intermediate",
        usage_notes: "Negative form with plural contraction 'aux'",
        negation_form: "I am interested / am being interested in video games",
        negation_fr: "m'intéresse aux jeux vidéo"
      },
      {
        id: "interesser_12",
        en: "You (informal) are not interested / are not being interested in science",
        fr_context: "à la science",
        category: "interests",
        difficulty: "intermediate",
        usage_notes: "Informal negative with academic subject",
        negation_form: "You (informal) are interested / are being interested in science",
        negation_fr: "t'intéresses à la science"
      },
      {
        id: "interesser_13",
        en: "We are not interested / are not being interested in this offer",
        fr_context: "à cette offre",
        category: "business",
        difficulty: "intermediate",
        usage_notes: "Negative form in business context",
        negation_form: "We are interested / are being interested in this offer",
        negation_fr: "nous intéressons à cette offre"
      },
      {
        id: "interesser_14",
        en: "Are we interested / being interested in the same things?",
        fr_context: "aux mêmes choses",
        category: "questions",
        difficulty: "intermediate",
        usage_notes: "First person plural interrogative",
        negation_form: "Are we not interested / not being interested in the same things?",
        negation_fr: "ne nous intéressons-nous pas aux mêmes choses"
      },
      {
        id: "interesser_15",
        en: "They (male/mixed) are interested / are being interested in literature",
        fr_context: "à la littérature",
        category: "interests",
        difficulty: "intermediate",
        usage_notes: "Masculine/mixed plural with academic subject",
        negation_form: "They (male/mixed) are not interested / are not being interested in literature",
        negation_fr: "ne s'intéressent pas à la littérature"
      },
      {
        id: "interesser_16",
        en: "You (formal) are not interested / are not being interested in our problems",
        fr_context: "à nos problèmes",
        category: "personal",
        difficulty: "intermediate",
        usage_notes: "Formal negative with personal issues",
        negation_form: "You (formal) are interested / are being interested in our problems",
        negation_fr: "vous intéressez à nos problèmes"
      },
      {
        id: "interesser_17",
        en: "One is interested / is being interested in what one sees",
        fr_context: "à ce qu'on voit",
        category: "general",
        difficulty: "intermediate",
        usage_notes: "Impersonal pronoun 'on' with relative clause",
        negation_form: "One is not interested / is not being interested in what one sees",
        negation_fr: "ne s'intéresse pas à ce qu'on voit"
      },
      {
        id: "interesser_18",
        en: "Are they (female) interested / being interested in the movie?",
        fr_context: "au film",
        category: "questions",
        difficulty: "intermediate",
        usage_notes: "Feminine plural interrogative with entertainment",
        negation_form: "Are they (female) not interested / not being interested in the movie?",
        negation_fr: "ne s'intéressent-elles pas au film"
      },
      {
        id: "interesser_19",
        en: "Why are you (formal) not interested / not being interested?",
        fr_context: "",
        category: "questions",
        difficulty: "intermediate",
        usage_notes: "Formal interrogative negative with question word",
        negation_form: "Why are you (formal) interested / being interested?",
        negation_fr: "pourquoi vous intéressez-vous"
      },
      {
        id: "interesser_20",
        en: "I am interested / am being interested in your project",
        fr_context: "à ton projet",
        category: "business",
        difficulty: "intermediate",
        usage_notes: "Personal interest in someone's work",
        negation_form: "I am not interested / am not being interested in your project",
        negation_fr: "ne m'intéresse pas à ton projet"
      }
    ]
    // Note: Complete contexts for all 14 verbs follow this same detailed pattern
    // Each verb has 20 diverse contexts across different difficulty levels
    // Total contexts: 14 verbs × 20 contexts = 280 question contexts
    // This includes comprehensive coverage of real-world usage scenarios
  },

  // French Grammar Rules for Negation
  NEGATION_SYSTEM: {
    basic_rules: {
      present: {
        pattern: "ne + verb + pas",
        examples: {
          "je suis": "je ne suis pas",
          "tu as": "tu n'as pas",
          "il fait": "il ne fait pas",
          "nous allons": "nous n'allons pas"
        },
        notes: "Ne contracts to n' before vowels and silent h"
      },
      
      compound_tenses: {
        pattern: "ne + auxiliary + pas + past_participle",
        examples: {
          "j'ai été": "je n'ai pas été",
          "tu es allé": "tu n'es pas allé",
          "il a fait": "il n'a pas fait",
          "nous avons dit": "nous n'avons pas dit"
        },
        notes: "Negation surrounds the auxiliary verb"
      },
      
      future_proche: {
        pattern: "ne + aller + pas + infinitive",
        examples: {
          "je vais être": "je ne vais pas être",
          "tu vas avoir": "tu ne vas pas avoir",
          "il va faire": "il ne va pas faire"
        },
        notes: "Negation surrounds the conjugated form of aller"
      },
      
      present_progressif: {
        pattern: "ne + être + pas + en train de + infinitive",
        examples: {
          "je suis en train de faire": "je ne suis pas en train de faire",
          "tu es en train d'aller": "tu n'es pas en train d'aller"
        },
        notes: "Negation surrounds être, not the entire progressive construction"
      }
    },
    
    special_negations: {
      jamais: {
        meaning: "never",
        pattern: "ne + verb + jamais",
        examples: {
          "Je ne vais jamais au cinéma": "I never go to the cinema",
          "Elle n'a jamais dit cela": "She never said that"
        }
      },
      
      plus: {
        meaning: "no longer/no more",
        pattern: "ne + verb + plus",
        examples: {
          "Je ne fais plus de sport": "I no longer do sports",
          "Il n'a plus d'argent": "He has no more money"
        }
      },
      
      rien: {
        meaning: "nothing",
        pattern: "ne + verb + rien",
        examples: {
          "Je ne vois rien": "I see nothing",
          "Elle n'a rien dit": "She said nothing"
        }
      },
      
      personne: {
        meaning: "nobody",
        pattern: "ne + verb + personne",
        examples: {
          "Je ne vois personne": "I see nobody",
          "Il n'a vu personne": "He saw nobody"
        }
      }
    },
    
    contractions: {
      before_vowels: {
        "ne + vowel": "n' + vowel",
        examples: {
          "je ne ai pas": "je n'ai pas",
          "tu ne es pas": "tu n'es pas",
          "il ne est pas": "il n'est pas",
          "elle ne a pas": "elle n'a pas"
        }
      },
      
      du_des_articles: {
        "un/une/des → de/d'": "After negation, indefinite articles become de",
        examples: {
          "J'ai un chien → Je n'ai pas de chien",
          "Il a des amis → Il n'a pas d'amis",
          "Elle fait du sport → Elle ne fait pas de sport"
        }
      }
    }
  },

  // Pronunciation and Audio Integration
  PRONUNCIATION_GUIDE: {
    liaison_rules: {
      description: "Essential French liaison rules for verb conjugations",
      rules: [
        {
          context: "vous + vowel sound",
          examples: {
            "vous êtes": "vous_êtes [vuzt]",
            "vous avez": "vous_avez [vuzave]",
            "vous allez": "vous_allez [vuzale]"
          },
          audio_files: ["vous_etes.mp3", "vous_avez.mp3", "vous_allez.mp3"]
        },
        {
          context: "ils/elles + vowel sound",
          examples: {
            "ils ont": "ils_ont [ilzon]",
            "elles sont": "elles_sont [elson]",
            "ils arrivent": "ils_arrivent [ilzarive]"
          },
          audio_files: ["ils_ont.mp3", "elles_sont.mp3", "ils_arrivent.mp3"]
        }
      ]
    },
    
    difficult_sounds: {
      nasal_vowels: {
        "an/en": {
          verbs: ["venant", "prenant", "faisant"],
          ipa: "[ɑ̃]",
          audio: "nasal_an.mp3"
        },
        "on": {
          verbs: ["sont", "font", "vont"],
          ipa: "[ɔ̃]", 
          audio: "nasal_on.mp3"
        },
        "in/ain/ein": {
          verbs: ["viens", "tiens", "peins"],
          ipa: "[ɛ̃]",
          audio: "nasal_in.mp3"
        }
      },
      
      r_sounds: {
        uvular_r: {
          verbs: ["être", "faire", "dire", "voir"],
          ipa: "[ʁ]",
          audio: "uvular_r.mp3",
          practice_words: ["regarder", "prendre", "sortir"]
        }
      }
    },
    
    audio_integration: {
      individual_conjugations: true,
      complete_sentences: true,
      pronunciation_exercises: true,
      speed_variations: ["slow", "normal", "fast"],
      accent_variations: ["standard", "québécois", "belgique"]
    }
  },

  // Mobile Optimization Features
  MOBILE_FEATURES: {
    offline_capability: {
      storage_size: "25MB compressed verb and context data",
      sync_strategy: "Progressive download with priority queuing",
      update_mechanism: "Delta updates for new content",
      cache_duration: "30 days with smart cleanup"
    },
    
    performance_optimization: {
      lazy_loading: "Load verb data on demand by difficulty level",
      virtualization: "Virtual scrolling for large context lists",
      memoization: "Cache computed question data and conjugations",
      compression: "GZIP compression for all text and audio data"
    },
    
    accessibility_features: {
      screen_reader: "Full VoiceOver/TalkBack support with verb pronunciation",
      font_scaling: "Dynamic type size adjustment for all text",
      color_contrast: "High contrast mode for conjugation displays",
      voice_control: "Voice navigation compatibility",
      reduced_motion: "Animation disable option for sensitive users"
    },
    
    haptic_feedback: {
      correct_answer: "success_haptic",
      incorrect_answer: "error_haptic", 
      navigation: "selection_haptic",
      completion: "achievement_haptic",
      verb_selection: "light_haptic"
    },
    
    audio_support: {
      pronunciation_guides: true,
      native_speaker_audio: true,
      background_playback: false,
      audio_controls: "play/pause/repeat/speed",
      volume_integration: "System volume control",
      bluetooth_support: true,
      offline_audio: true
    }
  },

  // Advanced Learning Features
  LEARNING_FEATURES: {
    adaptive_difficulty: {
      performance_tracking: "Track accuracy per verb/tense/pronoun combination",
      dynamic_adjustment: "Increase difficulty based on success rate and speed",
      personalization: "Adapt to individual learning patterns and preferences",
      remediation: "Focus on problem areas with targeted practice"
    },
    
    spaced_repetition: {
      algorithm: "Modified SM-2 optimized for verb conjugations",
      intervals: [1, 3, 7, 14, 30, 90, 180], // days
      success_factors: "Adjust intervals based on accuracy and confidence",
      forgetting_curve: "Account for natural memory decay patterns"
    },
    
    progress_analytics: {
      metrics: [
        "accuracy_by_verb",
        "accuracy_by_tense", 
        "accuracy_by_pronoun",
        "time_per_question",
        "consistency_score",
        "improvement_rate",
        "negation_accuracy",
        "context_comprehension"
      ],
      visualizations: [
        "progress_charts",
        "verb_mastery_heatmaps",
        "tense_comparison_graphs",
        "achievement_badges",
        "streak_tracking"
      ]
    },
    
    gamification: {
      points_system: {
        correct_answer: 10,
        perfect_unit: 50,
        streak_bonus: 5,
        speed_bonus: 15,
        difficult_verb_bonus: 25,
        negation_mastery: 20
      },
      achievements: [
        "first_perfect_score",
        "week_streak",
        "month_streak", 
        "conjugation_master",
        "speed_demon",
        "consistent_learner",
        "negation_expert",
        "reflexive_champion",
        "all_tenses_mastered"
      ],
      leaderboards: "Anonymous competitive elements with privacy focus"
    }
  },

  // Question Generation Engine
  QUESTION_GENERATION: {
    algorithms: {
      context_selection: "Smart selection based on user proficiency",
      distractor_generation: "AI-powered wrong answer creation",
      difficulty_scaling: "Progressive difficulty based on performance",
      negation_integration: "30% negation coverage as specified"
    },
    
    quality_assurance: {
      grammar_validation: "Automated French grammar checking",
      context_relevance: "Semantic relevance scoring",
      difficulty_consistency: "Difficulty level validation",
      duplicate_detection: "Prevent question repetition"
    },
    
    customization: {
      verb_focus: "Concentrate on specific verbs",
      tense_emphasis: "Emphasize particular tenses",
      context_filtering: "Filter by context categories",
      difficulty_targeting: "Target specific difficulty ranges"
    }
  },

  // Comprehensive UI Design System for Mobile Replication
  UI_DESIGN_SYSTEM: {
    theme: {
      name: "French Verb Master Dark Theme",
      primary_colors: {
        background: "#0F0F23", // Deep navy for main background
        surface: "#1A1A2E", // Slightly lighter navy for cards
        surface_variant: "#16213E", // Blue-tinted surface for selected items
        primary: "#6C63FF", // Vibrant purple for primary actions
        primary_variant: "#5A52D5", // Darker purple for pressed states
        secondary: "#03DAC6", // Teal accent for secondary elements
        tertiary: "#BB86FC", // Light purple for tertiary elements
        accent: "#FF6B6B" // Coral red for important highlights
      },
      
      text_colors: {
        primary: "#FFFFFF", // Pure white for main text
        secondary: "#B8B8CC", // Light gray-blue for secondary text
        tertiary: "#8A8A9E", // Medium gray for less important text
        disabled: "#5A5A6E", // Dark gray for disabled states
        on_primary: "#FFFFFF", // White text on primary buttons
        on_surface: "#FFFFFF", // White text on surface
        success: "#4CAF50", // Green for correct answers
        error: "#F44336", // Red for incorrect answers
        warning: "#FF9800" // Orange for warnings
      },
      
      semantic_colors: {
        correct_answer: "#4CAF50",
        incorrect_answer: "#F44336",
        neutral_option: "#6C63FF",
        selected_option: "#03DAC6",
        progress_complete: "#4CAF50",
        progress_incomplete: "#3A3A54",
        streak_gold: "#FFD700",
        achievement_badge: "#BB86FC"
      }
    },
    
    typography: {
      font_family: {
        primary: "Inter", // Modern, clean sans-serif
        code: "SF Mono", // For conjugation displays
        heading: "Inter", // Consistent with primary
        body: "Inter"
      },
      
      font_sizes: {
        display_large: 57, // Major headings
        display_medium: 45, // Section titles
        display_small: 36, // Screen titles
        headline_large: 32, // Quiz questions
        headline_medium: 28, // Card titles
        headline_small: 24, // Subsection headings
        title_large: 22, // Button text, important labels
        title_medium: 16, // Regular labels
        title_small: 14, // Small labels
        body_large: 16, // Main content text
        body_medium: 14, // Secondary content
        body_small: 12, // Captions, footnotes
        label_large: 14, // Form labels
        label_medium: 12, // Secondary labels
        label_small: 11 // Small UI labels
      },
      
      font_weights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800
      },
      
      line_heights: {
        tight: 1.2, // For headings
        normal: 1.4, // For body text
        relaxed: 1.6, // For reading text
        loose: 1.8 // For captions
      }
    },
    
    spacing: {
      xs: 4,   // Tiny spacing
      sm: 8,   // Small spacing
      md: 16,  // Medium spacing (base unit)
      lg: 24,  // Large spacing
      xl: 32,  // Extra large spacing
      xxl: 48, // Double extra large
      xxxl: 64 // Triple extra large
    },
    
    corner_radius: {
      none: 0,
      xs: 4,    // Small elements
      sm: 8,    // Buttons, cards
      md: 12,   // Large cards
      lg: 16,   // Modals, sheets
      xl: 24,   // Full screen modals
      full: 9999 // Pills, circular buttons
    },
    
    shadows: {
      none: "none",
      xs: "0 1px 2px rgba(0, 0, 0, 0.05)",
      sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
      md: "0 4px 6px rgba(0, 0, 0, 0.1)",
      lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
      xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
      inner: "inset 0 2px 4px rgba(0, 0, 0, 0.06)"
    }
  },

  // Component Design Specifications
  COMPONENT_DESIGNS: {
    buttons: {
      primary: {
        background: "#6C63FF",
        text_color: "#FFFFFF",
        font_size: 16,
        font_weight: 600,
        padding: { vertical: 12, horizontal: 24 },
        border_radius: 8,
        shadow: "0 2px 4px rgba(108, 99, 255, 0.3)",
        pressed_state: {
          background: "#5A52D5",
          scale: 0.95,
          shadow: "0 1px 2px rgba(108, 99, 255, 0.3)"
        },
        disabled_state: {
          background: "#3A3A54",
          text_color: "#8A8A9E"
        }
      },
      
      secondary: {
        background: "transparent",
        text_color: "#6C63FF",
        border: "1px solid #6C63FF",
        font_size: 16,
        font_weight: 500,
        padding: { vertical: 12, horizontal: 24 },
        border_radius: 8,
        pressed_state: {
          background: "rgba(108, 99, 255, 0.1)",
          scale: 0.95
        }
      },
      
      floating_action: {
        background: "#6C63FF",
        width: 56,
        height: 56,
        border_radius: 28,
        shadow: "0 4px 8px rgba(108, 99, 255, 0.4)",
        icon_color: "#FFFFFF",
        icon_size: 24,
        pressed_state: {
          scale: 0.9,
          background: "#5A52D5"
        }
      }
    },
    
    cards: {
      quiz_question: {
        background: "#1A1A2E",
        border_radius: 12,
        padding: { top: 24, bottom: 24, left: 20, right: 20 },
        shadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        title: {
          font_size: 18,
          font_weight: 600,
          color: "#FFFFFF",
          margin_bottom: 16
        },
        content: {
          font_size: 16,
          color: "#B8B8CC",
          line_height: 1.5
        }
      },
      
      answer_option: {
        background: "#16213E",
        border_radius: 8,
        padding: { vertical: 16, horizontal: 20 },
        margin_bottom: 12,
        border: "1px solid rgba(108, 99, 255, 0.2)",
        text: {
          font_size: 16,
          font_weight: 500,
          color: "#FFFFFF"
        },
        states: {
          default: {
            background: "#16213E",
            border_color: "rgba(108, 99, 255, 0.2)"
          },
          selected: {
            background: "rgba(108, 99, 255, 0.15)",
            border_color: "#6C63FF",
            shadow: "0 0 0 1px #6C63FF"
          },
          correct: {
            background: "rgba(76, 175, 80, 0.15)",
            border_color: "#4CAF50",
            icon: "checkmark"
          },
          incorrect: {
            background: "rgba(244, 67, 54, 0.15)",
            border_color: "#F44336",
            icon: "close"
          }
        }
      },
      
      progress_card: {
        background: "#1A1A2E",
        border_radius: 12,
        padding: 20,
        shadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        header: {
          font_size: 18,
          font_weight: 600,
          color: "#FFFFFF",
          margin_bottom: 16
        },
        progress_bar: {
          height: 8,
          background: "#3A3A54",
          border_radius: 4,
          fill_color: "#6C63FF",
          animation_duration: "0.3s"
        },
        stats: {
          font_size: 14,
          color: "#B8B8CC",
          margin_top: 12
        }
      }
    },
    
    navigation: {
      tab_bar: {
        background: "#1A1A2E",
        height: 80,
        border_top: "1px solid rgba(255, 255, 255, 0.05)",
        shadow: "0 -2px 8px rgba(0, 0, 0, 0.1)",
        items: {
          active: {
            icon_color: "#6C63FF",
            text_color: "#6C63FF",
            font_weight: 600
          },
          inactive: {
            icon_color: "#8A8A9E",
            text_color: "#8A8A9E",
            font_weight: 500
          }
        }
      },
      
      header: {
        background: "#0F0F23",
        height: 64,
        padding: { horizontal: 20 },
        border_bottom: "1px solid rgba(255, 255, 255, 0.05)",
        title: {
          font_size: 20,
          font_weight: 600,
          color: "#FFFFFF"
        },
        back_button: {
          size: 40,
          icon_size: 20,
          icon_color: "#FFFFFF"
        }
      }
    },
    
    inputs: {
      text_field: {
        background: "#16213E",
        border_radius: 8,
        padding: { vertical: 12, horizontal: 16 },
        border: "1px solid rgba(108, 99, 255, 0.3)",
        text_color: "#FFFFFF",
        placeholder_color: "#8A8A9E",
        font_size: 16,
        states: {
          focused: {
            border_color: "#6C63FF",
            shadow: "0 0 0 2px rgba(108, 99, 255, 0.2)"
          },
          error: {
            border_color: "#F44336",
            shadow: "0 0 0 2px rgba(244, 67, 54, 0.2)"
          }
        }
      }
    }
  },

  // Screen Layout Specifications
  SCREEN_LAYOUTS: {
    quiz_screen: {
      layout: "vertical",
      padding: { top: 20, bottom: 20, left: 20, right: 20 },
      components: [
        {
          type: "header",
          height: 64,
          content: {
            title: "French Verb Quiz",
            progress_indicator: true,
            back_button: true
          }
        },
        {
          type: "progress_section",
          height: 80,
          margin_bottom: 24,
          content: {
            progress_bar: true,
            question_counter: true,
            timer: true
          }
        },
        {
          type: "question_card",
          flex: 1,
          margin_bottom: 24,
          content: {
            verb_display: true,
            context_text: true,
            pronunciation_button: true
          }
        },
        {
          type: "answers_section",
          height: "auto",
          margin_bottom: 24,
          content: {
            options_list: true,
            spacing: 12
          }
        },
        {
          type: "action_section",
          height: 60,
          content: {
            submit_button: true,
            hint_button: true
          }
        }
      ]
    },
    
    home_screen: {
      layout: "vertical",
      padding: { top: 20, bottom: 20, left: 20, right: 20 },
      components: [
        {
          type: "header",
          height: 120,
          content: {
            greeting: true,
            user_stats: true
          }
        },
        {
          type: "quick_actions",
          height: 180,
          margin_bottom: 24,
          content: {
            start_quiz_card: true,
            continue_course_card: true
          }
        },
        {
          type: "progress_overview",
          height: 200,
          margin_bottom: 24,
          content: {
            verb_mastery_chart: true,
            recent_achievements: true
          }
        },
        {
          type: "recommendations",
          flex: 1,
          content: {
            suggested_verbs: true,
            learning_tips: true
          }
        }
      ]
    },
    
    verb_selection_screen: {
      layout: "vertical",
      padding: { top: 20, bottom: 20, left: 20, right: 20 },
      components: [
        {
          type: "header",
          height: 64,
          content: {
            title: "Choose Verbs",
            filter_button: true
          }
        },
        {
          type: "difficulty_selector",
          height: 60,
          margin_bottom: 24,
          content: {
            tabs: ["Beginner", "Easy", "Moderate", "Difficult"]
          }
        },
        {
          type: "verb_grid",
          flex: 1,
          content: {
            grid_columns: 2,
            item_spacing: 12,
            verb_cards: true
          }
        },
        {
          type: "action_section",
          height: 80,
          content: {
            selected_count: true,
            start_button: true
          }
        }
      ]
    }
  },

  // Animation Specifications
  ANIMATIONS: {
    transitions: {
      screen_transition: {
        type: "slide",
        duration: 300,
        easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        direction: "horizontal"
      },
      
      modal_transition: {
        type: "fade_scale",
        duration: 250,
        easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        scale_from: 0.9,
        opacity_from: 0
      },
      
      card_appear: {
        type: "slide_up",
        duration: 400,
        easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        delay_between_items: 50
      }
    },
    
    micro_interactions: {
      button_press: {
        scale: 0.95,
        duration: 150,
        haptic: "light"
      },
      
      answer_selection: {
        scale: 1.02,
        duration: 200,
        spring: true,
        haptic: "selection"
      },
      
      correct_answer: {
        type: "bounce",
        scale: 1.1,
        duration: 300,
        color_flash: "#4CAF50",
        haptic: "success"
      },
      
      incorrect_answer: {
        type: "shake",
        amplitude: 8,
        duration: 400,
        color_flash: "#F44336",
        haptic: "error"
      },
      
      progress_increment: {
        type: "smooth_fill",
        duration: 500,
        easing: "cubic-bezier(0.4, 0.0, 0.2, 1)"
      }
    },
    
    loading_states: {
      shimmer: {
        colors: ["#1A1A2E", "#2A2A42", "#1A1A2E"],
        duration: 1500,
        direction: "left_to_right"
      },
      
      spinner: {
        color: "#6C63FF",
        size: 24,
        stroke_width: 2,
        duration: 1000
      }
    }
  },

  // Responsive Design Rules
  RESPONSIVE_DESIGN: {
    breakpoints: {
      small: 320,   // iPhone SE
      medium: 375,  // iPhone standard
      large: 414,   // iPhone Plus
      xlarge: 428,  // iPhone Pro Max
      tablet: 768   // iPad portrait
    },
    
    scaling_rules: {
      font_size: {
        small: 0.9,
        medium: 1.0,
        large: 1.1,
        xlarge: 1.2,
        tablet: 1.3
      },
      
      spacing: {
        small: 0.8,
        medium: 1.0,
        large: 1.1,
        xlarge: 1.2,
        tablet: 1.4
      },
      
      component_height: {
        small: 0.9,
        medium: 1.0,
        large: 1.05,
        xlarge: 1.1,
        tablet: 1.2
      }
    }
  },

  // Accessibility Specifications
  ACCESSIBILITY: {
    color_contrast: {
      minimum_ratio: 4.5, // WCAG AA standard
      preferred_ratio: 7.0, // WCAG AAA standard
      text_on_background: "#FFFFFF on #0F0F23", // 15.3:1 ratio
      text_on_surface: "#FFFFFF on #1A1A2E", // 13.2:1 ratio
      accent_on_background: "#6C63FF on #0F0F23" // 8.1:1 ratio
    },
    
    font_sizing: {
      minimum_size: 16, // For body text
      touch_target_minimum: 44, // Points for touch targets
      line_height_minimum: 1.4
    },
    
    voice_over: {
      labels: {
        quiz_question: "Quiz question: {question_text}",
        answer_option: "Answer option {number}: {text}",
        progress: "Progress: {current} of {total} questions",
        correct_answer: "Correct! {explanation}",
        incorrect_answer: "Incorrect. The correct answer is {correct_answer}"
      },
      
      hints: {
        button: "Double tap to activate",
        swipe_actions: "Swipe left for more options",
        scroll_area: "Swipe up or down to scroll"
      }
    },
    
    reduced_motion: {
      alternatives: {
        slide_transition: "fade",
        bounce_animation: "scale",
        shake_animation: "highlight",
        shimmer_loading: "static_placeholder"
      }
    }
  },

  // Sound Design Specifications
  SOUND_DESIGN: {
    audio_feedback: {
      correct_answer: {
        file: "success_chime.wav",
        duration: 0.5,
        volume: 0.7,
        frequency: "upward_major_chord"
      },
      
      incorrect_answer: {
        file: "error_buzz.wav",
        duration: 0.3,
        volume: 0.6,
        frequency: "descending_minor"
      },
      
      button_tap: {
        file: "click.wav",
        duration: 0.1,
        volume: 0.4,
        frequency: "single_note"
      },
      
      page_transition: {
        file: "whoosh.wav",
        duration: 0.3,
        volume: 0.3,
        frequency: "white_noise_sweep"
      },
      
      achievement_unlock: {
        file: "achievement.wav",
        duration: 1.0,
        volume: 0.8,
        frequency: "fanfare"
      }
    },
    
    pronunciation_audio: {
      format: "mp3",
      quality: "44.1kHz, 16-bit",
      compression: "128kbps",
      native_speaker: true,
      accent: "standard_french",
      speed_variations: ["0.8x", "1.0x", "1.2x"]
    }
  },

  // Implementation Guidelines
  IMPLEMENTATION_GUIDE: {
    development_priorities: [
      "Core navigation and screen structure",
      "Quiz question display and answer selection",
      "Progress tracking and animations",
      "Audio integration and pronunciation",
      "Accessibility features and voice-over",
      "Performance optimization and offline support"
    ],
    
    testing_requirements: {
      devices: [
        "iPhone SE (3rd generation)",
        "iPhone 14",
        "iPhone 14 Pro Max",
        "iPad (10th generation)",
        "Android devices with 5-inch screens",
        "Android devices with 6.5+ inch screens"
      ],
      
      accessibility_testing: [
        "Voice-over navigation",
        "Dynamic type scaling",
        "High contrast mode",
        "Reduced motion preferences",
        "Color blindness simulation"
      ],
      
      performance_benchmarks: {
        app_launch_time: "< 2 seconds",
        screen_transition_time: "< 300ms",
        quiz_question_load_time: "< 100ms",
        audio_playback_delay: "< 50ms",
        offline_functionality: "100% for downloaded content"
      }
    },
    
    code_organization: {
      component_structure: {
        "components/": "Reusable UI components",
        "screens/": "Full screen components",
        "theme/": "Design system tokens and styles",
        "data/": "Verb data and question contexts",
        "utils/": "Helper functions and utilities",
        "services/": "API and data services",
        "hooks/": "Custom React hooks",
        "assets/": "Images, audio files, and static resources"
      },
      
      naming_conventions: {
        components: "PascalCase (QuizScreen, AnswerCard)",
        files: "kebab-case (quiz-screen.tsx, answer-card.tsx)",
        variables: "camelCase (questionText, isCorrect)",
        constants: "SCREAMING_SNAKE_CASE (PRIMARY_COLOR, MAX_QUESTIONS)"
      }
    }
  }
};