import React, { useEffect, useMemo, useRef, useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { DEFAULT_THRESHOLDS, matchAnswer } from "@shared/answerMatch";
import { soundsAlike } from "@shared/soundAlike";
import { STOCK_LINES, convClip } from "@shared/advanced/audioKeys";
import type { AdvTurn, AdvUnit } from "@shared/advanced/types";

/**
 * Conversation (Advanced units), the old translate format (Jonathan, 2 Nov
 * 2026: spontaneous answers don't work, so the learner says the English cue in
 * French). Laid out like the post-quiz conversation.
 *
 *  - Cécile speaks; the learner holds the mic and says the cue in French.
 *  - Whatever is heard snaps to the nearest of four sentences: the right one
 *    and three wrong ones built around the unit verb (wrong tense, ending or
 *    auxiliary). Sounding the same as the right one counts as right.
 *  - A miss (Jonathan, 2 Nov 2026, same as the Beginner–Intermediate
 *    conversations): no list of options. The sentence it matched is ruled out,
 *    shown struck through ("Ruled out: …"), and Cécile says « Pas tout à fait.
 *    Essayez encore. » (the Advanced line, kept on purpose). The next
 *    attempt is matched only against what's left, so the field narrows until
 *    the right one. Recording again over a wrong match also rules it out.
 *    Speech that sounds like none of what's left gets « Comment ? » and rules
 *    nothing out. Tapping the yellow card shows the French to read aloud.
 *  - Tapping a French bubble flips it to English. No coins: it is practice.
 * The web build (staging) has no recogniser: a tap on the mic stands in for a
 * clear right answer, as in app/conversation.tsx.
 */

const INK = "#1B2145";
const SOFT = "#5A6390";
const MUTED = "#7A83A8";
const APP_BUBBLE = "#EAF0FD";
const AVATAR = "#7FA8EC";
const LINE = "#ECEFF7";
const GREEN = "#22A45D";
const RED = "#E63A2E";

let SR: any = null;
let useSREvent: (name: string, cb: (e: any) => void) => void = () => {};
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require("expo-speech-recognition");
  SR = mod.ExpoSpeechRecognitionModule;
  useSREvent = mod.useSpeechRecognitionEvent;
} catch { SR = null; }
const voiceAvailable = () => {
  if (Platform.OS === "web" || !SR) return false;
  try { return !!SR.isRecognitionAvailable(); } catch { return false; }
};

type Log =
  | { kind: "app"; fr: string; en: string; key: string }
  | { kind: "you"; text: string; good: boolean; key: string };
type Phase = "speaking" | "yourTurn" | "listening" | "heard" | "done";
type You = Extract<AdvTurn, { who: "you" }>;

const fr = (t: string) => t.replace(/ ([?!:;»])/g, " $1").replace(/« /g, "« ");
const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };

export default function ConvStep({ unit, play, stop, onDone }: {
  unit: AdvUnit;
  play: (items: { key: string; text: string }[], onEnd?: () => void) => void;
  stop: () => void;
  onDone: (r: { replies: number; firstTime: number }) => void;
}) {
  const turns = unit.conversation.turns;
  const replies = turns.filter((t) => t.who === "you").length;
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("speaking");
  const [log, setLog] = useState<Log[]>([]);
  const [heard, setHeard] = useState("");
  const [heardAll, setHeardAll] = useState<string[]>([]);
  const [cueOpen, setCueOpen] = useState(false);
  const [misses, setMisses] = useState(0);
  const [ruledOut, setRuledOut] = useState<number[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [level01, setLevel01] = useState(0);
  const [firstTime, setFirstTime] = useState(0);
  const scroll = useRef<ScrollView>(null);
  const n = useRef(0);
  const k = () => `${n.current++}`;
  const webMode = !voiceAvailable();
  const cur = turns[step];
  const you = cur?.who === "you" ? (cur as You) : null;
  const options = useMemo(() => you ? shuffle([{ text: you.fr, right: true }, ...you.options.map((o) => ({ text: o, right: false }))]) : [], [you]);

  // ---- Script: Cécile's lines play and move on; the learner's turns wait for the mic.
  useEffect(() => {
    if (phase === "done") return;
    if (step >= turns.length) { setPhase("done"); return; }
    const t = turns[step];
    if (t.who === "app") {
      setPhase("speaking");
      setLog((l) => [...l, { kind: "app", fr: t.fr, en: t.en, key: k() }]);
      const timer = setTimeout(() => play([{ key: convClip(unit.id, step), text: t.fr }], () => setStep((s) => s + 1)), step === 0 ? 450 : 300);
      return () => clearTimeout(timer);
    }
    setHeard(""); setHeardAll([]); setCueOpen(false); setMisses(0); setRuledOut([]); setNotice(null);
    setPhase("yourTurn");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);
  useEffect(() => () => { stop(); try { SR?.abort(); } catch {} }, [stop]);
  useEffect(() => {
    const t = setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 60);
    return () => clearTimeout(t);
  }, [log.length, phase, ruledOut.length]);

  // ---- Mic (same pattern as app/conversation.tsx)
  const listeningRef = useRef(false);
  const holdingRef = useRef(false);
  const committedRef = useRef("");
  const lastAltsRef = useRef<string[]>([]);
  const restartsRef = useRef(0);
  const baseRef = useRef<any>(null);
  const onDeviceRef = useRef(false);
  useEffect(() => {
    if (!voiceAvailable()) return;
    (async () => {
      try {
        if (!SR.supportsOnDeviceRecognition()) return;
        const res = await SR.getSupportedLocales({});
        onDeviceRef.current = (res?.installedLocales ?? []).some((l: string) => String(l).toLowerCase().startsWith("fr"));
      } catch { onDeviceRef.current = false; }
    })();
  }, []);
  useSREvent("volumechange", (e: any) => { if (listeningRef.current) setLevel01(Math.max(0, Math.min(10, e.value)) / 10); });
  const joinWords = (a: string, b: string) => [a.trim(), b.trim()].filter(Boolean).join(" ");
  const finishReply = () => {
    if (!listeningRef.current) return;
    listeningRef.current = false; holdingRef.current = false; setLevel01(0);
    const said = (lastAltsRef.current.length ? lastAltsRef.current : [committedRef.current]).filter((a) => a.trim());
    if (!said.length) { setHeard(""); setNotice("I didn't hear anything. Hold the mic and speak."); setPhase("yourTurn"); return; }
    setHeardAll(said); setHeard(said[0]); setPhase("heard");
  };
  const keepListening = () => {
    if (!holdingRef.current || !listeningRef.current || !baseRef.current || restartsRef.current >= 5) return false;
    restartsRef.current += 1;
    try { SR.start({ ...baseRef.current, requiresOnDeviceRecognition: onDeviceRef.current }); return true; } catch { return false; }
  };
  useSREvent("result", (e: any) => {
    if (!listeningRef.current) return;
    const prefix = committedRef.current;
    const alts: string[] = (e.results ?? []).map((r: any) => joinWords(prefix, String(r?.transcript ?? "")));
    const shown = alts[0] ?? prefix;
    setHeard(shown);
    if (!e.isFinal) return;
    if (alts.length && shown !== prefix) { committedRef.current = shown; lastAltsRef.current = alts; }
    if (holdingRef.current) return;
    finishReply();
  });
  useSREvent("end", () => { if (!listeningRef.current) return; if (keepListening()) return; finishReply(); });
  useSREvent("nomatch", () => { if (!listeningRef.current || holdingRef.current) return; finishReply(); });
  useSREvent("error", (e: any) => {
    if (!listeningRef.current) return;
    if (e.error === "no-speech" || e.error === "aborted") {
      if (holdingRef.current && e.error === "no-speech" && keepListening()) return;
      finishReply(); return;
    }
    listeningRef.current = false; holdingRef.current = false; setLevel01(0);
    setNotice(e.error === "not-allowed" ? "Microphone access is off. Turn it on in Settings › Pluri French." : "That didn't record. Hold the mic and try again.");
    setPhase("yourTurn");
  });
  const startListening = async () => {
    holdingRef.current = true;
    if (!you || (phase !== "yourTurn" && phase !== "heard") || !voiceAvailable()) return;
    try {
      const perm = await SR.requestPermissionsAsync();
      if (!perm.granted) { setNotice("Microphone access is off. Turn it on in Settings › Pluri French."); return; }
    } catch { return; }
    if (!holdingRef.current) return;
    // Recording again over a wrong match = turning it down (as in app/conversation.tsx).
    if (phase === "heard" && heard.trim()) {
      const g = nearest([heard, ...heardAll]).best;
      if (g >= 0 && !options[g].right) setRuledOut((r) => r.includes(g) ? r : [...r, g]);
    }
    stop();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setHeard(""); setHeardAll([]); committedRef.current = ""; lastAltsRef.current = []; restartsRef.current = 0; setNotice(null);
    listeningRef.current = true;
    setPhase("listening");
    const base = {
      lang: "fr-FR", interimResults: true, maxAlternatives: 3, continuous: true,
      contextualStrings: [...you.accept, ...you.options],
      volumeChangeEventOptions: { enabled: true, intervalMillis: 50 },
      iosCategory: { category: "playAndRecord", categoryOptions: ["defaultToSpeaker", "allowBluetooth"], mode: "default" },
    };
    baseRef.current = base;
    try { SR.start({ ...base, requiresOnDeviceRecognition: onDeviceRef.current }); }
    catch {
      if (onDeviceRef.current) { onDeviceRef.current = false; try { SR.start({ ...base, requiresOnDeviceRecognition: false }); return; } catch {} }
      listeningRef.current = false; setNotice("That didn't record. Hold the mic and try again."); setPhase("yourTurn");
    }
  };
  const stopListening = () => { holdingRef.current = false; if (!listeningRef.current) return; try { SR.stop(); } catch {} };

  // ---- Judging: snap to the nearest of the four.
  const nearest = (guesses: string[]) => {
    let best = -1, bestSim = -1;
    if (!you) return { best, bestSim };
    for (const g of guesses) {
      if (!g?.trim()) continue;
      options.forEach((o, i) => {
        if (ruledOut.includes(i)) return;
        const m = matchAnswer(g, o.right ? [o.text, ...you.accept] : o.text, 1, DEFAULT_THRESHOLDS);
        if (m.similarity > bestSim) { bestSim = m.similarity; best = i; }
      });
    }
    const rightIdx = options.findIndex((o) => o.right);
    if (best >= 0 && best !== rightIdx && soundsAlike(options[best].text, options[rightIdx].text)) best = rightIdx;
    return { best, bestSim };
  };

  const answer = (idx: number) => {
    if (!you) return;
    const o = options[idx];
    if (o.right) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
      if (!misses && !ruledOut.length) setFirstTime((x) => x + 1);
      setLog((l) => [...l, { kind: "you", text: you.fr, good: true, key: k() }]);
      setPhase("speaking");
      setTimeout(() => setStep((s) => s + 1), 700);
      return;
    }
    // Wrong: rule it out and ask again. No list of options (same as the earlier levels).
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
    setRuledOut((r) => r.includes(idx) ? r : [...r, idx]);
    setMisses((m) => m + 1);
    setHeard(""); setHeardAll([]);
    // Every miss: « Pas tout à fait. Essayez encore. » (Jonathan, 2 Nov 2026: keep the Advanced line).
    const line = { key: "ADV_TRY_AGAIN", fr: STOCK_LINES.ADV_TRY_AGAIN, en: "Not quite. Try again." };
    setLog((l) => [...l,
      { kind: "you", text: o.text, good: false, key: k() },
      { kind: "app", fr: line.fr, en: line.en, key: k() },
    ]);
    setPhase("speaking");
    play([{ key: line.key, text: line.fr }], () => setPhase("yourTurn"));
  };

  const enter = () => {
    if (!you) return;
    if (webMode) { answer(options.findIndex((o) => o.right)); return; }
    if (phase !== "heard") return;
    const { best, bestSim } = nearest([heard, ...heardAll]);
    if (best < 0 || bestSim < 0.35) {
      // Sounds like none of what's left: ask again, rule nothing out.
      setLog((l) => [...l, { kind: "app", fr: STOCK_LINES.ADV_COMMENT, en: "Sorry?", key: k() }]);
      setHeard(""); setHeardAll([]);
      setPhase("speaking");
      play([{ key: "ADV_COMMENT", text: STOCK_LINES.ADV_COMMENT }], () => setPhase("yourTurn"));
      return;
    }
    answer(best);
  };

  const snapped = phase === "heard" && heard ? nearest([heard, ...heardAll]) : null;
  const yourTurn = !!you && (phase === "yourTurn" || phase === "listening" || phase === "heard");
  const canMic = phase === "yourTurn" || phase === "heard";
  const canEnter = phase === "heard" || (webMode && phase === "yourTurn");

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Conversation</Text>
          <Text style={styles.subtitle}>{unit.id} · {unit.title} · {unit.verb}</Text>
        </View>
        <Text style={styles.count}>{Math.min(turns.slice(0, step + 1).filter((t) => t.who === "you").length, replies)} / {replies}</Text>
      </View>

      <ScrollView ref={scroll} style={{ flex: 1 }} contentContainerStyle={styles.body}>
        <Text style={styles.scene}>{unit.conversation.scene}</Text>
        {log.map((item) => item.kind === "app" ? <Bubble key={item.key} fr={item.fr} en={item.en} /> : (
          <View key={item.key} style={styles.youWrap}>
            <View style={[styles.youBubble, item.good ? styles.youGood : styles.youGrey]}>
              <Text style={[styles.youText, { color: item.good ? "#FFFFFF" : SOFT }]}>{fr(item.text)}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: item.good ? "#E3F7EC" : "#FFF0DD" }]}>
              {item.good && <Ionicons name="checkmark" size={14} color="#15824A" />}
              <Text style={[styles.badgeText, { color: item.good ? "#15824A" : "#A35A00" }]}>{item.good ? "Très bien !" : "Not quite"}</Text>
            </View>
          </View>
        ))}

        {yourTurn && you && (
          <Pressable style={styles.cue} onPress={() => { Haptics.selectionAsync().catch(() => {}); setCueOpen((o) => !o); }}
            accessibilityRole="button" accessibilityHint={cueOpen ? undefined : "Shows the answer in French"}>
            <Text style={styles.cueLabel}>SAY IT IN FRENCH</Text>
            <Text style={styles.cueText}>“{you.en}”</Text>
            {cueOpen ? (
              <View style={styles.cueReveal}>
                <Text style={styles.cueRevealText} accessibilityLanguage="fr">{fr(you.fr)}</Text>
                <Text style={styles.cueHint}>Read it aloud — that counts.</Text>
              </View>
            ) : <Text style={styles.cueHint}>Stuck? Tap to see it in French</Text>}
          </Pressable>
        )}

        {(phase === "listening" || phase === "heard") && (
          <View style={styles.heardWrap}>
            <View style={styles.eq} importantForAccessibility="no-hide-descendants" accessibilityElementsHidden>
              {Array.from({ length: 13 }).map((_, i) => {
                const shape = [0.25, 0.45, 0.65, 0.85, 1, 0.8, 0.9, 0.6, 0.75, 0.5, 0.55, 0.35, 0.2][i];
                const h = phase === "listening" ? 10 + 60 * shape * Math.max(0.15, level01) : 8;
                return <View key={i} style={[styles.eqBar, { height: h }]} />;
              })}
            </View>
            {heard ? (
              <View style={{ alignItems: "center", gap: 2 }} accessibilityLiveRegion="polite">
                <Text style={styles.heardLabel}>HEARD</Text>
                <Text style={styles.heardSaid}>{heard}</Text>
                {snapped && snapped.best >= 0 && <Text style={styles.heardSnap}>{"→ "}{fr(options[snapped.best].text)}</Text>}
              </View>
            ) : <Text style={styles.heardLabel}>{phase === "listening" ? "Listening…" : ""}</Text>}
          </View>
        )}
        {yourTurn && ruledOut.length > 0 && (
          <Text style={styles.ruledOut} accessibilityLabel={`Ruled out: ${ruledOut.map((i) => options[i]?.text).join(", ")}`}>
            {"Ruled out: "}
            <Text style={styles.ruledOutStrike}>{ruledOut.map((i) => fr(options[i]?.text ?? "")).join("  ·  ")}</Text>
          </Text>
        )}
        {notice && <Text style={styles.notice}>{notice}</Text>}

        {phase === "done" && (
          <View style={styles.doneCard}>
            <View style={styles.doneTick}><Ionicons name="checkmark" size={32} color="#FFFFFF" /></View>
            <Text style={styles.doneTitle}>Conversation complete</Text>
            <Text style={styles.doneSub}>{firstTime} of {replies} replies right first time</Text>
          </View>
        )}
      </ScrollView>

      {phase === "done" ? (
        <View style={styles.footerDone}>
          <Pressable style={styles.primary} onPress={() => onDone({ replies, firstTime })} accessibilityRole="button">
            <Text style={styles.primaryText}>Continue</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.footer}>
          <View style={styles.side}>
            <Pressable onPress={() => {
                const lastApp = [...turns.slice(0, step)].map((t, i) => ({ t, i })).reverse().find((x) => x.t.who === "app");
                if (lastApp) play([{ key: convClip(unit.id, lastApp.i), text: lastApp.t.fr }]);
              }}
              disabled={phase === "speaking" || phase === "listening"} accessibilityRole="button" accessibilityLabel="Hear it again"
              style={[styles.sideBtn, { backgroundColor: "#7FA8EC", opacity: phase === "speaking" || phase === "listening" ? 0.4 : 1 }]}>
              <Ionicons name="refresh" size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.sideLabel}>Again</Text>
          </View>

          <View style={{ alignItems: "center", gap: 8 }}>
            {webMode ? (
              <Pressable onPress={enter} disabled={!canEnter} accessibilityRole="button" accessibilityLabel="Answer (web preview)"
                style={[styles.mic, { backgroundColor: canEnter ? RED : "#E3E6F0" }]}>
                <Ionicons name="mic" size={36} color={canEnter ? "#FFFFFF" : "#9AA1BD"} />
              </Pressable>
            ) : (
              <Pressable onPressIn={startListening} onPressOut={stopListening} disabled={!canMic && phase !== "listening"}
                accessibilityRole="button" accessibilityLabel={phase === "listening" ? "Recording, release to stop" : "Hold to speak"}
                style={[styles.mic, phase === "listening" ? styles.micLive : canMic ? { backgroundColor: RED } : { backgroundColor: "#E3E6F0" }]}>
                <Ionicons name="mic" size={36} color={canMic || phase === "listening" ? "#FFFFFF" : "#9AA1BD"} />
              </Pressable>
            )}
            <Text style={[styles.micLabel, !(canMic || phase === "listening") && { color: "#9AA1BD" }]}>
              {phase === "speaking" ? "Listen first" : phase === "listening" ? "Recording" : webMode ? "Tap to answer" : "Hold to speak"}
            </Text>
          </View>

          <View style={styles.side}>
            <Pressable onPress={enter} disabled={phase !== "heard"} accessibilityRole="button" accessibilityLabel="Enter"
              style={[styles.sideBtn, { backgroundColor: phase === "heard" ? GREEN : "#CFEFDC" }]}>
              <Ionicons name="return-down-back" size={26} color="#FFFFFF" />
            </Pressable>
            <Text style={[styles.sideLabel, phase !== "heard" && { color: "#9AA1BD" }]}>Enter</Text>
          </View>
        </View>
      )}
    </View>
  );
}

/** Cécile's line; tap to flip to the English. */
function Bubble({ fr: text, en }: { fr: string; en: string }) {
  const [english, setEnglish] = useState(false);
  return (
    <View style={styles.appRow}>
      <View style={styles.avatar} />
      <Pressable onPress={() => { Haptics.selectionAsync().catch(() => {}); setEnglish((x) => !x); }} style={{ flexShrink: 1 }}
        accessibilityRole="button" accessibilityLabel={english ? en : text} accessibilityHint={english ? "Shows the French" : "Shows the English"}>
        <View style={[styles.appBubble, english && styles.appBubbleEn]}>
          {english ? <Text style={styles.appTextEn}>{en}</Text> : <Text style={styles.appText}>{fr(text)}</Text>}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { paddingTop: 12, paddingHorizontal: 18, paddingBottom: 12, flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: LINE },
  title: { fontSize: 17, fontWeight: "800", color: INK },
  subtitle: { fontSize: 12, fontWeight: "600", color: MUTED, marginTop: 2 },
  count: { width: 54, textAlign: "right", fontSize: 14, fontWeight: "700", color: MUTED },
  body: { padding: 18, paddingTop: 18, gap: 14, paddingBottom: 30 },
  scene: { fontSize: 14, color: SOFT, fontStyle: "italic" },
  appRow: { flexDirection: "row", gap: 10, alignItems: "flex-end", maxWidth: "88%" },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: AVATAR },
  appBubble: { paddingVertical: 12, paddingHorizontal: 16, backgroundColor: APP_BUBBLE,
    borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 6 },
  appBubbleEn: { backgroundColor: "#F6F8FE", borderWidth: 1, borderColor: "#DCE4F8" },
  appText: { fontSize: 19, fontWeight: "700", color: INK, lineHeight: 25 },
  appTextEn: { fontSize: 17, fontWeight: "600", color: SOFT, lineHeight: 23 },
  youWrap: { alignSelf: "flex-end", alignItems: "flex-end", gap: 6, maxWidth: "80%" },
  youBubble: { paddingVertical: 11, paddingHorizontal: 16, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderBottomLeftRadius: 20, borderBottomRightRadius: 6 },
  youGood: { backgroundColor: INK },
  youGrey: { backgroundColor: "#E9ECF5" },
  youText: { fontSize: 17, fontWeight: "700", lineHeight: 23 },
  badge: { flexDirection: "row", alignItems: "center", gap: 5, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  badgeText: { fontSize: 12, fontWeight: "800" },
  cue: { alignSelf: "flex-end", maxWidth: "85%", padding: 14, borderRadius: 18, borderWidth: 2, borderStyle: "dashed", borderColor: "#F5C518", backgroundColor: "#FFF8DD", gap: 4 },
  cueLabel: { fontSize: 12, fontWeight: "800", letterSpacing: 1, color: "#9A7400" },
  cueText: { fontSize: 18, fontWeight: "700", color: INK },
  cueHint: { fontSize: 12, fontWeight: "600", color: "#9A7400", marginTop: 2 },
  cueReveal: { marginTop: 6, paddingTop: 8, borderTopWidth: 1, borderTopColor: "#F0DFA0", gap: 2 },
  cueRevealText: { fontSize: 19, fontWeight: "800", color: INK },
  heardWrap: { alignItems: "center", gap: 10, marginTop: 8 },
  eq: { flexDirection: "row", alignItems: "flex-end", gap: 5, height: 72 },
  eqBar: { width: 9, borderRadius: 3, backgroundColor: "#22C7E0" },
  heardLabel: { fontSize: 13, fontWeight: "800", letterSpacing: 1.3, color: RED, textAlign: "center" },
  heardSaid: { fontSize: 17, fontWeight: "700", color: INK, textAlign: "center" },
  heardSnap: { fontSize: 15, fontWeight: "700", color: "#0284C7", textAlign: "center" },
  notice: { fontSize: 14, color: "#A35A00", textAlign: "center" },
  ruledOut: { fontSize: 13, color: "#7A82A6", textAlign: "center" },
  ruledOutStrike: { textDecorationLine: "line-through" },
  doneCard: { marginTop: 10, padding: 24, borderRadius: 24, backgroundColor: "#F6F8FE", alignItems: "center", gap: 10 },
  doneTick: { width: 64, height: 64, borderRadius: 32, backgroundColor: GREEN, alignItems: "center", justifyContent: "center" },
  doneTitle: { fontSize: 25, fontWeight: "800", color: INK },
  doneSub: { fontSize: 15, color: "#47507A", textAlign: "center" },
  footer: { paddingTop: 16, paddingBottom: 38, paddingHorizontal: 26, borderTopWidth: 1, borderTopColor: LINE,
    flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  side: { width: 80, alignItems: "center", gap: 8 },
  sideBtn: { width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center" },
  sideLabel: { fontSize: 13, fontWeight: "700", color: "#47507A" },
  mic: { width: 96, height: 96, borderRadius: 48, alignItems: "center", justifyContent: "center" },
  micLive: { backgroundColor: RED, borderWidth: 6, borderColor: "#FFD0CC" },
  micLabel: { fontSize: 15, fontWeight: "800", color: INK },
  footerDone: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 40, gap: 10 },
  primary: { height: 56, borderRadius: 28, backgroundColor: "#7FA8EC", borderWidth: 1, borderColor: "#A3BCF4", alignItems: "center", justifyContent: "center" },
  primaryText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
});
