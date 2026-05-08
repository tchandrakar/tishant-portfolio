import {
  Terminal,
  FolderOpen,
  User,
  Globe,
  Cpu,
  Mail,
  FileText,
} from 'lucide-react';
import type { WindowState } from '../types';

const DOCK_ITEMS = [
  { id: 'terminal', label: 'Terminal', Icon: Terminal },
  { id: 'file-manager', label: 'Files', Icon: FolderOpen },
  { id: 'about', label: 'About Me', Icon: User },
  { id: 'projects', label: 'Projects', Icon: Globe },
  { id: 'skills', label: 'Skills', Icon: Cpu },
  { id: 'contact', label: 'Contact', Icon: Mail },
  { id: 'resume', label: 'Resume', Icon: FileText },
];

interface DockProps {
  windows: WindowState[];
  onOpenApp: (id: string) => void;
}

export default function Dock({ windows, onOpenApp }: DockProps) {
  return (
    <div className="fixed bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-[998]">
      <div className="dock-glass rounded-2xl px-2 sm:px-3 py-1.5 sm:py-2 flex items-center gap-0.5 sm:gap-1">
        {DOCK_ITEMS.map(({ id, label, Icon }) => {
          const win = windows.find(w => w.id === id);
          const isOpen = win && win.isOpen;
          const isMinimized = win?.isMinimized;

          return (
            <button
              key={id}
              onClick={() => onOpenApp(id)}
              className="dock-icon relative flex flex-col items-center group"
              title={label}
            >
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center transition-all ${
                  isOpen && !isMinimized
                    ? 'bg-kali-accent/20 ring-1 ring-kali-accent/30'
                    : 'hover:bg-white/10'
                }`}
              >
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    isOpen ? 'text-kali-accent' : 'text-kali-text'
                  }`}
                />
              </div>
              {/* Active indicator dot */}
              {isOpen && (
                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-kali-accent" />
              )}
              {/* Tooltip */}
              <div className="absolute -top-8 px-2 py-1 bg-kali-surface border border-kali-border rounded text-[10px] text-kali-text opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
