"use client";

import { useRef, useEffect } from "react";

interface SilkProps {
  color?: string;
  speed?: number;
  scale?: number;
  noiseIntensity?: number;
  rotation?: number;
}

export default function Silk({ 
  color = "#0a192f", 
  speed = 1, 
  scale = 1, 
  noiseIntensity = 0.5,
  rotation = 0
}: SilkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // --- High-Performance Noise Algorithmus (Simplex-Artig) ---
    const perm = new Uint8Array(512);
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 0; i < 256; i++) {
      const r = (Math.random() * (256 - i)) | 0;
      const t = p[i]; p[i] = p[i + r]; p[i + r] = t;
      perm[i] = perm[i + 256] = p[i];
    }
    
    // Schneller Noise Gradient
    const grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
                   [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
                   [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
                   
    const dot = (g: number[], x: number, y: number) => g[0]*x + g[1]*y;

    const noise2D = (xin: number, yin: number) => {
      let n0, n1, n2;
      const F2 = 0.5 * (Math.sqrt(3.0) - 1.0);
      const s = (xin + yin) * F2;
      const i = Math.floor(xin + s);
      const j = Math.floor(yin + s);
      const G2 = (3.0 - Math.sqrt(3.0)) / 6.0;
      const t = (i + j) * G2;
      const X0 = i - t;
      const Y0 = j - t;
      const x0 = xin - X0;
      const y0 = yin - Y0;
      let i1, j1;
      if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; }
      const x1 = x0 - i1 + G2;
      const y1 = y0 - j1 + G2;
      const x2 = x0 - 1.0 + 2.0 * G2;
      const y2 = y0 - 1.0 + 2.0 * G2;
      const ii = i & 255;
      const jj = j & 255;
      
      const gi0 = perm[ii + perm[jj]] % 12;
      const gi1 = perm[ii + i1 + perm[jj + j1]] % 12;
      const gi2 = perm[ii + 1 + perm[jj + 1]] % 12;
      
      let t0 = 0.5 - x0 * x0 - y0 * y0;
      if (t0 < 0) n0 = 0.0;
      else { t0 *= t0; n0 = t0 * t0 * dot(grad3[gi0], x0, y0); }
      
      let t1 = 0.5 - x1 * x1 - y1 * y1;
      if (t1 < 0) n1 = 0.0;
      else { t1 *= t1; n1 = t1 * t1 * dot(grad3[gi1], x1, y1); }
      
      let t2 = 0.5 - x2 * x2 - y2 * y2;
      if (t2 < 0) n2 = 0.0;
      else { t2 *= t2; n2 = t2 * t2 * dot(grad3[gi2], x2, y2); }

      return 70.0 * (n0 + n1 + n2);
    };

    // --- Canvas Setup ---
    let width = 0, height = 0;
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // Farbe parsen
    const hex2rgb = (c: string) => {
      const r = parseInt(c.slice(1, 3), 16);
      const g = parseInt(c.slice(3, 5), 16);
      const b = parseInt(c.slice(5, 7), 16);
      return { r, g, b };
    };
    const rgb = hex2rgb(color);

    // Partikel-System für den "Seiden"-Fluss
    const particles: {x: number, y: number, vx: number, vy: number}[] = [];
    const particleCount = 400; // Mehr Partikel = dichtere Seide
    
    for(let i=0; i<particleCount; i++){
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0, 
        vy: 0
      });
    }

    let time = 0;
    
    const animate = () => {
      time += speed * 0.002;
      
      // WICHTIG: Der "Trail" Effekt (Macht es weich wie Seide)
      // Wir löschen das Bild nicht komplett, sondern malen halbtransparent drüber
      ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b}, 0.08)`;
      ctx.fillRect(0, 0, width, height);

      ctx.beginPath();
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + noiseIntensity * 0.15})`;
      ctx.lineWidth = 1.5;

      for(let i=0; i<particleCount; i++){
        const p = particles[i];
        
        // Flow Field Berechnung
        // Wir nutzen Noise um den Winkel zu bestimmen
        const angle = noise2D(p.x * 0.001 * scale, p.y * 0.001 * scale + time) * Math.PI * 4;
        
        // Bewegung
        p.vx += Math.cos(angle) * 0.2;
        p.vy += Math.sin(angle) * 0.2;
        
        // Reibung & Speed Limit
        p.vx *= 0.9;
        p.vy *= 0.9;
        p.x += p.vx * speed;
        p.y += p.vy * speed;

        // Wrap around screen (Unendlichkeits-Effekt)
        if(p.x < 0) p.x = width;
        if(p.x > width) p.x = 0;
        if(p.y < 0) p.y = height;
        if(p.y > height) p.y = 0;

        // Zeichnen (kurze Linien statt Punkte für mehr Flow)
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * 2, p.y - p.vy * 2);
      }
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [color, speed, scale, noiseIntensity]);

  return (
    <div style={{ position: 'absolute', inset: 0, transform: `rotate(${rotation}deg)` }}>
       <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}