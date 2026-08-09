import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAudioPlayer } from "expo-audio";
import * as Haptics from "expo-haptics";
import { API_BASE } from "../lib/data";

const TENSE_BY_TIMEFRAME: Record<string, string> = {
  Present: "Présent", Past: "Passé Composé", Future: "Futur Simple",
};
const TENSE_PATH: Record<string, string> = {
  "Présent": "present", "Passé Composé": "passe_compose",
  "Futur Simple": "futur_simple", "Imparfait": "imparfait",
};

type Q = {
  question: string;
  hint: string;
  audioIndex?: number;
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
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [sound, setSound] = useState(true);
  const soundRef = useRef(true);
  useEffect(() => { soundRef.current = sound; }, [sound]);
  const [answerUrl, setAnswerUrl] = useState<string | null>(null);

  const q = questions[idx];
  const questionAudioOn = difficulty === "Beginner" || difficulty === "Novice";
  const questionUrl = q && questionAudioOn
    ? `${API_BASE}/attached_assets/audio/quizzes/${difficulty.toLowerCase()}/${encodeURIComponent(verb)}/${TENSE_PATH[tense]}/questions/Q${q.audioIndex || idx + 1}.mp3`
    : null;
  const qPlayer = useAudioPlayer(questionUrl ? { uri: questionUrl } : null);
  const aPlayer = useAudioPlayer(answerUrl ? { uri: answerUrl } : null);

  const load = async () => {
    setState("loading"); setIdx(0); setScore(0); setChosen(null); setShowHint(false); setAnswerUrl(null);
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

  useEffect(() => { load(); getManifest(); }, []);

  useEffect(() => {
    if (state === "active" && questionUrl && sound) {
      const t = setTimeout(() => { try { qPlayer.seekTo(0); qPlayer.play(); } catch {} }, 300);
      return () => clearTimeout(t);
    }
  }, [idx, state, questionUrl]);

  useEffect(() => {
    if (answerUrl && soundRef.current) {
      try { aPlayer.seekTo(0); aPlayer.play(); } catch {}
    }
  }, [answerUrl]);

  const toggleSound = () => {
    setSound((s) => {
      if (s) { try { qPlayer.pause(); aPlayer.pause(); } catch {} }
      return !s;
    });
  };

  const pick = (i: number) => {
    if (chosen !== null) return;
    setChosen(i);
    const opt = q.answerOptions[i];
    if (opt?.isCorrect) { setScore((s) => s + 1); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); }
    else Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    // Site behavior: speak the SELECTED French answer 1.5s after confirmation,
    // only if that exact phrase exists in the pre-recorded manifest.
    setTimeout(async () => {
      if (!soundRef.current || !opt) return;
      const m = await getManifest();
      const f = lookupAnswerFile(m, opt.text, difficulty);
      if (f) {
        setAnswerUrl(null);
        setTimeout(() => setAnswerUrl(`${API_BASE}/attached_assets/audio/${f}`), 20);
      }
    }, 1500);
  };

  const next = () => {
    setChosen(null); setShowHint(false); setAnswerUrl(null);
    if (idx + 1 >= questions.length) setState("done");
    else setIdx(idx + 1);
  };

  return (
    <LinearGradient colors={["#0f172a", "#581c87", "#0f172a"]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.h1}>{verb} Quiz</Text>
        <Text style={styles.sub}>{difficulty} · {tense}</Text>

        {state === "loading" && (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#c4b5fd" />
            <Text style={styles.loadingText}>Generating your quiz…</Text>
          </View>
        )}

        {state === "error" && (
          <View style={styles.card}>
            <Text style={styles.qText}>Quiz not available</Text>
            <Text style={styles.rationale}>{error}</Text>
            <Btn label="Try Again" onPress={load} />
            <Btn label="← Back" ghost onPress={() => router.back()} />
          </View>
        )}

        {state === "active" && q && (
          <View style={styles.card}>
            <View style={styles.metaRow}>
              <Text style={styles.meta}>Question {idx + 1} of {questions.length}</Text>
              <Text style={styles.meta}>Score: {score}</Text>
            </View>
            <Text style={styles.qText}>{q.question}</Text>
            {questionAudioOn && sound && (
              <Pressable onPress={() => { try { qPlayer.seekTo(0); qPlayer.play(); } catch {} }}>
                <Text style={styles.audioBtn}>🔊 Play audio</Text>
              </Pressable>
            )}
            {chosen === null && (
              <Pressable onPress={() => setShowHint(!showHint)}>
                <Text style={styles.hintToggle}>{showHint ? q.hint : "💡 Show hint"}</Text>
              </Pressable>
            )}
            {q.answerOptions.map((o, i) => {
              const isChosen = chosen === i;
              const revealed = chosen !== null;
              const bg = revealed && o.isCorrect ? "rgba(34,197,94,0.25)"
                : isChosen ? "rgba(239,68,68,0.25)" : "rgba(255,255,255,0.08)";
              const border = revealed && o.isCorrect ? "#22c55e"
                : isChosen ? "#ef4444" : "rgba(255,255,255,0.2)";
              return (
                <Pressable key={i} onPress={() => pick(i)}
                  style={[styles.opt, { backgroundColor: bg, borderColor: border }]}>
                  <Text style={styles.optText}>{o.text}</Text>
                  {revealed && (isChosen || o.isCorrect) && !!o.rationale && (
                    <Text style={styles.rationale}>{o.rationale}</Text>
                  )}
                </Pressable>
              );
            })}
            {chosen !== null && (
              <Btn label={idx + 1 >= questions.length ? "See Results →" : "Next Question →"} onPress={next} />
            )}
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
            <Btn label="Try Again" onPress={load} />
            <Btn label="← Back to Quiz Setup" ghost onPress={() => router.back()} />
          </View>
        )}
        <View style={{ height: 80 }} />
      </ScrollView>

      <View style={styles.soundBar} pointerEvents="box-none">
        <Pressable onPress={toggleSound} style={styles.soundBtn}>
          <Text style={{ fontSize: 20 }}>{sound ? "🔊" : "🔇"}</Text>
          <Text style={styles.soundLabel}>{sound ? "Sound on" : "Sound off"}</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

function Btn({ label, onPress, ghost }: any) {
  return (
    <Pressable onPress={onPress} style={{ marginTop: 12 }}>
      <LinearGradient colors={ghost ? ["transparent", "transparent"] : ["#22c55e", "#3b82f6"]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
        style={[styles.btn, ghost && styles.btnGhost]}>
        <Text style={[styles.btnText, ghost && { color: "#c4b5fd" }]}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 16, paddingTop: 64, paddingBottom: 48 },
  h1: { color: "#fff", fontSize: 30, fontWeight: "700", textAlign: "center" },
  sub: { color: "#d8b4fe", fontSize: 15, textAlign: "center", marginBottom: 20 },
  center: { alignItems: "center", marginTop: 60 },
  loadingText: { color: "#cbd5e1", marginTop: 14, fontSize: 15 },
  card: { backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 24, padding: 18 },
  metaRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
  meta: { color: "#c4b5fd", fontSize: 13, fontWeight: "600" },
  qText: { color: "#fff", fontSize: 20, fontWeight: "600", marginBottom: 10, lineHeight: 28 },
  audioBtn: { color: "#93c5fd", fontSize: 15, marginBottom: 8 },
  hintToggle: { color: "#fde047", fontSize: 14, marginBottom: 10 },
  opt: { borderWidth: 1.5, borderRadius: 12, padding: 14, marginBottom: 10 },
  optText: { color: "#fff", fontSize: 17, fontWeight: "500" },
  rationale: { color: "#cbd5e1", fontSize: 13, marginTop: 6, lineHeight: 18 },
  btn: { paddingVertical: 13, borderRadius: 12, alignItems: "center" },
  btnGhost: { borderWidth: 1.5, borderColor: "#8b5cf6" },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  resultScore: { color: "#fff", fontSize: 44, fontWeight: "700", textAlign: "center" },
  resultPct: { color: "#4ade80", fontSize: 22, fontWeight: "600", textAlign: "center", marginBottom: 8 },
  resultMsg: { color: "#e9d5ff", fontSize: 16, textAlign: "center", marginBottom: 10 },
  soundBar: { position: "absolute", bottom: 24, left: 0, right: 0, alignItems: "center" },
  soundBtn: { flexDirection: "row", alignItems: "center", gap: 8,
    backgroundColor: "rgba(30,27,75,0.85)", borderWidth: 1,
    borderColor: "rgba(196,181,253,0.4)", borderRadius: 24,
    paddingVertical: 10, paddingHorizontal: 18 },
  soundLabel: { color: "#e9d5ff", fontSize: 14, fontWeight: "600" },
});
