import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from './LanguageContext'

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen]   = useState(false)
  const { t, lang, toggleLanguage } = useLanguage()

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (id) => {
    window.location.hash = '#' + id.toLowerCase()
    setOpen(false)
  }

  const links = [
    { key: 'home', label: t.nav.home },
    { key: 'about', label: t.nav.about },
    { key: 'builds', label: t.nav.builds },
    { key: 'contact', label: t.nav.contact }
  ]

  return (
    <nav className={`navbar${solid ? ' solid' : ''}`}>
      <div className="nav-inner">
        <div className="nav-brand" onClick={() => go('home')}>
          <img src="/logo.png" alt="SRM" />
          <span className="nav-brand-name">SRM <em>PC Factory</em></span>
        </div>

        <div className="nav-links">
          {links.map(l => (
            <button key={l.key} className="nav-link" onClick={() => go(l.key)}>{l.label}</button>
          ))}
          
          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage} 
            style={{ 
              background: 'rgba(112, 150, 248, 0.08)', 
              border: '1px solid rgba(112, 150, 248, 0.25)', 
              borderRadius: '6px', 
              padding: '6px 12px', 
              fontSize: '0.78rem', 
              fontFamily: 'Space Grotesk, sans-serif', 
              fontWeight: 600, 
              color: 'var(--blue-light)', 
              cursor: 'pointer', 
              transition: 'all 0.2s', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '4px',
              marginLeft: '0.5rem',
              marginRight: '0.25rem'
            }}
          >
            🌐 {lang === 'en' ? 'தமிழ்' : 'English'}
          </button>

          <button className="btn-p" style={{ padding: '9px 18px', fontSize: '0.82rem' }} onClick={() => go('builds')}>
            {t.nav.builds}
          </button>
        </div>

        <button
          id="nav-mob-btn"
          onClick={() => setOpen(!open)}
          style={{ display: 'none', background: 'transparent', border: '1px solid var(--border)', borderRadius: '7px', padding: '6px', cursor: 'pointer', color: 'var(--text-2)', lineHeight: 0 }}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)', padding: '0.75rem 1.5rem 1.25rem' }}>
          {links.map(l => (
            <button key={l.key} className="footer-link" style={{ display: 'block', padding: '9px 0', width: '100%', fontSize: '0.9rem' }} onClick={() => go(l.key)}>{l.label}</button>
          ))}
          {/* Mobile Language Toggle */}
          <button 
            onClick={toggleLanguage} 
            style={{ 
              background: 'rgba(112, 150, 248, 0.08)', 
              border: '1px solid rgba(112, 150, 248, 0.25)', 
              borderRadius: '6px', 
              padding: '8px 0', 
              width: '100%',
              fontSize: '0.875rem', 
              fontFamily: 'Space Grotesk, sans-serif', 
              fontWeight: 600, 
              color: 'var(--blue-light)', 
              cursor: 'pointer', 
              marginTop: '0.5rem',
              textAlign: 'center',
              display: 'block'
            }}
          >
            🌐 {lang === 'en' ? 'தமிழ்' : 'English'}
          </button>
        </div>
      )}
    </nav>
  )
}
