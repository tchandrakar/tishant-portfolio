import { SKILLS } from '../data/profile';
import { Cpu, Activity, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Skills() {
  const [animatedLevels, setAnimatedLevels] = useState<Record<string, number>>({});

  useEffect(() => {
    // Animate skill bars on mount
    const timer = setTimeout(() => {
      const levels: Record<string, number> = {};
      SKILLS.forEach(cat => {
        cat.items.forEach(item => {
          levels[`${cat.category}-${item.name}`] = item.level;
        });
      });
      setAnimatedLevels(levels);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const getBarColor = (level: number) => {
    if (level >= 90) return 'bg-kali-green';
    if (level >= 75) return 'bg-kali-accent';
    if (level >= 60) return 'bg-kali-yellow';
    return 'bg-kali-red';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header - System Monitor style */}
      <div className="bg-kali-titlebar border-b border-kali-border/50 px-4 py-2 flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-kali-accent" />
          <span className="text-xs font-medium text-kali-text">System Monitor</span>
        </div>
        <div className="flex gap-4 text-[10px] text-kali-muted ml-auto">
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3 text-kali-green" /> All Systems Operational
          </span>
          <span className="flex items-center gap-1">
            <BarChart3 className="w-3 h-3 text-kali-accent" /> {SKILLS.reduce((a, c) => a + c.items.length, 0)} Skills Tracked
          </span>
        </div>
      </div>

      {/* Skills content */}
      <div className="flex-1 overflow-auto p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SKILLS.map((category, ci) => (
            <div
              key={ci}
              className="bg-kali-surface/50 border border-kali-border/40 rounded-lg overflow-hidden"
            >
              {/* Category header */}
              <div className="bg-kali-titlebar/50 px-4 py-2.5 border-b border-kali-border/30">
                <h3 className="text-xs font-semibold text-kali-accent uppercase tracking-wider">
                  {category.category}
                </h3>
              </div>

              {/* Skills list */}
              <div className="p-4 space-y-3">
                {category.items.map((skill, si) => {
                  const key = `${category.category}-${skill.name}`;
                  const animLevel = animatedLevels[key] || 0;

                  return (
                    <div key={si}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-kali-text">{skill.name}</span>
                        <span className="text-[10px] text-kali-muted font-mono">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-kali-bg/80 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${getBarColor(skill.level)}`}
                          style={{ width: `${animLevel}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Category average */}
              <div className="px-4 py-2 border-t border-kali-border/30 flex justify-between">
                <span className="text-[10px] text-kali-muted">Average</span>
                <span className="text-[10px] text-kali-accent font-mono font-bold">
                  {Math.round(
                    category.items.reduce((a, b) => a + b.level, 0) / category.items.length
                  )}%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Summary */}
        <div className="mt-5 bg-kali-surface/50 border border-kali-border/40 rounded-lg p-4">
          <h3 className="text-xs font-semibold text-kali-accent mb-3">TECH STACK OVERVIEW</h3>
          <div className="flex flex-wrap gap-2">
            {SKILLS.flatMap(c => c.items).map((s, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-[10px] rounded-full border transition-colors"
                style={{
                  backgroundColor: `rgba(54, 123, 240, ${s.level / 500})`,
                  borderColor: `rgba(54, 123, 240, ${s.level / 300})`,
                  color: s.level >= 85 ? '#fff' : '#c8d6e5',
                }}
              >
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
