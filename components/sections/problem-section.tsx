"use client";

import { 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Euro, 
  Layers, 
  Leaf 
} from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { TextAnimate } from "@/components/ui/text-animate";

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

const firstRow = PAIN_POINTS.slice(0, 3);
const secondRow = PAIN_POINTS.slice(3);

const ProblemCard = ({ icon: Icon, title, description }: typeof PAIN_POINTS[0]) => {
  return (
    <figure
      className={cn(
        "relative w-80 cursor-pointer overflow-hidden rounded-2xl border p-8",
        "border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
      )}
    >
      <div className="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center mb-5 text-red-500">
        <Icon size={28} />
      </div>
      <h3 className="font-heading text-xl font-bold mb-3 text-white">
        {title}
      </h3>
      <p className="text-gray-400 font-sans text-base leading-relaxed">
        {description}
      </p>
    </figure>
  );
};

export function ProblemSection() {
  return (
    <section className="py-24 md:py-32 bg-mik-navy text-white relative overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header - mit Magic UI TextAnimate */}
        <div className="text-center mb-16">
          <TextAnimate 
            animation="blurInUp" 
            by="word"
            as="h2"
            className="font-heading text-4xl md:text-5xl font-bold mb-4 text-red-500"
            once
            duration={0.8}
          >
            Was läuft schief?
          </TextAnimate>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            Corporate Fashion ist oft mehr Last als Lust. Kennen Sie diese Lücken in Ihrem Prozess?
          </motion.p>
        </div>

      </div>

      {/* Marquee Cards - Scroll Animation (nur opacity + y, kein x wegen Marquee-Konflikt) */}
      <motion.div 
        className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Marquee className="[--duration:30s]">
            {firstRow.map((point, idx) => (
              <ProblemCard key={idx} {...point} />
            ))}
          </Marquee>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <Marquee reverse className="[--duration:30s]">
            {secondRow.map((point, idx) => (
              <ProblemCard key={idx} {...point} />
            ))}
          </Marquee>
        </motion.div>
        
        {/* Fade-Effekte an den Seiten */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-mik-navy"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-mik-navy"></div>
      </motion.div>

    </section>
  );
}
