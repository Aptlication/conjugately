import { useState, useMemo } from 'react';
import { useVocabulary, type VocabularyWord } from '../hooks/useVocabulary';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, Trash2, ArrowLeft, RotateCcw, Check, X, Brain, Sparkles, Filter } from 'lucide-react';

interface VocabularyBuilderProps {
  onClose: () => void;
}

type ViewMode = 'list' | 'review';
type FilterMode = 'all' | 'new' | 'learning' | 'mastered';

export function VocabularyBuilder({ onClose }: VocabularyBuilderProps) {
  const vocab = useVocabulary();
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [reviewCards, setReviewCards] = useState<VocabularyWord[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewResults, setReviewResults] = useState<{ correct: number; incorrect: number }>({ correct: 0, incorrect: 0 });
  const [reviewComplete, setReviewComplete] = useState(false);

  const filteredWords = useMemo(() => {
    if (filterMode === 'all') return vocab.words;
    return vocab.words.filter(w => w.status === filterMode);
  }, [vocab.words, filterMode]);

  const sortedWords = useMemo(() => {
    return [...filteredWords].sort((a, b) => {
      const order = { new: 0, learning: 1, mastered: 2 };
      if (order[a.status] !== order[b.status]) return order[a.status] - order[b.status];
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filteredWords]);

  function startReview() {
    const cards = vocab.getReviewWords(10);
    if (cards.length === 0) return;
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setReviewCards(shuffled);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setReviewResults({ correct: 0, incorrect: 0 });
    setReviewComplete(false);
    setViewMode('review');
  }

  function handleReviewAnswer(correct: boolean) {
    const card = reviewCards[currentCardIndex];
    vocab.recordReview(card.id, correct);
    const newResults = {
      correct: reviewResults.correct + (correct ? 1 : 0),
      incorrect: reviewResults.incorrect + (correct ? 0 : 1),
    };
    setReviewResults(newResults);

    if (currentCardIndex + 1 < reviewCards.length) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      setReviewComplete(true);
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'new': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'learning': return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'mastered': return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
      default: return 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    }
  }

  function getStatusLabel(status: string) {
    switch (status) {
      case 'new': return 'New';
      case 'learning': return 'Learning';
      case 'mastered': return 'Mastered';
      default: return status;
    }
  }

  if (viewMode === 'review' && reviewCards.length > 0) {
    if (reviewComplete) {
      const total = reviewResults.correct + reviewResults.incorrect;
      const percentage = Math.round((reviewResults.correct / total) * 100);
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-4">
          <div className="max-w-lg mx-auto pt-8">
            <div className="bg-slate-800/60 rounded-2xl p-8 border border-purple-500/20 text-center">
              <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Review Complete!</h2>
              <div className="text-5xl font-bold text-purple-300 mb-4">{percentage}%</div>
              <div className="flex justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">{reviewResults.correct}</div>
                  <div className="text-sm text-slate-400">Correct</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">{reviewResults.incorrect}</div>
                  <div className="text-sm text-slate-400">Incorrect</div>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => { setViewMode('list'); setReviewComplete(false); }}
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Word List
                </Button>
                <Button
                  onClick={startReview}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Review Again
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const currentCard = reviewCards[currentCardIndex];
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-4">
        <div className="max-w-lg mx-auto pt-8">
          <div className="flex justify-between items-center mb-6">
            <Button
              onClick={() => setViewMode('list')}
              variant="ghost"
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <span className="text-slate-400 text-sm">
              {currentCardIndex + 1} / {reviewCards.length}
            </span>
          </div>

          <div className="w-full bg-slate-700/30 rounded-full h-2 mb-6">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentCardIndex) / reviewCards.length) * 100}%` }}
            />
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="bg-slate-800/60 rounded-2xl p-8 border border-purple-500/20 cursor-pointer hover:border-purple-500/40 transition-all min-h-[250px] flex flex-col items-center justify-center"
          >
            {!isFlipped ? (
              <>
                <p className="text-sm text-purple-400 mb-3 uppercase tracking-wider">What is the French for...</p>
                <p className="text-2xl font-bold text-white text-center">{currentCard.english}</p>
                {currentCard.verb && (
                  <p className="text-sm text-slate-500 mt-4">
                    {currentCard.verb} &middot; {currentCard.tense}
                  </p>
                )}
                <p className="text-xs text-slate-500 mt-6">Tap to reveal</p>
              </>
            ) : (
              <>
                <p className="text-sm text-emerald-400 mb-3 uppercase tracking-wider">French</p>
                <p className="text-2xl font-bold text-emerald-300 text-center">{currentCard.french}</p>
                <p className="text-lg text-slate-400 mt-3">{currentCard.english}</p>
              </>
            )}
          </div>

          {isFlipped && (
            <div className="flex gap-4 mt-6 justify-center">
              <Button
                onClick={() => handleReviewAnswer(false)}
                className="bg-red-600/80 hover:bg-red-600 text-white px-8 py-6 text-lg"
              >
                <X className="w-5 h-5 mr-2" />
                Didn't Know
              </Button>
              <Button
                onClick={() => handleReviewAnswer(true)}
                className="bg-emerald-600/80 hover:bg-emerald-600 text-white px-8 py-6 text-lg"
              >
                <Check className="w-5 h-5 mr-2" />
                Got It
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-4">
      <div className="max-w-2xl mx-auto pt-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-slate-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-purple-400" />
                Vocabulary Builder
              </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-blue-500/10 rounded-xl p-3 border border-blue-500/20 text-center">
            <div className="text-2xl font-bold text-blue-300">{vocab.stats.new}</div>
            <div className="text-xs text-blue-400">New</div>
          </div>
          <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/20 text-center">
            <div className="text-2xl font-bold text-amber-300">{vocab.stats.learning}</div>
            <div className="text-xs text-amber-400">Learning</div>
          </div>
          <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/20 text-center">
            <div className="text-2xl font-bold text-emerald-300">{vocab.stats.mastered}</div>
            <div className="text-xs text-emerald-400">Mastered</div>
          </div>
        </div>

        {vocab.stats.total > 0 && vocab.stats.new + vocab.stats.learning > 0 && (
          <Button
            onClick={startReview}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-6 py-6 text-lg"
          >
            <Brain className="w-5 h-5 mr-2" />
            Review Words ({vocab.stats.new + vocab.stats.learning} to study)
          </Button>
        )}

        {vocab.stats.total === 0 ? (
          <div className="bg-slate-800/40 rounded-2xl p-8 border border-slate-700/30 text-center">
            <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-300 mb-2">No vocabulary words yet</h3>
            <p className="text-slate-500 text-sm">
              Complete quizzes to automatically collect French words and phrases.
              The correct answers from each quiz will be added to your vocabulary.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-4 h-4 text-slate-400" />
              <div className="flex gap-2">
                {(['all', 'new', 'learning', 'mastered'] as FilterMode[]).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setFilterMode(mode)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      filterMode === mode
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-300'
                    }`}
                  >
                    {mode === 'all' ? `All (${vocab.stats.total})` : `${mode.charAt(0).toUpperCase() + mode.slice(1)} (${vocab.stats[mode]})`}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
              {sortedWords.map(word => (
                <div
                  key={word.id}
                  className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/30 hover:border-purple-500/20 transition-all group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium truncate">{word.french}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${getStatusColor(word.status)}`}>
                          {getStatusLabel(word.status)}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm truncate">{word.english}</p>
                      {word.verb && (
                        <p className="text-slate-600 text-xs mt-1">{word.verb} &middot; {word.tense} &middot; {word.difficulty}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      {word.status !== 'mastered' && (
                        <button
                          onClick={() => vocab.updateWordStatus(word.id, 'mastered')}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all opacity-0 group-hover:opacity-100"
                          title="Mark as mastered"
                        >
                          <Star className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => vocab.removeWord(word.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all opacity-0 group-hover:opacity-100"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {vocab.stats.total > 0 && (
              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    if (confirm('Remove all vocabulary words? This cannot be undone.')) {
                      vocab.clearAll();
                    }
                  }}
                  className="text-xs text-slate-600 hover:text-red-400 transition-colors"
                >
                  Clear all words
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
