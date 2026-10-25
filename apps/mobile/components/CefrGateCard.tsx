import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { cefrCoinCost, cefrGateLabel, type CefrGate } from "@shared/cefrCoins";
import { CEFR_TESTS, type CefrId } from "@shared/cefrTests";
import type { CefrResult } from "@shared/cefrScoring";
import { readCefrGate, spendOnCefr } from "../lib/coins";
import { readCefrResults } from "../lib/cefr";
import CoinIcon from "./CoinIcon";

/**
 * The CEFR-style test entry point (1.3), shown at the foot of a level's
 * time-frame list in Mini-Courses, after its Final Level Exams. Same two-tap
 * spend as ExamGateCard (Unlock, then Confirm).
 */
type Props = { testId: CefrId; locked?: boolean };

export default function CefrGateCard({ testId, locked }: Props) {
  const test = CEFR_TESTS[testId];
  const [gate, setGate] = useState<CefrGate | null>(null);
  const [best, setBest] = useState<CefrResult | undefined>();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(() => {
    let on = true;
    readCefrGate(testId).then(({ gate }) => { if (on) setGate(gate); });
    readCefrResults().then((r) => { if (on) setBest(r.find((x) => x.testId === testId)); });
    return () => { on = false; };
  }, [testId]);
  useEffect(refresh, [refresh]);
  useFocusEffect(refresh);

  const cost = cefrCoinCost(testId);
  const start = () => router.push({ pathname: "/cefr-test" as any, params: { testId } });
  const unlock = async () => {
    setBusy(true);
    setGate(await spendOnCefr(testId));
    setBusy(false); setConfirming(false);
  };

  return (
    <View style={s.box}>
      <View style={s.head}>
        <View style={s.badge}><Text style={s.badgeText}>{testId}</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={s.title}>CEFR-style {testId} test</Text>
          <Text style={s.meta}>Listening · Reading · Writing · Speaking · {test.minutes.replace("About ", "~")}</Text>
        </View>
        <View style={s.pro}><Text style={s.proText}>PRO</Text></View>
      </View>
      {best && <Text style={best.passed ? s.passed : s.status}>{best.passed ? `✓ Passed · ${Math.round(best.total)}/100 · ${testId} badge earned` : `Best so far: ${Math.round(best.total)}/100`}</Text>}
      {!gate ? <ActivityIndicator style={{ marginTop: 8 }} /> : (
        <>
          <Text style={s.status}>{cefrGateLabel(gate, test.level)}</Text>
          {locked ? (
            <Pressable style={s.btn} onPress={() => router.push("/paywall" as any)} accessibilityRole="button">
              <Text style={s.btnText}>Requires Conjugately Pro</Text>
            </Pressable>
          ) : gate.kind === "unlocked" ? (
            <Pressable style={s.btn} onPress={start} accessibilityRole="button">
              <Text style={s.btnText}>{best ? "Take the test again →" : "Start the test →"}</Text>
            </Pressable>
          ) : gate.kind === "canUnlock" ? (
            confirming ? (
              <View>
                <Text style={s.status}>Spend {cost} of your {gate.balance} coins? Retakes are free.</Text>
                <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
                  <Pressable style={[s.btn, { flex: 1, marginTop: 0 }]} onPress={unlock} disabled={busy} accessibilityRole="button">
                    <Text style={s.btnText}>{busy ? "…" : <>Confirm — {cost} <CoinIcon size={15} /></>}</Text>
                  </Pressable>
                  <Pressable style={[s.ghost, { flex: 1 }]} onPress={() => setConfirming(false)} accessibilityRole="button">
                    <Text style={s.ghostText}>Not now</Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              <Pressable style={s.btn} onPress={() => setConfirming(true)} accessibilityRole="button">
                <Text style={s.btnText}>Unlock for {cost} <CoinIcon size={15} /></Text>
              </Pressable>
            )
          ) : null}
        </>
      )}
      <Text style={s.small}>A practice test in the format of official {testId} French exams. Not an official certificate.</Text>
    </View>
  );
}

const s = StyleSheet.create({
  box: { borderRadius: 16, padding: 14, marginTop: 14, borderWidth: 1, backgroundColor: "rgba(91,212,143,0.10)", borderColor: "rgba(91,212,143,0.45)" },
  head: { flexDirection: "row", alignItems: "center", gap: 10 },
  badge: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#1B2145", borderWidth: 2, borderColor: "#F5C518", alignItems: "center", justifyContent: "center" },
  badgeText: { color: "#FFFFFF", fontWeight: "800", fontSize: 15 },
  title: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
  meta: { color: "#C3CAD4", fontSize: 12, marginTop: 2 },
  pro: { backgroundColor: "#F5C518", borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  proText: { color: "#1B2145", fontSize: 11, fontWeight: "800" },
  status: { color: "#E6E9EE", fontSize: 14, marginTop: 8 },
  passed: { color: "#5BD48F", fontSize: 14, fontWeight: "700", marginTop: 8 },
  btn: { marginTop: 10, borderRadius: 12, paddingVertical: 12, alignItems: "center", backgroundColor: "#5BD48F" },
  btnText: { color: "#1B2145", fontWeight: "800", fontSize: 16 },
  ghost: { borderRadius: 12, paddingVertical: 12, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.35)" },
  ghostText: { color: "#E6E9EE", fontSize: 15 },
  small: { color: "#A7B0BD", fontSize: 11, marginTop: 10 },
});
