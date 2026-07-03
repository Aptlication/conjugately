import { useState, useEffect, useCallback } from 'react';

export interface VocabularyWord {
  id: string;
  french: string;
  english: string;
  verb?: string;
  tense?: string;
  difficulty?: string;
  status: 'new' | 'learning' | 'mastered';
  timesCorrect: number;
  timesIncorrect: number;
  lastReviewedAt?: string;
  createdAt: string;
}

const STORAGE_KEY = 'conjugately_vocabulary';

function loadVocabulary(): VocabularyWord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveVocabulary(words: VocabularyWord[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(words));
}

export function useVocabulary() {
  const [words, setWords] = useState<VocabularyWord[]>(() => loadVocabulary());

  useEffect(() => {
    saveVocabulary(words);
  }, [words]);

  const addWords = useCallback((newWords: Array<{ french: string; english: string; verb?: string; tense?: string; difficulty?: string }>) => {
    setWords(prev => {
      const existing = new Set(prev.map(w => w.french));
      const toAdd = newWords
        .filter(w => !existing.has(w.french))
        .map(w => ({
          id: `vocab_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
          french: w.french,
          english: w.english,
          verb: w.verb,
          tense: w.tense,
          difficulty: w.difficulty,
          status: 'new' as const,
          timesCorrect: 0,
          timesIncorrect: 0,
          createdAt: new Date().toISOString(),
        }));
      return [...prev, ...toAdd];
    });
  }, []);

  const updateWordStatus = useCallback((id: string, status: 'new' | 'learning' | 'mastered') => {
    setWords(prev => prev.map(w =>
      w.id === id ? { ...w, status, lastReviewedAt: new Date().toISOString() } : w
    ));
  }, []);

  const recordReview = useCallback((id: string, correct: boolean) => {
    setWords(prev => prev.map(w => {
      if (w.id !== id) return w;
      const timesCorrect = w.timesCorrect + (correct ? 1 : 0);
      const timesIncorrect = w.timesIncorrect + (correct ? 0 : 1);
      let status: 'new' | 'learning' | 'mastered' = w.status;
      if (timesCorrect >= 3 && timesCorrect > timesIncorrect * 2) {
        status = 'mastered';
      } else if (timesCorrect > 0 || timesIncorrect > 0) {
        status = 'learning';
      }
      return { ...w, timesCorrect, timesIncorrect, status, lastReviewedAt: new Date().toISOString() };
    }));
  }, []);

  const removeWord = useCallback((id: string) => {
    setWords(prev => prev.filter(w => w.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setWords([]);
  }, []);

  const getReviewWords = useCallback((count: number = 10): VocabularyWord[] => {
    const reviewable = words.filter(w => w.status !== 'mastered');
    const sorted = [...reviewable].sort((a, b) => {
      if (a.status === 'new' && b.status !== 'new') return -1;
      if (a.status !== 'new' && b.status === 'new') return 1;
      const aTime = a.lastReviewedAt ? new Date(a.lastReviewedAt).getTime() : 0;
      const bTime = b.lastReviewedAt ? new Date(b.lastReviewedAt).getTime() : 0;
      return aTime - bTime;
    });
    return sorted.slice(0, count);
  }, [words]);

  const stats = {
    total: words.length,
    new: words.filter(w => w.status === 'new').length,
    learning: words.filter(w => w.status === 'learning').length,
    mastered: words.filter(w => w.status === 'mastered').length,
  };

  return {
    words,
    stats,
    addWords,
    updateWordStatus,
    recordReview,
    removeWord,
    clearAll,
    getReviewWords,
  };
}
