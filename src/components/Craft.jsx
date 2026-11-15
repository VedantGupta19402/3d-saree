import { useRef } from 'react'
import { useReveal } from '../lib/useReveal'

const FEATURES = [
  ['01', 'Cut, not scanned', 'Every piece is built from flat pattern pieces that are inflated, seamed and draped in real time. No photos, no video.'],
  ['02', 'Fabric that reads', 'Jersey, rib knit, oxford, selvedge denim, silk and lambskin each carry their own weave, sheen and grain.'],
  ['03', 'Light like a fitting room', 'A warm key light, a soft fill and a studio environment pick up texture as the garments swing.'],
]

export default function Craft() {
  const root = useRef()
  useReveal(root)
  return (
    <section id="craft" className="section craft" ref={root}>
      <div className="panel craft__panel">
        <p className="eyebrow" data-reveal>02 — Craftsmanship</p>
        <h2 className="display" data-reveal>
          Fabric you can <em>almost</em> touch.
        </h2>
        <p className="body" data-reveal>
          A static product catalog hides everything that makes fine tailoring worth feeling. Here drape, weight and tactile texture come alive on the rail, reacting organically to your touch.
        </p>
        <ul className="features">
          {FEATURES.map(([n, title, text]) => (
            <li key={n} data-reveal>
              <span className="features__n">{n}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
