import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';

export default function App() {
  const [difficulty, setDifficulty] = useState('');
  const [verb, setVerb] = useState('');
  const [timeFrame, setTimeFrame] = useState('');

  const difficulties = ['Beginner', 'Easy', 'Moderate', 'Difficult'];
  const verbs = ['être', 'avoir', 'faire', 'dire', 'aller', 'voir'];
  const timeFrames = ['Present', 'Past', 'Future'];

  const startQuiz = () => {
    if (difficulty && verb && timeFrame) {
      alert(`Starting quiz: ${difficulty} - ${verb} - ${timeFrame}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>French Verb Master</Text>
          <Text style={styles.subtitle}>For serious students</Text>
          <Text style={styles.description}>
            Master French verb conjugations, the key to fluency, with personalized quizzes and mini-courses.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Quick Quiz</Text>
          
          <Text style={styles.label}>1. Choose Difficulty</Text>
          <View style={styles.buttonGroup}>
            {difficulties.map((diff) => (
              <TouchableOpacity
                key={diff}
                style={[
                  styles.button,
                  difficulty === diff && styles.buttonSelected
                ]}
                onPress={() => setDifficulty(diff)}
              >
                <Text style={[
                  styles.buttonText,
                  difficulty === diff && styles.buttonTextSelected
                ]}>
                  {diff}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {difficulty && (
            <>
              <Text style={styles.label}>2. Choose Verb</Text>
              <View style={styles.buttonGroup}>
                {verbs.map((v) => (
                  <TouchableOpacity
                    key={v}
                    style={[
                      styles.button,
                      verb === v && styles.buttonSelected
                    ]}
                    onPress={() => setVerb(v)}
                  >
                    <Text style={[
                      styles.buttonText,
                      verb === v && styles.buttonTextSelected
                    ]}>
                      {v}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {verb && (
            <>
              <Text style={styles.label}>3. Choose Time Frame</Text>
              <View style={styles.buttonGroup}>
                {timeFrames.map((time) => (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.button,
                      timeFrame === time && styles.buttonSelected
                    ]}
                    onPress={() => setTimeFrame(time)}
                  >
                    <Text style={[
                      styles.buttonText,
                      timeFrame === time && styles.buttonTextSelected
                    ]}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {difficulty && verb && timeFrame && (
            <TouchableOpacity
              style={styles.startButton}
              onPress={startQuiz}
            >
              <Text style={styles.startButtonText}>Start Quiz</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Mini-Courses</Text>
          <Text style={styles.courseDescription}>
            Structured learning paths with sequential progression
          </Text>
          <TouchableOpacity style={styles.courseButton}>
            <Text style={styles.courseButtonText}>View Courses</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    margin: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#a855f7',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#a1a1aa',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 20,
  },
  card: {
    margin: 16,
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#374151',
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  buttonSelected: {
    backgroundColor: '#a855f7',
  },
  buttonText: {
    color: '#d1d5db',
    fontSize: 14,
  },
  buttonTextSelected: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#a855f7',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  courseDescription: {
    color: '#a1a1aa',
    marginBottom: 16,
    lineHeight: 20,
  },
  courseButton: {
    backgroundColor: '#7c3aed',
    paddingVertical: 12,
    borderRadius: 8,
  },
  courseButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});