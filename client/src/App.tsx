import { useState, useEffect } from "react";
import { Link } from "wouter";

function App() {
  // French Verb Master - No reminder version
  const [selectedVerb, setSelectedVerb] = useState("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("");
  const [selectedTenseType, setSelectedTenseType] = useState("");
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [showMiniCoursesModal, setShowMiniCoursesModal] = useState(false);
  const [showNoviceCourseModal, setShowNoviceCourseModal] = useState(false);
  const [showBeginnerCourseModal, setShowBeginnerCourseModal] = useState(false);
  const [showElementaryCourseModal, setShowElementaryCourseModal] = useState(false);
  const [showIntermediateCourseModal, setShowIntermediateCourseModal] = useState(false);
  const [showAdvancedCourseModal, setShowAdvancedCourseModal] = useState(false);
  const [showBeginnerPronounGuide, setShowBeginnerPronounGuide] = useState(false);
  const [beginnerGuideShown, setBeginnerGuideShown] = useState(() => {
    return localStorage.getItem('beginnerPronounGuideShown') === 'true';
  });
  const [quizState, setQuizState] = useState<'config' | 'loading' | 'active' | 'results'>('config');
  const [quizData, setQuizData] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showInstructionPopup, setShowInstructionPopup] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  // Load completed courses and progress on app start
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const [completedResponse, progressResponse] = await Promise.all([
        fetch('/api/completed-courses/1'),
        fetch('/api/course-progress/1')
      ]);
      
      if (completedResponse.ok) {
        const completedData = await completedResponse.json();
        setCompletedCourses(completedData.completedCourses || []);
      }
      
      if (progressResponse.ok) {
        const progressData = await progressResponse.json();
        setCourseProgressData(progressData.progress || []);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleResetCourse = async (courseType: string, timeFrame: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering the course button click
    
    if (!confirm(`Are you sure you want to reset the ${courseType} ${timeFrame} course? This will mark it as not passed and allow you to retake it.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/completed-courses/1/${courseType}/${timeFrame}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadUserData(); // Refresh the data
        alert('Course reset successfully! You can now retake it.');
      } else {
        const errorData = await response.json();
        alert(`Failed to reset course: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error resetting course:', error);
      alert('Failed to reset course. Please try again.');
    }
  };
  const [courseInfo, setCourseInfo] = useState<{
    timeFrame: string;
    tense: string;
    currentVerbIndex: number;
    completedVerbs: Array<{verb: string, score: number}>;
    totalScore: number;
    totalQuestions: number;
    isFinalExam?: boolean;
    courseLevel?: string;
  } | null>(null);
  const [showCourseProgress, setShowCourseProgress] = useState(false);
  const [showExamOption, setShowExamOption] = useState(false);
  const [completedCourses, setCompletedCourses] = useState<any[]>([]);
  const [courseProgressData, setCourseProgressData] = useState<any[]>([]);


  // Most used French verbs in order of frequency - including reflexive verbs for complete coverage
  const FRENCH_VERBS = ["être", "avoir", "faire", "dire", "aller", "voir", "savoir", "pouvoir", "vouloir", "venir", "se lever", "s'appeler", "se sentir", "se laver", "se réveiller", "s'habiller"];
  
  // Verb meanings mapping for dropdown display
  const VERB_MEANINGS = {
    "être": "to be",
    "avoir": "to have", 
    "faire": "to do/make",
    "dire": "to say/tell",
    "aller": "to go",
    "voir": "to see",
    "savoir": "to know",
    "pouvoir": "to be able to/can",
    "vouloir": "to want",
    "venir": "to come",
    "se lever": "to get up",
    "s'appeler": "to be called",
    "se sentir": "to feel",
    "se laver": "to wash oneself",
    "se réveiller": "to wake up",
    "s'habiller": "to get dressed"
  };
  
  const TIME_FRAMES = {
    "Present": ["Présent"], // Only present simple for basic levels 
    "Past": ["Passé Simple", "Passé Composé", "Imparfait", "Plus-que-parfait"],
    "Future": ["Futur Simple", "Futur Antérieur", "Futur Proche"],
  };

  const DIFFICULTY_CONFIGS = {
    "Beginner": { 
      verbs: ["être", "avoir", "faire"], // 3 most used verbs for beginner pronoun focus
      timeFrames: ["Present", "Past", "Future"], 
      tenses: ["Présent", "Passé Composé", "Futur Simple"],
      simpleFormat: true, // Focus on subject pronouns (Je suis, Tu es, Il est, etc.)
      courseStructure: {
        units: [
          { name: "Unit 1: être (to be)", verb: "être", questions: 20 },
          { name: "Unit 2: avoir (to have)", verb: "avoir", questions: 20 },
          { name: "Unit 3: faire (to do/make)", verb: "faire", questions: 20 }
        ],
        finalExam: { 
          questions: 30, 
          questionsPerVerb: 10, 
          passThreshold: 27,
          description: "10 questions from each of the 3 verbs"
        }
      }
    },
    "Novice": { 
      verbs: ["être", "avoir", "faire", "aller"], // 4 most used verbs for novice (now includes aller)
      timeFrames: ["Present", "Past", "Future"], 
      tenses: ["Présent", "Passé Composé", "Futur Simple"],
      simpleFormat: true, // Use subject+verb format (Je suis, Tu es) instead of full sentences
      courseStructure: {
        units: [
          { name: "Unit 1: être (to be)", verb: "être", questions: 20 },
          { name: "Unit 2: avoir (to have)", verb: "avoir", questions: 20 },
          { name: "Unit 3: faire (to do/make)", verb: "faire", questions: 20 },
          { name: "Unit 4: aller (to go)", verb: "aller", questions: 20 }
        ],
        finalExam: { 
          questions: 40, 
          questionsPerVerb: 10, 
          passThreshold: 36,
          description: "10 questions from each of the 4 verbs"
        }
      }
    },
    "Elementary": { 
      verbs: ["être", "avoir", "faire", "dire", "aller", "voir"], // 6 most used verbs
      timeFrames: ["Present", "Past", "Future"], 
      tenses: ["Présent", "Passé Composé", "Futur Simple"],
      courseStructure: {
        units: [
          { name: "Unit 1: être (to be)", verb: "être", questions: 20 },
          { name: "Unit 2: avoir (to have)", verb: "avoir", questions: 20 },
          { name: "Unit 3: faire (to do/make)", verb: "faire", questions: 20 },
          { name: "Unit 4: dire (to say)", verb: "dire", questions: 20 },
          { name: "Unit 5: aller (to go)", verb: "aller", questions: 20 },
          { name: "Unit 6: voir (to see)", verb: "voir", questions: 20 }
        ],
        finalExam: { 
          questions: 60, 
          questionsPerVerb: 10, 
          passThreshold: 54,
          description: "10 questions from each of the 6 verbs"
        }
      }
    },
    "Intermediate": { 
      verbs: ["être", "avoir", "faire", "aller", "voir", "dire", "pouvoir", "vouloir", "prendre", "venir", "savoir"], // All 11 intermediate verbs complete
      timeFrames: ["Present", "Past", "Future"], 
      tenses: ["Présent", "Passé Composé", "Futur Simple", "Imparfait"], // 4 tenses as implemented
      courseStructure: {
        units: [
          { name: "Unit 1: être (to be)", verb: "être", questions: 20 },
          { name: "Unit 2: avoir (to have)", verb: "avoir", questions: 20 },
          { name: "Unit 3: faire (to do/make)", verb: "faire", questions: 20 },
          { name: "Unit 4: aller (to go)", verb: "aller", questions: 20 },
          { name: "Unit 5: voir (to see)", verb: "voir", questions: 20 },
          { name: "Unit 6: dire (to say)", verb: "dire", questions: 20 },
          { name: "Unit 7: pouvoir (can/to be able)", verb: "pouvoir", questions: 20 },
          { name: "Unit 8: vouloir (to want)", verb: "vouloir", questions: 20 },
          { name: "Unit 9: prendre (to take)", verb: "prendre", questions: 20 },
          { name: "Unit 10: venir (to come)", verb: "venir", questions: 20 },
          { name: "Unit 11: savoir (to know)", verb: "savoir", questions: 20 }
        ],
        finalExam: { 
          questions: 110, 
          questionsPerVerb: 10, 
          passThreshold: 99,
          description: "10 questions from each of the 11 verbs"
        }
      }
    },
    "Advanced": { 
      verbs: ["être", "avoir", "faire", "dire", "aller", "voir", "savoir", "pouvoir", "vouloir", "venir", "se lever", "s'appeler", "se sentir"], // Complete set with reflexive verbs
      timeFrames: ["Present", "Past", "Future"], 
      tenses: ["Présent", "Passé Composé", "Passé Simple", "Imparfait", "Plus-que-parfait", "Futur Simple"],
      courseStructure: {
        units: [
          { name: "Unit 1: être (to be)", verb: "être", questions: 20 },
          { name: "Unit 2: avoir (to have)", verb: "avoir", questions: 20 },
          { name: "Unit 3: faire (to do/make)", verb: "faire", questions: 20 },
          { name: "Unit 4: dire (to say)", verb: "dire", questions: 20 },
          { name: "Unit 5: aller (to go)", verb: "aller", questions: 20 },
          { name: "Unit 6: voir (to see)", verb: "voir", questions: 20 },
          { name: "Unit 7: savoir (to know)", verb: "savoir", questions: 20 },
          { name: "Unit 8: pouvoir (can/to be able)", verb: "pouvoir", questions: 20 },
          { name: "Unit 9: vouloir (to want)", verb: "vouloir", questions: 20 },
          { name: "Unit 10: venir (to come)", verb: "venir", questions: 20 },
          { name: "Unit 11: se lever (to get up)", verb: "se lever", questions: 20 },
          { name: "Unit 12: s'appeler (to be called)", verb: "s'appeler", questions: 20 },
          { name: "Unit 13: se sentir (to feel)", verb: "se sentir", questions: 20 }
        ],
        finalExam: { 
          questions: 130, 
          questionsPerVerb: 10, 
          passThreshold: 117,
          description: "10 questions from each of the 13 verbs"
        }
      }
    }
  };

  const handleStartQuiz = async () => {
    // For non-Advanced levels, automatically set tense if not already set
    let finalTenseType = selectedTenseType;
    if (selectedDifficulty !== "Advanced" && !selectedTenseType && selectedTimeFrame) {
      if (selectedDifficulty === "Novice") {
        const beginnerTenseMap = {
          "Past": "Passé Composé",
          "Present": "Présent", 
          "Future": "Futur Simple"
        };
        finalTenseType = beginnerTenseMap[selectedTimeFrame as keyof typeof beginnerTenseMap] || "";
      } else if (selectedDifficulty === "Elementary") {
        const easyTenseMap = {
          "Past": "Passé Composé",
          "Present": "Présent", 
          "Future": "Futur Simple"
        };
        finalTenseType = easyTenseMap[selectedTimeFrame as keyof typeof easyTenseMap] || "";
      } else if (selectedDifficulty === "Intermediate") {
        const moderateTenseMap = {
          "Past": "Passé Composé",
          "Present": "Présent", 
          "Future": "Futur Proche"
        };
        finalTenseType = moderateTenseMap[selectedTimeFrame as keyof typeof moderateTenseMap] || "";
      }
    }
    
    if (!selectedVerb || !selectedTimeFrame || (!finalTenseType && selectedDifficulty === "Advanced")) return;
    
    // Show beginner pronoun guide for Beginner difficulty (if not shown before)
    if (selectedDifficulty === 'Beginner' && !beginnerGuideShown) {
      setShowBeginnerPronounGuide(true);
      return;
    }
    
    setQuizState('loading');

    try {
      const timeFrameMapping = { "Past": "past", "Present": "present", "Future": "future" };
      const response = await fetch('/api/get-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verb: selectedVerb,
          timeFrame: timeFrameMapping[selectedTimeFrame as keyof typeof timeFrameMapping],
          tenseType: finalTenseType,
          ...(selectedDifficulty && { difficulty: selectedDifficulty }),
        }),
      });

      const data = await response.json();
      if (data.success) {
        setQuizData(data.quiz.questions);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setSelectedAnswerIndex(null); // Ensure no answer is pre-selected
        setIsAnswerConfirmed(false); // Reset confirmation state
        setQuizState('active');
        // Only show popup if user hasn't disabled it
        const dontRemindAgain = localStorage.getItem('dontShowInstructionPopup') === 'true';
        if (!dontRemindAgain) {
          setShowInstructionPopup(true);
        }
      } else {
        alert(`Quiz not available: ${data.error}`);
        setQuizState('config');
      }
    } catch (error) {
      alert('Failed to load quiz. Please try again.');
      setQuizState('config');
    }
  };



  const handleChooseVerb = () => {
    const randomVerb = FRENCH_VERBS[Math.floor(Math.random() * FRENCH_VERBS.length)];
    setSelectedVerb(randomVerb);
  };

  const handleChooseTimeFrame = () => {
    const timeFrames = Object.keys(TIME_FRAMES);
    const randomTimeFrame = timeFrames[Math.floor(Math.random() * timeFrames.length)];
    setSelectedTimeFrame(randomTimeFrame);
    setSelectedTenseType("");
  };

  const handleChooseTenseType = () => {
    if (selectedTimeFrame) {
      const tenses = TIME_FRAMES[selectedTimeFrame as keyof typeof TIME_FRAMES];
      const randomTense = tenses[Math.floor(Math.random() * tenses.length)];
      setSelectedTenseType(randomTense);
    }
  };

  const handleDifficultySelect = async (difficulty: keyof typeof DIFFICULTY_CONFIGS) => {
    const config = DIFFICULTY_CONFIGS[difficulty];
    const randomVerb = config.verbs[Math.floor(Math.random() * config.verbs.length)];
    setSelectedVerb(randomVerb);
    const randomTimeFrame = config.timeFrames[Math.floor(Math.random() * config.timeFrames.length)];
    setSelectedTimeFrame(randomTimeFrame);
    let availableTenses: string[] = [];
    if (difficulty === "Elementary") {
      availableTenses = [...config.tenses];
    } else {
      const timeFrameTenses = TIME_FRAMES[randomTimeFrame as keyof typeof TIME_FRAMES] || [];
      availableTenses = timeFrameTenses.filter(tense => config.tenses.includes(tense));
    }
    const randomTense = availableTenses[Math.floor(Math.random() * availableTenses.length)];
    setSelectedTenseType(randomTense);
    setShowDifficultyModal(false);
    setSelectedDifficulty(difficulty);
  };

  const handleStartFinalExam = async (timeFrame: string, tense: string) => {
    const timeFrameMapping = { "Past": "past", "Present": "present", "Future": "future" };
    
    setQuizState('loading');
    
    try {
      // Generate 40 questions total: 10 questions from each of the 4 verbs for final exam
      const allQuestions: any[] = [];
      const beginnerVerbs = ["être", "avoir", "faire", "aller"];
      
      for (const currentVerb of beginnerVerbs) {
        const response = await fetch('/api/get-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            verb: currentVerb,
            timeFrame: timeFrameMapping[timeFrame as keyof typeof timeFrameMapping],
            tenseType: tense,
            difficulty: "Novice",
            isExam: true,
          })
        });

        const data = await response.json();
        if (data.success) {
          // Take exactly 10 questions from each verb for final exam
          allQuestions.push(...data.quiz.questions.slice(0, 10));
        }
      }
      
      // Shuffle all 40 final exam questions (10 from each of the 4 verbs)
      const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
      
      setQuizData(shuffledQuestions); // 40 final exam questions
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setSelectedAnswerIndex(null); // Ensure no answer is pre-selected
      setIsAnswerConfirmed(false); // Reset confirmation state
      setQuizState('active');
      
      // Show instruction popup if not disabled
      const dontRemindAgain = localStorage.getItem('dontShowInstructionPopup') === 'true';
      if (!dontRemindAgain) {
        setShowInstructionPopup(true);
      }
    } catch (error) {
      console.error('Error generating final exam:', error);
      setQuizState('config');
    }
  };

  const handleMiniCourseSelect = (difficulty: string) => {
    if (difficulty === "Beginner") {
      setShowMiniCoursesModal(false);
      setShowBeginnerCourseModal(true);
    } else if (difficulty === "Novice") {
      setShowMiniCoursesModal(false);
      setShowNoviceCourseModal(true);
    } else if (difficulty === "Elementary") {
      setShowMiniCoursesModal(false);
      setShowElementaryCourseModal(true);
    } else if (difficulty === "Intermediate") {
      setShowMiniCoursesModal(false);
      setShowIntermediateCourseModal(true);
    } else if (difficulty === "Advanced") {
      setShowMiniCoursesModal(false);
      setShowAdvancedCourseModal(true);
    }
  };

  const handleBeginnerCourseTimeFrame = async (timeFrame: string) => {
    const beginnerTenseMap = {
      "Past": "Passé Composé",
      "Present": "Présent", 
      "Future": "Futur Simple"
    };
    
    const tense = beginnerTenseMap[timeFrame as keyof typeof beginnerTenseMap];
    
    // Check if course is already completed
    const isCompleted = completedCourses.some(course => 
      course.courseType === "beginner" && 
      course.timeFrame === timeFrame && 
      course.examPassed
    );
    
    if (isCompleted) {
      if (confirm(`You've already completed the ${timeFrame} course with a passing grade. Would you like to reset and retake it?`)) {
        await resetCourse("beginner", timeFrame);
        await loadUserData(); // Refresh data
      } else {
        setShowBeginnerCourseModal(false);
        return;
      }
    }
    
    // Check for existing progress
    const existingProgress = courseProgressData.find(progress => 
      progress.courseType === "beginner" && 
      progress.timeFrame === timeFrame &&
      !progress.isCompleted
    );
    
    if (existingProgress) {
      if (confirm(`You have progress saved for the ${timeFrame} course. Would you like to continue where you left off?`)) {
        // Resume from saved progress
        setCourseInfo({
          timeFrame,
          tense,
          courseLevel: 'Beginner',
          currentVerbIndex: existingProgress.currentVerbIndex,
          completedVerbs: existingProgress.completedVerbs || [],
          totalScore: existingProgress.totalScore,
          totalQuestions: existingProgress.totalQuestions
        });
        
        setShowBeginnerCourseModal(false);
        setQuizState('config'); // Show proper course flow
        return;
      } else {
        // Start fresh - delete existing progress
        await resetCourse("beginner", timeFrame);
      }
    }
    
    // Start new course
    const newCourseInfo = {
      timeFrame,
      tense,
      courseLevel: 'Beginner',
      currentVerbIndex: 0, // Start with course overview
      completedVerbs: [],
      totalScore: 0,
      totalQuestions: 0
    };
    
    setCourseInfo(newCourseInfo);
    setShowBeginnerCourseModal(false);
    setQuizState('config');
  };

  const handleNoviceCourseTimeFrame = async (timeFrame: string) => {
    const noviceTenseMap = {
      "Past": "Passé Composé", // Changed from Passé Simple to Passé Composé for consistency
      "Present": "Présent", 
      "Future": "Futur Simple"
    };
    
    const tense = noviceTenseMap[timeFrame as keyof typeof noviceTenseMap];
    
    // Check if course is already completed
    const isCompleted = completedCourses.some(course => 
      course.courseType === "novice" && 
      course.timeFrame === timeFrame && 
      course.examPassed
    );
    
    if (isCompleted) {
      if (confirm(`You've already completed the ${timeFrame} course with a passing grade. Would you like to reset and retake it?`)) {
        await resetCourse("novice", timeFrame);
        await loadUserData(); // Refresh data
      } else {
        setShowNoviceCourseModal(false);
        return;
      }
    }
    
    // Check for existing progress
    const existingProgress = courseProgressData.find(progress => 
      progress.courseType === "novice" && 
      progress.timeFrame === timeFrame &&
      !progress.isCompleted
    );
    
    if (existingProgress) {
      if (confirm(`You have progress saved for the ${timeFrame} course. Would you like to continue where you left off?`)) {
        // Resume from saved progress
        setCourseInfo({
          timeFrame,
          tense,
          courseLevel: 'Novice',
          currentVerbIndex: existingProgress.currentVerbIndex,
          completedVerbs: existingProgress.completedVerbs || [],
          totalScore: existingProgress.totalScore,
          totalQuestions: existingProgress.totalQuestions
        });
        
        setShowNoviceCourseModal(false);
        setQuizState('config'); // Show proper course flow
        return;
      } else {
        // Start fresh - delete existing progress
        await resetCourse("novice", timeFrame);
      }
    }
    
    // Start new course
    const newCourseInfo = {
      timeFrame,
      tense,
      courseLevel: 'Novice',
      currentVerbIndex: 0,
      completedVerbs: [],
      totalScore: 0,
      totalQuestions: 0
    };
    
    setCourseInfo(newCourseInfo);
    setShowNoviceCourseModal(false);
    
    // Save initial progress to database
    await saveCourseProgress(newCourseInfo);
    setQuizState('config'); // Show course overview
  };

  const resetCourse = async (courseType: string, timeFrame: string) => {
    try {
      await fetch(`/api/completed-courses/1/${courseType}/${timeFrame}`, {
        method: 'DELETE'
      });
      await loadUserData(); // Refresh data
    } catch (error) {
      console.error('Error resetting course:', error);
    }
  };

  const saveCourseProgress = async (courseInfo: any) => {
    try {
      await fetch('/api/course-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1,
          courseType: "beginner",
          timeFrame: courseInfo.timeFrame,
          tense: courseInfo.tense,
          currentVerbIndex: courseInfo.currentVerbIndex,
          completedVerbs: courseInfo.completedVerbs,
          totalScore: courseInfo.totalScore,
          totalQuestions: courseInfo.totalQuestions,
          isCompleted: false
        })
      });
    } catch (error) {
      console.error('Error saving course progress:', error);
    }
  };

  const handleStartVerbSection = async (verbIndex: number, timeFrame: string, tense: string) => {
    const beginnerVerbs = ["être", "avoir", "faire", "aller"];
    const verb = beginnerVerbs[verbIndex];
    const timeFrameMapping = { "Past": "past", "Present": "present", "Future": "future" };
    
    setQuizState('loading');
    
    try {
      // Generate 80 questions total: 20 questions from each of the 4 verbs for this tense
      const allQuestions: any[] = [];
      
      for (const currentVerb of beginnerVerbs) {
        const response = await fetch('/api/get-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            verb: currentVerb,
            timeFrame: timeFrameMapping[timeFrame as keyof typeof timeFrameMapping],
            tenseType: tense,
            difficulty: "Novice",
          })
        });

        const data = await response.json();
        if (data.success) {
          // Take exactly 20 questions from each verb
          allQuestions.push(...data.quiz.questions.slice(0, 20));
        }
      }
      
      // Shuffle all 80 questions (20 from each of the 4 verbs)
      const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
      
      setQuizData(shuffledQuestions); // All 80 questions mixed from 4 verbs
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setSelectedAnswerIndex(null); // Ensure no answer is pre-selected
      setIsAnswerConfirmed(false); // Reset confirmation state
      setQuizState('active');
      
      // Show instruction popup if not disabled
      const dontRemindAgain = localStorage.getItem('dontShowInstructionPopup') === 'true';
      if (!dontRemindAgain) {
        setShowInstructionPopup(true);
      }
    } catch (error) {
      console.error('Error generating verb section:', error);
      setQuizState('config');
    }
  };

  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const [currentCourseConfig, setCurrentCourseConfig] = useState<any>(null);
  const [showPartSelectionModal, setShowPartSelectionModal] = useState(false);
  const [showCourseOverviewModal, setShowCourseOverviewModal] = useState(false);
  const [showUnitIntroModal, setShowUnitIntroModal] = useState(false);
  const [selectedCourseLevel, setSelectedCourseLevel] = useState<string>("");
  const [selectedCourseTimeFrame, setSelectedCourseTimeFrame] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<any>(null);
  const [currentTense, setCurrentTense] = useState("");

  // Unit-Based Generation Functions
  const handleStartUnitQuiz = async (difficulty: string, timeFrame: string, unit: any) => {
    const config = DIFFICULTY_CONFIGS[difficulty as keyof typeof DIFFICULTY_CONFIGS];
    const tenseMapping = {
      "Present": "Présent",
      "Past": "Passé Composé", 
      "Future": "Futur Simple"
    };
    
    const tense = tenseMapping[timeFrame as keyof typeof tenseMapping];
    const timeFrameMapping = { "Past": "past", "Present": "present", "Future": "future" };
    setQuizState('loading');
    
    try {
      const response = await fetch('/api/get-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verb: unit.verb,
          timeFrame: timeFrameMapping[timeFrame as keyof typeof timeFrameMapping],
          tenseType: tense,
          difficulty: difficulty,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setQuizData(data.quiz.questions || []);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setSelectedAnswerIndex(null);
        setIsAnswerConfirmed(false);
        setQuizState('active');
        
        // Show instruction popup if not disabled
        const dontRemindAgain = localStorage.getItem('dontShowInstructionPopup') === 'true';
        if (!dontRemindAgain) {
          setShowInstructionPopup(true);
        }
      }
    } catch (error) {
      console.error('Error generating unit quiz:', error);
      setQuizState('config');
    }
  };

  // Part-Based Generation Functions (Legacy)
  const handleCoursePart = async (difficulty: string, timeFrame: string, section: string, partName: string) => {
    const config = DIFFICULTY_CONFIGS[difficulty as keyof typeof DIFFICULTY_CONFIGS];
    const sectionConfig = config.courseStructure[section as keyof typeof config.courseStructure] as any;
    const partConfig = sectionConfig.parts?.find((p: any) => p.name === partName);
    
    if (!partConfig) {
      console.error('Part configuration not found');
      return;
    }
    
    const courseTenses = config.tenses;
    const timeFrameMapping = { "Past": "past", "Present": "present", "Future": "future" };
    setQuizState('loading');
    
    try {
      const allQuestions: any[] = [];
      
      // Generate questions for each verb in this part
      for (const currentVerb of partConfig.verbs) {
        const questionsPerVerb = Math.floor(partConfig.questions / partConfig.verbs.length);
        const questionsPerTense = Math.floor(questionsPerVerb / courseTenses.length);
        
        for (const currentTense of courseTenses) {
          const response = await fetch('/api/get-quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              verb: currentVerb,
              timeFrame: timeFrameMapping[timeFrame as keyof typeof timeFrameMapping],
              tenseType: currentTense,
              difficulty: difficulty,
            })
          });

          const data = await response.json();
          if (data.success) {
            allQuestions.push(...data.quiz.questions.slice(0, questionsPerTense));
          }
        }
      }
      
      // Ensure we have exactly the right number of questions for this part
      const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5).slice(0, partConfig.questions);
      
      setQuizData(shuffledQuestions);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setSelectedAnswerIndex(null);
      setIsAnswerConfirmed(false);
      setQuizState('active');
      setShowPartSelectionModal(false);
      
      // Set course info for progress tracking
      setCourseInfo({
        timeFrame,
        tense: `${section} Part ${partName}`,
        currentVerbIndex: 0,
        completedVerbs: [],
        totalScore: 0,
        totalQuestions: partConfig.questions
      });
      
      // Show instruction popup if not disabled
      const dontRemindAgain = localStorage.getItem('dontShowInstructionPopup') === 'true';
      if (!dontRemindAgain) {
        setShowInstructionPopup(true);
      }
    } catch (error) {
      console.error(`Error generating ${difficulty} course part ${partName}:`, error);
      setQuizState('config');
    }
  };

  // Elementary Course Functions  
  const handleElementaryCourseTimeFrame = (timeFrame: string) => {
    // Clear any previous state first
    setSelectedCourseLevel("");
    setSelectedCourseTimeFrame("");
    
    // Use setTimeout to ensure state is cleared before setting new values
    setTimeout(() => {
      setSelectedCourseLevel("Elementary");
      setSelectedCourseTimeFrame(timeFrame);
      
      // Get the tense for this timeframe
      const tenseMapping = {
        "Present": "Présent",
        "Past": "Passé Composé", 
        "Future": "Futur Simple"
      };
      setCurrentTense(tenseMapping[timeFrame as keyof typeof tenseMapping]);
      
      setShowElementaryCourseModal(false);
      setShowCourseOverviewModal(true);
    }, 10);
  };

  const handleElementaryCourseLegacy = async (timeFrame: string) => {
    const config = DIFFICULTY_CONFIGS.Elementary;
    const courseTenses = config.tenses;
    
    const timeFrameMapping = { "Past": "past", "Present": "present", "Future": "future" };
    setQuizState('loading');
    
    try {
      // Generate 120 questions total: 20 questions from each of the 6 verbs
      const allQuestions: any[] = [];
      
      for (const currentVerb of config.verbs) {
        for (const currentTense of courseTenses) {
          const response = await fetch('/api/get-quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              verb: currentVerb,
              timeFrame: timeFrameMapping[timeFrame as keyof typeof timeFrameMapping],
              tenseType: currentTense,
              difficulty: "Elementary",
            })
          });

          const data = await response.json();
          if (data.success) {
            // Take proportional questions from each tense
            const questionsPerTensePerVerb = Math.floor(20 / courseTenses.length);
            allQuestions.push(...data.quiz.questions.slice(0, questionsPerTensePerVerb));
          }
        }
      }
      
      // Shuffle all 120 questions
      const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
      
      setQuizData(shuffledQuestions);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setSelectedAnswerIndex(null);
      setIsAnswerConfirmed(false);
      setQuizState('active');
      setShowElementaryCourseModal(false);
      
      // Set course info for progress tracking
      setCourseInfo({
        timeFrame,
        tense: "Mixed Tenses",
        currentVerbIndex: 0,
        completedVerbs: [],
        totalScore: 0,
        totalQuestions: 120
      });
      
      // Show instruction popup if not disabled
      const dontRemindAgain = localStorage.getItem('dontShowInstructionPopup') === 'true';
      if (!dontRemindAgain) {
        setShowInstructionPopup(true);
      }
    } catch (error) {
      console.error('Error generating Elementary course:', error);
      setQuizState('config');
    }
  };

  const handleStartElementaryFinalExam = async (timeFrame: string) => {
    // Show section overview modal for final exam
    setSelectedCourseLevel("Elementary");
    setSelectedCourseTimeFrame(timeFrame);
    // Final exam - handled separately;
    setShowCourseOverviewModal(true);
  };

  // Generic final exam handler for all course levels
  const handleStartCourseOverviewFinalExam = async (courseLevel: string, timeFrame: string) => {
    const config = DIFFICULTY_CONFIGS[courseLevel as keyof typeof DIFFICULTY_CONFIGS];
    if (!config) return;
    
    // Get the tense for this timeframe based on course level
    const tenseMapping = {
      "Present": "Présent",
      "Past": courseLevel === "Elementary" ? "Passé Composé" : "Passé Simple", 
      "Future": "Futur Simple"
    };
    const tense = tenseMapping[timeFrame as keyof typeof tenseMapping];
    
    setQuizState('loading');
    setShowCourseOverviewModal(false);
    
    try {
      const finalExam = config.courseStructure.finalExam;
      const verbs = config.verbs;
      const questionsPerVerb = finalExam.questionsPerVerb;
      
      const allQuestions: any[] = [];
      
      // Generate questions from each verb for the final exam
      for (const verb of verbs) {
        const response = await fetch('/api/get-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            verb: verb,
            timeFrame: timeFrame.toLowerCase(),
            tenseType: tense,
            difficulty: courseLevel,
            isExam: true,
          })
        });

        const data = await response.json();
        if (data.success) {
          // Take exact number of questions per verb for final exam
          allQuestions.push(...data.quiz.questions.slice(0, questionsPerVerb));
        }
      }
      
      // Shuffle all final exam questions
      const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
      
      setQuizData(shuffledQuestions);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setSelectedAnswerIndex(null);
      setIsAnswerConfirmed(false);
      setQuizState('active');
      
      // Set course info for final exam tracking
      setCourseInfo({
        timeFrame,
        tense,
        currentVerbIndex: verbs.length, // Indicates final exam
        completedVerbs: verbs.map(verb => ({ verb, score: 0 })),
        totalScore: 0,
        totalQuestions: finalExam.questions,
        isFinalExam: true,
        courseLevel: courseLevel
      });
      
      // Show instruction popup if not disabled
      const dontRemindAgain = localStorage.getItem('dontShowInstructionPopup') === 'true';
      if (!dontRemindAgain) {
        setShowInstructionPopup(true);
      }
    } catch (error) {
      console.error('Error generating final exam:', error);
      setQuizState('config');
    }
  };

  // Intermediate Course Functions  
  const handleIntermediateCourseTimeFrame = async (timeFrame: string) => {
    // Clear any previous state first
    setSelectedCourseLevel("");
    setSelectedCourseTimeFrame("");
    
    // Use setTimeout to ensure state is cleared before setting new values
    setTimeout(() => {
      setSelectedCourseLevel("Intermediate");
      setSelectedCourseTimeFrame(timeFrame);
      
      // Get the tense for this timeframe
      const tenseMapping = {
        "Present": "Présent",
        "Past": "Passé Composé", 
        "Future": "Futur Simple"
      };
      setCurrentTense(tenseMapping[timeFrame as keyof typeof tenseMapping]);
      
      setShowIntermediateCourseModal(false);
      setShowCourseOverviewModal(true);
    }, 10);
  };

  const handleStartIntermediateFinalExam = async (timeFrame: string) => {
    // Show section overview modal for final exam
    setSelectedCourseLevel("Intermediate");
    setSelectedCourseTimeFrame(timeFrame);
    // Final exam - handled separately;
    setShowCourseOverviewModal(true);
  };

  // Advanced Course Functions  
  const handleAdvancedCourseTimeFrame = (timeFrame: string) => {
    // Clear any previous state first
    setSelectedCourseLevel("");
    setSelectedCourseTimeFrame("");
    
    // Use setTimeout to ensure state is cleared before setting new values
    setTimeout(() => {
      setSelectedCourseLevel("Advanced");
      setSelectedCourseTimeFrame(timeFrame);
      
      // Get the tense for this timeframe
      const tenseMapping = {
        "Present": "Présent",
        "Past": "Passé Composé", 
        "Future": "Futur Simple"
      };
      setCurrentTense(tenseMapping[timeFrame as keyof typeof tenseMapping]);
      
      setShowAdvancedCourseModal(false);
      setShowCourseOverviewModal(true);
    }, 10);
  };

  const handleStartElementaryFinalExamLegacy = async (timeFrame: string) => {
    const config = DIFFICULTY_CONFIGS.Elementary;
    const timeFrameMapping = { "Past": "past", "Present": "present", "Future": "future" };
    
    setQuizState('loading');
    
    try {
      // Generate 60 questions total: 10 questions from each of the 6 verbs for final exam
      const allQuestions: any[] = [];
      
      for (const currentVerb of config.verbs) {
        const response = await fetch('/api/get-quiz', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            verb: currentVerb,
            timeFrame: timeFrameMapping[timeFrame as keyof typeof timeFrameMapping],
            tenseType: "Présent", // Use present tense for final exam
            difficulty: "Elementary",
            isExam: true,
          })
        });

        const data = await response.json();
        if (data.success) {
          // Take exactly 10 questions from each verb for final exam
          allQuestions.push(...data.quiz.questions.slice(0, 10));
        }
      }
      
      // Shuffle all 60 final exam questions
      const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
      
      setQuizData(shuffledQuestions);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setSelectedAnswerIndex(null);
      setIsAnswerConfirmed(false);
      setQuizState('active');
      
      // Show instruction popup if not disabled
      const dontRemindAgain = localStorage.getItem('dontShowInstructionPopup') === 'true';
      if (!dontRemindAgain) {
        setShowInstructionPopup(true);
      }
    } catch (error) {
      console.error('Error generating Elementary final exam:', error);
      setQuizState('config');
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswerIndex === answerIndex && isAnswerConfirmed) {
      // Second click - advance to next question
      handleNextQuestion();
      setIsAnswerConfirmed(false);
    } else {
      // First click - select and highlight answer
      setSelectedAnswerIndex(answerIndex);
      setIsAnswerConfirmed(true);
      setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: answerIndex }));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswerIndex(null);
      setIsAnswerConfirmed(false);
      setShowHint(false);
    } else {
      setQuizState('results');
    }
  };

  const handleStartOver = () => {
    setSelectedVerb("");
    setSelectedTimeFrame("");
    setSelectedTenseType("");
    setSelectedDifficulty(null);
    setQuizState('config');
    setQuizData([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowHint(false);
    setSelectedAnswerIndex(null);
    setShowInstructionPopup(false);
    setShowElementaryCourseModal(false);
    setShowIntermediateCourseModal(false);
    setShowNoviceCourseModal(false);
    setCourseInfo(null);
    setShowCourseProgress(false);
    setShowExamOption(false);
    setIsAnswerConfirmed(false);
    setShowPartSelectionModal(false);
    setShowCourseOverviewModal(false);
    setSelectedCourseLevel("");
    setSelectedCourseTimeFrame("");
    setSelectedUnit(null);
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    quizData.forEach((question, index) => {
      const userAnswerIndex = userAnswers[index];
      if (userAnswerIndex !== undefined) {
        // Convert the correctAnswer (A, B, C, D) to index (0, 1, 2, 3)
        const correctIndex = question.correctAnswer.charCodeAt(0) - 65;
        if (userAnswerIndex === correctIndex) {
          correctAnswers++;
        }
      }
    });
    return { correctAnswers, totalQuestions: quizData.length };
  };

  if (quizState === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl mb-2">Generating your quiz...</p>
          <p className="text-purple-300">Creating 20 questions for {selectedVerb} in {selectedTenseType}</p>
        </div>
      </div>
    );
  }

  if (quizState === 'active' && quizData.length) {
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Add safety check for currentQuestion
    if (!currentQuestion) {
      console.error('🔴 FIXED CODE: Current question is undefined:', { currentQuestion, currentQuestionIndex, quizDataLength: quizData.length });
      setQuizState('config');
      return null;
    }
    
    if (!currentQuestion.options) {
      console.error('🔴 FIXED CODE: Current question missing options array:', { currentQuestion, currentQuestionIndex, quizDataLength: quizData.length });
      setQuizState('config');
      return null;
    }
    
    if (!Array.isArray(currentQuestion.options) || currentQuestion.options.length === 0) {
      console.error('🔴 FIXED CODE: Options array is empty or invalid:', { currentQuestion, currentQuestionIndex, quizDataLength: quizData.length });
      setQuizState('config');
      return null;
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-12 text-white">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Question {currentQuestionIndex + 1} of {quizData.length}</span>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-purple-300 text-sm hover:text-purple-200"
              >
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
            </div>
            <div className="w-full bg-white/20 rounded-lg h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-lg transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Instruction Popup */}
          {showInstructionPopup && (
            <div className="mb-6 bg-blue-500/30 border-2 border-blue-400 rounded-xl p-5 relative shadow-lg shadow-blue-500/20">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-3xl animate-bounce">💡</div>
                  <div>
                    <p className="text-blue-100 font-bold text-lg">Quick Tip</p>
                    <p className="text-blue-50 text-base font-medium">Click answer twice to move to the next question.</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowInstructionPopup(false)}
                  className="text-blue-200 hover:text-white text-2xl px-3 py-2 rounded-lg hover:bg-blue-500/30 transition-colors font-bold"
                  title="Dismiss"
                >
                  ×
                </button>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-400/30">
                <button
                  onClick={() => {
                    localStorage.setItem('dontShowInstructionPopup', 'true');
                    setShowInstructionPopup(false);
                  }}
                  className="text-blue-200 hover:text-blue-100 text-sm underline hover:no-underline transition-colors"
                >
                  Don't remind me again
                </button>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">{currentQuestion.question}</h2>
            {showHint && (
              <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-4">
                <p className="text-blue-200">💡 {currentQuestion.hint}</p>
              </div>
            )}
          </div>

          <div className="mb-8">
            {currentQuestion.options.map((option: string, index: number) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-xl mb-3 transition-all duration-200 flex items-center ${
                  selectedAnswerIndex === index && isAnswerConfirmed
                    ? 'border-2 border-green-500 bg-green-500/20 shadow-lg shadow-green-500/20'
                    : selectedAnswerIndex === index
                    ? 'border-2 border-purple-600 bg-purple-600/20'
                    : 'border-2 border-white/20 bg-white/10 hover:bg-white/20'
                }`}
              >
                <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-4 text-sm font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            ))}
          </div>



          {selectedAnswerIndex !== null && isAnswerConfirmed && (
            <div className={`mb-6 p-4 rounded-xl border ${
              String.fromCharCode(65 + selectedAnswerIndex) === currentQuestion.correctAnswer
                ? 'border-green-500/30 bg-green-500/20 text-green-200'
                : 'border-red-500/30 bg-red-500/20 text-red-200'
            }`}>
              <p>📝 {currentQuestion.rationale}</p>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleStartOver}
              className="px-6 py-3 text-slate-400 border border-slate-600 rounded-xl hover:bg-slate-600/20"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizState === 'results') {
    const { correctAnswers, totalQuestions } = calculateResults();
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Handle individual unit completion for beginner courses
    if (courseInfo && courseInfo.currentVerbIndex >= 1 && courseInfo.currentVerbIndex <= 4) {
      const beginnerVerbs = ["être", "avoir", "faire", "aller"];
      const currentVerb = beginnerVerbs[courseInfo.currentVerbIndex - 1];
      
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-12 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">✅ Unit {courseInfo.currentVerbIndex}: '{currentVerb}' Complete!</h2>
              <div className="mb-6">
                <div className="text-5xl font-bold mb-2">{percentage}%</div>
                <p className="text-xl text-slate-300">
                  You got {correctAnswers} out of {totalQuestions} questions correct
                </p>
              </div>
              
              {/* Unit Progress */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Course Progress ({courseInfo.timeFrame} Tense)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                  {beginnerVerbs.map((verb, index) => (
                    <div key={verb} className={`px-3 py-2 rounded-lg text-sm font-medium ${
                      courseInfo.currentVerbIndex > index + 1 ? 'bg-green-500/20 text-green-300' :
                      courseInfo.currentVerbIndex === index + 1 ? 'bg-blue-500/20 text-blue-300' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      Unit {index + 1}: '{verb}' {courseInfo.currentVerbIndex > index + 1 ? '✓' : courseInfo.currentVerbIndex === index + 1 ? '✓' : ''}
                      <div className="text-xs opacity-75">(20 questions)</div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={async () => {
                    await handleStartFinalExam(courseInfo.timeFrame, courseInfo.tense);
                  }}
                  className={`px-3 py-2 rounded-lg text-sm font-medium mx-auto max-w-xs hover:scale-105 transition-transform cursor-pointer ${
                    courseInfo.currentVerbIndex > 4 ? 'bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30' : 'bg-yellow-500/10 text-yellow-200 hover:bg-yellow-500/20'
                  }`}
                >
                  🏆 Final Exam {courseInfo.currentVerbIndex > 4 ? '✓' : ''}
                  <div className="text-xs opacity-75">(40 questions)</div>
                </button>
              </div>

              <div className="flex gap-4 justify-center">
                {courseInfo.currentVerbIndex < 4 ? (
                  <button
                    onClick={async () => {
                      // Update course info to track completed verb and move to next unit
                      const updatedCompletedVerbs = courseInfo.completedVerbs || [];
                      updatedCompletedVerbs.push({
                        verb: currentVerb,
                        score: percentage
                      });
                      
                      const updatedCourse = {
                        ...courseInfo,
                        currentVerbIndex: courseInfo.currentVerbIndex + 1,
                        completedVerbs: updatedCompletedVerbs,
                        totalScore: (courseInfo.totalScore || 0) + correctAnswers,
                        totalQuestions: (courseInfo.totalQuestions || 0) + totalQuestions
                      };
                      setCourseInfo(updatedCourse);
                      
                      // Save progress to database
                      await saveCourseProgress(updatedCourse);
                      
                      // Clear quiz data to show next unit intro
                      setQuizData([]);
                      setQuizState('config');
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700"
                  >
                    Continue to Unit {courseInfo.currentVerbIndex + 1}: '{beginnerVerbs[courseInfo.currentVerbIndex]}' →
                  </button>
                ) : (
                  <button
                    onClick={async () => {
                      // All units complete, update course info and show completion
                      const updatedCompletedVerbs = courseInfo.completedVerbs || [];
                      updatedCompletedVerbs.push({
                        verb: currentVerb,
                        score: percentage
                      });
                      
                      const updatedCourse = {
                        ...courseInfo,
                        currentVerbIndex: 5, // Mark as ready for exam
                        completedVerbs: updatedCompletedVerbs,
                        totalScore: (courseInfo.totalScore || 0) + correctAnswers,
                        totalQuestions: (courseInfo.totalQuestions || 0) + totalQuestions,
                        isCompleted: true
                      };
                      setCourseInfo(updatedCourse);
                      
                      // Save progress to database
                      await saveCourseProgress(updatedCourse);
                      
                      // Clear quiz data to show completion screen
                      setQuizData([]);
                      setQuizState('config');
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700"
                  >
                    Complete All Units - View Options
                  </button>
                )}
                <button
                  onClick={handleStartOver}
                  className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800"
                >
                  Exit Course
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Handle exam results (when it's a final exam or currentVerbIndex is 5 for legacy)
    if (courseInfo && (courseInfo.isFinalExam || courseInfo.currentVerbIndex === 5)) {
      // For exam, we need exactly 90% or higher (18/20 for 20-question exam, 36/40 for 40-question exam)
      const requiredScore = Math.ceil(totalQuestions * 0.9);
      const examPassed = correctAnswers >= requiredScore;
      
      // Debug logging
      console.log(`Exam Results: ${correctAnswers}/${totalQuestions} = ${percentage}%`);
      console.log(`Exam passed: ${examPassed} (need ${requiredScore}/${totalQuestions} or higher)`);
      
      // Save completed course and update progress if passed - do this once when exam is complete
      if (examPassed && !completedCourses.some(course => 
        course.courseType === (courseInfo.courseLevel?.toLowerCase() || "beginner") && 
        course.timeFrame === courseInfo.timeFrame
      )) {
        const saveCompletedCourse = async () => {
          try {
            console.log('Saving completed course data...');
            
            // Save to completed courses
            const completedResponse = await fetch('/api/completed-courses', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: 1,
                courseType: courseInfo.courseLevel?.toLowerCase() || "beginner",
                timeFrame: courseInfo.timeFrame,
                tense: courseInfo.tense,
                totalScore: courseInfo.totalScore + correctAnswers,
                totalQuestions: courseInfo.totalQuestions + totalQuestions,
                examScore: correctAnswers,
                examPassed: examPassed
              })
            });
            
            if (!completedResponse.ok) {
              const errorData = await completedResponse.json();
              console.error('Failed to save completed course:', errorData);
              throw new Error(`API Error: ${errorData.error || 'Unknown error'}`);
            }
            
            console.log('Completed course saved successfully');
            
            // Also update course progress to mark exam as passed
            const progressResponse = await fetch('/api/course-progress', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: 1,
                courseType: courseInfo.courseLevel?.toLowerCase() || "beginner",
                timeFrame: courseInfo.timeFrame,
                tense: courseInfo.tense,
                currentVerbIndex: courseInfo.currentVerbIndex || 5,
                completedVerbs: courseInfo.completedVerbs,
                totalScore: courseInfo.totalScore + correctAnswers,
                totalQuestions: courseInfo.totalQuestions + totalQuestions,
                isCompleted: true,
                examPassed: true
              })
            });
            
            if (!progressResponse.ok) {
              const errorData = await progressResponse.json();
              console.error('Failed to update course progress:', errorData);
              throw new Error(`API Error: ${errorData.error || 'Unknown error'}`);
            }
            
            console.log('Course progress updated successfully');
            
            await loadUserData(); // Refresh completed courses and progress
            console.log('User data refreshed after exam completion');
          } catch (error) {
            console.error('Error saving completed course:', error);
            alert('Failed to save exam results. Please contact support if this issue persists.');
          }
        };
        saveCompletedCourse();
      }
      
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-12 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">
                {examPassed ? '🏆 Exam Passed!' : '❌ Exam Failed'}
              </h2>
              <div className="mb-6">
                <div className={`text-6xl font-bold mb-2 ${examPassed ? 'text-green-400' : 'text-red-400'}`}>
                  {percentage}%
                </div>
                <p className="text-xl text-slate-300">
                  You got {correctAnswers} out of {totalQuestions} questions correct
                </p>
                <p className="text-lg text-slate-400 mt-2">
                  {examPassed ? 
                    'Congratulations! You passed the final exam!' :
                    `We have high standards! You need 90% (${requiredScore}/${totalQuestions}) to pass. You got ${correctAnswers}/${totalQuestions}. Try again!`
                  }
                </p>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Course Summary ({courseInfo.timeFrame} Tense)</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-slate-300">Total Questions</div>
                    <div className="text-2xl font-bold">{courseInfo.totalQuestions + totalQuestions}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-slate-300">Overall Score</div>
                    <div className="text-2xl font-bold">
                      {Math.round(((courseInfo.totalScore + correctAnswers) / (courseInfo.totalQuestions + totalQuestions)) * 100)}%
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                {!examPassed && (
                  <button
                    onClick={async () => {
                      // Retry exam - generate new mixed questions
                      setQuizState('loading');
                      const timeFrameMapping = { "Past": "past", "Present": "present", "Future": "future" };
                      
                      try {
                        const beginnerVerbs = ["être", "avoir", "faire", "aller"];
                        const allQuestions: any[] = [];
                        
                        for (const verb of beginnerVerbs) {
                          const response = await fetch('/api/get-quiz', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              verb: verb,
                              timeFrame: timeFrameMapping[courseInfo.timeFrame as keyof typeof timeFrameMapping],
                              tenseType: courseInfo.tense,
                              difficulty: "Novice",
                            })
                          });
                          
                          const data = await response.json();
                          if (data.success) {
                            // Take 10 questions from each verb for 40 total
                            allQuestions.push(...data.quiz.questions.slice(0, 10));
                          }
                        }
                        
                        const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
                        setQuizData(shuffledQuestions);
                        setCurrentQuestionIndex(0);
                        setUserAnswers({});
                        setSelectedAnswerIndex(null); // Ensure no answer is pre-selected
                        setIsAnswerConfirmed(false); // Reset confirmation state
                        setQuizState('active');
                      } catch (error) {
                        console.error('Error generating retry exam:', error);
                        setQuizState('config');
                      }
                    }}
                    className="px-8 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl font-semibold hover:from-yellow-700 hover:to-orange-700"
                  >
                    Retry Exam
                  </button>
                )}
                <button
                  onClick={handleStartOver}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700"
                >
                  Return to Main Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-12 text-white">
        <div className="max-w-5xl mx-auto">
          {/* Summary Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 text-center mb-8">
            <h2 className="text-4xl font-bold mb-6">{totalQuestions === 40 ? 'Exam Complete!' : 'Quiz Complete!'}</h2>
            <div className="mb-8">
              <div className="text-6xl font-bold mb-2">{percentage}%</div>
              <p className="text-xl text-slate-300">
                You got {correctAnswers} out of {totalQuestions} questions correct
              </p>
              <div className="flex justify-center items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-green-300">{correctAnswers} Correct</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-red-300">{totalQuestions - correctAnswers} Incorrect</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Review Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Detailed Review</h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {quizData.map((question, index) => {
                const userAnswerIndex = userAnswers[index];
                const userAnswer = userAnswerIndex !== undefined ? question.options[userAnswerIndex] : null;
                const correctIndex = question.correctAnswer.charCodeAt(0) - 65;
                const correctAnswer = question.options[correctIndex];
                const isCorrect = userAnswerIndex === correctIndex;

                return (
                  <div key={index} className={`p-4 rounded-xl border ${
                    isCorrect 
                      ? 'border-green-500/30 bg-green-500/10' 
                      : 'border-red-500/30 bg-red-500/10'
                  }`}>
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCorrect ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium mb-2">{question.question}</p>
                        <div className="text-sm space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={isCorrect ? 'text-green-300' : 'text-red-300'}>
                              Your answer:
                            </span>
                            <span className={isCorrect ? 'text-green-200' : 'text-red-200'}>
                              {userAnswer || 'No answer selected'}
                            </span>
                          </div>
                          {!isCorrect && correctAnswer && (
                            <div className="flex items-center gap-2">
                              <span className="text-green-300">Correct answer:</span>
                              <span className="text-green-200">{correctAnswer}</span>
                            </div>
                          )}
                          <div className="text-slate-300 text-xs mt-2">
                            {question.rationale}
                          </div>
                        </div>
                      </div>
                      <div className={`text-2xl ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {isCorrect ? '✓' : '✗'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleStartOver}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700"
            >
              Try another Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show course overview at the beginning
  if (quizState === 'config' && courseInfo && courseInfo.currentVerbIndex === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-12 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-4xl font-bold mb-2">📚 {courseInfo.timeFrame} Tense Course Overview</h2>
              <p className="text-lg text-purple-300 font-semibold italic">French Verb Master - For serious students.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-4 text-blue-200">🎯 Course Structure</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    <span>Unit 1: être (20 questions)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    <span>Unit 2: avoir (20 questions)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    <span>Unit 3: faire (20 questions)</span>
                  </div>
                  {(courseInfo?.courseLevel === 'Advanced' || selectedDifficulty === 'Advanced') && (
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                      <span>Unit 4: aller (20 questions)</span>
                    </div>
                  )}
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/20">
                    <span className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center text-sm font-bold">🏆</span>
                    <span className="font-semibold">Final Exam ({(courseInfo?.courseLevel === 'Advanced' || selectedDifficulty === 'Advanced') ? '40' : '30'} questions)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-4 text-green-200">✨ What You'll Learn</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Master the {(courseInfo?.courseLevel === 'Advanced' || selectedDifficulty === 'Advanced') ? '4' : '3'} most essential French verbs</li>
                  <li>• Practice {courseInfo.tense} conjugations</li>
                  <li>• Learn proper French grammar patterns</li>
                  <li>• Build confidence with structured progression</li>
                  <li>• Achieve 90% mastery on final exam</li>
                </ul>
                
                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-200 font-semibold">We have high standards!</p>
                  <p className="text-sm text-slate-300 mt-1">Final exam requires 90% ({(courseInfo?.courseLevel === 'Advanced' || selectedDifficulty === 'Advanced') ? '36/40' : '27/30'}) to pass and unlock the next course.</p>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <button
                onClick={() => {
                  setCourseInfo({...courseInfo, currentVerbIndex: 1});
                }}
                className="block w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700"
              >
                Start Unit 1: 'être' →
              </button>
              <button
                onClick={async () => {
                  await handleStartFinalExam(courseInfo.timeFrame, courseInfo.tense);
                }}
                className="block w-full px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-xl font-semibold text-lg hover:from-yellow-700 hover:to-orange-700"
              >
                🏆 Take Final Exam ({(courseInfo?.courseLevel === 'Advanced' || selectedDifficulty === 'Advanced') ? '40' : '30'} questions)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show individual verb unit introduction
  // For non-Advanced courses, limit to 3 units (exclude Unit 4: aller)
  const maxUnitIndex = (courseInfo?.courseLevel === 'Advanced' || selectedDifficulty === 'Advanced') ? 4 : 3;
  if (quizState === 'config' && courseInfo && courseInfo.currentVerbIndex >= 1 && courseInfo.currentVerbIndex <= maxUnitIndex && quizData.length === 0) {
    const verbs = ["être", "avoir", "faire", "aller"];
    const currentVerb = verbs[courseInfo.currentVerbIndex - 1];
    const verbInfo = {
      "être": {
        meaning: "to be",
        description: "The most fundamental French verb, used to describe states of being, identity, and characteristics.",
        examples: ["Je suis étudiant (I am a student)", "Tu es français (You are French)", "Il est grand (He is tall)"],
        color: "blue"
      },
      "avoir": {
        meaning: "to have", 
        description: "Essential for expressing possession, age, and many idiomatic expressions in French.",
        examples: ["J'ai un livre (I have a book)", "Tu as faim (You are hungry)", "Elle a vingt ans (She is twenty years old)"],
        color: "green"
      },
      "faire": {
        meaning: "to do/make",
        description: "One of the most versatile French verbs, used for actions, weather, and countless expressions.",
        examples: ["Je fais mes devoirs (I do my homework)", "Tu fais du sport (You play sports)", "Il fait beau (It's beautiful weather)"],
        color: "purple"
      },
      "aller": {
        meaning: "to go",
        description: "Essential for movement and future tense formation, this verb opens up conversations about destinations and plans.",
        examples: ["Je vais au cinéma (I go to the cinema)", "Tu vas bien (You are doing well)", "Elle va partir (She is going to leave)"],
        color: "orange"
      }
    };

    const info = verbInfo[currentVerb as keyof typeof verbInfo];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-12 text-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 mb-8">
            <div className="text-center mb-8">
              <div className={`w-16 h-16 bg-${info.color}-500/20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4`}>
                {courseInfo.currentVerbIndex}
              </div>
              <h2 className="text-4xl font-bold mb-2">Unit {courseInfo.currentVerbIndex}: '{currentVerb}'</h2>
              <p className="text-xl text-slate-300">({info.meaning})</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-200">About This Verb</h3>
                <p className="text-slate-300 leading-relaxed">{info.description}</p>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-200">Example Sentences</h3>
                <ul className="space-y-2">
                  {info.examples.map((example, index) => (
                    <li key={index} className="text-slate-300 leading-relaxed">
                      • {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-center space-y-4">
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <p className="text-blue-200 font-semibold">Ready to practice {currentVerb} in {courseInfo.tense}?</p>
                <p className="text-sm text-slate-300 mt-1">20 questions focusing on this essential French verb</p>
              </div>
              
              <button
                onClick={async () => {
                  // Generate quiz for current verb
                  setQuizState('loading');
                  try {
                    const timeFrameMapping = { "Past": "past", "Present": "present", "Future": "future" };
                    const response = await fetch('/api/get-quiz', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        verb: currentVerb,
                        timeFrame: timeFrameMapping[courseInfo.timeFrame as keyof typeof timeFrameMapping],
                        tenseType: courseInfo.tense,
                        difficulty: "Novice",
                      })
                    });
                    
                    const data = await response.json();
                    if (data.success) {
                      setQuizData(data.quiz.questions);
                      setCurrentQuestionIndex(0);
                      setUserAnswers({});
                      setSelectedAnswerIndex(null); // Ensure no answer is pre-selected
                      setIsAnswerConfirmed(false); // Reset confirmation state
                      setQuizState('active');
                    }
                  } catch (error) {
                    console.error('Error generating quiz:', error);
                    setQuizState('config');
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700"
              >
                Start Unit {courseInfo.currentVerbIndex}: '{currentVerb}' Practice →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-12 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-2">French Verb Master</h1>
          <p className="text-2xl text-purple-300 font-semibold mb-4 italic">For serious students.</p>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Master French verb conjugations—the key to fluency—with your own personalized quizzes and optional mini-courses.
          </p>
        </div>

        <div className="text-center mb-6">
          <div className="flex gap-4 justify-center items-center flex-wrap">
            <button
              onClick={() => {
                console.log('Choose All for Me clicked');
                setShowDifficultyModal(true);
              }}
              className="px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl hover:scale-105 transition-transform shadow-lg"
            >
              🎲 Choose All for Me
            </button>
            <button
              onClick={() => {
                console.log('Mini-Courses clicked');
                setShowMiniCoursesModal(true);
              }}
              className="px-6 py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-2xl hover:scale-105 transition-transform shadow-lg"
            >
              📚 Mini-Courses
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="text-lg font-semibold">1. Choose Difficulty</label>
              <button
                onClick={() => setShowDifficultyModal(true)}
                className="px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
              >
                Choose for me
              </button>
            </div>
            <select
              value={selectedDifficulty || ""}
              onChange={(e) => {
                const newAdvancedy = e.target.value;
                setSelectedDifficulty(newAdvancedy);
                // Reset dependent selections when difficulty changes
                setSelectedVerb("");
                setSelectedTimeFrame("");
                setSelectedTenseType("");
                
                // If switching difficulty and current verb isn't available, reset
                const difficultyVerbs = DIFFICULTY_CONFIGS[newAdvancedy as keyof typeof DIFFICULTY_CONFIGS]?.verbs || [];
                if (selectedVerb && !difficultyVerbs.includes(selectedVerb)) {
                  setSelectedVerb("");
                }
              }}
              className="w-full p-4 rounded-xl border border-white/20 bg-white/10 text-white text-lg"
            >
              <option value="" className="bg-gray-800 text-white">Select difficulty level...</option>
              <option value="Beginner" className="bg-gray-800 text-white">⚪ Beginner - Subject pronoun focus (Je suis, Tu es), 3 verbs (être, avoir, faire)</option>
              <option value="Novice" className="bg-gray-800 text-white">🔵 Novice - 4 verbs (être, avoir, faire, aller), Present, past, and future tenses</option>
              <option value="Elementary" className="bg-gray-800 text-white">🟢 Elementary - Top 6 verbs, Present, past, and future tenses</option>
              <option value="Intermediate" className="bg-gray-800 text-white">🟡 Intermediate - 11 verbs (être, avoir, faire, aller, voir, dire, pouvoir, vouloir, prendre, venir, savoir), Present, past, and future tenses</option>
              <option value="Advanced" className="bg-gray-800 text-white">🔴 Advanced - 13 verbs (10 regular + 3 reflexive), all tenses</option>
            </select>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="text-lg font-semibold">2. Choose a French Verb</label>
              <button
                onClick={handleChooseVerb}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700"
              >
                Choose for me
              </button>
            </div>
            <select
              value={selectedVerb}
              onChange={(e) => setSelectedVerb(e.target.value)}
              disabled={!selectedDifficulty}
              className={`w-full p-4 rounded-xl border border-white/20 text-white text-lg ${
                selectedDifficulty ? 'bg-white/10' : 'bg-white/5 opacity-50'
              }`}
            >
              <option value="" className="bg-gray-800 text-white">
                {selectedDifficulty ? "Select a verb..." : "Choose difficulty first..."}
              </option>
              {selectedDifficulty && (DIFFICULTY_CONFIGS[selectedDifficulty as keyof typeof DIFFICULTY_CONFIGS]?.verbs || FRENCH_VERBS
              ).map((verb) => (
                <option key={verb} value={verb} className="bg-gray-800 text-white">
                  {verb} ({VERB_MEANINGS[verb as keyof typeof VERB_MEANINGS]})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="text-lg font-semibold">3. Choose Time Frame</label>
              <button
                onClick={handleChooseTimeFrame}
                disabled={!selectedDifficulty || !selectedVerb}
                className={`px-4 py-2 rounded-lg font-medium ${
                  selectedVerb
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                    : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                }`}
              >
                Choose for me
              </button>
            </div>
            <select
              value={selectedTimeFrame}
              onChange={(e) => { 
                setSelectedTimeFrame(e.target.value); 
                // For non-Advanced levels, automatically set tense based on time frame and difficulty
                if (selectedDifficulty === "Novice") {
                  const beginnerTenseMap = {
                    "Past": "Passé Composé",
                    "Present": "Présent", 
                    "Future": "Futur Simple"
                  };
                  setSelectedTenseType(beginnerTenseMap[e.target.value as keyof typeof beginnerTenseMap] || "");
                } else if (selectedDifficulty === "Elementary") {
                  const easyTenseMap = {
                    "Past": "Passé Composé",
                    "Present": "Présent", 
                    "Future": "Futur Simple"
                  };
                  setSelectedTenseType(easyTenseMap[e.target.value as keyof typeof easyTenseMap] || "");
                } else if (selectedDifficulty === "Intermediate") {
                  const moderateTenseMap = {
                    "Past": "Passé Composé",
                    "Present": "Présent", 
                    "Future": "Futur Proche"
                  };
                  setSelectedTenseType(moderateTenseMap[e.target.value as keyof typeof moderateTenseMap] || "");
                } else {
                  // For Advanced level, reset tense selection to let user choose
                  setSelectedTenseType("");
                }
              }}
              disabled={!selectedVerb}
              className={`w-full p-4 rounded-xl border border-white/20 text-white text-lg ${
                selectedDifficulty && selectedVerb ? 'bg-white/10' : 'bg-white/5 opacity-50'
              }`}
            >
              <option value="" className="bg-gray-800 text-white">Select time frame...</option>
              {Object.keys(TIME_FRAMES).map((timeFrame) => (
                <option key={timeFrame} value={timeFrame} className="bg-gray-800 text-white">{timeFrame}</option>
              ))}
            </select>
          </div>

          {selectedDifficulty === "Advanced" && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <label className="text-lg font-semibold">4. Choose Specific Tense</label>
                <button
                  onClick={handleChooseTenseType}
                  disabled={!selectedTimeFrame}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selectedTimeFrame
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                      : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Choose for me
                </button>
              </div>
              <select
                value={selectedTenseType}
                onChange={(e) => setSelectedTenseType(e.target.value)}
                disabled={!selectedTimeFrame}
                className={`w-full p-4 rounded-xl border border-white/20 text-white text-lg ${
                  selectedTimeFrame ? 'bg-white/10' : 'bg-white/5 opacity-50'
                }`}
              >
                <option value="" className="bg-gray-800 text-white">Select tense type...</option>
                {selectedTimeFrame && TIME_FRAMES[selectedTimeFrame as keyof typeof TIME_FRAMES].map((tense) => (
                  <option key={tense} value={tense} className="bg-gray-800 text-white">{tense}</option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleStartQuiz}
            disabled={!selectedDifficulty || !selectedVerb || !selectedTimeFrame || (!selectedTenseType && selectedDifficulty === "Advanced")}
            className={`w-full p-4 text-lg font-bold rounded-xl transition-all ${
              (selectedDifficulty && selectedVerb && selectedTimeFrame && (selectedTenseType || selectedDifficulty !== "Advanced"))
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
                : 'bg-slate-600 text-slate-400 cursor-not-allowed'
            }`}
          >
            {selectedDifficulty && selectedVerb && selectedTimeFrame && (selectedTenseType || selectedDifficulty !== "Advanced")
              ? `Start ${selectedVerb} Quiz (${selectedDifficulty} - ${selectedDifficulty === "Advanced" ? selectedTenseType : selectedTimeFrame})`
              : "Complete all selections to start quiz"
            }
          </button>
        </div>

        {selectedDifficulty && selectedVerb && selectedTimeFrame && (selectedTenseType || selectedDifficulty !== "Advanced") && (
          <div className="max-w-2xl mx-auto mt-8 bg-green-500/20 border border-green-500/30 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Quiz Preview</h3>
            <p className="text-green-200">
              Ready to generate 20 questions for <strong>{selectedVerb}</strong> conjugations in <strong>{selectedDifficulty === "Advanced" ? selectedTenseType : selectedTimeFrame}</strong> ({selectedDifficulty} difficulty)
            </p>
          </div>
        )}

        {showDifficultyModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-center mb-6">Choose Difficulty Level</h3>
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleDifficultySelect("Beginner")}
                  className="w-full p-4 text-left bg-gray-500/20 border border-gray-500/30 rounded-xl text-white hover:bg-gray-500/30"
                >
                  <div className="text-gray-200 font-semibold text-lg">⚪ Beginner</div>
                  <div className="text-slate-300 text-sm mt-1">
                    Subject pronoun focus (Je suis, Tu es, Il/Elle est) • 3 verbs (être, avoir, faire) • Present, past, and future tenses
                  </div>
                </button>
                
                <button
                  onClick={() => handleDifficultySelect("Novice")}
                  className="w-full p-4 text-left bg-blue-500/20 border border-blue-500/30 rounded-xl text-white hover:bg-blue-500/30"
                >
                  <div className="text-blue-200 font-semibold text-lg">🔵 Novice</div>
                  <div className="text-slate-300 text-sm mt-1">
                    4 verbs (être, avoir, faire, aller) • Present, past, and future tenses
                  </div>
                </button>
                
                <button
                  onClick={() => handleDifficultySelect("Elementary")}
                  className="w-full p-4 text-left bg-green-500/20 border border-green-500/30 rounded-xl text-white hover:bg-green-500/30"
                >
                  <div className="text-green-200 font-semibold text-lg">🟢 Elementary</div>
                  <div className="text-slate-300 text-sm mt-1">
                    6 verbs (être, avoir, faire, dire, aller, voir) • Present, past, and future tenses
                  </div>
                </button>
                
                <button
                  onClick={() => handleDifficultySelect("Intermediate")}
                  className="w-full p-4 text-left bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-white hover:bg-yellow-500/30"
                >
                  <div className="text-yellow-200 font-semibold text-lg">🟡 Intermediate</div>
                  <div className="text-slate-300 text-sm mt-1">
                    11 verbs (être, avoir, faire, aller, voir, dire, pouvoir, vouloir, prendre, venir, savoir) • Present, past, and future tenses
                  </div>
                </button>
                
                <button
                  onClick={() => handleDifficultySelect("Advanced")}
                  className="w-full p-4 text-left bg-red-500/20 border border-red-500/30 rounded-xl text-white hover:bg-red-500/30"
                >
                  <div className="text-red-200 font-semibold text-lg">🔴 Advanced</div>
                  <div className="text-slate-300 text-sm mt-1">
                    13 verbs (10 regular + 3 reflexive) • All tenses and time frames
                  </div>
                </button>
              </div>
              
              <button
                onClick={() => setShowDifficultyModal(false)}
                className="w-full p-3 text-slate-400 border border-slate-600 rounded-xl hover:bg-slate-600/20"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Mini-Courses Modal */}
        {showMiniCoursesModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-center mb-4">📚 Mini-Courses</h3>
              <p className="text-slate-300 text-center mb-6">Choose a difficulty level for structured learning</p>
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => handleMiniCourseSelect("Beginner")}
                  className="w-full p-4 text-left bg-gray-500/20 border border-gray-500/30 rounded-xl text-white hover:bg-gray-500/30"
                >
                  <div className="text-gray-200 font-semibold text-lg">⚪ Beginner Course</div>
                  <div className="text-slate-300 text-sm mt-1">
                    3 Units (20 questions each) + Final Exam (30 questions, 90% to pass)
                  </div>
                </button>
                <button
                  onClick={() => handleMiniCourseSelect("Novice")}
                  className="w-full p-4 text-left bg-blue-500/20 border border-blue-500/30 rounded-xl text-white hover:bg-blue-500/30"
                >
                  <div className="text-blue-200 font-semibold text-lg">🔵 Novice Course</div>
                  <div className="text-slate-300 text-sm mt-1">
                    4 Units (20 questions each) + Final Exam (40 questions, 90% to pass)
                  </div>
                </button>
                <button
                  onClick={() => handleMiniCourseSelect("Elementary")}
                  className="w-full p-4 text-left bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-white hover:bg-emerald-500/30"
                >
                  <div className="text-emerald-200 font-semibold text-lg">🟢 Elementary Course</div>
                  <div className="text-slate-300 text-sm mt-1">
                    6 Units (20 questions each) + Final Exam (60 questions, 90% to pass)
                  </div>
                </button>
                <button
                  onClick={() => handleMiniCourseSelect("Intermediate")}
                  className="w-full p-4 text-left bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-white hover:bg-yellow-500/30"
                >
                  <div className="text-yellow-200 font-semibold text-lg">🟡 Intermediate Course</div>
                  <div className="text-slate-300 text-sm mt-1">
                    8 Units (20 questions each) + Final Exam (80 questions, 90% to pass)
                  </div>
                </button>
                <button
                  onClick={() => handleMiniCourseSelect("Advanced")}
                  className="w-full p-4 text-left bg-red-500/20 border border-red-500/30 rounded-xl text-white hover:bg-red-500/30"
                >
                  <div className="text-red-200 font-semibold text-lg">🔴 Advanced Course</div>
                  <div className="text-slate-300 text-sm mt-1">
                    13 Units (20 questions each) + Final Exam (130 questions, 90% to pass)
                  </div>
                </button>
              </div>
              <button
                onClick={() => setShowMiniCoursesModal(false)}
                className="w-full p-3 text-slate-400 border border-slate-600 rounded-xl hover:bg-slate-600/20"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Exam Option Modal */}
        {showExamOption && courseInfo && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-center mb-4">🎓 Course Complete!</h3>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold mb-2">
                  {Math.round((courseInfo.totalScore / courseInfo.totalQuestions) * 100)}%
                </div>
                <p className="text-slate-300">
                  Overall Score: {courseInfo.totalScore}/{courseInfo.totalQuestions}
                </p>
                <div className="mt-4 space-y-2">
                  {courseInfo.completedVerbs.map((verb, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{verb.verb}:</span>
                      <span className={verb.score >= 70 ? 'text-green-300' : 'text-red-300'}>
                        {verb.score}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <button
                  onClick={async () => {
                    setShowExamOption(false);
                    // Generate mixed exam with all 4 verbs
                    const timeFrameMapping = { "Past": "past", "Present": "present", "Future": "future" };
                    setQuizState('loading');
                    
                    try {
                      const beginnerVerbs = ["être", "avoir", "faire", "aller"];
                      const allQuestions: any[] = [];
                      
                      for (const verb of beginnerVerbs) {
                        const response = await fetch('/api/get-quiz', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            verb: verb,
                            timeFrame: timeFrameMapping[courseInfo.timeFrame as keyof typeof timeFrameMapping],
                            tenseType: courseInfo.tense,
                            difficulty: "Novice",
                          })
                        });
                        
                        const data = await response.json();
                        if (data.success) {
                          // Take 10 questions from each verb for 40 total
                          allQuestions.push(...data.quiz.questions.slice(0, 10));
                        }
                      }
                      
                      const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
                      setQuizData(shuffledQuestions);
                      setCurrentQuestionIndex(0);
                      setUserAnswers({});
                      setSelectedAnswerIndex(null); // Ensure no answer is pre-selected
                      setIsAnswerConfirmed(false); // Reset confirmation state
                      
                      // Mark as exam mode
                      setCourseInfo({...courseInfo, currentVerbIndex: 5}); // 5 indicates exam mode
                      setQuizState('active');
                    } catch (error) {
                      console.error('Error generating exam:', error);
                      setQuizState('config');
                    }
                  }}
                  className="w-full p-4 text-left bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-white hover:bg-yellow-500/30"
                >
                  <div className="text-yellow-200 font-semibold text-lg">🏆 Take Final Exam</div>
                  <div className="text-slate-300 text-sm mt-1">
                    40 mixed questions - Need 90% to pass (36/40)
                  </div>
                </button>
                <button
                  onClick={() => {
                    setShowExamOption(false);
                    handleStartOver();
                  }}
                  className="w-full p-4 text-left bg-green-500/20 border border-green-500/30 rounded-xl text-white hover:bg-green-500/30"
                >
                  <div className="text-green-200 font-semibold text-lg">✅ Finish Course</div>
                  <div className="text-slate-300 text-sm mt-1">
                    Complete the course and return to main menu
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Beginner Course Time Frame Modal */}
        {showBeginnerCourseModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-center mb-4">⚪ Beginner Course</h3>
              <p className="text-slate-300 text-center mb-6">Master subject pronouns with essential French verbs</p>
              <div className="space-y-3 mb-6">
                {["Present", "Past", "Future"].map((timeFrame, index) => {
                  const beginnerTenseMap = {
                    "Past": "Passé Composé",
                    "Present": "Présent", 
                    "Future": "Futur Simple"
                  };
                  const tense = beginnerTenseMap[timeFrame as keyof typeof beginnerTenseMap];
                  
                  // Check completion status
                  const completed = completedCourses.find(course => 
                    course.courseType === "beginner" && 
                    course.timeFrame === timeFrame
                  );
                  const isCompleted = completed && completed.examPassed;
                  
                  // Check for in-progress
                  const inProgress = courseProgressData.find(progress => 
                    progress.courseType === "beginner" && 
                    progress.timeFrame === timeFrame &&
                    !progress.isCompleted
                  );
                  
                  // Sequential progression: Present -> Past -> Future
                  let isLocked = false;
                  
                  if (timeFrame === "Past") {
                    // Past is locked until Present exam is passed
                    const presentCompleted = completedCourses.find(course => 
                      course.courseType === "beginner" && 
                      course.timeFrame === "Present" && 
                      course.examPassed
                    );
                    isLocked = !presentCompleted;
                  } else if (timeFrame === "Future") {
                    // Future is locked until Past exam is passed
                    const pastCompleted = completedCourses.find(course => 
                      course.courseType === "beginner" && 
                      course.timeFrame === "Past" && 
                      course.examPassed
                    );
                    isLocked = !pastCompleted;
                  }
                  
                  const iconMap = {
                    "Past": "⏮️",
                    "Present": "▶️",
                    "Future": "⏭️"
                  };
                  
                  const stepNumbers = {
                    "Present": "1",
                    "Past": "2", 
                    "Future": "3"
                  };
                  
                  return (
                    <div key={timeFrame} className="relative">
                      <button
                        onClick={() => !isLocked && handleBeginnerCourseTimeFrame(timeFrame)}
                        disabled={isLocked}
                        className={`w-full p-4 text-left ${
                          isLocked
                            ? 'bg-gray-500/20 border border-gray-500/30 opacity-50 cursor-not-allowed'
                            : isCompleted && completed?.examPassed
                            ? 'bg-green-600/30 border border-green-400/50 hover:bg-green-600/40'
                            : isCompleted 
                            ? 'bg-green-600/20 border border-green-500/30 hover:bg-green-600/30' 
                            : inProgress
                            ? 'bg-orange-600/20 border border-orange-500/30 hover:bg-orange-600/30'
                            : timeFrame === "Past"
                            ? 'bg-gray-500/20 border border-gray-500/30 hover:bg-gray-500/30'
                            : timeFrame === "Present"
                            ? 'bg-gray-500/20 border border-gray-500/30 hover:bg-gray-500/30'
                            : 'bg-gray-500/20 border border-gray-500/30 hover:bg-gray-500/30'
                        } rounded-xl text-white`}
                      >
                        <div className={`font-semibold text-lg flex items-center gap-2 ${
                          isLocked ? 'text-gray-400' :
                          isCompleted && completed?.examPassed ? 'text-green-100' :
                          isCompleted ? 'text-green-200' :
                          inProgress ? 'text-orange-200' :
                          'text-gray-200'
                        }`}>
                          <span className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-xs font-bold">
                            {stepNumbers[timeFrame as keyof typeof stepNumbers]}
                          </span>
                          {iconMap[timeFrame as keyof typeof iconMap]} {timeFrame} Tense - {tense}
                          {isCompleted && completed?.examPassed && <span className="ml-auto text-green-300">✓</span>}
                          {inProgress && <span className="ml-auto text-orange-300">📝</span>}
                          {isLocked && <span className="ml-auto text-gray-400">🔒</span>}
                        </div>
                        <div className={`text-sm mt-1 ${
                          isLocked ? 'text-gray-400' :
                          isCompleted && completed?.examPassed ? 'text-green-200' :
                          isCompleted ? 'text-green-300' :
                          inProgress ? 'text-orange-300' :
                          'text-gray-300'
                        }`}>
                          {isCompleted && completed?.examPassed 
                            ? `✅ Passed with ${completed.examScore || 'N/A'} points (Click to retake)`
                            : isCompleted 
                            ? "❌ Failed exam - Click to retry"
                            : inProgress 
                            ? "📝 In Progress - Click to continue"
                            : isLocked 
                            ? "🔒 Complete previous course first"
                            : "3 units (être, avoir, faire) + Final Exam (27/30 to pass)"
                          }
                        </div>
                        {isCompleted && !isLocked && (
                          <button
                            onClick={(e) => handleResetCourse("beginner", timeFrame, e)}
                            className="absolute top-2 right-2 w-6 h-6 bg-red-500/20 hover:bg-red-500/40 rounded-full flex items-center justify-center text-red-300 text-xs"
                            title="Reset this course"
                          >
                            ↺
                          </button>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowBeginnerCourseModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Beginner Pronoun Guide Modal */}
        {showBeginnerPronounGuide && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-center mb-4 text-gray-200">📚 French Pronouns Guide</h3>
              <p className="text-slate-300 text-center mb-6">Learn the basic French pronouns before starting your quiz:</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 p-2 bg-gray-600/20 rounded-lg">
                  <span className="text-xl">👤</span>
                  <div>
                    <span className="font-semibold text-white">Je</span>
                    <span className="text-gray-300 ml-2">= I</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-gray-600/20 rounded-lg">
                  <span className="text-xl">🫵</span>
                  <div>
                    <span className="font-semibold text-white">Tu</span>
                    <span className="text-gray-300 ml-2">= You (informal)</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-gray-600/20 rounded-lg">
                  <span className="text-xl">👔</span>
                  <div>
                    <span className="font-semibold text-white">Vous</span>
                    <span className="text-gray-300 ml-2">= You (formal/plural)</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-gray-600/20 rounded-lg">
                  <span className="text-xl">👨‍👩‍👧‍👦</span>
                  <div>
                    <span className="font-semibold text-white">Nous</span>
                    <span className="text-gray-300 ml-2">= We</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-gray-600/20 rounded-lg">
                  <span className="text-xl">👥</span>
                  <div>
                    <span className="font-semibold text-white">Ils</span>
                    <span className="text-gray-300 ml-2">= They (masculine & mixed)</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-2 bg-gray-600/20 rounded-lg">
                  <span className="text-xl">👩‍👩‍👧‍👧</span>
                  <div>
                    <span className="font-semibold text-white">Elles</span>
                    <span className="text-gray-300 ml-2">= They (feminine)</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowBeginnerPronounGuide(false);
                    setQuizState('loading');
                    // Continue with quiz generation
                    const continueQuiz = async () => {
                      try {
                        const timeFrameMapping = { "Past": "past", "Present": "present", "Future": "future" };
                        let finalTenseType = selectedTenseType;
                        if (selectedDifficulty === "Beginner" && selectedTimeFrame) {
                          const beginnerTenseMap = {
                            "Past": "Passé Composé",
                            "Present": "Présent", 
                            "Future": "Futur Simple"
                          };
                          finalTenseType = beginnerTenseMap[selectedTimeFrame as keyof typeof beginnerTenseMap] || "";
                        }
                        
                        const response = await fetch('/api/get-quiz', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            verb: selectedVerb,
                            timeFrame: timeFrameMapping[selectedTimeFrame as keyof typeof timeFrameMapping],
                            tenseType: finalTenseType,
                            difficulty: selectedDifficulty,
                          }),
                        });

                        const data = await response.json();
                        if (data.success) {
                          setQuizData(data.quiz.questions);
                          setCurrentQuestionIndex(0);
                          setUserAnswers({});
                          setSelectedAnswerIndex(null);
                          setIsAnswerConfirmed(false);
                          setQuizState('active');
                        }
                      } catch (error) {
                        console.error('Error starting quiz:', error);
                        setQuizState('config');
                      }
                    };
                    continueQuiz();
                  }}
                  className="w-full px-6 py-4 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 text-lg"
                >
                  Got it! Start Quiz
                </button>
                
                <button
                  onClick={() => {
                    localStorage.setItem('beginnerPronounGuideShown', 'true');
                    setBeginnerGuideShown(true);
                    setShowBeginnerPronounGuide(false);
                    setQuizState('loading');
                    // Continue with quiz generation
                    const continueQuiz = async () => {
                      try {
                        const timeFrameMapping = { "Past": "past", "Present": "present", "Future": "future" };
                        let finalTenseType = selectedTenseType;
                        if (selectedDifficulty === "Beginner" && selectedTimeFrame) {
                          const beginnerTenseMap = {
                            "Past": "Passé Composé",
                            "Present": "Présent", 
                            "Future": "Futur Simple"
                          };
                          finalTenseType = beginnerTenseMap[selectedTimeFrame as keyof typeof beginnerTenseMap] || "";
                        }
                        
                        const response = await fetch('/api/get-quiz', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            verb: selectedVerb,
                            timeFrame: timeFrameMapping[selectedTimeFrame as keyof typeof timeFrameMapping],
                            tenseType: finalTenseType,
                            difficulty: selectedDifficulty,
                          }),
                        });

                        const data = await response.json();
                        if (data.success) {
                          setQuizData(data.quiz.questions);
                          setCurrentQuestionIndex(0);
                          setUserAnswers({});
                          setSelectedAnswerIndex(null);
                          setIsAnswerConfirmed(false);
                          setQuizState('active');
                        }
                      } catch (error) {
                        console.error('Error starting quiz:', error);
                        setQuizState('config');
                      }
                    };
                    continueQuiz();
                  }}
                  className="w-full px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700"
                >
                  Don't remind me again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Novice Course Time Frame Modal */}
        {showNoviceCourseModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-center mb-4">📘 Novice Course</h3>
              <p className="text-slate-300 text-center mb-6">Choose any tense to start your learning journey</p>
              <div className="space-y-3 mb-6">
                {["Present", "Past", "Future"].map((timeFrame, index) => {
                  const beginnerTenseMap = {
                    "Past": "Passé Simple",
                    "Present": "Présent", 
                    "Future": "Futur Simple"
                  };
                  const tense = beginnerTenseMap[timeFrame as keyof typeof beginnerTenseMap];
                  
                  // Check completion status
                  const completed = completedCourses.find(course => 
                    course.courseType === "novice" && 
                    course.timeFrame === timeFrame
                  );
                  const isCompleted = completed && completed.examPassed;
                  
                  // Check for in-progress
                  const inProgress = courseProgressData.find(progress => 
                    progress.courseType === "novice" && 
                    progress.timeFrame === timeFrame &&
                    !progress.isCompleted
                  );
                  
                  // Sequential progression: Present -> Past -> Future
                  let isLocked = false;
                  
                  if (timeFrame === "Past") {
                    // Past is locked until Present exam is passed
                    const presentCompleted = completedCourses.find(course => 
                      course.courseType === "novice" && 
                      course.timeFrame === "Present" && 
                      course.examPassed
                    );
                    isLocked = !presentCompleted;
                  } else if (timeFrame === "Future") {
                    // Future is locked until Past exam is passed
                    const pastCompleted = completedCourses.find(course => 
                      course.courseType === "novice" && 
                      course.timeFrame === "Past" && 
                      course.examPassed
                    );
                    isLocked = !pastCompleted;
                  }
                  
                  const iconMap = {
                    "Past": "⏮️",
                    "Present": "▶️",
                    "Future": "⏭️"
                  };
                  
                  const stepNumbers = {
                    "Present": "1",
                    "Past": "2", 
                    "Future": "3"
                  };
                  
                  return (
                    <div key={timeFrame} className="relative">
                      <button
                        onClick={() => !isLocked && handleNoviceCourseTimeFrame(timeFrame)}
                        disabled={isLocked}
                        className={`w-full p-4 text-left ${
                          isLocked
                            ? 'bg-gray-500/20 border border-gray-500/30 opacity-50 cursor-not-allowed'
                            : isCompleted && completed?.examPassed
                            ? 'bg-green-600/30 border border-green-400/50 hover:bg-green-600/40'
                            : isCompleted 
                            ? 'bg-green-600/20 border border-green-500/30 hover:bg-green-600/30' 
                            : inProgress
                            ? 'bg-orange-600/20 border border-orange-500/30 hover:bg-orange-600/30'
                            : timeFrame === "Past"
                            ? 'bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30'
                            : timeFrame === "Present"
                            ? 'bg-green-500/20 border border-green-500/30 hover:bg-green-500/30'
                            : 'bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30'
                        } rounded-xl text-white`}
                      >
                        <div className={`font-semibold text-lg flex items-center gap-2 ${
                          isLocked ? 'text-gray-400' :
                          isCompleted && completed?.examPassed ? 'text-green-100' :
                          isCompleted ? 'text-green-200' : 
                          inProgress ? 'text-orange-200' :
                          timeFrame === "Past" ? 'text-purple-200' : 
                          timeFrame === "Present" ? 'text-green-200' : 
                          'text-blue-200'
                        }`}>
                          <span className="w-6 h-6 rounded-full bg-current bg-opacity-20 flex items-center justify-center text-sm font-bold">
                            {stepNumbers[timeFrame as keyof typeof stepNumbers]}
                          </span>
                          {iconMap[timeFrame as keyof typeof iconMap]} {timeFrame} Tense Course
                          {isCompleted && completed?.examPassed && <span className="text-sm text-green-300">✓ Passed</span>}
                          {isCompleted && !completed?.examPassed && <span className="text-sm">✓ Completed</span>}
                          {inProgress && <span className="text-sm">⏳ In Progress</span>}
                          {isLocked && timeFrame === "Past" && <span className="text-sm">🔒 Complete Present exam first</span>}
                          {isLocked && timeFrame === "Future" && <span className="text-sm">🔒 Complete Past exam first</span>}
                        </div>
                        <div className="text-slate-300 text-sm mt-1">
                          Section 1: 80 mixed questions (20 from each verb) + Final Exam (90% to pass)
                        </div>
                        {inProgress && (
                          <div className="text-orange-200 text-xs mt-1">
                            Progress: {inProgress.currentVerbIndex}/5 units & exam completed
                          </div>
                        )}
                        {isCompleted && (
                          <div className="text-green-200 text-xs mt-1">
                            Progress: 5/5 units & exam completed
                          </div>
                        )}
                      </button>
                      
                      {/* Reset button for completed courses */}
                      {isCompleted && (
                        <button
                          onClick={(e) => handleResetCourse("beginner", timeFrame, e)}
                          className="absolute top-2 right-2 w-6 h-6 bg-blue-500/70 hover:bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors"
                          title="Reset course (mark as not passed)"
                        >
                          ↻
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  setShowNoviceCourseModal(false);
                  setShowMiniCoursesModal(true);
                }}
                className="w-full p-3 text-slate-400 border border-slate-600 rounded-xl hover:bg-slate-600/20"
              >
                Back to Mini-Courses
              </button>
            </div>
          </div>
        )}

        {/* Elementary Course Time Frame Modal */}
        {showElementaryCourseModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-center mb-4">🟢 Elementary Course</h3>
              <p className="text-slate-300 text-center mb-6">Choose any tense to start your learning journey</p>
              <div className="space-y-3 mb-6">
                {["Present", "Past", "Future"].map((timeFrame, index) => {
                  // Check completion status for Elementary course
                  const completed = completedCourses.find(course => 
                    course.courseType === "easy" && 
                    course.timeFrame === timeFrame
                  );
                  const isCompleted = completed && completed.examPassed;
                  
                  // Check for in-progress
                  const inProgress = courseProgressData.find(progress => 
                    progress.courseType === "easy" && 
                    progress.timeFrame === timeFrame &&
                    !progress.isCompleted
                  );
                  
                  // For Elementary level, require Novice completion first
                  const beginnerCompleted = completedCourses.some(course => 
                    course.courseType === "beginner" && course.examPassed
                  );
                  const isLocked = !beginnerCompleted;
                  
                  const iconMap = {
                    "Past": "⏮️",
                    "Present": "▶️",
                    "Future": "⏭️"
                  };
                  
                  const stepNumbers = {
                    "Present": "1",
                    "Past": "2", 
                    "Future": "3"
                  };
                  
                  return (
                    <div key={timeFrame} className="relative">
                      <button
                        onClick={() => !isLocked && handleElementaryCourseTimeFrame(timeFrame)}
                        disabled={isLocked}
                        className={`w-full p-4 text-left ${
                          isLocked
                            ? 'bg-gray-500/20 border border-gray-500/30 opacity-50 cursor-not-allowed'
                            : isCompleted && completed?.examPassed
                            ? 'bg-green-600/30 border border-green-400/50 hover:bg-green-600/40'
                            : isCompleted 
                            ? 'bg-green-600/20 border border-green-500/30 hover:bg-green-600/30' 
                            : inProgress
                            ? 'bg-orange-600/20 border border-orange-500/30 hover:bg-orange-600/30'
                            : timeFrame === "Past"
                            ? 'bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30'
                            : timeFrame === "Present"
                            ? 'bg-green-500/20 border border-green-500/30 hover:bg-green-500/30'
                            : 'bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30'
                        } rounded-xl text-white`}
                      >
                        <div className={`font-semibold text-lg ${
                          isCompleted && completed?.examPassed
                            ? 'text-green-300'
                            : isCompleted
                            ? 'text-green-200'
                            : inProgress
                            ? 'text-orange-200'
                            : timeFrame === "Past"
                            ? 'text-purple-200'
                            : timeFrame === "Present"
                            ? 'text-green-200'
                            : 'text-blue-200'
                        }`}>
                          {iconMap[timeFrame as keyof typeof iconMap]} {timeFrame} Tense Course
                          {isCompleted && completed?.examPassed && <span className="text-green-300 ml-2">✓ Passed</span>}
                          {isCompleted && !completed?.examPassed && <span className="text-green-200 ml-2">✓ Completed</span>}
                          {isLocked && <span className="text-sm">🔒 Complete Novice exam first</span>}
                        </div>
                        <div className="text-slate-300 text-sm mt-1">
                          6 Units (20 questions each) + Final Exam (60 questions, 90% to pass)
                        </div>
                        {inProgress && (
                          <div className="text-orange-200 text-xs mt-1">
                            Progress: {inProgress.currentVerbIndex}/7 units & exam completed
                          </div>
                        )}
                        {isCompleted && (
                          <div className="text-green-200 text-xs mt-1">
                            Progress: 7/7 units & exam completed
                          </div>
                        )}
                      </button>
                      
                      {/* Reset button for completed courses */}
                      {isCompleted && (
                        <button
                          onClick={(e) => handleResetCourse("easy", timeFrame, e)}
                          className="absolute top-2 right-2 w-6 h-6 bg-blue-500/70 hover:bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors"
                          title="Reset course (mark as not passed)"
                        >
                          ↻
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  setShowElementaryCourseModal(false);
                  setShowMiniCoursesModal(true);
                }}
                className="w-full p-3 text-slate-400 border border-slate-600 rounded-xl hover:bg-slate-600/20"
              >
                Back to Mini-Courses
              </button>
            </div>
          </div>
        )}

        {/* Intermediate Course Modal */}
        {showIntermediateCourseModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-center mb-4">🟡 Intermediate Course</h3>
              <p className="text-slate-300 text-center mb-6">Choose any tense to start your learning journey</p>
              <div className="space-y-3 mb-6">
                {["Present", "Past", "Future"].map((timeFrame, index) => {
                  // Check completion status for Intermediate course
                  const completed = completedCourses.find(course => 
                    course.courseType === "moderate" && 
                    course.timeFrame === timeFrame
                  );
                  const isCompleted = completed && completed.examPassed;
                  
                  // Check for in-progress
                  const inProgress = courseProgressData.find(progress => 
                    progress.courseType === "moderate" && 
                    progress.timeFrame === timeFrame &&
                    !progress.isCompleted
                  );
                  
                  // For Intermediate level, require Elementary completion first
                  const easyCompleted = completedCourses.some(course => 
                    course.courseType === "easy" && course.examPassed
                  );
                  const isLocked = !easyCompleted;
                  
                  const iconMap = {
                    "Past": "⏮️",
                    "Present": "▶️",
                    "Future": "⏭️"
                  };
                  
                  return (
                    <div key={timeFrame} className="relative">
                      <button
                        onClick={() => !isLocked && handleIntermediateCourseTimeFrame(timeFrame)}
                        disabled={isLocked}
                        className={`w-full p-4 text-left ${
                          isLocked
                            ? 'bg-gray-500/20 border border-gray-500/30 opacity-50 cursor-not-allowed'
                            : isCompleted && completed?.examPassed
                            ? 'bg-green-600/30 border border-green-400/50 hover:bg-green-600/40'
                            : isCompleted 
                            ? 'bg-green-600/20 border border-green-500/30 hover:bg-green-600/30' 
                            : inProgress
                            ? 'bg-orange-600/20 border border-orange-500/30 hover:bg-orange-600/30'
                            : timeFrame === "Past"
                            ? 'bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30'
                            : timeFrame === "Present"
                            ? 'bg-green-500/20 border border-green-500/30 hover:bg-green-500/30'
                            : 'bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30'
                        } rounded-xl text-white`}
                      >
                        <div className={`font-semibold text-lg ${
                          isCompleted && completed?.examPassed
                            ? 'text-green-300'
                            : isCompleted
                            ? 'text-green-200'
                            : inProgress
                            ? 'text-orange-200'
                            : timeFrame === "Past"
                            ? 'text-purple-200'
                            : timeFrame === "Present"
                            ? 'text-green-200'
                            : 'text-blue-200'
                        }`}>
                          {iconMap[timeFrame as keyof typeof iconMap]} {timeFrame} Tense Course
                          {isCompleted && completed?.examPassed && <span className="text-green-300 ml-2">✓ Passed</span>}
                          {isCompleted && !completed?.examPassed && <span className="text-green-200 ml-2">✓ Completed</span>}
                          {isLocked && <span className="text-sm">🔒 Complete Elementary exam first</span>}
                        </div>
                        <div className="text-slate-300 text-sm mt-1">
                          8 Units (20 questions each) + Final Exam (80 questions, 90% to pass)
                        </div>
                        {inProgress && (
                          <div className="text-orange-200 text-xs mt-1">
                            Progress: {inProgress.currentVerbIndex}/8 units & exam completed
                          </div>
                        )}
                        {isCompleted && (
                          <div className="text-green-200 text-xs mt-1">
                            Progress: 8/8 units & exam completed
                          </div>
                        )}
                      </button>
                      
                      {/* Reset button for completed courses */}
                      {isCompleted && (
                        <button
                          onClick={(e) => handleResetCourse("moderate", timeFrame, e)}
                          className="absolute top-2 right-2 w-6 h-6 bg-blue-500/70 hover:bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors"
                          title="Reset course (mark as not passed)"
                        >
                          ↻
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              
              <button
                onClick={() => {
                  setShowIntermediateCourseModal(false);
                  setShowMiniCoursesModal(true);
                }}
                className="w-full p-3 text-slate-400 border border-slate-600 rounded-xl hover:bg-slate-600/20"
              >
                Back to Mini-Courses
              </button>
            </div>
          </div>
        )}

        {/* Course Overview Modal - Unit Structure */}
        {showCourseOverviewModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-4xl w-full mx-4">
              <div className="text-center mb-8">
                <div className="text-4xl mb-2">📚</div>
                <h3 className="text-3xl font-bold mb-2">
                  {selectedCourseTimeFrame} Tense Course Overview
                </h3>
                <p className="text-sm text-slate-300 italic">
                  French Verb Master - For serious students.
                </p>
              </div>
              
              {(() => {
                const config = DIFFICULTY_CONFIGS[selectedCourseLevel as keyof typeof DIFFICULTY_CONFIGS];
                const allUnits = config?.courseStructure?.units || [];
                // For non-Advanced courses, limit to first 3 units only
                const units = selectedCourseLevel === 'Advanced' ? allUnits : allUnits.slice(0, 3);
                const finalExam = config?.courseStructure?.finalExam;
                
                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Course Structure Section */}
                    <div className="bg-white/5 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-2xl">🎯</div>
                        <h4 className="text-xl font-semibold text-white">Course Structure</h4>
                      </div>
                      <div className="space-y-3 mb-4">
                        {units.map((unit: any, index: number) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <span className="font-medium text-white">{unit.name} ({unit.questions} questions)</span>
                          </div>
                        ))}
                        <div className="flex items-center gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                          <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            🏆
                          </div>
                          <span className="font-medium text-white">Final Exam ({finalExam?.questions} questions)</span>
                        </div>
                      </div>
                    </div>

                    {/* What You'll Learn Section */}
                    <div className="bg-white/5 rounded-xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="text-2xl">✨</div>
                        <h4 className="text-xl font-semibold text-white">What You'll Learn</h4>
                      </div>
                      <ul className="space-y-2 text-slate-300 mb-4">
                        <li>• Master the {selectedCourseLevel === 'Advanced' ? config.verbs.length : Math.min(3, config.verbs.length)} most essential French verbs</li>
                        <li>• Practice {selectedCourseTimeFrame === "Present" ? "Présent" : selectedCourseTimeFrame === "Past" ? "Passé Composé" : "Futur Simple"} conjugations</li>
                        <li>• Learn proper French grammar patterns</li>
                        <li>• Build confidence with structured progression</li>
                        <li>• Achieve 90% mastery on final exam</li>
                      </ul>
                      
                      {finalExam && (
                        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
                          <div className="text-center">
                            <div className="text-lg font-semibold text-yellow-200 mb-1">We have high standards!</div>
                            <p className="text-sm text-slate-300">
                              Final exam requires 90% ({selectedCourseLevel === 'Advanced' ? finalExam.passThreshold : Math.ceil((selectedCourseLevel === 'Advanced' ? finalExam.questions : units.length * 10) * 0.9)}/{selectedCourseLevel === 'Advanced' ? finalExam.questions : units.length * 10}) to pass and unlock the next course.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
              
              {/* Individual Unit Selection Grid */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-center mb-6 text-white">Select a Unit to Practice</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {(() => {
                    const config = DIFFICULTY_CONFIGS[selectedCourseLevel as keyof typeof DIFFICULTY_CONFIGS];
                    const allUnits = config?.courseStructure?.units || [];
                    // For non-Advanced courses, limit to appropriate number of units
                    const units = selectedCourseLevel === 'Advanced' ? allUnits : allUnits.slice(0, 
                      selectedCourseLevel === 'Novice' ? 4 : 
                      selectedCourseLevel === 'Elementary' ? 6 : 
                      selectedCourseLevel === 'Intermediate' ? 8 : allUnits.length
                    );
                    
                    return units.map((unit: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSelectedUnit(unit);
                          setShowCourseOverviewModal(false);
                          setShowUnitIntroModal(true);
                        }}
                        className="p-4 text-left bg-purple-500/20 border border-purple-500/30 rounded-xl text-white hover:bg-purple-500/30 transition-colors"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div className="font-semibold text-lg">
                            Unit {index + 1}: {unit.verb}
                          </div>
                        </div>
                        <div className="text-purple-200 text-sm ml-11">
                          ({VERB_MEANINGS[unit.verb as keyof typeof VERB_MEANINGS] || unit.verb}) ({unit.questions} questions)
                        </div>
                      </button>
                    ));
                  })()}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowCourseOverviewModal(false);
                    // Start with Unit 1
                    const config = DIFFICULTY_CONFIGS[selectedCourseLevel as keyof typeof DIFFICULTY_CONFIGS];
                    const firstUnit = config.courseStructure.units[0];
                    setSelectedUnit(firstUnit);
                    setShowUnitIntroModal(true);
                  }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-white font-medium shadow-lg text-lg"
                >
                  Start Unit 1: '{DIFFICULTY_CONFIGS[selectedCourseLevel as keyof typeof DIFFICULTY_CONFIGS]?.courseStructure?.units?.[0]?.verb}' →
                </button>
                
                <button
                  onClick={() => {
                    handleStartCourseOverviewFinalExam(selectedCourseLevel, selectedCourseTimeFrame);
                  }}
                  className="w-full px-6 py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-xl text-white font-medium shadow-lg text-lg"
                >
                  🏆 Take Final Exam ({DIFFICULTY_CONFIGS[selectedCourseLevel as keyof typeof DIFFICULTY_CONFIGS]?.courseStructure?.finalExam?.questions} questions)
                </button>
                
                <button
                  onClick={() => setShowCourseOverviewModal(false)}
                  className="w-full px-6 py-3 bg-slate-600 hover:bg-slate-500 rounded-xl text-white font-medium"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Unit Introduction Modal */}
        {showUnitIntroModal && selectedUnit && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-lg w-full mx-4">
              <div className="text-center mb-6">
                <div className="text-4xl mb-2">📖</div>
                <h3 className="text-2xl font-bold mb-2">{selectedUnit.name}</h3>
                <p className="text-lg text-purple-200">
                  Learn the French verb '{selectedUnit.verb}'
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-lg mb-3 text-center">About '{selectedUnit.verb}'</h4>
                <div className="space-y-3 text-slate-300">
                  {(() => {
                    const verbDescriptions: Record<string, { meaning: string; description: string; example: string }> = {
                      "être": {
                        meaning: "to be",
                        description: "The most fundamental French verb, used to describe states of being, identity, and location.",
                        example: "Je suis étudiant. (I am a student.)"
                      },
                      "avoir": {
                        meaning: "to have",
                        description: "Essential for expressing possession and forming compound tenses in French.",
                        example: "J'ai un livre. (I have a book.)"
                      },
                      "faire": {
                        meaning: "to do/make",
                        description: "One of the most versatile verbs, used in countless French expressions and activities.",
                        example: "Je fais mes devoirs. (I do my homework.)"
                      },
                      "dire": {
                        meaning: "to say/tell",
                        description: "Essential for communication and expressing thoughts in French.",
                        example: "Je dis la vérité. (I tell the truth.)"
                      },
                      "aller": {
                        meaning: "to go",
                        description: "Crucial for expressing movement and forming the near future tense.",
                        example: "Je vais à l'école. (I go to school.)"
                      },
                      "voir": {
                        meaning: "to see",
                        description: "Important for expressing perception and understanding.",
                        example: "Je vois la tour Eiffel. (I see the Eiffel Tower.)"
                      }
                    };
                    
                    const info = verbDescriptions[selectedUnit.verb] || {
                      meaning: "French verb",
                      description: "An important French verb used in everyday conversation.",
                      example: `Example with '${selectedUnit.verb}'`
                    };
                    
                    return (
                      <div>
                        <p><strong>Meaning:</strong> {info.meaning}</p>
                        <p><strong>Usage:</strong> {info.description}</p>
                        <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3 mt-3">
                          <p className="text-sm"><strong>Example:</strong> {info.example}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6 text-center">
                <p className="text-blue-200 text-sm">
                  This unit contains <strong>{selectedUnit.questions} questions</strong> focusing on '{selectedUnit.verb}' in the {selectedCourseTimeFrame.toLowerCase()} tense.
                </p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowUnitIntroModal(false);
                    setShowCourseOverviewModal(true);
                  }}
                  className="flex-1 px-6 py-3 bg-slate-600 hover:bg-slate-500 rounded-xl text-white font-medium"
                >
                  Back to Overview
                </button>
                <button
                  onClick={() => {
                    setShowUnitIntroModal(false);
                    handleStartUnitQuiz(selectedCourseLevel, selectedCourseTimeFrame, selectedUnit);
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 rounded-xl text-white font-medium shadow-lg"
                >
                  Start Unit Quiz →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Part Selection Modal */}
        {showPartSelectionModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-lg w-full mx-4">
              <h3 className="text-2xl font-bold text-center mb-4">
                {selectedCourseLevel} Course - {selectedCourseTimeFrame} Tense
              </h3>
              <p className="text-slate-300 text-center mb-6">
                {selectedUnit === "section1" ? 
                  "Choose a section to practice. Complete all parts to unlock the final exam." :
                  "Choose an exam part. You must pass both parts with 90% combined score."
                }
              </p>
              
              <div className="space-y-3 mb-6">
                <p className="text-slate-300 text-center">Course configuration in progress...</p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPartSelectionModal(false)}
                  className="flex-1 px-6 py-3 bg-slate-600 hover:bg-slate-500 rounded-xl text-white font-medium"
                >
                  Back
                </button>
                {selectedUnit === "section1" && (
                  <button
                    onClick={() => {
                      // Final exam - handled separately;
                    }}
                    className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-500 rounded-xl text-white font-medium"
                  >
                    Go to Final Exam
                  </button>
                )}
              </div>
            </div>
          </div>
        )}



        {/* Advanced Course Modal */}
        {showAdvancedCourseModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-center mb-4">🔴 Advanced Course</h3>
              <p className="text-slate-300 text-center mb-6">Choose any tense to start your learning journey</p>
              <div className="space-y-3 mb-6">
                {["Present", "Past", "Future"].map((timeFrame, index) => {
                  // Check completion status for Advanced course
                  const completed = completedCourses.find(course => 
                    course.courseType === "advanced" && 
                    course.timeFrame === timeFrame
                  );
                  const isCompleted = completed && completed.examPassed;
                  
                  // Check for in-progress
                  const inProgress = courseProgressData.find(progress => 
                    progress.courseType === "advanced" && 
                    progress.timeFrame === timeFrame &&
                    !progress.isCompleted
                  );
                  
                  // Advanced level is now unlocked for everyone
                  const isLocked = false;
                  
                  const iconMap = {
                    "Past": "⏮️",
                    "Present": "▶️",
                    "Future": "⏭️"
                  };
                  
                  return (
                    <div key={timeFrame} className="relative">
                      <button
                        onClick={() => !isLocked && handleAdvancedCourseTimeFrame(timeFrame)}
                        disabled={isLocked}
                        className={`w-full p-4 text-left ${
                          isLocked
                            ? 'bg-gray-500/20 border border-gray-500/30 opacity-50 cursor-not-allowed'
                            : isCompleted && completed?.examPassed
                            ? 'bg-green-600/30 border border-green-400/50 hover:bg-green-600/40'
                            : isCompleted 
                            ? 'bg-green-600/20 border border-green-500/30 hover:bg-green-600/30' 
                            : inProgress
                            ? 'bg-orange-600/20 border border-orange-500/30 hover:bg-orange-600/30'
                            : timeFrame === "Past"
                            ? 'bg-purple-500/20 border border-purple-500/30 hover:bg-purple-500/30'
                            : timeFrame === "Present"
                            ? 'bg-green-500/20 border border-green-500/30 hover:bg-green-500/30'
                            : 'bg-blue-500/20 border border-blue-500/30 hover:bg-blue-500/30'
                        } rounded-xl text-white`}
                      >
                        <div className={`font-semibold text-lg ${
                          isCompleted && completed?.examPassed
                            ? 'text-green-300'
                            : isCompleted
                            ? 'text-green-200'
                            : inProgress
                            ? 'text-orange-200'
                            : timeFrame === "Past"
                            ? 'text-purple-200'
                            : timeFrame === "Present"
                            ? 'text-green-200'
                            : 'text-blue-200'
                        }`}>
                          {iconMap[timeFrame as keyof typeof iconMap]} {timeFrame} Tense Course
                          {isCompleted && completed?.examPassed && <span className="text-green-300 ml-2">✓ Passed</span>}
                          {isCompleted && !completed?.examPassed && <span className="text-green-200 ml-2">✓ Completed</span>}
                          {isLocked && <span className="text-sm">🔒 Complete Intermediate exam first</span>}
                        </div>
                        <div className="text-slate-300 text-sm mt-1">
                          13 Units (20 questions each) + Final Exam (130 questions, 90% to pass)
                        </div>
                        {inProgress && (
                          <div className="text-orange-200 text-xs mt-1">
                            Progress: {inProgress.currentVerbIndex}/13 units & exam completed
                          </div>
                        )}
                        {isCompleted && (
                          <div className="text-green-200 text-xs mt-1">
                            Progress: 13/13 units & exam completed
                          </div>
                        )}
                      </button>
                      
                      {/* Reset button for completed courses */}
                      {isCompleted && (
                        <button
                          onClick={(e) => handleResetCourse("advanced", timeFrame, e)}
                          className="absolute top-2 right-2 w-6 h-6 bg-blue-500/70 hover:bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors"
                          title="Reset course (mark as not passed)"
                        >
                          ↻
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  setShowAdvancedCourseModal(false);
                  setShowMiniCoursesModal(true);
                }}
                className="w-full p-3 text-slate-400 border border-slate-600 rounded-xl hover:bg-slate-600/20"
              >
                Back to Mini-Courses
              </button>
            </div>
          </div>
        )}
        
        {/* Privacy Policy Footer Link */}
        <div className="fixed bottom-4 right-4">
          <Link href="/privacy">
            <button className="px-3 py-2 bg-slate-700/80 hover:bg-slate-600/80 backdrop-blur-sm border border-slate-500/50 rounded-lg text-slate-300 hover:text-white text-sm transition-colors">
              Privacy Policy
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default App;