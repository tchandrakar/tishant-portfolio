import { useState, useCallback } from 'react';
import type { AppScreen } from './types';
import { useWindowManager } from './hooks/useWindowManager';
import BootScreen from './components/BootScreen';
import LockScreen from './components/LockScreen';
import TopBar from './components/TopBar';
import Desktop from './components/Desktop';
import Dock from './components/Dock';
import Window from './components/Window';
import ContextMenu from './components/ContextMenu';
import TerminalApp from './components/Terminal';
import FileManager from './components/FileManager';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Resume from './components/Resume';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('boot');
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  const {
    windows,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updatePosition,
  } = useWindowManager();

  const handleBootComplete = useCallback(() => setScreen('lock'), []);
  const handleUnlock = useCallback(() => setScreen('desktop'), []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    // Only show context menu on the desktop background
    if ((e.target as HTMLElement).closest('.window-shadow') || (e.target as HTMLElement).closest('.dock-glass')) return;
    setContextMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const handleDesktopClick = useCallback(() => {
    setContextMenu(null);
  }, []);

  // Get the top-most window title for the panel
  const topWindow = windows
    .filter(w => w.isOpen && !w.isMinimized)
    .sort((a, b) => b.zIndex - a.zIndex)[0];

  const renderWindowContent = (id: string) => {
    switch (id) {
      case 'terminal':
        return <TerminalApp onOpenApp={openWindow} />;
      case 'file-manager':
        return <FileManager />;
      case 'about':
        return <AboutMe />;
      case 'projects':
        return <Projects />;
      case 'skills':
        return <Skills />;
      case 'contact':
        return <Contact />;
      case 'resume':
        return <Resume />;
      default:
        return <div className="p-4 text-kali-muted">Application not found</div>;
    }
  };

  if (screen === 'boot') {
    return <BootScreen onComplete={handleBootComplete} />;
  }

  if (screen === 'lock') {
    return <LockScreen onUnlock={handleUnlock} />;
  }

  return (
    <div
      className="fixed inset-0 kali-wallpaper overflow-hidden"
      onContextMenu={handleContextMenu}
      onClick={handleDesktopClick}
    >
      {/* Top Panel */}
      <TopBar activeWindow={topWindow?.title} />

      {/* Desktop Icons */}
      <Desktop onOpenApp={openWindow} />

      {/* Kali dragon watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.025]">
        <svg width="500" height="500" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="dragonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#367bf0" />
              <stop offset="100%" stopColor="#4bc1c9" />
            </linearGradient>
          </defs>
          {/* Stylized Kali-inspired dragon/shield shape */}
          <path
            d="M100 10 L180 50 L180 130 Q180 170 140 190 L100 200 L60 190 Q20 170 20 130 L20 50 Z"
            fill="url(#dragonGrad)"
          />
          <path
            d="M100 30 L160 60 L160 125 Q160 155 130 175 L100 185 L70 175 Q40 155 40 125 L40 60 Z"
            fill="#0d0d1a"
          />
          <path
            d="M100 50 L140 70 L140 120 Q140 142 120 155 L100 165 L80 155 Q60 142 60 120 L60 70 Z"
            fill="url(#dragonGrad)"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Windows */}
      {windows.map(win => (
        <Window
          key={win.id}
          window={win}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onMaximize={() => maximizeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
          onPositionChange={pos => updatePosition(win.id, pos)}
        >
          {renderWindowContent(win.id)}
        </Window>
      ))}

      {/* Dock */}
      <Dock windows={windows} onOpenApp={openWindow} />

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          onOpenApp={openWindow}
        />
      )}
    </div>
  );
}
