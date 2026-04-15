'use client';

import { mockApi } from '../lib/mock-api';

export default function StatsTicker() {
  const archive = mockApi.getArchive();
  const totalMatches = archive.reduce((sum: number, t: any) => sum + (Math.round(t.finalPointsTable?.reduce((s: number, e: any) => s + e.played, 0) / 2) || 0), 0) + 6;

  const items = [
    { label: 'Total Matches', value: totalMatches, icon: '🏏' },
    { label: 'Players', value: 30, icon: '👤' },
    { label: 'Runs', value: '1,049', icon: '⚡' },
    { label: 'Wickets', value: 42, icon: '🎯' },
    { label: '100s', value: 0, icon: '💯' },
    { label: '50s', value: 4, icon: '🔥' },
    { label: 'Tournaments', value: archive.length + 1, icon: '🏆' },
    { label: 'Teams', value: 6, icon: '👥' },
  ];

  return (
    <div style={{ background: '#c8a84b', overflow: 'hidden' }}>
      <div style={{ display: 'flex' }}>
        <div className="ticker-label" style={{ background: '#000', padding: '0 1.5rem', display: 'flex', alignItems: 'center', flexShrink: 0, minWidth: '180px' }}>
          <span style={{ fontFamily: 'Oswald, sans-serif', color: '#c8a84b', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>🏏 Season Stats</span>
        </div>
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
