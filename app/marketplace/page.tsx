'use client';

import { useEffect, useState } from 'react';

const API = '';

// Fallback dummy teams shown if API returns empty
const DUMMY_TEAMS = [
  { id: 'dummy-1', name: 'Karachi Kings', sport: { name: 'Cricket' }, homeVenue: 'National Stadium, Karachi', purchasePrice: 200000, tournaments: [{ name: 'MPL T20 Championship' }], color: '#c8a84b', abbr: 'KK' },
  { id: 'dummy-2', name: 'Lahore Lions', sport: { name: 'Cricket' }, homeVenue: 'Gaddafi Stadium, Lahore', purchasePrice: 200000, tournaments: [{ name: 'MPL T20 Championship' }], color: '#1e40af', abbr: 'LL' },
  { id: 'dummy-3', name: 'Islamabad United', sport: { name: 'Cricket' }, homeVenue: 'Rawalpindi Cricket Stadium', purchasePrice: 200000, tournaments: [{ name: 'MPL T20 Championship' }], color: '#dc2626', abbr: 'IU' },
  { id: 'dummy-4', name: 'Peshawar Zalmi', sport: { name: 'Cricket' }, homeVenue: 'Arbab Niaz Stadium', purchasePrice: 200000, tournaments: [{ name: 'MPL T20 Championship' }], color: '#f59e0b', abbr: 'PZ' },
  { id: 'dummy-5', name: 'Quetta Gladiators', sport: { name: 'Cricket' }, homeVenue: 'Bugti Stadium, Quetta', purchasePrice: 200000, tournaments: [{ name: 'MPL T20 Championship' }], color: '#7c3aed', abbr: 'QG' },
  { id: 'dummy-6', name: 'Multan Sultans', sport: { name: 'Cricket' }, homeVenue: 'Multan Cricket Stadium', purchasePrice: 200000, tournaments: [{ name: 'MPL T20 Championship' }], color: '#059669', abbr: 'MS' },
];

const TEAM_COLORS = ['#c8a84b', '#1e40af', '#dc2626', '#f59e0b', '#7c3aed', '#059669'];

export default function MarketplacePage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API}/api/public/ownership/teams`)
      .then(r => r.json())
      .then(d => { setTeams(Array.isArray(d) && d.length > 0 ? d : DUMMY_TEAMS); setLoading(false); })
      .catch(() => { setTeams(DUMMY_TEAMS); setLoading(false); });
  }, []);

  const handlePurchase = async (teamId: string) => {
    if (teamId.startsWith('dummy-')) { setError('Please log in to purchase a team.'); return; }
    setError(null);
    setPurchasing(teamId);
    try {
      const res = await fetch(`${API}/api/payments/initiate`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ teamId }) });
      if (res.status === 401) { setError('You must be logged in to purchase a team.'); setPurchasing(null); return; }
      if (!res.ok) { const b = await res.json(); setError(b?.error?.message ?? 'Purchase failed.'); setPurchasing(null); return; }
      const { approvalUrl } = await res.json();
      window.location.href = approvalUrl;
    } catch { setError('Network error. Please try again.'); setPurchasing(null); }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ color: '#c8a84b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem', fontFamily: 'Oswald, sans-serif' }}>Own a Franchise</div>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '2.5rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>
          Team <span style={{ color: '#c8a84b' }}>Ownership</span>
        </h1>
        <p style={{ color: '#6b7280', marginTop: '0.5rem', maxWidth: '600px' }}>
          Purchase a franchise team and become an official MPL team owner. Own your team, manage your roster, and compete for the championship.
        </p>
      </div>

      {/* How it works */}
      <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '1.5rem', marginBottom: '2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {[['1', 'Choose a Team', 'Pick from available franchise teams'], ['2', 'Pay Securely', 'One-time payment via PayPal'], ['3', 'Get Confirmed', 'Instant email confirmation'], ['4', 'Be the Boss', 'Manage your team in MPL']].map(([num, title, desc]) => (
          <div key={num} style={{ textAlign: 'center', padding: '0.5rem' }}>
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #c8a84b, #a8882b)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: '#000', fontSize: '1rem' }}>{num}</div>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.875rem', marginBottom: '4px' }}>{title}</div>
            <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>{desc}</div>
          </div>
        ))}
      </div>

      {error && (
        <div style={{ background: '#1f0a0a', border: '1px solid #dc2626', borderRadius: '10px', padding: '1rem 1.25rem', marginBottom: '1.5rem', color: '#f87171', fontSize: '0.9rem' }}>
          ⚠ {error}
        </div>
      )}

      {loading && <p style={{ color: '#6b7280' }}>Loading available teams...</p>}

      {/* Teams grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {teams.map((t: any, idx: number) => {
          const color = t.color ?? TEAM_COLORS[idx % TEAM_COLORS.length];
          const abbr = t.abbr ?? t.name?.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();
          return (
            <div key={t.id} className="mpl-card" style={{ overflow: 'hidden' }}>
              {/* Team banner */}
              <div style={{ height: '120px', background: `linear-gradient(135deg, ${color}22, ${color}11)`, borderBottom: `3px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ width: '72px', height: '72px', background: `linear-gradient(135deg, ${color}, ${color}88)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: '#000', fontSize: '1.5rem', boxShadow: `0 4px 20px ${color}44` }}>
                  {abbr}
                </div>
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: '#14532d', color: '#4ade80', padding: '3px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700 }}>
                  Available
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontFamily: 'Oswald, sans-serif', color: '#fff', fontWeight: 700, fontSize: '1.2rem', textTransform: 'uppercase', marginBottom: '4px' }}>{t.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  {t.sport?.name} · 📍 {t.homeVenue}
                </p>
                {t.tournaments?.length > 0 && (
                  <p style={{ color: '#4b5563', fontSize: '0.8rem', marginBottom: '1rem' }}>
                    🏆 {t.tournaments.map((tr: any) => tr.name).join(', ')}
                  </p>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #1e1e2e' }}>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Purchase Price</div>
                    <div style={{ fontFamily: 'Oswald, sans-serif', color: '#c8a84b', fontWeight: 700, fontSize: '1.5rem', lineHeight: 1 }}>
                      ${(t.purchasePrice / 100).toLocaleString()}
                    </div>
                    <div style={{ color: '#4b5563', fontSize: '0.7rem' }}>USD · One-time</div>
                  </div>
                  <button onClick={() => handlePurchase(t.id)} disabled={purchasing === t.id}
                    style={{ background: 'linear-gradient(135deg, #c8a84b, #a8882b)', color: '#000', fontWeight: 700, border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: purchasing === t.id ? 0.7 : 1 }}>
                    {purchasing === t.id ? 'Processing...' : 'Buy Now'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FAQ */}
      <div style={{ marginTop: '3rem', background: '#111118', border: '1px solid #1e1e2e', borderRadius: '16px', padding: '2rem' }}>
        <h2 style={{ fontFamily: 'Oswald, sans-serif', color: '#fff', fontSize: '1.5rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          Frequently Asked <span style={{ color: '#c8a84b' }}>Questions</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {[
            ['What does team ownership include?', 'As a team owner, you get official recognition, your name listed on the team page, and the ability to manage your team roster through the admin portal.'],
            ['Is the payment secure?', 'Yes. All payments are processed through PayPal, one of the most trusted payment platforms in the world. Your financial information is never stored on our servers.'],
            ['Can I sell my team later?', 'Team ownership transfers are handled by MPL administration. Contact us at info@mpl.com to discuss ownership transfers.'],
            ['What if I want to own multiple teams?', 'You can own multiple teams across different sports and tournaments. Each team requires a separate purchase.'],
          ].map(([q, a]) => (
            <div key={q as string}>
              <h4 style={{ color: '#c8a84b', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.5rem' }}>{q}</h4>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.7 }}>{a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
