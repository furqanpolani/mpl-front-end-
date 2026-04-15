'use client';

import { useEffect, useState } from 'react';

const API = '';

const STATUS_FILTERS = ['', 'successful', 'failed', 'pending', 'cancelled'];
const STATUS_COLORS: Record<string, string> = { successful: '#2ecc71', failed: '#e74c3c', pending: '#f39c12', cancelled: '#888' };

interface Payment { id: string; ownerName: string; ownerEmail: string; teamName: string; amount: number; currency: string; status: string; paypalOrderId: string; paypalTransactionId: string | null; createdAt: string; }

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filter, setFilter] = useState('');
  const [msg, setMsg] = useState('');

  const load = (status: string) => {
    const url = status ? `${API}/api/admin/payments?status=${status}` : `${API}/api/admin/payments`;
    fetch(url, { credentials: 'include' }).then(r => r.json()).then(d => setPayments(Array.isArray(d) ? d : [])).catch(() => {});
  };

  useEffect(() => { load(filter); }, [filter]);

  const override = async (paymentId: string) => {
    const teamId = prompt('Team ID to reassign:');
    const newOwnerId = prompt('New Owner User ID (leave blank to release):') || null;
    if (!teamId) return;
    const res = await fetch(`${API}/api/admin/payments/${paymentId}/override`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
      body: JSON.stringify({ teamId, newOwnerId }),
    });
    if (res.ok) { setMsg('Ownership updated.'); load(filter); }
    else { const e = await res.json(); setMsg(e?.error?.message ?? 'Error'); }
  };

  return (
    <div>
      <h1 style={{ color: '#e94560' }}>Payment Dashboard</h1>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {STATUS_FILTERS.map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{ ...filterBtn, background: filter === s ? '#e94560' : '#2a3a5a' }}>
            {s || 'All'}
          </button>
        ))}
      </div>

      {msg && <p style={{ color: '#2ecc71', marginBottom: '1rem' }}>{msg}</p>}

      <div style={{ overflowX: 'auto' }}>
        <table style={tbl}>
          <thead>
            <tr>{['Owner', 'Team', 'Amount', 'Status', 'PayPal ID', 'Date', 'Actions'].map(h => <th key={h} style={th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id}>
                <td style={td}>{p.ownerName ?? '—'}<br /><span style={{ color: '#888', fontSize: '0.8rem' }}>{p.ownerEmail}</span></td>
                <td style={td}>{p.teamName ?? '—'}</td>
                <td style={td}>${(p.amount / 100).toLocaleString()} {p.currency}</td>
                <td style={td}><span style={{ color: STATUS_COLORS[p.status] ?? '#aaa', fontWeight: 600 }}>{p.status}</span></td>
                <td style={{ ...td, fontSize: '0.75rem', color: '#888' }}>
                  {p.paypalTransactionId ?? p.paypalOrderId?.slice(0, 12) + '…'}
                </td>
                <td style={td}>{new Date(p.createdAt).toLocaleDateString()}</td>
                <td style={td}>
                  <button onClick={() => override(p.id)} style={smBtn}>Override</button>
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr><td colSpan={7} style={{ ...td, textAlign: 'center', color: '#888' }}>No transactions found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const filterBtn: React.CSSProperties = { color: '#fff', border: 'none', borderRadius: '6px', padding: '6px 14px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 };
const smBtn: React.CSSProperties = { background: '#2a3a5a', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 10px', cursor: 'pointer', fontSize: '0.8rem' };
const tbl: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', minWidth: '700px' };
const th: React.CSSProperties = { background: '#16213e', color: '#aaa', padding: '8px 12px', textAlign: 'left', fontSize: '0.85rem' };
const td: React.CSSProperties = { padding: '8px 12px', color: '#ccc', borderBottom: '1px solid #1a2a4a', fontSize: '0.9rem', verticalAlign: 'top' };
