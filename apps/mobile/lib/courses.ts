// Exam lengths, pass marks and blurbs are DERIVED from shared/exams.ts - the
// source of truth both surfaces read. They used to be copied here "until the
// @shared path alias is verified in the Expo build"; it is verified (app/
// matcher.tsx has shipped importing @shared/answerMatch), so the copies are
// gone. Copies are how the numbers drifted in the first place.
//
// Before 14 Sep 2026 the blurb, the units array and finalExam disagreed with
// each other: Elementary said "6 Units" for 7 units and a 60-question exam that
// was declared as 70, Intermediate said "8 Units" for 11 and 80 against 110.

import { getExam, EXAM_PASS_RATIO } from "@shared/exams";

export type CourseUnit = { name: string; verb: string; questions: number };

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
  Intermediate: {
    emoji: "🟡", title: "Intermediate Course",
    // CORRECTED 24 Sep. These were être/avoir/faire/aller/voir/dire/pouvoir/
    // vouloir/prendre/venir/savoir - the Beginner and Novice verbs - so the
    // course taught one set of eleven and the exam tested a different set.
    // Now the eighteen verbs of EXAM_VERB_SETS.Intermediate, in the same order.
    units: [
      { name: "Unit 1: s'intéresser (to be interested)", verb: "s'intéresser", questions: 20 },
      { name: "Unit 2: se débrouiller (to manage / to cope)", verb: "se débrouiller", questions: 20 },
      { name: "Unit 3: s'ennuyer (to be bored)", verb: "s'ennuyer", questions: 20 },
      { name: "Unit 4: s'entraîner (to train)", verb: "s'entraîner", questions: 20 },
      { name: "Unit 5: se souvenir (to remember)", verb: "se souvenir", questions: 20 },
      { name: "Unit 6: s'adapter (to adapt)", verb: "s'adapter", questions: 20 },
      { name: "Unit 7: se réjouir (to rejoice)", verb: "se réjouir", questions: 20 },
      { name: "Unit 8: mettre (to put)", verb: "mettre", questions: 20 },
      { name: "Unit 9: trouver (to find)", verb: "trouver", questions: 20 },
      { name: "Unit 10: croire (to believe)", verb: "croire", questions: 20 },
      { name: "Unit 11: parler (to speak)", verb: "parler", questions: 20 },
      { name: "Unit 12: prendre (to take)", verb: "prendre", questions: 20 },
      { name: "Unit 13: lire (to read)", verb: "lire", questions: 20 },
      { name: "Unit 14: écrire (to write)", verb: "écrire", questions: 20 },
      { name: "Unit 15: ouvrir (to open)", verb: "ouvrir", questions: 20 },
      { name: "Unit 16: fermer (to close)", verb: "fermer", questions: 20 },
      { name: "Unit 17: perdre (to lose)", verb: "perdre", questions: 20 },
      { name: "Unit 18: garder (to keep)", verb: "garder", questions: 20 },
    ],
  },
};
export const COURSE_TIME_FRAMES = ["Present", "Past", "Future"];

/**
 * Derived, never copied. One number changes in shared/exams.ts and every blurb
 * on both surfaces follows.
 */
export function courseBlurb(level: string): string {
  const units = COURSES[level]?.units.length ?? 0;
  const exam = getExam(level, "Present");
  if (!exam) return `${units} Units (20 questions each)`;
  return `${units} Units (20 questions each) + Final Level Exam ` +
    `(${exam.totalQuestions} questions, ${Math.round(EXAM_PASS_RATIO * 100)}% to pass)`;
}
