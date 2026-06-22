import { useLanguage } from './LanguageContext'

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
)

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
)

export default function Footer({ onOpenPrivacy }) {
  const { t } = useLanguage()
  
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
              <img src="/logo.png" alt="SRM" style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }} />
              <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                SRM <span style={{ color: 'var(--blue-light)' }}>PC Factory</span>
              </span>
            </div>
            <p>{t.footer.desc}</p>
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem' }}>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: 'var(--text-3)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }} 
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'} 
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
              >
                <InstagramIcon />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer" 
                style={{ color: 'var(--text-3)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }} 
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-1)'} 
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">{t.footer.nav}</div>
            {['Home', 'About', 'Builds', 'Contact'].map(n => (
              <button key={n} className="footer-link" onClick={() => go(n.toLowerCase())}>
                {n === 'Home' ? t.nav.home : n === 'About' ? t.nav.about : n === 'Builds' ? t.nav.builds : t.nav.contact}
              </button>
            ))}
          </div>
          <div>
            <div className="footer-col-title">{t.footer.builds}</div>
            {['Entry Level', 'Core Gaming', 'Performance Series', 'Elite Series'].map(b => (
              <button key={b} className="footer-link" onClick={() => go('builds')}>
                {b === 'Entry Level' ? t.products.tiers.entry.tier : b === 'Core Gaming' ? t.products.tiers.core.tier : b === 'Performance Series' ? t.products.tiers.performance.tier : t.products.tiers.elite.tier}
              </button>
            ))}
          </div>
          <div>
            <div className="footer-col-title">{t.footer.contact}</div>
            <span className="footer-link">srmm1243@gmail.com</span>
            <span className="footer-link">+91 98765 43210</span>
            <span className="footer-link" style={{ lineHeight: 1.5 }}>
              123 Tech Park<br />
              {t.contact.val_address.replace('123 Tech Park, ', '')}
            </span>
          </div>
        </div>
        <div className="footer-bottom">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span>{t.footer.rights.replace('{year}', new Date().getFullYear())}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-3)' }}>{t.footer.powered}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <button 
              onClick={onOpenPrivacy} 
              style={{ background: 'none', border: 'none', color: 'var(--text-3)', fontSize: '0.78rem', cursor: 'pointer', textDecoration: 'underline', transition: 'color 0.2s', padding: 0 }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-2)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
            >
              {t.footer.privacy}
            </button>
            <span>{t.footer.made}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
