'use client';

import { useEffect, useState } from 'react';

const API = '';

export default function StatsTicker() {
  const [stats, setStats] = useState({ matches: 6, players: 30, runs: 1049, wickets: 42, hundreds: 0, fifties: 4, tournaments: 1 });

  useEffect(() => {
    fetch(`${API}/api/public/archive`).then(r => r.json()).then((archive: any[]) => {
      if (!Array.isArray(archive)) return;
      let totalMatches = 0, totalTournaments = archive.length;
      archive.forEach(t => { totalMatches += t.finalPointsTable?.reduce((s: number, e: any) => s + e.played, 0) / 2 || 0; });
      setStats(s => ({ ...s, matches: Math.max(6, totalMatches), tournaments: Math.max(1, totalTournaments) }));
    }).catch(() => {});
  }, []);

  const items = [
    { label: 'Total Matches', value: stats.matches, icon: '🏏' },
    { label: 'Players', value: stats.players, icon: '👤' },
    { label: 'Runs', value: stats.runs.toLocaleString(), icon: '⚡' },
    { label: 'Wickets', value: stats.wickets, icon: '🎯' },
    { label: '100s', value: stats.hundreds, icon: '💯' },
    { label: '50s', value: stats.fifties, icon: '🔥' },
    { label: 'Tournaments', value: stats.tournaments, icon: '🏆' },
    { label: 'Teams', value: 6, icon: '👥' },
  ];

  return (
    <div style={{ background: '#c8a84b', overflow: 'hidden' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
        {/* Label */}
        <div style={{ background: '#000', padding: '0 1.5rem', display: 'flex', alignItems: 'center', flexShrink: 0, minWidth: '180px' }}>
          <span style={{ fontFamily: 'Oswald, sans-serif', color: '#c8a84b', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            🏏 Season Stats
          </span>
        </div>
        {/* Scrolling stats */}
        <div className="ticker-wrap" style={{ flex: 1 }}>
          <div className="ticker-content">
            {[...items, ...items].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 2rem', borderRight: '1px solid rgba(0,0,0,0.15)', flexShrink: 0 }}>
                <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                <span style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: '#000', lineHeight: 1 }}>{item.value}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(0,0,0,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
