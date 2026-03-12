import {
  Terminal,
  FolderOpen,
  User,
  Globe,
  Cpu,
  Mail,
  FileText,
} from 'lucide-react';

const DESKTOP_ICONS = [
  { id: 'terminal', label: 'Terminal', Icon: Terminal },
  { id: 'file-manager', label: 'Files', Icon: FolderOpen },
  { id: 'about', label: 'About Me', Icon: User },
  { id: 'projects', label: 'Projects', Icon: Globe },
  { id: 'skills', label: 'Skills', Icon: Cpu },
  { id: 'contact', label: 'Contact', Icon: Mail },
  { id: 'resume', label: 'Resume', Icon: FileText },
];

interface DesktopProps {
  onOpenApp: (id: string) => void;
}

export default function Desktop({ onOpenApp }: DesktopProps) {
  return (
    <div className="absolute top-10 left-4 flex flex-col gap-2 z-10">
      {DESKTOP_ICONS.map(({ id, label, Icon }) => (
        <button
          key={id}
          className="desktop-icon flex flex-col items-center gap-1 p-3 rounded-lg w-20"
          onDoubleClick={() => onOpenApp(id)}
        >
          <div className="w-12 h-12 rounded-xl bg-kali-surface/60 border border-kali-border/30 flex items-center justify-center">
            <Icon className="w-6 h-6 text-kali-accent" />
          </div>
          <span className="text-[10px] text-white text-center leading-tight drop-shadow-lg">
            {label}
          </span>
        </button>
      ))}
    </div>
  );
}
