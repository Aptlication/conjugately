import React, { useEffect, useRef } from "react";

/**
 * WheelSelect — iPhone-style spinning wheel picker, drop-in replacement for
 * <select>. Accepts the same shape: value, onChange (receives a synthetic
 * { target: { value } }), disabled, className, and <option> children.
 * External value changes (e.g. "Choose All for Me") trigger a slot-machine
 * spin onto the new value. See DIAL_SPEC.md.
 */

const ROW_H = 40;
const VISIBLE = 5;
const WHEEL_H = ROW_H * VISIBLE;

type Opt = { value: string; label: string; detail?: string; disabled: boolean };

function textOf(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (React.isValidElement(node)) return textOf((node.props as any).children);
  return "";
}

function parseOptions(children: React.ReactNode): Opt[] {
  const out: Opt[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    const props = child.props as any;
    if (child.type === "option") {
      const text = textOf(props.children).trim();
      const dash = text.indexOf(" - ");
      out.push({
        value: props.value ?? text,
        label: dash > -1 ? text.slice(0, dash) : text,
        detail: dash > -1 ? text.slice(dash + 3) : undefined,
        disabled: !!props.disabled,
      });
    } else if (props?.children) {
      out.push(...parseOptions(props.children));
    }
  });
  return out;
}

interface Props {
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function WheelSelect({ value, onChange, disabled, className, children }: Props) {
  const opts = parseOptions(children);
  const n = opts.length;
  const total = n * ROW_H;

  const boxRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const captionRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const anim = useRef(0);
  const drag = useRef({ on: false, lastY: 0, vel: 0 });
  const lastEmitted = useRef(value);
  const sig = opts.map((o) => o.value).join("|");

  const idxOf = (v: string) => Math.max(0, opts.findIndex((o) => o.value === v));
  const currentIdx = () => (n ? ((Math.round(offset.current / ROW_H) % n) + n) % n : 0);

  const render = () => {
    if (!n) return;
    rowsRef.current.forEach((el, i) => {
      if (!el) return;
      let d = ((i * ROW_H - offset.current) % total + total * 1.5) % total - total / 2;
      const half = WHEEL_H / 2;
      const c = Math.max(-half, Math.min(half, d));
      const ang = (c / half) * 65;
      el.style.opacity = Math.abs(d) > half + ROW_H ? "0" : String(Math.max(0.08, 1 - Math.abs(c) / (half * 1.15)));
      el.style.transform = `translateY(${c}px) perspective(420px) rotateX(${-ang}deg) scale(${1 - Math.abs(c) / (half * 3.2)})`;
    });
    if (captionRef.current) captionRef.current.textContent = opts[currentIdx()]?.detail || "";
  };

  const animateTo = (target: number, dur: number, casino: boolean, done?: () => void) => {
    cancelAnimationFrame(anim.current);
    const from = offset.current;
    const start = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      let e: number;
      if (casino) {
        if (p < 0.12) { const q = p / 0.12; e = 0.06 * q * q; }
        else { const q = (p - 0.12) / 0.88; e = 0.06 + 0.94 * (1 - Math.pow(1 - q, 3.2)); }
      } else {
        e = 1 - Math.pow(1 - p, 3);
      }
      offset.current = from + (target - from) * e;
      render();
      if (p < 1) anim.current = requestAnimationFrame(step);
      else done && done();
    };
    anim.current = requestAnimationFrame(step);
  };

  const settle = () => {
    if (!n) return;
    let target = Math.round((offset.current + drag.current.vel * 6) / ROW_H);
    for (let hop = 0; hop < n; hop++) {
      const cand = (((target + hop) % n) + n) % n;
      if (!opts[cand].disabled) { target += hop; break; }
    }
    animateTo(target * ROW_H, 450, false, () => {
      const v = opts[currentIdx()]?.value ?? "";
      lastEmitted.current = v;
      if (v !== value) onChange({ target: { value: v } });
    });
  };

  useEffect(() => {
    offset.current = idxOf(value) * ROW_H;
    lastEmitted.current = value;
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sig]);

  useEffect(() => {
    if (value === lastEmitted.current) return;
    lastEmitted.current = value;
    const i = idxOf(value);
    if (!n) return;
    const base = Math.ceil(offset.current / total) * total;
    animateTo(base + total * 2 + i * ROW_H, 1600 + Math.random() * 800, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (disabled || !n) return;
    drag.current = { on: true, lastY: e.clientY, vel: 0 };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    cancelAnimationFrame(anim.current);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.on) return;
    const dy = e.clientY - drag.current.lastY;
    drag.current.lastY = e.clientY;
    drag.current.vel = -dy;
    offset.current -= dy;
    render();
  };
  const onPointerUp = () => {
    if (!drag.current.on) return;
    drag.current.on = false;
    settle();
  };
  const onWheel = (e: React.WheelEvent) => {
    if (disabled || !n) return;
    offset.current += e.deltaY * 0.4;
    drag.current.vel = e.deltaY * 0.1;
    render();
    const box = boxRef.current as any;
    clearTimeout(box?._wt);
    if (box) box._wt = setTimeout(settle, 120);
  };

  useEffect(() => { render(); });

  return (
    <div className={className} style={{ padding: 0, overflow: "hidden", boxShadow: "inset 0 2px 6px rgba(27,31,36,0.12)" }}>
      <div
        ref={boxRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        style={{ position: "relative", height: WHEEL_H, touchAction: "none", cursor: disabled ? "not-allowed" : "grab" }}
      >
        <div style={{ position: "absolute", top: (WHEEL_H - ROW_H) / 2, left: 8, right: 8, height: ROW_H, pointerEvents: "none", background: "#F5F6F8", border: "1px solid rgba(27,31,36,0.10)", borderRadius: 9, boxShadow: "0 1px 3px rgba(27,31,36,0.20)" }} />
        {opts.map((o, i) => (
          <div
            key={`${o.value}-${i}`}
            ref={(el) => (rowsRef.current[i] = el)}
            style={{ position: "absolute", top: (WHEEL_H - ROW_H) / 2, left: 0, right: 0, height: ROW_H, display: "flex", alignItems: "center", justifyContent: "center", willChange: "transform,opacity", opacity: o.disabled ? 0.4 : 1 }}
            className="text-[#1B1F24] text-lg font-medium whitespace-nowrap px-2"
          >
            {o.label}
          </div>
        ))}
        <div style={{ position: "absolute", top: (WHEEL_H - ROW_H) / 2, left: 8, right: 8, height: ROW_H, pointerEvents: "none" }} className="rounded-lg border-2 border-[#1B1F24] bg-transparent" />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(rgba(90,105,135,0.22), rgba(223,231,245,0) 22%, rgba(223,231,245,0) 78%, rgba(90,105,135,0.22))" }} />
      </div>
      <div ref={captionRef} className="text-center text-sm text-[#5A6472] min-h-5 pb-2 px-3" />
    </div>
  );
}