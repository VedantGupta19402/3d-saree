// AARNA — "THE ATELIER AWAKENS" Cinematic Opening Sequence
// Fashion-film title sequence: architectural line draw, editorial typography emergence, and aperture reveal.

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useCloset } from '../store/useCloset'

const MIN_TITLE_DISPLAY = 1200
const MAX_FALLBACK_WAIT = 10000

export default function AtelierOpening() {
  const root = useRef()
  const lineRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const countRef = useRef()
  const progressLineRef = useRef()

  useGSAP(
    () => {
      const shown = { v: 0 }
      const render = () => {
        if (countRef.current) {
          countRef.current.textContent = String(Math.round(shown.v)).padStart(2, '0')
        }
        if (progressLineRef.current) {
          progressLineRef.current.style.transform = `scaleX(${shown.v / 100})`
        }
      }

      // 1. Initial State: Warm ivory screen, line hidden, typography masked
      gsap.set(root.current, { autoAlpha: 1 })
      gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'center' })
      gsap.set('.opening__letter', { yPercent: 120, autoAlpha: 0 })
      gsap.set(subtitleRef.current, { autoAlpha: 0, y: 12 })
      gsap.set('.opening__meta', { autoAlpha: 0 })

      // 2. Step 1: Thin architectural line draws smoothly across the screen
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      tl.to(lineRef.current, {
        scaleX: 1,
        duration: 1.4,
        ease: 'power3.inOut',
        delay: 0.2,
      })
      // 3. Step 2: The AARNA wordmark emerges with sophisticated letter stagger
      .to('.opening__letter', {
        yPercent: 0,
        autoAlpha: 1,
        duration: 1.5,
        stagger: 0.08,
        ease: 'expo.out',
      }, '-=0.6')
      // Subtitle emerges
      .to(subtitleRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 1.0,
      }, '-=1.0')
      // Counter meta fade in
      .to('.opening__meta', {
        autoAlpha: 1,
        duration: 0.8,
      }, '-=0.8')

      // Progress tracker eases towards scene compilation
      const follow = (p) => {
        gsap.to(shown, {
          v: Math.min(p * 100, 99),
          duration: 0.8,
          ease: 'power2.out',
          overwrite: true,
          onUpdate: render,
        })
      }

      follow(useCloset.getState().progress)
      const unsub = useCloset.subscribe((s, prev) => {
        if (s.progress !== prev.progress) follow(s.progress)
      })

      let finished = false
      const concludeSequence = () => {
        if (finished) return
        finished = true
        unsub()

        const el = root.current
        const hide = () => {
          if (el) el.style.display = 'none'
        }

        // Grand exit: numbers hit 100, typography rises smoothly, screen parts like a lens aperture
        const exitTl = gsap.timeline({
          onComplete: hide,
        })

        exitTl
          .to(shown, { v: 100, duration: 0.4, ease: 'power2.inOut', onUpdate: render })
          .to([titleRef.current, subtitleRef.current, '.opening__meta'], {
            y: -24,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.06,
            ease: 'expo.in',
          })
          .to(lineRef.current, {
            scaleY: 0,
            duration: 0.3,
            ease: 'power2.in',
          }, '-=0.4')
          .to(el, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 1.3,
            ease: 'power4.inOut',
          }, '-=0.15')

        // Trigger 3D camera fly-down and Hero typography reveal
        setTimeout(() => useCloset.getState().setReady(), 800)
      }

      const started = performance.now()
      const scenePromise = new Promise((resolve) => {
        if (useCloset.getState().sceneReady) return resolve()
        const unsubReady = useCloset.subscribe((s) => {
          if (s.sceneReady) {
            unsubReady()
            resolve()
          }
        })
      })

      // Wait for minimum aesthetic display time
      scenePromise.then(() => {
        const elapsed = performance.now() - started
        const delay = Math.max(0, MIN_TITLE_DISPLAY - elapsed)
        setTimeout(concludeSequence, delay)
      })

      // Safety timeout so user is never stuck
      const safetyTimer = setTimeout(concludeSequence, MAX_FALLBACK_WAIT)

      return () => {
        clearTimeout(safetyTimer)
        unsub()
      }
    },
    { scope: root },
  )

  return (
    <aside className="opening" ref={root} aria-label="AARNA Atelier Awakening">
      {/* Thin architectural line drawn across the center */}
      <div className="opening__line" ref={lineRef} />

      <div className="opening__content">
        <p className="opening__tagline" ref={subtitleRef}>
          Contemporary Indian Atelier · Edition 2027
        </p>

        <h1 className="opening__brand" ref={titleRef}>
          <span className="opening__letter">A</span>
          <span className="opening__letter">A</span>
          <span className="opening__letter">R</span>
          <span className="opening__letter">N</span>
          <span className="opening__letter">A</span>
        </h1>

        <div className="opening__meta">
          <span className="opening__label">The Atelier Awakens</span>
          <div className="opening__track">
            <div className="opening__bar" ref={progressLineRef} />
          </div>
          <span className="opening__count" ref={countRef}>00</span>
        </div>
      </div>
    </aside>
  )
}

