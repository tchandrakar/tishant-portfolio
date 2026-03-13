import { useState, useRef, useCallback, useEffect } from 'react';
import { Terminal, Briefcase, ArrowRight, Code2, User } from 'lucide-react';

interface PortfolioChooserProps {
  onChoose: (mode: 'kali' | 'classic') => void;
}

function Card3D({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 20;
    const rotateY = (x - 0.5) * 20;
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlare({ x: x * 100, y: y * 100, opacity: 0.15 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform('rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);

  return (
    <div
      className="card-3d-wrapper"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`card-3d relative cursor-pointer ${className}`}
        style={{
          transform,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Glare overlay */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
            transition: 'opacity 0.15s ease-out',
          }}
        />
        {/* Inner content at slight Z depth for parallax */}
        <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function FloatingShape({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return <div className={`absolute pointer-events-none ${className}`} style={style} />;
}

export default function PortfolioChooser({ onChoose }: PortfolioChooserProps) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a12] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-amber-900/10" />

      {/* Floating 3D shapes */}
      <FloatingShape
        className="w-72 h-72 rounded-full floating-shape-1"
        style={{
          background: 'radial-gradient(circle, rgba(54,123,240,0.08) 0%, transparent 70%)',
          top: '10%', left: '5%',
        }}
      />
      <FloatingShape
        className="w-96 h-96 rounded-full floating-shape-2"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
          bottom: '5%', right: '0%',
        }}
      />
      <FloatingShape
        className="w-20 h-20 floating-shape-3"
        style={{
          border: '1px solid rgba(54,123,240,0.12)',
          borderRadius: '30%',
          top: '20%', right: '15%',
          transform: 'rotate(45deg)',
        }}
      />
      <FloatingShape
        className="w-14 h-14 floating-shape-4"
        style={{
          border: '1px solid rgba(245,158,11,0.12)',
          borderRadius: '30%',
          bottom: '25%', left: '12%',
          transform: 'rotate(30deg)',
        }}
      />
      <FloatingShape
        className="w-3 h-3 rounded-full floating-shape-5"
        style={{ background: 'rgba(54,123,240,0.3)', top: '35%', right: '25%' }}
      />
      <FloatingShape
        className="w-2 h-2 rounded-full floating-shape-6"
        style={{ background: 'rgba(245,158,11,0.3)', bottom: '35%', left: '20%' }}
      />
      <FloatingShape
        className="w-4 h-4 rounded-full floating-shape-7"
        style={{ background: 'rgba(54,123,240,0.15)', top: '60%', left: '8%' }}
      />
      <FloatingShape
        className="w-2.5 h-2.5 rounded-full floating-shape-8"
        style={{ background: 'rgba(245,158,11,0.2)', top: '15%', right: '35%' }}
      />

      {/* Header */}
      <div
        className="relative z-10 text-center mb-14"
        style={{
          opacity: entered ? 1 : 0,
          transform: entered ? 'translateY(0) translateZ(0)' : 'translateY(-30px) translateZ(0)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
          Tishant <span className="text-amber-400">Chandrakar</span>
        </h1>
        <p className="text-gray-500 text-sm sm:text-base mb-8">
          Full Stack Developer
        </p>
        <p className="text-lg sm:text-xl text-gray-300 font-light">
          Are you a <span className="text-amber-400 font-medium">developer</span>?
        </p>
      </div>

      {/* 3D Cards */}
      <div
        className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl w-full"
        style={{ perspective: '1200px' }}
      >
        {/* YES Card */}
        <div
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0) rotateY(0)' : 'translateY(40px) rotateY(-8deg)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
          }}
        >
          <Card3D
            onClick={() => onChoose('kali')}
            className="group text-left bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-blue-400/40 hover:bg-white/[0.05]"
          >
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5 group-hover:bg-blue-500/20 transition-colors" style={{ transform: 'translateZ(10px)' }}>
              <Terminal className="w-7 h-7 text-blue-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 flex items-center gap-3" style={{ transform: 'translateZ(15px)' }}>
              Yes
              <ArrowRight className="w-5 h-5 text-blue-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-4" style={{ transform: 'translateZ(5px)' }}>
              Enter an interactive Kali Linux desktop. Explore my portfolio through a terminal, file manager, and windowed applications — the way a developer would.
            </p>
            <div className="flex flex-wrap gap-1.5" style={{ transform: 'translateZ(8px)' }}>
              {['Terminal', 'File Manager', 'Draggable Windows', 'Boot Sequence'].map(tag => (
                <span key={tag} className="px-2 py-0.5 text-[10px] bg-blue-400/10 text-blue-400/70 rounded-full border border-blue-400/15">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-5 text-xs text-gray-600" style={{ transform: 'translateZ(5px)' }}>
              <Code2 className="w-3.5 h-3.5" />
              <span>Kali Linux Desktop Experience</span>
            </div>
          </Card3D>
        </div>

        {/* NO Card */}
        <div
          style={{
            opacity: entered ? 1 : 0,
            transform: entered ? 'translateY(0) rotateY(0)' : 'translateY(40px) rotateY(8deg)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.35s',
          }}
        >
          <Card3D
            onClick={() => onChoose('classic')}
            className="group text-left bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 hover:border-amber-400/40 hover:bg-white/[0.05]"
          >
            <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center mb-5 group-hover:bg-amber-500/20 transition-colors" style={{ transform: 'translateZ(10px)' }}>
              <Briefcase className="w-7 h-7 text-amber-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 flex items-center gap-3" style={{ transform: 'translateZ(15px)' }}>
              No
              <ArrowRight className="w-5 h-5 text-amber-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-4" style={{ transform: 'translateZ(5px)' }}>
              A clean, professional portfolio with smooth animations. Browse my experience, projects, and skills in a familiar web layout.
            </p>
            <div className="flex flex-wrap gap-1.5" style={{ transform: 'translateZ(8px)' }}>
              {['Animated Background', 'Smooth Scroll', 'Contact Form', 'Responsive'].map(tag => (
                <span key={tag} className="px-2 py-0.5 text-[10px] bg-amber-400/10 text-amber-400/70 rounded-full border border-amber-400/15">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-5 text-xs text-gray-600" style={{ transform: 'translateZ(5px)' }}>
              <User className="w-3.5 h-3.5" />
              <span>Classic Professional Portfolio</span>
            </div>
          </Card3D>
        </div>
      </div>

      <p
        className="relative z-10 text-gray-600 text-xs mt-10"
        style={{
          opacity: entered ? 1 : 0,
          transition: 'opacity 0.8s ease 0.6s',
        }}
      >
        You can switch between modes anytime from the navigation
      </p>
    </div>
  );
}
