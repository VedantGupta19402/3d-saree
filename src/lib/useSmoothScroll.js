// AARNA — Lenis Smooth Scrolling & ScrollTrigger Camera Choreography
// Synchronized section markers and cinematic camera choreography across the 3D gallery.

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { scroll } from './scroll'
import { rail } from '../three/railState'
import { useCloset } from '../store/useCloset'

gsap.registerPlugin(ScrollTrigger)

// Camera choreography poses per section
const POSES = {
  collection: { px: -1.6, py: 2.2, pz: 6.8, lx: 0.8, ly: 1.25, lz: 0 },
  craft: { px: 0.65, py: 1.55, pz: 2.4, lx: -0.65, ly: 1.35, lz: 0 },
  signature: { px: -0.4, py: 1.45, pz: 3.2, lx: 0.3, ly: 1.3, lz: 0 },
  woman: { px: 1.2, py: 2.0, pz: 5.5, lx: -0.5, ly: 1.35, lz: 0 },
  atelier: { px: -0.8, py: 1.6, pz: 4.2, lx: 0.4, ly: 1.3, lz: 0 },
  lookbook: { px: 0.2, py: 1.8, pz: 4.8, lx: -0.2, ly: 1.4, lz: 0 },
  outro: { px: 0, py: 0.85, pz: 3.6, lx: 0, ly: 1.5, lz: 0 },
}

const SECTION_IDS = ['hero', 'collection', 'craft', 'signature', 'woman', 'atelier', 'lookbook', 'outro']

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9 })
    scroll.lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    lenis.stop()

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power1.inOut', duration: 1 },
        scrollTrigger: { trigger: '#scroll-root', start: 'top top', end: 'bottom bottom', scrub: 1.2 },
      })

      tl.to(rail.cam, POSES.collection)
        .to(rail.cam, POSES.craft)
        .to(rail.cam, POSES.signature)
        .to(rail.cam, POSES.woman)
        .to(rail.cam, POSES.atelier)
        .to(rail.cam, POSES.lookbook)
        .to(rail.cam, POSES.outro)

      for (const id of SECTION_IDS) {
        ScrollTrigger.create({
          trigger: `#${id}`,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && useCloset.getState().setSection(id),
        })
      }
    })

    // Unlock scrolling once ready; keep it locked while inspection drawer is open
    const unsub = useCloset.subscribe((s, prev) => {
      if (s.ready && !prev.ready && s.selected === null) lenis.start()
      if (s.selected !== prev.selected) {
        if (s.selected !== null) lenis.stop()
        else if (s.ready) lenis.start()
      }
    })

    return () => {
      unsub()
      ctx.revert()
      gsap.ticker.remove(tick)
      lenis.destroy()
      scroll.lenis = null
    }
  }, [])
}
