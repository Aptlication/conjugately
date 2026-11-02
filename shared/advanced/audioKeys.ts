/**
 * Clip names for the Advanced units' recordings. Shared by the line builder
 * (scripts/build-advanced-audio-lines.ts) and the app, so both agree.
 * Files live in apps/mobile/assets/audio/conversations/ as <key>.mp3.
 */

const slug = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
    .replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");

const u = (unitId: string) => unitId.replace(".", "_");

/** The article read aloud. */
export const articleClip = (unitId: string) => `ADV_${u(unitId)}_TEXT`;
/** Conversation line i (0-based, Cécile's lines and the learner's model replies). */
export const convClip = (unitId: string, i: number) => `ADV_${u(unitId)}_C${i + 1}`;
/** Verb quiz question i (0-based): the correct French sentence, played after answering. */
export const quizClip = (unitId: string, i: number) => `ADV_${u(unitId)}_QZ${i + 1}`;

/** Lines Cécile says in every unit. */
export const STOCK_LINES = {
  // A new key (not the old ADV_MISS), so the recorder doesn't skip it as already done.
  ADV_TRY_AGAIN: "Pas tout à fait. Essayez encore.",
} as const;
export type StockLine = keyof typeof STOCK_LINES;

/** What is said for a headword: "le client / la cliente" → "le client, la cliente"; notes in brackets dropped. */
export function spokenHeadword(fr: string): string {
  return fr.replace(/\s*\([^)]*\)/g, "").replace(/\s*\/\s*/g, ", ").trim();
}

/** One clip per headword, shared by every article that uses it. */
export const wordClip = (fr: string) => `ADVW_${slug(spokenHeadword(fr)).slice(0, 48)}`;
