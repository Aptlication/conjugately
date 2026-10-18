import NavBar from "../components/NavBar";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "conjugately_vocabulary";
type Word = {
  id: string; french: string; english: string; verb?: string; tense?: string;
  difficulty?: string; status: "new" | "learning" | "mastered";
  timesCorrect: number; timesIncorrect: number; createdAt: string; source?: string;
};
const VERB_LABEL: Record<string, string> = { besoin: "avoir besoin de" };
/** Words are grouped by the unit they came from: level · verb · tense. */
function unitOf(w: Word): string {
  if (!w.difficulty && !w.verb) return "Other words";
  return [w.difficulty, w.verb ? (VERB_LABEL[w.verb] ?? w.verb) : undefined, w.tense].filter(Boolean).join(" · ");
}
const NEXT_STATUS: Record<Word["status"], Word["status"]> =
  { new: "learning", learning: "mastered", mastered: "new" };
const STATUS_COLOR: Record<Word["status"], string> =
  { new: "#93c5fd", learning: "#fde047", mastered: "#4ade80" };

export default function Vocabulary() {
  const [words, setWords] = useState<Word[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      try { setWords(raw ? JSON.parse(raw) : []); } catch { setWords([]); }
      setLoaded(true);
    });
  }, []);
  useEffect(() => {
    if (loaded) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(words)).catch(() => {});
  }, [words, loaded]);

  const stats = {
    total: words.length,
    new: words.filter((w) => w.status === "new").length,
    learning: words.filter((w) => w.status === "learning").length,
    mastered: words.filter((w) => w.status === "mastered").length,
  };

  return (
    <LinearGradient colors={["#1B2145", "#1B2145"]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.h1}>📖 Vocabulary</Text>
        <View style={styles.statsRow}>
          {[["Total", stats.total], ["New", stats.new], ["Learning", stats.learning], ["Mastered", stats.mastered]]
            .map(([label, n]) => (
            <View key={String(label)} style={styles.stat}>
              <Text style={styles.statNum}>{n}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {words.length === 0 && (
          <View style={styles.card}>
            <Text style={styles.empty}>
              No vocabulary words yet. Miss a question in any quiz, or finish a
              Final conversation, and the words are saved here for review.
            </Text>
          </View>
        )}

        {(() => {
          const groups: { unit: string; list: Word[] }[] = [];
          for (const w of words) {
            const u = unitOf(w);
            const g = groups.find((x) => x.unit === u);
            if (g) g.list.push(w); else groups.push({ unit: u, list: [w] });
          }
          return groups;
        })().map(({ unit, list }) => (
          <View key={unit}>
            <Text style={styles.unitHead}>{unit}</Text>
            {list.map((w) => (
          <View key={w.id} style={styles.wordCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.french}>{w.french}</Text>
              <Text style={styles.english}>{w.english}</Text>
            </View>
            <Pressable style={[styles.status, { borderColor: STATUS_COLOR[w.status] }]}
              onPress={() => setWords((ws) => ws.map((x) => x.id === w.id
                ? { ...x, status: NEXT_STATUS[x.status] } : x))}>
              <Text style={[styles.statusText, { color: STATUS_COLOR[w.status] }]}>{w.status}</Text>
            </Pressable>
            <Pressable onPress={() => setWords((ws) => ws.filter((x) => x.id !== w.id))}>
              <Text style={styles.delete}>✕</Text>
            </Pressable>
          </View>
            ))}
          </View>
        ))}

        <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}><Text style={styles.back}>← Home</Text></Pressable>
      </ScrollView>
      <NavBar variant="dark" active="vocab" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 16, paddingTop: 64, paddingBottom: 48 },
  h1: { color: "#fff", fontSize: 28, fontWeight: "700", textAlign: "center", marginBottom: 16 },
  statsRow: { flexDirection: "row", gap: 8, marginBottom: 16 },
  stat: { flex: 1, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 14,
    padding: 10, alignItems: "center" },
  statNum: { color: "#fff", fontSize: 20, fontWeight: "700" },
  statLabel: { color: "#c4b5fd", fontSize: 12 },
  card: { backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 24, padding: 18 },
  empty: { color: "#cbd5e1", fontSize: 15, textAlign: "center", lineHeight: 22 },
  unitHead: { color: "#c4b5fd", fontSize: 13, fontWeight: "800", letterSpacing: 0.5,
    marginTop: 10, marginBottom: 8, marginLeft: 4 },
  wordCard: { flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 14, marginBottom: 10 },
  french: { color: "#fff", fontSize: 16, fontWeight: "600" },
  english: { color: "#cbd5e1", fontSize: 13, marginTop: 2 },
  status: { borderWidth: 1.5, borderRadius: 10, paddingVertical: 4, paddingHorizontal: 10 },
  statusText: { fontSize: 12, fontWeight: "700" },
  delete: { color: "#f87171", fontSize: 18, paddingHorizontal: 6 },
  back: { color: "#c4b5fd", fontSize: 15, textAlign: "center", padding: 10, marginTop: 8 },
});
