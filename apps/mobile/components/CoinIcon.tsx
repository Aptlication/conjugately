import React from "react";
import { View } from "react-native";

/**
 * The app's coin, drawn (Jonathan, 23 Oct 2026: "the coin colour has to match
 * gold or silver"). Same gold as the falling coins in CoinStack.tsx, so every
 * coin in the app matches; the 🪙 emoji is drawn differently by each platform.
 * Works inline inside <Text>.
 */
export const COIN_GOLD = { face: "#F5C518", rim: "#B8860B", ring: "#FFE58A" };

export default function CoinIcon({ size = 16 }: { size?: number }) {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={{
        width: size, height: size, borderRadius: size / 2,
        backgroundColor: COIN_GOLD.face, borderWidth: Math.max(1.5, size * 0.1), borderColor: COIN_GOLD.rim,
        alignItems: "center", justifyContent: "center", transform: [{ translateY: size * 0.12 }],
      }}>
      <View style={{ width: size * 0.5, height: size * 0.5, borderRadius: size, borderWidth: Math.max(1, size * 0.08), borderColor: COIN_GOLD.ring }} />
    </View>
  );
}
