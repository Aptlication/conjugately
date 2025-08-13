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
- **UI/UX Decisions**: Dark-themed interface with purple gradient styling. Features tiered selection system: Beginner/Easy/Moderate levels only show Verb and Time Frame selection (with automatic tense mapping), while Advanced level includes full Verb/Time Frame/Specific Tense selection for granular control. Dynamic tense options and "Choose All for Me" master button for automatic selection based on difficulty. Includes a comprehensive 4-unit course system with overviews, individual unit introductions for verbs (être, avoir, faire, aller), and visual progress tracking.

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
- **Course System**: Progressive difficulty system with logical unlocking (Beginner→Novice→Elementary→Intermediate→Advanced), where Advanced level only appears after completing any Intermediate course exam. Structured learning flow with sequential progression (Present → Past → Future tenses), tiered difficulty levels featuring increasing verb sets (3→3→6→8→13 verbs), and comprehensive grammar fixes for English negation patterns. All basic levels (Beginner, Novice, Elementary, Intermediate) use simple tenses only (Présent, Passé Composé, Futur Simple/Proche), while Advanced level features the complete set of reflexive and non-reflexive verbs with all tenses including progressive forms.
- **Grammar & Negation**: Comprehensive French negation system for all tenses, proper French contractions, and accurate English grammar in generated questions. Enhanced auxiliary vs main verb detection for "had" constructions and improved "will" negation handling to prevent double negation errors.
- **Recent Fixes (January 2025)**: Fixed missing Present Progressive (Présent Progressif) quizzes for reflexive verbs (se lever, s'appeler, se sentir) through improved tense normalization mapping. Resolved specific permutation issues for dire/voir Imparfait and Plus-que-parfait tenses. Enhanced grammar conversion to properly handle "will don't" and "had don't" constructions with better auxiliary vs main verb detection. Fixed "used to don't say" grammar errors in imparfait tense by adding comprehensive negation patterns for all verbs (January 10, 2025). Restored complete Advanced level with full set of 13 verbs including all reflexive verbs (se lever, s'appeler, se sentir, se laver, se réveiller, s'habiller) plus non-reflexive verbs (être, avoir, faire, dire, aller, voir, savoir, pouvoir, vouloir, venir) - January 11, 2025. Implemented tiered selection system: only Advanced level shows specific tense selection, while Novice/Easy/Moderate levels automatically map tenses based on time frame. Advanced level fully unlocked and accessible without prerequisites. Updated Novice past tense mapping from Passé Simple to Passé Composé for consistency across all basic levels. Unified difficulty level descriptions: Novice, Easy, and Moderate now all show "Present, past, and future tenses" while Advanced shows "All tenses and time frames" for consistency across both modal and dropdown interfaces. **COMPLETED**: Fixed present tense consistency - all Novice/Easy/Moderate levels now use only "Présent" (present simple) instead of "Présent Progressif" for present time frame. System verified working correctly with workflow restart clearing cached state (January 11, 2025). **COMPLETED**: Fixed English grammar errors in quiz questions by enhancing the `fixEnglishGrammar` function to properly handle third-person singular forms of "make" and "have" verbs, preventing errors like "She make mistakes" (January 11, 2025). **COMPLETED**: Enhanced pedagogical approach for present tense questions - all QUESTION_CONTEXTS now show dual English forms like "I eat / I am eating" to teach students that French "Je mange" covers both meanings, demonstrating the efficiency of French present tense over English (January 11, 2025). **COMPLETED**: Implemented comprehensive past tense progressive form removal system for all non-Advanced levels across ALL major past tenses (Passé Composé, Imparfait, Plus-que-parfait, Passé Simple). Enhanced pedagogical approach where basic levels (Novice/Easy/Moderate) show simplified past forms like "I knew", "I used to do" while Advanced level preserves advanced dual forms like "I knew / I was knowing". Added robust regex-based filtering with comprehensive coverage of all progressive patterns including "was/were + ing", "had been + ing", and complex negation forms. All quiz types automatically inherit enhancements through unified QUESTION_CONTEXTS system (January 11, 2025). **COMPLETED**: Applied comprehensive French grammar corrections to novice level content via Perplexity AI verification (January 12, 2025) - Added proper gender agreement for all adjectives (heureux/heureuse, fatigué/fatiguée, occupé/occupée, prêt/prête), implemented masculine/feminine forms for nous/ils/elles contexts, enhanced quiz templates with gender-specific questions and rationales, corrected pronunciation notes, and updated context sentences to include proper gender distinctions. All novice level être, avoir, faire content now follows authentic French grammar rules with comprehensive gender agreement system. **COMPLETED**: Systematic rebranding from "Beginner" to "Novice" across all application components (January 13, 2025) - Updated client-side components, server-side logic, database references, and documentation to consistently use "Novice" as the entry-level difficulty, maintaining pedagogical progression and user experience continuity. **COMPLETED**: Comprehensive 5-tier difficulty system implementation (January 13, 2025) - Added new "Beginner" level above Novice focusing on subject pronoun conjugations (Je suis, Tu es, Il/Elle est, etc.) using provided Python curriculum. Implemented systematic rebranding throughout entire application: Easy→Elementary, Moderate→Intermediate, Difficult→Advanced. Updated all client-side components (App.tsx, fresh-app.tsx, FrenchQuiz.tsx), server-side logic (quiz-generator.ts, beginner-pronoun-data.ts), and documentation to support new 5-tier progressive system: Beginner→Novice→Elementary→Intermediate→Advanced with increasing verb sets (3→3→6→8→13 verbs) for optimal learning progression.

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