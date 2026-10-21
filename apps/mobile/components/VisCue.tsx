import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { CheckWord } from "../lib/vocabCheck";

/**
 * The VIS-CUE picture clue: the word's emoji in a plain circle.
 * Approved 21 Oct 2026 — emoji only, no gender props, scene or mnemonic.
 * A two-emoji clue (📅⬅️) is drawn smaller so it fits.
 */
export default function VisCue({ word, size = 200 }: { word: CheckWord; size?: number }) {
  const count = graphemes(word.emoji);
  const fontSize = (count > 1 ? 66 : 104) * (size / 200);
  return (
    <View style={[styles.stage, { width: size, height: size, borderRadius: size / 2 }]}
      accessible accessibilityRole="image" accessibilityLabel="Picture clue">
      <Text style={{ fontSize, lineHeight: fontSize * 1.2, textAlign: "center" }}>{word.emoji}</Text>
    </View>
  );
}

/** Emoji count, treating a ZWJ family (👨‍👩‍👧‍👦) or a flag as one. */
function graphemes(s: string): number {
  const Seg = (Intl as any)?.Segmenter;
  if (Seg) return [...new Seg(undefined, { granularity: "grapheme" }).segment(s)].length;
  // Hermes may lack Intl.Segmenter: count pictographs, skipping any joined on by a ZWJ.
  let n = 0, joined = false;
  for (const ch of Array.from(s)) {
    const cp = ch.codePointAt(0) ?? 0;
    if (cp === 0x200d) { joined = true; continue; }
    if (cp === 0x20e3) { n++; continue; } // keycap: 6️⃣ is "6" + VS16 + U+20E3
    const pict = cp >= 0x1f000 || (cp >= 0x2190 && cp <= 0x2bff) || (cp >= 0x2600 && cp <= 0x27bf);
    if (pict) { if (!joined) n++; joined = false; }
  }
  return Math.max(1, n);
}

const styles = StyleSheet.create({
  stage: { alignItems: "center", justifyContent: "center", borderWidth: 3,
    backgroundColor: "#FFF6DA", borderColor: "#F2C94C" },
});
