import AsyncStorage from "@react-native-async-storage/async-storage";
import { LEXICON_POOL } from "@shared/advanced/content";
import type { LexEntry } from "@shared/advanced/types";
import { API_BASE } from "./data";
import { decide, fallbackUnderstood, type Verdict } from "@shared/advanced/marking";
import { advancedUnit } from "@shared/advanced/content";

/**
 * Advanced A (pilot, 1 Nov 2026): progress, words and marking for the
 * reading units. Content lives in shared/advanced/ (generated from
 * scripts/data/advanced-*.json).
 */

export const ADVANCED_LEVEL = "Advanced A";

// ── Progress ────────────────────────────────────────────────────────────────

const PROGRESS_KEY = "advanced_progress";
export type UnitResult = { completedAt: string; coins: number; answered: number; withHelp: number };
type Progress = Record<string, UnitResult>;

export async function readAdvancedProgress(): Promise<Progress> {
  try { return JSON.parse((await AsyncStorage.getItem(PROGRESS_KEY)) || "{}"); } catch { return {}; }
}

export async function saveUnitResult(unitId: string, r: Omit<UnitResult, "completedAt">) {
  const p = await readAdvancedProgress();
  const best = p[unitId];
  // Keep the best run's coins; always record that the unit is done.
  p[unitId] = { completedAt: new Date().toISOString(), ...r, coins: Math.max(r.coins, best?.coins ?? 0) };
  try { await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(p)); } catch {}
}

// ── Words ───────────────────────────────────────────────────────────────────

/** A word as the Words step and My Words see it. */
export type AdvWord = { fr: string; en: string; emoji?: string; pos?: string; gender?: "m" | "f"; mine: boolean };

export const wordId = (fr: string) => fr.trim().toLowerCase();

/** Four English options for a word: its meaning and three from other words of the same kind. */
export function wordOptions(w: AdvWord): string[] {
  const same = LEXICON_POOL.filter((e) => e.en !== w.en && (!w.pos || e.pos === w.pos));
  const pool = same.length >= 3 ? same : LEXICON_POOL.filter((e) => e.en !== w.en);
  const picks: string[] = [];
  let guard = 0;
  while (picks.length < 3 && guard++ < 200) {
    const e = pool[Math.floor(Math.random() * pool.length)];
    if (e && !picks.includes(e.en) && e.en !== w.en) picks.push(e.en);
  }
  const all = [w.en, ...picks];
  for (let i = all.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [all[i], all[j]] = [all[j], all[i]]; }
  return all;
}

export const fromLex = (e: LexEntry, mine = true): AdvWord =>
  ({ fr: e.fr, en: e.en, emoji: e.emoji, pos: e.pos, gender: e.gender, mine });

const VOCAB_KEY = "conjugately_vocabulary";

/**
 * Put words in the Vocabulary screen ("My Words"), tagged with the unit.
 * `status` "mastered" for words learnt on the spot, "new" for words sent there
 * to study later. A word already in the list is updated, never duplicated.
 */
export async function addToMyWords(words: AdvWord[], unitId: string, status: "new" | "mastered") {
  if (!words.length) return;
  try {
    let list: any[] = [];
    try { list = JSON.parse((await AsyncStorage.getItem(VOCAB_KEY)) || "[]"); } catch {}
    const now = new Date().toISOString();
    for (const [i, w] of words.entries()) {
      const hit = list.find((x) => wordId(x.french || "") === wordId(w.fr));
      if (hit) { if (status === "mastered") hit.status = "mastered"; continue; }
      list.unshift({
        id: `${Date.now()}-${i}-${Math.random().toString(36).slice(2, 7)}`,
        french: w.fr, english: w.en, verb: `Article ${unitId}`, tense: "Lecture", difficulty: ADVANCED_LEVEL,
        status, timesCorrect: status === "mastered" ? 1 : 0, timesIncorrect: 0, createdAt: now, source: "advanced",
      });
    }
    await AsyncStorage.setItem(VOCAB_KEY, JSON.stringify(list.slice(0, 1500)));
  } catch {}
}

// ── The reading tip ─────────────────────────────────────────────────────────

const TIP_KEY = "advanced_read_tip_off";
export async function readTipOff(): Promise<boolean> {
  try { return (await AsyncStorage.getItem(TIP_KEY)) === "1"; } catch { return false; }
}
export async function turnReadTipOff() {
  try { await AsyncStorage.setItem(TIP_KEY, "1"); } catch {}
}

// ── Marking ─────────────────────────────────────────────────────────────────

export type MarkOutcome = { verdict: Verdict; feedback: string; corrected: string; marking: "ai" | "fallback" };

/**
 * Judge a spoken answer: the server's AI decides whether the meaning came
 * across (generously); the app counts sentences. Offline, or if the server is
 * slow, the key-word check stands in so the conversation never stalls.
 */
export async function markAnswer(unitId: string, q: number, answer: string): Promise<MarkOutcome> {
  const question = advancedUnit(unitId)?.questions[q];
  const offline = (): MarkOutcome => ({
    verdict: decide(answer, question ? fallbackUnderstood(question, answer) : true),
    feedback: "", corrected: "", marking: "fallback",
  });
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 9000);
    const r = await fetch(`${API_BASE}/api/advanced/mark`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ unitId, q, answer }), signal: ctl.signal,
    });
    clearTimeout(t);
    if (!r.ok) return offline();
    const d: any = await r.json();
    if (typeof d?.understood !== "boolean") return offline();
    return { verdict: decide(answer, d.understood), feedback: d.feedback || "", corrected: d.corrected || "", marking: d.marking === "ai" ? "ai" : "fallback" };
  } catch {
    return offline();
  }
}
