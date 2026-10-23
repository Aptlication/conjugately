import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { examCoinCost, examGateLabel, type ExamGate } from "@shared/coins";
import { getExam } from "@shared/exams";
import { readExamGate, spendOnExam } from "../lib/coins";
import CoinIcon from "./CoinIcon";

/**
 * The Final Level Exam entry point, used after a course quiz and in the
 * Mini-Courses list, so the two can never disagree about whether an exam is
 * open.
 *
 * Spending coins takes two taps (Unlock, then Confirm). An in-component
 * confirm rather than Alert.alert, because the staging twin runs on RN-web
 * where Alert has no buttons.
 */
type Props = {
  level: string;
  timeFrame: string;
  variant?: "light" | "dark";
  /** Called instead of navigating when the parent needs the paywall. */
  locked?: boolean;
  /** Bump to force a re-read, e.g. after coins were just awarded. */
  refreshKey?: number;
  /** Highlight as the next step (end of a tense). */
  celebrate?: boolean;
};

export default function ExamGateCard({ level, timeFrame, variant = "light", locked, refreshKey, celebrate }: Props) {
  const exam = getExam(level, timeFrame);
  const [gate, setGate] = useState<ExamGate | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(() => {
    let on = true;
    readExamGate(level, timeFrame).then(({ gate }) => { if (on) setGate(gate); });
    return () => { on = false; };
  }, [level, timeFrame]);
  useEffect(refresh, [refresh, refreshKey]);
  useFocusEffect(refresh);

  if (!exam) return null;
  const cost = examCoinCost(level);
  const dark = variant === "dark";
  const s = dark ? dk : lt;

  const start = () => router.push({ pathname: "/quiz", params: { examId: exam.id } });
  const unlock = async () => {
    setBusy(true);
    const g = await spendOnExam(level, timeFrame);
    setGate(g); setBusy(false); setConfirming(false);
  };

  const title = gate?.kind === "unlocked" ? "🎓 Final Level Exam"
    : gate?.kind === "canUnlock" ? "🎓 Final Level Exam — ready"
    : "🔒 Final Level Exam";

  return (
    <View style={[s.box, celebrate && s.boxHot]}>
      {celebrate && gate && (
        <Text style={s.kicker}>{timeFrame} tense complete!</Text>
      )}
      <Text style={s.title}>{title}</Text>
      <Text style={s.meta}>{exam.totalQuestions} questions · {exam.passMark} to pass</Text>
      {!gate ? <ActivityIndicator style={{ marginTop: 8 }} /> : (
        <>
          <Text style={s.status}>{examGateLabel(gate)}</Text>

          {locked ? (
            <Pressable style={s.btn} onPress={() => router.push("/paywall" as any)}>
              <Text style={s.btnText}>Requires Conjugately Pro</Text>
            </Pressable>
          ) : gate.kind === "unlocked" ? (
            <Pressable style={s.btn} onPress={start} accessibilityRole="button">
              <Text style={s.btnText}>Start Exam →</Text>
            </Pressable>
          ) : gate.kind === "canUnlock" ? (
            confirming ? (
              <View>
                <Text style={s.status}>Spend {cost} of your {gate.balance} coins? Retakes are free until you pass.</Text>
                <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
                  <Pressable style={[s.btn, { flex: 1, marginTop: 0 }]} onPress={unlock} disabled={busy}>
                    <Text style={s.btnText}>{busy ? "…" : <>Confirm — {cost} <CoinIcon size={15} /></>}</Text>
                  </Pressable>
                  <Pressable style={[s.ghost, { flex: 1 }]} onPress={() => setConfirming(false)}>
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
    </View>
  );
}

const base = {
  box: { borderRadius: 16, padding: 14, marginTop: 10, borderWidth: 1 },
  title: { fontSize: 17, fontWeight: "700" as const },
  meta: { fontSize: 13, marginTop: 2 },
  status: { fontSize: 14, marginTop: 6 },
  kicker: { fontSize: 13, fontWeight: "700" as const, letterSpacing: 1, marginBottom: 4, textTransform: "uppercase" as const },
  btn: { marginTop: 10, borderRadius: 12, paddingVertical: 12, alignItems: "center" as const, backgroundColor: "#F5C518" },
  btnText: { color: "#1B2145", fontWeight: "800" as const, fontSize: 16 },
  ghost: { borderRadius: 12, paddingVertical: 12, alignItems: "center" as const, borderWidth: 1 },
};
const lt = StyleSheet.create({
  ...base,
  box: { ...base.box, backgroundColor: "#FFFBEA", borderColor: "#F0DC8A" },
  boxHot: { borderColor: "#D4A20A", borderWidth: 2 },
  title: { ...base.title, color: "#3A4354" },
  meta: { ...base.meta, color: "#5A6472" },
  status: { ...base.status, color: "#3A4354" },
  kicker: { ...base.kicker, color: "#B8860B" },
  ghost: { ...base.ghost, borderColor: "#C6CCD4" },
  ghostText: { color: "#5A6472", fontSize: 15 },
});
const dk = StyleSheet.create({
  ...base,
  box: { ...base.box, backgroundColor: "rgba(245,197,24,0.10)", borderColor: "rgba(245,197,24,0.35)" },
  boxHot: { borderColor: "#F5C518", borderWidth: 2 },
  title: { ...base.title, color: "#FFFFFF" },
  meta: { ...base.meta, color: "#C3CAD4" },
  status: { ...base.status, color: "#E6E9EE" },
  kicker: { ...base.kicker, color: "#F5C518" },
  ghost: { ...base.ghost, borderColor: "rgba(255,255,255,0.35)" },
  ghostText: { color: "#E6E9EE", fontSize: 15 },
});
