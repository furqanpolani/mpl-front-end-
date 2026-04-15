import TournamentBrowser from '../../../components/TournamentBrowser';
import { mockApi } from '../../../lib/mock-api';

export default function SportPage({ params }: { params: { slug: string } }) {
  const sport = mockApi.getSportBySlug(params.slug);
  if (!sport) return <div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Sport not found.</div>;

  const icon = sport.slug === 'cricket' ? '🏏' : sport.slug === 'paddle' ? '🏓' : '🏅';

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '2.5rem' }}>{icon}</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', fontFamily: 'Oswald, sans-serif', textTransform: 'uppercase' }}>
            {sport.name} <span style={{ color: '#c8a84b' }}>Tournaments</span>
          </h1>
        </div>
        <p style={{ color: '#6b7280' }}>Active tournaments in {sport.name}</p>
      </div>
      <TournamentBrowser sportId={sport.id} />
    </div>
  );
}
