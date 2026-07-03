/*
======================================================================================
REACT NATIVE QUIZ SCREEN - COPY & PASTE READY
======================================================================================

SIMPLE SETUP:
1. Copy this entire file
2. Save as QuizScreen.tsx in your React Native project
3. Install: npm install expo-linear-gradient react-native-vector-icons
4. Import and use the QuizScreen component

USAGE:
<QuizScreen
  selectedVerb="aller"
  selectedTimeFrame="Present"
  selectedTenseType="Présent"
  selectedDifficulty="Moderate"
  onQuizComplete={(score, total) => console.log(`Score: ${score}/${total}`)}
  onNavigateBack={() => console.log('Go back')}
/>

======================================================================================
*/

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Dimensions,
  Platform,
  Animated,
  Vibration,
} from 'react-native';

// UNCOMMENT AFTER INSTALLING:
// import { LinearGradient } from 'expo-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint?: string;
  rationale?: string;
}

interface QuizScreenProps {
  selectedVerb: string;
  selectedTimeFrame: string;
  selectedTenseType: string;
  selectedDifficulty: string;
  onQuizComplete: (score: number, totalQuestions: number) => void;
  onNavigateBack: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({
  selectedVerb,
  selectedTimeFrame,
  selectedTenseType,
  selectedDifficulty,
  onQuizComplete,
  onNavigateBack,
}) => {
  const [quizState, setQuizState] = useState<'loading' | 'active' | 'completed'>('loading');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    try {
      setQuizState('loading');
      
      const timeFrameMap = { "Past": "past", "Present": "present", "Future": "future" };
      
      const response = await fetch('/api/get-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          verb: selectedVerb,
          timeFrame: timeFrameMap[selectedTimeFrame as keyof typeof timeFrameMap],
          tenseType: selectedTenseType,
          difficulty: selectedDifficulty,
        }),
      });

      const data = await response.json();
      
      if (data.success && data.quiz?.questions) {
        setQuestions(data.quiz.questions);
        setQuizState('active');
        
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      } else {
        throw new Error('Failed to load quiz');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load quiz. Please try again.');
      onNavigateBack();
    }
  };

  const handleAnswerSelect = (index: number) => {
    if (!isAnswerConfirmed) {
      setSelectedAnswerIndex(index);
    }
  };

  const handleAnswerConfirm = () => {
    if (selectedAnswerIndex !== null) {
      setIsAnswerConfirmed(true);
      setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: selectedAnswerIndex }));
      
      if (Platform.OS === 'ios') {
        Vibration.vibrate();
      } else {
        Vibration.vibrate(100);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswerIndex(null);
      setIsAnswerConfirmed(false);
      setShowHint(false);
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    setQuizState('completed');
    onQuizComplete(correctCount, questions.length);
  };

  // Loading Screen
  if (quizState === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        {/* REPLACE WITH LinearGradient AFTER INSTALLING */}
        <View style={styles.loadingGradient}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingTitle}>Conjugately</Text>
          <Text style={styles.loadingText}>Loading your quiz...</Text>
          <Text style={styles.loadingDetail}>Verb: {selectedVerb}</Text>
          <Text style={styles.loadingDetail}>Tense: {selectedTenseType}</Text>
        </View>
      </View>
    );
  }

  // Quiz Screen
  if (quizState === 'active' && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <SafeAreaView style={styles.container}>
        {/* REPLACE WITH LinearGradient AFTER INSTALLING */}
        <View style={styles.gradient}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
              
              {/* Progress Section */}
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text style={styles.progressText}>
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </Text>
                  <TouchableOpacity 
                    onPress={() => setShowHint(!showHint)} 
                    style={styles.hintButton}
                  >
                    {/* REPLACE WITH Icon AFTER INSTALLING */}
                    <Text style={styles.hintButtonText}>
                      {showHint ? 'Hide Hint' : 'Show Hint'}
                    </Text>
                  </TouchableOpacity>
                </View>
                
                <View style={styles.progressBar}>
                  <View style={[
                    styles.progressFill,
                    { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
                  ]} />
                </View>
              </View>

              {/* Question */}
              <View style={styles.questionSection}>
                <Text style={styles.questionText}>{currentQuestion.question}</Text>
                
                {showHint && currentQuestion.hint && (
                  <View style={styles.hintContainer}>
                    <Text style={styles.hintText}>💡 {currentQuestion.hint}</Text>
                  </View>
                )}
              </View>

              {/* Answer Options */}
              <View style={styles.optionsSection}>
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswerIndex === index;
                  const isCorrect = isAnswerConfirmed && index === currentQuestion.correctAnswer;
                  const isWrong = isAnswerConfirmed && isSelected && index !== currentQuestion.correctAnswer;
                  
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        isSelected && styles.optionButtonSelected,
                        isCorrect && styles.optionButtonCorrect,
                        isWrong && styles.optionButtonWrong,
                      ]}
                      onPress={() => handleAnswerSelect(index)}
                      disabled={isAnswerConfirmed}
                    >
                      <Text style={styles.optionLetter}>
                        {String.fromCharCode(65 + index)}
                      </Text>
                      <Text style={styles.optionText}>{option}</Text>
                      {isCorrect && <Text style={styles.checkMark}>✓</Text>}
                      {isWrong && <Text style={styles.crossMark}>✗</Text>}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Action Button */}
              <View style={styles.actionSection}>
                {!isAnswerConfirmed ? (
                  <TouchableOpacity
                    style={[
                      styles.confirmButton,
                      selectedAnswerIndex === null && styles.confirmButtonDisabled
                    ]}
                    onPress={handleAnswerConfirm}
                    disabled={selectedAnswerIndex === null}
                  >
                    <Text style={styles.confirmButtonText}>Confirm Answer</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNextQuestion}
                  >
                    <Text style={styles.nextButtonText}>
                      {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question →'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Explanation */}
              {isAnswerConfirmed && currentQuestion.rationale && (
                <View style={styles.explanationContainer}>
                  <Text style={styles.explanationTitle}>📝 Explanation</Text>
                  <Text style={styles.explanationText}>{currentQuestion.rationale}</Text>
                </View>
              )}

            </Animated.View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // Quiz Completed
  if (quizState === 'completed') {
    const score = Object.values(userAnswers).filter((answer, index) => 
      answer === questions[index]?.correctAnswer
    ).length;
    
    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Quiz Complete!</Text>
        <Text style={styles.resultsScore}>{score}/{questions.length}</Text>
        <Text style={styles.resultsPercentage}>
          {Math.round((score / questions.length) * 100)}%
        </Text>
        
        <TouchableOpacity style={styles.retryButton} onPress={loadQuiz}>
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.backButton} onPress={onNavigateBack}>
          <Text style={styles.backButtonText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    backgroundColor: '#4C1D95', // Fallback color
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
  },
  loadingGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4C1D95',
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 16,
    color: '#E0E7FF',
    marginBottom: 24,
  },
  loadingDetail: {
    fontSize: 14,
    color: '#C7D2FE',
    marginBottom: 4,
  },
  questionContainer: {
    flex: 1,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  hintButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  hintButtonText: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  questionSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 28,
    textAlign: 'center',
  },
  hintContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  hintText: {
    fontSize: 14,
    color: '#FFD700',
    fontStyle: 'italic',
  },
  optionsSection: {
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionButtonSelected: {
    borderColor: '#A855F7',
    backgroundColor: 'rgba(168, 85, 247, 0.2)',
  },
  optionButtonCorrect: {
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  optionButtonWrong: {
    borderColor: '#F44336',
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    textAlign: 'center',
    lineHeight: 32,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginRight: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    fontWeight: '500',
  },
  checkMark: {
    fontSize: 20,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  crossMark: {
    fontSize: 20,
    color: '#F44336',
    fontWeight: 'bold',
  },
  actionSection: {
    marginBottom: 24,
  },
  confirmButton: {
    backgroundColor: '#A855F7',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: 'rgba(168, 85, 247, 0.5)',
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  explanationContainer: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  resultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4C1D95',
    padding: 40,
  },
  resultsTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  resultsScore: {
    fontSize: 48,
    fontWeight: '800',
    color: '#4CAF50',
    marginBottom: 8,
  },
  resultsPercentage: {
    fontSize: 24,
    fontWeight: '600',
    color: '#E0E7FF',
    marginBottom: 40,
  },
  retryButton: {
    backgroundColor: '#A855F7',
    borderRadius: 12,
    padding: 16,
    width: width - 80,
    alignItems: 'center',
    marginBottom: 16,
  },
  retryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    width: width - 80,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default QuizScreen;