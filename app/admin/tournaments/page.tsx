'use client';

import { useEffect, useState } from 'react';

const API = '';

interface Sport { id: string; name: string; }
interface Tournament { id: string; name: string; season: number; status: string; sport?: { name: string }; format: string; startDate: string; endDate: string; }

const STATUS_OPTIONS = ['upcoming', 'active', 'completed'];

export default function AdminTournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [sports, setSports] = useState<Sport[]>([]);
  const [form, setForm] = useState({ name: '', format: '', season: '', startDate: '', endDate: '', sport: '' });
  const [editing, setEditing] = useState<string | null>(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const [tRes, sRes] = await Promise.all([
      fetch(`${API}/api/admin/tournaments`, { credentials: 'include' }),
      fetch(`${API}/api/public/sports`),
    ]);
    const t = await tRes.json(); const s = await sRes.json();
    setTournaments(Array.isArray(t) ? t : []);
    setSports(Array.isArray(s) ? s : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.name || !form.sport || !form.startDate || !form.endDate) { setMsg('Please fill all required fields.'); return; }
    const url = editing ? `${API}/api/admin/tournaments/${editing}` : `${API}/api/admin/tournaments`;
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ name: form.name, format: form.format, season: Number(form.season), startDate: form.startDate, endDate: form.endDate, sport: form.sport }) });
    if (res.ok) { setMsg(editing ? '✅ Updated.' : '✅ Created.'); setEditing(null); setForm({ name: '', format: '', season: '', startDate: '', endDate: '', sport: '' }); load(); }
    else { const e = await res.json(); setMsg('❌ ' + (e?.error?.message ?? 'Error')); }
  };

  const del = async (id: string) => {
    if (!confirm('Delete this tournament?')) return;
    const res = await fetch(`${API}/api/admin/tournaments/${id}`, { method: 'DELETE', credentials: 'include' });
    if (res.ok) { setMsg('✅ Deleted.'); load(); } else setMsg('❌ Cannot delete.');
  };

  const edit = (t: Tournament) => {
    setEditing(t.id);
    const sportId = sports.find(s => s.name === t.sport?.name)?.id ?? '';
    setForm({ name: t.name, format: t.format, season: String(t.season), startDate: t.startDate?.slice(0, 10) ?? '', endDate: t.endDate?.slice(0, 10) ?? '', sport: sportId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const statusColor: Record<string, string> = { active: '#2ecc71', upcoming: '#f39c12', completed: '#888' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ color: '#fff', fontFamily: 'Oswald, sans-serif', fontSize: '1.75rem', fontWeight: 700 }}>Tournaments</h1>
        <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>{tournaments.length} total</span>
      </div>

      {/* Form */}
      <div style={card}>
        <h3 style={{ color: '#c8a84b', margin: '0 0 1.25rem', fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {editing ? '✏️ Edit Tournament' : '➕ New Tournament'}
        </h3>
        <div className="admin-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={lbl}>Tournament Name *</label>
            <input placeholder="e.g. MPL T20 Championship" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={inp} />
          </div>
          <div>
            <label style={lbl}>Sport *</label>
            <select value={form.sport} onChange={e => setForm(p => ({ ...p, sport: e.target.value }))} style={inp}>
              <option value="">Select sport...</option>
              {sports.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Format</label>
            <input placeholder="e.g. Round Robin + Knockout" value={form.format} onChange={e => setForm(p => ({ ...p, format: e.target.value }))} style={inp} />
          </div>
          <div>
            <label style={lbl}>Season Number</label>
            <input type="number" placeholder="1" value={form.season} onChange={e => setForm(p => ({ ...p, season: e.target.value }))} style={inp} />
          </div>
          <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={lbl}>Start Date *</label>
              <input type="date" value={form.startDate} onChange={e => setForm(p => ({ ...p, startDate: e.target.value }))} style={inp} />
            </div>
            <div>
              <label style={lbl}>End Date *</label>
              <input type="date" value={form.endDate} onChange={e => setForm(p => ({ ...p, endDate: e.target.value }))} style={inp} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
          <button onClick={save} style={btnGold}>{editing ? 'Update Tournament' : 'Create Tournament'}</button>
          {editing && <button onClick={() => { setEditing(null); setForm({ name: '', format: '', season: '', startDate: '', endDate: '', sport: '' }); }} style={btnGray}>Cancel</button>}
        </div>
        {msg && <p style={{ color: msg.startsWith('✅') ? '#4ade80' : '#f87171', marginTop: '0.75rem', fontSize: '0.875rem' }}>{msg}</p>}
      </div>

      {/* Table */}
      {loading ? <p style={{ color: '#6b7280' }}>Loading...</p> : (
        <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0d0d14' }}>
                {['Tournament', 'Sport', 'Format', 'Season', 'Dates', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '10px 14px', color: '#6b7280', textAlign: 'left', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tournaments.length === 0 && (
                <tr><td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#4b5563' }}>No tournaments yet. Create one above.</td></tr>
              )}
              {tournaments.map(t => (
                <tr key={t.id} style={{ borderBottom: '1px solid #1e1e2e' }}>
                  <td style={{ padding: '12px 14px', color: '#fff', fontWeight: 600 }}>{t.name}</td>
                  <td style={{ padding: '12px 14px', color: '#9ca3af' }}>{t.sport?.name ?? '—'}</td>
                  <td style={{ padding: '12px 14px', color: '#9ca3af', fontSize: '0.85rem' }}>{t.format}</td>
                  <td style={{ padding: '12px 14px', color: '#c8a84b', fontWeight: 700 }}>{t.season}</td>
                  <td style={{ padding: '12px 14px', color: '#6b7280', fontSize: '0.8rem' }}>
                    {new Date(t.startDate).toLocaleDateString()} – {new Date(t.endDate).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ background: statusColor[t.status] + '22', color: statusColor[t.status], border: `1px solid ${statusColor[t.status]}44`, padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 600 }}>
                      {t.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <button onClick={() => edit(t)} style={smBtn}>Edit</button>
                    <button onClick={() => del(t.id)} style={{ ...smBtn, background: '#7f1d1d', color: '#f87171' }}>Delete</button>
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
const smBtn: React.CSSProperties = { background: '#1e1e2e', color: '#9ca3af', border: 'none', borderRadius: '4px', padding: '5px 12px', cursor: 'pointer', marginRight: '6px', fontSize: '0.8rem', fontWeight: 600 };
