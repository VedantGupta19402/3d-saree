// AARNA — 04 Signature Pieces Section
// Large editorial magazine compositions for standout statement garments.

import { useRef } from 'react'
import { useReveal } from '../lib/useReveal'
import { garments, formatPrice, formatInr } from '../data/garments'
import { useCloset } from '../store/useCloset'

export default function SignatureSection() {
  const root = useRef()
  const currency = useCloset((s) => s.currency)
  useReveal(root)

  // Curate 3 headline statement pieces
  const signatures = [
    {
      item: garments[0], // Kashi Saree
      editorialNum: 'STATEMENT I',
      quote: 'An architectural reinterpretation of the ancient six yards.',
      highlight: 'Pre-pleated sculptural pleats eliminate traditional pinning while preserving the fluid grace of unstitched fabric.',
      heroPalette: ['#F4F0E8', '#193C32', '#C7B8A2'],
    },
    {
      item: garments[1], // Chandrika Lehenga
      editorialNum: 'STATEMENT II',
      quote: 'Twenty-four undulating kalis tuned to radial mathematical harmony.',
      highlight: 'Engineered with hand-spun Chanderi silk that holds sculptural volume in gallery breezes without heavy internal can-can netting.',
      heroPalette: ['#C7B8A2', '#193C32', '#302720'],
    },
    {
      item: garments[3], // Surya Co-ord
      editorialNum: 'STATEMENT III',
      quote: 'The masculine Bandhgala sculpted with feminine architectural poise.',
      highlight: 'Handloom matka raw silk brings tactile slub richness to crisp tailoring, grounded by asymmetrical pleated drape trousers.',
      heroPalette: ['#302720', '#F4F0E8', '#8C9278'],
    },
  ]

  const handleInspect = (itemId) => {
    const idx = garments.findIndex((g) => g.id === itemId)
    if (idx !== -1) {
      useCloset.getState().select(idx)
    }
  }

  return (
    <section id="signature" className="section signature-aarna" ref={root}>
      <div className="panel signature-aarna__panel">
        <div className="signature-aarna__head" data-reveal>
          <span className="eyebrow">04 — Signature Pieces</span>
          <h2 className="display">
            Artisanal monuments, <em>sculpted in silk.</em>
          </h2>
          <p className="body">
            Every collection centers around distinct statement silhouettes that bridge the gap
            between ceremonial Indian regalia and contemporary sculpture.
          </p>
        </div>

        <div className="signature-aarna__items">
          {signatures.map((sig, i) => (
            <article
              key={sig.item.id}
              className={`sig-card ${i % 2 === 1 ? 'sig-card--reversed' : ''}`}
              data-reveal
            >
              {/* Editorial Graphic Frame */}
              <div className="sig-card__visual">
                <div className="sig-card__canvas-badge">
                  <span>AARNA 3D ATELIER</span>
                  <span className="sig-card__live-indicator">● LIVE 3D</span>
                </div>

                <div className="sig-card__art-frame">
                  <div className="sig-card__arch-shape">
                    <span className="sig-card__roman">0{i + 1}</span>
                    <h3 className="sig-card__visual-title">{sig.item.name}</h3>
                    <p className="sig-card__visual-category">{sig.item.category}</p>
                  </div>
                </div>

                <div className="sig-card__palette">
                  {sig.heroPalette.map((hex) => (
                    <span
                      key={hex}
                      className="sig-card__chip"
                      style={{ background: hex }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              {/* Editorial Story Details */}
              <div className="sig-card__content">
                <div className="sig-card__eyebrow">
                  <span>{sig.editorialNum}</span>
                  <span className="sig-card__origin">{sig.item.specs.Origin}</span>
                </div>

                <h3 className="sig-card__headline">{sig.quote}</h3>
                <p className="sig-card__body">{sig.highlight}</p>

                <div className="sig-card__specs-table">
                  <div className="sig-spec">
                    <span className="sig-spec__label">Material</span>
                    <span className="sig-spec__val">{sig.item.specs.Material}</span>
                  </div>
                  <div className="sig-spec">
                    <span className="sig-spec__label">Artisan Time</span>
                    <span className="sig-spec__val">{sig.item.specs.Hours}</span>
                  </div>
                  <div className="sig-spec">
                    <span className="sig-spec__label">Price</span>
                    <span className="sig-spec__val sig-spec__price">
                      {currency === 'USD' ? formatPrice(sig.item.price) : formatInr(sig.item.price)}
                    </span>
                  </div>
                </div>

                <div className="sig-card__actions">
                  <button
                    className="btn btn--solid"
                    onClick={() => handleInspect(sig.item.id)}
                  >
                    Inspect 3D Silhouette
                  </button>
                  <button
                    className="btn btn--ghost"
                    onClick={() => useCloset.getState().addToBag(sig.item)}
                  >
                    Add to Atelier Bag
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

