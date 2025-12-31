"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, LayoutDashboard, Shirt, RefreshCcw } from "lucide-react";
import { BlurText } from "@/components/react-bits/BlurText";
// Pfad zu deiner Silk Komponente (angepasst auf ui Ordner)
import Silk from "@/components/ui/Silk"; 

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-mik-navy pt-20">
      
      {/* --- BACKGROUND: Der echte WebGL Silk Effekt --- */}
      <div className="absolute inset-0 z-0 w-full h-full">
         <Silk 
           color="#0a192f"      // Midnight Navy
           speed={0.8}          // Etwas langsamer für Eleganz
           scale={1.5}          // Schön großflächig
           noiseIntensity={0.5} // Mittleres Rauschen
         />
         {/* Dunkles Overlay damit der weiße Text lesbar bleibt */}
         <div className="absolute inset-0 bg-mik-navy/30 z-[1]"></div>
      </div>

      {/* --- CONTENT --- */}
      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-mik-blue/20 bg-mik-blue/10 px-4 py-1.5 text-sm font-medium text-mik-blue mb-8 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-mik-red mr-2 animate-pulse shadow-[0_0_10px_#991B1B]"></span>
          Clothing as a Service (CaaS)
        </motion.div>

        {/* Headline */}
        <div className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-white mb-6 max-w-5xl leading-[1.1]">
           <BlurText 
             text="Corporate Fashion." 
             className="text-white drop-shadow-2xl"
             delay={100}
           />
           <motion.div 
             initial={{ opacity: 0, filter: 'blur(10px)' }}
             animate={{ opacity: 1, filter: 'blur(0px)' }}
             transition={{ delay: 1, duration: 0.8 }}
             className="text-transparent bg-clip-text bg-gradient-to-r from-mik-grey via-white to-mik-grey"
           >
             Einfach. Gemanagt.
           </motion.div>
        </div>

        {/* Subline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-4 max-w-2xl text-lg md:text-xl text-mik-grey/90 font-sans leading-relaxed"
        >
          MikMain ist Ihr Concierge für Unternehmensbekleidung. 
          Wir verbinden <span className="text-white font-semibold">Manufaktur-Qualität</span> mit digitaler Prozess-Effizienz – vom Design bis zum Wäscheservice.
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
            className="border-mik-grey/20 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-mik-blue/50 font-heading font-bold text-lg h-14 px-8 backdrop-blur-sm"
          >
            Konzept ansehen
          </Button>
        </motion.div>

        {/* Features Icons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl border-t border-white/5 pt-10"
        >
          <div className="flex flex-col gap-3 group cursor-default">
            <div className="h-10 w-10 rounded-lg bg-mik-blue/10 flex items-center justify-center border border-mik-blue/20 group-hover:border-mik-blue/50 transition-colors">
              <Shirt className="h-5 w-5 text-mik-blue" />
            </div>
            <h3 className="text-white font-heading text-lg">Manufaktur & Design</h3>
            <p className="text-sm text-mik-grey">Eigene Produktion und hochwertige Stoffe. Corporate Identity, die man fühlt.</p>
          </div>
          
          <div className="flex flex-col gap-3 group cursor-default">
            <div className="h-10 w-10 rounded-lg bg-mik-blue/10 flex items-center justify-center border border-mik-blue/20 group-hover:border-mik-blue/50 transition-colors">
              <LayoutDashboard className="h-5 w-5 text-mik-blue" />
            </div>
            <h3 className="text-white font-heading text-lg">Digitale Verwaltung</h3>
            <p className="text-sm text-mik-grey">Größenmanagement, Bestellung und Bestandsdaten – alles in einer Plattform.</p>
          </div>

          <div className="flex flex-col gap-3 group cursor-default">
            <div className="h-10 w-10 rounded-lg bg-mik-red/10 flex items-center justify-center border border-mik-red/20 group-hover:border-mik-red/50 transition-colors">
              <RefreshCcw className="h-5 w-5 text-mik-red" />
            </div>
            <h3 className="text-white font-heading text-lg">Pflege & Logistik</h3>
            <p className="text-sm text-mik-grey">Professioneller Wäscheservice, Lagerung und Reparatur. Der Full-Cycle.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}