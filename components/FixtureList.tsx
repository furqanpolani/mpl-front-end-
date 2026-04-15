'use client';

import Link from 'next/link';
import { mockApi } from '../lib/mock-api';

function FixtureCard({ f }: { f: any }) {
  return (
    <Link href={`/fixtures/${f.id}`} style={{ textDecoration: 'none' }}>
      <div className="mpl-card" style={{ padding: '1rem 1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span className={f.status === 'live' ? 'badge-live' : f.status === 'upcoming' ? 'badge-upcoming' : 'badge-completed'}>{f.status}</span>
          <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>{new Date(f.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <span style={{ color: '#fff', fontWeight: 600 }}>{f.homeTeam?.name}</span>
          <div style={{ textAlign: 'center' }}>
            {f.homeScore ? <span style={{ color: '#c8a84b', fontWeight: 800 }}>{f.homeScore} – {f.awayScore}</span>
              : <span style={{ color: '#4b5563', fontWeight: 700 }}>vs</span>}
          </div>
          <span style={{ color: '#fff', fontWeight: 600 }}>{f.awayTeam?.name}</span>
        </div>
        {f.result && <p style={{ color: '#4ade80', fontSize: '0.8rem', marginTop: '6px', textAlign: 'center' }}>{f.result}</p>}
        <p style={{ color: '#4b5563', fontSize: '0.75rem', marginTop: '4px' }}>📍 {f.venue}</p>
      </div>
    </Link>
  );
}

export default function FixtureList({ tournamentId }: { tournamentId: string }) {
  const data = mockApi.getFixturesByTournament(tournamentId);
  const all = [...(data.live ?? []), ...(data.upcoming ?? []), ...(data.completed ?? [])];

  if (all.length === 0) return <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '2rem', textAlign: 'center', color: '#6b7280' }}>No matches scheduled.</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {(data.live ?? []).map((f: any) => <FixtureCard key={f.id} f={{ ...f, status: 'live' }} />)}
      {(data.upcoming ?? []).map((f: any) => <FixtureCard key={f.id} f={{ ...f, status: 'upcoming' }} />)}
      {(data.completed ?? []).map((f: any) => <FixtureCard key={f.id} f={{ ...f, status: 'completed' }} />)}
    </div>
  );
}
