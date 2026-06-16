import { useProgress } from '../hooks/useProgress';

export default function ProgressBar({ cards, type = 'vocab', label }) {
  const { getLessonProgress } = useProgress();
  const { learned, total, percent } = getLessonProgress(cards, type);

  return (
    <div className="progress-section">
      <div className="progress-info">
        <span className="progress-label">{label || 'တိုးတက်မှု'}</span>
        <span className="progress-stat">
          {learned}/{total} ကတ် ({percent}%)
        </span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
