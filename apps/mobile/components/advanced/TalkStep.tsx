import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { STOCK_LINES, followClip, questionClip, type StockLine } from "@shared/advanced/audioKeys";
import { coinsFor } from "@shared/advanced/marking";
import type { AdvUnit } from "@shared/advanced/types";
import { markAnswer } from "../../lib/advanced";
import { awardCoins } from "../../lib/coins";

/**
 * Talk (Advanced units): a spoken comprehension conversation, laid out like
 * the standard post-quiz conversation so it isn't confusing (Jonathan, 31 Oct
 * 2026). Cécile asks six questions about the article; the learner answers
 * aloud, in at least two sentences.
 *
 *  - Hold the mic to speak; Enter sends what was heard.
 *  - The server's AI judges the meaning, generously; the app counts sentences.
 *    Right but one sentence → she asks a follow-up for a second sentence.
 *  - Help lives in the yellow card, one more step per tap: French word chips,
 *    a sentence starter, the answer in English to say in French, then the
 *    French to read aloud. Coins: 3 with no help, 2 with steps 1–2, 1 with more.
 *  - Two misses show "Say it like this" and Next.
 *  - Tapping a French bubble flips it to English.
 * The web build (staging) has no recogniser, so a text box stands in.
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

type Badge = "correct" | "more" | "notQuite" | "again";
const BADGE: Record<Badge, { label: string; bg: string; fg: string; good: boolean }> = {
  correct: { label: "Très bien !", bg: "#E3F7EC", fg: "#15824A", good: true },
  more: { label: "Understood", bg: "#E3F7EC", fg: "#15824A", good: true },
  notQuite: { label: "Not quite", bg: "#FFF0DD", fg: "#A35A00", good: false },
  again: { label: "In French, please", bg: "#FFF0DD", fg: "#A35A00", good: false },
};

type Log =
  | { kind: "app"; fr: string; en: string; key: string }
  | { kind: "you"; text: string; badge: Badge; note?: string; key: string };
type Phase = "speaking" | "yourTurn" | "listening" | "heard" | "checking" | "model" | "done";

/** French spacing: the space before ? ! : ; » and after « never breaks a line. */
const fr = (t: string) => t.replace(/ ([?!:;»])/g, "\u00A0$1").replace(/« /g, "«\u00A0");
const PRAISE: StockLine[] = ["ADV_PRAISE_1", "ADV_PRAISE_2", "ADV_PRAISE_3"];
const PRAISE_EN = ["Well done!", "Perfect!", "Excellent!"];

export default function TalkStep({ unit, play, stop, onDone }: {
  unit: AdvUnit;
  play: (items: { key: string; text: string }[], onEnd?: () => void) => void;
  stop: () => void;
  onDone: (r: { coins: number; answered: number; withHelp: number }) => void;
}) {
  const qs = unit.questions;
  const [qi, setQi] = useState(0);
  const [phase, setPhase] = useState<Phase>("speaking");
  const [log, setLog] = useState<Log[]>([]);
  const [part, setPart] = useState(0);
  const [buffer, setBuffer] = useState("");
  const [help, setHelp] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [heard, setHeard] = useState("");
  const [typed, setTyped] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [level01, setLevel01] = useState(0);
  const [coins, setCoins] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [withHelp, setWithHelp] = useState(0);
  const [clean, setClean] = useState(0);
  const scroll = useRef<ScrollView>(null);
  const n = useRef(0);
  const k = () => `${n.current++}`;
  const webMode = !voiceAvailable();
  const q = qs[qi];

  // Mic state (same pattern as app/conversation.tsx).
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
    return () => { try { SR?.abort(); } catch {} };
  }, []);

  const say = (lines: { key: string; fr: string; en: string }[], then: () => void) => {
    try { SR?.abort(); } catch {}
    setLog((l) => [...l, ...lines.filter((x) => x.fr).map((x) => ({ kind: "app" as const, fr: x.fr, en: x.en, key: k() }))]);
    setPhase("speaking");
    play(lines.map((x) => ({ key: x.key, text: x.fr })), then);
  };
  const stock = (s: StockLine) => STOCK_LINES[s];

  const ask = (i: number) => {
    setPart(0); setBuffer(""); setHelp(0); setAttempts(0); setHeard(""); setTyped(""); setNotice(null);
    say([{ key: questionClip(unit.id, i), fr: qs[i].fr, en: qs[i].en }], () => setPhase("yourTurn"));
  };
  useEffect(() => { const t = setTimeout(() => ask(0), 450); return () => { clearTimeout(t); stop(); }; /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);
  useEffect(() => {
    const t = setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 60);
    return () => clearTimeout(t);
  }, [log.length, phase, help]);

  const next = () => {
    if (qi < qs.length - 1) { const i = qi + 1; setQi(i); ask(i); }
    else say([{ key: "ADV_END", fr: stock("ADV_END"), en: "Thank you for this conversation. See you soon!" }], () => setPhase("done"));
  };

  // ---- Recogniser ----
  useSREvent("volumechange", (e: any) => { if (listeningRef.current) setLevel01(Math.max(0, Math.min(10, e.value)) / 10); });
  const joinWords = (a: string, b: string) => [a.trim(), b.trim()].filter(Boolean).join(" ");
  const finishReply = () => {
    if (!listeningRef.current) return;
    listeningRef.current = false; holdingRef.current = false; setLevel01(0);
    const said = (lastAltsRef.current.length ? lastAltsRef.current : [committedRef.current]).filter((a) => a.trim());
    if (!said.length) { setHeard(""); setNotice("I didn't hear anything. Hold the mic and speak."); setPhase("yourTurn"); return; }
    setHeard(said[0]); setPhase("heard");
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
    if (phase !== "yourTurn" && phase !== "heard") return;
    if (!voiceAvailable()) return;
    try {
      const perm = await SR.requestPermissionsAsync();
      if (!perm.granted) { setNotice("Microphone access is off. Turn it on in Settings › Pluri French."); return; }
    } catch { return; }
    if (!holdingRef.current) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setHeard(""); committedRef.current = ""; lastAltsRef.current = []; restartsRef.current = 0; setNotice(null);
    listeningRef.current = true;
    setPhase("listening");
    const base = {
      lang: "fr-FR", interimResults: true, maxAlternatives: 3, continuous: true,
      contextualStrings: [...q.chips, ...q.model.split(/[.!?]/).map((s) => s.trim()).filter(Boolean)],
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

  // ---- Judging ----
  const enter = async () => {
    const said = (webMode ? typed : heard).trim();
    if (!said || (phase !== "heard" && !(webMode && phase === "yourTurn"))) return;
    const answer = part ? `${buffer} ${said}` : said;
    setPhase("checking");
    const m = await markAnswer(unit.id, qi, answer);
    setHeard(""); setTyped("");
    if (m.verdict === "english") {
      setLog((l) => [...l, { kind: "you", text: said, badge: "again", key: k() }]);
      return say([{ key: "ADV_ENGLISH", fr: stock("ADV_ENGLISH"), en: "In French, please!" }], () => setPhase("yourTurn"));
    }
    if (m.verdict === "miss") {
      const a = attempts + 1;
      setAttempts(a);
      setLog((l) => [...l, { kind: "you", text: said, badge: "notQuite", note: m.feedback || undefined, key: k() }]);
      if (part === 0) setBuffer("");
      if (a >= 2) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
        return say([{ key: "ADV_MODEL", fr: stock("ADV_MODEL"), en: "Here's a possible answer." }], () => setPhase("model"));
      }
      return say([{ key: "ADV_MISS", fr: stock("ADV_MISS"), en: "Not quite. Listen again, or tap the yellow card for a hint." }], () => setPhase("yourTurn"));
    }
    if (m.verdict === "more") {
      setLog((l) => [...l, { kind: "you", text: said, badge: "more", key: k() }]);
      setBuffer(answer); setPart(1);
      return say([
        { key: "ADV_MORE", fr: stock("ADV_MORE"), en: "Yes, that's right! Add a second sentence." },
        { key: followClip(unit.id, qi), fr: q.follow, en: q.followEn },
      ], () => setPhase("yourTurn"));
    }
    // Good: meaning and two sentences.
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    const c = coinsFor(help);
    setCoins((x) => x + c); awardCoins(c).catch(() => {});
    setAnswered((x) => x + 1);
    if (help > 0) setWithHelp((x) => x + 1); else setClean((x) => x + 1);
    const differs = m.corrected && m.corrected.replace(/[\s.,!?]/g, "").toLowerCase() !== answer.replace(/[\s.,!?]/g, "").toLowerCase();
    setLog((l) => [...l, { kind: "you", text: said, badge: "correct", note: differs ? `Another way to say it: ${m.corrected}` : `+${c} coins`, key: k() }]);
    const p = qi % 3;
    say([{ key: PRAISE[p], fr: stock(PRAISE[p]), en: `${PRAISE_EN[p]} +${c} coins` }], () => next());
  };

  const nextAfterModel = () => say([{ key: "ADV_NEXT", fr: stock("ADV_NEXT"), en: "OK. Next question." }], () => next());

  const yourTurn = phase === "yourTurn" || phase === "listening" || phase === "heard" || phase === "checking";
  const canMic = phase === "yourTurn" || phase === "heard";
  const canEnter = phase === "heard" || (webMode && phase === "yourTurn" && !!typed.trim());
  const second = q.model.replace(/^[^.!?]*[.!?]\s*/, "");
  const secondStarter = second.split(" ").slice(0, 4).join(" ") + "…";

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Conversation</Text>
          <Text style={styles.subtitle}>{unit.id} · {unit.title}</Text>
        </View>
        <Text style={styles.count}>{Math.min(qi + 1, qs.length)} / {qs.length}</Text>
      </View>

      <ScrollView ref={scroll} style={{ flex: 1 }} contentContainerStyle={styles.body}>
        {log.map((item) => item.kind === "app" ? <Bubble key={item.key} fr={item.fr} en={item.en} /> : (
          <View key={item.key} style={styles.youWrap}>
            <View style={[styles.youBubble, BADGE[item.badge].good ? styles.youGood : styles.youGrey]}>
              <Text style={[styles.youText, { color: BADGE[item.badge].good ? "#FFFFFF" : SOFT }]}>{fr(item.text)}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: BADGE[item.badge].bg }]}>
              {BADGE[item.badge].good && <Ionicons name="checkmark" size={14} color={BADGE[item.badge].fg} />}
              <Text style={[styles.badgeText, { color: BADGE[item.badge].fg }]}>{BADGE[item.badge].label}</Text>
            </View>
            {!!item.note && <Text style={styles.note}>{item.note}</Text>}
          </View>
        ))}

        {yourTurn && (
          <Pressable style={styles.cue} onPress={() => { Haptics.selectionAsync().catch(() => {}); setHelp((h) => Math.min(4, h + 1)); }}
            accessibilityRole="button" accessibilityHint={help < 4 ? "Shows more help" : undefined}>
            <Text style={styles.cueLabel}>{part ? "ADD A SECOND SENTENCE" : "ANSWER IN AT LEAST TWO SENTENCES"}</Text>
            {help >= 1 && (
              <View style={styles.cueSec}>
                <Text style={styles.cueMini}>USE THESE WORDS</Text>
                <View style={styles.chips}>{q.chips.map((c) => <View key={c} style={styles.chip}><Text style={styles.chipText}>{c}</Text></View>)}</View>
              </View>
            )}
            {help >= 2 && (
              <View style={styles.cueSec}>
                <Text style={styles.cueMini}>START LIKE THIS</Text>
                <Text style={styles.cueFr} accessibilityLanguage="fr">{part ? secondStarter : q.starter}</Text>
              </View>
            )}
            {help >= 3 && (
              <View style={styles.cueSec}>
                <Text style={styles.cueMini}>SAY IT IN FRENCH</Text>
                <Text style={styles.cueText}>“{q.modelEn}”</Text>
              </View>
            )}
            {help >= 4 && (
              <View style={styles.cueSec}>
                <Text style={styles.cueReveal} accessibilityLanguage="fr">{fr(q.model)}</Text>
                <Text style={styles.cueHint}>Read it aloud — that counts.</Text>
              </View>
            )}
            {help < 4 && <Text style={styles.cueHint}>{help === 0 ? "Stuck? Tap for a hint" : "Still stuck? Tap for more help"}</Text>}
          </Pressable>
        )}

        {phase === "model" && (
          <View style={styles.model}>
            <Text style={styles.modelLabel}>SAY IT LIKE THIS</Text>
            <Text style={styles.modelText}>{fr(q.model)}</Text>
            <Text style={styles.modelSub}>{q.modelEn} Nothing is marked wrong.</Text>
          </View>
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
              </View>
            ) : <Text style={styles.heardLabel}>{phase === "listening" ? "Listening…" : ""}</Text>}
          </View>
        )}
        {phase === "checking" && <ActivityIndicator color="#3E63D8" style={{ marginTop: 10 }} />}
        {notice && <Text style={styles.notice}>{notice}</Text>}

        {webMode && (phase === "yourTurn" || phase === "heard") && (
          <TextInput value={typed} onChangeText={setTyped} placeholder="Type what you'd say (no microphone here)"
            style={styles.input} onSubmitEditing={enter} returnKeyType="send" accessibilityLabel="Your answer" />
        )}

        {phase === "done" && (
          <View style={styles.doneCard}>
            <View style={styles.doneTick}><Ionicons name="checkmark" size={32} color="#FFFFFF" /></View>
            <Text style={styles.doneTitle}>Conversation complete</Text>
            <Text style={styles.doneSub}>{answered} of {qs.length} questions answered · {clean} without help · +{coins} coins</Text>
          </View>
        )}
      </ScrollView>

      {phase === "done" ? (
        <View style={styles.footerDone}>
          <Pressable style={styles.primary} onPress={() => onDone({ coins, answered, withHelp })} accessibilityRole="button">
            <Text style={styles.primaryText}>Continue</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.footer}>
          <View style={styles.side}>
            <Pressable onPress={() => { const last = [...log].reverse().find((x) => x.kind === "app") as any; if (last) play([{ key: questionClip(unit.id, qi), text: q.fr }]); }}
              disabled={phase === "speaking" || phase === "listening"} accessibilityRole="button" accessibilityLabel="Hear the question again"
              style={[styles.sideBtn, { backgroundColor: "#7FA8EC", opacity: phase === "speaking" || phase === "listening" ? 0.4 : 1 }]}>
              <Ionicons name="refresh" size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.sideLabel}>Again</Text>
          </View>

          <View style={{ alignItems: "center", gap: 8 }}>
            <Pressable onPressIn={startListening} onPressOut={stopListening} disabled={webMode || (!canMic && phase !== "listening")}
              accessibilityRole="button" accessibilityLabel={phase === "listening" ? "Recording, release to stop" : "Hold to speak"}
              style={[styles.mic, phase === "listening" ? styles.micLive : canMic && !webMode ? { backgroundColor: RED } : { backgroundColor: "#E3E6F0" }]}>
              <Ionicons name="mic" size={36} color={(canMic && !webMode) || phase === "listening" ? "#FFFFFF" : "#9AA1BD"} />
            </Pressable>
            <Text style={[styles.micLabel, !(canMic || phase === "listening") && { color: "#9AA1BD" }]}>
              {phase === "speaking" ? "Listen first" : phase === "listening" ? "Recording" : phase === "checking" ? "Checking…"
                : phase === "model" ? " " : webMode ? "Type below" : "Hold to speak"}
            </Text>
          </View>

          <View style={styles.side}>
            {phase === "model" ? (
              <>
                <Pressable onPress={nextAfterModel} accessibilityRole="button" accessibilityLabel="Next" style={[styles.sideBtn, { backgroundColor: GREEN }]}>
                  <Ionicons name="arrow-forward" size={26} color="#FFFFFF" />
                </Pressable>
                <Text style={styles.sideLabel}>Next</Text>
              </>
            ) : (
              <>
                <Pressable onPress={enter} disabled={!canEnter} accessibilityRole="button" accessibilityLabel="Enter"
                  style={[styles.sideBtn, { backgroundColor: canEnter ? GREEN : "#CFEFDC" }]}>
                  <Ionicons name="return-down-back" size={26} color="#FFFFFF" />
                </Pressable>
                <Text style={[styles.sideLabel, !canEnter && { color: "#9AA1BD" }]}>Enter</Text>
              </>
            )}
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
  body: { padding: 18, paddingTop: 22, gap: 14, paddingBottom: 30 },
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
  note: { fontSize: 13, color: SOFT, textAlign: "right" },
  cue: { alignSelf: "flex-end", maxWidth: "88%", padding: 14, borderRadius: 18, borderWidth: 2, borderStyle: "dashed",
    borderColor: "#F5C518", backgroundColor: "#FFF8DD", gap: 8 },
  cueLabel: { fontSize: 12, fontWeight: "800", letterSpacing: 1, color: "#9A7400" },
  cueSec: { gap: 4, paddingTop: 8, borderTopWidth: 1, borderTopColor: "#F0DFA0" },
  cueMini: { fontSize: 11, fontWeight: "800", letterSpacing: 1, color: "#9A7400" },
  cueText: { fontSize: 18, fontWeight: "700", color: INK },
  cueFr: { fontSize: 17, fontWeight: "700", color: INK },
  cueReveal: { fontSize: 19, fontWeight: "800", color: INK },
  cueHint: { fontSize: 12, fontWeight: "600", color: "#9A7400" },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  chip: { borderWidth: 1, borderColor: "#F5C518", backgroundColor: "#FFFFFF", borderRadius: 12, paddingVertical: 4, paddingHorizontal: 10 },
  chipText: { color: INK, fontSize: 14, fontWeight: "600" },
  model: { padding: 16, borderRadius: 18, borderWidth: 1, borderColor: "#C9D6F5", backgroundColor: "#F6F8FE", gap: 4 },
  modelLabel: { fontSize: 12, fontWeight: "800", letterSpacing: 1, color: SOFT },
  modelText: { fontSize: 19, fontWeight: "800", color: INK },
  modelSub: { fontSize: 13, color: SOFT },
  heardWrap: { alignItems: "center", gap: 10, marginTop: 8 },
  eq: { flexDirection: "row", alignItems: "flex-end", gap: 5, height: 72 },
  eqBar: { width: 9, borderRadius: 3, backgroundColor: "#22C7E0" },
  heardLabel: { fontSize: 13, fontWeight: "800", letterSpacing: 1.3, color: RED, textAlign: "center" },
  heardSaid: { fontSize: 17, fontWeight: "700", color: INK, textAlign: "center" },
  notice: { fontSize: 14, color: "#A35A00", textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#DCE4F8", borderRadius: 14, padding: 12, fontSize: 17, color: INK, backgroundColor: "#F6F8FE" },
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
