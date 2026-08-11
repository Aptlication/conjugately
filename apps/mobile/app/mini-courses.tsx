import NavBar from "../components/NavBar";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { COURSES, COURSE_TIME_FRAMES } from "../lib/courses";

export default function MiniCourses() {
  const [level, setLevel] = useState<string | null>(null);
  const [timeFrame, setTimeFrame] = useState<string | null>(null);
  const course = level ? COURSES[level] : null;

  return (
    <LinearGradient colors={["#1B2145", "#1B2145"]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.h1}>📚 Mini-Courses</Text>

        {!level && (
          <View style={styles.card}>
            <Text style={styles.blurb}>Choose a difficulty level for structured learning</Text>
            {Object.entries(COURSES).map(([key, c]) => (
              <Pressable key={key} style={styles.row} onPress={() => setLevel(key)}>
                <Text style={styles.rowTitle}>{c.emoji} {c.title}</Text>
                <Text style={styles.rowSub}>{c.blurb}</Text>
              </Pressable>
            ))}
            <Pressable style={[styles.row, { opacity: 0.5 }]}>
              <Text style={styles.rowTitle}>🔒 Advanced Course</Text>
              <Text style={styles.rowSub}>Coming Soon!</Text>
            </Pressable>
          </View>
        )}

        {level && !timeFrame && (
          <View style={styles.card}>
            <Text style={styles.blurb}>{course!.emoji} {course!.title} — choose a time frame</Text>
            {COURSE_TIME_FRAMES.map((tf) => (
              <Pressable key={tf} style={styles.row} onPress={() => setTimeFrame(tf)}>
                <Text style={styles.rowTitle}>{tf}</Text>
              </Pressable>
            ))}
            <Pressable onPress={() => setLevel(null)}><Text style={styles.back}>← Back to levels</Text></Pressable>
          </View>
        )}

        {level && timeFrame && (
          <View style={styles.card}>
            <Text style={styles.blurb}>{course!.emoji} {course!.title} · {timeFrame}</Text>
            {course!.units.map((u) => (
              <Pressable key={u.name} style={styles.row}
                onPress={() => router.push({ pathname: "/quiz",
                  params: { difficulty: level, verb: u.verb, timeFrame,
                    courseKey: `${level}|${timeFrame}`, unitIndex: String(course!.units.indexOf(u)) } })}>
                <Text style={styles.rowTitle}>{u.name}</Text>
                <Text style={styles.rowSub}>{u.questions} questions</Text>
              </Pressable>
            ))}
            <View style={[styles.row, { opacity: 0.55 }]}>
              <Text style={styles.rowTitle}>🎓 Final Exam</Text>
              <Text style={styles.rowSub}>{course!.finalExam.description} — arrives in the next update</Text>
            </View>
            <Pressable onPress={() => setTimeFrame(null)}><Text style={styles.back}>← Back to time frames</Text></Pressable>
          </View>
        )}

        <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}><Text style={styles.back}>← Home</Text></Pressable>
      </ScrollView>
      <NavBar variant="dark" active="courses" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 16, paddingTop: 64, paddingBottom: 48 },
  h1: { color: "#fff", fontSize: 28, fontWeight: "700", textAlign: "center", marginBottom: 16 },
  card: { backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 24, padding: 18, marginBottom: 16 },
  blurb: { color: "#cbd5e1", fontSize: 15, textAlign: "center", marginBottom: 14 },
  row: { backgroundColor: "rgba(255,255,255,0.08)", borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)", borderRadius: 14, padding: 14, marginBottom: 10 },
  rowTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  rowSub: { color: "#cbd5e1", fontSize: 13, marginTop: 3 },
  back: { color: "#c4b5fd", fontSize: 15, textAlign: "center", padding: 10 },
});
