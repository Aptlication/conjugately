import { useState } from "react";

// Complete French Verb Master Application - Fresh Implementation
export default function FreshApp() {
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
    "Present": ["Présent"], 
    "Future": ["Futur Simple", "Conditionnel"],
  };

  const DIFFICULTY_CONFIGS = {
    "Easy": { verbs: ["être", "avoir", "faire"], timeFrames: ["Present"], tenses: ["Présent"] },
    "Moderate": { verbs: ["être", "avoir", "faire", "dire", "aller", "voir"], timeFrames: ["Present", "Past"], tenses: ["Présent", "Passé Composé", "Imparfait", "Futur Simple"] },
    "Advanced": { verbs: [...FRENCH_VERBS], timeFrames: Object.keys(TIME_FRAMES), tenses: Object.values(TIME_FRAMES).flat() }
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
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', border: '4px solid #7c3aed', borderTop: '4px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
          <p style={{ fontSize: '20px', marginBottom: '8px' }}>Generating your quiz...</p>
          <p style={{ color: '#a78bfa' }}>Creating 20 questions for {selectedVerb} in {selectedTenseType}</p>
        </div>
      </div>
    );
  }

  if (quizState === 'active' && quizData.length) {
    const currentQuestion = quizData[currentQuestionIndex];
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%)', padding: '48px 16px', color: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)', padding: '32px' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px' }}>Question {currentQuestionIndex + 1} of {quizData.length}</span>
              <button onClick={() => setShowHint(!showHint)} style={{ color: '#a78bfa', background: 'none', border: 'none', fontSize: '14px', cursor: 'pointer' }}>
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
            </div>
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', height: '8px' }}>
              <div style={{ background: 'linear-gradient(to right, #10b981, #3b82f6)', height: '8px', borderRadius: '8px', width: `${((currentQuestionIndex + 1) / quizData.length) * 100}%`, transition: 'width 0.3s' }}></div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>{currentQuestion.question}</h2>
            {showHint && (
              <div style={{ background: 'rgba(59, 130, 246, 0.2)', border: '1px solid rgba(59, 130, 246, 0.3)', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
                <p style={{ color: '#93c5fd' }}>💡 {currentQuestion.hint}</p>
              </div>
            )}
          </div>

          <div style={{ marginBottom: '32px' }}>
            {currentQuestion.answerOptions.map((option: any, index: number) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                style={{
                  width: '100%',
                  padding: '16px',
                  textAlign: 'left',
                  borderRadius: '12px',
                  border: selectedAnswerIndex === index ? '2px solid #7c3aed' : '2px solid rgba(255,255,255,0.2)',
                  background: selectedAnswerIndex === index ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255,255,255,0.1)',
                  color: 'white',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid currentColor', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px', fontSize: '14px', fontWeight: 'bold' }}>
                  {String.fromCharCode(65 + index)}
                </span>
                {option.text}
              </button>
            ))}
          </div>

          {selectedAnswerIndex !== null && (
            <div style={{ 
              marginBottom: '24px', 
              padding: '16px', 
              borderRadius: '12px', 
              border: `1px solid ${currentQuestion.answerOptions[selectedAnswerIndex].isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
              background: currentQuestion.answerOptions[selectedAnswerIndex].isCorrect ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: currentQuestion.answerOptions[selectedAnswerIndex].isCorrect ? '#6ee7b7' : '#fca5a5'
            }}>
              <p>📝 {currentQuestion.answerOptions[selectedAnswerIndex].rationale}</p>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              onClick={handleStartOver}
              style={{ padding: '12px 24px', color: '#94a3b8', background: 'transparent', border: '1px solid #475569', borderRadius: '12px', cursor: 'pointer' }}
            >
              Start Over
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswerIndex === null}
              style={{ 
                padding: '12px 32px', 
                background: selectedAnswerIndex !== null ? 'linear-gradient(to right, #10b981, #3b82f6)' : '#374151',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: selectedAnswerIndex !== null ? 'pointer' : 'not-allowed',
                fontWeight: '600'
              }}
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
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%)', padding: '48px 16px', color: 'white' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Summary Section */}
          <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)', padding: '32px', textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '24px' }}>Quiz Complete!</h2>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '64px', fontWeight: 'bold', marginBottom: '8px' }}>{percentage}%</div>
              <p style={{ fontSize: '20px', color: '#cbd5e1' }}>
                You got {correctAnswers} out of {totalQuestions} questions correct
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '16px', height: '16px', background: '#10b981', borderRadius: '50%' }}></div>
                  <span style={{ color: '#6ee7b7' }}>{correctAnswers} Correct</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '16px', height: '16px', background: '#ef4444', borderRadius: '50%' }}></div>
                  <span style={{ color: '#fca5a5' }}>{totalQuestions - correctAnswers} Incorrect</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Review Section */}
          <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)', padding: '32px', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>Detailed Review</h3>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {quizData.map((question, index) => {
                const userAnswerIndex = userAnswers[index];
                const userAnswer = userAnswerIndex !== undefined ? question.answerOptions[userAnswerIndex] : null;
                const correctAnswer = question.answerOptions.find((option: any) => option.isCorrect);
                const isCorrect = userAnswer?.isCorrect || false;

                return (
                  <div key={index} style={{ 
                    padding: '16px', 
                    marginBottom: '16px',
                    borderRadius: '12px', 
                    border: `1px solid ${isCorrect ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                    background: isCorrect ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ 
                        width: '32px', 
                        height: '32px', 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        fontSize: '14px', 
                        fontWeight: 'bold',
                        background: isCorrect ? '#10b981' : '#ef4444',
                        color: 'white'
                      }}>
                        {index + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: '500', marginBottom: '8px' }}>{question.question}</p>
                        <div style={{ fontSize: '14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ color: isCorrect ? '#6ee7b7' : '#fca5a5' }}>
                              Your answer:
                            </span>
                            <span style={{ color: isCorrect ? '#a7f3d0' : '#fecaca' }}>
                              {userAnswer ? userAnswer.text : 'No answer selected'}
                            </span>
                          </div>
                          {!isCorrect && correctAnswer && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                              <span style={{ color: '#6ee7b7' }}>Correct answer:</span>
                              <span style={{ color: '#a7f3d0' }}>{correctAnswer.text}</span>
                            </div>
                          )}
                          <div style={{ color: '#cbd5e1', fontSize: '12px', marginTop: '8px' }}>
                            {userAnswer?.rationale || correctAnswer?.rationale}
                          </div>
                        </div>
                      </div>
                      <div style={{ fontSize: '24px', color: isCorrect ? '#10b981' : '#ef4444' }}>
                        {isCorrect ? '✓' : '✗'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleStartOver}
              style={{ padding: '12px 32px', background: 'linear-gradient(to right, #7c3aed, #ec4899)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', fontSize: '16px' }}
            >
              Try Another Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%)', padding: '48px 16px', color: 'white' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>
            French Verb Master
          </h1>
          <p style={{ fontSize: '20px', color: '#cbd5e1', maxWidth: '600px', margin: '0 auto' }}>
            Master French verb conjugations with personalized quizzes. 
            Select your verb, time frame, and tense type to generate a 20-question quiz.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <button
            onClick={() => setShowDifficultyModal(true)}
            style={{ padding: '16px 32px', fontSize: '18px', fontWeight: 'bold', color: 'white', background: 'linear-gradient(to right, #4f46e5, #7c3aed, #ec4899)', border: 'none', borderRadius: '16px', cursor: 'pointer', transform: 'scale(1)', transition: 'transform 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            🎲 Choose All for Me
          </button>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.2)', padding: '32px' }}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <label style={{ fontSize: '18px', fontWeight: '600' }}>1. Choose a French Verb</label>
              <button onClick={handleChooseVerb} style={{ padding: '8px 16px', background: 'linear-gradient(to right, #7c3aed, #ec4899)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>
                Choose for me
              </button>
            </div>
            <select
              value={selectedVerb}
              onChange={(e) => setSelectedVerb(e.target.value)}
              style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: '16px' }}
            >
              <option value="" style={{ background: '#1f2937', color: 'white' }}>Select a verb...</option>
              {FRENCH_VERBS.map((verb) => (
                <option key={verb} value={verb} style={{ background: '#1f2937', color: 'white' }}>{verb}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <label style={{ fontSize: '18px', fontWeight: '600' }}>2. Choose Time Frame</label>
              <button 
                onClick={handleChooseTimeFrame} 
                disabled={!selectedVerb}
                style={{ 
                  padding: '8px 16px', 
                  background: selectedVerb ? 'linear-gradient(to right, #7c3aed, #ec4899)' : '#374151',
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: selectedVerb ? 'pointer' : 'not-allowed',
                  fontWeight: '500',
                  opacity: selectedVerb ? 1 : 0.5
                }}
              >
                Choose for me
              </button>
            </div>
            <select
              value={selectedTimeFrame}
              onChange={(e) => { setSelectedTimeFrame(e.target.value); setSelectedTenseType(""); }}
              disabled={!selectedVerb}
              style={{ 
                width: '100%', 
                padding: '16px', 
                borderRadius: '12px', 
                background: 'rgba(255,255,255,0.1)', 
                border: '1px solid rgba(255,255,255,0.2)', 
                color: 'white', 
                fontSize: '16px',
                opacity: selectedVerb ? 1 : 0.5
              }}
            >
              <option value="" style={{ background: '#1f2937', color: 'white' }}>Select time frame...</option>
              {Object.keys(TIME_FRAMES).map((timeFrame) => (
                <option key={timeFrame} value={timeFrame} style={{ background: '#1f2937', color: 'white' }}>{timeFrame}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <label style={{ fontSize: '18px', fontWeight: '600' }}>3. Choose Specific Tense</label>
              <button 
                onClick={handleChooseTenseType} 
                disabled={!selectedTimeFrame}
                style={{ 
                  padding: '8px 16px', 
                  background: selectedTimeFrame ? 'linear-gradient(to right, #7c3aed, #ec4899)' : '#374151',
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '8px', 
                  cursor: selectedTimeFrame ? 'pointer' : 'not-allowed',
                  fontWeight: '500',
                  opacity: selectedTimeFrame ? 1 : 0.5
                }}
              >
                Choose for me
              </button>
            </div>
            <select
              value={selectedTenseType}
              onChange={(e) => setSelectedTenseType(e.target.value)}
              disabled={!selectedTimeFrame}
              style={{ 
                width: '100%', 
                padding: '16px', 
                borderRadius: '12px', 
                background: 'rgba(255,255,255,0.1)', 
                border: '1px solid rgba(255,255,255,0.2)', 
                color: 'white', 
                fontSize: '16px',
                opacity: selectedTimeFrame ? 1 : 0.5
              }}
            >
              <option value="" style={{ background: '#1f2937', color: 'white' }}>Select tense type...</option>
              {selectedTimeFrame && TIME_FRAMES[selectedTimeFrame as keyof typeof TIME_FRAMES].map((tense) => (
                <option key={tense} value={tense} style={{ background: '#1f2937', color: 'white' }}>{tense}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleStartQuiz}
            disabled={!selectedVerb || !selectedTimeFrame || !selectedTenseType}
            style={{ 
              width: '100%', 
              padding: '16px', 
              fontSize: '18px', 
              fontWeight: 'bold', 
              color: 'white',
              background: (selectedVerb && selectedTimeFrame && selectedTenseType) ? 'linear-gradient(to right, #10b981, #3b82f6)' : '#374151',
              border: 'none',
              borderRadius: '12px',
              cursor: (selectedVerb && selectedTimeFrame && selectedTenseType) ? 'pointer' : 'not-allowed',
              opacity: (selectedVerb && selectedTimeFrame && selectedTenseType) ? 1 : 0.5
            }}
          >
            {selectedVerb && selectedTimeFrame && selectedTenseType 
              ? `Start ${selectedVerb} Quiz (${selectedTenseType})`
              : "Complete all selections to start quiz"
            }
          </button>
        </div>

        {selectedVerb && selectedTimeFrame && selectedTenseType && (
          <div style={{ maxWidth: '600px', margin: '32px auto 0', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>Quiz Preview</h3>
            <p style={{ color: '#6ee7b7' }}>
              Ready to generate 20 questions for <strong>{selectedVerb}</strong> conjugations in <strong>{selectedTenseType}</strong>
            </p>
          </div>
        )}

        {showDifficultyModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '100%', margin: '16px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px' }}>
                Choose Difficulty Level
              </h3>
              <div style={{ marginBottom: '24px' }}>
                <button
                  onClick={() => handleDifficultySelect("Easy")}
                  style={{ width: '100%', padding: '16px', textAlign: 'left', background: 'rgba(16, 185, 129, 0.2)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '12px', color: 'white', cursor: 'pointer', marginBottom: '12px' }}
                >
                  <div style={{ color: '#6ee7b7', fontWeight: '600', fontSize: '18px' }}>🟢 Easy</div>
                  <div style={{ color: '#cbd5e1', fontSize: '14px', marginTop: '4px' }}>
                    Basic verbs (être, avoir, faire) • Present tense only
                  </div>
                </button>
                
                <button
                  onClick={() => handleDifficultySelect("Moderate")}
                  style={{ width: '100%', padding: '16px', textAlign: 'left', background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.3)', borderRadius: '12px', color: 'white', cursor: 'pointer', marginBottom: '12px' }}
                >
                  <div style={{ color: '#fbbf24', fontWeight: '600', fontSize: '18px' }}>🟡 Moderate</div>
                  <div style={{ color: '#cbd5e1', fontSize: '14px', marginTop: '4px' }}>
                    6 common verbs • Present, past, and future tenses
                  </div>
                </button>
                
                <button
                  onClick={() => handleDifficultySelect("Advanced")}
                  style={{ width: '100%', padding: '16px', textAlign: 'left', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '12px', color: 'white', cursor: 'pointer' }}
                >
                  <div style={{ color: '#f87171', fontWeight: '600', fontSize: '18px' }}>🔴 Advanced</div>
                  <div style={{ color: '#cbd5e1', fontSize: '14px', marginTop: '4px' }}>
                    All 10 verbs • All tenses and time frames
                  </div>
                </button>
              </div>
              
              <button
                onClick={() => setShowDifficultyModal(false)}
                style={{ width: '100%', padding: '12px', color: '#94a3b8', background: 'transparent', border: '1px solid #475569', borderRadius: '12px', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}