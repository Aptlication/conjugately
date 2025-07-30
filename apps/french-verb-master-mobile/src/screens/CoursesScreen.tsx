import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../App';

type CoursesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Courses'>;
type CoursesScreenRouteProp = RouteProp<RootStackParamList, 'Courses'>;

const COURSE_STRUCTURES = {
  Beginner: {
    verbs: ['être', 'avoir', 'faire', 'aller'],
    tenses: ['Present'],
    description: '4 units + final exam (90% to pass)',
  },
  Easy: {
    verbs: ['être', 'avoir', 'faire', 'dire', 'aller', 'voir'],
    tenses: ['Present', 'Past', 'Future'],
    description: '6 units + final exam (90% to pass)',
  },
  Moderate: {
    verbs: ['être', 'avoir', 'faire', 'dire', 'aller', 'se lever', 's\'appeler', 'se sentir'],
    tenses: ['Present', 'Past', 'Future', 'Conditional'],
    description: '8 units + final exam (90% to pass)',
  },
  Difficult: {
    verbs: ['être', 'avoir', 'faire', 'dire', 'aller', 'voir', 'savoir', 'pouvoir', 'vouloir', 'venir', 'se laver', 'se réveiller', 's\'habiller'],
    tenses: ['Present', 'Past', 'Future', 'Conditional', 'Subjunctive'],
    description: '13 units + final exam (90% to pass)',
  },
};

export default function CoursesScreen() {
  const navigation = useNavigation<CoursesScreenNavigationProp>();
  const route = useRoute<CoursesScreenRouteProp>();
  const { difficulty } = route.params;

  const courseStructure = COURSE_STRUCTURES[difficulty as keyof typeof COURSE_STRUCTURES];

  const handleStartUnit = (verb: string, tense: string) => {
    navigation.navigate('Quiz', {
      verb,
      timeFrame: tense.toLowerCase(),
      tenseType: 'Présent', // Default
      difficulty,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          {difficulty} Course
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          {courseStructure.description}
        </Text>
      </View>

      <Card style={styles.overviewCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Course Overview
          </Text>
          <Text variant="bodyMedium" style={styles.overviewText}>
            Complete each unit with 20 questions per verb, then pass the final exam with 90% to complete the course.
          </Text>
        </Card.Content>
      </Card>

      {courseStructure.verbs.map((verb, index) => (
        <Card key={verb} style={styles.unitCard}>
          <Card.Content>
            <Text variant="titleMedium" style={styles.unitTitle}>
              Unit {index + 1}: '{verb}'
            </Text>
            <Text variant="bodyMedium" style={styles.unitDescription}>
              Master the conjugations of {verb} across different tenses
            </Text>
            <View style={styles.buttonRow}>
              {courseStructure.tenses.map((tense) => (
                <Button
                  key={tense}
                  mode="outlined"
                  onPress={() => handleStartUnit(verb, tense)}
                  style={styles.tenseButton}
                  compact
                >
                  {tense}
                </Button>
              ))}
            </View>
          </Card.Content>
        </Card>
      ))}

      <Card style={styles.examCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.examTitle}>
            Final Exam
          </Text>
          <Text variant="bodyMedium" style={styles.examDescription}>
            Mixed questions from all verbs - 90% required to pass
          </Text>
          <Button
            mode="contained"
            style={styles.examButton}
            onPress={() => handleStartUnit('mixed', 'exam')}
          >
            Take Final Exam
          </Button>
        </Card.Content>
      </Card>
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
    marginBottom: 20,
  },
  title: {
    color: '#ffffff',
    marginBottom: 8,
  },
  description: {
    color: '#cccccc',
    textAlign: 'center',
  },
  overviewCard: {
    marginBottom: 20,
    backgroundColor: '#16213e',
  },
  sectionTitle: {
    color: '#8b5cf6',
    marginBottom: 8,
  },
  overviewText: {
    color: '#cccccc',
  },
  unitCard: {
    marginBottom: 12,
    backgroundColor: '#16213e',
  },
  unitTitle: {
    color: '#ffffff',
    marginBottom: 4,
  },
  unitDescription: {
    color: '#cccccc',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tenseButton: {
    marginRight: 8,
    marginBottom: 4,
  },
  examCard: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#2d1b69',
  },
  examTitle: {
    color: '#ffffff',
    marginBottom: 8,
  },
  examDescription: {
    color: '#cccccc',
    marginBottom: 16,
  },
  examButton: {
    backgroundColor: '#8b5cf6',
  },
});