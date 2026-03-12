import React from 'react';
import { Html } from '@react-three/drei';

const Monitor = ({ position, rotation, width = 5, height = 3.5, children, title }) => {
  const screenWidth = width - 0.2;
  const screenHeight = height - 0.2;

  // Pixel density multiplier to map 3D units to CSS pixels
  const pixelWidth = screenWidth * 200;
  const pixelHeight = screenHeight * 200;

  return (
    <group position={position} rotation={rotation}>
      {/* Monitor Bezel */}
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, 0.2]} />
        <meshStandardMaterial color="#111111" roughness={0.7} />
      </mesh>
      
      {/* Screen Black Backing */}
      <mesh position={[0, height / 2, 0.11]}>
        <planeGeometry args={[screenWidth, screenHeight]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* HTML Projection */}
      <Html
        transform
        occlude="blending"
        position={[0, height / 2, 0.12]}
        className="monitor-html"
        style={{
          width: `${pixelWidth}px`,
          height: `${pixelHeight}px`,
          background: 'rgba(10, 10, 12, 0.95)',
          border: '1px solid rgba(0, 255, 102, 0.3)',
          boxShadow: '0 0 20px rgba(0, 255, 102, 0.1) inset',
          overflowY: 'auto',
          overflowX: 'hidden',
          borderRadius: '4px',
          color: 'var(--text-primary)',
          pointerEvents: 'auto',
          padding: '0' // Override
        }}
        distanceFactor={1.5}
      >
        <div style={{ padding: '2rem', minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
          {title && (
            <div style={{
              borderBottom: '1px solid rgba(0, 255, 102, 0.3)',
              paddingBottom: '1rem',
              marginBottom: '2rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-cyber)',
              fontSize: '1.2rem',
              letterSpacing: '0.1em'
            }}>
              &gt;_ {title}
            </div>
          )}
          <div style={{ flex: 1, position: 'relative' }}>
            {children}
          </div>
        </div>
      </Html>
    </group>
  );
};

export default Monitor;
