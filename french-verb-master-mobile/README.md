# French Verb Master - Mobile App

A React Native mobile version of the French Verb Master application, featuring AI-powered French verb conjugation quizzes and structured mini-courses.

## Features

- **4-Tier Difficulty System**: Beginner, Easy, Moderate, and Difficult levels
- **Interactive Quizzes**: 20-question quizzes with multiple choice answers
- **Mini-Courses**: Structured learning paths with unit-based progression
- **Dark Theme**: Elegant dark UI optimized for mobile devices
- **Real-time Progress**: Visual progress tracking and detailed results
- **Cross-Platform**: Works on both iOS and Android devices

## Technology Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and build tools
- **React Navigation**: Navigation library for mobile screens
- **React Native Paper**: Material Design components for React Native
- **TanStack Query**: Data fetching and caching
- **TypeScript**: Type safety and better developer experience

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation

1. Navigate to the mobile app directory:
   ```bash
   cd french-verb-master-mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on your desired platform:
   ```bash
   npm run ios     # Run on iOS simulator
   npm run android # Run on Android emulator
   npm run web     # Run in web browser
   ```

### Configuration

Before running the app, make sure to:

1. Update the API base URL in `src/services/quizService.ts` to point to your backend server
2. Ensure the original web app's backend is running on the specified port
3. For production builds, configure the appropriate API endpoints

## Project Structure

```
french-verb-master-mobile/
├── App.tsx                 # Main app component with navigation
├── src/
│   ├── screens/           # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   ├── CoursesScreen.tsx
│   │   └── ResultsScreen.tsx
│   ├── services/          # API services
│   │   └── quizService.ts
│   └── types/             # TypeScript type definitions
├── assets/                # Static assets (icons, images)
├── app.json              # Expo configuration
└── package.json          # Dependencies and scripts
```

## Key Differences from Web Version

- **Navigation**: Uses React Navigation stack navigator instead of wouter
- **UI Components**: React Native Paper instead of shadcn/ui components
- **Styling**: React Native StyleSheet instead of Tailwind CSS
- **Platform-Specific**: Optimized for mobile touch interactions
- **Performance**: Lazy loading and optimized for mobile devices

## API Integration

The mobile app connects to the same backend API as the web version:

- Quiz generation endpoint: `POST /api/get-quiz`
- Course progress tracking: `GET /api/course-progress/:userId`
- User management: Standard authentication endpoints

## Building for Production

### Android

```bash
npm run build:android
```

### iOS

```bash
npm run build:ios
```

### Web (Progressive Web App)

```bash
npm run web
```

## Contributing

This mobile app shares the same core functionality as the web version. When contributing:

1. Maintain feature parity with the web application
2. Follow React Native best practices
3. Ensure cross-platform compatibility
4. Test on both iOS and Android platforms

## License

MIT License - same as the original web application.