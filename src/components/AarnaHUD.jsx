// AARNA — Spatial Gallery Navigation HUD
// Floating bottom interface for stepping through the gallery and launching 3D inspection.

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useCloset } from '../store/useCloset'
import { garments, formatPrice, formatInr } from '../data/garments'
import { stepRail } from '../three/railState'

export default function AarnaHUD() {
  const root = useRef()
  const active = useCloset((s) => s.active)
  const ready = useCloset((s) => s.ready)
  const hidden = useCloset((s) => s.selected !== null || !!s.sceneError)
  const currency = useCloset((s) => s.currency)
  const item = garments[active] ?? garments[0]

  useGSAP(
    () => {
      gsap.fromTo(
        '.hud-swap',
        { yPercent: 40, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.5, ease: 'expo.out', stagger: 0.03 },
      )
    },
    { scope: root, dependencies: [active] },
  )

  return (
    <div className={`aarna-hud ${ready && !hidden ? 'is-visible' : ''}`} ref={root}>
      <button
        className="aarna-hud__arrow"
        onClick={() => stepRail(-1)}
        aria-label="Previous silhouette"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        className="aarna-hud__center"
        onClick={() => useCloset.getState().select(active)}
        aria-label={`Inspect ${item.name}`}
      >
        <span className="aarna-hud__index">
          <span className="hud-swap">0{active + 1}</span>
          <span className="aarna-hud__total"> / 0{garments.length}</span>
        </span>

        <span className="aarna-hud__text">
          <span className="aarna-hud__name hud-swap">{item.name}</span>
          <span className="aarna-hud__meta hud-swap">
            {item.category} · {currency === 'USD' ? formatPrice(item.price) : formatInr(item.price)}
          </span>
        </span>

        <span className="aarna-hud__pill">Inspect 3D</span>
      </button>

      <button
        className="aarna-hud__arrow"
        onClick={() => stepRail(1)}
        aria-label="Next silhouette"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="aarna-hud__dots" aria-hidden="true">
        {garments.map((g, i) => (
          <span key={g.id} className={i === active ? 'is-active' : ''} />
        ))}
      </div>
    </div>
  )
}

