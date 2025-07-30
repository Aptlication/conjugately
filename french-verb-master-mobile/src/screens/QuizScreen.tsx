import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, ProgressBar, RadioButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../App';
import { useQuery } from '@tanstack/react-query';
import { quizService } from '../services/quizService';

type QuizScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Quiz'>;
type QuizScreenRouteProp = RouteProp<RootStackParamList, 'Quiz'>;

export default function QuizScreen() {
  const navigation = useNavigation<QuizScreenNavigationProp>();
  const route = useRoute<QuizScreenRouteProp>();
  const { verb, timeFrame, tenseType, difficulty } = route.params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);

  const { data: quiz, isLoading, error } = useQuery({
    queryKey: ['quiz', verb, timeFrame, tenseType, difficulty],
    queryFn: () => quizService.generateQuiz({ verb, timeFrame, tenseType, difficulty }),
  });

  const handleAnswerSelect = (answer: string) => {
    if (!showFeedback) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setShowFeedback(false);
    } else {
      // Quiz completed
      const correctAnswers = userAnswers.filter((answer, index) => {
        const question = quiz?.questions[index];
        return question?.answers.find(a => a.text === answer)?.isCorrect;
      }).length;

      navigation.navigate('Results', {
        score: correctAnswers,
        totalQuestions: quiz?.questions.length || 0,
        questions: quiz?.questions || [],
      });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text variant="titleMedium" style={styles.loadingText}>
          Generating quiz...
        </Text>
        <ProgressBar indeterminate color="#8b5cf6" style={styles.loadingBar} />
      </View>
    );
  }

  if (error || !quiz) {
    return (
      <View style={styles.errorContainer}>
        <Text variant="titleMedium" style={styles.errorText}>
          Failed to load quiz. Please try again.
        </Text>
        <Button mode="contained" onPress={() => navigation.goBack()}>
          Go Back
        </Button>
      </View>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = (currentQuestionIndex + 1) / quiz.questions.length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.questionNumber}>
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </Text>
        <ProgressBar progress={progress} color="#8b5cf6" style={styles.progressBar} />
      </View>

      <Card style={styles.questionCard}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.questionText}>
            {currentQuestion.question}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.answersCard}>
        <Card.Content>
          <RadioButton.Group value={selectedAnswer} onValueChange={handleAnswerSelect}>
            {currentQuestion.answers.map((answer, index) => (
              <View key={index} style={[
                styles.answerItem,
                showFeedback && answer.isCorrect && styles.correctAnswer,
                showFeedback && selectedAnswer === answer.text && !answer.isCorrect && styles.wrongAnswer,
              ]}>
                <RadioButton.Item
                  label={answer.text}
                  value={answer.text}
                  disabled={showFeedback}
                  labelStyle={styles.answerText}
                />
                {showFeedback && selectedAnswer === answer.text && (
                  <Text variant="bodySmall" style={styles.rationale}>
                    {answer.rationale}
                  </Text>
                )}
              </View>
            ))}
          </RadioButton.Group>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        {!showFeedback ? (
          <Button
            mode="contained"
            onPress={handleSubmitAnswer}
            disabled={!selectedAnswer}
            style={styles.button}
          >
            Submit Answer
          </Button>
        ) : (
          <Button
            mode="contained"
            onPress={handleNextQuestion}
            style={styles.button}
          >
            {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'View Results'}
          </Button>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  loadingText: {
    color: '#ffffff',
    marginBottom: 20,
  },
  loadingBar: {
    width: 200,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  errorText: {
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  header: {
    marginBottom: 20,
  },
  questionNumber: {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  questionCard: {
    marginBottom: 20,
    backgroundColor: '#16213e',
  },
  questionText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  answersCard: {
    marginBottom: 20,
    backgroundColor: '#16213e',
  },
  answerItem: {
    marginVertical: 4,
    borderRadius: 8,
    padding: 8,
  },
  correctAnswer: {
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  wrongAnswer: {
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  answerText: {
    color: '#ffffff',
  },
  rationale: {
    color: '#cccccc',
    marginTop: 4,
    marginLeft: 40,
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#8b5cf6',
  },
});