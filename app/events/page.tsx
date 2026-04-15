import Link from 'next/link';

const API = 'http://localhost:3001';

const IMAGES = [
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
  'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
  'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
];

async function getData() {
  const [upcomingRes, archiveRes] = await Promise.all([
    fetch(`${API}/api/public/events/upcoming`, { next: { revalidate: 60 } }),
    fetch(`${API}/api/public/archive`, { next: { revalidate: 300 } }),
  ]);
  const upcoming = upcomingRes.ok ? await upcomingRes.json() : [];
  const archive = archiveRes.ok ? await archiveRes.json() : [];
  return { upcoming: Array.isArray(upcoming) ? upcoming : [], archive: Array.isArray(archive) ? archive : [] };
}

export default async function EventsPage() {
  const { upcoming, archive } = await getData();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ color: '#c8a84b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem', fontFamily: 'Oswald, sans-serif' }}>MPL Events</div>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '2.5rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>
          Tournaments & <span style={{ color: '#c8a84b' }}>Events</span>
        </h1>
        <p style={{ color: '#6b7280', marginTop: '0.5rem' }}>All MPL tournaments — past, present, and future.</p>
      </div>

      {/* ── Upcoming Events ── */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', margin: 0 }}>
            🗓 Upcoming Events
          </h2>
          <div style={{ flex: 1, height: '1px', background: '#1e1e2e' }} />
        </div>

        {upcoming.length === 0 ? (
          <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '2rem', textAlign: 'center', color: '#6b7280' }}>No upcoming events scheduled.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
            {upcoming.map((t: any, idx: number) => (
              <Link key={t.id} href={`/events/${t.id}`} style={{ textDecoration: 'none' }}>
                <div className="mpl-card" style={{ overflow: 'hidden' }}>
                  <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                    <img src={IMAGES[idx % IMAGES.length]} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.2) 60%)' }} />
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                      <span className="badge-upcoming">{t.sport?.name ?? 'Cricket'}</span>
                      <span style={{ background: '#c8a84b', color: '#000', padding: '3px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700 }}>Season {t.season}</span>
                    </div>
                    <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem' }}>
                      <h3 style={{ fontFamily: 'Oswald, sans-serif', color: '#fff', fontWeight: 700, fontSize: '1.2rem', textTransform: 'uppercase', marginBottom: '4px' }}>{t.name}</h3>
                      <p style={{ color: '#9ca3af', fontSize: '0.8rem' }}>{t.format}</p>
                    </div>
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ color: '#c8a84b', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Starts</div>
                        <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{new Date(t.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#6b7280', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ends</div>
                        <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>{new Date(t.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <span style={{ flex: 1, background: 'linear-gradient(135deg, #c8a84b, #a8882b)', color: '#000', fontWeight: 700, border: 'none', borderRadius: '6px', padding: '8px', cursor: 'pointer', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>
                        View Details →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── Past Events ── */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', margin: 0 }}>
            🏆 Past Events
          </h2>
          <div style={{ flex: 1, height: '1px', background: '#1e1e2e' }} />
          <Link href="/archive" style={{ color: '#c8a84b', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', flexShrink: 0 }}>Full Archive →</Link>
        </div>

        {archive.length === 0 ? (
          <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '2rem', textAlign: 'center', color: '#6b7280' }}>No past events yet.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {archive.map((t: any, idx: number) => (
              <Link key={t.id} href={`/events/${t.id}`} style={{ textDecoration: 'none' }}>
                <div className="mpl-card" style={{ overflow: 'hidden', display: 'grid', gridTemplateColumns: '280px 1fr' }}>
                  {/* Image */}
                  <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                    <img src={IMAGES[idx % IMAGES.length]} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent, rgba(17,17,24,0.3))' }} />
                    <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem' }}>
                      <span className="badge-completed">Completed</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                        <span style={{ color: '#c8a84b', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.sport?.name} · Season {t.season}</span>
                      </div>
                      <h3 style={{ fontFamily: 'Oswald, sans-serif', color: '#fff', fontWeight: 700, fontSize: '1.25rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t.name}</h3>
                      <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1rem' }}>
                        {new Date(t.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} – {new Date(t.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} · {t.format}
                      </p>

                      {/* Winner */}
                      <div style={{ display: 'flex', gap: '2rem' }}>
                        {t.winner && (
                          <div>
                            <div style={{ color: '#c8a84b', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>🏆 Champion</div>
                            <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{t.winner.name}</div>
                          </div>
                        )}
                        {t.runnerUp && (
                          <div>
                            <div style={{ color: '#6b7280', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>🥈 Runner-up</div>
                            <div style={{ color: '#9ca3af', fontWeight: 600, fontSize: '0.9rem' }}>{t.runnerUp.name}</div>
                          </div>
                        )}
                        <div>
                          <div style={{ color: '#6b7280', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Matches</div>
                          <div style={{ color: '#9ca3af', fontWeight: 600, fontSize: '0.9rem' }}>{t.finalPointsTable?.reduce((s: number, e: any) => s + e.played, 0) / 2 || 0}</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#c8a84b', fontSize: '0.8rem', fontWeight: 600 }}>View Highlights, Scorecard & Photos →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
