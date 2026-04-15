'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const API = '';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ tournaments: 0, fixtures: 0, teams: 0, announcements: 0, payments: 0 });
  const [recentFixtures, setRecentFixtures] = useState<any[]>([]);
  const [recentAnnouncements, setRecentAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/admin/tournaments`, { credentials: 'include' }).then(r => r.json()).catch(() => []),
      fetch(`${API}/api/admin/fixtures`, { credentials: 'include' }).then(r => r.json()).catch(() => []),
      fetch(`${API}/api/admin/teams`, { credentials: 'include' }).then(r => r.json()).catch(() => []),
      fetch(`${API}/api/admin/announcements`, { credentials: 'include' }).then(r => r.json()).catch(() => []),
      fetch(`${API}/api/admin/payments`, { credentials: 'include' }).then(r => r.json()).catch(() => []),
    ]).then(([t, f, tm, a, p]) => {
      setStats({
        tournaments: Array.isArray(t) ? t.length : 0,
        fixtures: Array.isArray(f) ? f.length : 0,
        teams: Array.isArray(tm) ? tm.length : 0,
        announcements: Array.isArray(a) ? a.length : 0,
        payments: Array.isArray(p) ? p.length : 0,
      });
      setRecentFixtures(Array.isArray(f) ? f.slice(0, 5) : []);
      setRecentAnnouncements(Array.isArray(a) ? a.slice(0, 5) : []);
      setLoading(false);
    });
  }, []);

  const statCards = [
    { label: 'Tournaments', value: stats.tournaments, icon: '🏆', href: '/admin/tournaments', color: '#c8a84b' },
    { label: 'Fixtures', value: stats.fixtures, icon: '📅', href: '/admin/fixtures', color: '#3b82f6' },
    { label: 'Teams', value: stats.teams, icon: '👥', href: '/admin/teams', color: '#8b5cf6' },
    { label: 'Announcements', value: stats.announcements, icon: '📢', href: '/admin/announcements', color: '#10b981' },
    { label: 'Payments', value: stats.payments, icon: '💳', href: '/admin/payments', color: '#f59e0b' },
  ];

  const quickActions = [
    { label: 'New Tournament', href: '/admin/tournaments', icon: '🏆', desc: 'Create a new tournament' },
    { label: 'Schedule Fixture', href: '/admin/fixtures', icon: '📅', desc: 'Add a new match' },
    { label: 'Add Team', href: '/admin/teams', icon: '👥', desc: 'Register a new team' },
    { label: 'Post News', href: '/admin/announcements', icon: '📢', desc: 'Publish an announcement' },
    { label: 'View Payments', href: '/admin/payments', icon: '💳', desc: 'Track team purchases' },
  ];

  const statusColor: Record<string, string> = { live: '#dc2626', upcoming: '#c8a84b', completed: '#4ade80' };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: '#fff', fontFamily: 'Oswald, sans-serif', fontSize: '2rem', fontWeight: 700, marginBottom: '4px' }}>
          Admin <span style={{ color: '#c8a84b' }}>Dashboard</span>
        </h1>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Manage all MPL platform content from here.</p>
      </div>

      {/* Stats */}
      <div className="admin-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {statCards.map(s => (
          <Link key={s.label} href={s.href} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '1.25rem', transition: 'border-color 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = s.color + '66')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#1e1e2e')}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.icon}</div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontSize: '2rem', fontWeight: 700, color: s.color, lineHeight: 1 }}>
                {loading ? '—' : s.value}
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="admin-recent" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Recent Fixtures */}
        <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #1e1e2e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: '#fff', fontWeight: 700, margin: 0, fontSize: '0.95rem' }}>📅 Recent Fixtures</h3>
            <Link href="/admin/fixtures" style={{ color: '#c8a84b', fontSize: '0.78rem', textDecoration: 'none', fontWeight: 600 }}>Manage →</Link>
          </div>
          {loading ? <p style={{ padding: '1.5rem', color: '#6b7280' }}>Loading...</p> : (
            <div>
              {recentFixtures.length === 0 && <p style={{ padding: '1.5rem', color: '#4b5563', textAlign: 'center' }}>No fixtures yet.</p>}
              {recentFixtures.map(f => (
                <div key={f.id} style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid #0f0f18', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem' }}>{f.homeTeam?.name ?? '?'} vs {f.awayTeam?.name ?? '?'}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>{new Date(f.scheduledAt).toLocaleDateString()}</div>
                  </div>
                  <span style={{ background: statusColor[f.status] + '22', color: statusColor[f.status], padding: '2px 8px', borderRadius: '20px', fontSize: '0.68rem', fontWeight: 600 }}>
                    {f.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Announcements */}
        <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #1e1e2e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ color: '#fff', fontWeight: 700, margin: 0, fontSize: '0.95rem' }}>📢 Announcements</h3>
            <Link href="/admin/announcements" style={{ color: '#c8a84b', fontSize: '0.78rem', textDecoration: 'none', fontWeight: 600 }}>Manage →</Link>
          </div>
          {loading ? <p style={{ padding: '1.5rem', color: '#6b7280' }}>Loading...</p> : (
            <div>
              {recentAnnouncements.length === 0 && <p style={{ padding: '1.5rem', color: '#4b5563', textAlign: 'center' }}>No announcements yet.</p>}
              {recentAnnouncements.map(a => (
                <div key={a.id} style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid #0f0f18', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title}</div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>{a.publishedAt ? new Date(a.publishedAt).toLocaleDateString() : 'Draft'}</div>
                  </div>
                  <span style={{ background: a.status === 'published' ? '#14532d' : '#1e1e2e', color: a.status === 'published' ? '#4ade80' : '#6b7280', padding: '2px 8px', borderRadius: '20px', fontSize: '0.68rem', fontWeight: 600, flexShrink: 0, marginLeft: '0.5rem' }}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '1.25rem' }}>
        <h3 style={{ color: '#fff', fontWeight: 700, margin: '0 0 1rem', fontSize: '0.95rem' }}>⚡ Quick Actions</h3>
        <div className="admin-quick-actions" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
          {quickActions.map(a => (
            <Link key={a.label} href={a.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: '8px', padding: '1rem', textAlign: 'center', cursor: 'pointer', transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#c8a84b44')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#1e1e2e')}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{a.icon}</div>
                <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.82rem', marginBottom: '2px' }}>{a.label}</div>
                <div style={{ color: '#6b7280', fontSize: '0.72rem' }}>{a.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
