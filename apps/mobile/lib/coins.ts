import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  COINS_STORAGE_KEY,
  awardQuiz,
  coinBalance,
  emptyCoinState,
  examGate,
  examInvitation,
  markInvited,
  parseCoinState,
  unlockExam,
  type CoinState,
  type ExamGate,
  type ExamInvitation,
  type QuizAward,
} from "@shared/coins";
import { cefrGate, unlockCefrTest, type CefrGate } from "@shared/cefrCoins";
import type { CefrId } from "@shared/cefrTests";
import { COURSES } from "./courses";
import { getCourseProgress, getQuizHistory } from "./progress";
import { readExamResults } from "./exams";

/**
 * The app half of the coin economy. Every rule lives in shared/coins.ts; this
 * file only reads and writes AsyncStorage under the same key the website uses.
 */

/**
 * First run after the update: credit what this device has already done, so a
 * learner who finished units under 1.1 is not sent back to zero.
 *
 * Coins come from the best recorded score per unit in quiz history. A unit the
 * course progress marks finished but whose score has aged out of history (it
 * keeps the last 200) still counts as finished, at 0 coins - it can be
 * retaken for coins.
 */
async function backfill(): Promise<CoinState> {
  let s = emptyCoinState();
  try {
    const history = await getQuizHistory();
    for (const r of history) {
      if (!r.courseKey || r.unitIndex === undefined) continue;
      const [level, timeFrame] = r.courseKey.split("|");
      const verb = COURSES[level]?.units[r.unitIndex]?.verb;
      if (!verb) continue;
      s = awardQuiz(s, level, timeFrame, verb, r.score, r.total).state;
    }
    const progress = await getCourseProgress();
    for (const [key, e] of Object.entries(progress)) {
      const [level, timeFrame] = key.split("|");
      for (const i of e.completedUnits) {
        const verb = COURSES[level]?.units[i]?.verb;
        if (!verb) continue;
        const k = `${level}|${timeFrame}|${verb}`;
        if (!(k in s.best)) s = { ...s, best: { ...s.best, [k]: 0 } };
      }
    }
  } catch {}
  return s;
}

let writeChain: Promise<unknown> = Promise.resolve();

export async function readCoins(): Promise<CoinState> {
  try {
    const raw = await AsyncStorage.getItem(COINS_STORAGE_KEY);
    const parsed = parseCoinState(raw);
    if (parsed) return parsed;
    const s = await backfill();
    await AsyncStorage.setItem(COINS_STORAGE_KEY, JSON.stringify(s));
    return s;
  } catch {
    return emptyCoinState();
  }
}

// Screens showing the balance listen here, so a spend on the same screen
// (e.g. unlocking a CEFR-style test from its card) updates the header at once
// instead of only on the next visit (1.3.17).
const coinListeners = new Set<(s: CoinState) => void>();
export function onCoinsChanged(fn: (s: CoinState) => void): () => void {
  coinListeners.add(fn);
  return () => { coinListeners.delete(fn); };
}

async function write(s: CoinState) {
  await AsyncStorage.setItem(COINS_STORAGE_KEY, JSON.stringify(s));
  coinListeners.forEach((fn) => { try { fn(s); } catch {} });
}

/** Serialise read-modify-write so two quick saves cannot lose coins. */
function serial<T>(fn: () => Promise<T>): Promise<T> {
  const next = writeChain.then(fn, fn);
  writeChain = next.catch(() => {});
  return next;
}

/**
 * Record a finished course quiz. Returns what it paid and, when this quiz is
 * the one that took the learner to the exam's price, the invitation to show. The
 * invitation is marked as shown in the same write, so it appears once.
 */
export function recordCourseQuiz(
  level: string, timeFrame: string, verb: string, correct: number, total: number,
): Promise<QuizAward & { invitation: ExamInvitation | null }> {
  return serial(async () => {
    const before = await readCoins();
    const award = awardQuiz(before, level, timeFrame, verb, correct, total);
    const invitation = examInvitation(before, award.state, level, timeFrame, await readExamResults());
    const state = invitation ? markInvited(award.state, invitation) : award.state;
    try { await write(state); } catch {}
    return { ...award, state, invitation };
  });
}

export async function readExamGate(level: string, timeFrame: string): Promise<{ gate: ExamGate; coins: CoinState }> {
  const [coins, results] = await Promise.all([readCoins(), readExamResults()]);
  return { gate: examGate(coins, level, timeFrame, results), coins };
}

/** Spend the exam's price in coins. Resolves to the new gate (unchanged if not allowed). */
export function spendOnExam(level: string, timeFrame: string): Promise<ExamGate> {
  return serial(async () => {
    const [coins, results] = await Promise.all([readCoins(), readExamResults()]);
    const next = unlockExam(coins, level, timeFrame, results);
    if (next && next !== coins) { try { await write(next); } catch {} }
    return examGate(next ?? coins, level, timeFrame, results);
  });
}

/** Coins paid for each vocab-check word answered right without VIS-CUE (Jonathan, 21 Oct 2026). */
export const VOCAB_COINS_PER_WORD = 1;

/**
 * Pay for a vocab-check word passed (right, no VIS-CUE). Each word passes once,
 * so this pays at most once per word. Adds to the lifetime `earned` total like
 * a quiz; earned, never sold (rule 6 in shared/coins.ts). Resolves to the new balance.
 */
export function awardVocabCoin(): Promise<number> {
  return serial(async () => {
    const s = await readCoins();
    const next: CoinState = { ...s, earned: coinBalanceEarned(s) + VOCAB_COINS_PER_WORD };
    try { await write(next); } catch {}
    return coinBalance(next);
  });
}

function coinBalanceEarned(s: CoinState): number {
  // A pre-18-Oct store has no `earned`; its balance was the sum of unit bests.
  return typeof s.earned === "number" ? s.earned : coinBalance(s) + s.spent;
}

// ------------------------------------------------- CEFR-style tests (1.3) ---
// Rules live in shared/cefrCoins.ts: Pro (checked by the caller) + 2 × the
// level's exam price, paid once; retakes free. No exams needed first (1.3.10).

export async function readCefrGate(id: CefrId): Promise<{ gate: CefrGate; coins: CoinState }> {
  const [coins, results] = await Promise.all([readCoins(), readExamResults()]);
  return { gate: cefrGate(coins, id, results), coins };
}

/** Spend the CEFR test's price. Resolves to the new gate (unchanged if not allowed). */
export function spendOnCefr(id: CefrId): Promise<CefrGate> {
  return serial(async () => {
    const [coins, results] = await Promise.all([readCoins(), readExamResults()]);
    const next = unlockCefrTest(coins, id, results);
    if (next && next !== coins) { try { await write(next); } catch {} }
    return cefrGate(next ?? coins, id, results);
  });
}
