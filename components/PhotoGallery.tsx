'use client';

const GALLERY = [
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&q=70',
  'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=70',
  'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=400&q=70',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=70',
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&q=70',
  'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=70',
];

export default function PhotoGallery() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
      {GALLERY.map((img, i) => (
        <div key={i} style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: '8px', cursor: 'pointer' }}>
          <img src={img} alt={`Event photo ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')} />
        </div>
      ))}
    </div>
  );
}
