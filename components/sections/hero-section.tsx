"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, LayoutDashboard, Shirt, RefreshCcw } from "lucide-react";
import { BlurText } from "@/components/react-bits/BlurText";
import Silk from "@/components/ui/Silk"; 

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-mik-navy pt-32 pb-20">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 w-full h-full">
         <Silk 
           color="#0a192f" 
           speed={4.5} 
           scale={1.0} 
           noiseIntensity={0.8} 
         />
         <div className="absolute inset-0 bg-mik-navy/30 z-[1]"></div>
      </div>

      {/* CONTENT */}
      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center max-w-[1400px]"> {/* Breiterer Container */}
        
        {/* Badge: Größer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-mik-blue/20 bg-mik-blue/10 px-6 py-2 text-base font-medium text-mik-blue mb-10 backdrop-blur-md"
        >
          <span className="flex h-3 w-3 rounded-full bg-mik-red mr-3 animate-pulse shadow-[0_0_12px_#991B1B]"></span>
          Clothing as a Service (CaaS)
        </motion.div>

        {/* Headline: MASSIV */}
        <div className="font-heading font-bold text-6xl md:text-8xl lg:text-9xl tracking-tight text-white mb-8 max-w-6xl leading-[1.05]">
           <BlurText 
             text="Corporate Fashion." 
             className="text-white drop-shadow-2xl"
             delay={100}
           />
           <motion.div 
             initial={{ opacity: 0, filter: 'blur(10px)' }}
             animate={{ opacity: 1, filter: 'blur(0px)' }}
             transition={{ delay: 1, duration: 0.8 }}
             className="text-transparent bg-clip-text bg-gradient-to-r from-mik-grey via-white to-mik-grey mt-2"
           >
             Einfach. Gemanagt.
           </motion.div>
        </div>

        {/* Subline: Größer und lesbarer */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 max-w-3xl text-xl md:text-2xl text-mik-grey/90 font-sans leading-relaxed"
        >
          MikMain ist Ihr Concierge für Unternehmensbekleidung. 
          Wir verbinden <span className="text-white font-semibold">Manufaktur-Qualität</span> mit digitaler Prozess-Effizienz – vom Design bis zum Wäscheservice.
        </motion.p>

        {/* Buttons: Oversized */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <Button 
            size="lg" 
            className="bg-mik-red hover:bg-red-800 text-white font-heading font-bold text-xl h-16 px-10 rounded-xl shadow-[0_0_40px_-10px_#991B1B80] transition-all hover:scale-105"
          >
            Plattform Demo
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            className="border-mik-grey/20 bg-white/5 text-white hover:bg-white/10 hover:text-white hover:border-mik-blue/50 font-heading font-bold text-xl h-16 px-10 rounded-xl backdrop-blur-sm"
          >
            Konzept ansehen
          </Button>
        </motion.div>

        {/* Features: Mehr Platz, größere Icons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 text-left max-w-5xl border-t border-white/10 pt-12"
        >
          {/* Feature 1 */}
          <div className="flex flex-col gap-4 group cursor-default">
            <div className="h-14 w-14 rounded-2xl bg-mik-blue/10 flex items-center justify-center border border-mik-blue/20 group-hover:border-mik-blue/50 transition-colors">
              <Shirt className="h-7 w-7 text-mik-blue" />
            </div>
            <h3 className="text-white font-heading text-xl md:text-2xl">Manufaktur & Design</h3>
            <p className="text-base md:text-lg text-mik-grey leading-relaxed">Eigene Produktion und hochwertige Stoffe. Corporate Identity, die man fühlt.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col gap-4 group cursor-default">
            <div className="h-14 w-14 rounded-2xl bg-mik-blue/10 flex items-center justify-center border border-mik-blue/20 group-hover:border-mik-blue/50 transition-colors">
              <LayoutDashboard className="h-7 w-7 text-mik-blue" />
            </div>
            <h3 className="text-white font-heading text-xl md:text-2xl">Digitale Verwaltung</h3>
            <p className="text-base md:text-lg text-mik-grey leading-relaxed">Größenmanagement, Bestellung und Bestandsdaten – alles in einer Plattform.</p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col gap-4 group cursor-default">
            <div className="h-14 w-14 rounded-2xl bg-mik-red/10 flex items-center justify-center border border-mik-red/20 group-hover:border-mik-red/50 transition-colors">
              <RefreshCcw className="h-7 w-7 text-mik-red" />
            </div>
            <h3 className="text-white font-heading text-xl md:text-2xl">Pflege & Logistik</h3>
            <p className="text-base md:text-lg text-mik-grey leading-relaxed">Professioneller Wäscheservice, Lagerung und Reparatur. Der Full-Cycle.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}