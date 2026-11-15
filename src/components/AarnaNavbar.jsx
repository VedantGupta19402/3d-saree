// AARNA — Floating Editorial Navigation
// Transparent hero state, frosted warm ivory on scroll, and full-screen mobile menu.

import { useState, useEffect } from 'react'
import { useCloset } from '../store/useCloset'
import { scrollToId } from '../lib/scroll'

const NAV_LINKS = [
  ['hero', 'Atelier'],
  ['collection', 'Collection'],
  ['craft', 'Craft & Texture'],
  ['signature', 'Signatures'],
  ['atelier', 'Our Atelier'],
  ['lookbook', 'Lookbook'],
]

export default function AarnaNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const section = useCloset((s) => s.section)
  const bagCount = useCloset((s) => s.bag.reduce((sum, item) => sum + item.quantity, 0))
  const toggleBag = useCloset((s) => s.toggleBag)
  const toggleEnquiry = useCloset((s) => s.toggleEnquiry)
  const currency = useCloset((s) => s.currency)
  const toggleCurrency = useCloset((s) => s.toggleCurrency)
  const ready = useCloset((s) => s.ready)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (id) => {
    scrollToId(id)
    setMobileOpen(false)
  }

  return (
    <>
      <header
        className={`aarna-nav ${ready ? 'is-ready' : ''} ${isScrolled ? 'is-scrolled' : ''}`}
        role="banner"
      >
        <div className="aarna-nav__inner">
          {/* Left: Brand Wordmark */}
          <div className="aarna-nav__left">
            <button
              className="aarna-nav__brand"
              onClick={() => handleNavClick('hero')}
              aria-label="AARNA Atelier, return to top"
            >
              <span className="aarna-nav__crest" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 3 L3 20 H7 L9.5 15 H14.5 L17 20 H21 Z" />
                  <path d="M10.5 13 H13.5" />
                </svg>
              </span>
              <span className="aarna-nav__logo">AARNA</span>
            </button>
          </div>

          {/* Centre: Desktop Navigation Links */}
          <nav className="aarna-nav__center" aria-label="Main gallery navigation">
            {NAV_LINKS.map(([id, label]) => (
              <button
                key={id}
                className={`aarna-nav__link ${section === id ? 'is-active' : ''}`}
                onClick={() => handleNavClick(id)}
              >
                <span>{label}</span>
                {section === id && <span className="aarna-nav__pill" />}
              </button>
            ))}
          </nav>

          {/* Right: Currency, Enquiries & Bag */}
          <div className="aarna-nav__right">
            <button
              className="aarna-nav__action aarna-nav__currency"
              onClick={toggleCurrency}
              aria-label={`Toggle currency, currently ${currency}`}
              title="Toggle USD / INR"
            >
              {currency}
            </button>

            <button
              className="aarna-nav__action aarna-nav__enquiry-btn"
              onClick={() => toggleEnquiry(true)}
            >
              Enquiries
            </button>

            <button
              className="aarna-nav__bag-btn"
              onClick={() => toggleBag(true)}
              aria-label={`Shopping bag containing ${bagCount} items`}
            >
              <span className="aarna-nav__bag-text">Bag</span>
              <span className="aarna-nav__bag-badge">{bagCount}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              className={`aarna-nav__burger ${mobileOpen ? 'is-active' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Editorial Mobile Navigation Drawer */}
      <div
        className={`aarna-drawer ${mobileOpen ? 'is-open' : ''}`}
        aria-hidden={!mobileOpen}
        data-lenis-prevent
      >
        <div className="aarna-drawer__backdrop" onClick={() => setMobileOpen(false)} />
        <div className="aarna-drawer__panel">
          <div className="aarna-drawer__head">
            <span className="aarna-drawer__brand">AARNA</span>
            <button
              className="aarna-drawer__close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="aarna-drawer__links">
            {NAV_LINKS.map(([id, label], i) => (
              <button
                key={id}
                className="aarna-drawer__link"
                style={{ '--i': i }}
                onClick={() => handleNavClick(id)}
              >
                <span className="aarna-drawer__num">0{i + 1}</span>
                <span className="aarna-drawer__title">{label}</span>
              </button>
            ))}
          </div>

          <div className="aarna-drawer__footer">
            <div className="aarna-drawer__actions">
              <button
                className="btn btn--solid btn--wide"
                onClick={() => {
                  setMobileOpen(false)
                  toggleEnquiry(true)
                }}
              >
                Private Atelier Consultation
              </button>
              <button
                className="btn btn--ghost btn--wide"
                onClick={() => {
                  setMobileOpen(false)
                  toggleBag(true)
                }}
              >
                View Atelier Bag ({bagCount})
              </button>
            </div>
            <p className="aarna-drawer__meta">New Delhi · Mumbai · London</p>
          </div>
        </div>
      </div>
    </>
  )
}

