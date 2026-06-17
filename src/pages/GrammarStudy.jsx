import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLessonData } from '../hooks/useLessonData';
import ProgressBar from '../components/ProgressBar';
import { useProgress } from '../hooks/useProgress';
import Furigana, { FuriganaText } from '../components/Furigana';
import { FURIGANA_MAP } from '../data/furiganaMap';

const LESSON_TOPICS = {
  1: 'မိတ်ဆက်ခြင်း', 2: 'ပစ္စည်းများ', 3: 'နေရာများ', 4: 'အချိန်', 5: 'သွားလာရေး',
  6: 'စားသောက်ခြင်း', 7: 'ပေးငှားခြင်း', 8: 'တည်နေရာ', 9: 'နှစ်သက်မှု', 10: 'ရေတွက်',
  11: 'ဝိသေသနာ', 12: 'ဆန္ဒ/ဖိတ်ကြားချက်', 13: 'Te ပုံစံ', 14: 'ခွင့်/တားမြစ်', 15: 'အကြောင်းရင်း',
  16: 'တပြိုင်နက်/ကာလ', 17: 'အတွေ့အကြုံ', 18: 'ခန့်မှန်း/ထင်မြင်ချက်', 19: 'နည်းလမ်းများ', 20: 'ကြားသိမှု',
  21: 'Conditional', 22: 'ပြောင်းလဲမှု', 23: 'ပေးကမ်းခြင်း', 24: 'ကိုးကားခြင်း', 25: 'ပြန်လည်ကြည့်ရှုခြင်း'
};

function ExamplesSection({ examples }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{
      background: 'rgba(74,144,217,0.04)',
      border: '1px solid rgba(74,144,217,0.15)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
    }}>
      {/* Header toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px', background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'var(--accent-blue)', fontFamily: 'var(--font-ui)',
        }}
      >
        <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          📖 ဥပမာ ဝါကျများ ({examples.length})
        </span>
        <span style={{ fontSize: '0.8rem', opacity: 0.7, transition: 'transform 0.2s', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
      </button>

      {open && (
        <div style={{ padding: '0 14px 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {examples.map((ex, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-md)',
              padding: '10px 12px',
              borderLeft: '3px solid var(--accent-blue)',
            }}>
              {/* Number badge */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <span style={{
                  flexShrink: 0, width: '20px', height: '20px', borderRadius: '50%',
                  background: 'rgba(74,144,217,0.18)', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: 'var(--accent-blue)',
                }}>{i + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="grammar-example-jp" style={{ marginBottom: '4px' }}>
                    <FuriganaText text={ex.jp} furiganaMap={FURIGANA_MAP} size="small" />
                  </div>
                  <div className="grammar-example-mm" style={{ color: 'var(--text-secondary)' }}>
                    {ex.mm}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

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

        {/* Single main example */}
        <div className="grammar-example-box">
          <div className="grammar-structure-label" style={{ color: 'var(--accent-blue)' }}>ဥပမာ (ပင်မ)</div>
          <div className="grammar-example-jp">
            🇯🇵 <FuriganaText text={card.example_jp} furiganaMap={FURIGANA_MAP} size="small" />
          </div>
          <div className="grammar-example-mm">🇲🇲 {card.example_mm}</div>
        </div>

        {/* Additional examples array */}
        {card.examples && card.examples.length > 0 && (
          <ExamplesSection examples={card.examples} />
        )}

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
  const { data: originalCards, loading } = useLessonData(lesson, 'grammar');
  const [grammarCards, setGrammarCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isLearned, toggleLearned, resetLesson } = useProgress();

  useEffect(() => {
    setGrammarCards(originalCards);
    setCurrentIndex(0);
  }, [originalCards]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div style={{ color: 'var(--text-muted)' }}>Loading Grammar Data...</div>
      </div>
    );
  }

  const currentGrammar = grammarCards[currentIndex];
  const cards = grammarCards;
  const currentCard = currentGrammar;

  if (!grammarCards.length) {
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
    <div className="animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
      <ProgressBar lesson={lesson} type="grammar" label="သဒ္ဒါ တိုးတက်မှု" />

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
