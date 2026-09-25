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
      continuous: false,
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
    if (phase === "listening") return;
    beginListening();
  }, [beginListening, phase]);

  /** Record button released - keep whatever was heard so Enter can act on it. */
  const stopHold = useCallback(() => {
    try { ExpoSpeechRecognitionModule.stop(); } catch {}
  }, []);

  /** Delete: throw everything away and go back to the start of the question. */
  const reset = useCallback(() => {
    activeRef.current = false;
    try { ExpoSpeechRecognitionModule.abort(); } catch {}
    setTranscript("");
    setReadingBoth(null);
    setErrorDetail(null);
    setLevel(0);
    setPhase("idle");
  }, [setReadingBoth]);

  const readTranscript = useCallback((text: string, confidence: number): MicReading => {
    const opts = optionsRef.current;
    let bestIndex: number | null = null;
    let best: MatchResult | undefined;
    let bestScore = -1;

    opts.forEach((option, i) => {
      const m = matchAnswer(text, option, confidence, DEFAULT_THRESHOLDS);
      if (m.similarity > bestScore) {
        bestScore = m.similarity;
        bestIndex = i;
        best = m;
      }
    });

    // Anything heard at all snaps to the nearest of the four. The point of the
    // exercise is to corral the learner onto one of the forms on offer, so a
    // near-miss is scored against the form it was nearest to rather than
    // dismissed as unheard. Only genuine silence has nothing to snap to.
    const usable = text.trim().length > 0;
    return {
      heard: text,
      optionIndex: usable ? bestIndex : null,
      correct: usable && bestIndex === correctIndexRef.current,
      usable,
      match: best,
    };
  }, []);

  useSpeechRecognitionEvent("volumechange", (e) => {
    const v = Math.max(VOLUME_FLOOR, Math.min(VOLUME_CEIL, e.value));
    setLevel(v / VOLUME_CEIL);
  });

  useSpeechRecognitionEvent("result", (e) => {
    if (!activeRef.current) return;
    const best = e.results?.[0];
    const text = best?.transcript ?? "";
    setTranscript(text);
    if (!e.isFinal) return;

    const confidence = typeof best?.confidence === "number" ? best.confidence : 1;
    activeRef.current = false;
    setLevel(0);
    setReadingBoth(readTranscript(text, confidence));
    setPhase("ready");
  });

  useSpeechRecognitionEvent("error", (e) => {
    if (!activeRef.current) return;
    activeRef.current = false;
    setLevel(0);
    if (e.error === "no-speech") {
      setReadingBoth({ heard: "", optionIndex: null, correct: false, usable: false });
      setPhase("ready");
      return;
    }
    if (e.error === "not-allowed") { setPhase("denied"); return; }
    // Anything else is this attempt failing, not the feature being gone: go
    // back to idle so the Record button still works.
    setErrorDetail(e.message ? `${e.error}: ${e.message}` : String(e.error));
    setPhase("idle");
  });

  const submit = useCallback(() => {
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

  useEffect(() => () => { try { ExpoSpeechRecognitionModule.abort(); } catch {} }, []);

  return { phase, level, transcript, reading, errorDetail, startHold, stopHold, reset, submit };
}

export { normaliseFrench };
