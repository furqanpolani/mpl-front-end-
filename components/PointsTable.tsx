'use client';

import { mockApi } from '../lib/mock-api';

export default function PointsTable({ tournamentId }: { tournamentId: string }) {
  const entries = mockApi.getPointsTable(tournamentId);

  if (entries.length === 0) return <p style={{ color: '#6b7280', padding: '1rem 0' }}>No standings yet.</p>;

  return (
    <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #1e1e2e', overflow: 'hidden' }}>
      <table className="mpl-table">
        <thead>
          <tr>{['#', 'Team', 'P', 'W', 'L', 'T', 'NR', 'Pts', 'NRR'].map(h => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {entries.map((e: any, i: number) => (
            <tr key={e.teamId}>
              <td style={{ color: i < 2 ? '#c8a84b' : '#6b7280', fontWeight: 700 }}>{i + 1}</td>
              <td style={{ color: '#fff', fontWeight: 600 }}>{e.teamName}</td>
              <td>{e.played}</td>
              <td style={{ color: '#4ade80' }}>{e.won}</td>
              <td style={{ color: '#f87171' }}>{e.lost}</td>
              <td>{e.tied}</td>
              <td>{e.noResult}</td>
              <td style={{ color: '#c8a84b', fontWeight: 700 }}>{e.points}</td>
              <td style={{ color: Number(e.nrr) >= 0 ? '#4ade80' : '#f87171' }}>{Number(e.nrr).toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
