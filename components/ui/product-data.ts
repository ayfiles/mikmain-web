export interface ColorVariant {
  name: string;
  hex: string;
  image?: string; // Optional: spezifisches Bild für diese Farbe
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string; // Hauptbild
  primaryColor: string; // Hex-Code der Hauptfarbe
  colorVariants: ColorVariant[];
}

// Produktdaten mit Bildern aus dem Gesamtkatalog
export const PRODUCTS: Product[] = [
  {
    id: "hemd-1",
    name: "Hemd Classic",
    description: "Klassisches Hemd für Damen und Herren. Hochwertige Qualität mit modernem Schnitt.",
    category: "Business",
    image: "/Gesamtkatalog/hemd.png",
    primaryColor: "#ffffff", // Weiß
    colorVariants: [
      { name: "Weiß", hex: "#ffffff" },
      { name: "Hellblau", hex: "#3b82f6" },
      { name: "Grau", hex: "#6b7280" },
      { name: "Schwarz", hex: "#000000" },
    ],
  },
  {
    id: "bluse-1",
    name: "Bluse Elegant",
    description: "Elegante Bluse für den professionellen Auftritt. Pflegeleicht und bügelfrei.",
    category: "Business",
    image: "/Gesamtkatalog/Bluse.png",
    primaryColor: "#ffffff", // Weiß
    colorVariants: [
      { name: "Weiß", hex: "#ffffff" },
      { name: "Hellblau", hex: "#3b82f6" },
      { name: "Rosa", hex: "#f472b6" },
      { name: "Schwarz", hex: "#000000" },
    ],
  },
  {
    id: "tshirt-1",
    name: "T-Shirt Premium",
    description: "Hochwertiges T-Shirt aus weicher Baumwolle. Perfekt für Business Casual.",
    category: "Business",
    image: "/Gesamtkatalog/t shirt.png",
    primaryColor: "#1e3a8a", // Navy
    colorVariants: [
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Weiß", hex: "#ffffff" },
      { name: "Schwarz", hex: "#000000" },
      { name: "Grau", hex: "#6b7280" },
    ],
  },
  {
    id: "fleece-1",
    name: "Fleece Pullover",
    description: "Warmes und bequemes Fleece-Material. Ideal für kältere Tage im Büro.",
    category: "Business",
    image: "/Gesamtkatalog/Fleece.png",
    primaryColor: "#4b5563", // Grau
    colorVariants: [
      { name: "Grau", hex: "#4b5563" },
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Schwarz", hex: "#000000" },
      { name: "Dunkelblau", hex: "#1e40af" },
    ],
  },
  {
    id: "kochhemd-1",
    name: "Kochhemd Professional",
    description: "Professionelles Kochhemd für die Gastronomie. Atmungsaktiv und strapazierfähig.",
    category: "Gastronomie",
    image: "/Gesamtkatalog/Kochhemd.png",
    primaryColor: "#ffffff", // Weiß
    colorVariants: [
      { name: "Weiß", hex: "#ffffff" },
      { name: "Schwarz", hex: "#000000" },
      { name: "Grau", hex: "#6b7280" },
    ],
  },
  {
    id: "schuerze-1",
    name: "Schürze Lang",
    description: "Robuste lange Schürze für Küche und Service. Langlebig und leicht zu reinigen.",
    category: "Gastronomie",
    image: "/Gesamtkatalog/Schürze lang.png",
    primaryColor: "#000000", // Schwarz
    colorVariants: [
      { name: "Schwarz", hex: "#000000" },
      { name: "Weiß", hex: "#ffffff" },
      { name: "Navy", hex: "#1e3a8a" },
    ],
  },
  {
    id: "service-hose-1",
    name: "Service Hose",
    description: "Bequeme Service-Hose für den Gastronomiebereich. Elastisch und pflegeleicht.",
    category: "Gastronomie",
    image: "/Gesamtkatalog/Service Hose.png",
    primaryColor: "#000000", // Schwarz
    colorVariants: [
      { name: "Schwarz", hex: "#000000" },
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Grau", hex: "#6b7280" },
    ],
  },
  {
    id: "bademantel-1",
    name: "Bademantel Premium",
    description: "Luxuriöser Bademantel für Wellness und Hotel. Weich und saugfähig.",
    category: "Wellness",
    image: "/Gesamtkatalog/Bademantel.png",
    primaryColor: "#ffffff", // Weiß
    colorVariants: [
      { name: "Weiß", hex: "#ffffff" },
      { name: "Beige", hex: "#d4c4a8" },
      { name: "Grau", hex: "#6b7280" },
    ],
  },
];

