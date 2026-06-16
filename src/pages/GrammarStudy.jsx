import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLessonGrammar } from '../data/grammar';
import ProgressBar from '../components/ProgressBar';
import { useProgress } from '../hooks/useProgress';
import Furigana from '../components/Furigana';


const LESSON_TOPICS = {
  1: 'မိတ်ဆက်ခြင်း', 2: 'ပစ္စည်းများ', 3: 'နေရာများ', 4: 'အချိန်', 5: 'သွားလာရေး',
  6: 'စားသောက်ခြင်း', 7: 'ပေးငှားခြင်း', 8: 'တည်နေရာ', 9: 'နှစ်သက်မှု', 10: 'ရေတွက်',
  11: 'ဝိသေသနာ', 12: 'ဆန္ဒ/ဖိတ်ကြားချက်', 13: 'Te ပုံစံ', 14: 'ခွင့်/တားမြစ်', 15: 'အကြောင်းရင်း',
  16: 'တပြိုင်နက်/ကာလ', 17: 'အတွေ့အကြုံ', 18: 'ခန့်မှန်း/ထင်မြင်ချက်', 19: 'နည်းလမ်းများ', 20: 'ကြားသိမှု',
  21: 'Conditional', 22: 'ပြောင်းလဲမှု', 23: 'ပေးကမ်းခြင်း', 24: 'ကိုးကားခြင်း', 25: 'ပြန်လည်ကြည့်ရှုခြင်း'
};

function GrammarCardDisplay({ card, type = 'grammar' }) {
  const { isLearned, toggleLearned } = useProgress();
  const learned = isLearned(card.id, type);

  return (
    <div className="grammar-card animate-fade-in-up">
      <div className="grammar-card-header">
        <div className="grammar-pattern">{card.pattern}</div>
        <div className="grammar-meaning">{card.burmese_meaning}</div>
        {learned && (
          <div style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'rgba(78,203,113,0.15)', border: '1px solid var(--accent-green)',
            borderRadius: 'var(--radius-full)', padding: '3px 10px',
            fontSize: '0.7rem', color: 'var(--accent-green)', fontWeight: 600
          }}>
            ✅ သင်ယူပြီး
          </div>
        )}
      </div>

      <div className="grammar-card-body">
        {/* Structure */}
        <div className="grammar-structure-box">
          <div className="grammar-structure-label">ပုံစံ</div>
          <div className="grammar-structure-text">{card.structure}</div>
        </div>

        {/* Example */}
        <div className="grammar-example-box">
          <div className="grammar-structure-label" style={{ color: 'var(--accent-blue)' }}>ဥပမာ</div>
          <div className="grammar-example-jp">🇯🇵 {card.example_jp}</div>
          <div className="grammar-example-mm">🇲🇲 {card.example_mm}</div>
        </div>

        {/* Notes */}
        {card.notes_mm && (
          <div className="grammar-notes-box">
            <div className="grammar-notes-label">မှတ်သားရန်</div>
            <div className="grammar-notes-text">{card.notes_mm}</div>
          </div>
        )}

        {/* Mark learned */}
        <button
          className={`learned-btn ${learned ? 'learned' : ''}`}
          onClick={() => toggleLearned(card.id, type)}
          style={{ alignSelf: 'center' }}
        >
          {learned ? (
            <><span className="cb-icon cb-icon--checked">✓</span> သင်ယူပြီး</>
          ) : (
            <><span className="cb-icon">+</span> သင်ယူပြီးဟု မှတ်သားရန်</>
          )}
        </button>
      </div>
    </div>
  );
}

export default function GrammarStudy({ lesson }) {
  const cards = getLessonGrammar(lesson);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { resetLesson } = useProgress();

  const currentCard = cards[currentIndex];

  if (!cards.length) {
    return (
      <div className="animate-fade-in">
        <div className="page-header">
          <div className="page-header-info">
            <div className="page-header-badge">📝 သဒ္ဒါ • သင်ခန်းစာ {lesson}</div>
            <h1 className="page-header-title">သဒ္ဒါ</h1>
          </div>
        </div>
        <div className="study-area">
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <div>ဤသင်ခန်းစာတွင် သဒ္ဒါမရှိသေးပါ</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-info">
          <div className="page-header-badge">📝 သဒ္ဒါ • သင်ခန်းစာ {lesson}</div>
          <h1 className="page-header-title">{LESSON_TOPICS[lesson]} — သဒ္ဒါ</h1>
          <div className="page-header-sub">သဒ္ဒါပုံစံ {cards.length} ခု</div>
        </div>

        <div className="page-header-actions">
          <button className="btn btn-ghost btn-sm" onClick={() => resetLesson(cards, 'grammar')}>
            ↺ ပြန်မှတ်ရန်
          </button>
        </div>
      </div>

      {/* Progress */}
      <ProgressBar cards={cards} type="grammar" label="သဒ္ဒါ တိုးတက်မှု" />

      {/* Study Area */}
      <div className="study-area">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            <GrammarCardDisplay card={currentCard} type="grammar" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="card-controls" style={{ marginTop: '24px' }}>
          <button
            className="card-nav-btn"
            onClick={() => setCurrentIndex(i => i - 1)}
            disabled={currentIndex === 0}
          >
            ←
          </button>

          <div className="card-counter">
            <span>{currentIndex + 1}</span>
            <span style={{ color: 'var(--text-muted)' }}> / {cards.length}</span>
          </div>

          <button
            className="card-nav-btn"
            onClick={() => setCurrentIndex(i => i + 1)}
            disabled={currentIndex === cards.length - 1}
          >
            →
          </button>
        </div>

        {/* Grammar dots nav */}
        {cards.length > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '16px', flexWrap: 'wrap' }}>
            {cards.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setCurrentIndex(i)}
                style={{
                  width: '8px', height: '8px', borderRadius: '50%', border: 'none',
                  background: i === currentIndex ? 'var(--accent-blue)' : 'rgba(255,255,255,0.1)',
                  cursor: 'pointer', transition: 'all 0.2s', padding: 0,
                  transform: i === currentIndex ? 'scale(1.4)' : 'scale(1)'
                }}
                title={`သဒ္ဒါ ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
