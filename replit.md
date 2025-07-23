# French Verb Master

## Overview

French Verb Master is a full-stack application that uses AI to create educational French verb conjugation quizzes. The application features a sleek dark-themed interface where users select from the top 10 most used French verbs, choose a time frame (Past/Present/Future), and select specific tense types to generate customized 20-question multiple-choice quizzes using Google Gemini 2.5 Pro. The frontend uses a modern dark UI design with React, while the backend uses Express.js with TypeScript and PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM and Neon serverless database
- **AI Integration**: Google Gemini 2.5 Pro for quiz generation
- **Session Management**: Express sessions with PostgreSQL store
- **Validation**: Zod schemas for request/response validation

## Key Components

### Database Schema
- **Users Table**: Basic user management with username/password
- **Quizzes Table**: Stores generated quizzes with verb, tense, and questions data
- **Shared Schema**: Type-safe schemas using Drizzle ORM and Zod validation

### API Endpoints
- `POST /api/generate-quiz`: Generates a new French verb quiz using Gemini (accepts verb, timeFrame, tenseType)
- `GET /api/quiz/:id`: Retrieves a specific quiz by ID

### Frontend Components
- **Home Page**: Dark-themed interface with three-step dropdown selection (Verb, Time Frame, Tense Type)
- **Verb Selection**: Top 10 most used French verbs (être, avoir, faire, dire, aller, voir, savoir, pouvoir, vouloir, venir)
- **Time Frame Selection**: Past, Present, Future categories
- **Tense Type Selection**: Dynamic options based on time frame (Simple, Perfect, Continuous, Conditional)
- **Choose All for Me**: Master button that opens difficulty level modal (Easy/Moderate/Difficult) for automatic selection
- **Difficulty Levels**: Easy (3 basic verbs, present only), Moderate (6 verbs, basic tenses), Difficult (all verbs and tenses)
- **UI Components**: Dark-themed shadcn/ui components with custom purple gradient styling
- **Form Validation**: Real-time validation with error handling and dependent field logic
- **Modal Interface**: Overlay difficulty selection with backdrop blur effects

### Storage Layer
- **Memory Storage**: Current implementation using in-memory storage
- **Database Ready**: Drizzle configuration prepared for PostgreSQL migration
- **Type Safety**: Full TypeScript types generated from database schema

## Data Flow

1. User inputs French verb and tense on the frontend form
2. Form data is validated using Zod schemas
3. POST request sent to `/api/generate-quiz` endpoint
4. Backend validates request and calls Gemini API with structured prompt
5. Gemini generates 20-question quiz following specific format requirements
6. Quiz is stored in PostgreSQL database and returned to frontend
7. Frontend displays success notification and quiz result

## External Dependencies

### Core Dependencies
- **Google Gemini API**: For AI-powered quiz generation using Gemini 2.5 Pro
- **Neon Database**: PostgreSQL serverless database (configured but not yet used)
- **Radix UI**: Accessible UI component primitives
- **Tailwind CSS**: Utility-first CSS framework

### Development Tools
- **Vite**: Build tool with hot module replacement
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast bundling for production builds
- **Drizzle Kit**: Database migrations and schema management

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations stored in `./migrations`

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `GEMINI_API_KEY`: Google Gemini API key for quiz generation
- `NODE_ENV`: Environment mode (development/production)

### Scripts
- `dev`: Development server with hot reloading
- `build`: Production build for both frontend and backend
- `start`: Production server startup
- `db:push`: Push database schema changes

### Architecture Decisions

**Monorepo Structure**: Single repository with `client/`, `server/`, and `shared/` directories for better code organization and type sharing.

**Database Integration**: Using PostgreSQL with Neon serverless database for persistent storage, with Drizzle ORM providing type-safe database operations.

**AI-Powered Content**: Leveraging Google's Gemini 2.5 Pro for educational content generation with structured prompts to ensure consistent quiz quality.

**Type Safety**: Full TypeScript implementation with shared schemas between frontend and backend for runtime validation and compile-time safety.

**Component-Based UI**: Modern React patterns with reusable components and consistent design system using Radix UI and Tailwind CSS.

## Recent Changes

### January 22, 2025 - Complete Quiz System Implemented ✓
- Successfully implemented hybrid AI + template quiz generation system
- Gemini AI generates authentic 20-question quizzes when possible, with 15-second timeout fallback to pre-built templates
- Template system ensures reliable quiz delivery even when AI times out
- Each quiz includes English-to-French translation questions, multiple choice answers, hints, and detailed rationales
- Quiz generation follows exact educational specifications: proper subject pronoun distribution, negation examples, plausible distractors
- Full quiz interface working with loading states, interactive questions, progress tracking, and results display
- Confirmed working end-to-end: users can select verb/tense and receive complete 20-question quizzes in 15-20 seconds
- App maintains all UI features: three-dropdown selection, "Choose for me" buttons, difficulty levels, dark theme
- System now reliably produces quizzes for users without timeouts or failures
- Created new dedicated route at /frenchverb to bypass frontend caching issues
- Complete French Verb Master interface now accessible via fresh URL slug