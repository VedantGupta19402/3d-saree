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
