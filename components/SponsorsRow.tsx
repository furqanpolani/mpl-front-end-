'use client';

export default function SponsorsRow() {
  const sponsors = [
    { name: 'Charcoal Cafe', url: '#', logo: 'https://placehold.co/140x50/111118/c8a84b?text=Charcoal+Cafe' },
    { name: 'Giants Digi', url: '#', logo: 'https://placehold.co/140x50/111118/c8a84b?text=Giants+Digi' },
    { name: 'ToursPro', url: '#', logo: 'https://placehold.co/140x50/111118/c8a84b?text=ToursPro' },
    { name: 'Honest Restaurants', url: '#', logo: 'https://placehold.co/140x50/111118/c8a84b?text=Honest+Restaurants' },
    { name: 'Vohra Tax', url: '#', logo: 'https://placehold.co/140x50/111118/c8a84b?text=Vohra+Tax' },
    { name: 'Taj Automotive', url: '#', logo: 'https://placehold.co/140x50/111118/c8a84b?text=Taj+Automotive' },
  ];

  return (
    <section style={{ background: '#0d0d14', borderTop: '1px solid #1e1e2e', padding: '3rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <p style={{ textAlign: 'center', color: '#4b5563', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2rem', fontFamily: 'Oswald, sans-serif' }}>
          Our Sponsors & Partners
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
          {sponsors.map(s => (
            <a key={s.name} href={s.url} style={{ opacity: 0.6, transition: 'opacity 0.2s', display: 'block' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}>
              <img src={s.logo} alt={s.name} style={{ height: '40px', objectFit: 'contain', borderRadius: '6px' }} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
