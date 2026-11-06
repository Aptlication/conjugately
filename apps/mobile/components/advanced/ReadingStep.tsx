import React, { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { ADVANCED_PHRASES, lexFor } from "@shared/advanced/content";
import { tokenize } from "@shared/advanced/tokenize";
import { articleClip, wordClip } from "@shared/advanced/audioKeys";
import type { AdvUnit, LexEntry } from "@shared/advanced/types";
import { hasClip } from "../../lib/advancedPlayer";
import { addToMyWords, fromLex, removeFromMyWords } from "../../lib/advanced";

/**
 * Read (Advanced units). Tap a word for its English; double-tap to add it to
 * your words (every word can be added, Jonathan 31 Oct 2026). A saved word is
 * lightly highlighted; nothing else is marked (no dotted underlines).
 *
 * 1.4.1.3 (Jonathan, 3 Nov 2026), while the article is being read aloud:
 * - double-tap adds the word to your words AND straight to the Vocab section
 *   (My Words), without stopping the reading. A short "Added" note confirms
 *   it. Double-tap only adds; a word is removed with its ✕ or the word card.
 * - single tap stops the reading, then shows the word and says it.
 */

const INK = "#1B2145";
const SOFT = "#5A6390";
const BLUE = "#2B5FD9";
const BLUE_SOFT = "#E3EAFD";
const DOUBLE_TAP_MS = 300;

export default function ReadingStep({ unit, saved, onToggle, onDone, onHowTo, play, stop }: {
  unit: AdvUnit;
  saved: LexEntry[];
  onToggle: (e: LexEntry) => void;
  onDone: () => void;
  onHowTo: () => void;
  play: (items: { key: string; text: string }[], onEnd?: () => void) => void;
  stop: () => void;
}) {
  const pieces = useMemo(() => tokenize(unit.text, ADVANCED_PHRASES), [unit.text]);
  const [sheet, setSheet] = useState<LexEntry | null>(null);
  const [showEn, setShowEn] = useState(false);
  const [listening, setListening] = useState(false);
  const last = useRef<{ i: number; at: number } | null>(null);
  const single = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedSet = new Set(saved.map((s) => s.fr));
  const [toast, setToast] = useState<string | null>(null);
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    if (single.current) clearTimeout(single.current);
  }, []);

  const flash = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    Animated.timing(toastOpacity, { toValue: 1, duration: 120, useNativeDriver: true }).start();
    toastTimer.current = setTimeout(() => {
      Animated.timing(toastOpacity, { toValue: 0, duration: 250, useNativeDriver: true }).start(() => setToast(null));
    }, 1400);
  };

  /** Add to the tray and the Vocab section. Never touches the reading audio. */
  const add = (e: LexEntry) => {
    if (savedSet.has(e.fr)) { flash(`Already in your words: ${e.fr}`); return; }
    onToggle(e);
    addToMyWords([fromLex(e)], unit.id, "new").catch(() => {});
    flash(`Added to Vocab: ${e.fr}`);
  };
  /** Take out of the tray, and out of the Vocab section if this unit put it there. */
  const remove = (e: LexEntry) => {
    if (!savedSet.has(e.fr)) return;
    onToggle(e);
    removeFromMyWords(e.fr, unit.id).catch(() => {});
  };

  const say = (e: LexEntry) => play([{ key: wordClip(e.fr), text: e.fr }]);

  const onWord = (i: number, key: string) => {
    const e = lexFor(unit.id, key);
    if (!e) return;
    const now = Date.now();
    if (last.current && last.current.i === i && now - last.current.at < DOUBLE_TAP_MS) {
      if (single.current) clearTimeout(single.current);
      single.current = null; last.current = null;
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
      add(e);
      return;
    }
    last.current = { i, at: now };
    if (single.current) clearTimeout(single.current);
    // Single tap: interrupt the reading, then show and say the word.
    single.current = setTimeout(() => {
      single.current = null;
      if (listening) { stop(); setListening(false); }
      setSheet(e); say(e);
    }, DOUBLE_TAP_MS);
  };

  const listen = () => {
    if (listening) { stop(); setListening(false); return; }
    setListening(true);
    play([{ key: articleClip(unit.id), text: unit.text }], () => setListening(false));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title} accessibilityRole="header">{unit.title}</Text>
        <Text style={styles.sub}>{unit.titleEn} · {unit.grammar}</Text>
        <View style={styles.tools}>
          {hasClip(articleClip(unit.id)) && (
            <Pressable style={styles.tool} onPress={listen} accessibilityRole="button">
              <Ionicons name={listening ? "stop" : "volume-high"} size={16} color={BLUE} />
              <Text style={styles.toolText}>{listening ? "Stop" : "Listen"}</Text>
            </Pressable>
          )}
          <Pressable style={styles.tool} onPress={onHowTo} accessibilityRole="button">
            <Ionicons name="play-circle" size={16} color={BLUE} />
            <Text style={styles.toolText}>How it works</Text>
          </Pressable>
          <Pressable style={styles.tool} onPress={() => setShowEn((x) => !x)} accessibilityRole="button">
            <Text style={styles.toolText}>{showEn ? "Hide English" : "Show English"}</Text>
          </Pressable>
        </View>

        <View style={styles.article}>
          <Text style={styles.text} accessibilityLanguage="fr">
            {pieces.map((p, i) => p.kind === "gap"
              ? <Text key={i}>{p.text}</Text>
              : (
                <Text key={i} onPress={() => onWord(i, p.key)}
                  suppressHighlighting={false}
                  style={savedSet.has(lexFor(unit.id, p.key)?.fr ?? "") ? styles.saved : undefined}>
                  {p.text}
                </Text>
              ))}
          </Text>
          {showEn && <Text style={styles.en}>{unit.textEn}</Text>}
        </View>

        <Text style={styles.trayLabel}>YOUR WORDS · {saved.length}</Text>
        <View style={styles.chips}>
          {saved.length ? saved.map((s) => (
            <Pressable key={s.fr} style={styles.chip} onPress={() => remove(s)} accessibilityLabel={`Remove ${s.fr}`}>
              <Text style={styles.chipText}>{s.fr}  ✕</Text>
            </Pressable>
          )) : <Text style={styles.empty}>Nothing saved yet. Double-tap any word you don’t know.</Text>}
        </View>
      </ScrollView>

      {toast && (
        <Animated.View pointerEvents="none" style={[styles.toast, { opacity: toastOpacity }]} accessibilityLiveRegion="polite">
          <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
          <Text style={styles.toastText} numberOfLines={1}>{toast}</Text>
        </Animated.View>
      )}

      {sheet && (
        <View style={styles.sheet} accessibilityViewIsModal>
          <View style={styles.sheetHead}>
            <Text style={styles.hw} accessibilityLanguage="fr">{sheet.fr}</Text>
            <Pressable onPress={() => say(sheet)} hitSlop={10} accessibilityLabel={`Hear ${sheet.fr}`} style={styles.speaker}>
              <Ionicons name="volume-high" size={20} color={BLUE} />
            </Pressable>
          </View>
          <Text style={styles.gloss}>{sheet.en}</Text>
          {!!sheet.form && <Text style={styles.form}>In the text: {sheet.form}</Text>}
          <View style={styles.sheetRow}>
            <Pressable style={[styles.btn, !savedSet.has(sheet.fr) && styles.btnPrimary]}
              onPress={() => { if (savedSet.has(sheet.fr)) remove(sheet); else add(sheet); setSheet(null); }} accessibilityRole="button">
              <Text style={[styles.btnText, !savedSet.has(sheet.fr) && { color: "#FFFFFF" }]}>
                {savedSet.has(sheet.fr) ? "Remove from my words" : "+ Add to my words"}
              </Text>
            </Pressable>
            <Pressable style={styles.btn} onPress={() => setSheet(null)} accessibilityRole="button">
              <Text style={styles.btnText}>Close</Text>
            </Pressable>
          </View>
        </View>
      )}

      {!sheet && (
        <View style={styles.footer}>
          <Pressable style={styles.primary} onPress={() => { stop(); onDone(); }} accessibilityRole="button">
            <Text style={styles.primaryText}>I’ve finished reading →</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  body: { padding: 20, paddingBottom: 40 },
  title: { color: INK, fontSize: 28, fontWeight: "800", marginTop: 4 },
  sub: { color: SOFT, fontSize: 14, marginTop: 2, marginBottom: 12 },
  // Half the old 12 pt gap between the buttons and the text (Jonathan, 7 Nov 2026).
  tools: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 6 },
  tool: { flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderColor: "#DDE5F7", borderRadius: 18,
    paddingVertical: 7, paddingHorizontal: 12, backgroundColor: "#FFFFFF" },
  toolText: { color: BLUE, fontSize: 14, fontWeight: "700" },
  article: { backgroundColor: "#FFFFFF", borderRadius: 18, borderWidth: 1, borderColor: "#E3E8F3", padding: 18 },
  text: { color: INK, fontSize: 20, lineHeight: 34, fontFamily: "Georgia" },
  saved: { backgroundColor: BLUE_SOFT, color: "#173A9A", textDecorationLine: "underline", textDecorationColor: BLUE },
  en: { color: SOFT, fontSize: 15, lineHeight: 22, marginTop: 14, borderLeftWidth: 3, borderLeftColor: "#E3E8F3", paddingLeft: 10 },
  trayLabel: { color: SOFT, fontSize: 12, fontWeight: "800", letterSpacing: 1, marginTop: 18, marginBottom: 8 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: { borderWidth: 1, borderColor: BLUE, borderRadius: 14, paddingVertical: 6, paddingHorizontal: 12, backgroundColor: "#FFFFFF" },
  chipText: { color: BLUE, fontSize: 15, fontWeight: "700" },
  empty: { color: "#7A83A8", fontSize: 14 },
  sheet: { position: "absolute", left: 0, right: 0, bottom: 0, backgroundColor: "#FFFFFF", borderTopLeftRadius: 20, borderTopRightRadius: 20,
    padding: 20, paddingBottom: 40, gap: 6, shadowColor: "#000", shadowOpacity: 0.18, shadowRadius: 18, shadowOffset: { width: 0, height: -6 }, elevation: 12 },
  sheetHead: { flexDirection: "row", alignItems: "center", gap: 10 },
  hw: { color: INK, fontSize: 24, fontWeight: "800", flexShrink: 1 },
  speaker: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: "#DDE5F7", alignItems: "center", justifyContent: "center" },
  gloss: { color: INK, fontSize: 17 },
  form: { color: SOFT, fontSize: 14, fontStyle: "italic" },
  sheetRow: { flexDirection: "row", gap: 10, marginTop: 10, flexWrap: "wrap" },
  btn: { borderWidth: 1, borderColor: "#DDE5F7", borderRadius: 14, paddingVertical: 11, paddingHorizontal: 16 },
  btnPrimary: { backgroundColor: BLUE, borderColor: BLUE },
  btnText: { color: INK, fontSize: 15, fontWeight: "700" },
  toast: { position: "absolute", alignSelf: "center", bottom: 110, flexDirection: "row", alignItems: "center", gap: 6,
    backgroundColor: "rgba(27,33,69,0.92)", borderRadius: 18, paddingVertical: 8, paddingHorizontal: 14, maxWidth: "90%" },
  toastText: { color: "#FFFFFF", fontSize: 14, fontWeight: "700", flexShrink: 1 },
  footer: { paddingHorizontal: 22, paddingTop: 10, paddingBottom: 36, backgroundColor: "#F7F9FD" },
  primary: { backgroundColor: BLUE, borderRadius: 26, paddingVertical: 16, alignItems: "center" },
  primaryText: { color: "#FFFFFF", fontSize: 18, fontWeight: "800" },
});
