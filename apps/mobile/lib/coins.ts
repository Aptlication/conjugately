import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  COINS_STORAGE_KEY,
  awardQuiz,
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

async function write(s: CoinState) {
  await AsyncStorage.setItem(COINS_STORAGE_KEY, JSON.stringify(s));
}

/** Serialise read-modify-write so two quick saves cannot lose coins. */
function serial<T>(fn: () => Promise<T>): Promise<T> {
  const next = writeChain.then(fn, fn);
  writeChain = next.catch(() => {});
  return next;
}

/**
 * Record a finished course quiz. Returns what it paid and, when this quiz is
 * the one that took the learner to 100 coins, the invitation to show. The
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

/** Spend 100 coins. Resolves to the new gate (unchanged if not allowed). */
export function spendOnExam(level: string, timeFrame: string): Promise<ExamGate> {
  return serial(async () => {
    const [coins, results] = await Promise.all([readCoins(), readExamResults()]);
    const next = unlockExam(coins, level, timeFrame, results);
    if (next && next !== coins) { try { await write(next); } catch {} }
    return examGate(next ?? coins, level, timeFrame, results);
  });
}
