import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero-section";
import CardNav from "@/components/ui/CardNav";

// Sections lazy loading
const ServicesSection = dynamic(() => 
  import("@/components/sections/services-section").then((mod) => mod.ServicesSection)
);
const CatalogSection = dynamic(() => 
  import("@/components/sections/catalog-section").then((mod) => mod.CatalogSection)
);
const ReferencesSection = dynamic(() => 
  import("@/components/sections/references-section").then((mod) => mod.ReferencesSection)
);
const ContactSection = dynamic(() => 
  import("@/components/sections/contact-section").then((mod) => mod.ContactSection)
);

// HINWEIS: FooterSection Import wurde hier entfernt, da er jetzt global in layout.tsx ist!

export default function Home() {
  
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
      label: "Rechtliches", // Habe ich umbenannt für besseren Kontext
      bgColor: "#0a192f", 
      textColor: "#ffffff",
      links: [
        { label: "Impressum", href: "/impressum", ariaLabel: "Impressum" },
        { label: "Datenschutz", href: "/datenschutz", ariaLabel: "Datenschutz" }, // Optional ergänzt
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

      <HeroSection />
      
      <div id="services">
        <ServicesSection />
      </div>
      
      <div id="catalog">
        <CatalogSection />
      </div>

      <div id="references">
        <ReferencesSection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>

      {/* Footer wurde hier entfernt -> kommt jetzt automatisch aus layout.tsx */}

    </main>
  );
}