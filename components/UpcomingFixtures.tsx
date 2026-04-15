'use client';

import Link from 'next/link';
import { mockApi } from '../lib/mock-api';

export default function UpcomingFixtures() {
  const hero = mockApi.getHero();
  const fixtures = [
    ...(hero.liveFixtures ?? []).map((f: any) => ({ ...f, status: 'live' })),
    ...(hero.upcomingFixtures ?? []).map((f: any) => ({ ...f, status: 'upcoming' })),
  ];

  return (
    <div>
      <h2 className="section-title">Upcoming Fixtures</h2>
      {fixtures.length === 0 ? (
        <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '2rem', textAlign: 'center', color: '#6b7280' }}>No fixtures scheduled yet</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {fixtures.slice(0, 5).map((f: any) => (
            <Link key={f.id} href={`/fixtures/${f.id}`} style={{ textDecoration: 'none' }}>
              <div className="mpl-card" style={{ padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span className={f.status === 'live' ? 'badge-live' : 'badge-upcoming'}>{f.status}</span>
                  {f.scheduledAt && <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>{new Date(f.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{f.homeTeam?.name}</span>
                  <span style={{ color: '#c8a84b', fontWeight: 800, fontSize: '0.9rem', padding: '4px 12px', background: '#c8a84b15', borderRadius: '6px' }}>
                    {f.homeScore && f.awayScore ? `${f.homeScore} v ${f.awayScore}` : 'vs'}
                  </span>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{f.awayTeam?.name}</span>
                </div>
                {f.venue && <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '4px' }}>📍 {f.venue}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
