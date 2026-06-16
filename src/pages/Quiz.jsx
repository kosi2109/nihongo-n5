import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLessonVocab } from '../data/vocabulary';
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

export default function Quiz({ lesson }) {
  const allCards = getLessonVocab(lesson);
  const [quizCards, setQuizCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [started, setStarted] = useState(false);

  const startQuiz = () => {
    const shuffled = shuffleArray(allCards);
    setQuizCards(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setFinished(false);
    setStarted(true);
  };

  const handleNext = (correct) => {
    if (correct) setScore(s => s + 1);
    if (currentIndex === quizCards.length - 1) {
      setFinished(true);
    } else {
      setCurrentIndex(i => i + 1);
    }
  };

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
    <div className="animate-fade-in">
      <div className="page-header">
        <div className="page-header-info">
          <div className="page-header-badge">🎯 စစ်ဆေးချက် • သင်ခန်းစာ {lesson}</div>
          <h1 className="page-header-title">{LESSON_TOPICS[lesson]} — စစ်ဆေးချက်</h1>
          <div className="page-header-sub">ဝေါဟာရ {allCards.length} ခု · အဖြေမှန်ကို ရွေးချယ်ပါ</div>
        </div>

        {started && !finished && (
          <div className="quiz-score">
            <span>မှန်သည်:</span>
            <span className="quiz-score-num">{score}</span>
            <span style={{ color: 'var(--text-muted)' }}>/ {currentIndex}</span>
          </div>
        )}

        {started && (
          <button className="btn btn-secondary" onClick={startQuiz}>↺ ပြန်စရန်</button>
        )}
      </div>

      <div className="study-area">
        {!started ? (
          /* Start Screen */
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎯</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>
              စစ်ဆေးချက် စတင်ပါ
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: '1.8' }}>
              မြန်မာဘာသာဖြင့် မှန်ကန်သောအဓိပ္ပါယ်ကို ရွေးချယ်ပါ<br />
              ဝေါဟာရ {allCards.length} ခု
            </p>
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)', padding: '16px 24px', display: 'inline-block',
              margin: '20px 0', textAlign: 'left'
            }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>နည်းလမ်း</div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                • ဂျပန်စကားလုံးကို ကြည့်ပြီး<br />
                • မြန်မာဘာသာဖြင့် မှန်ကန်သောအဓိပ္ပါယ်ကို ရွေးချယ်ပါ<br />
                • ၄ ဆင့်ရွေးချယ်ခွင့်
              </div>
            </div>
            <br />
            <button className="btn btn-gold btn-lg" onClick={startQuiz} id="start-quiz-btn">
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
            />
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
