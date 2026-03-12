import { useState, useCallback } from 'react';
import type { WindowState } from '../types';

const DEFAULT_WINDOWS: Record<string, Omit<WindowState, 'isOpen' | 'isMinimized' | 'isMaximized' | 'zIndex'>> = {
  terminal: {
    id: 'terminal',
    title: 'Terminal',
    icon: 'terminal',
    position: { x: 100, y: 80 },
    size: { width: 750, height: 480 },
  },
  'file-manager': {
    id: 'file-manager',
    title: 'Files',
    icon: 'folder',
    position: { x: 150, y: 100 },
    size: { width: 800, height: 520 },
  },
  about: {
    id: 'about',
    title: 'About Me — Text Editor',
    icon: 'user',
    position: { x: 200, y: 60 },
    size: { width: 700, height: 500 },
  },
  projects: {
    id: 'projects',
    title: 'Projects — Firefox',
    icon: 'globe',
    position: { x: 120, y: 70 },
    size: { width: 850, height: 550 },
  },
  skills: {
    id: 'skills',
    title: 'System Monitor — Skills',
    icon: 'cpu',
    position: { x: 180, y: 90 },
    size: { width: 700, height: 520 },
  },
  contact: {
    id: 'contact',
    title: 'Contact — Thunderbird',
    icon: 'mail',
    position: { x: 160, y: 80 },
    size: { width: 650, height: 500 },
  },
  resume: {
    id: 'resume',
    title: 'Resume.pdf — Document Viewer',
    icon: 'file-text',
    position: { x: 140, y: 60 },
    size: { width: 700, height: 550 },
  },
};

export function useWindowManager() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);

  const openWindow = useCallback((id: string) => {
    setWindows(prev => {
      const existing = prev.find(w => w.id === id);
      if (existing) {
        // If already open, bring to front and unminimize
        return prev.map(w =>
          w.id === id
            ? { ...w, isMinimized: false, zIndex: nextZIndex }
            : w
        );
      }
      // Create new window
      const config = DEFAULT_WINDOWS[id];
      if (!config) return prev;

      // Offset position slightly for each new window
      const offset = (prev.length % 5) * 30;
      return [
        ...prev,
        {
          ...config,
          position: { x: config.position.x + offset, y: config.position.y + offset },
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZIndex,
        },
      ];
    });
    setNextZIndex(z => z + 1);
  }, [nextZIndex]);

  const closeWindow = useCallback((id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  }, []);

  const minimizeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const maximizeWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
  }, []);

  const focusWindow = useCallback((id: string) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, zIndex: nextZIndex } : w))
    );
    setNextZIndex(z => z + 1);
  }, [nextZIndex]);

  const updatePosition = useCallback((id: string, position: { x: number; y: number }) => {
    setWindows(prev =>
      prev.map(w => (w.id === id ? { ...w, position } : w))
    );
  }, []);

  return {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
  };
}
