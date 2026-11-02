/**
 * Advanced A — reading-led units (plan: advanced-reading-curriculum-plan.md,
 * Jonathan 31 Oct 2026; pilot approved for TestFlight 1 Nov 2026).
 *
 * A unit is (revised 2 Nov 2026): Read (tap a word for English, double-tap to
 * save it) → Words (the unit's key words plus the learner's saved words, learnt
 * now or sent to My Words) → Verb quiz (ten questions on the unit verb) →
 * Conversation (the old translate format: say the English cue in French, with
 * four options built around the verb) → Summary.
 */

export type AdvTense = "Présent" | "Passé composé" | "Futur simple" | "Imparfait" | "Conditionnel";

/** One question of the unit's verb quiz, in the format of the conjugation quizzes. */
export interface AdvQuizItem {
  tense: AdvTense;
  /** The English sentence shown. */
  en: string;
  /** Which "you" is meant, when the English can't say. */
  tag?: "formal" | "informal";
  /** The one correct French sentence. */
  answer: string;
  /** Three wrong sentences that differ only in the verb form. */
  wrong: string[];
}

/** A line of the unit's conversation: Cécile speaks, or the learner says the English cue in French. */
export type AdvTurn =
  | { who: "app"; fr: string; en: string }
  | {
      who: "you"; fr: string; en: string; tense: AdvTense; person: string;
      /** Spoken variants that count as right, `fr` first. */
      accept: string[];
      /** Three wrong sentences built around the verb (wrong tense, ending or auxiliary). */
      options: string[];
    };

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
  /** The unit verb: from the article, and not taught in an earlier level where possible (Jonathan, 2 Nov 2026). */
  verb: string;
  /** Ten questions on the unit verb: 3 présent, 3 passé composé, 2 futur simple, 2 imparfait. */
  quiz: AdvQuizItem[];
  /** Translate-format conversation built around the unit verb (replaces the spoken comprehension questions, 2 Nov 2026). */
  conversation: { scene: string; turns: AdvTurn[] };
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
