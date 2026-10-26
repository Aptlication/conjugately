import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { setAudioModeAsync, useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { CEFR_DISCLAIMER, CEFR_TESTS, type CefrId, type CefrTest } from "@shared/cefrTests";
import {
  mcqScore, outcome, wordCount, type CefrOutcome, type CefrSection, type McqAnswers,
} from "@shared/cefrScoring";
import { CEFR_AUDIO, CEFR_AUDIO_ORDER } from "../lib/cefrAudio";
import { markSection, recordCefrResult } from "../lib/cefr";
import CefrBadge from "../components/CefrBadge";
import { readCefrGate } from "../lib/coins";
import { purchasesAvailable, usePro } from "../lib/pro";

/**
 * CEFR-style test (1.3): four sections in the format of the official A1/A2/B1
 * French exams, 25 points each; pass = 50/100 AND at least 5/25 per section.
 *
 * - Pro only, and only once the test is unlocked (shared/cefrCoins.ts). Both are
 *   re-checked here so a deep link can't skip them.
 * - Listening: each recording plays at most twice, like the real exam.
 * - Speaking: a Masters Mic button on every answer, in free-speech mode (tap to
 *   start, tap to stop). The transcript lands in an editable box; typing is the
 *   fallback. The mic IS allowed here: these tests don't gate progression.
 * - Writing and speaking are marked by the AI marker (server/cefrMark.ts), with
 *   the shared pattern checks as the offline fallback.
 */

// The recogniser is native-only; loaded lazily so the web twin still renders.
let SR: any = null;
let useSREvent: (name: string, cb: (e: any) => void) => void = () => {};
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const mod = require("expo-speech-recognition");
  SR = mod.ExpoSpeechRecognitionModule;
  useSREvent = mod.useSpeechRecognitionEvent;
} catch { SR = null; }
const voiceAvailable = () => {
  if (Platform.OS === "web" || !SR) return false;
  try { return !!SR.isRecognitionAvailable(); } catch { return false; }
};

type Step = "intro" | "listening" | "reading" | "writing" | "speaking" | "marking" | "results";
const STEPS: Step[] = ["intro", "listening", "reading", "writing", "speaking", "results"];
const SECTION_NAMES: Record<CefrSection, string> = { listening: "Listening", reading: "Reading", writing: "Writing", speaking: "Speaking" };
const MAX_PLAYS = 2;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function CefrTestScreen() {
  const { testId: raw } = useLocalSearchParams<{ testId?: string }>();
  const testId = (raw && raw in CEFR_TESTS ? raw : "A1") as CefrId;
  const test: CefrTest = CEFR_TESTS[testId];
  const { isPro, loading } = usePro();

  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [step, setStep] = useState<Step>("intro");
  const [mcq, setMcq] = useState<McqAnswers>({});
  const [plays, setPlays] = useState<Record<string, number>>({});
  const [playingDoc, setPlayingDoc] = useState<string | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [texts, setTexts] = useState<Record<string, string>>({});
  const [spoken, setSpoken] = useState<Record<string, string>>({});
  const [result, setResult] = useState<(CefrOutcome & { marking: "ai" | "fallback"; feedback: Record<string, string> }) | null>(null);
  const scroll = useRef<ScrollView>(null);

  // ---- gates: Pro, then unlock ----
  useEffect(() => {
    if (!loading && !isPro && purchasesAvailable()) router.replace("/paywall" as any);
  }, [loading, isPro]);
  useEffect(() => {
    readCefrGate(testId).then(({ gate }) => setAllowed(gate.kind === "unlocked"));
  }, [testId]);

  useEffect(() => { scroll.current?.scrollTo({ y: 0, animated: false }); }, [step]);

  // ---- audio ----
  const player = useAudioPlayer(null);
  const status = useAudioPlayerStatus(player);
  const queueRef = useRef<{ keys: string[]; i: number; done: () => void } | null>(null);
  const fallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearFallback = () => { if (fallbackRef.current) { clearTimeout(fallbackRef.current); fallbackRef.current = null; } };

  const playNext = useCallback(async () => {
    const q = queueRef.current;
    if (!q) return;
    clearFallback();
    if (q.i >= q.keys.length) { queueRef.current = null; q.done(); return; }
    const key = q.keys[q.i++];
    const src = CEFR_AUDIO[key];
    // A missing clip (not recorded yet) is skipped, never a dead end.
    fallbackRef.current = setTimeout(() => playNext(), src ? 15000 : 400);
    if (!src) return;
    try {
      player.replace(src);
      const t0 = Date.now();
      while (!player.isLoaded && Date.now() - t0 < 2000) await wait(50);
      try { player.seekTo(0); } catch {}
      player.play();
      if (player.duration > 0) { clearFallback(); fallbackRef.current = setTimeout(() => playNext(), (player.duration + 2) * 1000); }
    } catch { /* the fallback timer moves on */ }
  }, [player]);

  useEffect(() => {
    if (status.didJustFinish && queueRef.current) setTimeout(() => playNext(), 450);
  }, [status.didJustFinish, playNext]);

  const playKeys = useCallback(async (keys: string[], done: () => void) => {
    try { SR?.abort(); } catch {}
    for (let i = 0; i < 3; i++) {
      try { await setAudioModeAsync({ playsInSilentMode: true, allowsRecording: false, shouldRouteThroughEarpiece: false }); break; }
      catch { await wait(150); }
    }
    queueRef.current = { keys, i: 0, done };
    playNext();
  }, [playNext]);

  const stopAudio = () => {
    queueRef.current = null; clearFallback();
    try { player.pause(); } catch {}
    setPlayingDoc(null);
  };
  useEffect(() => () => { clearFallback(); try { SR?.abort(); } catch {} }, []);

  const playDoc = (docId: string) => {
    if (playingDoc || (plays[docId] ?? 0) >= MAX_PLAYS) return;
    setPlays((p) => ({ ...p, [docId]: (p[docId] ?? 0) + 1 }));
    setPlayingDoc(docId);
    playKeys(CEFR_AUDIO_ORDER[testId]?.[docId] ?? [], () => setPlayingDoc(null));
  };
  const playPrompt = (key: string) => {
    if (playingDoc || micKey) return;
    setPlayingDoc(key);
    playKeys(CEFR_AUDIO_ORDER[testId]?.[key] ?? [], () => setPlayingDoc(null));
  };

  // ---- mic (free speech) ----
  const [micKey, setMicKey] = useState<string | null>(null);
  const [micLevel, setMicLevel] = useState(0);
  const [micNote, setMicNote] = useState<Record<string, string>>({});
  const micKeyRef = useRef<string | null>(null);
  const baseTextRef = useRef("");
  const onDeviceRef = useRef(true);

  useSREvent("volumechange", (e: any) => { if (micKeyRef.current) setMicLevel(Math.max(0, Math.min(10, e.value)) / 10); });
  useSREvent("result", (e: any) => {
    const key = micKeyRef.current;
    if (!key) return;
    const heard = String(e.results?.[0]?.transcript ?? "");
    setSpoken((s) => ({ ...s, [key]: [baseTextRef.current, heard].filter(Boolean).join(" ").trim() }));
    if (e.isFinal) baseTextRef.current = [baseTextRef.current, heard].filter(Boolean).join(" ").trim();
  });
  useSREvent("end", () => { micKeyRef.current = null; setMicKey(null); setMicLevel(0); });
  useSREvent("error", (e: any) => {
    const key = micKeyRef.current;
    micKeyRef.current = null; setMicKey(null); setMicLevel(0);
    if (!key) return;
    const note = e.error === "not-allowed" ? "Microphone access is off. Turn it on in Settings › Conjugately, or type your answer."
      : e.error === "no-speech" ? "Je n'ai pas compris. Tap the mic and speak, or type your answer."
      : "That didn't record. Tap the mic to try again, or type your answer.";
    setMicNote((n) => ({ ...n, [key]: note }));
  });

  const toggleMic = async (key: string) => {
    if (micKeyRef.current === key) { try { SR.stop(); } catch {} return; }
    if (micKeyRef.current) { try { SR.abort(); } catch {} }
    if (!voiceAvailable()) { setMicNote((n) => ({ ...n, [key]: "The microphone isn't available here. Type your answer below." })); return; }
    stopAudio();
    try {
      const perm = await SR.requestPermissionsAsync();
      if (!perm.granted) { setMicNote((n) => ({ ...n, [key]: "Microphone access is off. Turn it on in Settings › Conjugately, or type your answer." })); return; }
    } catch { return; }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    baseTextRef.current = (spoken[key] ?? "").trim();
    micKeyRef.current = key; setMicKey(key);
    setMicNote((n) => ({ ...n, [key]: "" }));
    const base = {
      lang: "fr-FR", interimResults: true, maxAlternatives: 1, continuous: true,
      volumeChangeEventOptions: { enabled: true, intervalMillis: 50 },
      iosCategory: { category: "playAndRecord", categoryOptions: ["defaultToSpeaker", "allowBluetooth"], mode: "default" },
    };
    try { SR.start({ ...base, requiresOnDeviceRecognition: onDeviceRef.current }); }
    catch {
      if (onDeviceRef.current) {
        onDeviceRef.current = false;
        try { SR.start({ ...base, requiresOnDeviceRecognition: false }); return; } catch {}
      }
      micKeyRef.current = null; setMicKey(null);
      setMicNote((n) => ({ ...n, [key]: "That didn't record. Tap the mic to try again, or type your answer." }));
    }
  };

  // ---- flow ----
  const next = () => {
    stopAudio();
    if (micKeyRef.current) { try { SR.abort(); } catch {} micKeyRef.current = null; setMicKey(null); }
    const i = STEPS.indexOf(step);
    if (step === "speaking") { finish(); return; }
    setStep(STEPS[Math.min(i + 1, STEPS.length - 1)]);
  };

  const finish = async () => {
    setStep("marking");
    const answers = { fields, texts, spoken };
    const [w, s] = await Promise.all([markSection(testId, "writing", answers), markSection(testId, "speaking", answers)]);
    const o = outcome({ listening: mcqScore(test.listening, mcq), reading: mcqScore(test.reading, mcq), writing: w.score, speaking: s.score });
    const marking = w.marking === "ai" && s.marking === "ai" ? "ai" : "fallback";
    await recordCefrResult({ testId, scores: o.scores, total: o.total, passed: o.passed, marking, takenAt: new Date().toISOString() });
    Haptics.notificationAsync(o.passed ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning).catch(() => {});
    setResult({ ...o, marking, feedback: { ...w.feedback, ...s.feedback } });
    setStep("results");
  };

  const restart = () => {
    setMcq({}); setPlays({}); setFields({}); setTexts({}); setSpoken({}); setMicNote({}); setResult(null); setStep("intro");
  };

  const stepIndex = STEPS.indexOf(step === "marking" ? "results" : step);
  const fmt = (n: number) => (Math.round(n * 10) / 10).toString();

  // ---- render ----
  if (allowed === null || loading) {
    return <View style={[st.screen, st.center]}><Stack.Screen options={{ headerShown: false }} /><ActivityIndicator color="#fff" /></View>;
  }
  if (!allowed) {
    return (
      <View style={[st.screen, st.center, { padding: 24 }]}>
        <Stack.Screen options={{ headerShown: false }} />
        <Text style={st.h2}>This test isn't unlocked yet</Text>
        <Text style={st.body}>Pass every {test.level} Final Level Exam, then unlock it with coins from Mini-Courses.</Text>
        <Pressable style={st.cta} onPress={() => router.back()}><Text style={st.ctaText}>Back</Text></Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={st.screen} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={st.header}>
        <View style={st.headRow}>
          <View style={st.levelChip}><Text style={st.levelChipText}>{testId}</Text></View>
          <Text style={st.headTitle}>CEFR-style test · {test.level}</Text>
          <Pressable onPress={() => { stopAudio(); router.back(); }} accessibilityRole="button" accessibilityLabel="Close test" hitSlop={12}>
            <Text style={st.close}>✕</Text>
          </Pressable>
        </View>
        <View style={st.segs}>
          {[1, 2, 3, 4].map((n) => (
            <View key={n} style={[st.seg, stepIndex > n || step === "results" ? st.segDone : stepIndex === n ? st.segNow : null]} />
          ))}
        </View>
      </View>

      <ScrollView ref={scroll} contentContainerStyle={st.scroll} keyboardShouldPersistTaps="handled">
        {step === "intro" && (
          <View style={{ gap: 14 }}>
            <View style={st.hero}>
              <Text style={st.kicker}>UNLOCKED · RETAKES ARE FREE</Text>
              <Text style={st.heroTitle}>CEFR-style {testId} test</Text>
              <Text style={st.heroBody}>{test.intro}</Text>
            </View>
            {test.sections.map((sec, i) => (
              <View key={sec.fr} style={st.secRow}>
                <View style={st.num}><Text style={st.numText}>{i + 1}</Text></View>
                <View style={{ flex: 1 }}>
                  <Text style={st.secFr}>{sec.fr}</Text>
                  <Text style={st.secEn}>{sec.en}</Text>
                </View>
                <Text style={st.pts}>25 pts</Text>
              </View>
            ))}
            <View style={st.card}>
              <Text style={st.cardTitle}>To pass</Text>
              <Text style={st.body}>You need 50 / 100 overall and at least 5 / 25 in every section, the same rule official {testId} exams use. {test.minutes}. Each recording plays twice. Pass and you earn the {testId} badge.</Text>
            </View>
            <Text style={st.small}>{CEFR_DISCLAIMER(testId)}</Text>
          </View>
        )}

        {(step === "listening" || step === "reading") && (
          <View style={{ gap: 14 }}>
            <Text style={st.h2}>{step === "listening" ? "Compréhension de l'oral" : "Compréhension des écrits"}</Text>
            <Text style={st.sub}>{test.sectionSubtitles[step]}</Text>
            {(step === "listening" ? test.listening : test.reading).map((doc, di, arr) => {
              const offset = arr.slice(0, di).reduce((n, d) => n + d.questions.length, 0);
              const used = plays[doc.id] ?? 0;
              return (
                <View key={doc.id} style={st.card}>
                  <Text style={st.docKicker}>{doc.kicker}</Text>
                  <Text style={st.cardTitle}>{doc.title}</Text>
                  {"script" in doc ? (
                    <View style={st.playRow}>
                      <Pressable style={[st.play, (used >= MAX_PLAYS || !!playingDoc) && st.playOff]} disabled={used >= MAX_PLAYS || !!playingDoc}
                        onPress={() => playDoc(doc.id)} accessibilityRole="button" accessibilityLabel="Play recording">
                        <Text style={st.playText}>{playingDoc === doc.id ? "Playing…" : used === 0 ? "▶ Play" : used === 1 ? "▶ Play again" : "Played twice"}</Text>
                      </Pressable>
                      <Text style={st.sub}>Listens: {used} / {MAX_PLAYS}</Text>
                    </View>
                  ) : (
                    <View style={st.doc}><Text style={st.docText}>{doc.text}</Text></View>
                  )}
                  {doc.questions.map((q, qi) => {
                    const key = `${doc.id}-${qi}`;
                    return (
                      <View key={key} style={{ gap: 6, marginTop: 12 }}>
                        <Text style={st.qFr}>{offset + qi + 1}. {q.fr}</Text>
                        <Text style={st.qEn}>{q.en}</Text>
                        {q.options.map((o, oi) => {
                          const on = mcq[key] === oi;
                          return (
                            <Pressable key={oi} style={[st.opt, on && st.optOn]} onPress={() => setMcq((m) => ({ ...m, [key]: oi }))}
                              accessibilityRole="radio" accessibilityState={{ selected: on }}>
                              <View style={[st.letter, on && st.letterOn]}><Text style={[st.letterText, on && { color: "#fff" }]}>{"ABCD"[oi]}</Text></View>
                              <Text style={st.optText}>{o}</Text>
                            </Pressable>
                          );
                        })}
                      </View>
                    );
                  })}
                </View>
              );
            })}
          </View>
        )}

        {step === "writing" && (
          <View style={{ gap: 14 }}>
            <Text style={st.h2}>Production écrite</Text>
            <Text style={st.sub}>{test.sectionSubtitles.writing}</Text>
            {test.writing.map((t) => {
              const words = wordCount(texts[t.id]);
              return (
                <View key={t.id} style={st.card}>
                  <Text style={st.docKicker}>{t.kicker}</Text>
                  <Text style={st.body}>{t.prompt}</Text>
                  {!!t.promptEn && <Text style={st.sub}>{t.promptEn}</Text>}
                  {t.form?.fields.map((f) => (
                    <View key={f.k} style={{ marginTop: 10 }}>
                      <Text style={st.label}>{f.label}</Text>
                      <TextInput style={st.input} value={fields[`${t.id}-${f.k}`] ?? ""} placeholder={f.ph} placeholderTextColor="#8A93A0"
                        onChangeText={(v) => setFields((x) => ({ ...x, [`${t.id}-${f.k}`]: v }))} autoCorrect={false} accessibilityLabel={f.label} />
                    </View>
                  ))}
                  {t.text && (
                    <>
                      <TextInput style={[st.input, st.area]} multiline value={texts[t.id] ?? ""} placeholder={t.text.placeholder}
                        placeholderTextColor="#8A93A0" onChangeText={(v) => setTexts((x) => ({ ...x, [t.id]: v }))}
                        textAlignVertical="top" autoCorrect={false} accessibilityLabel="Your answer" />
                      <Text style={[st.sub, words >= t.text.minWords && { color: "#5BD48F", fontWeight: "700" }]}>{words} words · {t.text.minWords} minimum</Text>
                    </>
                  )}
                </View>
              );
            })}
          </View>
        )}

        {step === "speaking" && (
          <View style={{ gap: 14 }}>
            <Text style={st.h2}>Production orale</Text>
            <Text style={st.sub}>{test.sectionSubtitles.speaking}</Text>
            <View style={st.tip}><Text style={st.tipText}>Tap the mic under each prompt and answer out loud; tap again when you've finished. Masters Mic marks generously. You can also type or correct your answer.</Text></View>
            {test.speaking.map((p) => (
              <View key={p.id} style={st.card}>
                <Text style={st.docKicker}>{p.kicker}</Text>
                <Text style={st.cardTitle}>{p.title}</Text>
                <Text style={st.sub}>{p.intro}</Text>
                {p.items.map((it, i) => {
                  const key = `${p.id}-${i}`;
                  const audioKey = `${p.id}_${i + 1}`;
                  const on = micKey === key;
                  const val = spoken[key] ?? "";
                  return (
                    <View key={key} style={{ gap: 8, marginTop: 14 }}>
                      {!!it.doc && <View style={st.doc}><Text style={st.docText}>{it.doc}</Text></View>}
                      <View style={st.bubbleRow}>
                        <Pressable style={st.miniPlay} onPress={() => playPrompt(audioKey)} accessibilityRole="button" accessibilityLabel="Hear the prompt">
                          <Text style={st.playText}>{playingDoc === audioKey ? "…" : "▶"}</Text>
                        </Pressable>
                        <View style={st.bubble}><Text style={st.bubbleText}>{it.prompt}</Text></View>
                      </View>
                      <Text style={st.cue}>{it.cue}</Text>
                      <View style={st.micRow}>
                        <Pressable style={[st.mic, on && st.micOn]} onPress={() => toggleMic(key)} accessibilityRole="button"
                          accessibilityLabel={on ? "Stop recording" : "Answer out loud"}>
                          <Text style={st.micIcon}>{on ? "■" : "🎙"}</Text>
                        </Pressable>
                        {on && (
                          <View style={st.eq} importantForAccessibility="no-hide-descendants">
                            {[0.5, 0.8, 1, 0.7, 0.45].map((k, b) => (
                              <View key={b} style={[st.eqBar, { height: 6 + 22 * Math.min(1, micLevel * k + 0.1) }]} />
                            ))}
                          </View>
                        )}
                        <Text style={st.micStatus}>
                          {on ? "Parlez maintenant… Tap again when you've finished."
                            : micNote[key] || (val ? "Tap the mic to answer again." : "Tap the mic and answer out loud.")}
                        </Text>
                      </View>
                      <TextInput style={st.input} value={val} onChangeText={(v) => setSpoken((s) => ({ ...s, [key]: v }))}
                        placeholder="Your words appear here, or type instead" placeholderTextColor="#8A93A0"
                        multiline={!!it.minWords} autoCorrect={false} accessibilityLabel={it.cue} />
                    </View>
                  );
                })}
              </View>
            ))}
          </View>
        )}

        {step === "marking" && (
          <View style={[st.center, { paddingVertical: 80, gap: 14 }]}>
            <ActivityIndicator color="#F5C518" size="large" />
            <Text style={st.body}>Marking your writing and speaking…</Text>
          </View>
        )}

        {step === "results" && result && (
          <View style={{ gap: 14 }}>
            <View style={[st.hero, { backgroundColor: result.passed ? "#17734A" : "#2A3266" }]}>
              <Text style={[st.kicker, { color: "#fff" }]}>{result.passed ? `PASSED · CEFR-STYLE ${testId}` : "NOT PASSED YET"}</Text>
              <Text style={st.score}>{fmt(result.total)}<Text style={st.scoreOf}> / 100</Text></Text>
              <Text style={st.heroBody}>
                {result.passed
                  ? `You passed the CEFR-style ${testId} test. Your ${test.level} French is at ${testId} level, the level official ${testId} French exams test.`
                  : result.total >= 50
                    ? `Good total, but every section needs at least 5 / 25. Practise ${result.weak.map((w) => SECTION_NAMES[w].toLowerCase()).join(" and ")}, then try again. Retakes are free.`
                    : "Not yet. You need 50 / 100. Your scores below show where to practise. Retakes are free."}
              </Text>
            </View>
            {result.passed && (
              <View style={[st.card, st.badgeRow]}>
                <CefrBadge id={testId} earned size={80} label="" />
                <View style={{ flex: 1 }}>
                  <Text style={st.cardTitle}>Badge earned: {testId} · {test.level}</Text>
                  <Text style={st.sub}>It now shows on your {test.level} course and in My Journey.</Text>
                </View>
              </View>
            )}
            <View style={st.card}>
              {(Object.keys(SECTION_NAMES) as CefrSection[]).map((k, i) => {
                const v = result.scores[k];
                const color = v < 5 ? "#F59E6B" : v >= 12.5 ? "#5BD48F" : "#7FA8EC";
                return (
                  <View key={k} style={{ marginTop: i ? 14 : 0 }}>
                    <View style={st.scoreRow}><Text style={st.cardTitle}>{SECTION_NAMES[k]}</Text><Text style={[st.cardTitle, { color }]}>{fmt(v)} / 25</Text></View>
                    <View style={st.bar}><View style={[st.barFill, { width: `${(v / 25) * 100}%`, backgroundColor: color }]} /></View>
                    <Text style={st.sub}>{test.canDo[i]}</Text>
                  </View>
                );
              })}
            </View>
            {Object.keys(result.feedback).length > 0 && (
              <View style={st.card}>
                <Text style={st.cardTitle}>Examiner's notes</Text>
                {Object.entries(result.feedback).filter(([, v]) => v).slice(0, 8).map(([k, v]) => (
                  <Text key={k} style={[st.body, { marginTop: 6 }]}>• {v}</Text>
                ))}
              </View>
            )}
            <View style={st.card}>
              <Text style={st.cardTitle}>{test.model.title}</Text>
              <Text style={[st.body, { fontStyle: "italic", marginTop: 6 }]}>{test.model.text}</Text>
            </View>
            <Text style={st.small}>
              {result.marking === "ai" ? "Writing and speaking were marked by AI against the test's rubric." : "Writing and speaking were marked with the offline checker, because the AI marker wasn't reachable."} {CEFR_DISCLAIMER(testId)}
            </Text>
            <Pressable style={st.ghost} onPress={restart} accessibilityRole="button"><Text style={st.ghostText}>Take the test again</Text></Pressable>
            <Pressable style={st.cta} onPress={() => router.back()} accessibilityRole="button"><Text style={st.ctaText}>Done</Text></Pressable>
          </View>
        )}
      </ScrollView>

      {step !== "results" && step !== "marking" && (
        <View style={st.footer}>
          <Pressable style={st.cta} onPress={next} accessibilityRole="button">
            <Text style={st.ctaText}>
              {{ intro: "Start the test", listening: "Next: Reading", reading: "Next: Writing", writing: "Next: Speaking", speaking: "Finish and see my result" }[step as "intro"]}
            </Text>
          </Pressable>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const st = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#1B2145" },
  center: { alignItems: "center", justifyContent: "center" },
  header: { paddingTop: 58, paddingHorizontal: 16, paddingBottom: 10, gap: 10, borderBottomWidth: 1, borderBottomColor: "rgba(255,255,255,0.1)" },
  headRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  levelChip: { backgroundColor: "#F5C518", borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3 },
  levelChipText: { color: "#1B2145", fontWeight: "800", fontSize: 12 },
  headTitle: { color: "#fff", fontSize: 15, fontWeight: "700", flex: 1 },
  close: { color: "#C3CAD4", fontSize: 20, paddingHorizontal: 4 },
  segs: { flexDirection: "row", gap: 6 },
  seg: { flex: 1, height: 5, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.18)" },
  segDone: { backgroundColor: "#5BD48F" },
  segNow: { backgroundColor: "#4A78F2" },
  scroll: { padding: 16, paddingBottom: 140 },
  hero: { backgroundColor: "#2A3266", borderRadius: 18, padding: 20, gap: 8 },
  kicker: { color: "#F5C518", fontSize: 12, fontWeight: "800", letterSpacing: 1 },
  heroTitle: { color: "#fff", fontSize: 26, fontWeight: "800" },
  heroBody: { color: "#D5DCF0", fontSize: 15, lineHeight: 21 },
  secRow: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 14, padding: 14 },
  num: { width: 32, height: 32, borderRadius: 16, backgroundColor: "rgba(74,120,242,0.25)", alignItems: "center", justifyContent: "center" },
  numText: { color: "#9DB4F5", fontWeight: "800" },
  secFr: { color: "#fff", fontSize: 15, fontWeight: "700" },
  secEn: { color: "#C3CAD4", fontSize: 13, marginTop: 2 },
  pts: { color: "#C3CAD4", fontSize: 13, fontWeight: "600" },
  card: { backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 16, padding: 16 },
  cardTitle: { color: "#fff", fontSize: 16, fontWeight: "700" },
  h2: { color: "#fff", fontSize: 22, fontWeight: "800" },
  sub: { color: "#C3CAD4", fontSize: 13, lineHeight: 18, marginTop: 2 },
  body: { color: "#E6E9EE", fontSize: 15, lineHeight: 21 },
  small: { color: "#A7B0BD", fontSize: 12, lineHeight: 17 },
  docKicker: { color: "#A7B0BD", fontSize: 12, fontWeight: "700", letterSpacing: 0.8, marginBottom: 2 },
  doc: { backgroundColor: "#FBFAF6", borderRadius: 12, padding: 14, marginTop: 10 },
  docText: { color: "#1B1F24", fontSize: 15, lineHeight: 22 },
  playRow: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 10 },
  play: { backgroundColor: "#4A78F2", borderRadius: 22, paddingHorizontal: 18, minHeight: 44, justifyContent: "center" },
  playOff: { backgroundColor: "rgba(74,120,242,0.35)" },
  playText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  qFr: { color: "#fff", fontSize: 15, fontWeight: "600" },
  qEn: { color: "#A7B0BD", fontSize: 13 },
  opt: { flexDirection: "row", alignItems: "center", gap: 10, minHeight: 46, borderRadius: 12, borderWidth: 1.5, borderColor: "rgba(255,255,255,0.2)", paddingHorizontal: 12, paddingVertical: 10 },
  optOn: { borderColor: "#4A78F2", backgroundColor: "rgba(74,120,242,0.2)" },
  letter: { width: 26, height: 26, borderRadius: 13, backgroundColor: "rgba(255,255,255,0.12)", alignItems: "center", justifyContent: "center" },
  letterOn: { backgroundColor: "#4A78F2" },
  letterText: { color: "#C3CAD4", fontWeight: "700", fontSize: 13 },
  optText: { color: "#fff", fontSize: 15, flex: 1 },
  label: { color: "#C3CAD4", fontSize: 13, fontWeight: "600", marginBottom: 6 },
  input: { backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15, color: "#1B2145", minHeight: 44 },
  area: { minHeight: 170, marginTop: 12 },
  tip: { backgroundColor: "rgba(74,120,242,0.18)", borderRadius: 12, padding: 12 },
  tipText: { color: "#E6E9EE", fontSize: 13, lineHeight: 18 },
  bubbleRow: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  miniPlay: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#4A78F2", alignItems: "center", justifyContent: "center" },
  bubble: { flex: 1, backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 14, borderBottomLeftRadius: 4, paddingHorizontal: 12, paddingVertical: 9 },
  bubbleText: { color: "#fff", fontSize: 15, lineHeight: 20 },
  cue: { color: "#5BD48F", fontSize: 13, fontWeight: "600" },
  micRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  mic: { width: 52, height: 52, borderRadius: 26, backgroundColor: "#F5C518", alignItems: "center", justifyContent: "center" },
  micOn: { backgroundColor: "#E2563A" },
  micIcon: { fontSize: 22, color: "#1B2145" },
  eq: { flexDirection: "row", alignItems: "center", gap: 3, height: 28 },
  eqBar: { width: 4, borderRadius: 2, backgroundColor: "#E2563A" },
  micStatus: { color: "#E6E9EE", fontSize: 13, lineHeight: 18, flex: 1 },
  footer: { position: "absolute", left: 0, right: 0, bottom: 0, padding: 16, paddingBottom: 30, backgroundColor: "#1B2145", borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.1)" },
  cta: { backgroundColor: "#F5C518", borderRadius: 14, minHeight: 52, alignItems: "center", justifyContent: "center", marginTop: 4 },
  ctaText: { color: "#1B2145", fontSize: 17, fontWeight: "800" },
  ghost: { borderRadius: 14, minHeight: 46, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.35)" },
  ghostText: { color: "#E6E9EE", fontSize: 15, fontWeight: "600" },
  score: { color: "#fff", fontSize: 44, fontWeight: "800" },
  scoreOf: { fontSize: 18, fontWeight: "600" },
  badgeRow: { flexDirection: "row", alignItems: "center", gap: 14 },
  scoreRow: { flexDirection: "row", justifyContent: "space-between" },
  bar: { height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.15)", overflow: "hidden", marginTop: 6 },
  barFill: { height: "100%", borderRadius: 4 },
});
