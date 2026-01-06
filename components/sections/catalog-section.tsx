"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { InfiniteBranchCards, BRANCH_DATA, BranchItem } from "@/components/ui/infinite-branch-cards";
import { BranchModal } from "@/components/ui/branch-modal";

export function CatalogSection() {
  const [selectedBranch, setSelectedBranch] = useState<BranchItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Teile die Branchen in zwei Reihen auf
  const row1Items = BRANCH_DATA;
  const row2Items = [...BRANCH_DATA].reverse();

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full py-24 md:py-32 overflow-hidden bg-background"
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
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-block px-4 py-2 mb-6 rounded-full bg-mik-blue/10 border border-mik-blue/20 text-mik-blue text-sm font-medium"
            >
              Branchen-Expertise
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
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
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Spezialisierte Lösungen für jede Branche. Von der Gastronomie bis zum
              Corporate Office – wir kennen die Anforderungen Ihres Bereichs.
            </motion.p>
          </motion.div>
        </div>

        {/* Cards Container - Volle Breite */}
        <div className="relative z-10 space-y-6">
          {/* Reihe 1 - Nach links scrollend */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <InfiniteBranchCards
              items={row1Items}
              direction="left"
              speed="slow"
              pauseOnHover={true}
              onCardClick={handleCardClick}
            />
          </motion.div>

          {/* Reihe 2 - Nach rechts scrollend */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <InfiniteBranchCards
              items={row2Items}
              direction="right"
              speed="slow"
              pauseOnHover={true}
              onCardClick={handleCardClick}
            />
          </motion.div>
        </div>

        {/* Fade Edges für besseren visuellen Effekt */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-20" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-20" />
      </section>

      {/* Modal */}
      <BranchModal
        item={selectedBranch}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default CatalogSection;

