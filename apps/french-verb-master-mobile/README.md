# French Verb Master - Mobile App

A React Native mobile version of the French Verb Master application, built with the official Expo template and featuring AI-powered French verb conjugation quizzes and structured mini-courses.

## 🚀 Features

- **4-Tier Difficulty System**: Beginner, Easy, Moderate, and Difficult levels
- **Interactive Quizzes**: 20-question quizzes with multiple choice answers
- **Mini-Courses**: Structured learning paths with unit-based progression
- **Dark Theme**: Elegant dark UI optimized for mobile devices
- **Real-time Progress**: Visual progress tracking and detailed results
- **Cross-Platform**: Works on iOS, Android, and web platforms

## 🛠️ Technology Stack

- **React Native**: Cross-platform mobile development
- **Expo SDK 53**: Latest Expo framework with managed workflow
- **React Navigation 6**: Stack navigator for mobile screens
- **React Native Paper**: Material Design 3 components
- **TanStack Query**: Data fetching and caching
- **TypeScript**: Type safety and better developer experience
- **Axios**: HTTP client for API integration

## 📱 Getting Started

### Prerequisites

- Node.js (v18 or later)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development) or Android Studio (for Android development)

### Installation & Setup

1. Navigate to the mobile app directory:
   ```bash
   cd french-verb-master-mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update API endpoint in `src/services/quizService.ts`:
   ```typescript
   const API_BASE_URL = 'http://localhost:5000'; // Change to your backend URL
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Run on your desired platform:
   ```bash
   npm run ios     # iOS simulator
   npm run android # Android emulator  
   npm run web     # Web browser
   ```

## 📂 Project Structure

```
french-verb-master-mobile/
├── App.tsx                 # Main app with navigation setup
├── src/
│   ├── screens/           # Screen components
│   │   ├── HomeScreen.tsx    # Main selection interface
│   │   ├── QuizScreen.tsx    # Interactive quiz interface
│   │   ├── CoursesScreen.tsx # Course selection and overview
│   │   └── ResultsScreen.tsx # Quiz results and review
│   └── services/          # API integration
│       └── quizService.ts    # Backend API calls
├── assets/                # Static assets (icons, images)
├── app.json              # Expo configuration
├── babel.config.js       # Babel configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## 🎯 Key Differences from Web Version

| Feature | Web Version | Mobile Version |
|---------|-------------|----------------|
| **Navigation** | Wouter routing | React Navigation Stack |
| **UI Components** | shadcn/ui | React Native Paper |
| **Styling** | Tailwind CSS | React Native StyleSheet |
| **Platform** | Browser-only | iOS, Android, Web |
| **Interactions** | Mouse/keyboard | Touch-optimized |

## 🔌 API Integration

The mobile app connects to the same backend as the web version:

```typescript
// Quiz generation
POST /api/get-quiz
{
  verb: string,
  timeFrame: string, 
  tenseType: string,
  difficulty: string
}
```

## 🏗️ Building for Production

### Development Build
```bash
npm start
```

### Production Builds
```bash
# Android APK
npx expo build:android

# iOS IPA (requires macOS)
npx expo build:ios

# Web deployment
npx expo export:web
```

## 📋 Course Structure

- **Beginner**: 4 verbs (être, avoir, faire, aller) - Present tense only
- **Easy**: 6 verbs - Present, Past, Future tenses
- **Moderate**: 8 verbs including reflexive verbs - Multiple tenses
- **Difficult**: 13 verbs including 6 reflexive verbs - All tenses

## 🎨 UI/UX Features

- **Dark Theme**: Consistent with brand colors (#1a1a2e, #8b5cf6)
- **Touch-Friendly**: Large buttons and touch targets
- **Progress Indicators**: Visual feedback for quiz progression
- **Modal Selections**: Native picker interfaces for selections
- **Responsive**: Adapts to different screen sizes
- **Accessibility**: Compatible with screen readers

## 🚀 Deployment Options

1. **Expo Application Services (EAS)**:
   ```bash
   npx expo install @expo/cli
   npx eas build --platform all
   ```

2. **App Store Distribution**: Submit to Apple App Store and Google Play Store

3. **Web Hosting**: Deploy web version to any static hosting service

## 📖 Development Notes

- Uses React 19 and latest React Native 0.79.5
- TypeScript strict mode enabled for type safety
- Material Design 3 theming with custom colors
- Optimized for both development and production environments
- Hot reloading enabled for fast development iteration

## 🔧 Configuration

The app is configured with:
- Dark theme as default (`userInterfaceStyle: "dark"`)
- Portrait orientation for optimal mobile experience
- Custom splash screen with brand colors
- Platform-specific configurations for iOS and Android

This mobile app provides the complete French Verb Master experience optimized for touch devices while maintaining feature parity with the web version.