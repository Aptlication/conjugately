// Conjugately - Mini-Courses Data Export for React Native Mobile App
// Complete course system with 4-tier difficulty progression, units, and final exams
// Designed for serious French learners targeting fluency
// Includes comprehensive UI specifications and component structures

export const FRENCH_MINI_COURSES_DATA = {
  // Course System Overview
  COURSE_SYSTEM: {
    title: "Conjugately Mini-Courses",
    subtitle: "For serious students targeting fluency",
    description: "Structured learning path with sequential progression and 90% mastery requirement",
    totalDifficulties: 4,
    totalVerbs: 13,
    totalTenses: 9,
    progressionRequirement: "90% final exam score to unlock next level"
  },

  // 4-Tier Difficulty System with Complete Course Structures
  COURSE_DIFFICULTIES: {
    "Beginner": {
      id: "beginner",
      order: 1,
      title: "Beginner Course",
      subtitle: "Master the 4 most essential French verbs",
      description: "Start your French journey with the fundamental verbs that form the foundation of the language.",
      icon: "🌱",
      totalUnits: 4,
      totalQuestions: 80, // 20 per unit
      finalExamQuestions: 40, // 10 per verb
      passThreshold: 36, // 90%
      verbs: ["être", "avoir", "faire", "aller"],
      timeFrames: ["Present", "Past", "Future"],
      tenses: ["Présent", "Passé Simple", "Futur Simple"],
      estimatedDuration: "2-3 weeks",
      prerequisite: "None - Perfect for absolute beginners",
      
      units: [
        {
          id: "beginner_unit_1",
          unitNumber: 1,
          name: "Unit 1: être (to be)",
          verb: "être",
          meaning: "to be",
          description: "The most fundamental French verb, used to describe states of being, identity, and location.",
          example: "Je suis étudiant. (I am a student.)",
          importance: "Essential for basic communication and identity",
          questionsCount: 20,
          icon: "🏛️",
          difficulty: "Beginner",
          tips: [
            "Remember: être is irregular in all tenses",
            "Used for permanent characteristics and temporary states",
            "Essential for forming compound tenses with movement verbs"
          ],
          commonMistakes: [
            "Confusing être with avoir in compound tenses",
            "Forgetting liaison: vous êtes → vous_êtes",
            "Using wrong form for gender agreement"
          ]
        },
        {
          id: "beginner_unit_2",
          unitNumber: 2,
          name: "Unit 2: avoir (to have)",
          verb: "avoir",
          meaning: "to have",
          description: "Essential for expressing possession and forming compound tenses in French.",
          example: "J'ai un livre. (I have a book.)",
          importance: "Critical for possession and most compound tenses",
          questionsCount: 20,
          icon: "🤝",
          difficulty: "Beginner",
          tips: [
            "Avoir is the auxiliary verb for most compound tenses",
            "Remember the liaison in nous avons [z] and vous avez [z]",
            "Watch for elision: j'ai not je ai"
          ],
          commonMistakes: [
            "Forgetting to use avoir in compound tenses",
            "Confusing possession vs. description (avoir vs. être)",
            "Mispronouncing silent letters in ils ont"
          ]
        },
        {
          id: "beginner_unit_3",
          unitNumber: 3,
          name: "Unit 3: faire (to do/make)",
          verb: "faire",
          meaning: "to do/make",
          description: "One of the most versatile verbs, used in countless French expressions and activities.",
          example: "Je fais mes devoirs. (I do my homework.)",
          importance: "Appears in hundreds of idiomatic expressions",
          questionsCount: 20,
          icon: "🔨",
          difficulty: "Beginner",
          tips: [
            "Faire appears in weather expressions: il fait beau",
            "Used in many sports: faire du sport, faire du vélo",
            "Notice the irregular future form: ferai (not fairai)"
          ],
          commonMistakes: [
            "Using do/make literally instead of idiomatic expressions",
            "Forgetting irregular forms in present tense",
            "Mixing up faire vs. jouer for sports"
          ]
        },
        {
          id: "beginner_unit_4",
          unitNumber: 4,
          name: "Unit 4: aller (to go)",
          verb: "aller",
          meaning: "to go",
          description: "Crucial for expressing movement and forming the near future tense.",
          example: "Je vais à l'école. (I go to school.)",
          importance: "Essential for movement and immediate future plans",
          questionsCount: 20,
          icon: "🚶",
          difficulty: "Beginner",
          tips: [
            "Forms the near future: je vais faire (I'm going to do)",
            "Uses être in compound tenses, not avoir",
            "Highly irregular - memorize all forms"
          ],
          commonMistakes: [
            "Using avoir instead of être in compound tenses",
            "Forgetting prepositions: aller à vs. aller chez",
            "Confusing movement vs. transportation verbs"
          ]
        }
      ],

      finalExam: {
        id: "beginner_final_exam",
        title: "Beginner Final Exam",
        description: "Comprehensive test covering all 4 essential verbs",
        totalQuestions: 40,
        questionsPerVerb: 10,
        passThreshold: 36,
        passingPercentage: 90,
        timeFrames: ["Present", "Past", "Future"],
        format: "Mixed questions from all units",
        tips: [
          "Review all verb forms before starting",
          "Pay attention to negative constructions", 
          "Remember gender agreements with être"
        ]
      }
    },

    "Easy": {
      id: "easy",
      order: 2,
      title: "Easy Course",
      subtitle: "Expand to 6 most used French verbs",
      description: "Build on your foundation with essential communication verbs including perception and speech.",
      icon: "🌿",
      totalUnits: 6,
      totalQuestions: 120, // 20 per unit
      finalExamQuestions: 60, // 10 per verb
      passThreshold: 54, // 90%
      verbs: ["être", "avoir", "faire", "dire", "aller", "voir"],
      timeFrames: ["Present", "Past", "Future"],
      tenses: ["Présent", "Passé Composé", "Futur Simple"],
      estimatedDuration: "3-4 weeks",
      prerequisite: "Complete Beginner Course with 90% final exam score",

      units: [
        {
          id: "easy_unit_1",
          unitNumber: 1,
          name: "Unit 1: être (to be)",
          verb: "être",
          meaning: "to be",
          description: "Advanced practice with être in more complex contexts and tenses.",
          example: "J'ai été surpris. (I was surprised.)",
          importance: "Master compound tenses and advanced constructions",
          questionsCount: 20,
          icon: "🏛️",
          difficulty: "Easy"
        },
        {
          id: "easy_unit_2",
          unitNumber: 2,
          name: "Unit 2: avoir (to have)",
          verb: "avoir",
          meaning: "to have",
          description: "Explore avoir in complex expressions and compound tenses.",
          example: "Tu as eu de la chance. (You were lucky.)",
          importance: "Essential for expressing experiences and states",
          questionsCount: 20,
          icon: "🤝",
          difficulty: "Easy"
        },
        {
          id: "easy_unit_3",
          unitNumber: 3,
          name: "Unit 3: faire (to do/make)",
          verb: "faire",
          meaning: "to do/make",
          description: "Advanced faire expressions and weather patterns.",
          example: "Il a fait beau hier. (The weather was nice yesterday.)",
          importance: "Critical for describing activities and weather",
          questionsCount: 20,
          icon: "🔨",
          difficulty: "Easy"
        },
        {
          id: "easy_unit_4",
          unitNumber: 4,
          name: "Unit 4: dire (to say/tell)",
          verb: "dire",
          meaning: "to say/tell",
          description: "Essential for communication and expressing thoughts in French.",
          example: "Je dis la vérité. (I tell the truth.)",
          importance: "Fundamental for all conversation and storytelling",
          questionsCount: 20,
          icon: "💬",
          difficulty: "Easy",
          tips: [
            "Notice irregular present forms: tu dis, vous dites",
            "Past participle dit is used in many expressions",
            "Remember: on dit (people say/it is said)"
          ]
        },
        {
          id: "easy_unit_5",
          unitNumber: 5,
          name: "Unit 5: aller (to go)",
          verb: "aller",
          meaning: "to go",
          description: "Advanced movement concepts and future constructions.",
          example: "Nous sommes allés au cinéma. (We went to the movies.)",
          importance: "Essential for expressing movement and plans",
          questionsCount: 20,
          icon: "🚶",
          difficulty: "Easy"
        },
        {
          id: "easy_unit_6",
          unitNumber: 6,
          name: "Unit 6: voir (to see)",
          verb: "voir",
          meaning: "to see",
          description: "Important for expressing perception and understanding.",
          example: "Je vois la tour Eiffel. (I see the Eiffel Tower.)",
          importance: "Critical for describing experiences and observations",
          questionsCount: 20,
          icon: "👁️",
          difficulty: "Easy",
          tips: [
            "Used metaphorically: je vois (I understand)",
            "Irregular future stem: verr- (je verrai)",
            "Common in expressions: voyons voir (let's see)"
          ]
        }
      ],

      finalExam: {
        id: "easy_final_exam",
        title: "Easy Final Exam", 
        description: "Comprehensive test covering all 6 communication verbs",
        totalQuestions: 60,
        questionsPerVerb: 10,
        passThreshold: 54,
        passingPercentage: 90,
        timeFrames: ["Present", "Past", "Future"],
        format: "Mixed questions focusing on communication skills"
      }
    },

    "Moderate": {
      id: "moderate",
      order: 3,
      title: "Moderate Course",
      subtitle: "Add reflexive verbs - 8 verbs total",
      description: "Introduce reflexive verb patterns with daily routine and self-care vocabulary.",
      icon: "🌳", 
      totalUnits: 8,
      totalQuestions: 160, // 20 per unit
      finalExamQuestions: 80, // 10 per verb
      passThreshold: 72, // 90%
      verbs: ["être", "avoir", "faire", "dire", "aller", "se lever", "s'appeler", "se sentir"],
      timeFrames: ["Present", "Past", "Future"],
      tenses: ["Présent", "Passé Composé", "Imparfait", "Futur Simple"],
      estimatedDuration: "4-5 weeks",
      prerequisite: "Complete Easy Course with 90% final exam score",

      units: [
        {
          id: "moderate_unit_1",
          unitNumber: 1,
          name: "Unit 1: être (to be)",
          verb: "être",
          meaning: "to be",
          description: "Master être with imparfait for descriptions and ongoing past states.",
          example: "J'étais content quand j'étais jeune. (I was happy when I was young.)",
          questionsCount: 20,
          icon: "🏛️",
          difficulty: "Moderate"
        },
        {
          id: "moderate_unit_2", 
          unitNumber: 2,
          name: "Unit 2: avoir (to have)",
          verb: "avoir",
          meaning: "to have",
          description: "Avoir in complex past constructions and expressions.",
          example: "Elle avait déjà fini quand je suis arrivé. (She had already finished when I arrived.)",
          questionsCount: 20,
          icon: "🤝",
          difficulty: "Moderate"
        },
        {
          id: "moderate_unit_3",
          unitNumber: 3,
          name: "Unit 3: faire (to do/make)",
          verb: "faire",
          meaning: "to do/make",
          description: "Complex faire expressions in past and future contexts.",
          example: "Nous faisions du sport tous les jours. (We used to exercise every day.)",
          questionsCount: 20,
          icon: "🔨",
          difficulty: "Moderate"
        },
        {
          id: "moderate_unit_4",
          unitNumber: 4,
          name: "Unit 4: dire (to say/tell)",
          verb: "dire",
          meaning: "to say/tell",
          description: "Advanced communication patterns in past and future.",
          example: "Il disait toujours la vérité. (He always used to tell the truth.)",
          questionsCount: 20,
          icon: "💬",
          difficulty: "Moderate"
        },
        {
          id: "moderate_unit_5",
          unitNumber: 5,
          name: "Unit 5: aller (to go)",
          verb: "aller",
          meaning: "to go",
          description: "Movement verbs in past contexts and future plans.",
          example: "Nous allions souvent au parc. (We used to go to the park often.)",
          questionsCount: 20,
          icon: "🚶",
          difficulty: "Moderate"
        },
        {
          id: "moderate_unit_6",
          unitNumber: 6,
          name: "Unit 6: se lever (to get up)",
          verb: "se lever",
          meaning: "to get up",
          description: "Introduction to reflexive verbs with daily routine vocabulary.",
          example: "Je me lève à 7 heures. (I get up at 7 o'clock.)",
          importance: "First step into reflexive verb patterns",
          questionsCount: 20,
          icon: "🌅",
          difficulty: "Moderate",
          reflexive: true,
          tips: [
            "Reflexive pronouns change with subject: me, te, se, nous, vous, se",
            "In compound tenses, use être as auxiliary",
            "Past participle agrees with subject in compound tenses"
          ]
        },
        {
          id: "moderate_unit_7",
          unitNumber: 7,
          name: "Unit 7: s'appeler (to be called)",
          verb: "s'appeler",
          meaning: "to be called/named",
          description: "Reflexive verb for identity and introductions.",
          example: "Comment vous appelez-vous? (What is your name?)",
          importance: "Essential for introductions and personal information",
          questionsCount: 20,
          icon: "🏷️",
          difficulty: "Moderate",
          reflexive: true,
          tips: [
            "Double 'l' in most forms: je m'appelle, tu t'appelles",
            "Single 'l' in nous and vous forms: nous appelons",
            "Used for naming things too: ça s'appelle (it's called)"
          ]
        },
        {
          id: "moderate_unit_8",
          unitNumber: 8,
          name: "Unit 8: se sentir (to feel)",
          verb: "se sentir",
          meaning: "to feel",
          description: "Express emotions and physical sensations reflexively.",
          example: "Je me sens bien aujourd'hui. (I feel good today.)",
          importance: "Critical for expressing emotions and wellbeing",
          questionsCount: 20,
          icon: "❤️",
          difficulty: "Moderate",
          reflexive: true,
          tips: [
            "Used for both physical and emotional feelings",
            "Distinguished from 'sentir' (to smell)",
            "Common with adverbs: se sentir bien/mal"
          ]
        }
      ],

      finalExam: {
        id: "moderate_final_exam",
        title: "Moderate Final Exam",
        description: "Comprehensive test including reflexive verb mastery",
        totalQuestions: 80,
        questionsPerVerb: 10,
        passThreshold: 72,
        passingPercentage: 90,
        timeFrames: ["Present", "Past", "Future"],
        format: "Mixed regular and reflexive verb patterns"
      }
    },

    "Difficult": {
      id: "difficult",
      order: 4,
      title: "Difficult Course", 
      subtitle: "Master all 13 verbs with 9 tenses",
      description: "Complete mastery course covering all verb forms, tenses, and complex constructions for advanced fluency.",
      icon: "🌲",
      totalUnits: 13,
      totalQuestions: 260, // 20 per unit
      finalExamQuestions: 130, // 10 per verb
      passThreshold: 117, // 90%
      verbs: ["être", "avoir", "faire", "dire", "aller", "voir", "savoir", "pouvoir", "vouloir", "venir", "se laver", "se réveiller", "s'habiller"],
      timeFrames: ["Past", "Present", "Future"],
      tenses: ["Passé Composé", "Imparfait", "Plus-que-parfait", "Passé Simple", "Présent", "Présent Progressif", "Futur Simple", "Futur Proche", "Conditionnel"],
      estimatedDuration: "6-8 weeks",
      prerequisite: "Complete Moderate Course with 90% final exam score",

      units: [
        {
          id: "difficult_unit_1",
          unitNumber: 1,
          name: "Unit 1: être (to be)",
          verb: "être",
          meaning: "to be", 
          description: "Complete mastery of être across all 9 tenses and complex constructions.",
          example: "Si j'étais riche, je serais heureux. (If I were rich, I would be happy.)",
          questionsCount: 20,
          icon: "🏛️",
          difficulty: "Difficult"
        },
        {
          id: "difficult_unit_2",
          unitNumber: 2,
          name: "Unit 2: avoir (to have)",
          verb: "avoir",
          meaning: "to have",
          description: "Advanced avoir usage in all tenses and idiomatic expressions.",
          example: "Il aurait eu plus de temps s'il était parti plus tôt. (He would have had more time if he had left earlier.)",
          questionsCount: 20,
          icon: "🤝",
          difficulty: "Difficult"
        },
        {
          id: "difficult_unit_3",
          unitNumber: 3,
          name: "Unit 3: faire (to do/make)",
          verb: "faire",
          meaning: "to do/make",
          description: "Master all faire expressions across complex tense combinations.",
          example: "Quand j'aurai fini, je ferai autre chose. (When I have finished, I will do something else.)",
          questionsCount: 20,
          icon: "🔨",
          difficulty: "Difficult"
        },
        {
          id: "difficult_unit_4",
          unitNumber: 4,
          name: "Unit 4: dire (to say/tell)",
          verb: "dire",
          meaning: "to say/tell",
          description: "Advanced communication patterns and literary tenses.",
          example: "Il dit qu'il viendrait s'il pouvait. (He says he would come if he could.)",
          questionsCount: 20,
          icon: "💬",
          difficulty: "Difficult"
        },
        {
          id: "difficult_unit_5",
          unitNumber: 5,
          name: "Unit 5: aller (to go)",
          verb: "aller",
          meaning: "to go",
          description: "Complex movement patterns and advanced future constructions.",
          example: "Nous étions en train d'aller au marché. (We were in the process of going to the market.)",
          questionsCount: 20,
          icon: "🚶",
          difficulty: "Difficult"
        },
        {
          id: "difficult_unit_6",
          unitNumber: 6,
          name: "Unit 6: voir (to see)",
          verb: "voir",
          meaning: "to see",
          description: "Perception verbs in complex tenses and metaphorical usage.", 
          example: "Je verrais bien qu'il vienne nous aider. (I would like to see him come help us.)",
          questionsCount: 20,
          icon: "👁️",
          difficulty: "Difficult"
        },
        {
          id: "difficult_unit_7",
          unitNumber: 7,
          name: "Unit 7: savoir (to know)",
          verb: "savoir",
          meaning: "to know",
          description: "Master knowledge and skill expressions across all tenses.",
          example: "Si j'avais su, je serais venu plus tôt. (If I had known, I would have come earlier.)",
          importance: "Distinguishes factual knowledge from familiarity",
          questionsCount: 20,
          icon: "🧠",
          difficulty: "Difficult",
          tips: [
            "Savoir = factual knowledge, connaître = familiarity",
            "Used with infinitives: savoir nager (know how to swim)",
            "Passé composé often means 'found out': j'ai su"
          ]
        },
        {
          id: "difficult_unit_8",
          unitNumber: 8,
          name: "Unit 8: pouvoir (to be able to/can)",
          verb: "pouvoir",
          meaning: "to be able to/can",
          description: "Modal verb expressing ability, possibility, and permission.",
          example: "Pourriez-vous m'aider? (Could you help me?)",
          importance: "Essential modal verb for polite requests and possibilities",
          questionsCount: 20,
          icon: "💪",
          difficulty: "Difficult",
          tips: [
            "Conditional forms are very polite: pourriez-vous",
            "Distinguishes ability from permission context",
            "Future forms express future capability"
          ]
        },
        {
          id: "difficult_unit_9",
          unitNumber: 9,
          name: "Unit 9: vouloir (to want)",
          verb: "vouloir",
          meaning: "to want",
          description: "Express desires, wishes, and polite requests across all tenses.",
          example: "Je voudrais un café, s'il vous plaît. (I would like a coffee, please.)",
          importance: "Critical for expressing desires and making polite requests",
          questionsCount: 20,
          icon: "⭐",
          difficulty: "Difficult",
          tips: [
            "Conditional je voudrais is more polite than je veux",
            "Subjunctive often follows: je veux que tu viennes",
            "Past forms express past desires and intentions"
          ]
        },
        {
          id: "difficult_unit_10",
          unitNumber: 10,
          name: "Unit 10: venir (to come)",
          verb: "venir",
          meaning: "to come",
          description: "Movement towards speaker and recent past constructions.",
          example: "Je viens de finir mes devoirs. (I just finished my homework.)",
          importance: "Essential for movement and recent past expressions",
          questionsCount: 20,
          icon: "🏃",
          difficulty: "Difficult",
          tips: [
            "Uses être in compound tenses like aller",
            "Venir de + infinitive = just did something",
            "Irregular in most tenses, similar to tenir"
          ]
        },
        {
          id: "difficult_unit_11",
          unitNumber: 11,
          name: "Unit 11: se laver (to wash oneself)",
          verb: "se laver",
          meaning: "to wash oneself",
          description: "Advanced reflexive patterns for personal hygiene and care.",
          example: "Elle s'était lavé les cheveux avant de sortir. (She had washed her hair before going out.)",
          importance: "Advanced reflexive verb with body part constructions",
          questionsCount: 20,
          icon: "🚿",
          difficulty: "Difficult",
          reflexive: true,
          tips: [
            "Can specify body parts: se laver les mains",
            "Agreement rules complex with direct objects",
            "Used literally and metaphorically"
          ]
        },
        {
          id: "difficult_unit_12",
          unitNumber: 12,
          name: "Unit 12: se réveiller (to wake up)",
          verb: "se réveiller",
          meaning: "to wake up",
          description: "Reflexive verb for transitions from sleep to consciousness.",
          example: "Je me réveillerai à l'aube demain. (I will wake up at dawn tomorrow.)",
          importance: "Common reflexive verb for daily routines",
          questionsCount: 20,
          icon: "⏰",
          difficulty: "Difficult",
          reflexive: true,
          tips: [
            "Distinguished from réveiller (to wake someone else)",
            "Often used with time expressions",
            "Past participle agreement with être"
          ]
        },
        {
          id: "difficult_unit_13",
          unitNumber: 13,
          name: "Unit 13: s'habiller (to get dressed)",
          verb: "s'habiller",
          meaning: "to get dressed",
          description: "Complete reflexive patterns for clothing and appearance.",
          example: "Ils s'habilleront élégamment pour la fête. (They will dress elegantly for the party.)",
          importance: "Essential reflexive verb for daily routines and appearance",
          questionsCount: 20,
          icon: "👗",
          difficulty: "Difficult",
          reflexive: true,
          tips: [
            "Can specify clothing: s'habiller en noir",
            "Used for style and appropriateness",
            "Metaphorical uses: s'habiller en mensonges"
          ]
        }
      ],

      finalExam: {
        id: "difficult_final_exam",
        title: "Difficult Final Exam",
        description: "Ultimate mastery test covering all 13 verbs and 9 tenses",
        totalQuestions: 130,
        questionsPerVerb: 10,
        passThreshold: 117,
        passingPercentage: 90,
        timeFrames: ["Past", "Present", "Future"],
        format: "Comprehensive test of complete French verb system"
      }
    }
  },

  // Course Progression System
  PROGRESSION_SYSTEM: {
    unlockRequirement: {
      percentage: 90,
      description: "Must achieve 90% on final exam to unlock next difficulty level"
    },
    
    retakePolicy: {
      allowed: true,
      cooldownPeriod: "24 hours",
      description: "Can retake final exams after 24-hour cooldown period"
    },

    certificateSystem: {
      enabled: true,
      levels: [
        {
          difficulty: "Beginner",
          certificate: "French Verb Foundations Certificate",
          description: "Mastery of 4 essential French verbs"
        },
        {
          difficulty: "Easy", 
          certificate: "French Communication Certificate",
          description: "Mastery of 6 core communication verbs"
        },
        {
          difficulty: "Moderate",
          certificate: "French Reflexive Verbs Certificate", 
          description: "Mastery of regular and reflexive verb patterns"
        },
        {
          difficulty: "Difficult",
          certificate: "Conjugately Certificate",
          description: "Complete mastery of French verb conjugation system"
        }
      ]
    }
  },

  // Learning Methodology
  LEARNING_METHODOLOGY: {
    approach: "Unit-based progression with focused verb mastery",
    structure: "One verb per unit with 20 targeted questions each",
    negationCoverage: "30% of questions feature negative constructions", 
    testingStrategy: "Mixed verb final exams for comprehensive assessment",
    
    pedagogicalPrinciples: [
      "Sequential skill building from essential to advanced verbs",
      "Spaced repetition through unit-based structure",
      "Progressive tense complexity introduction",
      "Reflexive verb integration at appropriate difficulty",
      "Authentic French grammar patterns and contractions",
      "Cultural context through realistic example sentences"
    ],

    successMetrics: {
      unitCompletion: "Complete all 20 questions per unit",
      finalExamPassing: "90% accuracy required for progression",
      retentionTesting: "Periodic review of previous difficulty levels",
      realWorldApplication: "Focus on practical communication scenarios"
    }
  },

  // Technical Integration for Mobile
  MOBILE_INTEGRATION: {
    offlineCapability: true,
    progressSync: "Cloud backup with offline-first approach",
    adaptiveUI: "Optimized for mobile screens and touch interaction",
    audioSupport: "Pronunciation guides for all conjugations",
    
    features: [
      "Swipe navigation between questions",
      "Progress visualization with completion rings", 
      "Achievement badges for unit completion",
      "Streak tracking for daily practice",
      "Smart notifications for study reminders",
      "Dark mode for comfortable evening study"
    ]
  },

  // Comprehensive UI Design System
  UI_DESIGN_SYSTEM: {
    theme: {
      name: "Conjugately Dark Theme",
      description: "Professional dark theme optimized for extended study sessions",
      
      colors: {
        primary: {
          main: "#8B5CF6", // Purple primary
          light: "#A78BFA", // Light purple
          dark: "#7C3AED", // Dark purple
          contrast: "#FFFFFF"
        },
        secondary: {
          main: "#06B6D4", // Cyan secondary
          light: "#67E8F9", // Light cyan
          dark: "#0891B2", // Dark cyan
          contrast: "#FFFFFF"
        },
        background: {
          primary: "#0F172A", // Slate 900
          secondary: "#1E293B", // Slate 800
          tertiary: "#334155", // Slate 700
          card: "rgba(255, 255, 255, 0.1)", // Semi-transparent white
          overlay: "rgba(0, 0, 0, 0.8)" // Modal overlay
        },
        text: {
          primary: "#F8FAFC", // Slate 50
          secondary: "#CBD5E1", // Slate 300
          muted: "#94A3B8", // Slate 400
          accent: "#A78BFA" // Purple 300
        },
        status: {
          success: "#10B981", // Emerald 500
          warning: "#F59E0B", // Amber 500
          error: "#EF4444", // Red 500
          info: "#3B82F6" // Blue 500
        },
        progress: {
          incomplete: "#374151", // Gray 700
          inProgress: "#8B5CF6", // Purple 500
          completed: "#10B981", // Emerald 500
          locked: "#6B7280" // Gray 500
        }
      },
      
      typography: {
        fontFamily: {
          primary: "Inter", // Modern, readable font
          secondary: "Roboto", // Fallback
          mono: "JetBrains Mono" // Code/conjugations
        },
        fontSize: {
          xs: 12,
          sm: 14,
          base: 16,
          lg: 18,
          xl: 20,
          "2xl": 24,
          "3xl": 30,
          "4xl": 36
        },
        fontWeight: {
          light: "300",
          normal: "400",
          medium: "500",
          semibold: "600",
          bold: "700",
          extrabold: "800"
        }
      },
      
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        "2xl": 48,
        "3xl": 64
      },
      
      borderRadius: {
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        full: 9999
      },
      
      shadows: {
        sm: "0 2px 4px rgba(0, 0, 0, 0.1)",
        md: "0 4px 8px rgba(0, 0, 0, 0.15)",
        lg: "0 8px 16px rgba(0, 0, 0, 0.2)",
        xl: "0 12px 24px rgba(0, 0, 0, 0.25)"
      }
    },
    
    components: {
      // Navigation Components
      navigation: {
        tabBar: {
          height: 60,
          backgroundColor: "background.secondary",
          borderTopWidth: 1,
          borderTopColor: "rgba(255, 255, 255, 0.1)",
          paddingBottom: 8,
          items: [
            {
              name: "courses",
              icon: "📚",
              label: "Courses",
              activeColor: "primary.main",
              inactiveColor: "text.muted"
            },
            {
              name: "practice", 
              icon: "✏️",
              label: "Practice",
              activeColor: "primary.main",
              inactiveColor: "text.muted"
            },
            {
              name: "progress",
              icon: "📊",
              label: "Progress", 
              activeColor: "primary.main",
              inactiveColor: "text.muted"
            },
            {
              name: "profile",
              icon: "👤",
              label: "Profile",
              activeColor: "primary.main",
              inactiveColor: "text.muted"
            }
          ]
        },
        
        header: {
          height: 88, // Includes status bar
          backgroundColor: "background.primary",
          paddingHorizontal: 16,
          paddingTop: 44, // Status bar height
          paddingBottom: 12,
          shadowOpacity: 0.1,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 }
        }
      },
      
      // Course Selection Components  
      courseSelection: {
        difficultyCard: {
          width: "100%",
          minHeight: 120,
          backgroundColor: "background.card",
          borderRadius: "lg",
          padding: 20,
          marginBottom: 16,
          borderWidth: 2,
          borderColor: "transparent",
          
          states: {
            locked: {
              opacity: 0.5,
              borderColor: "progress.locked",
              backgroundColor: "rgba(107, 114, 128, 0.1)"
            },
            available: {
              opacity: 1,
              borderColor: "primary.main",
              backgroundColor: "background.card"
            },
            inProgress: {
              opacity: 1,
              borderColor: "status.warning",
              backgroundColor: "rgba(245, 158, 11, 0.1)"
            },
            completed: {
              opacity: 1,
              borderColor: "status.success", 
              backgroundColor: "rgba(16, 185, 129, 0.1)"
            }
          },
          
          content: {
            header: {
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 8
            },
            icon: {
              fontSize: 24,
              marginRight: 12
            },
            title: {
              fontSize: "xl",
              fontWeight: "bold",
              color: "text.primary"
            },
            subtitle: {
              fontSize: "sm",
              color: "text.secondary",
              marginBottom: 8
            },
            description: {
              fontSize: "sm",
              color: "text.muted",
              lineHeight: 20
            },
            progressBar: {
              height: 4,
              backgroundColor: "progress.incomplete",
              borderRadius: "full",
              marginTop: 12,
              overflow: "hidden"
            }
          }
        },
        
        timeFrameSelector: {
          container: {
            flexDirection: "row",
            justifyContent: "space-around",
            padding: 16,
            backgroundColor: "background.secondary",
            borderRadius: "md",
            marginVertical: 16
          },
          
          option: {
            flex: 1,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: "sm",
            marginHorizontal: 4,
            alignItems: "center",
            
            states: {
              inactive: {
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "rgba(255, 255, 255, 0.2)"
              },
              active: {
                backgroundColor: "primary.main",
                borderWidth: 1,
                borderColor: "primary.main"
              }
            }
          },
          
          text: {
            fontSize: "sm",
            fontWeight: "medium",
            
            states: {
              inactive: { color: "text.secondary" },
              active: { color: "primary.contrast" }
            }
          }
        }
      },
      
      // Unit Components
      unitComponents: {
        unitCard: {
          backgroundColor: "background.card",
          borderRadius: "lg", 
          padding: 20,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.1)",
          
          states: {
            locked: {
              opacity: 0.5,
              backgroundColor: "rgba(107, 114, 128, 0.1)"
            },
            available: {
              opacity: 1,
              backgroundColor: "background.card"
            },
            completed: {
              opacity: 1,
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              borderColor: "status.success"
            }
          },
          
          header: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12
          },
          
          title: {
            fontSize: "lg",
            fontWeight: "semibold",
            color: "text.primary",
            flex: 1
          },
          
          statusBadge: {
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: "sm",
            
            states: {
              locked: {
                backgroundColor: "progress.locked",
                text: { color: "text.primary", fontSize: "xs" }
              },
              available: {
                backgroundColor: "primary.main",
                text: { color: "primary.contrast", fontSize: "xs" }
              },
              completed: {
                backgroundColor: "status.success", 
                text: { color: "text.primary", fontSize: "xs" }
              }
            }
          },
          
          verbInfo: {
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8
          },
          
          verbName: {
            fontSize: "base",
            fontWeight: "medium",
            color: "text.accent",
            fontFamily: "mono"
          },
          
          verbMeaning: {
            fontSize: "sm", 
            color: "text.secondary",
            marginLeft: 8
          },
          
          description: {
            fontSize: "sm",
            color: "text.muted",
            lineHeight: 18,
            marginBottom: 12
          },
          
          progressInfo: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          },
          
          questionCount: {
            fontSize: "sm",
            color: "text.secondary"
          }
        },
        
        unitIntroModal: {
          container: {
            flex: 1,
            backgroundColor: "background.overlay",
            justifyContent: "center",
            alignItems: "center",
            padding: 20
          },
          
          content: {
            backgroundColor: "background.secondary",
            borderRadius: "xl",
            padding: 24,
            width: "90%",
            maxWidth: 400,
            maxHeight: "80%"
          },
          
          header: {
            alignItems: "center",
            marginBottom: 20
          },
          
          icon: {
            fontSize: 48,
            marginBottom: 12
          },
          
          title: {
            fontSize: "2xl",
            fontWeight: "bold",
            color: "text.primary",
            textAlign: "center",
            marginBottom: 8
          },
          
          subtitle: {
            fontSize: "base",
            color: "text.accent",
            textAlign: "center"
          },
          
          infoSection: {
            backgroundColor: "background.card",
            borderRadius: "md",
            padding: 16,
            marginBottom: 20
          },
          
          sectionTitle: {
            fontSize: "lg",
            fontWeight: "semibold",
            color: "text.primary",
            marginBottom: 12,
            textAlign: "center"
          },
          
          verbDetails: {
            marginBottom: 16
          },
          
          meaning: {
            fontSize: "base",
            color: "text.accent",
            fontWeight: "medium",
            textAlign: "center",
            marginBottom: 8
          },
          
          description: {
            fontSize: "sm",
            color: "text.secondary",
            lineHeight: 20,
            textAlign: "center",
            marginBottom: 12
          },
          
          example: {
            fontSize: "sm",
            color: "text.muted",
            fontStyle: "italic",
            textAlign: "center",
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            padding: 8,
            borderRadius: "sm"
          },
          
          tipsSection: {
            marginTop: 16
          },
          
          tipsList: {
            paddingLeft: 16
          },
          
          tipItem: {
            fontSize: "sm",
            color: "text.secondary",
            lineHeight: 18,
            marginBottom: 4
          },
          
          buttonContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20
          },
          
          button: {
            flex: 1,
            paddingVertical: 12,
            borderRadius: "md",
            alignItems: "center",
            marginHorizontal: 8,
            
            primary: {
              backgroundColor: "primary.main"
            },
            secondary: {
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.3)"
            }
          },
          
          buttonText: {
            fontSize: "base",
            fontWeight: "medium",
            
            primary: { color: "primary.contrast" },
            secondary: { color: "text.secondary" }
          }
        }
      },
      
      // Quiz Components
      quizComponents: {
        questionCard: {
          backgroundColor: "background.card",
          borderRadius: "lg",
          padding: 24,
          margin: 16,
          minHeight: 200,
          
          header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20
          },
          
          questionNumber: {
            fontSize: "sm",
            color: "text.muted",
            fontWeight: "medium"
          },
          
          timer: {
            fontSize: "sm",
            color: "text.accent",
            fontWeight: "medium"
          },
          
          questionText: {
            fontSize: "lg",
            color: "text.primary",
            fontWeight: "medium",
            lineHeight: 24,
            textAlign: "center",
            marginBottom: 24
          },
          
          hintSection: {
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            borderRadius: "md",
            padding: 12,
            marginBottom: 20,
            borderLeftWidth: 3,
            borderLeftColor: "primary.main"
          },
          
          hintText: {
            fontSize: "sm",
            color: "text.accent",
            fontStyle: "italic"
          }
        },
        
        answerOptions: {
          container: {
            marginTop: 12
          },
          
          option: {
            backgroundColor: "background.secondary",
            borderRadius: "md",
            padding: 16,
            marginBottom: 12,
            borderWidth: 2,
            borderColor: "transparent",
            
            states: {
              default: {
                backgroundColor: "background.secondary",
                borderColor: "rgba(255, 255, 255, 0.1)"
              },
              selected: {
                backgroundColor: "rgba(139, 92, 246, 0.2)",
                borderColor: "primary.main"
              },
              correct: {
                backgroundColor: "rgba(16, 185, 129, 0.2)",
                borderColor: "status.success"
              },
              incorrect: {
                backgroundColor: "rgba(239, 68, 68, 0.2)",
                borderColor: "status.error"
              }
            }
          },
          
          optionText: {
            fontSize: "base",
            fontWeight: "medium",
            textAlign: "center",
            
            states: {
              default: { color: "text.primary" },
              selected: { color: "primary.light" },
              correct: { color: "status.success" },
              incorrect: { color: "status.error" }
            }
          },
          
          optionLabel: {
            position: "absolute",
            left: 16,
            top: "50%",
            transform: [{ translateY: -10 }],
            width: 20,
            height: 20,
            borderRadius: "full",
            borderWidth: 2,
            alignItems: "center",
            justifyContent: "center",
            
            states: {
              default: {
                borderColor: "text.muted",
                backgroundColor: "transparent"
              },
              selected: {
                borderColor: "primary.main",
                backgroundColor: "primary.main"
              }
            }
          }
        },
        
        quizControls: {
          container: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
            backgroundColor: "background.secondary"
          },
          
          button: {
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: "md",
            alignItems: "center",
            
            primary: {
              backgroundColor: "primary.main",
              minWidth: 100
            },
            secondary: {
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.3)",
              minWidth: 100
            },
            disabled: {
              backgroundColor: "progress.locked",
              opacity: 0.5
            }
          },
          
          buttonText: {
            fontSize: "base",
            fontWeight: "medium",
            
            primary: { color: "primary.contrast" },
            secondary: { color: "text.secondary" }
          }
        },
        
        progressBar: {
          container: {
            height: 6,
            backgroundColor: "progress.incomplete",
            borderRadius: "full",
            margin: 16,
            overflow: "hidden"
          },
          
          fill: {
            height: "100%",
            backgroundColor: "primary.main",
            borderRadius: "full"
          }
        }
      },
      
      // Results Components
      resultsComponents: {
        scoreCard: {
          backgroundColor: "background.card",
          borderRadius: "xl",
          padding: 24,
          margin: 16,
          alignItems: "center",
          
          icon: {
            fontSize: 64,
            marginBottom: 16
          },
          
          scoreText: {
            fontSize: "4xl",
            fontWeight: "bold",
            color: "text.primary",
            marginBottom: 8
          },
          
          totalText: {
            fontSize: "lg",
            color: "text.secondary",
            marginBottom: 16
          },
          
          percentageText: {
            fontSize: "2xl",
            fontWeight: "semibold",
            marginBottom: 20,
            
            states: {
              excellent: { color: "status.success" }, // 90%+
              good: { color: "status.warning" }, // 70-89%
              needsImprovement: { color: "status.error" } // <70%
            }
          },
          
          messageText: {
            fontSize: "base",
            color: "text.secondary",
            textAlign: "center",
            lineHeight: 22,
            marginBottom: 24
          },
          
          statsContainer: {
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
            marginBottom: 24
          },
          
          statItem: {
            alignItems: "center"
          },
          
          statValue: {
            fontSize: "xl",
            fontWeight: "bold",
            color: "text.primary"
          },
          
          statLabel: {
            fontSize: "sm",
            color: "text.muted",
            marginTop: 4
          }
        },
        
        reviewSection: {
          backgroundColor: "background.secondary",
          borderRadius: "lg",
          margin: 16,
          overflow: "hidden"
        },
        
        reviewHeader: {
          backgroundColor: "primary.main",
          padding: 16,
          alignItems: "center"
        },
        
        reviewTitle: {
          fontSize: "lg",
          fontWeight: "semibold",
          color: "primary.contrast"
        },
        
        reviewItem: {
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: "rgba(255, 255, 255, 0.1)",
          
          questionText: {
            fontSize: "base",
            color: "text.primary",
            marginBottom: 8
          },
          
          answerRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          },
          
          userAnswer: {
            fontSize: "sm",
            fontWeight: "medium",
            
            states: {
              correct: { color: "status.success" },
              incorrect: { color: "status.error" }
            }
          },
          
          correctAnswer: {
            fontSize: "sm",
            color: "status.success",
            fontWeight: "medium"
          }
        }
      },
      
      // Progress Components
      progressComponents: {
        overviewCard: {
          backgroundColor: "background.card",
          borderRadius: "lg",
          padding: 20,
          margin: 16
        },
        
        progressRing: {
          size: 120,
          strokeWidth: 8,
          backgroundColor: "progress.incomplete",
          progressColor: "primary.main",
          
          centerContent: {
            alignItems: "center",
            justifyContent: "center"
          },
          
          percentageText: {
            fontSize: "xl",
            fontWeight: "bold",
            color: "text.primary"
          },
          
          labelText: {
            fontSize: "sm",
            color: "text.muted"
          }
        },
        
        streakCounter: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "rgba(245, 158, 11, 0.1)",
          borderRadius: "md",
          padding: 12,
          margin: 16,
          
          icon: {
            fontSize: 24,
            marginRight: 12
          },
          
          text: {
            fontSize: "base",
            fontWeight: "medium",
            color: "text.primary"
          },
          
          count: {
            fontSize: "lg",
            fontWeight: "bold",
            color: "status.warning",
            marginLeft: 8
          }
        },
        
        achievementBadge: {
          alignItems: "center",
          padding: 16,
          margin: 8,
          backgroundColor: "background.card",
          borderRadius: "lg",
          minWidth: 100,
          
          states: {
            earned: {
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              borderWidth: 2,
              borderColor: "status.success"
            },
            locked: {
              backgroundColor: "background.card",
              opacity: 0.5
            }
          },
          
          icon: {
            fontSize: 32,
            marginBottom: 8
          },
          
          title: {
            fontSize: "sm",
            fontWeight: "medium",
            color: "text.primary",
            textAlign: "center"
          },
          
          description: {
            fontSize: "xs",
            color: "text.muted",
            textAlign: "center",
            marginTop: 4
          }
        }
      },
      
      // Common Components
      commonComponents: {
        button: {
          primary: {
            backgroundColor: "primary.main",
            paddingVertical: 14,
            paddingHorizontal: 24,
            borderRadius: "md",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 48
          },
          
          secondary: {
            backgroundColor: "transparent",
            borderWidth: 2,
            borderColor: "primary.main",
            paddingVertical: 14,
            paddingHorizontal: 24,
            borderRadius: "md",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 48
          },
          
          text: {
            primary: {
              fontSize: "base",
              fontWeight: "semibold",
              color: "primary.contrast"
            },
            secondary: {
              fontSize: "base",
              fontWeight: "semibold",
              color: "primary.main"
            }
          }
        },
        
        card: {
          default: {
            backgroundColor: "background.card",
            borderRadius: "lg",
            padding: 16,
            marginVertical: 8,
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 }
          },
          
          elevated: {
            backgroundColor: "background.card",
            borderRadius: "lg", 
            padding: 20,
            marginVertical: 12,
            shadowOpacity: 0.15,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 }
          }
        },
        
        modal: {
          overlay: {
            flex: 1,
            backgroundColor: "background.overlay",
            justifyContent: "center",
            alignItems: "center"
          },
          
          content: {
            backgroundColor: "background.secondary",
            borderRadius: "xl",
            padding: 24,
            margin: 20,
            maxHeight: "80%",
            width: "90%"
          },
          
          header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20
          },
          
          title: {
            fontSize: "xl",
            fontWeight: "bold",
            color: "text.primary"
          },
          
          closeButton: {
            padding: 8,
            borderRadius: "full"
          }
        },
        
        loadingSpinner: {
          container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "background.primary"
          },
          
          spinner: {
            size: "large",
            color: "primary.main"
          },
          
          text: {
            fontSize: "base",
            color: "text.secondary",
            marginTop: 16
          }
        }
      }
    }
  },

  // Screen Layout Specifications
  SCREEN_LAYOUTS: {
    coursesScreen: {
      name: "CoursesScreen",
      description: "Main course selection and overview screen",
      
      layout: {
        container: {
          flex: 1,
          backgroundColor: "background.primary"
        },
        
        header: {
          component: "CustomHeader",
          props: {
            title: "French Verb Courses",
            subtitle: "Choose your learning path",
            showBackButton: false,
            rightAction: {
              icon: "⚙️",
              onPress: "navigateToSettings"
            }
          }
        },
        
        content: {
          component: "ScrollView",
          props: {
            showsVerticalScrollIndicator: false,
            contentContainerStyle: {
              paddingVertical: 16
            }
          },
          
          children: [
            {
              component: "WelcomeSection",
              props: {
                style: { marginBottom: 24 }
              }
            },
            {
              component: "DifficultyCards",
              props: {
                difficulties: "getAllDifficulties()",
                onSelectDifficulty: "handleDifficultySelect"
              }
            },
            {
              component: "ProgressOverview",
              props: {
                style: { marginTop: 24 }
              }
            }
          ]
        }
      },
      
      components: {
        WelcomeSection: {
          style: {
            padding: 20,
            backgroundColor: "background.card",
            borderRadius: "lg",
            margin: 16
          },
          
          content: [
            {
              component: "Text",
              props: {
                style: {
                  fontSize: "2xl",
                  fontWeight: "bold",
                  color: "text.primary",
                  textAlign: "center",
                  marginBottom: 8
                }
              },
              text: "Welcome to Conjugately"
            },
            {
              component: "Text", 
              props: {
                style: {
                  fontSize: "base",
                  color: "text.secondary",
                  textAlign: "center",
                  lineHeight: 22
                }
              },
              text: "Master French verb conjugations through structured courses designed for serious learners."
            }
          ]
        },
        
        DifficultyCards: {
          container: {
            paddingHorizontal: 16
          },
          
          card: {
            component: "TouchableOpacity",
            style: "components.courseSelection.difficultyCard",
            
            content: [
              {
                component: "View",
                style: "components.courseSelection.difficultyCard.content.header",
                children: [
                  {
                    component: "Text",
                    style: "components.courseSelection.difficultyCard.content.icon",
                    text: "{difficulty.icon}"
                  },
                  {
                    component: "View",
                    style: { flex: 1 },
                    children: [
                      {
                        component: "Text",
                        style: "components.courseSelection.difficultyCard.content.title",
                        text: "{difficulty.title}"
                      },
                      {
                        component: "Text",
                        style: "components.courseSelection.difficultyCard.content.subtitle", 
                        text: "{difficulty.subtitle}"
                      }
                    ]
                  }
                ]
              },
              {
                component: "Text",
                style: "components.courseSelection.difficultyCard.content.description",
                text: "{difficulty.description}"
              },
              {
                component: "ProgressBar",
                style: "components.courseSelection.difficultyCard.content.progressBar",
                props: {
                  progress: "{getUserProgress(difficulty.id)}",
                  color: "primary.main"
                }
              }
            ]
          }
        }
      }
    },
    
    courseOverviewScreen: {
      name: "CourseOverviewScreen",
      description: "Detailed view of selected course with units",
      
      layout: {
        container: {
          flex: 1,
          backgroundColor: "background.primary"
        },
        
        header: {
          component: "CustomHeader",
          props: {
            title: "{course.title}",
            subtitle: "{course.timeFrame} • {course.totalUnits} units",
            showBackButton: true,
            onBackPress: "navigateBack"
          }
        },
        
        content: {
          component: "ScrollView",
          children: [
            {
              component: "CourseInfoSection",
              props: {
                course: "{selectedCourse}",
                style: { marginBottom: 24 }
              }
            },
            {
              component: "UnitsSection",
              props: {
                units: "{course.units}",
                completedUnits: "{userProgress.completedUnits}",
                onUnitSelect: "handleUnitSelect"
              }
            },
            {
              component: "FinalExamSection",
              props: {
                exam: "{course.finalExam}",
                isUnlocked: "{allUnitsCompleted}",
                onStartExam: "handleStartFinalExam"
              }
            }
          ]
        }
      }
    },
    
    unitQuizScreen: {
      name: "UnitQuizScreen",
      description: "Interactive quiz interface for unit practice",
      
      layout: {
        container: {
          flex: 1,
          backgroundColor: "background.primary"
        },
        
        header: {
          component: "QuizHeader",
          props: {
            unit: "{currentUnit}",
            currentQuestion: "{currentQuestionIndex + 1}",
            totalQuestions: "{questions.length}",
            onPause: "handlePauseQuiz"
          }
        },
        
        content: {
          component: "View",
          style: { flex: 1 },
          children: [
            {
              component: "ProgressBar",
              props: {
                progress: "{(currentQuestionIndex + 1) / questions.length}",
                style: { margin: 16 }
              }
            },
            {
              component: "QuestionCard",
              props: {
                question: "{currentQuestion}",
                selectedAnswer: "{selectedAnswer}",
                showResult: "{showResult}",
                onAnswerSelect: "handleAnswerSelect"
              }
            },
            {
              component: "QuizControls",
              props: {
                canConfirm: "{selectedAnswer !== null}",
                canNext: "{showResult}",
                isLastQuestion: "{currentQuestionIndex === questions.length - 1}",
                onConfirm: "handleConfirmAnswer",
                onNext: "handleNextQuestion",
                onFinish: "handleFinishQuiz"
              }
            }
          ]
        }
      }
    },
    
    resultsScreen: {
      name: "ResultsScreen", 
      description: "Quiz results and performance analysis",
      
      layout: {
        container: {
          flex: 1,
          backgroundColor: "background.primary"
        },
        
        content: {
          component: "ScrollView",
          children: [
            {
              component: "ScoreCard",
              props: {
                score: "{quizResults.score}",
                total: "{quizResults.total}",
                percentage: "{quizResults.percentage}",
                passed: "{quizResults.passed}"
              }
            },
            {
              component: "PerformanceStats",
              props: {
                correct: "{quizResults.correct}",
                incorrect: "{quizResults.incorrect}",
                timeSpent: "{quizResults.timeSpent}"
              }
            },
            {
              component: "ReviewSection",
              props: {
                incorrectAnswers: "{quizResults.incorrectAnswers}",
                showReview: true
              }
            },
            {
              component: "NextStepsSection",
              props: {
                nextUnit: "{getNextUnit()}",
                canTakeExam: "{canTakeFinalExam()}",
                onContinue: "handleContinue"
              }
            }
          ]
        }
      }
    },
    
    progressScreen: {
      name: "ProgressScreen",
      description: "User progress tracking and achievements",
      
      layout: {
        container: {
          flex: 1,
          backgroundColor: "background.primary"
        },
        
        header: {
          component: "CustomHeader",
          props: {
            title: "Your Progress",
            subtitle: "Track your learning journey"
          }
        },
        
        content: {
          component: "ScrollView",
          children: [
            {
              component: "OverallProgressCard",
              props: {
                totalProgress: "{calculateOverallProgress()}",
                coursesCompleted: "{completedCourses.length}",
                totalCourses: 4
              }
            },
            {
              component: "StreakSection",
              props: {
                currentStreak: "{userStats.currentStreak}",
                longestStreak: "{userStats.longestStreak}"
              }
            },
            {
              component: "CoursesProgressSection",
              props: {
                courses: "{getAllDifficulties()}",
                userProgress: "{userProgress}"
              }
            },
            {
              component: "AchievementsSection",
              props: {
                achievements: "{userAchievements}",
                availableAchievements: "{getAllAchievements()}"
              }
            }
          ]
        }
      }
    }
  },

  // Animation Specifications
  ANIMATIONS: {
    transitions: {
      screenTransition: {
        type: "slide",
        duration: 300,
        easing: "easeInOut"
      },
      
      modalPresentation: {
        type: "fade",
        duration: 250,
        easing: "easeOut"
      },
      
      cardExpansion: {
        type: "spring",
        tension: 100,
        friction: 8
      }
    },
    
    gestures: {
      swipeToAnswer: {
        enabled: true,
        threshold: 100,
        direction: "horizontal"
      },
      
      pullToRefresh: {
        enabled: true,
        threshold: 80,
        color: "primary.main"
      }
    },
    
    feedback: {
      correctAnswer: {
        type: "bounce",
        scale: 1.1,
        duration: 200,
        color: "status.success"
      },
      
      incorrectAnswer: {
        type: "shake",
        translateX: [-10, 10, -10, 10, 0],
        duration: 400,
        color: "status.error"
      },
      
      progressUpdate: {
        type: "fadeIn",
        duration: 500,
        delay: 200
      }
    }
  },

  // State Management Specifications
  STATE_MANAGEMENT: {
    globalState: {
      user: {
        profile: {
          id: "string",
          name: "string",
          email: "string",
          preferredLanguage: "string",
          createdAt: "Date",
          settings: {
            darkMode: "boolean",
            soundEnabled: "boolean",
            hapticEnabled: "boolean",
            dailyGoal: "number",
            reminderTime: "string"
          }
        },
        
        progress: {
          currentStreak: "number",
          longestStreak: "number",
          totalQuizzesTaken: "number",
          totalQuestionsAnswered: "number",
          accuracyRate: "number",
          studyTimeTotal: "number", // in minutes
          lastActiveDate: "Date",
          
          courseProgress: {
            beginner: {
              status: "not_started | in_progress | completed",
              completedUnits: "string[]", // unit IDs
              finalExamScore: "number | null",
              finalExamPassed: "boolean",
              timeSpent: "number", // minutes
              startDate: "Date | null",
              completionDate: "Date | null"
            },
            easy: {
              status: "locked | not_started | in_progress | completed",
              completedUnits: "string[]",
              finalExamScore: "number | null", 
              finalExamPassed: "boolean",
              timeSpent: "number",
              startDate: "Date | null",
              completionDate: "Date | null"
            },
            moderate: {
              status: "locked | not_started | in_progress | completed",
              completedUnits: "string[]",
              finalExamScore: "number | null",
              finalExamPassed: "boolean", 
              timeSpent: "number",
              startDate: "Date | null",
              completionDate: "Date | null"
            },
            difficult: {
              status: "locked | not_started | in_progress | completed",
              completedUnits: "string[]",
              finalExamScore: "number | null",
              finalExamPassed: "boolean",
              timeSpent: "number", 
              startDate: "Date | null",
              completionDate: "Date | null"
            }
          }
        },
        
        achievements: {
          earned: "string[]", // achievement IDs
          progress: {
            achievementId: {
              current: "number",
              target: "number",
              percentage: "number"
            }
          }
        }
      },
      
      app: {
        currentScreen: "string",
        isLoading: "boolean",
        error: "string | null",
        networkStatus: "online | offline",
        lastSyncTime: "Date | null"
      },
      
      quiz: {
        active: {
          isActive: "boolean",
          unit: "object | null",
          questions: "array",
          currentQuestionIndex: "number",
          answers: "object", // questionId -> answerIndex
          startTime: "Date | null",
          timeSpent: "number", // seconds
          isPaused: "boolean"
        },
        
        results: {
          score: "number",
          total: "number", 
          percentage: "number",
          correct: "number",
          incorrect: "number",
          timeSpent: "number",
          incorrectAnswers: "array",
          passed: "boolean"
        }
      }
    },
    
    actions: {
      user: [
        "UPDATE_USER_PROFILE",
        "UPDATE_USER_SETTINGS", 
        "INCREMENT_STREAK",
        "RESET_STREAK",
        "UPDATE_COURSE_PROGRESS",
        "COMPLETE_UNIT",
        "COMPLETE_COURSE",
        "EARN_ACHIEVEMENT"
      ],
      
      app: [
        "SET_LOADING",
        "SET_ERROR",
        "CLEAR_ERROR", 
        "SET_NETWORK_STATUS",
        "UPDATE_SYNC_TIME"
      ],
      
      quiz: [
        "START_QUIZ",
        "ANSWER_QUESTION",
        "NEXT_QUESTION",
        "PAUSE_QUIZ",
        "RESUME_QUIZ",
        "FINISH_QUIZ",
        "RESET_QUIZ",
        "SET_QUIZ_RESULTS"
      ]
    },
    
    persistence: {
      asyncStorage: [
        "userProfile",
        "userProgress", 
        "userAchievements",
        "appSettings",
        "offlineData"
      ],
      
      cloudSync: {
        enabled: true,
        syncInterval: 300000, // 5 minutes
        endpoints: {
          sync: "/api/sync",
          backup: "/api/backup",
          restore: "/api/restore"
        }
      }
    }
  },

  // Complete Component Implementation Guide
  IMPLEMENTATION_GUIDE: {
    dependencies: {
      navigation: "@react-navigation/native",
      navigationStack: "@react-navigation/stack",
      navigationBottom: "@react-navigation/bottom-tabs",
      stateManagement: "@reduxjs/toolkit",
      persistence: "@react-native-async-storage/async-storage",
      animations: "react-native-reanimated",
      gestures: "react-native-gesture-handler",
      svg: "react-native-svg",
      sound: "react-native-sound",
      haptics: "@react-native-haptic-feedback",
      networking: "@react-native-netinfo",
      dateTime: "date-fns",
      icons: "react-native-vector-icons"
    },
    
    fileStructure: {
      src: {
        components: {
          common: [
            "Button.tsx",
            "Card.tsx", 
            "Modal.tsx",
            "ProgressBar.tsx",
            "LoadingSpinner.tsx",
            "CustomHeader.tsx"
          ],
          courses: [
            "DifficultyCard.tsx",
            "CourseOverview.tsx",
            "TimeFrameSelector.tsx",
            "WelcomeSection.tsx"
          ],
          units: [
            "UnitCard.tsx",
            "UnitIntroModal.tsx",
            "UnitsList.tsx",
            "FinalExamSection.tsx"
          ],
          quiz: [
            "QuestionCard.tsx",
            "AnswerOptions.tsx",
            "QuizControls.tsx",
            "QuizHeader.tsx",
            "HintSection.tsx"
          ],
          results: [
            "ScoreCard.tsx",
            "PerformanceStats.tsx",
            "ReviewSection.tsx",
            "NextStepsSection.tsx"
          ],
          progress: [
            "OverallProgressCard.tsx",
            "StreakSection.tsx",
            "AchievementBadge.tsx",
            "ProgressRing.tsx"
          ]
        },
        
        screens: [
          "CoursesScreen.tsx",
          "CourseOverviewScreen.tsx", 
          "UnitQuizScreen.tsx",
          "ResultsScreen.tsx",
          "ProgressScreen.tsx",
          "ProfileScreen.tsx",
          "SettingsScreen.tsx"
        ],
        
        services: [
          "QuizService.ts",
          "ProgressService.ts",
          "SyncService.ts",
          "AudioService.ts",
          "HapticService.ts"
        ],
        
        utils: [
          "theme.ts",
          "constants.ts",
          "helpers.ts",
          "storage.ts",
          "validators.ts"
        ],
        
        hooks: [
          "useQuiz.ts",
          "useProgress.ts",
          "useTheme.ts",
          "useAudio.ts",
          "useHaptic.ts"
        ],
        
        store: [
          "index.ts",
          "userSlice.ts",
          "appSlice.ts", 
          "quizSlice.ts"
        ]
      }
    },
    
    coreComponents: {
      DifficultyCard: {
        file: "src/components/courses/DifficultyCard.tsx",
        props: {
          difficulty: "DifficultyLevel",
          progress: "number",
          status: "locked | available | inProgress | completed",
          onPress: "() => void"
        },
        
        implementation: `
import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { ProgressBar } from '../common/ProgressBar';

interface DifficultyCardProps {
  difficulty: DifficultyLevel;
  progress: number;
  status: 'locked' | 'available' | 'inProgress' | 'completed';
  onPress: () => void;
}

export const DifficultyCard: React.FC<DifficultyCardProps> = ({
  difficulty,
  progress,
  status,
  onPress
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme, status);
  
  const getStatusIcon = () => {
    switch (status) {
      case 'locked': return '🔒';
      case 'available': return difficulty.icon;
      case 'inProgress': return '⏳';
      case 'completed': return '✅';
      default: return difficulty.icon;
    }
  };
  
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={status === 'locked'}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={styles.icon}>{getStatusIcon()}</Text>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{difficulty.title}</Text>
          <Text style={styles.subtitle}>{difficulty.subtitle}</Text>
        </View>
      </View>
      
      <Text style={styles.description}>{difficulty.description}</Text>
      
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {difficulty.totalUnits} units • {difficulty.totalQuestions} questions
        </Text>
        <Text style={styles.statsText}>
          Est. {difficulty.estimatedDuration}
        </Text>
      </View>
      
      {status !== 'locked' && (
        <ProgressBar
          progress={progress}
          height={4}
          backgroundColor={theme.colors.progress.incomplete}
          progressColor={theme.colors.primary.main}
          style={styles.progressBar}
        />
      )}
    </TouchableOpacity>
  );
};

const createStyles = (theme: Theme, status: string) => StyleSheet.create({
  container: {
    backgroundColor: getCardBackgroundColor(theme, status),
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 2,
    borderColor: getBorderColor(theme, status),
    opacity: status === 'locked' ? 0.5 : 1,
  },
  // ... more styles
});`
      },
      
      QuestionCard: {
        file: "src/components/quiz/QuestionCard.tsx",
        props: {
          question: "QuizQuestion",
          selectedAnswer: "number | null",
          showResult: "boolean",
          onAnswerSelect: "(index: number) => void"
        },
        
        implementation: `
import React, { useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { useHaptic } from '../hooks/useHaptic';
import { AnswerOptions } from './AnswerOptions';
import { HintSection } from './HintSection';

interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  showResult: boolean;
  onAnswerSelect: (index: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  showResult,
  onAnswerSelect
}) => {
  const { theme } = useTheme();
  const { triggerHaptic } = useHaptic();
  const fadeAnim = new Animated.Value(0);
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [question.id]);
  
  const handleAnswerSelect = (index: number) => {
    triggerHaptic('selection');
    onAnswerSelect(index);
  };
  
  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.header}>
        <Text style={styles.questionNumber}>
          Question {question.number} of {question.total}
        </Text>
        {question.timeLimit && (
          <Text style={styles.timer}>
            {formatTime(question.remainingTime)}
          </Text>
        )}
      </View>
      
      <Text style={styles.questionText}>{question.text}</Text>
      
      {question.hint && (
        <HintSection hint={question.hint} />
      )}
      
      <AnswerOptions
        options={question.options}
        selectedAnswer={selectedAnswer}
        correctAnswer={showResult ? question.correctAnswer : null}
        onSelect={handleAnswerSelect}
        disabled={showResult}
      />
      
      {showResult && question.explanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>Explanation:</Text>
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </View>
      )}
    </Animated.View>
  );
};`
      },
      
      ProgressRing: {
        file: "src/components/progress/ProgressRing.tsx",
        props: {
          progress: "number",
          size: "number",
          strokeWidth: "number",
          color: "string",
          backgroundColor: "string"
        },
        
        implementation: `
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedProps, 
  withTiming 
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps {
  progress: number; // 0-100
  size: number;
  strokeWidth: number;
  color: string;
  backgroundColor: string;
  children?: React.ReactNode;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size,
  strokeWidth,
  color,
  backgroundColor,
  children
}) => {
  const animatedProgress = useSharedValue(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 1000 });
  }, [progress]);
  
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference - (animatedProgress.value / 100) * circumference;
    return {
      strokeDashoffset
    };
  });
  
  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeLinecap="round"
          animatedProps={animatedProps}
          transform={\`rotate(-90 \${size / 2} \${size / 2})\`}
        />
      </Svg>
      
      {children && (
        <View style={styles.centerContent}>
          {children}
        </View>
      )}
    </View>
  );
};`
      }
    },
    
    customHooks: {
      useQuiz: {
        file: "src/hooks/useQuiz.ts",
        description: "Manages quiz state and logic",
        
        implementation: `
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QuizService } from '../services/QuizService';
import { useHaptic } from './useHaptic';
import { useAudio } from './useAudio';

export const useQuiz = () => {
  const dispatch = useDispatch();
  const { triggerHaptic } = useHaptic();
  const { playSound } = useAudio();
  
  const quizState = useSelector(state => state.quiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeSpent, setTimeSpent] = useState(0);
  
  const startQuiz = useCallback(async (unit, difficulty) => {
    try {
      const questions = await QuizService.generateQuiz(unit, difficulty);
      dispatch(startQuizAction({ unit, questions }));
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setTimeSpent(0);
    } catch (error) {
      console.error('Error starting quiz:', error);
    }
  }, [dispatch]);
  
  const selectAnswer = useCallback((questionIndex, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
    triggerHaptic('selection');
  }, [triggerHaptic]);
  
  const submitAnswer = useCallback((questionIndex, answerIndex) => {
    const question = quizState.questions[questionIndex];
    const isCorrect = answerIndex === question.correctAnswer;
    
    if (isCorrect) {
      playSound('correct');
      triggerHaptic('success');
    } else {
      playSound('incorrect');  
      triggerHaptic('error');
    }
    
    dispatch(answerQuestionAction({ questionIndex, answerIndex, isCorrect }));
  }, [quizState.questions, dispatch, playSound, triggerHaptic]);
  
  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < quizState.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, quizState.questions.length]);
  
  const finishQuiz = useCallback(() => {
    const results = QuizService.calculateResults(
      quizState.questions,
      selectedAnswers,
      timeSpent
    );
    
    dispatch(finishQuizAction(results));
    return results;
  }, [quizState.questions, selectedAnswers, timeSpent, dispatch]);
  
  return {
    quizState,
    currentQuestionIndex,
    selectedAnswers,
    timeSpent,
    startQuiz,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    finishQuiz
  };
};`
      },
      
      useProgress: {
        file: "src/hooks/useProgress.ts", 
        description: "Manages user progress tracking",
        
        implementation: `
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { ProgressService } from '../services/ProgressService';

export const useProgress = () => {
  const dispatch = useDispatch();
  const userProgress = useSelector(state => state.user.progress);
  
  const updateCourseProgress = useCallback(async (courseId, unitId) => {
    try {
      const updatedProgress = await ProgressService.completeUnit(courseId, unitId);
      dispatch(updateCourseProgressAction(updatedProgress));
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  }, [dispatch]);
  
  const completeCourse = useCallback(async (courseId, finalExamScore) => {
    try {
      const courseCompletion = await ProgressService.completeCourse(courseId, finalExamScore);
      dispatch(completeCourseAction(courseCompletion));
      
      // Check for achievements
      const newAchievements = await ProgressService.checkAchievements(userProgress);
      if (newAchievements.length > 0) {
        dispatch(earnAchievementsAction(newAchievements));
      }
    } catch (error) {
      console.error('Error completing course:', error);
    }
  }, [dispatch, userProgress]);
  
  const calculateOverallProgress = useCallback(() => {
    return ProgressService.calculateOverallProgress(userProgress.courseProgress);
  }, [userProgress.courseProgress]);
  
  const getNextRecommendation = useCallback(() => {
    return ProgressService.getNextRecommendation(userProgress.courseProgress);
  }, [userProgress.courseProgress]);
  
  return {
    userProgress,
    updateCourseProgress,
    completeCourse,
    calculateOverallProgress,
    getNextRecommendation
  };
};`
      }
    },
    
    services: {
      QuizService: {
        file: "src/services/QuizService.ts",
        description: "Handles quiz generation and management",
        
        implementation: `
import { FRENCH_VERB_DATA } from '../data/frenchVerbData';
import { FRENCH_MINI_COURSES_DATA } from '../data/frenchMiniCourses';

export class QuizService {
  static async generateQuiz(unit, difficulty, isExam = false) {
    try {
      // Use offline data first, fallback to API if needed
      const questions = this.generateOfflineQuiz(unit, difficulty, isExam);
      
      if (questions.length === 0) {
        // Fallback to API call
        return await this.generateOnlineQuiz(unit, difficulty, isExam);
      }
      
      return questions;
    } catch (error) {
      console.error('Error generating quiz:', error);
      throw error;
    }
  }
  
  static generateOfflineQuiz(unit, difficulty, isExam) {
    const verbData = FRENCH_VERB_DATA.VERB_CONJUGATIONS[unit.verb];
    const contexts = FRENCH_VERB_DATA.QUESTION_CONTEXTS[unit.verb] || [];
    
    if (!verbData || contexts.length === 0) {
      return [];
    }
    
    const questions = [];
    const questionCount = isExam ? 10 : 20;
    
    for (let i = 0; i < questionCount; i++) {
      const question = this.generateSingleQuestion(verbData, contexts, unit, difficulty);
      if (question) {
        questions.push({ ...question, id: \`q_\${i}\`, number: i + 1, total: questionCount });
      }
    }
    
    return this.shuffleArray(questions);
  }
  
  static generateSingleQuestion(verbData, contexts, unit, difficulty) {
    const tenses = this.getTensesForDifficulty(difficulty);
    const pronouns = ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles'];
    
    const tense = this.getRandomItem(tenses);
    const pronoun = this.getRandomItem(pronouns);
    const context = this.getRandomItem(contexts);
    
    const conjugation = verbData[tense]?.[pronoun];
    if (!conjugation) return null;
    
    const isNegative = Math.random() < 0.3; // 30% negative questions
    
    const questionText = isNegative ? 
      this.buildNegativeQuestion(context.en, pronoun) :
      context.en;
      
    const correctAnswer = isNegative ?
      this.buildNegativeFrench(pronoun, conjugation, context.fr_context, tense, unit.verb) :
      this.buildPositiveFrench(pronoun, conjugation, context.fr_context);
    
    const wrongAnswers = this.generateDistractors(correctAnswer, unit.verb, tense, pronoun);
    const allAnswers = this.shuffleArray([correctAnswer, ...wrongAnswers]);
    const correctIndex = allAnswers.indexOf(correctAnswer);
    
    return {
      text: questionText,
      options: allAnswers,
      correctAnswer: correctIndex,
      hint: this.generateHint(unit.verb, tense, pronoun),
      explanation: this.generateExplanation(correctAnswer, tense, unit.verb),
      metadata: {
        verb: unit.verb,
        tense,
        pronoun,
        isNegative,
        difficulty
      }
    };
  }
  
  static calculateResults(questions, answers, timeSpent) {
    let correct = 0;
    const incorrectAnswers = [];
    
    questions.forEach((question, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) {
        correct++;
      } else {
        incorrectAnswers.push({
          question: question.text,
          userAnswer: question.options[userAnswer] || 'No answer',
          correctAnswer: question.options[question.correctAnswer],
          explanation: question.explanation
        });
      }
    });
    
    const total = questions.length;
    const percentage = Math.round((correct / total) * 100);
    const passed = percentage >= 70; // 70% passing grade for units, 90% for final exams
    
    return {
      score: correct,
      total,
      percentage,
      correct,
      incorrect: total - correct,
      timeSpent,
      incorrectAnswers,
      passed
    };
  }
  
  // Helper methods...
  static shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
  static getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}`
      }
    }
  },

  // Testing and Quality Assurance
  TESTING_GUIDE: {
    unitTests: {
      components: [
        "DifficultyCard.test.tsx",
        "QuestionCard.test.tsx", 
        "ProgressRing.test.tsx",
        "UnitCard.test.tsx"
      ],
      
      hooks: [
        "useQuiz.test.ts",
        "useProgress.test.ts",
        "useTheme.test.ts"
      ],
      
      services: [
        "QuizService.test.ts",
        "ProgressService.test.ts"
      ]
    },
    
    integrationTests: [
      "CourseFlow.test.tsx",
      "QuizFlow.test.tsx",
      "ProgressSync.test.tsx"
    ],
    
    e2eTests: [
      "CompleteBeginnerCourse.e2e.ts",
      "TakeFinalExam.e2e.ts", 
      "ProgressTracking.e2e.ts"
    ],
    
    testingFramework: {
      runner: "jest",
      reactNativeTesting: "@testing-library/react-native",
      e2e: "detox",
      mocking: "@testing-library/jest-native"
    }
  },

  // Performance Optimization
  PERFORMANCE_GUIDE: {
    optimizations: [
      "React.memo for frequently re-rendered components",
      "useMemo for expensive calculations", 
      "useCallback for event handlers",
      "FlatList for large data sets",
      "Image caching for assets",
      "Bundle splitting for reduced initial load"
    ],
    
    memoryManagement: [
      "Proper cleanup in useEffect",
      "Remove event listeners on unmount",
      "Cancel pending API requests",
      "Clear timers and intervals"
    ],
    
    dataOptimization: [
      "Lazy loading of course content",
      "Pagination for large question sets",
      "Compression for offline storage",
      "Efficient state structure"
    ]
  },

  // Accessibility Guidelines  
  ACCESSIBILITY: {
    requirements: [
      "Screen reader support",
      "High contrast mode", 
      "Font scaling support",
      "Voice control compatibility",
      "Keyboard navigation",
      "Color-blind friendly design"
    ],
    
    implementation: [
      "accessibilityLabel for all interactive elements",
      "accessibilityHint for complex actions",
      "accessibilityRole for proper semantics", 
      "Screen reader announcements for state changes",
      "Focus management for modals",
      "Sufficient color contrast ratios"
    ]
  }
};

// Helper functions for React Native course management
export const FRENCH_MINI_COURSES_HELPERS = {
  // Get complete course structure for difficulty level
  getCourseStructure: (difficulty) => {
    return FRENCH_MINI_COURSES_DATA.COURSE_DIFFICULTIES[difficulty] || null;
  },

  // Get specific unit information
  getUnitById: (unitId) => {
    for (const difficulty of Object.values(FRENCH_MINI_COURSES_DATA.COURSE_DIFFICULTIES)) {
      const unit = difficulty.units.find(u => u.id === unitId);
      if (unit) return unit;
    }
    return null;
  },

  // Check if user can access difficulty level
  canAccessDifficulty: (difficulty, completedCourses) => {
    const difficultyOrder = ["Beginner", "Easy", "Moderate", "Difficult"];
    const targetIndex = difficultyOrder.indexOf(difficulty);
    
    if (targetIndex === 0) return true; // Beginner always accessible
    
    const prerequisite = difficultyOrder[targetIndex - 1];
    return completedCourses.includes(prerequisite);
  },

  // Calculate course progress
  calculateCourseProgress: (difficulty, completedUnits, finalExamScore) => {
    const course = FRENCH_MINI_COURSES_DATA.COURSE_DIFFICULTIES[difficulty];
    if (!course) return 0;

    const unitProgress = (completedUnits.length / course.totalUnits) * 80; // Units worth 80%
    const examProgress = finalExamScore ? 20 : 0; // Final exam worth 20%
    
    return Math.min(100, unitProgress + examProgress);
  },

  // Get next recommended unit
  getNextUnit: (difficulty, completedUnits) => {
    const course = FRENCH_MINI_COURSES_DATA.COURSE_DIFFICULTIES[difficulty];
    if (!course) return null;

    return course.units.find(unit => !completedUnits.includes(unit.id));
  },

  // Check final exam eligibility
  canTakeFinalExam: (difficulty, completedUnits) => {
    const course = FRENCH_MINI_COURSES_DATA.COURSE_DIFFICULTIES[difficulty];
    if (!course) return false;

    return completedUnits.length === course.totalUnits;
  },

  // Get course completion status
  getCourseCompletionStatus: (difficulty, completedUnits, finalExamScore) => {
    const course = FRENCH_MINI_COURSES_DATA.COURSE_DIFFICULTIES[difficulty];
    if (!course) return "not_started";

    const allUnitsCompleted = completedUnits.length === course.totalUnits;
    const examPassed = finalExamScore >= course.passThreshold;

    if (examPassed) return "completed";
    if (allUnitsCompleted) return "ready_for_exam";
    if (completedUnits.length > 0) return "in_progress";
    return "not_started";
  },

  // Generate study plan
  generateStudyPlan: (difficulty, hoursPerWeek) => {
    const course = FRENCH_MINI_COURSES_DATA.COURSE_DIFFICULTIES[difficulty];
    if (!course) return null;

    const unitsPerWeek = Math.ceil(hoursPerWeek / 2); // Estimate 2 hours per unit
    const weeksNeeded = Math.ceil(course.totalUnits / unitsPerWeek);
    
    return {
      difficulty,
      totalWeeks: weeksNeeded,
      unitsPerWeek,
      hoursPerWeek,
      estimatedCompletion: `${weeksNeeded} weeks`,
      dailyCommitment: `${Math.ceil(hoursPerWeek / 7)} hours per day`
    };
  },

  // Get all available difficulties in order
  getAllDifficulties: () => {
    return Object.values(FRENCH_MINI_COURSES_DATA.COURSE_DIFFICULTIES)
      .sort((a, b) => a.order - b.order);
  },

  // Get course statistics
  getCourseStatistics: () => {
    const difficulties = Object.values(FRENCH_MINI_COURSES_DATA.COURSE_DIFFICULTIES);
    
    return {
      totalCourses: difficulties.length,
      totalUnits: difficulties.reduce((sum, course) => sum + course.totalUnits, 0),
      totalQuestions: difficulties.reduce((sum, course) => sum + course.totalQuestions, 0),
      totalVerbs: 13,
      totalTenses: 9,
      progressionSystem: "90% mastery requirement"
    };
  }
};