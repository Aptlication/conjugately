import AsyncStorage from "@react-native-async-storage/async-storage";
import { getExam, type ExamResult } from "@shared/exams";
import { LEVELS, TENSES, timeFramesFor } from "@shared/levels";
import { cefrTestForLevel, type CefrId } from "@shared/cefrTests";
import { hasCefrBadge, type CefrResult } from "@shared/cefrScoring";
import { COURSES } from "./courses";
import { getCourseProgress, type CourseProgress } from "./progress";
import { getTenseConversation } from "./conversationsFull";

/**
 * Milestones (plan of 31 Oct 2026, approved by Jonathan): Unit → Tense → Level.
 *
 *  - A TENSE is complete when every unit of it has been done. The Tense
 *    Conversation does not count towards it; it is the reward.
 *  - A LEVEL is complete when every tense of it is complete.
 *  - Each is celebrated once: a "Tense complete" card, then a "Level complete"
 *    banner carrying the invitation to the Final Level Exams (the per-tense
 *    exam pop-up after a quiz is gone). After the last exam, the existing CEFR
 *    invite in quiz.tsx takes over.
 *
 * The celebration is shown when the learner comes back to Mini-Courses, My
 * Journey or the home screen, so it never cuts across a unit's quiz,
 * conversation or vocab check.
 *
 * Learners who already finished tenses before this update are seeded as
 * celebrated on first read, so the update doesn't greet them with a stack of
 * banners. A seeded tense (or level) becomes due again the next time the learner
 * finishes one of its units (noteUnitFinished): that is the natural moment to
 * show it, and the only way they'd meet the Tense Conversation otherwise.
 * (Fixed 31 Oct 2026: Jonathan redid the last unit of a tense he'd finished
 * before the update and saw nothing.)
 */

const KEY = "pluri_milestones";

export type Milestones = {
  tenseCelebrated: string[];
  levelCelebrated: string[];
  /** "Level|TimeFrame" → ISO date the Tense Conversation was finished. */
  tenseConvoDone: Record<string, string>;
  /** Tenses and levels marked celebrated only because they were done before the update. */
  seeded: string[];
};

const tenseKey = (level: string, timeFrame: string) => `${level}|${timeFrame}`;

export function tenseStatus(prog: CourseProgress, level: string, timeFrame: string) {
  const total = COURSES[level]?.units.length ?? 0;
  const done = (prog[tenseKey(level, timeFrame)]?.completedUnits ?? []).filter((i) => i < total).length;
  return { done, total, complete: total > 0 && done >= total };
}

export function levelComplete(prog: CourseProgress, level: string): boolean {
  return timeFramesFor(level).every((tf) => tenseStatus(prog, level, tf).complete);
}

async function save(m: Milestones) {
  try { await AsyncStorage.setItem(KEY, JSON.stringify(m)); } catch {}
}

export async function getMilestones(): Promise<Milestones> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw) {
      const m = JSON.parse(raw);
      return { tenseCelebrated: m.tenseCelebrated ?? [], levelCelebrated: m.levelCelebrated ?? [], tenseConvoDone: m.tenseConvoDone ?? {}, seeded: m.seeded ?? [] };
    }
  } catch {}
  // First read after the update: what is already finished counts as celebrated.
  const prog = await getCourseProgress();
  const m: Milestones = { tenseCelebrated: [], levelCelebrated: [], tenseConvoDone: {}, seeded: [] };
  for (const level of LEVELS) {
    for (const tf of timeFramesFor(level)) if (tenseStatus(prog, level, tf).complete) {
      m.tenseCelebrated.push(tenseKey(level, tf)); m.seeded.push(tenseKey(level, tf));
    }
    if (levelComplete(prog, level)) { m.levelCelebrated.push(level); m.seeded.push(level); }
  }
  await save(m);
  return m;
}

export type Celebration = { kind: "tense"; level: string; timeFrame: string } | { kind: "level"; level: string };

/**
 * The next celebration due, marked as shown before it is returned, so two
 * screens gaining focus at once can't both open it. Tense before level: the
 * tense card's Continue returns to the screen underneath, whose focus then
 * opens the level banner.
 */
export async function claimNextCelebration(): Promise<Celebration | null> {
  const m = await getMilestones();
  const prog = await getCourseProgress();
  const tenses = LEVELS.flatMap((level) => timeFramesFor(level).map((tf) => ({ level, tf, key: tenseKey(level, tf) })))
    .filter((t) => tenseStatus(prog, t.level, t.tf).complete && !m.tenseCelebrated.includes(t.key))
    .sort((a, b) => (prog[b.key]?.updatedAt || "").localeCompare(prog[a.key]?.updatedAt || ""));
  if (tenses.length) {
    const t = tenses[0];
    m.tenseCelebrated.push(t.key);
    await save(m);
    return { kind: "tense", level: t.level, timeFrame: t.tf };
  }
  const level = LEVELS.find((l) => levelComplete(prog, l) && !m.levelCelebrated.includes(l));
  if (level) {
    m.levelCelebrated.push(level);
    await save(m);
    return { kind: "level", level };
  }
  return null;
}

/**
 * After a course unit's quiz is recorded: a tense (and its level) that was only
 * seeded as celebrated becomes due, so the Tense complete card (and, if the
 * level is done, the Level complete banner) shows once when the learner returns.
 */
export async function noteUnitFinished(level: string, timeFrame: string) {
  const m = await getMilestones();
  const key = tenseKey(level, timeFrame);
  const unseed = (k: string, list: string[]) => {
    if (!m.seeded.includes(k)) return list;
    m.seeded = m.seeded.filter((x) => x !== k);
    return list.filter((x) => x !== k);
  };
  const before = m.seeded.length;
  m.tenseCelebrated = unseed(key, m.tenseCelebrated);
  m.levelCelebrated = unseed(level, m.levelCelebrated);
  if (m.seeded.length !== before) await save(m);
}

export async function markTenseConversationDone(level: string, timeFrame: string) {
  const m = await getMilestones();
  m.tenseConvoDone[tenseKey(level, timeFrame)] = new Date().toISOString();
  await save(m);
}

// ------------------------------------------------------------ the route ---

export type RouteTense = {
  timeFrame: string; label: string; done: number; total: number; complete: boolean;
  hasConversation: boolean; conversationDone: boolean; examPassed: boolean;
};
export type RouteLevel = {
  level: string; state: "complete" | "current" | "todo";
  verbs: number; tenses: RouteTense[];
  examsPassed: number; examsTotal: number;
  cefr: CefrId | null; cefrEarned: boolean;
  /** What finishing this level leads to. */
  leadsTo: string;
};

/**
 * My Journey's route: every level, where the learner is, where they've been,
 * and where they're going. "Current" is the first level not complete, or the
 * level of the most recent unit when the learner has jumped ahead.
 */
export function buildRoute(prog: CourseProgress, m: Milestones, exams: ExamResult[], cefr: CefrResult[]): RouteLevel[] {
  const latest = Object.entries(prog)
    .filter(([, e]) => e.completedUnits.length > 0)
    .sort((a, b) => (b[1].updatedAt || "").localeCompare(a[1].updatedAt || ""))[0];
  const latestLevel = latest?.[0].split("|")[0];
  const firstOpen = LEVELS.find((l) => !levelComplete(prog, l));
  const current = latestLevel && !levelComplete(prog, latestLevel) ? latestLevel : firstOpen;
  return LEVELS.map((level, i) => {
    const tenses = timeFramesFor(level).map((tf) => {
      const s = tenseStatus(prog, level, tf);
      const exam = getExam(level, tf);
      return {
        timeFrame: tf, label: TENSES[tf].label, ...s,
        hasConversation: !!getTenseConversation(level, tf),
        conversationDone: !!m.tenseConvoDone[tenseKey(level, tf)],
        examPassed: !!exam && exams.some((r) => r.examId === exam.id && r.passed),
      };
    });
    const test = cefrTestForLevel(level);
    const next = LEVELS[i + 1];
    return {
      level,
      state: levelComplete(prog, level) ? "complete" : level === current ? "current" : "todo",
      verbs: COURSES[level]?.units.length ?? 0,
      tenses,
      examsPassed: tenses.filter((t) => t.examPassed).length,
      examsTotal: tenses.filter((t) => getExam(level, t.timeFrame)).length,
      cefr: test?.id ?? null,
      cefrEarned: !!test && hasCefrBadge(cefr, test.id),
      leadsTo: test ? `CEFR-style ${test.id} test${level === "Intermediate B" ? " · Guarantee" : ""}` : next ? `On to ${next}` : "",
    };
  });
}
