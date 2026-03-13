import { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery, ChevronDown, Power } from 'lucide-react';

interface TopBarProps {
  activeWindow?: string;
  onShutdown?: () => void;
}

export default function TopBar({ activeWindow, onShutdown }: TopBarProps) {
  const [time, setTime] = useState(new Date());
  const [showSystemMenu, setShowSystemMenu] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });

  return (
    <div className="panel-glass h-8 flex items-center justify-between px-2 sm:px-3 text-xs text-kali-text relative z-[999]">
      {/* Left - Activities */}
      <div className="flex items-center gap-2 sm:gap-4">
        <button className="hover:text-white transition-colors font-medium">
          Activities
        </button>
        {activeWindow && (
          <span className="text-kali-muted hidden sm:inline">{activeWindow}</span>
        )}
      </div>

      {/* Center - Date/Time */}
      <button className="absolute left-1/2 -translate-x-1/2 hover:text-white transition-colors text-[10px] sm:text-xs whitespace-nowrap">
        <span className="hidden sm:inline">{formatDate(time)}  </span>{formatTime(time)}
      </button>

      {/* Right - System Tray */}
      <div className="flex items-center gap-1 sm:gap-2">
        <div
          className="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-1 rounded hover:bg-white/10 cursor-pointer transition-colors"
          onClick={() => setShowSystemMenu(!showSystemMenu)}
        >
          <Wifi className="w-3.5 h-3.5" />
          <Volume2 className="w-3.5 h-3.5 hidden sm:block" />
          <Battery className="w-3.5 h-3.5" />
          <ChevronDown className="w-3 h-3 hidden sm:block" />
        </div>
      </div>

      {/* System Menu Dropdown */}
      {showSystemMenu && (
        <>
          <div
            className="fixed inset-0 z-[998]"
            onClick={() => setShowSystemMenu(false)}
          />
          <div className="absolute right-2 top-8 w-72 context-menu rounded-lg p-3 z-[999] shadow-xl">
            <div className="space-y-3">
              {/* Network */}
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-kali-accent" />
                  <span className="text-sm">Wi-Fi Connected</span>
                </div>
              </div>
              {/* Volume */}
              <div className="flex items-center gap-2 py-1">
                <Volume2 className="w-4 h-4 text-kali-accent" />
                <div className="flex-1 h-1 bg-kali-border rounded-full">
                  <div className="w-3/4 h-full bg-kali-accent rounded-full" />
                </div>
              </div>
              {/* Battery */}
              <div className="flex items-center gap-2 py-1">
                <Battery className="w-4 h-4 text-kali-green" />
                <span className="text-sm text-kali-muted">100% — Plugged In</span>
              </div>
              {/* Separator */}
              <div className="border-t border-kali-border" />
              {/* User */}
              <div className="flex items-center gap-2 py-1">
                <div className="w-6 h-6 rounded-full bg-kali-accent/20 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-kali-accent">TC</span>
                </div>
                <span className="text-sm">Tishant Chandrakar</span>
              </div>
              {/* Separator */}
              <div className="border-t border-kali-border" />
              {/* Power Off */}
              <button
                className="flex items-center gap-2 py-1.5 w-full rounded hover:bg-kali-red/20 transition-colors group"
                onClick={() => {
                  setShowSystemMenu(false);
                  onShutdown?.();
                }}
              >
                <Power className="w-4 h-4 text-kali-red group-hover:text-kali-red" />
                <span className="text-sm text-kali-text group-hover:text-kali-red">Power Off</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
