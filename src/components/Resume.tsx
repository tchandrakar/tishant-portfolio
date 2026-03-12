import { PROFILE, EXPERIENCES } from '../data/profile';
import {
  Download,
  Printer,
  ZoomIn,
  ZoomOut,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
} from 'lucide-react';

export default function Resume() {
  return (
    <div className="h-full flex flex-col">
      {/* PDF viewer toolbar */}
      <div className="bg-kali-titlebar border-b border-kali-border/50 px-4 py-2 flex items-center gap-3 shrink-0">
        <span className="text-xs text-kali-text">Tishant_Chandrakar_CV.pdf</span>
        <div className="ml-auto flex items-center gap-1">
          <button className="p-1.5 rounded hover:bg-white/10" title="Zoom In">
            <ZoomIn className="w-3.5 h-3.5 text-kali-muted" />
          </button>
          <button className="p-1.5 rounded hover:bg-white/10" title="Zoom Out">
            <ZoomOut className="w-3.5 h-3.5 text-kali-muted" />
          </button>
          <button className="p-1.5 rounded hover:bg-white/10" title="Print">
            <Printer className="w-3.5 h-3.5 text-kali-muted" />
          </button>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded hover:bg-white/10"
            title="Download from LinkedIn"
          >
            <Download className="w-3.5 h-3.5 text-kali-muted" />
          </a>
        </div>
      </div>

      {/* PDF content */}
      <div className="flex-1 overflow-auto bg-kali-bg/50 p-4 flex justify-center">
        <div className="bg-white text-gray-900 w-full max-w-[700px] shadow-2xl rounded-sm p-8 sm:p-10">
          {/* Header */}
          <div className="border-b-2 border-gray-800 pb-4 mb-5">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">{PROFILE.name}</h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" /> {PROFILE.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" /> {PROFILE.phone}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {PROFILE.location}
              </span>
            </div>
            <div className="flex gap-3 mt-1.5 text-xs text-blue-600">
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                <Linkedin className="w-3 h-3" /> LinkedIn
              </a>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                <Github className="w-3 h-3" /> GitHub
              </a>
            </div>
          </div>

          {/* Experience */}
          <section className="mb-5">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
              Experience
            </h2>
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{exp.company}</h3>
                    <p className="text-xs italic text-gray-600">{exp.role}</p>
                  </div>
                  <div className="text-right shrink-0 ml-2">
                    <p className="text-xs text-gray-600">{exp.location}</p>
                    <p className="text-xs italic text-gray-500">{exp.period}</p>
                  </div>
                </div>
                <ul className="mt-1.5 space-y-0.5">
                  {exp.highlights.map((h, j) => (
                    <li key={j} className="text-[11px] text-gray-700 flex gap-1.5">
                      <span className="shrink-0 mt-1">&#9702;</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <p className="text-[10px] text-gray-500 mt-1">
                  <strong>Tech Stack:</strong> {exp.techStack.join(', ')}
                </p>
              </div>
            ))}
          </section>

          {/* Education */}
          <section className="mb-5">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
              Education
            </h2>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-gray-900">{PROFILE.education.institution}</h3>
                <p className="text-xs text-gray-600">{PROFILE.education.degree}; GPA: {PROFILE.education.gpa}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-gray-600">{PROFILE.education.location}</p>
                <p className="text-xs italic text-gray-500">{PROFILE.education.period}</p>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section className="mb-5">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
              License & Certifications
            </h2>
            <p className="text-xs text-gray-700">
              {PROFILE.certifications.join(' | ')}
            </p>
          </section>

          {/* Leadership */}
          <section>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
              Leadership & Accomplishments
            </h2>
            <ul className="space-y-1">
              {PROFILE.achievements.slice(0, 2).map((a, i) => (
                <li key={i} className="text-xs text-gray-700 flex gap-1.5">
                  <span className="shrink-0">&#8226;</span>
                  {a}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
