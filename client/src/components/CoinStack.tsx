import { useEffect, useMemo, useState } from "react";

/**
 * Post-quiz reward: gold coins dropping onto a stack, casino style, while the
 * exact amount counts up. Two seconds end to end. Mirrors
 * apps/mobile/components/CoinStack.tsx.
 *
 * prefers-reduced-motion: the full stack and figure appear at once.
 */

const DURATION = 2000;
const MAX_DISCS = 10;
const DISC_STEP = 7;

type Props = { earned: number; unitMax: number; balance: number; previousBest?: number };

export function CoinStack({ earned, unitMax, balance, previousBest }: Props) {
  const discs = earned > 0 ? Math.max(1, Math.min(MAX_DISCS, Math.round((earned / Math.max(1, unitMax)) * MAX_DISCS))) : 0;
  const reduce = useMemo(() => {
    try { return window.matchMedia("(prefers-reduced-motion: reduce)").matches; } catch { return false; }
  }, []);
  const [shown, setShown] = useState(reduce ? earned : 0);
  const jitter = useMemo(() => Array.from({ length: MAX_DISCS }, () => Math.round(Math.random() * 6 - 3)), []);

  useEffect(() => {
    if (earned <= 0 || reduce) { setShown(earned); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / DURATION);
      setShown(Math.round(earned * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [earned, reduce]);

  const per = DURATION / (discs + 1);

  if (earned <= 0) {
    return (
      <div className="mt-6 text-center" role="status">
        <div className="text-lg font-semibold text-slate-200">No new coins this time</div>
        {previousBest !== undefined && (
          <p className="text-sm text-slate-300 mt-1">
            Your best on this unit already earned {previousBest} of {unitMax}. Beat it to earn the difference.
          </p>
        )}
        <div className="mt-2 font-semibold text-yellow-200">🪙 Balance: {balance}</div>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col items-center" style={{ display: "flex", flexDirection: "column", alignItems: "center" }} role="status" aria-label={`You earned ${earned} coins. Balance ${balance} coins.`}>
      <style>{`
        @keyframes cj-coin-drop {
          0%   { transform: translate(var(--jx), -160px); opacity: 0; }
          15%  { opacity: 1; }
          70%  { transform: translate(var(--jx), 0); }
          82%  { transform: translate(var(--jx), -6px); }
          100% { transform: translate(var(--jx), 0); opacity: 1; }
        }
        .cj-coin {
          position: absolute; left: 50%; margin-left: -32px; width: 64px; height: 18px; border-radius: 9999px;
          background: radial-gradient(ellipse at 40% 35%, #FFE27A 0%, #F5C518 45%, #D4A20A 100%);
          border: 2px solid #B8860B; box-shadow: 0 2px 2px rgba(122,90,0,.45);
          opacity: 0; animation: cj-coin-drop var(--d) ease-out var(--delay) forwards;
        }
        .cj-coin::after { content: ""; position: absolute; inset: 4px 9px; border-radius: 9999px; border: 1px solid #FFE27A; }
        @media (prefers-reduced-motion: reduce) { .cj-coin { animation: none; opacity: 1; transform: translateX(var(--jx)); } }
      `}</style>
      <div className="relative w-24" style={{ position: "relative", width: 96, height: 30 + discs * DISC_STEP }} aria-hidden="true">
        {Array.from({ length: discs }, (_, i) => (
          <span key={i} className="cj-coin" style={{
            bottom: i * DISC_STEP,
            ["--jx" as any]: `${jitter[i]}px`,
            ["--d" as any]: `${Math.round(per * 1.4)}ms`,
            ["--delay" as any]: `${Math.round(i * per)}ms`,
          }} />
        ))}
      </div>
      <div className="text-3xl font-extrabold text-yellow-300 tabular-nums mt-2">+{shown} {shown === 1 ? "coin" : "coins"}</div>
      {previousBest !== undefined && previousBest > 0 && (
        <p className="text-sm text-slate-300">Improvement on your best for this unit</p>
      )}
      <div className="mt-1 font-semibold text-yellow-200">🪙 Balance: {balance}</div>
    </div>
  );
}
