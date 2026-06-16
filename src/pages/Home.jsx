import { vocabulary, getLessonVocab } from '../data/vocabulary';
import { grammar, getLessonGrammar } from '../data/grammar';
import { useProgress } from '../hooks/useProgress';

const LESSONS = Array.from({ length: 25 }, (_, i) => i + 1);

const LESSON_TOPICS = {
  1: 'မိတ်ဆက်ခြင်း', 2: 'ပစ္စည်းများ', 3: 'နေရာများ', 4: 'အချိန်', 5: 'သွားလာရေး',
  6: 'စားသောက်ခြင်း', 7: 'ပေးငှားခြင်း', 8: 'တည်နေရာ', 9: 'နှစ်သက်မှု', 10: 'ရေတွက်',
  11: 'ဝိသေသနာ', 12: 'ဆန္ဒ/ဖိတ်ကြားချက်', 13: 'Te ပုံစံ', 14: 'ခွင့်/တားမြစ်', 15: 'အကြောင်းရင်း',
  16: 'တပြိုင်နက်/ကာလ', 17: 'အတွေ့အကြုံ', 18: 'ခန့်မှန်း/ထင်မြင်ချက်', 19: 'နည်းလမ်းများ', 20: 'ကြားသိမှု',
  21: 'Conditional', 22: 'ပြောင်းလဲမှု', 23: 'ပေးကမ်းခြင်း', 24: 'ကိုးကားခြင်း', 25: 'ပြန်လည်ကြည့်ရှုခြင်း'
};

export default function Home({ onSelectLesson, onSelectMode = () => {} }) {
  const { getLessonProgress } = useProgress();

  const totalVocab = vocabulary.length;
  const totalGrammar = grammar.length;
  const totalCards = totalVocab + totalGrammar;

  const allVocabProg = getLessonProgress(vocabulary, 'vocab');
  const allGramProg = getLessonProgress(grammar, 'grammar');
  const totalLearned = allVocabProg.learned + allGramProg.learned;
  const overallPercent = Math.round((totalLearned / totalCards) * 100);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div className="home-hero">
        <div className="home-hero-badge">🎌 JLPT N5 • မြန်မာဘာသာ</div>
        <h1 className="home-hero-title">
          <span className="gradient-text">ဂျပန်ဘာသာ</span>
          <span className="jp-text">日本語を学ぼう</span>
        </h1>
        <p className="home-hero-desc">
          N5 သင်ခန်းစာ ၂၅ ခုအတွက် ဝေါဟာရနှင့် သဒ္ဒါများကို မြန်မာဘာသာဖြင့် flashcard ပုံစံဖြင့် လေ့လာပါ။
          ဂျပန်အက္ခရာပေါ်တွင် ဖတ်နည်း (ふりがな) ပါဝင်သည်။
        </p>

        <div className="home-stats">
          <div className="home-stat">
            <div className="home-stat-num">{totalVocab}</div>
            <div className="home-stat-label">ဝေါဟာရ</div>
          </div>
          <div className="home-stat">
            <div className="home-stat-num">{totalGrammar}</div>
            <div className="home-stat-label">သဒ္ဒါ</div>
          </div>
          <div className="home-stat">
            <div className="home-stat-num">25</div>
            <div className="home-stat-label">သင်ခန်းစာ</div>
          </div>
          <div className="home-stat">
            <div className="home-stat-num">{overallPercent}%</div>
            <div className="home-stat-label">ပြီးစီးမှု</div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div style={{ maxWidth: '400px', margin: '0 auto 36px', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <span>စုစုပေါင်း တိုးတက်မှု</span>
            <span style={{ color: 'var(--accent-green)' }}>{totalLearned} / {totalCards}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${overallPercent}%` }} />
          </div>
        </div>

        {/* ===== MODE SELECTOR ===== */}
        <div style={{ marginBottom: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
          လေ့လာမှုပုံစံ ရွေးချယ်ပါ
        </div>
        <div className="mode-selector">
          {/* Sequential Mode */}
          <div
            className="mode-card mode-card--sequential"
            onClick={() => onSelectMode('sequential')}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onSelectMode('sequential')}
            id="mode-sequential"
          >
            <span className="mode-card-badge" style={{ background: 'rgba(245,200,66,0.15)', color: 'var(--accent-gold)', border: '1px solid rgba(245,200,66,0.3)' }}>
              အကြံပြု
            </span>
            <span className="mode-card-icon">📖</span>
            <div className="mode-card-title">သင်ခန်းစာ တစ်ဆင့်ချင်းစီ</div>
            <div className="mode-card-desc">
              Lesson 1 မှ စပြီး<br/>တဆင့်ချင်းစီ လေ့လာပါ
            </div>
          </div>

          {/* Browse Mode */}
          <div
            className="mode-card mode-card--browse"
            onClick={() => onSelectMode('browse')}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onSelectMode('browse')}
            id="mode-browse"
          >
            <span className="mode-card-icon">📚</span>
            <div className="mode-card-title">သင်ခန်းစာ ရွေးချယ်ကြည့်ရှု</div>
            <div className="mode-card-desc">
              ကြိုက်သောသင်ခန်းစာကို<br/>တိုက်ရိုက်ရွေးချယ်ပါ
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Grid (Browse mode quick access) */}
      <div style={{ padding: '0 var(--space-2xl)', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
          သင်ခန်းစာများ
        </h2>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>နှိပ်ပြီး ဝင်ရောက်ပါ →</span>
      </div>

      <div className="home-lessons-grid">
        {LESSONS.map(lesson => {
          const vocabCards = getLessonVocab(lesson);
          const grammarCards = getLessonGrammar(lesson);
          const vocabProg = getLessonProgress(vocabCards, 'vocab');
          const gramProg = getLessonProgress(grammarCards, 'grammar');
          const totalLearned = vocabProg.learned + gramProg.learned;
          const totalCards = vocabProg.total + gramProg.total;
          const percent = totalCards > 0 ? Math.round((totalLearned / totalCards) * 100) : 0;

          return (
            <div
              key={lesson}
              className="lesson-card"
              onClick={() => onSelectLesson(lesson)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelectLesson(lesson)}
              id={`lesson-card-${lesson}`}
            >
              <div className="lesson-card-num">သင်ခန်းစာ {lesson}</div>
              <div className="lesson-card-title">{LESSON_TOPICS[lesson]}</div>
              <div className="lesson-card-count">
                {vocabCards.length} ဝေါဟာရ • {grammarCards.length} သဒ္ဒါ
              </div>
              <div className="lesson-card-progress">
                <div className="lesson-card-progress-fill" style={{ width: `${percent}%` }} />
              </div>
              {percent === 100 && (
                <div style={{ marginTop: '6px', fontSize: '0.7rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                  ✅ ပြီးစီးသည်
                </div>
              )}
              {percent > 0 && percent < 100 && (
                <div style={{ marginTop: '6px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {percent}% ပြီးသည်
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
        <div style={{ fontFamily: 'var(--font-jp)', fontSize: '1.5rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>頑張ってください！</div>
        ကြိုးစားပါ！
      </div>
    </div>
  );
}
