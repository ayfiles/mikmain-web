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
    id: "frauen-hemd-1",
    name: "Frauen Hemd",
    description: "Elegantes Hemd für Damen. Hochwertige Qualität mit modernem Schnitt.",
    category: "Business",
    image: "/Gesamtkatalog/frauen_hemd.jpg",
    primaryColor: "#ffffff", // Weiß
    colorVariants: [
      { name: "Weiß", hex: "#ffffff" },
      { name: "Hellblau", hex: "#3b82f6" },
      { name: "Grau", hex: "#6b7280" },
      { name: "Schwarz", hex: "#000000" },
    ],
  },
  {
    id: "tshirt-1",
    name: "T-Shirt Premium",
    description: "Hochwertiges T-Shirt aus weicher Baumwolle. Perfekt für Business Casual.",
    category: "Business",
    image: "/Gesamtkatalog/tshirt.jpg",
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
    image: "/Gesamtkatalog/fleece.jpg",
    primaryColor: "#4b5563", // Grau
    colorVariants: [
      { name: "Grau", hex: "#4b5563" },
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Schwarz", hex: "#000000" },
      { name: "Dunkelblau", hex: "#1e40af" },
    ],
  },
  {
    id: "dry-touch-1",
    name: "Dry Touch Shirt",
    description: "Atmungsaktives Dry Touch Material. Perfekt für aktive Arbeitstage.",
    category: "Business",
    image: "/Gesamtkatalog/dry%20touch.jpg",
    primaryColor: "#1e3a8a", // Navy
    colorVariants: [
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Weiß", hex: "#ffffff" },
      { name: "Schwarz", hex: "#000000" },
      { name: "Grau", hex: "#6b7280" },
    ],
  },
  {
    id: "schurze-1",
    name: "Schürze Professional",
    description: "Robuste Schürze für Küche und Service. Langlebig und leicht zu reinigen.",
    category: "Gastronomie",
    image: "/Gesamtkatalog/schurze.jpg",
    primaryColor: "#ffffff", // Weiß
    colorVariants: [
      { name: "Weiß", hex: "#ffffff" },
      { name: "Schwarz", hex: "#000000" },
      { name: "Navy", hex: "#1e3a8a" },
    ],
  },
];

