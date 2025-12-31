import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";

// 1. Kiro konfigurieren (Headlines)
const fontKiro = localFont({
  src: [
    {
      path: "./fonts/Kiro-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/Kiro-ExtraBold.otf",
      weight: "800",
      style: "normal",
    },
    // Optional: Falls du Kursiv für Headlines brauchst
    {
      path: "./fonts/Kiro-ExtraBoldItalic.otf",
      weight: "800",
      style: "italic",
    },
  ],
  variable: "--font-kiro", // Wird in Tailwind als font-heading genutzt
});

// 2. Acumin Pro konfigurieren (Fließtext)
const fontAcumin = localFont({
  src: [
    {
      path: "./fonts/Acumin-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Acumin-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/Acumin-Bold.otf",
      weight: "700", // Wir nutzen Bold hier als fetten Text
      style: "normal",
    },
    {
      path: "./fonts/Acumin-ItalicBold.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-acumin", // Wird in Tailwind als font-sans genutzt
});

export const metadata: Metadata = {
  title: "MikMain - Personalverleih",
  description: "Rundum-Lösungen für Ihr Unternehmen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-mik-navy font-sans antialiased text-mik-white", // Standard: Navy Background, Weißer Text
          fontKiro.variable,
          fontAcumin.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}