import React, { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router, useFocusEffect } from "expo-router";
import NavBar from "../components/NavBar";
import { ADVANCED_THEMES } from "@shared/advanced/content";
import { readAdvancedProgress, type UnitResult } from "../lib/advanced";
import { purchasesAvailable, usePro } from "../lib/pro";

/**
 * Advanced A (pilot, 1 Nov 2026). Reading-led units, Pro only, marked Beta.
 * Theme 1 « La vie quotidienne » is the pilot; the rest of Advanced A's themes
 * are listed as coming next, so testers see where the course is heading.
 */

const COMING = [
  "Le monde du travail", "À table ! Gastronomie et art de vivre", "L'histoire de France",
  "Régions et Francophonie",
];

export default function Advanced() {
  const { isPro, loading } = usePro();
  // The web build (staging) has no store, so it always opens.
  const locked = !loading && !isPro && purchasesAvailable();
  const [prog, setProg] = useState<Record<string, UnitResult>>({});
  useFocusEffect(useCallback(() => {
    let on = true;
    readAdvancedProgress().then((p) => { if (on) setProg(p); });
    return () => { on = false; };
  }, []));

  return (
    <View style={{ flex: 1, backgroundColor: "#1B2145" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.titleRow}>
          <Text style={styles.h1}>🟣 Advanced A</Text>
          <View style={styles.beta}><Text style={styles.betaText}>BETA</Text></View>
        </View>
        <Text style={styles.lead}>
          Read a short article, learn its new words, then talk about it with Cécile. Answer aloud, in at least two sentences.
        </Text>

        {ADVANCED_THEMES.map((t) => {
          const done = t.units.filter((u) => prog[u.id]).length;
          const nextIdx = t.units.findIndex((u) => !prog[u.id]);
          return (
            <View key={t.id} style={styles.card}>
              <Text style={styles.theme}>Theme {t.id} · {t.title}</Text>
              <Text style={styles.themeSub}>{t.titleEn} · {done} of {t.units.length} articles</Text>
              {t.units.map((u, i) => {
                const r = prog[u.id];
                const isNext = i === nextIdx && done > 0;
                return (
                  <Pressable key={u.id} style={[styles.row, r && styles.rowDone, isNext && styles.rowNext]}
                    accessibilityRole="button" accessibilityHint={locked ? "Requires Pluri Pro" : undefined}
                    onPress={() => locked ? router.push("/paywall" as any)
                      : router.push({ pathname: "/advanced-unit" as any, params: { unit: u.id } })}>
                    <Text style={[styles.rowTitle, r && styles.rowTitleDone]}>
                      {locked ? "🔒 " : r ? "✓ " : ""}{u.id} · {u.title}
                    </Text>
                    <Text style={[styles.rowSub, isNext && styles.rowSubNext]}>
                      {r ? `Completed · best ${r.coins} coins` : isNext ? `▸ Up next · ${u.titleEn}` : u.titleEn}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          );
        })}

        <View style={[styles.card, { opacity: 0.55 }]}>
          <Text style={styles.theme}>Coming next</Text>
          {COMING.map((c, i) => <Text key={c} style={styles.rowSub}>Theme {i + 2} · {c}</Text>)}
        </View>

        <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}>
          <Text style={styles.back}>← Back</Text>
        </Pressable>
      </ScrollView>
      <NavBar variant="dark" active="courses" />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 16, paddingTop: 64, paddingBottom: 120 },
  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 8 },
  h1: { color: "#fff", fontSize: 28, fontWeight: "700", textAlign: "center" },
  beta: { backgroundColor: "#F5C518", borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 },
  betaText: { color: "#1B2145", fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  lead: { color: "#cbd5e1", fontSize: 15, textAlign: "center", lineHeight: 21, marginBottom: 16, paddingHorizontal: 8 },
  card: { backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 24, padding: 18, marginBottom: 16 },
  theme: { color: "#fff", fontSize: 18, fontWeight: "800" },
  themeSub: { color: "#9DB4F5", fontSize: 13, marginTop: 2, marginBottom: 12 },
  row: { backgroundColor: "rgba(255,255,255,0.08)", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 14, padding: 14, marginBottom: 10 },
  rowDone: { opacity: 0.6 },
  rowNext: { borderColor: "#4A78F2", borderWidth: 2 },
  rowTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  rowTitleDone: { color: "#5BD48F" },
  rowSub: { color: "#cbd5e1", fontSize: 13, marginTop: 3 },
  rowSubNext: { color: "#9DB4F5" },
  back: { color: "#c4b5fd", fontSize: 15, textAlign: "center", padding: 10 },
});
