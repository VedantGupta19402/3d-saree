// AARNA — Interactive 3D Garment Component
// Smooth pendulum sway, inspection orbit, interactive color changing, and physics motion.

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { buildAarnaGarment } from './geometry/aarnaFactory'
import { createAarnaMaterial, createAarnaHardware } from './materials/aarnaMaterials'
import { rail, wrapX, garmentBounds } from './railState'
import { SPACING, FOCUS_Z, GALLERY_Y } from '../data/garments'
import { useCloset } from '../store/useCloset'

const { damp, lerp } = THREE.MathUtils
const TAU = Math.PI * 2
const WHITE = new THREE.Color('#ffffff')
const proxyMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, colorWrite: false })

export default function AarnaGarment({ item, index }) {
  const group = useRef()
  const built = useMemo(() => buildAarnaGarment(item), [item])
  const material = useMemo(() => createAarnaMaterial(item), [item])
  const hardwareMaterial = useMemo(() => createAarnaHardware(), [])

  const colorIndex = useCloset((s) => s.colors[item.id] ?? 0)
  const isSelected = useCloset((s) => s.selected === index)
  const isHovered = useCloset((s) => s.hovered === index)

  // Simulation state: pendulum sway, hover lift, inspect rotation, and cloth physics
  const sim = useRef({
    angle: 0,
    angVel: 0,
    twist: 0,
    hover: 0,
    rotY: 0,
    t: { v: 0 },
    stiffness: 28 / Math.max(built.bounds.h, 0.7),
    phase: index * 1.85,
  })

  useEffect(() => {
    garmentBounds[index] = built.bounds
  }, [built, index])

  // Smooth color transitions with GSAP
  useEffect(() => {
    const target = new THREE.Color(item.colors[colorIndex].hex)
    const sheen = target.clone().lerp(WHITE, 0.45)
    gsap.to(material.color, { r: target.r, g: target.g, b: target.b, duration: 0.8, ease: 'power2.out' })
    gsap.to(material.sheenColor, { r: sheen.r, g: sheen.g, b: sheen.b, duration: 0.8, ease: 'power2.out' })
  }, [colorIndex, item, material])

  // Inspect transition blend
  useEffect(() => {
    const t = sim.current.t
    gsap.killTweensOf(t)
    gsap.to(t, { v: isSelected ? 1 : 0, duration: isSelected ? 1.3 : 1.0, ease: 'power3.inOut' })
  }, [isSelected])

  useEffect(() => () => {
    material.dispose()
    hardwareMaterial?.dispose()
  }, [material, hardwareMaterial])

  useFrame((state, dt) => {
    const grp = group.current
    if (!grp) return

    const clampedDt = Math.min(dt, 0.05)
    const s = sim.current

    // Linear gallery placement along track
    const baseOffset = index * SPACING + rail.offset
    const railX = wrapX(baseOffset)

    // Lift and slight forward stance when hovered
    s.hover = damp(s.hover, isHovered && !isSelected ? 1 : 0, 8, clampedDt)

    // Pendulum physics from rail motion
    const accel = -rail.velocity * 3.4
    const restAngle = THREE.MathUtils.clamp(accel * 0.16, -0.45, 0.45)
    const restoring = (restAngle - s.angle) * s.stiffness
    const ambientBreeze = Math.sin(state.clock.elapsedTime * 1.4 + s.phase) * 0.02
    s.angVel += (restoring + ambientBreeze) * clampedDt
    s.angVel *= Math.exp(-clampedDt * 2.8)
    s.angle += s.angVel * clampedDt
