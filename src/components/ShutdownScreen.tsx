import { useState, useEffect } from 'react';

const SHUTDOWN_MESSAGES = [
  '[    0.000000] Initiating system shutdown...',
  '[    0.064512] Stopping GDM (GNOME Display Manager)...',
  '[    0.128023] [gdm] Session closed: kali-xfce',
  '[    0.192045] Stopping portfolio services...',
  '[    0.256067] [portfolio] projects.ko unloaded',
  '[    0.320090] [portfolio] skills.ko unloaded',
  '[    0.384112] [portfolio] experience.ko unloaded',
  '[    0.448134] [portfolio] certifications.ko unloaded',
  '[    0.512156] Terminating remaining processes...',
  '[    0.640178] NET: Unregistered protocol family 2',
  '[    0.768201] USB subsystem deactivated',
  '[    0.896223] Unmounting filesystems...',
  '[    1.024245] Flushing disk caches...',
  '[    1.152267] [ext4] Unmounted /dev/sda1 cleanly',
  '[    1.280289] ACPI: Preparing to enter sleep state S5',
  '[    1.408312] Power down.',
];

interface ShutdownScreenProps {
  onComplete: () => void;
}

export default function ShutdownScreen({ onComplete }: ShutdownScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showLogo, setShowLogo] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (visibleLines < SHUTDOWN_MESSAGES.length) {
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
      const timer = setTimeout(() => setFadingOut(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [showLogo]);

  useEffect(() => {
    if (fadingOut) {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
  }, [fadingOut, onComplete]);

  return (
    <div className={`fixed inset-0 bg-black flex flex-col justify-start overflow-hidden z-[9999] transition-opacity duration-500 ${
      fadingOut ? 'opacity-0' : 'opacity-100'
    }`}>
      {!showLogo ? (
        <div className="p-4 font-mono text-sm">
          {SHUTDOWN_MESSAGES.slice(0, visibleLines).map((msg, i) => (
            <div
              key={i}
              className="animate-boot-text"
              style={{
                color: msg.includes('[portfolio]')
                  ? '#367bf0'
                  : msg.includes('Power down')
                  ? '#e74c3c'
                  : '#8892a0',
              }}
            >
              {msg}
            </div>
          ))}
          {visibleLines < SHUTDOWN_MESSAGES.length && (
            <span className="terminal-cursor" />
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center animate-fade-in">
          <pre className="text-kali-accent text-xs sm:text-sm leading-tight mb-6 font-mono opacity-40 text-center">
{`⠀⠀⠀⠀⠀⠀⣠⣶⣿⣿⣶⣄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣾⣿⡿⠛⠛⢿⣿⣷⡀⠀⠀⠀⠀
⠀⠀⠀⠀⣾⣿⡏⠀⠀⠀⠀⢹⣿⣷⠀⠀⠀⠀
⠀⠀⠀⢸⣿⣿⠀⠀⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀
⠀⠀⠀⢸⣿⣿⠀⠀⢀⠀⠀⠀⣿⣿⡇⠀⠀⠀
⠀⠀⠀⠀⣿⣿⡄⠀⠘⠃⠀⢠⣿⣿⠀⠀⠀⠀
⠀⠀⠀⠀⠘⣿⣿⣄⠀⠀⣠⣿⣿⠃⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⢿⣿⣿⣿⣿⡿⠁⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠉⠻⠟⠉⠀⠀⠀⠀⠀⠀⠀`}
          </pre>
          <h1 className="text-2xl font-bold text-kali-muted tracking-wider">
            TishantOS
          </h1>
          <p className="text-kali-red text-sm mt-2">Shutting down...</p>
          <div className="mt-6 w-64 h-1 bg-kali-border rounded-full overflow-hidden">
            <div
              className="h-full bg-kali-red rounded-full shutdown-progress"
            />
          </div>
        </div>
      )}
      <div className="absolute inset-0 scanlines pointer-events-none" />
    </div>
  );
}
