/**
 * CEFR-style tests: scoring (1.2.5). Pure functions, shared by the app and server.
 *
 * Listening and reading are multiple choice: each section's questions share its
 * 25 points equally. Writing and speaking are marked by AI against the rubric
 * (server/cefrMark.ts). The pattern checks here are the offline fallback, and they
 * also fix the maximum for each rubric line, which the server clamps to.
 *
 * Pass: total >= 50 AND every section >= 5. That's the official A1/A2/B1 rule.
 * Keep it apart from the 90% Final Level Exam gate: two different scales.
 */
import {
  CEFR_PASS_TOTAL, CEFR_SECTION_MAX, CEFR_SECTION_MIN,
  type CefrId, type CefrRubricLine, type CefrSpeakingPart, type CefrTest, type CefrWritingTask,
} from "./cefrTests";

export type CefrSection = "listening" | "reading" | "writing" | "speaking";
export const CEFR_SECTIONS: CefrSection[] = ["listening", "reading", "writing", "speaking"];

/** Lower-case, strip accents, straighten apostrophes, collapse spaces. Rubric regexes expect this. */
export function normaliseForMarking(s: string | undefined | null): string {
  return String(s ?? "")
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[’`]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function wordCount(s: string | undefined | null): number {
  const t = normaliseForMarking(s);
  return t ? t.split(" ").length : 0;
}

/** Answers keyed "<docId>-<questionIndex>" -> chosen option index. */
export type McqAnswers = Record<string, number>;

export function mcqScore(docs: { id: string; questions: { answer: number }[] }[], answers: McqAnswers): number {
  let right = 0, n = 0;
  for (const d of docs) d.questions.forEach((q, i) => { n++; if (answers[`${d.id}-${i}`] === q.answer) right++; });
  return n ? (right * CEFR_SECTION_MAX) / n : 0;
}

export function rubricLinePasses(line: CefrRubricLine, normalised: string): boolean {
  if ("all" in line) return line.all.every((re) => new RegExp(re).test(normalised));
  const m = normalised.match(new RegExp(line.count, "g"));
  return !!m && m.length >= line.min;
}

/** Points for the length line: full at minWords, half at 60% of it. */
export function lengthPoints(task: NonNullable<CefrWritingTask["text"]>, text: string): number {
  const w = wordCount(text);
  return w >= task.minWords ? task.lengthPoints : w >= task.minWords * 0.6 ? task.lengthPoints / 2 : 0;
}

export interface WritingAnswers { fields: Record<string, string>; texts: Record<string, string> }

/** Offline fallback for one writing task. AI marking replaces the rubric part, never the form or length parts. */
export function fallbackWritingTask(task: CefrWritingTask, a: WritingAnswers): number {
  let s = 0;
  if (task.form) for (const f of task.form.fields) if (normaliseForMarking(a.fields[`${task.id}-${f.k}`]).length >= 2) s += task.form.pointsPerField;
  if (task.text) {
    const raw = a.texts[task.id] ?? "";
    s += lengthPoints(task.text, raw);
    const t = normaliseForMarking(raw);
    if (t) for (const line of task.text.rubric) if (rubricLinePasses(line, t)) s += line.points;
  }
  return Math.min(task.max, s);
}

export function fallbackWriting(test: CefrTest, a: WritingAnswers): number {
  return Math.min(CEFR_SECTION_MAX, test.writing.reduce((n, t) => n + fallbackWritingTask(t, a), 0));
}

/** Spoken answers keyed "<partId>-<itemIndex>". */
export type SpokenAnswers = Record<string, string>;

/** Generous, like the conversations: every target structure = full; some, or a 3-word attempt = half. */
export function fallbackSpeakingItem(part: CefrSpeakingPart, index: number, raw: string | undefined): number {
  const item = part.items[index];
  const t = normaliseForMarking(raw);
  if (!t) return 0;
  const hit = item.need.filter((re) => new RegExp(re).test(t)).length;
  let got = hit === item.need.length ? part.pointsPerItem : (hit > 0 || wordCount(raw) >= 3) ? part.pointsPerItem / 2 : 0;
  if (item.minWords && wordCount(raw) < item.minWords) got = Math.min(got, part.pointsPerItem / 2);
  return got;
}

export function fallbackSpeaking(test: CefrTest, spoken: SpokenAnswers): number {
  let s = 0;
  for (const p of test.speaking) p.items.forEach((_, i) => { s += fallbackSpeakingItem(p, i, spoken[`${p.id}-${i}`]); });
  return Math.min(CEFR_SECTION_MAX, s);
}

export type SectionScores = Record<CefrSection, number>;

export interface CefrOutcome {
  scores: SectionScores;
  total: number;
  passed: boolean;
  /** Sections under the 5/25 minimum. */
  weak: CefrSection[];
}

export function outcome(scores: SectionScores): CefrOutcome {
  const clamped = Object.fromEntries(
    CEFR_SECTIONS.map((k) => [k, Math.max(0, Math.min(CEFR_SECTION_MAX, scores[k] ?? 0))]),
  ) as SectionScores;
  const total = CEFR_SECTIONS.reduce((n, k) => n + clamped[k], 0);
  const weak = CEFR_SECTIONS.filter((k) => clamped[k] < CEFR_SECTION_MIN);
  return { scores: clamped, total, passed: total >= CEFR_PASS_TOTAL && weak.length === 0, weak };
}

/** Section maxima, so content edits can be checked to add up to 25 each. */
export function sectionMaxima(test: CefrTest): SectionScores {
  const writing = test.writing.reduce((n, t) => n + t.max, 0);
  const speaking = test.speaking.reduce((n, p) => n + p.pointsPerItem * p.items.length, 0);
  return { listening: CEFR_SECTION_MAX, reading: CEFR_SECTION_MAX, writing, speaking };
}

export interface CefrResult {
  testId: CefrId;
  scores: SectionScores;
  total: number;
  passed: boolean;
  /** "ai" when writing and speaking came back from the marker, "fallback" otherwise. */
  marking: "ai" | "fallback";
  takenAt: string;
}

/** Keep every attempt's best per test; a pass is never overwritten by a later fail. */
export function mergeCefrResult(existing: CefrResult[], r: CefrResult): CefrResult[] {
  const prev = existing.find((x) => x.testId === r.testId);
  const keep = !prev ? r
    : prev.passed && !r.passed ? prev
    : !prev.passed && r.passed ? r
    : r.total >= prev.total ? r : prev;
  return [...existing.filter((x) => x.testId !== r.testId), keep];
}

export function parseCefrResults(raw: string | null | undefined): CefrResult[] {
  try {
    const v = JSON.parse(raw || "[]");
    return Array.isArray(v) ? v.filter((x) => x && typeof x.testId === "string" && typeof x.total === "number") : [];
  } catch {
    return [];
  }
}

export function hasCefrBadge(results: CefrResult[], id: CefrId): boolean {
  return results.some((r) => r.testId === id && r.passed);
}
