import Link from 'next/link';

const API = 'http://localhost:3001';

const CRICKET_IMAGES = [
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
  'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
  'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80',
];

async function getArchive() {
  const res = await fetch(`${API}/api/public/archive`, { next: { revalidate: 300 } });
  if (!res.ok) return [];
  return res.json();
}

export default async function ArchivePage() {
  const tournaments = await getArchive();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ color: '#c8a84b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem', fontFamily: 'Oswald, sans-serif' }}>History</div>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '2.5rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>
          Tournament <span style={{ color: '#c8a84b' }}>Archive</span>
        </h1>
        <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>Complete history of all MPL tournaments and results.</p>
      </div>

      {tournaments.length === 0 ? (
        <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '3rem', textAlign: 'center', color: '#6b7280' }}>No archived tournaments yet.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {tournaments.map((t: any, idx: number) => (
            <div key={t.id} style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '16px', overflow: 'hidden' }}>
              {/* Banner image */}
              <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                <img src={CRICKET_IMAGES[idx % CRICKET_IMAGES.length]} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,15,0.95) 40%, rgba(10,10,15,0.4))' }} />
                <div style={{ position: 'absolute', inset: 0, padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span className="badge-completed">Completed</span>
                    <span style={{ color: '#c8a84b', fontSize: '0.8rem', fontWeight: 600 }}>{t.sport?.name} · Season {t.season}</span>
                  </div>
                  <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.75rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>{t.name}</h2>
                  <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                    {new Date(t.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} – {new Date(t.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} · {t.format}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem 2rem' }}>
                <div className="archive-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr', gap: '2rem', alignItems: 'start' }}>
                  {/* Winner & Runner-up */}
                  <div>
                    {t.winner && (
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ color: '#c8a84b', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>🏆 Champion</div>
                        <div style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{t.winner.name}</div>
                      </div>
                    )}
                    {t.runnerUp && (
                      <div>
                        <div style={{ color: '#6b7280', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>🥈 Runner-up</div>
                        <div style={{ color: '#9ca3af', fontWeight: 600 }}>{t.runnerUp.name}</div>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="archive-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    {[
                      ['Teams', t.finalPointsTable?.length ?? 0],
                      ['Matches', Math.round(t.finalPointsTable?.reduce((s: number, e: any) => s + e.played, 0) / 2) || 0],
                    ].map(([label, val]) => (
                      <div key={label as string} style={{ background: '#0a0a0f', borderRadius: '8px', padding: '0.75rem', textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#c8a84b', lineHeight: 1 }}>{val}</div>
                        <div style={{ color: '#6b7280', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '2px' }}>{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Points table mini */}
                  {t.finalPointsTable?.length > 0 && (
                    <div>
                      <div style={{ color: '#6b7280', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Final Standings</div>
                      <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #1e1e2e' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                          <thead>
                            <tr style={{ background: '#0d0d14' }}>
                              {['#', 'Team', 'P', 'W', 'Pts'].map(h => <th key={h} style={{ padding: '6px 10px', color: '#6b7280', textAlign: 'left', fontWeight: 600, fontSize: '0.7rem', textTransform: 'uppercase' }}>{h}</th>)}
                            </tr>
                          </thead>
                          <tbody>
                            {t.finalPointsTable.slice(0, 4).map((e: any, i: number) => (
                              <tr key={e.teamId} style={{ borderBottom: '1px solid #0f0f18' }}>
                                <td style={{ padding: '6px 10px', color: i === 0 ? '#c8a84b' : '#6b7280', fontWeight: 700 }}>{i + 1}</td>
                                <td style={{ padding: '6px 10px', color: '#e0e0e0', fontWeight: 600 }}>{e.teamName}</td>
                                <td style={{ padding: '6px 10px', color: '#6b7280' }}>{e.played}</td>
                                <td style={{ padding: '6px 10px', color: '#4ade80' }}>{e.won}</td>
                                <td style={{ padding: '6px 10px', color: '#c8a84b', fontWeight: 700 }}>{e.points}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
                  <Link href={`/tournaments/${t.id}`} className="btn-gold" style={{ fontSize: '0.8rem', padding: '8px 20px' }}>View Full Details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
