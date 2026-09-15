const fs = require('fs');
const must=(c,m)=>{if(!c){console.error('FAIL: '+m);process.exit(1);}};
let p = fs.readFileSync('apps/mobile/lib/progress.ts','utf8').replace(/\r\n/g,'\n');
const pa = 'if (r.courseKey !== undefined && r.unitIndex !== undefined && r.score / Math.max(1, r.total) >= 0.7) {';
must(p.includes(pa),'threshold'); p = p.replace(pa, 'if (r.courseKey !== undefined && r.unitIndex !== undefined) {');
fs.writeFileSync('apps/mobile/lib/progress.ts', p);
let m = fs.readFileSync('apps/mobile/app/mini-courses.tsx','utf8').replace(/\r\n/g,'\n');
const i1 = 'import React, { useState } from "react";';
must(m.includes(i1),'react import'); m = m.replace(i1, 'import React, { useCallback, useState } from "react";');
const i2 = 'import { Stack, router } from "expo-router";';
must(m.includes(i2),'router import'); m = m.replace(i2, 'import { Stack, router, useFocusEffect } from "expo-router";');
const i3 = 'import { COURSES, COURSE_TIME_FRAMES } from "../lib/courses";';
must(m.includes(i3),'courses import'); m = m.replace(i3, i3 + '\nimport { getCourseProgress } from "../lib/progress";');
const st = '  const course = level ? COURSES[level] : null;';
must(m.includes(st),'state anchor');
m = m.replace(st, st + `
  const [prog, setProg] = useState<Record<string, number[]>>({});
  useFocusEffect(useCallback(() => {
    let on = true;
    getCourseProgress().then((cp) => {
      if (!on) return;
      const map: Record<string, number[]> = {};
      for (const [k, v] of Object.entries(cp)) map[k] = v.completedUnits;
      setProg(map);
    });
    return () => { on = false; };
  }, []));`);
const oldMap = `            {course!.units.map((u) => (
              <Pressable key={u.name} style={styles.row}
                onPress={() => router.push({ pathname: "/quiz",
                  params: { difficulty: level, verb: u.verb, timeFrame,
                    courseKey: \`\${level}|\${timeFrame}\`, unitIndex: String(course!.units.indexOf(u)) } })}>
                <Text style={styles.rowTitle}>{u.name}</Text>
                <Text style={styles.rowSub}>{u.questions} questions</Text>
              </Pressable>
            ))}`;
const newMap = `            {course!.units.map((u, ui) => {
              const doneArr = prog[\`\${level}|\${timeFrame}\`] || [];
              const done = doneArr.includes(ui);
              const nextIdx = course!.units.findIndex((_, i) => !doneArr.includes(i));
              const isNext = ui === nextIdx && doneArr.length > 0;
              return (
                <Pressable key={u.name} style={[styles.row, done && styles.rowDone, isNext && styles.rowNext]}
                  onPress={() => router.push({ pathname: "/quiz",
                    params: { difficulty: level, verb: u.verb, timeFrame,
                      courseKey: \`\${level}|\${timeFrame}\`, unitIndex: String(ui) } })}>
                  <Text style={[styles.rowTitle, done && styles.rowTitleDone]}>{done ? "✓ " : ""}{u.name}</Text>
                  <Text style={styles.rowSub}>{done ? "Completed" : isNext ? \`▸ Up next — \${u.questions} questions\` : \`\${u.questions} questions\`}</Text>
                </Pressable>
              );
            })}`;
must(m.includes(oldMap),'units map'); m = m.replace(oldMap,newMap);
const sa = 'rowSub: { color: "#cbd5e1", fontSize: 13, marginTop: 3 },';
must(m.includes(sa),'styles anchor');
m = m.replace(sa, sa + '\n  rowDone: { opacity: 0.55 },\n  rowTitleDone: { color: "#5BD48F" },\n  rowNext: { borderColor: "#4A78F2", borderWidth: 2 },');
fs.writeFileSync('apps/mobile/app/mini-courses.tsx', m);
console.log('UNIT TRACKING OK');
