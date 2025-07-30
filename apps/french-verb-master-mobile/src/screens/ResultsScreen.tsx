import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, ProgressBar } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../App';

type ResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Results'>;
type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

export default function ResultsScreen() {
  const navigation = useNavigation<ResultsScreenNavigationProp>();
  const route = useRoute<ResultsScreenRouteProp>();
  const { score, totalQuestions, questions } = route.params;

  const percentage = Math.round((score / totalQuestions) * 100);
  const passed = percentage >= 90;

  const getScoreColor = () => {
    if (percentage >= 90) return '#4caf50'; // Green
    if (percentage >= 70) return '#ff9800'; // Orange
    return '#f44336'; // Red
  };

  const getScoreMessage = () => {
    if (percentage >= 90) return 'Excellent! You passed!';
    if (percentage >= 70) return 'Good work! Keep practicing.';
    return 'Keep studying and try again.';
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={[styles.scoreCard, { borderColor: getScoreColor() }]}>
        <Card.Content style={styles.scoreContent}>
          <Text variant="headlineLarge" style={[styles.scoreText, { color: getScoreColor() }]}>
            {percentage}%
          </Text>
          <Text variant="titleMedium" style={styles.scoreSubtext}>
            {score} out of {totalQuestions} correct
          </Text>
          <ProgressBar 
            progress={score / totalQuestions} 
            color={getScoreColor()} 
            style={styles.progressBar}
          />
          <Text variant="titleMedium" style={[styles.message, { color: getScoreColor() }]}>
            {getScoreMessage()}
          </Text>
          {passed && (
            <Text variant="bodyMedium" style={styles.passedText}>
              🎉 You achieved the 90% passing threshold!
            </Text>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.reviewCard}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.reviewTitle}>
            Question Review
          </Text>
          {questions.map((question: any, index: number) => {
            const userAnswer = question.answers.find((a: any) => a.text === question.userAnswer);
            const correctAnswer = question.answers.find((a: any) => a.isCorrect);
            const isCorrect = userAnswer?.isCorrect || false;

            return (
              <View key={index} style={styles.questionReview}>
                <Text variant="titleMedium" style={styles.questionText}>
                  Q{index + 1}: {question.question}
                </Text>
                
                <View style={[styles.answerBlock, isCorrect ? styles.correctBlock : styles.incorrectBlock]}>
                  <Text variant="bodyMedium" style={styles.answerLabel}>
                    Your answer:
                  </Text>
                  <Text variant="bodyMedium" style={styles.answerText}>
                    {userAnswer?.text || 'No answer selected'}
                  </Text>
                  {userAnswer && (
                    <Text variant="bodySmall" style={styles.rationale}>
                      {userAnswer.rationale}
                    </Text>
                  )}
                </View>

                {!isCorrect && (
                  <View style={[styles.answerBlock, styles.correctBlock]}>
                    <Text variant="bodyMedium" style={styles.answerLabel}>
                      Correct answer:
                    </Text>
                    <Text variant="bodyMedium" style={styles.answerText}>
                      {correctAnswer?.text}
                    </Text>
                    <Text variant="bodySmall" style={styles.rationale}>
                      {correctAnswer?.rationale}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
        >
          Back to Home
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          Retake Quiz
        </Button>
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
  scoreCard: {
    marginBottom: 20,
    backgroundColor: '#16213e',
    borderWidth: 2,
    borderRadius: 12,
  },
  scoreContent: {
    alignItems: 'center',
    padding: 20,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scoreSubtext: {
    color: '#cccccc',
    marginBottom: 16,
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  message: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  passedText: {
    color: '#4caf50',
    textAlign: 'center',
    fontSize: 16,
  },
  reviewCard: {
    marginBottom: 20,
    backgroundColor: '#16213e',
  },
  reviewTitle: {
    color: '#ffffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  questionReview: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  questionText: {
    color: '#ffffff',
    marginBottom: 12,
  },
  answerBlock: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  correctBlock: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderColor: '#4caf50',
    borderWidth: 1,
  },
  incorrectBlock: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderColor: '#f44336',
    borderWidth: 1,
  },
  answerLabel: {
    color: '#cccccc',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  answerText: {
    color: '#ffffff',
    marginBottom: 4,
  },
  rationale: {
    color: '#aaaaaa',
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 12,
  },
  button: {
    marginVertical: 4,
  },
});