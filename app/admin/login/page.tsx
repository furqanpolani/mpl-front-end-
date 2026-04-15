'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Use the Next.js API route proxy so the cookie is set on the same origin
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const b = await res.json();
        setError(b?.error?.message ?? 'Invalid credentials');
        setLoading(false);
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Network error. Is the backend running?');
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0f', padding: '1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #c8a84b, #a8882b)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#000', fontSize: '1.5rem', margin: '0 auto 1rem' }}>M</div>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: '1.5rem' }}>MPL Admin Portal</h1>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: '4px' }}>Sign in to manage the platform</p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '16px', padding: '2rem' }}>
          {error && (
            <div style={{ background: '#1f0a0a', border: '1px solid #dc2626', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#f87171', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="admin@mpl.com"
              style={{ width: '100%', background: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ color: '#9ca3af', fontSize: '0.85rem', fontWeight: 500, display: 'block', marginBottom: '6px' }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
              style={{ width: '100%', background: '#0a0a0f', border: '1px solid #1e1e2e', borderRadius: '8px', padding: '10px 14px', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
          </div>

          <button type="submit" disabled={loading}
            style={{ width: '100%', background: 'linear-gradient(135deg, #c8a84b, #a8882b)', color: '#000', fontWeight: 700, border: 'none', borderRadius: '8px', padding: '12px', cursor: 'pointer', fontSize: '1rem', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
