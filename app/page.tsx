import { HeroSection } from "@/components/sections/hero-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-mik-navy selection:bg-mik-red selection:text-white">
      {/* Navbar kommt später hier hin */}
      
      <HeroSection />

      {/* Platzhalter für nächste Sektionen */}
      <section className="h-screen flex items-center justify-center border-t border-white/10">
        <p className="text-mik-grey">Nächste Sektion: Services...</p>
      </section>
    </main>
  );
}