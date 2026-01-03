"use client";

import { ArrowRight, Shirt, Briefcase, Stethoscope, ChefHat, HardHat } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import MagicBento from "@/components/react-bits/MagicBento"; 

export function CatalogSection() {
  
  const bentoItems = [
    {
      title: "Business & Corporate",
      description: "Elegante Schnitte für den ersten Eindruck.",
      icon: <Briefcase className="w-6 h-6" />,
      className: "col-span-2 row-span-2 bg-slate-900 text-white", // Großes Item
      img: "https://images.unsplash.com/photo-1594938298603-c8148c47e356?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Workwear",
      description: "Robust. Sicher. Zertifiziert.",
      icon: <HardHat className="w-6 h-6" />,
      className: "col-span-1 row-span-1 bg-mik-blue text-white",
      img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Gastronomie",
      description: "Für Küche & Service.",
      icon: <ChefHat className="w-6 h-6" />,
      className: "col-span-1 row-span-2 bg-stone-600 text-white",
      img: "https://images.unsplash.com/photo-1595475207225-428b62bda831?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Medical & Care",
      description: "Hygiene trifft Komfort.",
      icon: <Stethoscope className="w-6 h-6" />,
      className: "col-span-1 row-span-1 bg-teal-600 text-white",
      img: "https://images.unsplash.com/photo-1584982751601-97dcc096654c?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Accessoires",
      description: "Vom Gürtel bis zur Mütze.",
      icon: <Shirt className="w-6 h-6" />,
      className: "col-span-2 row-span-1 bg-mik-red text-white",
      img: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1000&auto=format&fit=crop"
    },
  ];

  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        
        {/* Wrapper für Überschrift und Bento Box mit gleicher Breite */}
        <div className="max-w-[54rem] mx-auto">
          {/* Header der Sektion */}
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-heading text-4xl font-bold mb-2">Unser Katalog</h2>
              <p className="text-muted-foreground">Kategorien für jeden Anspruch.</p>
            </div>
            <Button variant="outline" className="hidden md:flex">
              Zum Gesamtkatalog <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Integration des MagicBento */}
          <div className="h-[600px] w-full">
              <MagicBento 
                  items={bentoItems} 
                  gap={16} // Abstand zwischen den Kacheln
              />
          </div>
        </div>
        
        {/* Mobile Button Alternative */}
        <div className="mt-8 md:hidden max-w-[54rem] mx-auto">
            <Button className="w-full">Zum Gesamtkatalog</Button>
        </div>

      </div>
    </section>
  );
}