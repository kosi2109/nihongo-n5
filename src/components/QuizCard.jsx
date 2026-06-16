import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Furigana from './Furigana';

function shuffleArray(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getOptions(correctCard, allCards, count = 4) {
  const others = allCards.filter(c => c.id !== correctCard.id);
  const shuffled = shuffleArray(others).slice(0, count - 1);
  return shuffleArray([correctCard, ...shuffled]);
}

export default function QuizCard({ card, allCards, onNext, total, current }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setOptions(getOptions(card, allCards));
    setSelected(null);
    setAnswered(false);
  }, [card.id]);

  const handleSelect = (opt) => {
    if (answered) return;
    setSelected(opt.id);
    setAnswered(true);
    setTimeout(() => {
      onNext(opt.id === card.id);
    }, 1200);
  };

  const getOptionClass = (opt) => {
    if (!answered) return 'quiz-option';
    if (opt.id === card.id) return 'quiz-option correct';
    if (opt.id === selected) return 'quiz-option wrong';
    return 'quiz-option';
  };

  return (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.3 }}
    >
      <div className="quiz-question">
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {current} / {total}
        </div>
        {/* Furigana display on quiz question */}
        <div className="quiz-question-text">
          <Furigana text={card.japanese} reading={card.reading} size="normal" />
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
          မြန်မာဘာသာဖြင့် ဘာကိုဆိုလိုသနည်း?
        </div>
      </div>

      <div className="quiz-options">
        {options.map(opt => (
          <button
            key={opt.id}
            className={getOptionClass(opt)}
            onClick={() => handleSelect(opt)}
            disabled={answered}
          >
            {opt.burmese}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
