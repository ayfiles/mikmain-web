"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BlurText } from "@/components/react-bits/BlurText";
import Silk from "@/components/ui/Silk"; 

export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Warten bis der Client geladen ist (verhindert Fehler/Flackern)
  useEffect(() => {
    setMounted(true);
  }, []);

  // --- HIER IST DEINE ÄNDERUNG ---
  // Wenn Light Mode: Nutze exakt #F8FAFC
  // Wenn Dark Mode: Nutze Navy (#0a192f)
  // Fallback (bevor geladen): Navy
  const silkColor = mounted && resolvedTheme === "light" ? "#F8FAFC" : "#0a192f";

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20 transition-colors duration-300">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 w-full h-full">
         <Silk 
           color={silkColor} // <--- Die Farbe wird hier übergeben
           speed={4.0} 
           scale={1.0} 
           noiseIntensity={0.5} 
         />
         
         {/* Overlay für bessere Lesbarkeit (passt sich auch an) */}
         <div className="absolute inset-0 bg-background/30 z-[1]"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 w-[95%] max-w-[900px] mx-auto px-6 flex flex-col items-start text-left">
        
        {/* Headline */}
        <div className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground mb-6 max-w-5xl leading-[1.1]">
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
          className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground font-sans leading-relaxed"
        >
          MikMain ist Ihr Concierge für Unternehmensbekleidung. 
          Wir verbinden <span className="text-foreground font-semibold">Manufaktur-Qualität</span> mit digitaler Prozess-Effizienz – vom Design bis zum Wäscheservice.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button 
            size="lg" 
            className="bg-mik-red hover:bg-red-800 text-white font-heading font-bold text-lg h-14 px-8 shadow-[0_0_30px_-5px_#991B1B80] transition-all hover:scale-105"
          >
            Plattform Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            className="border-border bg-background/5 text-foreground hover:bg-foreground/10 hover:border-mik-blue/50 font-heading font-bold text-lg h-14 px-8 backdrop-blur-sm"
          >
            Konzept ansehen
          </Button>
        </motion.div>


      </div>
    </section>
  );
}