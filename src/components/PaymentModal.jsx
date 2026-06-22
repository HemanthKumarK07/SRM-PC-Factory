import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { X, AlertTriangle, Copy, Check, Lock } from 'lucide-react'
import { useLanguage } from './LanguageContext'

// ─── ⚙️  CONFIGURATION ────────────────────────────────────────────────────────
const UPI_ID      = 'hemanthkumarkumaravel@okaxis'
const UPI_NAME    = 'Raja'
const AMOUNT      = '129'   // ← ₹129 for testing / production
const GOOGLE_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLScuIvCwT4mFyrd9h8OHWTIu8brVnE4CeuYG7s44_00joWxug/viewform'
// ──────────────────────────────────────────────────────────────────────────────

// Generates a standard UPI deep-link that any UPI app can scan
const makeUpiUrl = (note) =>
  `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(UPI_NAME)}&am=${AMOUNT}&cu=INR&tn=${encodeURIComponent(note)}`

export default function PaymentModal({ build, onClose }) {
  const { t } = useLanguage()

  const [step,    setStep]   = useState('details')  // details | qr | success
  const [agreed,  setAgreed] = useState(false)
  const [copied,  setCopied] = useState(false)
  const [utr,     setUtr]    = useState('')
  const [details, setDetails] = useState({ name: '', email: '', phone: '' })
  const [errors,  setErrors]  = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [backendError, setBackendError] = useState('')

  const setD = (k, v) => setDetails(d => ({ ...d, [k]: v }))

  const validate = () => {
    const e = {}
    if (!details.name.trim())                          e.name  = 'Required'
    if (!details.email.includes('@'))                  e.email = 'Valid email required'
    if (details.phone.replace(/\D/g,'').length < 10)   e.phone = '10-digit number required'
    if (!agreed)                                       e.agreed = 'Please accept the disclaimer'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateUtr = () => {
    const e = {}
    const cleanUtr = utr.replace(/[\s\-]/g, '')
    if (!/^\d{12}$/.test(cleanUtr)) {
      e.utr = 'Please enter a valid 12-digit UPI transaction ID / UTR number.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleConfirmPayment = async () => {
    setBackendError('')
    if (!validateUtr()) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/validate-utr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          utr,
          email: details.email,
          name: details.name,
          buildName: build?.name,
          buildTier: build?.tier
        })
      })

      const data = await response.json()
      if (response.ok && data.ok) {
        setStep('success')
      } else {
        setBackendError(data.error || 'Secure transaction verification failed.')
      }
    } catch (err) {
      setBackendError('Failed to connect to the secure order confirmation server. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyUpi = () => {
    navigator.clipboard.writeText(UPI_ID)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openForm = () => { window.open(GOOGLE_FORM, '_blank'); onClose() }

  const upiUrl = makeUpiUrl(`SRM PC Factory Booking - ${build?.name || 'Custom PC'}`)

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}><X size={15} /></button>

        {/* ══════════════ STEP 1 — DETAILS ══════════════ */}
        {step === 'details' && (
          <>
            <div className="modal-head">
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.62rem', letterSpacing:'0.15em', color:'var(--blue-light)', textTransform:'uppercase', marginBottom:'0.4rem' }}>
                {build?.tier || t.payment.booking} · {t.payment.booking}
              </div>
              <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.3rem', color:'var(--text-1)', letterSpacing:'-0.02em', marginBottom:'0.25rem' }}>
                {t.payment.confirm}
              </h2>
              <p style={{ fontSize:'0.8rem', color:'var(--text-2)' }}>{build?.name}</p>
            </div>

            <div className="modal-body">
              {/* Disclaimer */}
              <div className="disc-box">
                <div className="disc-title"><AlertTriangle size={13} /> {t.payment.read_before}</div>
                <div className="disc-text">
                  {t.payment.disclaimer_text.replace('{amount}', AMOUNT)}
                </div>
                <label className="disc-check">
                  <input
                    id="agree-chk"
                    type="checkbox"
                    checked={agreed}
                    onChange={e => setAgreed(e.target.checked)}
                  />
                  <span>{t.payment.disclaimer_chk.replace('{amount}', AMOUNT)}</span>
                </label>
                {errors.agreed && <div className="form-err" style={{ marginTop:'6px' }}>⚠ {errors.agreed}</div>}
              </div>

              {/* Amount chip */}
              <div className="amount-row">
                <div>
                  <div className="amount-lbl">{t.payment.advance_lbl}</div>
                  <div className="amount-note">{t.payment.advance_note}</div>
                </div>
                <div className="amount-val">₹{AMOUNT}</div>
              </div>

              <span className="sec-micro">{t.payment.your_details}</span>

              <div className="form-g">
                <label className="form-lbl">{t.payment.lbl_name}</label>
                <input id="pm-name" className="form-inp" placeholder="Raja" value={details.name} onChange={e => setD('name', e.target.value)} />
                {errors.name && <div className="form-err">⚠ {errors.name}</div>}
              </div>

              <div className="form-row">
                <div className="form-g" style={{ marginBottom:0 }}>
                  <label className="form-lbl">{t.payment.lbl_email}</label>
                  <input id="pm-email" className="form-inp" placeholder="you@email.com" type="email" value={details.email} onChange={e => setD('email', e.target.value)} />
                  {errors.email && <div className="form-err">⚠ {errors.email}</div>}
                </div>
                <div className="form-g" style={{ marginBottom:0 }}>
                  <label className="form-lbl">{t.payment.lbl_phone}</label>
                  <input id="pm-phone" className="form-inp" placeholder="9876543210" type="tel" value={details.phone} onChange={e => setD('phone', e.target.value)} />
                  {errors.phone && <div className="form-err">⚠ {errors.phone}</div>}
                </div>
              </div>

              <button
                id="pm-continue-btn"
                className="btn-p"
                style={{ width:'100%', justifyContent:'center', marginTop:'1rem', padding:'13px' }}
                onClick={() => { if (validate()) setStep('qr') }}
              >
                {t.payment.btn_continue}
              </button>

              <p style={{ textAlign:'center', fontSize:'0.7rem', color:'var(--text-3)', marginTop:'0.65rem', display:'flex', justifyContent:'center', alignItems:'center', gap:'5px' }}>
                <Lock size={11} /> {t.payment.sec_payment}
              </p>
            </div>
          </>
        )}

        {/* ══════════════ STEP 2 — UPI QR ══════════════ */}
        {step === 'qr' && (
          <>
            <div className="modal-head">
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.62rem', letterSpacing:'0.15em', color:'var(--blue-light)', textTransform:'uppercase', marginBottom:'0.4rem' }}>
                {t.payment.step_2}
              </div>
              <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.3rem', color:'var(--text-1)', letterSpacing:'-0.02em' }}>
                {t.payment.pay_via.replace('{amount}', AMOUNT)}
              </h2>
            </div>

            <div className="modal-body">
              {/* QR Code */}
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem', marginBottom:'1.25rem' }}>
                <div style={{ background:'#fff', borderRadius:'12px', padding:'16px', display:'inline-flex' }}>
                  <QRCodeSVG
                    value={upiUrl}
                    size={180}
                    level="H"
                    includeMargin={false}
                    style={{ borderRadius:'4px' }}
                  />
                </div>
                <div style={{ textAlign:'center' }}>
                  <p style={{ fontSize:'0.78rem', color:'var(--text-2)', marginBottom:'0.35rem' }}>
                    {t.payment.scan_with}
                  </p>
                  <div style={{ display:'flex', gap:'0.35rem', justifyContent:'center', flexWrap:'wrap' }}>
                    {['PhonePe', 'Google Pay', 'Paytm', 'BHIM'].map(app => (
                      <span key={app} style={{ fontSize:'0.65rem', fontFamily:'JetBrains Mono,monospace', background:'var(--bg-4)', border:'1px solid var(--border)', borderRadius:'5px', padding:'2px 8px', color:'var(--text-3)' }}>
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', margin:'0 0 1.25rem' }}>
                <div style={{ flex:1, height:'1px', background:'var(--border)' }} />
                <span style={{ fontSize:'0.7rem', color:'var(--text-3)', fontFamily:'JetBrains Mono,monospace' }}>{t.payment.or_pay}</span>
                <div style={{ flex:1, height:'1px', background:'var(--border)' }} />
              </div>

              {/* UPI ID copy row */}
              <div style={{ background:'var(--bg-3)', border:'1px solid var(--border)', borderRadius:'10px', padding:'1rem 1.1rem', marginBottom:'1.25rem' }}>
                <div style={{ fontSize:'0.68rem', fontFamily:'JetBrains Mono,monospace', color:'var(--text-3)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'0.4rem' }}>UPI ID</div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'0.75rem' }}>
                  <div>
                    <div style={{ fontFamily:'Space Grotesk,sans-serif', fontWeight:700, fontSize:'1rem', color:'var(--text-1)', letterSpacing:'0.01em' }}>{UPI_ID}</div>
                    <div style={{ fontSize:'0.72rem', color:'var(--text-2)', marginTop:'2px' }}>{t.payment.send_exactly.replace('{amount}', AMOUNT)}<strong style={{ color:'var(--blue-light)' }}>₹{AMOUNT}</strong> — {UPI_NAME}</div>
                  </div>
                  <button
                    id="copy-upi-btn"
                    onClick={copyUpi}
                    style={{ background: copied ? 'rgba(74,222,128,0.1)' : 'var(--bg-4)', border:`1px solid ${copied ? 'rgba(74,222,128,0.3)' : 'var(--border)'}`, borderRadius:'7px', padding:'7px 10px', cursor:'pointer', color: copied ? '#4ade80' : 'var(--text-2)', display:'flex', alignItems:'center', gap:'5px', fontSize:'0.75rem', fontFamily:'Space Grotesk,sans-serif', fontWeight:600, whiteSpace:'nowrap', transition:'all 0.2s', flexShrink:0 }}
                  >
                    {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
                  </button>
                </div>
              </div>

              {/* UTR input */}
              <div className="form-g">
                <label className="form-lbl">{t.payment.enter_utr}</label>
                <input
                  id="utr-input"
                  className="form-inp"
                  placeholder="e.g. 123456789012"
                  value={utr}
                  onChange={e => setUtr(e.target.value)}
                  style={{ fontFamily:'JetBrains Mono,monospace', letterSpacing:'0.05em' }}
                />
                <div style={{ fontSize:'0.7rem', color:'var(--text-3)', marginTop:'4px' }}>
                  {t.payment.find_utr}
                </div>
                {errors.utr && <div className="form-err">⚠ {errors.utr}</div>}
                {backendError && <div className="form-err">⚠ {backendError}</div>}
              </div>

              {/* Order summary */}
              <div style={{ background:'var(--bg-3)', border:'1px solid var(--border)', borderRadius:'8px', padding:'0.75rem 1rem', marginBottom:'1rem', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div style={{ fontSize:'0.78rem', color:'var(--text-2)' }}>
                  <div style={{ fontWeight:600, color:'var(--text-1)' }}>{build?.name}</div>
                  <div style={{ marginTop:'1px' }}>{details.name} · {details.phone}</div>
                </div>
                <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'1.25rem', color:'var(--blue-light)' }}>₹{AMOUNT}</div>
              </div>

              <button
                id="confirm-paid-btn"
                className="btn-p"
                style={{ width:'100%', justifyContent:'center', padding:'13px', marginBottom:'0.5rem', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                onClick={handleConfirmPayment}
                disabled={isSubmitting}
              >
                {isSubmitting ? t.payment.verifying : t.payment.btn_confirm}
              </button>

              <button
                onClick={() => setStep('details')}
                style={{ background:'none', border:'none', color:'var(--text-3)', fontSize:'0.8rem', cursor:'pointer', fontFamily:'Space Grotesk,sans-serif', width:'100%', textAlign:'center', padding:'6px' }}
              >
                {t.payment.back}
              </button>
            </div>
          </>
        )}

        {/* ══════════════ STEP 3 — SUCCESS ══════════════ */}
        {step === 'success' && (
          <div className="success-wrap">
            <div className="success-icon">✓</div>
            <div className="process-title">{t.payment.confirmed}</div>
            <p className="process-sub" style={{ marginTop:'0.5rem', lineHeight:1.75, maxWidth:'300px', margin:'0.5rem auto 0' }}>
              {t.payment.thank_you.replace('{name}', details.name).replace('{email}', details.email)}
            </p>

            {/* Receipt */}
            <div style={{ background:'var(--bg-3)', border:'1px solid var(--border)', borderRadius:'10px', padding:'1rem', margin:'1.5rem 0', textAlign:'left' }}>
              <div style={{ fontFamily:'JetBrains Mono,monospace', fontSize:'0.6rem', color:'var(--text-3)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:'0.5rem' }}>{t.payment.receipt}</div>
              {[
                [t.payment.r_build,     build?.name    || '—'],
                [t.payment.r_tier,      build?.tier    || '—'],
                [t.payment.r_name,      details.name],
                [t.payment.r_email,     details.email],
                [t.payment.r_phone,     details.phone],
                [t.payment.r_utr,       utr],
                [t.payment.r_amount,    `₹${AMOUNT}`],
              ].map(([k, v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'4px 0', borderBottom:'1px solid var(--border)', fontSize:'0.78rem' }}>
                  <span style={{ color:'var(--text-3)' }}>{k}</span>
                  <span style={{ color: k === t.payment.r_amount ? '#4ade80' : 'var(--text-1)', fontWeight: k === t.payment.r_amount ? 700 : 500, fontFamily: k === t.payment.r_utr ? 'JetBrains Mono,monospace' : 'inherit', maxWidth:'55%', textAlign:'right', wordBreak:'break-all' }}>{v}</span>
                </div>
              ))}
            </div>

            <button
              id="open-form-btn"
              className="btn-p"
              style={{ width:'100%', justifyContent:'center', padding:'13px', marginBottom:'0.75rem' }}
              onClick={openForm}
            >
              {t.payment.btn_form}
            </button>
            <button
              onClick={onClose}
              style={{ background:'none', border:'none', color:'var(--text-3)', fontSize:'0.8rem', cursor:'pointer', fontFamily:'Space Grotesk,sans-serif' }}
            >
              {t.payment.btn_later}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
