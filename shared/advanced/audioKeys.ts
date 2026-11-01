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
/** Cécile's question i (0-based). */
export const questionClip = (unitId: string, i: number) => `ADV_${u(unitId)}_Q${i + 1}`;
/** Her follow-up to question i, asking for a second sentence. */
export const followClip = (unitId: string, i: number) => `ADV_${u(unitId)}_Q${i + 1}_F`;

/** Lines Cécile says in every unit. */
export const STOCK_LINES = {
  ADV_PRAISE_1: "Très bien !",
  ADV_PRAISE_2: "Parfait !",
  ADV_PRAISE_3: "Excellent !",
  ADV_MORE: "Oui, c'est ça ! Ajoutez une deuxième phrase.",
  ADV_MISS: "Pas tout à fait. Écoutez encore, ou touchez la carte jaune pour un indice.",
  ADV_ENGLISH: "En français, s'il vous plaît !",
  ADV_MODEL: "Voici une réponse possible.",
  ADV_NEXT: "D'accord. Question suivante.",
  ADV_END: "Merci pour cette conversation. À bientôt !",
} as const;
export type StockLine = keyof typeof STOCK_LINES;

/** What is said for a headword: "le client / la cliente" → "le client, la cliente"; notes in brackets dropped. */
export function spokenHeadword(fr: string): string {
  return fr.replace(/\s*\([^)]*\)/g, "").replace(/\s*\/\s*/g, ", ").trim();
}

/** One clip per headword, shared by every article that uses it. */
export const wordClip = (fr: string) => `ADVW_${slug(spokenHeadword(fr)).slice(0, 48)}`;
