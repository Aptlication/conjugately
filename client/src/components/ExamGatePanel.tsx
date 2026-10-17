import { useEffect, useState } from "react";
import { examCoinCost, examGateLabel, type ExamGate } from "@shared/coins";
import { getExam } from "@shared/exams";
import { readExamGate, spendOnExam } from "@/lib/coins";

/**
 * Final Level Exam entry point: what is still needed, the coin unlock (price
 * per level from examCoinCost, 18 Oct rules)
 * (two clicks, no browser confirm dialog), and Start once unlocked. Mirrors
 * apps/mobile/components/ExamGateCard.tsx.
 */
type Props = {
  level: string;
  timeFrame: string;
  onStart: () => void;
  /** Header line when shown at the end of a tense. */
  celebrate?: boolean;
  refreshKey?: number;
};

export function ExamGatePanel({ level, timeFrame, onStart, celebrate, refreshKey }: Props) {
  const exam = getExam(level, timeFrame);
  const [gate, setGate] = useState<ExamGate>(() => readExamGate(level, timeFrame));
  const [confirming, setConfirming] = useState(false);
  useEffect(() => { setGate(readExamGate(level, timeFrame)); }, [level, timeFrame, refreshKey]);
  if (!exam) return null;

  const cost = examCoinCost(level);
  const hot = !!celebrate;
  return (
    <div className={`mt-6 rounded-xl p-5 text-left border ${hot ? "border-yellow-400 border-2 bg-yellow-500/15" : "border-yellow-500/30 bg-yellow-500/10"}`}>
      {hot && <div className="text-xs font-bold tracking-widest uppercase text-yellow-300 mb-1">{timeFrame} tense complete!</div>}
      <div className="text-lg font-semibold text-white">
        {gate.kind === "unlocked" ? "🎓 Final Level Exam" : gate.kind === "canUnlock" ? "🎓 Final Level Exam — ready" : "🔒 Final Level Exam"}
      </div>
      <div className="text-sm text-slate-300">{exam.totalQuestions} questions · {exam.passMark} to pass (90%)</div>
      <p className="mt-2 text-slate-100">{examGateLabel(gate)}</p>

      {gate.kind === "unlocked" && (
        <button onClick={onStart} className="mt-4 w-full px-6 py-3 rounded-xl font-bold text-[#1B2145] bg-yellow-400 hover:bg-yellow-300">
          Start Exam →
        </button>
      )}
      {gate.kind === "canUnlock" && !confirming && (
        <button onClick={() => setConfirming(true)} className="mt-4 w-full px-6 py-3 rounded-xl font-bold text-[#1B2145] bg-yellow-400 hover:bg-yellow-300">
          Unlock for {cost} 🪙
        </button>
      )}
      {gate.kind === "canUnlock" && confirming && (
        <div className="mt-4">
          <p className="text-slate-100">Spend {cost} of your {gate.balance} coins? Retakes are free until you pass.</p>
          <div className="mt-3 flex gap-3">
            <button
              onClick={() => { setGate(spendOnExam(level, timeFrame)); setConfirming(false); }}
              className="flex-1 px-6 py-3 rounded-xl font-bold text-[#1B2145] bg-yellow-400 hover:bg-yellow-300">
              Confirm — {cost} 🪙
            </button>
            <button onClick={() => setConfirming(false)} className="flex-1 px-6 py-3 rounded-xl border border-white/30 text-slate-100 hover:bg-white/10">
              Not now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
