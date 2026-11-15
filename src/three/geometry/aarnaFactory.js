// AARNA — Original Procedural 3D Garment Geometry Engine
// Independently authored parametric geometry for contemporary Indian atelier silhouettes.

import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

/**
 * Creates a parametric cloth surface with harmonic drape undulations.
 */
function createParametricCloth({
  width = 0.6,
  height = 1.1,
  segmentsX = 48,
  segmentsY = 56,
  waistWidth = 0.38,
  hemWidth = 0.72,
  foldAmp = 0.035,
  foldFreq = 14,
  curveWrap = 0.12,
  asymmetry = 0,
}) {
  const geom = new THREE.BufferGeometry()
  const positions = []
  const uvs = []
  const indices = []

  for (let j = 0; j <= segmentsY; j++) {
    const v = j / segmentsY // 0 at top, 1 at hem
    const y = -v * height
    const currentW = THREE.MathUtils.lerp(waistWidth, hemWidth, Math.pow(v, 1.2))

    for (let i = 0; i <= segmentsX; i++) {
      const u = i / segmentsX // 0 to 1
      const xCentered = (u - 0.5) * currentW + asymmetry * v * 0.1

      // Natural cloth drape harmonic equation
      const fold = Math.sin(u * Math.PI * foldFreq + v * 3.5) * foldAmp * (0.15 + v * 0.85)
      const secondaryFold = Math.cos(u * Math.PI * foldFreq * 1.8 - v * 2) * (foldAmp * 0.35) * v
      const wrapZ = -Math.cos((u - 0.5) * Math.PI) * (curveWrap * (0.8 + 0.2 * v))

      const z = fold + secondaryFold + wrapZ

      positions.push(xCentered, y, z)
      uvs.push(u, v)
    }
  }

  const row = segmentsX + 1
  for (let j = 0; j < segmentsY; j++) {
    for (let i = 0; i < segmentsX; i++) {
      const a = j * row + i
      const b = j * row + (i + 1)
      const c = (j + 1) * row + i
      const d = (j + 1) * row + (i + 1)

      indices.push(a, c, b)
      indices.push(b, c, d)
      // Double sided backing
      indices.push(a, b, c)
      indices.push(b, d, c)
    }
  }

  geom.setIndex(indices)
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  geom.computeVertexNormals()

  return geom
}

/**
 * Creates a sweeping 3D tube drape (used for pallu, dupatta, stoles).
 */
function createSweepingRibbon({
  points,
  width = 0.24,
  segments = 50,
  twist = 0.4,
}) {
  const curve = new THREE.CatmullRomCurve3(points.map(([x, y, z]) => new THREE.Vector3(x, y, z)))
  const geom = new THREE.BufferGeometry()
  const positions = []
  const uvs = []
  const indices = []

  const steps = segments
  const frames = curve.computeFrenetFrames(steps, false)

  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const point = curve.getPointAt(t)
    const normal = frames.normals[i]
    const binormal = frames.binormals[i]
