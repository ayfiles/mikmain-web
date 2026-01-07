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

// Beispiel-Produktdaten (kann später durch echte Daten ersetzt werden)
export const PRODUCTS: Product[] = [
  {
    id: "business-shirt-1",
    name: "Business Hemd Premium",
    description: "Klassisches Business-Hemd aus hochwertiger Baumwolle. Perfekt für Büro und formelle Anlässe.",
    category: "Business",
    image: "/products/business-shirt.jpg",
    primaryColor: "#1e3a8a", // Navy Blue
    colorVariants: [
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Weiß", hex: "#ffffff" },
      { name: "Hellblau", hex: "#3b82f6" },
      { name: "Grau", hex: "#6b7280" },
      { name: "Schwarz", hex: "#000000" },
    ],
  },
  {
    id: "blazer-1",
    name: "Elegant Blazer",
    description: "Zeitloser Blazer für Business und Events. Premium-Qualität mit modernem Schnitt.",
    category: "Business",
    image: "/products/blazer.jpg",
    primaryColor: "#000000", // Schwarz
    colorVariants: [
      { name: "Schwarz", hex: "#000000" },
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Grau", hex: "#4b5563" },
      { name: "Dunkelgrau", hex: "#1f2937" },
    ],
  },
  {
    id: "service-uniform-1",
    name: "Service Uniform Classic",
    description: "Professionelle Service-Uniform für Gastronomie und Hotellerie. Bequem und pflegeleicht.",
    category: "Gastronomie",
    image: "/products/service-uniform.jpg",
    primaryColor: "#ffffff", // Weiß
    colorVariants: [
      { name: "Weiß", hex: "#ffffff" },
      { name: "Schwarz", hex: "#000000" },
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Burgunder", hex: "#7f1d1d" },
    ],
  },
  {
    id: "chef-jacket-1",
    name: "Kochjacke Professional",
    description: "Hochwertige Kochjacke mit Knöpfen. Atmungsaktiv und langlebig für die professionelle Küche.",
    category: "Gastronomie",
    image: "/products/chef-jacket.jpg",
    primaryColor: "#ffffff", // Weiß
    colorVariants: [
      { name: "Weiß", hex: "#ffffff" },
      { name: "Schwarz", hex: "#000000" },
      { name: "Navy", hex: "#1e3a8a" },
    ],
  },
  {
    id: "medical-coat-1",
    name: "Medizinischer Kittel",
    description: "Hygienischer Kittel für medizinisches Personal. Antibakteriell und pflegeleicht.",
    category: "Medizin",
    image: "/products/medical-coat.jpg",
    primaryColor: "#ffffff", // Weiß
    colorVariants: [
      { name: "Weiß", hex: "#ffffff" },
      { name: "Hellblau", hex: "#dbeafe" },
      { name: "Grün", hex: "#d1fae5" },
    ],
  },
  {
    id: "polo-shirt-1",
    name: "Polo Shirt Business",
    description: "Klassisches Polo-Shirt für Business Casual. Hochwertige Qualität mit modernem Design.",
    category: "Business",
    image: "/products/polo-shirt.jpg",
    primaryColor: "#1e3a8a", // Navy
    colorVariants: [
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Weiß", hex: "#ffffff" },
      { name: "Schwarz", hex: "#000000" },
      { name: "Grau", hex: "#6b7280" },
      { name: "Rot", hex: "#dc2626" },
    ],
  },
  {
    id: "apron-1",
    name: "Schürze Professional",
    description: "Robuste Schürze für Küche und Service. Langlebig und leicht zu reinigen.",
    category: "Gastronomie",
    image: "/products/apron.jpg",
    primaryColor: "#ffffff", // Weiß
    colorVariants: [
      { name: "Weiß", hex: "#ffffff" },
      { name: "Schwarz", hex: "#000000" },
      { name: "Navy", hex: "#1e3a8a" },
    ],
  },
  {
    id: "sweater-1",
    name: "Business Pullover",
    description: "Eleganter Pullover für das Büro. Warm und stilvoll für die kälteren Monate.",
    category: "Business",
    image: "/products/sweater.jpg",
    primaryColor: "#4b5563", // Grau
    colorVariants: [
      { name: "Grau", hex: "#4b5563" },
      { name: "Navy", hex: "#1e3a8a" },
      { name: "Schwarz", hex: "#000000" },
      { name: "Dunkelblau", hex: "#1e40af" },
    ],
  },
];

