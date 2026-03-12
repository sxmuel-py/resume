import { useRef, useCallback } from 'react';

/**
 * useTilt — returns props to spread onto a card element to get
 * a mouse-tracking 3D tilt effect with spring return on leave.
 * 
 * @param {number} maxDeg  Maximum tilt in degrees (default 10)
 */
const useTilt = (maxDeg = 10) => {
  const ref = useRef(null);

  const onMouseMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotY = ((x - cx) / cx) * maxDeg;
    const rotX = -((y - cy) / cy) * maxDeg;
    el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    el.style.transition = 'transform 0.1s ease';
  }, [maxDeg]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
};

export default useTilt;
