"use client";

import React from "react";
import CardNav from "@/components/ui/CardNav";

export default function AgbPage() {
  
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
          
          <div className="absolute top-20 right-[-100px] w-80 h-80 bg-mik-red/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* HIER GEÄNDERT: text-foreground */}
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8 relative z-10">
            Allgemeine Geschäftsbedingungen (AGB)
          </h1>

          <div className="space-y-6 text-lg text-foreground/80 relative z-10 font-sans">
            
            <section>
              {/* HIER GEÄNDERT: text-foreground */}
              <h2 className="text-xl font-bold text-foreground mb-2">1. Geltungsbereich</h2>
              <p>
                Für alle Geschäftsbeziehungen zwischen der MikMain GmbH (nachfolgend „Anbieter“) und dem Kunden 
                gelten ausschließlich die nachfolgenden Allgemeinen Geschäftsbedingungen in ihrer zum Zeitpunkt der Bestellung gültigen Fassung.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-2">2. Vertragsgegenstand</h2>
              <p>
                Gegenstand des Vertrages ist der Verkauf und die Dienstleistung im Bereich Corporate Fashion (Unternehmensbekleidung), 
                einschließlich Design, Produktion, Logistik und Wäscheservice, wie auf unserer Website dargestellt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-2">3. Vertragsschluss</h2>
              <p>
                Die Darstellung der Produkte und Dienstleistungen auf der Website stellt kein rechtlich bindendes Angebot, 
                sondern eine Aufforderung zur Abgabe einer Anfrage dar. Ein Vertrag kommt erst durch eine individuelle Auftragsbestätigung unsererseits zustande.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-2">4. Preise und Zahlungsbedingungen</h2>
              <p>
                Alle genannten Preise sind Netto-Preise zzgl. der gesetzlichen Umsatzsteuer, sofern nicht anders angegeben. 
                Die Zahlung erfolgt nach Rechnungsstellung gemäß den vereinbarten Zahlungszielen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-2">5. Eigentumsvorbehalt</h2>
              <p>
                Die gelieferte Ware bleibt bis zur vollständigen Bezahlung aller Forderungen aus dem Liefervertrag im Eigentum des Anbieters.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-2">6. Gewährleistung und Haftung</h2>
              <p>
                Es gelten die gesetzlichen Gewährleistungsrechte. Für Schäden haftet der Anbieter nur bei Vorsatz oder grober Fahrlässigkeit.
              </p>
            </section>

            <div className="w-full h-px bg-foreground/10 my-8"></div>

            <p className="text-sm opacity-60">
              Hinweis: Dies ist ein Platzhalter-Text für die AGB. Bitte lassen Sie Ihre Allgemeinen Geschäftsbedingungen anwaltlich prüfen und passen Sie diese Inhalte vor Veröffentlichung an Ihre spezifischen Geschäftsprozesse an.
            </p>

          </div>
        </div>
      </main>
    </div>
  );
}