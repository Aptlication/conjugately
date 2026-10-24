import React, { useRef, useState } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router } from "expo-router";
import Dial, { DialHandle, DialOption } from "../components/Dial";
import NavBar from "../components/NavBar";
import { DIFFICULTY_CONFIGS, LEVELS, VERB_MEANINGS, timeFramesForLevel } from "../lib/data";

/**
 * Verbs tab — "Build Your Quiz" (1.2.3 / 1.2.4, design locked 18 Oct 2026).
 *
 * The Difficulty / Verb / Tense reels, their caption, Start Quiz and the
 * Choose All for Me modal moved here from Home UNCHANGED. Only two things are
 * new: the "Build Your Quiz" title, and Choose All for Me restyled to the
 * filled "Con"-blue style of Home's Continue button.
 */
export default function Verbs() {
  const [difficulty, setDifficulty] = useState("");
  const [verb, setVerb] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [locked, setLocked] = useState(false);
  const [modal, setModal] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const d1 = useRef<DialHandle>(null);
  const d2 = useRef<DialHandle>(null);
  const d3 = useRef<DialHandle>(null);

  const levelOptions: DialOption[] = LEVELS.map((l) => ({
    value: l.key, label: l.key || "Difficulty…", detail: l.detail, disabled: (l as any).disabled,
  }));
  const verbs = difficulty ? DIFFICULTY_CONFIGS[difficulty]?.verbs ?? [] : [];
  const verbOptions: DialOption[] = [
    { value: "", label: difficulty ? "Verb…" : "Level first" },
    ...verbs.map((v) => ({ value: v, label: v })),
  ];
  // Imperfect and Pluperfect appear for Intermediate A and B only (25 Oct 2026).
  const levelTimeFrames = timeFramesForLevel(difficulty);
  const timeOptions: DialOption[] = [
    { value: "", label: "Tense…" },
    ...levelTimeFrames.map((t) => ({ value: t, label: t })),
  ];

  const ready = difficulty && verb && timeFrame;

  const levelDetail = LEVELS.find((l) => l.key === difficulty)?.detail ?? "";
  const reelCaption = verb
    ? `${verb} — ${VERB_MEANINGS[verb] ?? ""}`
    : difficulty
      ? levelDetail
      : "Swipe each reel, or tap \u{1F3B2} Choose All for Me.";

  const chooseAll = (levelKey: string) => {
    setModal(false);
    setSpinning(true);
    setDifficulty(levelKey);
    setVerb(""); setTimeFrame("");
    const cfg = DIFFICULTY_CONFIGS[levelKey];
    const v = cfg.verbs[Math.floor(Math.random() * cfg.verbs.length)];
    const tfs = timeFramesForLevel(levelKey);
    const tf = tfs[Math.floor(Math.random() * tfs.length)];
    const li = levelOptions.findIndex((o) => o.value === levelKey);
    d1.current?.spinTo(li, 50);
    setTimeout(() => {
      const vi = cfg.verbs.indexOf(v) + 1;
      d2.current?.spinTo(vi, 0, () => setVerb(v));
      d3.current?.spinTo(tfs.indexOf(tf) + 1, 350, () => {
        setTimeFrame(tf); setSpinning(false);
      });
    }, 500);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1B2145" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title} accessibilityRole="header">Build Your Quiz</Text>

        <View style={styles.btnRow}>
          <Pressable onPress={() => !spinning && setModal(true)} accessibilityRole="button">
            <View style={styles.chooseBtn}>
              <Text style={styles.chooseBtnText}>🎲 Choose All for Me</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.card}>
          <View style={styles.reelHead}>
            <View style={[styles.reelHeadCell, styles.reelHeadFirst]}>
              <Pressable onPress={() => setLocked(!locked)} hitSlop={10}>
                <Text style={styles.lock}>{locked ? "🔒" : "🔓"}</Text>
              </Pressable>
              <Text style={styles.reelNum}>1.</Text>
              <Text style={styles.reelLabel}>Difficulty</Text>
            </View>
            <View style={styles.reelHeadCell}>
              <Text style={styles.reelNum}>2.</Text>
              <Text style={styles.reelLabel}>Verb</Text>
            </View>
            <View style={styles.reelHeadCell}>
              <Text style={styles.reelNum}>3.</Text>
              <Text style={styles.reelLabel}>Tense</Text>
            </View>
          </View>

          <View style={styles.reelRow}>
            <View style={styles.reelCol}>
              <Dial ref={d1} compact options={levelOptions} disabled={locked}
                onSettle={(v) => { if (v !== difficulty) { setDifficulty(v); setVerb(""); if (!timeFramesForLevel(v).includes(timeFrame)) setTimeFrame(""); } }} />
            </View>
            <View style={styles.reelCol}>
              <Dial ref={d2} compact options={verbOptions} disabled={!difficulty}
                onSettle={(v) => setVerb(v)} />
            </View>
            <View style={styles.reelCol}>
              <Dial ref={d3} compact options={timeOptions} disabled={!difficulty}
                onSettle={(v) => setTimeFrame(v)} />
            </View>
          </View>

          <Text style={styles.reelCaption} numberOfLines={2}>{reelCaption}</Text>

          <Pressable disabled={!ready || spinning}
            onPress={() => router.push({ pathname: "/quiz", params: { difficulty, verb, timeFrame } })}>
            <View style={[styles.startBtn, ready ? { backgroundColor: "#4A78F2" } : { backgroundColor: "#2C4194", opacity: 0.7 }]}>
              <Text style={styles.startText}>
                {ready ? `Start ${verb} Quiz (${difficulty} - ${timeFrame})` : "Start Quiz"}
              </Text>
            </View>
          </Pressable>
        </View>

        {ready && (
          <View style={styles.preview}>
            <Text style={styles.previewTitle}>Quiz Preview</Text>
            <Text style={styles.previewText}>
              Ready to generate 20 questions for <Text style={styles.bold}>{verb}</Text> conjugations
              in <Text style={styles.bold}>{timeFrame}</Text> ({difficulty} difficulty)
            </Text>
          </View>
        )}
      </ScrollView>

      <Modal visible={modal} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Choose Difficulty Level</Text>
            {LEVELS.filter((l) => l.key && !(l as any).disabled).map((l) => (
              <Pressable key={l.key} style={styles.modalRow} onPress={() => chooseAll(l.key)}>
                <Text style={styles.modalRowTitle}>{l.label}</Text>
                <Text style={styles.modalRowDetail}>{l.detail}</Text>
              </Pressable>
            ))}
            <Pressable style={styles.modalCancel} onPress={() => setModal(false)}>
              <Text style={{ color: "#e2e8f0", fontSize: 15 }}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <NavBar variant="dark" active="verbs" />
    </View>
  );
}

const styles = StyleSheet.create({
  // 92 from the top of the content area to the title (mock-up, 390 × 844).
  scroll: { padding: 16, paddingTop: 92, paddingBottom: 110 },
  // "Con" blue as the app's wordmark draws it; size/weight from the app's titles.
  title: { color: "#7FA8EC", fontSize: 28, fontWeight: "800", textAlign: "center", marginBottom: 30 },
  btnRow: { flexDirection: "row", justifyContent: "center", marginBottom: 61 },
  // Same geometry as the old Home button; filled style of Home's Continue button.
  chooseBtn: { paddingVertical: 13, paddingHorizontal: 18, borderRadius: 18, alignItems: "center",
    backgroundColor: "#7FA8EC", borderWidth: 1, borderColor: "#A3BCF4",
    shadowColor: "#7FA0EE", shadowOpacity: 0.35, shadowRadius: 9, shadowOffset: { width: 0, height: 6 },
    elevation: 6 },
  chooseBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  card: { backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 24, padding: 18 },
  reelHead: { flexDirection: "row", marginBottom: 8 },
  reelHeadCell: { flex: 1, flexDirection: "row", alignItems: "center",
    justifyContent: "center", gap: 4 },
  reelHeadFirst: { transform: [{ translateX: -10 }] },
  reelNum: { color: "#7FA8EC", fontSize: 11.5, fontWeight: "700" },
  reelLabel: { color: "#fff", fontSize: 11.5, fontWeight: "600" },
  lock: { fontSize: 11 },
  reelRow: { flexDirection: "row", gap: 8 },
  reelCol: { flex: 1, minWidth: 0 },
  reelCaption: { marginTop: 8, minHeight: 34, color: "#CBD6F5", fontSize: 12,
    lineHeight: 17, textAlign: "center", paddingHorizontal: 4 },
  startBtn: { marginTop: 22, paddingVertical: 13, borderRadius: 12, alignItems: "center" },
  startText: { color: "#fff", fontSize: 15, fontWeight: "700" },
  preview: { marginTop: 18, backgroundColor: "rgba(6,78,59,0.45)", borderWidth: 1,
    borderColor: "rgba(16,185,129,0.35)", borderRadius: 16, padding: 16 },
  previewTitle: { color: "#fff", fontSize: 17, fontWeight: "700",
    textAlign: "center", marginBottom: 6 },
  previewText: { color: "#a7f3d0", fontSize: 14, textAlign: "center", lineHeight: 20 },
  bold: { fontWeight: "700", color: "#fff" },
  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.6)", justifyContent: "center",
    padding: 24 },
  modalCard: { backgroundColor: "#1e1b3a", borderRadius: 18, padding: 18 },
  modalTitle: { color: "#fff", fontSize: 19, fontWeight: "700", textAlign: "center",
    marginBottom: 14 },
  modalRow: { backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 12,
    padding: 12, marginBottom: 8 },
  modalRowTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  modalRowDetail: { color: "#c4b5fd", fontSize: 12, marginTop: 2 },
  modalCancel: { alignItems: "center", padding: 12, marginTop: 4 },
});
