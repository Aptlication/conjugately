import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as StoreReview from "expo-store-review";

/**
 * App Store review prompt (1.2.4.4, 25 Oct 2026).
 *
 * Apple's own rating sheet, shown at the end of a good moment: after a passed
 * course unit or a finished Final conversation. Never from a button, never
 * during an exam, and never over another prompt or a screen change — so the
 * unit pass is only *noted* when the quiz ends, and the sheet is asked for
 * where the unit's flow comes to rest (the vocab check's last card, the
 * conversation's "complete" card, or the results screen when nothing follows).
 *
 * Apple shows the sheet at most three times a year and may show nothing at all;
 * on TestFlight it never appears (isAvailableAsync is false there). On top of
 * that we ask only:
 *   - once the learner has passed at least MIN_PASSED_UNITS units,
 *   - at most once per app version,
 *   - and not within MIN_DAYS_BETWEEN days of the last ask.
 */

const KEY = "conjugately_review_prompt";
const MIN_PASSED_UNITS = 3;
const MIN_DAYS_BETWEEN = 30;
/** A unit counts as passed at 80%: 16 of 20. */
export const UNIT_PASS_RATIO = 0.8;

type State = {
  passedUnits: number;
  /** A unit was passed and its flow has not yet reached a resting point. */
  pending: boolean;
  askedVersions: string[];
  lastAskedAt?: string;
};

async function read(): Promise<State> {
  try {
    const s = JSON.parse((await AsyncStorage.getItem(KEY)) || "{}");
    return {
      passedUnits: typeof s.passedUnits === "number" ? s.passedUnits : 0,
      pending: !!s.pending,
      askedVersions: Array.isArray(s.askedVersions) ? s.askedVersions : [],
      lastAskedAt: typeof s.lastAskedAt === "string" ? s.lastAskedAt : undefined,
    };
  } catch {
    return { passedUnits: 0, pending: false, askedVersions: [] };
  }
}
async function write(s: State) {
  try { await AsyncStorage.setItem(KEY, JSON.stringify(s)); } catch {}
}

/** Call when a course-unit quiz ends. Exams never call this. */
export async function noteUnitResult(correct: number, total: number) {
  if (total <= 0 || correct / total < UNIT_PASS_RATIO) return;
  const s = await read();
  await write({ ...s, passedUnits: s.passedUnits + 1, pending: true });
}

let asking = false;

/**
 * Call where a unit's flow comes to rest. "unit" asks only if a pass is
 * pending; "conversation" (a finished Final conversation) is a moment in itself.
 */
export async function maybeAskForReview(moment: "unit" | "conversation") {
  if (asking) return;
  asking = true;
  try {
    const s = await read();
    if (moment === "unit" && !s.pending) return;
    // The moment is used up either way, so a later screen doesn't re-ask for it.
    const next: State = { ...s, pending: false };
    const version = Constants.expoConfig?.version ?? "unknown";
    const daysSince = s.lastAskedAt ? (Date.now() - Date.parse(s.lastAskedAt)) / 86_400_000 : Infinity;
    const eligible = s.passedUnits >= MIN_PASSED_UNITS
      && !s.askedVersions.includes(version)
      && daysSince >= MIN_DAYS_BETWEEN;
    if (!eligible || !(await StoreReview.isAvailableAsync()) || !(await StoreReview.hasAction())) {
      await write(next);
      return;
    }
    await write({ ...next, askedVersions: [...s.askedVersions, version], lastAskedAt: new Date().toISOString() });
    // Let the "complete" card settle on screen first.
    await new Promise((r) => setTimeout(r, 1200));
    await StoreReview.requestReview();
  } catch {
    // A review prompt must never break the lesson.
  } finally {
    asking = false;
  }
}
