"use client";

import React, { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

function JacketModel({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/jacke.glb");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = new THREE.MeshBasicMaterial({
          color: color,
          wireframe: true,
          transparent: true,
          opacity: 0.25,
        });
      }
    });
  }, [scene, color]);

  useFrame((state, delta) => {
    if (group.current) {
      if (isHovered) {
        // Berechnet den kürzesten Weg zur Frontansicht (0, 2PI, etc.)
        const currentRot = group.current.rotation.y;
        const targetRot = Math.round(currentRot / (Math.PI * 2)) * (Math.PI * 2);
        
        group.current.rotation.y = THREE.MathUtils.lerp(
          currentRot,
          targetRot,
          0.1
        );
      } else {
        // Kontinuierliche 360 Grad Rotation
        group.current.rotation.y += 0.004;
      }
    }
  });

  return (
    <group ref={group}>
      <Float 
        speed={1.5} 
        rotationIntensity={isHovered ? 0 : 0.2} 
        floatIntensity={0.5}
      >
        {/* Modell doppelt so groß (4.8) */}
        <primitive 
          object={scene} 
          scale={4.8} 
          position={[0, 0, 0]}
          onPointerOver={() => {
            setIsHovered(true);
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            setIsHovered(false);
            document.body.style.cursor = 'default';
          }}
        />
      </Float>
    </group>
  );
}

export default function TShirtScene() {
  const { resolvedTheme } = useTheme();
  const wireColor = resolvedTheme === "light" ? "#0a192f" : "#f8fafc";

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        {/* Kamera-Distanz angepasst für das größere Modell */}
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
        
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Suspense fallback={null}>
          <JacketModel color={wireColor} />
          {/* Schattenposition und Skalierung an die neue Größe angepasst */}
          <ContactShadows 
            position={[0, -4.5, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2.5} 
            far={5} 
          />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/jacke.glb");