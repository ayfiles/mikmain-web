"use client";

import { CheckCircle2, Palette, Factory, Monitor, Recycle } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const SERVICES = [
  "Design & Entwicklung (In-House)",
  "Eigene Manufaktur-Produktion",
  "Digitales Bestell-Dashboard",
  "Lager & Logistik-Management",
  "Wäsche-Service & Aufbereitung",
  "Recycling & Upcycling"
];

const features = [
  {
    Icon: Palette,
    name: "Design",
    description: "In-House Entwicklung nach Ihren Wünschen.",
    href: "#",
    cta: "Mehr erfahren",
    className: "col-span-3 lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />,
  },
  {
    Icon: Factory,
    name: "Produktion",
    description: "Eigene Manufaktur für höchste Qualität.",
    href: "#",
    cta: "Mehr erfahren",
    className: "col-span-3 lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20" />,
  },
  {
    Icon: Monitor,
    name: "Dashboard",
    description: "Digitale Bestell- und Prozesssteuerung.",
    href: "#",
    cta: "Mehr erfahren",
    className: "col-span-3 lg:col-span-2",
    background: <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-teal-500/20" />,
  },
  {
    Icon: Recycle,
    name: "Nachhaltigkeit",
    description: "Recycling & Upcycling für Ihre ESG-Ziele.",
    href: "#",
    cta: "Mehr erfahren",
    className: "col-span-3 lg:col-span-1",
    background: <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-lime-500/20" />,
  },
];

export function SolutionSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2">
            <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Die MikMain <br />
              <span className="text-mik-blue">All-Inclusive Solution.</span>
            </h2>
            <p className="text-lg text-muted-foreground font-sans mb-8 leading-relaxed">
              Wir verwandeln Corporate Fashion von einem Kostenfaktor in ein Asset. 
              Als Ihr <strong>Full-Service Concierge</strong> übernehmen wir jeden Schritt – 
              damit Sie sich auf Ihr Kerngeschäft konzentrieren können.
            </p>

            <ul className="space-y-4 mb-10">
              {SERVICES.map((service, idx) => (
                <li key={idx} className="flex items-center gap-3 font-heading font-medium text-lg">
                  <CheckCircle2 className="text-mik-blue w-6 h-6 flex-shrink-0" />
                  {service}
                </li>
              ))}
            </ul>
            
            <div className="p-6 bg-mik-navy/5 rounded-xl border border-mik-navy/10">
              <h4 className="font-heading font-bold text-mik-navy mb-1">Unser USP</h4>
              <p className="font-sans text-sm text-muted-foreground">
                Die einzige Plattform, die echte Manufaktur-Qualität mit digitaler Prozess-Steuerung verbindet.
              </p>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="lg:w-1/2 relative">
            <BentoGrid className="auto-rows-[8rem] lg:auto-rows-[10rem]">
              {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
              ))}
            </BentoGrid>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-mik-red rounded-full blur-2xl opacity-20"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-mik-blue rounded-full blur-3xl opacity-20"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
