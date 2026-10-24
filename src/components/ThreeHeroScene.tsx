import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeHeroSceneProps {
  reducedMotion?: boolean;
}

export const ThreeHeroScene: React.FC<ThreeHeroSceneProps> = ({ reducedMotion = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || reducedMotion) return;

    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGlSupported(false);
        return;
      }
    } catch {
      setWebGlSupported(false);
      return;
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Group for entire rotating object
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Digital Wireframe Sphere (Neural Core) - High contrast cobalt blue
    const sphereGeo = new THREE.IcosahedronGeometry(4.2, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x1d4ed8,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    mainGroup.add(sphereMesh);

    // 2. Inner Glowing Core - Vivid Electric Cyan
    const innerGeo = new THREE.IcosahedronGeometry(2.4, 3);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      wireframe: true,
      transparent: true,
      opacity: 0.75,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 3. Orbital Ring 1 (Cyber Orbit)
    const ringGeo1 = new THREE.TorusGeometry(5.8, 0.05, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.85,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    // 4. Orbital Ring 2 (Purple Accent)
    const ringGeo2 = new THREE.TorusGeometry(6.6, 0.04, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.65,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 4;
    mainGroup.add(ring2);

    // 5. Constellation Points (Starfield / Neural Nodes)
    const particleCount = 220;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorBlue = new THREE.Color(0x1d4ed8);
    const colorCyan = new THREE.Color(0x0284c7);
    const colorPurple = new THREE.Color(0x7c3aed);

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 4.2 + (Math.random() - 0.5) * 1.8;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const chosenColor = Math.random() > 0.6 ? colorBlue : Math.random() > 0.3 ? colorCyan : colorPurple;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 2;
      mouseY = -(y / rect.height) * 2;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Responsive Resize Handler
    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', onResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      targetX += (mouseX * 0.45 - targetX) * 0.05;
      targetY += (mouseY * 0.45 - targetY) * 0.05;

      mainGroup.rotation.y = elapsedTime * 0.12 + targetX;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.15) * 0.1 + targetY;

      innerMesh.rotation.y = -elapsedTime * 0.2;
      innerMesh.rotation.z = elapsedTime * 0.15;

      ring1.rotation.z = elapsedTime * 0.18;
      ring2.rotation.y = -elapsedTime * 0.14;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      innerGeo.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      particleGeo.dispose();
      sphereMat.dispose();
      innerMat.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      particleMat.dispose();
    };
  }, [reducedMotion]);

  if (reducedMotion || !webGlSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-sky-300 bg-gradient-to-tr from-blue-100 via-sky-50 to-indigo-100 backdrop-blur-xl flex items-center justify-center shadow-lg">
          <div className="w-48 h-48 rounded-full border border-blue-400 animate-pulse flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-sky-200 blur-md"></div>
          </div>
        </div>
      </div>
    );
  }

  return <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
};
