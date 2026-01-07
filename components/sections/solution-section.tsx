"use client";

import { useRef } from "react";
import { CheckCircle2, Palette, Factory, Monitor, Truck, Sparkles, Recycle, Image } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamischer Import für die 3D-Komponente (Client-only)
const Logo3D = dynamic(() => import("@/components/ui/Logo3D").then(mod => mod.Logo3D), {
  ssr: false,
  loading: () => <div className="w-28 h-28 animate-pulse bg-mik-blue/20 rounded-lg" />
});

// Mapping: Services mit zugehörigen Bento-Box-Indizes
const SERVICE_BENTO_MAPPING = [
  { service: "Design & Entwicklung (In-House)", bentoIndex: 0 },
  { service: "Eigene Manufaktur-Produktion", bentoIndex: 1 },
  { service: "Digitales Bestell-Dashboard", bentoIndex: 2 },
  { service: "Lager & Logistik-Management", bentoIndex: 3 },
  { service: "Wäsche-Service & Aufbereitung*", bentoIndex: 4 },
  { service: "Recycling & Upcycling", bentoIndex: 5 },
  { service: "Logo Service", bentoIndex: 6 }
];

const features = [
  {
    Icon: Palette,
    name: "Design",
    description: "In-House Entwicklung nach Ihren Wünschen.",
    href: "#",
    cta: "Mehr erfahren",
    className: "col-span-3 lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-to-br from-mik-blue/20 via-transparent to-mik-navy/60" />,
  },
  {
    Icon: Factory,
    name: "Produktion",
    description: "Eigene Manufaktur für höchste Qualität.",
    href: "#",
    cta: "Mehr erfahren",
    className: "col-span-3 lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-mik-red/20 via-transparent to-mik-navy/60" />,
  },
  {
    Icon: Monitor,
    name: "Dashboard",
    description: "Digitale Bestell- und Prozesssteuerung.",
    href: "#",
    cta: "Mehr erfahren",
    className: "col-span-3 lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-to-br from-mik-blue/15 via-transparent to-mik-navy/60" />,
  },
  {
    Icon: Truck,
    name: "Logistik",
    description: "Lager & Logistik-Management aus einer Hand.",
    href: "#",
    cta: "Mehr erfahren",
    className: "col-span-3 lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-mik-grey/20 via-transparent to-mik-navy/60" />,
  },
  {
    Icon: Sparkles,
    name: "Wäscheservice",
    description: "Professionelle Aufbereitung Ihrer Textilien.",
    href: "#",
    cta: "Mehr erfahren",
    className: "col-span-3 lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-mik-blue/10 via-transparent to-mik-navy/60" />,
  },
  {
    Icon: Recycle,
    name: "Nachhaltigkeit",
    description: "Recycling & Upcycling für Ihre ESG-Ziele.",
    href: "#",
    cta: "Mehr erfahren",
    className: "col-span-3 lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/15 via-transparent to-mik-navy/60" />,
  },
  {
    Icon: Image,
    name: "Logo Service",
    description: "Professionelle Logo-Applikation auf Ihre Textilien.",
    href: "#",
    cta: "Mehr erfahren",
    className: "col-span-3 lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-mik-navy/60" />,
  },
];

export function SolutionSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Header Animation (0% - 20% des Scroll-Progress)
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.15], [60, 0]);

  // Für jedes Service-Bento-Paar separate Transforms
  // Service 1: 15% - 28%
  const opacity1 = useTransform(scrollYProgress, [0.12, 0.20], [0, 1]);
  const y1 = useTransform(scrollYProgress, [0.12, 0.20], [40, 0]);
  
  // Service 2: 20% - 33%
  const opacity2 = useTransform(scrollYProgress, [0.18, 0.26], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.18, 0.26], [40, 0]);
  
  // Service 3: 25% - 38%
  const opacity3 = useTransform(scrollYProgress, [0.24, 0.32], [0, 1]);
  const y3 = useTransform(scrollYProgress, [0.24, 0.32], [40, 0]);
  
  // Service 4: 30% - 43%
  const opacity4 = useTransform(scrollYProgress, [0.30, 0.38], [0, 1]);
  const y4 = useTransform(scrollYProgress, [0.30, 0.38], [40, 0]);
  
  // Service 5: 35% - 48%
  const opacity5 = useTransform(scrollYProgress, [0.36, 0.44], [0, 1]);
  const y5 = useTransform(scrollYProgress, [0.36, 0.44], [40, 0]);
  
  // Service 6: 40% - 53%
  const opacity6 = useTransform(scrollYProgress, [0.42, 0.50], [0, 1]);
  const y6 = useTransform(scrollYProgress, [0.42, 0.50], [40, 0]);
  
  // Service 7: 45% - 58%
  const opacity7 = useTransform(scrollYProgress, [0.45, 0.53], [0, 1]);
  const y7 = useTransform(scrollYProgress, [0.45, 0.53], [40, 0]);

  // USP Box Animation
  const uspOpacity = useTransform(scrollYProgress, [0.52, 0.60], [0, 1]);
  const uspY = useTransform(scrollYProgress, [0.52, 0.60], [30, 0]);

  // Arrays für einfaches Mapping
  const serviceAnimations = [
    { opacity: opacity1, y: y1 },
    { opacity: opacity2, y: y2 },
    { opacity: opacity3, y: y3 },
    { opacity: opacity4, y: y4 },
    { opacity: opacity5, y: y5 },
    { opacity: opacity6, y: y6 },
    { opacity: opacity7, y: y7 },
  ];

  return (
    <section 
      ref={containerRef}
      className="min-h-[250vh] bg-background relative"
    >
      <div className="sticky top-0 min-h-screen py-24 flex items-center">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start gap-16">
            
            {/* Text Content - Linke Spalte */}
            <div className="lg:w-1/2">
              {/* Header */}
              <motion.div style={{ opacity: headerOpacity, y: headerY }}>
                <div className="flex items-start gap-6 mb-6">
                  <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground">
                    Die MikMain <br />
                    <span className="text-mik-blue">All-Inclusive Solution.</span>
                  </h2>
                  {/* 3D Wireframe Logo mit 360° Rotation */}
                  <Logo3D className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0" />
                </div>
                <p className="text-lg text-muted-foreground font-sans mb-8 leading-relaxed">
                  Wir verwandeln Corporate Fashion von einem Kostenfaktor in ein Asset. 
                  Als Ihr <strong>Full-Service Concierge</strong> übernehmen wir jeden Schritt – 
                  damit Sie sich auf Ihr Kerngeschäft konzentrieren können.
                </p>
              </motion.div>

              {/* Services Liste */}
              <ul className="space-y-4 mb-10">
                {SERVICE_BENTO_MAPPING.map((item, idx) => (
                  <motion.li 
                    key={idx} 
                    className="flex items-center gap-3 font-heading font-medium text-lg"
                    style={{ 
                      opacity: serviceAnimations[idx].opacity, 
                      y: serviceAnimations[idx].y 
                    }}
                  >
                    <CheckCircle2 className="text-mik-blue w-6 h-6 flex-shrink-0" />
                    {item.service}
                  </motion.li>
                ))}
              </ul>
              
              {/* USP Box */}
              <motion.div 
                className="p-6 bg-mik-navy/5 rounded-xl border border-mik-navy/10 mb-6"
                style={{ opacity: uspOpacity, y: uspY }}
              >
                <h4 className="font-heading font-bold text-mik-navy mb-1">Unser USP</h4>
              </motion.div>
              
              {/* Hinweis für Wäsche-Service */}
              <motion.p 
                className="text-sm text-muted-foreground font-sans italic"
                style={{ opacity: uspOpacity, y: uspY }}
              >
                * Ortsabhängig und von teilnehmenden Partnern
              </motion.p>
            </div>

            {/* Bento Grid - Rechte Spalte */}
            <div className="lg:w-1/2 relative">
              <BentoGrid className="auto-rows-[8rem] lg:auto-rows-[10rem]">
                {features.map((feature, idx) => (
                  <motion.div
                    key={feature.name}
                    className={feature.className}
                    style={{ 
                      opacity: serviceAnimations[idx].opacity, 
                      y: serviceAnimations[idx].y 
                    }}
                  >
                    <BentoCard {...feature} className="h-full" />
                  </motion.div>
                ))}
              </BentoGrid>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-mik-red rounded-full blur-2xl opacity-20"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-mik-blue rounded-full blur-3xl opacity-20"></div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
