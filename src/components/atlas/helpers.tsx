import type { AtlasProblem } from './types';

export const CATEGORY_META: Record<string, { emoji: string; desc: string }> = {
  'audio-streaming':   { emoji: '🎙️', desc: 'Audio platforms — streaming, podcasts, recommendations.' },
  'video-streaming':   { emoji: '📺', desc: 'On-demand and live video, transcoding, CDNs.' },
  'social-network':    { emoji: '🌐', desc: 'News feeds, fanout, ranking, social graphs.' },
  'messaging':         { emoji: '💬', desc: 'Chat, presence, real-time delivery, ordering.' },
  'ecommerce':         { emoji: '🛒', desc: 'Carts, inventory, checkout, order pipelines.' },
  'ride-sharing':      { emoji: '🚕', desc: 'Geo-indexing, matching, surge, ETA.' },
  'food-delivery':     { emoji: '🍔', desc: 'Logistics, dispatch, last-mile, kitchens.' },
  'search':            { emoji: '🔎', desc: 'Indexing, ranking, autocomplete.' },
  'storage-cache':     { emoji: '⚡', desc: 'Distributed caches, KV stores, counters.' },
  'file-storage':      { emoji: '🗂️', desc: 'Object storage, sync, dedup, versioning.' },
  'payments':          { emoji: '💳', desc: 'Idempotency, ledger, fraud, settlement.' },
  'maps-location':     { emoji: '🗺️', desc: 'Geo-search, routing, nearby, places.' },
  'notifications':     { emoji: '🔔', desc: 'Push, email, SMS, fanout, scheduling.' },
  'recommendation':    { emoji: '🤖', desc: 'Candidate generation, ranking, A/B.' },
  'ad-tech':           { emoji: '📢', desc: 'RTB, auctions, attribution, pacing.' },
  'collaboration':     { emoji: '📝', desc: 'OT, CRDT, presence, real-time docs.' },
  'cdn':               { emoji: '🌍', desc: 'Edge caching, anycast, invalidation.' },
  'analytics':         { emoji: '📊', desc: 'Event pipelines, tracing, sessionization.' },
  'database-ddia':     { emoji: '📚', desc: 'DDIA-grade internals — LSM, consensus, WAL.' },
  'misc':              { emoji: '🧩', desc: 'Niche but interview-favorite hard problems.' },
};

export function niceCategoryName(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, m => m.toUpperCase());
}

interface ProblemCardProps {
  problem: AtlasProblem;
  onClick: () => void;
}

export function ProblemCard({ problem: p, onClick }: ProblemCardProps) {
  return (
    <div className="atlas-prob-card" onClick={onClick}>
      <h4>{p.title}</h4>
      <p className="summary">{p.summary || ''}</p>
      <div className="meta">
        {p.difficulty && (
          <span className={`atlas-tag diff-${(p.difficulty || '').replace(' ', '-')}`}>
            {p.difficulty}
          </span>
        )}
        {(p.categories || []).map(c => (
          <span key={c} className="atlas-tag tag-cat">{c}</span>
        ))}
        {(p.tags || []).map(t => (
          <span key={t} className="atlas-tag tag-tech">{t}</span>
        ))}
      </div>
    </div>
  );
}
