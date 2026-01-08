import type { Metadata } from "next";
import localFont from "next/font/local";
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
});

const fontAcumin = localFont({
  src: [
    { path: "./fonts/Acumin-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/Acumin-Italic.otf", weight: "400", style: "italic" },
    { path: "./fonts/Acumin-Bold.otf", weight: "700", style: "normal" },
    { path: "./fonts/Acumin-ItalicBold.otf", weight: "700", style: "italic" },
  ],
  variable: "--font-acumin",
});

// HIER GEÄNDERT: Metadaten für Browser-Titel und Favicon
export const metadata: Metadata = {
  title: "MikMain - Corporate Fashion Concierge", // Der neue Titel im Browser-Tab
  description: "Ihr Concierge für Unternehmensbekleidung. Von Design bis Wäscheservice.",
  icons: {
    icon: "/mikmain kurzlogo.svg", // Dein neues Favicon aus dem public-Ordner
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
          "min-h-screen bg-background text-foreground font-sans antialiased transition-colors duration-300",
          fontKiro.variable,
          fontAcumin.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}