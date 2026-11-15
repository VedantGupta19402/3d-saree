// AARNA — 03 Craft & Texture Section
// Material storytelling: Varanasi Kadwa silk, Chanderi handloom, Marodi zari, and plant-based dyeing.

import { useRef, useState } from 'react'
import { useReveal } from '../lib/useReveal'

const CRAFT_STORIES = [
  {
    id: 'zari',
    num: '01',
    title: 'Varanasi Kadwa Weaving',
    subtitle: 'Muted Beaten Zari & Mulberry Silk',
    desc: 'Each motif is engraved individually on the handloom without loose floats on the reverse. Woven by multi-generational master weavers in Varanasi using real silver thread washed in organic turmeric baths to achieve our signature matte champagne sheen.',
    stats: { Weave: 'Interlocking Kadwa', Loom: 'Traditional Pit Loom', Purity: '98.5% Silver Core Zari' },
    accent: '#C7B8A2',
  },
  {
    id: 'chanderi',
    num: '02',
    title: 'Gossamer Handloom Chanderi',
    subtitle: 'Featherweight Warp & Weft',
    desc: 'Woven along the Vindhyachal ridges where the climate allows extra-fine silk-cotton threads to remain supple. The resulting weave possesses a natural crystalline translucency that captures gallery sunlight like frosted glass.',
    stats: { Weight: '48 gsm', Composition: '70% Fine Silk, 30% Cotton', Hand: 'Crisp Architectural Drape' },
    accent: '#8C9278',
  },
  {
    id: 'marodi',
    num: '03',
    title: 'Jaipur Marodi & Pitta Work',
    subtitle: 'Hand-Hammered Metallic Cord',
    desc: 'Gold-twisted silk cord is couched onto the fabric with micro-stitches, then burnished with smooth agate stones (pitta) to flatten the relief into an architectural metallic plane that reflects light from every angle.',
    stats: { Technique: 'Stone Burnishing', Tool: 'Polished Agate Horn', Precision: '0.8mm Micro-relief' },
    accent: '#D4AF37',
  },
  {
    id: 'pigments',
    num: '04',
    title: 'Mineral & Botanical Dyeing',
    subtitle: 'Understated Earth Palette',
    desc: 'Our shades are derived from sun-baked sandstone, fermented harda, pomegranate rinds, and crushed indigo leaves. The result is an understated living colour that gently evolves under changing light rather than staying flat.',
    stats: { Base: '100% Botanical Extracts', Water: 'Closed-loop Atelier Filtration', Tone: 'Low-chroma Earth' },
    accent: '#193C32',
  },
]

export default function CraftSection() {
  const root = useRef()
  const [activeStory, setActiveStory] = useState(0)
  useReveal(root)

  return (
    <section id="craft" className="section craft-aarna" ref={root}>
      <div className="panel craft-aarna__panel">
        <div className="craft-aarna__head" data-reveal>
          <span className="eyebrow">03 — Craft & Texture</span>
          <h2 className="display">
            The hand of the artisan, <em>felt in every thread.</em>
          </h2>
          <p className="body">
            We reject synthetic shortcuts and industrial uniformity. Every textile is born from
            slow, meditative handcraft across centuries-old Indian artisan clusters.
          </p>
        </div>

        {/* Interactive Craft Grid */}
        <div className="craft-aarna__grid">
          {/* Left: Craft Navigation Cards */}
          <div className="craft-aarna__tabs" data-reveal>
            {CRAFT_STORIES.map((story, i) => (
              <button
                key={story.id}
                className={`craft-card ${activeStory === i ? 'is-active' : ''}`}
                onClick={() => setActiveStory(i)}
              >
                <div className="craft-card__top">
                  <span className="craft-card__num">{story.num}</span>
                  <span
                    className="craft-card__dot"
                    style={{ background: story.accent }}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="craft-card__title">{story.title}</h3>
                <p className="craft-card__sub">{story.subtitle}</p>
              </button>
            ))}
          </div>

          {/* Right: Rich Story Showcase */}
          <div className="craft-aarna__feature" data-reveal>
            <div className="craft-feature__badge">
              <span className="craft-feature__n">
                {CRAFT_STORIES[activeStory].num} / 04
              </span>
              <span className="craft-feature__sub">Atelier Material Study</span>
            </div>

            <h3 className="craft-feature__title">
              {CRAFT_STORIES[activeStory].title}
            </h3>
            <p className="craft-feature__desc">
              {CRAFT_STORIES[activeStory].desc}
            </p>

            <dl className="craft-feature__stats">
              {Object.entries(CRAFT_STORIES[activeStory].stats).map(([k, v]) => (
                <div key={k} className="craft-stat">
                  <dt className="craft-stat__key">{k}</dt>
                  <dd className="craft-stat__val">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="craft-feature__quote">
              <blockquote>
                “When an artisan weaves at five picks a minute on a wooden loom, the cloth breathes with the weaver’s own pulse.”
              </blockquote>
              <cite>— Master Craftsman Ram Narayan, Varanasi</cite>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

