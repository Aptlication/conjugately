import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import VisCue from "../components/VisCue";
import { optionsFor, recordAnswer, unitKey, wordsDue, type CheckWord } from "../lib/vocabCheck";
import { awardVocabCoin, VOCAB_COINS_PER_WORD } from "../lib/coins";

/**
 * Vocab check — the post-quiz vocabulary session (spec: Jonathan, 21 Oct 2026).
 * The rules live in lib/vocabCheck.ts. Opened with the unit it follows:
 * level, timeFrame, verb. `from` = "card" when opened from the button on the
 * quiz results card (Finish goes back one screen); otherwise it was opened
 * automatically at the end of the unit and Finish returns to the course.
 */

const INK = "#1B2145";
const SOFT = "#5A6390";
const BLUE = "#2B5FD9";
const GREEN = "#22A45D";
const RED = "#E63A2E";
const AMBER = "#D98A00";
/** How long the card sits alone before the four answers appear by themselves. */
const OPTIONS_DELAY_MS = 2500;

type Verdict = "right" | "cued" | "wrong";

const buzz = (k: Haptics.NotificationFeedbackType) => { try { Haptics.notificationAsync(k); } catch {} };

export default function VocabCheck() {
  const p = useLocalSearchParams<{ level: string; timeFrame: string; verb: string; from?: string }>();
  const unit = unitKey(String(p.level || ""), String(p.timeFrame || ""), String(p.verb || ""));

  const [phase, setPhase] = useState<"loading" | "intro" | "card" | "done">("loading");
  const [queue, setQueue] = useState<CheckWord[]>([]);
  const [total, setTotal] = useState(0);
  const [passed, setPassed] = useState(0);
  const [quit, setQuit] = useState(false);
  // Coins this session: one per word right without VIS-CUE (21 Oct 2026).
  const [coins, setCoins] = useState(0);
  const [balance, setBalance] = useState<number | null>(null);

  // Per-card state.
  const [options, setOptions] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [cueOpen, setCueOpen] = useState(false);
  const [cued, setCued] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTimer = () => { if (timer.current) { clearTimeout(timer.current); timer.current = null; } };
  useEffect(() => () => clearTimer(), []);

  const word = queue[0];
  const queueRef = useRef<CheckWord[]>([]);

  useEffect(() => {
    wordsDue(unit).then((ws) => {
      queueRef.current = ws;
      setQueue(ws); setTotal(ws.length);
      setPhase(ws.length ? "intro" : "done");
    });
  }, [unit]);

  const dealCard = (w: CheckWord | undefined) => {
    clearTimer();
    setPicked(null); setVerdict(null); setCued(false); setCueOpen(false); setShowOptions(false);
    if (!w) return;
    setOptions(optionsFor(w));
    timer.current = setTimeout(() => setShowOptions(true), OPTIONS_DELAY_MS);
  };

  const start = () => { setPhase("card"); dealCard(queue[0]); };

  const pressVisCue = () => {
    if (picked !== null) return;
    clearTimer();
    setCued(true); setCueOpen(true); setShowOptions(false);
  };
  const closeCue = () => { setCueOpen(false); setShowOptions(true); };

  const pick = async (i: number) => {
    if (picked !== null || !word) return;
    clearTimer();
    setPicked(i);
    const correct = options[i] === word.en;
    const v: Verdict = correct && !cued ? "right" : correct ? "cued" : "wrong";
    setVerdict(v);
    buzz(v === "right" ? Haptics.NotificationFeedbackType.Success
      : v === "cued" ? Haptics.NotificationFeedbackType.Warning : Haptics.NotificationFeedbackType.Error);
    const nowPassed = await recordAnswer(word.id, correct, cued);
    if (v === "right") {
      setPassed((n) => n + 1);
      // recordAnswer is true only when the word passes, and a passed word is never asked again: one coin per word.
      if (nowPassed) {
        setCoins((c) => c + VOCAB_COINS_PER_WORD);
        awardVocabCoin().then(setBalance).catch(() => {});
      }
      timer.current = setTimeout(() => next("right"), 1100);
    }
  };

  const next = (v: Verdict | null = verdict) => {
    clearTimer();
    const [cur, ...rest] = queueRef.current;
    const nq = [...rest];
    // Not passed: back into the queue a few cards later, so it returns this session.
    if (v !== "right" && cur) nq.splice(Math.min(3, rest.length), 0, cur);
    queueRef.current = nq;
    setQueue(nq);
    if (!nq.length) setPhase("done"); else dealCard(nq[0]);
  };

  const stop = () => {
    clearTimer();
    // A word just answered right is already passed; drop it before counting what's left.
    if (verdict === "right") { queueRef.current = queueRef.current.slice(1); setQueue(queueRef.current); }
    setQuit(true); setPhase("done");
  };

  const leave = () => {
    clearTimer();
    if (p.from !== "card") { try { (router as any).dismiss(2); return; } catch {} }
    if (router.canGoBack()) router.back(); else router.replace("/");
  };

  const remaining = queue.length;

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.top}>
        <Text style={styles.topTitle}>Vocab check</Text>
        {phase === "card" && (
          <Pressable onPress={stop} accessibilityRole="button" accessibilityLabel="Quit vocab check" hitSlop={12}>
            <Ionicons name="close" size={26} color={SOFT} />
          </Pressable>
        )}
      </View>
      {phase === "card" && (
        <View style={styles.progressRow}>
          <View style={styles.track}><View style={[styles.fill, { width: `${(passed / Math.max(1, total)) * 100}%` }]} /></View>
          <Text style={styles.progressText}>{passed} / {total}</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.body}>
        {phase === "loading" && <ActivityIndicator color={BLUE} style={{ marginTop: 80 }} />}

        {phase === "intro" && (
          <View style={styles.introCard}>
            <View style={styles.introIcon}><Ionicons name="albums" size={28} color="#FFFFFF" /></View>
            <Text style={styles.h1}>{total} {total === 1 ? "word" : "words"} to check</Text>
            <Text style={styles.p}>Name each French word in English.</Text>
            <Text style={styles.p}>
              Stuck? Press <Text style={{ fontWeight: "800" }}>VIS-CUE</Text> for a picture. A cued word counts as wrong
              and comes back — even if you then get it right.
            </Text>
            <Text style={styles.p}>A word you get right on its own won't come back.</Text>
          </View>
        )}

        {phase === "card" && word && (
          <>
            <View style={styles.wordCard}>
              <Text style={styles.wordFr} accessibilityLanguage="fr">{word.fr}</Text>
              <Text style={styles.pos}>{word.pos}</Text>
            </View>

            {picked === null && !cueOpen && (
              <Pressable style={[styles.visCue, cued && styles.visCueUsed]} onPress={pressVisCue}
                accessibilityRole="button" accessibilityLabel="VIS-CUE, show a picture. Counts as incorrect.">
                <Ionicons name="eye" size={18} color={cued ? SOFT : "#FFFFFF"} />
                <Text style={[styles.visCueText, cued && { color: SOFT }]}>VIS-CUE</Text>
              </Pressable>
            )}

            {cueOpen && (
              <Pressable onPress={closeCue} accessibilityRole="button" accessibilityHint="Tap to show the answers"
                style={styles.cueWrap}>
                <VisCue word={word} />
                <Text style={styles.tapHint}>Tap the picture for the answers</Text>
              </Pressable>
            )}

            {!cueOpen && !showOptions && picked === null && (
              <Pressable onPress={() => { clearTimer(); setShowOptions(true); }} style={{ padding: 18 }}>
                <Text style={styles.waitHint}>Think of the English… answers in a moment</Text>
              </Pressable>
            )}

            {showOptions && (
              <View style={styles.options}>
                {options.map((o, i) => {
                  const isAnswer = o === word.en;
                  const chosen = picked === i;
                  const done = picked !== null;
                  const tint = done && isAnswer ? GREEN : done && chosen ? RED : undefined;
                  return (
                    <Pressable key={o} onPress={() => pick(i)} disabled={done} accessibilityRole="button"
                      style={[styles.option, tint && { borderColor: tint, backgroundColor: tint + "1A" }]}>
                      <Text style={styles.optLetter}>{String.fromCharCode(65 + i)}</Text>
                      <Text style={[styles.optText, tint && { color: tint, fontWeight: "800" }]}>{o}</Text>
                    </Pressable>
                  );
                })}
              </View>
            )}

            {verdict && (
              <View style={[styles.verdict, { borderColor: verdict === "right" ? GREEN : verdict === "cued" ? AMBER : RED }]}>
                <Text style={[styles.verdictTitle, { color: verdict === "right" ? GREEN : verdict === "cued" ? AMBER : RED }]}>
                  {verdict === "right" ? `Correct!  +${VOCAB_COINS_PER_WORD} 🪙` : verdict === "cued" ? "Right — but VIS-CUE was used" : "Not quite"}
                </Text>
                {verdict !== "right" && (
                  <Text style={styles.verdictSub}>
                    {word.fr} = {word.en}. {verdict === "cued" ? "It counts as incorrect, so it'll come back." : "It'll come back."}
                  </Text>
                )}
              </View>
            )}
          </>
        )}

        {phase === "done" && (
          <View style={styles.introCard}>
            <View style={[styles.introIcon, { backgroundColor: total === 0 || !quit ? GREEN : BLUE }]}>
              <Ionicons name={quit ? "pause" : "checkmark"} size={30} color="#FFFFFF" />
            </View>
            <Text style={styles.h1}>
              {total === 0 ? "No words to check" : quit ? "Vocab check paused" : "Vocab check complete"}
            </Text>
            {total > 0 && (
              <Text style={styles.p}>
                {passed} of {total} {total === 1 ? "word" : "words"} learnt.
                {quit && remaining > 0 ? ` ${remaining} will come back at your next vocab check.` : ""}
              </Text>
            )}
            {coins > 0 && (
              <Text style={styles.coinLine}>
                +{coins} 🪙{balance !== null ? `  ·  balance ${balance}` : ""}
              </Text>
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {phase === "intro" && (
          <>
            <Pressable style={styles.primary} onPress={start} accessibilityRole="button">
              <Text style={styles.primaryText}>Start</Text>
            </Pressable>
            <Pressable style={styles.linkBtn} onPress={leave} accessibilityRole="button">
              <Text style={styles.linkText}>Later — keep them for next time</Text>
            </Pressable>
          </>
        )}
        {phase === "card" && verdict && verdict !== "right" && (
          <Pressable style={styles.primary} onPress={() => next()} accessibilityRole="button">
            <Text style={styles.primaryText}>Next</Text>
          </Pressable>
        )}
        {phase === "done" && (
          <Pressable style={styles.primary} onPress={leave} accessibilityRole="button">
            <Text style={styles.primaryText}>Continue</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#FFFFFF" },
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 22, paddingTop: 60, paddingBottom: 8 },
  topTitle: { color: INK, fontSize: 20, fontWeight: "800" },
  progressRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 22 },
  track: { flex: 1, height: 8, borderRadius: 4, backgroundColor: "#ECEFF7", overflow: "hidden" },
  fill: { height: 8, backgroundColor: GREEN },
  progressText: { color: SOFT, fontSize: 13, fontWeight: "700" },
  body: { padding: 22, paddingBottom: 40, alignItems: "stretch" },
  introCard: { alignItems: "center", gap: 10, marginTop: 30 },
  introIcon: { width: 60, height: 60, borderRadius: 30, backgroundColor: BLUE, alignItems: "center", justifyContent: "center" },
  h1: { color: INK, fontSize: 24, fontWeight: "800", textAlign: "center" },
  p: { color: SOFT, fontSize: 16, textAlign: "center", lineHeight: 23 },
  wordCard: { backgroundColor: "#F4F7FE", borderRadius: 24, borderWidth: 1, borderColor: "#DDE5F7",
    paddingVertical: 34, paddingHorizontal: 16, alignItems: "center", marginTop: 12 },
  wordFr: { color: INK, fontSize: 38, fontWeight: "800", textAlign: "center" },
  pos: { color: SOFT, fontSize: 13, marginTop: 6, textTransform: "uppercase", letterSpacing: 1 },
  visCue: { flexDirection: "row", alignSelf: "center", alignItems: "center", gap: 8, marginTop: 16,
    backgroundColor: "#7C4DDB", borderRadius: 22, paddingVertical: 11, paddingHorizontal: 24 },
  visCueUsed: { backgroundColor: "#ECEFF7" },
  visCueText: { color: "#FFFFFF", fontSize: 16, fontWeight: "900", letterSpacing: 1.5 },
  cueWrap: { marginTop: 22, alignItems: "center" },
  tapHint: { color: BLUE, fontSize: 14, fontWeight: "700", marginTop: 14 },
  waitHint: { color: "#7A83A8", fontSize: 14, textAlign: "center" },
  options: { gap: 10, marginTop: 18 },
  option: { flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 2, borderColor: "#DDE5F7",
    borderRadius: 16, paddingVertical: 14, paddingHorizontal: 16, backgroundColor: "#FFFFFF" },
  optLetter: { color: SOFT, fontSize: 14, fontWeight: "800", width: 18 },
  optText: { color: INK, fontSize: 17, fontWeight: "600", flex: 1 },
  verdict: { marginTop: 16, borderWidth: 2, borderRadius: 16, padding: 14, gap: 4 },
  verdictTitle: { fontSize: 17, fontWeight: "800" },
  verdictSub: { color: SOFT, fontSize: 15, lineHeight: 21 },
  footer: { paddingHorizontal: 22, paddingTop: 10, paddingBottom: 40, gap: 10 },
  primary: { backgroundColor: BLUE, borderRadius: 26, paddingVertical: 16, alignItems: "center" },
  primaryText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
  linkBtn: { alignItems: "center", padding: 8 },
  linkText: { color: BLUE, fontSize: 15, fontWeight: "600" },
  coinLine: { color: INK, fontSize: 20, fontWeight: "800", marginTop: 6, fontVariant: ["tabular-nums"] },
});
