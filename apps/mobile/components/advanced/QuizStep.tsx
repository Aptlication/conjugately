import React, { useEffect, useMemo, useRef, useState } from "react";
import { Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { splitQualifier } from "@shared/quizText";
import { formsForQuiz } from "@shared/verbForms";
import { API_BASE } from "../../lib/data";
import { quizClip } from "@shared/advanced/audioKeys";
import type { AdvUnit } from "@shared/advanced/types";
import { awardCoins } from "../../lib/coins";
import { collectMissedWord } from "../../lib/vocab";
import { purchasesAvailable, usePro } from "../../lib/pro";
import CoinStack from "../CoinStack";
import MastersMic from "../MastersMic";
import MicPromoDemo from "../MicPromoDemo";
import { AiWhyButton, AiWhyPanel } from "../AiWhy";
import type { MicOutcome } from "../../lib/mastersMic";

/**
 * Verb quiz (Advanced units): ten questions on the unit verb, an English
 * sentence and four French sentences, one right.
 *
 * Update 1.4.1 (Jonathan, 3 Nov 2026): "the same as the levels Intermediate and
 * below". This screen is built from the same parts, copy and rules as the
 * conjugation quiz (app/quiz.tsx), so the two read and behave as one:
 * - "Question X of N" and "Score: s / N", progress bar, the Quick Tip box.
 * - Options above Masters Mic; "You said" / "✓ Correct" tags; the feedback box
 *   with AI WHY; tapping the chosen answer again moves on.
 * - Start Over · ‹ Back · Next ›, then Sound On/Off and Mic On/Off.
 * - Correct answers move on by themselves after the French has played; a wrong
 *   tap waits for Next; every Mic On answer moves on by itself.
 * - The "Say it aloud" pop-up and the Masters Mic how-to, as in the quizzes.
 * - Results: score, percentage, message and the coin stack, then the
 *   conversation (this unit's next step) and Try Again.
 * Kept from the Advanced pilot (Jonathan, 2 Nov 2026): Mic On is the default
 * here and switching it off is remembered; one coin per right answer. As at
 * Intermediate A and B, only the correct French is recorded, so a wrong answer
 * plays the correct French. The web build has no recogniser, so no mic there.
 */

const MIC_PREF = "advancedQuizMic";
const micPossible = Platform.OS !== "web";
const LEVEL = "Advanced A";

const shuffle = <T,>(a: T[]) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const fr = (t: string) => t.replace(/ ([?!:;»])/g, " $1").replace(/« /g, "« ");

type Opt = { text: string; isCorrect: boolean; rationale: string };

export default function QuizStep({ unit, play, onDone }: {
  unit: AdvUnit;
  play: (items: { key: string; text: string }[], onEnd?: () => void) => void;
  onDone: (r: { score: number; total: number; coins: number }) => void;
}) {
  const { isPro } = usePro();
  const [round, setRound] = useState(0);
  const questions = useMemo(() => unit.quiz.map((q, i) => ({
    ...q, i,
    question: q.tag ? `${q.en} (${q.tag})` : q.en,
    answerOptions: shuffle<Opt>([
      { text: q.answer, isCorrect: true, rationale: `Correct! ${fr(q.answer)}` },
      ...q.wrong.map((w) => ({ text: w, isCorrect: false, rationale: `The correct answer is: ${fr(q.answer)}` })),
    ]),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  })), [unit, round]);

  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  // Timers outlive the render that set them, so the advance reads these.
  const idxRef = useRef(0);
  const answersRef = useRef<Record<number, number>>({});
  idxRef.current = idx;
  const [reviewIndex, setReviewIndex] = useState<number | null>(null);
  const [done, setDone] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [balance, setBalance] = useState<number | null>(null);
  const [sound, setSound] = useState(true);
  const soundRef = useRef(true);
  useEffect(() => { soundRef.current = sound; }, [sound]);
  const [micOn, setMicOn] = useState(micPossible);
  const [showOptionsFor, setShowOptionsFor] = useState<number | null>(null);
  const [micHolding, setMicHolding] = useState(false);
  const [showTip, setShowTip] = useState(false);
  const [micPromo, setMicPromo] = useState<"unknown" | "due" | "done">("unknown");
  const [micIntroSeen, setMicIntroSeen] = useState(true);
  const [showMicIntro, setShowMicIntro] = useState(false);
  const [whyOpenFor, setWhyOpenFor] = useState<number | null>(null);
  const whyLocked = !isPro && purchasesAvailable();

  const autoAdvanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelAutoAdvance = () => { if (autoAdvanceRef.current) { clearTimeout(autoAdvanceRef.current); autoAdvanceRef.current = null; } };
  const waitAudioRef = useRef(false);
  const audioDoneRef = useRef(true);

  useEffect(() => {
    AsyncStorage.getItem("dontShowInstructionPopup").then((v) => setShowTip(v !== "true")).catch(() => {});
    AsyncStorage.getItem("mastersMicPromoNever").then((v) => setMicPromo(v === "true" ? "done" : "due")).catch(() => setMicPromo("done"));
    if (micPossible) {
      Promise.all([AsyncStorage.getItem(MIC_PREF), AsyncStorage.getItem("mastersMicIntroShown")]).then(([pref, intro]) => {
        if (pref === "off") setMicOn(false);
        const seen = intro === "true";
        setMicIntroSeen(seen);
        // Mic On is the default here, so the how-to the quizzes show on switching it on shows at the start.
        if (!seen && pref !== "off") setShowMicIntro(true);
      }).catch(() => {});
    }
    return () => cancelAutoAdvance();
  }, []);

  const scoreOf = (a: Record<number, number>) => Object.entries(a).reduce((n, [qi, ai]) =>
    n + (questions[Number(qi)]?.answerOptions[Number(ai)]?.isCorrect ? 1 : 0), 0);

  const q = questions[idx];
  const dispIdx = reviewIndex !== null ? reviewIndex : idx;
  const dispQ = questions[dispIdx] || q;
  const dispSelected = reviewIndex !== null ? (answers[dispIdx] ?? null) : selected;
  const dispConfirmed = reviewIndex !== null ? answers[dispIdx] !== undefined : confirmed;
  const score = scoreOf(answers);

  const micEligible = micPossible && reviewIndex === null;
  const micMode = micOn && micEligible;
  const micControl = micMode && !dispConfirmed;
  const optionsHidden = micMode && showOptionsFor !== dispIdx;
  const micPromoVisible = micPromo === "due" && !done && reviewIndex === null && !micOn && micPossible && !showMicIntro;

  // ── The English question first (5 Nov 2026), as at every other level: it
  // plays on its own and A-D stay locked until it has finished. Clips are on
  // the server (attached_assets/audio/quizzes/advanced/<unit>/questions/Q<n>.mp3,
  // recorded in the quiz questions' voice). A clip that fails to load unlocks
  // within a few seconds, so nothing is ever stuck.
  const questionUrl = q && !done ? `${API_BASE}/attached_assets/audio/quizzes/advanced/${unit.id.replace(".", "_")}/questions/Q${q.i + 1}.mp3` : null;
  const qPlayer = useAudioPlayer(questionUrl ? { uri: questionUrl } : null);
  const qStatus = useAudioPlayerStatus(qPlayer);
  const [englishDoneFor, setEnglishDoneFor] = useState(-1);
  const englishDone = englishDoneFor === idx;
  const englishTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishEnglish = () => {
    if (englishTimer.current) { clearTimeout(englishTimer.current); englishTimer.current = null; }
    setEnglishDoneFor(idxRef.current);
  };
  const stopEnglish = () => { try { qPlayer.pause(); } catch {} finishEnglish(); };
  useEffect(() => { if (qStatus?.didJustFinish) finishEnglish(); }, [qStatus?.didJustFinish]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => { if (englishTimer.current) clearTimeout(englishTimer.current); }, []);
  const promoHolding = micPromo === "unknown" || micPromoVisible || showMicIntro;
  useEffect(() => {
    if (!done && questionUrl && sound && !confirmed && reviewIndex === null && !promoHolding) {
      setEnglishDoneFor(-1);
      if (englishTimer.current) clearTimeout(englishTimer.current);
      englishTimer.current = setTimeout(finishEnglish, 12000);
      const t = setTimeout(() => {
        try { qPlayer.seekTo(0); qPlayer.play(); } catch { finishEnglish(); }
        // Not recorded yet, or offline: don't keep the answers locked.
        setTimeout(() => { if (!qPlayer.playing && !(qPlayer.currentTime > 0)) finishEnglish(); }, 2500);
      }, 300);
      return () => clearTimeout(t);
    }
    finishEnglish();
  }, [idx, round, done, questionUrl, sound, promoHolding]); // eslint-disable-line react-hooks/exhaustive-deps

  // Verb pronunciation (5 Nov 2026): the forms this quiz tests in the current question's tense.
  const quizForms = useMemo(() => q ? formsForQuiz(
    unit.quiz.filter((x) => x.tense === q.tense).map((x) => ({ answer: x.answer, wrongs: x.wrong })), unit.verb, q.tense,
  ) : [], [unit, q?.tense]); // eslint-disable-line react-hooks/exhaustive-deps

  // The card reaches the bottom of the screen with Mic On; the space above Record takes up the slack.
  const [viewH, setViewH] = useState(0);
  const qParts = splitQualifier(String(dispQ?.question ?? ""));

  const whyOpen = whyOpenFor === dispIdx;
  const openWhy = () => {
    cancelAutoAdvance();
    waitAudioRef.current = false;
    if (whyLocked) { router.push("/paywall" as any); return; }
    setWhyOpenFor(dispIdx);
    // Mic On hides A-D on purpose, but the explanation names every option.
    if (micMode) setShowOptionsFor(dispIdx);
  };

  const nextQuestion = () => {
    cancelAutoAdvance();
    setMicHolding(false);
    waitAudioRef.current = false;
    audioDoneRef.current = true;
    setReviewIndex(null);
    setSelected(null); setConfirmed(false); setWhyOpenFor(null);
    const i = idxRef.current;
    if (i + 1 >= questions.length) {
      const s = scoreOf(answersRef.current);
      setFinalScore(s);
      awardCoins(s).then(setBalance).catch(() => {});
      setDone(true);
    } else setIdx(i + 1);
  };

  /** The correct French, as at Intermediate (only the correct option is recorded). */
  const speakAnswer = () => {
    if (!soundRef.current) return;
    audioDoneRef.current = false;
    play([{ key: quizClip(unit.id, q.i), text: q.answer }], () => {
      audioDoneRef.current = true;
      if (waitAudioRef.current) {
        waitAudioRef.current = false;
        cancelAutoAdvance();
        // Let the last syllable land before the next question replaces it.
        autoAdvanceRef.current = setTimeout(() => nextQuestion(), 800);
      }
    });
  };

  const scheduleAdvance = () => {
    autoAdvanceRef.current = setTimeout(() => {
      if (!audioDoneRef.current) {
        waitAudioRef.current = true;
        autoAdvanceRef.current = setTimeout(() => {
          if (waitAudioRef.current) { waitAudioRef.current = false; nextQuestion(); }
        }, 8000);
      } else nextQuestion();
    }, 2500);
  };

  // As in the quizzes: first tap selects and confirms; tapping the same answer again moves on.
  const handleAnswerSelect = (i: number) => {
    if (reviewIndex !== null) return;
    if (selected === i && confirmed) { nextQuestion(); return; }
    if (confirmed) return;
    // The English always comes first; a spoken answer has already stopped it.
    if (!englishDone) return;
    stopEnglish();
    setSelected(i);
    setConfirmed(true);
    answersRef.current = { ...answersRef.current, [idx]: i };
    setAnswers(answersRef.current);
    const opt = q.answerOptions[i];
    Haptics.notificationAsync(opt?.isCorrect ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error).catch(() => {});
    if (opt && !opt.isCorrect) {
      collectMissedWord({ french: q.answer, english: q.en, verb: unit.verb, tense: q.tense, difficulty: LEVEL });
    }
    speakAnswer();
    cancelAutoAdvance();
    if (opt?.isCorrect) scheduleAdvance();
  };

  /** Move on after a spoken answer, right or wrong, waiting for the French as the tap path does. */
  const advanceAfterMic = (immediate: boolean) => {
    cancelAutoAdvance();
    if (immediate) { nextQuestion(); return; }
    scheduleAdvance();
  };

  /** A spoken answer goes through handleAnswerSelect, the same path a tap takes. */
  const handleMicOutcome = (o: MicOutcome) => {
    const opts = q?.answerOptions || [];
    if (o.via === "unheard" || o.optionIndex === null) { advanceAfterMic(true); return; }
    const i = o.correct ? opts.findIndex((x) => x.isCorrect) : o.optionIndex;
    if (i < 0 || i >= opts.length) { advanceAfterMic(true); return; }
    handleAnswerSelect(i);
    if (!o.correct) advanceAfterMic(false);
  };

  const toggleMic = () => {
    const on = !micOn;
    setMicOn(on); setShowOptionsFor(null);
    AsyncStorage.setItem(MIC_PREF, on ? "on" : "off").catch(() => {});
    if (on && !micIntroSeen) setShowMicIntro(true);
  };
  const closeMicPromo = (thenTry: boolean) => { setMicPromo("done"); if (thenTry && !micOn) toggleMic(); };
  const neverMicPromo = () => { setMicPromo("done"); AsyncStorage.setItem("mastersMicPromoNever", "true").catch(() => {}); };
  const dismissMicIntro = (never: boolean) => {
    setShowMicIntro(false);
    if (never) { setMicIntroSeen(true); AsyncStorage.setItem("mastersMicIntroShown", "true").catch(() => {}); }
  };

  /** Start Over and Try Again: the same ten questions, freshly shuffled, from the first. */
  const restart = () => {
    cancelAutoAdvance();
    answersRef.current = {};
    setRound((r) => r + 1);
    setIdx(0); setSelected(null); setConfirmed(false); setAnswers({}); setReviewIndex(null);
    setDone(false); setBalance(null); setWhyOpenFor(null); setShowOptionsFor(null);
  };

  if (done) {
    const total = questions.length;
    const pct = finalScore / Math.max(1, total);
    return (
      <View style={{ flex: 1, backgroundColor: "#1B2145" }}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={[styles.card, styles.cardNavy]}>
            <Text style={[styles.resultScore, styles.onNavy]}>{finalScore} / {total}</Text>
            <Text style={[styles.resultPct, styles.pctNavy]}>{Math.round(pct * 100)}%</Text>
            <Text style={[styles.resultMsg, styles.msgNavy]}>
              {pct >= 0.9 ? "Excellent! Vous êtes formidable! 🌟" : pct >= 0.7 ? "Great work! Keep practicing! 💪" : "Good effort — practice makes perfect! 📚"}
            </Text>
            {balance !== null && <CoinStack earned={finalScore} unitMax={total} balance={balance} muted={!sound} />}
            <Pressable style={styles.convoBtn} onPress={() => onDone({ score: finalScore, total, coins: finalScore })} accessibilityRole="button"
              accessibilityLabel="Start the conversation">
              <Ionicons name="chatbubbles" size={18} color="#1B2145" />
              <Text style={styles.convoBtnText}>Start the conversation</Text>
            </Pressable>
            <Pressable style={[styles.ghostBtn, styles.ghostNavy]} onPress={restart}>
              <Text style={[styles.ghostText, styles.ghostTextNavy]}>Try Again</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: micMode ? "#0A1326" : "#F7F8FA" }}>
      {/* Locked while Record is held, as in the quizzes (1.3.20). */}
      <ScrollView contentContainerStyle={styles.scroll} scrollEnabled={!micHolding}
        onLayout={(e) => setViewH(e.nativeEvent.layout.height)}>
        <View style={[styles.card, micMode && styles.cardMic, micMode && viewH > 0 && { minHeight: viewH - 16 - 24 }]}>
          <View style={styles.metaRow}>
            <Text style={[styles.meta, micMode && styles.metaMic]}>Question {dispIdx + 1} of {questions.length}</Text>
            <Text style={[styles.metaScore, micMode && styles.metaScoreMic]}>Score: {score} / {questions.length}</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${((dispIdx + 1) / questions.length) * 100}%` }]} />
          </View>

          {showTip && (
            <View style={styles.tipBox}>
              <Text style={styles.tipTitle}>💡 Quick Tip</Text>
              <Text style={styles.tipText}>Correct answers advance automatically — press Back anytime to review.</Text>
              <View style={styles.tipActions}>
                <Pressable onPress={() => setShowTip(false)}><Text style={styles.tipLink}>Dismiss</Text></Pressable>
                <Pressable onPress={() => { setShowTip(false); AsyncStorage.setItem("dontShowInstructionPopup", "true").catch(() => {}); }}>
                  <Text style={styles.tipLink}>Don&apos;t remind me again</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* Tense badge and the quiet qualifier, as in the conjugation quizzes (5 Nov 2026). */}
          <View style={[styles.tenseBadge, micMode && styles.tenseBadgeMic]}>
            <Text style={[styles.tenseBadgeText, micMode && styles.tenseBadgeTextMic]}>{dispQ.tense}</Text>
          </View>
          <Text style={[styles.qText, micMode && styles.qTextMic, micMode && !micControl && styles.qTextMicAnswered]}>
            {qParts.main}
            {!!qParts.qualifier && <Text style={[styles.qQualifier, micMode && styles.qQualifierMic]}>{" "}{qParts.qualifier}</Text>}
          </Text>
          {micMode && whyOpen && <Text style={styles.whyMicNote}>Options shown so you can follow the explanation.</Text>}

          {!optionsHidden && dispQ.answerOptions.map((o, i) => {
            const confirmedNow = dispSelected !== null && dispConfirmed;
            const isSel = dispSelected === i && confirmedNow;
            const showCorrect = confirmedNow && o.isCorrect;
            const showWrong = isSel && !o.isCorrect;
            const waitingForEnglish = reviewIndex === null && !confirmedNow && !englishDone;
            return (
              <Pressable key={o.text} onPress={() => handleAnswerSelect(i)} accessibilityRole="button"
                disabled={waitingForEnglish} accessibilityState={{ disabled: waitingForEnglish }}
                accessibilityLabel={`${String.fromCharCode(65 + i)}. ${o.text}`}
                style={[styles.opt, showCorrect && styles.optCorrect, showWrong && styles.optWrong, confirmedNow && !showCorrect && !showWrong && styles.optDim,
                  waitingForEnglish && { opacity: 0.4 }]}>
                <View style={[styles.letter, showCorrect && { borderColor: "#17734A" }, showWrong && { borderColor: "#C0392B" }]}>
                  <Text style={[styles.letterText, showCorrect && { color: "#17734A" }, showWrong && { color: "#C0392B" }]}>{String.fromCharCode(65 + i)}</Text>
                </View>
                <Text style={[styles.optText, showCorrect && styles.optTextCorrect, showWrong && styles.optTextWrong]} accessibilityLanguage="fr">{fr(o.text)}</Text>
                {micMode && showWrong && <Text style={styles.youSaid}>You said</Text>}
                {showCorrect && <Text style={[styles.youSaid, { color: "#17734A" }]}>✓ Correct</Text>}
              </Pressable>
            );
          })}

          {micControl && (
            <MastersMic
              key={`${round}-${dispIdx}`}
              expected={q.answer}
              options={q.answerOptions.map((o) => o.text)}
              correctIndex={q.answerOptions.findIndex((o) => o.isCorrect)}
              onOutcome={handleMicOutcome}
              onHoldChange={(h) => { setMicHolding(h); if (h) stopEnglish(); }}
              optionsShown={showOptionsFor === dispIdx}
              onToggleOptions={() => setShowOptionsFor((cur) => (cur === dispIdx ? null : dispIdx))}
              pronounce={{ verb: unit.verb, tense: q.tense, forms: quizForms }}
              fill
            />
          )}

          {dispSelected !== null && dispConfirmed && (
            <View style={[styles.feedback, dispQ.answerOptions[dispSelected].isCorrect ? styles.feedbackGood : styles.feedbackBad]}>
              <Text style={[styles.feedbackText, { color: dispQ.answerOptions[dispSelected].isCorrect ? "#17734A" : "#C0392B" }]}>
                {dispQ.answerOptions[dispSelected].isCorrect ? "✓" : "✗"} {dispQ.answerOptions[dispSelected].rationale}
              </Text>
              {!whyOpen && <AiWhyButton locked={whyLocked} onPress={openWhy} />}
            </View>
          )}

          {whyOpen && dispSelected !== null && dispConfirmed && (
            <AiWhyPanel key={dispIdx} dark={micMode}
              request={{
                question: dispQ.question, hint: "", level: LEVEL, tense: dispQ.tense,
                options: dispQ.answerOptions.map((o) => ({ text: o.text, isCorrect: o.isCorrect })),
                selectedIndex: dispSelected,
              }} />
          )}

          <View style={[styles.bottomRow, micMode && styles.bottomRowMic]}>
            <Pressable style={[styles.ghostBtn, micMode && styles.ghostBtnMic]} onPress={restart}>
              <Text style={[styles.ghostText, micMode && styles.ghostTextMic]}>Start Over</Text>
            </Pressable>
            <Pressable style={[styles.ghostBtn, micMode && styles.ghostBtnMic, ((reviewIndex ?? idx) === 0 || answers[(reviewIndex ?? idx) - 1] === undefined) && { opacity: 0.4 }]}
              onPress={() => { cancelAutoAdvance(); const di = reviewIndex ?? idx; if (di > 0 && answers[di - 1] !== undefined) setReviewIndex(di - 1); }}>
              <Text style={[styles.ghostText, micMode && styles.ghostTextMic]}>‹ Back</Text>
            </Pressable>
            <Pressable style={[styles.ghostBtn, micMode && styles.ghostBtnMic, (reviewIndex === null && !confirmed) && { opacity: 0.4 }]}
              onPress={() => { if (reviewIndex !== null) { const nxt = reviewIndex + 1; if (nxt >= idx) setReviewIndex(null); else setReviewIndex(nxt); } else if (confirmed) { nextQuestion(); } }}>
              <Text style={[styles.ghostText, micMode && styles.ghostTextMic]}>Next ›</Text>
            </Pressable>
          </View>

          <View style={styles.audioRow}>
            <Pressable onPress={() => setSound((s) => { if (s) { try { qPlayer.pause(); } catch {} } return !s; })}
              style={[styles.togglePill, sound ? styles.toggleOn : styles.toggleOff, micMode && styles.togglePillMic]}>
              <Text style={{ fontSize: 15 }}>{sound ? "🔊" : "🔇"}</Text>
              <Text style={[styles.toggleText, { color: micMode ? "#E2E9F7" : sound ? "#2B5FD9" : "#5A6472" }]}>{sound ? "Sound On" : "Sound Off"}</Text>
            </Pressable>
            {micEligible && (
              <Pressable onPress={toggleMic} accessibilityRole="switch" accessibilityState={{ checked: micOn }}
                accessibilityLabel="Masters Mic" accessibilityHint="Answer aloud instead of tapping. The options are hidden while it is on."
                style={[styles.togglePill, micOn ? styles.micOn : styles.toggleOff]}>
                <Ionicons name="mic" size={16} color={micOn ? "#06242E" : "#5A6472"} />
                <Text style={[styles.toggleText, { color: micOn ? "#06242E" : "#5A6472" }]}>{micOn ? "Mic On" : "Mic Off"}</Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>

      <Modal visible={micPromoVisible} transparent animationType="fade" onRequestClose={() => closeMicPromo(false)}>
        <View style={styles.modalBg}>
          <View style={[styles.modalCard, styles.promoCard]}>
            <View style={styles.promoTitleRow}>
              <Text style={[styles.modalTitle, styles.promoTitle]}>Say it aloud</Text>
            </View>
            <Text style={[styles.modalSub, styles.promoSub]}>Answer in spoken French with Masters Mic.</Text>
            <MicPromoDemo />
            <Pressable style={styles.promoPrimary} onPress={() => closeMicPromo(true)} accessibilityRole="button">
              <Text style={styles.guideBtnText}>Turn on Masters Mic</Text>
            </Pressable>
            <Pressable onPress={() => closeMicPromo(false)} accessibilityRole="button" style={styles.promoLater}>
              <Text style={styles.promoLaterText}>{"I'll tap my answers for now"}</Text>
            </Pressable>
            <Pressable onPress={neverMicPromo} accessibilityRole="button" hitSlop={8}>
              <Text style={styles.tipLink}>{"Don't remind me again"}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={showMicIntro} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalCard}>
            <View style={styles.micIntroIcon}><Ionicons name="mic" size={26} color="#2B5FD9" /></View>
            <Text style={styles.modalTitle}>Masters Mic</Text>
            <Text style={styles.modalSub}>Say the answer aloud instead of tapping it.</Text>
            <View style={styles.micIntroList}>
              <Text style={styles.micIntroItem}>1.  <Text style={styles.micIntroStrong}>Hold Record, wait a second, then speak.</Text> Starting too soon clips the first word.</Text>
              <Text style={styles.micIntroItem}>2.  Let go when you have finished. The four answers stay hidden, so you answer from memory.</Text>
              <Text style={styles.micIntroItem}>3.  Not happy with it? Just hold Record again - it records over your last attempt. Nothing to delete.</Text>
              <Text style={styles.micIntroItem}>4.  Press Enter to submit. Right or wrong, it moves straight to the next question.</Text>
            </View>
            <Pressable style={styles.guideBtn} onPress={() => dismissMicIntro(false)}>
              <Text style={styles.guideBtnText}>Dismiss</Text>
            </Pressable>
            <Pressable onPress={() => dismissMicIntro(true)}>
              <Text style={styles.tipLink}>Don&apos;t remind me again</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Copied from app/quiz.tsx so the two screens look the same. Change both together.
const styles = StyleSheet.create({
  scroll: { padding: 16, paddingBottom: 40 },
  card: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E3E6EA", borderRadius: 24, padding: 18 },
  cardNavy: { backgroundColor: "#1B2145", borderColor: "#1B2145" },
  onNavy: { color: "#FFFFFF" },
  pctNavy: { color: "#5FD39A" },
  msgNavy: { color: "#C3CAD4" },
  ghostNavy: { borderColor: "rgba(255,255,255,0.35)" },
  ghostTextNavy: { color: "#E6E9EE" },
  metaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  meta: { color: "#5A6472", fontSize: 13 },
  metaScore: { color: "#5A6472", fontSize: 13, fontWeight: "600" },
  progressTrack: { height: 8, backgroundColor: "#E3E6EA", borderRadius: 8, overflow: "hidden", marginBottom: 18 },
  progressFill: { height: 8, borderRadius: 8, backgroundColor: "#2B5FD9" },
  tipBox: { backgroundColor: "#EAF0FC", borderWidth: 2, borderColor: "#2B5FD9", borderRadius: 14, padding: 14, marginBottom: 16 },
  tipTitle: { color: "#3A4354", fontWeight: "700", fontSize: 16 },
  tipText: { color: "#3A4354", fontSize: 14, marginTop: 3 },
  tipActions: { flexDirection: "row", gap: 18, marginTop: 8 },
  tipLink: { color: "#2B5FD9", fontSize: 13, textAlign: "center", paddingTop: 6 },
  qText: { color: "#3A4354", fontSize: 20, fontWeight: "700", marginBottom: 24, lineHeight: 28 },
  opt: { flexDirection: "row", alignItems: "center", borderWidth: 2, borderColor: "#C6CCD4", backgroundColor: "#FFFFFF", borderRadius: 14, padding: 14, marginBottom: 12 },
  optCorrect: { borderColor: "#17734A", backgroundColor: "#E7F3EC" },
  optWrong: { borderColor: "#C0392B", backgroundColor: "#F9ECEA" },
  optDim: { opacity: 0.55 },
  optTextCorrect: { color: "#0F5A38", fontWeight: "700" },
  optTextWrong: { color: "#9B2C20", fontWeight: "600" },
  letter: { width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: "#8A93A0", alignItems: "center", justifyContent: "center", marginRight: 14 },
  letterText: { color: "#5A6472", fontSize: 13, fontWeight: "700" },
  optText: { color: "#3A4354", fontSize: 16, fontWeight: "500", flex: 1 },
  feedback: { borderWidth: 1, borderRadius: 14, padding: 14, marginBottom: 16 },
  feedbackGood: { borderColor: "#17734A", backgroundColor: "#E7F3EC" },
  feedbackBad: { borderColor: "#C0392B", backgroundColor: "#F9ECEA" },
  feedbackText: { fontSize: 14, lineHeight: 20 },
  bottomRow: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 14, marginTop: 16 },
  audioRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 2 },
  ghostBtn: { borderWidth: 1, borderColor: "#C6CCD4", borderRadius: 12, paddingVertical: 12, paddingHorizontal: 20, alignItems: "center", marginTop: 8 },
  ghostText: { color: "#5A6472", fontSize: 15 },
  togglePill: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderRadius: 12, paddingVertical: 11, paddingHorizontal: 14, marginTop: 8 },
  toggleOn: { backgroundColor: "#EAF0FC", borderColor: "#2B5FD9" },
  toggleOff: { backgroundColor: "#F0F2F5", borderColor: "#C6CCD4" },
  toggleText: { fontSize: 13, fontWeight: "700" },
  resultScore: { color: "#3A4354", fontSize: 44, fontWeight: "700", textAlign: "center" },
  resultPct: { color: "#17734A", fontSize: 22, fontWeight: "600", textAlign: "center", marginBottom: 8 },
  resultMsg: { color: "#5A6472", fontSize: 16, textAlign: "center", marginBottom: 10 },
  convoBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#F5F6F8", borderRadius: 14, paddingVertical: 14, marginTop: 14, marginBottom: 4 },
  convoBtnText: { color: "#1B2145", fontSize: 16, fontWeight: "800" },
  modalBg: { flex: 1, backgroundColor: "rgba(0,0,0,0.7)", justifyContent: "center", padding: 24 },
  modalCard: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E3E6EA", borderRadius: 18, padding: 20 },
  modalTitle: { color: "#3A4354", fontSize: 20, fontWeight: "700", textAlign: "center", marginBottom: 6 },
  modalSub: { color: "#5A6472", fontSize: 14, textAlign: "center", marginBottom: 14 },
  guideBtn: { backgroundColor: "#17734A", borderRadius: 12, paddingVertical: 13, alignItems: "center", marginTop: 10, marginBottom: 6 },
  guideBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  cardMic: { backgroundColor: "#10203F", borderColor: "#2E4270" },
  metaMic: { color: "#A8B8D6" },
  metaScoreMic: { color: "#FFFFFF" },
  qTextMic: { color: "#FFFFFF", fontSize: 28, lineHeight: 34, letterSpacing: -0.4, marginBottom: 0 },
  qTextMicAnswered: { marginBottom: 25 },
  qQualifier: { fontSize: 14, fontWeight: "500", fontStyle: "italic", color: "#5A6472", letterSpacing: 0 },
  qQualifierMic: { fontSize: 15, color: "#A8B8D6" },
  tenseBadge: { alignSelf: "flex-start", marginTop: -4, marginBottom: 10, borderRadius: 12, borderWidth: 1,
    borderColor: "#C9D7F5", backgroundColor: "#EAF0FC", paddingVertical: 3, paddingHorizontal: 10 },
  tenseBadgeMic: { borderColor: "#5B8DEF", backgroundColor: "rgba(91,141,239,0.16)" },
  tenseBadgeText: { color: "#2B5FD9", fontSize: 12, fontWeight: "800", letterSpacing: 0.2 },
  tenseBadgeTextMic: { color: "#A9C2FF" },
  bottomRowMic: { marginTop: 8 },
  ghostBtnMic: { borderColor: "#2E4270", backgroundColor: "transparent" },
  togglePillMic: { borderColor: "#2E4270", backgroundColor: "transparent" },
  ghostTextMic: { color: "#E2E9F7" },
  micOn: { backgroundColor: "#22D3EE", borderColor: "#22D3EE" },
  whyMicNote: { color: "#A8B8D6", fontSize: 13, lineHeight: 18, marginTop: -8, marginBottom: 12 },
  youSaid: { marginLeft: 8, fontSize: 12, fontWeight: "700", color: "#B03426" },
  micIntroIcon: { width: 56, height: 56, borderRadius: 28, alignSelf: "center", alignItems: "center", justifyContent: "center", backgroundColor: "#EAF1FD", marginBottom: 14 },
  micIntroList: { marginTop: 16, gap: 10, alignSelf: "stretch" },
  micIntroItem: { fontSize: 14, lineHeight: 20, color: "#334155" },
  micIntroStrong: { fontWeight: "700", color: "#1B1F24" },
  promoCard: { alignItems: "center" },
  promoTitleRow: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 },
  promoSub: { marginBottom: 6 },
  promoTitle: { color: "#1B1F24", fontSize: 22, fontWeight: "800", marginBottom: 0 },
  promoPrimary: { alignSelf: "stretch", height: 52, borderRadius: 14, backgroundColor: "#2B5FD9", alignItems: "center", justifyContent: "center", marginTop: 14 },
  promoLater: { alignSelf: "stretch", height: 44, alignItems: "center", justifyContent: "center", marginTop: 4 },
  promoLaterText: { color: "#4A5361", fontSize: 15, fontWeight: "600" },
});
