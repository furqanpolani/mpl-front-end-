'use client';

import Link from 'next/link';
import { mockApi } from '../lib/mock-api';

export default function TournamentBrowser({ sportId }: { sportId: string }) {
  const tournaments = mockApi.getTournamentsBySport(sportId);

  if (tournaments.length === 0) return (
    <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
      No active tournaments at the moment.
    </div>
  );

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {tournaments.map((t: any) => (
        <Link key={t.id} href={`/tournaments/${t.id}`} style={{ textDecoration: 'none' }}>
          <div className="mpl-card" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase' }}>{t.name}</h3>
                  <span style={{ background: '#c8a84b22', color: '#c8a84b', border: '1px solid #c8a84b44', padding: '2px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>Season {t.season}</span>
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Format: {t.format}</p>
                <p style={{ color: '#4b5563', fontSize: '0.8rem', marginTop: '4px' }}>
                  {new Date(t.startDate).toLocaleDateString()} – {new Date(t.endDate).toLocaleDateString()}
                </p>
              </div>
              <span className={t.status === 'active' ? 'badge-live' : t.status === 'upcoming' ? 'badge-upcoming' : 'badge-completed'}>{t.status}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
