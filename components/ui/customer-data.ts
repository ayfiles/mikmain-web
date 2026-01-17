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
    coverVideo: "/Kundenreferenzen/Harput/Harput_Banner.webm",
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
    coverVideo: "/Kundenreferenzen/Kostarellos/Kostarellos_Banner.webm",
    industry: "Einzelhandel",
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
    coverVideo: "/Kundenreferenzen/Sh/SH_Banner.webm",
    industry: "Hotellerie",
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
    coverVideo: "/Kundenreferenzen/fluffy/fluffy.webm",
    industry: "Gastronomie",
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
    coverVideo: "/Kundenreferenzen/GK/GK_Banner.webm",
    industry: "Dienstleistung",
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
    coverVideo: "/Kundenreferenzen/Steinberger Hof/Steinberger Hof_Banner.webm",
    industry: "Hotellerie",
    description: "Landgasthof mit Tradition",
    assets: {
      images: [
        "/placeholder-customer-1.jpg",
        "/placeholder-customer-2.jpg",
      ],
    },
  },
];

