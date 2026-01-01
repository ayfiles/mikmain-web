"use client";

import React, { useRef, Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
        // Aktiviere Raycasting für Hover-Erkennung
        child.raycast = THREE.Mesh.prototype.raycast;
      }
    });
  }, [scene, color]);

  useFrame((state, delta) => {
    if (group.current) {
      if (isHovered) {
        // Normalisiere die Rotation auf 0-2π Bereich
        let currentRot = group.current.rotation.y;
        // Normalisiere zu 0-2π
        while (currentRot < 0) currentRot += Math.PI * 2;
        while (currentRot >= Math.PI * 2) currentRot -= Math.PI * 2;
        
        // Finde den kürzesten Weg zur Frontansicht (0)
        let targetRot = 0;
        if (currentRot > Math.PI) {
          // Wenn wir über 180° sind, rotiere rückwärts (gehe über 2π)
          targetRot = Math.PI * 2;
        }
        
        // Smooth zur Zielrotation
        const lerpSpeed = 0.1;
        group.current.rotation.y = THREE.MathUtils.lerp(
          group.current.rotation.y,
          targetRot,
          lerpSpeed
        );
        
        // Wenn wir nah genug an 0 oder 2π sind, setze auf 0
        const normalized = group.current.rotation.y % (Math.PI * 2);
        if (Math.abs(normalized) < 0.05 || Math.abs(normalized - Math.PI * 2) < 0.05) {
          group.current.rotation.y = 0;
        }
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
        {/* Unsichtbarer Hüll-Mesh für Hover-Erkennung */}
        <mesh
          position={[0, -0.5, 0]}
          scale={[3, 3, 3]}
          visible={false}
          onPointerEnter={(e: any) => {
            setIsHovered(true);
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerLeave={(e: any) => {
            setIsHovered(false);
            e.stopPropagation();
            document.body.style.cursor = 'default';
          }}
        >
          <boxGeometry args={[1, 1, 1]} />
        </mesh>
        <primitive 
          object={scene} 
          scale={1.2} 
          position={[0, -0.5, 0]}
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