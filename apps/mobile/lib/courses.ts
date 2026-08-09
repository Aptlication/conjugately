export type CourseUnit = { name: string; verb: string; questions: number };

export const COURSES: Record<string, {
  emoji: string; title: string; blurb: string;
  units: CourseUnit[]; finalExam: { questions: number; passThreshold: number; description: string };
}> = {
  Beginner: {
    emoji: "⚪", title: "Beginner Course",
    blurb: "3 Units (20 questions each) + Final Exam (30 questions, 90% to pass)",
    units: [
      { name: "Unit 1: être (to be)", verb: "être", questions: 20 },
      { name: "Unit 2: avoir (to have)", verb: "avoir", questions: 20 },
      { name: "Unit 3: faire (to do/make)", verb: "faire", questions: 20 },
    ],
    finalExam: { questions: 30, passThreshold: 27, description: "10 questions from each of the 3 verbs" },
  },
  Novice: {
    emoji: "🔵", title: "Novice Course",
    blurb: "4 Units (20 questions each) + Final Exam (40 questions, 90% to pass)",
    units: [
      { name: "Unit 1: être (to be)", verb: "être", questions: 20 },
      { name: "Unit 2: avoir (to have)", verb: "avoir", questions: 20 },
      { name: "Unit 3: faire (to do/make)", verb: "faire", questions: 20 },
      { name: "Unit 4: aller (to go)", verb: "aller", questions: 20 },
    ],
    finalExam: { questions: 40, passThreshold: 36, description: "10 questions from each of the 4 verbs" },
  },
  Elementary: {
    emoji: "🟢", title: "Elementary Course",
    blurb: "6 Units (20 questions each) + Final Exam (60 questions, 90% to pass)",
    units: [
      { name: "Unit 1: dire (to say)", verb: "dire", questions: 20 },
      { name: "Unit 2: voir (to see)", verb: "voir", questions: 20 },
      { name: "Unit 3: savoir (to know)", verb: "savoir", questions: 20 },
      { name: "Unit 4: vouloir (to want)", verb: "vouloir", questions: 20 },
      { name: "Unit 5: venir (to come)", verb: "venir", questions: 20 },
      { name: "Unit 6: pouvoir (to be able)", verb: "pouvoir", questions: 20 },
      { name: "Unit 7: besoin (to need)", verb: "besoin", questions: 20 },
    ],
    finalExam: { questions: 70, passThreshold: 63, description: "10 questions from each of the 7 verbs" },
  },
  Intermediate: {
    emoji: "🟡", title: "Intermediate Course",
    blurb: "8 Units (20 questions each) + Final Exam (80 questions, 90% to pass)",
    units: [
      { name: "Unit 1: être (to be)", verb: "être", questions: 20 },
      { name: "Unit 2: avoir (to have)", verb: "avoir", questions: 20 },
      { name: "Unit 3: faire (to do/make)", verb: "faire", questions: 20 },
      { name: "Unit 4: aller (to go)", verb: "aller", questions: 20 },
      { name: "Unit 5: voir (to see)", verb: "voir", questions: 20 },
      { name: "Unit 6: dire (to say)", verb: "dire", questions: 20 },
      { name: "Unit 7: pouvoir (can/to be able)", verb: "pouvoir", questions: 20 },
      { name: "Unit 8: vouloir (to want)", verb: "vouloir", questions: 20 },
      { name: "Unit 9: prendre (to take)", verb: "prendre", questions: 20 },
      { name: "Unit 10: venir (to come)", verb: "venir", questions: 20 },
      { name: "Unit 11: savoir (to know)", verb: "savoir", questions: 20 },
    ],
    finalExam: { questions: 110, passThreshold: 99, description: "10 questions from each verb" },
  },
};
export const COURSE_TIME_FRAMES = ["Present", "Past", "Future"];
