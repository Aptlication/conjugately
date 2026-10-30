import { useCallback, useEffect, useRef, useState } from "react";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import {
  DEFAULT_THRESHOLDS,
  matchAnswer,
  normaliseFrench,
  type MatchResult,
} from "@shared/answerMatch";
import { soundsAlike } from "@shared/soundAlike";

/**
 * Masters Mic - the recogniser half.
 *
 * Hold to speak, release to stop. NOTHING IS MARKED UNTIL ENTER IS PRESSED: if
 * a correct answer advanced on its own and a wrong one did not, the absence of
 * an advance would tell the learner they were wrong before they had committed,
 * and it would stop being a test.
 *
 * The transcript is matched against ALL FOUR options, because "you said a wrong
 * answer" and "I did not hear you" are different events and only the first
 * deserves a mark.
 *
 * On-device recognition is preferred - it works on a plane and no audio leaves
 * the phone, which the App Store nomination claims - but it is NOT assumed. If
 * the device has no on-device French, we fall back to server recognition rather
 * than telling the learner the feature is unavailable. Build 21 showed why: a
 * phone without the French pack got a hard "not available" with no way back.
 */

export type MicPhase =
  | "idle"
  | "listening"
  | "ready"
  | "resolved"
  | "denied"
  | "unavailable";

export type MicReading = {
  heard: string;
  optionIndex: number | null;
  correct: boolean;
  usable: boolean;
  match?: MatchResult;
};

export type MicOutcome = {
  correct: boolean;
  via: "heard" | "wrong" | "unheard";
  heard: string;
  optionIndex: number | null;
  match?: MatchResult;
};

const VOLUME_FLOOR = 0;
const VOLUME_CEIL = 10;
const VOLUME_INTERVAL_MS = 50;
/**
 * How long to keep listening after Record is let go. 0 (Jonathan, 30 Oct
 * 2026): recording stops when Record is let go. What was wanted was that it
 * never cuts off WHILE Record is held, which `continuous: true` does; the
 * 1.5 s / 2.5 s tail tried on 30 Oct is off.
 */
export const LISTEN_TAIL_MS = 0;

export function useMastersMic(opts: {
  expected: string | string[];
  options: string[];
  correctIndex: number;
  onOutcome: (outcome: MicOutcome) => void;
  lang?: string;
}) {
  const { expected, options, correctIndex, onOutcome, lang = "fr-FR" } = opts;

  const [phase, setPhase] = useState<MicPhase>("idle");
  const [level, setLevel] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [reading, setReading] = useState<MicReading | null>(null);
  /** The real reason, surfaced in the notice. Guessing at this cost a build. */
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const activeRef = useRef(false);
  const onDeviceRef = useRef(true);
  const expectedRef = useRef(expected);
  useEffect(() => { expectedRef.current = expected; }, [expected]);
  const optionsRef = useRef(options);
  useEffect(() => { optionsRef.current = options; }, [options]);
  const correctIndexRef = useRef(correctIndex);
  useEffect(() => { correctIndexRef.current = correctIndex; }, [correctIndex]);
  const onOutcomeRef = useRef(onOutcome);
  useEffect(() => { onOutcomeRef.current = onOutcome; }, [onOutcome]);
  const readingRef = useRef<MicReading | null>(null);
  /**
   * Options the learner has turned down on THIS question (Jonathan, 30 Oct
   * 2026): holding Record again after seeing a guess rules that guess out, so
   * a recogniser that keeps hearing "vous prenez" for "vous preniez" moves on
   * to the next nearest option instead of offering the same wrong one again.
   * The control is remounted per question, so this starts empty each time.
   */
  const ruledOutRef = useRef<Set<number>>(new Set());
  // The 2.5 s after Record is let go: still listening, and Enter may be pressed.
  const tailTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [tail, setTail] = useState(false);
  // Enter pressed during the tail: submit as soon as the final words arrive.
  const pendingSubmitRef = useRef(false);
  const clearTail = () => {
    if (tailTimerRef.current) { clearTimeout(tailTimerRef.current); tailTimerRef.current = null; }
    setTail(false);
  };
  const [ruledOut, setRuledOut] = useState<number[]>([]);

  const setReadingBoth = useCallback((r: MicReading | null) => {
    readingRef.current = r;
    setReading(r);
  }, []);

  /** Decide once per mount whether on-device French is actually there. */
  useEffect(() => {
    (async () => {
      try {
        if (!ExpoSpeechRecognitionModule.isRecognitionAvailable()) {
          setErrorDetail("Speech recognition is not available on this device.");
          setPhase("unavailable");
          return;
        }
        let onDevice = false;
        try {
          if (ExpoSpeechRecognitionModule.supportsOnDeviceRecognition()) {
            const res = await ExpoSpeechRecognitionModule.getSupportedLocales({
              androidRecognitionServicePackage: undefined,
            } as any);
            const installed: string[] = (res as any)?.installedLocales ?? [];
            onDevice = installed.some((l) => String(l).toLowerCase().startsWith("fr"));
          }
        } catch {
          onDevice = false;
        }
        onDeviceRef.current = onDevice;
      } catch (e: any) {
        setErrorDetail(String(e?.message ?? e));
        setPhase("unavailable");
      }
    })();
  }, []);

  const beginListening = useCallback(async () => {
    try {
      const perm = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!perm.granted) { setPhase("denied"); return; }
    } catch (e: any) {
      setErrorDetail(String(e?.message ?? e));
      setPhase("unavailable");
      return;
    }

    activeRef.current = true;
    setTranscript("");
    setReadingBoth(null);
    setErrorDetail(null);
    setPhase("listening");

    const forms = Array.isArray(expectedRef.current) ? expectedRef.current : [expectedRef.current];
    const base = {
      lang,
      interimResults: true,
      maxAlternatives: 3,
      contextualStrings: [...forms, ...optionsRef.current],
      // Continuous (30 Oct 2026): a pause to think no longer ends the
      // recording; it ends when Record is let go (plus LISTEN_TAIL_MS).
      continuous: true,
      volumeChangeEventOptions: { enabled: true, intervalMillis: VOLUME_INTERVAL_MS },
    };

    try {
      ExpoSpeechRecognitionModule.start({
        ...base,
        requiresOnDeviceRecognition: onDeviceRef.current,
      });
    } catch (first: any) {
      // On-device refused. Fall back to server recognition rather than telling
      // the learner the whole feature is gone.
      if (onDeviceRef.current) {
        onDeviceRef.current = false;
        try {
          ExpoSpeechRecognitionModule.start({ ...base, requiresOnDeviceRecognition: false });
          return;
        } catch (second: any) {
          activeRef.current = false;
          setErrorDetail(String(second?.message ?? second));
          setPhase("unavailable");
          return;
        }
      }
      activeRef.current = false;
      setErrorDetail(String(first?.message ?? first));
      setPhase("unavailable");
    }
  }, [lang, setReadingBoth]);

  /** Record button pressed. */
  const startHold = useCallback(() => {
    // Pressed again during the tail: carry on with the same recording.
    if (phase === "listening") { clearTail(); return; }
    // Recording over a guess = turning it down. Silence turns nothing down.
    const prev = readingRef.current;
    if (phase === "ready" && prev?.usable && prev.optionIndex != null) {
      const out = ruledOutRef.current;
      out.add(prev.optionIndex);
      // All four turned down: start again rather than leave nothing to pick.
      if (out.size >= optionsRef.current.length) out.clear();
      setRuledOut([...out]);
    }
    beginListening();
  }, [beginListening, phase]);

  /** Record button released - keep whatever was heard so Enter can act on it. */
  const stopHold = useCallback(() => {
    if (!activeRef.current) { try { ExpoSpeechRecognitionModule.stop(); } catch {} return; }
    clearTail();
    setTail(true);
    tailTimerRef.current = setTimeout(() => {
      tailTimerRef.current = null;
      setTail(false);
      try { ExpoSpeechRecognitionModule.stop(); } catch {}
    }, LISTEN_TAIL_MS);
  }, []);

  /** Delete: throw everything away and go back to the start of the question. */
  const reset = useCallback(() => {
    activeRef.current = false;
    clearTail();
    pendingSubmitRef.current = false;
    ruledOutRef.current = new Set();
    setRuledOut([]);
    try { ExpoSpeechRecognitionModule.abort(); } catch {}
    setTranscript("");
    setReadingBoth(null);
    setErrorDetail(null);
    setLevel(0);
    setPhase("idle");
  }, [setReadingBoth]);

  /**
   * Every alternative the recogniser offers is scored against every option
   * still in play (30 Oct 2026). Only its first guess was read before, though
   * it is asked for three: the second is often the right form ("preniez" when
   * the first is "prenez").
   */
  const readTranscripts = useCallback((alts: { text: string; confidence: number }[]): MicReading => {
    const opts = optionsRef.current;
    const out = ruledOutRef.current;
    let bestIndex: number | null = null;
    let best: MatchResult | undefined;
    let bestScore = -1;
    let bestText = alts[0]?.text ?? "";
    const heardAny = alts.filter((a) => a.text.trim().length > 0);
    const text = heardAny[0]?.text ?? "";

    for (const alt of heardAny) {
      opts.forEach((option, i) => {
        if (out.has(i)) return;
        const m = matchAnswer(alt.text, option, alt.confidence, DEFAULT_THRESHOLDS);
        if (m.similarity > bestScore) {
          bestScore = m.similarity;
          bestIndex = i;
          best = m;
          bestText = alt.text;
        }
      });
    }

    // Anything heard at all snaps to the nearest of the four. The point of the
    // exercise is to corral the learner onto one of the forms on offer, so a
    // near-miss is scored against the form it was nearest to rather than
    // dismissed as unheard. Only genuine silence has nothing to snap to.
    const usable = text.trim().length > 0;

    // 1.3.15: the mic hears sound, not spelling. If the nearest option sounds
    // the same as the correct one (parlais / parlait / parlaient, il / ils
    // before a consonant), the learner said the right thing: mark it correct
    // and show the correct spelling, never "Incorrect conjugation".
    // A correct answer the learner has turned down stays turned down.
    const ci = correctIndexRef.current;
    if (usable && bestIndex !== null && bestIndex !== ci && ci != null && ci >= 0 && !out.has(ci)
        && opts[bestIndex] != null && opts[ci] != null && soundsAlike(opts[bestIndex], opts[ci])) {
      bestIndex = ci;
    }

    return {
      heard: usable ? bestText : text,
      optionIndex: usable ? bestIndex : null,
      correct: usable && bestIndex === ci,
      usable,
      match: best,
    };
  }, []);

  useSpeechRecognitionEvent("volumechange", (e) => {
    const v = Math.max(VOLUME_FLOOR, Math.min(VOLUME_CEIL, e.value));
    setLevel(v / VOLUME_CEIL);
  });

  /** Mark what was heard (Enter). */
  const resolveNow = useCallback(() => {
    const r = readingRef.current;
    if (!r) return;
    activeRef.current = false;
    setPhase("resolved");
    setLevel(0);
    onOutcomeRef.current({
      correct: r.usable ? r.correct : false,
      via: !r.usable ? "unheard" : r.correct ? "heard" : "wrong",
      heard: r.heard,
      optionIndex: r.optionIndex,
      match: r.match,
    });
  }, []);

  const afterFinal = () => {
    if (tailTimerRef.current) { clearTimeout(tailTimerRef.current); tailTimerRef.current = null; }
    setTail(false);
    if (pendingSubmitRef.current) { pendingSubmitRef.current = false; resolveNow(); }
  };

  useSpeechRecognitionEvent("result", (e) => {
    if (!activeRef.current) return;
    const best = e.results?.[0];
    const text = best?.transcript ?? "";
    setTranscript(text);
    if (!e.isFinal) return;

    const alts = (e.results ?? []).map((r: any) => ({
      text: String(r?.transcript ?? ""),
      confidence: typeof r?.confidence === "number" ? r.confidence : 1,
    }));
    activeRef.current = false;
    setLevel(0);
    setReadingBoth(readTranscripts(alts.length ? alts : [{ text, confidence: 1 }]));
    setPhase("ready");
    afterFinal();
  });

  useSpeechRecognitionEvent("error", (e) => {
    if (!activeRef.current) return;
    activeRef.current = false;
    setLevel(0);
    if (e.error === "no-speech") {
      setReadingBoth({ heard: "", optionIndex: null, correct: false, usable: false });
      setPhase("ready");
      afterFinal();
      return;
    }
    pendingSubmitRef.current = false;
    if (tailTimerRef.current) { clearTimeout(tailTimerRef.current); tailTimerRef.current = null; }
    setTail(false);
    if (e.error === "not-allowed") { setPhase("denied"); return; }
    // Anything else is this attempt failing, not the feature being gone: go
    // back to idle so the Record button still works.
    setErrorDetail(e.message ? `${e.error}: ${e.message}` : String(e.error));
    setPhase("idle");
  });

  const submit = useCallback(() => {
    // Enter during the 2.5 s tail: stop now and mark the words as soon as the
    // final result comes in.
    if (activeRef.current) {
      pendingSubmitRef.current = true;
      if (tailTimerRef.current) { clearTimeout(tailTimerRef.current); tailTimerRef.current = null; }
      setTail(false);
      try { ExpoSpeechRecognitionModule.stop(); } catch {}
      return;
    }
    resolveNow();
  }, [resolveNow]);

  useEffect(() => () => {
    if (tailTimerRef.current) clearTimeout(tailTimerRef.current);
    try { ExpoSpeechRecognitionModule.abort(); } catch {}
  }, []);

  return { phase, level, transcript, reading, ruledOut, tail, errorDetail, startHold, stopHold, reset, submit };
}

export { normaliseFrench };
