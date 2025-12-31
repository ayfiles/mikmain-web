"use client";

import { HeroSection } from "@/components/sections/hero-section";
import CardNav from "@/components/ui/CardNav";

export default function Home() {
  
  // Die Menü-Struktur für MikMain
  const navItems = [
    {
      label: "Manufaktur",
      bgColor: "#0a192f", // MikMain Navy
      textColor: "#ffffff",
      links: [
        { label: "Über uns", href: "#", ariaLabel: "Über uns" },
        { label: "Produktion", href: "#", ariaLabel: "Unsere Produktion" },
        { label: "Nachhaltigkeit", href: "#", ariaLabel: "Nachhaltigkeit" }
      ]
    },
    {
      label: "Plattform",
      bgColor: "#f3f4f6", // Helles Grau für Kontrast
      textColor: "#0a192f", // Navy Text
      links: [
        { label: "Features", href: "#", ariaLabel: "Features" },
        { label: "Case Studies", href: "#", ariaLabel: "Case Studies" }
      ]
    },
    {
      label: "Service",
      bgColor: "#991b1b", // MikMain Crimson Red
      textColor: "#ffffff",
      links: [
        { label: "Wäscheservice", href: "#", ariaLabel: "Wäscheservice" },
        { label: "Logistik", href: "#", ariaLabel: "Logistik" },
        { label: "Kontakt", href: "#", ariaLabel: "Kontakt" }
      ]
    }
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      
      {/* Die Navbar schwebt über allem (z-index ist in der Komponente geregelt).
        Wir nutzen das dunkle Logo, da der Hintergrund der Navbar weiß/transparent ist.
      */}
      <CardNav 
  items={navItems} 
  baseColor="rgba(15, 23, 42, 0.6)" 
  menuColor="#F8FAFC"
  buttonBgColor="#2563EB"
  buttonTextColor="#F8FAFC"
  // HIER GEÄNDERT: Nur noch der Blur, kein Border mehr
  className="backdrop-blur-xl shadow-none" 
  logo="/mikmain-primary-light.svg"
  logoAlt="MikMain Logo"
/>

      {/* Deine Hero Section mit dem Silk-Hintergrund */}
      <HeroSection />

      {/* Hier kommen später die nächsten Sektionen (z.B. Features, Footer) hin */}
    </main>
  );
}