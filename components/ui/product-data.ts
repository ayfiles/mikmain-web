export interface ColorVariant {
  name: string;
  hex: string;
  image?: string; // Optional: spezifisches Bild für diese Farbe
}

// Vordefinierte Badge-Typen für Produkteigenschaften
export type BadgeType = 
  | "wasserdicht"
  | "elastisch"
  | "bügelfrei"
  | "atmungsaktiv"
  | "schnelltrocknend"
  | "pflegeleicht"
  | "antibakteriell"
  | "UV-Schutz"
  | "nachhaltig"
  | "knitterarm"
  | "formstabil"
  | "temperaturregulierend";

// Badge-Konfiguration mit Farben und Icons
export const BADGE_CONFIG: Record<BadgeType, { label: string; color: string; icon: string }> = {
  wasserdicht: { label: "Wasserdicht", color: "#0ea5e9", icon: "💧" },
  elastisch: { label: "Elastisch", color: "#8b5cf6", icon: "↔️" },
  bügelfrei: { label: "Bügelfrei", color: "#22c55e", icon: "✓" },
  atmungsaktiv: { label: "Atmungsaktiv", color: "#06b6d4", icon: "🌬️" },
  schnelltrocknend: { label: "Schnelltrocknend", color: "#f59e0b", icon: "⚡" },
  pflegeleicht: { label: "Pflegeleicht", color: "#10b981", icon: "🧼" },
  antibakteriell: { label: "Antibakteriell", color: "#ec4899", icon: "🛡️" },
  "UV-Schutz": { label: "UV-Schutz", color: "#eab308", icon: "☀️" },
  nachhaltig: { label: "Nachhaltig", color: "#22c55e", icon: "🌱" },
  knitterarm: { label: "Knitterarm", color: "#6366f1", icon: "✨" },
  formstabil: { label: "Formstabil", color: "#64748b", icon: "📐" },
  temperaturregulierend: { label: "Temperaturregulierend", color: "#ef4444", icon: "🌡️" },
};

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string; // Hauptbild
  images?: string[]; // Optionale zusätzliche Bilder für Swipe-Galerie
  primaryColor: string; // Hex-Code der Hauptfarbe
  colorVariants: ColorVariant[];
  badges?: BadgeType[]; // Optionale Badges für Produkteigenschaften
}

// Produktdaten mit Bildern aus dem Gesamtkatalog
export const PRODUCTS: Product[] = [
  // Business
  {
    id: "hemd-1",
    name: "Hemd Classic",
    description: "Klassisches Hemd für Damen und Herren. Hochwertige Qualität mit modernem Schnitt.",
    category: "Business",
    image: "/Gesamtkatalog/hemd.png",
    primaryColor: "#ffffff",
    colorVariants: [
      { name: "Weiß", hex: "#ffffff" },
      { name: "Hellblau", hex: "#3b82f6" },
      { name: "Grau", hex: "#6b7280" },
      { name: "Schwarz", hex: "#000000" },
    ],
    badges: ["bügelfrei", "pflegeleicht", "knitterarm"],
  },
  {
    id: "bluse-kurz-1",
    name: "Bluse Kurz",
    description: "Elegante kurze Bluse für den professionellen Auftritt. Pflegeleicht und bügelfrei.",
    category: "Business",
    image: "/Gesamtkatalog/bluse kurz.png",
    primaryColor: "#ffffff",
    colorVariants: [
      { name: "Weiß", hex: "#ffffff" },
      { name: "Hellblau", hex: "#3b82f6" },
      { name: "Rosa", hex: "#f472b6" },
      { name: "Schwarz", hex: "#000000" },
    ],
    badges: ["bügelfrei", "pflegeleicht"],
  },
  {
    id: "frauen-bluse-1",
    name: "Damenbluse Elegant",
    description: "Stilvolle Damenbluse für Business und Anlässe. Fließender Schnitt.",
    category: "Business",
    image: "/Gesamtkatalog/frauen bluse.png",
    primaryColor: "#ffffff",
    colorVariants: [
      { name: "Weiß", hex: "#ffffff" },
      { name: "Rosa", hex: "#f472b6" },
      { name: "Hellblau", hex: "#3b82f6" },
    ],
    badges: ["knitterarm", "atmungsaktiv"],
  },
  {
    id: "shirt-1",
    name: "Shirt Basic",
    description: "Hochwertiges Basis-Shirt aus weicher Baumwolle. Vielseitig einsetzbar.",
    category: "Business",
    image: "/Gesamtkatalog/Shirt.png",
    primaryColor: "#1e3a8a",
    colorVariants: [
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Weiß", hex: "#ffffff" },
      { name: "Schwarz", hex: "#000000" },
      { name: "Grau", hex: "#6b7280" },
    ],
    badges: ["formstabil", "pflegeleicht"],
  },
  {
    id: "polo-1",
    name: "Polo Shirt",
    description: "Klassisches Polo-Shirt für Business Casual. Atmungsaktiv und bequem.",
    category: "Business",
    image: "/Gesamtkatalog/PoloShirt.png",
    primaryColor: "#1e3a8a",
    colorVariants: [
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Weiß", hex: "#ffffff" },
      { name: "Schwarz", hex: "#000000" },
      { name: "Rot", hex: "#dc2626" },
    ],
    badges: ["atmungsaktiv", "formstabil", "pflegeleicht"],
  },
  {
    id: "anzugshose-1",
    name: "Anzugshose Classic",
    description: "Elegante Anzugshose mit perfekter Passform. Für Business und formelle Anlässe.",
    category: "Business",
    image: "/Gesamtkatalog/Anzugshose.png",
    images: [
      "/Gesamtkatalog/Anzugshose.png",
      "/Gesamtkatalog/Anzugshose_gestreift.png",
    ],
    primaryColor: "#1f2937",
    colorVariants: [
      { name: "Anthrazit", hex: "#1f2937" },
      { name: "Nadelstreifen", hex: "#374151" },
      { name: "Schwarz", hex: "#000000" },
      { name: "Navy", hex: "#1e3a8a" },
    ],
    badges: ["elastisch", "knitterarm", "formstabil"],
  },
  // Casual / Workwear
  {
    id: "fleece-1",
    name: "Fleece Pullover",
    description: "Warmes und bequemes Fleece-Material. Ideal für kältere Tage.",
    category: "Workwear",
    image: "/Gesamtkatalog/fleece.png",
    primaryColor: "#4b5563",
    colorVariants: [
      { name: "Grau", hex: "#4b5563" },
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Schwarz", hex: "#000000" },
    ],
    badges: ["temperaturregulierend", "pflegeleicht"],
  },
  {
    id: "hoodie-1",
    name: "Hoodie Comfort",
    description: "Bequemer Hoodie für den lässigen Auftritt. Hochwertige Verarbeitung.",
    category: "Workwear",
    image: "/Gesamtkatalog/Hoodie.png",
    primaryColor: "#1f2937",
    colorVariants: [
      { name: "Anthrazit", hex: "#1f2937" },
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Schwarz", hex: "#000000" },
      { name: "Grau", hex: "#6b7280" },
    ],
    badges: ["formstabil", "pflegeleicht"],
  },
  {
    id: "jogger-1",
    name: "Jogger Pants",
    description: "Moderne Jogger-Hose für aktive Tage. Sportlich und bequem.",
    category: "Workwear",
    image: "/Gesamtkatalog/Jogger.png",
    primaryColor: "#1f2937",
    colorVariants: [
      { name: "Anthrazit", hex: "#1f2937" },
      { name: "Schwarz", hex: "#000000" },
      { name: "Navy", hex: "#1e3a8a" },
    ],
    badges: ["elastisch", "atmungsaktiv"],
  },
  {
    id: "dry-touch-1",
    name: "Dry Touch Shirt",
    description: "Funktionsshirt mit Dry-Touch-Technologie. Schnelltrocknend und atmungsaktiv.",
    category: "Workwear",
    image: "/Gesamtkatalog/dry touch.png",
    primaryColor: "#3b82f6",
    colorVariants: [
      { name: "Blau", hex: "#3b82f6" },
      { name: "Schwarz", hex: "#000000" },
      { name: "Weiß", hex: "#ffffff" },
      { name: "Grau", hex: "#6b7280" },
    ],
    badges: ["schnelltrocknend", "atmungsaktiv", "UV-Schutz"],
  },
  // Gastronomie
  {
    id: "schuerze-1",
    name: "Schürzen Kollektion",
    description: "Vielseitige Schürzen für Gastronomie und Service. Verschiedene Styles und Längen verfügbar.",
    category: "Gastronomie",
    image: "/Gesamtkatalog/schuerze kurz.png",
    images: [
      "/Gesamtkatalog/schuerze kurz.png",
      "/Gesamtkatalog/Schuerze_Karriert.png",
      "/Gesamtkatalog/Schürze_MitTasche.png",
      "/Gesamtkatalog/Schürze_OhneTasche.png.png",
    ],
    primaryColor: "#000000",
    colorVariants: [
      { name: "Schwarz", hex: "#000000" },
      { name: "Kariert", hex: "#374151" },
      { name: "Weiß", hex: "#ffffff" },
      { name: "Navy", hex: "#1e3a8a" },
    ],
    badges: ["wasserdicht", "pflegeleicht", "formstabil"],
  },
  // Wellness
  {
    id: "bademantel-1",
    name: "Bademantel Premium",
    description: "Luxuriöser Bademantel für Wellness und Hotel. Weich und saugfähig.",
    category: "Wellness",
    image: "/Gesamtkatalog/Bademantel.png",
    primaryColor: "#ffffff",
    colorVariants: [
      { name: "Weiß", hex: "#ffffff" },
      { name: "Beige", hex: "#d4c4a8" },
      { name: "Grau", hex: "#6b7280" },
    ],
    badges: ["antibakteriell", "schnelltrocknend", "pflegeleicht"],
  },
];

