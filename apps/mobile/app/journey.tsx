import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router, useFocusEffect } from "expo-router";
import NavBar from "../components/NavBar";
import { getJourneySummary, JourneySummary } from "../lib/progress";

const LEVELS = ["Beginner", "Novice", "Elementary", "Intermediate"];

export default function Journey() {
  const [s, setS] = useState<JourneySummary | null>(null);

  useFocusEffect(useCallback(() => {
    let on = true;
    getJourneySummary().then((x) => { if (on) setS(x); });
    return () => { on = false; };
  }, []));

  const levelIdx = s?.highestLevelTouched ? LEVELS.indexOf(s.highestLevelTouched) : -1;

  return (
    <View style={{ flex: 1, backgroundColor: "#1B2145" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.h1}>My Journey</Text>
        <Text style={styles.sub}>Votre route vers la fluidité</Text>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>WHERE YOU ARE</Text>
          <View style={styles.pathRow}>
            {LEVELS.map((l, i) => (
              <React.Fragment key={l}>
                <Text style={[styles.pathLabel,
                  i < levelIdx ? styles.pathDone : i === levelIdx ? styles.pathHere : styles.pathTodo]}>
                  {i < levelIdx ? `${l} ✓` : l}
                </Text>
                {i < LEVELS.length - 1 && (
                  <View style={[styles.pathBar, i < levelIdx ? styles.barDone : styles.barTodo]} />
                )}
              </React.Fragment>
            ))}
          </View>
          <Text style={styles.cardText}>
            {levelIdx >= 0
              ? `You're working at ${s!.highestLevelTouched} level. Keep going!`
              : "Take your first quiz and your journey begins here."}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardLabel}>MINI-COURSES{s && s.courses.length ? ` · ${s.overallCoursePct}% OVERALL` : ""}</Text>
          {s && s.courses.length > 0 ? s.courses.map((c) => (
            <View key={c.key} style={{ marginBottom: 8 }}>
              <View style={styles.progRow}>
                <Text style={styles.progLabel}>{c.label}</Text>
                <Text style={[styles.progPct, c.pct >= 100 ? { color: "#17734A" } : c.pct > 0 ? { color: "#2B5FD9" } : { color: "#98A4B8" }]}>{c.pct}%</Text>
              </View>
              <View style={styles.track}><View style={[styles.fill, { width: `${Math.min(100, c.pct)}%` },
                c.pct >= 100 && { backgroundColor: "#17734A" }]} /></View>
            </View>
          )) : (
            <Text style={styles.cardText}>No course units completed yet — start one from the Courses tab.</Text>
          )}
        </View>

        {s?.nextStep && (
          <View style={styles.nextCard}>
            <Text style={styles.nextLabel}>NEXT STEP</Text>
            <Text style={styles.cardText}>Resume {s.nextStep.label} — {s.nextStep.unitName}</Text>
            <Pressable style={styles.nextBtn}
              onPress={() => router.push({ pathname: "/quiz", params: {
                difficulty: s.nextStep!.level, verb: s.nextStep!.verb, timeFrame: s.nextStep!.timeFrame,
                courseKey: s.nextStep!.courseKey, unitIndex: String(s.nextStep!.unitIndex),
              } })}>
              <Text style={styles.nextBtnText}>Continue ▸</Text>
            </Pressable>
          </View>
        )}

        <View style={styles.statsRow}>
          <View style={styles.stat}><Text style={styles.statNum}>{s?.quizzes ?? 0}</Text><Text style={styles.statSub}>quizzes taken</Text></View>
          <View style={styles.stat}><Text style={[styles.statNum, { color: "#17734A" }]}>{s?.avgPct ?? 0}%</Text><Text style={styles.statSub}>avg score</Text></View>
          <View style={styles.stat}><Text style={[styles.statNum, { color: "#EC9A9A" }]}>🔥 {s?.streakDays ?? 0}</Text><Text style={styles.statSub}>day streak</Text></View>
        </View>
      </ScrollView>
      <NavBar variant="dark" active="journey" />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 16, paddingTop: 60, paddingBottom: 110 },
  h1: { color: "#F5F6F8", fontSize: 28, fontWeight: "800" },
  sub: { color: "#B9CBFA", fontSize: 13, marginBottom: 16 },
  card: { backgroundColor: "#F5F6F8", borderRadius: 14, padding: 14, marginBottom: 12 },
  cardLabel: { fontSize: 11, fontWeight: "700", color: "#5A6472", letterSpacing: 0.5, marginBottom: 8 },
  cardText: { fontSize: 13, color: "#3A4354" },
  pathRow: { flexDirection: "row", alignItems: "center", marginBottom: 8, flexWrap: "wrap" },
  pathLabel: { fontSize: 11, fontWeight: "700" },
  pathDone: { color: "#17734A" },
  pathHere: { color: "#2B5FD9" },
  pathTodo: { color: "#98A4B8", fontWeight: "500" },
  pathBar: { flex: 1, height: 4, borderRadius: 2, marginHorizontal: 4, minWidth: 10 },
  barDone: { backgroundColor: "#17734A" },
  barTodo: { backgroundColor: "#DDE3EA" },
  progRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  progLabel: { fontSize: 12, color: "#3A4354" },
  progPct: { fontSize: 12, fontWeight: "700" },
  track: { height: 6, backgroundColor: "#DDE3EA", borderRadius: 3, overflow: "hidden" },
  fill: { height: 6, backgroundColor: "#2B5FD9", borderRadius: 3 },
  nextCard: { backgroundColor: "#EAF0FC", borderWidth: 1, borderColor: "#2B5FD9",
    borderRadius: 14, padding: 14, marginBottom: 12 },
  nextLabel: { fontSize: 11, fontWeight: "700", color: "#2B5FD9", letterSpacing: 0.5, marginBottom: 4 },
  nextBtn: { backgroundColor: "#4A78F2", borderRadius: 10, paddingVertical: 9,
    alignItems: "center", marginTop: 8 },
  nextBtnText: { color: "#FFFFFF", fontSize: 13, fontWeight: "700" },
  statsRow: { flexDirection: "row", gap: 8 },
  stat: { flex: 1, backgroundColor: "#F5F6F8", borderRadius: 12, padding: 10, alignItems: "center" },
  statNum: { fontSize: 18, fontWeight: "800", color: "#3A4354" },
  statSub: { fontSize: 10, color: "#5A6472" },
});
