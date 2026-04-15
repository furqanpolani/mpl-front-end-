'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = '';

export default function HeroSection() {
  const [headline, setHeadline] = useState<string | null>(null);
  const [liveFixtures, setLiveFixtures] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API}/api/public/hero`).then(r => r.json()).then(d => {
      setHeadline(d.headline);
      setLiveFixtures(d.liveFixtures ?? []);
    }).catch(() => {});
  }, []);

  return (
    <section className="hero-section" style={{
      position: 'relative',
      minHeight: '92vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: '#0a0a0f',
    }}>
      {/* Background — high quality cricket stadium */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1920&q=90')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        opacity: 0.35,
      }} />

      {/* Dark gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,10,15,0.96) 0%, rgba(10,10,15,0.7) 60%, rgba(10,10,15,0.85) 100%)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%', background: 'linear-gradient(to top, #0a0a0f, transparent)' }} />

      {/* Gold accent lines */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: 'linear-gradient(180deg, transparent 0%, #c8a84b 40%, #c8a84b 60%, transparent 100%)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #c8a84b, transparent 60%)' }} />

      {/* Radial glow */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(200,168,75,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="hero-content" style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 1.5rem 4rem', position: 'relative', width: '100%' }}>
        <div style={{ maxWidth: '680px' }}>
          {/* Season badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(200,168,75,0.1)', border: '1px solid rgba(200,168,75,0.35)', borderRadius: '4px', padding: '6px 16px', marginBottom: '1.5rem' }}>
            <span style={{ width: '8px', height: '8px', background: liveFixtures.length > 0 ? '#dc2626' : '#c8a84b', borderRadius: '50%', display: 'inline-block', boxShadow: liveFixtures.length > 0 ? '0 0 8px #dc2626' : '0 0 8px #c8a84b', animation: 'pulse-red 2s infinite' }} />
            <span style={{ color: '#c8a84b', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'Oswald, sans-serif' }}>
              {liveFixtures.length > 0 ? '🔴 Live Match In Progress' : 'Summer Season 2025 — Active'}
            </span>
          </div>

          {/* Main heading */}
          <h1 className="hero-title" style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', lineHeight: 1.05, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
            <span style={{ color: '#fff', display: 'block' }}>BE A PART OF THE</span>
            <span style={{ background: 'linear-gradient(135deg, #c8a84b 0%, #e8c96b 50%, #c8a84b 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'block' }}>
              WINNING SYSTEM
            </span>
          </h1>

          <p style={{ color: '#9ca3af', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '520px' }}>
            {headline ?? 'Memon Premier League — the premier multi-sport league. Follow live scores, track standings, and own your team.'}
          </p>

          <div className="hero-buttons" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <Link href="/sports/cricket" className="btn-gold">🏏 View Cricket</Link>
            <Link href="/marketplace" className="btn-outline">Own a Team</Link>
            <Link href="/events" style={{ color: '#9ca3af', fontSize: '0.875rem', fontWeight: 600, padding: '12px 0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Upcoming Events →
            </Link>
          </div>

          {/* Live match ticker */}
          {liveFixtures.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {liveFixtures.map((f: any) => (
                <Link key={f.id} href={`/fixtures/${f.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.4)', borderRadius: '8px', padding: '0.75rem 1.25rem', flexWrap: 'wrap' }}>
                    <span className="badge-live">Live</span>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{f.homeTeam?.name}</span>
                    <span style={{ color: '#c8a84b', fontWeight: 900, fontSize: '1rem' }}>{f.homeScore ?? '—'} v {f.awayScore ?? '—'}</span>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{f.awayTeam?.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', opacity: 0.4 }}>
        <div style={{ width: '1px', height: '32px', background: 'linear-gradient(to bottom, transparent, #c8a84b)' }} />
        <span style={{ color: '#c8a84b', fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Scroll</span>
      </div>
    </section>
  );
}
