// AARNA — Cinematic Camera Rig
// Blends between scroll choreography, grand intro reveal, and intimate garment inspection.

import { useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { rail, garmentBounds, centerTargetFor, snapTarget } from './railState'
import { GALLERY_Y, FOCUS_Z } from '../data/garments'
import { useCloset } from '../store/useCloset'

const { damp, degToRad } = THREE.MathUtils
const INTRO_POS = new THREE.Vector3(2.4, 4.2, 12.5)
const INTRO_LOOK = new THREE.Vector3(0, 1.8, 0)

const pos = new THREE.Vector3()
const look = new THREE.Vector3()
const tmp = new THREE.Vector3()
const iPos = new THREE.Vector3()
const iLook = new THREE.Vector3()
const curLook = new THREE.Vector3(0, 1.4, 0)

export default function AarnaCameraRig() {
  // When an item is selected or closed
  useEffect(
    () =>
      useCloset.subscribe((s, prev) => {
        if (s.selected === prev.selected) return
        if (s.selected !== null) {
          rail.focusIndex = s.selected
          rail.target = centerTargetFor(s.selected)
          if (prev.selected === null) rail.rot.current = rail.rot.target = 0
          rail.lastInteraction = performance.now()
          gsap.to(rail.inspect, { v: 1, duration: 1.35, ease: 'power3.inOut', overwrite: true })
        } else {
          snapTarget()
          rail.rot.target = Math.round(rail.rot.current / (Math.PI * 2)) * Math.PI * 2
          gsap.to(rail.inspect, { v: 0, duration: 1.1, ease: 'power3.inOut', overwrite: true })
        }
      }),
    [],
  )

  // Cinematic intro fly-down when opening sequence concludes
  useEffect(
    () =>
      useCloset.subscribe((s, prev) => {
        if (s.ready && !prev.ready) {
          rail.target = 0
          gsap.to(rail.intro, { v: 1, duration: 2.8, ease: 'expo.inOut' })
        }
      }),
    [],
  )

  useFrame((state, delta) => {
    const dt = Math.min(delta, 1 / 30)
    const { camera, size, pointer } = state
    const aspect = size.width / size.height
    const isMobile = size.width <= 820
    const fac = aspect >= 1.2 ? 1 : Math.min(1.85, Math.pow(1.2 / aspect, 0.65))

    const c = rail.cam
    look.set(c.lx, c.ly, c.lz)
    pos.set(c.px, c.py, c.pz).sub(look).multiplyScalar(fac).add(look)

    const k = rail.intro.v
    if (k < 1) {
      pos.lerpVectors(tmp.copy(INTRO_POS), pos, k)
      look.lerpVectors(tmp.copy(INTRO_LOOK), look, k)
    }

    const iv = rail.inspect.v
    // Subtle parallax response to pointer
    pos.x += pointer.x * 0.18 * (1 - iv) * k
    pos.y += pointer.y * 0.1 * (1 - iv) * k

    // Offset camera when inspection drawer is open so the garment is perfectly framed beside it
    if (iv > 0.0005) {
      const b = garmentBounds[rail.focusIndex] ?? { w: 0.7, h: 1.1, cy: -0.55 }
      const tanH = Math.tan(degToRad(camera.fov) / 2)
      let d
      let offX = 0
      let offY = 0

      if (!isMobile) {
        d = Math.max(2.1, b.h / (0.65 * 2 * tanH))
        const visW = 2 * d * tanH * aspect
        const panelWidth = Math.min(520, size.width * 0.44)
        offX = (panelWidth / 2 / size.width) * visW
      } else {
        d = Math.max(b.h / (0.48 * 2 * tanH), (b.w * 1.15) / (2 * tanH * aspect))
        offY = -(2 * d * tanH) * 0.22
      }

      iLook.set(offX, GALLERY_Y - 0.05 + (b.cy ?? -0.55) + offY, FOCUS_Z)
      iPos.set(offX, iLook.y + 0.12 - offY * 0.25, FOCUS_Z + d)
      pos.lerp(iPos, iv)
      look.lerp(iLook, iv)
    }

    const lambda = 3.4 + iv * 2.2
    camera.position.x = damp(camera.position.x, pos.x, lambda, dt)
    camera.position.y = damp(camera.position.y, pos.y, lambda, dt)
    camera.position.z = damp(camera.position.z, pos.z, lambda, dt)
    curLook.x = damp(curLook.x, look.x, lambda, dt)
    curLook.y = damp(curLook.y, look.y, lambda, dt)
    curLook.z = damp(curLook.z, look.z, lambda, dt)
    camera.lookAt(curLook)
  })

  return null
}

