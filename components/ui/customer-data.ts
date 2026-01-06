export interface Customer {
  id: string;
  name: string;
  logo: string;
  coverVideo?: string;
  description?: string;
  industry?: string;
  assets: {
    images: string[];
    videos?: string[];
  };
}

export const CUSTOMERS: Customer[] = [
  {
    id: "harput",
    name: "Harput",
    logo: "/logos/harput.svg",
    coverVideo: "/kundenreferenzen/Harput/vid1.mp4",
    industry: "Gastronomie",
    description: "Premium Restaurant mit exquisiter Küche",
    assets: {
      images: [
        "/kundenreferenzen/Harput/Harput asset 1.jpg",
      ],
    },
  },
  {
    id: "kostarellos",
    name: "Kostarellos",
    logo: "/logos/kostarellos.svg",
    industry: "Gastronomie",
    description: "Traditionelle griechische Küche",
    assets: {
      images: [
        "/placeholder-customer-1.jpg",
        "/placeholder-customer-2.jpg",
      ],
    },
  },
  {
    id: "sh",
    name: "SH",
    logo: "/logos/sh.svg",
    industry: "Retail",
    description: "Moderner Einzelhandel",
    assets: {
      images: [
        "/placeholder-customer-1.jpg",
        "/placeholder-customer-2.jpg",
      ],
    },
  },
  {
    id: "fluffy",
    name: "Fluffy",
    logo: "/logos/fluffy.svg",
    industry: "Wellness",
    description: "Wellness & Beauty Studio",
    assets: {
      images: [
        "/placeholder-customer-1.jpg",
        "/placeholder-customer-2.jpg",
      ],
    },
  },
  {
    id: "gartnerei-kujtah",
    name: "Gärtnerei Kujtah",
    logo: "/logos/gartnerei-kujtah.svg",
    industry: "Retail",
    description: "Regionale Gärtnerei",
    assets: {
      images: [
        "/placeholder-customer-1.jpg",
        "/placeholder-customer-2.jpg",
      ],
    },
  },
  {
    id: "steinbergerhof",
    name: "Steinbergerhof",
    logo: "/logos/steinbergerhof.svg",
    industry: "Gastronomie",
    description: "Landgasthof mit Tradition",
    assets: {
      images: [
        "/placeholder-customer-1.jpg",
        "/placeholder-customer-2.jpg",
      ],
    },
  },
];

