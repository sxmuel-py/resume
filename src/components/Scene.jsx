import React from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

export default function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={45} />
      <OrbitControls makeDefault enableDamping dampingFactor={0.05} enableZoom={true} minDistance={3} maxDistance={20} />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 10, 5]} intensity={2} color="#00ff66" />
      <directionalLight position={[-10, 10, 5]} intensity={0.5} />

      {/* Desk floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#070708" />
      </mesh>

      {/* Desk surface */}
      <mesh position={[0, -0.04, -1]}>
        <boxGeometry args={[20, 0.1, 5]} />
        <meshStandardMaterial color="#0d0d0e" roughness={0.9} />
      </mesh>

      {/* Center Monitor Bezel */}
      <mesh position={[0, 1.5, -2]}>
        <boxGeometry args={[5, 3.5, 0.2]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      {/* Center Screen */}
      <mesh position={[0, 1.5, -1.85]}>
        <planeGeometry args={[4.8, 3.3]} />
        <meshBasicMaterial color="#001a0d" />
      </mesh>
      {/* Glowing scan lines */}
      {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 1.7, -1.84]}>
          <planeGeometry args={[0.04, 3.0]} />
          <meshBasicMaterial color="#00ff66" transparent opacity={[0.15, 0.3, 0.2, 0.15][i]} />
        </mesh>
      ))}

      {/* Left Monitor */}
      <group position={[-6, 0, -1]} rotation={[0, Math.PI / 6, 0]}>
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[4.5, 3, 0.2]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        <mesh position={[0, 1.5, 0.11]}>
          <planeGeometry args={[4.3, 2.8]} />
          <meshBasicMaterial color="#000d07" />
        </mesh>
      </group>

      {/* Right Monitor */}
      <group position={[6, 0, -1]} rotation={[0, -Math.PI / 6, 0]}>
        <mesh position={[0, 1.5, 0]}>
          <boxGeometry args={[4.5, 3, 0.2]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
        <mesh position={[0, 1.5, 0.11]}>
          <planeGeometry args={[4.3, 2.8]} />
          <meshBasicMaterial color="#000d07" />
        </mesh>
      </group>
    </>
  );
}
