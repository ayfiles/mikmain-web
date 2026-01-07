"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BRANCH_DATA, BranchItem } from "@/components/ui/infinite-branch-cards";
import { BranchCarousel3D } from "@/components/ui/branch-carousel-3d";
import { BranchModal } from "@/components/ui/branch-modal";
import { CatalogRequestModal } from "@/components/ui/catalog-request-modal";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CatalogSection() {
  const [selectedBranch, setSelectedBranch] = useState<BranchItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleCardClick = (item: BranchItem) => {
    setSelectedBranch(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Verzögertes Zurücksetzen für smooth Animation
    setTimeout(() => setSelectedBranch(null), 300);
  };


  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full py-24 md:py-32 overflow-visible bg-background"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mik-blue/5 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 w-[95%] max-w-[1200px] mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            >
              Unser{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mik-blue to-blue-400">
                Katalog
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Spezialisierte Lösungen für jede Branche. Von der Gastronomie bis zum
              Corporate Office – wir kennen die Anforderungen Ihres Bereichs.
            </motion.p>
          </motion.div>
        </div>

        {/* 3D Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10"
        >
          <BranchCarousel3D
            items={BRANCH_DATA}
            onCardClick={handleCardClick}
          />
        </motion.div>

        {/* CTA Bereich */}
        <div className="relative z-10 w-[95%] max-w-[1200px] mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-lg md:text-xl text-muted-foreground mb-6"
            >
              Benötigen Sie einen personalisierten Produktkatalog für Ihr Unternehmen?
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                onClick={() => setIsRequestModalOpen(true)}
                size="lg"
                className="bg-mik-blue hover:bg-blue-600 text-white font-heading font-bold text-lg h-14 px-10 shadow-[0_0_40px_-5px_rgba(59,130,246,0.4)] transition-all hover:scale-105 rounded-xl"
              >
                Jetzt anfragen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

      </section>

      {/* Modals */}
      <BranchModal
        item={selectedBranch}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <CatalogRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
      />
    </>
  );
}

export default CatalogSection;

