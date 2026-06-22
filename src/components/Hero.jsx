import { useLanguage } from './LanguageContext'

export default function Hero({ onBuild }) {
  const { t } = useLanguage()

  const stats = [
    { val: '2,500+', lbl: t.hero.stat_built },
    { val: '48 hrs', lbl: t.hero.stat_time },
    { val: '8 Yrs',  lbl: t.hero.stat_exp }
  ]

  return (
    <section id="home" className="hero">
      <div className="hero-grid" />
      <div className="hero-glow" />

      <div className="hero-inner">
        <div className="hero-badge">{t.hero.badge}</div>

        <h1 className="hero-h1">
          {t.hero.h1_1}<br />
          <span className="hl">{t.hero.h1_2}</span>
        </h1>

        <p className="hero-p">
          {t.hero.p}
        </p>

        <div className="hero-ctas">
          <button className="btn-p" onClick={onBuild}>
            {t.hero.btn_browse}
          </button>
          <button
            className="btn-g"
            onClick={() => { window.location.hash = '#about' }}
          >
            {t.hero.btn_how}
          </button>
        </div>

        <div className="hero-stats">
          {stats.map((s, i) => (
            <div key={i}>
              <div className="hero-stat-val">{s.val}</div>
              <div className="hero-stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
