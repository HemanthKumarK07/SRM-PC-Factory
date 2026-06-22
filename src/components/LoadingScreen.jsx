import { useState, useEffect } from 'react'

const LINES = [
  { text: '[SYSTEM CORE] Boot sequence initialized...', cls: 'info' },
  { text: '[HARDWARE] CPU: Core i9-14900K // Link Speed 100GT/s', cls: 'info' },
  { text: '[MEMCHECK] DDR5 6000MHz // 128GB RAM // Status: OK', cls: 'ok' },
  { text: '[COOLING] Custom Liquid Loop // Pump: Active // Temp: 24.5°C', cls: 'ok' },
  { text: '[SECURITY] Firewall secured // UPI sandbox enabled // SSL v3', cls: 'warn' },
  { text: '[SUCCESS] SRM Engine loaded successfully.', cls: 'ok' }
]

export default function LoadingScreen({ onFinish }) {
  const [shown, setShown]   = useState([])
  const [pct, setPct]       = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    // Reveal terminal lines one-by-one with organic pacing
    LINES.forEach((line, i) => {
      setTimeout(() => setShown(p => [...p, i]), 500 + i * 500)
    })

    // Organic loading bar speedups / slowdowns (hits 99% then waits for complete trigger)
    let tick = 0
    const TOTAL = 80
    const timer = setInterval(() => {
      tick++
      setPct(prev => {
        if (prev >= 99) return 99
        // Add slightly randomized increments for realism
        const next = Math.min(99, prev + Math.floor(Math.random() * 3) + 1)
        return next
      })
      if (tick >= TOTAL) clearInterval(timer)
    }, 45)

    // Set 100% when everything is complete
    const t1 = setTimeout(() => {
      setPct(100)
    }, 3600)

    // Fade out and finish loading
    const t2 = setTimeout(() => setFading(true), 4000)
    const t3 = setTimeout(() => onFinish(), 4700)

    return () => {
      clearInterval(timer)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onFinish])

  return (
    <div id="loader" className={fading ? 'fade' : ''}>
      {/* Background grid overlay & scanline */}
      <div className="ld-grid" />
      <div className="ld-scanline" />

      {/* Logo with spinning rings */}
      <div className="ld-logo-wrap">
        <div className="ld-ring-outer" />
        <div className="ld-ring-inner" />
        <div className="ld-pulse" />
        <img src="/logo.png" alt="SRM PC Factory Logo" />
      </div>

      {/* Brand name */}
      <div className="ld-name">SRM <span>PC Factory</span></div>
      <div className="ld-sub">Precision Built · Engineered to Perform</div>

      {/* Terminal block */}
      <div className="ld-terminal">
        {LINES.map((line, i) => (
          <div key={i} className={`ld-line ${shown.includes(i) ? 'show ' + line.cls : ''}`}>
            {line.text}
          </div>
        ))}
        <span className="ld-cursor">█</span>
      </div>

      {/* Progress bar */}
      <div className="ld-bar-wrap">
        <div className="ld-bar-track">
          <div className="ld-bar-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="ld-bar-row">
          <span>LOADING SYSTEMS</span>
          <span>{pct}%</span>
        </div>
      </div>
    </div>
  )
}
