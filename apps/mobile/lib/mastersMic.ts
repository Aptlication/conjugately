import { useCallback, useEffect, useRef, useState } from "react";
import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import {
  DEFAULT_THRESHOLDS,
  disambiguationOptions,
  matchAnswer,
  normaliseFrench,
  type MatchResult,
} from "@shared/answerMatch";

/**
 * Masters Mic - the recogniser half.
 *
 * The comparison half is shared/answerMatch.ts, which both surfaces run and
 * which is tuned on staging at /matcher. This file is the part that only exists
 * on a device: microphone permission, Apple's Speech framework, and the ladder
 * that decides what to do with what was heard.
 *
 * The ladder is the point of the feature. A recogniser is not binary, and
 * pretending otherwise means either waving through near-misses as correct -
 * teaching the wrong conjugation - or failing a learner who said the right
 * thing. So:
 *
 *   accept        heard clearly       -> scored, quiz advances, no confirmation
 *   disambiguate  close but ambiguous -> ask IN FRENCH which of two forms
 *   retry         not caught          -> « Comment ? », listen once more
 *   second miss                       -> give up gracefully, NOT marked wrong
 *
 * A confirmed alternative scores FULL marks. Someone who said the right thing
 * and had to confirm it has not made a mistake; only the recogniser was unsure.
 */

export type MicPhase =
  | "idle"
  | "listening"
  | "disambiguating"
  | "retrying"
  | "resolved"
  | "denied"
  | "unavailable";

export type MicOutcome = {
  correct: boolean;
  /** How it was settled - for wording the feedback, and for telemetry later. */
  via: "heard" | "confirmed" | "unheard" | "wrong";
  heard: string;
  match?: MatchResult;
};

/** Below 0 is inaudible per the module's own docs; 10 is the top of its range. */
const VOLUME_FLOOR = 0;
const VOLUME_CEIL = 10;

export function useMastersMic(opts: {
  /** The conjugation being tested. An array allows accepted variants. */
  expected: string | string[];
  /** Called once the ladder reaches a verdict. */
  onOutcome: (outcome: MicOutcome) => void;
  lang?: string;
}) {
  const { expected, onOutcome, lang = "fr-FR" } = opts;

  const [phase, setPhase] = useState<MicPhase>("idle");
  const [level, setLevel] = useState(0);
  const [choices, setChoices] = useState<[string, string] | null>(null);
  const [lastMatch, setLastMatch] = useState<MatchResult | null>(null);

  // Refs, not state: the event handlers below are registered once and must not
  // close over a stale attempt count or a stale expected form.
  const attemptRef = useRef(0);
  const activeRef = useRef(false);
  const expectedRef = useRef(expected);
  useEffect(() => { expectedRef.current = expected; }, [expected]);
  const onOutcomeRef = useRef(onOutcome);
  useEffect(() => { onOutcomeRef.current = onOutcome; }, [onOutcome]);
  const lastMatchRef = useRef<MatchResult | null>(null);

  const finish = useCallback((outcome: MicOutcome) => {
    activeRef.current = false;
    setPhase("resolved");
    setLevel(0);
    onOutcomeRef.current(outcome);
  }, []);

  const beginListening = useCallback((next: "listening" | "retrying") => {
    activeRef.current = true;
    setChoices(null);
    setPhase(next);
    const forms = Array.isArray(expectedRef.current) ? expectedRef.current : [expectedRef.current];
    ExpoSpeechRecognitionModule.start({
      lang,
      interimResults: false,
      maxAlternatives: 3,
      // Hand the recogniser the forms actually being tested. Without this it
      // returns common French words that merely sound similar, and the matcher
      // then rejects something the recogniser was never given a fair shot at.
      contextualStrings: forms,
      // On-device: works on a plane and in the Metro, and no audio leaves the
      // phone. That is a claim the App Store nomination makes, so it is set
      // explicitly rather than left to a default.
      requiresOnDeviceRecognition: true,
      continuous: false,
      volumeChangeEventOptions: { enabled: true, intervalMillis: 100 },
    });
  }, [lang]);

  const start = useCallback(async () => {
    try {
      const perm = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!perm.granted) { setPhase("denied"); return; }
      attemptRef.current = 0;
      beginListening("listening");
    } catch {
      setPhase("unavailable");
    }
  }, [beginListening]);

  const cancel = useCallback(() => {
    activeRef.current = false;
    try { ExpoSpeechRecognitionModule.abort(); } catch {}
    setPhase("idle");
    setChoices(null);
    setLevel(0);
  }, []);

  useSpeechRecognitionEvent("volumechange", (e) => {
    const v = Math.max(VOLUME_FLOOR, Math.min(VOLUME_CEIL, e.value));
    setLevel(v / VOLUME_CEIL);
  });

  useSpeechRecognitionEvent("result", (e) => {
    if (!activeRef.current || !e.isFinal) return;
    const best = e.results?.[0];
    const transcript = best?.transcript ?? "";
    const confidence = typeof best?.confidence === "number" ? best.confidence : 1;
    const result = matchAnswer(transcript, expectedRef.current, confidence, DEFAULT_THRESHOLDS);
    setLastMatch(result);
    lastMatchRef.current = result;

    if (result.band === "accept") {
      finish({ correct: true, via: "heard", heard: result.heard, match: result });
      return;
    }

    if (result.band === "disambiguate") {
      activeRef.current = false;
      setChoices(disambiguationOptions(result.expected, result.heard));
      setPhase("disambiguating");
      return;
    }

    attemptRef.current += 1;
    if (attemptRef.current < 2) {
      setTimeout(() => beginListening("retrying"), 250);
    } else {
      finish({ correct: false, via: "unheard", heard: result.heard, match: result });
    }
  });

  useSpeechRecognitionEvent("error", (e) => {
    if (!activeRef.current) return;
    if (e.error === "no-speech") {
      attemptRef.current += 1;
      if (attemptRef.current < 2) { setTimeout(() => beginListening("retrying"), 250); return; }
      finish({ correct: false, via: "unheard", heard: "" });
      return;
    }
    activeRef.current = false;
    setPhase(e.error === "not-allowed" ? "denied" : "unavailable");
  });

  /** The learner picked one of the two offered forms. */
  const confirmChoice = useCallback((picked: string) => {
    const m = lastMatchRef.current;
    const first = Array.isArray(expectedRef.current) ? expectedRef.current[0] : expectedRef.current;
    const isRight = normaliseFrench(picked) === normaliseFrench(first);
    finish({
      correct: isRight,
      via: isRight ? "confirmed" : "wrong",
      heard: m?.heard ?? "",
      match: m ?? undefined,
    });
  }, [finish]);

  useEffect(() => () => { try { ExpoSpeechRecognitionModule.abort(); } catch {} }, []);

  return { phase, level, choices, lastMatch, start, cancel, confirmChoice };
}
