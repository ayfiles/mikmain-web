"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Palette, Factory, Monitor, Truck, Sparkles, Recycle, Image } from "lucide-react";

const SERVICES = [
  {
    icon: Palette,
    title: "Design & Entwicklung (In-House)",
    description: "In-House Entwicklung nach Ihren Wünschen und Anforderungen.",
  },
  {
    icon: Factory,
    title: "Eigene Manufaktur-Produktion",
    description: "Eigene Manufaktur für höchste Qualität und individuelle Anpassungen.",
  },
  {
    icon: Monitor,
    title: "Digitales Bestell-Dashboard",
    description: "Digitale Bestell- und Prozesssteuerung für maximale Effizienz.",
  },
  {
    icon: Truck,
    title: "Lager & Logistik-Management",
    description: "Lager & Logistik-Management aus einer Hand für reibungslose Abläufe.",
  },
  {
    icon: Sparkles,
    title: "Wäsche-Service & Aufbereitung",
    description: "Professionelle Aufbereitung Ihrer Textilien für langanhaltende Qualität.",
  },
  {
    icon: Recycle,
    title: "Recycling & Upcycling",
    description: "Recycling & Upcycling für Ihre ESG-Ziele und Nachhaltigkeit.",
  },
  {
    icon: Image,
    title: "Logo Service",
    description: "Professionelle Logo-Applikation auf Ihre Textilien.",
  },
];

// Service Item Komponente mit eigenem useInView
function ServiceItem({ service, index }: { service: typeof SERVICES[0], index: number }) {
  const itemRef = useRef<HTMLLIElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-50px" });
  const Icon = service.icon;

  return (
    <motion.li
      ref={itemRef}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      className="flex items-center gap-3 md:gap-4 py-2 md:py-3"
    >
      {/* Icon */}
      <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 text-mik-blue">
        <Icon className="w-full h-full" />
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <h3 className="font-heading text-base md:text-lg lg:text-xl font-bold text-foreground">
          {service.title}
        </h3>
      </div>
    </motion.li>
  );
}

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 lg:py-32 overflow-visible bg-background"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mik-blue/5 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto mb-10 md:mb-16 px-4 sm:px-0" style={{ maxWidth: 'min(95vw, 1200px)' }}>
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
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            MIKMAIN{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mik-blue to-blue-400">
              All Inclusive Solution.
            </span>
            <br />
            Wir geben ihrem Unternehmen eine Identität.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Alles aus einer Hand – von der Idee bis zur Umsetzung.
          </motion.p>
        </motion.div>
      </div>

      {/* Services Liste */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-0" style={{ maxWidth: 'min(95vw, 1200px)' }}>
        <div className="flex justify-center">
          <ul className="space-y-1 md:space-y-2">
            {SERVICES.map((service, index) => (
              <ServiceItem key={index} service={service} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;

