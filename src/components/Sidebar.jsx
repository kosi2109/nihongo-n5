import { Link } from 'react-router-dom';
import { metadata } from '../data/metadata';
import { useProgress } from '../hooks/useProgress';

const LESSONS = Array.from({ length: 25 }, (_, i) => i + 1);

const LESSON_TOPICS = {
  1: 'မိတ်ဆက်ခြင်း', 2: 'ပစ္စည်းများ', 3: 'နေရာများ', 4: 'အချိန်', 5: 'သွားလာရေး',
  6: 'စားသောက်ခြင်း', 7: 'ပေးငှားခြင်း', 8: 'တည်နေရာ', 9: 'နှစ်သက်မှု', 10: 'ရေတွက်', 
  11: 'ဝိသေသနာ', 12: 'ဆန္ဒ/ဖိတ်ကြားချက်', 13: 'Te ပုံစံ', 14: 'ခွင့်/တားမြစ်', 15: 'အကြောင်းရင်း',
  16: 'တပြိုင်နက်/ကာလ', 17: 'အတွေ့အကြုံ', 18: 'ခန့်မှန်း/ထင်မြင်ချက်', 19: 'နည်းလမ်းများ', 20: 'ကြားသိမှု',
  21: 'Conditional', 22: 'ပြောင်းလဲမှု', 23: 'ပေးကမ်းခြင်း', 24: 'ကိုးကားခြင်း', 25: 'ပြန်လည်ကြည့်ရှုခြင်း'
};

export default function Sidebar({ activePage, activeLesson, isOpen, onClose }) {
  const { progress, getLessonProgress } = useProgress();

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose} />
      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo" onClick={onClose} style={{ cursor: 'pointer', textDecoration: 'none' }}>
            <span className="sidebar-logo-kanji">日</span>
            <div className="sidebar-logo-text">
              <span className="sidebar-logo-title">JLPT N5</span>
              <span className="sidebar-logo-sub">မြန်မာဘာသာ</span>
            </div>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {/* Main Nav */}
          <Link
            to="/"
            className={`sidebar-lesson-btn ${activePage === 'home' ? 'active' : ''}`}
            onClick={onClose}
            style={{ textDecoration: 'none' }}
          >
            <span style={{ fontSize: '1rem' }}>🏠</span>
            <span>ပင်မစာမျက်နှာ</span>
          </Link>

          <div className="sidebar-section-label" style={{ marginTop: '16px' }}>သင်ခန်းစာများ</div>

          <div className="sidebar-lessons">
            {LESSONS.map(lesson => {
              const { learned, total, percent } = getLessonProgress(lesson, 'any');

              return (
                <Link
                  to={`/lesson/${lesson}/vocab`}
                  key={lesson}
                  className={`sidebar-lesson-btn ${activeLesson === lesson && activePage !== 'home' && activePage !== 'sequential' ? 'active' : ''}`}
                  onClick={onClose}
                  style={{ textDecoration: 'none' }}
                >
                  <span className="sidebar-lesson-num">{lesson}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {LESSON_TOPICS[lesson]}
                    </div>
                    {percent > 0 && (
                      <div className="sidebar-lesson-progress-bar">
                        <div className="sidebar-lesson-progress-fill" style={{ width: `${percent}%` }} />
                      </div>
                    )}
                  </div>
                  {percent === 100 && <span style={{ color: 'var(--accent-green)', fontSize: '0.75rem' }}>✓</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="sidebar-footer">
          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textAlign: 'center', padding: '8px' }}>
            JLPT N5 • ဗဟုသုတသင်ကြားရေး
          </div>
        </div>
      </aside>
    </>
  );
}
