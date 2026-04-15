'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

interface Sport { id: string; name: string; slug: string; }
interface Tournament { id: string; name: string; season: number; status: string; }

const API = '';

export default function Navbar() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [tournamentOpen, setTournamentOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileTournamentOpen, setMobileTournamentOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API}/api/public/sports`).then(r => r.json()).then(d => setSports(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (sports.length === 0) return;
    const cricket = sports.find(s => s.slug === 'cricket');
    if (!cricket) return;
    fetch(`${API}/api/public/tournaments?sport=${cricket.id}`)
      .then(r => r.json()).then(d => setTournaments(Array.isArray(d) ? d : [])).catch(() => {});
  }, [sports]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setTournamentOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeAll = () => { setMobileOpen(false); setTournamentOpen(false); setMobileTournamentOpen(false); };

  return (
    <header>
      {/* Top bar — social + contact */}
      <div style={{ background: '#c8a84b', padding: '5px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
            {[
              { href: 'https://facebook.com', d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', fill: true },
              { href: 'https://instagram.com', d: '', fill: false, isInsta: true },
              { href: 'https://youtube.com', d: 'M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z', fill: true },
              { href: 'https://twitter.com', d: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z', fill: true },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" rel="noreferrer"
                style={{ width: '22px', height: '22px', background: 'rgba(0,0,0,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000' }}>
                {s.isInsta ? (
                  <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                ) : (
                  <svg width="11" height="11" fill="currentColor" viewBox="0 0 24 24"><path d={s.d}/></svg>
                )}
              </a>
            ))}
          </div>
          <div className="top-bar-contact" style={{ display: 'flex', gap: '1.25rem' }}>
            <a href="tel:+18152953530" style={{ color: '#000', fontSize: '0.72rem', fontWeight: 600, textDecoration: 'none' }}>📞 +1 (815) 295-3530</a>
            <a href="mailto:info@mpl.com" style={{ color: '#000', fontSize: '0.72rem', fontWeight: 600, textDecoration: 'none' }}>✉ info@mpl.com</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav style={{ background: '#0d0d14', borderBottom: '1px solid #1e1e2e', position: 'sticky', top: 0, zIndex: 100 }} ref={dropRef}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', alignItems: 'center', height: '60px', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/" onClick={closeAll} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
            <div style={{ width: '38px', height: '38px', background: 'linear-gradient(135deg, #c8a84b, #a8882b)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: '#000', fontSize: '0.85rem' }}>MPL</div>
            <div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '0.95rem', color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>MEMON PREMIER</div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 400, fontSize: '0.6rem', color: '#c8a84b', letterSpacing: '0.15em' }}>LEAGUE</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0', flex: 1, justifyContent: 'center' }}>
            <NavLink href="/" onClick={closeAll}>Home</NavLink>

            {/* Tournaments dropdown */}
            <div style={{ position: 'relative' }}>
              <button onClick={() => setTournamentOpen(o => !o)}
                style={{ background: 'none', border: 'none', color: tournamentOpen ? '#c8a84b' : '#9ca3af', fontSize: '0.8rem', fontWeight: 600, padding: '8px 12px', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Tournaments <span style={{ fontSize: '0.55rem' }}>▼</span>
              </button>
              {tournamentOpen && (
                <div style={{ position: 'absolute', top: '100%', left: 0, background: '#111118', border: '1px solid #1e1e2e', borderRadius: '8px', minWidth: '200px', boxShadow: '0 8px 32px rgba(0,0,0,0.6)', zIndex: 200, overflow: 'hidden' }}>
                  <div style={{ padding: '0.5rem 0' }}>
                    <div style={{ color: '#c8a84b', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', padding: '4px 1rem 2px' }}>Active</div>
                    {tournaments.filter(t => t.status === 'active').map(t => (
                      <DropLink key={t.id} href={`/tournaments/${t.id}`} onClick={closeAll}>{t.name}</DropLink>
                    ))}
                    {tournaments.filter(t => t.status === 'active').length === 0 && <span style={{ color: '#4b5563', fontSize: '0.8rem', padding: '6px 1rem', display: 'block' }}>No active tournaments</span>}
                    <div style={{ height: '1px', background: '#1e1e2e', margin: '0.25rem 0' }} />
                    <div style={{ color: '#c8a84b', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', padding: '4px 1rem 2px' }}>Browse</div>
                    <DropLink href="/events" onClick={closeAll}>All Events</DropLink>
                    <DropLink href="/archive" onClick={closeAll}>Archive</DropLink>
                  </div>
                </div>
              )}
            </div>

            {sports.map(s => <NavLink key={s.id} href={`/sports/${s.slug}`} onClick={closeAll}>{s.name}</NavLink>)}
            <NavLink href="/announcements" onClick={closeAll}>News</NavLink>
            <NavLink href="/events" onClick={closeAll}>Events</NavLink>
            <NavLink href="/marketplace" onClick={closeAll}>Marketplace</NavLink>
            <NavLink href="/about" onClick={closeAll}>About</NavLink>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Hamburger */}
            <button className={`hamburger ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(o => !o)} aria-label="Menu" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'none' }}>
              <span style={{ display: 'block', width: '24px', height: '2px', background: '#fff', borderRadius: '2px', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ display: 'block', width: '24px', height: '2px', background: '#fff', borderRadius: '2px', transition: 'all 0.3s', opacity: mobileOpen ? 0 : 1, margin: '5px 0' }} />
              <span style={{ display: 'block', width: '24px', height: '2px', background: '#fff', borderRadius: '2px', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0d0d14', zIndex: 999, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {/* Close button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid #1e1e2e' }}>
            <Link href="/" onClick={closeAll} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #c8a84b, #a8882b)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: '#000', fontSize: '0.8rem' }}>MPL</div>
              <span style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: '#fff', fontSize: '1rem' }}>MEMON PREMIER LEAGUE</span>
            </Link>
            <button onClick={closeAll} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer', padding: '4px' }}>✕</button>
          </div>

          <nav style={{ padding: '1rem 1.5rem', flex: 1 }}>
            {[['/', 'Home'], ['/sports/cricket', '🏏 Cricket'], ['/sports/paddle', '🏓 Paddle'], ['/announcements', '📰 News'], ['/events', '📅 Events'], ['/archive', '🏆 Archive'], ['/marketplace', '💰 Marketplace'], ['/about', 'ℹ About']].map(([href, label]) => (
              <Link key={href} href={href} onClick={closeAll}
                style={{ display: 'block', color: '#fff', fontSize: '1.1rem', fontWeight: 600, padding: '1rem 0', borderBottom: '1px solid #1e1e2e', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Oswald, sans-serif' }}>
                {label}
              </Link>
            ))}

            {/* Tournaments sub-section */}
            <button onClick={() => setMobileTournamentOpen(o => !o)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', color: '#fff', fontSize: '1.1rem', fontWeight: 600, padding: '1rem 0', borderBottom: '1px solid #1e1e2e', background: 'none', border: 'none', borderBottom: '1px solid #1e1e2e', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Oswald, sans-serif' }}>
              🏆 Tournaments <span style={{ color: '#c8a84b' }}>{mobileTournamentOpen ? '▲' : '▼'}</span>
            </button>
            {mobileTournamentOpen && (
              <div style={{ paddingLeft: '1rem', borderBottom: '1px solid #1e1e2e' }}>
                {tournaments.map(t => (
                  <Link key={t.id} href={`/tournaments/${t.id}`} onClick={closeAll}
                    style={{ display: 'block', color: '#c8a84b', fontSize: '0.95rem', padding: '0.75rem 0', textDecoration: 'none', borderBottom: '1px solid #0f0f18' }}>
                    {t.name}
                  </Link>
                ))}
              </div>
            )}
          </nav>

          {/* Social + contact at bottom */}
          <div style={{ padding: '1.5rem', borderTop: '1px solid #1e1e2e' }}>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              {['Facebook', 'Instagram', 'YouTube', 'Twitter'].map(s => (
                <a key={s} href="#" style={{ width: '36px', height: '36px', background: '#1e1e2e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c8a84b', fontSize: '0.7rem', fontWeight: 700, textDecoration: 'none' }}>
                  {s[0]}
                </a>
              ))}
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>📞 +1 (815) 295-3530 · ✉ info@mpl.com</p>
          </div>
        </div>
      )}

      {/* Responsive handled via globals.css */}
    </header>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick}
      style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 600, padding: '8px 10px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}
      onMouseEnter={e => (e.currentTarget.style.color = '#c8a84b')}
      onMouseLeave={e => (e.currentTarget.style.color = '#9ca3af')}>
      {children}
    </Link>
  );
}

function DropLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link href={href} onClick={onClick}
      style={{ display: 'block', padding: '8px 1rem', color: '#9ca3af', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em' }}
      onMouseEnter={e => { e.currentTarget.style.background = '#1e1e2e'; e.currentTarget.style.color = '#c8a84b'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9ca3af'; }}>
      {children}
    </Link>
  );
}
