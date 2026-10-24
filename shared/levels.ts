/**
 * Levels, their verbs and their time frames — single source of truth.
 *
 * DECIDED 25 Oct 2026 (Jonathan): Intermediate is split in two.
 *
 *   Intermediate A — the eleven non-reflexive verbs, and the pluperfect
 *                    (plus-que-parfait) is introduced, with avoir.
 *   Intermediate B — the seven reflexive verbs, and the pluperfect carries on,
 *                    with être and agreement ("elle s'était souvenue").
 *
 * Both levels have four time frames: Present, Past (passé composé), Future and
 * Pluperfect. Beginner, Novice and Elementary keep the three they had.
 *
 * Later the same day (Jonathan, 25 Oct 2026): the imparfait joins A and B as a
 * fifth time frame, "Imperfect", placed before the pluperfect because the
 * pluperfect is built from it (j'avais trouvé). Order in A and B:
 * Present → Past → Imperfect → Pluperfect → Future.
 *
 * For the Conjugately Guarantee and the CEFR-style B1 test, "passing
 * Intermediate" means passing Intermediate B. Intermediate A is a step on the way.
 *
 * Content that already existed for the single Intermediate level — the question
 * bank, the ElevenLabs audio folder, the answer-phrase manifest, conversations,
 * the vocab bank for the three original tenses — is still keyed "Intermediate".
 * contentLevel() maps both halves onto it, so none of that had to move.
 */

export type Level = "Beginner" | "Novice" | "Elementary" | "Intermediate A" | "Intermediate B";
export type TimeFrame = "Present" | "Past" | "Imperfect" | "Pluperfect" | "Future";

/** In order. Each level is the step after the one before it. */
export const LEVELS: Level[] = ["Beginner", "Novice", "Elementary", "Intermediate A", "Intermediate B"];

/** The level that existed before 25 Oct 2026, still found in stored progress. */
export const LEGACY_INTERMEDIATE = "Intermediate";

/** Seven reflexive verbs: Intermediate B. */
export const INTERMEDIATE_B_VERBS = [
  "s'intéresser", "se débrouiller", "s'ennuyer", "s'entraîner", "se souvenir",
  "s'adapter", "se réjouir",
];

/** Eleven non-reflexive verbs: Intermediate A. */
export const INTERMEDIATE_A_VERBS = [
  "mettre", "trouver", "croire", "parler", "prendre", "lire", "écrire",
  "ouvrir", "fermer", "perdre", "garder",
];

/**
 * Old Intermediate unit order: the seven reflexives (units 1–7) then the eleven
 * non-reflexives (units 8–18). Used only to migrate stored progress.
 */
export const LEGACY_INTERMEDIATE_VERBS = [...INTERMEDIATE_B_VERBS, ...INTERMEDIATE_A_VERBS];

export const LEVEL_VERBS: Record<Level, string[]> = {
  Beginner: ["être", "avoir", "faire"],
  Novice: ["être", "avoir", "faire", "aller"],
  Elementary: ["dire", "voir", "savoir", "vouloir", "venir", "pouvoir", "besoin"],
  "Intermediate A": INTERMEDIATE_A_VERBS,
  "Intermediate B": INTERMEDIATE_B_VERBS,
};

const THREE: TimeFrame[] = ["Present", "Past", "Future"];
const INTERMEDIATE: TimeFrame[] = ["Present", "Past", "Imperfect", "Pluperfect", "Future"];

export const LEVEL_TIME_FRAMES: Record<Level, TimeFrame[]> = {
  Beginner: THREE,
  Novice: THREE,
  Elementary: THREE,
  "Intermediate A": INTERMEDIATE,
  "Intermediate B": INTERMEDIATE,
};

/** Every time frame any level uses, in teaching order. */
export const ALL_TIME_FRAMES: TimeFrame[] = INTERMEDIATE;

/** Time frames for a level; three for anything unknown, as before the split. */
export function timeFramesFor(level: string): TimeFrame[] {
  return LEVEL_TIME_FRAMES[level as Level] ?? THREE;
}

export function verbsFor(level: string): string[] {
  return LEVEL_VERBS[level as Level] ?? [];
}

export function isLevel(level: string): level is Level {
  return (LEVELS as string[]).includes(level);
}

export function isIntermediate(level: string): boolean {
  return level === "Intermediate A" || level === "Intermediate B" || level === LEGACY_INTERMEDIATE;
}

/**
 * The key pre-split content is filed under: "Intermediate" for both halves,
 * the level itself for everything else.
 */
export function contentLevel(level: string): string {
  return isIntermediate(level) ? LEGACY_INTERMEDIATE : level;
}

/** Folder under attached_assets/audio/quizzes/ that holds a level's question audio. */
export function audioLevelFolder(level: string): string {
  return contentLevel(level).toLowerCase();
}

/**
 * Which half of Intermediate a verb belongs to. Lets a legacy "Intermediate"
 * record (unit, quiz, coin key) be filed under the right new level.
 */
export function intermediateHalfFor(verb: string): "Intermediate A" | "Intermediate B" | undefined {
  const v = verb.normalize("NFC");
  if (INTERMEDIATE_A_VERBS.some((x) => x.normalize("NFC") === v)) return "Intermediate A";
  if (INTERMEDIATE_B_VERBS.some((x) => x.normalize("NFC") === v)) return "Intermediate B";
  return undefined;
}

// ------------------------------------------------------------- tenses ---

export interface TenseInfo {
  /** Sent to /api/get-quiz as `tenseType`. */
  tense: string;
  /** Lowercase enum sent as `timeFrame`. The pluperfect is a past tense. */
  apiTimeFrame: "past" | "present" | "future";
  /** Folder segment for question audio, and the question-bank key on the server. */
  tensePath: string;
  /** French label for the UI. */
  label: string;
  /** English label for the UI. */
  english: string;
}

export const TENSES: Record<TimeFrame, TenseInfo> = {
  Present: { tense: "Présent", apiTimeFrame: "present", tensePath: "present", label: "Présent", english: "Present" },
  Past: { tense: "Passé Composé", apiTimeFrame: "past", tensePath: "passe_compose", label: "Passé composé", english: "Past" },
  Future: { tense: "Futur Simple", apiTimeFrame: "future", tensePath: "futur_simple", label: "Futur simple", english: "Future" },
  Imperfect: { tense: "Imparfait", apiTimeFrame: "past", tensePath: "imparfait", label: "Imparfait", english: "Imperfect" },
  Pluperfect: { tense: "Plus-que-parfait", apiTimeFrame: "past", tensePath: "plus_que_parfait", label: "Plus-que-parfait", english: "Pluperfect" },
};

export function tenseFor(timeFrame: string): TenseInfo {
  return TENSES[timeFrame as TimeFrame] ?? TENSES.Present;
}

/** "Present, Past & Future", or for Intermediate "Present, Past, Imperfect, Pluperfect & Future". */
export function timeFrameListLabel(level: string): string {
  const tfs = timeFramesFor(level);
  return tfs.length > 1 ? `${tfs.slice(0, -1).join(", ")} & ${tfs[tfs.length - 1]}` : tfs.join("");
}

// ------------------------------------------------------ display copy ---

export const LEVEL_EMOJI: Record<Level, string> = {
  Beginner: "⚪",
  Novice: "🔵",
  Elementary: "🟢",
  "Intermediate A": "🟡",
  "Intermediate B": "🟠",
};

export const LEVEL_DETAIL: Record<Level, string> = {
  Beginner: "Subject pronoun focus (Je suis, Tu es), 3 verbs (être, avoir, faire)",
  Novice: "4 verbs (être, avoir, faire, aller), Present, past, and future tenses",
  Elementary: "7 verbs, Present, past, and future tenses",
  "Intermediate A": "11 non-reflexive verbs, Present, past, imperfect, pluperfect and future",
  "Intermediate B": "7 reflexive verbs, Present, past, imperfect, pluperfect and future",
};

// ------------------------------------------------------ legacy records ---

/**
 * File a stored "Intermediate|<timeFrame>" course-progress entry under the new
 * levels. Old unit indices 0–6 were the reflexives (now Intermediate B, same
 * order), 7–17 the non-reflexives (now Intermediate A, indices 0–10).
 */
export function splitLegacyIntermediateUnits(
  completedUnits: number[],
): { a: number[]; b: number[] } {
  const a: number[] = [];
  const b: number[] = [];
  for (const i of completedUnits) {
    const verb = LEGACY_INTERMEDIATE_VERBS[i];
    if (!verb) continue;
    const half = intermediateHalfFor(verb);
    if (half === "Intermediate A") a.push(INTERMEDIATE_A_VERBS.indexOf(verb));
    else if (half === "Intermediate B") b.push(INTERMEDIATE_B_VERBS.indexOf(verb));
  }
  return { a, b };
}

/** A quiz or unit record's level, with legacy "Intermediate" resolved by verb. */
export function resolveLegacyLevel(level: string, verb: string): string {
  if (level !== LEGACY_INTERMEDIATE) return level;
  return intermediateHalfFor(verb) ?? "Intermediate A";
}
