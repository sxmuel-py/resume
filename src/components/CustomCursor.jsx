import React, { useEffect, useRef } from "react";

const CustomCursor = () => {
  const c1Ref = useRef(null);
  const c2Ref = useRef(null);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
    };

    const animate = () => {
      const { mx, my, rx, ry } = pos.current;
      pos.current.rx += (mx - rx) * 0.1;
      pos.current.ry += (my - ry) * 0.1;

      if (c1Ref.current) {
        c1Ref.current.style.transform = `translate(${mx - 4}px,${my - 4}px)`;
      }
      if (c2Ref.current) {
        c2Ref.current.style.transform = `translate(${pos.current.rx - 19}px,${pos.current.ry - 19}px)`;
      }
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const requestID = requestAnimationFrame(animate);

    const handleMouseEnter = () => c2Ref.current?.classList.add("big");
    const handleMouseLeave = () => c2Ref.current?.classList.remove("big");

    const interactive = document.querySelectorAll("a, button, .pjcard, .skcard");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestID);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="cur" ref={c1Ref} style={{
        width: "8px",
        height: "8px",
        background: "var(--gold)",
        borderRadius: "50%",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "screen",
      }} />
      <div id="cur2" ref={c2Ref} style={{
        width: "38px",
        height: "38px",
        border: "1.5px solid var(--gold)",
        borderRadius: "50%",
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9998,
        opacity: 0.55,
        transition: "width 0.18s, height 0.18s, border-color 0.2s, opacity 0.2s",
      }} />
      <style>{`
        #cur2.big {
          width: 64px;
          height: 64px;
          border-color: var(--cyan);
          opacity: 0.9;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
