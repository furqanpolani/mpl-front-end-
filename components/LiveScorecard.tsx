'use client';

import { useEffect, useRef, useState } from 'react';

const API = '';

interface BallEvent {
  id: string;
  overNumber: number;
  ballNumber: number;
  runs: number;
  extras: number;
  extraType: string;
  isWicket: boolean;
  wicketType: string | null;
  commentary: string;
  createdAt: string;
  batsman: { name: string };
  bowler: { name: string };
}

interface Innings {
  id: string;
  inningsNumber: number;
  battingTeam: { name: string };
  bowlingTeam: { name: string };
  runs: number;
  wickets: number;
  overs: number;
  isComplete: boolean;
  commentary: BallEvent[];
}

interface ScorecardData {
  fixture: { id: string; status: string; homeTeam: { name: string }; awayTeam: { name: string }; homeScore: string | null; awayScore: string | null; result: string | null };
  innings: Innings[];
  currentBowlerFigures: { bowlerName: string; oversBowled: number; runsConceded: number; wicketsTaken: number } | null;
}

export default function LiveScorecard({ fixtureId }: { fixtureId: string }) {
  const [data, setData] = useState<ScorecardData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState(false);
  const esRef = useRef<EventSource | null>(null);
  const retryDelay = useRef(1000);

  const connect = () => {
    if (esRef.current) esRef.current.close();

    const es = new EventSource(`${API}/api/live/fixture/${fixtureId}/stream`);
    esRef.current = es;

    es.onmessage = (e) => {
      try {
        const parsed = JSON.parse(e.data);
        setData(parsed);
        setLastUpdated(new Date());
        setError(false);
        retryDelay.current = 1000;
      } catch {}
    };

    es.onerror = () => {
      setError(true);
      es.close();
      // Exponential backoff reconnect
      setTimeout(() => connect(), Math.min(retryDelay.current, 30_000));
      retryDelay.current = Math.min(retryDelay.current * 2, 30_000);
    };
  };

  useEffect(() => {
    connect();
    return () => esRef.current?.close();
  }, [fixtureId]);

  if (!data) return <p style={{ color: '#aaa', padding: '1rem' }}>Connecting to live feed...</p>;

  const { fixture, innings, currentBowlerFigures } = data;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {error && lastUpdated && (
        <p style={{ color: '#e74c3c', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          ⚠ Connection lost. Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}

      <div style={card}>
        <h2 style={{ color: '#fff', margin: 0 }}>{fixture.homeTeam.name} vs {fixture.awayTeam.name}</h2>
        {fixture.homeScore && (
          <p style={{ color: '#e94560', fontWeight: 700, margin: '4px 0' }}>
            {fixture.homeScore} — {fixture.awayScore}
          </p>
        )}
        {fixture.result && <p style={{ color: '#2ecc71', margin: '4px 0' }}>{fixture.result}</p>}
      </div>

      {innings.map((inn) => (
        <div key={inn.id} style={{ ...card, marginTop: '1rem' }}>
          <h3 style={{ color: '#e94560', margin: '0 0 0.5rem' }}>
            Innings {inn.inningsNumber}: {inn.battingTeam.name} batting
          </h3>
          <p style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.25rem' }}>
            {inn.runs}/{inn.wickets} ({inn.overs} ov)
          </p>
          <p style={{ color: '#aaa', fontSize: '0.85rem', margin: 0 }}>
            Bowling: {inn.bowlingTeam.name}
            {!inn.isComplete && currentBowlerFigures && (
              <> · Current bowler: {currentBowlerFigures.bowlerName} — {currentBowlerFigures.runsConceded} runs, {currentBowlerFigures.wicketsTaken} wkts ({currentBowlerFigures.oversBowled} ov)</>
            )}
          </p>

          {inn.commentary.length > 0 && (
            <div style={{ marginTop: '0.75rem' }}>
              <h4 style={{ color: '#ccc', margin: '0 0 0.5rem', fontSize: '0.9rem' }}>Ball-by-ball</h4>
              {inn.commentary.slice(0, 10).map((b) => (
                <div key={b.id} style={commentaryRow}>
                  <span style={{ color: '#888', fontSize: '0.8rem', minWidth: '60px' }}>
                    {b.overNumber}.{b.ballNumber}
                  </span>
                  <span style={{ color: b.isWicket ? '#e74c3c' : '#fff', flex: 1 }}>
                    {b.commentary || `${b.batsman.name} — ${b.runs} run${b.runs !== 1 ? 's' : ''}${b.isWicket ? ' WICKET' : ''}${b.extras > 0 ? ` +${b.extras} ${b.extraType}` : ''}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const card: React.CSSProperties = { background: '#16213e', borderRadius: '8px', padding: '1rem' };
const commentaryRow: React.CSSProperties = { display: 'flex', gap: '0.75rem', padding: '4px 0', borderBottom: '1px solid #1a2a4a' };
