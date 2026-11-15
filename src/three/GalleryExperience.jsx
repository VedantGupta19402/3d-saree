// AARNA — Spatial 3D Fashion Gallery Experience
// Independent Three.js canvas hosting the architectural gallery and interactive garments.

import { Component, Suspense, useEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { PerformanceMonitor, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import GalleryLights from './GalleryLights'
import GalleryRoom from './GalleryRoom'
import SuspensionBeam from './SuspensionBeam'
import AarnaGarment from './AarnaGarment'
import RailControls from './RailControls'
import AarnaCameraRig from './AarnaCameraRig'
import { garments, BRAND } from '../data/garments'
import { useCloset } from '../store/useCloset'
import { useMediaQuery } from '../lib/useMediaQuery'
import { prepareScene, hasWebGL } from '../lib/preload'

const BG = BRAND.palette.warmIvory // '#F4F0E8'

function GalleryReadySignal() {
  const { gl, scene, camera } = useThree()
  useEffect(() => {
    let cancelled = false
    let raf = 0
    let fallback = 0
    const done = () => !cancelled && useCloset.getState().setSceneReady()
    ;(async () => {
      try {
        await gl.compileAsync?.(scene, camera)
      } catch {}
      if (cancelled) return
      useCloset.getState().setProgress(1)
      raf = requestAnimationFrame(() => (raf = requestAnimationFrame(done)))
      fallback = setTimeout(done, 1200)
    })()
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      clearTimeout(fallback)
    }
  }, [gl, scene, camera])
  return null
}

class GalleryBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error) {
    console.error('[AARNA] 3D gallery error caught:', error)
    useCloset.getState().setSceneError(error)
  }
  render() {
    return this.state.failed ? <GalleryFallback /> : this.props.children
  }
}

function GalleryFallback() {
  return (
    <div className="stage__fallback">
      <p>AARNA 3D Atelier</p>
      <span>Interactive WebGL gallery active on modern GPUs.</span>
    </div>
  )
}

function GalleryScene() {
  const compact = useMediaQuery('(max-width: 820px), (pointer: coarse)')
  const [dpr, setDpr] = useState(() => Math.min(window.devicePixelRatio, compact ? 1.5 : 1.75))
  const [high, setHigh] = useState(!compact)
  const [prepared, setPrepared] = useState(false)

  useEffect(() => {
    let alive = true
    prepareScene()
      .then(() => alive && setPrepared(true))
      .catch((error) => {
