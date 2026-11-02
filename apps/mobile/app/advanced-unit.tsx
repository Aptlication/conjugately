import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LEXICON_POOL, advancedUnit } from "@shared/advanced/content";
import type { LexEntry } from "@shared/advanced/types";
import ReadingStep from "../components/advanced/ReadingStep";
import ReadTip from "../components/advanced/ReadTip";
import WordsStep from "../components/advanced/WordsStep";
import QuizStep from "../components/advanced/QuizStep";
import ConvStep from "../components/advanced/ConvStep";
import CoinIcon from "../components/CoinIcon";
import { fromLex, readTipOff, saveUnitResult, turnReadTipOff, wordId, type AdvWord } from "../lib/advanced";
import { useAdvancedPlayer } from "../lib/advancedPlayer";
import { purchasesAvailable, usePro } from "../lib/pro";
import { maybeAskForReview } from "../lib/reviewPrompt";

/**
 * One Advanced unit (pilot, 1 Nov 2026; revised 2 Nov 2026):
 * Read → Words → Verb quiz → Conversation (translate format) → Summary.
 * The flow and its rules were set by Jonathan on 31 Oct 2026; see
 * advanced-reading-curriculum-plan.md in the project.
 */

const INK = "#1B2145";
const SOFT = "#5A6390";
const BLUE = "#2B5FD9";
const RED = "#E63A2E";
const STEPS = ["Lire", "Mots", "Quiz", "Conversation", "Bilan"];

export default function AdvancedUnit() {
  const { unit: unitId } = useLocalSearchParams<{ unit: string }>();
  const unit = useMemo(() => advancedUnit(String(unitId || "")), [unitId]);
  const insets = useSafeAreaInsets();
  const { isPro, loading } = usePro();
  const { play, stop } = useAdvancedPlayer();
  const [step, setStep] = useState(0);
  const [saved, setSaved] = useState<LexEntry[]>([]);
  const [tip, setTip] = useState(false);
  const [words, setWords] = useState<{ learned: AdvWord[]; later: AdvWord[]; coins: number } | null>(null);
  const [quiz, setQuiz] = useState<{ score: number; total: number; coins: number } | null>(null);
  const [talk, setTalk] = useState<{ replies: number; firstTime: number } | null>(null);

  // Pro feature. The web build (staging) has no store, so it always opens.
  useEffect(() => { if (!loading && !isPro && purchasesAvailable()) router.replace("/paywall" as any); }, [loading, isPro]);
  useEffect(() => { readTipOff().then((off) => { if (!off) setTip(true); }); }, []);

  // Key words borrow the lexicon's word class (for fair wrong answers) and picture clue where it has them.
  const keyWords: AdvWord[] = useMemo(() => (unit?.keyWords ?? []).map((k) => {
    const lx = LEXICON_POOL.find((e) => wordId(e.fr) === wordId(k.fr));
    const pos = lx?.pos ?? (/^(le|la|les|l'|un|une) /i.test(k.fr) ? "noun" : /^(se |s')?[a-zéè]+(er|ir|re|oir)$/i.test(k.fr) ? "verb" : "phrase");
    return { fr: k.fr, en: k.en, mine: false, pos, emoji: lx?.emoji };
  }), [unit]);

  if (!unit) {
    return (
      <View style={[styles.screen, { alignItems: "center", justifyContent: "center", padding: 24 }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={styles.h1}>This article isn’t available.</Text>
        <Pressable onPress={() => router.back()}><Text style={styles.link}>← Back</Text></Pressable>
      </View>
    );
  }

  const toggle = (e: LexEntry) =>
    setSaved((s) => s.some((x) => x.fr === e.fr) ? s.filter((x) => x.fr !== e.fr) : [...s, e]);

  const leave = () => { stop(); if (router.canGoBack()) router.back(); else router.replace("/advanced" as any); };

  const finishTalk = (r: { replies: number; firstTime: number }) => {
    setTalk(r);
    saveUnitResult(unit.id, { coins: (words?.coins ?? 0) + (quiz?.coins ?? 0), quizScore: quiz?.score ?? 0, firstTime: r.firstTime }).catch(() => {});
    setStep(4);
    maybeAskForReview("unit");
  };

  const totalCoins = (words?.coins ?? 0) + (quiz?.coins ?? 0);

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.top}>
        <Pressable onPress={leave} accessibilityRole="button" accessibilityLabel="Close" style={styles.close}>
          <Ionicons name="close" size={20} color="#47507A" />
        </Pressable>
        <View style={styles.steps} accessibilityRole="progressbar" accessibilityLabel={`Step ${step + 1} of ${STEPS.length}: ${STEPS[step]}`}>
          {STEPS.map((s, i) => (
            <View key={s} style={{ flex: 1 }}>
              <View style={[styles.stepBar, i < step && { backgroundColor: BLUE }, i === step && { backgroundColor: RED }]} />
              <Text style={[styles.stepText, i === step && { color: INK, fontWeight: "800" }]} numberOfLines={1}>{s}</Text>
            </View>
          ))}
        </View>
      </View>

      {step === 0 && (
        <ReadingStep unit={unit} saved={saved} onToggle={toggle} play={play} stop={stop}
          onHowTo={() => setTip(true)} onDone={() => setStep(1)} />
      )}
      {step === 1 && (
        <WordsStep unitId={unit.id} keyWords={keyWords}
          mine={saved.filter((e) => !keyWords.some((k) => wordId(k.fr) === wordId(e.fr))).map((e) => fromLex(e))}
          play={play} onDone={(r) => { setWords(r); setStep(2); }} />
      )}
      {step === 2 && <QuizStep unit={unit} play={play} onDone={(r) => { setQuiz(r); setStep(3); }} />}
      {step === 3 && <ConvStep unit={unit} play={play} stop={stop} onDone={finishTalk} />}
      {step === 4 && (
        <ScrollView contentContainerStyle={styles.summary}>
          <Text style={styles.h1}>Bilan</Text>
          <Text style={styles.sub}>{unit.title} · unit complete</Text>
          <View style={styles.stats}>
            <View style={styles.stat}><Text style={styles.statN}>{totalCoins} <CoinIcon size={18} /></Text><Text style={styles.statL}>coins earned</Text></View>
            <View style={styles.stat}><Text style={styles.statN}>{words?.learned.length ?? 0}</Text><Text style={styles.statL}>words learnt</Text></View>
            <View style={styles.stat}><Text style={styles.statN}>{quiz?.score ?? 0}/{quiz?.total ?? 10}</Text><Text style={styles.statL}>verb quiz · {unit.verb}</Text></View>
            <View style={styles.stat}><Text style={styles.statN}>{talk?.firstTime ?? 0}/{talk?.replies ?? 5}</Text><Text style={styles.statL}>replies right first time</Text></View>
          </View>
          <Text style={styles.label}>LEARNT IN THIS LESSON</Text>
          <View style={styles.chips}>
            {(words?.learned ?? []).map((w) => <View key={w.fr} style={[styles.chip, w.mine && styles.chipMine]}><Text style={[styles.chipText, w.mine && { color: BLUE }]}>{w.fr}</Text></View>)}
          </View>
          <Text style={[styles.label, { marginTop: 16 }]}>WAITING IN MY WORDS</Text>
          <View style={styles.chips}>
            {words?.later.length ? words.later.map((w) => <View key={w.fr} style={styles.chip}><Text style={styles.chipText}>{w.fr}</Text></View>)
              : <Text style={styles.empty}>Nothing. You learnt every word on the spot.</Text>}
          </View>
          <Pressable style={[styles.primary, { marginTop: 28 }]} onPress={leave} accessibilityRole="button">
            <Text style={styles.primaryText}>Continue</Text>
          </Pressable>
        </ScrollView>
      )}

      <ReadTip visible={tip && step === 0} onClose={() => setTip(false)} onNever={() => { turnReadTipOff(); setTip(false); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F7F9FD" },
  top: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 },
  close: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#EEF1F8", alignItems: "center", justifyContent: "center" },
  steps: { flex: 1, flexDirection: "row", gap: 6 },
  stepBar: { height: 4, borderRadius: 2, backgroundColor: "#DCE2EE", marginBottom: 4 },
  stepText: { fontSize: 12, color: SOFT },
  h1: { color: INK, fontSize: 26, fontWeight: "800", textAlign: "center" },
  sub: { color: SOFT, fontSize: 14, textAlign: "center", marginTop: 4 },
  link: { color: BLUE, fontSize: 16, marginTop: 16 },
  summary: { padding: 22, paddingBottom: 48 },
  stats: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginVertical: 18 },
  stat: { flexGrow: 1, flexBasis: "45%", backgroundColor: "#FFFFFF", borderRadius: 14, borderWidth: 1, borderColor: "#E3E8F3", padding: 12 },
  statN: { color: INK, fontSize: 22, fontWeight: "800" },
  statL: { color: SOFT, fontSize: 12, marginTop: 2 },
  label: { color: SOFT, fontSize: 12, fontWeight: "800", letterSpacing: 1, marginBottom: 8 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { borderWidth: 1, borderColor: "#DDE5F7", borderRadius: 14, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: "#FFFFFF" },
  chipMine: { borderColor: BLUE },
  chipText: { color: INK, fontSize: 15, fontWeight: "600" },
  empty: { color: "#7A83A8", fontSize: 14 },
  primary: { backgroundColor: BLUE, borderRadius: 26, paddingVertical: 16, alignItems: "center" },
  primaryText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
});
