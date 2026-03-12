import { PROJECTS } from '../data/profile';
import { ExternalLink, Github, ArrowLeft, ArrowRight, RotateCcw, Star } from 'lucide-react';
import { useState } from 'react';

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <div className="h-full flex flex-col">
      {/* Browser toolbar */}
      <div className="bg-kali-titlebar border-b border-kali-border/50 p-2 flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1">
          <button className="p-1 rounded hover:bg-white/10">
            <ArrowLeft className="w-3.5 h-3.5 text-kali-muted" />
          </button>
          <button className="p-1 rounded hover:bg-white/10">
            <ArrowRight className="w-3.5 h-3.5 text-kali-muted" />
          </button>
          <button className="p-1 rounded hover:bg-white/10">
            <RotateCcw className="w-3.5 h-3.5 text-kali-muted" />
          </button>
        </div>
        {/* URL bar */}
        <div className="flex-1 bg-kali-bg/80 rounded-full px-4 py-1.5 text-xs text-kali-muted border border-kali-border/50">
          <span className="text-kali-green">https://</span>
          <span className="text-kali-text">github.com/tchandrakar</span>
        </div>
      </div>

      {/* Browser tabs */}
      <div className="bg-kali-titlebar border-b border-kali-border/30 flex">
        <button
          className={`px-4 py-1.5 text-xs border-r border-kali-border/30 transition-colors ${
            activeProject === null ? 'bg-kali-window text-kali-text' : 'text-kali-muted hover:text-kali-text'
          }`}
          onClick={() => setActiveProject(null)}
        >
          All Projects
        </button>
        {PROJECTS.map((p, i) => (
          <button
            key={i}
            className={`px-3 py-1.5 text-xs border-r border-kali-border/30 transition-colors truncate max-w-[120px] ${
              activeProject === i ? 'bg-kali-window text-kali-text' : 'text-kali-muted hover:text-kali-text'
            }`}
            onClick={() => setActiveProject(i)}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeProject === null ? (
          /* All projects grid */
          <div>
            <div className="mb-6">
              <h1 className="text-lg font-bold text-white mb-1">Repositories</h1>
              <p className="text-xs text-kali-muted">
                Open-source projects and explorations
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECTS.map((project, i) => (
                <button
                  key={i}
                  onClick={() => setActiveProject(i)}
                  className="text-left bg-kali-surface/50 border border-kali-border/40 rounded-lg p-5 hover:border-kali-accent/40 hover:bg-kali-surface transition-all group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-semibold text-kali-accent group-hover:text-kali-accent-hover transition-colors">
                      {project.name}
                    </h3>
                    <Star className="w-4 h-4 text-kali-muted" />
                  </div>
                  <p className="text-xs text-kali-text leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map(t => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] bg-kali-accent/10 text-kali-accent rounded-full border border-kali-accent/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.github && (
                    <div className="flex items-center gap-1 mt-3 text-[10px] text-kali-muted">
                      <Github className="w-3 h-3" />
                      {project.github.replace('https://github.com/', '')}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Single project detail */
          <div>
            <button
              onClick={() => setActiveProject(null)}
              className="text-xs text-kali-accent hover:underline mb-4 flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" /> Back to all projects
            </button>
            <div className="bg-kali-surface/50 border border-kali-border/40 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-xl font-bold text-white">{PROJECTS[activeProject].name}</h1>
                  <p className="text-xs text-kali-muted mt-1">
                    tchandrakar / {PROJECTS[activeProject].name.toLowerCase().replace(/\s+/g, '-')}
                  </p>
                </div>
                {PROJECTS[activeProject].github && (
                  <a
                    href={PROJECTS[activeProject].github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-kali-accent/10 border border-kali-accent/30 rounded text-xs text-kali-accent hover:bg-kali-accent/20 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    View on GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <p className="text-sm text-kali-text leading-relaxed mb-6">
                {PROJECTS[activeProject].description}
              </p>

              <div>
                <h3 className="text-xs font-semibold text-kali-accent mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {PROJECTS[activeProject].tech.map(t => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs bg-kali-accent/10 text-kali-accent rounded-full border border-kali-accent/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Simulated README */}
              <div className="mt-6 bg-kali-bg/50 rounded-lg p-4 border border-kali-border/30">
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-kali-border/30">
                  <FileIcon />
                  <span className="text-xs text-kali-text">README.md</span>
                </div>
                <div className="text-sm text-kali-text">
                  <h2 className="text-base font-bold text-white mb-2">{PROJECTS[activeProject].name}</h2>
                  <p className="text-xs leading-relaxed">{PROJECTS[activeProject].description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FileIcon() {
  return (
    <svg className="w-4 h-4 text-kali-muted" viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-9.5A1.75 1.75 0 0 1 2 14.25V1.75Z" />
    </svg>
  );
}
