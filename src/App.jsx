import { useState, useCallback, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PaymentModal from './components/PaymentModal'
import PrivacyModal from './components/PrivacyModal'
import { useLanguage } from './components/LanguageContext'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [hash, setHash]       = useState(window.location.hash)
  const { t }                 = useLanguage()

  const handleLoadingFinish = useCallback(() => setLoading(false), [])

  // Sync hash state with browser history changes (back/forward buttons)
  useEffect(() => {
    const handleHash = () => {
      const currentHash = window.location.hash
      if (!currentHash) {
        window.location.reload()
      } else {
        setHash(currentHash)
      }
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // Centralized scroll handler for section navigation
  useEffect(() => {
    if (!loading && hash) {
      const target = hash.substring(1)
      // Check if the hash is a section ID on the page
      if (['home', 'about', 'builds', 'contact'].includes(target)) {
        setTimeout(() => {
          document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    } else if (!loading && !hash) {
      // scroll to top if empty hash
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [loading, hash])

  // Parse modals based on hash routing
  const showPrivacy = hash === '#privacy'
  const isBooking   = hash.startsWith('#book-')
  const buildId     = isBooking ? hash.replace('#book-', '') : null

  // Reconstruct selected build dynamically in current language
  let selectedBuild = null
  if (buildId && t.products.tiers[buildId]) {
    selectedBuild = {
      id: buildId,
      name: t.products.tiers[buildId].name,
      tier: t.products.tiers[buildId].tier
    }
  }
  const showPayment = !!selectedBuild

  const closeModals = () => {
    // Return to the page context that spawned the modal
    const prevSection = showPrivacy ? '#contact' : '#builds'
    window.location.hash = prevSection
  }

  return (
    <>
      {loading && <LoadingScreen onFinish={handleLoadingFinish} />}

      {!loading && (
        <div style={{ opacity: 0, animation: 'siteIn 0.5s ease 0.1s forwards' }}>
          <Navbar />
          <Hero onBuild={() => { window.location.hash = '#builds' }} />
          <About />
          <Products onBuild={(build) => { window.location.hash = '#book-' + build.id }} />
          <Contact />
          <Footer onOpenPrivacy={() => { window.location.hash = '#privacy' }} />
        </div>
      )}

      {showPayment && (
        <PaymentModal
          build={selectedBuild}
          onClose={closeModals}
        />
      )}

      {showPrivacy && (
        <PrivacyModal
          onClose={closeModals}
        />
      )}
    </>
  )
}
