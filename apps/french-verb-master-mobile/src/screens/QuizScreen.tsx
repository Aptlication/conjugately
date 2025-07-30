import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';

export default function QuizScreen({ route }: any) {
  const { difficulty, verb, timeFrame } = route.params;

  return (
    <View style={styles.container}>
      <Surface style={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>
          Quiz Settings
        </Text>
        <Text style={styles.detail}>Difficulty: {difficulty}</Text>
        <Text style={styles.detail}>Verb: {verb}</Text>
        <Text style={styles.detail}>Time Frame: {timeFrame}</Text>
        <Text style={styles.coming}>Quiz implementation coming soon!</Text>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    padding: 16,
  },
  content: {
    padding: 20,
    borderRadius: 12,
  },
  title: {
    color: '#ffffff',
    marginBottom: 16,
  },
  detail: {
    color: '#a1a1aa',
    marginBottom: 8,
    fontSize: 16,
  },
  coming: {
    color: '#a855f7',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});