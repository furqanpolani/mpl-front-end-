export default function AboutPage() {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 1.5rem' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#c8a84b15', border: '1px solid #c8a84b44', borderRadius: '20px', padding: '6px 16px', marginBottom: '1.5rem' }}>
          <span style={{ color: '#c8a84b', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>About MPL</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
          Memon <span style={{ background: 'linear-gradient(135deg, #c8a84b, #e8c96b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Premier League</span>
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
          A community-driven sports organization dedicated to organizing competitive tournaments and promoting sports culture.
        </p>
      </div>

      {/* Mission */}
      <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '16px', padding: '2rem', marginBottom: '1.5rem' }}>
        <h2 style={{ color: '#c8a84b', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Our Mission</h2>
        <p style={{ color: '#9ca3af', lineHeight: 1.8 }}>
          MPL promotes competitive sports culture, provides a transparent and engaging tournament experience, and creates opportunities for community members to participate — whether as players, fans, or team owners.
        </p>
      </div>

      {/* Sports grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        {[{ icon: '🏏', name: 'Cricket', desc: 'Our primary sport — hardball and tape ball formats with full live scoring.' }, { icon: '🏓', name: 'Paddle', desc: 'Competitive paddle tournaments with league standings and fixtures.' }].map(s => (
          <div key={s.name} style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '12px', padding: '1.5rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{s.icon}</div>
            <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>{s.name}</h3>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.6 }}>{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Differentiators */}
      <div style={{ background: '#111118', border: '1px solid #1e1e2e', borderRadius: '16px', padding: '2rem' }}>
        <h2 style={{ color: '#c8a84b', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>What Makes MPL Different</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {[['🔴', 'Real-time live scoring', 'Ball-by-ball updates pushed instantly to fans'], ['🏆', 'Team ownership', 'Purchase a team and become an official MPL owner'], ['⚡', 'Multi-sport', 'Cricket, Paddle, and more sports coming soon'], ['🤖', 'AI insights', 'AI-generated match reports and player analysis']].map(([icon, title, desc]) => (
            <div key={title as string} style={{ display: 'flex', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>{icon}</span>
              <div>
                <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>{title as string}</p>
                <p style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '2px' }}>{desc as string}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
