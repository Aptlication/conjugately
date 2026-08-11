import AsyncStorage from "@react-native-async-storage/async-storage";
import { COURSES } from "./courses";

const QUIZ_KEY = "conjugately_quiz_history";
const COURSE_KEY = "conjugately_course_progress";

export type QuizResult = {
  verb: string; difficulty: string; timeFrame: string;
  score: number; total: number; date: string;
  courseKey?: string; unitIndex?: number;
};

export type CourseProgress = Record<string, {
  completedUnits: number[]; totalUnits: number; updatedAt: string;
}>;

export async function getQuizHistory(): Promise<QuizResult[]> {
  try { return JSON.parse((await AsyncStorage.getItem(QUIZ_KEY)) || "[]"); }
  catch { return []; }
}

export async function logQuizResult(r: QuizResult) {
  try {
    const h = await getQuizHistory();
    h.push(r);
    await AsyncStorage.setItem(QUIZ_KEY, JSON.stringify(h.slice(-200)));
    if (r.courseKey !== undefined && r.unitIndex !== undefined && r.score / Math.max(1, r.total) >= 0.7) {
      await markUnitComplete(r.courseKey, r.unitIndex);
    }
  } catch {}
}

export async function getCourseProgress(): Promise<CourseProgress> {
  try { return JSON.parse((await AsyncStorage.getItem(COURSE_KEY)) || "{}"); }
  catch { return {}; }
}

export async function markUnitComplete(courseKey: string, unitIndex: number) {
  try {
    const p = await getCourseProgress();
    const level = courseKey.split("|")[0];
    const totalUnits = COURSES[level]?.units.length ?? 0;
    const entry = p[courseKey] || { completedUnits: [], totalUnits, updatedAt: "" };
    if (!entry.completedUnits.includes(unitIndex)) entry.completedUnits.push(unitIndex);
    entry.totalUnits = totalUnits;
    entry.updatedAt = new Date().toISOString();
    p[courseKey] = entry;
    await AsyncStorage.setItem(COURSE_KEY, JSON.stringify(p));
  } catch {}
}

export type JourneySummary = {
  quizzes: number; avgPct: number; streakDays: number;
  overallCoursePct: number;
  courses: { key: string; label: string; pct: number }[];
  nextStep: { courseKey: string; label: string; unitIndex: number; unitName: string; verb: string; level: string; timeFrame: string } | null;
  highestLevelTouched: string | null;
};

export async function getJourneySummary(): Promise<JourneySummary> {
  const hist = await getQuizHistory();
  const prog = await getCourseProgress();
  const quizzes = hist.length;
  const avgPct = quizzes
    ? Math.round(hist.reduce((n, r) => n + (r.score / Math.max(1, r.total)) * 100, 0) / quizzes)
    : 0;
  const days = new Set(hist.map((r) => r.date.slice(0, 10)));
  let streakDays = 0;
  const d = new Date();
  for (;;) {
    const key = d.toISOString().slice(0, 10);
    if (days.has(key)) { streakDays++; d.setDate(d.getDate() - 1); }
    else break;
  }
  const courses = Object.entries(prog).map(([key, e]) => {
    const [level, tf] = key.split("|");
    return { key, label: `${level} · ${tf}`, pct: e.totalUnits ? Math.round((e.completedUnits.length / e.totalUnits) * 100) : 0 };
  });
  const overallCoursePct = courses.length
    ? Math.round(courses.reduce((n, c) => n + c.pct, 0) / courses.length)
    : 0;
  let nextStep: JourneySummary["nextStep"] = null;
  const inProgress = Object.entries(prog)
    .filter(([, e]) => e.completedUnits.length > 0 && e.completedUnits.length < e.totalUnits)
    .sort((a, b) => (b[1].updatedAt || "").localeCompare(a[1].updatedAt || ""));
  if (inProgress.length) {
    const [key, e] = inProgress[0];
    const [level, timeFrame] = key.split("|");
    const units = COURSES[level]?.units || [];
    const idx = units.findIndex((_, i) => !e.completedUnits.includes(i));
    if (idx >= 0) {
      nextStep = { courseKey: key, label: `${level} · ${timeFrame}`, unitIndex: idx,
        unitName: units[idx].name, verb: units[idx].verb, level, timeFrame };
    }
  }
  const ORDER = ["Beginner", "Novice", "Elementary", "Intermediate"];
  const touched = hist.map((r) => r.difficulty).filter(Boolean);
  const highestLevelTouched = touched.length
    ? ORDER[Math.max(...touched.map((t) => ORDER.indexOf(t)).filter((i) => i >= 0))] ?? null
    : null;
  return { quizzes, avgPct, streakDays, overallCoursePct, courses, nextStep, highestLevelTouched };
}
