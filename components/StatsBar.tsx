'use client';

import { useEffect, useState } from 'react';

const API = '';

export default function StatsBar() {
  const [stats, setStats] = useState({ matches: 0, teams: 0, players: 0, tournaments: 0 });

  useEffect(() => {
    // Derive stats from available public endpoints
    Promise.all([
      fetch(`${API}/api/public/archive`).then(r => r.json()).catch(() => []),
      fetch(`${API}/api/public/sports`).then(r => r.json()).catch(() => []),
    ]).then(([archive, sports]) => {
      const totalMatches = Array.isArray(archive) ? archive.reduce((sum: number, t: any) => sum + (t.finalPointsTable?.length ?? 0), 0) : 0;
      const totalTournaments = Array.isArray(archive) ? archive.length : 0;
      setStats({ matches: totalMatches, teams: 0, players: 0, tournaments: totalTournaments });
    });
  }, []);

  const items = [
    { label: 'Tournaments', value: stats.tournaments, icon: '🏆' },
    { label: 'Total Matches', value: stats.matches, icon: '🏏' },
    { label: 'Sports', value: 2, icon: '⚡' },
    { label: 'Season', value: 1, icon: '📅' },
  ];

  return (
    <div style={{ background: '#0d0d14', borderBottom: '1px solid #1e1e2e' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {items.map((item, i) => (
          <div key={i} style={{ padding: '1.5rem', textAlign: 'center', borderRight: i < 3 ? '1px solid #1e1e2e' : 'none' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{item.icon}</div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: '#c8a84b', lineHeight: 1 }}>{item.value}</div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
