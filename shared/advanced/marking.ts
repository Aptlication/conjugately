/**
 * Judging a spoken comprehension answer (Advanced units).
 *
 * Two separate questions:
 *  1. Did the learner get the meaning across? The server's AI decides
 *     (server/advancedMark.ts); offline, or if the AI fails, these key-word
 *     checks stand in.
 *  2. Did they say at least two sentences? Counted here, on both sides.
 *     Speech-to-text often drops full stops, so a long reply with two clauses
 *     also counts as two.
 */
import type { AdvQuestion } from "./types";

export const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/’/g, "'").replace(/\s+/g, " ").trim();

const words = (s: string) => norm(s).split(" ").filter(Boolean);

/** Joining words that, in a transcript without punctuation, usually start a second sentence. */
const SECOND_CLAUSE = /\b(mais|et puis|ensuite|aussi|alors|donc|parce que|car|pourtant|en plus|par exemple|sinon|puis|si)\b/;

/**
 * Sentences in a reply. Punctuated replies (typed, or a recogniser that adds
 * full stops) are split on . ! ? …; a spoken reply with no punctuation counts
 * as two once it is long enough to hold two ideas.
 */
export function sentenceCount(t: string): number {
  const s = t.trim();
  if (!s) return 0;
  const parts = s.split(/[.!?…]+/).map((x) => x.trim()).filter((x) => words(x).length >= 2);
  if (parts.length >= 2) return parts.length;
  const n = words(s).length;
  if (n >= 14 || (n >= 9 && SECOND_CLAUSE.test(norm(s).split(" ").slice(3).join(" ")))) return 2;
  return parts.length || (n >= 2 ? 1 : 0);
}

const ENGLISH = /\b(the|is|are|and|will|would|you|when|who|it|they|people|my|because|should|have)\b/g;
/** An answer given in English rather than French. */
export function looksEnglish(t: string): boolean {
  const m = norm(t).match(ENGLISH);
  return !!m && m.length >= 2 && m.length / Math.max(1, words(t).length) > 0.2;
}

/** Offline stand-in for the AI: the meaning is there if a key word is. */
export function fallbackUnderstood(q: AdvQuestion, answer: string): boolean {
  const n = norm(answer);
  if (q.open) return words(answer).length >= 6;
  return q.keys.some((k) => n.includes(norm(k)));
}

export type Verdict =
  /** Right meaning, two sentences or more: well done, move on. */
  | "good"
  /** Right meaning, one sentence: ask the follow-up for a second. */
  | "more"
  /** Meaning not there. */
  | "miss"
  /** Answered in English. */
  | "english";

export function decide(answer: string, understood: boolean): Verdict {
  if (looksEnglish(answer)) return "english";
  if (!understood) return "miss";
  return sentenceCount(answer) >= 2 ? "good" : "more";
}

/** Coins for a finished answer: 3 with no help, 2 with the first two help steps, 1 with more. */
export function coinsFor(helpLevel: number): number {
  return helpLevel <= 0 ? 3 : helpLevel <= 2 ? 2 : 1;
}
