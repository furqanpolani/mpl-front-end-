'use client';

import { useEffect, useState } from 'react';

const API = '';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
  'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
  'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
];

export default function AnnouncementsPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const load = () => fetch(`${API}/api/public/announcements`).then(r => r.json()).then(d => setItems(Array.isArray(d) ? d : [])).catch(() => {});
    load();
    const t = setInterval(load, 60_000);
    return () => clearInterval(t);
  }, []);

  const featured = items[0];
  const rest = items.slice(1);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ color: '#c8a84b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem', fontFamily: 'Oswald, sans-serif' }}>Stay Updated</div>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '2.5rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>
          Latest <span style={{ color: '#c8a84b' }}>News</span>
        </h1>
      </div>

      {items.length === 0 ? (
        <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '3rem', textAlign: 'center', color: '#6b7280' }}>No announcements yet.</div>
      ) : (
        <>
          {/* Featured article */}
          {featured && (
            <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '16px', overflow: 'hidden', marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                <div style={{ height: '320px', position: 'relative', overflow: 'hidden' }}>
                  <img src={featured.imageUrl ?? FALLBACK_IMAGES[0]} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, #111118)' }} />
                </div>
                <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ color: '#c8a84b', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem' }}>
                    Featured · {new Date(featured.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h2 style={{ fontFamily: 'Oswald, sans-serif', color: '#fff', fontWeight: 700, fontSize: '1.5rem', textTransform: 'uppercase', lineHeight: 1.2, marginBottom: '1rem' }}>{featured.title}</h2>
                  <p style={{ color: '#9ca3af', lineHeight: 1.8, fontSize: '0.9rem' }}>{featured.body}</p>
                </div>
              </div>
            </div>
          )}

          {/* Rest of articles */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {rest.map((a: any, i: number) => (
              <div key={a.id} className="mpl-card" style={{ overflow: 'hidden' }}>
                <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                  <img src={a.imageUrl ?? FALLBACK_IMAGES[(i + 1) % FALLBACK_IMAGES.length]} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,17,24,0.8), transparent)' }} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ color: '#c8a84b', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                    {new Date(a.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.4, marginBottom: '0.5rem' }}>{a.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.6 }}>{a.body?.slice(0, 100)}{a.body?.length > 100 ? '…' : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
