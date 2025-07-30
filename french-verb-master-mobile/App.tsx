import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider, MD3DarkTheme } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import CoursesScreen from './src/screens/CoursesScreen';
import ResultsScreen from './src/screens/ResultsScreen';

// Types
export type RootStackParamList = {
  Home: undefined;
  Quiz: {
    verb: string;
    timeFrame: string;
    tenseType: string;
    difficulty: string;
  };
  Courses: {
    difficulty: string;
  };
  Results: {
    score: number;
    totalQuestions: number;
    questions: any[];
  };
};

const Stack = createStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

// Custom dark theme
const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#8b5cf6',
    background: '#1a1a2e',
    surface: '#16213e',
    onSurface: '#ffffff',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerStyle: { backgroundColor: '#1a1a2e' },
                headerTintColor: '#ffffff',
                headerTitleStyle: { fontWeight: 'bold' },
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
          <StatusBar style="light" />
        </PaperProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}