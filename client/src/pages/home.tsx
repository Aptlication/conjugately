import { useState } from "react";

// Top 10 French verbs
const FRENCH_VERBS = [
  "être", "avoir", "faire", "dire", "aller", 
  "voir", "savoir", "pouvoir", "vouloir", "venir"
] as const;

// Time frames and their corresponding tenses
const TIME_FRAMES = {
  "Past": ["Passé Composé", "Imparfait", "Plus-que-parfait", "Passé Simple"],
  "Present": ["Présent", "Présent Progressif"],
  "Future": ["Futur Simple", "Futur Antérieur", "Futur Proche"],
} as const;

export default function Home() {
  const [selectedVerb, setSelectedVerb] = useState<string>("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<keyof typeof TIME_FRAMES | "">("");
  const [selectedTenseType, setSelectedTenseType] = useState<string>("");

  const handleChooseVerb = () => {
    const randomVerb = FRENCH_VERBS[Math.floor(Math.random() * FRENCH_VERBS.length)];
    setSelectedVerb(randomVerb);
  };

  const handleChooseTimeFrame = () => {
    const timeFrames = Object.keys(TIME_FRAMES) as Array<keyof typeof TIME_FRAMES>;
    const randomTimeFrame = timeFrames[Math.floor(Math.random() * timeFrames.length)];
    setSelectedTimeFrame(randomTimeFrame);
    setSelectedTenseType(""); // Reset tense type when time frame changes
  };

  const handleChooseTenseType = () => {
    if (selectedTimeFrame) {
      const tenses = TIME_FRAMES[selectedTimeFrame];
      const randomTense = tenses[Math.floor(Math.random() * tenses.length)];
      setSelectedTenseType(randomTense);
    }
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
                    setSelectedTimeFrame(e.target.value as keyof typeof TIME_FRAMES);
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
                  {selectedTimeFrame && TIME_FRAMES[selectedTimeFrame].map((tense) => (
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
      </div>
    </div>
  );
}