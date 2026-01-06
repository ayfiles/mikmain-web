"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BlurText } from "@/components/react-bits/BlurText";
import Silk from "@/components/ui/Silk"; 
import TShirtScene from "@/components/ui/TShirtScene";

const LOGOS = [
  { name: "Harput", logo: "/logos/harput.svg" },
  { name: "Kostarellos", logo: "/logos/kostarellos.svg" },
  { name: "SH", logo: "/logos/sh.svg" },
  { name: "Fluffy", logo: "/logos/fluffy.svg" },
  { name: "Gärtnerei Kujtah", logo: "/logos/gartnerei-kujtah.svg" },
  { name: "Steinbergerhof", logo: "/logos/steinbergerhof.svg" },
];

export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLightMode = mounted && resolvedTheme === "light";

  return (
    <section 
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 transition-colors duration-300"
      style={{ backgroundColor: isLightMode ? '#F8FAFC' : undefined }}
    >
      
      {/* EBENE 1: GANZ HINTEN (Silk Animation) */}
      <div className="absolute inset-0 z-0 w-full h-full">
         <Silk 
           speed={4.0} 
           scale={1.0} 
           noiseIntensity={0.5} 
         />
         {!isLightMode && (
           <div className="absolute inset-0 bg-background/30 z-[1] backdrop-blur-[2px]"></div>
         )}
      </div>

      {/* EBENE 2: MITTE (3D Modell) */}
      {/* Nutzt jetzt die gleiche max-w wie die Navbar (900px) für konsistente Ausrichtung */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
        <div className="w-[95%] h-full max-w-[1200px] relative mx-auto">
          {/* pointer-events-auto ist entscheidend, damit TShirtScene Hover-Events registriert - weiter rechts für Gap */}
          <div className="absolute right-0 lg:right-[-15%] top-1/2 -translate-y-1/2 w-full lg:w-[55%] h-[70vh] pointer-events-auto">
            <TShirtScene />
          </div>
        </div>
      </div>

      {/* EBENE 3: VORNE (Content / Text / Buttons) */}
      {/* Nutzt die gleiche max-w wie die Navbar (900px) für konsistente Ausrichtung */}
      <div className="relative z-10 w-[95%] max-w-[1200px] mx-auto h-full flex flex-col justify-center pointer-events-none">
        
        <div className="flex flex-col items-start text-left max-w-[55%]"> {/* Text-Breite begrenzt für Gap zum 3D-Modell */}
            
            {/* Headline */}
            <div className="font-heading font-bold text-5xl md:text-[4.5rem] lg:text-[6.3rem] tracking-tight text-foreground mb-3 leading-[1.05]">
            <BlurText 
                text="Corporate Fashion." 
                className="text-foreground drop-shadow-2xl" 
                delay={100}
            />
            <motion.div 
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-muted-foreground via-foreground to-muted-foreground"
            >
                Concierge Level.
            </motion.div>
            </div>

            {/* Subline */}
            <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-2 text-lg md:text-xl text-muted-foreground font-sans leading-relaxed max-w-xl"
            >
            MikMain ist Ihr Concierge für Unternehmensbekleidung. 
            Wir verbinden <span className="text-foreground font-semibold">Manufaktur-Qualität</span> mit digitaler Prozess-Effizienz – vom Design bis zum Wäscheservice.
            </motion.p>

            {/* Buttons */}
            <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-5 flex flex-col sm:flex-row gap-3 w-full sm:w-auto pointer-events-auto"
            >
            <Button 
                size="lg" 
                className="bg-mik-red hover:bg-red-800 text-white font-heading font-bold text-lg h-14 px-8 shadow-[0_0_40px_-5px_#991B1B80] transition-all hover:scale-105 rounded-xl"
            >
                Plattform Demo
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button 
                variant="outline" 
                size="lg" 
                className="border-border bg-background/5 text-foreground hover:bg-foreground/10 hover:border-mik-blue/50 font-heading font-bold text-lg h-14 px-8 backdrop-blur-sm rounded-xl"
            >
                Konzept ansehen
            </Button>
            </motion.div>
        </div>

      </div>

      {/* EBENE 4: LOGO LOOP AM UNTEREN RAND */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] h-24 overflow-hidden">
        {/* Nutzt die gleiche max-w wie die Navbar (900px) für konsistente Ausrichtung */}
        <div className="relative h-full w-[95%] max-w-[1200px] mx-auto overflow-hidden">
          <div className="relative h-full flex items-center">
          <motion.div
            className="flex items-center gap-16"
            animate={{
              x: [0, `-${(140 + 64) * LOGOS.length * 2}px`],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logoItem, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[140px] h-12 flex-shrink-0"
              >
                <img
                  src={logoItem.logo}
                  alt={logoItem.name}
                  className="h-8 md:h-10 w-auto opacity-40 grayscale hover:grayscale-0 hover:opacity-60 transition-all duration-300"
                />
              </div>
            ))}
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}