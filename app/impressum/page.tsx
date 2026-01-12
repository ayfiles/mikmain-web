"use client";

import React from "react";
import CardNav from "@/components/ui/CardNav";

export default function ImpressumPage() {
  
  const navItems = [
    {
      label: "Services",
      bgColor: "#0a192f", 
      textColor: "#ffffff",
      links: [
        { label: "Zur Section", href: "/#services", ariaLabel: "Services" },
      ]
    },
    {
      label: "Kollektion",
      bgColor: "#0a192f", 
      textColor: "#ffffff",
      links: [
        { label: "Zur Section", href: "/#catalog", ariaLabel: "Kollektion" },
      ]
    },
    {
      label: "Kundenreferenzen",
      bgColor: "#0a192f", 
      textColor: "#ffffff",
      links: [
        { label: "Zur Section", href: "/#references", ariaLabel: "Kundenreferenzen" },
      ]
    },
    {
      label: "Startseite",
      bgColor: "#0a192f", 
      textColor: "#ffffff",
      links: [
        { label: "Zurück", href: "/", ariaLabel: "Zur Startseite" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background relative font-sans text-foreground overflow-x-hidden selection:bg-mik-red selection:text-white">
      
      <CardNav 
        items={navItems} 
        baseColor="rgba(15, 23, 42, 0.6)" 
        menuColor="#F8FAFC"
        buttonBgColor="#2563EB"
        buttonTextColor="#F8FAFC"
        className="backdrop-blur-xl shadow-none" 
        logo="/mikmain-primary-light.svg"
        logoAlt="MikMain Logo"
      />

      <main className="container mx-auto px-4 pt-32 pb-20 md:pt-48">
        
        <div className="max-w-3xl mx-auto rounded-[30px] border border-white/10 bg-mik-navy/5 dark:bg-white/5 backdrop-blur-xl shadow-2xl p-6 md:p-12 relative overflow-hidden">
          
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-mik-red/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* HIER GEÄNDERT: text-foreground statt text-mik-navy */}
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8 relative z-10">
            Impressum
          </h1>

          <div className="space-y-6 text-lg text-foreground/80 relative z-10 font-sans">
            
            <section>
              <h2 className="text-xl font-bold text-foreground mb-2">Angaben gemäß § 5 DDG</h2>
              <p>
                MIKMAIN<br />
                Mikail Demirci<br />
                Große Gallusstraße 14<br />
                60315 Frankfurt am Main
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-2">Kontakt</h2>
              <p>
                Telefon: +49 (0) 171 1696958<br />
                E-Mail: info@mikmain.de
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-2">Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                DE367861915
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-2">Redaktionell verantwortlich</h2>
              <p>
                Mikail Demirci<br />
                Große Gallusstraße 14<br />
                60315 Frankfurt am Main
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-2">EU-Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a 
                  href="https://ec.europa.eu/consumers/odr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-mik-red hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                <br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-2">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}