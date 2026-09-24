import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  EXAM_RESULTS_STORAGE_KEY,
  parseExamResults,
  selectExamQuestions,
  upsertExamResult,
  type ExamDefinition,
  type ExamResult,
} from "@shared/exams";
import { shuffle } from "@shared/shuffle";
import { API_BASE } from "./data";

/**
 * The app half of 1.1.1.
 *
 * Deliberately thin. Every decision an exam makes - which verbs, how many
 * questions from each, which tense, the pass mark, which questions are picked
 * from a verb pool - lives in shared/exams.ts and is read by both surfaces.
 * Nothing here re-derives a number the website also computes; that duplication
 * is what produced the 180-question Intermediate exam recorded as 110.
 *
 * The one genuine difference is storage: AsyncStorage rather than localStorage.
 * The key and the record shape are identical, so a future account sync sees one
 * format, not two.
 */

/**
 * Assemble an exam. Requests run in parallel and the whole thing fails loudly
 * if any one of them does.
 *
 * On the website this was defect 4: N sequential fetches where a dropped
 * request was silently skipped, so the learner sat a SHORTER exam and the 90%
 * gate was computed against however many questions happened to arrive. On a
 * phone, on mobile data, that is not hypothetical.
 */
export async function loadExamQuestions(exam: ExamDefinition): Promise<any[]> {
  const perVerb = await Promise.all(
    exam.verbs.map(async (verb) => {
      const r = await fetch(`${API_BASE}/api/get-quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          verb,
          timeFrame: exam.apiTimeFrame,
          tenseType: exam.tense,
          difficulty: exam.level,
          isExam: true,
        }),
      });
      if (!r.ok) throw new Error(`${verb}: server returned ${r.status}`);
      const data = await r.json();
      if (!data?.success) throw new Error(`${verb}: ${data?.error || "quiz generation failed"}`);

      const returned = data.quiz?.questions || [];
      if (returned.length < exam.questionsPerVerb) {
        throw new Error(`${verb}: received ${returned.length} of ${exam.questionsPerVerb} questions`);
      }

      // Person-stratified, not the first n off a shuffled pool. The pools are
      // lopsided - tu and vous appear once or twice in twenty - so an
      // unweighted sample left 40% of verbs never testing tu.
      const picked = selectExamQuestions(
        returned,
        exam.questionsPerVerb,
        (q: any) => (q.answerOptions || []).find((o: any) => o.isCorrect)?.text || "",
      );

      return picked.map((q: any) => ({ ...q, _verb: verb, _tensePath: exam.tensePath }));
    }),
  );

  const all = perVerb.flat();
  if (all.length !== exam.totalQuestions) {
    throw new Error(`assembled ${all.length} questions, expected ${exam.totalQuestions}`);
  }
  return shuffle(all);
}

export async function readExamResults(): Promise<ExamResult[]> {
  try {
    return parseExamResults(await AsyncStorage.getItem(EXAM_RESULTS_STORAGE_KEY));
  } catch {
    return [];
  }
}

/**
 * Record an attempt, keeping the best per exam. Returns what is stored
 * afterwards, so a caller can report the fact rather than assert a claim - the
 * pass screen on the website used to say "Saved on this device"
 * unconditionally, which is false whenever a better result already exists.
 */
export async function recordExamResult(result: ExamResult): Promise<ExamResult | undefined> {
  try {
    const merged = upsertExamResult(await readExamResults(), result);
    await AsyncStorage.setItem(EXAM_RESULTS_STORAGE_KEY, JSON.stringify(merged));
    return merged.find((r) => r.examId === result.examId);
  } catch {
    return undefined;
  }
}

export async function bestForExam(examId: string): Promise<ExamResult | undefined> {
  return (await readExamResults()).find((r) => r.examId === examId);
}
