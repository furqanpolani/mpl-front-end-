import Link from 'next/link';
import PhotoGallery from '../../../components/PhotoGallery';
import { mockApi } from '../../../lib/mock-api';

const IMAGES = [
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=80',
  'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=80',
  'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=1200&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
];

export default function EventDetailPage({ params }: { params: { id: string } }) {
  // Try active tournament first, then archive
  let tournament = mockApi.getTournamentById(params.id);
  
  // If not found in tournamentData, check upcoming events
  if (!tournament) {
    const upcoming = mockApi.getUpcomingEvents();
    tournament = upcoming.find((t: any) => t.id === params.id) ?? null;
  }

  if (!tournament) return <div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Event not found.</div>;

  const isCompleted = tournament.status === 'completed';
  const fixtures = mockApi.getFixturesByTournament(params.id);
  const allFixtures = [...(fixtures.completed ?? []), ...(fixtures.live ?? []), ...(fixtures.upcoming ?? [])];
  const pointsTable = mockApi.getPointsTable(params.id);
  const demoVideoId = 'dQw4w9WgXcQ';
  const imgIdx = Math.abs((tournament.season ?? 0)) % IMAGES.length;

  return (
    <div>
      {/* Hero */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden' }}>
        <img src={IMAGES[imgIdx]} alt={tournament.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,1) 0%, rgba(10,10,15,0.6) 50%, rgba(10,10,15,0.2) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '1200px', padding: '0 1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <span className={isCompleted ? 'badge-completed' : tournament.status === 'active' ? 'badge-live' : 'badge-upcoming'}>{tournament.status}</span>
            <span style={{ color: '#c8a84b', fontSize: '0.8rem', fontWeight: 600 }}>{tournament.sport?.name} · Season {tournament.season}</span>
          </div>
          <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{tournament.name}</h1>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem' }}>
            {new Date(tournament.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} – {new Date(tournament.endDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {tournament.format}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        {/* Quick stats */}
        <div className="event-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '3rem' }}>
          {[{ label: 'Teams', value: tournament.teams?.length ?? 6, icon: '👥' }, { label: 'Matches', value: allFixtures.length || 7, icon: '🏏' }, { label: 'Format', value: tournament.format, icon: '📋' }, { label: 'Season', value: `S${tournament.season}`, icon: '🏆' }].map(s => (
            <div key={s.label} style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '10px', padding: '1.25rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{s.icon}</div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.25rem', fontWeight: 700, color: '#c8a84b', lineHeight: 1 }}>{s.value}</div>
              <div style={{ color: '#6b7280', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="event-layout" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2.5rem' }}>
          <div>
            {/* Video */}
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #c8a84b', display: 'inline-block' }}>🎬 Highlights</h2>
              <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#000', aspectRatio: '16/9', position: 'relative' }}>
                <iframe src={`https://www.youtube.com/embed/${demoVideoId}?rel=0&modestbranding=1`} title="Match Highlights" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', inset: 0 }} />
              </div>
            </section>

            {/* Gallery */}
            <section style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #c8a84b', display: 'inline-block' }}>📸 Photo Gallery</h2>
              <PhotoGallery />
            </section>

            {/* Fixtures */}
            {allFixtures.length > 0 && (
              <section>
                <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #c8a84b', display: 'inline-block' }}>🏏 Match Results</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {allFixtures.map((f: any) => (
                    <Link key={f.id} href={`/fixtures/${f.id}`} style={{ textDecoration: 'none' }}>
                      <div className="mpl-card" style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span className={f.status === 'completed' ? 'badge-completed' : f.status === 'live' ? 'badge-live' : 'badge-upcoming'}>{f.status}</span>
                          <span style={{ color: '#4b5563', fontSize: '0.75rem' }}>{new Date(f.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                          <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{f.homeTeam?.name}</span>
                          <span style={{ color: '#c8a84b', fontWeight: 800 }}>{f.homeScore ? `${f.homeScore} – ${f.awayScore}` : 'vs'}</span>
                          <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{f.awayTeam?.name}</span>
                        </div>
                        {f.result && <p style={{ color: '#4ade80', fontSize: '0.8rem', marginTop: '4px', textAlign: 'center' }}>{f.result}</p>}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {pointsTable.length > 0 && (
              <section style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #c8a84b', display: 'inline-block' }}>📊 Standings</h2>
                <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #1e1e2e' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead><tr style={{ background: '#0d0d14' }}>{['#', 'Team', 'P', 'W', 'Pts'].map(h => <th key={h} style={{ padding: '8px 10px', color: '#6b7280', textAlign: 'left', fontWeight: 600, fontSize: '0.7rem', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
                    <tbody>
                      {pointsTable.map((e: any, i: number) => (
                        <tr key={e.teamId} style={{ borderBottom: '1px solid #0f0f18' }}>
                          <td style={{ padding: '8px 10px', color: i === 0 ? '#c8a84b' : '#6b7280', fontWeight: 700 }}>{i + 1}</td>
                          <td style={{ padding: '8px 10px', color: '#e0e0e0', fontWeight: 600, fontSize: '0.8rem' }}>{e.teamName}</td>
                          <td style={{ padding: '8px 10px', color: '#6b7280' }}>{e.played}</td>
                          <td style={{ padding: '8px 10px', color: '#4ade80' }}>{e.won}</td>
                          <td style={{ padding: '8px 10px', color: '#c8a84b', fontWeight: 700 }}>{e.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {tournament.teams?.length > 0 && (
              <section>
                <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '2px solid #c8a84b', display: 'inline-block' }}>👥 Teams</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {tournament.teams.map((t: any, i: number) => (
                    <div key={t.id} style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '8px', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', background: `hsl(${i * 60}, 60%, 35%)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                        {t.name?.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                      </div>
                      <span style={{ color: '#e0e0e0', fontWeight: 600, fontSize: '0.875rem' }}>{t.name}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
