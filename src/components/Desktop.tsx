import {
  Terminal,
  FolderOpen,
  User,
  Globe,
  Cpu,
  Mail,
  FileText,
  Library,
} from 'lucide-react';

const DESKTOP_ICONS = [
  { id: 'terminal', label: 'Terminal', Icon: Terminal },
  { id: 'file-manager', label: 'Files', Icon: FolderOpen },
  { id: 'about', label: 'About Me', Icon: User },
  { id: 'projects', label: 'Projects', Icon: Globe },
  { id: 'skills', label: 'Skills', Icon: Cpu },
  { id: 'atlas', label: 'Atlas', Icon: Library },
  { id: 'contact', label: 'Contact', Icon: Mail },
  { id: 'resume', label: 'Resume', Icon: FileText },
];

interface DesktopProps {
  onOpenApp: (id: string) => void;
}

export default function Desktop({ onOpenApp }: DesktopProps) {
  return (
    <div className="absolute top-10 left-4 grid grid-cols-2 sm:grid-cols-1 gap-1 sm:gap-2 z-10">
      {DESKTOP_ICONS.map(({ id, label, Icon }) => (
        <button
          key={id}
          className="desktop-icon flex flex-col items-center gap-1 p-2 sm:p-3 rounded-lg w-16 sm:w-20"
          onDoubleClick={() => onOpenApp(id)}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-kali-surface/60 border border-kali-border/30 flex items-center justify-center">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-kali-accent" />
          </div>
          <span className="text-[9px] sm:text-[10px] text-white text-center leading-tight drop-shadow-lg">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
