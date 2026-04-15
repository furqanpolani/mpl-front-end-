'use client';

import { mockApi } from '../lib/mock-api';

export default function StatsBar() {
  const archive = mockApi.getArchive();
  const items = [
    { label: 'Tournaments', value: archive.length + 1, icon: '🏆' },
    { label: 'Total Matches', value: 13 + archive.length * 4, icon: '🏏' },
    { label: 'Sports', value: 2, icon: '⚡' },
    { label: 'Season', value: 1, icon: '📅' },
  ];

  return (
    <div style={{ background: '#0d0d14', borderBottom: '1px solid #1e1e2e' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {items.map((item, i) => (
          <div key={i} style={{ padding: '1.5rem', textAlign: 'center', borderRight: i < 3 ? '1px solid #1e1e2e' : 'none' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{item.icon}</div>
            <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: '2rem', fontWeight: 900, color: '#c8a84b', lineHeight: 1 }}>{item.value}</div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
