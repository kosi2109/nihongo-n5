import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLessonData } from '../hooks/useLessonData';
import QuizCard from '../components/QuizCard';

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

export default function Quiz({ lesson, onQuizStateChange }) {
  const { data: allCards, loading } = useLessonData(lesson, 'vocab');
  const [quizCards, setQuizCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);
  const [quizMode, setQuizMode] = useState('jp-to-mm'); // 'jp-to-mm' | 'mm-to-jp'

  const startQuiz = () => {
    const shuffled = shuffleArray(allCards);
    setQuizCards(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setFinished(false);
    setStarted(true);
    onQuizStateChange?.(true);  // quiz started — block navigation
  };

  const handleNext = (correct) => {
    if (correct) setScore(s => s + 1);
    if (currentIndex === quizCards.length - 1) {
      setFinished(true);
      onQuizStateChange?.(false); // quiz done — allow navigation
    } else {
      setCurrentIndex(i => i + 1);
    }
  };

  const handleModeChange = (mode) => {
    setQuizMode(mode);
    if (started) {
      // Restart quiz with new mode
      const shuffled = shuffleArray(allCards);
      setQuizCards(shuffled);
      setCurrentIndex(0);
      setScore(0);
      setFinished(false);
      // still in progress
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div style={{ color: 'var(--text-muted)' }}>Loading Quiz Data...</div>
      </div>
    );
  }

  if (allCards.length < 4) {
    return (
      <div className="animate-fade-in">
        <div className="page-header">
          <div className="page-header-info">
            <div className="page-header-badge">🎯 စစ်ဆေးချက် • သင်ခန်းစာ {lesson}</div>
            <h1 className="page-header-title">စစ်ဆေးချက်</h1>
          </div>
        </div>
        <div className="study-area">
          <div className="empty-state">
            <div className="empty-state-icon">⚠️</div>
            <div>ဤသင်ခန်းစာတွင် quiz ပြုလုပ်ရန် ဝေါဟာရ အနည်းဆုံး 4 ခု လိုအပ်သည်</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="page-header">
        <div className="page-header-info">
          <div className="page-header-badge">🎯 စစ်ဆေးချက် • သင်ခန်းစာ {lesson}</div>
          <h1 className="page-header-title">{LESSON_TOPICS[lesson]} — စစ်ဆေးချက်</h1>
          <div className="page-header-sub">ဝေါဟာရ {allCards.length} ခု · အဖြေမှန်ကို ရွေးချယ်ပါ</div>
        </div>

        <div className="page-header-actions">
          {started && !finished && (
            <div className="quiz-score">
              <span>မှန်သည်:</span>
              <span className="quiz-score-num">{score}</span>
              <span style={{ color: 'var(--text-muted)' }}>/ {currentIndex}</span>
            </div>
          )}

          {/* Compact mode badge */}
          <div style={{
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            background: quizMode === 'jp-to-mm' ? 'rgba(245,200,66,0.15)' : 'rgba(74,144,217,0.15)',
            border: `1px solid ${quizMode === 'jp-to-mm' ? 'rgba(245,200,66,0.4)' : 'rgba(74,144,217,0.4)'}`,
            fontSize: '0.78rem',
            fontWeight: 600,
            color: quizMode === 'jp-to-mm' ? 'var(--accent-gold)' : 'var(--accent-blue)',
          }}>
            {quizMode === 'jp-to-mm' ? '🇯🇵 → 🇲🇲 မုဒ်' : '🇲🇲 → 🇯🇵 မုဒ်'}
          </div>

          {started && (
            <button className="btn btn-secondary" onClick={startQuiz}>↺ ပြန်စရန်</button>
          )}
        </div>
      </div>

      <div className="study-area">
        {!started ? (
          /* Start Screen */
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
              စစ်ဆေးချက် စတင်ပါ
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', lineHeight: '1.8' }}>
              ဝေါဟာရ {allCards.length} ခု — မုဒ်ကို ရွေးချယ်ပါ
            </p>

            {/* === BIG MODE SELECTOR === */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', maxWidth: '480px', margin: '0 auto 28px' }}>
              <button
                id="quiz-mode-jp-mm"
                onClick={() => handleModeChange('jp-to-mm')}
                style={{
                  padding: '20px 16px',
                  borderRadius: 'var(--radius-xl)',
                  border: `2px solid ${quizMode === 'jp-to-mm' ? 'var(--accent-gold)' : 'var(--border-subtle)'}`,
                  background: quizMode === 'jp-to-mm' ? 'rgba(245,200,66,0.1)' : 'var(--bg-card)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🇯🇵 → 🇲🇲</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: quizMode === 'jp-to-mm' ? 'var(--accent-gold)' : 'var(--text-primary)', marginBottom: '4px' }}>ဂျပန် မြန်
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  ဂျပန်စကားလုံးကို ကြည့်ပြီး<br/>မြန်မာအဓိပ္ပါယ်ကို ရွေးချယ်
                </div>
                {quizMode === 'jp-to-mm' && (
                  <div style={{ marginTop: '8px', fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 600 }}>✓ ရွေးချပးပြီ</div>
                )}
              </button>

              <button
                id="quiz-mode-mm-jp"
                onClick={() => handleModeChange('mm-to-jp')}
                style={{
                  padding: '20px 16px',
                  borderRadius: 'var(--radius-xl)',
                  border: `2px solid ${quizMode === 'mm-to-jp' ? 'var(--accent-blue)' : 'var(--border-subtle)'}`,
                  background: quizMode === 'mm-to-jp' ? 'rgba(74,144,217,0.1)' : 'var(--bg-card)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🇲🇲 → 🇯🇵</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: quizMode === 'mm-to-jp' ? 'var(--accent-blue)' : 'var(--text-primary)', marginBottom: '4px' }}>မြန်မာ ဂျပန်
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  မြန်မာအဓိပ္ပါယ်ကို ကြည့်ပြီး<br/>ဂျပန်စကားလုံးကို ရွေးချယ်
                </div>
                {quizMode === 'mm-to-jp' && (
                  <div style={{ marginTop: '8px', fontSize: '0.7rem', color: 'var(--accent-blue)', fontWeight: 600 }}>✓ ရွေးချပးပြီ</div>
                )}
              </button>
            </div>

            <button className="btn btn-gold btn-lg" onClick={startQuiz} id="start-quiz-btn" style={{ minWidth: '200px' }}>
              🎯 စတင်ပါ
            </button>
          </div>
        ) : finished ? (
          /* Finish Screen */
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '60px 20px' }}
            >
              <div style={{ fontSize: '5rem', marginBottom: '20px' }}>
                {score === quizCards.length ? '🏆' : score >= quizCards.length * 0.7 ? '🎉' : '📚'}
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {score === quizCards.length ? 'ကောင်းတယ်! Perfect!' : 'ပြီးသွားပြီ!'}
              </h2>

              <div style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-xl)', padding: '32px 48px', display: 'inline-block',
                margin: '24px 0'
              }}>
                <div style={{ fontSize: '4rem', fontWeight: '800', lineHeight: 1, background: 'var(--grad-gold)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {score}/{quizCards.length}
                </div>
                <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  {Math.round((score / quizCards.length) * 100)}% မှန်ကန်သည်
                </div>
              </div>

              <div style={{ marginBottom: '24px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                {score === quizCards.length && '🌟 အကောင်းဆုံး! ဂျပန်ဘာသာ ကောင်းတယ်!'}
                {score >= quizCards.length * 0.7 && score < quizCards.length && '👍 ကောင်းတယ်! ဆက်ကြိုးစားပါ!'}
                {score < quizCards.length * 0.7 && '📖 ပြန်လည်လေ့လာပြီး ထပ်စမ်းပါ!'}
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={startQuiz}>
                  🔄 ထပ်ကြိုးစားရန်
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : (
          /* Quiz In Progress */
          <AnimatePresence mode="wait">
            <QuizCard
              key={currentIndex}
              card={quizCards[currentIndex]}
              allCards={allCards}
              onNext={handleNext}
              total={quizCards.length}
              current={currentIndex + 1}
              mode={quizMode}
            />
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
