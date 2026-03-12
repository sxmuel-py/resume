import React, { useEffect, useState } from 'react';

/**
 * PageIntro — a full-screen black overlay that splits vertically and
 * slides off screen on mount, revealing the page content below.
 * Runs once per page load.
 */
const PageIntro = ({ onComplete }) => {
  const [phase, setPhase] = useState('visible'); // 'visible' | 'splitting' | 'done'

  useEffect(() => {
    // Brief hold, then split
    const t1 = setTimeout(() => setPhase('splitting'), 600);
    // After split animation completes, remove from DOM
    const t2 = setTimeout(() => {
      setPhase('done');
      onComplete?.();
    }, 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'done') return null;

  const panelBase = {
    position: 'fixed',
    top: 0,
    width: '50%',
    height: '100%',
    background: '#0a0a0a',
    zIndex: 9000,
    transition: 'transform 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
  };

  return (
    <>
      {/* Left panel */}
      <div style={{
        ...panelBase,
        left: 0,
        transform: phase === 'splitting' ? 'translateX(-100%)' : 'translateX(0)',
      }} />
      {/* Right panel */}
      <div style={{
        ...panelBase,
        right: 0,
        transform: phase === 'splitting' ? 'translateX(100%)' : 'translateX(0)',
      }}>
        {/* Centered logo/name shown briefly before split */}
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '100%',
          transform: 'translate(50%, -50%)',
          whiteSpace: 'nowrap',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: '1.5rem',
          color: '#fff',
          letterSpacing: '-0.03em',
          opacity: phase === 'splitting' ? 0 : 1,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          width: '200vw',
          textAlign: 'center',
        }}>
          Samuel Olatidoye
        </div>
      </div>
    </>
  );
};

export default PageIntro;
