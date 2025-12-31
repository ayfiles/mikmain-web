"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-mik-navy pt-20">
      
      {/* --- Hintergrund Effekte --- */}
      {/* 1. Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* 2. Radial Gradient für Fokus in der Mitte */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_50%,#0F172A_0%,#020617_100%)] opacity-90"></div>

      {/* --- Content Container --- */}
      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center text-center">
        
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-mik-blue/30 bg-mik-blue/10 px-3 py-1 text-sm font-medium text-mik-blue mb-6 backdrop-blur-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-mik-blue mr-2 animate-pulse"></span>
          Die neue Ära der Personalvermittlung
        </motion.div>

        {/* Headline - Kiro Bold */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.1]"
        >
          Wir finden Talente, <br className="hidden md:block" />
          die <span className="text-transparent bg-clip-text bg-gradient-to-r from-mik-blue via-blue-400 to-mik-blue animate-gradient">Zukunft gestalten.</span>
        </motion.h1>

        {/* Subline - Acumin Pro */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-mik-grey font-sans"
        >
          MikMain bietet Rundum-Lösungen für Unternehmen und Kandidaten. 
          Persönlich, effizient und mit dem Blick für das Wesentliche.
        </motion.p>

        {/* Buttons / CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          {/* Primary Button: Crimson Red */}
          <Button 
            size="lg" 
            className="bg-mik-red hover:bg-red-800 text-white font-heading font-bold text-lg h-12 px-8 shadow-lg shadow-mik-red/20 transition-all hover:scale-105"
          >
            Personal anfragen
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          {/* Secondary Button: Outline / Ghost */}
          <Button 
            variant="outline" 
            size="lg" 
            className="border-mik-grey/30 text-white hover:bg-white/5 hover:text-white font-heading font-bold text-lg h-12 px-8"
          >
            Jobs finden
          </Button>
        </motion.div>

        {/* Trust Indicators (Optional: Kleine Checkpoints) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-mik-grey/80 font-sans"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-mik-blue" />
            <span>24h Erreichbarkeit</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-mik-blue" />
            <span>Qualifizierte Vorauswahl</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-mik-blue" />
            <span>Transparente Prozesse</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}