import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { 
  Text, 
  Card, 
  Button, 
  Surface,
  Menu,
  Divider 
} from 'react-native-paper';

const DIFFICULTIES = ['Beginner', 'Easy', 'Moderate', 'Difficult'];
const VERBS = ['être', 'avoir', 'faire', 'dire', 'aller', 'voir', 'savoir', 'pouvoir', 'vouloir', 'venir'];
const TIME_FRAMES = ['Present', 'Past', 'Future'];

export default function HomeScreen({ navigation }: any) {
  const [difficulty, setDifficulty] = useState('');
  const [verb, setVerb] = useState('');
  const [timeFrame, setTimeFrame] = useState('');
  const [showDifficultyMenu, setShowDifficultyMenu] = useState(false);
  const [showVerbMenu, setShowVerbMenu] = useState(false);
  const [showTimeMenu, setShowTimeMenu] = useState(false);

  const startQuiz = () => {
    if (difficulty && verb && timeFrame) {
      navigation.navigate('Quiz', { difficulty, verb, timeFrame });
    }
  };

  const openCourses = () => {
    navigation.navigate('Courses');
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.header}>
        <Text variant="headlineLarge" style={styles.title}>
          French Verb Master
        </Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          For serious students
        </Text>
        <Text style={styles.description}>
          Master French verb conjugations, the key to fluency, with personalized quizzes and mini-courses.
        </Text>
      </Surface>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Quick Quiz
          </Text>
          
          <View style={styles.dropdownContainer}>
            <Menu
              visible={showDifficultyMenu}
              onDismiss={() => setShowDifficultyMenu(false)}
              anchor={
                <Button 
                  mode="outlined" 
                  onPress={() => setShowDifficultyMenu(true)}
                  style={styles.dropdown}
                >
                  {difficulty || 'Choose Difficulty'}
                </Button>
              }
            >
              {DIFFICULTIES.map((diff) => (
                <Menu.Item
                  key={diff}
                  onPress={() => {
                    setDifficulty(diff);
                    setShowDifficultyMenu(false);
                  }}
                  title={diff}
                />
              ))}
            </Menu>
          </View>

          {difficulty && (
            <View style={styles.dropdownContainer}>
              <Menu
                visible={showVerbMenu}
                onDismiss={() => setShowVerbMenu(false)}
                anchor={
                  <Button 
                    mode="outlined" 
                    onPress={() => setShowVerbMenu(true)}
                    style={styles.dropdown}
                  >
                    {verb || 'Choose Verb'}
                  </Button>
                }
              >
                {VERBS.map((v) => (
                  <Menu.Item
                    key={v}
                    onPress={() => {
                      setVerb(v);
                      setShowVerbMenu(false);
                    }}
                    title={v}
                  />
                ))}
              </Menu>
            </View>
          )}

          {verb && (
            <View style={styles.dropdownContainer}>
              <Menu
                visible={showTimeMenu}
                onDismiss={() => setShowTimeMenu(false)}
                anchor={
                  <Button 
                    mode="outlined" 
                    onPress={() => setShowTimeMenu(true)}
                    style={styles.dropdown}
                  >
                    {timeFrame || 'Choose Time Frame'}
                  </Button>
                }
              >
                {TIME_FRAMES.map((time) => (
                  <Menu.Item
                    key={time}
                    onPress={() => {
                      setTimeFrame(time);
                      setShowTimeMenu(false);
                    }}
                    title={time}
                  />
                ))}
              </Menu>
            </View>
          )}

          {difficulty && verb && timeFrame && (
            <Button 
              mode="contained" 
              onPress={startQuiz}
              style={styles.startButton}
            >
              Start Quiz
            </Button>
          )}
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Mini-Courses
          </Text>
          <Text style={styles.courseDescription}>
            Structured learning paths with sequential progression
          </Text>
          <Button 
            mode="contained" 
            onPress={openCourses}
            style={styles.courseButton}
          >
            View Courses
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    padding: 20,
    margin: 16,
    borderRadius: 12,
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#a855f7',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 4,
  },
  description: {
    color: '#a1a1aa',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
  },
  card: {
    margin: 16,
    backgroundColor: '#1a1a1a',
  },
  sectionTitle: {
    color: '#ffffff',
    marginBottom: 16,
  },
  dropdownContainer: {
    marginBottom: 12,
  },
  dropdown: {
    width: '100%',
  },
  startButton: {
    marginTop: 16,
    backgroundColor: '#a855f7',
  },
  courseDescription: {
    color: '#a1a1aa',
    marginBottom: 16,
  },
  courseButton: {
    backgroundColor: '#7c3aed',
  },
});