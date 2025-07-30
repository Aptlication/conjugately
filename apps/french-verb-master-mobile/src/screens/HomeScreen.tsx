import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button, Portal, Modal, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const DIFFICULTIES = [
  { key: 'Beginner', label: 'Beginner', description: '4 most used verbs, simple conjugations' },
  { key: 'Easy', label: 'Easy', description: '6 verbs with present tense focus' },
  { key: 'Moderate', label: 'Moderate', description: '8 verbs including 3 reflexive verbs' },
  { key: 'Difficult', label: 'Difficult', description: '13 verbs including 6 reflexive verbs' },
];

const VERBS = [
  { key: 'être', label: 'être (to be)' },
  { key: 'avoir', label: 'avoir (to have)' },
  { key: 'faire', label: 'faire (to do/make)' },
  { key: 'dire', label: 'dire (to say)' },
  { key: 'aller', label: 'aller (to go)' },
  { key: 'voir', label: 'voir (to see)' },
];

const TIME_FRAMES = [
  { key: 'present', label: 'Present' },
  { key: 'past', label: 'Past' },
  { key: 'future', label: 'Future' },
];

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedVerb, setSelectedVerb] = useState('');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('');
  const [modalVisible, setModalVisible] = useState('');

  const handleStartQuiz = () => {
    if (selectedDifficulty && selectedVerb && selectedTimeFrame) {
      navigation.navigate('Quiz', {
        verb: selectedVerb,
        timeFrame: selectedTimeFrame,
        tenseType: 'Présent', // Default tense
        difficulty: selectedDifficulty,
      });
    }
  };

  const handleMiniCourses = () => {
    if (selectedDifficulty) {
      navigation.navigate('Courses', {
        difficulty: selectedDifficulty,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.title}>
          French Verb Master
        </Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          For serious students
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          Master French verb conjugations, the key to fluency, with personalized quizzes and mini-courses.
        </Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.stepTitle}>
            Step 1: Choose Difficulty
          </Text>
          <Button
            mode="outlined"
            onPress={() => setModalVisible('difficulty')}
            style={styles.button}
          >
            {selectedDifficulty || 'Select Difficulty'}
          </Button>
        </Card.Content>
      </Card>

      {selectedDifficulty && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.stepTitle}>
              Step 2: Choose Verb
            </Text>
            <Button
              mode="outlined"
              onPress={() => setModalVisible('verb')}
              style={styles.button}
            >
              {selectedVerb ? VERBS.find(v => v.key === selectedVerb)?.label : 'Select Verb'}
            </Button>
          </Card.Content>
        </Card>
      )}

      {selectedVerb && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.stepTitle}>
              Step 3: Choose Time Frame
            </Text>
            <Button
              mode="outlined"
              onPress={() => setModalVisible('timeFrame')}
              style={styles.button}
            >
              {selectedTimeFrame ? TIME_FRAMES.find(t => t.key === selectedTimeFrame)?.label : 'Select Time Frame'}
            </Button>
          </Card.Content>
        </Card>
      )}

      {selectedDifficulty && selectedVerb && selectedTimeFrame && (
        <View style={styles.actionButtons}>
          <Button
            mode="contained"
            onPress={handleStartQuiz}
            style={[styles.button, styles.primaryButton]}
          >
            Start Quiz
          </Button>
          <Button
            mode="outlined"
            onPress={handleMiniCourses}
            style={styles.button}
          >
            Mini-Courses
          </Button>
        </View>
      )}

      {/* Modals */}
      <Portal>
        <Modal visible={modalVisible === 'difficulty'} onDismiss={() => setModalVisible('')}>
          <Card style={styles.modal}>
            <Card.Content>
              <Text variant="titleLarge">Select Difficulty</Text>
              {DIFFICULTIES.map((difficulty) => (
                <List.Item
                  key={difficulty.key}
                  title={difficulty.label}
                  description={difficulty.description}
                  onPress={() => {
                    setSelectedDifficulty(difficulty.key);
                    setModalVisible('');
                  }}
                />
              ))}
            </Card.Content>
          </Card>
        </Modal>

        <Modal visible={modalVisible === 'verb'} onDismiss={() => setModalVisible('')}>
          <Card style={styles.modal}>
            <Card.Content>
              <Text variant="titleLarge">Select Verb</Text>
              {VERBS.map((verb) => (
                <List.Item
                  key={verb.key}
                  title={verb.label}
                  onPress={() => {
                    setSelectedVerb(verb.key);
                    setModalVisible('');
                  }}
                />
              ))}
            </Card.Content>
          </Card>
        </Modal>

        <Modal visible={modalVisible === 'timeFrame'} onDismiss={() => setModalVisible('')}>
          <Card style={styles.modal}>
            <Card.Content>
              <Text variant="titleLarge">Select Time Frame</Text>
              {TIME_FRAMES.map((timeFrame) => (
                <List.Item
                  key={timeFrame.key}
                  title={timeFrame.label}
                  onPress={() => {
                    setSelectedTimeFrame(timeFrame.key);
                    setModalVisible('');
                  }}
                />
              ))}
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#8b5cf6',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  description: {
    color: '#cccccc',
    textAlign: 'center',
    lineHeight: 20,
  },
  card: {
    marginBottom: 16,
    backgroundColor: '#16213e',
  },
  stepTitle: {
    color: '#ffffff',
    marginBottom: 12,
  },
  button: {
    marginVertical: 4,
  },
  primaryButton: {
    backgroundColor: '#8b5cf6',
  },
  actionButtons: {
    marginTop: 24,
  },
  modal: {
    margin: 20,
    backgroundColor: '#16213e',
    maxHeight: 400,
  },
});