import React, { useEffect, useMemo, useRef, useState } from "react";
import { Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { quizClip } from "@shared/advanced/audioKeys";
import type { AdvUnit } from "@shared/advanced/types";
import { awardCoins } from "../../lib/coins";
import CoinIcon from "../CoinIcon";
import MastersMic from "../MastersMic";
import MicPromoDemo from "../MicPromoDemo";
import type { MicOutcome } from "../../lib/mastersMic";

/**
 * Verb quiz (Advanced units, Jonathan 2 Nov 2026): ten questions on the unit
 * verb in the format of the conjugation quizzes: an English sentence, four
 * French sentences, one right. Three présent, three passé composé, two futur
 * simple, two imparfait. The correct French is played after each answer.
 * One coin per right answer.
 *
 * Masters Mic (Jonathan, 2 Nov 2026: "as much as possible, to encourage people
 * to use it"): the same control as the conjugation quizzes. Mic On is the
 * default for Advanced (it is Pro, so the mic is always allowed); switching it
 * off is remembered for later Advanced quizzes. With Mic On the screen goes
 * navy, A–D hide, and "Show A–D" brings them back for that question. A spoken
 * answer snaps to the nearest of the four; right or wrong, the quiz moves on
 * by itself, as in Mic On quizzes elsewhere. The "Say it aloud" pop-up shows
 * at the start until "Don't remind me again" (the same setting as the quizzes).
 * The web build has no recogniser, so it stays tap-only there.
 */

const MIC_PREF = "advancedQuizMic";
const PROMO_NEVER = "mastersMicPromoNever";
const micPossible = Platform.OS !== "web";

const INK = "#3A4354";
const SOFT = "#5A6472";
const BLUE = "#2B5FD9";
const GREEN = "#17734A";

const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const fr = (t: string) => t.replace(/ ([?!:;»])/g, " $1").replace(/« /g, "« ");

export default function QuizStep({ unit, play, onDone }: {
  unit: AdvUnit;
  play: (items: { key: string; text: string }[], onEnd?: () => void) => void;
  onDone: (r: { score: number; total: number; coins: number }) => void;
}) {
  const items = useMemo(() => unit.quiz.map((q, i) => ({ ...q, i, options: shuffle([q.answer, ...q.wrong]) })), [unit]);
  const [n, setN] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [micOn, setMicOn] = useState(micPossible);
  const [showOptions, setShowOptions] = useState(false);
  const [promo, setPromo] = useState(false);
  const advance = useRef<ReturnType<typeof setTimeout> | null>(null);
  // The auto-advance timer outlives the render that set it, so the score it pays out is read from a ref.
  const scoreRef = useRef(0);
  useEffect(() => { scoreRef.current = score; }, [score]);
  const q = items[n];
  const micMode = micOn && micPossible;
  const optionsHidden = micMode && !showOptions && picked === null;

  useEffect(() => {
    if (!micPossible) return;
    AsyncStorage.getItem(MIC_PREF).then((v) => { if (v === "off") setMicOn(false); }).catch(() => {});
    AsyncStorage.getItem(PROMO_NEVER).then((v) => { if (v !== "true") setPromo(true); }).catch(() => {});
    return () => { if (advance.current) clearTimeout(advance.current); };
  }, []);
  const setMic = (on: boolean) => {
    setMicOn(on); setShowOptions(false);
    AsyncStorage.setItem(MIC_PREF, on ? "on" : "off").catch(() => {});
  };

  const pick = (k: number) => {
    if (picked !== null) return;
    setPicked(k);
    const right = q.options[k] === q.answer;
    Haptics.notificationAsync(right ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error).catch(() => {});
    if (right) setScore((s) => s + 1);
    play([{ key: quizClip(unit.id, q.i), text: q.answer }]);
  };
  /** A spoken answer: snapped by Masters Mic to one of the four. Moves on by itself, as in Mic On quizzes. */
  const onMic = (o: MicOutcome) => {
    if (picked !== null) return;
    if (o.via === "unheard" || o.optionIndex === null) { next(); return; }
    const k = o.correct ? q.options.indexOf(q.answer) : o.optionIndex;
    pick(k);
    advance.current = setTimeout(() => next(), o.correct ? 2200 : 3200);
  };
  const next = () => {
    if (advance.current) { clearTimeout(advance.current); advance.current = null; }
    setShowOptions(false);
    if (n < items.length - 1) { setN((x) => x + 1); setPicked(null); return; }
    awardCoins(scoreRef.current).catch(() => {});
    setDone(true);
  };

  if (done) {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.doneBody}>
          <View style={styles.doneIcon}><Ionicons name="checkmark" size={30} color="#FFFFFF" /></View>
          <Text style={styles.kicker}>VERB QUIZ · {unit.verb.toUpperCase()}</Text>
          <Text style={styles.big}>{score} / {items.length}</Text>
          <Text style={styles.p}>{score === items.length ? "Parfait !" : score >= 8 ? "Très bien !" : "Good effort. The conversation uses the same verb, so you’ll practise it again now."}</Text>
          {score > 0 && <Text style={styles.coinLine}>+{score} <CoinIcon size={20} /></Text>}
        </ScrollView>
        <View style={styles.footer}>
          <Pressable style={styles.primary} onPress={() => onDone({ score, total: items.length, coins: score })} accessibilityRole="button">
            <Text style={styles.primaryText}>Start the conversation →</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: micMode ? "#0A1326" : "transparent" }}>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={[styles.card, micMode && styles.cardNavy]}>
          <View style={styles.metaRow}>
            <Text style={[styles.meta, micMode && { color: "#C3D0E8" }]}>Verb quiz · <Text style={{ fontWeight: "700" }} accessibilityLanguage="fr">{unit.verb}</Text></Text>
            <Text style={[styles.metaScore, micMode && { color: "#C3D0E8" }]}>{n + 1} / {items.length}</Text>
          </View>
          <View style={styles.progressTrack}><View style={[styles.progressFill, { width: `${(n / items.length) * 100}%` }]} /></View>
          <View style={styles.tense}><Text style={styles.tenseText}>{q.tense}</Text></View>
          <Text style={[styles.qText, micMode && { color: "#FFFFFF" }]}>{q.en}{q.tag ? <Text style={styles.tag}>  ({q.tag})</Text> : null}</Text>
          {micMode && picked === null && (
            <MastersMic key={n} expected={q.answer} options={q.options} correctIndex={q.options.indexOf(q.answer)}
              onOutcome={onMic} optionsShown={showOptions} onToggleOptions={() => setShowOptions((x) => !x)} />
          )}
          {!optionsHidden && q.options.map((o, k) => {
            const isRight = picked !== null && o === q.answer;
            const isWrong = picked === k && o !== q.answer;
            return (
              <Pressable key={o} onPress={() => pick(k)} disabled={picked !== null} accessibilityRole="button"
                accessibilityLabel={`${String.fromCharCode(65 + k)}. ${o}`}
                style={[styles.opt, isRight && styles.optCorrect, isWrong && styles.optWrong, picked !== null && !isRight && !isWrong && styles.optDim]}>
                <View style={styles.letter}><Text style={styles.letterText}>{String.fromCharCode(65 + k)}</Text></View>
                <Text style={[styles.optText, isRight && styles.optTextCorrect, isWrong && styles.optTextWrong]} accessibilityLanguage="fr">{fr(o)}</Text>
              </Pressable>
            );
          })}
          {picked !== null && (
            <View style={[styles.feedback, q.options[picked] === q.answer ? styles.feedbackGood : styles.feedbackBad]}>
              <Text style={styles.feedbackText}>
                {q.options[picked] === q.answer ? <>Correct!  +1 <CoinIcon size={14} /></> : <>The answer is <Text style={{ fontWeight: "700" }}>{fr(q.answer)}</Text></>}
              </Text>
            </View>
          )}
          {micPossible && (
            <Pressable onPress={() => setMic(!micOn)} accessibilityRole="switch" accessibilityState={{ checked: micOn }}
              accessibilityLabel="Masters Mic" accessibilityHint="Answer aloud instead of tapping. The options are hidden while it is on."
              style={[styles.togglePill, micOn ? styles.micOnPill : styles.toggleOff]}>
              <Ionicons name="mic" size={16} color={micOn ? "#06242E" : SOFT} />
              <Text style={[styles.toggleText, { color: micOn ? "#06242E" : SOFT }]}>{micOn ? "Mic On" : "Mic Off"}</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>

      <Modal visible={promo} transparent animationType="fade" onRequestClose={() => setPromo(false)}>
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.promoTitle}>Say it aloud</Text>
            <Text style={styles.promoSub}>Masters Mic is on: hold Record and say the French. Mic Off brings back tapping.</Text>
            <MicPromoDemo />
            <Pressable style={[styles.primary, { alignSelf: "stretch" }]} onPress={() => { setMic(true); setPromo(false); }} accessibilityRole="button">
              <Text style={styles.primaryText}>Got it</Text>
            </Pressable>
            <Pressable onPress={() => { setMic(false); setPromo(false); }} accessibilityRole="button" style={{ padding: 10 }}>
              <Text style={styles.promoLater}>I’ll tap my answers for now</Text>
            </Pressable>
            <Pressable onPress={() => { setPromo(false); AsyncStorage.setItem(PROMO_NEVER, "true").catch(() => {}); }} accessibilityRole="button" hitSlop={8}>
              <Text style={styles.promoNever}>Don’t remind me again</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {picked !== null && (
        <View style={styles.footer}>
          <Pressable style={styles.primary} onPress={next} accessibilityRole="button">
            <Text style={styles.primaryText}>{n < items.length - 1 ? "Next" : "See your score"}</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  body: { padding: 16, paddingBottom: 30 },
  card: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E3E6EA", borderRadius: 24, padding: 18 },
  cardNavy: { backgroundColor: "#10203F", borderColor: "#2E4270" },
  togglePill: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderRadius: 18, paddingVertical: 7, paddingHorizontal: 12, alignSelf: "center", marginTop: 14 },
  toggleOff: { backgroundColor: "#F0F2F5", borderColor: "#C6CCD4" },
  micOnPill: { backgroundColor: "#22D3EE", borderColor: "#22D3EE" },
  toggleText: { fontSize: 13, fontWeight: "700" },
  modalBg: { flex: 1, backgroundColor: "rgba(5,10,25,0.6)", alignItems: "center", justifyContent: "center", padding: 18 },
  modalCard: { width: "100%", maxWidth: 420, backgroundColor: "#FFFFFF", borderRadius: 22, padding: 20, gap: 10, alignItems: "center" },
  promoTitle: { color: "#1B1F24", fontSize: 22, fontWeight: "800" },
  promoSub: { color: SOFT, fontSize: 15, textAlign: "center", lineHeight: 21 },
  promoLater: { color: BLUE, fontSize: 15, fontWeight: "600" },
  promoNever: { color: SOFT, fontSize: 13, textDecorationLine: "underline" },
  metaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  meta: { color: SOFT, fontSize: 13 },
  metaScore: { color: SOFT, fontSize: 13, fontWeight: "600" },
  progressTrack: { height: 8, backgroundColor: "#E3E6EA", borderRadius: 8, overflow: "hidden", marginBottom: 16 },
  progressFill: { height: 8, borderRadius: 8, backgroundColor: BLUE },
  tense: { alignSelf: "flex-start", backgroundColor: "#EAF0FC", borderRadius: 12, paddingVertical: 4, paddingHorizontal: 10, marginBottom: 10 },
  tenseText: { color: BLUE, fontSize: 12, fontWeight: "800" },
  qText: { color: INK, fontSize: 20, fontWeight: "700", marginBottom: 22, lineHeight: 28 },
  tag: { color: SOFT, fontSize: 14, fontWeight: "700" },
  opt: { flexDirection: "row", alignItems: "center", borderWidth: 2, borderColor: "#C6CCD4", backgroundColor: "#FFFFFF", borderRadius: 14, padding: 14, marginBottom: 12 },
  optCorrect: { borderColor: GREEN, backgroundColor: "#E7F3EC" },
  optWrong: { borderColor: "#C0392B", backgroundColor: "#F9ECEA" },
  optDim: { opacity: 0.55 },
  optTextCorrect: { color: "#0F5A38", fontWeight: "700" },
  optTextWrong: { color: "#9B2C20", fontWeight: "600" },
  letter: { width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: "#8A93A0", alignItems: "center", justifyContent: "center", marginRight: 14 },
  letterText: { color: SOFT, fontSize: 13, fontWeight: "700" },
  optText: { color: INK, fontSize: 16, fontWeight: "500", flex: 1 },
  feedback: { borderWidth: 1, borderRadius: 14, padding: 14, marginTop: 4 },
  feedbackGood: { borderColor: GREEN, backgroundColor: "#E7F3EC" },
  feedbackBad: { borderColor: "#C0392B", backgroundColor: "#F9ECEA" },
  feedbackText: { fontSize: 14, lineHeight: 20, color: INK },
  doneBody: { alignItems: "center", gap: 8, padding: 24, paddingTop: 50 },
  doneIcon: { width: 60, height: 60, borderRadius: 30, backgroundColor: "#22A45D", alignItems: "center", justifyContent: "center" },
  kicker: { color: SOFT, fontSize: 12, fontWeight: "800", letterSpacing: 1, marginTop: 6 },
  big: { color: "#1B2145", fontSize: 44, fontWeight: "800" },
  p: { color: SOFT, fontSize: 16, textAlign: "center", lineHeight: 23 },
  coinLine: { color: "#1B2145", fontSize: 20, fontWeight: "800" },
  footer: { paddingHorizontal: 22, paddingTop: 10, paddingBottom: 36 },
  primary: { backgroundColor: BLUE, borderRadius: 26, paddingVertical: 16, alignItems: "center" },
  primaryText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
});
