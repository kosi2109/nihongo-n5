import { useState } from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../hooks/useProgress';
import Furigana, { FuriganaText } from './Furigana';
import { FURIGANA_MAP } from '../data/furiganaMap';

const TYPE_LABELS = {
  noun: 'နာမ်', verb: 'ကြိယာ', 'adj-i': 'い-ဝိသေသနာ', 'adj-na': 'な-ဝိသေသနာ',
  adj: 'ဝိသေသနာ', particle: 'particle', expression: 'အသုံးအနှုန်း', counter: 'ကိန်းစကား',
  pronoun: 'နာမ်စား', question: 'မေးခွန်း', pattern: 'ပုံစံ', adverb: 'ကြိယာဝိသေသ', suffix: 'နောက်ဆက်'
};

export default function FlashCard({ card, type = 'vocab' }) {
  const [flipped, setFlipped] = useState(false);
  const { isLearned, toggleLearned } = useProgress();
  const learned = isLearned(card.id, type);

  const handleFlip = () => setFlipped(f => !f);
  const handleLearned = (e) => {
    e.stopPropagation();
    toggleLearned(card.id, type);
  };

  const badgeClass = `badge badge-${card.type || 'noun'}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
      <div className="flashcard-scene" onClick={handleFlip}>
        <motion.div
          className="flashcard-container"
          initial={false}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformStyle: 'preserve-3d', width: '100%', aspectRatio: '3/2', position: 'relative', cursor: 'pointer' }}
        >
          {/* ===== FRONT: Japanese with furigana ===== */}
          <div className="flashcard-face flashcard-front" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
            {card.type && (
              <div className="flashcard-type-badge">
                <span className={badgeClass}>
                  {TYPE_LABELS[card.type] || card.type}
                </span>
              </div>
            )}

            {/* Furigana display — reading on top, kanji below */}
            <div className="flashcard-kanji" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '4px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <Furigana text={card.japanese} reading={card.reading} size="normal" />
            </div>

            {/* Romaji below */}
            {card.romaji && (
              <div className="flashcard-romaji">{card.romaji}</div>
            )}

            <div className="flashcard-hint">
              <span>👆</span>
              <span>နှိပ်ပြီး အဓိပ္ပါယ်ကြည့်ပါ</span>
            </div>
          </div>

          {/* ===== BACK: Burmese meaning + example ===== */}
          <div className="flashcard-face flashcard-back" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
            <div className="flashcard-back-content">
              {/* Show kanji with furigana (small) on back too for reference */}
              <div style={{ marginBottom: '4px' }}>
                <Furigana text={card.japanese} reading={card.reading} size="medium" />
              </div>

              <div className="flashcard-burmese">{card.burmese}</div>

              {card.example_jp && (
                <div className="flashcard-example">
                  <div className="flashcard-example-jp">
                    📝 <FuriganaText text={card.example_jp} furiganaMap={FURIGANA_MAP} size="small" />
                  </div>
                  {card.example_mm && (
                    <div className="flashcard-example-mm">🇲🇲 {card.example_mm}</div>
                  )}
                </div>
              )}
            </div>

            <div className="flashcard-hint">
              <span>👆</span>
              <span>နှိပ်ပြန်ကတ်ကြည့်ပါ</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Learned Button */}
      <button
        className={`learned-btn ${learned ? 'learned' : ''}`}
        onClick={handleLearned}
      >
        {learned ? (
          <><span className="cb-icon cb-icon--checked">✓</span> သင်ယူပြီး</>
        ) : (
          <><span className="cb-icon">+</span> သင်ယူပြီးဟု မှတ်သားရန်</>
        )}
      </button>
    </div>
  );
}
