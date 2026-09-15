/**
 * Masters Mic matcher harness — staging only.
 *
 * Reachable at preview.conjugately.com/matcher. It runs the real shared matcher
 * over the fixture set and sweeps the accept band, so the threshold can be
 * chosen from numbers rather than from feel. A browser has no Apple Speech
 * framework, which is exactly why the matcher is separate from the recogniser:
 * this page tunes the half that staging can actually run.
 *
 * Not linked from anywhere in the app. It ships in the web export only; keep it
 * out of any navigation.
 */

import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import {
  DEFAULT_THRESHOLDS,
  matchAnswer,
  type MatchBand,
  type MatchThresholds,
} from "@shared/answerMatch";
import { MATCHER_FIXTURES } from "@shared/answerMatch.fixtures";

const BAND_COLOUR: Record<MatchBand, string> = {
  accept: "#1f8a5c",
  disambiguate: "#a8780d",
  retry: "#b3402f",
  unheard: "#6b7280",
};

function sweep(floor: number, disambiguateAt: number) {
  const rows: { acceptAt: number; annoying: number; corrosive: number; wrong: number }[] = [];
  for (let a = 0.78; a <= 0.9701; a += 0.01) {
    const thresholds: MatchThresholds = { confidenceFloor: floor, acceptAt: a, disambiguateAt };
    let annoying = 0;
    let corrosive = 0;
    let wrong = 0;
    for (const f of MATCHER_FIXTURES) {
      const r = matchAnswer(f.transcript, f.expected, f.confidence, thresholds);
      if (r.band !== f.want) wrong++;
      if (f.want === "accept" && r.band !== "accept") annoying++;
      if (f.want !== "accept" && f.want !== "unheard" && r.band === "accept") corrosive++;
    }
    rows.push({ acceptAt: a, annoying, corrosive, wrong });
  }
  return rows;
}

export default function MatcherHarness() {
  const [acceptAt, setAcceptAt] = useState(String(DEFAULT_THRESHOLDS.acceptAt));
  const [disambiguateAt, setDisambiguateAt] = useState(String(DEFAULT_THRESHOLDS.disambiguateAt));
  const [floor, setFloor] = useState(String(DEFAULT_THRESHOLDS.confidenceFloor));
  const [tryHeard, setTryHeard] = useState("je ai parle");
  const [tryExpected, setTryExpected] = useState("j'ai parlé");

  const thresholds: MatchThresholds = {
    acceptAt: Number(acceptAt) || DEFAULT_THRESHOLDS.acceptAt,
    disambiguateAt: Number(disambiguateAt) || DEFAULT_THRESHOLDS.disambiguateAt,
    confidenceFloor: Number(floor) || DEFAULT_THRESHOLDS.confidenceFloor,
  };

  const results = useMemo(
    () => MATCHER_FIXTURES.map((f) => ({ f, r: matchAnswer(f.transcript, f.expected, f.confidence, thresholds) })),
    [thresholds.acceptAt, thresholds.disambiguateAt, thresholds.confidenceFloor],
  );
  const mismatches = results.filter(({ f, r }) => r.band !== f.want).length;

  const sweepRows = useMemo(
    () => sweep(thresholds.confidenceFloor, thresholds.disambiguateAt),
    [thresholds.confidenceFloor, thresholds.disambiguateAt],
  );

  const live = matchAnswer(tryHeard, tryExpected, 1, thresholds);

  return (
    <ScrollView style={s.page} contentContainerStyle={s.content}>
      <Text style={s.h1}>Matcher harness</Text>
      <Text style={s.sub}>
        Staging only. Runs the shared matcher over {MATCHER_FIXTURES.length} fixtures.
        Per-answer scale — unrelated to the 90% exam pass mark.
      </Text>

      <View style={s.controls}>
        <Field label="Accept at" value={acceptAt} onChange={setAcceptAt} />
        <Field label="Disambiguate at" value={disambiguateAt} onChange={setDisambiguateAt} />
        <Field label="Confidence floor" value={floor} onChange={setFloor} />
      </View>

      <Text style={[s.h2, mismatches === 0 ? s.ok : s.bad]}>
        {mismatches === 0 ? "All fixtures agree" : `${mismatches} fixture(s) disagree`}
      </Text>

      {results.map(({ f, r }, i) => (
        <View key={i} style={[s.row, r.band !== f.want && s.rowBad]}>
          <Text style={[s.band, { color: BAND_COLOUR[r.band] }]}>{r.band}</Text>
          <View style={s.rowBody}>
            <Text style={s.note}>{f.note}</Text>
            <Text style={s.detail}>
              want {f.want} · sim {r.similarity.toFixed(3)} · conf {f.confidence}
              {r.accentOnly ? " · accent-only" : ""}
            </Text>
            <Text style={s.detail}>
              “{f.transcript || "(silence)"}” → “{f.expected}”
            </Text>
          </View>
        </View>
      ))}

      <Text style={s.h2}>Accept-band sweep</Text>
      <Text style={s.sub}>
        Annoying = a correct answer sent to disambiguation. Corrosive = a wrong answer accepted
        as right. Bias toward the higher band when they tie.
      </Text>
      <View style={s.sweepHead}>
        <Text style={s.sweepCell}>accept</Text>
        <Text style={s.sweepCell}>annoying</Text>
        <Text style={s.sweepCell}>corrosive</Text>
        <Text style={s.sweepCell}>wrong</Text>
      </View>
      {sweepRows.map((row) => (
        <View
          key={row.acceptAt.toFixed(2)}
          style={[s.sweepRow, row.wrong === 0 && s.sweepClean]}
        >
          <Text style={s.sweepCell}>{row.acceptAt.toFixed(2)}</Text>
          <Text style={s.sweepCell}>{row.annoying}</Text>
          <Text style={s.sweepCell}>{row.corrosive}</Text>
          <Text style={s.sweepCell}>{row.wrong}</Text>
        </View>
      ))}

      <Text style={s.h2}>Try one</Text>
      <View style={s.controls}>
        <Field label="Heard" value={tryHeard} onChange={setTryHeard} wide />
        <Field label="Expected" value={tryExpected} onChange={setTryExpected} wide />
      </View>
      <Text style={[s.band, { color: BAND_COLOUR[live.band] }]}>{live.band}</Text>
      <Text style={s.detail}>
        similarity {live.similarity.toFixed(3)} · distance {live.distance}
        {live.accentOnly ? " · differs only in accents" : ""}
      </Text>
      <Text style={s.detail}>
        normalised: “{live.heard}” vs “{live.expected}”
      </Text>
    </ScrollView>
  );
}

function Field(props: { label: string; value: string; onChange: (v: string) => void; wide?: boolean }) {
  return (
    <View style={[s.field, props.wide && s.fieldWide]}>
      <Text style={s.label}>{props.label}</Text>
      <TextInput
        style={s.input}
        value={props.value}
        onChangeText={props.onChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";

const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: "#0f1117" },
  content: { padding: 20, paddingBottom: 60, maxWidth: 820, width: "100%", alignSelf: "center" },
  h1: { color: "#eceff6", fontSize: 24, fontWeight: "700" },
  h2: { color: "#eceff6", fontSize: 16, fontWeight: "600", marginTop: 28, marginBottom: 8 },
  ok: { color: "#63c596" },
  bad: { color: "#eb8375" },
  sub: { color: "#aeb6c8", fontSize: 13, marginTop: 6, marginBottom: 14, lineHeight: 19 },
  controls: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 18 },
  field: { minWidth: 130, flexGrow: 1 },
  fieldWide: { minWidth: 240 },
  label: { color: "#78819a", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  input: {
    backgroundColor: "#1a1f2c", color: "#eceff6", borderRadius: 4, paddingHorizontal: 10,
    paddingVertical: 8, fontFamily: mono, fontSize: 14, borderWidth: 1, borderColor: "#2a3040",
  },
  row: { flexDirection: "row", gap: 12, paddingVertical: 9, borderBottomWidth: 1, borderBottomColor: "#1c2230" },
  rowBad: { backgroundColor: "#2a1512" },
  rowBody: { flex: 1 },
  band: { fontFamily: mono, fontSize: 12, width: 104, fontWeight: "600" },
  note: { color: "#eceff6", fontSize: 13.5 },
  detail: { color: "#8b93a7", fontSize: 12, fontFamily: mono, marginTop: 2 },
  sweepHead: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#2a3040", paddingBottom: 5 },
  sweepRow: { flexDirection: "row", paddingVertical: 3 },
  sweepClean: { backgroundColor: "#12301f" },
  sweepCell: { flex: 1, color: "#aeb6c8", fontFamily: mono, fontSize: 12 },
});
