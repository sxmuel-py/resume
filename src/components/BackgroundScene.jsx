import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const BackgroundScene = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      600
    );
    camera.position.z = 90;

    // 4000 particles — gold + cyan mix
    const particleCount = 4000;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    const col1 = new THREE.Color(0xffd700);
    const col2 = new THREE.Color(0x00f5ff);
    const col3 = new THREE.Color(0xff8c00);
    const availableCols = [col1, col2, col3];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 280;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 280;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.025;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.025;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.015;
      
      const c = availableCols[Math.floor(Math.random() * 3)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Giant wireframe structures
    const structs = [];
    const geometries = [
      new THREE.IcosahedronGeometry(22, 1),
      new THREE.OctahedronGeometry(18, 0),
      new THREE.IcosahedronGeometry(12, 0),
      new THREE.IcosahedronGeometry(8, 0),
      new THREE.OctahedronGeometry(14, 0),
    ];

    for (let i = 0; i < 10; i++) {
      const g = geometries[i % geometries.length];
      const col = i % 3 === 0 ? 0xffd700 : i % 3 === 1 ? 0xff8c00 : 0x00f5ff;
      const m = new THREE.MeshBasicMaterial({
        color: col,
        wireframe: true,
        transparent: true,
        opacity: 0.03 + Math.random() * 0.04,
      });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(
        (Math.random() - 0.5) * 180,
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 100 - 20
      );
      mesh.userData = {
        rx: (Math.random() - 0.5) * 0.005,
        ry: (Math.random() - 0.5) * 0.007,
        fy: Math.random() * 0.0004 + 0.0002,
        fa: Math.random() * 4 + 2,
        fo: Math.random() * Math.PI * 2,
      };
      scene.add(mesh);
      structs.push(mesh);
    }

    // Web of connection lines
    for (let i = 0; i < 50; i++) {
      const x1 = (Math.random() - 0.5) * 240,
            y1 = (Math.random() - 0.5) * 200,
            z1 = (Math.random() - 0.5) * 120;
      const x2 = x1 + (Math.random() - 0.5) * 80,
            y2 = y1 + (Math.random() - 0.5) * 80,
            z2 = z1 + (Math.random() - 0.5) * 40;
      
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x1, y1, z1),
        new THREE.Vector3(x2, y2, z2),
      ]);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: Math.random() > 0.5 ? 0xffd700 : 0x00f5ff,
        transparent: true,
        opacity: 0.03 + Math.random() * 0.04,
      });
      scene.add(new THREE.Line(lineGeometry, lineMaterial));
    }

    let mouseX = 0, mouseY = 0, time = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      const requestID = requestAnimationFrame(animate);
      time += 0.004;

      const pArray = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pArray[i * 3] += velocities[i * 3];
        pArray[i * 3 + 1] += velocities[i * 3 + 1];
        pArray[i * 3 + 2] += velocities[i * 3 + 2];

        if (Math.abs(pArray[i * 3]) > 140) velocities[i * 3] *= -1;
        if (Math.abs(pArray[i * 3 + 1]) > 140) velocities[i * 3 + 1] *= -1;
        if (Math.abs(pArray[i * 3 + 2]) > 100) velocities[i * 3 + 2] *= -1;
      }
      geometry.attributes.position.needsUpdate = true;

      structs.forEach((m) => {
        m.rotation.x += m.userData.rx;
        m.rotation.y += m.userData.ry;
        m.position.y += Math.sin(time * m.userData.fy * 1000 + m.userData.fo) * m.userData.fa * 0.0025;
      });

      camera.position.x += (mouseX * 14 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 9 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      return requestID;
    };

    const requestID = animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(requestID);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="bgc" style={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
  }} />;
};

export default BackgroundScene;
