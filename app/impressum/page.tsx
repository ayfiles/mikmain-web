"use client";

import React from "react";
import CardNav, { CardNavItem } from "@/components/ui/CardNav";

// HINWEIS: Hier idealerweise dieselben Items wie in app/page.tsx nutzen, 
// damit die Navigation konsistent bleibt.
const navItems: CardNavItem[] = [
  {
    label: "Kollektionen",
    bgColor: "#0a192f",
    textColor: "#ffffff",
    links: [{ label: "Zu den Kollektionen", href: "/#kollektionen", ariaLabel: "Kollektionen" }],
  },
  {
    label: "Referenzen",
    bgColor: "#ffffff",
    textColor: "#0a192f",
    links: [{ label: "Unsere Kunden", href: "/#referenzen", ariaLabel: "Referenzen" }],
  },
  {
    label: "Services",
    bgColor: "#DC2626", // mik-red
    textColor: "#ffffff",
    links: [{ label: "Unsere Leistungen", href: "/#services", ariaLabel: "Services" }],
  },
  {
    label: "Kontakt",
    bgColor: "#0a192f",
    textColor: "#ffffff",
    links: [{ label: "Jetzt anfragen", href: "/#kontakt", ariaLabel: "Kontakt" }],
  },
];

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-background relative font-sans text-foreground overflow-x-hidden selection:bg-mik-red selection:text-white">
      
      {/* Navbar einbinden */}
      <CardNav 
        items={navItems} 
        baseColor="rgba(255, 255, 255, 0.8)" // Leicht transparent für Glass-Look
      />

      {/* Main Content Area - mit Padding oben, damit es nicht unter der Sticky Nav verschwindet */}
      <main className="container mx-auto px-4 pt-32 pb-20 md:pt-48">
        
        {/* Die "Card" für das Impressum */}
        <div className="max-w-3xl mx-auto rounded-[30px] border border-white/10 bg-mik-navy/5 backdrop-blur-xl shadow-2xl p-6 md:p-12 relative overflow-hidden">
          
          {/* Dekorativer Hintergrund-Blob (optional, passend zur CI) */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-mik-red/10 rounded-full blur-3xl pointer-events-none"></div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-mik-navy mb-8 relative z-10">
            Impressum
          </h1>

          <div className="space-y-6 text-lg text-foreground/80 relative z-10 font-sans">
            
            <section>
              <h2 className="text-xl font-bold text-mik-navy mb-2">Angaben gemäß § 5 TMG</h2>
              <p>
                MikMain GmbH<br />
                Musterstraße 123<br />
                12345 Musterstadt<br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-mik-navy mb-2">Kontakt</h2>
              <p>
                Telefon: +49 (0) 123 44 55 66<br />
                E-Mail: info@mikmain.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-mik-navy mb-2">Vertreten durch</h2>
              <p>
                Geschäftsführer: Max Mustermann
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-mik-navy mb-2">Registereintrag</h2>
              <p>
                Eintragung im Handelsregister.<br />
                Registergericht: Amtsgericht Musterstadt<br />
                Registernummer: HRB 12345
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-mik-navy mb-2">Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                DE 123 456 789
              </p>
            </section>

            <div className="w-full h-px bg-mik-navy/10 my-8"></div>

            <p className="text-sm opacity-60">
              Hinweis: Dies ist ein Platzhalter-Impressum. Bitte ersetzen Sie diese Daten vor Veröffentlichung durch Ihre rechtlich korrekten Angaben.
            </p>

          </div>
        </div>
      </main>
    </div>
  );
}