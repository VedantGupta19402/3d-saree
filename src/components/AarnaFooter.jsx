// AARNA — 09 Atelier Footer
// Minimalist luxury layout, boutique addresses, newsletter, and brand copyright.

import { useState } from 'react'
import { scrollToId } from '../lib/scroll'
import { useCloset } from '../store/useCloset'

export default function AarnaFooter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const toggleEnquiry = useCloset((s) => s.toggleEnquiry)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
  }

  return (
    <footer className="aarna-footer" role="contentinfo">
      <div className="aarna-footer__inner">
        {/* Top Newsletter & Statement */}
        <div className="aarna-footer__top">
          <div className="aarna-footer__brand-block">
            <h3 className="aarna-footer__logo">AARNA</h3>
            <p className="aarna-footer__tagline">
              Contemporary Indian Atelier · Architectural silhouettes in silk and stone.
            </p>
          </div>

          <div className="aarna-footer__newsletter">
            <p className="aarna-footer__news-label">The Atelier Dispatch</p>
            <p className="aarna-footer__news-sub">
              Seasonal monographs, private exhibition invitations, and textile essays.
            </p>
            {subscribed ? (
              <p className="aarna-footer__subscribed">
                ✓ Welcome to the Atelier Guild. We have noted your presence.
              </p>
            ) : (
              <form className="aarna-footer__form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="aarna-footer__input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="aarna-footer__submit">
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Addresses & Navigation */}
        <div className="aarna-footer__middle">
          <div className="aarna-footer__col">
            <h4 className="aarna-footer__col-title">Ateliers & Salons</h4>
            <address className="aarna-footer__address">
              <strong>New Delhi</strong><br />
              The Dhan Mill, 100 Feet Road<br />
              Chhatarpur, New Delhi 110074
            </address>
            <address className="aarna-footer__address">
              <strong>Mumbai</strong><br />
              Kala Ghoda Arts Precinct<br />
              Fort, Mumbai 400001
            </address>
            <address className="aarna-footer__address">
              <strong>London</strong><br />
              Private Salon, Mayfair<br />
              London W1K
            </address>
          </div>

          <div className="aarna-footer__col">
            <h4 className="aarna-footer__col-title">Exhibition Navigation</h4>
            <ul className="aarna-footer__links">
              <li><button onClick={() => scrollToId('hero')}>01 Spatial Gallery</button></li>
              <li><button onClick={() => scrollToId('collection')}>02 The Collection</button></li>
              <li><button onClick={() => scrollToId('craft')}>03 Craft & Textile Heritage</button></li>
              <li><button onClick={() => scrollToId('signature')}>04 Signature Statements</button></li>
              <li><button onClick={() => scrollToId('woman')}>05 The AARNA Woman</button></li>
              <li><button onClick={() => scrollToId('atelier')}>06 Our Guild & Artisans</button></li>
              <li><button onClick={() => scrollToId('lookbook')}>07 Autumn/Winter Lookbook</button></li>
            </ul>
          </div>

          <div className="aarna-footer__col">
            <h4 className="aarna-footer__col-title">Private Services</h4>
            <ul className="aarna-footer__links">
              <li><button onClick={() => toggleEnquiry(true)}>Bespoke Bridal Appointments</button></li>
              <li><button onClick={() => toggleEnquiry(true)}>Master Measuring Service</button></li>
              <li><button onClick={() => toggleEnquiry(true)}>Textile Conservation & Archiving</button></li>
              <li><a href="mailto:concierge@aarna-atelier.com">concierge@aarna-atelier.com</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Baseline Bar */}
        <div className="aarna-footer__bottom">
          <span>© 2027 AARNA ATELIER. All rights reserved.</span>
          <span>Three.js · WebGL Spatial Stage · GSAP Motion</span>
          <span>Bespoke Handloom Guilds of India</span>
        </div>
      </div>
    </footer>
  )
}

