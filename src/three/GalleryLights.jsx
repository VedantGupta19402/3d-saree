// AARNA — Architectural Gallery Lighting
// Warm natural sunlight, soft ambient occlusion, and delicate exhibition spotlights.

import { useRef } from 'react'
import * as THREE from 'three'

export default function GalleryLights({ shadowSize = 2048 }) {
  const dirLight = useRef()

  return (
    <group>
      {/* Warm natural skylight ambient fill */}
      <hemisphereLight skyColor="#FDFBF7" groundColor="#C7B8A2" intensity={1.15} />

      {/* Main architectural sunlight pouring through gallery arches */}
      <directionalLight
        ref={dirLight}
        position={[7, 11, 8]}
        intensity={2.8}
        color="#FFF4E0"
        castShadow
        shadow-mapSize={[shadowSize, shadowSize]}
        shadow-camera-near={1}
        shadow-camera-far={35}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={8}
        shadow-camera-bottom={-4}
        shadow-bias={-0.0003}
      />

      {/* Soft cool fill from opposite side */}
      <directionalLight position={[-6, 6, 4]} intensity={0.65} color="#D8E2DC" />

      {/* Delicate golden rim backlight to illuminate fabric contours & sheer edges */}
      <directionalLight position={[0, 3.5, -4.5]} intensity={1.35} color="#FFE8C8" />

      {/* Warm architectural cove light from top */}
      <pointLight position={[0, 4.5, -0.5]} intensity={1.4} distance={14} color="#FFE6C2" decay={2} />

      {/* Soft spotlight highlighting the active inspection focus area */}
      <spotLight
        position={[0, 4.2, 3.8]}
        target-position={[0, 1.2, 1.2]}
        intensity={2.2}
        angle={0.55}
        penumbra={0.8}
        color="#FFFBF2"
        castShadow
      />
    </group>
  )
}

