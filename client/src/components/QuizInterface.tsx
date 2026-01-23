import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
  tense: string;
  questions: QuizQuestion[];
}

interface QuizInterfaceProps {
  quiz: Quiz;
  onComplete: () => void;
}

export default function QuizInterface({ quiz, onComplete }: QuizInterfaceProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestionIndex] = selectedAnswer;
      setAnswers(newAnswers);

      if (isLastQuestion) {
        setShowResults(true);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      }
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResults(false);
  };

  if (showResults) {
    const correctAnswers = answers.reduce((count, answerIndex, questionIndex) => {
      return quiz.questions[questionIndex].answerOptions[answerIndex].isCorrect ? count + 1 : count;
    }, 0);

    const percentage = Math.round((correctAnswers / quiz.questions.length) * 100);

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
        <Card className="bg-card border-border w-full max-w-2xl">
          <CardContent className="p-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h1>
            <div className="mb-6">
              <div className="text-6xl font-bold text-primary mb-2">{percentage}%</div>
              <p className="text-muted-foreground text-lg">
                You got {correctAnswers} out of {quiz.questions.length} questions correct
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={handleRestart} className="bg-primary hover:bg-primary/90">
                Try Again
              </Button>
              <Button onClick={onComplete} variant="outline" className="border-border">
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress indicator */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-muted-foreground text-sm">
            {quiz.verb} • {quiz.tense}
          </div>
          <div className="text-muted-foreground text-lg font-medium">
            {currentQuestionIndex + 1} / {quiz.questions.length}
          </div>
        </div>

        {/* Question card */}
        <Card className="bg-card border-border mb-8">
          <CardContent className="p-8">
            <h1 className="text-2xl font-medium text-white mb-8">
              {currentQuestion.question}
            </h1>

            {/* Answer options */}
            <div className="space-y-4 mb-8">
              {currentQuestion.answerOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border transition-all ${
                    selectedAnswer === index
                      ? "border-primary bg-primary/10"
                      : "border-border bg-input hover:bg-input/80"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Badge variant="secondary" className="min-w-[32px] h-8 flex items-center justify-center">
                      {String.fromCharCode(65 + index)}.
                    </Badge>
                    <span className="text-white">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Bottom actions */}
            <div className="flex justify-end items-center">
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="bg-primary hover:bg-primary/90 px-8"
                style={{ background: selectedAnswer !== null ? "var(--purple-gradient)" : undefined }}
              >
                {isLastQuestion ? "Finish" : "Next"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}