import { LEVELS as LEVEL_KEYS, LEVEL_DETAIL, LEVEL_EMOJI, LEVEL_VERBS, ALL_TIME_FRAMES, timeFramesFor } from "@shared/levels";

export const API_BASE = "https://conjugately.onrender.com";

// Levels, verbs and time frames come from shared/levels.ts (25 Oct 2026:
// Intermediate split into Intermediate A and Intermediate B).
export const LEVELS = [
  { key: "", label: "Select difficulty level...", detail: "" },
  ...LEVEL_KEYS.map((k) => ({ key: k, label: `${LEVEL_EMOJI[k]} ${k}`, detail: LEVEL_DETAIL[k] })),
  { key: "Advanced", label: "🔒 Advanced - Coming Soon!", detail: "", disabled: true },
];

export const DIFFICULTY_CONFIGS: Record<string, { verbs: string[] }> = Object.fromEntries(
  LEVEL_KEYS.map((k) => [k, { verbs: LEVEL_VERBS[k] }]),
);

export const VERB_MEANINGS: Record<string, string> = {
  "être": "to be", "avoir": "to have", "faire": "to do/make", "dire": "to say/tell",
  "aller": "to go", "voir": "to see", "savoir": "to know", "pouvoir": "to be able to/can",
  "vouloir": "to want", "venir": "to come", "besoin": "to need",
  "s'intéresser": "to be interested", "se débrouiller": "to manage/get by",
  "s'ennuyer": "to get bored", "s'entraîner": "to train/practice",
  "se souvenir": "to remember", "s'adapter": "to adapt",
  "se réjouir": "to be delighted/rejoice", "mettre": "to put/place/wear",
  "trouver": "to find", "croire": "to believe", "parler": "to speak/talk",
  "prendre": "to take", "lire": "to read", "écrire": "to write",
  "ouvrir": "to open", "fermer": "to close", "perdre": "to lose", "garder": "to keep",
};

/** Every time frame; use timeFramesForLevel() for what a given level offers. */
export const TIME_FRAMES: string[] = ALL_TIME_FRAMES;
export const timeFramesForLevel = (level: string): string[] => timeFramesFor(level);
