// AARNA — 07 Lookbook Section
// Immersive editorial lookbook gallery with editorial framing and interactive piece links.

import { useRef, useState } from 'react'
import { useReveal } from '../lib/useReveal'
import { garments } from '../data/garments'
import { useCloset } from '../store/useCloset'

const LOOKS = [
  {
    id: 'look-1',
    garmentId: 'kashi-saree',
    number: 'LOOK 01',
    title: 'The Solitary Sovereign',
    caption: 'Shot at dawn along the stone pavilions of Varanasi. Featuring the Kashi Pre-Pleated Saree in Warm Ivory with beaten gold zari.',
    location: 'Varanasi Heritage Pavilion',
    tags: ['Mulberry Silk', 'Handloom Kadwa', 'Ivory / Gold'],
  },
  {
    id: 'look-2',
    garmentId: 'chandrika-lehenga',
    number: 'LOOK 02',
    title: 'Radial Mathematics',
    caption: 'The Chandrika Lehenga captured in natural gallery sunlight, showcasing the dramatic undulating 24-kali radial sweep.',
    location: 'Chanderi Atelier Courtyard',
    tags: ['24-Kali Flared', 'Pitta Zari', 'Sandstone'],
  },
  {
    id: 'look-3',
    garmentId: 'meera-anarkali',
    number: 'LOOK 03',
    title: 'Gossamer Fluting',
    caption: 'The Meera Fluted Anarkali in Muted Olive pure silk organza, creating a kinetic dialogue with desert gallery breezes.',
    location: 'Jaipur Sculpture Garden',
    tags: ['Silk Organza', 'Marodi Cuffs', 'Muted Olive'],
  },
  {
    id: 'look-4',
    garmentId: 'surya-coord',
    number: 'LOOK 04',
    title: 'Architectural Restraint',
    caption: 'Structured Matka raw silk bandhgala paired with fluid asymmetric pleated trousers in deep Espresso.',
    location: 'New Delhi Gallery',
    tags: ['Matka Silk', 'Tailored Shoulder', 'Espresso'],
  },
  {
    id: 'look-5',
    garmentId: 'pallavi-gown',
    number: 'LOOK 05',
    title: 'Liquid Diagonal',
    caption: 'The Pallavi Gown in Deep Forest heavy silk crepe satin, draped on the true bias with an ancient Uttariya-inspired shoulder line.',
    location: 'Atelier Private Chamber',
    tags: ['Heavy Silk Crepe', 'Bias Draping', 'Deep Forest'],
  },
]

export default function LookbookSection() {
  const root = useRef()
  const [activeLook, setActiveLook] = useState(0)
  useReveal(root)

  const handleInspect = (garmentId) => {
    const idx = garments.findIndex((g) => g.id === garmentId)
    if (idx !== -1) {
      useCloset.getState().select(idx)
    }
  }

  const look = LOOKS[activeLook]

  return (
    <section id="lookbook" className="section lookbook-aarna" ref={root}>
      <div className="panel lookbook-aarna__panel">
        <div className="lookbook-aarna__head" data-reveal>
          <div className="lookbook-aarna__eyebrow-wrap">
            <span className="eyebrow">07 — Lookbook</span>
            <span className="lookbook-aarna__meta-tag">Autumn / Winter Visual Diary</span>
          </div>
          <h2 className="display">
            Light, silhouette, <em>and cinematic stillness.</em>
          </h2>
        </div>

        {/* Lookbook Stage */}
        <div className="lookbook-aarna__stage" data-reveal>
          {/* Main Visual Display Card */}
          <div className="look-frame">
            <div className="look-frame__header">
              <span className="look-frame__badge">{look.number}</span>
              <span className="look-frame__loc">{look.location}</span>
            </div>

            <div className="look-frame__content">
              <div className="look-frame__monolith">
                <span className="look-frame__roman">AARNA · EDITORIAL</span>
                <h3 className="look-frame__title">{look.title}</h3>
                <p className="look-frame__caption">{look.caption}</p>
                <div className="look-frame__tags">
                  {look.tags.map((t) => (
                    <span key={t} className="look-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="look-frame__action">
                <button
                  className="btn btn--solid"
                  onClick={() => handleInspect(look.garmentId)}
                >
                  View 3D Silhouette
                </button>
              </div>
            </div>
          </div>

          {/* Look Selector Pagination Controls */}
          <div className="lookbook-aarna__nav">
            <div className="lookbook-pills">
              {LOOKS.map((item, idx) => (
                <button
                  key={item.id}
                  className={`lookbook-pill ${activeLook === idx ? 'is-active' : ''}`}
                  onClick={() => setActiveLook(idx)}
                >
                  <span className="lookbook-pill__num">0{idx + 1}</span>
                  <span className="lookbook-pill__label">{item.title}</span>
                </button>
              ))}
            </div>

            <div className="lookbook-arrows">
              <button
                className="lookbook-arrow"
                onClick={() =>
                  setActiveLook((prev) => (prev - 1 + LOOKS.length) % LOOKS.length)
                }
                aria-label="Previous look"
              >
                ←
              </button>
              <button
                className="lookbook-arrow"
                onClick={() => setActiveLook((prev) => (prev + 1) % LOOKS.length)}
                aria-label="Next look"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

