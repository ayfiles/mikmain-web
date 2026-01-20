import type { Metadata } from "next";
import localFont from "next/font/local";
import dynamic from "next/dynamic"; // <--- NEU
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

// Fonts Konfiguration
const fontKiro = localFont({
  src: [
    { path: "./fonts/Kiro-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/Kiro-ExtraBold.otf", weight: "800", style: "normal" },
    { path: "./fonts/Kiro-ExtraBoldItalic.otf", weight: "800", style: "italic" },
  ],
  variable: "--font-kiro",
  display: "swap",
});

const fontAcumin = localFont({
  src: [
    { path: "./fonts/Acumin-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/Acumin-Italic.otf", weight: "400", style: "italic" },
    { path: "./fonts/Acumin-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/Acumin-ItalicBold.otf", weight: "700", style: "italic" },
  ],
  variable: "--font-acumin",
  display: "swap",
});

// <--- NEU: Footer dynamisch laden (Performance)
const FooterSection = dynamic(() => 
  import("@/components/sections/footer-section").then((mod) => mod.FooterSection)
);

export const metadata: Metadata = {
  title: "MikMain - Corporate Fashion Concierge", 
  description: "Ihr Concierge für Unternehmensbekleidung. Von Design bis Wäscheservice.",
  icons: {
    icon: "/mikmain kurzlogo.svg", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          // "flex flex-col" sorgt dafür, dass der Footer immer unten ist, auch bei wenig Text
          "min-h-screen bg-background text-foreground font-sans antialiased transition-colors duration-300 flex flex-col",
          fontKiro.variable,
          fontAcumin.variable
        )}
      >
        {/* Cookiebot CMP Banner für DSGVO-Konformität */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="ae91e211-2886-44ea-9ee9-9c87a6de2ff9"
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />
        
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Hauptinhalt (wächst, um Platz zu füllen) */}
          <div className="flex-1">
            {children}
          </div>

          {/* <--- NEU: Footer ist jetzt hier und damit auf ALLEN Seiten */}
          <FooterSection />
        </ThemeProvider>
      </body>
    </html>
  );
}