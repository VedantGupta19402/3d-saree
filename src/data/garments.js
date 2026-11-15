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
      { name: 'Warm Ivory', hex: '#F4F0E8', secondary: '#8C9278' },
      { name: 'Soft Sandstone', hex: '#C7B8A2', secondary: '#302720' },
    ],
    description:
      'A diaphanous pure silk organza gown featuring knife-pleated fluted fullness from high waist to sweeping floor hem. Finished with delicate hand-done marodi threadwork on the sculpted cuffs and keyhole neckline.',
    specs: {
      Craft: 'Marodi Threadwork & Fine Pintucks',
      Material: 'Pure Silk Organza with Habotai Silk Lining',
      Drape: 'Fluted Column Silhouette with Motion Flare',
      Origin: 'Jaipur Atelier, Rajasthan',
      Hours: '140 Artisan Hours',
    },
    sizes: ['Custom Bespoke', 'XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'surya-coord',
    name: 'Surya Tailored Co-ord Set',
    category: 'Co-ord Sets',
    price: 1450,
    priceInr: '₹1,19,000',
    type: 'coord',
    hanger: 'sculptural_brass',
    fabric: 'matka_silk',
    hardware: 'brass',
    look: { roughness: 0.72, sheen: 0.45, bump: 1.8, clearcoat: 0 },
    colors: [
      { name: 'Espresso', hex: '#302720', secondary: '#C7B8A2' },
      { name: 'Warm Ivory', hex: '#F4F0E8', secondary: '#193C32' },
      { name: 'Deep Forest', hex: '#193C32', secondary: '#8C9278' },
    ],
    description:
      'A double-breasted structured bandhgala jacket paired with fluid pleated asymmetrical drape trousers. Sculpted from heavyweight handspun matka raw silk with brass shank accents.',
    specs: {
      Craft: 'Handloom Matka Weave & Bespoke Tailoring',
      Material: '100% Handloom Matka Raw Silk',
      Drape: 'Architectural Structured Shoulder with Fluid Drape Trouser',
      Origin: 'Bengaluru Weaving Guild, India',
      Hours: '90 Artisan Hours',
    },
    sizes: ['Custom Bespoke', 'XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'pallavi-gown',
    name: 'Pallavi Asymmetric Draped Gown',
    category: 'Dresses',
    price: 1650,
    priceInr: '₹1,35,000',
    type: 'dress',
    hanger: 'sculptural_brass',
    fabric: 'satin_crepe',
    hardware: null,
    look: { roughness: 0.28, sheen: 1.0, bump: 0.4, clearcoat: 0.4, sheenRoughness: 0.25 },
    colors: [
      { name: 'Deep Forest', hex: '#193C32', secondary: '#F4F0E8' },
      { name: 'Soft Sandstone', hex: '#C7B8A2', secondary: '#193C32' },
      { name: 'Warm Ivory', hex: '#F4F0E8', secondary: '#8C9278' },
    ],
    description:
      'Heavy bias-cut silk crepe dress inspired by the ancient Indian uttariya drape. Cascades from an architectural one-shoulder neckline into a graceful diagonal cowl with an elongated slit hem.',
    specs: {
      Craft: 'True Bias Draping & Hand-rolled Pico Finishing',
      Material: '100% Heavy Silk Crepe Satin',
      Drape: 'Bias-cut One-Shoulder Architectural Cowl',
      Origin: 'New Delhi Design Studio, India',
      Hours: '110 Artisan Hours',
    },
    sizes: ['Custom Bespoke', 'XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'tara-angrakha',
    name: 'Tara Crossover Angrakha Tunic',
    category: 'Contemporary Ethnic Wear',
    price: 1250,
    priceInr: '₹1,02,000',
    type: 'angrakha',
    hanger: 'sculptural_brass',
    fabric: 'chanderi',
    hardware: 'brass',
    look: { roughness: 0.46, sheen: 0.75, bump: 1.4, clearcoat: 0.1 },
    colors: [
      { name: 'Warm Ivory', hex: '#F4F0E8', secondary: '#C7B8A2' },
      { name: 'Muted Olive', hex: '#8C9278', secondary: '#193C32' },
      { name: 'Espresso', hex: '#302720', secondary: '#F4F0E8' },
    ],
    description:
      'Contemporary overlapping Angrakha silhouette cut from tissue Chanderi with woven micro-bootis. Featuring structured geometric lapels, handcrafted brass tassel cords, and side accordion pleats.',
    specs: {
      Craft: 'Chanderi Zari Eknal Weave & Hand Marodi Cords',
      Material: 'Silk-Cotton Chanderi with Hand-beaten Brass Tassels',
      Drape: 'Crossover Flared Hem with Adjustable Waist Tie',
      Origin: 'Madhya Pradesh & Jaipur Ateliers',
      Hours: '85 Artisan Hours',
    },
    sizes: ['Custom Bespoke', 'XS', 'S', 'M', 'L', 'XL'],
  },
]

export const formatPrice = (n) => `$${n.toLocaleString('en-US')}`
export const formatInr = (n) => `₹${Math.round(n * 82.5).toLocaleString('en-IN')}`
