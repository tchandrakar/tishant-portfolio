import { Terminal, FolderOpen, RefreshCw, Info, Monitor } from 'lucide-react';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onOpenApp: (id: string) => void;
}

export default function ContextMenu({ x, y, onClose, onOpenApp }: ContextMenuProps) {
  const items = [
    { label: 'Open Terminal', icon: Terminal, action: () => onOpenApp('terminal') },
    { label: 'Open File Manager', icon: FolderOpen, action: () => onOpenApp('file-manager') },
    { divider: true },
    { label: 'Change Background', icon: Monitor, action: () => {} },
    { label: 'Refresh Desktop', icon: RefreshCw, action: () => window.location.reload() },
    { divider: true },
    { label: 'About This System', icon: Info, action: () => onOpenApp('about') },
  ];

  // Adjust position to stay within viewport
  const adjustedX = Math.min(x, window.innerWidth - 220);
  const adjustedY = Math.min(y, window.innerHeight - 300);

  return (
    <>
      <div className="fixed inset-0 z-[1000]" onClick={onClose} onContextMenu={e => { e.preventDefault(); onClose(); }} />
      <div
        className="context-menu fixed rounded-lg py-1.5 min-w-[200px] z-[1001] animate-scale-in"
        style={{ left: adjustedX, top: adjustedY }}
      >
        {items.map((item, i) =>
          'divider' in item ? (
            <div key={i} className="border-t border-kali-border/50 my-1" />
          ) : (
            <button
              key={i}
              onClick={() => {
                item.action?.();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-1.5 text-sm text-kali-text hover:bg-kali-accent/20 hover:text-white transition-colors text-left"
            >
              {item.icon && <item.icon className="w-4 h-4 text-kali-muted" />}
              <span>{item.label}</span>
            </button>
          )
        )}
      </div>
    </>
  );
}
