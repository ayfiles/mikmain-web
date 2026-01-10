"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BranchCarousel3D } from "@/components/ui/branch-carousel-3d";
import { BRANCH_DATA } from "@/components/ui/infinite-branch-cards";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Upload } from "lucide-react";
import FullCatalogModal from "@/components/ui/full-catalog-modal"; 
// HIER GEÄNDERT: Geschweifte Klammern { } hinzugefügt (Named Import)
import { CatalogRequestModal } from "@/components/ui/catalog-request-modal"; 

interface CatalogSectionProps {
  isOpenProp?: boolean;
  onCloseProp?: () => void;
}

export function CatalogSection({ isOpenProp, onCloseProp }: CatalogSectionProps) {
  // State für "Gesamtkatalog" (Blätterkatalog)
  const [isFullCatalogOpen, setIsFullCatalogOpen] = useState(false);
  
  // State für "Personalisierter Katalog" (Logo Upload Popup)
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  // Reagiert auf Öffnen vom Hero-Bereich (nur Gesamtkatalog)
  useEffect(() => {
    if (isOpenProp) {
      setIsFullCatalogOpen(true);
    }
  }, [isOpenProp]);

  // Schließen des Gesamtkatalogs
  const handleCloseFullCatalog = () => {
    setIsFullCatalogOpen(false);
    if (onCloseProp) {
      onCloseProp();
    }
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-background">
      
      {/* Hintergrund-Effekte */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mik-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container px-4 mx-auto relative z-10 max-w-[1200px]">
        
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mik-blue/10 text-mik-blue text-sm font-medium mb-4 border border-mik-blue/20"
          >
            <Sparkles size={14} />
            <span>Unsere Kollektionen</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground"
          >
            Für jede Branche <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mik-blue to-blue-400">
              der perfekte Look.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Entdecken Sie unsere spezialisierten Kollektionen für Gastronomie, Medizin, Handwerk und Business. Hochwertig, langlebig und individuell veredelbar.
          </motion.p>
        </div>

        {/* 3D Carousel */}
        <div className="mb-16">
          <BranchCarousel3D items={BRANCH_DATA} />
        </div>

        {/* Buttons Area */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, delay: 0.3 }}
           className="flex flex-col sm:flex-row justify-center gap-4"
        >
          {/* Button 1: Gesamtkatalog */}
          <Button 
            onClick={() => setIsFullCatalogOpen(true)}
            size="lg"
            className="bg-mik-navy hover:bg-mik-navy/80 text-white font-heading font-bold px-8 h-14 rounded-xl shadow-lg border border-white/10 hover:border-mik-blue/50 transition-all hover:scale-105"
          >
            Gesamten Katalog ansehen
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>

          {/* Button 2: Personalisierter Katalog */}
          <Button 
            onClick={() => setIsRequestModalOpen(true)}
            size="lg"
            variant="outline"
            className="border-mik-blue/30 bg-mik-blue/5 text-mik-blue hover:bg-mik-blue/10 font-heading font-bold px-8 h-14 rounded-xl shadow-lg transition-all hover:scale-105"
          >
            <Upload className="mr-2 w-5 h-5" />
            Personalisierten Katalog anfragen
          </Button>
        </motion.div>

      </div>

      {/* --- MODALS --- */}
      
      {/* 1. Gesamtkatalog (Blätterkatalog) */}
      <FullCatalogModal 
        isOpen={isFullCatalogOpen} 
        onClose={handleCloseFullCatalog} 
      />

      {/* 2. Personalisierter Katalog (Upload Popup) */}
      <CatalogRequestModal 
        isOpen={isRequestModalOpen} 
        onClose={() => setIsRequestModalOpen(false)} 
      />

    </section>
  );
}