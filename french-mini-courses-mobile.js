// French Verb Master - Mini-Courses Data Export for React Native Mobile App
// Complete course system with 4-tier difficulty progression, units, and final exams
// Designed for serious French learners targeting fluency

export const FRENCH_MINI_COURSES_DATA = {
  // Course System Overview
  COURSE_SYSTEM: {
    title: "French Verb Master Mini-Courses",
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
          certificate: "French Verb Master Certificate",
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