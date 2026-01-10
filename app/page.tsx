"use client";

import dynamic from "next/dynamic";
import { useState } from "react"; // <--- NEU: useState importiert
import { HeroSection } from "@/components/sections/hero-section";
import CardNav from "@/components/ui/CardNav";

// Sections lazy loading
const ServicesSection = dynamic(() => 
  import("@/components/sections/services-section").then((mod) => mod.ServicesSection)
);

// CatalogSection dynamisch importieren (jetzt mit Props!)
const CatalogSection = dynamic(() => 
  import("@/components/sections/catalog-section").then((mod) => mod.CatalogSection)
);

const ReferencesSection = dynamic(() => 
  import("@/components/sections/references-section").then((mod) => mod.ReferencesSection)
);
const ContactSection = dynamic(() => 
  import("@/components/sections/contact-section").then((mod) => mod.ContactSection)
);

export default function Home() {
  
  // State für das Gesamtkatalog-Modal (Zentral verwaltet)
  const [isFullCatalogOpen, setIsFullCatalogOpen] = useState(false);

  const navItems = [
    {
      label: "Services",
      bgColor: "#0a192f", 
      textColor: "#ffffff",
      links: [
        { label: "Zur Section", href: "#services", ariaLabel: "Services" },
      ]
    },
    {
      label: "Kollektion",
      bgColor: "#0a192f", 
      textColor: "#ffffff",
      links: [
        { label: "Zur Section", href: "#catalog", ariaLabel: "Kollektion" },
      ]
    },
    {
      label: "Kundenreferenzen",
      bgColor: "#0a192f", 
      textColor: "#ffffff",
      links: [
        { label: "Zur Section", href: "#references", ariaLabel: "Kundenreferenzen" },
      ]
    },
    {
      label: "Rechtliches",
      bgColor: "#0a192f", 
      textColor: "#ffffff",
      links: [
        { label: "Impressum", href: "/impressum", ariaLabel: "Impressum" },
        { label: "Datenschutz", href: "/datenschutz", ariaLabel: "Datenschutz" },
      ]
    }
  ];

  return (
    <main className="flex min-h-screen flex-col relative overflow-x-hidden max-w-full w-full">
      
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

      {/* HeroSection bekommt die Funktion zum Öffnen des Modals */}
      <HeroSection onOpenCatalog={() => setIsFullCatalogOpen(true)} />
      
      <div id="services">
        <ServicesSection />
      </div>
      
      <div id="catalog">
        {/* CatalogSection bekommt den State und die Funktion zum Schließen */}
        <CatalogSection 
           isOpenProp={isFullCatalogOpen} 
           onCloseProp={() => setIsFullCatalogOpen(false)} 
        />
      </div>

      <div id="references">
        <ReferencesSection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>

    </main>
  );
}