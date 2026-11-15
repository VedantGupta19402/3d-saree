import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useCloset } from '../store/useCloset'
import { waitForFonts, STAGES } from '../lib/preload'

// Long enough for the wordmark to land, short enough to never feel like waiting.
const MIN_DISPLAY = 1100
// Whatever happens, the site is revealed after this long.
const MAX_WAIT = 12000

const LOADING_PHASES = [
  { threshold: 0, text: 'Initializing 3D environment' },
  { threshold: 25, text: 'Weaving procedural fabrics' },
  { threshold: 55, text: 'Calibrating studio lighting' },
  { threshold: 80, text: 'Polishing rail & kinematics' },
  { threshold: 98, text: 'Wardrobe ready' },
]

const getPhaseText = (val) => {
  for (let i = LOADING_PHASES.length - 1; i >= 0; i--) {
    if (val >= LOADING_PHASES[i].threshold) return LOADING_PHASES[i].text
  }
  return LOADING_PHASES[0].text
}

export default function Loader() {
  const root = useRef()
  const innerRef = useRef()
  const curtainTop = useRef()
  const curtainBottom = useRef()
  const count = useRef()
  const bar = useRef()
  const phaseRef = useRef()

  useGSAP(
    () => {
      const shown = { v: 0 }
      const render = () => {
        const rounded = Math.round(shown.v)
        if (count.current) {
          count.current.textContent = String(rounded).padStart(3, '0')
        }
        if (bar.current) {
          bar.current.style.transform = `scaleX(${shown.v / 100})`
        }
        if (phaseRef.current) {
          phaseRef.current.textContent = getPhaseText(shown.v)
        }
      }

      // Counter eases towards real progress; it holds at 99 until the exit begins.
      const follow = (p) =>
        gsap.to(shown, { v: Math.min(p * 100, 99), duration: 0.6, ease: 'power2.out', overwrite: true, onUpdate: render })

      // Entrance animation for brand elements
      gsap.from('.loader__crest', { scale: 0.7, autoAlpha: 0, duration: 1.1, ease: 'expo.out' })
      gsap.from('.loader__tag', { y: 16, autoAlpha: 0, duration: 0.9, delay: 0.1, ease: 'expo.out' })
      gsap.from('.loader__word', { yPercent: 110, duration: 1.2, delay: 0.15, ease: 'expo.out' })
      gsap.from('.loader__status', { y: 14, autoAlpha: 0, duration: 0.8, delay: 0.25, ease: 'expo.out' })
      gsap.from('.loader__progress-wrap', { y: 18, autoAlpha: 0, duration: 0.9, delay: 0.35, ease: 'expo.out' })

      follow(useCloset.getState().progress)
      const unsubProgress = useCloset.subscribe((s, prev) => s.progress !== prev.progress && follow(s.progress))

      let finished = false
      const finish = () => {
        if (finished) return
        finished = true
        unsubProgress()
        const el = root.current
        const hide = () => {
          if (el) el.style.display = 'none'
        }

        if (phaseRef.current) {
          phaseRef.current.textContent = 'Welcome to the Atelier'
        }

        gsap
          .timeline()
          .to(shown, { v: 100, duration: 0.35, ease: 'power2.inOut', overwrite: true, onUpdate: render })
          .to(innerRef.current, { y: -28, autoAlpha: 0, duration: 0.55, ease: 'expo.in' })
          .to(curtainTop.current, { yPercent: -101, duration: 0.95, ease: 'power4.inOut' }, '-=0.15')
          .to(curtainBottom.current, { yPercent: 101, duration: 0.95, ease: 'power4.inOut' }, '<')
          .to(el, { autoAlpha: 0, duration: 0.2 }, '-=0.2')
          .add(hide)

        setTimeout(() => useCloset.getState().setReady(), 700)
        setTimeout(hide, 2200)
      }

      const started = performance.now()
      const sceneReady = new Promise((resolve) => {
        if (useCloset.getState().sceneReady) return resolve()
        const unsub = useCloset.subscribe((s) => {
          if (s.sceneReady) {
            unsub()
            resolve()
          }
        })
      })
      const fonts = waitForFonts().then(() => {
        performance.mark('shinchan:fonts')
        useCloset.getState().setProgress(STAGES.fonts)
      })

      let cancelled = false
      const safety = setTimeout(() => {
        if (cancelled || finished) return
        console.warn('[SHINCHAN] Loading took too long, revealing the site anyway.')
        finish()
      }, MAX_WAIT)

      Promise.all([sceneReady, fonts]).then(() => {
        if (cancelled) return
        const wait = Math.max(0, MIN_DISPLAY - (performance.now() - started))
        setTimeout(() => !cancelled && finish(), wait)
      })

      return () => {
        cancelled = true
        clearTimeout(safety)
        unsubProgress()
      }
    },
    { scope: root },
  )

  return (
    <div className="loader" ref={root} aria-hidden="true">
      <div className="loader__curtain loader__curtain--top" ref={curtainTop} />
      <div className="loader__curtain loader__curtain--bottom" ref={curtainBottom} />
      
      <div className="loader__inner" ref={innerRef}>
        <div className="loader__crest">
          <svg className="loader__crest-ring" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 7" opacity="0.4" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.65" />
          </svg>
          <div className="loader__crest-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 7h18M12 7v3.5M5.5 19l6.5-9 6.5 9z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        <p className="loader__tag">Haute Atelier · 3D Wardrobe</p>

        <h1 className="loader__brand">
          <span className="loader__mask">
            <span className="loader__word">SHINCHAN</span>
          </span>
        </h1>

        <div className="loader__status">
          <span className="loader__dot" />
          <span className="loader__phase" ref={phaseRef}>Initializing 3D environment</span>
        </div>

        <div className="loader__progress-wrap">
          <div className="loader__track">
            <div ref={bar} className="loader__bar" />
          </div>
          <div className="loader__numbers">
            <span className="loader__label">Synthesizing Assets</span>
            <div className="loader__count-group">
              <span ref={count} className="loader__count">000</span>
              <span className="loader__percent">%</span>
            </div>
          </div>
        </div>

        <p className="loader__subtext">Drag to turn · Slide the rail · Real-time physics</p>
      </div>
    </div>
  )
}
