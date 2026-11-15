// AARNA — 07 Product Inspection Experience
// Detailed craftsmanship panel with interactive colorways, bespoke sizing, and 3D navigation.

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useCloset } from '../store/useCloset'
import { garments, formatPrice, formatInr } from '../data/garments'

export default function AarnaInspectPanel() {
  const root = useRef()
  const selected = useCloset((s) => s.selected)
  const colors = useCloset((s) => s.colors)
  const sizes = useCloset((s) => s.sizes)
  const currency = useCloset((s) => s.currency)
  const addToBag = useCloset((s) => s.addToBag)
  const toggleEnquiry = useCloset((s) => s.toggleEnquiry)

  const [shown, setShown] = useState(null)
  const open = selected !== null

  useEffect(() => {
    if (selected !== null) setShown(selected)
  }, [selected])

  useGSAP(
    () => {
      const mobile = window.matchMedia('(max-width: 820px)').matches
      const from = mobile ? { yPercent: 105, xPercent: 0 } : { xPercent: 105, yPercent: 0 }
      if (open) {
        gsap.set(root.current, { visibility: 'visible' })
        gsap.fromTo(
          root.current,
          from,
          { xPercent: 0, yPercent: 0, duration: 1.15, ease: 'expo.out', delay: 0.15, overwrite: true },
        )
      } else {
        gsap.to(root.current, {
          ...from,
          duration: 0.7,
          ease: 'expo.in',
          overwrite: true,
          onComplete: () => gsap.set(root.current, { visibility: 'hidden' }),
        })
      }
    },
    { dependencies: [open] },
  )

  useGSAP(
    () => {
      if (selected === null) return
      gsap.fromTo(
        '[data-stagger-aarna]',
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.85, ease: 'expo.out', stagger: 0.04, delay: 0.25 },
      )
    },
    { scope: root, dependencies: [selected] },
  )

  const item = shown !== null ? garments[shown] : garments[0]
  const colorIndex = colors[item.id] ?? 0
  const size = sizes[item.id] ?? item.sizes[0]
  const st = useCloset.getState

  return (
    <aside
      className="inspect-aarna"
      ref={root}
      aria-hidden={!open}
      aria-label="Atelier garment details"
      style={{ visibility: 'hidden' }}
    >
      {/* Top Header Bar */}
      <div className="inspect-aarna__bar" data-stagger-aarna>
        <span className="inspect-aarna__count">
          0{String((shown ?? 0) + 1)} <span>/ 0{String(garments.length)}</span>
        </span>

        <div className="inspect-aarna__nav">
          <button
            onClick={() => st().selectNext(-1)}
            aria-label="Previous silhouette"
            className="inspect-nav-btn"
          >
            ←
          </button>
          <button
            onClick={() => st().selectNext(1)}
            aria-label="Next silhouette"
            className="inspect-nav-btn"
          >
            →
          </button>
          <button
            className="inspect-aarna__close"
            onClick={() => st().close()}
            aria-label="Return to gallery"
          >
