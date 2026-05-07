import { useCallback, useEffect, useState } from 'react';
import type { AtlasProgress } from './types';

const KEY = 'hld-vault-progress.v1';

function read(): AtlasProgress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { completed: [], lastLessonId: null };
    const p = JSON.parse(raw);
    return {
      completed: Array.isArray(p.completed) ? p.completed : [],
      lastLessonId: p.lastLessonId ?? null,
    };
  } catch {
    return { completed: [], lastLessonId: null };
  }
}

function write(p: AtlasProgress) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch {}
}

export function useAtlasProgress() {
  const [progress, setProgress] = useState<AtlasProgress>(() => read());

  // Sync across tabs / windows
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) setProgress(read());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const isComplete = useCallback(
    (id: string) => progress.completed.includes(id),
    [progress]
  );

  const setComplete = useCallback((id: string, complete: boolean) => {
    setProgress(prev => {
      const set = new Set(prev.completed);
      if (complete) set.add(id); else set.delete(id);
      const next = { ...prev, completed: [...set] };
      write(next);
      return next;
    });
  }, []);

  const toggle = useCallback((id: string) => {
    setProgress(prev => {
      const set = new Set(prev.completed);
      if (set.has(id)) set.delete(id); else set.add(id);
      const next = { ...prev, completed: [...set] };
      write(next);
      return next;
    });
  }, []);

  const setLast = useCallback((id: string | null) => {
    setProgress(prev => {
      const next = { ...prev, lastLessonId: id };
      write(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    const next: AtlasProgress = { completed: [], lastLessonId: null };
    write(next);
    setProgress(next);
  }, []);

  return { progress, isComplete, setComplete, toggle, setLast, reset };
}
