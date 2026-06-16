import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { vocabulary, getLessonVocab } from '../data/vocabulary';
import { grammar, getLessonGrammar } from '../data/grammar';
import FlashCard from '../components/FlashCard';
import { useProgress } from '../hooks/useProgress';
import Furigana from '../components/Furigana';

const TOTAL_LESSONS = 25;

const LESSON_TOPICS = {
  1: 'မိတ်ဆက်ခြင်း', 2: 'ပစ္စည်းများ', 3: 'နေရာများ', 4: 'အချိန်', 5: 'သွားလာရေး',
  6: 'စားသောက်ခြင်း', 7: 'ပေးငှားခြင်း', 8: 'တည်နေရာ', 9: 'နှစ်သက်မှု', 10: 'ရေတွက်',
  11: 'ဝိသေသနာ', 12: 'ဆန္ဒ/ဖိတ်ကြားချက်', 13: 'Te ပုံစံ', 14: 'ခွင့်/တားမြစ်', 15: 'အကြောင်းရင်း',
  16: 'တပြိုင်နက်/ကာလ', 17: 'အတွေ့အကြုံ', 18: 'ခန့်မှန်း/ထင်မြင်ချက်', 19: 'နည်းလမ်းများ', 20: 'ကြားသိမှု',
  21: 'Conditional', 22: 'ပြောင်းလဲမှု', 23: 'ပေးကမ်းခြင်း', 24: 'ကိုးကားခြင်း', 25: 'ပြန်လည်ကြည့်ရှုခြင်း'
};

// Inline Grammar Card for sequential mode
function GrammarMiniCard({ card }) {
  const { isLearned, toggleLearned } = useProgress();
  const learned = isLearned(card.id, 'grammar');

  return (
    <div className="grammar-card" style={{ marginBottom: '16px' }}>
      <div className="grammar-card-header" style={{ position: 'relative' }}>
        <div className="grammar-pattern" style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)' }}>{card.pattern}</div>
        <div className="grammar-meaning">{card.burmese_meaning}</div>
        {learned && (
          <span style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(78,203,113,0.15)', border: '1px solid var(--accent-green)',
            borderRadius: 'var(--radius-full)', padding: '2px 10px',
            fontSize: '0.68rem', color: 'var(--accent-green)', fontWeight: 600
          }}>✅ ပြီး</span>
        )}
      </div>
      <div className="grammar-card-body">
        <div className="grammar-structure-box">
          <div className="grammar-structure-label">ပုံစံ</div>
          <div className="grammar-structure-text">{card.structure}</div>
        </div>
        <div className="grammar-example-box">
          <div className="grammar-example-jp">🇯🇵 {card.example_jp}</div>
          <div className="grammar-example-mm">🇲🇲 {card.example_mm}</div>
        </div>
        {card.notes_mm && (
          <div className="grammar-notes-box">
            <div className="grammar-notes-label">မှတ်သားရန်</div>
            <div className="grammar-notes-text">{card.notes_mm}</div>
          </div>
        )}
        <button
          className={`learned-btn ${learned ? 'learned' : ''}`}
          onClick={() => toggleLearned(card.id, 'grammar')}
          style={{ alignSelf: 'center' }}
        >
          {learned ? (
            <><span className="cb-icon cb-icon--checked">✓</span> သင်ယူပြီး</>
          ) : (
            <><span className="cb-icon">+</span> မှတ်သားရန်</>
          )}
        </button>
      </div>
    </div>
  );
}

export default function SequentialStudy() {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [subTab, setSubTab] = useState('vocab'); // 'vocab' | 'grammar'
  const [cardIndex, setCardIndex] = useState(0);
  const [lessonDone, setLessonDone] = useState(false);
  const { getLessonProgress, isLearned } = useProgress();

  const vocabCards = getLessonVocab(currentLesson);
  const grammarCards = getLessonGrammar(currentLesson);

  const currentCards = subTab === 'vocab' ? vocabCards : grammarCards;
  const currentCard = currentCards[cardIndex];
  const cardType = subTab === 'vocab' ? 'vocab' : 'grammar';

  // Progress for all 25 lessons (used for the dot indicators)
  const lessonStatuses = Array.from({ length: TOTAL_LESSONS }, (_, i) => {
    const l = i + 1;
    const vCards = getLessonVocab(l);
    const gCards = getLessonGrammar(l);
    const vProg = getLessonProgress(vCards, 'vocab');
    const gProg = getLessonProgress(gCards, 'grammar');
    const total = vProg.total + gProg.total;
    const learned = vProg.learned + gProg.learned;
    if (total === 0) return 'done';
    if (learned === total) return 'done';
    if (l < currentLesson) return 'done';
    if (l === currentLesson) return 'active';
    return 'pending';
  });

  const goToLesson = (lesson) => {
    setCurrentLesson(lesson);
    setCardIndex(0);
    setSubTab('vocab');
    setLessonDone(false);
  };

  const goNextCard = () => {
    if (cardIndex < currentCards.length - 1) {
      setCardIndex(i => i + 1);
    } else {
      // End of this sub-tab
      if (subTab === 'vocab' && grammarCards.length > 0) {
        // Move to grammar
        setSubTab('grammar');
        setCardIndex(0);
      } else {
        // Lesson complete
        setLessonDone(true);
      }
    }
  };

  const goPrevCard = () => {
    if (cardIndex > 0) {
      setCardIndex(i => i - 1);
    } else if (subTab === 'grammar' && vocabCards.length > 0) {
      setSubTab('vocab');
      setCardIndex(vocabCards.length - 1);
    }
  };

  const goNextLesson = () => {
    if (currentLesson < TOTAL_LESSONS) {
      goToLesson(currentLesson + 1);
    }
  };

  // Overall sequential progress
  const totalCards = vocabulary.length + grammar.length;
  const allVocabProg = getLessonProgress(vocabulary, 'vocab');
  const allGramProg = getLessonProgress(grammar, 'grammar');
  const totalLearned = allVocabProg.learned + allGramProg.learned;
  const overallPercent = Math.round((totalLearned / totalCards) * 100);

  // Current lesson progress
  const vocabProg = getLessonProgress(vocabCards, 'vocab');
  const gramProg = getLessonProgress(grammarCards, 'grammar');
  const lessonTotal = vocabProg.total + gramProg.total;
  const lessonLearned = vocabProg.learned + gramProg.learned;

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-info">
          <div className="page-header-badge">📖 သင်ခန်းစာ တစ်ဆင့်ချင်းစီ</div>
          <h1 className="page-header-title">
            သင်ခန်းစာ {currentLesson} — {LESSON_TOPICS[currentLesson]}
          </h1>
          <div className="page-header-sub">
            {vocabCards.length} ဝေါဟာရ · {grammarCards.length} သဒ္ဒါ · 
            <span style={{ color: 'var(--accent-green)', marginLeft: 4 }}>
              {lessonLearned}/{lessonTotal} ပြီး
            </span>
          </div>
        </div>
        <div className="page-header-actions">
          {/* Sub-tab toggle */}
          <div className="tabs">
            <button
              className={`tab-btn ${subTab === 'vocab' ? 'active' : ''}`}
              onClick={() => { setSubTab('vocab'); setCardIndex(0); setLessonDone(false); }}
            >
              📚 ဝေါဟာရ
            </button>
            {grammarCards.length > 0 && (
              <button
                className={`tab-btn ${subTab === 'grammar' ? 'active' : ''}`}
                onClick={() => { setSubTab('grammar'); setCardIndex(0); setLessonDone(false); }}
              >
                📝 သဒ္ဒါ
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overall progress bar */}
      <div style={{ padding: '10px 24px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '5px' }}>
          <span>N5 စုစုပေါင်း တိုးတက်မှု</span>
          <span style={{ color: 'var(--accent-green)' }}>{totalLearned}/{totalCards} ({overallPercent}%)</span>
        </div>
        <div className="progress-bar" style={{ height: '4px' }}>
          <div className="progress-fill" style={{ width: `${overallPercent}%` }} />
        </div>
      </div>

      {/* Lesson Dots Navigator */}
      <div style={{ padding: '12px 24px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          သင်ခန်းစာ ရွေးချယ်ပါ
        </div>
        <div className="sequential-step-dots" style={{ padding: 0, justifyContent: 'flex-start' }}>
          {Array.from({ length: TOTAL_LESSONS }, (_, i) => {
            const l = i + 1;
            const status = lessonStatuses[i];
            return (
              <button
                key={l}
                className={`sequential-step-dot sequential-step-dot--${status}`}
                onClick={() => goToLesson(l)}
                title={`သင်ခန်းစာ ${l}: ${LESSON_TOPICS[l]}`}
              >
                {l}
              </button>
            );
          })}
        </div>
      </div>

      {/* Study Area */}
      <div className="study-area">
        {lessonDone ? (
          /* Lesson Complete */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lesson-complete-overlay"
          >
            <div className="lesson-complete-emoji">
              {lessonLearned === lessonTotal ? '🏆' : '🎉'}
            </div>
            <div className="lesson-complete-title">
              သင်ခန်းစာ {currentLesson} ပြီးပါပြီ!
            </div>
            <div className="lesson-complete-sub">
              {lessonLearned}/{lessonTotal} ကတ် မှတ်သားပြီး
              {lessonLearned < lessonTotal && (
                <><br /><span style={{ color: 'var(--accent-gold)' }}>{lessonTotal - lessonLearned} ကတ် ထပ်မှတ်ရန် ရှိသေးသည်</span></>
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn btn-secondary"
                onClick={() => { setCardIndex(0); setSubTab('vocab'); setLessonDone(false); }}
              >
                ↺ ထပ်ကြည့်ရန်
              </button>
              {currentLesson < TOTAL_LESSONS && (
                <button className="btn btn-gold btn-lg" onClick={goNextLesson}>
                  သင်ခန်းစာ {currentLesson + 1} →
                </button>
              )}
              {currentLesson === TOTAL_LESSONS && (
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent-gold)' }}>
                  🌟 N5 သင်ခန်းစာ အားလုံး ပြီးစီးပါပြီ!
                </div>
              )}
            </div>
          </motion.div>
        ) : subTab === 'grammar' ? (
          /* Grammar cards — scroll list */
          <div>
            {grammarCards.map(card => (
              <GrammarMiniCard key={card.id} card={card} />
            ))}
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <button className="btn btn-gold btn-lg" onClick={() => setLessonDone(true)}>
                သင်ခန်းစာ {currentLesson} ပြီးပြီ →
              </button>
            </div>
          </div>
        ) : (
          /* Vocab flashcards */
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentLesson}-${subTab}-${cardIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                {currentCard && (
                  <FlashCard card={currentCard} type={cardType} />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="card-controls">
              <button
                className="card-nav-btn"
                onClick={goPrevCard}
                disabled={cardIndex === 0 && subTab === 'vocab'}
              >←</button>

              <div style={{ textAlign: 'center' }}>
                <div className="card-counter">
                  <span>{cardIndex + 1}</span>
                  <span style={{ color: 'var(--text-muted)' }}> / {currentCards.length}</span>
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  {subTab === 'vocab' ? 'ဝေါဟာရ' : 'သဒ္ဒါ'}
                </div>
              </div>

              <button
                className="card-nav-btn"
                onClick={goNextCard}
                style={cardIndex === currentCards.length - 1 ? { borderColor: 'var(--accent-gold)', color: 'var(--accent-gold)' } : {}}
              >
                {cardIndex === currentCards.length - 1
                  ? (subTab === 'vocab' && grammarCards.length > 0 ? '📝' : '✓')
                  : '→'}
              </button>
            </div>

            <div style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '-8px' }}>
              {cardIndex === currentCards.length - 1 && subTab === 'vocab' && grammarCards.length > 0
                ? '→ ကိုနှိပ်ပြီး သဒ္ဒါကတ်သို့ ဆက်သွားပါ'
                : cardIndex === currentCards.length - 1
                  ? '✓ ကိုနှိပ်ပြီး ဤသင်ခန်းစာ ပြီးဆုံးပါ'
                  : '← → မြှားခလုတ်များ သို့မဟုတ် ကတ်နှိပ်ပြည့်ပါ'}
            </div>

            {/* Mini progress dots for current lesson */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '16px', flexWrap: 'wrap' }}>
              {currentCards.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setCardIndex(i)}
                  title={c.japanese}
                  style={{
                    width: '8px', height: '8px', borderRadius: '50%', border: 'none',
                    background: isLearned(c.id, cardType)
                      ? 'var(--accent-green)'
                      : i === cardIndex
                        ? 'var(--accent-gold)'
                        : 'rgba(255,255,255,0.1)',
                    cursor: 'pointer', transition: 'all 0.2s', padding: 0,
                    transform: i === cardIndex ? 'scale(1.5)' : 'scale(1)'
                  }}
                />
              ))}
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              <span style={{ color: 'var(--accent-green)' }}>●</span> မှတ်ပြီး &nbsp;
              <span style={{ color: 'var(--accent-gold)' }}>●</span> လက်ရှိ &nbsp;
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>●</span> မမှတ်ရသေး
            </div>
          </>
        )}
      </div>
    </div>
  );
}
