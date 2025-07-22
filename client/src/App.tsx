import { useState } from "react";

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

function App() {
  const [selectedVerb, setSelectedVerb] = useState("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("");
  const [selectedTenseType, setSelectedTenseType] = useState("");
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);

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

  const handleStartQuiz = () => {
    if (selectedVerb && selectedTimeFrame && selectedTenseType) {
      alert(`Starting quiz for ${selectedVerb} - ${selectedTimeFrame} - ${selectedTenseType}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            French Verb Master
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Master French verb conjugations with customizable AI-powered quizzes. 
            Select your verb, time frame, and tense type to generate a 20-question quiz.
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
      </div>
    </div>
  );
}

export default App;
