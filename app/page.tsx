"use client";

import { HeroSection } from "@/components/sections/hero-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { CatalogSection } from "@/components/sections/catalog-section";
import { ReferencesSection } from "@/components/sections/references-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FooterSection } from "@/components/sections/footer-section";
import CardNav from "@/components/ui/CardNav";

export default function Home() {
  
  // Die Menü-Struktur für MikMain - Jede Section hat eine eigene Card
  const navItems = [
    {
      label: "Lösung",
      bgColor: "#0a192f", 
      textColor: "#ffffff",
      links: [
        { label: "Zur Section", href: "#solution", ariaLabel: "Lösung" },
      ]
    },
    {
      label: "Katalog",
      bgColor: "#0a192f", 
      textColor: "#ffffff",
      links: [
        { label: "Zur Section", href: "#catalog", ariaLabel: "Katalog" },
      ]
    },
    {
      label: "Referenzen",
      bgColor: "#0a192f", 
      textColor: "#ffffff",
      links: [
        { label: "Zur Section", href: "#references", ariaLabel: "Referenzen" },
      ]
    },
    {
      label: "Kontakt",
      bgColor: "#991b1b", 
      textColor: "#ffffff",
      links: [
        { label: "Zur Section", href: "#contact", ariaLabel: "Kontakt" },
      ]
    }
  ];

  return (
    <main className="flex min-h-screen flex-col relative">
      
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

      <HeroSection />
      
      {/* 1. Solution (All-Inclusive) */}
      <div id="solution">
        <SolutionSection />
      </div>

      {/* 3. Katalog (Branchen) */}
      <div id="catalog">
        <CatalogSection />
      </div>

      {/* 4. Referenzen (Kunden) */}
      <div id="references">
        <ReferencesSection />
      </div>

      {/* 5. Kontakt */}
      <div id="contact">
        <ContactSection />
      </div>

      {/* 4. Footer */}
      <FooterSection />

    </main>
  );
}