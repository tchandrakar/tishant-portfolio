import { useState, useEffect, useRef } from 'react';
import { Lock } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [password, setPassword] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [time, setTime] = useState(new Date());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUnlock();
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div
      className="fixed inset-0 kali-wallpaper flex flex-col items-center justify-center z-[9998] cursor-pointer"
      onClick={() => !showInput && setShowInput(true)}
    >
      {/* Background blur overlay */}
      <div className="absolute inset-0 lock-blur bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Time */}
        <div className="text-7xl sm:text-8xl font-light text-white mb-2 tracking-wide">
          {formatTime(time)}
        </div>
        <div className="text-xl text-white/70 mb-12">
          {formatDate(time)}
        </div>

        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-kali-surface border-2 border-kali-accent/30 flex items-center justify-center mb-4 overflow-hidden">
          <span className="text-3xl font-bold text-kali-accent">TC</span>
        </div>

        {/* Name */}
        <h2 className="text-xl font-medium text-white mb-6">Tishant Chandrakar</h2>

        {/* Password Input */}
        {showInput ? (
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div className="relative">
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password (press Enter)"
                className="w-64 px-4 py-2.5 bg-white/10 border border-white/20 rounded-full text-white text-center text-sm placeholder:text-white/40 focus:border-kali-accent focus:bg-white/15"
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            </div>
            <p className="text-xs text-white/40 mt-3">
              Press Enter or type anything to unlock
            </p>
          </form>
        ) : (
          <p className="text-sm text-white/50 animate-pulse">
            Click anywhere to unlock
          </p>
        )}
      </div>
    </div>
  );
}
