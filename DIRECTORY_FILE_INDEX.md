# French Verb Master - V2 Directory File Index (DFI)

This document provides a comprehensive index of all directories and files in the French Verb Master application project structure.

## AA. 📁 Root Directory Structure [CLASSIFICATION SYSTEM]

### A. Primary Directories [CATEGORY: APPLICATION_STRUCTURE]
1. **`client/`** - Frontend React application [SUBCATEGORY: FRONTEND]
   (a) Contains all client-side code and components
   (b) Built with Vite and TypeScript
   (c) Uses shadcn/ui component library

2. **`server/`** - Backend Express server [SUBCATEGORY: BACKEND]
   (a) API endpoints and server logic
   (b) Database integration and quiz generation
   (c) Authentication and session management

3. **`apps/`** - Additional applications [SUBCATEGORY: MOBILE_APPS]
   (a) Mobile web application variants
   (b) Progressive Web App (PWA) implementations
   (c) Platform-specific builds

4. **`shared/`** - Shared code between client and server [SUBCATEGORY: SHARED_RESOURCES]
   (a) TypeScript type definitions
   (b) Database schemas
   (c) Common utilities

5. **`scripts/`** - Build and utility scripts [SUBCATEGORY: DEVELOPMENT_TOOLS]
   (a) Development automation tools
   (b) Data processing scripts
   (c) Testing and validation utilities

6. **`attached_assets/`** - User-uploaded and temporary assets [SUBCATEGORY: USER_CONTENT]
   (a) Image files and graphics
   (b) Text files with quiz data
   (c) Screenshot attachments

7. **`canvas/`** - Design and marketing assets [SUBCATEGORY: DESIGN_ASSETS]
   (a) Application screenshots
   (b) Feature graphics and promotional materials
   (c) SVG and PNG formats

### B. Configuration Files [CATEGORY: ESSENTIAL_CONFIG]
1. **Build & Dependencies** [SUBCATEGORY: BUILD_CONFIG]
   (a) `package.json` - Node.js project configuration
   (b) `package-lock.json` - Dependency lock file
   (c) `tsconfig.json` - TypeScript configuration
   (d) `vite.config.ts` - Vite build tool configuration

2. **Styling & UI** [SUBCATEGORY: STYLING_CONFIG]
   (a) `tailwind.config.ts` - Tailwind CSS configuration
   (b) `postcss.config.js` - PostCSS configuration
   (c) `components.json` - shadcn/ui components configuration

3. **Database & Infrastructure** [SUBCATEGORY: INFRASTRUCTURE_CONFIG]
   (a) `drizzle.config.ts` - Database ORM configuration

4. **Project Documentation** [SUBCATEGORY: PROJECT_METADATA]
   (a) `replit.md` - Project documentation and preferences

## BB. 🖥️ Client-Side Structure (`client/`) [CATEGORY: FRONTEND_APPLICATION]

### A. Source Directory (`src/`) [SUBCATEGORY: SOURCE_CODE]
1. **Core Application Files** [CLASSIFICATION: CORE_COMPONENTS]
   (a) `App.tsx` - Main application component [TYPE: REACT_COMPONENT]
       (i) Authentication wrapper
       (ii) Primary state management
       (iii) Route handling
   (b) `fresh-app.tsx` - Fresh application implementation [TYPE: REACT_COMPONENT]
       (i) User interface components
       (ii) Quiz logic integration
       (iii) Modal management
   (c) `main.tsx` - Application entry point [TYPE: ENTRY_POINT]
       (i) React root mounting
       (ii) Router configuration
       (iii) Query client setup
   (d) `main-frenchverb.tsx` - Alternative entry point [TYPE: ENTRY_POINT]
   (e) `index.css` - Global styles and Tailwind imports [TYPE: STYLESHEET]

2. **Pages Directory (`pages/`)** [CLASSIFICATION: PAGE_COMPONENTS]
   (a) `FrenchQuiz.tsx` - Main quiz interface [TYPE: PAGE_COMPONENT]
       (i) Quiz configuration
       (ii) Question display
       (iii) Results processing
   (b) `PrivacyPolicy.tsx` - Privacy policy page [TYPE: PAGE_COMPONENT]
   (c) `SimpleQuiz.tsx` - Testing component [TYPE: TEST_COMPONENT]

3. **Components Directory (`components/`)** [CLASSIFICATION: UI_COMPONENTS]
   (a) `QuizInterface.tsx` - Quiz interaction component [TYPE: FEATURE_COMPONENT]
   (b) **UI Components (`ui/`)** [SUBCATEGORY: UI_PRIMITIVES]
       (i) `button.tsx` - Button component [TYPE: INPUT_COMPONENT]
       (ii) `card.tsx` - Card layout component [TYPE: LAYOUT_COMPONENT]
       (iii) `dialog.tsx` - Modal dialog component [TYPE: OVERLAY_COMPONENT]
       (iv) `form.tsx` - Form handling component [TYPE: INPUT_COMPONENT]
       (v) `input.tsx` - Input field component [TYPE: INPUT_COMPONENT]
       (vi) `select.tsx` - Dropdown selection component [TYPE: INPUT_COMPONENT]
       (vii) `toast.tsx` - Notification component [TYPE: FEEDBACK_COMPONENT]
       (viii) `progress.tsx` - Progress bar component [TYPE: FEEDBACK_COMPONENT]
       (ix) Additional UI primitives (35+ components) [TYPE: UI_LIBRARY]

4. **Hooks Directory (`hooks/`)** [CLASSIFICATION: REACT_HOOKS]
   (a) `useAuth.ts` - Authentication state management [TYPE: STATE_HOOK]
   (b) `use-toast.ts` - Toast notification hook [TYPE: UI_HOOK]
   (c) `use-mobile.tsx` - Mobile device detection [TYPE: UTILITY_HOOK]

5. **Library Directory (`lib/`)** [CLASSIFICATION: UTILITIES]
   (a) `authUtils.ts` - Authentication utilities [TYPE: AUTH_UTILITY]
   (b) `queryClient.ts` - TanStack Query configuration [TYPE: API_UTILITY]
   (c) `utils.ts` - General utility functions [TYPE: GENERAL_UTILITY]

### B. Build Configuration [SUBCATEGORY: BUILD_ASSETS]
1. **`index.html`** - HTML template for Vite build [TYPE: HTML_TEMPLATE]

## CC. 🖧 Server-Side Structure (`server/`)

### A. Core Server Files
1. **`index.ts`** - Server entry point
   (a) Express app initialization
   (b) Middleware configuration
   (c) Database connection

2. **`routes.ts`** - API route definitions
   (a) Quiz generation endpoints
   (b) Authentication routes
   (c) Course progress tracking

3. **`db.ts`** - Database configuration
   (a) Drizzle ORM setup
   (b) Connection management
   (c) Schema definitions

4. **`storage.ts`** - Data storage interface
   (a) CRUD operations
   (b) Quiz data management
   (c) User progress tracking

### B. Quiz System Files
1. **Quiz Data Files**
   (a) `beginner-pronoun-data.ts` - Beginner level pronoun quizzes
   (b) `novice-quiz-data.ts` - Novice level quiz questions
   (c) `novice-quiz-data-old.ts` - Legacy novice quiz data
   (d) `elementary-quiz-data.ts` - Elementary level quizzes
   (e) `intermediate-quiz-data.ts` - Intermediate level quizzes

2. **Quiz Generation**
   (a) `quiz-generator.ts` - Quiz generation logic
   (b) `quiz-templates.ts` - Quiz template definitions
   (c) `gemini-quiz.ts` - AI-powered quiz generation

### C. Services Directory (`services/`)
1. **`gemini.ts`** - Google Gemini AI integration
   (a) API client configuration
   (b) Quiz generation prompts
   (c) Response processing

### D. Authentication & Security
1. **`replitAuth.ts`** - Replit authentication integration
   (a) User session management
   (b) Authentication middleware
   (c) Security utilities

### E. Build Output (`public/`)
1. **Static Assets (`assets/`)**
   (a) `index-B8Wo3CpK.js` - Compiled JavaScript bundle
   (b) `index-CufX3s_H.css` - Compiled CSS styles

2. **`index.html`** - Production HTML file
3. **`french-master.html`** - Alternative entry HTML

### F. Development Tools
1. **`vite.ts`** - Vite development server integration

## DD. 🔗 Shared Resources (`shared/`)

### A. Type Definitions
1. **`schema.ts`** - Shared TypeScript schemas
   (a) Database table definitions
   (b) API request/response types
   (c) Validation schemas with Zod

## EE. 📱 Mobile Applications (`apps/`)

### A. Mobile Web App Directory Structure
1. **French Verb Master Mobile**
   (a) Progressive Web App implementation
   (b) Mobile-optimized interface
   (c) Offline functionality

## FF. 🛠️ Development Scripts (`scripts/`)

### A. Utility Scripts
1. **`audit-english-sentences.js`** - English content validation
   (a) Grammar checking
   (b) Content analysis
   (c) Report generation

2. **`populate-quizzes.ts`** - Database population script
   (a) Quiz data seeding
   (b) Test data generation
   (c) Development setup

## GG. 🎨 Design Assets (`canvas/`)

### A. Screenshots Directory (`screenshots/`)
1. **Application Screenshots**
   (a) `screenshot1-main-menu.png/svg` - Main interface
   (b) `screenshot2-quiz-interface.png/svg` - Quiz screen
   (c) `screenshot3-mini-courses.png/svg` - Course selection
   (d) `screenshot4-quiz-results.png/svg` - Results display
   (e) `screenshot5-progress-dashboard.png/svg` - Progress tracking

### B. Marketing Graphics
1. **Feature Graphics**
   (a) `feature-graphic-main.png/svg` - Primary marketing image
   (b) `french-verb-master-feature-graphic-hd.png` - High definition version

## HH. 📂 User Assets (`attached_assets/`)

### A. Content Files
1. **Quiz Data Files** (Multiple .txt files)
   (a) Pasted quiz questions and answers
   (b) Verb conjugation data
   (c) Language learning content

2. **Application Icons**
   (a) `511 X 512_LOGO ICON_VERB MASTER FRENCH_1754918300558.jpg`
   (b) Various screenshot files

## II. 📊 Data & Content Files (Root Level)

### A. French Language Data
1. **`V3_frenchVerbData.js`** - Complete French verb database
   (a) Verb conjugations
   (b) Question contexts
   (c) Grammar rules

2. **`french-mini-courses-mobile.js`** - Mobile course data
3. **`french-verb-data-export.js`** - Exported verb data
4. **`complete-french-verb-data.js`** - Legacy complete dataset

### B. Content Analysis Files
1. **English Content Audits**
   (a) `ALL-ENGLISH-TEXT.txt` - Complete English text extraction
   (b) `all-english-client.txt` - Client-side English content
   (c) `all-english-server.txt` - Server-side English content
   (d) `all-english-quiz.txt` - Quiz English content
   (e) `all-english-templates.txt` - Template English content

2. **Validation Reports**
   (a) `COMPLETE-ENGLISH-AUDIT.md` - Comprehensive audit results
   (b) `COMPREHENSIVE-VALIDATION-REPORT.md` - Validation findings
   (c) `FINAL-VALIDATION-REPORT.md` - Final audit report
   (d) `GRAMMAR-ISSUES-REPORT.md` - Grammar issue analysis
   (e) `english-analysis.md` - English content analysis

3. **Content Files**
   (a) `base-english-sentences.txt` - Base sentence collection
   (b) `english-sentences.txt` - English sentence database
   (c) `french-answers.txt` - French answer key
   (d) `dynamic-english-text.txt` - Dynamic content
   (e) `other-english-sentences.txt` - Additional sentences

### C. Course Content
1. **Level-Specific Content**
   (a) `BEGINNER_LEVEL_COMPLETE_CONTENT.md` - Beginner course material
   (b) `BEGINNER_NOT NOVICE_ LEVEL_COMPLETE_CONTENT` - Level distinction
   (c) `elementary-present-content.txt` - Elementary present tense
   (d) `CORRECTED_NOVICE_CONTENT` - Corrected novice material
   (e) `CORRECTED_ELEMENTARY_CONTENT` - Corrected elementary material

2. **Python Content Files**
   (a) `beginner_level_content.py` - Python course data
   (b) `beginner_level_content_corrected.py` - Corrected version

### D. Testing & Development
1. **Test Files**
   (a) `test-questions.txt` - Test question database
   (b) `test_questions.json` - JSON test data
   (c) `test-errors.txt` - Error logging
   (d) `generated-questions-test.txt` - Generated test content

2. **Development Utilities**
   (a) `grammar-check-script.js` - Grammar validation script
   (b) `grammar-issues-count.txt` - Issue tracking

## JJ. 📲 React Native Templates (Root Level)

### A. Complete Solutions
1. **`ReactNative_COPY_PASTE_READY.tsx`** - Production-ready component
   (a) Complete quiz selection screen
   (b) Custom dropdown implementation
   (c) Mobile-optimized interface

2. **`COMPLETE_ReactNative_Solution.tsx`** - Comprehensive solution
3. **`ReactNative_MiniCourses_COPY_PASTE_READY.tsx`** - Course interface

### B. Individual Components
1. **Quiz Components**
   (a) `ReactNative_QuizSelectionScreen.tsx` - Selection interface
   (b) `ReactNative_ImprovedQuizScreen.tsx` - Enhanced quiz screen
   (c) `ReactNative_QuizScreen_READY.tsx` - Production quiz screen

2. **Utility Components**
   (a) `ReactNative_CustomDropdown.tsx` - Custom dropdown widget

### C. Documentation
1. **Implementation Guides**
   (a) `ReactNative_QuizFlow_Implementation_Guide.md` - Setup guide
   (b) `ReactNative_Dependencies.md` - Required dependencies

## KK. 🎯 Graphics & Icons (Root Level)

### A. Feature Graphics
1. **High Definition Graphics**
   (a) `french-verb-master-feature-graphic-hd.png` - HD PNG version
   (b) `french-verb-master-feature-graphic-hd.svg` - HD SVG version

2. **Standard Graphics**
   (a) `french-verb-master-feature-graphic.png` - Standard PNG
   (b) `french-verb-master-feature-graphic.svg` - Standard SVG

### B. App Icons & Descriptions
1. **`French_Verb_Master_App_Icon_Description.txt`** - Icon specifications

## LL. 📋 Index & Reference Files

### A. Documentation Indexes
1. **`LANDING_PAGES_INDEX.md`** - Landing pages reference (LPI)
2. **`DIRECTORY_FILE_INDEX.md`** - This file (DFI)

---

**Last Updated**: January 2025  
**Total Files**: 200+ files across 15+ directories  
**Structure**: Monorepo with client/server separation, mobile variants, and comprehensive documentation  
**Architecture**: React frontend, Express backend, PostgreSQL database, AI integration