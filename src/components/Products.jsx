import everydayPerformerImg from '../assets/everyday_performer.png'
import coreGamingImg from '../assets/core_gaming.png'
import performanceBeastImg from '../assets/performance_beast.png'
import elitePowerhouseImg from '../assets/elite_powerhouse.png'
import { useLanguage } from './LanguageContext'

export default function Products({ onBuild }) {
  const { t } = useLanguage()

  const builds = [
    {
      id: 'entry',
      tier: t.products.tiers.entry.tier,
      tagColor: '#64748b',
      tagBg: 'rgba(100,116,139,0.12)',
      dotColor: '#64748b',
      accentColor: '#64748b',
      name: t.products.tiers.entry.name,
      tagline: t.products.tiers.entry.tagline,
      specs: t.products.tiers.entry.specs,
      popular: false,
      image: everydayPerformerImg,
    },
    {
      id: 'core',
      tier: t.products.tiers.core.tier,
      tagColor: '#4169e1',
      tagBg: 'rgba(65,105,225,0.12)',
      dotColor: '#4169e1',
      accentColor: '#4169e1',
      name: t.products.tiers.core.name,
      tagline: t.products.tiers.core.tagline,
      specs: t.products.tiers.core.specs,
      popular: true,
      image: coreGamingImg,
    },
    {
      id: 'performance',
      tier: t.products.tiers.performance.tier,
      tagColor: '#7c3aed',
      tagBg: 'rgba(124,58,237,0.12)',
      dotColor: '#7c3aed',
      accentColor: '#7c3aed',
      name: t.products.tiers.performance.name,
      tagline: t.products.tiers.performance.tagline,
      specs: t.products.tiers.performance.specs,
      popular: false,
      image: performanceBeastImg,
    },
    {
      id: 'elite',
      tier: t.products.tiers.elite.tier,
      tagColor: '#0891b2',
      tagBg: 'rgba(8,145,178,0.12)',
      dotColor: '#0891b2',
      accentColor: '#0891b2',
      name: t.products.tiers.elite.name,
      tagline: t.products.tiers.elite.tagline,
      specs: t.products.tiers.elite.specs,
      popular: false,
      image: elitePowerhouseImg,
    },
  ]

  const stats = [
    { val: '2,500+', lbl: t.products.stat_delivered },
    { val: '99.2%', lbl: t.products.stat_satisfied },
    { val: '48 hrs', lbl: t.products.stat_build_time },
    { val: '8 Yrs',  lbl: t.products.stat_exp_title },
  ]

  return (
    <section id="builds" className="sec" style={{ background: 'var(--bg-2)' }}>
      <div className="sec-inner">
        <div className="builds-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div>
            <span className="sec-label">{t.products.label}</span>
            <h2 className="sec-title" style={{ whiteSpace: 'pre-line' }}>{t.products.title}</h2>
          </div>
          <p className="sec-desc" style={{ margin: 0, maxWidth: '320px', fontSize: '0.875rem' }}>
            {t.products.desc}
          </p>
        </div>

        <div className="builds-grid">
          {builds.map(b => (
            <div key={b.id} className="build-card">
              {b.popular && <div className="popular-badge">{t.products.popular}</div>}

              <div className="build-img-container">
                <img src={b.image} alt={b.name} className="build-img" />
              </div>

              <span className="build-tier-tag" style={{ color: b.tagColor, background: b.tagBg }}>
                {b.tier}
              </span>

              <div>
                <div className="build-name">{b.name}</div>
                <div className="build-tagline" style={{ marginTop: '0.35rem' }}>{b.tagline}</div>
              </div>

              <div className="build-divider" />

              <div className="build-specs">
                {b.specs.map((s, i) => (
                  <div key={i} className="build-spec">
                    <div className="build-spec-dot" style={{ background: b.dotColor }} />
                    {s}
                  </div>
                ))}
              </div>

              <button
                id={`build-${b.id}`}
                className="btn-build"
                onClick={() => onBuild(b)}
              >
                {t.products.build}
              </button>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="stats-row">
          {stats.map((s, i) => (
            <div key={i} className="stat-cell">
              <div className="stat-val">{s.val}</div>
              <div className="stat-lbl">{s.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
