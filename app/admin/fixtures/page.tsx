'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = '';

interface Team { id: string; name: string; }
interface Tournament { id: string; name: string; season: number; }
interface Fixture { id: string; homeTeam?: { name: string }; awayTeam?: { name: string }; tournament?: { name: string }; scheduledAt: string; venue: string; status: string; homeScore?: string; awayScore?: string; result?: string; }

export default function AdminFixturesPage() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [form, setForm] = useState({ tournamentId: '', homeTeamId: '', awayTeamId: '', scheduledAt: '', venue: '' });
  const [updateForm, setUpdateForm] = useState<{ id: string; status: string; homeScore: string; awayScore: string; result: string } | null>(null);
  const [filterTournament, setFilterTournament] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const url = filterTournament ? `${API}/api/admin/fixtures?tournament=${filterTournament}` : `${API}/api/admin/fixtures`;
    const [fRes, tRes, tmRes] = await Promise.all([
      fetch(url, { credentials: 'include' }),
      fetch(`${API}/api/admin/tournaments`, { credentials: 'include' }),
      fetch(`${API}/api/admin/teams`, { credentials: 'include' }),
    ]);
    const f = await fRes.json(); const t = await tRes.json(); const tm = await tmRes.json();
    setFixtures(Array.isArray(f) ? f : []);
    setTournaments(Array.isArray(t) ? t : []);
    setTeams(Array.isArray(tm) ? tm : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [filterTournament]);

  const create = async () => {
    if (!form.tournamentId || !form.homeTeamId || !form.awayTeamId || !form.scheduledAt) { setMsg('Please fill all required fields.'); return; }
    const res = await fetch(`${API}/api/admin/fixtures`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ ...form, scheduledAt: new Date(form.scheduledAt).toISOString() }) });
    if (res.ok) { setMsg('✅ Fixture created.'); setForm({ tournamentId: '', homeTeamId: '', awayTeamId: '', scheduledAt: '', venue: '' }); load(); }
    else { const e = await res.json(); setMsg('❌ ' + (e?.error?.message ?? 'Error')); }
  };

  const update = async () => {
    if (!updateForm) return;
    const body: any = { status: updateForm.status };
    if (updateForm.status === 'completed') { body.homeScore = updateForm.homeScore; body.awayScore = updateForm.awayScore; body.result = updateForm.result; }
    const res = await fetch(`${API}/api/admin/fixtures/${updateForm.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(body) });
    if (res.ok) { setMsg('✅ Updated.'); setUpdateForm(null); load(); }
    else { const e = await res.json(); setMsg('❌ ' + (e?.error?.message ?? e?.error?.code ?? 'Error')); }
  };

  const del = async (id: string, status: string) => {
    if (status === 'live' || status === 'completed') { setMsg('❌ Cannot delete a live or completed fixture.'); return; }
    if (!confirm('Delete this fixture?')) return;
    await fetch(`${API}/api/admin/fixtures/${id}`, { method: 'DELETE', credentials: 'include' });
    setMsg('✅ Deleted.'); load();
  };

  const statusColor: Record<string, string> = { live: '#dc2626', upcoming: '#c8a84b', completed: '#4ade80' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ color: '#fff', fontFamily: 'Oswald, sans-serif', fontSize: '1.75rem', fontWeight: 700 }}>Fixtures</h1>
        <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>{fixtures.length} fixtures</span>
      </div>

      {/* Create form */}
      <div style={card}>
        <h3 style={{ color: '#c8a84b', margin: '0 0 1.25rem', fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>➕ Schedule New Fixture</h3>
        <div className="admin-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={lbl}>Tournament *</label>
            <select value={form.tournamentId} onChange={e => setForm(p => ({ ...p, tournamentId: e.target.value }))} style={inp}>
              <option value="">Select tournament...</option>
              {tournaments.map(t => <option key={t.id} value={t.id}>{t.name} (S{t.season})</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Home Team *</label>
            <select value={form.homeTeamId} onChange={e => setForm(p => ({ ...p, homeTeamId: e.target.value }))} style={inp}>
              <option value="">Select home team...</option>
              {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Away Team *</label>
            <select value={form.awayTeamId} onChange={e => setForm(p => ({ ...p, awayTeamId: e.target.value }))} style={inp}>
              <option value="">Select away team...</option>
              {teams.filter(t => t.id !== form.homeTeamId).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Date & Time *</label>
            <input type="datetime-local" value={form.scheduledAt} onChange={e => setForm(p => ({ ...p, scheduledAt: e.target.value }))} style={inp} />
          </div>
          <div>
            <label style={lbl}>Venue</label>
            <input placeholder="e.g. National Stadium, Karachi" value={form.venue} onChange={e => setForm(p => ({ ...p, venue: e.target.value }))} style={inp} />
          </div>
        </div>
        <button onClick={create} style={{ ...btnGold, marginTop: '1rem' }}>Schedule Fixture</button>
        {msg && <p style={{ color: msg.startsWith('✅') ? '#4ade80' : '#f87171', marginTop: '0.75rem', fontSize: '0.875rem' }}>{msg}</p>}
      </div>

      {/* Update status form */}
      {updateForm && (
        <div style={{ ...card, borderColor: '#c8a84b44' }}>
          <h3 style={{ color: '#c8a84b', margin: '0 0 1rem', fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase' }}>✏️ Update Fixture Status</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={lbl}>Status</label>
              <select value={updateForm.status} onChange={e => setUpdateForm(p => p ? { ...p, status: e.target.value } : p)} style={inp}>
                {['upcoming', 'live', 'completed'].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            {updateForm.status === 'completed' && (
              <>
                <div>
                  <label style={lbl}>Home Score</label>
                  <input placeholder="e.g. 145/6 (20)" value={updateForm.homeScore} onChange={e => setUpdateForm(p => p ? { ...p, homeScore: e.target.value } : p)} style={inp} />
                </div>
                <div>
                  <label style={lbl}>Away Score</label>
                  <input placeholder="e.g. 138/8 (20)" value={updateForm.awayScore} onChange={e => setUpdateForm(p => p ? { ...p, awayScore: e.target.value } : p)} style={inp} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={lbl}>Result</label>
                  <input placeholder="e.g. Karachi Kings won by 7 runs" value={updateForm.result} onChange={e => setUpdateForm(p => p ? { ...p, result: e.target.value } : p)} style={inp} />
                </div>
              </>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            <button onClick={update} style={btnGold}>Save Changes</button>
            <button onClick={() => setUpdateForm(null)} style={btnGray}>Cancel</button>
          </div>
        </div>
      )}

      {/* Filter */}
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <label style={{ ...lbl, margin: 0 }}>Filter by tournament:</label>
        <select value={filterTournament} onChange={e => setFilterTournament(e.target.value)} style={{ ...inp, width: 'auto', minWidth: '220px' }}>
          <option value="">All tournaments</option>
          {tournaments.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
      </div>

      {/* Table */}
      {loading ? <p style={{ color: '#6b7280' }}>Loading...</p> : (
        <div style={{ ...card, padding: 0, overflow: 'hidden', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
            <thead>
              <tr style={{ background: '#0d0d14' }}>
                {['Match', 'Tournament', 'Date', 'Venue', 'Status', 'Score', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', color: '#6b7280', textAlign: 'left', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fixtures.length === 0 && (
                <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#4b5563' }}>No fixtures found.</td></tr>
              )}
              {fixtures.map(f => (
                <tr key={f.id} style={{ borderBottom: '1px solid #1e1e2e' }}>
                  <td style={{ padding: '12px 14px', color: '#fff', fontWeight: 600, fontSize: '0.875rem' }}>
                    {f.homeTeam?.name ?? '?'} vs {f.awayTeam?.name ?? '?'}
                  </td>
                  <td style={{ padding: '12px 14px', color: '#6b7280', fontSize: '0.8rem' }}>{f.tournament?.name ?? '—'}</td>
                  <td style={{ padding: '12px 14px', color: '#9ca3af', fontSize: '0.8rem' }}>{new Date(f.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td style={{ padding: '12px 14px', color: '#6b7280', fontSize: '0.8rem' }}>{f.venue}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ background: statusColor[f.status] + '22', color: statusColor[f.status], border: `1px solid ${statusColor[f.status]}44`, padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600 }}>
                      {f.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#c8a84b', fontSize: '0.8rem', fontWeight: 600 }}>
                    {f.homeScore ? `${f.homeScore} – ${f.awayScore}` : '—'}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <button onClick={() => setUpdateForm({ id: f.id, status: f.status, homeScore: f.homeScore ?? '', awayScore: f.awayScore ?? '', result: f.result ?? '' })} style={smBtn}>Update</button>
                    {f.status === 'live' && (
                      <Link href={`/admin/fixtures/${f.id}/score`} style={{ ...smBtn, background: '#7f1d1d', color: '#f87171', textDecoration: 'none', display: 'inline-block' }}>🔴 Score</Link>
                    )}
                    <button onClick={() => del(f.id, f.status)} style={{ ...smBtn, background: '#1a0a0a', color: '#f87171' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const card: React.CSSProperties = { background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' };
const lbl: React.CSSProperties = { display: 'block', color: '#9ca3af', fontSize: '0.78rem', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' };
const inp: React.CSSProperties = { width: '100%', background: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: '6px', padding: '9px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' };
const btnGold: React.CSSProperties = { background: 'linear-gradient(135deg, #c8a84b, #a8882b)', color: '#000', border: 'none', borderRadius: '6px', padding: '9px 20px', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem' };
const btnGray: React.CSSProperties = { background: '#1e1e2e', color: '#9ca3af', border: 'none', borderRadius: '6px', padding: '9px 20px', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' };
const smBtn: React.CSSProperties = { background: '#1e1e2e', color: '#9ca3af', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer', marginRight: '4px', fontSize: '0.78rem', fontWeight: 600 };
