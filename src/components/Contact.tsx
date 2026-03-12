import { useState } from 'react';
import {
  Mail,
  Send,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import { PROFILE } from '../data/profile';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PROFILE.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Hi Tishant,\n\n${formData.message}\n\nBest,\n${formData.name}\n${formData.email}`
    )}`;
    window.open(mailtoUrl, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Email client toolbar */}
      <div className="bg-kali-titlebar border-b border-kali-border/50 px-4 py-2 flex items-center gap-3 shrink-0">
        <Mail className="w-4 h-4 text-kali-accent" />
        <span className="text-xs font-medium text-kali-text">New Message</span>
        <div className="ml-auto">
          <span className="text-[10px] text-kali-muted">Compose</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="flex h-full">
          {/* Sidebar - Contact info */}
          <div className="w-56 bg-kali-surface/50 border-r border-kali-border/50 p-4 shrink-0">
            <h3 className="text-xs font-semibold text-kali-accent uppercase tracking-wider mb-4">
              Contact Info
            </h3>

            <div className="space-y-4">
              <a
                href={`mailto:${PROFILE.email}`}
                className="flex items-start gap-2 text-xs text-kali-text hover:text-kali-accent transition-colors group"
              >
                <Mail className="w-4 h-4 text-kali-muted group-hover:text-kali-accent mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] text-kali-muted mb-0.5">Email</div>
                  <div className="break-all">{PROFILE.email}</div>
                </div>
              </a>

              <div className="flex items-start gap-2 text-xs text-kali-text">
                <Phone className="w-4 h-4 text-kali-muted mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] text-kali-muted mb-0.5">Phone</div>
                  {PROFILE.phone}
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-kali-text">
                <MapPin className="w-4 h-4 text-kali-muted mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] text-kali-muted mb-0.5">Location</div>
                  {PROFILE.location}
                </div>
              </div>

              <div className="border-t border-kali-border/30 pt-4">
                <h4 className="text-[10px] text-kali-muted uppercase mb-3">Social</h4>
                <div className="space-y-2">
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-kali-text hover:text-kali-accent transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    GitHub
                    <ExternalLink className="w-3 h-3 ml-auto text-kali-muted" />
                  </a>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-kali-text hover:text-kali-accent transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                    <ExternalLink className="w-3 h-3 ml-auto text-kali-muted" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main - Contact form */}
          <div className="flex-1 p-6">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center animate-fade-in">
                <CheckCircle className="w-12 h-12 text-kali-green mb-4" />
                <h2 className="text-lg font-semibold text-white mb-2">Message Ready!</h2>
                <p className="text-sm text-kali-muted">
                  Your email client should open with the message. Thanks for reaching out!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                {/* To field */}
                <div className="flex items-center gap-2 pb-3 border-b border-kali-border/30">
                  <span className="text-xs text-kali-muted w-12">To:</span>
                  <span className="text-xs text-kali-text">{PROFILE.email}</span>
                </div>

                {/* From */}
                <div className="flex items-center gap-2 pb-3 border-b border-kali-border/30">
                  <span className="text-xs text-kali-muted w-12">From:</span>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name"
                    required
                    className="flex-1 bg-transparent text-xs text-kali-text border-none p-0"
                  />
                </div>

                {/* Email */}
                <div className="flex items-center gap-2 pb-3 border-b border-kali-border/30">
                  <span className="text-xs text-kali-muted w-12">Reply:</span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    required
                    className="flex-1 bg-transparent text-xs text-kali-text border-none p-0"
                  />
                </div>

                {/* Subject */}
                <div className="flex items-center gap-2 pb-3 border-b border-kali-border/30">
                  <span className="text-xs text-kali-muted w-12">Subject:</span>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What's this about?"
                    required
                    className="flex-1 bg-transparent text-xs text-kali-text border-none p-0"
                  />
                </div>

                {/* Message */}
                <div>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    required
                    rows={8}
                    className="w-full bg-kali-surface/50 border border-kali-border/40 rounded-lg p-3 text-xs text-kali-text resize-none"
                  />
                </div>

                {/* Send button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2 bg-kali-accent hover:bg-kali-accent-hover text-white rounded-lg text-xs font-medium transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
