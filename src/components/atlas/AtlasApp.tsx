import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './atlas.css';
import AtlasBackground from './AtlasBackground';
import { CATEGORY_META, ProblemCard, niceCategoryName } from './helpers';
import type { AtlasLesson, AtlasProblem, AtlasRoute } from './types';
import { useAtlasProgress } from './useAtlasProgress';

const ATLAS_BASE = 'atlas';

interface AtlasAppProps {
  /** When true, syncs `#atlas/...` to URL hash and reads from it. When false, internal state only. */
  syncHash?: boolean;
  /** Optional close button (used when embedded inside Kali window — but window already has its own close). */
  onExit?: () => void;
}

function parseHash(): AtlasRoute {
  const h = window.location.hash.replace(/^#/, '');
  if (!h.startsWith(ATLAS_BASE)) return { name: 'home' };
  const parts = h.split('/').slice(1); // drop "atlas"
  if (parts.length === 0 || parts[0] === '') return { name: 'home' };
  const [route, arg] = parts;
  switch (route) {
    case 'home':       return { name: 'home' };
    case 'learn':      return { name: 'learn' };
    case 'categories': return { name: 'categories' };
    case 'all':        return { name: 'all' };
    case 'about':      return { name: 'about' };
    case 'category':   return arg ? { name: 'category', arg } : { name: 'categories' };
    case 'problem':    return arg ? { name: 'problem',  arg } : { name: 'all' };
    case 'lesson':     return arg ? { name: 'lesson',   arg } : { name: 'learn' };
    default:           return { name: 'home' };
  }
}

function routeToHash(r: AtlasRoute): string {
  switch (r.name) {
    case 'home':       return `#${ATLAS_BASE}/home`;
    case 'learn':      return `#${ATLAS_BASE}/learn`;
    case 'categories': return `#${ATLAS_BASE}/categories`;
    case 'all':        return `#${ATLAS_BASE}/all`;
    case 'about':      return `#${ATLAS_BASE}/about`;
    case 'category':   return `#${ATLAS_BASE}/category/${r.arg}`;
    case 'problem':    return `#${ATLAS_BASE}/problem/${r.arg}`;
    case 'lesson':     return `#${ATLAS_BASE}/lesson/${r.arg}`;
  }
}

export default function AtlasApp({ syncHash = false }: AtlasAppProps) {
  // ---------------- Catalog state ----------------
  const [problems, setProblems] = useState<AtlasProblem[]>([]);
  const [lessons, setLessons]   = useState<AtlasLesson[]>([]);
  const [route, setRoute]       = useState<AtlasRoute>(() => syncHash ? parseHash() : { name: 'home' });
  const [search, setSearch]     = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');

  const { progress, isComplete, toggle, setLast, reset } = useAtlasProgress();

  // Fetch catalogs once
  useEffect(() => {
    let cancelled = false;
    Promise.all([
      fetch('/atlas/data/problems.json', { cache: 'no-store' }).then(r => r.json()).catch(() => ({ problems: [] })),
      fetch('/atlas/data/lessons.json',  { cache: 'no-store' }).then(r => r.json()).catch(() => ({ lessons:  [] })),
    ]).then(([p, l]) => {
      if (cancelled) return;
      setProblems(p.problems || []);
      const ls: AtlasLesson[] = (l.lessons || []).slice().sort((a: AtlasLesson, b: AtlasLesson) => (a.order || 0) - (b.order || 0));
      setLessons(ls);
    });
    return () => { cancelled = true; };
  }, []);

  // ---------------- Hash sync ----------------
  useEffect(() => {
    if (!syncHash) return;
    const onHash = () => {
      // Only react if hash starts with atlas
      if (window.location.hash.startsWith(`#${ATLAS_BASE}`)) {
        setRoute(parseHash());
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [syncHash]);

  const navigate = useCallback((r: AtlasRoute) => {
    setRoute(r);
    if (syncHash) {
      const target = routeToHash(r);
      if (window.location.hash !== target) window.location.hash = target;
    }
  }, [syncHash]);

  // ---------------- Derived ----------------
  const problemsById = useMemo(() => {
    const map: Record<string, AtlasProblem> = {};
    problems.forEach(p => { map[p.id] = p; });
    return map;
  }, [problems]);

  const lessonsById = useMemo(() => {
    const map: Record<string, AtlasLesson> = {};
    lessons.forEach(l => { map[l.id] = l; });
    return map;
  }, [lessons]);

  const lessonsByLevel = useMemo(() => {
    const buckets: Record<'easy' | 'medium' | 'hard', AtlasLesson[]> = { easy: [], medium: [], hard: [] };
    lessons.forEach(l => buckets[l.level]?.push(l));
    return buckets;
  }, [lessons]);

  const allCategories = useMemo(() => {
    const set = new Set<string>();
    problems.forEach(p => (p.categories || []).forEach(c => set.add(c)));
    return [...set].sort();
  }, [problems]);

  // ---------------- Search-driven nav ----------------
  // Whenever the search input has text, snap to "all" view and apply filter.
  const lastSearchAppliedRef = useRef('');
  useEffect(() => {
    const q = search.trim();
    if (q && q !== lastSearchAppliedRef.current && route.name !== 'all') {
      navigate({ name: 'all' });
    }
    lastSearchAppliedRef.current = q;
  }, [search, route.name, navigate]);

  const filteredProblems = useMemo(() => {
    const q = search.trim().toLowerCase();
    return problems.filter(p =>
      (!filterCategory || (p.categories || []).includes(filterCategory)) &&
      (!filterDifficulty || p.difficulty === filterDifficulty) &&
      (!q || (
        p.title.toLowerCase().includes(q) ||
        (p.summary || '').toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q)) ||
        (p.categories || []).some(t => t.toLowerCase().includes(q)) ||
        p.id.toLowerCase().includes(q)
      ))
    );
  }, [problems, filterCategory, filterDifficulty, search]);

  const featured = useMemo(() => {
    const order = ['video-streaming', 'audio-streaming', 'messaging', 'search', 'ride-sharing', 'database-ddia'];
    const picks: AtlasProblem[] = [];
    for (const cat of order) {
      const p = problems.find(p => (p.categories || []).includes(cat));
      if (p) picks.push(p);
    }
    while (picks.length < 6 && problems.length) {
      const p = problems[Math.floor(Math.random() * problems.length)];
      if (!picks.includes(p)) picks.push(p);
    }
    return picks.slice(0, 6);
  }, [problems]);

  // ---------------- Renderers ----------------
  function renderHome() {
    return (
      <div className="atlas-view" key="home">
        <div className="atlas-hero">
          <div className="atlas-hero-3d">
            <div className="atlas-cube">
              <span className="face front">HLD</span>
              <span className="face back">DDIA</span>
              <span className="face right">SCALE</span>
              <span className="face left">CACHE</span>
              <span className="face top">QUEUE</span>
              <span className="face bottom">SHARD</span>
            </div>
          </div>
          <div>
            <h2>System Design <span className="accent">at scale.</span></h2>
            <p className="atlas-lead">A curated vault of <b>{problems.length}+</b> high-level design problems and <b>{lessons.length}</b> structured lessons. Multi-category. DDIA-grounded. Built for senior &amp; staff-level interviews.</p>
            <div className="atlas-cta-row">
              <button className="atlas-btn primary" onClick={() => navigate({ name: 'learn' })}>Start learning →</button>
              <button className="atlas-btn ghost" onClick={() => navigate({ name: 'categories' })}>Browse categories</button>
              <button className="atlas-btn ghost" onClick={() => navigate({ name: 'all' })}>All problems</button>
            </div>
            <div className="atlas-stats">
              <div className="atlas-stat"><b>{problems.length}</b><span>problems</span></div>
              <div className="atlas-stat"><b>{allCategories.length}</b><span>categories</span></div>
              <div className="atlas-stat"><b>{lessons.length}</b><span>lessons</span></div>
              <div className="atlas-stat"><b>DDIA</b><span>-grounded</span></div>
            </div>
          </div>
        </div>
        <section className="atlas-featured">
          <h3>Featured tracks</h3>
          <div className="atlas-featured-grid">
            {featured.map(p => (
              <ProblemCard key={p.id} problem={p} onClick={() => navigate({ name: 'problem', arg: p.id })} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  function renderCategories() {
    const counts: Record<string, number> = {};
    problems.forEach(p => (p.categories || []).forEach(c => counts[c] = (counts[c] || 0) + 1));
    const cats = Object.keys(counts).sort();
    return (
      <div className="atlas-view" key="categories">
        <h2 className="atlas-view-title">Categories <span className="muted">(click any card to drill in)</span></h2>
        <div className="atlas-cat-grid">
          {cats.map(c => {
            const meta = CATEGORY_META[c] || { emoji: '📦', desc: '' };
            return (
              <div key={c} className="atlas-cat-card" onClick={() => navigate({ name: 'category', arg: c })}>
                <span className="atlas-cat-emoji">{meta.emoji}</span>
                <h3>{niceCategoryName(c)}</h3>
                <p>{meta.desc}</p>
                <span className="atlas-cat-count">{counts[c]} problem{counts[c] === 1 ? '' : 's'}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function renderCategory(slug: string) {
    const meta = CATEGORY_META[slug] || { emoji: '📦', desc: '' };
    const list = problems.filter(p => (p.categories || []).includes(slug));
    return (
      <div className="atlas-view" key={`category-${slug}`}>
        <button className="atlas-back-btn" onClick={() => navigate({ name: 'categories' })}>← Back to categories</button>
        <h2 className="atlas-view-title">{meta.emoji} {niceCategoryName(slug)}</h2>
        <p className="muted">{meta.desc}</p>
        <div className="atlas-prob-grid" style={{ marginTop: 14 }}>
          {list.length
            ? list.map(p => <ProblemCard key={p.id} problem={p} onClick={() => navigate({ name: 'problem', arg: p.id })} />)
            : <p className="muted">No problems yet for this category.</p>}
        </div>
      </div>
    );
  }

  function renderAll() {
    return (
      <div className="atlas-view" key="all">
        <div className="atlas-filter-bar">
          <h2 className="atlas-view-title">All Problems</h2>
          <div className="atlas-filter-controls">
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
              <option value="">All categories</option>
              {allCategories.map(c => <option key={c} value={c}>{niceCategoryName(c)}</option>)}
            </select>
            <select value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value)}>
              <option value="">All difficulties</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Very Hard">Very Hard</option>
            </select>
          </div>
        </div>
        <div className="atlas-prob-grid">
          {filteredProblems.length
            ? filteredProblems.map(p => <ProblemCard key={p.id} problem={p} onClick={() => navigate({ name: 'problem', arg: p.id })} />)
            : <p className="muted">No problems match <code>{search || 'these filters'}</code>.</p>}
        </div>
      </div>
    );
  }

  function renderProblem(id: string) {
    return (
      <ProblemDetail
        id={id}
        problem={problemsById[id]}
        onBack={() => navigate({ name: route.name === 'problem' && filterCategory ? 'category' : 'all', arg: filterCategory } as AtlasRoute)}
      />
    );
  }

  function renderLearn() {
    const completed = new Set(progress.completed);
    const total = lessons.length;
    const done = lessons.filter(l => completed.has(l.id)).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    const last = progress.lastLessonId ? lessonsById[progress.lastLessonId] : null;

    const levels: Array<{ key: 'easy' | 'medium' | 'hard'; title: string; sub: string }> = [
      { key: 'easy',   title: 'Level 1 — Foundations',    sub: 'Pillars: scaling, caching, replication, sharding, consistency.' },
      { key: 'medium', title: 'Level 2 — Building blocks', sub: 'Patterns: queues, consensus, distributed transactions, sketches.' },
      { key: 'hard',   title: 'Level 3 — Architectures',   sub: 'Mastery: CRDTs, lambda/kappa, multi-region, capacity, the interview frame.' },
    ];

    function nextIncomplete(): AtlasLesson | null {
      for (const l of lessons) if (!completed.has(l.id)) return l;
      return null;
    }

    return (
      <div className="atlas-view" key="learn">
        <h2 className="atlas-view-title">Learn — climb the ladder</h2>
        <p className="muted">Bite-size lessons grouped by difficulty. Mark each one complete when you've internalised it; progress is saved on this device.</p>

        <div className="atlas-learn-progress">
          <div className="atlas-learn-row">
            <div className="atlas-learn-stat"><b>{done}</b><span>completed</span></div>
            <div className="atlas-learn-stat"><b>{total}</b><span>total lessons</span></div>
            <div className="atlas-learn-stat"><b>{pct}%</b><span>progress</span></div>
            <div className="atlas-learn-stat"><b>{last ? last.title.split(':')[0].slice(0, 18) : '—'}</b><span>last lesson</span></div>
          </div>
          <div className="atlas-bar"><div className="atlas-bar-fill" style={{ width: `${pct}%` }} /></div>
          <div className="atlas-learn-actions">
            <button className="atlas-btn ghost" disabled={!last && lessons.length === 0} onClick={() => {
              const target = last || nextIncomplete() || lessons[0];
              if (target) navigate({ name: 'lesson', arg: target.id });
            }}>Resume last lesson</button>
            <button className="atlas-btn ghost" onClick={() => {
              if (window.confirm('Reset all lesson progress on this device?')) reset();
            }}>Reset progress</button>
          </div>
        </div>

        <div className="atlas-ladder">
          {levels.map(lv => {
            const list = lessonsByLevel[lv.key] || [];
            const doneAtLevel = list.filter(l => completed.has(l.id)).length;
            return (
              <div key={lv.key} className={`atlas-level atlas-level-${lv.key}`}>
                <div className="atlas-level-head">
                  <h3 className="atlas-level-title">
                    {lv.title}
                    <span className="atlas-level-badge">{lv.key}</span>
                  </h3>
                  <span className="atlas-level-progress"><b>{doneAtLevel}</b>/ {list.length} done</span>
                </div>
                <p className="muted" style={{ margin: '0 0 12px' }}>{lv.sub}</p>
                <div className="atlas-lessons">
                  {list.length === 0 && <p className="muted">Lessons coming soon.</p>}
                  {list.map((l, i) => {
                    const isDone = completed.has(l.id);
                    return (
                      <div
                        key={l.id}
                        className={`atlas-lesson-card ${isDone ? 'done' : ''}`}
                        onClick={() => navigate({ name: 'lesson', arg: l.id })}
                      >
                        <div className="atlas-lesson-check">{isDone ? '✓' : ''}</div>
                        <span className="atlas-lesson-num">Lesson {i + 1}</span>
                        <h4>{l.title}</h4>
                        {l.minutes ? <span className="atlas-lesson-time">{l.minutes} min read</span> : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function renderLesson(id: string) {
    return (
      <LessonDetail
        id={id}
        lesson={lessonsById[id]}
        lessons={lessons}
        completed={isComplete(id)}
        onToggle={() => toggle(id)}
        onLast={() => setLast(id)}
        onBack={() => navigate({ name: 'learn' })}
        onNavigate={(target) => navigate({ name: 'lesson', arg: target })}
        onProblemNav={(pid) => navigate({ name: 'problem', arg: pid })}
      />
    );
  }

  function renderAbout() {
    return (
      <div className="atlas-view" key="about">
        <h2 className="atlas-view-title">About this Atlas</h2>
        <div className="atlas-about">
          <p>This is an opinionated, interview-oriented HLD knowledge base. Every problem follows the same structure so you can rehearse delivery cleanly:</p>
          <ol>
            <li><b>Problem statement</b> — clarify the ask in one breath</li>
            <li><b>Functional &amp; non-functional requirements</b> — set the scope</li>
            <li><b>Capacity estimation</b> — back-of-envelope math</li>
            <li><b>API design</b> — public contract</li>
            <li><b>High-level architecture</b> — the box-and-arrow picture</li>
            <li><b>Data model &amp; storage</b> — schema + storage choice + why</li>
            <li><b>Detailed component design</b> — the parts you will be drilled on</li>
            <li><b>Scaling &amp; bottlenecks</b> — what breaks first</li>
            <li><b>Trade-offs</b> — the choices and the costs</li>
            <li><b>DDIA references</b> — anchor your reasoning</li>
            <li><b>Talking points</b> — how to deliver it in an interview</li>
            <li><b>Tech stack &amp; rationale</b> — why every technology is used</li>
          </ol>
          <p className="muted">Sources: DDIA (Kleppmann), Pocket FM interview reports (Glassdoor / LeetCode / Medium), engineering blogs (Netflix / Spotify / Uber / Meta), and senior-interview prep playbooks.</p>
        </div>
      </div>
    );
  }

  // ---------------- Layout ----------------
  return (
    <div className="atlas-root">
      <AtlasBackground />
      <header className="atlas-topbar">
        <div className="atlas-brand">
          <span className="atlas-logo" />
          <h1>Architect's<span className="accent">.atlas</span></h1>
        </div>
        <nav className="atlas-nav">
          <a className={route.name === 'home'       ? 'active' : ''} onClick={() => navigate({ name: 'home' })}>Home</a>
          <a className={route.name === 'learn'      ? 'active' : ''} onClick={() => navigate({ name: 'learn' })}>Learn</a>
          <a className={route.name === 'categories' ? 'active' : ''} onClick={() => navigate({ name: 'categories' })}>Categories</a>
          <a className={route.name === 'all'        ? 'active' : ''} onClick={() => navigate({ name: 'all' })}>All</a>
          <a className={route.name === 'about'      ? 'active' : ''} onClick={() => navigate({ name: 'about' })}>About</a>
        </nav>
        <div className="atlas-search-wrap">
          <input
            className="atlas-search"
            placeholder="Search problems… (e.g. spotify, kafka, cdn)"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Escape') { setSearch(''); }
              if (e.key === 'Enter')  { if (route.name !== 'all') navigate({ name: 'all' }); }
            }}
          />
        </div>
      </header>
      <main className="atlas-main">
        {route.name === 'home'       && renderHome()}
        {route.name === 'learn'      && renderLearn()}
        {route.name === 'categories' && renderCategories()}
        {route.name === 'all'        && renderAll()}
        {route.name === 'about'      && renderAbout()}
        {route.name === 'category'   && renderCategory(route.arg)}
        {route.name === 'problem'    && renderProblem(route.arg)}
        {route.name === 'lesson'     && renderLesson(route.arg)}
      </main>
    </div>
  );
}

// ---------------- Problem detail ----------------
function ProblemDetail({ id, problem, onBack }: { id: string; problem: AtlasProblem | undefined; onBack: () => void; }) {
  const [html, setHtml] = useState<string>('');
  useEffect(() => {
    if (!problem) return;
    let cancelled = false;
    setHtml('<p class="muted">Loading…</p>');
    fetch('/atlas/' + problem.path, { cache: 'no-store' })
      .then(r => r.text())
      .then(text => { if (!cancelled) setHtml(text); })
      .catch(() => { if (!cancelled) setHtml('<p class="muted">Could not load problem.</p>'); });
    return () => { cancelled = true; };
  }, [problem]);

  if (!problem) {
    return (
      <div className="atlas-view">
        <button className="atlas-back-btn" onClick={onBack}>← Back</button>
        <p className="muted">Problem not found: <code>{id}</code></p>
      </div>
    );
  }

  return (
    <div className="atlas-view" key={`problem-${id}`}>
      <button className="atlas-back-btn" onClick={onBack}>← Back</button>
      <div className="atlas-doc" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

// ---------------- Lesson detail ----------------
interface LessonDetailProps {
  id: string;
  lesson: AtlasLesson | undefined;
  lessons: AtlasLesson[];
  completed: boolean;
  onToggle: () => void;
  onLast: () => void;
  onBack: () => void;
  onNavigate: (id: string) => void;
  onProblemNav: (problemId: string) => void;
}

function LessonDetail({ id, lesson, lessons, completed, onToggle, onLast, onBack, onNavigate, onProblemNav }: LessonDetailProps) {
  const [html, setHtml] = useState<string>('');
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!lesson) return;
    onLast();
    let cancelled = false;
    setHtml('<p class="muted">Loading…</p>');
    fetch('/atlas/' + lesson.path, { cache: 'no-store' })
      .then(r => r.text())
      .then(text => { if (!cancelled) setHtml(text); })
      .catch(() => { if (!cancelled) setHtml('<p class="muted">Could not load lesson.</p>'); });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.id]);

  // Intercept clicks on internal #problem/* anchor links inside the lesson HTML
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const m = href.match(/^#problem\/(.+)$/);
      if (m) {
        e.preventDefault();
        onProblemNav(m[1]);
      }
    };
    el.addEventListener('click', handler);
    return () => el.removeEventListener('click', handler);
  }, [html, onProblemNav]);

  const idx = lesson ? lessons.findIndex(l => l.id === lesson.id) : -1;
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx >= 0 && idx < lessons.length - 1 ? lessons[idx + 1] : null;

  if (!lesson) {
    return (
      <div className="atlas-view">
        <button className="atlas-back-btn" onClick={onBack}>← Back to ladder</button>
        <p className="muted">Lesson not found: <code>{id}</code></p>
      </div>
    );
  }

  return (
    <div className="atlas-view" key={`lesson-${id}`}>
      <button className="atlas-back-btn" onClick={onBack}>← Back to ladder</button>
      <div className="atlas-doc" ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />
      <div className="atlas-lesson-footer">
        <button className="atlas-btn ghost" disabled={!prev} onClick={() => prev && onNavigate(prev.id)}>← Previous</button>
        <button className={`atlas-btn primary ${completed ? 'completed' : ''}`} onClick={onToggle}>
          {completed ? '✓ Completed (click to undo)' : 'Mark complete'}
        </button>
        <button className="atlas-btn ghost" disabled={!next} onClick={() => next && onNavigate(next.id)}>Next →</button>
      </div>
    </div>
  );
}
