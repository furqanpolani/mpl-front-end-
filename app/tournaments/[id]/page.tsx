import Link from 'next/link';
import { mockApi } from '../../../lib/mock-api';
import FixtureList from '../../../components/FixtureList';
import PointsTable from '../../../components/PointsTable';

export default function TournamentPage({ params }: { params: { id: string } }) {
  const t = mockApi.getTournamentById(params.id);
  if (!t) return <div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Tournament not found.</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fff', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase' }}>{t.name}</h1>
              <span style={{ background: '#c8a84b22', color: '#c8a84b', border: '1px solid #c8a84b44', padding: '3px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>Season {t.season}</span>
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{t.sport?.name} · {t.format}</p>
            <p style={{ color: '#4b5563', fontSize: '0.85rem', marginTop: '4px' }}>
              {new Date(t.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} – {new Date(t.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <span className={t.status === 'active' ? 'badge-live' : t.status === 'upcoming' ? 'badge-upcoming' : 'badge-completed'} style={{ fontSize: '0.85rem', padding: '6px 16px' }}>{t.status}</span>
        </div>
      </div>

      <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <h2 className="section-title">Points Table</h2>
          <PointsTable tournamentId={params.id} />
        </div>
        <div>
          <h2 className="section-title">Fixtures</h2>
          <FixtureList tournamentId={params.id} />
        </div>
      </div>
    </div>
  );
}
