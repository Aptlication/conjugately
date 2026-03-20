# French Verb Master

## Overview
French Verb Master is a full-stack application designed to help students master French verb conjugations through personalized, AI-powered quizzes and optional mini-courses. It features a dark-themed UI, allowing users to customize 20-question multiple-choice quizzes based on verb, time frame, and tense using Google Gemini 2.5 Pro. The project's vision is to become a go-to resource for French language learners, offering a highly effective and engaging way to practice and solidify verb conjugation knowledge, thereby unlocking greater fluency.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, Vite
- **Routing**: Wouter
- **State Management**: TanStack Query (React Query)
- **Styling**: Tailwind CSS with custom CSS variables and shadcn/ui, Radix UI primitives
- **Forms**: React Hook Form with Zod validation
- **UI/UX Decisions**: Dark-themed interface with purple gradient styling. Features a tiered selection system for quiz difficulty (Beginner/Easy/Moderate vs. Advanced) and a comprehensive 4-unit course system with visual progress tracking.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database**: PostgreSQL with Drizzle ORM and Neon serverless database
- **AI Integration**: Google Gemini 2.5 Pro for quiz generation
- **Session Management**: Express sessions with PostgreSQL store
- **Validation**: Zod schemas for request/response validation

### Key Components
- **Database Schema**: Users and Quizzes tables with type-safe schemas using Drizzle ORM and Zod.
- **API Endpoints**: `POST /api/generate-quiz` and `GET /api/quiz/:id`.
- **Storage Layer**: Drizzle configured for PostgreSQL.

### System Design Choices
- **Monorepo Structure**: Organized with `client/`, `server/`, and `shared/` directories for code and type sharing.
- **Database Integration**: PostgreSQL with Neon and Drizzle ORM for type-safe operations.
- **AI-Powered Content**: Leverages Google Gemini 2.5 Pro with structured prompts for quiz generation.
- **Type Safety**: Full TypeScript implementation with shared schemas.
- **Component-Based UI**: Modern React patterns with reusable components.
- **Quiz System**: Hybrid AI + template system for reliable quiz delivery, including English-to-French translation, multiple-choice answers, hints, and rationales.
- **Course System**: Progressive difficulty system (Beginner→Novice→Elementary→Intermediate→Advanced) with logical unlocking and sequential progression through tenses and verb sets.
- **Grammar & Negation**: Comprehensive French negation system, proper French contractions, and accurate English grammar in generated questions.
- **Cloud Text-to-Speech Integration (ElevenLabs)**: REST API integration with server-side memoization caching. Frontend `useTTS` hook provides `speakAnswer()` (no browser TTS fallback — silence if MP3 missing). Supports iOS Safari. Voice assignments: Léa (`EXAVITQu4vr4xnSDxMaL`) for Beginner (1,697 answer phrases + 180 question MP3s), Thomas (`GBv7mTt0atIp3Br8iCZE`) for Novice (922 answer phrases + 240 question MP3s), Audrey (`McVZB9hVxVSk3Equu8EH`) for Elementary (1,757 answer phrases + 504 question MP3s), Peter (`t4fHUMAMZxaaV2inHOnb`) for Intermediate (1,795 answer phrases + 1,720 question MP3s across 25 verbs including all reflexive verbs). Manifest at `attached_assets/tts-manifest.json` with `phrases`, `novice_phrases`, `elementary_phrases`, and `intermediate_phrases` sections. Question audio path: `/attached_assets/audio/quizzes/{difficulty}/{verb}/{tensePath}/questions/Q{audioIndex}.mp3`. Answer filename prefixes: none (Beginner), `novice_` (Novice), `elem_` (Elementary), `intr_` (Intermediate). Generation scripts: `server/scripts/generate-{level}-audio.ts`. Repair script at `/tmp/repair-beginner-answers.ts` (iterates missing manifest entries). Intermediate data covers 25 verbs: 17 core + 8 additional (s'intéresser, se débrouiller, s'entraîner, s'ennuyer, se souvenir, s'adapter, se réjouir, trouver) + parler; answer key fixes applied for 19 errors across s'adapter/se souvenir/se réjouir passé composé questions.
- **Advanced Difficulty Lock System**: Configuration-driven feature management using `shared/config.ts` to enable/disable Advanced difficulty. Frontend displays lock icons and informational modals, while backend enforces security with 403 responses.
- **Vocabulary Builder**: Client-side vocabulary collection system. Correct answers from completed quizzes are automatically saved to localStorage. Features flashcard-style review with spaced repetition (new → learning → mastered progression), filter/sort word list, and stats dashboard. Component at `client/src/components/VocabularyBuilder.tsx`, hook at `client/src/hooks/useVocabulary.ts`.

## External Dependencies

### Core Dependencies
- **Google Gemini API**: For AI-powered quiz generation (Gemini 2.5 Pro).
- **ElevenLabs API**: For high-quality French text-to-speech pronunciation.
- **Neon Database**: PostgreSQL serverless database.
- **Radix UI**: Accessible UI component primitives.
- **Tailwind CSS**: Utility-first CSS framework.

### Development Tools
- **Vite**: Build tool.
- **TypeScript**: Type safety.
- **ESBuild**: Fast bundling.
- **Drizzle Kit**: Database migrations and schema management.