/**
 * Advanced A — reading-led units (plan: advanced-reading-curriculum-plan.md,
 * Jonathan 31 Oct 2026; pilot approved for TestFlight 1 Nov 2026).
 *
 * A unit is: Read (tap a word for English, double-tap to save it) → Words
 * (the unit's key words plus the learner's saved words, learnt now or sent to
 * My Words) → a spoken comprehension Conversation (six questions, answered
 * aloud in at least two sentences, marked by AI) → Summary.
 */

export interface AdvQuestion {
  fr: string;
  en: string;
  /** Crude keyword stems (accent-free, lowercase) for the offline fallback judge. */
  keys: string[];
  /** Help step 1: French word chips from the text. */
  chips: string[];
  /** Help step 2: a sentence starter. */
  starter: string;
  /** Asked when a correct answer has only one sentence. */
  follow: string;
  followEn: string;
  /** A two-sentence model answer: help steps 3 (English) and 4 (French), and the AI's reference. */
  model: string;
  modelEn: string;
  /** The open "Et vous ?" question: any sensible answer is right. */
  open: boolean;
}

export interface AdvUnit {
  /** "1.1" … "1.10": theme . article. */
  id: string;
  title: string;
  titleEn: string;
  /** B = business, Q = everyday life, C = culture. */
  strand: string;
  grammar: string;
  text: string;
  textEn: string;
  keyWords: { fr: string; en: string }[];
  questions: AdvQuestion[];
}

export interface AdvTheme {
  id: string;
  title: string;
  titleEn: string;
  level: "Advanced A" | "Advanced B";
  units: AdvUnit[];
}

export type LexPos =
  | "noun" | "verb" | "adjective" | "adverb" | "pronoun" | "determiner" | "preposition"
  | "conjunction" | "name" | "number" | "interjection" | "phrase" | "other";

/** What a tap shows and what a double-tap saves. */
export interface LexEntry {
  /** Headword on the card: article for nouns, infinitive for verbs. */
  fr: string;
  en: string;
  pos: LexPos;
  gender?: "m" | "f";
  /** For an inflected verb: what the learner saw, e.g. "voudrais · conditionnel". */
  form?: string;
  /** VIS-CUE picture clue, for concrete words. */
  emoji?: string;
}
