// AARNA — Architectural Fashion Gallery Environment
// Sculptural ivory architecture, monumental arches, reflective sandstone floor, and minimal plinths.

import { useMemo } from 'react'
import * as THREE from 'three'
import { MeshReflectorMaterial, RoundedBox } from '@react-three/drei'
import { getAarnaTexture } from './materials/aarnaMaterials'
import { garments, SPACING } from '../data/garments'

const ARCH_X = [-9.25, -5.55, -1.85, 1.85, 5.55, 9.25]

function createGalleryArchShape(w = 2.4, h = 3.6) {
  const r = w / 2
  const s = new THREE.Shape()
  s.moveTo(-r, 0)
  s.lineTo(-r, h - r)
  s.absarc(0, h - r, r, Math.PI, 0, true)
  s.lineTo(r, 0)
  s.closePath()
  return s
}

function GalleryFloor({ reflect }) {
  const sandstone = useMemo(() => getAarnaTexture('sandstone'), [])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 4]} receiveShadow>
      <planeGeometry args={[70, 32]} />
      {reflect ? (
        <MeshReflectorMaterial
          color="#D9CFC2"
          map={sandstone}
          roughness={0.78}
          metalness={0.02}
          blur={[300, 100]}
          resolution={512}
          mixBlur={0.85}
          mixStrength={0.42}
          mirror={0.28}
          depthScale={1.2}
          minDepthThreshold={0.3}
          maxDepthThreshold={1.4}
        />
      ) : (
        <meshStandardMaterial color="#D9CFC2" map={sandstone} roughness={0.85} />
      )}
    </mesh>
  )
}

function GalleryArchitecture() {
  const archGeom = useMemo(() => new THREE.ShapeGeometry(createGalleryArchShape(2.3, 3.8), 32), [])
  const sandstone = useMemo(() => getAarnaTexture('sandstone'), [])

  return (
    <group>
      {/* Monumental Ivory Back Wall */}
      <mesh position={[0, 4.5, -1.4]} receiveShadow>
        <planeGeometry args={[70, 10]} />
        <meshStandardMaterial color="#EFE9DE" roughness={0.92} />
      </mesh>

      {/* Recessed Arched Portals along the Gallery Corridor */}
      {ARCH_X.map((x) => (
        <group key={x} position={[x, 0, -1.38]}>
          {/* Outer Arch Frame */}
          <mesh geometry={archGeom} receiveShadow>
            <meshStandardMaterial color="#DCCFBD" map={sandstone} roughness={0.88} />
          </mesh>
          {/* Inner Portal Niche Depth */}
          <mesh position={[0, 1.8, -0.4]} receiveShadow>
            <boxGeometry args={[2.0, 3.4, 0.7]} />
            <meshStandardMaterial color="#302720" roughness={0.98} />
          </mesh>
          {/* Soft Gallery Portal Spotlight Glow */}
          <mesh position={[0, 3.4, -0.1]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.2, 16]} />
            <meshBasicMaterial color={[2.2, 1.8, 1.4]} toneMapped={false} />
          </mesh>
        </group>
      ))}

      {/* Curved End Pavilion Wall */}
      <mesh position={[-16, 4, 3]} rotation={[0, Math.PI / 3, 0]} receiveShadow>
        <planeGeometry args={[14, 9]} />
        <meshStandardMaterial color="#EFE9DE" roughness={0.9} />
      </mesh>
      <mesh position={[16, 4, 3]} rotation={[0, -Math.PI / 3, 0]} receiveShadow>
        <planeGeometry args={[14, 9]} />
        <meshStandardMaterial color="#EFE9DE" roughness={0.9} />
      </mesh>

      {/* Top Architectural Cornice & Concealed Linear Warm Uplight */}
      <mesh position={[0, 4.2, -1.05]} castShadow receiveShadow>
        <boxGeometry args={[70, 0.22, 0.75]} />
        <meshStandardMaterial color="#E8DFD0" roughness={0.85} />
      </mesh>
      <mesh position={[0, 4.12, -0.68]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[70, 0.05]} />
        <meshBasicMaterial color={[2.8, 2.2, 1.6]} toneMapped={false} />
      </mesh>

      {/* Architectural Base Skirting in Sandstone */}
      <mesh position={[0, 0.08, -1.35]} receiveShadow>
        <boxGeometry args={[70, 0.16, 0.08]} />
        <meshStandardMaterial color="#C7B8A2" map={sandstone} roughness={0.8} />
      </mesh>
    </group>
  )
}

const PLINTH_X = [-5.55, -3.7, -1.85, 0, 1.85, 3.7]

function ExhibitionPlinths() {
  const sandstone = useMemo(() => getAarnaTexture('sandstone'), [])
  const plinthMat = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#D6C8B4', map: sandstone, roughness: 0.82 }),
    [sandstone],
  )

  return (
    <group>
      {/* Sculptural stone plinth beneath each garment position */}
      {PLINTH_X.map((xPos, i) => {
        return (
          <group key={i} position={[xPos, 0, 0]}>
            {/* Minimalist Cylindrical Sandstone Pedestal */}
            <mesh position={[0, 0.09, 0]} receiveShadow castShadow>
              <cylinderGeometry args={[0.54, 0.58, 0.18, 36]} />
              <primitive object={plinthMat} attach="material" />
            </mesh>
            {/* Inner Plinth Inset Rim in Antique Brass */}
            <mesh position={[0, 0.182, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <ringGeometry args={[0.46, 0.49, 36]} />
              <meshStandardMaterial color="#C5A059" metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Plinth Uplight Glow Disc */}
            <mesh position={[0, 0.184, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <circleGeometry args={[0.18, 24]} />
              <meshBasicMaterial color={[1.8, 1.5, 1.1]} toneMapped={false} transparent opacity={0.35} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

export default function GalleryRoom({ reflect }) {
  return (
    <group>
      <GalleryFloor reflect={reflect} />
      <GalleryArchitecture />
      <ExhibitionPlinths />
    </group>
  )
}

