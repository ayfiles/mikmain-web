import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider"; // <--- NEU

// Fonts Konfiguration (bleibt gleich)
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
    <html lang="de" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground font-sans antialiased transition-colors duration-300", // <--- HIER GEÄNDERT: Variable Farben statt fester Navy
          fontKiro.variable,
          fontAcumin.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" // Wir starten standardmäßig im Dark Mode (Navy)
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}