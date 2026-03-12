import React, { useEffect, useState } from 'react';

/**
 * ScrollProgress — a thin 2px line across the very top of the viewport.
 * Width grows from 0 → 100% as the user scrolls from top → bottom.
 */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '2px',
        width: `${progress}%`,
        background: 'var(--accent-color)',
        zIndex: 10000,
        transition: 'width 0.05s linear',
        transformOrigin: 'left',
        boxShadow: '0 0 8px var(--accent-color)',
      }}
    />
  );
};

export default ScrollProgress;
