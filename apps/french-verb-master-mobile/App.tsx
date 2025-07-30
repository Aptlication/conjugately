import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';

import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import CoursesScreen from './src/screens/CoursesScreen';
import ResultsScreen from './src/screens/ResultsScreen';

const Stack = createStackNavigator();
const queryClient = new QueryClient();

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#a855f7',
    primaryContainer: '#7c3aed',
    surface: '#1a1a1a',
    background: '#0f0f0f',
  },
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <StatusBar style="light" />
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {
                backgroundColor: theme.colors.surface,
              },
              headerTintColor: theme.colors.onSurface,
              cardStyle: { backgroundColor: theme.colors.background },
            }}
          >
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ title: 'French Verb Master' }}
            />
            <Stack.Screen 
              name="Quiz" 
              component={QuizScreen} 
              options={{ title: 'Quiz' }}
            />
            <Stack.Screen 
              name="Courses" 
              component={CoursesScreen} 
              options={{ title: 'Mini-Courses' }}
            />
            <Stack.Screen 
              name="Results" 
              component={ResultsScreen} 
              options={{ title: 'Results' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </QueryClientProvider>
  );
}