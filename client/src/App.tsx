import { useState } from "react";

function App() {
  const [selectedVerb, setSelectedVerb] = useState("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("");
  const [selectedTenseType, setSelectedTenseType] = useState("");
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [quizState, setQuizState] = useState<'config' | 'loading' | 'active' | 'results'>('config');
  const [quizData, setQuizData] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

  const FRENCH_VERBS = ["être", "avoir", "faire", "dire", "aller", "voir", "savoir", "pouvoir", "vouloir", "venir"];
  
  const TIME_FRAMES = {
    "Past": ["Passé Composé", "Imparfait", "Plus-que-parfait", "Passé Simple"],
    "Present": ["Présent", "Présent Progressif"], 
    "Future": ["Futur Simple", "Futur Antérieur", "Futur Proche"],
  };

  const DIFFICULTY_CONFIGS = {
    "Easy": { verbs: ["être", "avoir", "faire"], timeFrames: ["Present"], tenses: ["Présent"] },
    "Moderate": { verbs: ["être", "avoir", "faire", "dire", "aller", "voir"], timeFrames: ["Present", "Past"], tenses: ["Présent", "Passé Composé", "Imparfait", "Futur Simple"] },
    "Difficult": { verbs: [...FRENCH_VERBS], timeFrames: Object.keys(TIME_FRAMES), tenses: Object.values(TIME_FRAMES).flat() }
  };

  const handleStartQuiz = async () => {
    if (!selectedVerb || !selectedTimeFrame || !selectedTenseType) return;
    setQuizState('loading');

    try {
      const timeFrameMapping = { "Past": "past", "Present": "present", "Future": "future" };
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
        setQuizData(data.quiz.questions);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setQuizState('active');
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

  const handleDifficultySelect = (difficulty: keyof typeof DIFFICULTY_CONFIGS) => {
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
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswerIndex(answerIndex);
    setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: answerIndex }));
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
                  selectedAnswerIndex === index
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

          {selectedAnswerIndex !== null && (
            <div className={`mb-6 p-4 rounded-xl border ${
              currentQuestion.answerOptions[selectedAnswerIndex].isCorrect
                ? 'border-green-500/30 bg-green-500/20 text-green-200'
                : 'border-red-500/30 bg-red-500/20 text-red-200'
            }`}>
              <p>📝 {currentQuestion.answerOptions[selectedAnswerIndex].rationale}</p>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={handleStartOver}
              className="px-6 py-3 text-slate-400 border border-slate-600 rounded-xl hover:bg-slate-600/20"
            >
              Start Over
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswerIndex === null}
              className={`px-8 py-3 rounded-xl font-semibold ${
                selectedAnswerIndex !== null
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
                  : 'bg-slate-600 text-slate-400 cursor-not-allowed'
              }`}
            >
              {currentQuestionIndex === quizData.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizState === 'results') {
    const { correctAnswers, totalQuestions } = calculateResults();
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-12 text-white">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Quiz Complete!</h2>
          <div className="mb-8">
            <div className="text-6xl font-bold mb-2">{percentage}%</div>
            <p className="text-xl text-slate-300">
              You got {correctAnswers} out of {totalQuestions} questions correct
            </p>
          </div>
          <button
            onClick={handleStartOver}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700"
          >
            Try Another Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-12 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">French Verb Master</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Master French verb conjugations with personalized quizzes. 
            Select your verb, time frame, and tense type to generate a 20-question quiz.
          </p>
        </div>

        <div className="text-center mb-6">
          <button
            onClick={() => setShowDifficultyModal(true)}
            className="px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl hover:scale-105 transition-transform"
          >
            🎲 Choose All for Me
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="text-lg font-semibold">1. Choose a French Verb</label>
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
              className="w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white text-lg"
            >
              <option value="" className="bg-gray-800 text-white">Select a verb...</option>
              {FRENCH_VERBS.map((verb) => (
                <option key={verb} value={verb} className="bg-gray-800 text-white">{verb}</option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="text-lg font-semibold">2. Choose Time Frame</label>
              <button
                onClick={handleChooseTimeFrame}
                disabled={!selectedVerb}
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
              onChange={(e) => { setSelectedTimeFrame(e.target.value); setSelectedTenseType(""); }}
              disabled={!selectedVerb}
              className={`w-full p-4 rounded-xl border border-white/20 text-white text-lg ${
                selectedVerb ? 'bg-white/10' : 'bg-white/5 opacity-50'
              }`}
            >
              <option value="" className="bg-gray-800 text-white">Select time frame...</option>
              {Object.keys(TIME_FRAMES).map((timeFrame) => (
                <option key={timeFrame} value={timeFrame} className="bg-gray-800 text-white">{timeFrame}</option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="text-lg font-semibold">3. Choose Specific Tense</label>
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

          <button
            onClick={handleStartQuiz}
            disabled={!selectedVerb || !selectedTimeFrame || !selectedTenseType}
            className={`w-full p-4 text-lg font-bold rounded-xl transition-all ${
              (selectedVerb && selectedTimeFrame && selectedTenseType)
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
                : 'bg-slate-600 text-slate-400 cursor-not-allowed'
            }`}
          >
            {selectedVerb && selectedTimeFrame && selectedTenseType 
              ? `Start ${selectedVerb} Quiz (${selectedTenseType})`
              : "Complete all selections to start quiz"
            }
          </button>
        </div>

        {selectedVerb && selectedTimeFrame && selectedTenseType && (
          <div className="max-w-2xl mx-auto mt-8 bg-green-500/20 border border-green-500/30 rounded-xl p-6 text-center">
            <h3 className="text-xl font-semibold mb-2">Quiz Preview</h3>
            <p className="text-green-200">
              Ready to generate 20 questions for <strong>{selectedVerb}</strong> conjugations in <strong>{selectedTenseType}</strong>
            </p>
          </div>
        )}

        {showDifficultyModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-center mb-6">Choose Difficulty Level</h3>
              <div className="space-y-3 mb-6">
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
                    6 common verbs • Present, past, and future tenses
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
      </div>
    </div>
  );
}

export default App;