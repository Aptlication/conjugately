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
      <div className="mt-6 text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
        role="status" aria-label={`No new coins. Balance ${balance} coins.`}>
        <IcedDoughnut />
        <div className="text-2xl font-extrabold text-pink-300 mt-2">0 coins</div>
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

/** Zero, as an iced doughnut: drops in and settles. The hole is real (even-odd), so any background shows through. */
function IcedDoughnut() {
  return (
    <>
      <style>{`
        @keyframes cj-donut-in {
          0% { transform: translateY(-90px) rotate(-25deg); opacity: 0; }
          20% { opacity: 1; }
          60% { transform: translateY(0) rotate(8deg); }
          78% { transform: translateY(-8px) rotate(-4deg); }
          100% { transform: translateY(0) rotate(0); opacity: 1; }
        }
        .cj-donut { animation: cj-donut-in 900ms ease-out both; }
        @media (prefers-reduced-motion: reduce) { .cj-donut { animation: none; } }
      `}</style>
      <svg className="cj-donut" width="110" height="110" viewBox="0 0 100 100" aria-hidden="true">
        <path fillRule="evenodd" fill="#D9A066" stroke="#B97A3C" strokeWidth="2"
          d="M50 4 a46 46 0 1 1 0 92 a46 46 0 1 1 0 -92 Z M50 37 a13 13 0 1 0 0 26 a13 13 0 1 0 0 -26 Z" />
        <path fillRule="evenodd" fill="#F48FB1"
          d="M88.0,50.0 L89.4,53.4 L89.6,57.0 L88.2,60.2 L85.7,63.0 L83.0,65.4 L81.0,67.9 L79.9,70.9 L79.1,74.4 L78.0,78.0 L75.8,80.8 L72.7,82.4 L69.0,82.9 L65.4,83.0 L62.2,83.6 L59.4,85.2 L56.6,87.4 L53.4,89.4 L50.0,90.2 L46.6,89.4 L43.4,87.4 L40.6,85.2 L37.8,83.6 L34.6,83.0 L31.0,82.9 L27.3,82.4 L24.2,80.8 L22.0,78.0 L20.9,74.4 L20.1,70.9 L19.0,67.9 L17.0,65.4 L14.3,63.0 L11.8,60.2 L10.4,57.0 L10.6,53.4 L12.0,50.0 L13.7,46.8 L14.7,43.8 L14.8,40.6 L14.3,37.0 L14.2,33.3 L15.2,29.9 L17.6,27.3 L20.9,25.6 L24.2,24.2 L27.0,22.6 L29.1,20.1 L31.0,17.1 L33.3,14.2 L36.3,12.2 L39.8,11.8 L43.4,12.6 L46.8,13.7 L50.0,14.2 L53.2,13.7 L56.6,12.6 L60.2,11.8 L63.7,12.2 L66.7,14.2 L69.0,17.1 L70.9,20.1 L73.0,22.6 L75.8,24.2 L79.1,25.6 L82.4,27.3 L84.8,29.9 L85.8,33.3 L85.7,37.0 L85.2,40.6 L85.3,43.8 L86.3,46.8 L88.0,50.0 Z M50 35 a15 15 0 1 0 0 30 a15 15 0 1 0 0 -30 Z" />
        <ellipse cx="38" cy="26" rx="10" ry="4" fill="#FFFFFF" opacity="0.35" transform="rotate(-25 38 26)" />
        <rect x="76.6" y="58.0" width="8" height="3" rx="1.5" fill="#FFFFFF" transform="rotate(0 80.6 59.5)" />
        <rect x="63.4" y="69.2" width="8" height="3" rx="1.5" fill="#7FD6F5" transform="rotate(47 67.4 70.7)" />
        <rect x="50.1" y="80.2" width="8" height="3" rx="1.5" fill="#FFE27A" transform="rotate(94 54.1 81.7)" />
        <rect x="34.4" y="72.9" width="8" height="3" rx="1.5" fill="#9BE59B" transform="rotate(141 38.4 74.4)" />
        <rect x="18.8" y="65.4" width="8" height="3" rx="1.5" fill="#C79BFF" transform="rotate(8 22.8 66.9)" />
        <rect x="19.0" y="48.1" width="8" height="3" rx="1.5" fill="#FFFFFF" transform="rotate(55 23.0 49.6)" />
        <rect x="19.3" y="30.8" width="8" height="3" rx="1.5" fill="#7FD6F5" transform="rotate(102 23.3 32.3)" />
        <rect x="35.1" y="23.8" width="8" height="3" rx="1.5" fill="#FFE27A" transform="rotate(149 39.1 25.3)" />
        <rect x="51.0" y="16.9" width="8" height="3" rx="1.5" fill="#9BE59B" transform="rotate(16 55.0 18.4)" />
        <rect x="64.0" y="28.4" width="8" height="3" rx="1.5" fill="#C79BFF" transform="rotate(63 68.0 29.9)" />
        <rect x="76.8" y="39.9" width="8" height="3" rx="1.5" fill="#FFFFFF" transform="rotate(110 80.8 41.4)" />
      </svg>
    </>
  );
}
