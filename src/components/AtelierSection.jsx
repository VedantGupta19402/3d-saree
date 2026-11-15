// AARNA — 06 Our Atelier Section
// Philosophy, slow craft ethics, Jaipur & Varanasi master artisans, and bespoke tailoring process.

import { useRef } from 'react'
import { useReveal } from '../lib/useReveal'
import { useCloset } from '../store/useCloset'

const ATELIER_STEPS = [
  {
    step: 'I',
    title: 'The Architectural Sketch',
    desc: 'Each piece begins in our New Delhi studio with mathematical drape studies. We draft geometric pattern pieces that marry classical Indian unstitched proportion with contemporary tailored lines.',
  },
  {
    step: 'II',
    title: 'Heritage Guild Weaving',
    desc: 'Our designs travel to our master weaver guilds in Varanasi, Chanderi, and Bengal. Yarns are spun and dyed in small batches, taking up to eight weeks of intensive loom work per garment.',
  },
  {
    step: 'III',
    title: 'Agate Burnishing & Hand Finish',
    desc: 'In our Jaipur atelier, metallic cord is embroidered and polished with natural agate stones. Seams are hand-rolled and finished with silk linings for effortless internal comfort.',
  },
  {
    step: 'IV',
    title: 'Bespoke Fitting & Delivery',
    desc: 'Every garment is customized to the client’s exact anatomical proportions. Shipped worldwide in archival cedarwood presentation boxes with insured hand-delivery.',
  },
]

export default function AtelierSection() {
  const root = useRef()
  const toggleEnquiry = useCloset((s) => s.toggleEnquiry)
  useReveal(root)

  return (
    <section id="atelier" className="section atelier-aarna" ref={root}>
      <div className="panel atelier-aarna__panel">
        <div className="atelier-aarna__head" data-reveal>
          <span className="eyebrow">06 — Our Atelier</span>
          <h2 className="display">
            A sanctuary for <em>meditative slow creation.</em>
          </h2>
          <p className="body">
            Founded on the belief that true luxury requires time, unhurried contemplation,
            and direct reverence for the hands that weave the cloth.
          </p>
        </div>

        {/* Steps in the atelier process */}
        <div className="atelier-aarna__process" data-reveal>
          {ATELIER_STEPS.map((s) => (
            <div key={s.step} className="atelier-step">
              <span className="atelier-step__roman">{s.step}</span>
              <h3 className="atelier-step__title">{s.title}</h3>
              <p className="atelier-step__desc">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Philosophy & Guilds banner */}
        <div className="atelier-aarna__banner" data-reveal>
          <div className="atelier-banner__col">
            <span className="atelier-banner__stat">320+</span>
            <span className="atelier-banner__label">Artisans in our direct guild</span>
          </div>
          <div className="atelier-banner__col">
            <span className="atelier-banner__stat">100%</span>
            <span className="atelier-banner__label">Fair living wages & health coverage</span>
          </div>
          <div className="atelier-banner__col">
            <span className="atelier-banner__stat">0%</span>
            <span className="atelier-banner__label">Deadstock waste · Made to order</span>
          </div>
          <div className="atelier-banner__cta">
            <button className="btn btn--solid" onClick={() => toggleEnquiry(true)}>
              Schedule Atelier Fitting
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

