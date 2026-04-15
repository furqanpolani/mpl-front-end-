'use client';

import { useEffect, useState } from 'react';

const API = '';

interface Announcement { id: string; title: string; status: string; publishedAt: string | null; createdAt: string; }

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [form, setForm] = useState({ title: '', body: '', imageUrl: '', status: 'draft' });
  const [editing, setEditing] = useState<string | null>(null);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch(`${API}/api/admin/announcements`, { credentials: 'include' })
      .then(r => r.json()).then(d => { setItems(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.title || !form.body) { setMsg('Title and body are required.'); return; }
    const url = editing ? `${API}/api/admin/announcements/${editing}` : `${API}/api/admin/announcements`;
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(form) });
    if (res.ok) { setMsg(editing ? '✅ Updated.' : '✅ Created.'); setEditing(null); setForm({ title: '', body: '', imageUrl: '', status: 'draft' }); load(); }
    else { const e = await res.json(); setMsg('❌ ' + (e?.error?.message ?? 'Error')); }
  };

  const del = async (id: string) => {
    if (!confirm('Delete this announcement?')) return;
    await fetch(`${API}/api/admin/announcements/${id}`, { method: 'DELETE', credentials: 'include' });
    setMsg('✅ Deleted.'); load();
  };

  const startEdit = async (id: string) => {
    const res = await fetch(`${API}/api/admin/announcements/${id}`, { credentials: 'include' });
    const a = await res.json();
    setEditing(id);
    setForm({ title: a.title, body: a.body, imageUrl: a.imageUrl ?? '', status: a.status });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickPublish = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    const res = await fetch(`${API}/api/admin/announcements/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ status: newStatus }) });
    if (res.ok) { setMsg(`✅ ${newStatus === 'published' ? 'Published' : 'Unpublished'}.`); load(); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ color: '#fff', fontFamily: 'Oswald, sans-serif', fontSize: '1.75rem', fontWeight: 700 }}>Announcements</h1>
        <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>{items.length} total · {items.filter(i => i.status === 'published').length} published</span>
      </div>

      {msg && <p style={{ color: msg.startsWith('✅') ? '#4ade80' : '#f87171', marginBottom: '1rem', fontSize: '0.875rem' }}>{msg}</p>}

      {/* Form */}
      <div style={card}>
        <h3 style={{ color: '#c8a84b', margin: '0 0 1.25rem', fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {editing ? '✏️ Edit Announcement' : '➕ New Announcement'}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <label style={lbl}>Title *</label>
            <input placeholder="e.g. MPL Season 1 is Live!" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} style={inp} />
          </div>
          <div>
            <label style={lbl}>Body *</label>
            <textarea placeholder="Write your announcement here..." value={form.body} onChange={e => setForm(p => ({ ...p, body: e.target.value }))} style={{ ...inp, minHeight: '120px', resize: 'vertical' }} />
          </div>
          <div>
            <label style={lbl}>Image URL (optional)</label>
            <input placeholder="https://images.unsplash.com/..." value={form.imageUrl} onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))} style={inp} />
            {form.imageUrl && <img src={form.imageUrl} alt="preview" style={{ marginTop: '0.5rem', height: '80px', borderRadius: '6px', objectFit: 'cover' }} onError={e => (e.currentTarget.style.display = 'none')} />}
          </div>
          <div>
            <label style={lbl}>Status</label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['draft', 'published'].map(s => (
                <label key={s} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: form.status === s ? '#c8a84b' : '#6b7280', fontWeight: form.status === s ? 700 : 400, fontSize: '0.875rem' }}>
                  <input type="radio" name="status" value={s} checked={form.status === s} onChange={() => setForm(p => ({ ...p, status: s }))} style={{ accentColor: '#c8a84b' }} />
                  {s === 'published' ? '🟢 Published' : '⚪ Draft'}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button onClick={save} style={btnGold}>{editing ? 'Update' : 'Create'}</button>
          {editing && <button onClick={() => { setEditing(null); setForm({ title: '', body: '', imageUrl: '', status: 'draft' }); }} style={btnGray}>Cancel</button>}
        </div>
      </div>

      {/* List */}
      {loading ? <p style={{ color: '#6b7280' }}>Loading...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.length === 0 && <div style={{ ...card, textAlign: 'center', color: '#4b5563' }}>No announcements yet.</div>}
          {items.map(a => (
            <div key={a.id} style={{ ...card, padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '4px' }}>
                  <span style={{ background: a.status === 'published' ? '#14532d' : '#1e1e2e', color: a.status === 'published' ? '#4ade80' : '#6b7280', padding: '2px 10px', borderRadius: '20px', fontSize: '0.68rem', fontWeight: 700, flexShrink: 0 }}>
                    {a.status === 'published' ? '🟢 Published' : '⚪ Draft'}
                  </span>
                  <span style={{ color: '#4b5563', fontSize: '0.75rem' }}>
                    {a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Not published'}
                  </span>
                </div>
                <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                <button onClick={() => quickPublish(a.id, a.status)} style={{ ...smBtn, background: a.status === 'published' ? '#1a0a0a' : '#14532d', color: a.status === 'published' ? '#f87171' : '#4ade80' }}>
                  {a.status === 'published' ? 'Unpublish' : 'Publish'}
                </button>
                <button onClick={() => startEdit(a.id)} style={smBtn}>Edit</button>
                <button onClick={() => del(a.id)} style={{ ...smBtn, background: '#1a0a0a', color: '#f87171' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const card: React.CSSProperties = { background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '1.5rem', marginBottom: '1rem' };
const lbl: React.CSSProperties = { display: 'block', color: '#9ca3af', fontSize: '0.78rem', fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' };
const inp: React.CSSProperties = { width: '100%', background: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: '6px', padding: '9px 12px', color: '#fff', fontSize: '0.9rem', outline: 'none' };
const btnGold: React.CSSProperties = { background: 'linear-gradient(135deg, #c8a84b, #a8882b)', color: '#000', border: 'none', borderRadius: '6px', padding: '9px 20px', cursor: 'pointer', fontWeight: 700, fontSize: '0.875rem' };
const btnGray: React.CSSProperties = { background: '#1e1e2e', color: '#9ca3af', border: 'none', borderRadius: '6px', padding: '9px 20px', cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem' };
const smBtn: React.CSSProperties = { background: '#1e1e2e', color: '#9ca3af', border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 };
