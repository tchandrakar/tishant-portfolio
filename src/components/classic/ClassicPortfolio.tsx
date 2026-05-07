import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Menu, X, Download, Copy, Check, Mail, Github, Linkedin,
  ExternalLink, Server, Globe, Shield, Brain, Send,
  ChevronRight, Cpu, ArrowRight,
} from 'lucide-react';
import { PROFILE, EXPERIENCES, PROJECTS, SKILLS } from '../../data/profile';
import StarBackground from './StarBackground';
import { useInView } from '../../hooks/useInView';

// ─── 3D Tilt Card ───────────────────────────────────────────────────────────

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const onMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setStyle({
      transform: `perspective(800px) rotateX(${(0.5 - y) * 14}deg) rotateY(${(x - 0.5) * 14}deg) scale3d(1.02,1.02,1.02)`,
      transition: 'transform 0.1s ease-out',
    });
    setGlare({ x: x * 100, y: y * 100, opacity: 0.12 });
  }, []);

  const onLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)',
      transition: 'transform 0.5s ease-out',
    });
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${className}`}
      style={{ ...style, transformStyle: 'preserve-3d' }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none z-10"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}

// ─── Scroll-Triggered 3D Reveal ─────────────────────────────────────────────

function Reveal3D({
  children, direction = 'up', delay = 0, className = '',
}: {
  children: React.ReactNode;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  className?: string;
}) {
  const { ref, isInView } = useInView();
  const from: Record<string, string> = {
    up: 'perspective(800px) rotateX(8deg) translateY(60px)',
    left: 'perspective(800px) rotateY(12deg) translateX(-60px)',
    right: 'perspective(800px) rotateY(-12deg) translateX(60px)',
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView
          ? 'perspective(800px) rotateX(0) rotateY(0) translate(0,0)'
          : from[direction],
        transition: `all 0.8s cubic-bezier(0.17, 0.67, 0.29, 0.97) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Animated Skill Bar ─────────────────────────────────────────────────────

function SkillBar({ name, level, delay = 0 }: { name: string; level: number; delay?: number }) {
  const { ref, isInView } = useInView(0.3);
  return (
    <div ref={ref} className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-gray-300">{name}</span>
        <span className="text-gray-600 tabular-nums">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300"
          style={{
            width: isInView ? `${level}%` : '0%',
            transition: `width 1.2s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

interface ClassicPortfolioProps {
  onSwitchPortfolio: () => void;
  onOpenAtlas?: () => void;
}

export default function ClassicPortfolio({ onSwitchPortfolio, onOpenAtlas }: ClassicPortfolioProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2,
    });
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenu(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(contactForm.subject)}&body=${encodeURIComponent(
      `Hi Tishant,\n\n${contactForm.message}\n\nBest,\n${contactForm.name}\n${contactForm.email}`
    )}`;
    window.open(mailto, '_blank');
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 3000);
  };

  const NAV = ['about', 'experience', 'projects', 'atlas', 'skills', 'contact'];

  const openAtlas = () => onOpenAtlas?.();

  const FEATURES = [
    { icon: Server, title: 'Backend Architecture', desc: 'Scalable microservices with AWS, Docker, and distributed systems' },
    { icon: Brain, title: 'AI & LLM Integration', desc: 'OpenAI, vector databases, and intelligent automation pipelines' },
    { icon: Globe, title: 'Full-Stack Development', desc: 'React, Angular, Node.js, Go, and modern web technologies' },
    { icon: Shield, title: 'Security & Infra', desc: 'Security+, CEH certified, cloud infrastructure design' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white overflow-x-hidden relative">
      <StarBackground />

      {/* ═══════════════════ NAVIGATION ═══════════════════ */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0a12]/80 backdrop-blur-xl border-b border-white/5' : ''
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="font-mono text-sm text-white hover:text-amber-400 transition-colors">
            <span className="text-amber-400">&lt;</span>
            <span className="hidden sm:inline"> Tishant Chandrakar</span>
            <span className="sm:hidden"> TC</span>
            <span className="text-amber-400"> /&gt;</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV.map(id => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`text-sm transition-colors capitalize ${id === 'atlas' ? 'text-cyan-300 hover:text-cyan-200' : 'text-gray-400 hover:text-white'}`}
              >
                {id}
              </button>
            ))}
            <button onClick={openAtlas} className="hidden lg:flex items-center gap-1.5 text-xs text-cyan-300/70 hover:text-cyan-200 transition-colors">
              Launch Atlas →
            </button>
            <button onClick={onSwitchPortfolio} className="flex items-center gap-1.5 text-xs text-amber-400/70 hover:text-amber-400 transition-colors">
              <Cpu className="w-3.5 h-3.5" /> Desktop Mode
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileMenu && (
          <div className="md:hidden bg-[#0a0a12]/95 backdrop-blur-xl border-b border-white/5 px-4 py-4 space-y-3">
            {NAV.map(id => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`block w-full text-left text-sm capitalize ${id === 'atlas' ? 'text-cyan-300' : 'text-gray-400 hover:text-white'}`}
              >
                {id}
              </button>
            ))}
            <button onClick={() => { setMobileMenu(false); onSwitchPortfolio(); }} className="flex items-center gap-1.5 text-xs text-amber-400/70">
              <Cpu className="w-3.5 h-3.5" /> Desktop Mode
            </button>
          </div>
        )}
      </nav>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden" onMouseMove={handleMouseMove}>
        {/* Parallax orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-[15%] left-[15%] w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
              transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 20}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          />
          <div
            className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)',
              transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -25}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          />
          <div
            className="absolute top-[50%] right-[30%] w-[300px] h-[300px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
              transform: `translate(${mousePos.x * 15}px, ${mousePos.y * -15}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          />
          {/* Floating geometric shapes */}
          <div
            className="absolute top-[25%] right-[20%] w-16 h-16 border border-amber-400/10 rounded-lg"
            style={{
              transform: `translate(${mousePos.x * -12}px, ${mousePos.y * 8}px) rotate(45deg)`,
              transition: 'transform 0.4s ease-out',
            }}
          />
          <div
            className="absolute bottom-[30%] left-[18%] w-10 h-10 border border-blue-400/10 rounded-lg"
            style={{
              transform: `translate(${mousePos.x * 18}px, ${mousePos.y * -12}px) rotate(30deg)`,
              transition: 'transform 0.4s ease-out',
            }}
          />
          <div
            className="absolute top-[40%] left-[10%] w-3 h-3 rounded-full bg-amber-400/20"
            style={{
              transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 20}px)`,
              transition: 'transform 0.2s ease-out',
            }}
          />
          <div
            className="absolute top-[20%] right-[40%] w-2 h-2 rounded-full bg-blue-400/25"
            style={{
              transform: `translate(${mousePos.x * -20}px, ${mousePos.y * 15}px)`,
              transition: 'transform 0.2s ease-out',
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 hero-text-enter max-w-3xl mx-auto">
          <p className="text-amber-400 text-sm mb-4 font-mono tracking-wider">Hello World! I'm</p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <span className="text-white">Tishant </span>
            <span className="text-amber-400">Chandrakar</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 mb-3 font-light">{PROFILE.title}</p>
          <p className="text-gray-500 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            6+ years building scalable systems across healthtech, edtech, fintech, and AI platforms.
            IIT Roorkee graduate. Security+ &amp; CEH certified.
          </p>

          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <a
              href={PROFILE.resumeUrl}
              download="Tishant_Chandrakar_CV.pdf"
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-sm font-medium rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" /> Resume
            </a>
            <button onClick={() => scrollTo('contact')} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm rounded-lg border border-white/10 transition-colors">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={copyEmail} className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-gray-400 text-sm rounded-lg border border-white/10 transition-colors">
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Email'}
            </button>
          </div>

          <div className="flex gap-4 justify-center">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href={`mailto:${PROFILE.email}`} className="text-gray-500 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-5 h-5 text-gray-600 rotate-90" />
        </div>
      </section>

      {/* ═══════════════════ FEATURES ═══════════════════ */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Reveal3D>
            <h2 className="text-center text-sm text-amber-400 font-mono mb-2">Why work with me?</h2>
            <p className="text-center text-2xl sm:text-3xl font-bold text-white mb-12">What I bring to the table</p>
          </Reveal3D>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <Reveal3D key={f.title} direction="up" delay={i * 100}>
                <TiltCard className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 h-full hover:border-amber-400/20 transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center mb-4 group-hover:bg-amber-400/20 transition-colors">
                    <f.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </TiltCard>
              </Reveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ ABOUT ═══════════════════ */}
      <section id="about" className="relative z-10 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal3D>
            <h2 className="text-sm text-amber-400 font-mono mb-2">About Me</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-10">Get to know me</p>
          </Reveal3D>

          <div className="grid md:grid-cols-5 gap-8">
            <Reveal3D direction="left" className="md:col-span-3">
              <TiltCard className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 h-full">
                <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{PROFILE.bio}</p>
              </TiltCard>
            </Reveal3D>

            <div className="md:col-span-2 space-y-5">
              <Reveal3D direction="right" delay={150}>
                <TiltCard className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
                  <h3 className="text-xs text-amber-400 font-mono uppercase mb-3">Education</h3>
                  <p className="text-sm font-medium text-white">{PROFILE.education.institution}</p>
                  <p className="text-xs text-gray-400">{PROFILE.education.degree} — GPA: {PROFILE.education.gpa}</p>
                  <p className="text-xs text-gray-600 mt-1">{PROFILE.education.period}</p>
                </TiltCard>
              </Reveal3D>

              <Reveal3D direction="right" delay={250}>
                <TiltCard className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
                  <h3 className="text-xs text-amber-400 font-mono uppercase mb-3">Certifications</h3>
                  <div className="space-y-1.5">
                    {PROFILE.certifications.map(cert => (
                      <p key={cert} className="text-xs text-gray-400 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        {cert}
                      </p>
                    ))}
                  </div>
                </TiltCard>
              </Reveal3D>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ EXPERIENCE ═══════════════════ */}
      <section id="experience" className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal3D>
            <h2 className="text-sm text-amber-400 font-mono mb-2">Experience</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-10">Where I've worked</p>
          </Reveal3D>

          <div className="space-y-6">
            {EXPERIENCES.map((exp, i) => (
              <Reveal3D key={exp.company} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 80}>
                <TiltCard className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-8 hover:border-amber-400/15 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-base font-semibold text-white">{exp.company}</h3>
                      <p className="text-sm text-amber-400">{exp.role}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap bg-white/5 px-2.5 py-1 rounded-full shrink-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">{exp.location}</p>
                  <ul className="space-y-1.5 mb-4">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="text-xs text-gray-400 flex gap-2 leading-relaxed">
                        <ChevronRight className="w-3 h-3 text-amber-400/50 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.techStack.map(t => (
                      <span key={t} className="px-2 py-0.5 text-[10px] bg-amber-400/5 text-amber-400/60 rounded-full border border-amber-400/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </Reveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROJECTS ═══════════════════ */}
      <section id="projects" className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Reveal3D>
            <h2 className="text-sm text-amber-400 font-mono mb-2">Projects</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-10">What I've built</p>
          </Reveal3D>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PROJECTS.map((project, i) => (
              <Reveal3D key={project.name} direction="up" delay={i * 100}>
                <TiltCard className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 h-full hover:border-amber-400/15 transition-colors group">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                      {project.name}
                    </h3>
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-amber-400 transition-colors shrink-0 ml-2">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map(t => (
                      <span key={t} className="px-2 py-0.5 text-[10px] bg-white/[0.04] text-gray-400 rounded-full border border-white/[0.06]">
                        {t}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </Reveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CODEX ═══════════════════ */}
      <section id="atlas" className="relative z-10 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal3D>
            <h2 className="text-sm text-cyan-300 font-mono mb-2">Architect's Atlas</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-3">A system design vault, built and shared.</p>
            <p className="text-sm text-gray-400 max-w-2xl mb-10">
              132 high-level design problems across 20 categories, plus a 30-lesson learning ladder that climbs from foundations
              to staff-level architecture. DDIA-grounded. Multi-category. Tech rationale on every choice.
              Built end-to-end (including this React port) by orchestrating <span className="text-cyan-300">50+ parallel
              Claude sub-agents</span> &mdash; from authoring the docs to wiring the UI.
            </p>
          </Reveal3D>

          {/* Stats strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { n: '132', l: 'HLD problems' },
              { n: '20',  l: 'categories' },
              { n: '30',  l: 'lessons' },
              { n: '12',  l: 'sections per doc' },
            ].map((s, i) => (
              <Reveal3D key={s.l} delay={i * 80}>
                <TiltCard className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 text-center">
                  <div className="text-3xl font-bold text-cyan-300 font-mono">{s.n}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.l}</div>
                </TiltCard>
              </Reveal3D>
            ))}
          </div>

          {/* Three level previews */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { level: 'Easy',   color: 'from-emerald-400/30 to-emerald-400/0', accent: 'text-emerald-300', count: 10, sample: 'CAP · sharding · replication' },
              { level: 'Medium', color: 'from-amber-400/30  to-amber-400/0',  accent: 'text-amber-300',  count: 10, sample: 'Raft · CRDT · idempotency' },
              { level: 'Hard',   color: 'from-pink-400/30   to-pink-400/0',   accent: 'text-pink-300',   count: 10, sample: 'Multi-region · hot-key · capacity' },
            ].map((lv, i) => (
              <Reveal3D key={lv.level} direction="up" delay={i * 100}>
                <TiltCard className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 h-full relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${lv.color} pointer-events-none`} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`text-sm font-bold ${lv.accent}`}>{lv.level}</h3>
                      <span className="text-xs text-gray-500 font-mono">{lv.count} lessons</span>
                    </div>
                    <p className="text-xs text-gray-400">{lv.sample}</p>
                  </div>
                </TiltCard>
              </Reveal3D>
            ))}
          </div>

          {/* CTA */}
          <Reveal3D>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={openAtlas}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-cyan-300/10 border border-cyan-300/40 rounded-full text-cyan-200 hover:bg-cyan-300/15 hover:border-cyan-300/60 transition-all"
              >
                Launch the Atlas
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#atlas"
                onClick={(e) => { e.preventDefault(); openAtlas(); }}
                className="text-xs text-gray-500 self-center"
              >
                Or share a deep link → <span className="font-mono text-cyan-300/70">/#atlas</span>
              </a>
            </div>
          </Reveal3D>
        </div>
      </section>

      {/* ═══════════════════ SKILLS ═══════════════════ */}
      <section id="skills" className="relative z-10 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal3D>
            <h2 className="text-sm text-amber-400 font-mono mb-2">Skills & Expertise</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-10">Technologies I work with</p>
          </Reveal3D>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SKILLS.map((category, ci) => (
              <Reveal3D key={category.category} direction="up" delay={ci * 100}>
                <TiltCard className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 h-full">
                  <h3 className="text-sm font-semibold text-amber-400 mb-5">{category.category}</h3>
                  <div className="space-y-3.5">
                    {category.items.map((skill, si) => (
                      <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={si * 80} />
                    ))}
                  </div>
                </TiltCard>
              </Reveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CONTACT ═══════════════════ */}
      <section id="contact" className="relative z-10 py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <Reveal3D>
            <h2 className="text-sm text-amber-400 font-mono mb-2 text-center">Get in Touch</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">Let's work together</p>
            <p className="text-gray-500 text-sm text-center mb-10 max-w-md mx-auto">
              Have a project in mind or want to discuss opportunities? I'd love to hear from you.
            </p>
          </Reveal3D>

          <Reveal3D direction="up" delay={200}>
            <div className="gradient-border-card p-[1px] rounded-2xl">
              <TiltCard className="bg-[#0a0a12] rounded-2xl p-6 sm:p-8">
                {messageSent ? (
                  <div className="text-center py-8">
                    <Check className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <p className="text-lg text-white mb-2">Message ready!</p>
                    <p className="text-sm text-gray-500">Your email client should open with the message.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={contactForm.name}
                        onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-gray-600 focus:border-amber-400/50 transition-all focus:translate-y-[-2px] focus:shadow-[0_8px_24px_rgba(245,158,11,0.06)]"
                      />
                      <input
                        type="email"
                        required
                        placeholder="Email"
                        value={contactForm.email}
                        onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-gray-600 focus:border-amber-400/50 transition-all focus:translate-y-[-2px] focus:shadow-[0_8px_24px_rgba(245,158,11,0.06)]"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="Subject"
                      value={contactForm.subject}
                      onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-gray-600 focus:border-amber-400/50 transition-all focus:translate-y-[-2px] focus:shadow-[0_8px_24px_rgba(245,158,11,0.06)]"
                    />
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell me about your project..."
                      value={contactForm.message}
                      onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-gray-600 focus:border-amber-400/50 transition-all resize-none focus:translate-y-[-2px] focus:shadow-[0_8px_24px_rgba(245,158,11,0.06)]"
                    />
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-medium rounded-lg text-sm transition-all flex items-center justify-center gap-2 hover:translate-y-[-2px] hover:shadow-[0_12px_32px_rgba(245,158,11,0.15)]"
                    >
                      Send message <Send className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </TiltCard>
            </div>
          </Reveal3D>

          {/* Social links */}
          <Reveal3D direction="up" delay={400}>
            <div className="flex gap-4 justify-center mt-10">
              {[
                { href: PROFILE.github, icon: Github, label: 'GitHub' },
                { href: PROFILE.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: `mailto:${PROFILE.email}`, icon: Mail, label: 'Email' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-gray-400 hover:text-amber-400 hover:border-amber-400/20 transition-all hover:translate-y-[-3px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
                >
                  <Icon className="w-4 h-4" /> {label}
                </a>
              ))}
            </div>
          </Reveal3D>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={() => scrollTo('hero')} className="font-mono text-sm text-gray-500 hover:text-white transition-colors">
            <span className="text-amber-400">&lt;</span> Tishant Chandrakar <span className="text-amber-400">/&gt;</span>
          </button>
          <div className="flex items-center gap-5">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href={`mailto:${PROFILE.email}`} className="text-gray-500 hover:text-white transition-colors text-xs">Contact Me</a>
          </div>
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
