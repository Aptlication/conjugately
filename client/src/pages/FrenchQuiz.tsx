import { useState } from "react";

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

// Top 10 French verbs
const FRENCH_VERBS = [
  "être", "avoir", "faire", "dire", "aller", 
  "voir", "savoir", "pouvoir", "vouloir", "venir"
];

// Time frames and their corresponding tenses
const TIME_FRAMES = {
  "Past": ["Passé Composé", "Imparfait", "Plus-que-parfait", "Passé Simple"],
  "Present": ["Présent", "Présent Progressif"],
  "Future": ["Futur Simple", "Futur Antérieur", "Futur Proche"],
};

// Difficulty configurations
const DIFFICULTY_CONFIGS = {
  "Easy": {
    verbs: ["être", "avoir", "faire"],
    timeFrames: ["Present"],
    tenses: ["Présent"]
  },
  "Moderate": {
    verbs: ["être", "avoir", "faire", "dire", "aller", "voir"],
    timeFrames: ["Present", "Past"],
    tenses: ["Présent", "Passé Composé", "Imparfait", "Futur Simple"]
  },
  "Difficult": {
    verbs: [...FRENCH_VERBS],
    timeFrames: Object.keys(TIME_FRAMES),
    tenses: Object.values(TIME_FRAMES).flat()
  }
};

export default function FrenchQuiz() {
  // Debug: Simple render test
  console.log("FrenchQuiz component is rendering!");
  // Configuration state
  const [selectedVerb, setSelectedVerb] = useState("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("");
  const [selectedTenseType, setSelectedTenseType] = useState("");
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  
  // Quiz state
  const [quizState, setQuizState] = useState<QuizState>('config');
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

  const handleChooseVerb = () => {
    const randomVerb = FRENCH_VERBS[Math.floor(Math.random() * FRENCH_VERBS.length)];
    setSelectedVerb(randomVerb);
  };

  const handleChooseTimeFrame = () => {
    const timeFrames = Object.keys(TIME_FRAMES);
    const randomTimeFrame = timeFrames[Math.floor(Math.random() * timeFrames.length)];
    setSelectedTimeFrame(randomTimeFrame);
    setSelectedTenseType(""); // Reset tense type when time frame changes
  };

  const handleChooseTenseType = () => {
    if (selectedTimeFrame) {
      const tenses = TIME_FRAMES[selectedTimeFrame as keyof typeof TIME_FRAMES];
      const randomTense = tenses[Math.floor(Math.random() * tenses.length)];
      setSelectedTenseType(randomTense);
    }
  };

  const handleChooseAll = () => {
    setShowDifficultyModal(true);
  };

  const handleDifficultySelect = (difficulty: keyof typeof DIFFICULTY_CONFIGS) => {
    const config = DIFFICULTY_CONFIGS[difficulty];
    
    // Select random verb from difficulty config
    const randomVerb = config.verbs[Math.floor(Math.random() * config.verbs.length)];
    setSelectedVerb(randomVerb);
    
    // Select random time frame from difficulty config
    const randomTimeFrame = config.timeFrames[Math.floor(Math.random() * config.timeFrames.length)];
    setSelectedTimeFrame(randomTimeFrame);
    
    // Select appropriate tense based on time frame and difficulty
    let availableTenses: string[] = [];
    if (difficulty === "Easy") {
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
    
    setShowDifficultyModal(false);
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

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswerIndex(answerIndex);
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswerIndex(null);
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
                      selectedAnswerIndex === index
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

              {/* Show rationale if answer selected */}
              {selectedAnswerIndex !== null && (
                <div className={`mb-6 p-4 rounded-xl border ${
                  currentQuestion.answerOptions[selectedAnswerIndex].isCorrect
                    ? 'bg-green-500/20 border-green-500/30 text-green-200'
                    : 'bg-red-500/20 border-red-500/30 text-red-200'
                }`}>
                  <p>📝 {currentQuestion.answerOptions[selectedAnswerIndex].rationale}</p>
                </div>
              )}

              {/* Next Button */}
              <div className="flex justify-between">
                <button
                  onClick={handleStartOver}
                  className="px-6 py-3 text-slate-400 hover:text-white transition-all duration-200 border border-slate-600 rounded-xl hover:border-slate-400"
                >
                  Start Over
                </button>
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswerIndex === null}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {currentQuestionIndex === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
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
                  
                  {/* Step 1: Verb Selection */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-lg font-semibold text-white">
                        1. Choose a French Verb
                      </label>
                      <button
                        onClick={handleChooseVerb}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium"
                      >
                        Choose for me
                      </button>
                    </div>
                    <select
                      value={selectedVerb}
                      onChange={(e) => setSelectedVerb(e.target.value)}
                      className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select a verb...</option>
                      {FRENCH_VERBS.map((verb) => (
                        <option key={verb} value={verb} className="bg-slate-800 text-white">
                          {verb}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Step 2: Time Frame Selection */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-lg font-semibold text-white">
                        2. Choose Time Frame
                      </label>
                      <button
                        onClick={handleChooseTimeFrame}
                        disabled={!selectedVerb}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Choose for me
                      </button>
                    </div>
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

                  {/* Step 3: Tense Type Selection */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-lg font-semibold text-white">
                        3. Choose Specific Tense
                      </label>
                      <button
                        onClick={handleChooseTenseType}
                        disabled={!selectedTimeFrame}
                        className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Choose for me
                      </button>
                    </div>
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
                      className="w-full p-4 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
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
            {showDifficultyModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white text-center mb-6">
                    Choose Difficulty Level
                  </h3>
                  <div className="space-y-4">
                    <button
                      onClick={() => handleDifficultySelect("Easy")}
                      className="w-full p-4 text-left bg-green-500/20 border border-green-500/30 rounded-xl hover:bg-green-500/30 transition-all duration-200 group"
                    >
                      <div className="text-green-300 font-semibold text-lg group-hover:text-green-200">
                        🟢 Easy
                      </div>
                      <div className="text-slate-300 text-sm mt-1">
                        Basic verbs (être, avoir, faire) • Present tense only
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleDifficultySelect("Moderate")}
                      className="w-full p-4 text-left bg-yellow-500/20 border border-yellow-500/30 rounded-xl hover:bg-yellow-500/30 transition-all duration-200 group"
                    >
                      <div className="text-yellow-300 font-semibold text-lg group-hover:text-yellow-200">
                        🟡 Moderate
                      </div>
                      <div className="text-slate-300 text-sm mt-1">
                        6 common verbs • Present, past, and future tenses
                      </div>
                    </button>
                    
                    <button
                      onClick={() => handleDifficultySelect("Difficult")}
                      className="w-full p-4 text-left bg-red-500/20 border border-red-500/30 rounded-xl hover:bg-red-500/30 transition-all duration-200 group"
                    >
                      <div className="text-red-300 font-semibold text-lg group-hover:text-red-200">
                        🔴 Difficult
                      </div>
                      <div className="text-slate-300 text-sm mt-1">
                        All 10 verbs • All tenses and time frames
                      </div>
                    </button>
                  </div>
                  
                  <button
                    onClick={() => setShowDifficultyModal(false)}
                    className="w-full mt-6 p-3 text-slate-400 hover:text-white transition-all duration-200 border border-slate-600 rounded-xl hover:border-slate-400"
                  >
                    Cancel
                  </button>
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