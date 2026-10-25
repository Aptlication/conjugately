import AsyncStorage from "@react-native-async-storage/async-storage";
import { CEFR_RESULTS_STORAGE_KEY, CEFR_TESTS, cefrTestForLevel, type CefrId } from "@shared/cefrTests";
import { cefrLevelExamsPassed } from "@shared/cefrCoins";
import { readExamResults } from "./exams";
import { readCefrGate } from "./coins";
import {
  fallbackSpeaking, fallbackWriting, mergeCefrResult, parseCefrResults,
  type CefrResult, type SpokenAnswers, type WritingAnswers,
} from "@shared/cefrScoring";
import { API_BASE } from "./data";

/**
 * The app half of the CEFR-style tests (1.3). Content, scoring and unlock rules
 * live in shared/cefr*.ts; this file only stores results and talks to the marker.
 *
 * Results are device-local, like Final Level Exam results, under
 * conjugately_cefr_results. A pass is never overwritten by a later attempt.
 */

export async function readCefrResults(): Promise<CefrResult[]> {
  try { return parseCefrResults(await AsyncStorage.getItem(CEFR_RESULTS_STORAGE_KEY)); } catch { return []; }
}

export async function recordCefrResult(r: CefrResult): Promise<CefrResult[]> {
  const merged = mergeCefrResult(await readCefrResults(), r);
  try { await AsyncStorage.setItem(CEFR_RESULTS_STORAGE_KEY, JSON.stringify(merged)); } catch {}
  return merged;
}

export type SectionMark = {
  score: number;
  marking: "ai" | "fallback";
  feedback: Record<string, string>;
};

const TIMEOUT_MS = 25000;

/**
 * Mark writing or speaking with the server's AI marker (server/cefrMark.ts).
 * Offline, slow or failing: the same pattern checks the server would fall back to
 * run here, so the learner always gets a score.
 */
export async function markSection(
  testId: CefrId,
  section: "writing" | "speaking",
  answers: WritingAnswers & { spoken: SpokenAnswers },
): Promise<SectionMark> {
  const local = (): SectionMark => ({
    score: section === "writing"
      ? fallbackWriting(CEFR_TESTS[testId], answers)
      : fallbackSpeaking(CEFR_TESTS[testId], answers.spoken),
    marking: "fallback",
    feedback: {},
  });
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
    const r = await fetch(`${API_BASE}/api/cefr/mark`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ testId, section, answers }),
      signal: ctrl.signal,
    });
    clearTimeout(timer);
    if (!r.ok) return local();
    const d: any = await r.json();
    if (typeof d?.score !== "number") return local();
    return { score: d.score, marking: d.marking === "ai" ? "ai" : "fallback", feedback: d.feedback ?? {} };
  } catch {
    return local();
  }
}

// ---------------------------------------------- end-of-level invitation (1.3.10) ---
const INVITE_KEY = "conjugately_cefr_invites_shown";

/**
 * After a Final Level Exam is passed: the CEFR-style test to invite the learner
 * to, or null. Only when that pass completes every Final Level Exam of a level
 * that has a test, the learner doesn't already own it, and the invitation has
 * never been shown for it. Marks it shown, so it appears once.
 */
export async function maybeCefrInvitation(level: string): Promise<CefrId | null> {
  try {
    const test = cefrTestForLevel(level);
    if (!test) return null;
    const id = test.id;
    const shown: string[] = JSON.parse((await AsyncStorage.getItem(INVITE_KEY)) || "[]");
    if (shown.includes(id)) return null;
    const [results, { gate }] = await Promise.all([readExamResults(), readCefrGate(id)]);
    if (gate.kind === "unlocked" || !cefrLevelExamsPassed(id, results)) return null;
    await AsyncStorage.setItem(INVITE_KEY, JSON.stringify([...shown, id]));
    return id;
  } catch {
    return null;
  }
}
