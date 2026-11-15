// AARNA — Original Procedural Materials & Textures
// Handcrafted canvas textures for Indian Atelier fabrics: Mulberry Silk, Chanderi, Organza, Matka, Crepe, and Sandstone.

import * as THREE from 'three'

const textureCache = new Map()

/**
 * Generates procedural canvas bump and detail maps for Indian handloom textiles.
 */
export function getAarnaTexture(kind) {
  if (textureCache.has(kind)) return textureCache.get(kind)

  const size = 512
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')

  const imgData = ctx.createImageData(size, size)
  const d = imgData.data

  if (kind === 'mulberry_silk') {
    // Fine parallel silk grain with subtle horizontal slubs
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const idx = (y * size + x) * 4
        const thread = Math.sin(x * 0.9) * 0.5 + 0.5
        const slub = (Math.sin(y * 0.12 + Math.sin(x * 0.05) * 4) > 0.88 ? 35 : 0)
        const noise = (Math.random() - 0.5) * 12
        const val = Math.min(255, Math.max(0, 180 + thread * 25 + slub + noise))
        d[idx] = val
        d[idx + 1] = val
        d[idx + 2] = val
        d[idx + 3] = 255
      }
    }
  } else if (kind === 'chanderi') {
    // Sheer grid weave with micro zari gold flecks
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const idx = (y * size + x) * 4
        const warp = (x % 4 === 0) ? 40 : 0
        const weft = (y % 4 === 0) ? 40 : 0
        const isZariFleck = (x % 32 === 0 && y % 32 === 0 && Math.random() > 0.4) ? 80 : 0
        const val = Math.min(255, 140 + warp + weft + isZariFleck + (Math.random() - 0.5) * 15)
        d[idx] = val
        d[idx + 1] = val
        d[idx + 2] = val
        d[idx + 3] = 255
      }
    }
  } else if (kind === 'matka_silk') {
    // Heavy coarse slub texture with organic lumps
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const idx = (y * size + x) * 4
        const slubY = Math.sin(y * 0.3 + Math.sin(x * 0.03) * 6)
        const slubX = Math.sin(x * 0.25)
        const bump = slubY * slubX * 50
        const val = Math.min(255, Math.max(0, 160 + bump + (Math.random() - 0.5) * 35))
        d[idx] = val
        d[idx + 1] = val
        d[idx + 2] = val
        d[idx + 3] = 255
      }
    }
  } else if (kind === 'sandstone') {
    // Architectural sandstone with layered sedimentary grain
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const idx = (y * size + x) * 4
        const sediment = Math.sin(y * 0.06 + Math.sin(x * 0.015) * 3) * 20
        const speckle = (Math.random() - 0.5) * 40
        const val = Math.min(255, Math.max(0, 190 + sediment + speckle))
        d[idx] = val
