"use client";

import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { CatalogSection } from "@/components/sections/catalog-section";
import { ReferencesSection } from "@/components/sections/references-section";
import { ContactSection } from "@/components/sections/contact-section";
import CardNav from "@/components/ui/CardNav";

export default function Home() {
  
  // Die Menü-Struktur für MikMain
  const navItems = [
    {
      label: "Manufaktur",
      bgColor: "#0a192f", 
      textColor: "#ffffff",
      links: [
        { label: "Problem", href: "#problem", ariaLabel: "Problem" },
        { label: "Lösung", href: "#solution", ariaLabel: "Lösung" },
      ]
    },
    {
      label: "Katalog",
      bgColor: "#f3f4f6", 
      textColor: "#0a192f", 
      links: [
        { label: "Kategorien", href: "#catalog", ariaLabel: "Kategorien" },
        { label: "Referenzen", href: "#references", ariaLabel: "Referenzen" }
      ]
    },
    {
      label: "Kontakt",
      bgColor: "#991b1b", 
      textColor: "#ffffff",
      links: [
        { label: "Anfrage", href: "#contact", ariaLabel: "Anfrage" },
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
      
      {/* 1. Problem (Pain Points) */}
      <div id="problem">
        <ProblemSection />
      </div>

      {/* 2. Solution (All-Inclusive) */}
      <div id="solution">
        <SolutionSection />
      </div>

      {/* 3. Katalog (Bento Grid) */}
      <div id="catalog">
        <CatalogSection />
      </div>

      {/* 4. Referenzen (Bento Grid) */}
      <div id="references">
        <ReferencesSection />
      </div>

      {/* 5. Kontakt */}
      <div id="contact">
        <ContactSection />
      </div>

    </main>
  );
}