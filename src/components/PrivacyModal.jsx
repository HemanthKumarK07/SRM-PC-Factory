import { X } from 'lucide-react'
import { useLanguage } from './LanguageContext'

export default function PrivacyModal({ onClose }) {
  const { t } = useLanguage()

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: '500px' }}>
        <button className="modal-close" onClick={onClose}><X size={15} /></button>
        
        <div className="modal-head">
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: 'var(--text-1)', letterSpacing: '-0.02em', marginBottom: '0.25rem' }}>
            {t.privacy.title}
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace' }}>
            {t.privacy.last_updated}
          </p>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.85rem', lineHeight: '1.65', color: 'var(--text-2)' }}>
          <div>
            <h3 style={{ color: 'var(--text-1)', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.95rem', fontFamily: 'Space Grotesk, sans-serif' }}>
              {t.privacy.sec1_title}
            </h3>
            <p>{t.privacy.sec1_desc}</p>
          </div>

          <div style={{ height: '1px', background: 'var(--border)' }} />

          <div>
            <h3 style={{ color: 'var(--text-1)', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.95rem', fontFamily: 'Space Grotesk, sans-serif' }}>
              {t.privacy.sec2_title}
            </h3>
            <p>{t.privacy.sec2_desc}</p>
          </div>

          <div style={{ height: '1px', background: 'var(--border)' }} />

          <div>
            <h3 style={{ color: 'var(--text-1)', fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.95rem', fontFamily: 'Space Grotesk, sans-serif' }}>
              {t.privacy.sec3_title}
            </h3>
            <p>{t.privacy.sec3_desc}</p>
          </div>

          <button
            className="btn-build"
            onClick={onClose}
            style={{ width: '100%', marginTop: '1.25rem', background: 'var(--bg-3)', border: '1px solid var(--border)' }}
          >
            {t.privacy.btn_close}
          </button>
        </div>
      </div>
    </div>
  )
}
