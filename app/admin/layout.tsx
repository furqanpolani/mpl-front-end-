'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '🏠' },
  { href: '/admin/tournaments', label: 'Tournaments', icon: '🏆' },
  { href: '/admin/fixtures', label: 'Fixtures', icon: '📅' },
  { href: '/admin/teams', label: 'Teams & Players', icon: '👥' },
  { href: '/admin/announcements', label: 'Announcements', icon: '📢' },
  { href: '/admin/payments', label: 'Payments', icon: '💳' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) { setChecking(false); return; }
    fetch('/api/auth/session')
      .then(r => { if (!r.ok) { router.replace('/admin/login'); return null; } return r.json(); })
      .then(data => {
        if (data?.user) {
          if (data.user.role !== 'admin' && data.user.role !== 'super-admin') { router.replace('/admin/login'); }
          else { setUser(data.user); setChecking(false); }
        }
      })
      .catch(() => router.replace('/admin/login'));
  }, [pathname]);

  // Close sidebar on route change
  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  // Prevent body scroll when sidebar open on mobile
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [sidebarOpen]);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/admin/login');
  };

  if (isLoginPage) return <>{children}</>;

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: '#c8a84b', fontFamily: 'Oswald, sans-serif', fontSize: '1.1rem', letterSpacing: '0.1em' }}>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f' }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 200, display: 'none' }}
          className="mobile-overlay" />
      )}

      {/* Sidebar */}
      <aside style={{
        width: '240px', background: '#0d0d14', borderRight: '1px solid #1e1e2e',
        display: 'flex', flexDirection: 'column', flexShrink: 0,
        position: 'fixed', top: 0, left: 0, height: '100vh', overflowY: 'auto',
        zIndex: 300, transition: 'transform 0.3s ease',
      }} className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>

        {/* Sidebar header */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #1e1e2e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/admin" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg, #c8a84b, #a8882b)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: '#000', fontSize: '0.8rem' }}>MPL</div>
            <div>
              <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '0.85rem', color: '#fff', lineHeight: 1 }}>MPL Admin</div>
              <div style={{ color: '#6b7280', fontSize: '0.65rem', marginTop: '2px' }}>Management Portal</div>
            </div>
          </Link>
          {/* Close button — mobile only */}
          <button onClick={() => setSidebarOpen(false)} className="sidebar-close-btn"
            style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '1.25rem', cursor: 'pointer', padding: '4px', display: 'none' }}>
            ✕
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ padding: '0.75rem 0', flex: 1 }}>
          {navItems.map(item => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 1.25rem', color: active ? '#c8a84b' : '#9ca3af', textDecoration: 'none', fontSize: '0.875rem', fontWeight: active ? 700 : 500, background: active ? 'rgba(200,168,75,0.08)' : 'transparent', borderLeft: active ? '3px solid #c8a84b' : '3px solid transparent', transition: 'all 0.15s' }}>
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User info + logout */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #1e1e2e' }}>
          {user && (
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>{user.name}</div>
              <div style={{ color: '#6b7280', fontSize: '0.72rem' }}>{user.email}</div>
              <div style={{ color: '#c8a84b', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px' }}>{user.role}</div>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <Link href="/" style={{ color: '#6b7280', fontSize: '0.8rem', textDecoration: 'none' }}>← Back to site</Link>
            <button onClick={logout} style={{ background: 'none', border: 'none', color: '#f87171', fontSize: '0.8rem', cursor: 'pointer', textAlign: 'left', padding: 0 }}>Sign out</button>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }} className="admin-main">

        {/* Mobile top bar */}
        <div className="admin-topbar" style={{ display: 'none', background: '#0d0d14', borderBottom: '1px solid #1e1e2e', padding: '0.75rem 1rem', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
          <button onClick={() => setSidebarOpen(true)}
            style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff', borderRadius: '2px' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff', borderRadius: '2px' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: '#fff', borderRadius: '2px' }} />
          </button>
          <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>MPL Admin</div>
          <div style={{ width: '30px' }} />
        </div>

        {/* Page content */}
        <main style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>
          {children}
        </main>
      </div>

      <style>{`
        .admin-sidebar { transform: translateX(0); }
        .admin-main { margin-left: 240px; }

        @media (max-width: 768px) {
          .admin-sidebar { transform: translateX(-100%); }
          .admin-sidebar.sidebar-open { transform: translateX(0); }
          .admin-main { margin-left: 0; }
          .admin-topbar { display: flex !important; }
          .mobile-overlay { display: block !important; }
          .sidebar-close-btn { display: block !important; }
        }
      `}</style>
    </div>
  );
}
