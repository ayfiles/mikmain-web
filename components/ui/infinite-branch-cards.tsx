"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useCallback } from "react";
import { 
  Utensils, 
  Stethoscope, 
  ShoppingBag, 
  Building2, 
  Sparkles,
  LucideIcon
} from "lucide-react";

export interface BranchItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  backgroundImage?: string;
  features: string[];
  images: string[];
}

export const BRANCH_DATA: BranchItem[] = [
  {
    id: "gastro",
    title: "Gastronomie",
    subtitle: "Restaurants · Hotels · Cafés",
    description: "Stilvolle Uniformen für Service, Küche und Empfang. Von der Schürze bis zum Maître-Anzug – alles aus einer Hand mit integriertem Wäscheservice.",
    icon: Utensils,
    gradient: "from-amber-500/20 via-orange-500/10 to-red-500/20",
    backgroundImage: "/branches/gastro.png",
    features: ["Kochbekleidung", "Service-Uniformen", "Schürzen & Accessoires", "Wäscheservice"],
    images: ["/placeholder-gastro-1.jpg", "/placeholder-gastro-2.jpg"]
  },
  {
    id: "medical",
    title: "Medizin & Pflege",
    subtitle: "Kliniken · Praxen · Pflegeheime",
    description: "Hygienische und komfortable Berufskleidung für das Gesundheitswesen. Antibakterielle Stoffe, ergonomische Schnitte und professionelles Erscheinungsbild.",
    icon: Stethoscope,
    gradient: "from-cyan-500/20 via-teal-500/10 to-emerald-500/20",
    backgroundImage: "/branches/medizin.png",
    features: ["Kasacks & Hosen", "OP-Kleidung", "Laborkittel", "Hygiene-Wäscheservice"],
    images: ["/placeholder-medical-1.jpg", "/placeholder-medical-2.jpg"]
  },
  {
    id: "retail",
    title: "Retail & Service",
    subtitle: "Einzelhandel · Dienstleister",
    description: "Einheitliche Teamkleidung die Ihre Marke stärkt. Vom Polo bis zum Blazer – wiedererkennbar, bequem und repräsentativ.",
    icon: ShoppingBag,
    gradient: "from-violet-500/20 via-purple-500/10 to-fuchsia-500/20",
    backgroundImage: "/branches/retail.png",
    features: ["Verkäufer-Outfits", "Marken-Polos", "Accessoires", "Corporate Design"],
    images: ["/placeholder-retail-1.jpg", "/placeholder-retail-2.jpg"]
  },
  {
    id: "corporate",
    title: "Corporate & Office",
    subtitle: "Büro · Events · Messen",
    description: "Professionelle Business-Kleidung für Ihr Team. Einheitliches Auftreten bei Meetings, Messen und im täglichen Geschäft.",
    icon: Building2,
    gradient: "from-slate-500/20 via-gray-500/10 to-zinc-500/20",
    backgroundImage: "/branches/office.png",
    features: ["Business-Hemden", "Blazer & Sakkos", "Event-Outfits", "Messe-Kleidung"],
    images: ["/placeholder-corporate-1.jpg", "/placeholder-corporate-2.jpg"]
  },
  {
    id: "wellness",
    title: "Wellness & Beauty",
    subtitle: "Spa · Friseur · Kosmetik",
    description: "Elegante und funktionale Kleidung für Wellness- und Beauty-Profis. Stilvoll, bequem und pflegeleicht.",
    icon: Sparkles,
    gradient: "from-rose-500/20 via-pink-500/10 to-fuchsia-500/20",
    backgroundImage: "/branches/wellnes.png",
    features: ["Spa-Uniformen", "Friseur-Kleidung", "Kosmetik-Kittel", "Wellness-Roben"],
    images: ["/placeholder-wellness-1.jpg", "/placeholder-wellness-2.jpg"]
  },
];

interface InfiniteBranchCardsProps {
  items?: BranchItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  onCardClick?: (item: BranchItem) => void;
}

export function InfiniteBranchCards({
  items = BRANCH_DATA,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
  onCardClick,
}: InfiniteBranchCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getSpeed = useCallback(() => {
    switch (speed) {
      case "fast":
        return "20s";
      case "slow":
        return "60s";
      default:
        return "40s";
    }
  }, [speed]);

  // Dupliziere Items mehrfach für nahtlose Animation (auch bei Widescreen)
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      className={cn(
        "relative z-20 w-full overflow-x-clip overflow-y-visible py-6",
        className
      )}
    >
      <div
        className={cn(
          "flex gap-6 w-max px-4",
          direction === "left" ? "animate-scroll-left" : "animate-scroll-right",
          pauseOnHover && "pause-animation"
        )}
        style={{
          "--scroll-duration": getSpeed(),
        } as React.CSSProperties}
      >
        {duplicatedItems.map((item, idx) => {
          const isHovered = hoveredIndex === idx;
          
          return (
            <div
              key={`${item.id}-${idx}`}
              className={cn(
                "relative flex-shrink-0 w-[280px] h-[320px] rounded-2xl overflow-hidden cursor-pointer",
                "border border-white/10 bg-mik-navy/60 backdrop-blur-xl",
                "transition-all duration-300 ease-out",
                "[box-shadow:0_0_40px_-10px_rgba(59,130,246,0.15),inset_0_1px_0_0_rgba(255,255,255,0.05)]",
                isHovered && "scale-105 border-mik-blue/50 [box-shadow:0_0_60px_-10px_rgba(59,130,246,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)]"
              )}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onCardClick?.(item)}
            >
              {/* Background: Image or Gradient */}
              {item.backgroundImage ? (
                <>
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={item.backgroundImage} 
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-mik-navy/60 backdrop-blur-[2px]" />
                  {/* Gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-mik-navy/90 via-mik-navy/40 to-transparent" />
                </>
              ) : (
                /* Fallback: Gradient Background */
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-60",
                  item.gradient
                )} />
              )}
              
              {/* Content */}
              <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                {/* Title & Description */}
                <div className="flex-1 flex flex-col justify-end">
                  <h3 className="font-heading text-xl font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-mik-grey mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-mik-grey/80 line-clamp-3">
                    {item.description}
                  </p>
                </div>
                
                {/* Bottom: Features Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {item.features.slice(0, 3).map((feature, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs rounded-full bg-white/5 text-mik-grey border border-white/10"
                    >
                      {feature}
                    </span>
                  ))}
                  {item.features.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-full bg-mik-blue/20 text-mik-blue border border-mik-blue/30">
                      +{item.features.length - 3}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Hover Indicator */}
              <div className={cn(
                "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-mik-blue via-mik-blue to-transparent",
                "transform origin-left transition-transform duration-300",
                isHovered ? "scale-x-100" : "scale-x-0"
              )} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default InfiniteBranchCards;

