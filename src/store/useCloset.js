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

  // Bag interactions
  toggleBag: (open) => set((s) => ({ isBagOpen: open ?? !s.isBagOpen })),
  toggleEnquiry: (open) => set((s) => ({ isEnquiryOpen: open ?? !s.isEnquiryOpen })),

  addToBag: (item) => {
    const { colors, sizes, bag } = get()
    const colorIdx = colors[item.id] ?? 0
    const colorObj = item.colors[colorIdx]
    const size = sizes[item.id] ?? item.sizes[0]
    const cartItemId = `${item.id}-${colorObj.name}-${size}`

    const existingIdx = bag.findIndex((b) => b.cartItemId === cartItemId)
    let nextBag
    if (existingIdx > -1) {
      nextBag = bag.map((b, i) => (i === existingIdx ? { ...b, quantity: b.quantity + 1 } : b))
    } else {
      nextBag = [
        ...bag,
        {
          cartItemId,
          id: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          color: colorObj.name,
          colorHex: colorObj.hex,
          size,
          quantity: 1,
        },
      ]
    }
    saveBag(nextBag)
    set({
      bag: nextBag,
      isBagOpen: true,
      toast: { key: Date.now(), text: `${item.name} (${colorObj.name}) added to Atelier Bag.` },
    })
  },

  updateQuantity: (cartItemId, delta) => {
    const { bag } = get()
    const nextBag = bag
      .map((item) => {
        if (item.cartItemId === cartItemId) {
          const newQty = item.quantity + delta
          return newQty > 0 ? { ...item, quantity: newQty } : null
        }
        return item
      })
      .filter(Boolean)
    saveBag(nextBag)
    set({ bag: nextBag })
  },

  removeFromBag: (cartItemId) => {
    const { bag } = get()
    const nextBag = bag.filter((item) => item.cartItemId !== cartItemId)
    saveBag(nextBag)
    set({ bag: nextBag })
  },

  clearBag: () => {
    saveBag([])
    set({ bag: [] })
  },

  clearToast: () => set({ toast: null }),
}))
