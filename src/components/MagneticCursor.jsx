import React, { useEffect, useRef, useState } from 'react';

/**
 * MagneticCursor — a soft glowing dot that follows the mouse with spring lag.
 * On hovering interactive elements it expands and changes to a ring, giving
 * the site a premium "custom cursor" feel.
 */
const MagneticCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const animId = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    // Check if it's a touch device — no custom cursor needed
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterInteractive = () => {
      ringEl.style.transform = `translate(-50%, -50%) scale(2.2)`;
      ringEl.style.backgroundColor = 'var(--accent-color)';
      ringEl.style.opacity = '0.15';
      dot.style.transform = `translate(-50%, -50%) scale(0.5)`;
    };

    const onLeaveInteractive = () => {
      ringEl.style.transform = `translate(-50%, -50%) scale(1)`;
      ringEl.style.backgroundColor = 'transparent';
      ringEl.style.opacity = '0.7';
      dot.style.transform = `translate(-50%, -50%) scale(1)`;
    };

    const interactiveEls = () =>
      document.querySelectorAll('a, button, [role="button"], input, textarea');

    function bindInteractive() {
      interactiveEls().forEach((el) => {
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
    }

    function loop() {
      // Spring-lerp the ring toward the dot
      const speed = 0.12;
      ring.current.x += (pos.current.x - ring.current.x) * speed;
      ring.current.y += (pos.current.y - ring.current.y) * speed;

      dot.style.left = `${pos.current.x}px`;
      dot.style.top = `${pos.current.y}px`;
      ringEl.style.left = `${ring.current.x}px`;
      ringEl.style.top = `${ring.current.y}px`;

      animId.current = requestAnimationFrame(loop);
    }

    window.addEventListener('mousemove', onMove);
    bindInteractive();

    // Re-bind when DOM updates (for dynamically rendered elements)
    const observer = new MutationObserver(bindInteractive);
    observer.observe(document.body, { childList: true, subtree: true });

    loop();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(animId.current);
      observer.disconnect();
    };
  }, []);


  const base = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 9999,
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    willChange: 'left, top',
  };

  return (
    <>
      {/* Small solid dot */}
      <div
        ref={dotRef}
        style={{
          ...base,
          width: '8px',
          height: '8px',
          background: 'var(--accent-color)',
          transition: 'transform 0.15s ease, opacity 0.2s',
          mixBlendMode: 'multiply',
        }}
      />
      {/* Trailing ring */}
      <div
        ref={ringRef}
        style={{
          ...base,
          width: '36px',
          height: '36px',
          border: '1.5px solid var(--accent-color)',
          opacity: 0.7,
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s',
        }}
      />
    </>
  );
};

export default MagneticCursor;
