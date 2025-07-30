import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Surface } from 'react-native-paper';

export default function CoursesScreen() {
  return (
    <View style={styles.container}>
      <Surface style={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>
          Mini-Courses
        </Text>
        <Text style={styles.description}>
          Structured learning paths for progressive French verb mastery
        </Text>
        <Text style={styles.coming}>Course implementation coming soon!</Text>
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
  description: {
    color: '#a1a1aa',
    lineHeight: 20,
  },
  coming: {
    color: '#a855f7',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});