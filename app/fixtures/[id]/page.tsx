import Link from 'next/link';
import { mockApi } from '../../../lib/mock-api';

export default function FixturePage({ params }: { params: { id: string } }) {
  const data = mockApi.getScorecard(params.id);
  if (!data) return <div style={{ padding: '4rem', textAlign: 'center', color: '#6b7280' }}>Fixture not found.</div>;

  const { fixture, innings } = data;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Match header */}
      <div style={{ background: 'linear-gradient(135deg, #111118, #16161f)', border: '1px solid #1e1e2e', borderRadius: '16px', padding: '2rem', marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=40')`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.05 }} />
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span className={fixture.status === 'live' ? 'badge-live' : fixture.status === 'upcoming' ? 'badge-upcoming' : 'badge-completed'} style={{ fontSize: '0.8rem', padding: '5px 14px' }}>{fixture.status}</span>
            <Link href="/sports/cricket" style={{ color: '#6b7280', fontSize: '0.8rem', textDecoration: 'none' }}>← Back to Cricket</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #c8a84b22, #c8a84b11)', border: '2px solid #c8a84b44', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: '#c8a84b', fontSize: '1rem' }}>
                {fixture.homeTeam?.name?.slice(0, 2).toUpperCase()}
              </div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#fff', marginBottom: '4px' }}>{fixture.homeTeam?.name}</div>
              {fixture.homeScore && <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.75rem', fontWeight: 700, color: '#c8a84b' }}>{fixture.homeScore}</div>}
            </div>
            <div style={{ textAlign: 'center', padding: '0 1rem' }}>
              <div style={{ fontFamily: 'Oswald, sans-serif', color: '#4b5563', fontSize: '1.5rem', fontWeight: 700 }}>VS</div>
              {fixture.result && <div style={{ color: '#4ade80', fontSize: '0.8rem', fontWeight: 600, marginTop: '0.5rem', maxWidth: '160px', textAlign: 'center' }}>{fixture.result}</div>}
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #1e40af22, #1e40af11)', border: '2px solid #1e40af44', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: '#60a5fa', fontSize: '1rem' }}>
                {fixture.awayTeam?.name?.slice(0, 2).toUpperCase()}
              </div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '1.1rem', color: '#fff', marginBottom: '4px' }}>{fixture.awayTeam?.name}</div>
              {fixture.awayScore && <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.75rem', fontWeight: 700, color: '#60a5fa' }}>{fixture.awayScore}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Innings */}
      {innings && innings.length > 0 ? innings.map((inn: any) => (
        <div key={inn.id} style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', marginBottom: '1.5rem', overflow: 'hidden' }}>
          <div style={{ background: '#0d0d14', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #1e1e2e' }}>
            <div>
              <span style={{ fontFamily: 'Oswald, sans-serif', color: '#c8a84b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Innings {inn.inningsNumber}</span>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', marginTop: '2px' }}>{inn.battingTeam?.name} batting</h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{inn.runs}/{inn.wickets}</div>
              <div style={{ color: '#6b7280', fontSize: '0.85rem' }}>({inn.overs} overs)</div>
            </div>
          </div>
          {inn.commentary && inn.commentary.length > 0 ? (
            <div style={{ padding: '1rem 1.5rem' }}>
              <h4 style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Ball by Ball</h4>
              {inn.commentary.slice(0, 15).map((b: any) => (
                <div key={b.id} style={{ display: 'flex', gap: '1rem', padding: '8px 0', borderBottom: '1px solid #0f0f18', alignItems: 'flex-start' }}>
                  <span style={{ color: '#c8a84b', fontSize: '0.8rem', fontWeight: 700, minWidth: '40px', flexShrink: 0 }}>{b.overNumber}.{b.ballNumber}</span>
                  <span style={{ color: b.isWicket ? '#f87171' : b.runs >= 4 ? '#4ade80' : '#9ca3af', fontSize: '0.875rem', flex: 1 }}>
                    {b.commentary || `${b.batsman?.name} — ${b.runs} run${b.runs !== 1 ? 's' : ''}${b.isWicket ? ' ⚡ WICKET' : ''}${b.extras > 0 ? ` +${b.extras} ${b.extraType}` : ''}`}
                  </span>
                  <span style={{ color: b.isWicket ? '#f87171' : b.runs >= 6 ? '#c8a84b' : b.runs >= 4 ? '#4ade80' : '#6b7280', fontWeight: 700, fontSize: '0.9rem', minWidth: '24px', textAlign: 'right' }}>
                    {b.isWicket ? 'W' : b.runs + b.extras}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ padding: '1.5rem', color: '#4b5563', fontSize: '0.875rem', textAlign: 'center' }}>
              {fixture.status === 'upcoming' ? '📅 Match has not started yet.' : 'No ball-by-ball data available.'}
            </div>
          )}
        </div>
      )) : (
        <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '3rem', textAlign: 'center', color: '#4b5563' }}>
          {fixture.status === 'upcoming' ? '📅 This match has not started yet.' : 'No scorecard data available.'}
        </div>
      )}
    </div>
  );
}
