import { useLanguage } from './LanguageContext'

export default function About() {
  const { t, lang } = useLanguage()

  const feats = [
    { icon: '🔧', title: t.about.feat1_title, desc: t.about.feat1_desc },
    { icon: '🧪', title: t.about.feat2_title, desc: t.about.feat2_desc },
    { icon: '📦', title: t.about.feat3_title, desc: t.about.feat3_desc },
    { icon: '💬', title: t.about.feat4_title, desc: t.about.feat4_desc }
  ]

  return (
    <section id="about" className="sec" style={{ background: 'var(--bg)' }}>
      <div className="sec-inner">
        <div className="about-grid">
          {/* Visual */}
          <div className="about-img-wrap">
            <img src="/logo.png" alt="SRM PC Factory" />
            <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', width: '32px', height: '32px', borderTop: '1.5px solid var(--border-2)', borderLeft: '1.5px solid var(--border-2)' }} />
            <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', width: '32px', height: '32px', borderBottom: '1.5px solid var(--border-2)', borderRight: '1.5px solid var(--border-2)' }} />
            <div className="about-img-badge">Est. 2016<br />{lang === 'en' ? 'Salem, IN' : 'சேலம், தமிழ்நாடு'}</div>
          </div>

          {/* Text */}
          <div>
            <span className="sec-label">{t.about.label}</span>
            <h2 className="sec-title" style={{ whiteSpace: 'pre-line' }}>{t.about.title}</h2>
            <p className="sec-desc">
              {t.about.desc}
            </p>

            <div className="about-feats">
              {feats.map((f, i) => (
                <div key={i} className="about-feat">
                  <div className="about-feat-icon">{f.icon}</div>
                  <div>
                    <div className="about-feat-title">{f.title}</div>
                    <div className="about-feat-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
