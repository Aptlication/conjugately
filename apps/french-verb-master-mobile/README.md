# French Verb Master Mobile

*For serious students.*

A React Native mobile app for mastering French verb conjugations with AI-powered quizzes and structured mini-courses.

## Features

- 4-tier difficulty system (Beginner, Easy, Moderate, Difficult)
- AI-generated quizzes with Google Gemini
- Sequential course progression
- Dark theme with purple accents
- Cross-platform (iOS, Android, Web)

## Tech Stack

- React Native 0.79.5
- Expo SDK 53
- React 19
- TypeScript 5.8
- React Navigation 6
- React Native Paper (Material Design 3)
- TanStack Query
- React Hook Form + Zod

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Choose your platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator  
   - Press `w` for web browser
   - Scan QR code with Expo Go app

## API Integration

The app connects to the same backend API as the web version:
- Quiz generation
- Course progress tracking
- User management

Make sure the backend server is running on the expected URL.

## Project Structure

```
src/
├── screens/          # Main app screens
├── services/         # API calls and utilities
└── types/           # TypeScript definitions
```

## Deployment

Use Expo's build services to create production builds:

```bash
# iOS
expo build:ios

# Android
expo build:android
```