'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = '';

interface Tournament { id: string; name: string; format: string; status: string; season: number; startDate: string; endDate: string; teams?: { id: string; name: string }[]; }

export default function TournamentBrowser({ sportId }: { sportId: string }) {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/api/public/tournaments?sport=${sportId}`)
      .then(r => r.json()).then(d => { setTournaments(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
  }, [sportId]);

  if (loading) return <div style={{ color: '#6b7280', padding: '2rem', textAlign: 'center' }}>Loading tournaments...</div>;
  if (tournaments.length === 0) return (
    <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
      No active tournaments at the moment.
    </div>
  );

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {tournaments.map(t => (
        <Link key={t.id} href={`/tournaments/${t.id}`} style={{ textDecoration: 'none' }}>
          <div className="mpl-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>{t.name}</h3>
                  <span style={{ background: '#c8a84b22', color: '#c8a84b', border: '1px solid #c8a84b44', padding: '2px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>Season {t.season}</span>
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Format: {t.format}</p>
                <p style={{ color: '#4b5563', fontSize: '0.8rem', marginTop: '4px' }}>
                  {new Date(t.startDate).toLocaleDateString()} – {new Date(t.endDate).toLocaleDateString()}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className={t.status === 'active' ? 'badge-live' : t.status === 'upcoming' ? 'badge-upcoming' : 'badge-completed'}>{t.status}</span>
                <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '8px' }}>{t.teams?.length ?? 0} teams</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
