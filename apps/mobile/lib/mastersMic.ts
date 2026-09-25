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
 * The comparison half is shared/answerMatch.ts, which both surfaces run and
 * which is tuned on staging at /matcher. This file is the part that only exists
 * on a device: microphone permission, Apple's Speech framework, and the state
 * machine around what was heard.
 *
 * NOTHING IS MARKED UNTIL THE LEARNER PRESSES ENTER. That is the whole point.
 * If a correct answer advanced on its own and a wrong one did not, the absence
 * of an advance would tell the learner they were wrong before they had
 * committed to anything - and it would stop being a test. So every spoken
 * answer stops at "ready", shows the transcript, and waits.
 *
 * The transcript is matched against ALL FOUR options, not just the correct one,
 * because "you said a wrong answer" and "I did not hear you" are different
 * events and only the first one deserves a mark:
 *
 *   best match is the correct form,  >= acceptAt  -> submitting scores it right
 *   best match is a distractor,      >= acceptAt  -> submitting scores it wrong
 *   nothing reaches disambiguateAt                -> "not caught", no mark, retry
 */

export type MicPhase =
  | "idle"
  | "listening"
  | "ready"
  | "resolved"
  | "denied"
  | "unavailable";

/** What the transcript was judged to be, before the learner commits to it. */
export type MicReading = {
  /** Raw transcript, shown live under the equaliser. */
  heard: string;
  /** Index into the options array, or null when nothing was recognised. */
  optionIndex: number | null;
  /** True when that option is the correct one. */
  correct: boolean;
  /** Confident enough to be worth submitting at all. */
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

/** Below 0 is inaudible per the module's own docs; 10 is the top of its range. */
const VOLUME_FLOOR = 0;
const VOLUME_CEIL = 10;

/** Fast enough that the bars read as a voice rather than as a meter. */
const VOLUME_INTERVAL_MS = 50;

export function useMastersMic(opts: {
  /** The conjugation being tested. An array allows accepted variants. */
  expected: string | string[];
  /** Every option on screen, in order, so a spoken distractor can be named. */
  options: string[];
  /** Index of the correct option within `options`. */
  correctIndex: number;
  /** Called once the learner submits, never before. */
  onOutcome: (outcome: MicOutcome) => void;
  lang?: string;
}) {
  const { expected, options, correctIndex, onOutcome, lang = "fr-FR" } = opts;

  const [phase, setPhase] = useState<MicPhase>("idle");
  const [level, setLevel] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [reading, setReading] = useState<MicReading | null>(null);

  // Refs, not state: the event handlers below are registered once and must not
  // close over a stale question.
  const activeRef = useRef(false);
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

  const beginListening = useCallback(() => {
    activeRef.current = true;
    setTranscript("");
    setReadingBoth(null);
    setPhase("listening");
    const forms = Array.isArray(expectedRef.current) ? expectedRef.current : [expectedRef.current];
    ExpoSpeechRecognitionModule.start({
      lang,
      // Interim results drive the live transcript under the equaliser. They are
      // jumpy by nature - words appear and are rewritten as more is heard - so
      // the display treats them as provisional until isFinal.
      interimResults: true,
      maxAlternatives: 3,
      // Hand the recogniser every option being shown, not only the right one.
      // Without this it returns common French words that merely sound similar,
      // and a learner who said a distractor cleanly would read as unheard.
      contextualStrings: [...forms, ...optionsRef.current],
      // On-device: works on a plane and in the Metro, and no audio leaves the
      // phone. That is a claim the App Store nomination makes, so it is set
      // explicitly rather than left to a default.
      requiresOnDeviceRecognition: true,
      continuous: false,
      volumeChangeEventOptions: { enabled: true, intervalMillis: VOLUME_INTERVAL_MS },
    });
  }, [lang, setReadingBoth]);

  const start = useCallback(async () => {
    try {
      const perm = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!perm.granted) { setPhase("denied"); return; }
      beginListening();
    } catch {
      setPhase("unavailable");
    }
  }, [beginListening]);

  /** Throw this attempt away and listen again. Nothing has been marked. */
  const retry = useCallback(() => {
    try { ExpoSpeechRecognitionModule.abort(); } catch {}
    beginListening();
  }, [beginListening]);

  /** Stop listening but keep whatever was heard, so Enter can act on it. */
  const stop = useCallback(() => {
    try { ExpoSpeechRecognitionModule.stop(); } catch {}
  }, []);

  /** Leave mic mode entirely. */
  const cancel = useCallback(() => {
    activeRef.current = false;
    try { ExpoSpeechRecognitionModule.abort(); } catch {}
    setPhase("idle");
    setTranscript("");
    setReadingBoth(null);
    setLevel(0);
  }, [setReadingBoth]);

  /** Read a transcript against every option and say what it amounts to. */
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

    const usable = bestScore >= DEFAULT_THRESHOLDS.disambiguateAt;
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
    // Stop here. The learner presses Enter; nothing is scored before that.
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
    setPhase(e.error === "not-allowed" ? "denied" : "unavailable");
  });

  /**
   * The learner committed. Only now is anything marked, and a reading that was
   * never usable is reported as unheard rather than as a wrong answer - being
   * misheard is not a mistake the learner made.
   */
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

  return { phase, level, transcript, reading, start, stop, retry, cancel, submit };
}

/** Exported for the matcher page and tests. */
export { normaliseFrench };
