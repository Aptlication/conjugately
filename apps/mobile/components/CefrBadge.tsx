import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import type { CefrId } from "@shared/cefrTests";

/**
 * The CEFR-style badge (1.3.10, design agreed 25 Oct 2026): a gold-rimmed crest
 * in the level's colour, stars for rank (A1 ★, A2 ★★, B1 ★★★) and the level
 * letters large inside. Unearned badges are greyed, stars still visible.
 *
 * The shape is a bundled SVG (assets/badges); the letters are real Text laid
 * over it, so they stay sharp and are read by VoiceOver through the label.
 */

const ART: Record<CefrId, { on: number; off: number }> = {
  A1: { on: require("../assets/badges/cefr-a1.svg"), off: require("../assets/badges/cefr-a1-off.svg") },
  A2: { on: require("../assets/badges/cefr-a2.svg"), off: require("../assets/badges/cefr-a2-off.svg") },
  B1: { on: require("../assets/badges/cefr-b1.svg"), off: require("../assets/badges/cefr-b1-off.svg") },
};

type Props = {
  id: CefrId;
  earned: boolean;
  /** Width in points; the crest is 10:9 tall. */
  size?: number;
  /** Overrides the default VoiceOver label; "" hides the badge from VoiceOver (the parent describes it). */
  label?: string;
};

export default function CefrBadge({ id, earned, size = 48, label }: Props) {
  const w = size;
  const h = Math.round((size * 100) / 90);
  const art = ART[id];
  if (!art) return null;
  return (
    <View
      style={{ width: w, height: h }}
      accessible={label !== ""}
      importantForAccessibility={label === "" ? "no-hide-descendants" : "auto"}
      accessibilityElementsHidden={label === ""}
      accessibilityRole="image"
      accessibilityLabel={label || `${id} badge, ${earned ? "earned" : "not earned yet"}`}
    >
      <Image source={earned ? art.on : art.off} style={StyleSheet.absoluteFill} contentFit="contain" />
      {w >= 80 && (
        <Text style={[s.band, { top: h * 0.305, fontSize: w * 0.062, letterSpacing: w * 0.013 }]} allowFontScaling={false}>
          CEFR
        </Text>
      )}
      <View style={[s.letters, { top: h * 0.42, height: h * 0.30 }]}>
        <Text style={[s.id, { fontSize: w * 0.245 }]} numberOfLines={1} allowFontScaling={false}>{id}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  band: { position: "absolute", left: 0, right: 0, textAlign: "center", color: "#FFFFFF", fontWeight: "800" },
  letters: { position: "absolute", left: 0, right: 0, alignItems: "center", justifyContent: "center" },
  id: { color: "#FFFFFF", fontWeight: "900" },
});
