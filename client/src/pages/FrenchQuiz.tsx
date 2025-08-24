import { useState, useEffect } from "react";

// Types
interface QuizQuestion {
  question: string;
  hint: string;
  answerOptions: {
    text: string;
    rationale: string;
    isCorrect: boolean;
  }[];
}

type QuizState = 'config' | 'loading' | 'active' | 'results';

// Complete French verbs including reflexive verbs for full coverage
const FRENCH_VERBS = [
  "s'intéresser", "se débrouiller", "s'ennuyer", "s'entraîner", "se souvenir", "s'adapter", "se réjouir", 
  "mettre", "trouver", "croire", "parler", "prendre", "lire", "écrire", "ouvrir", "fermer", "perdre", "garder", 
  "devoir", "passer", "penser", "arriver", "demander", "travailler", "finir", "commencer", "répondre", "apprendre", "envoyer", "recevoir", 
  "se lever", "s'appeler", "se sentir", "se laver", "se réveiller", "se taire", "se servir", "se plaindre", "se concentrer", "se rendre compte", "se rappeler"
];

// Time frames and their corresponding tenses
const TIME_FRAMES = {
  "Present": ["Présent"], // Only present simple for basic levels
  "Past": ["Passé Simple", "Passé Composé", "Imparfait", "Plus-que-parfait"],
  "Future": ["Futur Simple", "Futur Antérieur", "Futur Proche"],
};

// Complete difficulty configurations for all 5 levels
const DIFFICULTY_CONFIGS = {
  "Beginner": {
    verbs: ["être", "avoir", "faire"],
    timeFrames: ["Present", "Past", "Future"],
    tenses: ["Présent", "Passé Composé", "Futur Simple"]
  },
  "Novice": {
    verbs: ["être", "avoir", "faire"],
    timeFrames: ["Present", "Past", "Future"],
    tenses: ["Présent", "Passé Composé", "Futur Simple"]
  },
  "Elementary": {
    verbs: ["dire", "voir", "savoir", "vouloir", "venir", "pouvoir", "besoin"],
    timeFrames: ["Present", "Past", "Future"],
    tenses: ["Présent", "Passé Composé", "Futur Simple"]
  },
  "Intermediate": {
    verbs: ["s'intéresser", "se débrouiller", "s'ennuyer", "s'entraîner", "se souvenir", "s'adapter", "se réjouir", "mettre", "trouver", "croire", "parler", "prendre", "lire", "écrire", "ouvrir", "fermer", "perdre", "garder"],
    timeFrames: ["Present", "Past", "Future"],
    tenses: ["Présent", "Passé Composé", "Futur Simple", "Imparfait"]
  },
  "Advanced": {
    verbs: ["devoir", "passer", "penser", "arriver", "demander", "travailler", "finir", "commencer", "répondre", "apprendre", "envoyer", "recevoir", "se lever", "s'appeler", "se sentir", "se laver", "se réveiller", "se taire", "se servir", "se plaindre", "se concentrer", "se rendre compte", "se rappeler"],
    timeFrames: Object.keys(TIME_FRAMES),
    tenses: Object.values(TIME_FRAMES).flat()
  }
};

export default function FrenchQuiz() {
  // Debug: Simple render test
  console.log("FrenchQuiz component is rendering!");
  // Configuration state
  const [selectedDifficulty, setSelectedDifficulty] = useState<keyof typeof DIFFICULTY_CONFIGS>(() => {
    // Persist selected difficulty across sessions
    const saved = localStorage.getItem('selectedDifficulty');
    return (saved && Object.keys(DIFFICULTY_CONFIGS).includes(saved)) ? 
      saved as keyof typeof DIFFICULTY_CONFIGS : "Elementary";
  });
  const [isDifficultyLocked, setIsDifficultyLocked] = useState(() => {
    // Persist lock state across sessions
    const saved = localStorage.getItem('difficultyLockState');
    return saved ? JSON.parse(saved) : false;
  });
  const [selectedVerb, setSelectedVerb] = useState("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("");
  const [selectedTenseType, setSelectedTenseType] = useState("");
  const [showAdvancedyModal, setShowAdvancedyModal] = useState(false);
  // Reflexive verb explanation modal states
  const [showReflexiveModal, setShowReflexiveModal] = useState(false);
  const [reflexiveModalDismissed, setReflexiveModalDismissed] = useState(() => {
    return localStorage.getItem('reflexiveModalDismissed') === 'true';
  });
  
  // Quiz state
  const [quizState, setQuizState] = useState<QuizState>('config');
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);



  const handleDifficultyLockToggle = () => {
    const newLockState = !isDifficultyLocked;
    setIsDifficultyLocked(newLockState);
    // Persist lock state to localStorage
    localStorage.setItem('difficultyLockState', JSON.stringify(newLockState));
  };

  const handleDifficultyChange = (difficulty: keyof typeof DIFFICULTY_CONFIGS) => {
    if (!isDifficultyLocked) {
      setSelectedDifficulty(difficulty);
      // Persist selected difficulty to localStorage
      localStorage.setItem('selectedDifficulty', difficulty);
      
      // Reset selections when difficulty changes
      setSelectedVerb("");
      setSelectedTimeFrame("");
      setSelectedTenseType("");
      
      // Auto-lock difficulty after selection for focused learning
      setTimeout(() => {
        setIsDifficultyLocked(true);
        localStorage.setItem('difficultyLockState', JSON.stringify(true));
      }, 500); // Small delay so user sees the selection first
    }
  };

  // Get available verbs for selected difficulty
  const getAvailableVerbs = () => {
    return DIFFICULTY_CONFIGS[selectedDifficulty].verbs;
  };

  const handleChooseAll = () => {
    setShowAdvancedyModal(true);
  };

  // Helper function to check if a verb is reflexive
  const isReflexiveVerb = (verb: string) => {
    return verb.startsWith('se ') || verb.startsWith("s'");
  };

  // Handler for verb selection with reflexive verb modal
  const handleVerbSelection = (verb: string) => {
    setSelectedVerb(verb);
    
    // Show reflexive modal if:
    // 1. It's a reflexive verb
    // 2. User is on Intermediate or Advanced level
    // 3. User hasn't dismissed the modal
    if (verb && isReflexiveVerb(verb) && 
        (selectedDifficulty === 'Intermediate' || selectedDifficulty === 'Advanced') && 
        !reflexiveModalDismissed) {
      setShowReflexiveModal(true);
    }
  };

  // Handle dismissing the reflexive modal
  const handleReflexiveModalDismiss = (dontRemindAgain: boolean) => {
    setShowReflexiveModal(false);
    if (dontRemindAgain) {
      setReflexiveModalDismissed(true);
      localStorage.setItem('reflexiveModalDismissed', 'true');
    }
  };

  const handleAdvancedySelect = (difficulty: keyof typeof DIFFICULTY_CONFIGS) => {
    const config = DIFFICULTY_CONFIGS[difficulty];
    
    // Set the difficulty
    setSelectedDifficulty(difficulty);
    
    // Select random verb from difficulty config
    const randomVerb = config.verbs[Math.floor(Math.random() * config.verbs.length)];
    setSelectedVerb(randomVerb);
    
    // Select random time frame from difficulty config
    const randomTimeFrame = config.timeFrames[Math.floor(Math.random() * config.timeFrames.length)];
    setSelectedTimeFrame(randomTimeFrame);
    
    // Select appropriate tense based on time frame and difficulty
    let availableTenses: string[] = [];
    if (difficulty === "Elementary") {
      availableTenses = [...config.tenses];
    } else {
      // Filter tenses that belong to the selected time frame
      const timeFrameTenses = TIME_FRAMES[randomTimeFrame as keyof typeof TIME_FRAMES] || [];
      availableTenses = timeFrameTenses.filter(tense => 
        config.tenses.includes(tense)
      );
    }
    
    const randomTense = availableTenses[Math.floor(Math.random() * availableTenses.length)];
    setSelectedTenseType(randomTense);
    
    setShowAdvancedyModal(false);
  };

  const handleStartQuiz = async () => {
    if (!selectedVerb || !selectedTimeFrame || !selectedTenseType) return;

    setQuizState('loading');

    try {
      // Convert frontend time frame to lowercase for backend compatibility
      const timeFrameMapping = {
        "Past": "past",
        "Present": "present", 
        "Future": "future"
      };

      const response = await fetch('/api/get-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verb: selectedVerb,
          timeFrame: timeFrameMapping[selectedTimeFrame as keyof typeof timeFrameMapping],
          tenseType: selectedTenseType,
          difficulty: selectedDifficulty
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('Quiz loaded successfully:', data.quiz);
        setQuizData(data.quiz.questions);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setQuizState('active');
      } else {
        console.error('Quiz loading failed:', data.error);
        alert(`Quiz not available: ${data.error}`);
        setQuizState('config');
      }
    } catch (error) {
      console.error('Quiz loading error:', error);
      alert('Failed to load quiz. Please try again.');
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
      setUserAnswers(prev => ({
        ...prev,
        [currentQuestionIndex]: answerIndex
      }));
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
    setQuizState('config');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowHint(false);
    setSelectedAnswerIndex(null);
    setIsAnswerConfirmed(false);
  };

  // Calculate quiz results
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

  // Render different states
  const renderContent = () => {
    switch (quizState) {
      case 'loading':
        return (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xl text-white mb-2">Generating your quiz...</p>
              <p className="text-purple-300 text-sm mb-4">
                Creating 20 personalized questions for <strong>{selectedVerb}</strong> in <strong>{selectedTenseType}</strong>
              </p>
            </div>
          </div>
        );
      
      case 'active':
        if (!quizData.length) return null;
        const currentQuestion = quizData[currentQuestionIndex];
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white text-sm">Question {currentQuestionIndex + 1} of {quizData.length}</span>
                  <button 
                    onClick={() => setShowHint(!showHint)}
                    className="text-purple-300 hover:text-purple-200 text-sm"
                  >
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                  </button>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-4">{currentQuestion.question}</h2>
                {showHint && (
                  <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-4">
                    <p className="text-blue-200">💡 {currentQuestion.hint}</p>
                  </div>
                )}
              </div>

              {/* Answer Options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.answerOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                      selectedAnswerIndex === index && isAnswerConfirmed
                        ? 'border-green-500 bg-green-500/20 text-white shadow-lg shadow-green-500/20'
                        : selectedAnswerIndex === index
                        ? 'border-purple-500 bg-purple-500/20 text-white'
                        : 'border-white/20 bg-white/10 text-white hover:border-purple-400 hover:bg-purple-400/10'
                    }`}
                  >
                    <div className="flex items-center">
                      <span className="w-8 h-8 rounded-full border-2 border-current flex items-center justify-center mr-4 text-sm font-bold">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option.text}
                    </div>
                  </button>
                ))}
              </div>


              
              {selectedAnswerIndex !== null && isAnswerConfirmed && (
                <div className={`mb-6 p-4 rounded-xl border ${
                  currentQuestion.answerOptions[selectedAnswerIndex].isCorrect
                    ? 'bg-green-500/20 border-green-500/30 text-green-200'
                    : 'bg-red-500/20 border-red-500/30 text-red-200'
                }`}>
                  <p>📝 {currentQuestion.answerOptions[selectedAnswerIndex].rationale}</p>
                </div>
              )}

              {/* Start Over Button - Next button removed for double-click functionality */}
              <div className="flex justify-center">
                <button
                  onClick={handleStartOver}
                  className="px-6 py-3 text-slate-400 hover:text-white transition-all duration-200 border border-slate-600 rounded-xl hover:border-slate-400"
                >
                  Start Over
                </button>
              </div>
            </div>
          </div>
        );

      case 'results':
        const { correctAnswers, totalQuestions } = calculateResults();
        const percentage = Math.round((correctAnswers / totalQuestions) * 100);
        return (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Quiz Complete!</h2>
              
              <div className="mb-8">
                <div className="text-6xl font-bold text-white mb-2">{percentage}%</div>
                <p className="text-xl text-slate-300">
                  You got {correctAnswers} out of {totalQuestions} questions correct
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleStartOver}
                  className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-semibold"
                >
                  Try Another Quiz
                </button>
              </div>
            </div>
          </div>
        );

      default: // 'config'
        return (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-white mb-4">
                French Verb Master
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Master French verb conjugations with AI-powered quizzes. 
                Select your verb, time frame, and tense type to generate a personalized 20-question quiz.
              </p>
            </div>

            {/* Choose All Button */}
            <div className="max-w-4xl mx-auto mb-6">
              <div className="text-center">
                <button
                  onClick={handleChooseAll}
                  className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg transform hover:scale-105"
                >
                  🎲 Choose All for Me
                </button>
              </div>
            </div>

            {/* Selection Form */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
                <div className="space-y-8">
                  
                  {/* Step 1: Difficulty Selection */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <label className="text-lg font-semibold text-white">
                        1. Choose Difficulty
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleDifficultyLockToggle}
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-all ${
                            isDifficultyLocked 
                              ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30' 
                              : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
                          }`}
                          title={isDifficultyLocked ? "Difficulty is locked for focused learning. Click to unlock." : "Click to lock difficulty for focused learning"}
                        >
                          {isDifficultyLocked ? (
                            <>
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                              </svg>
                              <span>Locked</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                              </svg>
                              <span>Click to Lock</span>
                            </>
                          )}
                        </button>
                        
                        {isDifficultyLocked && (
                          <button
                            onClick={() => {
                              setIsDifficultyLocked(false);
                              localStorage.setItem('difficultyLockState', JSON.stringify(false));
                              localStorage.removeItem('selectedDifficulty');
                              setSelectedDifficulty("Elementary");
                            }}
                            className="px-2 py-1 text-xs text-red-300 hover:text-red-200 underline"
                            title="Reset and unlock everything"
                          >
                            Reset All
                          </button>
                        )}
                      </div>
                    </div>
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => handleDifficultyChange(e.target.value as keyof typeof DIFFICULTY_CONFIGS)}
                      disabled={isDifficultyLocked}
                      className={`w-full p-4 rounded-xl border text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${
                        isDifficultyLocked 
                          ? 'bg-green-500/20 border-green-500/30 cursor-not-allowed opacity-75' 
                          : 'bg-white/10 border-white/20'
                      }`}
                    >
                      <option value="Beginner" className="bg-slate-800 text-white">🔵 Beginner - 3 verbs, Present/past/future tenses</option>
                      <option value="Novice" className="bg-slate-800 text-white">🔷 Novice - 3 verbs, Present/past/future tenses</option>
                      <option value="Elementary" className="bg-slate-800 text-white">🟢 Elementary - 7 verbs, Present/past/future tenses</option>
                      <option value="Intermediate" className="bg-slate-800 text-white">🟡 Intermediate - 18 verbs (7 reflexive + 11 non-reflexive), Present/past/future + Imparfait</option>
                      <option value="Advanced" className="bg-slate-800 text-white">🔴 Advanced - 23 verbs (12 non-reflexive + 11 reflexive), All tenses and time frames</option>
                    </select>
                  </div>

                  {/* Step 2: Verb Selection */}
                  <div className="space-y-4">
                    <label className="text-lg font-semibold text-white">
                      2. Choose a French Verb
                    </label>
                    <select
                      value={selectedVerb}
                      onChange={(e) => handleVerbSelection(e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select a verb...</option>
                      {getAvailableVerbs().map((verb) => (
                        <option key={verb} value={verb} className="bg-slate-800 text-white">
                          {verb}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Step 3: Time Frame Selection */}
                  <div className="space-y-4">
                    <label className="text-lg font-semibold text-white">
                      3. Choose Time Frame
                    </label>
                    <select
                      value={selectedTimeFrame}
                      onChange={(e) => {
                        setSelectedTimeFrame(e.target.value);
                        setSelectedTenseType(""); // Reset tense type
                      }}
                      disabled={!selectedVerb}
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                    >
                      <option value="">Select time frame...</option>
                      {Object.keys(TIME_FRAMES).map((timeFrame) => (
                        <option key={timeFrame} value={timeFrame} className="bg-slate-800 text-white">
                          {timeFrame}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Step 4: Tense Type Selection */}
                  <div className="space-y-4">
                    <label className="text-lg font-semibold text-white">
                      4. Choose Specific Tense
                    </label>
                    <select
                      value={selectedTenseType}
                      onChange={(e) => setSelectedTenseType(e.target.value)}
                      disabled={!selectedTimeFrame}
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
                    >
                      <option value="">Select tense type...</option>
                      {selectedTimeFrame && TIME_FRAMES[selectedTimeFrame as keyof typeof TIME_FRAMES].map((tense) => (
                        <option key={tense} value={tense} className="bg-slate-800 text-white">
                          {tense}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Start Quiz Button */}
                  <div className="pt-6">
                    <button
                      onClick={handleStartQuiz}
                      disabled={!selectedVerb || !selectedTimeFrame || !selectedTenseType}
                      className="w-full p-4 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 disabled:bg-yellow-200 disabled:text-gray-700 disabled:cursor-not-allowed shadow-lg"
                    >
                      {selectedVerb && selectedTimeFrame && selectedTenseType 
                        ? `Start ${selectedVerb} Quiz (${selectedTenseType})`
                        : "Complete all selections to start quiz"
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            {selectedVerb && selectedTimeFrame && selectedTenseType && (
              <div className="max-w-2xl mx-auto mt-8">
                <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6 text-center">
                  <h3 className="text-xl font-semibold text-white mb-2">Quiz Preview</h3>
                  <p className="text-green-300">
                    Ready to generate 20 questions for <strong>{selectedVerb}</strong> conjugations in <strong>{selectedTenseType}</strong>
                  </p>
                </div>
              </div>
            )}

            {/* Difficulty Selection Modal */}
            {showAdvancedyModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white text-center mb-6">
                    Choose Difficulty Level
                  </h3>
                  <div className="space-y-3">
                    <button
                      onClick={() => handleAdvancedySelect("Beginner")}
                      className="w-full p-4 text-left bg-blue-500/20 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-all duration-200 group"
                    >
                      <div className="text-blue-300 font-semibold text-lg group-hover:text-blue-200">
                        🔵 Beginner
                      </div>
                      <div className="text-slate-300 text-sm mt-1">
                        3 basic verbs (être, avoir, faire) • Present, past, future tenses
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleAdvancedySelect("Novice")}
                      className="w-full p-4 text-left bg-cyan-500/20 border border-cyan-500/30 rounded-xl hover:bg-cyan-500/30 transition-all duration-200 group"
                    >
                      <div className="text-cyan-300 font-semibold text-lg group-hover:text-cyan-200">
                        🔷 Novice
                      </div>
                      <div className="text-slate-300 text-sm mt-1">
                        3 basic verbs (être, avoir, faire) • Present, past, future tenses
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleAdvancedySelect("Elementary")}
                      className="w-full p-4 text-left bg-green-500/20 border border-green-500/30 rounded-xl hover:bg-green-500/30 transition-all duration-200 group"
                    >
                      <div className="text-green-300 font-semibold text-lg group-hover:text-green-200">
                        🟢 Elementary
                      </div>
                      <div className="text-slate-300 text-sm mt-1">
                        6 common verbs • Present, past, future tenses
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleAdvancedySelect("Intermediate")}
                      className="w-full p-4 text-left bg-yellow-500/20 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/30 transition-all duration-200 group"
                    >
                      <div className="text-yellow-300 font-semibold text-lg group-hover:text-yellow-200">
                        🟡 Intermediate
                      </div>
                      <div className="text-slate-300 text-sm mt-1">
                        11 verbs • Present, past, future tenses + Imparfait
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleAdvancedySelect("Advanced")}
                      className="w-full p-4 text-left bg-red-500/20 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all duration-200 group"
                    >
                      <div className="text-red-300 font-semibold text-lg group-hover:text-red-200">
                        🔴 Advanced
                      </div>
                      <div className="text-slate-300 text-sm mt-1">
                        All 16 verbs including reflexive • All tenses and time frames
                      </div>
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setShowAdvancedyModal(false)}
                    className="w-full mt-6 p-3 text-slate-400 hover:text-white transition-all duration-200 border border-slate-600 rounded-xl hover:border-slate-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Reflexive Verb Explanation Modal */}
            {showReflexiveModal && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-lg w-full mx-4">
                  <div className="text-center mb-6">
                    <div className="text-4xl mb-3">🪞</div>
                    <h3 className="text-2xl font-bold text-white mb-4">Reflexive Verbs Quick Guide</h3>
                  </div>
                  
                  <div className="text-white/90 space-y-4 mb-6">
                    <p>
                      Reflexive verbs are actions you do to yourself. They use <strong className="text-purple-300">me, te, se, nous, vous, se</strong>.
                    </p>
                    
                    <div className="bg-white/10 rounded-lg p-4 space-y-2">
                      <h4 className="font-semibold text-purple-200">Examples:</h4>
                      <div className="space-y-1 text-sm">
                        <div><strong className="text-blue-300">se lever</strong> → "Je me lève" (I get up)</div>
                        <div><strong className="text-blue-300">se laver</strong> → "Tu te laves" (You wash yourself)</div>
                        <div><strong className="text-blue-300">se sentir</strong> → "Elle se sent bien" (She feels good)</div>
                      </div>
                    </div>
                    
                    <p className="text-sm">
                      <strong className="text-yellow-300">Pattern:</strong> The little word changes with each person (me, te, se...) but always goes before the verb.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 text-white/80 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-600 bg-white/20 border-white/30 rounded focus:ring-purple-500"
                        onChange={(e) => setReflexiveModalDismissed(e.target.checked)}
                      />
                      <span className="text-sm text-blue-400 underline">Don't remind me about reflexive verbs again</span>
                    </label>
                    
                    <button
                      onClick={() => handleReflexiveModalDismiss(reflexiveModalDismissed)}
                      className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-colors"
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {renderContent()}
      </div>
    </div>
  );
}