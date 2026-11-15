// AARNA — 08 Final Experience Section
// Cinematic closing statement, private atelier appointment trigger, and spatial return.

import { useRef } from 'react'
import { useReveal } from '../lib/useReveal'
import { scrollToId } from '../lib/scroll'
import { useCloset } from '../store/useCloset'

export default function FinalExperienceSection() {
  const root = useRef()
  const toggleEnquiry = useCloset((s) => s.toggleEnquiry)
  useReveal(root)

  return (
    <section id="outro" className="section final-aarna" ref={root}>
      <div className="panel final-aarna__panel">
        <div className="final-aarna__content" data-reveal>
          <span className="eyebrow">08 — Final Experience</span>

          <h2 className="display display--xl">
            Crafted for memory. <em>Tailored for a lifetime.</em>
          </h2>

          <p className="body body--lg">
            Experience our bespoke couture service. Each garment is meticulously drafted
            to your personal anatomical measurements, accompanied by fabric swatches and private fitting sessions.
          </p>

          <div className="final-aarna__actions">
            <button className="btn btn--solid" onClick={() => toggleEnquiry(true)}>
              Request Private Atelier Appointment
            </button>
            <button
              className="btn btn--ghost"
              onClick={() => scrollToId('hero')}
            >
              Return to 3D Spatial Gallery ↑
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

