import React, { useEffect, useState } from 'react';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      background: 'var(--bg)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <div style={{
        fontSize: '12px',
        fontWeight: '600',
        letterSpacing: '0.2em',
        color: 'var(--text)',
        marginBottom: '24px'
      }}>SAMUEL OLATIDOYE</div>
      
      <div style={{
        width: '200px',
        height: '1px',
        background: 'var(--border)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: `${progress}%`,
          background: 'var(--accent)',
          transition: 'width 0.1s linear'
        }} />
      </div>
    </div>
  );
};

export default Preloader;
