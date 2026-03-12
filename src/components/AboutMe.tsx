import { PROFILE, EXPERIENCES } from '../data/profile';
import { MapPin, Briefcase, GraduationCap, Award, ExternalLink } from 'lucide-react';

export default function AboutMe() {
  return (
    <div className="h-full overflow-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-kali-accent/20 via-kali-purple/10 to-kali-surface p-6 border-b border-kali-border/50">
        <div className="flex items-start gap-5">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-kali-accent/20 border-2 border-kali-accent/40 flex items-center justify-center shrink-0">
            <span className="text-2xl font-bold text-kali-accent">TC</span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-white">{PROFILE.name}</h1>
            <p className="text-kali-accent text-sm mt-0.5">{PROFILE.title}</p>
            <div className="flex items-center gap-4 mt-2 text-xs text-kali-muted flex-wrap">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {PROFILE.location}
              </span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3 h-3" /> Quizizz
              </span>
              <span className="flex items-center gap-1">
                <GraduationCap className="w-3 h-3" /> IIT Roorkee
              </span>
            </div>
            {/* Social links */}
            <div className="flex gap-3 mt-3">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-kali-accent hover:text-kali-accent-hover flex items-center gap-1 transition-colors"
              >
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-kali-accent hover:text-kali-accent-hover flex items-center gap-1 transition-colors"
              >
                LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Bio */}
        <section>
          <h2 className="text-sm font-semibold text-kali-accent mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-kali-accent" />
            About
          </h2>
          <p className="text-sm text-kali-text leading-relaxed whitespace-pre-line">
            {PROFILE.bio}
          </p>
        </section>

        {/* Experience Timeline */}
        <section>
          <h2 className="text-sm font-semibold text-kali-accent mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-kali-accent" />
            Experience
          </h2>
          <div className="space-y-4">
            {EXPERIENCES.map((exp, i) => (
              <div key={i} className="relative pl-6 border-l-2 border-kali-border/50">
                {/* Timeline dot */}
                <div className={`absolute -left-[7px] top-0.5 w-3 h-3 rounded-full border-2 ${
                  i === 0 ? 'bg-kali-accent border-kali-accent' : 'bg-kali-surface border-kali-border'
                }`} />

                <div className="bg-kali-surface/50 rounded-lg p-4 border border-kali-border/30">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <h3 className="text-sm font-semibold text-white">{exp.company}</h3>
                      <p className="text-xs text-kali-accent">{exp.role}</p>
                    </div>
                    <span className="text-[10px] text-kali-muted bg-kali-border/30 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-[10px] text-kali-muted mt-1">{exp.location}</p>
                  <ul className="mt-2 space-y-1">
                    {exp.highlights.slice(0, 3).map((h, j) => (
                      <li key={j} className="text-xs text-kali-text flex gap-2">
                        <span className="text-kali-accent shrink-0">▸</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {exp.techStack.slice(0, 6).map(t => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 text-[9px] bg-kali-accent/10 text-kali-accent rounded border border-kali-accent/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-sm font-semibold text-kali-accent mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-kali-accent" />
            Education
          </h2>
          <div className="bg-kali-surface/50 rounded-lg p-4 border border-kali-border/30">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-kali-accent" />
              <div>
                <h3 className="text-sm font-semibold text-white">{PROFILE.education.institution}</h3>
                <p className="text-xs text-kali-text">{PROFILE.education.degree} — GPA: {PROFILE.education.gpa}</p>
                <p className="text-[10px] text-kali-muted">{PROFILE.education.period}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-sm font-semibold text-kali-accent mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-kali-accent" />
            Certifications
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {PROFILE.certifications.map((cert, i) => (
              <div key={i} className="flex items-center gap-2 bg-kali-surface/50 rounded-lg p-3 border border-kali-border/30">
                <Award className="w-4 h-4 text-kali-yellow shrink-0" />
                <span className="text-xs text-kali-text">{cert}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements */}
        <section>
          <h2 className="text-sm font-semibold text-kali-accent mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-kali-accent" />
            Achievements
          </h2>
          <ul className="space-y-2">
            {PROFILE.achievements.map((a, i) => (
              <li key={i} className="text-xs text-kali-text flex gap-2">
                <span className="text-kali-yellow shrink-0">★</span>
                {a}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
