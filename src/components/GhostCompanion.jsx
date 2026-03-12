import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const GhostCompanion = ({ activeSection }) => {
  const canvasRef = useRef(null);
  const [intel, setIntel] = useState("SYSTEMS INITIALIZED. STANDBY...");
  
  const INTEL_LOGS = {
    hero: "ID: SAMUEL. TARGET REACHED. PROCEED WITH CAUTION.",
    about: "EXTRACTING PROFILE DATA... DUAL IDENTITY DETECTED.",
    skills: "SCANNING ARSENAL... CRITICAL TOOLS DETECTED.",
    projects: "ANALYZING DEPLOYMENTS... MULTIPLE BREACHES LOGGED.",
    experience: "HISTORY LOGS RETRIEVED. TIMELINE SECURED.",
    contact: "CHANNEL OPEN. READY FOR UPLINK.",
  };

  useEffect(() => {
    if (INTEL_LOGS[activeSection]) {
      setIntel(INTEL_LOGS[activeSection]);
    }
  }, [activeSection]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(120, 120);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 5;

    // Glitchy Core (Icosahedron)
    const geometry = new THREE.IcosahedronGeometry(1.5, 0);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const core = new THREE.Mesh(geometry, material);
    scene.add(core);

    // Orbiting Data Ring
    const ringGeo = new THREE.TorusGeometry(2, 0.02, 4, 60);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.4 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    scene.add(ring);

    let frame = 0;
    const animate = () => {
      frame++;
      core.rotation.y += 0.015;
      core.rotation.x += 0.01;
      
      // Glitch effect: rapid scale/opacity shifts occasionally
      if (frame % 60 === 0) {
        core.scale.set(1.1, 1.1, 1.1);
        material.opacity = 1;
        material.color.setHex(0xff0000); // Glitch to red
      } else if (frame % 62 === 0) {
        core.scale.set(1, 1, 1);
        material.opacity = 0.8;
        material.color.setHex(0x00f5ff);
      }

      ring.rotation.z += 0.02;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const requestID = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(requestID);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="ghost-wrap" style={{
      position: "fixed",
      bottom: "32px",
      left: "32px",
      zIndex: 2000,
      display: "flex",
      alignItems: "center",
      gap: "16px",
      pointerEvents: "none",
    }}>
      <div className="ghost-intel" style={{
        background: "rgba(0, 0, 5, 0.75)",
        border: "1px solid rgba(255, 215, 0, 0.3)",
        padding: "10px 16px",
        borderRadius: "4px",
        backdropFilter: "blur(12px)",
        maxWidth: "220px",
        opacity: 0,
        transform: "translateX(-20px)",
        animation: "intelFade 0.6s forwards 0.5s",
      }}>
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "9px",
          color: "var(--gold2)",
          letterSpacing: "0.15em",
          marginBottom: "4px",
        }}>GHOST_COMPANION@RED_TEAM_LOGS</div>
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: "11px",
          color: "var(--text)",
          lineHeight: "1.4",
        }}>{intel}</div>
      </div>
      
      <div className="ghost-canvas-container" style={{
        filter: "drop-shadow(0 0 15px rgba(0, 245, 255, 0.4))",
      }}>
        <canvas ref={canvasRef} />
      </div>

      <style>{`
        @keyframes intelFade {
          to { opacity: 1; transform: translateX(0); }
        }
        @media (max-width: 768px) {
          .ghost-wrap {
            bottom: 20px;
            left: 20px;
            transform: scale(0.85);
            transform-origin: bottom left;
          }
          .ghost-intel {
            display: none; /* Hide message on very small screens to save space */
          }
        }
      `}</style>
    </div>
  );
};

export default GhostCompanion;
