'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const API = '';

const EXTRA_TYPES = ['none', 'wide', 'no-ball', 'bye', 'leg-bye'];

export default function LiveScoringPage() {
  const { id } = useParams<{ id: string }>();
  const [scorecard, setScorecard] = useState<any>(null);
  const [msg, setMsg] = useState('');
  const [ball, setBall] = useState({ inningsId: '', batsmanId: '', bowlerId: '', runs: 0, extras: 0, extraType: 'none', isWicket: false, wicketType: '', commentary: '' });

  const load = () => {
    fetch(`${API}/api/public/fixtures/${id}/scorecard`)
      .then(r => r.json()).then(setScorecard).catch(() => {});
  };

  useEffect(() => { load(); }, [id]);

  const activeInnings = scorecard?.innings?.find((i: any) => !i.isComplete);

  const recordBall = async () => {
    const res = await fetch(`${API}/api/admin/fixtures/${id}/ball`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
      body: JSON.stringify({ ...ball, runs: Number(ball.runs), extras: Number(ball.extras), isWicket: Boolean(ball.isWicket) }),
    });
    if (res.ok) { setMsg('Ball recorded.'); load(); setBall(p => ({ ...p, runs: 0, extras: 0, extraType: 'none', isWicket: false, wicketType: '', commentary: '' })); }
    else { const e = await res.json(); setMsg(e?.error?.message ?? e?.error?.code ?? 'Error'); }
  };

  const completeInnings = async () => {
    const res = await fetch(`${API}/api/admin/fixtures/${id}/innings/complete`, { method: 'POST', credentials: 'include' });
    if (res.ok) { setMsg('Innings completed.'); load(); }
    else { const e = await res.json(); setMsg(e?.error?.message ?? 'Error'); }
  };

  const completeMatch = async () => {
    const result = prompt('Enter match result (e.g. "Home Team won by 5 wickets"):');
    const homeScore = prompt('Home score (e.g. 145/6 (20)):');
    const awayScore = prompt('Away score:');
    if (!result || !homeScore || !awayScore) return;
    const res = await fetch(`${API}/api/admin/fixtures/${id}/complete`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
      body: JSON.stringify({ result, homeScore, awayScore }),
    });
    if (res.ok) { setMsg('Match completed.'); load(); }
    else { const e = await res.json(); setMsg(e?.error?.message ?? 'Error'); }
  };

  if (!scorecard) return <p style={{ color: '#aaa' }}>Loading...</p>;

  const { fixture, innings } = scorecard;

  if (fixture.status !== 'live') {
    return <div style={{ color: '#aaa', padding: '1rem' }}>This fixture is not live. Status: {fixture.status}</div>;
  }

  return (
    <div style={{ maxWidth: '700px' }}>
      <h1 style={{ color: '#e94560' }}>Live Scoring</h1>
      <h2 style={{ color: '#fff' }}>{fixture.homeTeam.name} vs {fixture.awayTeam.name}</h2>

      {innings.map((inn: any) => (
        <div key={inn.id} style={{ background: '#16213e', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
          <h3 style={{ color: inn.isComplete ? '#888' : '#e94560', margin: '0 0 4px' }}>
            Innings {inn.inningsNumber}: {inn.battingTeam.name} {inn.isComplete ? '(complete)' : '(batting)'}
          </h3>
          <p style={{ color: '#fff', fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>
            {inn.runs}/{inn.wickets} ({inn.overs} ov)
          </p>
        </div>
      ))}

      {activeInnings && (
        <div style={{ background: '#16213e', borderRadius: '8px', padding: '1.25rem', marginBottom: '1rem' }}>
          <h3 style={{ color: '#fff', margin: '0 0 1rem' }}>Record Ball</h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <input placeholder="Innings ID" value={ball.inningsId || activeInnings.id} onChange={e => setBall(p => ({ ...p, inningsId: e.target.value }))} style={inp} />
            <input placeholder="Batsman ID" value={ball.batsmanId} onChange={e => setBall(p => ({ ...p, batsmanId: e.target.value }))} style={inp} />
            <input placeholder="Bowler ID" value={ball.bowlerId} onChange={e => setBall(p => ({ ...p, bowlerId: e.target.value }))} style={inp} />
            <input type="number" placeholder="Runs" min={0} value={ball.runs} onChange={e => setBall(p => ({ ...p, runs: Number(e.target.value) }))} style={inp} />
            <input type="number" placeholder="Extras" min={0} value={ball.extras} onChange={e => setBall(p => ({ ...p, extras: Number(e.target.value) }))} style={inp} />
            <select value={ball.extraType} onChange={e => setBall(p => ({ ...p, extraType: e.target.value }))} style={inp}>
              {EXTRA_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <label style={{ color: '#aaa', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <input type="checkbox" checked={ball.isWicket} onChange={e => setBall(p => ({ ...p, isWicket: e.target.checked }))} />
            Wicket
          </label>
          {ball.isWicket && <input placeholder="Wicket type (e.g. bowled, caught)" value={ball.wicketType} onChange={e => setBall(p => ({ ...p, wicketType: e.target.value }))} style={{ ...inp, width: '100%', marginBottom: '0.5rem' }} />}
          <input placeholder="Commentary" value={ball.commentary} onChange={e => setBall(p => ({ ...p, commentary: e.target.value }))} style={{ ...inp, width: '100%', marginBottom: '0.75rem' }} />

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={() => { setBall(p => ({ ...p, inningsId: activeInnings.id })); recordBall(); }} style={btn}>Record Ball</button>
            <button onClick={completeInnings} style={{ ...btn, background: '#f39c12' }}>Complete Innings</button>
            <button onClick={completeMatch} style={{ ...btn, background: '#27ae60' }}>Complete Match</button>
          </div>
        </div>
      )}

      {msg && <p style={{ color: '#2ecc71' }}>{msg}</p>}
    </div>
  );
}

const inp: React.CSSProperties = { background: '#0f0f1a', border: '1px solid #2a3a5a', borderRadius: '6px', padding: '8px 10px', color: '#fff', fontSize: '0.9rem' };
const btn: React.CSSProperties = { background: '#e94560', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', fontWeight: 600 };
