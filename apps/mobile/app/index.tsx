import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import Dial, { DialHandle } from "../components/Dial";
import { LEVELS, TENSES, VERBS } from "../lib/data";

export default function Select() {
  const levelRef = useRef<DialHandle>(null);
  const tenseRef = useRef<DialHandle>(null);
  const verbRef = useRef<DialHandle>(null);
  const [spinning, setSpinning] = useState(false);
  const [picked, setPicked] = useState<string | null>(null);

  const chooseForMe = () => {
    if (spinning) return;
    setSpinning(true);
    setPicked(null);
    const li = Math.floor(Math.random() * LEVELS.length);
    const ti = Math.floor(Math.random() * TENSES.length);
    const vi = Math.floor(Math.random() * VERBS.length);
    levelRef.current?.spinTo(li, 0);
    tenseRef.current?.spinTo(ti, 350);
    verbRef.current?.spinTo(vi, 700, () => {
      setSpinning(false);
      setPicked(`${LEVELS[li]} · ${TENSES[ti]} · ${VERBS[vi]}`);
    });
  };

  const startQuiz = () => {
    const sel = `${LEVELS[levelRef.current?.currentIndex() ?? 0]} · ${
      TENSES[tenseRef.current?.currentIndex() ?? 0]} · ${
      VERBS[verbRef.current?.currentIndex() ?? 0]}`;
    setPicked(sel); // TODO: navigate to quiz screen with selection
  };

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: "Conjugately" }} />
      <Text style={styles.h1}>Set your quiz</Text>
      <View style={styles.dials}>
        <Dial ref={levelRef} label="Level" items={LEVELS} />
        <Dial ref={tenseRef} label="Tense" items={TENSES} />
        <Dial ref={verbRef} label="Verb" items={VERBS} />
      </View>
      <Pressable onPress={chooseForMe} disabled={spinning}
        style={({ pressed }) => [styles.btn, styles.btnGhost,
          (pressed || spinning) && styles.pressed]}>
        <Text style={styles.btnGhostText}>
          {spinning ? "Spinning…" : "🎰  Choose for me"}
        </Text>
      </Pressable>
      <Pressable onPress={startQuiz} disabled={spinning}
        style={({ pressed }) => [styles.btn, pressed && styles.pressed]}>
        <Text style={styles.btnText}>Start Quiz</Text>
      </Pressable>
      {picked && <Text style={styles.picked}>{picked}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#1e1b4b", padding: 24,
    paddingTop: 32 },
  h1: { color: "#f5f3ff", fontSize: 26, fontWeight: "700",
    textAlign: "center", marginBottom: 28 },
  dials: { flexDirection: "row", gap: 10, marginBottom: 36 },
  btn: { backgroundColor: "#8b5cf6", borderRadius: 14, paddingVertical: 15,
    alignItems: "center", marginBottom: 12 },
  btnGhost: { backgroundColor: "transparent", borderWidth: 1.5,
    borderColor: "#8b5cf6" },
  btnText: { color: "#fff", fontSize: 17, fontWeight: "700" },
  btnGhostText: { color: "#c4b5fd", fontSize: 17, fontWeight: "600" },
  pressed: { opacity: 0.6 },
  picked: { color: "#fde047", textAlign: "center", fontSize: 15,
    marginTop: 8 },
});