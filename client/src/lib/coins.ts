import {
  COINS_STORAGE_KEY,
  awardQuiz,
  emptyCoinState,
  examGate,
  parseCoinState,
  unlockExam,
  type CoinState,
  type ExamGate,
  type QuizAward,
} from "@shared/coins";
import { EXAM_RESULTS_STORAGE_KEY, parseExamResults, type ExamResult } from "@shared/exams";

/**
 * The website half of the coin economy: localStorage under the same key and
 * shape the app uses in AsyncStorage. All rules live in shared/coins.ts.
 *
 * No backfill here, unlike the app: the website never kept per-unit progress
 * on the device, so there is nothing to credit.
 */

export function readCoins(): CoinState {
  try {
    return parseCoinState(localStorage.getItem(COINS_STORAGE_KEY)) ?? emptyCoinState();
  } catch {
    return emptyCoinState();
  }
}

function writeCoins(s: CoinState) {
  try { localStorage.setItem(COINS_STORAGE_KEY, JSON.stringify(s)); } catch {}
}

function readResults(): ExamResult[] {
  try { return parseExamResults(localStorage.getItem(EXAM_RESULTS_STORAGE_KEY)); } catch { return []; }
}

export function recordCourseQuiz(level: string, timeFrame: string, verb: string, correct: number, total: number): QuizAward {
  const award = awardQuiz(readCoins(), level, timeFrame, verb, correct, total);
  writeCoins(award.state);
  return award;
}

export function readExamGate(level: string, timeFrame: string): ExamGate {
  return examGate(readCoins(), level, timeFrame, readResults());
}

/** Spend 100 coins on an exam; returns the gate afterwards. */
export function spendOnExam(level: string, timeFrame: string): ExamGate {
  const coins = readCoins();
  const results = readResults();
  const next = unlockExam(coins, level, timeFrame, results);
  if (next && next !== coins) writeCoins(next);
  return examGate(next ?? coins, level, timeFrame, results);
}
