"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

function LogoMesh() {
  const meshRef = useRef<THREE.Group>(null);
  
  // SVG laden
  const svgData = useLoader(SVGLoader, "/mikmain kurzlogo.svg");
  
  // SVG zu 3D Geometrie konvertieren
  const shapes = useMemo(() => {
    const allShapes: THREE.Shape[] = [];
    
    svgData.paths.forEach((path) => {
      const pathShapes = SVGLoader.createShapes(path);
      allShapes.push(...pathShapes);
    });
    
    return allShapes;
  }, [svgData]);
  
  // Extrudierte Geometrie mit Wireframe erstellen
  const geometries = useMemo(() => {
    const extrudeSettings = {
      depth: 50,
      bevelEnabled: true,
      bevelThickness: 10,
      bevelSize: 5,
      bevelOffset: 0,
      bevelSegments: 3,
    };
    
    return shapes.map((shape) => {
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
      // Zentrieren
      geometry.center();
      return geometry;
    });
  }, [shapes]);

  // 360° Rotation Animation
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5; // Geschwindigkeit der Rotation
    }
  });

  return (
    <group ref={meshRef} scale={0.08} rotation={[Math.PI, 0, 0]}>
      {geometries.map((geometry, index) => (
        <mesh key={index} geometry={geometry}>
          {/* Solides Material */}
          <meshStandardMaterial 
            color="#ffffff" 
            metalness={0.3}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function FallbackMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}

export function Logo3D({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 150], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Suspense fallback={<FallbackMesh />}>
          <LogoMesh />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Logo3D;

