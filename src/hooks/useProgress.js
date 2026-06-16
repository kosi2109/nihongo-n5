// Progress hook using localStorage
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'n5_progress';

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markLearned = (cardId, type = 'vocab') => {
    const key = `${type}_${cardId}`;
    setProgress(prev => ({ ...prev, [key]: true }));
  };

  const markUnlearned = (cardId, type = 'vocab') => {
    const key = `${type}_${cardId}`;
    setProgress(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const toggleLearned = (cardId, type = 'vocab') => {
    const key = `${type}_${cardId}`;
    if (progress[key]) {
      markUnlearned(cardId, type);
    } else {
      markLearned(cardId, type);
    }
  };

  const isLearned = (cardId, type = 'vocab') => {
    return !!progress[`${type}_${cardId}`];
  };

  const getLessonProgress = (lessonCards, type = 'vocab') => {
    const learned = lessonCards.filter(c => progress[`${type}_${c.id}`]).length;
    return { learned, total: lessonCards.length, percent: lessonCards.length ? Math.round((learned / lessonCards.length) * 100) : 0 };
  };

  const resetLesson = (lessonCards, type = 'vocab') => {
    setProgress(prev => {
      const next = { ...prev };
      lessonCards.forEach(c => delete next[`${type}_${c.id}`]);
      return next;
    });
  };

  const resetAll = () => setProgress({});

  return { progress, markLearned, markUnlearned, toggleLearned, isLearned, getLessonProgress, resetLesson, resetAll };
}
