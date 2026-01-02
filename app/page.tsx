"use client";

import { HeroSection } from "@/components/sections/hero-section";
import { MissionSection } from "@/components/sections/mission-section";
import { PlatformSection } from "@/components/sections/platform-section";
// HIER NEU: Importiere die Service Section
import { ServiceSection } from "@/components/sections/service-section";
import CardNav from "@/components/ui/CardNav";

export default function Home() {
  
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
      
      {/* Navbar - schwebt über allem */}
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

      {/* 1. Hero: Einstieg & Emotion */}
      <HeroSection />

      {/* 2. Mission: Das "Warum" (Manifesto) */}
      <MissionSection />

      {/* 3. Plattform: Das "Wie" (Produkt & Features) */}
      <PlatformSection />

      {/* 4. Service: Der Kreislauf (Logistik) - HIER NEU EINGEBAUT */}
      <ServiceSection />

    </main>
  );
}