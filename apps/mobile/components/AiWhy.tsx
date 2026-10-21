import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import {
  askFollowup, fetchWhy, getTutor, saveTutor, splitOptions, whyAudioUrl,
  MAX_FOLLOWUPS, TUTOR_NAMES, type FollowUp, type Tutor, type WhyRequest, type WhyResult,
} from "../lib/aiWhy";

const BLUE = "#2B5FD9";
const GREEN = "#17734A";
const INK = "#3A4354";
const MUTED = "#5A6472";

/** The AI WHY button. Sits inside the quiz's feedback box. */
export function AiWhyButton({ locked, onPress }: { locked: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button"
      accessibilityLabel={locked ? "AI WHY, a Pro feature: explain every option" : "AI WHY: explain every option"}
      style={({ pressed }) => [styles.whyBtn, pressed && { opacity: 0.75 }]}>
      <Ionicons name="sparkles-outline" size={17} color={BLUE} />
      <Text style={styles.whyBtnText}>AI WHY</Text>
      {locked && <View style={styles.proPill}><Text style={styles.proPillText}>PRO</Text></View>}
    </Pressable>
  );
}

/**
 * The explanation, opened by AI WHY: text first, Listen on request in the
 * learner's chosen tutor's voice, and up to three follow-up questions.
 */
export function AiWhyPanel({ request, onBeforeListen, dark }: {
  request: WhyRequest;
  /** Pause the quiz's own audio before the tutor speaks. */
  onBeforeListen?: () => void;
  /** Mic On screen: lighter border against the navy. */
  dark?: boolean;
}) {
  const [result, setResult] = useState<WhyResult | null>(null);
  const [error, setError] = useState("");
  const [tutor, setTutor] = useState<Tutor>("cecile");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioError, setAudioError] = useState("");
  const [history, setHistory] = useState<FollowUp[]>([]);
  const [draft, setDraft] = useState("");
  const [asking, setAsking] = useState(false);
  const [askError, setAskError] = useState("");
  const wantPlay = useRef(false);

  const player = useAudioPlayer(audioUrl ? { uri: audioUrl } : null);
  const status = useAudioPlayerStatus(player);
  const playing = !!status?.playing;
  const loadingAudio = wantPlay.current && !playing && !status?.didJustFinish && !audioError;

  const load = () => {
    setError(""); setResult(null);
    fetchWhy(request).then(setResult).catch((e) => setError(e.message));
  };
  useEffect(() => { load(); getTutor().then(setTutor); }, []);

  useEffect(() => {
    if (!audioUrl || !wantPlay.current) return;
    try { player.seekTo(0); player.play(); } catch { setAudioError("Audio unavailable right now."); }
  }, [audioUrl]);
  useEffect(() => {
    if (status?.didJustFinish) wantPlay.current = false;
  }, [status?.didJustFinish]);
  useEffect(() => () => { try { player.pause(); } catch {} }, []);

  const listen = () => {
    if (!result) return;
    if (playing) { try { player.pause(); } catch {} wantPlay.current = false; return; }
    onBeforeListen?.();
    setAudioError("");
    wantPlay.current = true;
    const url = whyAudioUrl(result.key, tutor);
    if (audioUrl === url) { try { player.seekTo(0); player.play(); } catch {} }
    else setAudioUrl(url);
  };

  const pickTutor = (t: Tutor) => {
    if (t === tutor) return;
    try { player.pause(); } catch {}
    wantPlay.current = false;
    setTutor(t); saveTutor(t); setAudioUrl(null);
  };

  const remaining = MAX_FOLLOWUPS - history.length;
  const send = async () => {
    const q = draft.trim();
    if (!q || !result || asking || remaining <= 0) return;
    setAsking(true); setAskError("");
    try {
      const { text } = await askFollowup(result.key, q, history);
      setHistory((h) => [...h, { q, a: text }]);
      setDraft("");
    } catch (e: any) { setAskError(e.message); }
    finally { setAsking(false); }
  };

  const correctLetter = String.fromCharCode(65 + request.options.findIndex((o) => o.isCorrect));

  return (
    <View accessibilityLabel="AI WHY explanation" style={[styles.panel, dark && { borderColor: "#7FA8EC" }]}>
      <View style={styles.headRow}>
        <View style={styles.title}>
          <Ionicons name="sparkles-outline" size={17} color={BLUE} />
          <Text style={styles.titleText}>AI WHY</Text>
        </View>
        {result && (
          <Pressable onPress={listen} accessibilityRole="button"
            accessibilityLabel={playing ? "Stop" : `Listen with ${TUTOR_NAMES[tutor]}`}
            style={styles.listenBtn}>
            {loadingAudio ? <ActivityIndicator size="small" color={INK} />
              : <Ionicons name={playing ? "stop" : "volume-high-outline"} size={16} color={INK} />}
            <Text style={styles.listenText}>{playing ? "Stop" : `Listen · ${TUTOR_NAMES[tutor]}`}</Text>
          </Pressable>
        )}
      </View>

      {!result && !error && (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color={BLUE} />
          <Text style={styles.muted}>Working out why…</Text>
        </View>
      )}
      {!!error && (
        <View style={{ gap: 8 }}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={load} style={styles.retryBtn} accessibilityRole="button">
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </View>
      )}

      {result && (
        <>
          <Text style={styles.body}>
            {splitOptions(result.text).map((part, i) => part.letter
              ? <Text key={i} style={{ fontWeight: "800", color: part.letter === correctLetter ? GREEN : INK }}>{part.text}</Text>
              : <Text key={i}>{part.text}</Text>)}
          </Text>
          {!!audioError && <Text style={styles.errorText}>{audioError}</Text>}

          <View style={styles.tutorRow} accessibilityRole="radiogroup" accessibilityLabel="Your tutor">
            <Text style={styles.muted}>Your tutor</Text>
            {(["cecile", "maxime"] as Tutor[]).map((t) => (
              <Pressable key={t} onPress={() => pickTutor(t)} accessibilityRole="radio"
                accessibilityState={{ checked: tutor === t }}
                style={[styles.tutorChip, tutor === t && styles.tutorChipOn]}>
                <Text style={[styles.tutorChipText, tutor === t && { color: "#FFFFFF" }]}>{TUTOR_NAMES[t]}</Text>
              </Pressable>
            ))}
          </View>

          {history.map((h, i) => (
            <View key={i} style={{ gap: 6 }}>
              <View style={styles.youBubble}><Text style={styles.youText}>{h.q}</Text></View>
              <Text style={styles.body}>{h.a}</Text>
            </View>
          ))}

          {remaining > 0 ? (
            <View style={{ gap: 6 }}>
              <Text style={styles.label} nativeID="aiWhyAsk">Ask a follow-up</Text>
              <View style={styles.askRow}>
                <TextInput value={draft} onChangeText={setDraft} onSubmitEditing={send}
                  placeholder="e.g. Which verbs take être?" placeholderTextColor="#8A93A0"
                  accessibilityLabelledBy="aiWhyAsk" accessibilityLabel="Ask a follow-up"
                  maxLength={240} returnKeyType="send" editable={!asking}
                  style={styles.input} />
                <Pressable onPress={send} disabled={asking || !draft.trim()} accessibilityRole="button"
                  accessibilityLabel="Send question"
                  style={[styles.sendBtn, (asking || !draft.trim()) && { opacity: 0.5 }]}>
                  {asking ? <ActivityIndicator size="small" color="#FFFFFF" />
                    : <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />}
                </Pressable>
              </View>
              {!!askError && <Text style={styles.errorText}>{askError}</Text>}
              <Text style={styles.small}>
                {remaining} follow-up{remaining === 1 ? "" : "s"} left on this question
              </Text>
            </View>
          ) : (
            <Text style={styles.small}>That's all the follow-ups for this question.</Text>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  whyBtn: { flexDirection: "row", alignItems: "center", alignSelf: "flex-start", gap: 8, minHeight: 44,
    paddingHorizontal: 16, borderRadius: 12, borderWidth: 1.5, borderColor: BLUE, backgroundColor: "#FFFFFF", marginTop: 12 },
  whyBtnText: { color: BLUE, fontSize: 15, fontWeight: "800", letterSpacing: 0.3 },
  proPill: { backgroundColor: "#F5C518", borderRadius: 8, paddingVertical: 2, paddingHorizontal: 7 },
  proPillText: { color: "#1B1F24", fontSize: 11, fontWeight: "800" },
  panel: { borderWidth: 1.5, borderColor: BLUE, backgroundColor: "#FFFFFF", borderRadius: 16, padding: 16, gap: 12, marginBottom: 4 },
  headRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8 },
  title: { flexDirection: "row", alignItems: "center", gap: 8 },
  titleText: { color: BLUE, fontSize: 15, fontWeight: "800", letterSpacing: 0.3 },
  listenBtn: { flexDirection: "row", alignItems: "center", gap: 6, minHeight: 44, paddingHorizontal: 12,
    borderRadius: 12, borderWidth: 1, borderColor: "#C6CCD4", backgroundColor: "#F7F8FA" },
  listenText: { color: INK, fontSize: 13, fontWeight: "700" },
  loadingRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 6 },
  body: { color: INK, fontSize: 15, lineHeight: 23 },
  muted: { color: MUTED, fontSize: 13 },
  small: { color: MUTED, fontSize: 12 },
  label: { color: INK, fontSize: 13, fontWeight: "700" },
  errorText: { color: "#B03426", fontSize: 14, lineHeight: 20 },
  retryBtn: { alignSelf: "flex-start", minHeight: 44, justifyContent: "center", paddingHorizontal: 14,
    borderRadius: 12, borderWidth: 1, borderColor: "#C6CCD4" },
  retryText: { color: INK, fontSize: 14, fontWeight: "700" },
  tutorRow: { flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  tutorChip: { minHeight: 36, justifyContent: "center", paddingHorizontal: 12, borderRadius: 18,
    borderWidth: 1, borderColor: "#C6CCD4", backgroundColor: "#FFFFFF" },
  tutorChipOn: { backgroundColor: BLUE, borderColor: BLUE },
  tutorChipText: { color: INK, fontSize: 13, fontWeight: "700" },
  youBubble: { alignSelf: "flex-end", backgroundColor: "#EAF0FC", borderRadius: 14, paddingVertical: 8, paddingHorizontal: 12, maxWidth: "85%" },
  youText: { color: INK, fontSize: 14, lineHeight: 20 },
  askRow: { flexDirection: "row", gap: 8 },
  input: { flex: 1, minWidth: 0, minHeight: 44, borderWidth: 1, borderColor: "#C6CCD4", borderRadius: 12,
    paddingHorizontal: 12, fontSize: 15, color: INK, backgroundColor: "#FFFFFF" },
  sendBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: BLUE, alignItems: "center", justifyContent: "center" },
});
