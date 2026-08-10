import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAudioPlayer } from "expo-audio";
import * as Haptics from "expo-haptics";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE } from "../lib/data";

const TENSE_BY_TIMEFRAME: Record<string, string> = {
  Present: "Présent", Past: "Passé Composé", Future: "Futur Simple",
};
const TENSE_PATH: Record<string, string> = {
  "Présent": "present", "Passé Composé": "passe_compose",
  "Futur Simple": "futur_simple", "Imparfait": "imparfait",
};
const PRONOUNS: [string, string, string][] = [
  ["👤", "Je", "I"], ["🫵", "Tu", "You (informal)"], ["🎩", "Vous", "You (formal/plural)"],
  ["👥", "Nous", "We"], ["👬", "Ils", "They (masculine & mixed)"], ["👭", "Elles", "They (feminine)"],
];

type Q = {
  question: string; hint: string; audioIndex?: number;
  answerOptions: { text: string; rationale: string; isCorrect: boolean }[];
};

let manifestCache: any = null;
async function getManifest() {
  if (manifestCache) return manifestCache;
  try {
    const r = await fetch(`${API_BASE}/attached_assets/tts-manifest.json`);
    manifestCache = r.ok ? await r.json() : null;
  } catch { manifestCache = null; }
  return manifestCache;
}
function normalizeText(t: string) {
  return t.trim()
    .replace(/[\u2018\u2019\u0060\u00B4]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\s+/g, " ");
}
function lookupAnswerFile(m: any, text: string, difficulty: string): string | null {
  if (!m) return null;
  const levelMap =
    difficulty === "Novice" ? m.novice_phrases
    : difficulty === "Elementary" ? m.elementary_phrases
    : difficulty === "Intermediate" ? m.intermediate_phrases
    : null;
  const maps = [levelMap, m.phrases].filter(Boolean);
  const norm = normalizeText(text);
  for (const pm of maps) {
    let f = pm[text] || pm[norm];
    if (!f) {
      const k = Object.keys(pm).find((key) => normalizeText(key) === norm);
      if (k) f = pm[k];
    }
    if (f) return f;
  }
  return null;
}

export default function Quiz() {
  const p = useLocalSearchParams<{ difficulty: string; verb: string; timeFrame: string }>();
  const difficulty = String(p.difficulty || "");
  const verb = String(p.verb || "");
  const timeFrame = String(p.timeFrame || "");
  const tense = TENSE_BY_TIMEFRAME[timeFrame] || "Présent";

  const [state, setState] = useState<"loading" | "active" | "done" | "error">("loading");
  const [error, setError] = useState("");
  const [questions, setQuestions] = useState<Q[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [sound, setSound] = useState(true);
  const soundRef = useRef(true);
  useEffect(() => { soundRef.current = sound; }, [sound]);
  const [answerUrl, setAnswerUrl] = useState<string | null>(null);
  const [showTip, setShowTip] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);
  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelAutoAdvance = () => { if (autoAdvanceRef.current) { clearTimeout(autoAdvanceRef.current); autoAdvanceRef.current = null; } };
  const goHome = () => { cancelAutoAdvance(); if (router.canGoBack()) router.back(); else router.replace("/"); };

  const q = questions[idx];
  const questionAudioOn = difficulty === "Beginner" || difficulty === "Novice";
  const questionUrl = q && questionAudioOn
    ? `${API_BASE}/attached_assets/audio/quizzes/${difficulty.toLowerCase()}/${encodeURIComponent(verb)}/${TENSE_PATH[tense]}/questions/Q${q.audioIndex || idx + 1}.mp3`
    : null;
  const qPlayer = useAudioPlayer(questionUrl ? { uri: questionUrl } : null);
  const aPlayer = useAudioPlayer(answerUrl ? { uri: answerUrl } : null);

  const dispIdx = reviewIndex !== null ? reviewIndex : idx;
  const dispQ = questions[dispIdx] || q;
  const dispSelected = reviewIndex !== null ? (answers[dispIdx] ?? null) : selected;
  const dispConfirmed = reviewIndex !== null ? answers[dispIdx] !== undefined : confirmed;
  const score = Object.entries(answers).reduce((n, [qi, ai]) =>
    n + (questions[Number(qi)]?.answerOptions[Number(ai)]?.isCorrect ? 1 : 0), 0);

  const load = async () => {
    setState("loading"); setIdx(0); setSelected(null); setConfirmed(false);
    setAnswers({}); setAnswerUrl(null);
    try {
      const r = await fetch(`${API_BASE}/api/get-quiz`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          verb, timeFrame: timeFrame.toLowerCase(), tenseType: tense,
          ...(difficulty && { difficulty }),
        }),
      });
      const data = await r.json();
      if (data.success) { setQuestions(data.quiz.questions); setState("active"); }
      else { setError(data.error || "Quiz not available"); setState("error"); }
    } catch (e: any) { setError(e.message || "Network error"); setState("error"); }
  };

  useEffect(() => {
    load(); getManifest();
    AsyncStorage.getItem("dontShowInstructionPopup").then((v) => setShowTip(v !== "true"));
    if (difficulty === "Beginner") {
      AsyncStorage.getItem("beginnerPronounGuideShown").then((v) => {
        if (v !== "true") setShowGuide(true);
      });
    }
  }, []);

  useEffect(() => {
    if (state === "active" && questionUrl && sound && !showGuide) {
      const t = setTimeout(() => { try { qPlayer.seekTo(0); qPlayer.play(); } catch {} }, 300);
      return () => clearTimeout(t);
    }
  }, [idx, state, questionUrl, showGuide]);

  useEffect(() => {
    if (answerUrl && soundRef.current) {
      try { aPlayer.seekTo(0); aPlayer.play(); } catch {}
    }
  }, [answerUrl]);

  const speakAnswer = (i: number) => {
    // APPROVED EXCEPTION: 0.5s delay (main uses 1.5s). Pre-recorded manifest only.
    setTimeout(async () => {
      if (!soundRef.current) return;
      const opt = questions[idx]?.answerOptions[i];
      if (!opt) return;
      const m = await getManifest();
      const f = lookupAnswerFile(m, opt.text, difficulty);
      if (f) {
        setAnswerUrl(null);
        setTimeout(() => setAnswerUrl(`${API_BASE}/attached_assets/audio/${f}`), 20);
      }
    }, 500);
  };

  // Main's model: first tap selects+confirms; tapping the SAME answer again advances.
  const handleAnswerSelect = (i: number) => {
    if (reviewIndex !== null) return;
    if (selected === i && confirmed) { nextQuestion(); return; }
    setSelected(i);
    setConfirmed(true);
    setAnswers((prev) => ({ ...prev, [idx]: i }));
    const opt = q.answerOptions[i];
    if (opt?.isCorrect) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    else Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    speakAnswer(i);
    cancelAutoAdvance();
    if (opt?.isCorrect) { autoAdvanceRef.current = setTimeout(() => { nextQuestion(); }, 2500); }
  };

  const nextQuestion = () => {
    cancelAutoAdvance();
    setReviewIndex(null);
    setSelected(null); setConfirmed(false); setAnswerUrl(null);
    if (idx + 1 >= questions.length) setState("done");
    else setIdx(idx + 1);
  };

  const dismissGuide = async () => {
    setShowGuide(false);
    await AsyncStorage.setItem("beginnerPronounGuideShown", "true").catch(() => {});
  };

  return (
    <LinearGradient colors={["#F7F8FA", "#F7F8FA"]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        {state === "loading" && (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#2B5FD9" />
            <Text style={styles.loadingText}>Generating your quiz…</Text>
          </View>
        )}

        {state === "error" && (
          <View style={styles.card}>
            <Text style={styles.qText}>Quiz not available</Text>
            <Text style={styles.feedbackText}>{error}</Text>
            <Pressable style={styles.ghostBtn} onPress={load}><Text style={styles.ghostText}>Try Again</Text></Pressable>
            <Pressable style={styles.ghostBtn} onPress={goHome}><Text style={styles.ghostText}>← Back</Text></Pressable>
          </View>
        )}

        {state === "active" && q && (
          <View style={styles.card}>
            <View style={styles.metaRow}>
              <Text style={styles.meta}>Question {dispIdx + 1} of {questions.length}</Text>
              <Text style={styles.metaScore}>Score: {score} / {questions.length}</Text>
            </View>
            <View style={styles.progressTrack}>
              <LinearGradient colors={["#2B5FD9", "#2B5FD9"]}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={[styles.progressFill, { width: `${((dispIdx + 1) / questions.length) * 100}%` }]} />
            </View>

            {showTip && (
              <View style={styles.tipBox}>
                <Text style={styles.tipTitle}>💡 Quick Tip</Text>
                <Text style={styles.tipText}>Correct answers advance automatically — press Back anytime to review.</Text>
                <View style={styles.tipActions}>
                  <Pressable onPress={() => setShowTip(false)}><Text style={styles.tipLink}>Dismiss</Text></Pressable>
                  <Pressable onPress={() => { setShowTip(false);
                    AsyncStorage.setItem("dontShowInstructionPopup", "true").catch(() => {}); }}>
                    <Text style={styles.tipLink}>Don't remind me again</Text>
                  </Pressable>
                </View>
              </View>
            )}

            <Text style={styles.qText}>{dispQ.question}</Text>

            {dispQ.answerOptions.map((o, i) => {
              const confirmedNow = dispSelected !== null && dispConfirmed;
              const isSel = dispSelected === i && confirmedNow;
              const showCorrect = confirmedNow && o.isCorrect;
              const showWrong = isSel && !o.isCorrect;
              return (
                <Pressable key={i} onPress={() => handleAnswerSelect(i)}
                  style={[styles.opt, showCorrect && styles.optCorrect, showWrong && styles.optWrong]}>
                  <View style={[styles.letter, showCorrect && { borderColor: "#17734A" }, showWrong && { borderColor: "#C0392B" }]}>
                    <Text style={[styles.letterText, showCorrect && { color: "#17734A" }, showWrong && { color: "#C0392B" }]}>
                      {String.fromCharCode(65 + i)}
                    </Text>
                  </View>
                  <Text style={styles.optText}>{o.text}</Text>
                </Pressable>
              );
            })}

            {dispSelected !== null && dispConfirmed && (
              <View style={[styles.feedback,
                dispQ.answerOptions[dispSelected].isCorrect ? styles.feedbackGood : styles.feedbackBad]}>
                <Text style={[styles.feedbackText,
                  { color: dispQ.answerOptions[dispSelected].isCorrect ? "#17734A" : "#C0392B" }]}>
                  {dispQ.answerOptions[dispSelected].isCorrect ? "✓" : "✗"} {dispQ.answerOptions[dispSelected].rationale}
                </Text>
              </View>
            )}

            <View style={styles.bottomRow}>
              <Pressable style={styles.ghostBtn} onPress={goHome}>
                <Text style={styles.ghostText}>Start Over</Text>
              </Pressable>
              <Pressable style={[styles.ghostBtn, ((reviewIndex ?? idx) === 0 || answers[(reviewIndex ?? idx) - 1] === undefined) && { opacity: 0.4 }]}
                onPress={() => { cancelAutoAdvance(); const di = reviewIndex ?? idx; if (di > 0 && answers[di - 1] !== undefined) setReviewIndex(di - 1); }}>
                <Text style={styles.ghostText}>‹ Back</Text>
              </Pressable>
              <Pressable style={[styles.ghostBtn, (reviewIndex === null && !confirmed) && { opacity: 0.4 }]}
                onPress={() => { if (reviewIndex !== null) { const nxt = reviewIndex + 1; if (nxt >= idx) setReviewIndex(null); else setReviewIndex(nxt); } else if (confirmed) { nextQuestion(); } }}>
                <Text style={styles.ghostText}>Next ›</Text>
              </Pressable>
            </View>

            <View style={styles.audioRow}>
              <Pressable onPress={() => setSound((s) => {
                  if (s) { try { qPlayer.pause(); aPlayer.pause(); } catch {} }
                  return !s;
                })}
                style={[styles.togglePill, sound ? styles.toggleOn : styles.toggleOff]}>
                <Text style={{ fontSize: 15 }}>{sound ? "🔊" : "🔇"}</Text>
                <Text style={[styles.toggleText, { color: sound ? "#2B5FD9" : "#5A6472" }]}>
                  {sound ? "ON" : "OFF"}
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {state === "done" && (
          <View style={styles.card}>
            <Text style={styles.resultScore}>{score} / {questions.length}</Text>
            <Text style={styles.resultPct}>{Math.round((score / Math.max(1, questions.length)) * 100)}%</Text>
            <Text style={styles.resultMsg}>
              {score / questions.length >= 0.9 ? "Excellent! Vous êtes formidable! 🌟"
                : score / questions.length >= 0.7 ? "Great work! Keep practicing! 💪"
                : "Good effort — practice makes perfect! 📚"}
            </Text>
            <Pressable style={styles.ghostBtn} onPress={load}><Text style={styles.ghostText}>Try Again</Text></Pressable>
            <Pressable style={styles.ghostBtn} onPress={goHome}><Text style={styles.ghostText}>← Back to Quiz Setup</Text></Pressable>
          </View>
        )}
      </ScrollView>

      <Modal visible={showGuide} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>📚 French Pronouns Guide</Text>
            <Text style={styles.modalSub}>Learn the basic French pronouns before starting your quiz:</Text>
            {PRONOUNS.map(([emoji, fr, en]) => (
              <View key={fr} style={styles.pronounRow}>
                <Text style={{ fontSize: 18 }}>{emoji}</Text>
                <Text style={styles.pronounFr}>{fr}</Text>
                <Text style={styles.pronounEn}>= {en}</Text>
              </View>
            ))}
            <Pressable style={styles.guideBtn} onPress={dismissGuide}>
              <Text style={styles.guideBtnText}>Got it! Start Quiz</Text>
            </Pressable>
            <Pressable onPress={dismissGuide}>
              <Text style={styles.tipLink}>Don't remind me again</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 16, paddingTop: 64, paddingBottom: 48 },
  center: { alignItems: "center", marginTop: 60 },
  loadingText: { color: "#5A6472", marginTop: 14, fontSize: 15 },
  card: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E3E6EA", borderRadius: 24, padding: 18 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    marginBottom: 8 },
  meta: { color: "#5A6472", fontSize: 13 },
  metaScore: { color: "#5A6472", fontSize: 13, fontWeight: "600" },
  progressTrack: { height: 8, backgroundColor: "#E3E6EA", borderRadius: 8,
    overflow: "hidden", marginBottom: 18 },
  progressFill: { height: 8, borderRadius: 8 },
  tipBox: { backgroundColor: "#EAF0FC", borderWidth: 2, borderColor: "#2B5FD9",
    borderRadius: 14, padding: 14, marginBottom: 16 },
  tipTitle: { color: "#3A4354", fontWeight: "700", fontSize: 16 },
  tipText: { color: "#3A4354", fontSize: 14, marginTop: 3 },
  tipActions: { flexDirection: "row", gap: 18, marginTop: 8 },
  tipLink: { color: "#2B5FD9", fontSize: 13, textAlign: "center", paddingTop: 6 },
  qText: { color: "#3A4354", fontSize: 20, fontWeight: "700", marginBottom: 24, lineHeight: 28 },
  opt: { flexDirection: "row", alignItems: "center", borderWidth: 2,
    borderColor: "#C6CCD4", backgroundColor: "#FFFFFF",
    borderRadius: 14, padding: 14, marginBottom: 12 },
  optCorrect: { borderColor: "#17734A", backgroundColor: "rgba(23,115,74,0.08)" },
  optWrong: { borderColor: "#C0392B", backgroundColor: "rgba(192,57,43,0.08)" },
  letter: { width: 30, height: 30, borderRadius: 15, borderWidth: 2,
    borderColor: "#8A93A0", alignItems: "center", justifyContent: "center",
    marginRight: 14 },
  letterText: { color: "#5A6472", fontSize: 13, fontWeight: "700" },
  optText: { color: "#3A4354", fontSize: 16, fontWeight: "500", flex: 1 },
  feedback: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 16 },
  feedbackGood: { borderColor: "#17734A", backgroundColor: "#E7F3EC" },
  feedbackBad: { borderColor: "#C0392B", backgroundColor: "#F9ECEA" },
  feedbackText: { fontSize: 14, lineHeight: 20 },
  bottomRow: { flexDirection: "row", justifyContent: "center", alignItems: "center",
    gap: 14, marginTop: 16 },
  audioRow: { alignItems: "center", marginTop: 2 },
  ghostBtn: { borderWidth: 1, borderColor: "#C6CCD4", borderRadius: 12,
    paddingVertical: 12, paddingHorizontal: 20, alignItems: "center", marginTop: 8 },
  ghostText: { color: "#5A6472", fontSize: 15 },
  togglePill: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1,
    borderRadius: 12, paddingVertical: 11, paddingHorizontal: 14, marginTop: 8 },
  toggleOn: { backgroundColor: "#EAF0FC", borderColor: "#2B5FD9" },
  toggleOff: { backgroundColor: "#F0F2F5", borderColor: "#C6CCD4" },
  toggleText: { fontSize: 13, fontWeight: "700" },
  resultScore: { color: "#3A4354", fontSize: 44, fontWeight: "700", textAlign: "center" },
  resultPct: { color: "#17734A", fontSize: 22, fontWeight: "600", textAlign: "center", marginBottom: 8 },
  resultMsg: { color: "#5A6472", fontSize: 16, textAlign: "center", marginBottom: 10 },
  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", padding: 24 },
  modalCard: { backgroundColor: "#FFFFFF", borderWidth: 1,
    borderColor: "#E3E6EA", borderRadius: 18, padding: 20 },
  modalTitle: { color: "#3A4354", fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 6 },
  modalSub: { color: "#5A6472", fontSize: 14, textAlign: "center", marginBottom: 14 },
  pronounRow: { flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: "#F0F2F5", borderRadius: 10, padding: 10, marginBottom: 6 },
  pronounFr: { color: "#3A4354", fontWeight: "700", fontSize: 15 },
  pronounEn: { color: "#5A6472", fontSize: 14 },
  guideBtn: { backgroundColor: "#17734A", borderRadius: 12, paddingVertical: 13,
    alignItems: "center", marginTop: 10, marginBottom: 6 },
  guideBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
