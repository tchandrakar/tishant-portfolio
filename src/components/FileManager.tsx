import { useState } from 'react';
import {
  Folder,
  FileText,
  ChevronRight,
  Home,
  ArrowLeft,
  ArrowRight,
  File,
  Shield,
  Award,
  Code,
} from 'lucide-react';
import { PROFILE, EXPERIENCES, PROJECTS } from '../data/profile';

interface FileEntry {
  name: string;
  type: 'folder' | 'file';
  icon?: React.ReactNode;
  content?: string;
}

const FILE_SYSTEM: Record<string, FileEntry[]> = {
  '/home/tishant': [
    { name: 'Desktop', type: 'folder' },
    { name: 'Documents', type: 'folder' },
    { name: 'Projects', type: 'folder' },
    { name: 'Certifications', type: 'folder' },
    { name: '.bashrc', type: 'file', content: '# Tishant\'s bashrc\nexport PATH=$PATH:/usr/local/bin\nalias ll="ls -la"\nalias dev="cd ~/Projects"\n\n# Custom prompt\nPS1="┌──(\\u㉿\\h)-[\\w]\\n└─$ "' },
  ],
  '/home/tishant/Desktop': [
    { name: 'about-me.txt', type: 'file', content: PROFILE.bio },
    { name: 'resume.pdf', type: 'file', content: '📄 Resume — Open in Document Viewer for full view' },
  ],
  '/home/tishant/Documents': [
    { name: 'Resume.pdf', type: 'file', content: '📄 Tishant Chandrakar — Resume\nFull Stack Developer (BE Heavy)' },
    {
      name: 'experience.txt',
      type: 'file',
      content: EXPERIENCES.map(
        e => `${e.company} — ${e.role}\n${e.period} | ${e.location}\n${e.highlights.join('\n')}\n`
      ).join('\n---\n\n'),
    },
    { name: 'contact.txt', type: 'file', content: `Email: ${PROFILE.email}\nPhone: ${PROFILE.phone}\nLinkedIn: ${PROFILE.linkedin}\nGitHub: ${PROFILE.github}\nLocation: ${PROFILE.location}` },
  ],
  '/home/tishant/Projects': PROJECTS.map(p => ({
    name: p.name,
    type: 'folder' as const,
  })),
  '/home/tishant/Certifications': PROFILE.certifications.map(c => ({
    name: `${c}.cert`,
    type: 'file' as const,
    content: `Certificate: ${c}\nHolder: Tishant Chandrakar\nStatus: ✓ Verified`,
  })),
  ...Object.fromEntries(
    PROJECTS.map(p => [
      `/home/tishant/Projects/${p.name}`,
      [
        { name: 'README.md', type: 'file' as const, content: `# ${p.name}\n\n${p.description}\n\nTech Stack: ${p.tech.join(', ')}\n${p.github ? `GitHub: ${p.github}` : ''}` },
        { name: 'src', type: 'folder' as const },
      ],
    ])
  ),
};

const SIDEBAR_ITEMS = [
  { label: 'Home', path: '/home/tishant', icon: Home },
  { label: 'Desktop', path: '/home/tishant/Desktop', icon: FileText },
  { label: 'Documents', path: '/home/tishant/Documents', icon: Folder },
  { label: 'Projects', path: '/home/tishant/Projects', icon: Code },
  { label: 'Certifications', path: '/home/tishant/Certifications', icon: Shield },
];

export default function FileManager() {
  const [currentPath, setCurrentPath] = useState('/home/tishant');
  const [selectedFile, setSelectedFile] = useState<FileEntry | null>(null);
  const [pathHistory, setPathHistory] = useState<string[]>(['/home/tishant']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const files = FILE_SYSTEM[currentPath] || [];

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    setSelectedFile(null);
    const newHistory = [...pathHistory.slice(0, historyIndex + 1), path];
    setPathHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(pathHistory[historyIndex - 1]);
      setSelectedFile(null);
    }
  };

  const goForward = () => {
    if (historyIndex < pathHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(pathHistory[historyIndex + 1]);
      setSelectedFile(null);
    }
  };

  const handleDoubleClick = (file: FileEntry) => {
    if (file.type === 'folder') {
      navigateTo(`${currentPath}/${file.name}`);
    } else {
      setSelectedFile(file);
    }
  };

  const getIcon = (file: FileEntry) => {
    if (file.type === 'folder') return <Folder className="w-10 h-10 text-kali-accent" />;
    if (file.name.endsWith('.pdf')) return <FileText className="w-10 h-10 text-kali-red" />;
    if (file.name.endsWith('.cert')) return <Award className="w-10 h-10 text-kali-yellow" />;
    if (file.name.endsWith('.md')) return <FileText className="w-10 h-10 text-kali-green" />;
    return <File className="w-10 h-10 text-kali-muted" />;
  };

  const breadcrumbs = currentPath.split('/').filter(Boolean);

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="h-10 bg-kali-titlebar border-b border-kali-border/50 flex items-center px-3 gap-2 shrink-0">
        <button
          onClick={goBack}
          disabled={historyIndex === 0}
          className="p-1 rounded hover:bg-white/10 disabled:opacity-30"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={goForward}
          disabled={historyIndex === pathHistory.length - 1}
          className="p-1 rounded hover:bg-white/10 disabled:opacity-30"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 text-xs text-kali-muted flex-1 ml-2 overflow-hidden">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="w-3 h-3" />}
              <button
                onClick={() => navigateTo('/' + breadcrumbs.slice(0, i + 1).join('/'))}
                className="hover:text-kali-accent transition-colors truncate"
              >
                {crumb}
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-44 bg-kali-surface border-r border-kali-border/50 py-2 shrink-0 overflow-y-auto">
          {SIDEBAR_ITEMS.map(item => (
            <button
              key={item.path}
              onClick={() => navigateTo(item.path)}
              className={`w-full flex items-center gap-2 px-3 py-1.5 text-xs transition-colors ${
                currentPath === item.path
                  ? 'bg-kali-accent/20 text-kali-accent'
                  : 'text-kali-text hover:bg-white/5'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 flex">
          {/* File grid */}
          <div className="flex-1 p-4 overflow-auto">
            {files.length === 0 ? (
              <div className="text-center text-kali-muted py-12 text-sm">
                Folder is empty
              </div>
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                {files.map((file, i) => (
                  <button
                    key={i}
                    className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all ${
                      selectedFile?.name === file.name
                        ? 'bg-kali-accent/20 ring-1 ring-kali-accent/30'
                        : 'hover:bg-white/5'
                    }`}
                    onClick={() => setSelectedFile(file)}
                    onDoubleClick={() => handleDoubleClick(file)}
                  >
                    {getIcon(file)}
                    <span className="text-[11px] text-center text-kali-text leading-tight mt-1 max-w-[80px] truncate">
                      {file.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Preview pane */}
          {selectedFile && selectedFile.content && (
            <div className="w-64 border-l border-kali-border/50 bg-kali-surface p-4 overflow-auto">
              <h3 className="text-sm font-medium text-kali-accent mb-3 truncate">
                {selectedFile.name}
              </h3>
              <pre className="text-xs text-kali-text whitespace-pre-wrap font-mono leading-relaxed">
                {selectedFile.content}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="h-6 bg-kali-titlebar border-t border-kali-border/50 flex items-center px-3 text-[10px] text-kali-muted shrink-0">
        <span>{files.length} items</span>
        {selectedFile && <span className="ml-auto">{selectedFile.name}</span>}
      </div>
    </div>
  );
}
