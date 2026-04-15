import Link from 'next/link';
import { mockApi } from '../../lib/mock-api';

const IMAGES = [
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
  'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&q=80',
  'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=800&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
];

export default function EventsPage() {
  const upcoming = mockApi.getUpcomingEvents();
  const archive = mockApi.getArchive();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <div style={{ color: '#c8a84b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem', fontFamily: 'Oswald, sans-serif' }}>MPL Events</div>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '2.5rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>
          Tournaments & <span style={{ color: '#c8a84b' }}>Events</span>
        </h1>
      </div>

      {/* Upcoming */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', margin: 0 }}>🗓 Upcoming Events</h2>
          <div style={{ flex: 1, height: '1px', background: '#1e1e2e' }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
          {upcoming.map((t: any, idx: number) => (
            <Link key={t.id} href={`/events/${t.id}`} style={{ textDecoration: 'none' }}>
              <div className="mpl-card" style={{ overflow: 'hidden' }}>
                <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                  <img src={IMAGES[idx % IMAGES.length]} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,15,0.9) 0%, rgba(10,10,15,0.2) 60%)' }} />
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}><span className="badge-upcoming">{t.sport?.name ?? 'Cricket'}</span></div>
                  <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(200,168,75,0.9)', borderRadius: '6px', padding: '4px 12px' }}>
                    <span style={{ color: '#000', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'Oswald, sans-serif' }}>Season {t.season}</span>
                  </div>
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{ fontFamily: 'Oswald, sans-serif', color: '#fff', fontWeight: 700, fontSize: '1.1rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t.name}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1rem' }}>{t.format}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ color: '#c8a84b', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Starts</div>
                      <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{new Date(t.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    </div>
                    <span style={{ color: '#c8a84b', fontSize: '0.8rem', fontWeight: 600 }}>View Details →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Past */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.5rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', margin: 0 }}>🏆 Past Events</h2>
          <div style={{ flex: 1, height: '1px', background: '#1e1e2e' }} />
          <Link href="/archive" style={{ color: '#c8a84b', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', flexShrink: 0 }}>Full Archive →</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {archive.map((t: any, idx: number) => (
            <Link key={t.id} href={`/events/${t.id}`} style={{ textDecoration: 'none' }}>
              <div className="mpl-card" style={{ overflow: 'hidden', display: 'grid', gridTemplateColumns: '280px 1fr' }}>
                <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                  <img src={IMAGES[idx % IMAGES.length]} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem' }}><span className="badge-completed">Completed</span></div>
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ color: '#c8a84b', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{t.sport?.name} · Season {t.season}</span>
                    <h3 style={{ fontFamily: 'Oswald, sans-serif', color: '#fff', fontWeight: 700, fontSize: '1.25rem', textTransform: 'uppercase', margin: '0.5rem 0' }}>{t.name}</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1rem' }}>{new Date(t.startDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} – {new Date(t.endDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                      {t.winner && <div><div style={{ color: '#c8a84b', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>🏆 Champion</div><div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{t.winner.name}</div></div>}
                      {t.runnerUp && <div><div style={{ color: '#6b7280', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>🥈 Runner-up</div><div style={{ color: '#9ca3af', fontWeight: 600, fontSize: '0.9rem' }}>{t.runnerUp.name}</div></div>}
                    </div>
                  </div>
                  <span style={{ color: '#c8a84b', fontSize: '0.8rem', fontWeight: 600, marginTop: '1rem' }}>View Highlights & Scorecard →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
