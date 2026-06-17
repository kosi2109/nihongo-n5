import { useState, useEffect } from 'react';

export function useLessonData(lesson, type) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const loadData = async () => {
      try {
        if (type === 'vocab') {
          const module = await import(`../data/lessons/${lesson}/vocab.js`);
          if (isMounted) setData(module.vocab);
        } else if (type === 'grammar') {
          const module = await import(`../data/lessons/${lesson}/grammar.js`);
          if (isMounted) setData(module.grammar);
        }
      } catch (error) {
        console.error(`Failed to load ${type} for lesson ${lesson}:`, error);
        if (isMounted) setData([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [lesson, type]);

  return { data, loading };
}
