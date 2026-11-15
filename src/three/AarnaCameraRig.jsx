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
