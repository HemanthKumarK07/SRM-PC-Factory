import { CheckCircle, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '24,999',
    usd: '299',
    period: 'one-time',
    tag: 'Perfect for home use',
    features: [
      'Intel Core i5-13400F',
      'RTX 3060 12GB',
      '16GB DDR4 RAM',
      '512GB NVMe SSD',
      '6-month warranty',
      'Online support',
    ],
    color: '#00ffcc',
    popular: false,
  },
  {
    name: 'Pro Gaming',
    price: '59,999',
    usd: '719',
    period: 'one-time',
    tag: 'Most Popular 🔥',
    features: [
      'Intel Core i7-14700K',
      'RTX 4070 Ti 12GB',
      '32GB DDR5 6000MHz',
      '2TB NVMe Gen4 SSD',
      '2-year warranty',
      '24/7 priority support',
      'Free cable management',
      'Custom RGB lighting',
    ],
    color: '#00d4ff',
    popular: true,
  },
  {
    name: 'Workstation',
    price: '1,09,999',
    usd: '1,319',
    period: 'one-time',
    tag: 'Professional grade',
    features: [
      'Intel Core i9-14900K',
      'RTX 4090 24GB',
      '128GB DDR5 ECC RAM',
      '4TB NVMe + 8TB HDD',
      '3-year warranty',
      'On-site support',
      'Free OS installation',
      'Quarterly maintenance',
    ],
    color: '#a78bfa',
    popular: false,
  },
]

export default function Pricing({ onOrderClick }) {
  return (
    <section id="pricing" style={{ padding: '100px 2rem', background: 'linear-gradient(180deg, #070d1c 0%, #050a14 100%)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div className="section-header">
          <div className="section-tag">💰 Pricing</div>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>Transparent Pricing</h2>
          <p style={{ color: 'rgba(226,232,240,0.5)', fontSize: '1rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.8 }}>
            No hidden fees. No surprise charges. What you see is what you get — with SRM quality guaranteed.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>
          {plans.map((plan, i) => (
            <div
              key={i}
              className="price-card"
              style={{ borderColor: plan.popular ? plan.color : undefined }}
            >
              {plan.popular && (
                <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: `linear-gradient(135deg, #0080ff, #00d4ff)`, borderRadius: '100px', padding: '5px 20px', fontSize: '0.7rem', fontFamily: 'Orbitron, sans-serif', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', letterSpacing: '1px', boxShadow: '0 0 20px rgba(0,212,255,0.4)' }}>
                  ★ MOST POPULAR
                </div>
              )}

              {/* Plan header */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: plan.color, marginBottom: '0.4rem' }}>{plan.tag}</div>
                <div style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: '#e2e8f0' }}>{plan.name}</div>
              </div>

              {/* Price */}
              <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '1rem', color: 'rgba(226,232,240,0.5)' }}>₹</span>
                  <span style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: '2.2rem', color: plan.color }}>{plan.price}</span>
                </div>
                <div style={{ color: 'rgba(226,232,240,0.35)', fontSize: '0.8rem', marginTop: '4px' }}>≈ ${plan.usd} USD · {plan.period}</div>
              </div>

              {/* Features */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                {plan.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', color: 'rgba(226,232,240,0.75)' }}>
                    <CheckCircle size={16} style={{ color: plan.color, flexShrink: 0 }} />
                    {f}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={onOrderClick}
                className={plan.popular ? 'btn-primary' : ''}
                style={!plan.popular ? {
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  width: '100%', background: 'transparent', border: `1.5px solid ${plan.color}60`,
                  borderRadius: '100px', padding: '13px', color: plan.color,
                  fontFamily: 'Rajdhani, sans-serif', fontWeight: 700, fontSize: '0.95rem',
                  letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'all 0.3s',
                } : { width: '100%', justifyContent: 'center', padding: '13px' }}
                onMouseEnter={e => { if (!plan.popular) { e.currentTarget.style.background = `${plan.color}15`; e.currentTarget.style.borderColor = plan.color } }}
                onMouseLeave={e => { if (!plan.popular) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = `${plan.color}60` } }}
              >
                Order This Build <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Custom build note */}
        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '1.5rem', background: 'rgba(0,212,255,0.05)', border: '1px dashed rgba(0,212,255,0.2)', borderRadius: '1rem' }}>
          <p style={{ color: 'rgba(226,232,240,0.6)', fontSize: '0.95rem' }}>
            Need something different? &nbsp;
            <button
              onClick={onOrderClick}
              style={{ background: 'none', border: 'none', color: '#00d4ff', cursor: 'pointer', fontWeight: 600, textDecoration: 'underline', fontSize: '0.95rem' }}
            >
              Request a custom quote →
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}
