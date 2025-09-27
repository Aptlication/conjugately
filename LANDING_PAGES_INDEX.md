# French Verb Master - Landing Pages Index

This document provides a comprehensive index of all landing pages, routes, and entry points in the French Verb Master application.

## 🌐 Web Application Routes

### Primary Entry Points
- **`/`** - Main Application Landing Page
  - File: `client/src/App.tsx`
  - Description: Main application wrapper with authentication and quiz interface
  - Features: Quiz configuration, verb selection, difficulty levels, mini-courses

- **`/privacy`** - Privacy Policy Page  
  - File: `client/src/pages/PrivacyPolicy.tsx`
  - Description: Application privacy policy and terms

- **`/frenchverb`** - Quiz Application Entry
  - Route Handler: `server/routes.ts` (line 36)
  - Description: Dedicated route for the French verb quiz interface
  - Features: Direct access to quiz functionality with cache-busting

- **`/verbmaster`** - Alternative Quiz Entry
  - Route Handler: `server/routes.ts` (line 31)
  - Description: Serves `french-master.html` static file
  - Features: Alternative entry point for quiz application

## 📱 Mobile Application

### Mobile Web App
- **Landing Page**: `apps/french-verb-master-mobile/index.html`
- **Server**: `apps/french-verb-master-mobile/main.py` (Port 80)
- **Description**: Mobile-optimized PWA with offline capabilities
- **Features**: Touch-friendly interface, service worker, mobile-specific styling

## 🎯 Core Application Components

### Authentication & Routing
- **`client/src/main.tsx`** - Application root with routing setup
- **`client/src/fresh-app.tsx`** - Authentication wrapper and core app logic
- **`client/src/App.tsx`** - Main application container

### Page Components
- **`client/src/pages/FrenchQuiz.tsx`** - Main quiz interface
- **`client/src/pages/SimpleQuiz.tsx`** - Simple quiz testing component
- **`client/src/pages/PrivacyPolicy.tsx`** - Privacy policy content

## 🔌 API Endpoints

### Quiz & Learning
- **`/api/get-quiz`** (POST) - Quiz generation endpoint
- **`/api/course-progress/:userId`** (GET) - Course progress tracking
- **`/api/completed-courses/:userId`** (GET) - Completed courses data

### Authentication & System
- **`/api/login`** - User authentication
- **`/api/auth/user`** - User session verification  
- **`/api/health`** - System health check

## 📲 React Native Templates (Reference)

### Quiz Components
- **`ReactNative_COPY_PASTE_READY.tsx`** - Complete quiz selection screen
- **`ReactNative_QuizSelectionScreen.tsx`** - Quiz selection interface
- **`ReactNative_ImprovedQuizScreen.tsx`** - Enhanced quiz screen
- **`ReactNative_QuizScreen_READY.tsx`** - Production-ready quiz screen

### Course Components  
- **`ReactNative_MiniCourses_COPY_PASTE_READY.tsx`** - Mini-courses interface
- **`ReactNative_CustomDropdown.tsx`** - Custom dropdown component

### Implementation Guides
- **`ReactNative_QuizFlow_Implementation_Guide.md`** - Quiz flow setup guide
- **`ReactNative_Dependencies.md`** - Required dependencies

## 🛠 Development Files

### Configuration & Setup
- **`components.json`** - shadcn/ui components configuration
- **`drizzle.config.ts`** - Database configuration
- **`package-lock.json`** - Package dependencies lock

### Data & Content
- **`V3_frenchVerbData.js`** - Complete French verb database
- **`french-mini-courses-mobile.js`** - Mobile course data
- **Various `.txt` and `.md` files** - Content validation and analysis

## 🎨 Assets & Graphics
- **`french-verb-master-feature-graphic-hd.png/svg`** - High-definition app graphics
- **`French_Verb_Master_App_Icon_Description.txt`** - App icon specifications

## 📊 Usage Patterns

### Primary User Flow
1. **Entry**: User visits `/` (main route)
2. **Authentication**: System checks login status via `/api/auth/user`
3. **Main Interface**: `App.tsx` → `fresh-app.tsx` → `FrenchQuiz.tsx`
4. **Quiz Generation**: `/api/get-quiz` endpoint called with parameters
5. **Progress Tracking**: `/api/course-progress` for learning analytics

### Mobile User Flow
1. **Entry**: User visits mobile PWA landing page
2. **Interface**: Mobile-optimized components render
3. **Offline Support**: Service worker enables offline functionality

---

**Last Updated**: January 2025  
**Total Landing Pages**: 4 main web routes + 1 mobile entry + 8+ API endpoints  
**Architecture**: React SPA with Express backend, mobile PWA, React Native templates