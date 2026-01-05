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
        "relative w-80 cursor-pointer overflow-hidden rounded-xl border p-6",
        "border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
      )}
    >
      <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mb-4 text-red-500">
        <Icon size={24} />
      </div>
      <h3 className="font-heading text-xl font-bold mb-2 text-white">
        {title}
      </h3>
      <p className="text-gray-400 font-sans text-sm leading-relaxed">
        {description}
      </p>
    </figure>
  );
};

export function ProblemSection() {
  return (
    <section className="py-12 bg-mik-navy text-white relative overflow-hidden">
      
      {/* Background Pattern */}
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

      </div>

      {/* Marquee Cards */}
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:30s]">
          {firstRow.map((point, idx) => (
            <ProblemCard key={idx} {...point} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:30s]">
          {secondRow.map((point, idx) => (
            <ProblemCard key={idx} {...point} />
          ))}
        </Marquee>
        
        {/* Fade-Effekte an den Seiten */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-mik-navy"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-mik-navy"></div>
      </div>

    </section>
  );
}
