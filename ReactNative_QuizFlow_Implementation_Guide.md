# React Native Quiz Flow Implementation Guide
## From "Start Quiz" Button to 20-Question Quiz Launch

This guide provides complete implementation details for connecting your React Native quiz selection to the actual quiz experience, based on your existing Conjugately architecture.

## 📋 Overview

The quiz flow involves these key steps:
1. **Quiz Configuration** → User selects verb, time frame, tense
2. **API Integration** → Fetch 20 questions from your backend
3. **Quiz State Management** → Handle loading, questions, answers, progress
4. **Quiz UI Components** → Display questions, handle interactions
5. **Results & Navigation** → Show scores, handle completion

## 🔧 Implementation Steps

### Step 1: Quiz State Management Setup

```typescript
// QuizScreen.tsx - Main Quiz Component
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
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  hint?: string;
  rationale?: string;
  verb?: string;
  tense?: string;
}

interface QuizData {
  id: string;
  verb: string;
  timeFrame: string;
  tenseType: string;
  difficulty: string;
  questions: QuizQuestion[];
}

interface QuizScreenProps {
  // From your quiz selection component
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
  // Quiz State Management
  const [quizState, setQuizState] = useState<'loading' | 'active' | 'completed'>('loading');
  const [quizData, setQuizData] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showHint, setShowHint] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Load quiz data when component mounts
  useEffect(() => {
    loadQuizData();
  }, []);

  const loadQuizData = async () => {
    try {
      setQuizState('loading');
      
      // Map your time frame to API format
      const timeFrameMapping = {
        "Past": "past",
        "Present": "present", 
        "Future": "future"
      };

      const response = await fetch('/api/get-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verb: selectedVerb,
          timeFrame: timeFrameMapping[selectedTimeFrame as keyof typeof timeFrameMapping],
          tenseType: selectedTenseType,
          difficulty: selectedDifficulty,
        }),
      });

      const data = await response.json();
      
      if (data.success && data.quiz?.questions) {
        setQuizData(data.quiz.questions);
        setQuizState('active');
        
        // Animate quiz entrance
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }).start();
      } else {
        throw new Error('Failed to load quiz data');
      }
    } catch (error) {
      console.error('Error loading quiz:', error);
      Alert.alert(
        'Quiz Loading Error',
        'Unable to load quiz questions. Please try again.',
        [
          { text: 'Retry', onPress: loadQuizData },
          { text: 'Go Back', onPress: onNavigateBack },
        ]
      );
    }
  };

  // Continue with quiz logic implementation...
};
```

### Step 2: Question Display Component

```typescript
// QuestionComponent.tsx
const QuestionComponent: React.FC<{
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswerIndex: number | null;
  isAnswerConfirmed: boolean;
  showHint: boolean;
  onAnswerSelect: (index: number) => void;
  onAnswerConfirm: () => void;
  onToggleHint: () => void;
}> = ({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswerIndex,
  isAnswerConfirmed,
  showHint,
  onAnswerSelect,
  onAnswerConfirm,
  onToggleHint,
}) => {
  return (
    <Animated.View style={[styles.questionContainer, { opacity: fadeAnim }]}>
      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>
            Question {questionIndex + 1} of {totalQuestions}
          </Text>
          <TouchableOpacity onPress={onToggleHint} style={styles.hintButton}>
            <Icon name="lightbulb-outline" size={20} color="#FFD700" />
            <Text style={styles.hintButtonText}>
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${((questionIndex + 1) / totalQuestions) * 100}%` }
            ]}
          />
        </View>
      </View>

      {/* Question Text */}
      <View style={styles.questionSection}>
        <Text style={styles.questionText}>{question.question}</Text>
        
        {/* Hint Display */}
        {showHint && question.hint && (
          <View style={styles.hintContainer}>
            <Icon name="lightbulb-outline" size={16} color="#FFD700" />
            <Text style={styles.hintText}>{question.hint}</Text>
          </View>
        )}
      </View>

      {/* Answer Options */}
      <View style={styles.optionsSection}>
        {question.options.map((option, index) => {
          const isSelected = selectedAnswerIndex === index;
          const isCorrect = isAnswerConfirmed && index === question.correctAnswer;
          const isWrong = isAnswerConfirmed && isSelected && index !== question.correctAnswer;
          
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                isSelected && styles.optionButtonSelected,
                isCorrect && styles.optionButtonCorrect,
                isWrong && styles.optionButtonWrong,
              ]}
              onPress={() => !isAnswerConfirmed && onAnswerSelect(index)}
              disabled={isAnswerConfirmed}
            >
              <View style={styles.optionContent}>
                <View style={[
                  styles.optionIndicator,
                  isSelected && styles.optionIndicatorSelected,
                  isCorrect && styles.optionIndicatorCorrect,
                  isWrong && styles.optionIndicatorWrong,
                ]}>
                  <Text style={styles.optionLetter}>
                    {String.fromCharCode(65 + index)}
                  </Text>
                </View>
                <Text style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                  isCorrect && styles.optionTextCorrect,
                  isWrong && styles.optionTextWrong,
                ]}>
                  {option}
                </Text>
                {isCorrect && (
                  <Icon name="check-circle" size={24} color="#4CAF50" />
                )}
                {isWrong && (
                  <Icon name="cancel" size={24} color="#F44336" />
                )}
              </View>
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
            onPress={onAnswerConfirm}
            disabled={selectedAnswerIndex === null}
          >
            <Text style={styles.confirmButtonText}>Confirm Answer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {/* Handle next question */}}
          >
            <Text style={styles.nextButtonText}>
              {questionIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
            </Text>
            <Icon name="arrow-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Rationale Display */}
      {isAnswerConfirmed && question.rationale && (
        <View style={styles.rationaleContainer}>
          <View style={styles.rationaleHeader}>
            <Icon name="info-outline" size={20} color="#2196F3" />
            <Text style={styles.rationaleTitle}>Explanation</Text>
          </View>
          <Text style={styles.rationaleText}>{question.rationale}</Text>
        </View>
      )}
    </Animated.View>
  );
};
```

### Step 3: Quiz Navigation Logic

```typescript
// Quiz navigation and state management
const handleAnswerSelect = (answerIndex: number) => {
  if (!isAnswerConfirmed) {
    setSelectedAnswerIndex(answerIndex);
  }
};

const handleAnswerConfirm = () => {
  if (selectedAnswerIndex !== null) {
    setIsAnswerConfirmed(true);
    setUserAnswers(prev => ({
      ...prev,
      [currentQuestionIndex]: selectedAnswerIndex
    }));
    
    // Haptic feedback for answer confirmation
    if (Platform.OS === 'ios') {
      Vibration.vibrate();
    } else {
      Vibration.vibrate(100);
    }
  }
};

const handleNextQuestion = () => {
  if (currentQuestionIndex < quizData.length - 1) {
    // Move to next question
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedAnswerIndex(null);
    setIsAnswerConfirmed(false);
    setShowHint(false);
    
    // Animate question transition
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  } else {
    // Quiz completed
    completeQuiz();
  }
};

const completeQuiz = () => {
  // Calculate final score
  let correctAnswers = 0;
  quizData.forEach((question, index) => {
    if (userAnswers[index] === question.correctAnswer) {
      correctAnswers++;
    }
  });

  setQuizState('completed');
  onQuizComplete(correctAnswers, quizData.length);
};
```

### Step 4: Loading State Component

```typescript
// LoadingComponent.tsx
const LoadingComponent: React.FC<{
  verb: string;
  timeFrame: string;
  tenseType: string;
}> = ({ verb, timeFrame, tenseType }) => {
  const [loadingText, setLoadingText] = useState('Preparing your quiz...');
  
  useEffect(() => {
    const messages = [
      'Preparing your quiz...',
      `Loading ${verb} conjugations...`,
      `Setting up ${timeFrame} tense questions...`,
      'Almost ready...',
    ];
    
    let messageIndex = 0;
    const interval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      setLoadingText(messages[messageIndex]);
    }, 1500);
    
    return () => clearInterval(interval);
  }, [verb, timeFrame]);

  return (
    <View style={styles.loadingContainer}>
      <LinearGradient
        colors={['#4C1D95', '#7C3AED', '#A855F7']}
        style={styles.loadingGradient}
      >
        <View style={styles.loadingContent}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingTitle}>Conjugately</Text>
          <Text style={styles.loadingText}>{loadingText}</Text>
          
          <View style={styles.loadingDetails}>
            <Text style={styles.loadingDetail}>Verb: {verb}</Text>
            <Text style={styles.loadingDetail}>Time Frame: {timeFrame}</Text>
            <Text style={styles.loadingDetail}>Tense: {tenseType}</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};
```

### Step 5: Integration with Quiz Selection

```typescript
// In your QuizSelectionScreen component
const handleStartQuiz = async () => {
  if (!selectedVerb || !selectedTimeFrame || !selectedTenseType) {
    Alert.alert('Selection Required', 'Please select verb, time frame, and tense type.');
    return;
  }

  // Navigate to quiz screen with selections
  navigation.navigate('QuizScreen', {
    selectedVerb,
    selectedTimeFrame,
    selectedTenseType,
    selectedDifficulty,
  });
};

// Or if using modal-based navigation:
const [showQuizModal, setShowQuizModal] = useState(false);

const handleStartQuiz = () => {
  if (!selectedVerb || !selectedTimeFrame || !selectedTenseType) {
    Alert.alert('Selection Required', 'Please select verb, time frame, and tense type.');
    return;
  }
  
  setShowQuizModal(true);
};
```

### Step 6: Complete Quiz Screen Implementation

```typescript
// QuizScreen.tsx - Main render method
const QuizScreen: React.FC<QuizScreenProps> = (props) => {
  // ... state management code from above ...

  if (quizState === 'loading') {
    return (
      <LoadingComponent
        verb={selectedVerb}
        timeFrame={selectedTimeFrame}
        tenseType={selectedTenseType}
      />
    );
  }

  if (quizState === 'active' && quizData.length > 0) {
    const currentQuestion = quizData[currentQuestionIndex];
    
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#1E1B4B', '#3730A3', '#4C1D95']}
          style={styles.gradient}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
          >
            <QuestionComponent
              question={currentQuestion}
              questionIndex={currentQuestionIndex}
              totalQuestions={quizData.length}
              selectedAnswerIndex={selectedAnswerIndex}
              isAnswerConfirmed={isAnswerConfirmed}
              showHint={showHint}
              onAnswerSelect={handleAnswerSelect}
              onAnswerConfirm={handleAnswerConfirm}
              onToggleHint={() => setShowHint(!showHint)}
            />
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  if (quizState === 'completed') {
    return (
      <QuizResultsScreen
        score={Object.values(userAnswers).filter((answer, index) => 
          answer === quizData[index]?.correctAnswer
        ).length}
        totalQuestions={quizData.length}
        verb={selectedVerb}
        timeFrame={selectedTimeFrame}
        onRetry={() => {
          setQuizState('loading');
          setCurrentQuestionIndex(0);
          setUserAnswers({});
          setSelectedAnswerIndex(null);
          setIsAnswerConfirmed(false);
          loadQuizData();
        }}
        onNavigateBack={onNavigateBack}
      />
    );
  }

  return null;
};
```

## 🎨 Styling Guide

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  hintButtonText: {
    fontSize: 14,
    color: '#FFD700',
    marginLeft: 4,
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
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
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: 8,
    flex: 1,
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
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionIndicatorSelected: {
    backgroundColor: '#A855F7',
  },
  optionIndicatorCorrect: {
    backgroundColor: '#4CAF50',
  },
  optionIndicatorWrong: {
    backgroundColor: '#F44336',
  },
  optionLetter: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  optionText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  optionTextCorrect: {
    color: '#FFFFFF',
  },
  optionTextWrong: {
    color: '#FFFFFF',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  rationaleContainer: {
    backgroundColor: 'rgba(33, 150, 243, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  rationaleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rationaleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
    marginLeft: 8,
  },
  rationaleText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
  },
  loadingGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    padding: 40,
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
    textAlign: 'center',
    marginBottom: 24,
  },
  loadingDetails: {
    alignItems: 'center',
  },
  loadingDetail: {
    fontSize: 14,
    color: '#C7D2FE',
    marginBottom: 4,
  },
});
```

## 🔌 API Integration Notes

Your existing backend already supports the quiz generation with this endpoint:
- **URL**: `POST /api/get-quiz`
- **Request Body**:
  ```json
  {
    "verb": "aller",
    "timeFrame": "present",
    "tenseType": "Présent", 
    "difficulty": "Moderate"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "quiz": {
      "id": "1754723085052",
      "verb": "aller",
      "questions": [...]
    }
  }
  ```

## 🚀 Next Steps

1. **Copy the quiz screen component** into your React Native project
2. **Install dependencies**: `expo-linear-gradient` and `react-native-vector-icons`
3. **Set up navigation** between quiz selection and quiz screen
4. **Test the API integration** with your existing backend
5. **Customize styling** to match your design preferences
6. **Add results screen** for quiz completion handling

The implementation connects seamlessly with your existing Conjugately backend and provides a complete, professional quiz experience for your React Native application.