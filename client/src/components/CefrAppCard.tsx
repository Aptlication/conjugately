import { cefrCoinCost } from "@shared/cefrCoins";
import { cefrTestForLevel } from "@shared/cefrTests";

/**
 * CEFR-style tests are app-only (GLOSSARY exemption 4, 25 Oct 2026): they are Pro
 * and their speaking section uses Masters Mic. The website points to the app at
 * the foot of the level's course modal instead.
 */
export function CefrAppCard({ level }: { level: string }) {
  const test = cefrTestForLevel(level);
  if (!test) return null;
  return (
    <div className="w-full mb-4 p-4 rounded-xl border border-emerald-400/40 bg-emerald-400/10 text-left" data-cefr={test.id}>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-[#1B2145] border-2 border-[#F5C518] flex items-center justify-center text-white font-extrabold">
          {test.id}
        </div>
        <div className="flex-1">
          <div className="text-white font-semibold">CEFR-style {test.id} test — in the app</div>
          <div className="text-slate-300 text-sm">
            Listening, reading, writing and speaking in the format of official {test.id} French exams.
            Opens after every {test.level} Final Level Exam is passed · {cefrCoinCost(test.id)} coins · Pluri Pro.
          </div>
        </div>
      </div>
      <a
        href="https://apps.apple.com/app/id6799402337"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 block text-center rounded-lg bg-[#F5C518] text-[#1B2145] font-bold py-2 hover:opacity-90"
      >
        Get the Pluri French app
      </a>
      <div className="text-slate-400 text-xs mt-2">A practice test, not an official certificate.</div>
    </div>
  );
}
