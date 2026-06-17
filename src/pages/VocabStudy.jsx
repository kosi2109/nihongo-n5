import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLessonData } from '../hooks/useLessonData';
import FlashCard from '../components/FlashCard';
import ProgressBar from '../components/ProgressBar';
import { useProgress } from '../hooks/useProgress';

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

const LESSON_TOPICS = {
  1: 'မိတ်ဆက်ခြင်း', 2: 'ပစ္စည်းများ', 3: 'နေရာများ', 4: 'အချိန်', 5: 'သွားလာရေး',
  6: 'စားသောက်ခြင်း', 7: 'ပေးငှားခြင်း', 8: 'တည်နေရာ', 9: 'နှစ်သက်မှု', 10: 'ရေတွက်',
  11: 'ဝိသေသနာ', 12: 'ဆန္ဒ/ဖိတ်ကြားချက်', 13: 'Te ပုံစံ', 14: 'ခွင့်/တားမြစ်', 15: 'အကြောင်းရင်း',
  16: 'တပြိုင်နက်/ကာလ', 17: 'အတွေ့အကြုံ', 18: 'ခန့်မှန်း/ထင်မြင်ချက်', 19: 'နည်းလမ်းများ', 20: 'ကြားသိမှု',
  21: 'Conditional', 22: 'ပြောင်းလဲမှု', 23: 'ပေးကမ်းခြင်း', 24: 'ကိုးကားခြင်း', 25: 'ပြန်လည်ကြည့်ရှုခြင်း'
};

export default function VocabStudy({ lesson }) {
  const { data: originalCards, loading } = useLessonData(lesson, 'vocab');
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'unlearned'
  const { isLearned, resetLesson } = useProgress();

  useEffect(() => {
    setCards(originalCards);
    setCurrentIndex(0);
    setIsShuffled(false);
  }, [originalCards]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div style={{ color: 'var(--text-muted)' }}>Loading Vocab Data...</div>
      </div>
    );
  }

  const filteredCards = filterMode === 'unlearned'
    ? cards.filter(c => !isLearned(c.id, 'vocab'))
    : cards;

  const currentCard = filteredCards[currentIndex];
  const hasCards = filteredCards.length > 0;

  const goNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(i => i + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
    }
  };

  const handleShuffle = () => {
    if (isShuffled) {
      setCards(originalCards);
      setIsShuffled(false);
    } else {
      setCards(shuffleArray(originalCards));
      setIsShuffled(true);
    }
    setCurrentIndex(0);
  };

  const handleFilter = (mode) => {
    setFilterMode(mode);
    setCurrentIndex(0);
  };

  const handleReset = () => {
    resetLesson(originalCards, 'vocab');
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
  };

  return (
    <div className="animate-fade-in" onKeyDown={handleKeyDown} tabIndex={-1} style={{ outline: 'none', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div className="page-header">
        <div className="page-header-info">
          <div className="page-header-badge">📚 ဝေါဟာရ • သင်ခန်းစာ {lesson}</div>
          <h1 className="page-header-title">{LESSON_TOPICS[lesson]}</h1>
          <div className="page-header-sub">
            ဝေါဟာရ {originalCards.length} ခု • ကတ်နှိပ်ပြန်ဖြည်ပါ
          </div>
        </div>

        <div className="page-header-actions">
          {/* Filter */}
          <div className="tabs">
            <button className={`tab-btn ${filterMode === 'all' ? 'active' : ''}`} onClick={() => handleFilter('all')}>
              အားလုံး
            </button>
            <button className={`tab-btn ${filterMode === 'unlearned' ? 'active' : ''}`} onClick={() => handleFilter('unlearned')}>
              မသင်ရသေး
            </button>
          </div>

          {/* Shuffle */}
          <button className={`btn btn-secondary ${isShuffled ? 'btn-primary' : ''}`} onClick={handleShuffle}>
            🔀 {isShuffled ? 'ပုံမှန်' : 'ရောပတ်'}
          </button>

          {/* Reset */}
          <button className="btn btn-ghost btn-sm" onClick={handleReset} title="ဤသင်ခန်းစာ တိုးတက်မှုကို ပြန်လည်သတ်မှတ်ရန်">
            ↺ ပြန်မှတ်ရန်
          </button>
        </div>
      </div>

      {/* Progress */}
      <ProgressBar lesson={lesson} type="vocab" label="ဝေါဟာရ တိုးတက်မှု" />

      {/* Study Area */}
      <div className="study-area">
        {!hasCards ? (
          <div className="empty-state">
            <div className="empty-state-icon">🎉</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
              ဝေါဟာရများ အားလုံး သင်ယူပြီးပါပြီ!
            </div>
            <div>
              <button className="btn btn-secondary" onClick={() => handleFilter('all')}>
                 အားလုံး ပြန်ကြည့်ရန်
              </button>
            </div>
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentCard.id}-${currentIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <FlashCard card={currentCard} type="vocab" />
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="card-controls">
              <button
                className="card-nav-btn"
                onClick={goPrev}
                disabled={currentIndex === 0}
                title="ရှေ့ကတ် (← Arrow)"
              >
                ←
              </button>

              <div className="card-counter">
                <span>{currentIndex + 1}</span>
                <span style={{ color: 'var(--text-muted)' }}> / {filteredCards.length}</span>
              </div>

              <button
                className="card-nav-btn"
                onClick={goNext}
                disabled={currentIndex === filteredCards.length - 1}
                title="နောက်ကတ် (→ Arrow)"
              >
                →
              </button>
            </div>

            {/* Keyboard hint */}
            <div className="card-keyboard-hint" style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '-8px' }}>
              ← → မြှားခလုတ်များဖြင့် လှန်ကြည့်နိုင်သည်
            </div>
          </>
        )}
      </div>
    </div>
  );
}
