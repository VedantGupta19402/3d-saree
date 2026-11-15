// AARNA — Asset Preloader & Scene Compiler
import { garments } from '../data/garments'
import { buildAarnaGarment } from '../three/geometry/aarnaFactory'
import { getAarnaTexture } from '../three/materials/aarnaMaterials'
import { useCloset } from '../store/useCloset'

export const STAGES = { fonts: 0.1, scene: [0.1, 0.85], compiled: 0.95 }

const yieldToBrowser = () => new Promise((resolve) => setTimeout(resolve, 0))

let pending = null

export function prepareScene() {
  if (pending) return pending
  pending = (async () => {
    performance.mark('aarna:prepare-start')
    const kinds = [...new Set([...garments.map((g) => g.fabric), 'sandstone'])]
    const jobs = [
      ...kinds.map((k) => () => getAarnaTexture(k)),
      ...garments.map((g) => () => buildAarnaGarment(g)),
    ]
    const [from, to] = STAGES.scene
    for (let i = 0; i < jobs.length; i++) {
      jobs[i]()
      useCloset.getState().setProgress(from + ((i + 1) / jobs.length) * (to - from))
      await yieldToBrowser()
    }
    performance.mark('aarna:prepare-end')
  })()
  return pending
}

export function waitForFonts(timeout = 2500) {
  const fonts = document.fonts?.ready ?? Promise.resolve()
  return Promise.race([fonts, new Promise((resolve) => setTimeout(resolve, timeout))])
}

export function hasWebGL() {
  try {
    const canvas = document.createElement('canvas')
    const gl = window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
    return !!gl
  } catch {
    return false
  }
}
