// AARNA — 05 The AARNA Woman Section
// Editorial fashion campaign manifesto, philosophy, and architectural stance.

import { useRef } from 'react'
import { useReveal } from '../lib/useReveal'

export default function WomanSection() {
  const root = useRef()
  useReveal(root)

  return (
    <section id="woman" className="section woman-aarna" ref={root}>
      <div className="panel woman-aarna__panel">
        <div className="woman-aarna__grid">
          {/* Left: Campaign Manifesto */}
          <div className="woman-aarna__manifesto" data-reveal>
            <span className="eyebrow">05 — The AARNA Woman</span>
            <h2 className="display display--xl">
              Unforced authority, <em>grounded in heritage.</em>
            </h2>

            <div className="woman-aarna__text-block">
              <p className="body body--lg">
                The AARNA woman does not dress for transient spectacle. She possesses an
                architectural eye and an appreciation for quiet luxury — finding beauty in the
                rhythmic imperfection of a handloom slub, the drape of heavy silk, and the
                disciplined restraint of a clean neckline.
              </p>
              <p className="body">
                For her, Indian craftsmanship is not museum nostalgia; it is a living, breathing
                language of form, intention, and enduring grace.
              </p>
            </div>

            <div className="woman-aarna__pillars">
              <div className="pillar">
                <span className="pillar__num">01</span>
                <div>
                  <h3 className="pillar__title">Architectural Poise</h3>
                  <p className="pillar__desc">
                    Silhouettes engineered to hold presence. Volumes that flatter the human
                    form through structural tension rather than rigid underwires.
                  </p>
                </div>
              </div>

              <div className="pillar">
                <span className="pillar__num">02</span>
                <div>
                  <h3 className="pillar__title">Tactile Connoisseurship</h3>
                  <p className="pillar__desc">
                    A deep sensitivity to pure fibers: tussar slubs, gossamer chanderi, and
                    beaten silver zari that soften and enrich with every wearing.
                  </p>
                </div>
              </div>

              <div className="pillar">
                <span className="pillar__num">03</span>
                <div>
                  <h3 className="pillar__title">Contemporary Cadence</h3>
                  <p className="pillar__desc">
                    Freedom of motion. Pre-pleated sarees and fluid coord trousers designed
                    for transatlantic flights, private dinners, and gallery openings alike.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Typography Campaign Frame */}
          <div className="woman-aarna__visual" data-reveal>
            <div className="editorial-frame">
              <div className="editorial-frame__inner">
                <span className="editorial-frame__tag">CAMPAIGN AUTUMN / WINTER</span>
                <p className="editorial-frame__quote">
                  “To wear a garment woven by human hands is to step into a lineage of timeless memory.”
                </p>
                <div className="editorial-frame__footer">
                  <span className="editorial-frame__monogram">AARNA</span>
                  <span className="editorial-frame__coords">28° 36' N, 77° 12' E</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

