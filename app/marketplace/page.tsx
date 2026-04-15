'use client';

import { mockApi } from '../../lib/mock-api';

const TEAM_COLORS = ['#c8a84b', '#1e40af', '#dc2626', '#f59e0b', '#7c3aed', '#059669'];

export default function MarketplacePage() {
  const teams = mockApi.getMarketplaceTeams();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ color: '#c8a84b', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem', fontFamily: 'Oswald, sans-serif' }}>Own a Franchise</div>
        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '2.5rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase' }}>
          Team <span style={{ color: '#c8a84b' }}>Ownership</span>
        </h1>
        <p style={{ color: '#6b7280', marginTop: '0.5rem', maxWidth: '600px' }}>Purchase a franchise team and become an official MPL team owner.</p>
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

      <div className="marketplace-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {teams.map((t: any, idx: number) => {
          const color = TEAM_COLORS[idx % TEAM_COLORS.length];
          const abbr = t.name?.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();
          return (
            <div key={t.id} className="mpl-card" style={{ overflow: 'hidden' }}>
              <div style={{ height: '120px', background: `linear-gradient(135deg, ${color}22, ${color}11)`, borderBottom: `3px solid ${color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ width: '72px', height: '72px', background: `linear-gradient(135deg, ${color}, ${color}88)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: '#000', fontSize: '1.5rem', boxShadow: `0 4px 20px ${color}44` }}>
                  {abbr}
                </div>
                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: '#14532d', color: '#4ade80', padding: '3px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 700 }}>Available</div>
              </div>
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontFamily: 'Oswald, sans-serif', color: '#fff', fontWeight: 700, fontSize: '1.2rem', textTransform: 'uppercase', marginBottom: '4px' }}>{t.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{t.sport?.name} · 📍 {t.homeVenue}</p>
                {t.tournaments?.length > 0 && <p style={{ color: '#4b5563', fontSize: '0.8rem', marginBottom: '1rem' }}>🏆 {t.tournaments.map((tr: any) => tr.name).join(', ')}</p>}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #1e1e2e' }}>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Purchase Price</div>
                    <div style={{ fontFamily: 'Oswald, sans-serif', color: '#c8a84b', fontWeight: 700, fontSize: '1.5rem', lineHeight: 1 }}>${(t.purchasePrice / 100).toLocaleString()}</div>
                    <div style={{ color: '#4b5563', fontSize: '0.7rem' }}>USD · One-time</div>
                  </div>
                  <button style={{ background: 'linear-gradient(135deg, #c8a84b, #a8882b)', color: '#000', fontWeight: 700, border: 'none', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    onClick={() => alert('Contact info@mpl.com to purchase this team!')}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
