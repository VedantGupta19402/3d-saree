// AARNA — Architectural Exhibition Suspension System
// Handcrafted aged brass beam and minimal vertical tension mounts.

import { GALLERY_Y } from '../data/garments'

const brass = { color: '#C5A059', metalness: 0.88, roughness: 0.28 }
const MOUNTS = [-10.2, -6.8, -3.4, 0, 3.4, 6.8, 10.2]

export default function SuspensionBeam() {
  return (
    <group position={[0, GALLERY_Y, 0]}>
      {/* Handcrafted continuous aged brass exhibition beam */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.014, 0.014, 44, 24]} />
        <meshStandardMaterial {...brass} />
      </mesh>

      {/* Vertical architectural drop cables anchored to ceiling */}
      {MOUNTS.map((x) => (
        <group key={x} position={[x, 0, 0]}>
          {/* Tension wire extending upwards */}
          <mesh position={[0, 1.3, 0]}>
            <cylinderGeometry args={[0.003, 0.003, 2.6, 8]} />
            <meshStandardMaterial {...brass} />
          </mesh>
          {/* Brass mounting ring collar */}
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[0.022, 0.006, 12, 24]} />
            <meshStandardMaterial {...brass} />
          </mesh>
          {/* Ceiling rosette anchor */}
          <mesh position={[0, 2.58, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.02, 24]} />
            <meshStandardMaterial {...brass} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

