// AARNA — Contemporary Indian Atelier
// Scene constants shared by the 3D gallery and the UI layer.
export const GALLERY_Y = 1.65
export const SPACING = 1.85
export const FOCUS_Z = 1.35

export const BRAND = {
  name: 'AARNA',
  tagline: 'Contemporary Indian Atelier',
  headline: 'CRAFTED TO BE REMEMBERED.',
  subheadline: 'Contemporary silhouettes. Timeless Indian craftsmanship.',
  palette: {
    warmIvory: '#F4F0E8',
    deepForest: '#193C32',
    mutedOlive: '#8C9278',
    softSandstone: '#C7B8A2',
    espresso: '#302720',
  },
}

export const CATEGORIES = [
  'All Creations',
  'Contemporary Sarees',
  'Designer Lehengas',
  'Anarkalis',
  'Co-ord Sets',
  'Dresses',
  'Contemporary Ethnic Wear',
]

export const garments = [
  {
    id: 'kashi-saree',
    name: 'Kashi Pre-Pleated Saree',
    category: 'Contemporary Sarees',
    price: 1850,
    priceInr: '₹1,52,000',
    type: 'saree',
    hanger: 'sculptural_brass',
    fabric: 'mulberry_silk',
    hardware: 'gold_zari',
    look: { roughness: 0.38, sheen: 0.95, bump: 1.2, clearcoat: 0.15 },
    colors: [
      { name: 'Warm Ivory', hex: '#F4F0E8', secondary: '#C7B8A2' },
      { name: 'Deep Forest', hex: '#193C32', secondary: '#C7B8A2' },
      { name: 'Muted Olive', hex: '#8C9278', secondary: '#F4F0E8' },
    ],
    description:
      'Hand-woven Mulberry silk with a subtle beaten gold zari border. Engineered with pre-sculpted architectural pleats and a fluid cascading pallu designed to catch natural gallery light.',
    specs: {
      Craft: 'Handloom Kadwa Weave',
      Material: '100% Pure Mulberry Silk & Muted Zari',
      Drape: 'Pre-pleated sculptural silhouette',
      Origin: 'Varanasi Heritage Cluster, India',
      Hours: '160 Artisan Hours',
    },
    sizes: ['Custom Bespoke', 'XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'chandrika-lehenga',
    name: 'Chandrika Flared Lehenga',
    category: 'Designer Lehengas',
    price: 2650,
    priceInr: '₹2,18,000',
    type: 'lehenga',
    hanger: 'sculptural_brass',
    fabric: 'chanderi',
    hardware: 'gold_zari',
    look: { roughness: 0.42, sheen: 0.85, bump: 1.6, clearcoat: 0.2 },
    colors: [
      { name: 'Soft Sandstone', hex: '#C7B8A2', secondary: '#193C32' },
      { name: 'Deep Forest', hex: '#193C32', secondary: '#C7B8A2' },
      { name: 'Espresso', hex: '#302720', secondary: '#8C9278' },
    ],
    description:
      'Twenty-four sculptural kalis crafted from hand-spun Chanderi silk. Features a high-waisted tailored yoke cascading into dramatic architectural volume with tonal cordwork and micro-geometric embroidery.',
    specs: {
      Craft: 'Pitta Zari & Raised Resham Cordwork',
      Material: 'Hand-spun Chanderi Silk & Organic Cotton Mul',
      Drape: '24-Kali Architectural Full Skirt',
      Origin: 'Chanderi & Jaipur Ateliers',
      Hours: '240 Artisan Hours',
    },
    sizes: ['Custom Bespoke', 'XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'meera-anarkali',
    name: 'Meera Fluted Anarkali',
    category: 'Anarkalis',
    price: 1980,
    priceInr: '₹1,62,000',
    type: 'anarkali',
    hanger: 'sculptural_brass',
    fabric: 'silk_organza',
    hardware: 'pearl',
    look: { roughness: 0.48, sheen: 0.9, bump: 1.1, clearcoat: 0.1 },
    colors: [
      { name: 'Muted Olive', hex: '#8C9278', secondary: '#F4F0E8' },
