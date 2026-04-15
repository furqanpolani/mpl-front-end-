'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = '';

export default function HomeContent() {
  const [fixtures, setFixtures] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [pointsTable, setPointsTable] = useState<any[]>([]);
  const [tournamentId, setTournamentId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API}/api/public/hero`).then(r => r.json()).then(d => {
      const all = [...(d.liveFixtures ?? []).map((f: any) => ({ ...f, status: 'live' })), ...(d.upcomingFixtures ?? []).map((f: any) => ({ ...f, status: 'upcoming' }))];
      setFixtures(all.slice(0, 5));
    }).catch(() => {});

    fetch(`${API}/api/public/announcements`).then(r => r.json()).then(d => setNews(Array.isArray(d) ? d.slice(0, 3) : [])).catch(() => {});

    fetch(`${API}/api/public/sports`).then(r => r.json()).then(async (sports: any[]) => {
      const cricket = sports.find(s => s.slug === 'cricket');
      if (!cricket) return;
      const res = await fetch(`${API}/api/public/tournaments?sport=${cricket.id}`);
      const tournaments = await res.json();
      if (tournaments.length > 0) {
        const tid = tournaments[0].id;
        setTournamentId(tid);
        const ptRes = await fetch(`${API}/api/public/tournaments/${tid}/points-table`);
        const pt = await ptRes.json();
        setPointsTable(Array.isArray(pt) ? pt : []);
      }
    }).catch(() => {});
  }, []);

  return (
    <div style={{ background: '#0a0a0f' }}>
      {/* About section */}
      <section style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid #1e1e2e' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1600&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.06 }} />
        <div className="about-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem', position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#c8a84b', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem', fontFamily: 'Oswald, sans-serif' }}>Join Our Team</div>
            <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1.25rem' }}>
              BE A PART OF THE<br /><span style={{ color: '#c8a84b' }}>WINNING SYSTEM</span>
            </h2>
            <p style={{ color: '#9ca3af', lineHeight: 1.9, marginBottom: '1.25rem', fontSize: '0.95rem' }}>
              Memon Premier League is providing premier level cricket and is determined to build diverse communities, promote, encourage, foster and cultivate interest in the sport of cricket at all levels.
            </p>
            <p style={{ color: '#6b7280', lineHeight: 1.9, marginBottom: '1.75rem', fontSize: '0.875rem' }}>
              Whether you are a professional pursuing growth or an enthusiastic contributor, our winning system offers an ideal platform for you.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/marketplace" className="btn-gold">Join Now</Link>
              <Link href="/about" className="btn-outline">Learn More</Link>
            </div>
          </div>
          <div>
            <div style={{ background: 'linear-gradient(135deg, #111118, #16161f)', border: '1px solid #1e1e2e', borderRadius: '16px', padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(200,168,75,0.12), transparent)', borderRadius: '50%', transform: 'translate(30%, -30%)' }} />
              <div style={{ color: '#c8a84b', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.75rem', fontFamily: 'Oswald, sans-serif' }}>Summer Season 2025</div>
              <div style={{ fontFamily: 'Oswald, sans-serif', color: '#fff', fontSize: '1.35rem', fontWeight: 600, marginBottom: '0.5rem' }}>MPL T20 Championship</div>
              <div style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '1.25rem' }}>May to October 2025 · 6 Teams · Round Robin + Knockout</div>
              <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {[['6', 'Teams'], ['12', 'Fixtures'], ['30', 'Players'], ['1', 'Season']].map(([val, label]) => (
                  <div key={label} style={{ background: '#0a0a0f', borderRadius: '8px', padding: '0.875rem', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.6rem', fontWeight: 700, color: '#c8a84b', lineHeight: 1 }}>{val}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Points Table + Fixtures */}
      <section style={{ background: '#0d0d14', borderBottom: '1px solid #1e1e2e' }}>
        <div className="grid-sidebar-left" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 1.5rem', display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Points Table</h2>
              {tournamentId && <Link href={`/tournaments/${tournamentId}`} style={{ color: '#c8a84b', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Full Table →</Link>}
            </div>
            {pointsTable.length === 0 ? (
              <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '10px', padding: '2rem', textAlign: 'center', color: '#4b5563' }}>No standings yet</div>
            ) : (
              <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #1e1e2e', overflowX: 'auto' }}>
                <table className="mpl-table" style={{ minWidth: '400px' }}>
                  <thead>
                    <tr>{['#', 'Team', 'P', 'W', 'L', 'Pts', 'NRR'].map(h => <th key={h}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {pointsTable.map((e: any, i: number) => (
                      <tr key={e.teamId}>
                        <td style={{ color: i < 2 ? '#c8a84b' : '#6b7280', fontWeight: 700 }}>{i + 1}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '26px', height: '26px', background: `hsl(${i * 60}, 60%, 40%)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 700, color: '#fff', flexShrink: 0 }}>
                              {e.teamName?.slice(0, 2).toUpperCase()}
                            </div>
                            <span style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem' }}>{e.teamName}</span>
                          </div>
                        </td>
                        <td>{e.played}</td>
                        <td style={{ color: '#4ade80' }}>{e.won}</td>
                        <td style={{ color: '#f87171' }}>{e.lost}</td>
                        <td style={{ color: '#c8a84b', fontWeight: 700 }}>{e.points}</td>
                        <td style={{ color: Number(e.nrr) >= 0 ? '#4ade80' : '#f87171', fontSize: '0.78rem' }}>{Number(e.nrr).toFixed(3)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 className="section-title" style={{ marginBottom: 0 }}>Fixtures</h2>
              {tournamentId && <Link href={`/tournaments/${tournamentId}`} style={{ color: '#c8a84b', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>All →</Link>}
            </div>
            {fixtures.length === 0 ? (
              <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '10px', padding: '2rem', textAlign: 'center', color: '#4b5563' }}>No fixtures scheduled</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {fixtures.map((f: any) => (
                  <Link key={f.id} href={`/fixtures/${f.id}`} style={{ textDecoration: 'none' }}>
                    <div className="mpl-card" style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                        <span className={f.status === 'live' ? 'badge-live' : 'badge-upcoming'}>{f.status}</span>
                        {f.scheduledAt && <span style={{ color: '#4b5563', fontSize: '0.72rem' }}>{new Date(f.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                        <span style={{ color: '#e0e0e0', fontWeight: 600, fontSize: '0.82rem', flex: 1 }}>{f.homeTeam?.name}</span>
                        <span style={{ color: '#c8a84b', fontWeight: 800, fontSize: '0.82rem', background: '#c8a84b15', padding: '2px 8px', borderRadius: '4px', flexShrink: 0 }}>
                          {f.homeScore && f.awayScore ? `${f.homeScore} v ${f.awayScore}` : 'vs'}
                        </span>
                        <span style={{ color: '#e0e0e0', fontWeight: 600, fontSize: '0.82rem', flex: 1, textAlign: 'right' }}>{f.awayTeam?.name}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
          <h2 className="section-title" style={{ marginBottom: 0 }}>Latest News</h2>
          <Link href="/announcements" style={{ color: '#c8a84b', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em' }}>All News →</Link>
        </div>
        {news.length === 0 ? (
          <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '10px', padding: '3rem', textAlign: 'center', color: '#4b5563' }}>No news yet</div>
        ) : (
          <div className="news-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {news.map((a: any, i: number) => (
              <div key={a.id} className="mpl-card" style={{ overflow: 'hidden' }}>
                <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                  {a.imageUrl ? (
                    <img src={a.imageUrl} alt={a.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: `linear-gradient(135deg, hsl(${i * 40 + 200}, 40%, 12%), hsl(${i * 40 + 220}, 40%, 8%))`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '2.5rem' }}>🏏</span>
                    </div>
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,17,24,0.7), transparent)' }} />
                </div>
                <div style={{ padding: '1.25rem' }}>
                  <div style={{ color: '#c8a84b', fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                    {new Date(a.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '0.92rem', lineHeight: 1.4, marginBottom: '0.5rem' }}>{a.title}</h3>
                  <p style={{ color: '#6b7280', fontSize: '0.82rem', lineHeight: 1.6 }}>{a.body?.slice(0, 100)}{a.body?.length > 100 ? '…' : ''}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section style={{ background: '#0d0d14', borderTop: '1px solid #1e1e2e', borderBottom: '1px solid #1e1e2e', padding: '4rem 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=40')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.05 }} />
        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative' }}>
          <div style={{ color: '#c8a84b', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem', fontFamily: 'Oswald, sans-serif' }}>Team Ownership</div>
          <h2 style={{ fontFamily: 'Oswald, sans-serif', fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 700, color: '#fff', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: '1rem' }}>
            OWN A TEAM.<br /><span style={{ color: '#c8a84b' }}>BE THE BOSS.</span>
          </h2>
          <p style={{ color: '#9ca3af', marginBottom: '2rem', lineHeight: 1.7, fontSize: '0.95rem' }}>
            Purchase one of our 6 franchise teams for just $2,000 and become an official MPL team owner.
          </p>
          <Link href="/marketplace" className="btn-gold" style={{ fontSize: '1rem', padding: '14px 36px' }}>
            View Available Teams
          </Link>
        </div>
      </section>
    </div>
  );
}
