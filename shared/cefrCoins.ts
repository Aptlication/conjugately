/**
 * CEFR-style tests: unlock and price (1.3).
 *
 * Approved by Jonathan 25 Oct 2026:
 *  - Opens only when every Final Level Exam of the test's level is passed
 *    (3 each for Novice and Elementary, 5 for Intermediate B).
 *  - Costs twice one Final Level Exam of that level, so it follows examCoinCost
 *    automatically: Novice 100, Elementary 140, Intermediate B 140.
 *  - Pay once; retakes are free. The unlock is stored in the coin state's
 *    `unlockedExams` as "cefr-a1" / "cefr-a2" / "cefr-b1", so it rides the same
 *    storage, parsing and backup as exam unlocks.
 *  - Pro is checked by the caller (RevenueCat lives in the app, not here).
 */
import { CEFR_TESTS, type CefrId } from "./cefrTests";
import { coinBalance, examCoinCost, type CoinState } from "./coins";
import { getExam, hasPassedExam, migrateLegacyExamResults, type ExamResult } from "./exams";
import { timeFramesFor } from "./levels";

export const CEFR_PRICE_MULTIPLIER = 2;

export function cefrUnlockId(id: CefrId): string {
  return `cefr-${id.toLowerCase()}`;
}

export function cefrCoinCost(id: CefrId): number {
  return CEFR_PRICE_MULTIPLIER * examCoinCost(CEFR_TESTS[id].level);
}

/** The Final Level Exams that must all be passed first, in course order. */
export function cefrPrerequisiteExamIds(id: CefrId): string[] {
  const level = CEFR_TESTS[id].level;
  return timeFramesFor(level)
    .map((tf) => getExam(level, tf)?.id)
    .filter((x): x is string => !!x);
}

export type CefrGate =
  | { kind: "unlocked" }
  | { kind: "examsFirst"; passed: number; required: number; remaining: string[] }
  | { kind: "needCoins"; balance: number; short: number; cost: number }
  | { kind: "canUnlock"; balance: number; cost: number };

export function cefrGate(s: CoinState, id: CefrId, examResults: ExamResult[] = []): CefrGate {
  if (s.unlockedExams.includes(cefrUnlockId(id))) return { kind: "unlocked" };
  const results = migrateLegacyExamResults(examResults);
  const required = cefrPrerequisiteExamIds(id);
  const remaining = required.filter((examId) => !hasPassedExam(results, examId));
  if (remaining.length) return { kind: "examsFirst", passed: required.length - remaining.length, required: required.length, remaining };
  const balance = coinBalance(s);
  const cost = cefrCoinCost(id);
  if (balance < cost) return { kind: "needCoins", balance, short: cost - balance, cost };
  return { kind: "canUnlock", balance, cost };
}

/** Spend the price. Null when the gate does not allow it, so no caller can skip the check. */
export function unlockCefrTest(s: CoinState, id: CefrId, examResults: ExamResult[] = []): CoinState | null {
  const gate = cefrGate(s, id, examResults);
  if (gate.kind === "unlocked") return s;
  if (gate.kind !== "canUnlock") return null;
  return { ...s, spent: s.spent + gate.cost, unlockedExams: [...s.unlockedExams, cefrUnlockId(id)] };
}

export function cefrGateLabel(g: CefrGate, levelName: string): string {
  switch (g.kind) {
    case "unlocked": return "Unlocked — retakes are free";
    case "examsFirst": return `Pass all ${g.required} ${levelName} Final Level Exams first (${g.passed} of ${g.required} passed)`;
    case "canUnlock": return `Ready — unlock for ${g.cost} coins (you have ${g.balance})`;
    case "needCoins": return `${g.short} more coins needed (you have ${g.balance} of ${g.cost}). Every course quiz earns coins.`;
  }
}
