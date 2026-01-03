"use client";

import { motion } from "framer-motion";
import { 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Euro, 
  Layers, 
  Leaf 
} from "lucide-react";
import SpotlightCard from "@/components/react-bits/SpotlightCard";

// Erweiterte Liste auf 6 Punkte für das 2x3 Grid
const PAIN_POINTS = [
  {
    icon: Clock,
    title: "Verwaltungs-Chaos",
    description: "Excel-Listen, händische Größenabfragen und ständige Nachbestellungen fressen Ihre HR-Ressourcen."
  },
  {
    icon: XCircle,
    title: "Qualitäts-Lotto",
    description: "Nachbestellungen sehen plötzlich anders aus oder laufen ein. Ihr Markenbild leidet unter Inkonsistenz."
  },
  {
    icon: AlertTriangle,
    title: "Logistik-Lücken",
    description: "Keine Übersicht, wer welche Kleidung hat. Schwund und Verschleiß bleiben oft unbemerkt."
  },
  {
    icon: Euro,
    title: "Kosten-Intransparenz",
    description: "Versteckte Kosten für Lagerung, Retouren und Express-Versand treiben das Budget unnötig in die Höhe."
  },
  {
    icon: Layers,
    title: "Design-Wildwuchs",
    description: "Verschiedene Abteilungen bestellen bei unterschiedlichen Lieferanten. Der einheitliche Look geht verloren."
  },
  {
    icon: Leaf,
    title: "ESG-Blindflug",
    description: "Keine Daten zu Herkunft oder Recycling. Das passt nicht zu Ihren Nachhaltigkeitszielen."
  }
];

export function ProblemSection() {
  return (
    <section className="py-12 bg-mik-navy text-white relative overflow-hidden">
      
      {/* Background Pattern (Subtiler Grid Hintergrund) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-2 text-red-500">
            Was läuft schief?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-sans">
            Corporate Fashion ist oft mehr Last als Lust. Kennen Sie diese Lücken in Ihrem Prozess?
          </p>
        </div>

        {/* 2x3 Grid mit Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 scale-[0.675] origin-center">
          {PAIN_POINTS.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <SpotlightCard 
                className="h-full bg-white/5 border-white/10 hover:border-white/20 transition-colors" 
                spotlightColor="rgba(239, 68, 68, 0.2)" // Rötliches Licht passend zum "Problem"-Thema
              >
                <div className="p-8 flex flex-col h-full">
                  <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-6 text-red-500 shrink-0">
                    <point.icon size={24} />
                  </div>
                  
                  <h3 className="font-heading text-2xl font-bold mb-3 text-white">
                    {point.title}
                  </h3>
                  
                  <p className="text-gray-400 font-sans leading-relaxed flex-grow">
                    {point.description}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}