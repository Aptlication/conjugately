// Exam lengths, pass marks and blurbs are DERIVED from shared/exams.ts - the
// source of truth both surfaces read. They used to be copied here "until the
// @shared path alias is verified in the Expo build"; it is verified (app/
// matcher.tsx has shipped importing @shared/answerMatch), so the copies are
// gone. Copies are how the numbers drifted in the first place.
//
// Before 14 Sep 2026 the blurb, the units array and finalExam disagreed with
// each other: Elementary said "6 Units" for 7 units and a 60-question exam that
// was declared as 70, Intermediate said "8 Units" for 11 and 80 against 110.

import { courseBlurbFor } from "@shared/exams";
import { LEVEL_VERBS, timeFramesFor, type Level } from "@shared/levels";
import { VERB_MEANINGS } from "./data";

export type CourseUnit = { name: string; verb: string; questions: number };

const unitsFor = (level: Level): CourseUnit[] =>
  LEVEL_VERBS[level].map((verb, i) => ({
    name: `Unit ${i + 1}: ${verb} (${VERB_MEANINGS[verb] ?? ""})`, verb, questions: 20,
  }));

export const COURSES: Record<string, {
  emoji: string; title: string;
  units: CourseUnit[];
}> = {
  Beginner: {
    emoji: "⚪", title: "Beginner Course",
    units: [
      { name: "Unit 1: être (to be)", verb: "être", questions: 20 },
      { name: "Unit 2: avoir (to have)", verb: "avoir", questions: 20 },
      { name: "Unit 3: faire (to do/make)", verb: "faire", questions: 20 },
    ],
  },
  Novice: {
    emoji: "🔵", title: "Novice Course",
    units: [
      { name: "Unit 1: être (to be)", verb: "être", questions: 20 },
      { name: "Unit 2: avoir (to have)", verb: "avoir", questions: 20 },
      { name: "Unit 3: faire (to do/make)", verb: "faire", questions: 20 },
      { name: "Unit 4: aller (to go)", verb: "aller", questions: 20 },
    ],
  },
  Elementary: {
    emoji: "🟢", title: "Elementary Course",
    units: [
      { name: "Unit 1: dire (to say)", verb: "dire", questions: 20 },
      { name: "Unit 2: voir (to see)", verb: "voir", questions: 20 },
      { name: "Unit 3: savoir (to know)", verb: "savoir", questions: 20 },
      { name: "Unit 4: vouloir (to want)", verb: "vouloir", questions: 20 },
      { name: "Unit 5: venir (to come)", verb: "venir", questions: 20 },
      { name: "Unit 6: pouvoir (to be able)", verb: "pouvoir", questions: 20 },
      { name: "Unit 7: besoin (to need)", verb: "besoin", questions: 20 },
    ],
  },
  // 25 Oct 2026: Intermediate split. A = the eleven non-reflexive verbs, B = the
  // seven reflexives, both with the pluperfect (shared/levels.ts). Unit order
  // within each half is the old Intermediate order.
  "Intermediate A": {
    emoji: "🟡", title: "Intermediate A Course",
    units: unitsFor("Intermediate A"),
  },
  "Intermediate B": {
    emoji: "🟠", title: "Intermediate B Course",
    units: unitsFor("Intermediate B"),
  },
};
/**
 * Time frames a course offers. Three for most levels; Intermediate A and B add
 * the Pluperfect. (This was a constant before the 25 Oct 2026 split.)
 */
export function courseTimeFrames(level: string): string[] {
  return timeFramesFor(level);
}

/**
 * Derived, never copied. One number changes in shared/exams.ts and every blurb
 * on both surfaces follows.
 */
export function courseBlurb(level: string): string {
  return courseBlurbFor(level);
}
