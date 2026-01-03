"use client";

export function ReferencesSection() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6 text-center mb-16">
        <h2 className="font-heading text-4xl font-bold">Referenzen</h2>
        <p className="text-muted-foreground mt-2">Vertraut von Marktführern.</p>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Große Case Study */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-border flex flex-col justify-center">
          <div className="mb-4 text-mik-blue font-bold tracking-wider text-sm uppercase">Case Study: Harput</div>
          <h3 className="font-heading text-3xl font-bold mb-4">"50% weniger Verwaltungsaufwand seit Tag 1."</h3>
          <p className="text-muted-foreground mb-6">
            Durch die Einführung des MikMain Dashboards konnte Harput die Einkleidung von 200 Mitarbeitern
            vollständig automatisieren.
          </p>
          <div className="font-bold text-foreground">– Geschäftsführer, Harput</div>
        </div>

        {/* Logo Grid Block */}
        <div className="bg-mik-navy p-8 rounded-2xl text-white flex flex-col items-center justify-center text-center">
          <h3 className="font-heading text-2xl font-bold mb-2">300+</h3>
          <p className="text-gray-300 text-sm">Zufriedene Kunden in ganz Europa.</p>
        </div>

        {/* Kleineres Testimonial */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-border">
          <p className="italic text-muted-foreground mb-4">"Endlich Workwear, die unsere Mitarbeiter auch in der Freizeit tragen wollen."</p>
          <div className="font-bold">– Gärtnerei Kujtah</div>
        </div>

        {/* Weiterer Block */}
        <div className="md:col-span-2 bg-gradient-to-r from-mik-red to-red-900 p-8 rounded-2xl text-white flex items-center justify-between">
            <div>
                <h3 className="font-heading text-2xl font-bold">Bereit für den Wechsel?</h3>
                <p className="opacity-90">Schließen Sie sich den Besten an.</p>
            </div>
            <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">→</span>
            </div>
        </div>
      </div>
    </section>
  );
}