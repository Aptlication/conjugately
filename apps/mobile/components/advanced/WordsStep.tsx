import React, { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import VisCue from "../VisCue";
import CoinIcon from "../CoinIcon";
import { wordClip } from "@shared/advanced/audioKeys";
import { addToMyWords, wordId, wordOptions, type AdvWord } from "../../lib/advanced";
import { awardCoins } from "../../lib/coins";

/**
 * Words (Advanced units). First the learner sorts the words they saved:
 * Learn now (the default, and what we encourage) or Later, which sends the
 * word to My Words and earns nothing today. Then the lesson's key words and
 * the learn-now words are tested on the spot, the same way as the vocab check
 * elsewhere: the French word, four English answers, VIS-CUE for a picture
 * (counts as wrong), and missed words come back until they're right.
 */

const INK = "#1B2145";
const SOFT = "#5A6390";
const BLUE = "#2B5FD9";
const GREEN = "#22A45D";
const RED = "#E63A2E";
const AMBER = "#D98A00";
const OPTIONS_DELAY_MS = 2500;

type Verdict = "right" | "cued" | "wrong";
type Card = { w: AdvWord; options: string[] };

export default function WordsStep({ unitId, keyWords, mine, play, onDone }: {
  unitId: string;
  keyWords: AdvWord[];
  mine: AdvWord[];
  play: (items: { key: string; text: string }[], onEnd?: () => void) => void;
  onDone: (r: { learned: AdvWord[]; later: AdvWord[]; coins: number }) => void;
}) {
  const own = mine.filter((m) => !keyWords.some((k) => wordId(k.fr) === wordId(m.fr)));
  const [phase, setPhase] = useState<"sort" | "card" | "done">(own.length ? "sort" : "card");
  const [later, setLater] = useState<Record<string, boolean>>({});
  const [queue, setQueue] = useState<Card[]>([]);
  const queueRef = useRef<Card[]>([]);
  const [total, setTotal] = useState(0);
  const [learned, setLearned] = useState<AdvWord[]>([]);
  const [coins, setCoins] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [cueOpen, setCueOpen] = useState(false);
  const [cued, setCued] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTimer = () => { if (timer.current) { clearTimeout(timer.current); timer.current = null; } };
  useEffect(() => () => clearTimer(), []);

  const laterWords = own.filter((w) => later[wordId(w.fr)]);
  const nowWords = [...keyWords, ...own.filter((w) => !later[wordId(w.fr)])];

  const say = (w: AdvWord) => play([{ key: wordClip(w.fr), text: w.fr }]);

  const deal = (c: Card | undefined) => {
    clearTimer();
    setPicked(null); setVerdict(null); setCued(false); setCueOpen(false); setShowOptions(false);
    if (!c) return;
    say(c.w);
    timer.current = setTimeout(() => setShowOptions(true), OPTIONS_DELAY_MS);
  };

  const begin = () => {
    const cards = nowWords.map((w) => ({ w, options: wordOptions(w) }));
    queueRef.current = cards; setQueue(cards); setTotal(cards.length);
    setPhase(cards.length ? "card" : "done");
    deal(cards[0]);
  };
  // No saved words to sort: go straight to the cards.
  useEffect(() => { if (!own.length) begin(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);

  const card = queue[0];
  const pick = (i: number) => {
    if (picked !== null || !card) return;
    clearTimer();
    setPicked(i);
    const correct = card.options[i] === card.w.en;
    const v: Verdict = correct && !cued ? "right" : correct ? "cued" : "wrong";
    setVerdict(v);
    Haptics.notificationAsync(v === "right" ? Haptics.NotificationFeedbackType.Success
      : v === "cued" ? Haptics.NotificationFeedbackType.Warning : Haptics.NotificationFeedbackType.Error).catch(() => {});
    if (v === "right") {
      setCoins((c) => c + 1);
      awardCoins(1).catch(() => {});
      setLearned((l) => [...l, card.w]);
      timer.current = setTimeout(() => next("right"), 1100);
    }
  };

  const next = (v: Verdict | null = verdict) => {
    clearTimer();
    const [cur, ...rest] = queueRef.current;
    const nq = [...rest];
    if (v !== "right" && cur) nq.splice(Math.min(3, rest.length), 0, { w: cur.w, options: wordOptions(cur.w) });
    queueRef.current = nq; setQueue(nq);
    if (!nq.length) setPhase("done"); else deal(nq[0]);
  };

  const finish = () => {
    addToMyWords(learned, unitId, "mastered").catch(() => {});
    addToMyWords(laterWords, unitId, "new").catch(() => {});
    onDone({ learned, later: laterWords, coins });
  };

  return (
    <View style={{ flex: 1 }}>
      {phase === "card" && (
        <View style={styles.progressRow}>
          <View style={styles.track}><View style={[styles.fill, { width: `${(learned.length / Math.max(1, total)) * 100}%` }]} /></View>
          <Text style={styles.progressText}>{learned.length} / {total}</Text>
        </View>
      )}
      <ScrollView contentContainerStyle={styles.body}>
        {phase === "sort" && (
          <>
            <Text style={styles.h1}>Les mots</Text>
            <Text style={styles.p}>
              Learn your words now, before the quiz and the conversation: you’ll meet them again there, and each one learnt earns a coin.
              Words you send to My Words wait there for later.
            </Text>
            <Text style={styles.label}>YOUR WORDS · {own.length}</Text>
            {own.map((w) => {
              const id = wordId(w.fr);
              const isLater = !!later[id];
              return (
                <View key={id} style={styles.sortRow}>
                  <View style={{ flex: 1, minWidth: 140 }}>
                    <Text style={styles.sortFr} accessibilityLanguage="fr">{w.fr}</Text>
                    <Text style={styles.sortEn}>{w.en}</Text>
                  </View>
                  <Pressable onPress={() => say(w)} hitSlop={8} accessibilityLabel={`Hear ${w.fr}`} style={styles.speakerSmall}>
                    <Ionicons name="volume-high" size={16} color={BLUE} />
                  </Pressable>
                  <View style={styles.seg} accessibilityRole="radiogroup">
                    <Pressable onPress={() => setLater((l) => ({ ...l, [id]: false }))} accessibilityRole="radio"
                      accessibilityState={{ selected: !isLater }} style={[styles.segBtn, !isLater && { backgroundColor: GREEN }]}>
                      <Text style={[styles.segText, !isLater && { color: "#FFFFFF" }]}>Learn now</Text>
                    </Pressable>
                    <Pressable onPress={() => setLater((l) => ({ ...l, [id]: true }))} accessibilityRole="radio"
                      accessibilityState={{ selected: isLater }} style={[styles.segBtn, isLater && { backgroundColor: SOFT }]}>
                      <Text style={[styles.segText, isLater && { color: "#FFFFFF" }]}>Later</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
            {laterWords.length > 0 && (
              <Text style={styles.nudge}>
                {laterWords.length === 1 ? "1 word goes" : `${laterWords.length} words go`} to My Words. Learning them now is better!
              </Text>
            )}
            <Text style={[styles.label, { marginTop: 18 }]}>THIS LESSON’S KEY WORDS · {keyWords.length}</Text>
            <View style={styles.keyChips}>
              {keyWords.map((w) => <View key={w.fr} style={styles.keyChip}><Text style={styles.keyChipText}>{w.fr}</Text></View>)}
            </View>
          </>
        )}

        {phase === "card" && card && (
          <>
            <View style={styles.wordCard}>
              <Text style={[styles.tag, card.w.mine && { color: BLUE }]}>{card.w.mine ? "YOUR WORD" : "LESSON WORD"}</Text>
              <Text style={styles.wordFr} accessibilityLanguage="fr">{card.w.fr}</Text>
              <Pressable onPress={() => say(card.w)} hitSlop={12} accessibilityRole="button"
                accessibilityLabel={`Hear ${card.w.fr}`} style={styles.speaker}>
                <Ionicons name="volume-high" size={22} color={BLUE} />
              </Pressable>
            </View>

            {picked === null && !cueOpen && !!card.w.emoji && (
              <Pressable style={[styles.visCue, cued && styles.visCueUsed]}
                onPress={() => { clearTimer(); setCued(true); setCueOpen(true); setShowOptions(false); }}
                accessibilityRole="button" accessibilityLabel="VIS-CUE, show a picture. Counts as incorrect.">
                <Ionicons name="eye" size={18} color={cued ? SOFT : "#FFFFFF"} />
                <Text style={[styles.visCueText, cued && { color: SOFT }]}>VIS-CUE</Text>
              </Pressable>
            )}
            {cueOpen && (
              <Pressable onPress={() => { setCueOpen(false); setShowOptions(true); }} style={styles.cueWrap}
                accessibilityRole="button" accessibilityHint="Tap to show the answers">
                <VisCue word={{ emoji: card.w.emoji ?? "❓" } as any} />
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
                {card.options.map((o, i) => {
                  const done = picked !== null;
                  const tint = done && o === card.w.en ? GREEN : done && picked === i ? RED : undefined;
                  return (
                    <Pressable key={`${o}-${i}`} onPress={() => pick(i)} disabled={done} accessibilityRole="button"
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
                  {verdict === "right" ? <>Correct!  +1 <CoinIcon size={16} /></> : verdict === "cued" ? "Right — but VIS-CUE was used" : "Not quite"}
                </Text>
                {verdict !== "right" && <Text style={styles.verdictSub}>{card.w.fr} = {card.w.en}. It’ll come back.</Text>}
              </View>
            )}
          </>
        )}

        {phase === "done" && (
          <View style={styles.doneCard}>
            <View style={styles.doneIcon}><Ionicons name="checkmark" size={30} color="#FFFFFF" /></View>
            <Text style={styles.h1}>Mots appris</Text>
            <Text style={styles.p}>You learnt all {total} words. Next, the verb quiz.</Text>
            {coins > 0 && <Text style={styles.coinLine}>+{coins} <CoinIcon size={20} /></Text>}
            {laterWords.length > 0 && (
              <>
                <Text style={[styles.label, { marginTop: 10 }]}>SENT TO MY WORDS FOR LATER</Text>
                <View style={[styles.keyChips, { justifyContent: "center" }]}>
                  {laterWords.map((w) => <View key={w.fr} style={styles.keyChip}><Text style={styles.keyChipText}>{w.fr}</Text></View>)}
                </View>
              </>
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {phase === "sort" && (
          <Pressable style={styles.primary} onPress={begin} accessibilityRole="button">
            <Text style={styles.primaryText}>Learn {nowWords.length} words now →</Text>
          </Pressable>
        )}
        {phase === "card" && verdict && verdict !== "right" && (
          <Pressable style={styles.primary} onPress={() => next()} accessibilityRole="button">
            <Text style={styles.primaryText}>Next</Text>
          </Pressable>
        )}
        {phase === "done" && (
          <Pressable style={styles.primary} onPress={finish} accessibilityRole="button">
            <Text style={styles.primaryText}>Start the verb quiz →</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { padding: 22, paddingBottom: 40 },
  progressRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 22, paddingTop: 6 },
  track: { flex: 1, height: 8, borderRadius: 4, backgroundColor: "#ECEFF7", overflow: "hidden" },
  fill: { height: 8, backgroundColor: GREEN },
  progressText: { color: SOFT, fontSize: 13, fontWeight: "700" },
  h1: { color: INK, fontSize: 24, fontWeight: "800", textAlign: "center", marginTop: 6 },
  p: { color: SOFT, fontSize: 16, textAlign: "center", lineHeight: 23, marginTop: 8, marginBottom: 14 },
  label: { color: SOFT, fontSize: 12, fontWeight: "800", letterSpacing: 1, marginBottom: 8 },
  sortRow: { flexDirection: "row", alignItems: "center", flexWrap: "wrap", gap: 10, borderWidth: 1, borderColor: "#E3E8F3",
    borderRadius: 14, padding: 12, marginBottom: 8, backgroundColor: "#FFFFFF" },
  sortFr: { color: INK, fontSize: 18, fontWeight: "800" },
  sortEn: { color: SOFT, fontSize: 14 },
  speakerSmall: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, borderColor: "#DDE5F7", alignItems: "center", justifyContent: "center" },
  seg: { flexDirection: "row", borderWidth: 1, borderColor: "#DDE5F7", borderRadius: 18, overflow: "hidden" },
  segBtn: { paddingVertical: 7, paddingHorizontal: 12, backgroundColor: "#F4F6FB" },
  segText: { color: INK, fontSize: 14, fontWeight: "700" },
  nudge: { color: AMBER, fontSize: 14, fontWeight: "700", textAlign: "center", marginTop: 4 },
  keyChips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  keyChip: { borderWidth: 1, borderColor: "#DDE5F7", borderRadius: 14, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: "#FFFFFF" },
  keyChipText: { color: INK, fontSize: 15, fontWeight: "600" },
  wordCard: { backgroundColor: "#F4F7FE", borderRadius: 24, borderWidth: 1, borderColor: "#DDE5F7",
    paddingVertical: 30, paddingHorizontal: 16, alignItems: "center", marginTop: 12 },
  tag: { color: SOFT, fontSize: 12, fontWeight: "800", letterSpacing: 1, marginBottom: 8 },
  wordFr: { color: INK, fontSize: 34, fontWeight: "800", textAlign: "center" },
  speaker: { position: "absolute", top: 12, right: 12, padding: 6 },
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
  doneCard: { alignItems: "center", gap: 6, marginTop: 30 },
  doneIcon: { width: 60, height: 60, borderRadius: 30, backgroundColor: GREEN, alignItems: "center", justifyContent: "center" },
  coinLine: { color: INK, fontSize: 20, fontWeight: "800" },
  footer: { paddingHorizontal: 22, paddingTop: 10, paddingBottom: 36, gap: 10 },
  primary: { backgroundColor: BLUE, borderRadius: 26, paddingVertical: 16, alignItems: "center" },
  primaryText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
});
