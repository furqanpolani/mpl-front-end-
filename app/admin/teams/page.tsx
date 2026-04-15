'use client';

import { useEffect, useState } from 'react';

const API = '';

interface Sport { id: string; name: string; }
interface Team { id: string; name: string; sport?: { name: string }; homeVenue: string; purchasePrice: number; isAvailableForPurchase: boolean; ownerId?: string; }
interface Player { id: string; name: string; role: string; jerseyNumber: number; }

const ROLES = ['batsman', 'bowler', 'all-rounder', 'wicket-keeper'];

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamForm, setTeamForm] = useState({ name: '', sportId: '', logoUrl: '', homeVenue: '', purchasePrice: '200000', isAvailableForPurchase: true });
  const [editingTeam, setEditingTeam] = useState<string | null>(null);
  const [playerForm, setPlayerForm] = useState({ name: '', role: 'batsman', jerseyNumber: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const loadTeams = async () => {
    setLoading(true);
    const [tRes, sRes] = await Promise.all([
      fetch(`${API}/api/admin/teams`, { credentials: 'include' }),
      fetch(`${API}/api/public/sports`),
    ]);
    const t = await tRes.json(); const s = await sRes.json();
    setTeams(Array.isArray(t) ? t : []);
    setSports(Array.isArray(s) ? s : []);
    setLoading(false);
  };

  const loadPlayers = (teamId: string) =>
    fetch(`${API}/api/admin/teams/${teamId}/players`, { credentials: 'include' })
      .then(r => r.json()).then(d => setPlayers(Array.isArray(d) ? d : [])).catch(() => {});

  useEffect(() => { loadTeams(); }, []);

  const saveTeam = async () => {
    if (!teamForm.name || !teamForm.sportId) { setMsg('Name and sport are required.'); return; }
    const url = editingTeam ? `${API}/api/admin/teams/${editingTeam}` : `${API}/api/admin/teams`;
    const method = editingTeam ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ ...teamForm, purchasePrice: Number(teamForm.purchasePrice) }) });
    if (res.ok) {
      setMsg(editingTeam ? '✅ Team updated.' : '✅ Team created.');
      setEditingTeam(null);
      setTeamForm({ name: '', sportId: '', logoUrl: '', homeVenue: '', purchasePrice: '200000', isAvailableForPurchase: true });
      loadTeams();
    } else { const e = await res.json(); setMsg('❌ ' + (e?.error?.message ?? 'Error')); }
  };

  const editTeam = (t: Team) => {
    setEditingTeam(t.id);
    const sportId = sports.find(s => s.name === t.sport?.name)?.id ?? '';
    setTeamForm({ name: t.name, sportId, logoUrl: '', homeVenue: t.homeVenue, purchasePrice: String(t.purchasePrice), isAvailableForPurchase: t.isAvailableForPurchase });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectTeam = (t: Team) => { setSelectedTeam(t); loadPlayers(t.id); };

  const addPlayer = async () => {
    if (!selectedTeam || !playerForm.name || !playerForm.jerseyNumber) { setMsg('Player name and jersey number required.'); return; }
    const res = await fetch(`${API}/api/admin/teams/${selectedTeam.id}/players`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ ...playerForm, jerseyNumber: Number(playerForm.jerseyNumber) }) });
    if (res.ok) { setMsg('✅ Player added.'); setPlayerForm({ name: '', role: 'batsman', jerseyNumber: '' }); loadPlayers(selectedTeam.id); }
    else { const e = await res.json(); setMsg('❌ ' + (e?.error?.message ?? 'Error')); }
  };

  const removePlayer = async (playerId: string) => {
    if (!selectedTeam || !confirm('Remove this player?')) return;
    await fetch(`${API}/api/admin/teams/${selectedTeam.id}/players/${playerId}`, { method: 'DELETE', credentials: 'include' });
    setMsg('✅ Player removed.'); loadPlayers(selectedTeam.id);
  };

  const roleColor: Record<string, string> = { batsman: '#3b82f6', bowler: '#ef4444', 'all-rounder': '#8b5cf6', 'wicket-keeper': '#f59e0b' };

  return (
    <div>
      <h1 style={{ color: '#fff', fontFamily: 'Oswald, sans-serif', fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem' }}>Teams & Players</h1>

      {msg && <p style={{ color: msg.startsWith('✅') ? '#4ade80' : '#f87171', marginBottom: '1rem', fontSize: '0.875rem' }}>{msg}</p>}

      {/* Team form */}
      <div style={card}>
        <h3 style={{ color: '#c8a84b', margin: '0 0 1.25rem', fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {editingTeam ? '✏️ Edit Team' : '➕ New Team'}
        </h3>
        <div className="admin-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <label style={lbl}>Team Name *</label>
            <input placeholder="e.g. Karachi Kings" value={teamForm.name} onChange={e => setTeamForm(p => ({ ...p, name: e.target.value }))} style={inp} />
          </div>
          <div>
            <label style={lbl}>Sport *</label>
            <select value={teamForm.sportId} onChange={e => setTeamForm(p => ({ ...p, sportId: e.target.value }))} style={inp}>
              <option value="">Select sport...</option>
              {sports.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Home Venue</label>
            <input placeholder="e.g. National Stadium, Karachi" value={teamForm.homeVenue} onChange={e => setTeamForm(p => ({ ...p, homeVenue: e.target.value }))} style={inp} />
          </div>
          <div>
            <label style={lbl}>Purchase Price (cents) — $2000 = 200000</label>
            <input type="number" placeholder="200000" value={teamForm.purchasePrice} onChange={e => setTeamForm(p => ({ ...p, purchasePrice: e.target.value }))} style={inp} />
          </div>
          <div>
            <label style={lbl}>Logo URL (optional)</label>
            <input placeholder="https://..." value={teamForm.logoUrl} onChange={e => setTeamForm(p => ({ ...p, logoUrl: e.target.value }))} style={inp} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '1.5rem' }}>
            <input type="checkbox" id="forSale" checked={teamForm.isAvailableForPurchase} onChange={e => setTeamForm(p => ({ ...p, isAvailableForPurchase: e.target.checked }))} style={{ accentColor: '#c8a84b', width: '16px', height: '16px' }} />
            <label htmlFor="forSale" style={{ color: '#9ca3af', fontSize: '0.875rem', cursor: 'pointer' }}>Available for purchase in marketplace</label>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          <button onClick={saveTeam} style={btnGold}>{editingTeam ? 'Update Team' : 'Create Team'}</button>
          {editingTeam && <button onClick={() => { setEditingTeam(null); setTeamForm({ name: '', sportId: '', logoUrl: '', homeVenue: '', purchasePrice: '200000', isAvailableForPurchase: true }); }} style={btnGray}>Cancel</button>}
        </div>
      </div>

      {/* Teams list + Players panel */}
      <div className="admin-teams-grid" style={{ display: 'grid', gridTemplateColumns: selectedTeam ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
        {/* Teams */}
        <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #1e1e2e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: '#fff', fontWeight: 700, margin: 0, fontSize: '0.95rem' }}>All Teams ({teams.length})</h3>
            <span style={{ color: '#6b7280', fontSize: '0.78rem' }}>Click a team to manage players</span>
          </div>
          {loading ? <p style={{ padding: '1.5rem', color: '#6b7280' }}>Loading...</p> : (
            <div>
              {teams.length === 0 && <p style={{ padding: '1.5rem', color: '#4b5563', textAlign: 'center' }}>No teams yet.</p>}
              {teams.map(t => (
                <div key={t.id} onClick={() => selectTeam(t)}
                  style={{ padding: '0.875rem 1.25rem', borderBottom: '1px solid #1e1e2e', cursor: 'pointer', background: selectedTeam?.id === t.id ? '#1e1e2e' : 'transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background 0.15s' }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{t.name}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.78rem', marginTop: '2px' }}>{t.sport?.name} · {t.homeVenue}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#c8a84b', fontSize: '0.8rem', fontWeight: 600 }}>${(t.purchasePrice / 100).toLocaleString()}</span>
                    <span style={{ background: t.isAvailableForPurchase ? '#14532d' : '#1a0a0a', color: t.isAvailableForPurchase ? '#4ade80' : '#f87171', padding: '2px 8px', borderRadius: '20px', fontSize: '0.68rem', fontWeight: 600 }}>
                      {t.isAvailableForPurchase ? 'For Sale' : 'Owned'}
                    </span>
                    <button onClick={e => { e.stopPropagation(); editTeam(t); }} style={{ ...smBtn, marginRight: 0 }}>Edit</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Players panel */}
        {selectedTeam && (
          <div style={card}>
            <h3 style={{ color: '#c8a84b', margin: '0 0 1rem', fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase' }}>
              👥 {selectedTeam.name} — Players
            </h3>

            {/* Add player form */}
            <div style={{ background: '#0a0a0f', borderRadius: '8px', padding: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={lbl}>Player Name</label>
                  <input placeholder="e.g. Babar Azam" value={playerForm.name} onChange={e => setPlayerForm(p => ({ ...p, name: e.target.value }))} style={inp} />
                </div>
                <div>
                  <label style={lbl}>Role</label>
                  <select value={playerForm.role} onChange={e => setPlayerForm(p => ({ ...p, role: e.target.value }))} style={inp}>
                    {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>Jersey #</label>
                  <input type="number" placeholder="10" value={playerForm.jerseyNumber} onChange={e => setPlayerForm(p => ({ ...p, jerseyNumber: e.target.value }))} style={inp} />
                </div>
              </div>
              <button onClick={addPlayer} style={btnGold}>Add Player</button>
            </div>

            {/* Players list */}
            {players.length === 0 ? (
              <p style={{ color: '#4b5563', textAlign: 'center', padding: '1rem' }}>No players yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {players.map(p => (
                  <div key={p.id} style={{ background: '#0a0a0f', borderRadius: '8px', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ background: '#1e1e2e', color: '#c8a84b', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>
                        {p.jerseyNumber}
                      </span>
                      <div>
                        <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem' }}>{p.name}</div>
                        <span style={{ background: roleColor[p.role] + '22', color: roleColor[p.role], padding: '1px 8px', borderRadius: '20px', fontSize: '0.68rem', fontWeight: 600 }}>{p.role}</span>
                      </div>
                    </div>
                    <button onClick={() => removePlayer(p.id)} style={{ background: '#1a0a0a', color: '#f87171', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer', fontSize: '0.78rem' }}>Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const card: React.CSSProperties = { background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' };
const lbl: React.CSSProperties = { display: 'block', color: '#9ca3af', fontSize: '0.78rem', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' };
const inp: React.CSSProperties = { width: '100%', background: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: '6px', padding: '9px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' };
const btnGold: React.CSSProperties = { background: 'linear-gradient(135deg, #c8a84b, #a8882b)', color: '#000', border: 'none', borderRadius: '6px', padding: '9px 20px', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem' };
const btnGray: React.CSSProperties = { background: '#1e1e2e', color: '#9ca3af', border: 'none', borderRadius: '6px', padding: '9px 20px', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' };
const smBtn: React.CSSProperties = { background: '#1e1e2e', color: '#9ca3af', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer', marginRight: '4px', fontSize: '0.78rem', fontWeight: 600 };
