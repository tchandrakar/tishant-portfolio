import { useState, useRef, useEffect, useCallback } from 'react';
import { PROFILE, EXPERIENCES, PROJECTS, SKILLS, NEOFETCH_PLAIN } from '../data/profile';
import type { TerminalLine } from '../types';

interface TerminalProps {
  onOpenApp: (id: string) => void;
}

export default function Terminal({ onOpenApp }: TerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: 'system', content: 'Welcome to TishantOS Terminal v1.0' },
    { type: 'system', content: 'Type "help" for available commands.\n' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      const args = trimmed.split(/\s+/);
      const command = args[0];

      switch (command) {
        case '':
          return [];

        case 'help':
          return [
            { type: 'output' as const, content: '\nAvailable commands:' },
            { type: 'output' as const, content: '  about       - About me' },
            { type: 'output' as const, content: '  skills      - Technical skills' },
            { type: 'output' as const, content: '  experience  - Work experience' },
            { type: 'output' as const, content: '  education   - Education details' },
            { type: 'output' as const, content: '  projects    - My projects' },
            { type: 'output' as const, content: '  contact     - Contact information' },
            { type: 'output' as const, content: '  certifications - Certifications' },
            { type: 'output' as const, content: '  atlas       - Open the Architect\'s Atlas (system design vault)' },
            { type: 'output' as const, content: '  learn       - Alias for atlas' },
            { type: 'output' as const, content: '  neofetch    - System information' },
            { type: 'output' as const, content: '  whoami      - Current user' },
            { type: 'output' as const, content: '  pwd         - Print working directory' },
            { type: 'output' as const, content: '  date        - Current date' },
            { type: 'output' as const, content: '  uname       - System info' },
            { type: 'output' as const, content: '  open <app>  - Open an application' },
            { type: 'output' as const, content: '  clear       - Clear terminal' },
            { type: 'output' as const, content: '  history     - Command history' },
            { type: 'output' as const, content: '  sudo rm -rf / - Try it ;)\n' },
          ];

        case 'about':
        case 'whoami':
          return [
            { type: 'output' as const, content: `\n${PROFILE.name}` },
            { type: 'output' as const, content: `${PROFILE.title}` },
            { type: 'output' as const, content: `\n${PROFILE.bio}\n` },
          ];

        case 'skills':
          return [
            { type: 'output' as const, content: '\n--- Technical Skills ---\n' },
            ...SKILLS.flatMap(cat => [
              { type: 'output' as const, content: `\n[${cat.category}]` },
              ...cat.items.map(s => {
                const bar = '█'.repeat(Math.floor(s.level / 5)) + '░'.repeat(20 - Math.floor(s.level / 5));
                return { type: 'output' as const, content: `  ${s.name.padEnd(18)} ${bar} ${s.level}%` };
              }),
            ]),
            { type: 'output' as const, content: '' },
          ];

        case 'experience':
          return [
            { type: 'output' as const, content: '\n--- Work Experience ---\n' },
            ...EXPERIENCES.flatMap(exp => [
              { type: 'output' as const, content: `\n▸ ${exp.company} — ${exp.role}` },
              { type: 'output' as const, content: `  ${exp.location} | ${exp.period}` },
              ...exp.highlights.map(h => ({ type: 'output' as const, content: `  • ${h}` })),
              { type: 'output' as const, content: `  Tech: ${exp.techStack.join(', ')}` },
            ]),
            { type: 'output' as const, content: '' },
          ];

        case 'education':
          return [
            { type: 'output' as const, content: '\n--- Education ---\n' },
            { type: 'output' as const, content: `  ${PROFILE.education.institution}` },
            { type: 'output' as const, content: `  ${PROFILE.education.degree} — GPA: ${PROFILE.education.gpa}` },
            { type: 'output' as const, content: `  ${PROFILE.education.period}\n` },
          ];

        case 'projects':
          return [
            { type: 'output' as const, content: '\n--- Projects ---\n' },
            ...PROJECTS.flatMap(p => [
              { type: 'output' as const, content: `\n▸ ${p.name}` },
              { type: 'output' as const, content: `  ${p.description}` },
              { type: 'output' as const, content: `  Tech: ${p.tech.join(', ')}` },
              ...(p.github ? [{ type: 'output' as const, content: `  GitHub: ${p.github}` }] : []),
            ]),
            { type: 'output' as const, content: '' },
          ];

        case 'contact':
          return [
            { type: 'output' as const, content: '\n--- Contact Information ---\n' },
            { type: 'output' as const, content: `  Email:    ${PROFILE.email}` },
            { type: 'output' as const, content: `  Phone:    ${PROFILE.phone}` },
            { type: 'output' as const, content: `  LinkedIn: ${PROFILE.linkedin}` },
            { type: 'output' as const, content: `  GitHub:   ${PROFILE.github}` },
            { type: 'output' as const, content: `  Location: ${PROFILE.location}\n` },
          ];

        case 'certifications':
          return [
            { type: 'output' as const, content: '\n--- Certifications ---\n' },
            ...PROFILE.certifications.map(c => ({
              type: 'output' as const,
              content: `  ✓ ${c}`,
            })),
            { type: 'output' as const, content: '' },
          ];

        case 'neofetch':
          return [
            { type: 'output' as const, content: '' },
            ...NEOFETCH_PLAIN.map(line => ({
              type: 'system' as const,
              content: `NEOFETCH:${line.art}|||${line.info}`,
            })),
            { type: 'output' as const, content: '' },
          ];

        case 'clear':
          setLines([]);
          return [];

        case 'pwd':
          return [{ type: 'output' as const, content: '/home/tishant' }];

        case 'date':
          return [{ type: 'output' as const, content: new Date().toString() }];

        case 'uname':
          return [{ type: 'output' as const, content: 'TishantOS 6.4.2-kali-amd64 x86_64 GNU/Linux' }];

        case 'ls':
          return [
            { type: 'output' as const, content: 'Desktop  Documents  Downloads  Projects  .config' },
          ];

        case 'cat':
          if (args[1] === 'resume.pdf' || args[1] === 'resume') {
            onOpenApp('resume');
            return [{ type: 'output' as const, content: 'Opening resume...' }];
          }
          return [{ type: 'error' as const, content: `cat: ${args[1] || ''}: No such file` }];

        case 'open':
          const appMap: Record<string, string> = {
            terminal: 'terminal',
            files: 'file-manager',
            'file-manager': 'file-manager',
            about: 'about',
            projects: 'projects',
            skills: 'skills',
            contact: 'contact',
            resume: 'resume',
            atlas: 'atlas',
            learn: 'atlas',
          };
          const appId = appMap[args[1]];
          if (appId) {
            onOpenApp(appId);
            return [{ type: 'output' as const, content: `Opening ${args[1]}...` }];
          }
          return [{ type: 'error' as const, content: `open: '${args[1] || ''}' not found. Try: terminal, files, about, projects, skills, atlas, contact, resume` }];

        case 'atlas':
        case 'learn':
          onOpenApp('atlas');
          return [{ type: 'output' as const, content: "Launching Architect's Atlas — 132 problems · 30 lessons · DDIA-grounded." }];

        case 'history':
          return history.map((h, i) => ({
            type: 'output' as const,
            content: `  ${i + 1}  ${h}`,
          }));

        case 'sudo':
          if (trimmed.includes('rm -rf')) {
            return [
              { type: 'error' as const, content: '\n🚫 Nice try! But this portfolio is protected.' },
              { type: 'output' as const, content: 'Perhaps try "help" for something more constructive? 😄\n' },
            ];
          }
          return [{ type: 'error' as const, content: 'sudo: command not permitted in portfolio mode' }];

        case 'exit':
          return [{ type: 'output' as const, content: 'This terminal cannot be closed from within. Use the window controls.' }];

        default:
          return [
            {
              type: 'error' as const,
              content: `bash: ${command}: command not found. Type "help" for available commands.`,
            },
          ];
      }
    },
    [history, onOpenApp]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLines: TerminalLine[] = [
      { type: 'input', content: input },
      ...processCommand(input),
    ];
    if (input.trim().toLowerCase() !== 'clear') {
      setLines(prev => [...prev, ...newLines]);
    }
    if (input.trim()) {
      setHistory(prev => [...prev, input]);
    }
    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      setInput(history[history.length - 1 - newIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    }
  };

  const renderLine = (line: TerminalLine, i: number) => {
    if (line.type === 'input') {
      return (
        <div key={i} className="flex">
          <span className="text-kali-green font-bold">┌──(</span>
          <span className="text-kali-accent font-bold">tishant㉿kali</span>
          <span className="text-kali-green font-bold">)-[</span>
          <span className="text-white font-bold">~</span>
          <span className="text-kali-green font-bold">]</span>
          <br />
          <span className="text-kali-green font-bold">└─$ </span>
          <span className="text-white">{line.content}</span>
        </div>
      );
    }

    if (line.type === 'system' && line.content.startsWith('NEOFETCH:')) {
      const parts = line.content.replace('NEOFETCH:', '').split('|||');
      return (
        <div key={i} className="flex">
          <span className="text-kali-accent font-mono">{parts[0]}</span>
          <span className="text-kali-text">
            {parts[1]?.includes('@') ? (
              <span className="text-kali-accent font-bold">{parts[1]}</span>
            ) : parts[1]?.startsWith('──') ? (
              <span className="text-kali-muted">{parts[1]}</span>
            ) : parts[1]?.includes(':') ? (
              <>
                <span className="text-kali-accent font-bold">
                  {parts[1].split(':')[0]}:
                </span>
                <span className="text-kali-text">
                  {parts[1].split(':').slice(1).join(':')}
                </span>
              </>
            ) : (
              parts[1]
            )}
          </span>
        </div>
      );
    }

    return (
      <div
        key={i}
        className={
          line.type === 'error'
            ? 'text-kali-red'
            : line.type === 'system'
            ? 'text-kali-accent'
            : 'text-kali-text whitespace-pre-wrap'
        }
      >
        {line.content}
      </div>
    );
  };

  return (
    <div
      className="h-full bg-[#0a0a14] p-3 font-mono text-sm overflow-auto cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map(renderLine)}

      {/* Current prompt */}
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-wrap items-center">
          <span className="text-kali-green font-bold">┌──(</span>
          <span className="text-kali-accent font-bold">tishant㉿kali</span>
          <span className="text-kali-green font-bold">)-[</span>
          <span className="text-white font-bold">~</span>
          <span className="text-kali-green font-bold">]</span>
        </div>
        <div className="flex items-center">
          <span className="text-kali-green font-bold">└─$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white caret-kali-green ml-1"
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </form>
      <div ref={bottomRef} />
    </div>
  );
}
