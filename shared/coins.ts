/**
 * Coins and the Final Level Exam unlock — single source of truth.
 *
 * Approved by Jonathan, 9 October 2026:
 *
 *   1. Course quizzes earn coins. A quiz is worth a fixed maximum per level,
 *      paid in proportion to the score, half-coins rounded UP:
 *
 *        Beginner      34 per quiz × 3 units  = 102 per tense
 *        Novice        25 per quiz × 4 units  = 100 per tense
 *        Elementary    20 per quiz × 7 units  = 140 per tense
 *        Intermediate  20 per quiz × 18 units = 360 per tense
 *
 *      e.g. Beginner 20/20 = 34, 15/20 = 25.5 → 26, 10/20 = 17.
 *
 *   2. Repeating a quiz pays only the IMPROVEMENT on that unit's best. Each
 *      unit pays out its maximum once in total, so a tense can never earn more
 *      than the totals above, and grinding the shortest quiz earns nothing.
 *
 *   3. A Final Level Exam costs 100 coins to unlock, and may only be unlocked
 *      once EVERY unit of that level and tense has been finished (any score).
 *      Both conditions, not either.
 *
 *   4. Once unlocked, retakes are free — the exam stays unlocked for good.
 *
 *   5. One shared balance across all levels and tenses.
 *
 *   6. Coins are earned only. They are never sold and never granted for a
 *      purchase: that keeps them outside Apple's in-app currency rules.
 *
 * Grandfathering: an exam this device already has a result for counts as
 * unlocked, so nobody who sat an exam under 1.1 loses access to it.
 *
 * Pure functions only. The website stores the state in localStorage and the
 * app in AsyncStorage under the same key and shape, as with exam results.
 */

import { EXAM_VERB_SETS, getExam, type ExamLevel, type ExamResult } from "./exams";

export const EXAM_COIN_COST = 100;

/** Questions in one course quiz (unit). */
export const QUIZ_QUESTIONS = 20;

export const COIN_MAX_PER_QUIZ: Record<ExamLevel, number> = {
  Beginner: 34,
  Novice: 25,
  Elementary: 20,
  Intermediate: 20,
};

export const COINS_STORAGE_KEY = "conjugately_coins";

export interface CoinState {
  version: 1;
  /** Best payout per unit, keyed by unitKey(). Presence = unit finished. */
  best: Record<string, number>;
  /** Total coins spent on exam unlocks. */
  spent: number;
  /** Exam ids unlocked with coins. */
  unlockedExams: string[];
  /** Invitation modals already shown, e.g. "beginner-present" or "elementary-past:almost". */
  invited: string[];
}

export function emptyCoinState(): CoinState {
  return { version: 1, best: {}, spent: 0, unlockedExams: [], invited: [] };
}

/** Units are identified by verb, not position: the site and app number them differently. */
export function unitKey(level: string, timeFrame: string, verb: string): string {
  return `${level}|${timeFrame}|${verb}`;
}

/** The verbs that make up one tense of a course, in unit order. */
export function courseVerbs(level: string): string[] {
  return EXAM_VERB_SETS[level as ExamLevel] ?? [];
}

export function isCoinLevel(level: string): level is ExamLevel {
  return level in COIN_MAX_PER_QUIZ;
}

/**
 * Coins for one quiz score. Half-coins round up; integer arithmetic so 25.5
 * can never land as 25 through floating-point error.
 */
export function coinsForScore(level: string, correct: number, total: number = QUIZ_QUESTIONS): number {
  if (!isCoinLevel(level) || total <= 0) return 0;
  const max = COIN_MAX_PER_QUIZ[level];
  const c = Math.max(0, Math.min(correct, total));
  return Math.floor((2 * max * c + total) / (2 * total));
}

export function coinBalance(s: CoinState): number {
  const earned = Object.values(s.best).reduce((n, x) => n + x, 0);
  return Math.max(0, earned - s.spent);
}

export interface QuizAward {
  state: CoinState;
  /** Coins added to the balance by this quiz (0 if no improvement). */
  earned: number;
  /** What this score is worth on its own. */
  scoreValue: number;
  /** The unit's best payout after this quiz. */
  unitBest: number;
  /** The unit's maximum payout. */
  unitMax: number;
  /** True when this quiz was the first finish of the unit. */
  firstFinish: boolean;
}

/**
 * Record a finished course quiz. Only verbs that belong to the course earn
 * anything — a free-play quiz on the same verb from the home screen does not
 * go through here at all.
 */
export function awardQuiz(
  s: CoinState,
  level: string,
  timeFrame: string,
  verb: string,
  correct: number,
  total: number = QUIZ_QUESTIONS,
): QuizAward {
  const unitMax = isCoinLevel(level) ? COIN_MAX_PER_QUIZ[level] : 0;
  if (!courseVerbs(level).includes(verb)) {
    return { state: s, earned: 0, scoreValue: 0, unitBest: 0, unitMax, firstFinish: false };
  }
  const key = unitKey(level, timeFrame, verb);
  const previous = s.best[key];
  const scoreValue = coinsForScore(level, correct, total);
  const unitBest = Math.max(previous ?? 0, scoreValue);
  const earned = unitBest - (previous ?? 0);
  const state: CoinState = { ...s, best: { ...s.best, [key]: unitBest } };
  return { state, earned, scoreValue, unitBest, unitMax, firstFinish: previous === undefined };
}

export interface TenseProgress {
  done: number;
  total: number;
  complete: boolean;
  /** Verbs not yet finished, in unit order. */
  remaining: string[];
}

export function tenseProgress(s: CoinState, level: string, timeFrame: string): TenseProgress {
  const verbs = courseVerbs(level);
  const remaining = verbs.filter((v) => !(unitKey(level, timeFrame, v) in s.best));
  return {
    done: verbs.length - remaining.length,
    total: verbs.length,
    complete: verbs.length > 0 && remaining.length === 0,
    remaining,
  };
}

export function isExamUnlocked(s: CoinState, examId: string, results: ExamResult[] = []): boolean {
  return s.unlockedExams.includes(examId) || results.some((r) => r.examId === examId);
}

export type ExamGate =
  | { kind: "unlocked" }
  | { kind: "needUnits"; done: number; total: number; remaining: string[]; balance: number }
  | { kind: "needCoins"; balance: number; short: number }
  | { kind: "canUnlock"; balance: number }
  | { kind: "noExam" };

/** Where does this learner stand with this exam? Drives every exam button. */
export function examGate(
  s: CoinState,
  level: string,
  timeFrame: string,
  results: ExamResult[] = [],
): ExamGate {
  const exam = getExam(level, timeFrame);
  if (!exam) return { kind: "noExam" };
  if (isExamUnlocked(s, exam.id, results)) return { kind: "unlocked" };
  const balance = coinBalance(s);
  const p = tenseProgress(s, level, timeFrame);
  if (!p.complete) return { kind: "needUnits", done: p.done, total: p.total, remaining: p.remaining, balance };
  if (balance < EXAM_COIN_COST) return { kind: "needCoins", balance, short: EXAM_COIN_COST - balance };
  return { kind: "canUnlock", balance };
}

/**
 * Spend 100 coins on an exam. Returns null when the gate does not allow it,
 * so a caller can never unlock by skipping the check.
 */
export function unlockExam(
  s: CoinState,
  level: string,
  timeFrame: string,
  results: ExamResult[] = [],
): CoinState | null {
  const exam = getExam(level, timeFrame);
  if (!exam) return null;
  const gate = examGate(s, level, timeFrame, results);
  if (gate.kind === "unlocked") return s;
  if (gate.kind !== "canUnlock") return null;
  return { ...s, spent: s.spent + EXAM_COIN_COST, unlockedExams: [...s.unlockedExams, exam.id] };
}

/** One-line explanation for an exam button or row. */
export function examGateLabel(g: ExamGate): string {
  switch (g.kind) {
    case "unlocked": return "Unlocked — retakes are free";
    case "canUnlock": return `Ready — unlock for ${EXAM_COIN_COST} coins (you have ${g.balance})`;
    case "needCoins": return `Unit complete — ${g.short} more coins needed (you have ${g.balance}). Retake quizzes to improve your scores.`;
    case "needUnits": return `Finish all units first — ${g.done} of ${g.total} done`;
    case "noExam": return "Not available for this level yet";
  }
}

/** Parse whatever came out of storage without trusting it. */
export function parseCoinState(raw: string | null | undefined): CoinState | null {
  if (!raw) return null;
  try {
    const p = JSON.parse(raw);
    if (!p || typeof p !== "object") return null;
    const best: Record<string, number> = {};
    if (p.best && typeof p.best === "object") {
      for (const [k, v] of Object.entries(p.best)) {
        if (typeof v === "number" && Number.isFinite(v) && v >= 0) best[k] = Math.floor(v);
      }
    }
    return {
      version: 1,
      best,
      spent: typeof p.spent === "number" && p.spent >= 0 ? Math.floor(p.spent) : 0,
      unlockedExams: Array.isArray(p.unlockedExams) ? p.unlockedExams.filter((x: unknown) => typeof x === "string") : [],
      invited: Array.isArray(p.invited) ? p.invited.filter((x: unknown) => typeof x === "string") : [],
    };
  } catch {
    return null;
  }
}

// ------------------------------------------------------------ invitation ---

/**
 * The modal that greets a learner the moment a quiz takes them to 100 coins
 * (approved 9 Oct 2026). Two forms, because the exam needs both conditions:
 *
 *   "ready"  - this quiz made the exam unlockable (tense finished AND 100+
 *              coins): invite them to sit it if they feel confident.
 *   "almost" - this quiz took the balance to 100+ but the tense still has
 *              units to do (Elementary and Intermediate pay 140 / 360 per
 *              tense, so this happens mid-course): congratulate, and say how
 *              many units are left.
 *
 * Each form is shown once per exam; `invited` remembers it.
 */
export type ExamInvitation =
  | { kind: "ready"; examId: string; level: string; timeFrame: string; balance: number }
  | { kind: "almost"; examId: string; level: string; timeFrame: string; balance: number; remaining: string[] };

export function examInvitation(
  before: CoinState,
  after: CoinState,
  level: string,
  timeFrame: string,
  results: ExamResult[] = [],
): ExamInvitation | null {
  const exam = getExam(level, timeFrame);
  if (!exam) return null;
  const was = examGate(before, level, timeFrame, results);
  const now = examGate(after, level, timeFrame, results);
  const balance = coinBalance(after);
  if (now.kind === "canUnlock" && was.kind !== "canUnlock" && !after.invited.includes(exam.id)) {
    return { kind: "ready", examId: exam.id, level, timeFrame, balance };
  }
  const almostKey = `${exam.id}:almost`;
  if (now.kind === "needUnits" && coinBalance(before) < EXAM_COIN_COST && balance >= EXAM_COIN_COST
      && !after.invited.includes(almostKey)) {
    return { kind: "almost", examId: exam.id, level, timeFrame, balance, remaining: now.remaining };
  }
  return null;
}

/** Remember that an invitation was shown. */
export function markInvited(s: CoinState, inv: ExamInvitation): CoinState {
  const key = inv.kind === "ready" ? inv.examId : `${inv.examId}:almost`;
  return s.invited.includes(key) ? s : { ...s, invited: [...s.invited, key] };
}

/** Modal copy, shared so both surfaces say the same thing. */
export function invitationCopy(inv: ExamInvitation): { title: string; body: string; detail: string } {
  const exam = getExam(inv.level, inv.timeFrame)!;
  const tense = inv.timeFrame === "Present" ? "Présent" : inv.timeFrame === "Past" ? "Passé Composé" : "Futur Simple";
  if (inv.kind === "ready") {
    return {
      title: `🎉 You've earned ${EXAM_COIN_COST} coins!`,
      body: `You've finished every ${inv.level} ${tense} unit and saved ${inv.balance} coins — enough to sit the Final Level Exam. Feeling confident? Give it a go.`,
      detail: `${exam.totalQuestions} questions · ${exam.passMark} correct (90%) to pass. Unlocking costs ${EXAM_COIN_COST} coins, and retakes are free after that.`,
    };
  }
  const n = inv.remaining.length;
  return {
    title: `🎉 You've reached ${EXAM_COIN_COST} coins!`,
    body: `That's enough for the ${inv.level} ${tense} Final Level Exam. Finish the last ${n} unit${n === 1 ? "" : "s"} of this tense and it's yours to unlock.`,
    detail: `Still to do: ${inv.remaining.join(", ")}.`,
  };
}

