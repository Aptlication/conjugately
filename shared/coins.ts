/**
 * Coins and the Final Level Exam unlock — single source of truth.
 *
 * RULES OF 18 OCTOBER 2026 (Jonathan) — these replace the 9 October rules.
 *
 *   1. Course quizzes earn coins. A quiz is worth a fixed maximum per level,
 *      paid in proportion to the score, half-coins rounded UP:
 *
 *        Beginner      34 per quiz × 3 units  = 102 per tense
 *        Novice        25 per quiz × 4 units  = 100 per tense
 *        Elementary    20 per quiz × 7 units  = 140 per tense
 *        Intermediate A  20 per quiz × 11 units = 220 per tense
 *        Intermediate B  20 per quiz ×  7 units = 140 per tense
 *        (until 25 Oct 2026: Intermediate 20 × 18 = 360)
 *
 *      e.g. Beginner 20/20 = 34, 15/20 = 25.5 → 26, 10/20 = 17.
 *
 *   2. Repeats pay. Every finished course quiz pays its full score value, so
 *      coins can be re-earned by repeating units. No caps. (9 Oct: repeats
 *      paid only the improvement on the unit's best.)
 *
 *   3. An exam costs HALF of what one pass through that tense's course pays —
 *      i.e. a learner needs to complete about half the course to afford it.
 *      Computed from the course config (examCoinCost), never hard-coded:
 *      Beginner 51 · Novice 50 · Elementary 70 · Intermediate A 110 ·
 *      Intermediate B 70.
 *      There is no "finish every unit first" condition any more; coins alone
 *      unlock the exam. (9 Oct: a flat 100 coins AND every unit finished.)
 *
 *   4. Once bought, retakes are free: a failed attempt (below 90%) never uses
 *      the purchase up. The exam stays unlocked after a pass too.
 *
 *   5. One shared balance across all levels and tenses; coins carry over.
 *
 *   6. Coins are earned only. They are never sold and never granted for a
 *      purchase: that keeps them outside Apple's in-app currency rules.
 *
 * Grandfathering: an exam this device already has a result for counts as
 * unlocked, so nobody who sat an exam under 1.1 loses access to it. A coin
 * store written under the 9 Oct rules has no `earned` total; it is read as
 * the sum of its unit bests, so nobody's balance moves on upgrade.
 *
 * Pure functions only. The website stores the state in localStorage and the
 * app in AsyncStorage under the same key and shape, as with exam results.
 */

import { EXAM_VERB_SETS, getExam, legacyExamIdTargets, type ExamLevel, type ExamResult } from "./exams";
import { LEGACY_INTERMEDIATE, resolveLegacyLevel, tenseFor } from "./levels";

/** Share of one pass through a tense's course that its exam costs. */
export const EXAM_PRICE_SHARE = 0.5;

/** Questions in one course quiz (unit). */
export const QUIZ_QUESTIONS = 20;

export const COIN_MAX_PER_QUIZ: Record<ExamLevel, number> = {
  Beginner: 34,
  Novice: 25,
  Elementary: 20,
  "Intermediate A": 20,
  "Intermediate B": 20,
};

export const COINS_STORAGE_KEY = "conjugately_coins";

export interface CoinState {
  version: 1;
  /** Best payout per unit, keyed by unitKey(). Presence = unit finished. */
  best: Record<string, number>;
  /** Lifetime coins earned (every quiz pays; 18 Oct rules). */
  earned: number;
  /** Total coins spent on exam unlocks. */
  spent: number;
  /** Exam ids unlocked with coins. */
  unlockedExams: string[];
  /** Invitation modals already shown, e.g. "beginner-present" or "elementary-past:almost". */
  invited: string[];
}

export function emptyCoinState(): CoinState {
  return { version: 1, best: {}, earned: 0, spent: 0, unlockedExams: [], invited: [] };
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

/** Coins one full pass through a tense of this level's course pays. */
export function courseCoinTotal(level: string): number {
  if (!isCoinLevel(level)) return 0;
  return COIN_MAX_PER_QUIZ[level] * courseVerbs(level).length;
}

/** Exam price: half a pass through the tense's course, from config. */
export function examCoinCost(level: string): number {
  return Math.round(EXAM_PRICE_SHARE * courseCoinTotal(level));
}

function sumBest(best: Record<string, number>): number {
  return Object.values(best).reduce((n, x) => n + x, 0);
}

export function coinBalance(s: CoinState): number {
  const earned = typeof s.earned === "number" ? s.earned : sumBest(s.best);
  return Math.max(0, earned - s.spent);
}

export interface QuizAward {
  state: CoinState;
  /** Coins added to the balance by this quiz (its full score value). */
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
  const earned = scoreValue; // repeats pay in full (18 Oct)
  const before = typeof s.earned === "number" ? s.earned : sumBest(s.best);
  const state: CoinState = { ...s, best: { ...s.best, [key]: unitBest }, earned: before + earned };
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
  | { kind: "needCoins"; balance: number; short: number; cost: number }
  | { kind: "canUnlock"; balance: number; cost: number }
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
  const cost = examCoinCost(level);
  if (balance < cost) return { kind: "needCoins", balance, short: cost - balance, cost };
  return { kind: "canUnlock", balance, cost };
}

/**
 * Spend the exam's price in coins. Returns null when the gate does not allow it,
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
  return { ...s, spent: s.spent + gate.cost, unlockedExams: [...s.unlockedExams, exam.id] };
}

/** One-line explanation for an exam button or row. */
export function examGateLabel(g: ExamGate): string {
  switch (g.kind) {
    case "unlocked": return "Unlocked — retakes are free";
    case "canUnlock": return `Ready — unlock for ${g.cost} coins (you have ${g.balance})`;
    case "needCoins": return `${g.short} more coins needed (you have ${g.balance} of ${g.cost}). Every course quiz earns coins, repeats included.`;
    case "noExam": return "Not available for this level yet";
  }
}

/**
 * A unit key from before the 25 Oct 2026 split ("Intermediate|Past|trouver")
 * is filed under the half its verb now belongs to. `earned` is stored
 * separately, so no balance moves; this only keeps "unit finished" true.
 */
export function migrateUnitKey(key: string): string {
  const [level, timeFrame, verb] = key.split("|");
  if (level !== LEGACY_INTERMEDIATE || !verb) return key;
  return unitKey(resolveLegacyLevel(level, verb), timeFrame, verb);
}

/** Parse whatever came out of storage without trusting it. A legacy Intermediate exam unlock unlocks both halves. */
export function parseCoinState(raw: string | null | undefined): CoinState | null {
  if (!raw) return null;
  try {
    const p = JSON.parse(raw);
    if (!p || typeof p !== "object") return null;
    const best: Record<string, number> = {};
    if (p.best && typeof p.best === "object") {
      for (const [k, v] of Object.entries(p.best)) {
        if (typeof v === "number" && Number.isFinite(v) && v >= 0) {
          const key = migrateUnitKey(k);
          best[key] = Math.max(best[key] ?? 0, Math.floor(v));
        }
      }
    }
    const unlocked: string[] = Array.isArray(p.unlockedExams)
      ? p.unlockedExams.filter((x: unknown) => typeof x === "string") : [];
    for (const id of [...unlocked]) {
      for (const t of legacyExamIdTargets(id)) if (!unlocked.includes(t)) unlocked.push(t);
    }
    return {
      version: 1,
      best,
      earned: typeof p.earned === "number" && Number.isFinite(p.earned) && p.earned >= 0
        ? Math.floor(p.earned) : sumBest(best),
      spent: typeof p.spent === "number" && p.spent >= 0 ? Math.floor(p.spent) : 0,
      unlockedExams: unlocked,
      invited: Array.isArray(p.invited) ? p.invited.filter((x: unknown) => typeof x === "string") : [],
    };
  } catch {
    return null;
  }
}

// ------------------------------------------------------------ invitation ---

/**
 * The modal that greets a learner the moment a quiz takes their balance to an
 * exam's price (18 Oct rules: coins alone unlock it). Shown once per exam;
 * `invited` remembers it.
 *
 * The "almost" form (enough coins, units still to do) belonged to the 9 Oct
 * rules and is no longer produced. The type keeps it so a stored `invited`
 * entry or an old screen still type-checks.
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
  if (now.kind === "canUnlock" && was.kind !== "canUnlock" && !after.invited.includes(exam.id)) {
    return { kind: "ready", examId: exam.id, level, timeFrame, balance: coinBalance(after) };
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
  const cost = examCoinCost(inv.level);
  const tense = tenseFor(inv.timeFrame).tense;
  return {
    title: `🎉 You've saved ${inv.balance} coins!`,
    body: `That's enough to sit the ${inv.level} ${tense} Final Level Exam. Feeling confident? Give it a go — or keep practising first.`,
    detail: `${exam.totalQuestions} questions · ${exam.passMark} correct (90%) to pass. Unlocking costs ${cost} coins, and retakes are free until you pass.`,
  };
}
