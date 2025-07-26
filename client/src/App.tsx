import { useState, useEffect } from "react";

function App() {
  // French Verb Master - No reminder version
  const [selectedVerb, setSelectedVerb] = useState("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("");
  const [selectedTenseType, setSelectedTenseType] = useState("");
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [showMiniCoursesModal, setShowMiniCoursesModal] = useState(false);
  const [showBeginnerCourseModal, setShowBeginnerCourseModal] = useState(false);
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
  const [courseInfo, setCourseInfo] = useState<{
    timeFrame: string;
    tense: string;
    currentVerbIndex: number;
    completedVerbs: Array<{verb: string, score: number}>;
    totalScore: number;
    totalQuestions: number;
  } | null>(null);
  const [showCourseProgress, setShowCourseProgress] = useState(false);
  const [showExamOption, setShowExamOption] = useState(false);
  const [completedCourses, setCompletedCourses] = useState<any[]>([]);
  const [courseProgressData, setCourseProgressData] = useState<any[]>([]);


  const FRENCH_VERBS = ["être", "avoir", "faire", "dire", "aller", "voir", "savoir", "pouvoir", "vouloir", "venir"];
  
  const TIME_FRAMES = {
    "Past": ["Passé Composé", "Imparfait", "Plus-que-parfait", "Passé Simple"],
    "Present": ["Présent", "Présent Progressif"], 
    "Future": ["Futur Simple", "Futur Antérieur", "Futur Proche"],
  };

  const DIFFICULTY_CONFIGS = {
    "Beginner": { 
      verbs: ["être", "avoir", "faire", "aller"], 
      timeFrames: ["Present", "Past", "Future"], 
      tenses: ["Présent", "Passé Simple", "Futur Simple"] 
    },
    "Easy": { verbs: ["être", "avoir", "faire"], timeFrames: ["Present"], tenses: ["Présent"] },
    "Moderate": { verbs: ["être", "avoir", "faire", "dire", "aller", "voir"], timeFrames: ["Present", "Past", "Future"], tenses: ["Présent", "Passé Composé", "Imparfait", "Futur Simple"] },
    "Difficult": { verbs: [...FRENCH_VERBS], timeFrames: Object.keys(TIME_FRAMES), tenses: Object.values(TIME_FRAMES).flat() }
  };

  const handleStartQuiz = async () => {
    // For beginner, automatically set tense if not already set
    let finalTenseType = selectedTenseType;
    if (selectedDifficulty === "Beginner" && !selectedTenseType && selectedTimeFrame) {
      const beginnerTenseMap = {
        "Past": "Passé Simple",
        "Present": "Présent", 
        "Future": "Futur Simple"
      };
      finalTenseType = beginnerTenseMap[selectedTimeFrame as keyof typeof beginnerTenseMap] || "";
    }
    
    if (!selectedVerb || !selectedTimeFrame || (!finalTenseType && selectedDifficulty !== "Beginner")) return;
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
    if (difficulty === "Easy") {
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
      // Generate 20 questions total: 5 questions from each of the 4 verbs for final exam
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
            difficulty: "Beginner",
          })
        });

        const data = await response.json();
        if (data.success) {
          // Take exactly 5 questions from each verb for final exam
          allQuestions.push(...data.quiz.questions.slice(0, 5));
        }
      }
      
      // Shuffle all 20 final exam questions (5 from each of the 4 verbs)
      const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
      
      setQuizData(shuffledQuestions); // 20 final exam questions
      setCurrentQuestionIndex(0);
      setUserAnswers({});
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
    } else {
      // For now, just select the difficulty and close modal
      setSelectedDifficulty(difficulty);
      setSelectedVerb("");
      setSelectedTimeFrame("");
      setSelectedTenseType("");
      setShowMiniCoursesModal(false);
    }
  };

  const handleBeginnerCourseTimeFrame = async (timeFrame: string) => {
    const beginnerTenseMap = {
      "Past": "Passé Simple",
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
      currentVerbIndex: 0,
      completedVerbs: [],
      totalScore: 0,
      totalQuestions: 0
    };
    
    setCourseInfo(newCourseInfo);
    setShowBeginnerCourseModal(false);
    
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
            difficulty: "Beginner",
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
    setCourseInfo(null);
    setShowCourseProgress(false);
    setShowExamOption(false);
    setIsAnswerConfirmed(false);
  };

  const calculateResults = () => {
    let correctAnswers = 0;
    quizData.forEach((question, index) => {
      const userAnswerIndex = userAnswers[index];
      if (userAnswerIndex !== undefined && question.answerOptions[userAnswerIndex]?.isCorrect) {
        correctAnswers++;
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
            {currentQuestion.answerOptions.map((option: any, index: number) => (
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
                {option.text}
              </button>
            ))}
          </div>



          {selectedAnswerIndex !== null && isAnswerConfirmed && (
            <div className={`mb-6 p-4 rounded-xl border ${
              currentQuestion.answerOptions[selectedAnswerIndex].isCorrect
                ? 'border-green-500/30 bg-green-500/20 text-green-200'
                : 'border-red-500/30 bg-red-500/20 text-red-200'
            }`}>
              <p>📝 {currentQuestion.answerOptions[selectedAnswerIndex].rationale}</p>
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
                <div className={`px-3 py-2 rounded-lg text-sm font-medium mx-auto max-w-xs ${
                  courseInfo.currentVerbIndex > 4 ? 'bg-yellow-500/20 text-yellow-300' : 'bg-gray-500/20 text-gray-400'
                }`}>
                  Final Exam {courseInfo.currentVerbIndex > 4 ? '✓' : ''}
                  <div className="text-xs opacity-75">(20 mixed questions)</div>
                </div>
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

    // Handle exam results (when currentVerbIndex is 5)
    if (courseInfo && courseInfo.currentVerbIndex === 5) {
      // For exam, we need exactly 18/20 or higher (90%)
      const examPassed = correctAnswers >= 18;
      
      // Debug logging
      console.log(`Exam Results: ${correctAnswers}/${totalQuestions} = ${percentage}%`);
      console.log(`Exam passed: ${examPassed} (need 18/20 or higher)`);
      
      // Save completed course if passed - do this once when exam is complete
      if (examPassed && !completedCourses.some(course => 
        course.courseType === "beginner" && 
        course.timeFrame === courseInfo.timeFrame
      )) {
        const saveCompletedCourse = async () => {
          try {
            await fetch('/api/completed-courses', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: 1,
                courseType: "beginner",
                timeFrame: courseInfo.timeFrame,
                tense: courseInfo.tense,
                totalScore: courseInfo.totalScore + correctAnswers,
                totalQuestions: courseInfo.totalQuestions + totalQuestions,
                examScore: correctAnswers,
                examPassed: examPassed
              })
            });
            await loadUserData(); // Refresh completed courses
          } catch (error) {
            console.error('Error saving completed course:', error);
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
                    `We have high standards! You need 90% (18/20) to pass. You got ${correctAnswers}/20. Try again!`
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
                              difficulty: "Beginner",
                            })
                          });
                          
                          const data = await response.json();
                          if (data.success) {
                            allQuestions.push(...data.quiz.questions.slice(0, 5));
                          }
                        }
                        
                        const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
                        setQuizData(shuffledQuestions);
                        setCurrentQuestionIndex(0);
                        setUserAnswers({});
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
            <h2 className="text-4xl font-bold mb-6">Quiz Complete!</h2>
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
                const userAnswer = userAnswerIndex !== undefined ? question.answerOptions[userAnswerIndex] : null;
                const correctAnswer = question.answerOptions.find((option: any) => option.isCorrect);
                const isCorrect = userAnswer?.isCorrect || false;

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
                              {userAnswer ? userAnswer.text : 'No answer selected'}
                            </span>
                          </div>
                          {!isCorrect && correctAnswer && (
                            <div className="flex items-center gap-2">
                              <span className="text-green-300">Correct answer:</span>
                              <span className="text-green-200">{correctAnswer.text}</span>
                            </div>
                          )}
                          <div className="text-slate-300 text-xs mt-2">
                            {userAnswer?.rationale || correctAnswer?.rationale}
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
              Try Another Quiz
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
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                    <span>Unit 4: aller (20 questions)</span>
                  </div>
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/20">
                    <span className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center text-sm font-bold">🏆</span>
                    <span className="font-semibold">Final Exam (20 mixed questions)</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-4 text-green-200">✨ What You'll Learn</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Master the 4 most essential French verbs</li>
                  <li>• Practice {courseInfo.tense} conjugations</li>
                  <li>• Learn proper French grammar patterns</li>
                  <li>• Build confidence with structured progression</li>
                  <li>• Achieve 90% mastery on final exam</li>
                </ul>
                
                <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-200 font-semibold">We have high standards!</p>
                  <p className="text-sm text-slate-300 mt-1">Final exam requires 90% (18/20) to pass and unlock the next course.</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setCourseInfo({...courseInfo, currentVerbIndex: 1});
                }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700"
              >
                Start Unit 1: être →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show individual verb unit introduction
  if (quizState === 'config' && courseInfo && courseInfo.currentVerbIndex >= 1 && courseInfo.currentVerbIndex <= 4 && quizData.length === 0) {
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
                        difficulty: "Beginner",
                      })
                    });
                    
                    const data = await response.json();
                    if (data.success) {
                      setQuizData(data.quiz.questions);
                      setCurrentQuestionIndex(0);
                      setUserAnswers({});
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
                const newDifficulty = e.target.value;
                setSelectedDifficulty(newDifficulty);
                // Reset dependent selections when difficulty changes
                setSelectedVerb("");
                setSelectedTimeFrame("");
                setSelectedTenseType("");
                
                // If switching to beginner and current verb isn't in top 4, reset
                if (newDifficulty === "Beginner") {
                  const beginnerVerbs = ["être", "avoir", "faire", "aller"];
                  if (selectedVerb && !beginnerVerbs.includes(selectedVerb)) {
                    setSelectedVerb("");
                  }
                }
              }}
              className="w-full p-4 rounded-xl border border-white/20 bg-white/10 text-white text-lg"
            >
              <option value="" className="bg-gray-800 text-white">Select difficulty level...</option>
              <option value="Beginner" className="bg-gray-800 text-white">🔵 Beginner - Top 4 verbs, simple subject + verb (Je suis, Tu es)</option>
              <option value="Easy" className="bg-gray-800 text-white">🟢 Easy - Basic verbs, present tense only</option>
              <option value="Moderate" className="bg-gray-800 text-white">🟡 Moderate - 6 verbs, multiple tenses</option>
              <option value="Difficult" className="bg-gray-800 text-white">🔴 Difficult - All verbs and tenses</option>
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
              {selectedDifficulty && (selectedDifficulty === "Beginner" 
                ? ["être", "avoir", "faire", "aller"]
                : DIFFICULTY_CONFIGS[selectedDifficulty as keyof typeof DIFFICULTY_CONFIGS]?.verbs || FRENCH_VERBS
              ).map((verb) => (
                <option key={verb} value={verb} className="bg-gray-800 text-white">{verb}</option>
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
                // For beginner difficulty, automatically set tense based on time frame
                if (selectedDifficulty === "Beginner") {
                  const beginnerTenseMap = {
                    "Past": "Passé Simple",
                    "Present": "Présent", 
                    "Future": "Futur Simple"
                  };
                  setSelectedTenseType(beginnerTenseMap[e.target.value as keyof typeof beginnerTenseMap] || "");
                } else {
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

          {selectedDifficulty !== "Beginner" && (
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
            disabled={!selectedDifficulty || !selectedVerb || !selectedTimeFrame || (!selectedTenseType && selectedDifficulty !== "Beginner")}
            className={`w-full p-4 text-lg font-bold rounded-xl transition-all ${
              (selectedDifficulty && selectedVerb && selectedTimeFrame && (selectedTenseType || selectedDifficulty === "Beginner"))
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
                : 'bg-slate-600 text-slate-400 cursor-not-allowed'
            }`}
          >
            {selectedDifficulty && selectedVerb && selectedTimeFrame && (selectedTenseType || selectedDifficulty === "Beginner")
              ? `Start ${selectedVerb} Quiz (${selectedDifficulty} - ${selectedDifficulty === "Beginner" ? selectedTimeFrame : selectedTenseType})`
              : "Complete all selections to start quiz"
            }
          </button>
        </div>

        {selectedDifficulty && selectedVerb && selectedTimeFrame && (selectedTenseType || selectedDifficulty === "Beginner") && (
          <div className="max-w-2xl mx-auto mt-8 bg-green-500/20 border border-green-500/30 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Quiz Preview</h3>
            <p className="text-green-200">
              Ready to generate 20 questions for <strong>{selectedVerb}</strong> conjugations in <strong>{selectedDifficulty === "Beginner" ? selectedTimeFrame : selectedTenseType}</strong> ({selectedDifficulty} difficulty)
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
                  className="w-full p-4 text-left bg-blue-500/20 border border-blue-500/30 rounded-xl text-white hover:bg-blue-500/30"
                >
                  <div className="text-blue-200 font-semibold text-lg">🔵 Beginner</div>
                  <div className="text-slate-300 text-sm mt-1">
                    Top 4 verbs (être, avoir, faire, aller) • Simple subject + verb (Je suis, Tu es) • 3 basic tenses
                  </div>
                </button>
                
                <button
                  onClick={() => handleDifficultySelect("Easy")}
                  className="w-full p-4 text-left bg-green-500/20 border border-green-500/30 rounded-xl text-white hover:bg-green-500/30"
                >
                  <div className="text-green-200 font-semibold text-lg">🟢 Easy</div>
                  <div className="text-slate-300 text-sm mt-1">
                    Basic verbs (être, avoir, faire) • Present tense only
                  </div>
                </button>
                
                <button
                  onClick={() => handleDifficultySelect("Moderate")}
                  className="w-full p-4 text-left bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-white hover:bg-yellow-500/30"
                >
                  <div className="text-yellow-200 font-semibold text-lg">🟡 Moderate</div>
                  <div className="text-slate-300 text-sm mt-1">
                    6 common verbs • Present, past, and future tenses (including Futur Simple)
                  </div>
                </button>
                
                <button
                  onClick={() => handleDifficultySelect("Difficult")}
                  className="w-full p-4 text-left bg-red-500/20 border border-red-500/30 rounded-xl text-white hover:bg-red-500/30"
                >
                  <div className="text-red-200 font-semibold text-lg">🔴 Difficult</div>
                  <div className="text-slate-300 text-sm mt-1">
                    All 10 verbs • All tenses and time frames
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
                  className="w-full p-4 text-left bg-blue-500/20 border border-blue-500/30 rounded-xl text-white hover:bg-blue-500/30"
                >
                  <div className="text-blue-200 font-semibold text-lg">🔵 Beginner Course</div>
                  <div className="text-slate-300 text-sm mt-1">
                    Section 1: 80 mixed questions + Final Exam
                  </div>
                </button>
                <button
                  className="w-full p-4 text-left bg-green-500/20 border border-green-500/30 rounded-xl text-white opacity-60 cursor-not-allowed"
                  disabled
                >
                  <div className="text-green-200 font-semibold text-lg">🟢 Easy Course</div>
                  <div className="text-slate-300 text-sm mt-1">
                    Coming soon...
                  </div>
                </button>
                <button
                  className="w-full p-4 text-left bg-yellow-500/20 border border-yellow-500/30 rounded-xl text-white opacity-60 cursor-not-allowed"
                  disabled
                >
                  <div className="text-yellow-200 font-semibold text-lg">🟡 Moderate Course</div>
                  <div className="text-slate-300 text-sm mt-1">
                    Coming soon...
                  </div>
                </button>
                <button
                  className="w-full p-4 text-left bg-red-500/20 border border-red-500/30 rounded-xl text-white opacity-60 cursor-not-allowed"
                  disabled
                >
                  <div className="text-red-200 font-semibold text-lg">🔴 Difficult Course</div>
                  <div className="text-slate-300 text-sm mt-1">
                    Coming soon...
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
                            difficulty: "Beginner",
                          })
                        });
                        
                        const data = await response.json();
                        if (data.success) {
                          // Take 5 questions from each verb for 20 total
                          allQuestions.push(...data.quiz.questions.slice(0, 5));
                        }
                      }
                      
                      const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
                      setQuizData(shuffledQuestions);
                      setCurrentQuestionIndex(0);
                      setUserAnswers({});
                      
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
                    20 mixed questions - Need 90% to pass (18/20)
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
              <h3 className="text-2xl font-bold text-center mb-4">📘 Beginner Course</h3>
              <p className="text-slate-300 text-center mb-6">Complete courses in order: Present → Past → Future</p>
              <div className="space-y-3 mb-6">
                {["Present", "Past", "Future"].map((timeFrame, index) => {
                  const beginnerTenseMap = {
                    "Past": "Passé Simple",
                    "Present": "Présent", 
                    "Future": "Futur Simple"
                  };
                  const tense = beginnerTenseMap[timeFrame as keyof typeof beginnerTenseMap];
                  
                  // Check completion status
                  const isCompleted = completedCourses.some(course => 
                    course.courseType === "beginner" && 
                    course.timeFrame === timeFrame && 
                    course.examPassed
                  );
                  
                  // Check for in-progress
                  const inProgress = courseProgressData.find(progress => 
                    progress.courseType === "beginner" && 
                    progress.timeFrame === timeFrame &&
                    !progress.isCompleted
                  );
                  
                  // Check if previous courses are completed (sequential requirement)
                  const orderedTimeFrames = ["Present", "Past", "Future"];
                  const currentIndex = orderedTimeFrames.indexOf(timeFrame);
                  const isPreviousCompleted = currentIndex === 0 || 
                    completedCourses.some(course => 
                      course.courseType === "beginner" && 
                      course.timeFrame === orderedTimeFrames[currentIndex - 1] && 
                      course.examPassed
                    );
                  
                  const isLocked = !isPreviousCompleted && !isCompleted && !inProgress;
                  
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
                    <button
                      key={timeFrame}
                      onClick={() => !isLocked && handleBeginnerCourseTimeFrame(timeFrame)}
                      disabled={isLocked}
                      className={`w-full p-4 text-left ${
                        isLocked
                          ? 'bg-gray-500/20 border border-gray-500/30 opacity-50 cursor-not-allowed'
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
                        {isCompleted && <span className="text-sm">✓ Completed</span>}
                        {inProgress && <span className="text-sm">⏳ In Progress</span>}
                        {isLocked && <span className="text-sm">🔒 Locked</span>}
                      </div>
                      <div className="text-slate-300 text-sm mt-1">
                        {isLocked 
                          ? `Complete ${orderedTimeFrames[currentIndex - 1]} Tense Course first`
                          : "Section 1: 80 mixed questions (20 from each verb) + Final Exam (90% to pass)"
                        }
                      </div>
                      {inProgress && (
                        <div className="text-orange-200 text-xs mt-1">
                          Progress: {inProgress.currentVerbIndex}/1 section completed • {inProgress.totalScore}/{inProgress.totalQuestions} questions
                        </div>
                      )}
                      {isCompleted && (
                        <div className="text-green-200 text-xs mt-1">
                          Completed with {Math.round((completedCourses.find(c => c.courseType === "beginner" && c.timeFrame === timeFrame)?.totalScore || 0) / (completedCourses.find(c => c.courseType === "beginner" && c.timeFrame === timeFrame)?.totalQuestions || 1) * 100)}% • Exam: {completedCourses.find(c => c.courseType === "beginner" && c.timeFrame === timeFrame)?.examScore}/20
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  setShowBeginnerCourseModal(false);
                  setShowMiniCoursesModal(true);
                }}
                className="w-full p-3 text-slate-400 border border-slate-600 rounded-xl hover:bg-slate-600/20"
              >
                Back to Mini-Courses
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;