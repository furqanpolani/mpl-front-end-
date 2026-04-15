'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#0d0d14', borderTop: '1px solid #1e1e2e' }}>
      {/* Main footer content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem 2rem' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>

          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
              <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #c8a84b, #a8882b)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Oswald, sans-serif', fontWeight: 700, color: '#000', fontSize: '1rem' }}>MPL</div>
              <div>
                <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>MEMON PREMIER</div>
                <div style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 400, fontSize: '0.7rem', color: '#c8a84b', letterSpacing: '0.15em', lineHeight: 1 }}>LEAGUE</div>
              </div>
            </div>
            <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: 1.8, marginBottom: '1.5rem', maxWidth: '300px' }}>
              Memon Premier League is providing premier level cricket and is determined to build diverse communities, promote, encourage, foster and cultivate interest in the sport of cricket at all levels.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { label: 'Facebook', href: 'https://facebook.com', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                { label: 'Instagram', href: 'https://instagram.com', icon: <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { label: 'YouTube', href: 'https://youtube.com', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg> },
                { label: 'Twitter', href: 'https://twitter.com', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg> },
                { label: 'TikTok', href: 'https://tiktok.com', icon: <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" title={s.label}
                  style={{ width: '36px', height: '36px', background: '#1e1e2e', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', transition: 'background 0.2s, color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#c8a84b'; e.currentTarget.style.color = '#000'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1e1e2e'; e.currentTarget.style.color = '#6b7280'; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'Oswald, sans-serif', color: '#fff', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '2px solid #c8a84b', display: 'inline-block' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[['/', 'Home'], ['/about', 'About MPL'], ['/sports/cricket', 'Cricket'], ['/sports/paddle', 'Paddle'], ['/archive', 'Archive'], ['/marketplace', 'Team Ownership'], ['/events', 'Upcoming Events']].map(([href, label]) => (
                <Link key={href} href={href} style={{ color: '#6b7280', fontSize: '0.875rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#c8a84b')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>
                  <span style={{ color: '#c8a84b', fontSize: '0.6rem' }}>▶</span> {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Forms / Registration */}
          <div>
            <h4 style={{ fontFamily: 'Oswald, sans-serif', color: '#fff', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '2px solid #c8a84b', display: 'inline-block' }}>Registration</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[['#', 'Player Registration'], ['#', 'Team Registration'], ['#', 'Umpire Registration'], ['#', 'Youth Academy'], ['#', 'Become a Sponsor'], ['/admin', 'Admin Portal']].map(([href, label]) => (
                <Link key={label} href={href} style={{ color: '#6b7280', fontSize: '0.875rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#c8a84b')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>
                  <span style={{ color: '#c8a84b', fontSize: '0.6rem' }}>▶</span> {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: 'Oswald, sans-serif', color: '#fff', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '2px solid #c8a84b', display: 'inline-block' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '📞', label: '+1 (815) 295-3530', href: 'tel:+18152953530' },
                { icon: '✉', label: 'info@mpl.com', href: 'mailto:info@mpl.com' },
                { icon: '📍', label: 'Chicago, USA', href: '#' },
              ].map(item => (
                <a key={item.label} href={item.href} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#6b7280', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#c8a84b')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#6b7280')}>
                  <span style={{ fontSize: '1rem', flexShrink: 0 }}>{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            {/* Favorite division poll */}
            <div style={{ marginTop: '1.5rem', background: '#111118', border: '1px solid #1e1e2e', borderRadius: '8px', padding: '1rem' }}>
              <p style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.75rem' }}>What's your favorite division?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {['T20 Cricket', 'Hardball T30', 'Paddle', 'Next Season'].map(d => (
                  <label key={d} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b7280', fontSize: '0.8rem', cursor: 'pointer' }}>
                    <input type="radio" name="division" style={{ accentColor: '#c8a84b' }} /> {d}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #1e1e2e', background: '#0a0a0f' }}>
        <div className="footer-bottom" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ color: '#4b5563', fontSize: '0.8rem' }}>
            © 2025 Memon Premier League. All Rights Reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[['#', 'Privacy Policy'], ['#', 'Terms of Service'], ['/admin', 'Admin']].map(([href, label]) => (
              <Link key={label} href={href} style={{ color: '#4b5563', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c8a84b')}
                onMouseLeave={e => (e.currentTarget.style.color = '#4b5563')}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
