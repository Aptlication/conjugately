import NavBar from "../components/NavBar";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router, useFocusEffect } from "expo-router";
import { CEFR_IDS } from "@shared/cefrTests";
import { coinBalance } from "@shared/coins";
import { onCoinsChanged, readCoins } from "../lib/coins";
import { usePro } from "../lib/pro";
import CefrGateCard from "../components/CefrGateCard";
import CoinIcon from "../components/CoinIcon";

/**
 * CEFR Exams (1.3.10): every CEFR-style test in one place, reached from
 * Mini-Courses, the end-of-level invitation and the My Journey badges.
 * Pro + coins is the only gate — no need to finish the course first.
 */
export default function CefrExams() {
  const { isPro } = usePro();
  const [balance, setBalance] = useState<number | null>(null);
  // Live: a coin spend on this screen (exam or CEFR unlock) updates the balance at once.
  useEffect(() => onCoinsChanged((c) => setBalance(coinBalance(c))), []);
  useFocusEffect(useCallback(() => {
    let on = true;
    readCoins().then((c) => { if (on) setBalance(coinBalance(c)); });
    return () => { on = false; };
  }, []));

  return (
    <View style={s.screen}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={s.scroll}>
        <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace("/mini-courses" as any))} accessibilityRole="button">
          <Text style={s.back}>← Back</Text>
        </Pressable>
        <Text style={s.h1}>CEFR Exams</Text>
        <Text style={s.intro}>
          Find out your level on the European scale. Try any test whenever you like — you don't need to finish the course first.
        </Text>
        <View style={s.strip}>
          <Text style={s.stripText}>Pay once · yours to keep · retakes free</Text>
          {balance !== null && (
            <Text style={s.coins} accessibilityLabel={`${balance} coins`}><CoinIcon size={15} /> {balance}</Text>
          )}
        </View>

        {CEFR_IDS.map((id) => <CefrGateCard key={id} testId={id} locked={!isPro} />)}

        <View style={s.soon}>
          <Text style={s.soonText}>B2 — coming with the Advanced course</Text>
        </View>

        {!isPro && (
          <View style={s.pro}>
            <Text style={s.proTitle}>CEFR Exams are part of Pluri Pro</Text>
            <Text style={s.proBody}>With Pro, unlock any test with the coins you earn in lessons.</Text>
            <Pressable style={s.proBtn} onPress={() => router.push("/paywall" as any)} accessibilityRole="button">
              <Text style={s.proBtnText}>See Pluri Pro</Text>
            </Pressable>
          </View>
        )}

        <Text style={s.small}>CEFR-style practice tests by Pluri French, in the format of official French exams. Not an official DELF certificate.</Text>
      </ScrollView>
      <NavBar variant="dark" active="courses" />
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#1B2145" },
  scroll: { padding: 16, paddingTop: 64, paddingBottom: 120 },
  back: { color: "#c4b5fd", fontSize: 15, paddingVertical: 6 },
  h1: { color: "#FFFFFF", fontSize: 28, fontWeight: "700", marginTop: 6 },
  intro: { color: "#C3CAD4", fontSize: 15, lineHeight: 21, marginTop: 6 },
  strip: {
    marginTop: 14, flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,0.06)", borderRadius: 12, paddingVertical: 10, paddingHorizontal: 12,
  },
  stripText: { color: "#C3CAD4", fontSize: 13, flex: 1 },
  coins: { color: "#F5C518", fontSize: 15, fontWeight: "700" },
  soon: {
    marginTop: 14, borderRadius: 16, borderWidth: 1, borderStyle: "dashed", borderColor: "rgba(255,255,255,0.3)",
    padding: 14,
  },
  soonText: { color: "#A7B0BD", fontSize: 14 },
  pro: { marginTop: 14, borderRadius: 18, padding: 16, backgroundColor: "rgba(245,197,24,0.10)", borderWidth: 1, borderColor: "rgba(245,197,24,0.5)" },
  proTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
  proBody: { color: "#E6E9EE", fontSize: 14, lineHeight: 20, marginTop: 6 },
  proBtn: { marginTop: 12, borderRadius: 12, paddingVertical: 13, alignItems: "center", backgroundColor: "#F5C518" },
  proBtnText: { color: "#1B2145", fontWeight: "800", fontSize: 16 },
  small: { color: "#A7B0BD", fontSize: 11, lineHeight: 16, textAlign: "center", marginTop: 16 },
});
