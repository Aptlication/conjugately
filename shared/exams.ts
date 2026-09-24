/**
 * The twelve examinations — single source of truth.
 *
 * These definitions already existed, but only as literals inside
 * `client/src/App.tsx` (`DIFFICULTY_CONFIGS[level].courseStructure.finalExam`
 * plus the tense mapping inside `handleStartCourseOverviewFinalExam`). The app
 * in `apps/mobile` cannot reach them there, so mirroring exams into the app
 * would have meant retyping the numbers — which is how the two surfaces drift.
 *
 * This module is the extraction, and it now carries three approved corrections
 * to what main did before 12 September. Each is marked `CORRECTED:`.
 */

/** Exams require 90% to pass. Everyday quizzes are unscored practice with no gate. */
export const EXAM_PASS_RATIO = 0.9;

/**
 * Masters Mic is NOT permitted in examinations in release 1.1.
 *
 * Progression hangs on the exam result, so a recogniser error would cost a
 * learner a level. Exams stay visual and completable without speaking, which is
 * also what keeps the accessibility claim in the featuring nomination honest.
 * Approved 12 September 2026; recorded in GLOSSARY.md exemption 3.
 */
export const MIC_ALLOWED_IN_EXAMS = false;

export type ExamLevel = "Beginner" | "Novice" | "Elementary" | "Intermediate";
export type ExamTimeFrame = "Present" | "Past" | "Future";

export interface ExamDefinition {
  /** Stable id, e.g. "intermediate-past". Use this as the storage key. */
  id: string;
  level: ExamLevel;
  timeFrame: ExamTimeFrame;
  /** The tense sent to /api/get-quiz as `tenseType`. */
  tense: string;
  /** Lowercase form sent as `timeFrame` — the API schema is a lowercase enum. */
  apiTimeFrame: "past" | "present" | "future";
  /** Path segment used for question audio lookup. */
  tensePath: string;
  /** Verbs the exam draws from, in order. One request per verb. */
  verbs: string[];
  /** Questions taken from each verb. */
  questionsPerVerb: number;
  /** questionsPerVerb × verbs.length */
  totalQuestions: number;
  /** ceil(totalQuestions × 0.9) */
  passMark: number;
}

/**
 * Verb sets, from `DIFFICULTY_CONFIGS[level].verbs` in App.tsx — which is what
 * the exam handler loops over.
 *
 * CORRECTED: main loops all 18 Intermediate verbs while declaring
 * `finalExam.questions: 110`, producing a 180-question exam recorded as 110.
 * Eleven verbs matches the declared length and the eleven course units.
 */
export const EXAM_VERB_SETS: Record<ExamLevel, string[]> = {
  Beginner: ["être", "avoir", "faire"],
  Novice: ["être", "avoir", "faire", "aller"],
  Elementary: ["dire", "voir", "savoir", "vouloir", "venir", "pouvoir", "besoin"],
  // DECIDED 24 Sep by Jonathan: Intermediate is all EIGHTEEN verbs, reflexives
  // included. The September cut to eleven was justified in the audit as
  // "matching the eleven course units" — but that matched a COUNT, not a SET.
  // The app's eleven units were être/avoir/faire/aller/voir/dire/pouvoir/
  // vouloir/prendre/venir/savoir, which are the Beginner and Novice verbs, so
  // the app would have taught one set and examined another. Corrected in
  // apps/mobile/lib/courses.ts to match this list.
  //
  // Reflexive passé composé is the hardest thing the level teaches and the
  // reason Intermediate is a step up. It is also where 22 of the 25 wrong
  // answer keys found on 24 September were hiding.
  //
  // "se débrouiller" had questions in the présent only, which would have made
  // the Past and Future exams throw on assembly. Rather than shrink the level,
  // the missing passé composé and futur simple were authored on 24 September
  // (1.1.18). Those 40 questions have no ElevenLabs answer audio yet.
  Intermediate: [
    "s'intéresser", "se débrouiller", "s'ennuyer", "s'entraîner", "se souvenir",
    "s'adapter", "se réjouir", "mettre", "trouver", "croire", "parler",
    "prendre", "lire", "écrire", "ouvrir", "fermer", "perdre", "garder",
  ],
};

/**
 * Questions per verb, per level.
 *
 * At a flat 10 the exams ran 30 / 40 / 70 / 110 — and Intermediate actually ran
 * 180, because it looped all 18 verbs while declaring 110. Seventy or more
 * multiple-choice questions is 30–60 minutes of unbroken work with no save
 * point, which nobody finishes on a phone and an App Review tester certainly
 * does not.
 *
 * Six, not five, for the two long levels. Five was the first cut (12 Sep) on
 * length alone, but five slots cannot hold six grammatical persons, so every
 * verb was guaranteed to go untested on at least one — and once the exam is
 * drawn from already-practised material (see selectExamQuestions), covering
 * every person is the main thing it has left to offer. At six, 73% of verbs
 * cover all six persons and the average is 5.7 of 6. Approved 14 September 2026.
 *
 * Beginner and Novice stay at 10: their courses are short enough that a
 * six-per-verb review would be 18 and 24 questions, too thin to stand as the
 * end of a whole course, and 10 covers the persons comfortably anyway.
 *
 *   Beginner       3 verbs × 10 = 30, pass 27
 *   Novice         4 verbs × 10 = 40, pass 36
 *   Elementary     7 verbs ×  6 = 42, pass 38
 *   Intermediate  18 verbs ×  4 = 72, pass 65
 *
 * REVISED 24 September 2026. Intermediate became eighteen verbs (see
 * EXAM_VERB_SETS), so six each would be a 108-question exam — defect 1 in a
 * smaller hat. Four gives 72: long, but it is the top level and the step up
 * from Elementary's 42 is meant to be felt.
 *
 * Four sits below the six persons a verb can take, so no single verb tests them
 * all. That is acceptable here in a way it was not at five for eleven verbs,
 * because selectExamQuestions shuffles the person order independently for each
 * verb: WHICH four are tested varies verb by verb, and over eighteen verbs every
 * person is covered many times. The per-verb guarantee is traded for breadth,
 * deliberately. Changing it is one number.
 */
export const QUESTIONS_PER_VERB: Record<ExamLevel, number> = {
  Beginner: 10,
  Novice: 10,
  Elementary: 6,
  Intermediate: 4,
};

/**
 * CORRECTED: main's exam handler maps Past to "Passé Simple" for every level
 * except Elementary, while the course units, the tense lists, the audio path map
 * and the mobile app all use "Passé Composé" — and TENSE_PATH_MAP then maps
 * Passé Simple back onto the `passe_compose` audio folder, which is the tell
 * that it was never intended. The exam was testing a tense the course never
 * taught. Passé Composé throughout.
 */
const TENSE_BY_TIMEFRAME: Record<
  ExamTimeFrame,
  { tense: string; tensePath: string; apiTimeFrame: "past" | "present" | "future" }
> = {
  Present: { tense: "Présent", tensePath: "present", apiTimeFrame: "present" },
  Past: { tense: "Passé Composé", tensePath: "passe_compose", apiTimeFrame: "past" },
  Future: { tense: "Futur Simple", tensePath: "futur_simple", apiTimeFrame: "future" },
};

const LEVELS: ExamLevel[] = ["Beginner", "Novice", "Elementary", "Intermediate"];
const TIME_FRAMES: ExamTimeFrame[] = ["Present", "Past", "Future"];

/** ceil(total × 0.9) — the same arithmetic App.tsx already used. */
export function passMarkFor(totalQuestions: number): number {
  return Math.ceil(totalQuestions * EXAM_PASS_RATIO);
}

export const EXAMS: ExamDefinition[] = LEVELS.flatMap((level) =>
  TIME_FRAMES.map((timeFrame): ExamDefinition => {
    const verbs = EXAM_VERB_SETS[level];
    const questionsPerVerb = QUESTIONS_PER_VERB[level];
    const totalQuestions = verbs.length * questionsPerVerb;
    const { tense, tensePath, apiTimeFrame } = TENSE_BY_TIMEFRAME[timeFrame];
    return {
      id: `${level.toLowerCase()}-${timeFrame.toLowerCase()}`,
      level,
      timeFrame,
      tense,
      apiTimeFrame,
      tensePath,
      verbs,
      questionsPerVerb,
      totalQuestions,
      passMark: passMarkFor(totalQuestions),
    };
  }),
);

export function getExam(level: string, timeFrame: string): ExamDefinition | undefined {
  return EXAMS.find((e) => e.level === level && e.timeFrame === timeFrame);
}

export function getExamById(id: string): ExamDefinition | undefined {
  return EXAMS.find((e) => e.id === id);
}

/** Did this attempt pass? */
export function isExamPassed(correct: number, exam: ExamDefinition): boolean {
  return correct >= exam.passMark;
}

// ---------------------------------------------------------------- results ---

/**
 * Storage key for exam results. Kept separate from `conjugately_quiz_history`
 * on purpose: quiz history feeds an average across unscored practice, and
 * folding pass/fail exam scores into it would mix two different scales — the
 * same collision the 90%/75% rule warns about, one layer down.
 *
 * Device-local until accounts exist. The web app reads and writes it through
 * localStorage; the iOS app through AsyncStorage. The functions below are pure
 * so both surfaces share the logic and neither imports the other's storage API.
 */
export const EXAM_RESULTS_STORAGE_KEY = "conjugately_exam_results";

export interface ExamResult {
  examId: string;
  correct: number;
  total: number;
  passed: boolean;
  /** ISO 8601. */
  date: string;
}

/**
 * Add a result, keeping the best attempt per exam.
 *
 * Best rather than latest: a learner who passes and then retakes for practice
 * should not lose the pass, and progression is a "have you cleared this" state
 * rather than a "how did you do most recently" one.
 */
export function upsertExamResult(results: ExamResult[], result: ExamResult): ExamResult[] {
  const existing = results.find((r) => r.examId === result.examId);
  if (!existing) return [...results, result];
  if (result.correct <= existing.correct) return results;
  return results.map((r) => (r.examId === result.examId ? result : r));
}

export function hasPassedExam(results: ExamResult[], examId: string): boolean {
  return results.some((r) => r.examId === examId && r.passed);
}

/** Parse whatever came out of storage without trusting it. */
export function parseExamResults(raw: string | null | undefined): ExamResult[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (r): r is ExamResult =>
        r && typeof r.examId === "string" && typeof r.correct === "number" &&
        typeof r.total === "number" && typeof r.passed === "boolean",
    );
  } catch {
    return [];
  }
}

// ------------------------------------------------- Final Level Exam selection ---

/**
 * FINAL LEVEL EXAM — composition.
 *
 * Approved 14 September 2026, option A: the exam draws from the SAME pool as
 * the unit quizzes, with no held-back questions, and is named honestly as a
 * Final Level Exam rather than a test of unseen material.
 *
 * That decision is forced by the data. Every verb x tense block holds exactly
 * 20 questions and the unit quiz requests 20, so the quiz already serves the
 * entire pool — there is nothing to hold back without shortening the units.
 *
 * What the review must therefore earn is COVERAGE. Taking the first n questions
 * off a shuffled pool leaves coverage to chance, and the pools are lopsided:
 * `tu` and `vous` appear only once or twice in twenty, so a five-question
 * sample can easily contain neither, and a learner can pass a whole level
 * without ever being asked to conjugate for `tu`.
 *
 * So selection is stratified by grammatical person: one question from each
 * person before any person is used twice.
 */

export type Person = "je" | "tu" | "il" | "nous" | "vous" | "ils" | "other";

/**
 * Which person does this answer conjugate for?
 *
 * Reads the answer text rather than any metadata, because the datasets carry
 * no person field. Handles the three shapes French puts the pronoun in:
 * plain ("Je suis"), negated ("Je ne suis pas"), and inverted, where the
 * pronoun follows the verb after a hyphen ("Es-tu prêt ?", "Sont-elles ici ?").
 */
export function classifyPerson(text: string): Person {
  if (!text) return "other";
  const s = text.normalize("NFC").toLowerCase().replace(/[‘’]/g, "'");

  // Inversion first: the pronoun after the hyphen is the subject.
  const inverted = s.match(/-\s*(je|tu|il|elle|on|nous|vous|ils|elles)\b/);
  const subject = inverted
    ? inverted[1]
    : (s.match(/(?:^|[?!.]\s+)(?:quand\s+|où\s+|pourquoi\s+|comment\s+)?(j'|je|tu|il|elle|on|nous|vous|ils|elles)\b/) || [])[1];

  switch (subject) {
    case "j'": case "je": return "je";
    case "tu": return "tu";
    case "il": case "elle": case "on": return "il";
    case "nous": return "nous";
    case "vous": return "vous";
    case "ils": case "elles": return "ils";
    default: return "other";
  }
}

/** Negated forms carry `ne ... pas/rien/jamais` (or the elided `n'`). */
export function isNegative(text: string): boolean {
  return /\b(ne|n')\s|\bn'/i.test(text.normalize("NFC").replace(/[‘’]/g, "'"));
}

/** Questions asked rather than stated. */
export function isInterrogative(text: string): boolean {
  return /\?\s*$/.test(text.trim());
}

function shuffled<T>(items: T[], rand: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const PERSON_ORDER: Person[] = ["je", "tu", "il", "nous", "vous", "ils", "other"];

/**
 * Pick `count` questions from `pool`, spreading them across grammatical persons
 * as evenly as the pool allows.
 *
 * Round-robin across person buckets: every person contributes one question
 * before any contributes a second. With five questions that means five
 * different persons; with ten it means all six, then four more spread evenly.
 * Bucket order and the contents of each bucket are shuffled per call, so two
 * attempts at the same review are not identical.
 *
 * `getAnswerText` should return the CORRECT option's text — that is what
 * carries the conjugated form.
 */
export function selectExamQuestions<T>(
  pool: T[],
  count: number,
  getAnswerText: (q: T) => string,
  rand: () => number = Math.random,
): T[] {
  if (pool.length <= count) return shuffled(pool, rand);

  const buckets = new Map<Person, T[]>();
  for (const q of pool) {
    const person = classifyPerson(getAnswerText(q));
    if (!buckets.has(person)) buckets.set(person, []);
    buckets.get(person)!.push(q);
  }

  // Shuffle which person goes first — otherwise `je` would lead every review
  // and `ils` would be the one always dropped.
  //
  // "other" is pinned LAST rather than shuffled in. It holds answers whose
  // subject is a noun rather than a pronoun, and treating it as a seventh
  // person let it consume one of the first n slots: at six questions a verb
  // then covered five real persons plus an "other" and missed one outright,
  // which happened 61% of the time in simulation. Real persons are covered
  // first; "other" only fills what is left over.
  const present = PERSON_ORDER.filter((p) => buckets.has(p));
  const order = [
    ...shuffled(present.filter((p) => p !== "other"), rand),
    ...present.filter((p) => p === "other"),
  ];
  for (const p of order) buckets.set(p, shuffled(buckets.get(p)!, rand));

  const picked: T[] = [];
  let exhausted = false;
  while (picked.length < count && !exhausted) {
    exhausted = true;
    for (const p of order) {
      if (picked.length >= count) break;
      const bucket = buckets.get(p)!;
      if (bucket.length) {
        picked.push(bucket.shift()!);
        exhausted = false;
      }
    }
  }

  // Polarity guarantee: a review made only of plain statements never asks the
  // learner to negate or invert, which is half of what the courses teach. If
  // neither shape made it in and the pool has one, trade the last pick for it.
  const remaining = order.flatMap((p) => buckets.get(p)!);
  for (const [has, find] of [
    [picked.some((q) => isNegative(getAnswerText(q))), (q: T) => isNegative(getAnswerText(q))],
    [picked.some((q) => isInterrogative(getAnswerText(q))), (q: T) => isInterrogative(getAnswerText(q))],
  ] as const) {
    if (has || picked.length < 3) continue;
    const candidate = remaining.find(find);
    if (candidate) picked[picked.length - 1] = candidate;
  }

  return shuffled(picked, rand);
}

/**
 * Has this device recorded a pass for ANY tense of the given level?
 *
 * The course progression gates each level behind the one below it, and until
 * now it asked only `completedCourses`, which is populated from the API and is
 * therefore always empty in guest mode. Nobody has accounts yet, so every level
 * above Beginner was permanently locked and passing an exam changed nothing
 * visible. Local passes have to count too, or the fix that finally recorded
 * them still leaves progression dead.
 */
export function hasPassedAnyExamForLevel(results: ExamResult[], level: string): boolean {
  const prefix = `${level.toLowerCase()}-`;
  return results.some((r) => r.passed && r.examId.startsWith(prefix));
}
