import { useState, useEffect } from 'react';
import { BOOT_MESSAGES } from '../data/profile';

interface BootScreenProps {
  onComplete: () => void;
}

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showLogo, setShowLogo] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (visibleLines < BOOT_MESSAGES.length) {
      const delay = Math.random() * 80 + 40;
      const timer = setTimeout(() => setVisibleLines(v => v + 1), delay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => setShowLogo(true), 300);
      return () => clearTimeout(timer);
    }
  }, [visibleLines]);

  useEffect(() => {
    if (showLogo) {
      const timer = setTimeout(() => setFadingOut(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [showLogo]);

  useEffect(() => {
    if (fadingOut) {
      const timer = setTimeout(onComplete, 500);
      return () => clearTimeout(timer);
    }
  }, [fadingOut, onComplete]);

  return (
    <div className={`fixed inset-0 bg-black flex flex-col justify-start overflow-hidden z-[9999] transition-opacity duration-500 ${
      fadingOut ? 'opacity-0' : 'opacity-100'
    }`}>
      {!showLogo ? (
        <div className="p-4 font-mono text-sm">
          {BOOT_MESSAGES.slice(0, visibleLines).map((msg, i) => (
            <div
              key={i}
              className="animate-boot-text"
              style={{
                color: msg.includes('[portfolio]')
                  ? '#367bf0'
                  : msg.includes('Welcome')
                  ? '#2ecc71'
                  : '#8892a0',
              }}
            >
              {msg}
            </div>
          ))}
          {visibleLines < BOOT_MESSAGES.length && (
            <span className="terminal-cursor" />
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
          <pre className="text-kali-accent text-xs sm:text-sm leading-tight mb-6 font-mono">
{`
    ⠀⠀⠀⠀⠀⠀⣠⣶⣿⣿⣶⣄⠀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⢀⣾⣿⡿⠛⠛⢿⣿⣷⡀⠀⠀⠀⠀
    ⠀⠀⠀⠀⣾⣿⡏⠀⠀⠀⠀⢹⣿⣷⠀⠀⠀⠀
    ⠀⠀⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀
    ⠀⠀⠀⢸⣿⣿⠀⠀⢀⠀⠀⠀⣿⣿⡇⠀⠀⠀
    ⠀⠀⠀⠀⣿⣿⡄⠀⠘⠃⠀⢠⣿⣿⠀⠀⠀⠀
    ⠀⠀⠀⠀⠘⣿⣿⣄⠀⠀⣠⣿⣿⠃⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠉⠻⠟⠉⠀⠀⠀⠀⠀⠀⠀
`}
          </pre>
          <h1 className="text-2xl font-bold text-kali-accent tracking-wider">
            TishantOS
          </h1>
          <p className="text-kali-muted text-sm mt-2">Loading desktop environment...</p>
          <div className="mt-6 w-64 h-1 bg-kali-border rounded-full overflow-hidden">
            <div
              className="h-full bg-kali-accent rounded-full transition-all duration-1000"
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}
      <div className="absolute inset-0 scanlines pointer-events-none" />
    </div>
  );
}
