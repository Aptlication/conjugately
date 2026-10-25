#!/usr/bin/env python3
"""
Applies the "always inverted" question rewrite (25 Oct 2026) to the quiz data.

Input: a JSON array of {key, question, prompt_changed, correct, wrong[3]} where
key is "Level|verb|tense|index" (index is 1-based within that verb/tense pool).

  python3 scripts/apply-inverted-questions.py rewrites.json

Writes the items in place, keeping each pool's order (so audioIndex / Q<n>.mp3
filenames stay stable). Prints the English-prompt audio files that must be
re-recorded because their prompt changed.
"""
import json, os, random, re, sys, unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
random.seed(20261025)

def nfc(s): return unicodedata.normalize("NFC", s)

def scan_string(t, i):
    q = t[i]; i += 1
    while t[i] != q:
        i += 2 if t[i] == "\\" else 1
    return i + 1

def skip_comment(t, i):
    if t.startswith("//", i): return t.index("\n", i)
    if t.startswith("/*", i): return t.index("*/", i) + 2
    return i

def match_close(t, i):
    """t[i] is [ or {; return index after its matching close."""
    depth = 0
    while True:
        c = t[i]
        if c in "\"'`": i = scan_string(t, i); continue
        if t.startswith("//", i) or t.startswith("/*", i): i = skip_comment(t, i); continue
        if c in "[{": depth += 1
        elif c in "]}":
            depth -= 1
            if depth == 0: return i + 1
        i += 1

def elements(t, start):
    """Spans of the top-level {...} objects inside the array opening at t[start] == '['."""
    end = match_close(t, start); i = start + 1; out = []
    while i < end - 1:
        c = t[i]
        if c in "\"'`": i = scan_string(t, i); continue
        if t.startswith("//", i) or t.startswith("/*", i): i = skip_comment(t, i); continue
        if c == "{":
            j = match_close(t, i); out.append((i, j)); i = j; continue
        i += 1
    return out

def find_key(t, key, frm, to=None):
    """Index of the '[' or '{' that follows "key": between frm and to."""
    pat = re.compile(r'["\']' + re.escape(key) + r'["\']\s*:\s*([\[{])')
    for m in pat.finditer(t, frm, to or len(t)):
        return m.start(1)
    raise KeyError(key)

FILES = {
    "Beginner": ("server/beginner-pronoun-data.ts", "BEGINNER_PRONOUN_QUESTIONS", "obj"),
    "Elementary": ("server/elementary-quiz-data.ts", None, "obj"),
    "Int A": ("server/intermediate-quiz-data.ts", "INTERMEDIATE_QUIZ_DATA", "line"),
    "Int B": ("server/intermediate-quiz-data.ts", "INTERMEDIATE_QUIZ_DATA", "line"),
}
ELEM_CONST = {"present": "ELEMENTARY_PRESENT_QUESTIONS", "passe_compose": "ELEMENTARY_PASSE_COMPOSE_QUESTIONS",
              "futur_simple": "ELEMENTARY_FUTURE_SIMPLE_QUESTIONS"}

def js(s): return json.dumps(s, ensure_ascii=False)

def locate(t, level, verb, tense, idx):
    path, const, _ = FILES[level]
    if level == "Elementary":
        c0 = t.index(f"export const {ELEM_CONST[tense]}")
        arr = find_key(t, verb, c0)
    else:
        c0 = t.index(f"export const {const}")
        vobj = find_key(t, verb, c0)
        arr = find_key(t, tense, vobj, match_close(t, vobj))
    els = elements(t, arr)
    return els[idx - 1]

def render(level, old, item):
    opts = [item["correct"]] + item["wrong"]
    random.shuffle(opts)
    pos = opts.index(item["correct"])
    if FILES[level][2] == "line":
        m = re.search(r'"audioIndex":\s*\d+', old)
        extra = f", {m.group(0)}" if m else ""
        return '{"question": %s, "options": %s, "answer": "%s"%s}' % (
            js(item["question"]), json.dumps(opts, ensure_ascii=False), "ABCD"[pos], extra)
    hint = re.search(r'hint:\s*("(?:[^"\\]|\\.)*")', old)
    ind = re.match(r'\s*', old.split("\n")[1] if "\n" in old else "      ").group(0) or "      "
    lines = ["{", f'{ind}question: {js(item["question"])},']
    if hint: lines.append(f"{ind}hint: {hint.group(1)},")
    lines.append(f"{ind}answerOptions: [")
    for k, o in enumerate(opts):
        ok = k == pos
        why = "Correct! The question is inverted: verb, hyphen, subject." if ok else "Not quite: check the tense, the person and the agreement."
        lines.append(f'{ind}  {{ text: {js(o)}, rationale: {js(why)}, isCorrect: {"true" if ok else "false"} }}' + ("," if k < 3 else ""))
    lines.append(f"{ind}]")
    lines.append(ind[:-2] + "}")
    return "\n".join(lines)

def main():
    items = json.load(open(sys.argv[1]))
    by_file = {}
    for it in items:
        level, verb, tense, idx = it["key"].split("|")
        by_file.setdefault(FILES[level][0], []).append((level, nfc(verb), tense, int(idx), it))
    rerecord = []
    for path, lst in by_file.items():
        full = os.path.join(ROOT, path)
        t = nfc(open(full, encoding="utf-8").read())
        spans = []
        for level, verb, tense, idx, it in lst:
            a, b = locate(t, level, verb, tense, idx)
            spans.append((a, b, level, it))
            if it.get("prompt_changed"):
                folder = {"Beginner": "beginner", "Elementary": "elementary"}.get(level, "intermediate")
                tp = {"passé_composé": "passe_compose", "Présent": "present", "Futur Simple": "futur_simple",
                      "Passé Composé": "passe_compose"}.get(tense, tense)
                rerecord.append(f"attached_assets/audio/quizzes/{folder}/{verb}/{tp}/questions/Q{idx}.mp3")
        for a, b, level, it in sorted(spans, key=lambda s: -s[0]):
            t = t[:a] + render(level, t[a:b], it) + t[b:]
        open(full, "w", encoding="utf-8").write(t)
        print(f"{path}: {len(lst)} items rewritten")
    print("\nEnglish prompt audio to re-record (delete, then run the generator):")
    for r in rerecord: print("  " + r)
    json.dump(rerecord, open(os.path.join(ROOT, ".rerecord-prompts.json"), "w"), ensure_ascii=False, indent=1)

if __name__ == "__main__":
    main()
