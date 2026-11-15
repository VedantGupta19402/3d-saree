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
