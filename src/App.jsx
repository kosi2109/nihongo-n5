import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import VocabStudy from './pages/VocabStudy';
import GrammarStudy from './pages/GrammarStudy';
import Quiz from './pages/Quiz';
import SequentialStudy from './pages/SequentialStudy';
import './index.css';

// 'home' | 'sequential' | 'vocab' | 'grammar' | 'quiz'
export default function App() {
  const [activeLesson, setActiveLesson] = useState(1);
  const [activePage, setActivePage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectLesson = (lesson) => {
    setActiveLesson(lesson);
    setActivePage('vocab');
    setSidebarOpen(false);
  };

  const handleSelectPage = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const handleSelectMode = (mode) => {
    if (mode === 'sequential') {
      setActivePage('sequential');
    } else {
      // Browse mode — stay on home, scroll down to lessons grid
      document.querySelector('.home-lessons-grid')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isLesson = activePage === 'vocab' || activePage === 'grammar' || activePage === 'quiz';

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        activeLesson={activeLesson}
        onSelectLesson={handleSelectLesson}
        onSelectPage={handleSelectPage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="app-content">
        {/* Mobile Top Bar */}
        <div style={{
          display: 'none',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'sticky',
          top: 0,
          zIndex: 60
        }} className="mobile-topbar">
          <button
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(o => !o)}
            aria-label="Menu ဖွင့်ရန်"
          >☰</button>
          <div style={{ fontFamily: 'var(--font-jp)', fontSize: '1.2rem', color: 'var(--text-primary)' }}>日本語 N5</div>
        </div>

        {/* Sub-tab nav for Browse (lesson-specific) mode */}
        {isLesson && (
          <div className="subtab-bar" style={{
            display: 'flex',
            gap: '4px',
            padding: '12px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-secondary)',
            position: 'sticky',
            top: 0,
            zIndex: 55,
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <div className="tabs" style={{ flex: 1, maxWidth: '400px' }}>
              <button
                className={`tab-btn ${activePage === 'vocab' ? 'active' : ''}`}
                onClick={() => setActivePage('vocab')}
                id="tab-vocab"
              >📚 ဝေါဟာရ</button>
              <button
                className={`tab-btn ${activePage === 'grammar' ? 'active' : ''}`}
                onClick={() => setActivePage('grammar')}
                id="tab-grammar"
              >📝 သဒ္ဒါ</button>
              <button
                className={`tab-btn ${activePage === 'quiz' ? 'active' : ''}`}
                onClick={() => setActivePage('quiz')}
                id="tab-quiz"
              >🎯 စစ်ဆေး</button>
            </div>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setActivePage('home')}
              style={{ color: 'var(--text-muted)' }}
            >← ပင်မ</button>
          </div>
        )}

        {/* Sequential top bar */}
        {activePage === 'sequential' && (
          <div style={{
            padding: '8px 24px',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setActivePage('home')}
              style={{ color: 'var(--text-muted)' }}
            >← ပင်မ</button>
          </div>
        )}

        {/* Page Content */}
        {activePage === 'home' && (
          <Home
            onSelectLesson={handleSelectLesson}
            onSelectMode={handleSelectMode}
          />
        )}
        {activePage === 'sequential' && (
          <SequentialStudy key="sequential" />
        )}
        {activePage === 'vocab' && (
          <VocabStudy lesson={activeLesson} key={`vocab-${activeLesson}`} />
        )}
        {activePage === 'grammar' && (
          <GrammarStudy lesson={activeLesson} key={`grammar-${activeLesson}`} />
        )}
        {activePage === 'quiz' && (
          <Quiz lesson={activeLesson} key={`quiz-${activeLesson}`} />
        )}
      </main>

      <style>{`
        @media (max-width: 768px) {
          .mobile-topbar { display: flex !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
