import { useState } from 'react';
import {
  Menu,
  X,
  Download,
  Copy,
  Check,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Server,
  Globe,
  Shield,
  Code2,
  Cpu,
  Brain,
  Send,
  ChevronRight,
  Briefcase,
  GraduationCap,
  Award,
} from 'lucide-react';
import { PROFILE, EXPERIENCES, PROJECTS, SKILLS } from '../../data/profile';
import StarBackground from './StarBackground';
import ScrollReveal from './ScrollReveal';

interface ClassicPortfolioProps {
  onSwitchPortfolio: () => void;
}

export default function ClassicPortfolio({ onSwitchPortfolio }: ClassicPortfolioProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [contactForm, setContactForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });
  const [messageSent, setMessageSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(contactForm.subject)}&body=${encodeURIComponent(
      `Hi Tishant,\n\n${contactForm.message}\n\nBest,\n${contactForm.firstName} ${contactForm.lastName}\n${contactForm.email}`
    )}`;
    window.open(mailtoUrl, '_blank');
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 3000);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const featureCards = [
    {
      icon: Server,
      title: 'Backend Architecture',
      description: 'Building scalable backend systems with Node.js, Go, Java, and Python. Experienced in microservices, API design, and high-throughput data pipelines.',
    },
    {
      icon: Brain,
      title: 'AI & LLM Integration',
      description: 'Integrating OpenAI LLMs, prompt engineering, and vector databases to build intelligent systems that reduce query times from minutes to seconds.',
    },
    {
      icon: Globe,
      title: 'Full-Stack Development',
      description: 'End-to-end development with React, Angular, and modern frontend frameworks paired with robust backend services serving 300K+ daily active users.',
    },
    {
      icon: Shield,
      title: 'Security & Infrastructure',
      description: 'Certified in Security+, CEH v11, and Network+. Deep knowledge of AWS, Docker, ECS, and CI/CD for secure, production-grade deployments.',
    },
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-white overflow-x-hidden relative">
      <StarBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="font-mono text-sm sm:text-base text-white hover:text-amber-400 transition-colors">
            <span className="text-amber-400">&lt;</span>
            <span className="hidden sm:inline"> Tishant Chandrakar</span>
            <span className="sm:hidden"> TC</span>
            <span className="text-amber-400"> /&gt;</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm transition-colors ${
                  activeSection === link.id ? 'text-amber-400' : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={onSwitchPortfolio}
              className="text-sm text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-1"
              title="Switch to Kali Linux Desktop"
            >
              <Cpu className="w-3.5 h-3.5" /> Desktop Mode
            </button>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-brand-dark/95 backdrop-blur-xl border-b border-white/5 py-4 px-6 space-y-3">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="block w-full text-left text-sm text-gray-400 hover:text-white py-1"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setMobileMenuOpen(false); onSwitchPortfolio(); }}
              className="block w-full text-left text-sm text-gray-400 hover:text-amber-400 py-1 flex items-center gap-1"
            >
              <Cpu className="w-3.5 h-3.5" /> Desktop Mode
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-3xl mx-auto text-center relative z-10 hero-text-enter">
          <p className="text-amber-400 text-sm sm:text-base mb-4 font-mono">
            Hello World! I'm
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <span className="text-white">Tishant </span>
            <span className="text-amber-400">Chandrakar</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 mb-3 font-light">
            Full Stack Developer
          </p>
          <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
            A backend-heavy full stack developer based in India with 6+ years of experience
            building scalable systems at companies like Goldman Sachs, MindTickle, PhotonInsights, and Quizizz.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={PROFILE.resumeUrl}
              download="Tishant_Chandrakar_CV.pdf"
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-medium rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Resume
            </a>
            <button
              onClick={copyEmail}
              className="px-6 py-2.5 border border-white/20 hover:border-amber-400/50 hover:text-amber-400 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              {emailCopied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {emailCopied ? 'Copied!' : 'Copy Email'}
            </button>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={`mailto:${PROFILE.email}`} className="text-gray-500 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronRight className="w-5 h-5 text-gray-600 rotate-90" />
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-center text-sm text-amber-400 font-mono mb-2">Why work with me?</h2>
            <p className="text-center text-2xl sm:text-3xl font-bold text-white mb-12">
              What I bring to the table
            </p>
          </ScrollReveal>
          <ScrollReveal stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featureCards.map((card, i) => (
                <div
                  key={i}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6 hover:border-amber-400/20 hover:bg-white/[0.05] transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center mb-4 group-hover:bg-amber-400/20 transition-colors">
                    <card.icon className="w-5 h-5 text-amber-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2">{card.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-sm text-amber-400 font-mono mb-2">About Me</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-8">Get to know me</p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left - Bio */}
            <ScrollReveal direction="left"><div>
              <p className="text-sm text-gray-400 leading-relaxed mb-6 whitespace-pre-line">
                {PROFILE.bio}
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span className="text-gray-400">{PROFILE.education.institution} — {PROFILE.education.degree}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Briefcase className="w-4 h-4 text-amber-400" />
                  <span className="text-gray-400">Currently at Hilabs, Bangalore</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-gray-400">Security+ | CEH v11 | Network+ Certified</span>
                </div>
              </div>
            </div>

            </ScrollReveal>

            {/* Right - Skills */}
            <ScrollReveal direction="right"><div>
              <h3 className="text-xs text-amber-400 font-mono uppercase mb-4">Tech Stack</h3>
              <div className="space-y-3">
                {SKILLS.map((cat, i) => (
                  <div key={i}>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1.5">{cat.category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map(s => (
                        <span
                          key={s.name}
                          className="px-2 py-0.5 text-[10px] bg-white/[0.05] border border-white/[0.08] rounded text-gray-400 hover:text-amber-400 hover:border-amber-400/30 transition-colors"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div></ScrollReveal>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-sm text-amber-400 font-mono mb-2">Experience</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-10">Where I've worked</p>
          </ScrollReveal>

          <div className="space-y-6">
            {EXPERIENCES.map((exp, i) => (
              <ScrollReveal key={i} delay={i * 100}><div
                key={i}
                className="relative pl-8 border-l-2 border-white/10 hover:border-amber-400/40 transition-colors"
              >
                <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${
                  i === 0 ? 'bg-amber-400 border-amber-400' : 'bg-brand-dark border-white/20'
                }`} />
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.1] transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="text-base font-semibold text-white">{exp.company}</h3>
                      <p className="text-sm text-amber-400">{exp.role}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap bg-white/5 px-2.5 py-1 rounded-full">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{exp.location}</p>
                  <ul className="space-y-1.5">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="text-xs text-gray-400 flex gap-2">
                        <ChevronRight className="w-3 h-3 text-amber-400/60 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {exp.techStack.map(t => (
                      <span key={t} className="px-2 py-0.5 text-[10px] bg-amber-400/5 text-amber-400/70 rounded border border-amber-400/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div></ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2 className="text-sm text-amber-400 font-mono mb-2">Projects</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white mb-10">What I've built</p>
          </ScrollReveal>

          <ScrollReveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {PROJECTS.map((project, i) => (
              <div
                key={i}
                className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:border-amber-400/20 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-amber-400" />
                    <h3 className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                      {project.name}
                    </h3>
                  </div>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map(t => (
                    <span key={t} className="px-2 py-0.5 text-[10px] bg-white/[0.05] text-gray-400 rounded border border-white/[0.08]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20 px-4">
        <ScrollReveal>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-sm text-amber-400 font-mono mb-2 text-center">Get in Touch</h2>
          <p className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">
            Let's work together
          </p>

          {messageSent ? (
            <div className="text-center py-12 animate-fade-in">
              <Check className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <p className="text-lg text-white mb-2">Message ready!</p>
              <p className="text-sm text-gray-500">Your email client should open with the message.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">First Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.firstName}
                    onChange={e => setContactForm({ ...contactForm, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-gray-600 focus:border-amber-400/50 transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.lastName}
                    onChange={e => setContactForm({ ...contactForm, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-gray-600 focus:border-amber-400/50 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-gray-600 focus:border-amber-400/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Subject</label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-gray-600 focus:border-amber-400/50 transition-colors"
                  placeholder="Let's collaborate"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  value={contactForm.message}
                  onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-lg text-sm text-white placeholder:text-gray-600 focus:border-amber-400/50 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-medium rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                Send message <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
        </ScrollReveal>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <button onClick={() => scrollTo('home')} className="font-mono text-sm text-gray-500 hover:text-white transition-colors">
            <span className="text-amber-400">&lt;</span> Tishant Chandrakar <span className="text-amber-400">/&gt;</span>
          </button>
          <div className="flex items-center gap-5">
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={`mailto:${PROFILE.email}`} className="text-gray-500 hover:text-white transition-colors text-xs flex items-center gap-1">
              Contact Me
            </a>
          </div>
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
