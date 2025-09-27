# French Verb Master - Landing Pages Index

This document provides a comprehensive index of all landing pages, routes, and entry points in the French Verb Master application.

## AA. 🌐 Web Application Routes

### A. Primary Entry Points
1. **`/`** - Main Application Landing Page
   (a) File: `client/src/App.tsx`
   (b) Description: Main application wrapper with authentication and quiz interface
   (c) Features: Quiz configuration, verb selection, difficulty levels, mini-courses

2. **`/privacy`** - Privacy Policy Page  
   (a) File: `client/src/pages/PrivacyPolicy.tsx`
   (b) Description: Application privacy policy and terms

3. **`/frenchverb`** - Quiz Application Entry
   (a) Route Handler: `server/routes.ts` (line 36)
   (b) Description: Dedicated route for the French verb quiz interface
   (c) Features: Direct access to quiz functionality with cache-busting

4. **`/verbmaster`** - Alternative Quiz Entry
   (a) Route Handler: `server/routes.ts` (line 31)
   (b) Description: Serves `french-master.html` static file
   (c) Features: Alternative entry point for quiz application

## BB. 📱 Mobile Application

### A. Mobile Web App
1. **Landing Page**: `apps/french-verb-master-mobile/index.html`
2. **Server**: `apps/french-verb-master-mobile/main.py` (Port 80)
3. **Description**: Mobile-optimized PWA with offline capabilities
4. **Features**: Touch-friendly interface, service worker, mobile-specific styling

## CC. 🎯 Core Application Components

### A. Authentication & Routing
1. **`client/src/main.tsx`** - Application root with routing setup
2. **`client/src/fresh-app.tsx`** - Authentication wrapper and core app logic
3. **`client/src/App.tsx`** - Main application container

### B. Page Components
1. **`client/src/pages/FrenchQuiz.tsx`** - Main quiz interface
2. **`client/src/pages/SimpleQuiz.tsx`** - Simple quiz testing component
3. **`client/src/pages/PrivacyPolicy.tsx`** - Privacy policy content

## DD. 🔌 API Endpoints

### A. Quiz & Learning
1. **`/api/get-quiz`** (POST) - Quiz generation endpoint
2. **`/api/course-progress/:userId`** (GET) - Course progress tracking
3. **`/api/completed-courses/:userId`** (GET) - Completed courses data

### B. Authentication & System
1. **`/api/login`** - User authentication
2. **`/api/auth/user`** - User session verification  
3. **`/api/health`** - System health check

## EE. 📲 React Native Templates (Reference)

### A. Quiz Components
1. **`ReactNative_COPY_PASTE_READY.tsx`** - Complete quiz selection screen
2. **`ReactNative_QuizSelectionScreen.tsx`** - Quiz selection interface
3. **`ReactNative_ImprovedQuizScreen.tsx`** - Enhanced quiz screen
4. **`ReactNative_QuizScreen_READY.tsx`** - Production-ready quiz screen

### B. Course Components  
1. **`ReactNative_MiniCourses_COPY_PASTE_READY.tsx`** - Mini-courses interface
2. **`ReactNative_CustomDropdown.tsx`** - Custom dropdown component

### C. Implementation Guides
1. **`ReactNative_QuizFlow_Implementation_Guide.md`** - Quiz flow setup guide
2. **`ReactNative_Dependencies.md`** - Required dependencies

## FF. 🛠 Development Files

### A. Configuration & Setup
1. **`components.json`** - shadcn/ui components configuration
2. **`drizzle.config.ts`** - Database configuration
3. **`package-lock.json`** - Package dependencies lock

### B. Data & Content
1. **`V3_frenchVerbData.js`** - Complete French verb database
2. **`french-mini-courses-mobile.js`** - Mobile course data
3. **Various `.txt` and `.md` files** - Content validation and analysis

## GG. 🎨 Assets & Graphics
1. **`french-verb-master-feature-graphic-hd.png/svg`** - High-definition app graphics
2. **`French_Verb_Master_App_Icon_Description.txt`** - App icon specifications

## HH. 📊 Usage Patterns

### A. Primary User Flow
1. **Entry**: User visits `/` (main route)
   (a) Authentication: System checks login status via `/api/auth/user`
       (i) Success: Proceed to main interface
       (ii) Failure: Show login prompt
   (b) Main Interface: `App.tsx` → `fresh-app.tsx` → `FrenchQuiz.tsx`
       (i) Quiz configuration selection
       (ii) Verb and tense selection
       (iii) Difficulty level choice
   (c) Quiz Generation: `/api/get-quiz` endpoint called with parameters
       (i) AI-powered question generation
       (ii) Fallback to static question database
   (d) Progress Tracking: `/api/course-progress` for learning analytics
       (i) Course completion tracking
       (ii) Performance metrics storage

### B. Mobile User Flow
1. **Entry**: User visits mobile PWA landing page
   (a) Progressive web app initialization
       (i) Service worker registration
       (ii) Cache strategy implementation
2. **Interface**: Mobile-optimized components render
   (a) Touch-friendly controls
       (i) Gesture-based navigation
       (ii) Responsive design elements
3. **Offline Support**: Service worker enables offline functionality
   (a) Cached quiz data access
       (i) Previously downloaded questions
       (ii) Basic functionality without network

---

**Last Updated**: January 2025  
**Total Landing Pages**: 4 main web routes + 1 mobile entry + 8+ API endpoints  
**Architecture**: React SPA with Express backend, mobile PWA, React Native templates