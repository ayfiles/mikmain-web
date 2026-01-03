"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const SERVICES = [
  "Design & Entwicklung (In-House)",
  "Eigene Manufaktur-Produktion",
  "Digitales Bestell-Dashboard",
  "Lager & Logistik-Management",
  "Wäsche-Service & Aufbereitung",
  "Recycling & Upcycling"
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

          {/* Visual / Image Placeholder */}
          <div className="lg:w-1/2 relative">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 border border-border relative">
               {/* Hier später ein Bild vom Dashboard oder Prozess */}
               <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 font-heading text-4xl font-bold">
                 Solution Visual
               </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-mik-red rounded-full blur-2xl opacity-20"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-mik-blue rounded-full blur-3xl opacity-20"></div>
          </div>

        </div>
      </div>
    </section>
  );
}