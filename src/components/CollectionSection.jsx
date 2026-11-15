// AARNA — 02 The Collection Section
// Interactive 3D spatial collection browser with category filtration and direct inspection triggers.

import { useRef } from 'react'
import { useReveal } from '../lib/useReveal'
import { garments, formatPrice, formatInr, CATEGORIES } from '../data/garments'
import { useCloset } from '../store/useCloset'

export default function CollectionSection() {
  const root = useRef()
  const active = useCloset((s) => s.active)
  const colors = useCloset((s) => s.colors)
  const currency = useCloset((s) => s.currency)
  const activeCategory = useCloset((s) => s.activeCategory)
  const setActiveCategory = useCloset((s) => s.setActiveCategory)

  useReveal(root)

  const filteredGarments = garments.filter((g) =>
    activeCategory === 'All Creations' ? true : g.category === activeCategory,
  )

  const handleSelect = (index) => {
    useCloset.getState().select(index)
  }

  return (
    <section id="collection" className="section collection-aarna" ref={root}>
      <div className="panel collection-aarna__panel">
        {/* Section Header */}
        <div className="collection-aarna__head" data-reveal>
          <div className="collection-aarna__eyebrow-wrap">
            <span className="eyebrow">02 — The Collection</span>
            <span className="collection-aarna__tag">Autumn / Winter Edition</span>
          </div>
          <h2 className="display">
            Six architectural expressions, <em>one spatial gallery.</em>
          </h2>
          <p className="body">
            Each creation is an original intersection of classical Indian drape geometry and
            understated modern proportion. Select any piece to bring it forward for 3D inspection.
          </p>
        </div>

        {/* Category Filtration Tabs */}
        <div className="collection-aarna__filters" data-reveal>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`collection-aarna__tab ${activeCategory === cat ? 'is-active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Silhouette Rows */}
        <ol className="collection-aarna__list">
          {filteredGarments.map((g) => {
            const originalIndex = garments.findIndex((item) => item.id === g.id)
            const c = g.colors[colors[g.id] ?? 0]
            const isCurrent = active === originalIndex

            return (
              <li key={g.id} data-reveal>
                <button
                  className={`collection-aarna__row ${isCurrent ? 'is-active' : ''}`}
                  onClick={() => handleSelect(originalIndex)}
                  onMouseEnter={() => useCloset.getState().setHovered(originalIndex)}
                  onMouseLeave={() => useCloset.getState().setHovered(null)}
                >
                  <span className="collection-aarna__n">0{originalIndex + 1}</span>

                  <span
                    className="collection-aarna__swatch"
                    style={{ background: c.hex }}
                    aria-hidden="true"
                    title={`Current colorway: ${c.name}`}
                  />

                  <div className="collection-aarna__details">
                    <span className="collection-aarna__name">{g.name}</span>
                    <span className="collection-aarna__meta">
                      {g.category} · {g.specs.Origin} · {g.specs.Hours}
                    </span>
                  </div>

                  <span className="collection-aarna__price">
                    {currency === 'USD' ? formatPrice(g.price) : formatInr(g.price)}
                  </span>

                  <span className="collection-aarna__cta-label">
                    <span>Inspect 3D</span>
                    <span className="collection-aarna__arrow" aria-hidden="true">→</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

