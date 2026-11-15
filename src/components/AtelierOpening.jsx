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
