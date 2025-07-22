import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

interface QuizQuestion {
  question: string;
  hint: string;
  answerOptions: {
    text: string;
    rationale: string;
    isCorrect: boolean;
  }[];
}

interface Quiz {
  id: number;
  verb: string;
  timeFrame: string;
  tenseType: string;
  questions: QuizQuestion[];
}

interface QuizResponse {
  success: boolean;
  quiz?: Quiz;
  error?: string;
}

const VERBS = [
  { value: "être", label: "être (to be)" },
  { value: "avoir", label: "avoir (to have)" },
  { value: "faire", label: "faire (to do/make)" },
  { value: "dire", label: "dire (to say/tell)" },
  { value: "aller", label: "aller (to go)" },
  { value: "voir", label: "voir (to see)" },
  { value: "savoir", label: "savoir (to know)" },
  { value: "pouvoir", label: "pouvoir (to be able to)" },
  { value: "vouloir", label: "vouloir (to want)" },
  { value: "venir", label: "venir (to come)" }
];

const TIME_FRAMES = [
  { value: "past", label: "Past" },
  { value: "present", label: "Present" },
  { value: "future", label: "Future" }
];

const TENSE_TYPES = {
  past: [
    { value: "simple", label: "Simple (Passé Composé)" },
    { value: "perfect", label: "Perfect (Plus-que-parfait)" },
    { value: "continuous", label: "Continuous (Imparfait)" }
  ],
  present: [
    { value: "simple", label: "Simple (Présent)" },
    { value: "perfect", label: "Perfect (Passé Composé)" },
    { value: "continuous", label: "Continuous (Présent Progressif)" }
  ],
  future: [
    { value: "simple", label: "Simple (Futur Simple)" },
    { value: "perfect", label: "Perfect (Futur Antérieur)" },
    { value: "continuous", label: "Continuous (Futur Proche)" }
  ]
};

export default function Home() {
  const [selectedVerb, setSelectedVerb] = useState("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("");
  const [selectedTenseType, setSelectedTenseType] = useState("");
  const [quizData, setQuizData] = useState<Quiz | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [quizState, setQuizState] = useState<'config' | 'loading' | 'active' | 'results'>('config');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const { toast } = useToast();

  // Reset showHint when question changes
  useEffect(() => {
    setShowHint(false);
  }, [currentQuestionIndex]);

  // Reset tense type when time frame changes
  useEffect(() => {
    setSelectedTenseType("");
  }, [selectedTimeFrame]);

  const loadQuiz = async () => {
    if (!selectedVerb || !selectedTimeFrame || !selectedTenseType) {
      toast({
        title: "Missing Selection",
        description: "Please select a verb, time frame, and tense type.",
        variant: "destructive",
      });
      return;
    }

    setQuizState('loading');
    setQuizData(null);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowHint(false);

    try {
      const response = await apiRequest("POST", "/api/get-quiz", {
        verb: selectedVerb,
        timeFrame: selectedTimeFrame,
        tenseType: selectedTenseType,
      });
      
      const result = await response.json() as QuizResponse;
      
      if (result.success && result.quiz) {
        setQuizData(result.quiz);
        setQuizState('active');
        // Initialize user answers
        const initialAnswers: Record<number, string> = {};
        result.quiz.questions.forEach((_, index) => {
          initialAnswers[index] = "";
        });
        setUserAnswers(initialAnswers);
      } else {
        toast({
          title: "Quiz Not Available",
          description: result.error || "This quiz combination is not yet available. Please try another combination.",
          variant: "destructive",
        });
        setQuizState('config');
      }
    } catch (error) {
      console.error("Error loading quiz:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setQuizState('config');
    }
  };

  const chooseRandomVerb = () => {
    const randomVerb = VERBS[Math.floor(Math.random() * VERBS.length)];
    setSelectedVerb(randomVerb.value);
  };

  const chooseRandomTimeFrame = () => {
    const timeFrames = Object.keys(TENSE_TYPES);
    const randomTimeFrame = timeFrames[Math.floor(Math.random() * timeFrames.length)];
    setSelectedTimeFrame(randomTimeFrame);
  };

  const chooseRandomTenseType = () => {
    if (selectedTimeFrame) {
      const availableTenses = (TENSE_TYPES as any)[selectedTimeFrame] || [];
      if (availableTenses.length > 0) {
        const randomTense = availableTenses[Math.floor(Math.random() * availableTenses.length)];
        setSelectedTenseType(randomTense.value);
      }
    }
  };

  const handleAnswerSelect = (questionIndex: number, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  const handleNextQuestion = () => {
    if (!quizData) return;
    
    setShowHint(false);
    
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizState('results');
    }
  };

  const handleStartOver = () => {
    setQuizState('config');
    setSelectedVerb("");
    setSelectedTimeFrame("");
    setSelectedTenseType("");
    setQuizData(null);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setShowHint(false);
  };

  const availableTenseTypes = selectedTimeFrame ? (TENSE_TYPES as any)[selectedTimeFrame] || [] : [];

  // Main render logic
  const renderContent = () => {
    switch (quizState) {
      case 'loading':
        return <LoadingSpinner />;
      case 'active':
        if (!quizData) return null;
        return (
          <QuizView
            questionData={quizData.questions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={quizData.questions.length}
            userAnswer={userAnswers[currentQuestionIndex]}
            showHint={showHint}
            onAnswerSelect={handleAnswerSelect}
            onNext={handleNextQuestion}
            onToggleHint={() => setShowHint(!showHint)}
          />
        );
      case 'results':
        if (!quizData) return null;
        return (
          <ResultsDisplay 
            quizData={quizData}
            userAnswers={userAnswers}
            onStartOver={handleStartOver}
          />
        );
      case 'config':
      default:
        return (
          <ConfigurationScreen
            selectedVerb={selectedVerb}
            setSelectedVerb={setSelectedVerb}
            selectedTimeFrame={selectedTimeFrame}
            setSelectedTimeFrame={setSelectedTimeFrame}
            selectedTenseType={selectedTenseType}
            setSelectedTenseType={setSelectedTenseType}
            availableTenseTypes={availableTenseTypes}
            onStartQuiz={loadQuiz}
            chooseRandomVerb={chooseRandomVerb}
            chooseRandomTimeFrame={chooseRandomTimeFrame}
            chooseRandomTenseType={chooseRandomTenseType}
          />
        );
    }
  };

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        {quizState !== 'config' && <Header />}
        <main className="bg-slate-800 rounded-xl shadow-2xl p-6 sm:p-8 mt-6 ring-1 ring-slate-700">
          {renderContent()}
        </main>
        {quizState === 'config' && <Footer />}
      </div>
    </div>
  );
}

// UI Components
const Header = () => (
  <header className="text-center mb-4">
    <h1 className="text-3xl sm:text-4xl font-bold text-white">French Verb Master</h1>
  </header>
);

const Footer = () => (
  <div className="text-center mt-12">
    <p className="text-slate-400">A focused quiz tool to master French verb tenses.</p>
  </div>
);

interface ConfigurationScreenProps {
  selectedVerb: string;
  setSelectedVerb: (verb: string) => void;
  selectedTimeFrame: string;
  setSelectedTimeFrame: (timeFrame: string) => void;
  selectedTenseType: string;
  setSelectedTenseType: (tenseType: string) => void;
  availableTenseTypes: Array<{ value: string; label: string }>;
  onStartQuiz: () => void;
  chooseRandomVerb: () => void;
  chooseRandomTimeFrame: () => void;
  chooseRandomTenseType: () => void;
}

const ConfigurationScreen = ({ 
  selectedVerb, 
  setSelectedVerb, 
  selectedTimeFrame, 
  setSelectedTimeFrame,
  selectedTenseType,
  setSelectedTenseType,
  availableTenseTypes,
  onStartQuiz,
  chooseRandomVerb,
  chooseRandomTimeFrame,
  chooseRandomTenseType
}: ConfigurationScreenProps) => (
  <div className="flex flex-col gap-6 animate-fade-in text-center">
    <Header />
    <p className="text-lg text-slate-400 -mt-8">Select a verb and tense to start your quiz.</p>
    
    <div>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="verb-select" className="block text-lg font-medium text-slate-300">1. Choose a Verb</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={chooseRandomVerb}
          className="border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700"
        >
          Choose for me
        </Button>
      </div>
      <select
        id="verb-select"
        value={selectedVerb}
        onChange={(e) => setSelectedVerb(e.target.value)}
        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white"
      >
        <option value="">Select a verb...</option>
        {VERBS.map(verb => <option key={verb.value} value={verb.value}>{verb.label}</option>)}
      </select>
    </div>

    <div>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="timeframe-select" className="block text-lg font-medium text-slate-300">2. Choose a Time Frame</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={chooseRandomTimeFrame}
          className="border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700"
        >
          Choose for me
        </Button>
      </div>
      <select
        id="timeframe-select"
        value={selectedTimeFrame}
        onChange={(e) => setSelectedTimeFrame(e.target.value)}
        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white"
      >
        <option value="">Select time frame...</option>
        {TIME_FRAMES.map(timeFrame => <option key={timeFrame.value} value={timeFrame.value}>{timeFrame.label}</option>)}
      </select>
    </div>

    <div>
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="tense-select" className="block text-lg font-medium text-slate-300">3. Choose a Tense to Test</label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={chooseRandomTenseType}
          disabled={!selectedTimeFrame}
          className="border-slate-600 text-slate-400 hover:text-white hover:bg-slate-700 disabled:opacity-50"
        >
          Choose for me
        </Button>
      </div>
      <select
        id="tense-select"
        value={selectedTenseType}
        onChange={(e) => setSelectedTenseType(e.target.value)}
        disabled={!selectedTimeFrame}
        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-white disabled:opacity-50"
      >
        <option value="">{selectedTimeFrame ? "Select tense..." : "Select time frame first..."}</option>
        {availableTenseTypes.map(tense => <option key={tense.value} value={tense.value}>{tense.label}</option>)}
      </select>
    </div>

    <button
      onClick={onStartQuiz}
      className="w-full bg-indigo-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-transform transform hover:scale-105 shadow-lg"
    >
      Start Quiz!
    </button>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex flex-col items-center space-y-4 py-8">
    <Loader2 className="h-12 w-12 animate-spin text-indigo-400" />
    <p className="text-slate-400">Loading your French quiz...</p>
    <p className="text-sm text-slate-500">Fetching quiz from our database...</p>
  </div>
);

interface QuizViewProps {
  questionData: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  userAnswer: string;
  showHint: boolean;
  onAnswerSelect: (questionIndex: number, answer: string) => void;
  onNext: () => void;
  onToggleHint: () => void;
}

const QuizView = ({ 
  questionData, 
  currentIndex, 
  totalQuestions, 
  userAnswer, 
  showHint,
  onAnswerSelect, 
  onNext,
  onToggleHint
}: QuizViewProps) => (
  <div className="animate-fade-in">
    <div className="text-right text-slate-400 font-mono mb-4">{currentIndex + 1} / {totalQuestions}</div>
    <p className="font-semibold text-xl sm:text-2xl text-slate-100 mb-6 h-16">{questionData.question}</p>
    <div className="space-y-3">
      {questionData.answerOptions.map((option, i) => (
        <button
          type="button"
          key={i}
          onClick={() => onAnswerSelect(currentIndex, option.text)}
          className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 text-lg ${
            userAnswer === option.text
              ? 'bg-indigo-600 border-indigo-500 text-white shadow-md ring-2 ring-indigo-400'
              : 'bg-slate-700 border-slate-600 hover:bg-slate-600 hover:border-slate-500'
          }`}
        >
          <Badge variant="secondary" className="mr-3 min-w-[32px] h-6">
            {String.fromCharCode(65 + i)}.
          </Badge>
          {option.text}
        </button>
      ))}
    </div>
    <div className="mt-6 flex justify-between items-center">
      <div className="h-10">
        <button 
          onClick={onToggleHint} 
          className="text-indigo-400 hover:text-indigo-300 transition text-sm"
        >
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </button>
        {showHint && (
          <div className="text-sm text-amber-400 p-2 bg-slate-700/50 rounded-md mt-2 animate-fade-in-fast">
            <strong>Hint:</strong> {questionData.hint}
          </div>
        )}
      </div>
      <button
        onClick={onNext}
        disabled={!userAnswer}
        className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-transform transform hover:scale-105 shadow-lg disabled:bg-slate-600 disabled:cursor-not-allowed disabled:transform-none"
      >
        {currentIndex === totalQuestions - 1 ? 'Finish' : 'Next'}
      </button>
    </div>
  </div>
);

interface ResultsDisplayProps {
  quizData: Quiz;
  userAnswers: Record<number, string>;
  onStartOver: () => void;
}

const ResultsDisplay = ({ quizData, userAnswers, onStartOver }: ResultsDisplayProps) => {
  const score = quizData.questions.filter((question, index) => 
    question.answerOptions.find(option => option.text === userAnswers[index])?.isCorrect
  ).length;
  
  const percentage = Math.round((score / quizData.questions.length) * 100);

  return (
    <div className="text-center animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-6">Quiz Complete!</h2>
      <div className="mb-6">
        <div className="text-6xl font-bold text-indigo-400 mb-2">{percentage}%</div>
        <p className="text-slate-400 text-lg">
          You got {score} out of {quizData.questions.length} questions correct
        </p>
      </div>
      <div className="flex gap-4 justify-center">
        <button
          onClick={onStartOver}
          className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition-transform transform hover:scale-105 shadow-lg"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};