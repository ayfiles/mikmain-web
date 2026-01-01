"use client";

import React, { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, PerspectiveCamera, Environment, ContactShadows } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

function JacketModel({ color }: { color: string }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/jacke.glb");

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

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.004;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <primitive 
        ref={group} 
        object={scene} 
        scale={3.6} 
        // Position leicht nach oben korrigiert, damit es nicht unten rausfällt
        position={[0, -0.5, 0]} 
      />
    </Float>
  );
}

export default function TShirtScene() {
  const { resolvedTheme } = useTheme();
  const wireColor = resolvedTheme === "light" ? "#0a192f" : "#f8fafc";

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        {/* Wir erhöhen den fov (Field of View) leicht, um mehr Platz um das Modell zu schaffen */}
        <PerspectiveCamera makeDefault position={[0, 0, 7]} fov={50} />
        
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Suspense fallback={null}>
          <JacketModel color={wireColor} />
          {/* Ein weicher Schatten am Boden hilft gegen den "abgecutted" Look */}
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={2} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/jacke.glb");