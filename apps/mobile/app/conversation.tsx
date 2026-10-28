import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AccessibilityInfo, Animated, Easing, Platform, Pressable, ScrollView, StyleSheet, Text, View,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { judgeReply } from "../lib/generousMatch";
import { wrongOptions } from "../lib/conversationOptions";
import { DEFAULT_THRESHOLDS, matchAnswer } from "@shared/answerMatch";
import { soundsAlike } from "@shared/soundAlike";
import { contentLevel } from "@shared/levels";
import { type ConvTurn } from "../lib/conversations";
import { CONVERSATION_AUDIO, getConversation } from "../lib/conversationsFull";
import { collectConversationWords } from "../lib/vocab";
import { maybeAskForReview } from "../lib/reviewPrompt";
import { countDue, unitKey } from "../lib/vocabCheck";
import { purchasesAvailable, usePro } from "../lib/pro";

/**
 * Post-quiz "Final conversation" (1.2.1).
 *
 * The app speaks a recorded line, the learner answers out loud from an English
 * cue, and the app replies. Three app lines and two learner replies, about 20
 * seconds. Written and recorded in advance (docs/POST_QUIZ_CONVERSATION_SPEC.md).
 *
 * Generous listening (Jonathan, 23 Oct; replaces the 18 Oct letter-by-letter rule).
 * Replies are judged by key words in lib/generousMatch.ts, over every guess the
 * recogniser made, ignoring order, fillers, accents and French sound-alikes:
 *   good   green tick, the full correct sentence shown, move on
 *   close  « Tu veux dire : … ? » with the right sentence; counts as understood
 *   miss   « Pas tout à fait. On dit : … » with the French revealed, one more try;
 *          a second miss shows the model answer and moves on. Silence gets « Comment ? ».
 * Tapping the English cue reveals the French, so a learner can read it aloud and
 * keep going; reading it counts. Nothing is ever marked wrong: it is practice.
 *
 * Four options (1.3.16, Jonathan 26 Oct 2026). A reply with three wrong answers
 * in lib/conversationOptions.ts is judged like Masters Mic in quizzes: whatever
 * is heard snaps to the nearest of the four. Right → « Très bien ! » (or
 * « Tu veux dire… ? » when only partly heard, still right); wrong → « Pas tout à
 * fait », the four shown in green/red, and the learner tries again until right.
 * No Show A–D (1.3.19): a stuck learner taps the English cue to see the French.
 * The four appear only after a wrong answer, marked green/red; tapping one answers. Answers
 * that sound the same as the right one count as right. Replies with no options
 * yet keep the generous judging above.
 *
 * Tapping a French bubble flips it to the English; tapping again flips it back.
 * No coins, no marks: it is practice. New words go to Vocab, tagged with the unit.
 */


const INK = "#1B2145";
const SOFT = "#5A6390";
const MUTED = "#7A83A8";
const APP_BUBBLE = "#EAF0FD";
const AVATAR = "#7FA8EC";
const LINE = "#ECEFF7";
const GREEN = "#22A45D";
const RED = "#E63A2E";

const TENSE_LABEL: Record<string, string> = { Present: "Présent", Past: "Passé composé", Future: "Futur simple" };
// The tense names the quiz already stores on vocabulary words, so both group together.
const VOCAB_TENSE: Record<string, string> = { Present: "Présent", Past: "Passé Composé", Future: "Futur Simple" };

type Badge = "correct" | "close" | "unheard" | "notQuite" | "again" | "nearly" | "incorrect";
type LogItem =
  | { kind: "app"; fr: string; en: string; key: string }
  | { kind: "you"; text: string; badge: Badge; key: string };

type Phase = "start" | "speaking" | "yourTurn" | "listening" | "heard" | "model" | "done" | "replaying";

// The recogniser is native-only. Loaded lazily so the web build (staging) still
// renders the screen, with a tap standing in for the voice.
let SR: any = null;
let useSREvent: (name: string, cb: (e: any) => void) => void = () => {};
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require("expo-speech-recognition");
  SR = mod.ExpoSpeechRecognitionModule;
  useSREvent = mod.useSpeechRecognitionEvent;
} catch {
  SR = null;
}
const voiceAvailable = () => {
  if (Platform.OS === "web" || !SR) return false;
  try { return !!SR.isRecognitionAvailable(); } catch { return false; }
};

/** French spacing: the space before ? ! : ; and inside « » never breaks a line. */
const fr = (t: string) => `«\u00A0${t.replace(/ ([?!:;])/g, "\u00A0$1")}\u00A0»`;


/** A French bubble that flips to its English when tapped. */
function FlipBubble(props: { fr: string; en: string; speaking?: boolean; reduceMotion: boolean }) {
  const [english, setEnglish] = useState(false);
  const turn = useRef(new Animated.Value(0)).current;
  const flip = () => {
    Haptics.selectionAsync().catch(() => {});
    if (props.reduceMotion) { setEnglish((x) => !x); return; }
    Animated.timing(turn, { toValue: 1, duration: 140, easing: Easing.in(Easing.quad), useNativeDriver: true })
      .start(() => {
        setEnglish((x) => !x);
        Animated.timing(turn, { toValue: 0, duration: 160, easing: Easing.out(Easing.quad), useNativeDriver: true }).start();
      });
  };
  const rotateY = turn.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "90deg"] });
  return (
    <View style={styles.appRow}>
      <View style={styles.avatar}>
        {props.speaking && <Ionicons name="volume-high" size={17} color="#FFFFFF" />}
      </View>
      <Pressable onPress={flip} accessibilityRole="button"
        accessibilityLabel={english ? props.en : props.fr}
        accessibilityHint={english ? "Shows the French" : "Shows the English"}
        style={{ flexShrink: 1 }}>
        <Animated.View style={[styles.appBubble, english && styles.appBubbleEn, { transform: [{ perspective: 800 }, { rotateY }] }]}>
          {english
            ? <Text style={styles.appTextEn}>{props.en}</Text>
            : <Text style={styles.appText}>{fr(props.fr)}</Text>}
          {props.speaking && !english && <Text style={styles.speaking}>Speaking…</Text>}
        </Animated.View>
      </Pressable>
    </View>
  );
}

const BADGE: Record<Badge, { label: string; bg: string; fg: string }> = {
  correct: { label: "Très bien !", bg: "#E3F7EC", fg: "#15824A" },
  close: { label: "Understood", bg: "#E3F7EC", fg: "#15824A" },
  unheard: { label: "Didn't catch that", bg: "#FFF0DD", fg: "#A35A00" },
  notQuite: { label: "Not quite", bg: "#FFF0DD", fg: "#A35A00" },
  // Four-option replies (1.3.19): first miss → « Comment ? »; second miss → Close or Incorrect.
  again: { label: "Try again", bg: "#FFF0DD", fg: "#A35A00" },
  nearly: { label: "Close", bg: "#FFF0DD", fg: "#A35A00" },
  incorrect: { label: "Incorrect", bg: "#FDE7E5", fg: "#B03426" },
};

export default function ConversationScreen() {
  const p = useLocalSearchParams<{ level: string; timeFrame: string; verb: string }>();
  const level = String(p.level || "");
  const timeFrame = String(p.timeFrame || "");
  const unitVerb = String(p.verb || "");
  // Held for the life of the screen: effects below depend on conv, so it must not change identity between renders.
  const conv = useMemo(() => getConversation(level, timeFrame, unitVerb), [level, timeFrame, unitVerb]);
  const { isPro, loading } = usePro();

  const [phase, setPhase] = useState<Phase>("start");
  // Every conversation opens on its New words: they are not in the quiz
  // curriculum, so the learner sees them before hearing them (Jonathan, 19 Oct).
  // The Start tap also satisfies the browser rule that sound needs a tap first.
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [log, setLog] = useState<LogItem[]>([]);
  const [attempt, setAttempt] = useState(0);
  // Every transcript the recogniser offered this turn (alternatives + interim): the best one counts.
  const heardAllRef = useRef<Set<string>>(new Set());
  // The English cue flips to the French when tapped, so the learner can read it out.
  const [cueOpen, setCueOpen] = useState(false);
  // Four-option replies: A–D hidden until asked for, or until a wrong answer.
  const [showOptions, setShowOptions] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [heard, setHeard] = useState("");
  const [level01, setLevel01] = useState(0);
  const [notice, setNotice] = useState<string | null>(null);
  const [firstTime, setFirstTime] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const startedAt = useRef(Date.now());
  const scroll = useRef<ScrollView>(null);
  const listeningRef = useRef(false);
  const replayQueue = useRef<string[]>([]);
  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);
  const playingRef = useRef(false);
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedRef = useRef(false);
  // Same rule as Masters Mic: on-device French when the phone has it, server
  // recognition only as the fallback.
  const onDeviceRef = useRef(false);
  useEffect(() => {
    if (!voiceAvailable()) return;
    (async () => {
      try {
        if (!SR.supportsOnDeviceRecognition()) return;
        const res = await SR.getSupportedLocales({});
        const installed: string[] = res?.installedLocales ?? [];
        onDeviceRef.current = installed.some((l) => String(l).toLowerCase().startsWith("fr"));
      } catch { onDeviceRef.current = false; }
    })();
  }, []);

  const turns: ConvTurn[] = conv?.turns ?? [];
  const appCount = turns.filter((t) => t.who === "app").length;
  const appReached = turns.slice(0, step + 1).filter((t) => t.who === "app").length;
  const replies = turns.filter((t) => t.who === "you").length;
  const current = turns[step];
  const convKey = `${contentLevel(level)}|${timeFrame}|${unitVerb}`;
  // The four options for this reply, right answer at a random position (fresh per reply).
  const options = useMemo(() => {
    const t = turns[step];
    if (!t || t.who !== "you") return null;
    const wrong = wrongOptions(convKey, t.fr);
    if (!wrong?.length) return null;
    const all = [{ text: t.fr, right: true }, ...wrong.map((w) => ({ text: w, right: false }))];
    for (let i = all.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [all[i], all[j]] = [all[j], all[i]]; }
    return all;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, convKey, conv]);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(() => {});
  }, []);

  // Pro feature. The web build (staging) has no store, so it always shows.
  useEffect(() => {
    if (!loading && !isPro && purchasesAvailable()) router.replace("/paywall" as any);
  }, [loading, isPro]);

  const clearFallback = () => { if (fallbackTimer.current) { clearTimeout(fallbackTimer.current); fallbackTimer.current = null; } };
  useEffect(() => () => {
    clearFallback();
    try { SR?.abort(); } catch {}
  }, []);

  /**
   * Play one app line. Hardened 23 Oct 2026 (build 50: Intermediate lines silent
   * on iPhone, fine on the web). After the learner speaks, iOS still holds the
   * audio session for recording; a clip started then can play silently. So:
   * release the recogniser, wait a beat, switch the session back to playback
   * (retrying), wait for the clip to load, play, nudge it once if it hasn't
   * started, and size the safety timer to the clip's real length.
   */
  const play = useCallback(async (audioKey: string, onEnd: () => void) => {
    clearFallback();
    const src = CONVERSATION_AUDIO[audioKey];
    playingRef.current = true;
    endRef.current = onEnd;
    // If a clip is missing or the player stalls, the conversation still moves on.
    fallbackTimer.current = setTimeout(() => finishPlayback(), 12000);
    const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
    try { SR?.abort(); } catch {}
    await wait(250);
    for (let i = 0; i < 3; i++) {
      try {
        await setAudioModeAsync({ playsInSilentMode: true, allowsRecording: false, shouldRouteThroughEarpiece: false });
        break;
      } catch { await wait(150); }
    }
    try {
      if (!src) throw new Error("missing clip");
      player.replace(src);
      const t0 = Date.now();
      while (!player.isLoaded && Date.now() - t0 < 2000) await wait(50);
      try { player.seekTo(0); } catch {}
      player.play();
      if (player.duration > 0) {
        clearFallback();
        fallbackTimer.current = setTimeout(() => finishPlayback(), (player.duration + 2) * 1000);
      }
      setTimeout(() => {
        if (playingRef.current && !player.playing && !player.currentStatus?.didJustFinish) {
          try { player.play(); } catch {}
        }
      }, 800);
    } catch {
      clearFallback();
      fallbackTimer.current = setTimeout(() => finishPlayback(), 1800);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  const endRef = useRef<() => void>(() => {});
  const finishPlayback = () => {
    if (!playingRef.current) return;
    playingRef.current = false;
    clearFallback();
    const cb = endRef.current;
    endRef.current = () => {};
    cb();
  };

  useEffect(() => {
    if (status.didJustFinish) finishPlayback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status.didJustFinish]);

  // Drive the script: app turns play and advance; learner turns wait for the mic.
  useEffect(() => {
    if (!conv || !started || phase === "done" || phase === "replaying") return;
    if (step >= turns.length) {
      setPhase("done");
      // Review prompt (1.2.4.4): a finished Final conversation is a good moment.
      maybeAskForReview("conversation");
      setSeconds(Math.max(1, Math.round((Date.now() - startedAt.current) / 1000)));
      return;
    }
    const t = turns[step];
    if (t.who === "app" && (phase === "start" || phase === "speaking")) {
      setPhase("speaking");
      setLog((l) => l.some((x) => x.key === `a${step}`) ? l : [...l, { kind: "app", fr: t.fr, en: t.en, key: `a${step}` }]);
      const delay = step === 0 ? 450 : 350;
      const timer = setTimeout(() => play(t.audio, () => {
        setStep((s) => s + 1);
        setPhase((ph) => (ph === "replaying" ? ph : "speaking"));
      }), delay);
      return () => clearTimeout(timer);
    }
    if (t.who === "you" && phase === "speaking") {
      setAttempt(0);
      setCueOpen(false);
      setShowOptions(false);
      setPicked(null);
      heardAllRef.current = new Set();
      setHeard("");
      setNotice(null);
      setPhase("yourTurn");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, phase, conv, started]);

  // Save the conversation's new words to Vocab once it is finished.
  useEffect(() => {
    if (phase !== "done" || savedRef.current || !conv) return;
    savedRef.current = true;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    collectConversationWords(conv.newWords, { level, verb: unitVerb, tense: VOCAB_TENSE[timeFrame] ?? timeFrame }).catch(() => {});
  }, [phase, conv, level, unitVerb, timeFrame]);

  useEffect(() => {
    const t = setTimeout(() => scroll.current?.scrollToEnd({ animated: !reduceMotion }), 60);
    return () => clearTimeout(t);
  }, [log.length, phase, reduceMotion]);

  // ---- Recogniser ----
  useSREvent("volumechange", (e: any) => {
    if (!listeningRef.current) return;
    setLevel01(Math.max(0, Math.min(10, e.value)) / 10);
  });
  useSREvent("result", (e: any) => {
    if (!listeningRef.current) return;
    const text = e.results?.[0]?.transcript ?? "";
    for (const r of e.results ?? []) if (r?.transcript) heardAllRef.current.add(String(r.transcript));
    setHeard(text);
    if (e.isFinal) {
      listeningRef.current = false;
      setLevel01(0);
      setPhase("heard");
    }
  });
  useSREvent("error", (e: any) => {
    if (!listeningRef.current) return;
    listeningRef.current = false;
    setLevel01(0);
    if (e.error === "not-allowed") setNotice("Microphone access is off. Turn it on in Settings › Pluri French.");
    else if (e.error === "no-speech") setNotice("I didn't hear anything. Hold the mic and speak.");
    else setNotice("That didn't record. Hold the mic and try again.");
    setPhase("yourTurn");
  });

  const startListening = async () => {
    if (phase !== "yourTurn" && phase !== "heard") return;
    if (!voiceAvailable()) return;
    try {
      const perm = await SR.requestPermissionsAsync();
      if (!perm.granted) { setNotice("Microphone access is off. Turn it on in Settings › Pluri French."); return; }
    } catch { return; }
    const t = turns[step];
    if (!t || t.who !== "you") return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setHeard("");
    heardAllRef.current = new Set();
    setNotice(null);
    listeningRef.current = true;
    setPhase("listening");
    const base = {
      lang: "fr-FR",
      interimResults: true,
      maxAlternatives: 3,
      continuous: false,
      contextualStrings: options ? [...t.accept, ...options.map((o) => o.text)] : t.accept,
      volumeChangeEventOptions: { enabled: true, intervalMillis: 50 },
      // Keep the loudspeaker: without this iOS routes the next clip to the earpiece.
      iosCategory: { category: "playAndRecord", categoryOptions: ["defaultToSpeaker", "allowBluetooth"], mode: "default" },
    };
    try {
      SR.start({ ...base, requiresOnDeviceRecognition: onDeviceRef.current });
    } catch {
      if (onDeviceRef.current) {
        onDeviceRef.current = false;
        try { SR.start({ ...base, requiresOnDeviceRecognition: false }); return; } catch {}
      }
      listeningRef.current = false;
      setNotice("That didn't record. Hold the mic and try again.");
      setPhase("yourTurn");
    }
  };
  const stopListening = () => {
    if (!listeningRef.current) return;
    try { SR.stop(); } catch {}
  };

  const advance = (delay = 700) => {
    setTimeout(() => {
      setStep((s) => s + 1);
      setPhase("speaking");
    }, delay);
  };

  /** Enter: judge the reply by the 50% rule. On web, a tap stands in for a clear reply. */
  /** Index and score of the option nearest to what was heard (-1 if nothing heard). */
  const nearestOption = (guesses: string[]) => {
    const t = turns[step];
    let best = -1, bestSim = -1, rightSim = 0;
    if (!t || t.who !== "you" || !options) return { best, bestSim, rightSim };
    for (const g of guesses) {
      if (!g?.trim()) continue;
      options.forEach((o, i) => {
        const m = matchAnswer(g, o.right ? [o.text, ...t.accept] : o.text, 1, DEFAULT_THRESHOLDS);
        if (m.similarity > bestSim) { bestSim = m.similarity; best = i; }
        if (o.right) rightSim = Math.max(rightSim, m.similarity);
      });
    }
    // Sounds the same as the right answer → it is the right answer (1.3.15).
    const rightIdx = options.findIndex((o) => o.right);
    if (best >= 0 && best !== rightIdx && soundsAlike(options[best].text, options[rightIdx].text)) best = rightIdx;
    return { best, bestSim, rightSim };
  };

  /** Four-option reply: snap what was heard to the nearest of the four. */
  const submitFour = (guesses: string[], tapped: number | null = null) => {
    const t = turns[step];
    if (!t || t.who !== "you" || !options) return;
    const rightIdx = options.findIndex((o) => o.right);
    const near = tapped === null ? nearestOption(guesses) : { best: tapped, bestSim: 1, rightSim: 0 };
    let best = near.best;
    const bestSim = near.bestSim;
    const k = `y${step}-${attempt}`;
    if (best < 0) {
      // Nothing heard: ask again.
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
      setLog((l) => [...l,
        { kind: "you", text: "…", badge: "unheard", key: k },
        { kind: "app", fr: "Comment ?", en: "Sorry?", key: `${k}-comment` },
      ]);
      setHeard("");
      setPhase("yourTurn");
      return;
    }
    if (best !== rightIdx && soundsAlike(options[best].text, options[rightIdx].text)) best = rightIdx;
    setPicked(best);
    if (best === rightIdx) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      if (attempt === 0) setFirstTime((n) => n + 1);
      const partly = tapped === null && bestSim < DEFAULT_THRESHOLDS.acceptAt;
      setLog((l) => [...l,
        { kind: "you", text: t.fr, badge: partly ? "close" : "correct", key: k },
        ...(partly ? [{ kind: "app" as const, fr: `Tu veux dire : ${t.fr.replace(/[.!?]\s*$/, "")} ?`, en: `Did you mean: ${t.en}`, key: `${k}-tvd` }] : []),
      ]);
      setShowOptions(false);
      setPhase("model");
      advance(partly ? 1600 : 700);
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
    if (attempt === 0) {
      // First miss: the app just asks again, as a person would. No answer shown yet.
      setLog((l) => [...l,
        { kind: "you", text: options[best].text, badge: "again", key: k },
        { kind: "app", fr: "Comment ?", en: "Sorry?", key: `${k}-comment` },
      ]);
      setAttempt(1);
      setHeard("");
      setPhase("yourTurn");
      return;
    }
    // Second miss: Close if it was nearly the right answer, otherwise Incorrect.
    // Either way the right answer is shown and the conversation moves on.
    const nearly = near.rightSim >= DEFAULT_THRESHOLDS.disambiguateAt;
    setLog((l) => [...l,
      // Close: one of the wrong conjugations. Incorrect: something unrelated, shown as heard.
      { kind: "you", text: nearly ? options[best].text : (guesses.find((g) => g?.trim()) || options[best].text), badge: nearly ? "nearly" : "incorrect", key: k },
      { kind: "app", fr: nearly ? `Presque ! On dit : ${t.fr}` : `On dit : ${t.fr}`,
        en: nearly ? `Nearly! You say: ${t.en}` : `You say: ${t.en}`, key: `${k}-model` },
    ]);
    setPhase("model");
    advance(2200);
  };

  const submit = (webTap = false) => {
    const t = turns[step];
    if (!t || t.who !== "you") return;
    if (options) { submitFour(webTap ? [t.fr] : [heard, ...heardAllRef.current]); return; }
    const guesses = webTap ? [t.fr] : [heard, ...heardAllRef.current];
    const judged = judgeReply(guesses, t.accept, unitVerb);
    const said = webTap ? t.fr : (judged.best || heard);
    const k = `y${step}-${attempt}`;
    if (judged.verdict === "good") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      if (attempt === 0) setFirstTime((n) => n + 1);
      setLog((l) => [...l, { kind: "you", text: t.fr, badge: "correct", key: k }]);
      setPhase("model");
      advance(700);
    } else if (judged.verdict === "close") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      if (attempt === 0) setFirstTime((n) => n + 1);
      setLog((l) => [...l,
        { kind: "you", text: said, badge: "close", key: k },
        { kind: "app", fr: `Tu veux dire : ${t.fr.replace(/[.!?]\s*$/, "")} ?`, en: `Did you mean: ${t.en}`, key: `${k}-tvd` },
      ]);
      setPhase("model");
      advance(1600);
    } else if (attempt === 0 && !said.trim()) {
      // Nothing heard: ask again.
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
      setLog((l) => [...l,
        { kind: "you", text: "…", badge: "unheard", key: k },
        { kind: "app", fr: "Comment ?", en: "Sorry?", key: `${k}-comment` },
      ]);
      setAttempt(1);
      setHeard("");
      setPhase("yourTurn");
    } else if (attempt === 0) {
      // Heard, but it isn't the answer: say so plainly, show the French, one more try.
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
      setLog((l) => [...l,
        { kind: "you", text: said, badge: "notQuite", key: k },
        { kind: "app", fr: `Pas tout à fait. On dit : ${t.fr}`, en: `Not quite. You say: ${t.en}`, key: `${k}-ptaf` },
      ]);
      setAttempt(1);
      setCueOpen(true);
      setHeard("");
      setPhase("yourTurn");
    } else {
      setLog((l) => [...l, { kind: "you", text: said || "…", badge: "notQuite", key: k }]);
      setPhase("model");
    }
  };

  const replayAll = () => {
    replayQueue.current = turns.filter((t) => t.who === "app").map((t) => (t as any).audio);
    setPhase("replaying");
    const next = () => {
      const a = replayQueue.current.shift();
      if (!a) { setPhase("done"); return; }
      play(a, () => setTimeout(next, 500));
    };
    next();
  };

  const leave = () => {
    try { SR?.abort(); } catch {}
    try { player.pause(); } catch {}
    if (router.canGoBack()) router.back(); else router.replace("/");
  };
  /** Continue: back past the results screen to the course, the next part of it. */
  const continueOn = async () => {
    try { SR?.abort(); } catch {}
    try { player.pause(); } catch {}
    // Vocab check (21 Oct 2026) follows the conversation. It takes this
    // screen's place, so its own Continue still lands back on the course.
    const unit = unitKey(level, timeFrame, unitVerb);
    if ((await countDue(unit).catch(() => 0)) > 0) {
      router.replace({ pathname: "/vocab-check" as any, params: { level, timeFrame, verb: unitVerb } });
      return;
    }
    try { (router as any).dismiss(2); return; } catch {}
    if (router.canGoBack()) router.back(); else router.replace("/");
  };

  if (!conv) {
    return (
      <View style={[styles.screen, { alignItems: "center", justifyContent: "center", padding: 24 }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.title}>No conversation for this unit yet.</Text>
        <Pressable style={[styles.primary, { marginTop: 20, alignSelf: "stretch" }]} onPress={leave}>
          <Text style={styles.primaryText}>Back</Text>
        </Pressable>
      </View>
    );
  }

  const youTurn = current?.who === "you" ? current : null;
  const speaking = phase === "speaking" || phase === "replaying";
  const lastAppKey = [...log].reverse().find((x) => x.kind === "app")?.key;
  const canMic = (phase === "yourTurn" || phase === "heard") && voiceAvailable();
  const webMode = !voiceAvailable();
  const verbLabel = conv.verb;

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Pressable onPress={leave} accessibilityRole="button" accessibilityLabel="Close conversation" style={styles.close}>
          <Ionicons name="close" size={20} color="#47507A" />
        </Pressable>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={styles.title}>Final conversation</Text>
          <Text style={styles.subtitle}>{level} · {verbLabel} · {TENSE_LABEL[timeFrame] ?? timeFrame}</Text>
        </View>
        <Text style={styles.count}>{started ? Math.min(appReached, appCount) : 0} / {appCount}</Text>
      </View>

      <ScrollView ref={scroll} style={{ flex: 1 }} contentContainerStyle={styles.body}>
        {!started && (
          <View style={styles.intro}>
            <Text style={styles.introLabel}>NEW WORDS IN THIS CONVERSATION</Text>
            {conv.newWords.map((w) => (
              <View key={w.fr} style={styles.introRow}>
                <Text style={styles.introFr}>{w.fr}</Text>
                <Text style={styles.introEn}>{w.en}</Text>
              </View>
            ))}
            <Text style={styles.introNote}>
              Listen, then answer out loud from the English cue. Tap any French bubble to see it in English.
            </Text>
          </View>
        )}

        {log.map((item) =>
          item.kind === "app" ? (
            <FlipBubble key={item.key} fr={item.fr} en={item.en} reduceMotion={reduceMotion}
              speaking={speaking && item.key === lastAppKey && playingRef.current} />
          ) : (
            <View key={item.key} style={styles.youWrap}>
              <View style={[styles.youBubble, item.badge === "correct" || item.badge === "close" ? styles.youGood : styles.youGrey]}>
                <Text style={[styles.youText, item.badge === "correct" || item.badge === "close" ? { color: "#FFFFFF" } : { color: SOFT }]}>
                  {fr(item.text)}
                </Text>
              </View>
              <View style={[styles.badge, { backgroundColor: BADGE[item.badge].bg }]}>
                {(item.badge === "correct" || item.badge === "close") &&
                  <Ionicons name="checkmark" size={14} color={BADGE[item.badge].fg} />}
                <Text style={[styles.badgeText, { color: BADGE[item.badge].fg }]}>{BADGE[item.badge].label}</Text>
              </View>
            </View>
          ),
        )}


        {youTurn && (phase === "yourTurn" || phase === "listening" || phase === "heard") && (
          <Pressable style={styles.cue} accessibilityLiveRegion="polite" accessibilityRole="button"
            accessibilityHint={cueOpen ? undefined : "Shows the answer in French"}
            onPress={() => { Haptics.selectionAsync().catch(() => {}); setCueOpen((o) => !o); }}>
            <Text style={styles.cueLabel}>SAY IT IN FRENCH</Text>
            <Text style={styles.cueText}>"{youTurn.en}"</Text>
            {cueOpen ? (
              <View style={styles.cueReveal}>
                <Text style={styles.cueRevealText} accessibilityLanguage="fr">{fr(youTurn.fr)}</Text>
                <Text style={styles.cueHint}>Read it out loud — that counts.</Text>
              </View>
            ) : (
              <Text style={styles.cueHint}>Stuck? Tap to see it in French</Text>
            )}
          </Pressable>
        )}

        {youTurn && options && showOptions && (phase === "yourTurn" || phase === "heard") && (
          <View style={styles.optWrap}>
            {showOptions && options.map((o, i) => {
              const marked = picked !== null && attempt > 0;
              const isRight = marked && o.right;
              const isWrong = marked && picked === i && !o.right;
              return (
                <Pressable key={i} onPress={() => submitFour([], i)} accessibilityRole="button"
                  accessibilityLabel={`${String.fromCharCode(65 + i)}. ${o.text}`}
                  style={[styles.opt, isRight && styles.optRight, isWrong && styles.optWrong, marked && !isRight && !isWrong && { opacity: 0.55 }]}>
                  <Text style={[styles.optLetter, isRight && { color: "#15824A" }, isWrong && { color: "#B03426" }]}>{String.fromCharCode(65 + i)}</Text>
                  <Text style={[styles.optText, isRight && { color: "#0F5A38", fontWeight: "700" }, isWrong && { color: "#9B2C20" }]}
                    accessibilityLanguage="fr">{o.text}</Text>
                  {isWrong && <Text style={styles.optTag}>You said</Text>}
                </Pressable>
              );
            })}
          </View>
        )}

        {youTurn && phase === "model" && log[log.length - 1]?.kind === "you" &&
          (log[log.length - 1] as any).badge === "notQuite" && (
          <View style={styles.model}>
            <Text style={styles.modelLabel}>SAY IT LIKE THIS</Text>
            <Text style={styles.modelText}>{fr(youTurn.fr)}</Text>
            <Text style={styles.modelSub}>{youTurn.en} Nothing is marked wrong.</Text>
          </View>
        )}

        {(phase === "listening" || phase === "heard") && (
          <View style={styles.heardWrap}>
            <View style={styles.eq} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
              {Array.from({ length: 13 }).map((_, i) => {
                const shape = [0.25, 0.45, 0.65, 0.85, 1, 0.8, 0.9, 0.6, 0.75, 0.5, 0.55, 0.35, 0.2][i];
                const h = phase === "listening" ? 10 + 60 * shape * Math.max(0.15, level01) : 8;
                return <View key={i} style={[styles.eqBar, { height: h }]} />;
              })}
            </View>
            {heard ? (
              <View style={{ alignItems: "center", gap: 2 }} accessibilityLiveRegion="polite">
                <Text style={styles.heardLabel}>Heard</Text>
                <Text style={styles.heardSaid}>{heard}</Text>
                {/* 1.3.19: like Masters Mic in quizzes, the option this will count as. */}
                {options && phase === "heard" && (() => {
                  const g = nearestOption([heard, ...heardAllRef.current]).best;
                  return g >= 0 ? <Text style={styles.heardSnap}>{"\u2192 "}{options[g].text}</Text> : null;
                })()}
              </View>
            ) : (
              <Text style={styles.heardText}>{phase === "listening" ? "Listening…" : ""}</Text>
            )}
          </View>
        )}

        {notice && <Text style={styles.notice}>{notice}</Text>}

        {(phase === "done" || phase === "replaying") && (
          <View style={styles.doneCard}>
            <View style={styles.doneTick}><Ionicons name="checkmark" size={32} color="#FFFFFF" /></View>
            <Text style={styles.doneTitle}>Conversation complete</Text>
            <Text style={styles.doneSub}>
              {firstTime} of {replies} replies understood first time · {seconds} seconds
            </Text>
            {conv.newWords.length > 0 && (
              <>
                <Text style={styles.wordsLabel}>Added to your Vocab</Text>
                <View style={styles.chips}>
                  {conv.newWords.map((w) => (
                    <View key={w.fr} style={styles.chip}>
                      <Text style={styles.chipText}>{w.fr}</Text>
                    </View>
                  ))}
                </View>
              </>
            )}
          </View>
        )}
      </ScrollView>

      {!started ? (
        <View style={styles.footerDone}>
          <Pressable style={styles.primary} onPress={() => { startedAt.current = Date.now(); setStarted(true); }} accessibilityRole="button">
            <Text style={styles.primaryText}>Start conversation</Text>
          </Pressable>
        </View>
      ) : phase === "done" || phase === "replaying" ? (
        <View style={styles.footerDone}>
          <Pressable style={styles.primary} onPress={continueOn} accessibilityRole="button">
            <Text style={styles.primaryText}>Continue</Text>
          </Pressable>
          <Pressable style={styles.linkBtn} onPress={replayAll} disabled={phase === "replaying"} accessibilityRole="button">
            <Text style={styles.linkText}>{phase === "replaying" ? "Playing…" : "Hear the whole conversation again"}</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.footer}>
          <View style={styles.side}>
            <Pressable
              onPress={() => {
                const last = [...turns.slice(0, step + 1)].reverse().find((t) => t.who === "app") as any;
                if (last && !speaking) play(last.audio, () => {});
              }}
              disabled={speaking || phase === "listening"}
              accessibilityRole="button" accessibilityLabel="Hear it again"
              style={[styles.sideBtn, { backgroundColor: "#7FA8EC", opacity: speaking || phase === "listening" ? 0.4 : 1 }]}>
              <Ionicons name="refresh" size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.sideLabel}>Again</Text>
          </View>

          <View style={{ alignItems: "center", gap: 8 }}>
            {webMode ? (
              <Pressable
                onPress={() => submit(true)}
                disabled={!(phase === "yourTurn" || phase === "heard")}
                accessibilityRole="button" accessibilityLabel="Answer (web preview)"
                style={[styles.mic, { backgroundColor: phase === "yourTurn" ? RED : "#E3E6F0" }]}>
                <Ionicons name="mic" size={36} color={phase === "yourTurn" ? "#FFFFFF" : "#9AA1BD"} />
              </Pressable>
            ) : (
              <Pressable
                onPressIn={startListening}
                onPressOut={stopListening}
                disabled={!canMic && phase !== "listening"}
                accessibilityRole="button"
                accessibilityLabel={phase === "listening" ? "Recording, release to stop" : "Hold to speak"}
                style={[styles.mic,
                  phase === "listening" ? styles.micLive : canMic ? { backgroundColor: RED } : { backgroundColor: "#E3E6F0" }]}>
                <Ionicons name="mic" size={36} color={canMic || phase === "listening" ? "#FFFFFF" : "#9AA1BD"} />
              </Pressable>
            )}
            <Text style={[styles.micLabel, !(canMic || phase === "listening" || (webMode && phase === "yourTurn")) && { color: "#9AA1BD" }]}>
              {speaking ? "Listen first"
                : phase === "listening" ? "Recording"
                : phase === "model" ? " "
                : webMode ? "Tap to answer"
                : "Hold to speak"}
            </Text>
          </View>

          <View style={styles.side}>
            {phase === "model" && (log[log.length - 1] as any)?.badge === "notQuite" ? (
              <>
                <Pressable onPress={() => advance(0)} accessibilityRole="button" accessibilityLabel="Next"
                  style={[styles.sideBtn, { backgroundColor: GREEN }]}>
                  <Ionicons name="arrow-forward" size={26} color="#FFFFFF" />
                </Pressable>
                <Text style={styles.sideLabel}>Next</Text>
              </>
            ) : (
              <>
                <Pressable onPress={() => submit(false)} disabled={phase !== "heard"}
                  accessibilityRole="button" accessibilityLabel="Enter"
                  style={[styles.sideBtn, { backgroundColor: phase === "heard" ? GREEN : "#CFEFDC" }]}>
                  <Ionicons name="return-down-back" size={26} color="#FFFFFF" />
                </Pressable>
                <Text style={[styles.sideLabel, phase !== "heard" && { color: "#9AA1BD" }]}>Enter</Text>
              </>
            )}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },
  header: {
    paddingTop: 58, paddingHorizontal: 18, paddingBottom: 12, flexDirection: "row",
    alignItems: "center", borderBottomWidth: 1, borderBottomColor: LINE,
  },
  close: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#F2F4FA", alignItems: "center", justifyContent: "center" },
  title: { fontSize: 17, fontWeight: "800", color: INK },
  subtitle: { fontSize: 12, fontWeight: "600", color: MUTED, marginTop: 2 },
  count: { width: 44, textAlign: "right", fontSize: 14, fontWeight: "700", color: MUTED },
  body: { padding: 18, paddingTop: 22, gap: 14, paddingBottom: 30 },
  appRow: { flexDirection: "row", gap: 10, alignItems: "flex-end", maxWidth: "88%" },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: AVATAR, alignItems: "center", justifyContent: "center" },
  appBubble: {
    paddingVertical: 12, paddingHorizontal: 16, backgroundColor: APP_BUBBLE,
    borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 6,
  },
  appBubbleEn: { backgroundColor: "#F6F8FE", borderWidth: 1, borderColor: "#DCE4F8" },
  appText: { fontSize: 19, fontWeight: "700", color: INK, lineHeight: 25 },
  appTextEn: { fontSize: 17, fontWeight: "600", color: SOFT, lineHeight: 23 },
  speaking: { fontSize: 13, fontWeight: "700", color: "#3E63D8", marginTop: 6 },
  tip: { marginLeft: 46, fontSize: 14, color: MUTED },
  youWrap: { alignSelf: "flex-end", alignItems: "flex-end", gap: 6, maxWidth: "80%" },
  youBubble: {
    paddingVertical: 11, paddingHorizontal: 16,
    borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 6,
  },
  youGood: { backgroundColor: INK },
  youGrey: { backgroundColor: "#E9ECF5" },
  youText: { fontSize: 17, fontWeight: "700", lineHeight: 23 },
  badge: { flexDirection: "row", alignItems: "center", gap: 5, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  badgeText: { fontSize: 12, fontWeight: "800" },
  intro: { padding: 20, borderRadius: 22, backgroundColor: "#F6F8FE", borderWidth: 1, borderColor: "#DCE4F8", gap: 12 },
  introLabel: { fontSize: 12, fontWeight: "800", letterSpacing: 1, color: SOFT },
  introRow: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: 12,
    paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: LINE },
  introFr: { fontSize: 20, fontWeight: "800", color: INK, flexShrink: 1 },
  introEn: { fontSize: 16, color: SOFT, textAlign: "right", flexShrink: 1 },
  introNote: { fontSize: 14, color: MUTED, lineHeight: 20 },
  cue: {
    alignSelf: "flex-end", maxWidth: "85%", padding: 14, borderRadius: 18,
    borderWidth: 2, borderStyle: "dashed", borderColor: "#F5C518", backgroundColor: "#FFF8DD", gap: 4,
  },
  cueLabel: { fontSize: 12, fontWeight: "800", letterSpacing: 1, color: "#9A7400" },
  cueText: { fontSize: 18, fontWeight: "700", color: INK },
  cueHint: { fontSize: 12, fontWeight: "600", color: "#9A7400", marginTop: 2 },
  cueReveal: { marginTop: 6, paddingTop: 8, borderTopWidth: 1, borderTopColor: "#F0DFA0", gap: 2 },
  cueRevealText: { fontSize: 19, fontWeight: "800", color: INK },
  model: { padding: 16, borderRadius: 18, borderWidth: 1, borderColor: "#C9D6F5", backgroundColor: "#F6F8FE", gap: 4 },
  modelLabel: { fontSize: 12, fontWeight: "800", letterSpacing: 1, color: SOFT },
  modelText: { fontSize: 19, fontWeight: "800", color: INK },
  modelSub: { fontSize: 13, color: SOFT },
  heardWrap: { alignItems: "center", gap: 10, marginTop: 8 },
  eq: { flexDirection: "row", alignItems: "flex-end", gap: 5, height: 72 },
  eqBar: { width: 9, borderRadius: 3, backgroundColor: "#22C7E0" },
  heardText: { fontSize: 14, fontWeight: "800", color: RED, textAlign: "center" },
  heardLabel: { fontSize: 13, fontWeight: "800", letterSpacing: 1.3, color: RED, textAlign: "center" },
  heardSaid: { fontSize: 17, fontWeight: "700", color: INK, textAlign: "center" },
  // Light blue, darkened enough to read on the white conversation screen.
  heardSnap: { fontSize: 15, fontWeight: "700", color: "#0284C7", textAlign: "center" },
  notice: { fontSize: 14, color: "#A35A00", textAlign: "center" },
  doneCard: {
    marginTop: 10, padding: 24, borderRadius: 24, backgroundColor: "#F6F8FE",
    borderWidth: 1, borderColor: "#DCE4F8", alignItems: "center", gap: 10,
  },
  doneTick: { width: 64, height: 64, borderRadius: 32, backgroundColor: GREEN, alignItems: "center", justifyContent: "center" },
  doneTitle: { fontSize: 25, fontWeight: "800", color: INK },
  doneSub: { fontSize: 15, color: "#47507A", textAlign: "center" },
  wordsLabel: { fontSize: 12, fontWeight: "800", letterSpacing: 1, color: SOFT, marginTop: 6, textTransform: "uppercase" },
  chips: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 8 },
  chip: { paddingVertical: 7, paddingHorizontal: 12, borderRadius: 14, backgroundColor: APP_BUBBLE },
  chipText: { color: "#3E63D8", fontSize: 15, fontWeight: "700" },
  footer: {
    paddingTop: 16, paddingBottom: 38, paddingHorizontal: 26, borderTopWidth: 1, borderTopColor: LINE,
    flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start",
  },
  side: { width: 80, alignItems: "center", gap: 8 },
  sideBtn: { width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center" },
  sideLabel: { fontSize: 13, fontWeight: "700", color: "#47507A" },
  mic: { width: 96, height: 96, borderRadius: 48, alignItems: "center", justifyContent: "center" },
  micLive: { backgroundColor: RED, borderWidth: 6, borderColor: "#FFD0CC" },
  micLabel: { fontSize: 15, fontWeight: "800", color: INK },
  footerDone: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 40, gap: 10 },
  primary: {
    height: 56, borderRadius: 28, backgroundColor: "#7FA8EC", borderWidth: 1, borderColor: "#A3BCF4",
    alignItems: "center", justifyContent: "center",
  },
  primaryText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  linkBtn: { height: 44, alignItems: "center", justifyContent: "center" },
  linkText: { color: "#3E63D8", fontSize: 16, fontWeight: "700" },
  optWrap: { marginTop: 10, gap: 8 },
  opt: { flexDirection: "row", alignItems: "center", gap: 10, borderWidth: 2, borderColor: "#D6DBE8",
    backgroundColor: "#FFFFFF", borderRadius: 14, paddingVertical: 12, paddingHorizontal: 14 },
  optRight: { borderColor: "#17734A", backgroundColor: "#E7F3EC" },
  optWrong: { borderColor: "#C0392B", backgroundColor: "#F9ECEA" },
  optLetter: { width: 22, color: "#5A6390", fontWeight: "800", fontSize: 14 },
  optText: { flex: 1, color: "#1B2145", fontSize: 16 },
  optTag: { color: "#B03426", fontSize: 12, fontWeight: "700" },
});
