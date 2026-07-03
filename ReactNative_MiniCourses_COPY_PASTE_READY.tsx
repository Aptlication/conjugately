/*
======================================================================================
COMPLETE REACT NATIVE Conjugately MINI-COURSES COMPONENT
======================================================================================

COPY AND PASTE INSTRUCTIONS:
1. Copy this entire file into your React Native project
2. Install dependencies: npm install expo-linear-gradient react-native-vector-icons
3. Import and use the MiniCoursesScreen component
4. Complete 4-tier structured learning system with sequential progression

DEPENDENCIES TO INSTALL:
npm install expo-linear-gradient react-native-vector-icons

FOR iOS: cd ios && pod install
FOR ANDROID: Add to android/app/build.gradle:
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

======================================================================================
*/

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
  Animated,
  Modal,
  FlatList,
  Vibration,
  Alert,
} from 'react-native';

// UNCOMMENT THESE AFTER INSTALLING DEPENDENCIES:
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

// ======================================================================================
// INTERFACES
// ======================================================================================

interface CourseUnit {
  id: string;
  unitNumber: number;
  name: string;
  verb: string;
  meaning: string;
  description: string;
  example: string;
  importance: string;
  questionsCount: number;
  icon: string;
  difficulty: string;
  reflexive?: boolean;
  tips?: string[];
  commonMistakes?: string[];
}

interface FinalExam {
  id: string;
  title: string;
  description: string;
  totalQuestions: number;
  questionsPerVerb: number;
  passThreshold: number;
  passingPercentage: number;
  timeFrames: string[];
  format: string;
  tips?: string[];
}

interface CourseDifficulty {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  totalUnits: number;
  totalQuestions: number;
  finalExamQuestions: number;
  passThreshold: number;
  verbs: string[];
  timeFrames: string[];
  tenses: string[];
  estimatedDuration: string;
  prerequisite: string;
  units: CourseUnit[];
  finalExam: FinalExam;
}

interface UserProgress {
  courseType: string;
  timeFrame: string;
  currentVerbIndex: number;
  completedVerbs: string[];
  totalScore: number;
  totalQuestions: number;
  isCompleted: boolean;
  examPassed?: boolean;
}

interface CompletedCourse {
  courseType: string;
  timeFrame: string;
  tense: string;
  totalScore: number;
  totalQuestions: number;
  examScore: number;
  examPassed: boolean;
}

interface MiniCoursesScreenProps {
  onStartUnit?: (courseType: string, timeFrame: string, unitIndex: number) => void;
  onStartFinalExam?: (courseType: string, timeFrame: string) => void;
  onNavigateBack?: () => void;
  userProgress?: UserProgress[];
  completedCourses?: CompletedCourse[];
}

// ======================================================================================
// COMPREHENSIVE COURSE DATA
// ======================================================================================

const FRENCH_MINI_COURSES_DATA: Record<string, CourseDifficulty> = {
  "Beginner": {
    id: "beginner",
    order: 1,
    title: "Beginner Course",
    subtitle: "Master the 4 most essential French verbs",
    description: "Start your French journey with the fundamental verbs that form the foundation of the language.",
    icon: "🌱",
    totalUnits: 4,
    totalQuestions: 80,
    finalExamQuestions: 40,
    passThreshold: 36,
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
    totalQuestions: 120,
    finalExamQuestions: 60,
    passThreshold: 54,
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
    totalQuestions: 160,
    finalExamQuestions: 80,
    passThreshold: 72,
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
        importance: "Master compound tenses and advanced constructions",
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
        importance: "Essential for expressing experiences and states",
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
        importance: "Critical for describing activities and weather",
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
        importance: "Fundamental for all conversation and storytelling",
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
        importance: "Essential for expressing movement and plans",
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
    subtitle: "Master all 13 verbs with complex tenses",
    description: "Complete mastery with advanced verb forms, conditional tenses, and complex expressions.",
    icon: "🎯",
    totalUnits: 13,
    totalQuestions: 260,
    finalExamQuestions: 130,
    passThreshold: 117,
    verbs: ["être", "avoir", "faire", "dire", "aller", "voir", "savoir", "pouvoir", "vouloir", "venir", "se lever", "s'appeler", "se sentir"],
    timeFrames: ["Present", "Past", "Future", "Conditional"],
    tenses: ["Présent", "Passé Composé", "Imparfait", "Futur Simple", "Conditionnel", "Plus-que-parfait"],
    estimatedDuration: "6-8 weeks",
    prerequisite: "Complete Moderate Course with 90% final exam score",
    units: [
      {
        id: "difficult_unit_1",
        unitNumber: 1,
        name: "Unit 1: être (to be)",
        verb: "être",
        meaning: "to be",
        description: "Complete mastery of être in all tenses including conditional and subjunctive forms.",
        example: "Si j'étais riche, je serais content. (If I were rich, I would be happy.)",
        importance: "Foundation for advanced French expression",
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
        description: "Master avoir in complex constructions and advanced expressions.",
        example: "J'aurais voulu le voir. (I would have liked to see him.)",
        importance: "Essential for all advanced tense formations",
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
        description: "Advanced faire in conditional and complex idiomatic expressions.",
        example: "Que feriez-vous à ma place? (What would you do in my place?)",
        importance: "Critical for advanced communication",
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
        description: "Complex communication patterns in all tenses and moods.",
        example: "Il dit qu'il viendrait si possible. (He says he would come if possible.)",
        importance: "Essential for sophisticated expression",
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
        description: "Advanced movement expressions and conditional constructions.",
        example: "Où iriez-vous en vacances? (Where would you go on vacation?)",
        importance: "Key for expressing hypothetical situations",
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
        description: "Advanced perception verbs and metaphorical uses.",
        example: "J'aimerais voir ce qui se passe. (I would like to see what's happening.)",
        importance: "Important for advanced comprehension",
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
        description: "Distinguish savoir vs. connaître in complex contexts.",
        example: "Sauriez-vous me dire l'heure? (Could you tell me the time?)",
        importance: "Essential for expressing knowledge and ability",
        questionsCount: 20,
        icon: "🧠",
        difficulty: "Difficult"
      },
      {
        id: "difficult_unit_8",
        unitNumber: 8,
        name: "Unit 8: pouvoir (can/to be able)",
        verb: "pouvoir",
        meaning: "can/to be able",
        description: "Express ability, possibility, and permission in all tenses.",
        example: "Pourriez-vous m'aider? (Could you help me?)",
        importance: "Critical for polite requests and possibilities",
        questionsCount: 20,
        icon: "💪",
        difficulty: "Difficult"
      },
      {
        id: "difficult_unit_9",
        unitNumber: 9,
        name: "Unit 9: vouloir (to want)",
        verb: "vouloir",
        meaning: "to want",
        description: "Express desires, wishes, and polite requests.",
        example: "Je voudrais un café, s'il vous plaît. (I would like a coffee, please.)",
        importance: "Essential for expressing desires politely",
        questionsCount: 20,
        icon: "❤️",
        difficulty: "Difficult"
      },
      {
        id: "difficult_unit_10",
        unitNumber: 10,
        name: "Unit 10: venir (to come)",
        verb: "venir",
        meaning: "to come",
        description: "Movement toward speaker and recent past constructions.",
        example: "Je viens de finir mes devoirs. (I just finished my homework.)",
        importance: "Important for expressing recent actions",
        questionsCount: 20,
        icon: "🔄",
        difficulty: "Difficult"
      },
      {
        id: "difficult_unit_11",
        unitNumber: 11,
        name: "Unit 11: se lever (to get up)",
        verb: "se lever",
        meaning: "to get up",
        description: "Advanced reflexive patterns in all tenses.",
        example: "Si je me levais plus tôt, j'aurais plus de temps. (If I got up earlier, I would have more time.)",
        importance: "Master reflexive constructions",
        questionsCount: 20,
        icon: "🌅",
        difficulty: "Difficult",
        reflexive: true
      },
      {
        id: "difficult_unit_12",
        unitNumber: 12,
        name: "Unit 12: s'appeler (to be called)",
        verb: "s'appeler",
        meaning: "to be called/named",
        description: "Complex identity expressions and formal introductions.",
        example: "Comment s'appellerait votre entreprise? (What would your company be called?)",
        importance: "Advanced identity and naming patterns",
        questionsCount: 20,
        icon: "🏷️",
        difficulty: "Difficult",
        reflexive: true
      },
      {
        id: "difficult_unit_13",
        unitNumber: 13,
        name: "Unit 13: se sentir (to feel)",
        verb: "se sentir",
        meaning: "to feel",
        description: "Complex emotional and physical expressions.",
        example: "Comment vous sentiriez-vous dans cette situation? (How would you feel in this situation?)",
        importance: "Advanced emotional expression",
        questionsCount: 20,
        icon: "🎭",
        difficulty: "Difficult",
        reflexive: true
      }
    ],
    finalExam: {
      id: "difficult_final_exam",
      title: "Difficult Final Exam",
      description: "Master-level test covering all 13 verbs in complex tenses",
      totalQuestions: 130,
      questionsPerVerb: 10,
      passThreshold: 117,
      passingPercentage: 90,
      timeFrames: ["Present", "Past", "Future", "Conditional"],
      format: "Advanced patterns with complex constructions",
      tips: [
        "Review all conditional and subjunctive forms",
        "Practice reflexive verb agreements",
        "Focus on complex time relationships"
      ]
    }
  }
};

// ======================================================================================
// MAIN MINI-COURSES COMPONENT
// ======================================================================================

const MiniCoursesScreen: React.FC<MiniCoursesScreenProps> = ({
  onStartUnit,
  onStartFinalExam,
  onNavigateBack,
  userProgress = [],
  completedCourses = [],
}) => {
  const [selectedCourse, setSelectedCourse] = useState<CourseDifficulty | null>(null);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>('');
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showTimeFrameModal, setShowTimeFrameModal] = useState(false);
  const [showUnitModal, setShowUnitModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<CourseUnit | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const isCourseLocked = (courseOrder: number): boolean => {
    if (courseOrder === 1) return false; // Beginner is always unlocked
    
    const previousCourseTypes = ['beginner', 'easy', 'moderate'];
    const requiredCourseType = previousCourseTypes[courseOrder - 2];
    
    return !completedCourses.some(course => 
      course.courseType === requiredCourseType && 
      course.examPassed
    );
  };

  const getCourseProgress = (courseType: string, timeFrame: string): UserProgress | null => {
    return userProgress.find(progress => 
      progress.courseType === courseType && 
      progress.timeFrame === timeFrame
    ) || null;
  };

  const isCourseCompleted = (courseType: string, timeFrame: string): boolean => {
    return completedCourses.some(course => 
      course.courseType === courseType && 
      course.timeFrame === timeFrame && 
      course.examPassed
    );
  };

  const handleCourseSelect = (course: CourseDifficulty) => {
    if (isCourseLocked(course.order)) {
      const prerequisiteCourse = course.order === 2 ? 'Beginner' : 
                                 course.order === 3 ? 'Easy' : 'Moderate';
      Alert.alert(
        'Course Locked',
        `Complete the ${prerequisiteCourse} course with 90% on the final exam to unlock this course.`,
        [{ text: 'OK' }]
      );
      return;
    }
    
    setSelectedCourse(course);
    setShowCourseModal(true);
    
    if (Platform.OS === 'ios') {
      Vibration.vibrate();
    } else {
      Vibration.vibrate(50);
    }
  };

  const handleTimeFrameSelect = (timeFrame: string) => {
    setSelectedTimeFrame(timeFrame);
    setShowTimeFrameModal(false);
    setShowCourseModal(true);
  };

  const handleUnitSelect = (unit: CourseUnit) => {
    setSelectedUnit(unit);
    setShowUnitModal(true);
  };

  const handleStartUnit = (unit: CourseUnit) => {
    if (onStartUnit && selectedCourse) {
      onStartUnit(selectedCourse.id, selectedTimeFrame, unit.unitNumber - 1);
    }
    setShowUnitModal(false);
  };

  const handleStartFinalExam = () => {
    if (onStartFinalExam && selectedCourse) {
      onStartFinalExam(selectedCourse.id, selectedTimeFrame);
    }
    setShowCourseModal(false);
  };

  const renderCourseCard = (course: CourseDifficulty) => {
    const isLocked = isCourseLocked(course.order);
    const completedCount = course.timeFrames.filter(timeFrame => 
      isCourseCompleted(course.id, timeFrame)
    ).length;
    
    const progressCount = course.timeFrames.filter(timeFrame => 
      getCourseProgress(course.id, timeFrame) !== null
    ).length;

    const getCardColor = (courseId: string) => {
      switch (courseId) {
        case 'beginner': return ['#4A90E2', '#357ABD'];
        case 'easy': return ['#7ED321', '#5BA516'];
        case 'moderate': return ['#F5A623', '#D4941B'];
        case 'difficult': return ['#D0021B', '#A50216'];
        default: return ['#6C63FF', '#5A52CC'];
      }
    };

    const cardColors = getCardColor(course.id);

    return (
      <Animated.View 
        key={course.id}
        style={[
          styles.courseCard,
          isLocked && styles.courseCardLocked,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
        ]}
      >
        <TouchableOpacity
          onPress={() => handleCourseSelect(course)}
          disabled={isLocked}
          style={styles.courseCardContent}
        >
          <LinearGradient
            colors={isLocked ? ['#4A4A5A', '#2A2A3A'] : cardColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.courseCardGradient}
          >
            {isLocked && (
              <View style={styles.lockOverlay}>
                <Icon name="lock" size={24} color="#FFFFFF" />
              </View>
            )}
            
            <View style={styles.courseCardHeader}>
              <Text style={styles.courseIcon}>{course.icon}</Text>
              <View style={styles.courseProgress}>
                <Text style={styles.progressText}>
                  {completedCount}/{course.timeFrames.length} completed
                </Text>
                {progressCount > completedCount && (
                  <Text style={styles.progressInProgress}>
                    {progressCount - completedCount} in progress
                  </Text>
                )}
              </View>
            </View>
            
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseSubtitle}>{course.subtitle}</Text>
            <Text style={styles.courseDescription}>{course.description}</Text>
            
            <View style={styles.courseStats}>
              <View style={styles.statItem}>
                <Icon name="book" size={16} color="#FFFFFF" />
                <Text style={styles.statText}>{course.totalUnits} Units</Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="quiz" size={16} color="#FFFFFF" />
                <Text style={styles.statText}>{course.totalQuestions} Questions</Text>
              </View>
              <View style={styles.statItem}>
                <Icon name="schedule" size={16} color="#FFFFFF" />
                <Text style={styles.statText}>{course.estimatedDuration}</Text>
              </View>
            </View>
            
            <Text style={styles.prerequisite}>
              {isLocked ? '🔒 ' : '✅ '}{course.prerequisite}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderUnitCard = (unit: CourseUnit, index: number) => {
    const progress = selectedCourse && selectedTimeFrame ? 
      getCourseProgress(selectedCourse.id, selectedTimeFrame) : null;
    const isCompleted = progress?.completedVerbs.includes(unit.verb) || false;
    const isCurrent = progress?.currentVerbIndex === index;
    const isAvailable = !progress || progress.currentVerbIndex >= index;

    return (
      <TouchableOpacity
        key={unit.id}
        style={[
          styles.unitCard,
          isCompleted && styles.unitCardCompleted,
          isCurrent && styles.unitCardCurrent,
          !isAvailable && styles.unitCardLocked
        ]}
        onPress={() => isAvailable ? handleUnitSelect(unit) : null}
        disabled={!isAvailable}
      >
        <View style={styles.unitCardContent}>
          <View style={styles.unitHeader}>
            <Text style={styles.unitIcon}>{unit.icon}</Text>
            <View style={styles.unitInfo}>
              <Text style={styles.unitName}>{unit.name}</Text>
              <Text style={styles.unitMeaning}>{unit.meaning}</Text>
            </View>
            <View style={styles.unitStatus}>
              {isCompleted && <Icon name="check-circle" size={24} color="#4CAF50" />}
              {isCurrent && <Icon name="play-arrow" size={24} color="#FF9800" />}
              {!isAvailable && <Icon name="lock" size={24} color="#757575" />}
            </View>
          </View>
          
          <Text style={styles.unitDescription}>{unit.description}</Text>
          <Text style={styles.unitExample}>{unit.example}</Text>
          
          <View style={styles.unitFooter}>
            <Text style={styles.unitQuestions}>{unit.questionsCount} Questions</Text>
            {unit.reflexive && (
              <View style={styles.reflexiveBadge}>
                <Text style={styles.reflexiveText}>Reflexive</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4C1D95" />
      <LinearGradient
        colors={['#4C1D95', '#7C3AED', '#A855F7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View 
            style={[
              styles.header,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
            ]}
          >
            <TouchableOpacity
              style={styles.backButton}
              onPress={onNavigateBack}
            >
              <Icon name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
              <Text style={styles.mainTitle}>📚 Mini-Courses</Text>
              <Text style={styles.subtitle}>Structured learning for serious students</Text>
              <Text style={styles.description}>
                Master French verb conjugations through progressive difficulty levels. 
                Each course builds upon the previous, requiring 90% mastery to advance.
              </Text>
            </View>
          </Animated.View>

          {/* Course Cards */}
          <View style={styles.coursesContainer}>
            {Object.values(FRENCH_MINI_COURSES_DATA).map(course => 
              renderCourseCard(course)
            )}
          </View>
        </ScrollView>

        {/* Course Details Modal */}
        <Modal
          visible={showCourseModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowCourseModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.courseModalContainer}>
              {selectedCourse && (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.courseModalHeader}>
                    <Text style={styles.courseModalTitle}>
                      {selectedCourse.icon} {selectedCourse.title}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setShowCourseModal(false)}
                      style={styles.closeButton}
                    >
                      <Icon name="close" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.courseModalSubtitle}>{selectedCourse.subtitle}</Text>
                  <Text style={styles.courseModalDescription}>{selectedCourse.description}</Text>

                  {/* Time Frame Selection */}
                  <View style={styles.timeFrameSection}>
                    <Text style={styles.sectionTitle}>Select Time Frame:</Text>
                    {selectedCourse.timeFrames.map(timeFrame => {
                      const isCompleted = isCourseCompleted(selectedCourse.id, timeFrame);
                      const hasProgress = getCourseProgress(selectedCourse.id, timeFrame) !== null;
                      
                      return (
                        <TouchableOpacity
                          key={timeFrame}
                          style={[
                            styles.timeFrameButton,
                            selectedTimeFrame === timeFrame && styles.timeFrameButtonSelected,
                            isCompleted && styles.timeFrameButtonCompleted
                          ]}
                          onPress={() => setSelectedTimeFrame(timeFrame)}
                        >
                          <Text style={styles.timeFrameText}>{timeFrame}</Text>
                          <View style={styles.timeFrameStatus}>
                            {isCompleted && <Icon name="check-circle" size={20} color="#4CAF50" />}
                            {hasProgress && !isCompleted && <Icon name="play-arrow" size={20} color="#FF9800" />}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  {/* Course Content */}
                  {selectedTimeFrame && (
                    <View style={styles.courseContent}>
                      <Text style={styles.sectionTitle}>Course Units:</Text>
                      {selectedCourse.units.map((unit, index) => renderUnitCard(unit, index))}
                      
                      {/* Final Exam */}
                      <View style={styles.finalExamSection}>
                        <Text style={styles.sectionTitle}>Final Exam:</Text>
                        <TouchableOpacity
                          style={styles.finalExamCard}
                          onPress={handleStartFinalExam}
                        >
                          <View style={styles.finalExamContent}>
                            <Text style={styles.finalExamIcon}>🏆</Text>
                            <View style={styles.finalExamInfo}>
                              <Text style={styles.finalExamTitle}>
                                {selectedCourse.finalExam.title}
                              </Text>
                              <Text style={styles.finalExamDescription}>
                                {selectedCourse.finalExam.description}
                              </Text>
                              <Text style={styles.finalExamStats}>
                                {selectedCourse.finalExam.totalQuestions} questions • 
                                90% required to pass • Unlocks next level
                              </Text>
                            </View>
                            <Icon name="arrow-forward" size={24} color="#FFFFFF" />
                          </View>
                        </TouchableOpacity>
                      </div>
                    )}
                </ScrollView>
              )}
            </View>
          </View>
        </Modal>

        {/* Unit Details Modal */}
        <Modal
          visible={showUnitModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowUnitModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.unitModalContainer}>
              {selectedUnit && (
                <>
                  <View style={styles.unitModalHeader}>
                    <Text style={styles.unitModalTitle}>
                      {selectedUnit.icon} {selectedUnit.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => setShowUnitModal(false)}
                      style={styles.closeButton}
                    >
                      <Icon name="close" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>

                  <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.unitModalDescription}>
                      {selectedUnit.description}
                    </Text>
                    
                    <View style={styles.unitModalExample}>
                      <Text style={styles.exampleTitle}>Example:</Text>
                      <Text style={styles.exampleText}>{selectedUnit.example}</Text>
                    </View>

                    <View style={styles.unitModalImportance}>
                      <Text style={styles.importanceTitle}>Why It Matters:</Text>
                      <Text style={styles.importanceText}>{selectedUnit.importance}</Text>
                    </View>

                    {selectedUnit.tips && (
                      <View style={styles.unitModalTips}>
                        <Text style={styles.tipsTitle}>💡 Learning Tips:</Text>
                        {selectedUnit.tips.map((tip, index) => (
                          <Text key={index} style={styles.tipItem}>• {tip}</Text>
                        ))}
                      </View>
                    )}

                    {selectedUnit.commonMistakes && (
                      <View style={styles.unitModalMistakes}>
                        <Text style={styles.mistakesTitle}>⚠️ Common Mistakes:</Text>
                        {selectedUnit.commonMistakes.map((mistake, index) => (
                          <Text key={index} style={styles.mistakeItem}>• {mistake}</Text>
                        ))}
                      </View>
                    )}

                    <TouchableOpacity
                      style={styles.startUnitButton}
                      onPress={() => handleStartUnit(selectedUnit)}
                    >
                      <Icon name="play-arrow" size={24} color="#FFFFFF" />
                      <Text style={styles.startUnitButtonText}>
                        Start Unit ({selectedUnit.questionsCount} Questions)
                      </Text>
                    </TouchableOpacity>
                  </ScrollView>
                </>
              )}
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </SafeAreaView>
  );
};

// ======================================================================================
// STYLES
// ======================================================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    marginBottom: 16,
  },
  headerContent: {
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#E0E7FF',
    fontStyle: 'italic',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#C7D2FE',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  coursesContainer: {
    gap: 20,
  },
  courseCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  courseCardLocked: {
    opacity: 0.6,
  },
  courseCardContent: {
    flex: 1,
  },
  courseCardGradient: {
    padding: 24,
    minHeight: 200,
    position: 'relative',
  },
  lockOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 8,
  },
  courseCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  courseIcon: {
    fontSize: 48,
  },
  courseProgress: {
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  progressInProgress: {
    fontSize: 12,
    color: '#E0E7FF',
    marginTop: 2,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  courseSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#E0E7FF',
    marginBottom: 12,
  },
  courseDescription: {
    fontSize: 14,
    color: '#C7D2FE',
    lineHeight: 20,
    marginBottom: 16,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  prerequisite: {
    fontSize: 12,
    color: '#E0E7FF',
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseModalContainer: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    width: width - 40,
    maxHeight: '90%',
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  courseModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  courseModalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  courseModalSubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A855F7',
    marginBottom: 8,
  },
  courseModalDescription: {
    fontSize: 14,
    color: '#C7D2FE',
    lineHeight: 20,
    marginBottom: 24,
  },
  timeFrameSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  timeFrameButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  timeFrameButtonSelected: {
    borderColor: '#A855F7',
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
  },
  timeFrameButtonCompleted: {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  timeFrameText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  timeFrameStatus: {
    flexDirection: 'row',
  },
  courseContent: {
    marginTop: 16,
  },
  unitCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  unitCardCompleted: {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  unitCardCurrent: {
    borderColor: '#FF9800',
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  unitCardLocked: {
    opacity: 0.5,
  },
  unitCardContent: {
    flex: 1,
  },
  unitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  unitIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  unitInfo: {
    flex: 1,
  },
  unitName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  unitMeaning: {
    fontSize: 14,
    color: '#A855F7',
    fontStyle: 'italic',
  },
  unitStatus: {
    marginLeft: 8,
  },
  unitDescription: {
    fontSize: 14,
    color: '#C7D2FE',
    lineHeight: 18,
    marginBottom: 8,
  },
  unitExample: {
    fontSize: 13,
    color: '#E0E7FF',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  unitFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unitQuestions: {
    fontSize: 12,
    color: '#A855F7',
    fontWeight: '600',
  },
  reflexiveBadge: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  reflexiveText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  finalExamSection: {
    marginTop: 24,
  },
  finalExamCard: {
    backgroundColor: 'rgba(255, 193, 7, 0.2)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#FFC107',
  },
  finalExamContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  finalExamIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  finalExamInfo: {
    flex: 1,
    marginRight: 12,
  },
  finalExamTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  finalExamDescription: {
    fontSize: 14,
    color: '#E0E7FF',
    marginBottom: 8,
  },
  finalExamStats: {
    fontSize: 12,
    color: '#FFC107',
    fontWeight: '600',
  },
  unitModalContainer: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    width: width - 40,
    maxHeight: '80%',
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  unitModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  unitModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    flex: 1,
  },
  unitModalDescription: {
    fontSize: 16,
    color: '#C7D2FE',
    lineHeight: 22,
    marginBottom: 16,
  },
  unitModalExample: {
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeft: 4,
    borderLeftColor: '#A855F7',
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A855F7',
    marginBottom: 4,
  },
  exampleText: {
    fontSize: 14,
    color: '#E0E7FF',
    fontStyle: 'italic',
  },
  unitModalImportance: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeft: 4,
    borderLeftColor: '#4CAF50',
  },
  importanceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 4,
  },
  importanceText: {
    fontSize: 14,
    color: '#C7D2FE',
  },
  unitModalTips: {
    backgroundColor: 'rgba(255, 193, 7, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderLeft: 4,
    borderLeftColor: '#FFC107',
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFC107',
    marginBottom: 8,
  },
  tipItem: {
    fontSize: 13,
    color: '#E0E7FF',
    marginBottom: 4,
  },
  unitModalMistakes: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
    borderLeft: 4,
    borderLeftColor: '#F44336',
  },
  mistakesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F44336',
    marginBottom: 8,
  },
  mistakeItem: {
    fontSize: 13,
    color: '#E0E7FF',
    marginBottom: 4,
  },
  startUnitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startUnitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});

// ======================================================================================
// USAGE EXAMPLE
// ======================================================================================

const App = () => {
  const [userProgress, setUserProgress] = useState<UserProgress[]>([
    {
      courseType: 'beginner',
      timeFrame: 'Present',
      currentVerbIndex: 2,
      completedVerbs: ['être', 'avoir'],
      totalScore: 38,
      totalQuestions: 40,
      isCompleted: false,
    }
  ]);

  const [completedCourses, setCompletedCourses] = useState<CompletedCourse[]>([
    {
      courseType: 'beginner',
      timeFrame: 'Past',
      tense: 'Passé Simple',
      totalScore: 72,
      totalQuestions: 80,
      examScore: 37,
      examPassed: true,
    }
  ]);

  const handleStartUnit = (courseType: string, timeFrame: string, unitIndex: number) => {
    console.log(`Starting ${courseType} - ${timeFrame} - Unit ${unitIndex + 1}`);
    // Navigate to quiz screen
  };

  const handleStartFinalExam = (courseType: string, timeFrame: string) => {
    console.log(`Starting final exam: ${courseType} - ${timeFrame}`);
    // Navigate to final exam
  };

  const handleNavigateBack = () => {
    console.log('Navigating back to main menu');
    // Navigate back to main screen
  };

  return (
    <MiniCoursesScreen
      onStartUnit={handleStartUnit}
      onStartFinalExam={handleStartFinalExam}
      onNavigateBack={handleNavigateBack}
      userProgress={userProgress}
      completedCourses={completedCourses}
    />
  );
};

export default MiniCoursesScreen;