/**
 * CEFR-style tests: unlock and price (1.3).
 *
 * Approved by Jonathan 25 Oct 2026 (revised the same evening, 1.3.10):
 *  - Pro + coins is the only gate. A learner does NOT need to pass the level's
 *    Final Level Exams first: trying the test early is meant to excite interest.
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

/**
 * The Final Level Exams of the test's level, in course order. No longer a gate
 * (1.3.10); used to invite the learner to the test once they have all been passed.
 */
export function cefrPrerequisiteExamIds(id: CefrId): string[] {
  const level = CEFR_TESTS[id].level;
  return timeFramesFor(level)
    .map((tf) => getExam(level, tf)?.id)
    .filter((x): x is string => !!x);
}

export type CefrGate =
  | { kind: "unlocked" }
  | { kind: "needCoins"; balance: number; short: number; cost: number }
  | { kind: "canUnlock"; balance: number; cost: number };

export function cefrGate(s: CoinState, id: CefrId, _examResults: ExamResult[] = []): CefrGate {
  if (s.unlockedExams.includes(cefrUnlockId(id))) return { kind: "unlocked" };
  const balance = coinBalance(s);
  const cost = cefrCoinCost(id);
  if (balance < cost) return { kind: "needCoins", balance, short: cost - balance, cost };
  return { kind: "canUnlock", balance, cost };
}

/** True once every Final Level Exam of the test's level is passed (invitation trigger). */
export function cefrLevelExamsPassed(id: CefrId, examResults: ExamResult[]): boolean {
  const results = migrateLegacyExamResults(examResults);
  return cefrPrerequisiteExamIds(id).every((examId) => hasPassedExam(results, examId));
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
    case "unlocked": return "Yours to keep — retakes are free";
    case "canUnlock": return `Ready — unlock for ${g.cost} coins (you have ${g.balance})`;
    case "needCoins": return `${g.short} more coins needed (you have ${g.balance} of ${g.cost}). Every course quiz earns coins.`;
  }
}
