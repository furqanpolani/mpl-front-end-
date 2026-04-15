'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = '';

export default function LatestNews() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API}/api/public/announcements`).then(r => r.json()).then(d => setNews(Array.isArray(d) ? d.slice(0, 4) : [])).catch(() => {});
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 className="section-title" style={{ marginBottom: 0 }}>Latest News</h2>
        <Link href="/announcements" style={{ color: '#c8a84b', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>View all →</Link>
      </div>

      {news.length === 0 ? (
        <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '2rem', textAlign: 'center', color: '#6b7280' }}>
          No announcements yet
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {news.map((a: any) => (
            <div key={a.id} className="mpl-card" style={{ padding: '1rem 1.25rem' }}>
              {a.imageUrl && <img src={a.imageUrl} alt={a.title} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.75rem' }} />}
              <h3 style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>{a.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '0.85rem', lineHeight: 1.5 }}>{a.body?.slice(0, 100)}{a.body?.length > 100 ? '…' : ''}</p>
              <p style={{ color: '#4b5563', fontSize: '0.75rem', marginTop: '6px' }}>{new Date(a.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
