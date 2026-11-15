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
        d[idx + 1] = val
        d[idx + 2] = val
        d[idx + 3] = 255
      }
    }
  } else {
    // Generic fine handloom weave
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const idx = (y * size + x) * 4
        const weave = ((x % 3 === 0) ? 20 : 0) + ((y % 3 === 0) ? 20 : 0)
        const val = 170 + weave + (Math.random() - 0.5) * 15
        d[idx] = val
        d[idx + 1] = val
        d[idx + 2] = val
        d[idx + 3] = 255
      }
    }
  }

  ctx.putImageData(imgData, 0, 0)

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(4, 4)
  texture.needsUpdate = true

  textureCache.set(kind, texture)
  return texture
}

/**
 * Creates an exquisite MeshPhysicalMaterial for Indian Atelier fabrics.
 */
export function createAarnaMaterial(item) {
  const tex = getAarnaTexture(item.fabric || 'mulberry_silk')
  const initialColor = new THREE.Color(item.colors[0].hex)
  const sheenTint = initialColor.clone().lerp(new THREE.Color('#FFF8EE'), 0.5)

  const isSheer = item.fabric === 'silk_organza' || item.fabric === 'chanderi'
  const isLustrous = item.fabric === 'mulberry_silk' || item.fabric === 'satin_crepe'

  const mat = new THREE.MeshPhysicalMaterial({
    color: initialColor,
    roughness: isLustrous ? 0.32 : (item.look.roughness ?? 0.45),
    metalness: isLustrous ? 0.08 : 0.02,
    bumpMap: tex,
    bumpScale: (item.look.bump ?? 1.2) * 0.0035,
    sheen: 1.0,
    sheenColor: sheenTint,
    sheenRoughness: isLustrous ? 0.22 : 0.45,
    clearcoat: isLustrous ? 0.3 : (item.look.clearcoat ?? 0.1),
    clearcoatRoughness: 0.2,
    specularIntensity: 0.95,
    specularColor: new THREE.Color('#FFF5E6'),
    transmission: isSheer ? (item.fabric === 'silk_organza' ? 0.32 : 0.18) : 0,
    thickness: isSheer ? 0.12 : 0,
    ior: 1.44,
    side: THREE.DoubleSide,
  })

  return mat
}

/**
 * Creates antique beaten brass hardware material.
 */
export function createAarnaHardware() {
  return new THREE.MeshStandardMaterial({
    color: '#D4AF37', // Antique brushed gold / brass
    metalness: 0.88,
    roughness: 0.32,
  })
}

