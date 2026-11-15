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
