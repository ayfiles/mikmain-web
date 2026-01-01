"use client";

import { motion } from "framer-motion";

const PARTNERS = [
  { name: "Partner 1", logo: "/logos/partner1.svg" },
  { name: "Partner 2", logo: "/logos/partner2.svg" },
  { name: "Partner 3", logo: "/logos/partner3.svg" },
  { name: "Partner 4", logo: "/logos/partner4.svg" },
  { name: "Partner 5", logo: "/logos/partner5.svg" },
  { name: "Partner 6", logo: "/logos/partner6.svg" },
];

export function TrustedBySection() {
  // Wir verdoppeln die Liste für einen nahtlosen Übergang
  const marqueeVariants = {
    animate: {
      x: [0, -1000], // Passen Sie diesen Wert an die Gesamtbreite Ihrer Logos an
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  return (
    <section className="py-12 bg-background border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-sm font-heading font-bold uppercase tracking-widest text-muted-foreground">
          Trusted by Industry Leaders
        </p>
      </div>

      <div className="relative flex overflow-hidden group">
        {/* Maskierung für sanftes Ausblenden an den Rändern */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

        <motion.div
          className="flex whitespace-nowrap gap-16 items-center"
          variants={marqueeVariants}
          animate="animate"
        >
          {/* Erste Gruppe */}
          {[...PARTNERS, ...PARTNERS].map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center min-w-[150px]"
            >
              {/* Platzhalter für Logo - Graustufen im Standard, Farbe bei Hover */}
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-8 md:h-10 w-auto opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}