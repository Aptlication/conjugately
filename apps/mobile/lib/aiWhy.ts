import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from "./data";

/**
 * AI WHY client. The server (server/aiWhy.ts) writes the explanation, caches
 * it, and voices it on request. This file only asks.
 */

export type Tutor = "cecile" | "maxime";
export const TUTOR_NAMES: Record<Tutor, string> = { cecile: "Cécile", maxime: "Maxime" };
export const DEFAULT_TUTOR: Tutor = "cecile";
export const MAX_FOLLOWUPS = 3;
const TUTOR_KEY = "aiWhyTutor";

export async function getTutor(): Promise<Tutor> {
  try {
    const v = await AsyncStorage.getItem(TUTOR_KEY);
    return v === "maxime" || v === "cecile" ? v : DEFAULT_TUTOR;
  } catch { return DEFAULT_TUTOR; }
}

export async function saveTutor(t: Tutor): Promise<void> {
  try { await AsyncStorage.setItem(TUTOR_KEY, t); } catch {}
}

export type WhyRequest = {
  question: string;
  hint?: string;
  level?: string;
  tense?: string;
  options: { text: string; isCorrect: boolean }[];
  selectedIndex: number;
};

export type WhyResult = { key: string; text: string };

// One explanation per question per session: reopening it costs nothing.
const memo = new Map<string, Promise<WhyResult>>();

async function postJson(path: string, body: unknown) {
  const r = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let data: any = null;
  try { data = await r.json(); } catch {}
  if (!r.ok) throw new Error(data?.error || "AI WHY is unavailable right now. Please try again.");
  return data;
}

export function fetchWhy(req: WhyRequest): Promise<WhyResult> {
  const id = JSON.stringify(req);
  let p = memo.get(id);
  if (!p) {
    p = postJson("/api/why", req).then((d) => ({ key: d.key, text: d.text }));
    p.catch(() => memo.delete(id));
    memo.set(id, p);
  }
  return p;
}

export function whyAudioUrl(key: string, tutor: Tutor): string {
  return `${API_BASE}/api/why/audio/${key}?voice=${tutor}`;
}

export type FollowUp = { q: string; a: string };

export async function askFollowup(key: string, question: string, history: FollowUp[]): Promise<{ text: string; remaining: number }> {
  const d = await postJson("/api/why/followup", { key, question, history });
  return { text: d.text, remaining: d.remaining };
}

/** Splits "… Option B, … Option A …" so the letters can be bolded. */
export function splitOptions(text: string): { text: string; letter?: string }[] {
  return text.split(/(Option [A-D])/g).filter(Boolean).map((t) => {
    const m = /^Option ([A-D])$/.exec(t);
    return m ? { text: t, letter: m[1] } : { text: t };
  });
}
