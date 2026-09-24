/**
 * Fisher–Yates shuffle.
 *
 * The codebase used `sort(() => Math.random() - 0.5)` in 32 places. That is not
 * a shuffle: a comparator returning a random sign is inconsistent, so the
 * result depends on the engine's sort algorithm and the distribution over
 * permutations is measurably skewed — early elements tend to stay early. It was
 * replaced once, for exams, under 1.1.11; leaving the other 31 sites meant the
 * same defect shipped in two states. This is the single implementation.
 *
 * Returns a new array. The old idiom sorted in place and returned the same
 * reference; every call site here assigns the result, so that difference is not
 * observable, but keep it in mind if a future caller relies on mutation.
 */
export function shuffle<T>(input: readonly T[]): T[] {
  const items = [...input];
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}
