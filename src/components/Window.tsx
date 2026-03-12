import { useRef, useCallback, useState, useEffect } from 'react';
import { X, Minus, Square, Maximize2 } from 'lucide-react';
import type { WindowState } from '../types';

interface WindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onPositionChange: (pos: { x: number; y: number }) => void;
  children: React.ReactNode;
}

export default function Window({
  window: win,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onPositionChange,
  children,
}: WindowProps) {
  const dragRef = useRef<{ startX: number; startY: number; posX: number; posY: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localPos, setLocalPos] = useState(win.position);

  useEffect(() => {
    if (!isDragging) {
      setLocalPos(win.position);
    }
  }, [win.position, isDragging]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest('button')) return;
      e.preventDefault();
      onFocus();
      setIsDragging(true);
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        posX: localPos.x,
        posY: localPos.y,
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!dragRef.current) return;
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        const newPos = {
          x: dragRef.current.posX + dx,
          y: dragRef.current.posY + dy,
        };
        setLocalPos(newPos);
      };

      const handleMouseUp = () => {
        if (dragRef.current) {
          const finalPos = {
            x: dragRef.current.posX + (0), // will be updated from localPos
            y: dragRef.current.posY + (0),
          };
          // Get the latest position from state
          setLocalPos(prev => {
            onPositionChange(prev);
            return prev;
          });
        }
        setIsDragging(false);
        dragRef.current = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [onFocus, onPositionChange, localPos]
  );

  if (!win.isOpen || win.isMinimized) return null;

  const style = win.isMaximized
    ? { top: 32, left: 0, right: 0, bottom: 48, width: '100%', height: 'calc(100vh - 80px)', zIndex: win.zIndex }
    : {
        top: localPos.y,
        left: localPos.x,
        width: win.size.width,
        height: win.size.height,
        zIndex: win.zIndex,
      };

  return (
    <div
      className={`fixed flex flex-col window-shadow rounded-lg overflow-hidden ${
        win.isMaximized ? 'rounded-none' : ''
      }`}
      style={style}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div
        className="h-9 bg-kali-titlebar flex items-center justify-between px-3 cursor-move shrink-0 border-b border-kali-border/50"
        onMouseDown={handleMouseDown}
        onDoubleClick={onMaximize}
      >
        <span className="text-xs text-kali-text truncate flex-1 mr-4">{win.title}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={onMinimize}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors"
            title="Minimize"
          >
            <Minus className="w-3.5 h-3.5 text-kali-muted" />
          </button>
          <button
            onClick={onMaximize}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors"
            title="Maximize"
          >
            {win.isMaximized ? (
              <Square className="w-3 h-3 text-kali-muted" />
            ) : (
              <Maximize2 className="w-3 h-3 text-kali-muted" />
            )}
          </button>
          <button
            onClick={onClose}
            className="w-6 h-6 rounded flex items-center justify-center hover:bg-kali-red/80 transition-colors"
            title="Close"
          >
            <X className="w-3.5 h-3.5 text-kali-muted hover:text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-kali-window overflow-auto">
        {children}
      </div>
    </div>
  );
}
