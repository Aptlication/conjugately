import React, { useRef, useState } from "react";
import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useFonts, DancingScript_600SemiBold } from "@expo-google-fonts/dancing-script";
import { Stack, router } from "expo-router";
import Dial, { DialHandle, DialOption } from "../components/Dial";
import { DIFFICULTY_CONFIGS, LEVELS, TIME_FRAMES, VERB_MEANINGS } from "../lib/data";

export default function Home() {
  const [fontsLoaded] = useFonts({ DancingScript_600SemiBold });
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
    value: l.key, label: l.label, detail: l.detail, disabled: (l as any).disabled,
  }));
  const verbs = difficulty ? DIFFICULTY_CONFIGS[difficulty]?.verbs ?? [] : [];
  const verbOptions: DialOption[] = [
    { value: "", label: difficulty ? "Select a verb..." : "Choose difficulty first..." },
    ...verbs.map((v) => ({ value: v, label: `${v} (${VERB_MEANINGS[v] ?? ""})` })),
  ];
  const timeOptions: DialOption[] = [
    { value: "", label: "Select time frame..." },
    ...TIME_FRAMES.map((t) => ({ value: t, label: t })),
  ];

  const ready = difficulty && verb && timeFrame;

  const chooseAll = (levelKey: string) => {
    setModal(false);
    setSpinning(true);
    setDifficulty(levelKey);
    setVerb(""); setTimeFrame("");
    const cfg = DIFFICULTY_CONFIGS[levelKey];
    const v = cfg.verbs[Math.floor(Math.random() * cfg.verbs.length)];
    const tf = TIME_FRAMES[Math.floor(Math.random() * TIME_FRAMES.length)];
    const li = levelOptions.findIndex((o) => o.value === levelKey);
    d1.current?.spinTo(li, 50);
    setTimeout(() => {
      const vi = cfg.verbs.indexOf(v) + 1;
      d2.current?.spinTo(vi, 0, () => setVerb(v));
      d3.current?.spinTo(TIME_FRAMES.indexOf(tf) + 1, 350, () => {
        setTimeFrame(tf); setSpinning(false);
      });
    }, 500);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#1B2145" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.h1}>
          <Text style={{ color: "#7FA8EC" }}>Con</Text>
          <Text style={{ color: "#EC9A9A" }}>j</Text>
          <Text style={{ color: "#F5F6F8" }}>ugat</Text>
          <Text style={{ color: "#EC9A9A" }}>ely</Text>
        </Text>
        <Text style={styles.cursive}>French tout de suite!</Text>
        <Text style={styles.blurb}>
          Master French verb conjugations—the key to fluency—with your own
          personalized quizzes and optional mini-courses.
        </Text>

        <View style={styles.btnRow}>
          <FlatBtn bg="#4A78F2" label="🎲 Choose All for Me"
            onPress={() => !spinning && setModal(true)} />
          <FlatBtn bg="#2C4194" border="#5B77D6" label="📚 Mini-Courses"
            onPress={() => router.push("/mini-courses")} />
          <FlatBtn bg="#2C4194" border="#5B77D6" label="📖 Vocabulary"
            onPress={() => router.push("/vocabulary")} />
        </View>

        <View style={styles.card}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>1. Choose Difficulty</Text>
            <Pressable onPress={() => setLocked(!locked)} hitSlop={8}>
              <Text style={{ fontSize: 16 }}>{locked ? "🔒" : "🔓"}</Text>
            </Pressable>
          </View>
          <Dial ref={d1} options={levelOptions} disabled={locked}
            onSettle={(v) => { if (v !== difficulty) { setDifficulty(v); setVerb(""); } }} />

          <Text style={[styles.label, styles.gap]}>2. Choose a French Verb</Text>
          <Dial ref={d2} options={verbOptions} disabled={!difficulty}
            onSettle={(v) => setVerb(v)} />

          <Text style={[styles.label, styles.gap]}>3. Choose Time Frame</Text>
          <Dial ref={d3} options={timeOptions} disabled={!difficulty}
            onSettle={(v) => setTimeFrame(v)} />

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
    </View>
  );
}

function FlatBtn({ bg, border, label, onPress }: any) {
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.gradBtn, { backgroundColor: bg }, border && { borderWidth: 1, borderColor: border }]}>
        <Text style={styles.gradBtnText}>{label}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 16, paddingTop: 64, paddingBottom: 48 },
  h1: { fontSize: 40, fontWeight: "700", textAlign: "center", marginBottom: 8 },
  cursive: { color: "#FFFFFF", fontSize: 26, fontFamily: "DancingScript_600SemiBold",
    textAlign: "center", marginBottom: 20 },
  blurb: { color: "#CBD6F5", fontSize: 16, textAlign: "center", marginBottom: 20,
    lineHeight: 25 },
  btnRow: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: 24 },
  gradBtn: { paddingVertical: 13, paddingHorizontal: 18, borderRadius: 18, alignItems: "center" },
  gradBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  card: { backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 24, padding: 18 },
  labelRow: { flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", marginBottom: 10 },
  label: { color: "#fff", fontSize: 17, fontWeight: "600" },
  gap: { marginTop: 20, marginBottom: 10 },
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
