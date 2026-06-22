import { useLanguage } from './LanguageContext'

export default function Contact() {
  const { t } = useLanguage()

  const contactItems = [
    { icon: '📍', lbl: t.contact.lbl_address, val: t.contact.val_address },
    { icon: '📞', lbl: t.contact.lbl_phone,   val: '+91 98765 43210' },
    { icon: '✉️', lbl: t.contact.lbl_email,   val: 'srmm1243@gmail.com' },
    { icon: '💬', lbl: t.contact.lbl_whatsapp, val: '+91 98765 43210' }
  ]

  return (
    <section id="contact" className="sec" style={{ background: 'var(--bg-2)' }}>
      <div className="sec-inner">
        <div className="contact-grid">
          {/* Info */}
          <div>
            <span className="sec-label">{t.contact.label}</span>
            <h2 className="sec-title" style={{ marginBottom: '1rem' }}>{t.contact.title}</h2>
            <p className="sec-desc" style={{ marginTop: 0, marginBottom: '2.5rem' }}>
              {t.contact.desc}
            </p>

            {contactItems.map((item, i) => (
              <div key={i} className="contact-info-item">
                <div className="contact-icon">{item.icon}</div>
                <div>
                  <div className="contact-lbl">{item.lbl}</div>
                  <div className="contact-val">{item.val}</div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '1.25rem', background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1.1rem' }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.15em', color: 'var(--text-3)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{t.contact.hours_title}</div>
              {[[t.contact.hours_week, '9 AM – 8 PM'], [t.contact.hours_sun, '10 AM – 5 PM']].map(([d, t], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: i === 0 ? '1px solid var(--border)' : 'none', fontSize: '0.82rem' }}>
                  <span style={{ color: 'var(--text-3)' }}>{d}</span>
                  <span style={{ color: 'var(--blue-light)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Google Maps Location */}
          <div className="card" style={{ padding: 0, overflow: 'hidden', minHeight: '380px', display: 'flex', flexDirection: 'column' }}>
            <iframe
              title="SRM PC Factory Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125026.04639906666!2d78.07727196024987!3d11.656093863412586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf1ccf4fc41f1%3A0x6b45a0b94da2de9c!2sSalem%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1719030000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, flex: 1, minHeight: '380px', filter: 'grayscale(0.9) invert(0.95) contrast(1.2) opacity(0.85)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
