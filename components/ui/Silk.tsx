"use client";

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, useLayoutEffect, useEffect, useState } from 'react';
import { Color, Mesh, ShaderMaterial, Vector2 } from 'three';
import { useTheme } from 'next-themes';

// Helper: Hex zu RGB Array
const hexToNormalizedRGB = (hex: string) => {
  const cleanHex = hex.replace('#', '');
  return [
    parseInt(cleanHex.slice(0, 2), 16) / 255,
    parseInt(cleanHex.slice(2, 4), 16) / 255,
    parseInt(cleanHex.slice(4, 6), 16) / 255
  ];
};

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  // Wellenbewegung
  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  // Komplexes Muster
  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

interface SilkPlaneProps {
  uniforms: {
    uSpeed: { value: number };
    uScale: { value: number };
    uNoiseIntensity: { value: number };
    uColor: { value: Color };
    uRotation: { value: number };
    uTime: { value: number };
  };
}

// Interne Komponente für das Mesh
const SilkPlane = ({ uniforms }: SilkPlaneProps) => {
  const meshRef = useRef<Mesh>(null);
  const { viewport } = useThree();

  // Mesh an Viewport anpassen
  useLayoutEffect(() => {
    if (meshRef.current) {
      meshRef.current.scale.set(viewport.width, viewport.height, 1);
    }
  }, [viewport]);

  // Aktualisiere die Farbe, wenn sich die Uniforms ändern
  useEffect(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as ShaderMaterial;
      if (material.uniforms && material.uniforms.uColor) {
        material.uniforms.uColor.value.copy(uniforms.uColor.value);
      }
    }
  }, [uniforms.uColor]);

  // Die Animations-Schleife
  useFrame((state, delta) => {
    if (meshRef.current) {
       const material = meshRef.current.material as ShaderMaterial;
       // HIER war der Faktor oft zu klein. Wir erhöhen ihn.
       // Wir nutzen uSpeed direkt aus den Uniforms im Shader, 
       // aber uTime muss stetig wachsen.
       if(material.uniforms && material.uniforms.uTime) {
          material.uniforms.uTime.value += delta * 0.5; // Schnellerer Time-Step
       }
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 64, 64]} /> 
      {/* Mehr Segmente (64x64) für weichere Wellen */}
      <shaderMaterial 
        uniforms={uniforms} 
        vertexShader={vertexShader} 
        fragmentShader={fragmentShader} 
        transparent={true}
      />
    </mesh>
  );
};

interface SilkProps {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
}

const Silk = ({ speed = 1, scale = 1, color, noiseIntensity = 0.5, rotation = 0 }: SilkProps) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Wenn keine Farbe übergeben wurde, verwende Theme-basierte Farbe
  const silkColor = color || (mounted && resolvedTheme === "light" ? "#F8FAFC" : "#0a192f");
  
  // Uniforms einmalig erstellen
  const uniforms = useMemo(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...hexToNormalizedRGB(silkColor)) },
      uRotation: { value: rotation },
      uTime: { value: 0 }
    }),
    [speed, scale, noiseIntensity, silkColor, rotation]
  );

  return (
    <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <Canvas 
          dpr={[1, 2]} // Pixel-Ratio für scharfe Kanten
          frameloop="always" // Erzwingt Animation
          camera={{ position: [0, 0, 1], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
        >
          <SilkPlane uniforms={uniforms} />
        </Canvas>
    </div>
  );
};

export default Silk;