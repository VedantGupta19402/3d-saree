// AARNA — 01 Cinematic Hero Section
// Editorial oversized typography, spatial camera staging, and interactive CTAs.

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useCloset } from '../store/useCloset'
import { scrollToId } from '../lib/scroll'
import { garments } from '../data/garments'

export default function HeroSection() {
  const root = useRef()
  const ready = useCloset((s) => s.ready)

  useGSAP(
    () => {
      if (!ready) {
        gsap.set('[data-hero-fade]', { autoAlpha: 0, y: 32 })
        gsap.set('.hero-line > span', { yPercent: 120 })
        return
      }

      // Grand choreographed entrance once opening sequence finishes
      const tl = gsap.timeline({ delay: 0.35 })

      tl.to('.hero-line > span', {
        yPercent: 0,
        duration: 1.5,
        ease: 'expo.out',
        stagger: 0.12,
      })
      .to(
        '[data-hero-fade]',
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.08,
        },
        '-=1.2',
      )
    },
    { scope: root, dependencies: [ready] },
  )

  const pullPiece = () => {
    const st = useCloset.getState()
    st.select(st.active)
  }

  return (
    <section id="hero" className="section hero-aarna" ref={root}>
      {/* Top Editorial Metadata */}
      <div className="hero-aarna__meta" data-hero-fade>
        <span className="hero-aarna__edition">Atelier Edition · AW 2027</span>
        <span className="hero-aarna__count">
          {String(garments.length).padStart(2, '0')} Architectural Silhouettes · Real-time 3D
        </span>
      </div>

      {/* Main Editorial Headline */}
      <div className="hero-aarna__editorial">
        <h1 className="hero-aarna__title">
          <span className="hero-line">
            <span>CRAFTED TO</span>
          </span>
          <span className="hero-line">
            <span><em>BE REMEMBERED.</em></span>
          </span>
        </h1>

        <p className="hero-aarna__subtext" data-hero-fade>
          Contemporary silhouettes. Timeless Indian craftsmanship.
        </p>

        <p className="hero-aarna__lede" data-hero-fade>
          Step inside the spatial gallery. Glide across hand-draped Varanasi silks,
          sculptural 24-kali flared lehengas, and architectural tailoring in real-time light.
        </p>

        {/* Action CTAs */}
        <div className="hero-aarna__cta" data-hero-fade>
          <button className="btn btn--solid" onClick={pullPiece}>
            Inspect Silhouette
          </button>
          <button
            className="btn btn--ghost"
            onClick={() => scrollToId('collection')}
          >
            Explore the Collection <span aria-hidden="true">↓</span>
          </button>
          <button
            className="btn btn--text"
            onClick={() => scrollToId('atelier')}
          >
            Discover Our Atelier →
          </button>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="hero-aarna__foot" data-hero-fade>
        <div className="hero-aarna__scroll-pill" onClick={() => scrollToId('collection')}>
          <span className="hero-aarna__mouse" />
          <span>Slide gallery or scroll to wander</span>
        </div>
      </div>
    </section>
  )
}

