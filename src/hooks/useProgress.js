import { useState, useEffect } from 'react';
import { metadata } from '../data/metadata';

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

  const getLessonProgress = (lessonId, type = 'vocab') => {
    if (type === 'any') {
      const vocabIds = metadata[lessonId]?.vocab || [];
      const grammarIds = metadata[lessonId]?.grammar || [];
      const learned = vocabIds.filter(id => progress[`vocab_${id}`]).length +
                      grammarIds.filter(id => progress[`grammar_${id}`]).length;
      const total = vocabIds.length + grammarIds.length;
      return { learned, total, percent: total ? Math.round((learned / total) * 100) : 0 };
    } else {
      const ids = metadata[lessonId]?.[type] || [];
      const learned = ids.filter(id => progress[`${type}_${id}`]).length;
      const total = ids.length;
      return { learned, total, percent: total ? Math.round((learned / total) * 100) : 0 };
    }
  };

  const getOverallProgress = () => {
    let learned = 0;
    let total = 0;
    for (let i = 1; i <= 25; i++) {
      if (metadata[i]) {
        learned += metadata[i].vocab.filter(id => progress[`vocab_${id}`]).length;
        learned += metadata[i].grammar.filter(id => progress[`grammar_${id}`]).length;
        total += metadata[i].vocab.length + metadata[i].grammar.length;
      }
    }
    return { learned, total, percent: total ? Math.round((learned / total) * 100) : 0 };
  };

  const resetLesson = (lessonId, type = 'vocab') => {
    setProgress(prev => {
      const next = { ...prev };
      if (type === 'any' || type === 'vocab') {
        (metadata[lessonId]?.vocab || []).forEach(id => delete next[`vocab_${id}`]);
      }
      if (type === 'any' || type === 'grammar') {
        (metadata[lessonId]?.grammar || []).forEach(id => delete next[`grammar_${id}`]);
      }
      return next;
    });
  };

  const resetAll = () => setProgress({});

  return { 
    progress, 
    markLearned, 
    markUnlearned, 
    toggleLearned, 
    isLearned, 
    getLessonProgress, 
    getOverallProgress, 
    resetLesson, 
    resetAll 
  };
}
