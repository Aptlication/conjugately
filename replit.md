# French Verb Master

## Overview
French Verb Master is a full-stack application designed to help students master French verb conjugations through personalized, AI-powered quizzes and optional mini-courses. It targets serious students aiming for fluency by focusing on a critical aspect of French grammar. The application features a dark-themed UI, allowing users to customize 20-question multiple-choice quizzes based on verb, time frame, and tense using Google Gemini 2.5 Pro. The project's vision is to become a go-to resource for French language learners, offering a highly effective and engaging way to practice and solidify verb conjugation knowledge, thereby unlocking greater fluency.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter
- **State Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS with custom CSS variables and shadcn/ui component library
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **UI/UX Decisions**: Dark-themed interface with purple gradient styling. Features three-step dropdown selection for quiz customization (Verb, Time Frame, Tense Type), dynamic tense options, and a "Choose All for Me" master button for automatic selection based on difficulty (Easy/Moderate/Difficult). Includes a comprehensive 4-unit course system with overviews, individual unit introductions for verbs (être, avoir, faire, aller), and visual progress tracking.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM and Neon serverless database
- **AI Integration**: Google Gemini 2.5 Pro for quiz generation
- **Session Management**: Express sessions with PostgreSQL store
- **Validation**: Zod schemas for request/response validation

### Key Components
- **Database Schema**: Users and Quizzes tables with type-safe schemas using Drizzle ORM and Zod.
- **API Endpoints**: `POST /api/generate-quiz` (for quiz generation) and `GET /api/quiz/:id` (for quiz retrieval).
- **Storage Layer**: Drizzle configured for PostgreSQL, with full TypeScript types generated from the database schema.

### System Design Choices
- **Monorepo Structure**: Single repository with `client/`, `server/`, and `shared/` directories for organized code and type sharing.
- **Database Integration**: PostgreSQL with Neon serverless database for persistent storage, using Drizzle ORM for type-safe operations.
- **AI-Powered Content**: Leverages Google Gemini 2.5 Pro with structured prompts for consistent, high-quality quiz generation.
- **Type Safety**: Full TypeScript implementation with shared schemas ensuring runtime validation and compile-time safety.
- **Component-Based UI**: Utilizes modern React patterns with reusable components and a consistent design system.
- **Quiz System**: Hybrid AI + template system for reliable quiz delivery, even if AI times out. Quizzes include English-to-French translation, multiple-choice answers, hints, and rationales.
- **Course System**: Progressive difficulty system with logical unlocking (Beginner→Easy→Moderate→Difficult), where Difficult level only appears after completing any Moderate course exam. Structured learning flow with sequential progression (Present → Past → Future tenses), tiered difficulty levels featuring increasing verb sets (4→6→8→13 verbs), and comprehensive grammar fixes for English negation patterns.
- **Grammar & Negation**: Comprehensive French negation system for all tenses, proper French contractions, and accurate English grammar in generated questions. Enhanced auxiliary vs main verb detection for "had" constructions and improved "will" negation handling to prevent double negation errors.
- **Recent Fixes (January 2025)**: Fixed missing Present Progressive (Présent Progressif) quizzes for reflexive verbs (se lever, s'appeler, se sentir) through improved tense normalization mapping. Resolved specific permutation issues for dire/voir Imparfait and Plus-que-parfait tenses. Enhanced grammar conversion to properly handle "will don't" and "had don't" constructions with better auxiliary vs main verb detection.

## External Dependencies

### Core Dependencies
- **Google Gemini API**: For AI-powered quiz generation (Gemini 2.5 Pro).
- **Neon Database**: PostgreSQL serverless database.
- **Radix UI**: Accessible UI component primitives.
- **Tailwind CSS**: Utility-first CSS framework.

### Development Tools
- **Vite**: Build tool.
- **TypeScript**: Type safety.
- **ESBuild**: Fast bundling.
- **Drizzle Kit**: Database migrations and schema management.