import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import Dial, { DialHandle } from "@/components/Dial";
import { LEVELS, TENSES, VERBS } from "@/lib/data";

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

import * as Device from 'expo-device';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Welcome to&nbsp;Expo
          </ThemedText>
        </ThemedView>

        <ThemedText type="code" style={styles.code}>
          get started
        </ThemedText>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <HintRow
            title="Try editing"
            hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
          />
          <HintRow title="Dev tools" hint={getDevMenuHint()} />
          <HintRow
            title="Fresh start"
            hint={<ThemedText type="code">npm run reset-project</ThemedText>}
          />
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
