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

    // Natural secondary cloth twist
    s.twist = damp(s.twist, THREE.MathUtils.clamp(rail.velocity * 0.12, -0.22, 0.22), 6, clampedDt)

    // Idle and interactive rotation in inspection mode
    const inspectT = s.t.v
    if (isSelected) {
      if (!rail.dragging) {
        // Subtle organic breathing drift when idle
        rail.rot.target += clampedDt * 0.25
      }
      rail.rot.current = damp(rail.rot.current, rail.rot.target, 8, clampedDt)
      s.rotY = rail.rot.current
    } else {
      s.rotY = damp(s.rotY, 0, 5, clampedDt)
    }

    // Blend from gallery suspension position to inspection focal position
    const currentX = lerp(railX, 0, inspectT)
    const currentY = lerp(GALLERY_Y + s.hover * 0.04, GALLERY_Y - 0.05, inspectT)
    const currentZ = lerp(s.hover * 0.12, FOCUS_Z, inspectT)

    grp.position.set(currentX, currentY, currentZ)

    // Realistic cloth sway and subtle air currents in the gallery space
    const time = state.clock.elapsedTime
    const airCurrent = Math.sin(time * 1.25 + s.phase) * 0.018
    const flutter = Math.cos(time * 1.9 + s.phase * 1.3) * 0.009

    grp.rotation.x = (s.angle + airCurrent) * (1 - inspectT * 0.95)
    grp.rotation.y = (s.twist + flutter) * (1 - inspectT) + s.rotY * inspectT
    grp.rotation.z = Math.sin(time * 0.92 + s.phase) * 0.015 * (1 - inspectT)
  })

  const onClick = (e) => {
    e.stopPropagation()
    // Ignore click if user was dragging the gallery track
    if (Math.abs(rail.dragDist) > 8) return
    const st = useCloset.getState()
    if (st.selected === index) {
      st.close()
    } else {
      st.select(index)
    }
  }

  const { w, h, d } = built.bounds

  return (
    <group ref={group}>
      {/* Handcrafted Teak & Brass Exhibition Hanger */}
      <group position={[0, -0.015, 0]}>
        {/* Brass suspension hook */}
        <mesh position={[0, 0.055, 0]}>
          <torusGeometry args={[0.045, 0.005, 12, 24, Math.PI * 1.3]} />
          <primitive object={hardwareMaterial} attach="material" />
        </mesh>
        {/* Sculptural wooden hanger contoured bar */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[0.44, 0.024, 0.038]} />
          <meshStandardMaterial color="#302720" roughness={0.65} />
        </mesh>
      </group>

      {/* 3D Parametric Garment Mesh */}
      <mesh geometry={built.geometry} material={material} castShadow receiveShadow />

      {/* Invisible bounding box for precision touch/click hit-testing */}
      <mesh
        material={proxyMaterial}
        position={[0, -h / 2, 0]}
        scale={[w * 1.25, h * 1.1, Math.max(d * 1.8, 0.35)]}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          useCloset.getState().setHovered(index)
        }}
        onPointerOut={() => {
          useCloset.getState().setHovered(null)
        }}
      >
        <boxGeometry />
      </mesh>
    </group>
  )
}

