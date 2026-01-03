"use client";

import { Button } from "@/components/ui/button";

export function ContactSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="text-center mb-10">
            <h2 className="font-heading text-4xl font-bold mb-4">Kontakt</h2>
            <p className="text-muted-foreground">Lassen Sie uns über Ihre Kollektion sprechen.</p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Name</label>
                <input 
                  type="text" 
                  className="w-full p-4 rounded-xl bg-background border border-input focus:ring-2 focus:ring-mik-blue outline-none transition-all"
                  placeholder="Max Mustermann"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Unternehmen</label>
                <input 
                  type="text" 
                  className="w-full p-4 rounded-xl bg-background border border-input focus:ring-2 focus:ring-mik-blue outline-none transition-all"
                  placeholder="Firma GmbH"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Email</label>
              <input 
                type="email" 
                className="w-full p-4 rounded-xl bg-background border border-input focus:ring-2 focus:ring-mik-blue outline-none transition-all"
                placeholder="max@firma.de"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold ml-1">Nachricht</label>
              <textarea 
                rows={4}
                className="w-full p-4 rounded-xl bg-background border border-input focus:ring-2 focus:ring-mik-blue outline-none transition-all resize-none"
                placeholder="Wie können wir helfen?"
              />
            </div>

            <Button size="lg" className="w-full bg-mik-navy text-white hover:bg-mik-blue h-14 text-lg font-heading">
              Anfrage senden
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}