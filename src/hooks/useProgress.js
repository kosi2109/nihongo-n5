import { useState, useEffect } from 'react';
import { metadata } from '../data/metadata';

const STORAGE_KEY = 'n5_progress';

// ----------------------------------------------------------------------------
// Global state implementation to ensure all components share the same progress
// and trigger re-renders instantly when any component updates it.
// ----------------------------------------------------------------------------

let globalProgress = {};
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    globalProgress = JSON.parse(saved);
  }
} catch (e) {
  console.error("Failed to load progress from localStorage", e);
}

const listeners = new Set();

function setGlobalProgress(updater) {
  if (typeof updater === 'function') {
    globalProgress = updater(globalProgress);
  } else {
    globalProgress = updater;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(globalProgress));
  } catch (e) {
    console.error("Failed to save progress to localStorage", e);
  }
  
  // Notify all components using this hook to re-render
  listeners.forEach(listener => listener(globalProgress));
}

// ----------------------------------------------------------------------------
// The hook
// ----------------------------------------------------------------------------

export function useProgress() {
  const [progress, setProgress] = useState(globalProgress);

  useEffect(() => {
    // Subscribe this component to global updates
    listeners.add(setProgress);
    return () => {
      // Unsubscribe on unmount
      listeners.delete(setProgress);
    };
  }, []);

  const markLearned = (cardId, type = 'vocab') => {
    const key = `${type}_${cardId}`;
    setGlobalProgress(prev => ({ ...prev, [key]: true }));
  };

  const markUnlearned = (cardId, type = 'vocab') => {
    const key = `${type}_${cardId}`;
    setGlobalProgress(prev => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const toggleLearned = (cardId, type = 'vocab') => {
    const key = `${type}_${cardId}`;
    if (globalProgress[key]) {
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
    setGlobalProgress(prev => {
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

  const resetAll = () => setGlobalProgress({});

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
