import { create } from 'zustand'
import { garments } from '../data/garments'

const count = garments.length

// Load saved bag from localStorage safely
const loadSavedBag = () => {
  try {
    const raw = localStorage.getItem('aarna_atelier_bag')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const saveBag = (bag) => {
  try {
    localStorage.setItem('aarna_atelier_bag', JSON.stringify(bag))
  } catch {}
}

export const useCloset = create((set, get) => ({
  sceneReady: false,
  sceneError: null,
  progress: 0,
  ready: false,
  active: 0,
  hovered: null,
  selected: null,
  colors: {},
  sizes: {},
  bag: loadSavedBag(),
  isBagOpen: false,
  isEnquiryOpen: false,
  activeCategory: 'All Creations',
  toast: null,
  section: 'hero',
  currency: 'USD', // 'USD' | 'INR'

  setSceneReady: () => {
    if (get().sceneReady) return
    performance.mark('aarna:scene-ready')
    set({ sceneReady: true, progress: 1 })
  },
  setSceneError: (error) =>
    !get().sceneError && set({ sceneError: error ?? new Error('3D gallery unavailable'), sceneReady: true, progress: 1 }),
  setProgress: (p) => p > get().progress && set({ progress: Math.min(p, 1) }),
  setReady: () => {
    if (get().ready) return
    performance.mark('aarna:ready')
    set({ ready: true })
  },
  setActive: (i) => get().active !== i && set({ active: i }),
  setHovered: (i) => get().hovered !== i && set({ hovered: i }),
  setSection: (section) => get().section !== section && set({ section }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  toggleCurrency: () => set((s) => ({ currency: s.currency === 'USD' ? 'INR' : 'USD' })),

  select: (i) => set({ selected: i, hovered: null }),
  close: () => set({ selected: null }),
  selectNext: (dir) => {
    const { selected } = get()
    if (selected === null) return
    set({ selected: (selected + dir + count) % count })
  },

  setColor: (id, index) => set((s) => ({ colors: { ...s.colors, [id]: index } })),
  setSize: (id, size) => set((s) => ({ sizes: { ...s.sizes, [id]: size } })),
