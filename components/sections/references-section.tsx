"use client";

import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";

// Content-Komponente für jeden Kunden
const CustomerContent = ({ 
  name, 
  description, 
  quote,
  stats, 
  assets 
}: { 
  name: string;
  description: string;
  quote?: string;
  stats: { label: string; value: string }[];
  assets: string[];
}) => {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      {/* Quote */}
      {quote && (
        <blockquote className="text-xl md:text-2xl font-heading font-bold text-neutral-800 dark:text-white mb-6 border-l-4 border-mik-blue pl-4">
          "{quote}"
        </blockquote>
      )}
      
      <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-3xl mb-8">
        {description}
      </p>
      
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center p-4 bg-white dark:bg-neutral-900 rounded-xl">
            <div className="text-2xl md:text-3xl font-bold text-mik-blue">{stat.value}</div>
            <div className="text-sm text-neutral-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Assets Gallery */}
      <h4 className="font-heading font-bold text-lg mb-4 text-neutral-800 dark:text-white">Impressionen</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {assets.map((asset, idx) => (
          <div key={idx} className="aspect-square rounded-xl overflow-hidden relative">
            <Image 
              src={asset} 
              alt={`${name} Asset ${idx + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Kunden-Daten
const CUSTOMERS = [
  {
    category: "Gastronomie",
    title: "Harput Restaurant",
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    content: (
      <CustomerContent
        name="Harput"
        quote="50% weniger Verwaltungsaufwand seit Tag 1."
        description="Durch die Einführung des MikMain Dashboards konnte Harput die Einkleidung von 200 Mitarbeitern vollständig automatisieren. Weniger Verwaltung, mehr Zeit fürs Kerngeschäft. Das Team trägt die neue Kleidung mit Stolz – ein echter Gamechanger für unser Employer Branding."
        stats={[
          { label: "Mitarbeiter", value: "200+" },
          { label: "Zeitersparnis", value: "50%" },
          { label: "Seit", value: "2022" },
        ]}
        assets={[
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&auto=format&fit=crop",
        ]}
      />
    ),
  },
  {
    category: "Landwirtschaft",
    title: "Gärtnerei Kujtah",
    src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=800&auto=format&fit=crop",
    content: (
      <CustomerContent
        name="Gärtnerei Kujtah"
        quote="Endlich Workwear, die unsere Mitarbeiter auch in der Freizeit tragen wollen."
        description="Funktionalität trifft auf zeitloses Design. Die robuste Arbeitskleidung hält den harten Bedingungen stand und sieht dabei noch gut aus. Unsere Mitarbeiter fühlen sich wertgeschätzt – das merkt man an der Motivation."
        stats={[
          { label: "Mitarbeiter", value: "45" },
          { label: "Produkte", value: "12" },
          { label: "Seit", value: "2023" },
        ]}
        assets={[
          "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400&auto=format&fit=crop",
        ]}
      />
    ),
  },
  {
    category: "Hotel & Wellness",
    title: "Steinbergerhof",
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
    content: (
      <CustomerContent
        name="Steinbergerhof"
        quote="Premium Hospitality braucht Premium Kleidung."
        description="MikMain liefert beides – Design und Service auf höchstem Niveau. Von der Rezeption über das Restaurant bis zum Spa: Jede Abteilung hat ihre eigene Kollektion, aber alle tragen den gleichen Premium-Anspruch."
        stats={[
          { label: "Mitarbeiter", value: "120" },
          { label: "Abteilungen", value: "8" },
          { label: "Seit", value: "2021" },
        ]}
        assets={[
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400&auto=format&fit=crop",
        ]}
      />
    ),
  },
  {
    category: "Retail",
    title: "Kostarellos",
    src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
    content: (
      <CustomerContent
        name="Kostarellos"
        quote="Einheitlicher Markenauftritt in allen Filialen."
        description="Dank MikMain kein Problem mehr. Die zentrale Bestellplattform ermöglicht es uns, alle 15 Filialen einheitlich auszustatten. Neue Mitarbeiter bekommen ihre Kleidung innerhalb von 48 Stunden – direkt nach Hause."
        stats={[
          { label: "Filialen", value: "15" },
          { label: "Mitarbeiter", value: "80" },
          { label: "Seit", value: "2023" },
        ]}
        assets={[
          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=400&auto=format&fit=crop",
        ]}
      />
    ),
  },
  {
    category: "Medical",
    title: "Fluffy Care",
    src: "https://images.unsplash.com/photo-1584982751601-97dcc096654c?q=80&w=800&auto=format&fit=crop",
    content: (
      <CustomerContent
        name="Fluffy Care"
        quote="Hygiene und Komfort müssen kein Widerspruch sein."
        description="Als Pflegeeinrichtung haben wir höchste Anforderungen an unsere Arbeitskleidung. MikMain hat eine Kollektion entwickelt, die alle Hygiene-Standards erfüllt und dabei noch bequem genug für 12-Stunden-Schichten ist."
        stats={[
          { label: "Mitarbeiter", value: "65" },
          { label: "Standorte", value: "3" },
          { label: "Seit", value: "2022" },
        ]}
        assets={[
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&auto=format&fit=crop",
        ]}
      />
    ),
  },
];

export function ReferencesSection() {
  const cards = CUSTOMERS.map((customer, index) => (
    <Card key={customer.title} card={customer} index={index} layout />
  ));

  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-900/50">
      <div className="w-full">
        <div className="container mx-auto px-6 mb-4">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-2">
            Unsere Kunden
          </h2>
          <p className="text-muted-foreground text-lg">
            Vertraut von Marktführern in ganz Europa. Klicken Sie auf eine Karte für mehr Details.
          </p>
        </div>
        
        <Carousel items={cards} />
        
        {/* Stats Bar */}
        <div className="container mx-auto px-6 mt-8">
          <div className="bg-mik-navy rounded-2xl p-8 flex flex-col md:flex-row items-center justify-around gap-6 text-white">
            <div className="text-center">
              <div className="text-4xl font-bold font-heading">300+</div>
              <div className="text-gray-300 text-sm">Zufriedene Kunden</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-4xl font-bold font-heading">50.000+</div>
              <div className="text-gray-300 text-sm">Ausgestattete Mitarbeiter</div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/20" />
            <div className="text-center">
              <div className="text-4xl font-bold font-heading">98%</div>
              <div className="text-gray-300 text-sm">Weiterempfehlungsrate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
