import React, { useEffect, useRef } from 'react';

/**
 * DustParticles — subtle floating particle canvas animation.
 * Renders dozens of tiny drifting dots that slowly move upward
 * and fade in/out, similar to the Antigravity landing page effect.
 */
const DustParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animFrameId;
    let particles = [];

    const PARTICLE_COUNT = 80;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function randomBetween(a, b) {
      return a + Math.random() * (b - a);
    }

    function createParticle() {
      return {
        x: randomBetween(0, canvas.width),
        y: randomBetween(0, canvas.height),
        radius: randomBetween(0.5, 2.2),
        vx: randomBetween(-0.12, 0.12),
        vy: randomBetween(-0.35, -0.08),  // drift upward
        life: randomBetween(0, 1),         // current opacity phase
        lifeSpeed: randomBetween(0.002, 0.006),
        maxOpacity: randomBetween(0.08, 0.3),
      };
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
      }
    }

    function getAccentColor() {
      // read the CSS variable so it respects light/dark theme
      return getComputedStyle(document.documentElement)
        .getPropertyValue('--accent-color')
        .trim() || '#0066cc';
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const accentColor = getAccentColor();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // fade in / out using a sine curve
        p.life += p.lifeSpeed;
        const opacity = p.maxOpacity * Math.sin(p.life * Math.PI);

        // move
        p.x += p.vx;
        p.y += p.vy;

        // recycle if faded out or off screen
        if (p.life >= 1 || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[i] = createParticle();
          // respawn at the bottom third so upward drift looks natural
          particles[i].y = randomBetween(canvas.height * 0.5, canvas.height);
          particles[i].life = 0;
          continue;
        }

        if (opacity <= 0) continue;

        ctx.save();
        ctx.globalAlpha = Math.max(0, opacity);
        ctx.fillStyle = accentColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameId = requestAnimationFrame(tick);
    }

    resize();
    initParticles();
    tick();

    window.addEventListener('resize', () => {
      resize();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default DustParticles;
