import { Terminal, Briefcase, ArrowRight, Code2, User } from 'lucide-react';

interface PortfolioChooserProps {
  onChoose: (mode: 'kali' | 'classic') => void;
}

export default function PortfolioChooser({ onChoose }: PortfolioChooserProps) {
  return (
    <div className="min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-amber-900/10" />

      <div className="relative z-10 text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
          Tishant <span className="text-amber-400">Chandrakar</span>
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Full Stack Developer
        </p>
      </div>

      {/* Question */}
      <div className="relative z-10 text-center mb-10">
        <p className="text-lg sm:text-xl text-gray-300 font-light">
          Are you a <span className="text-amber-400 font-medium">developer</span>?
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full">
        {/* Yes, I'm a Developer → Kali */}
        <button
          onClick={() => onChoose('kali')}
          className="group text-left bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-blue-400/40 hover:bg-white/[0.05] transition-all"
        >
          <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5 group-hover:bg-blue-500/20 transition-colors">
            <Terminal className="w-7 h-7 text-blue-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            Yes, I'm a Developer
            <ArrowRight className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            Enter an interactive Kali Linux desktop. Explore my portfolio through a terminal, file manager, and windowed applications — the way a developer would.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {['Terminal', 'File Manager', 'Draggable Windows', 'Boot Sequence'].map(tag => (
              <span key={tag} className="px-2 py-0.5 text-[10px] bg-blue-400/10 text-blue-400/70 rounded-full border border-blue-400/15">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-5 text-xs text-gray-600">
            <Code2 className="w-3.5 h-3.5" />
            <span>Kali Linux Desktop Experience</span>
          </div>
        </button>

        {/* No, Show Me the Portfolio → Classic */}
        <button
          onClick={() => onChoose('classic')}
          className="group text-left bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-amber-400/40 hover:bg-white/[0.05] transition-all"
        >
          <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mb-5 group-hover:bg-amber-500/20 transition-colors">
            <Briefcase className="w-7 h-7 text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            No, Just Show Portfolio
            <ArrowRight className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            A clean, professional portfolio with smooth animations. Browse my experience, projects, and skills in a familiar web layout.
          </p>
          <div className="flex flex-wrap gap-1.5">
            {['Animated Background', 'Smooth Scroll', 'Contact Form', 'Responsive'].map(tag => (
              <span key={tag} className="px-2 py-0.5 text-[10px] bg-amber-400/10 text-amber-400/70 rounded-full border border-amber-400/15">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-5 text-xs text-gray-600">
            <User className="w-3.5 h-3.5" />
            <span>Classic Professional Portfolio</span>
          </div>
        </button>
      </div>

      <p className="relative z-10 text-gray-600 text-xs mt-10">
        You can switch between modes anytime from the navigation
      </p>
    </div>
  );
}
