export interface WindowState {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export type AppScreen = 'boot' | 'lock' | 'desktop';

export interface DesktopIconData {
  id: string;
  label: string;
  icon: string;
}

export interface FileSystemEntry {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  children?: FileSystemEntry[];
  icon?: string;
}

export interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
  techStack: string[];
}

export interface Project {
  name: string;
  description: string;
  tech: string[];
  url?: string;
  github?: string;
}

export interface Skill {
  category: string;
  items: { name: string; level: number }[];
}
