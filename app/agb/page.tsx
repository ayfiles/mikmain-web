"use client";

import React from "react";
import CardNav from "@/components/ui/CardNav";

export default function AgbPage() {
  
  const navItems = [
    {
      label: "Startseite",
      bgColor: "#0a192f", 
      textColor: "#ffffff",
      links: [
        { label: "Zurück", href: "/", ariaLabel: "Zur Startseite" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background relative font-sans text-foreground overflow-x-hidden selection:bg-mik-red selection:text-white">
      
      <CardNav 
        items={navItems} 
        baseColor="rgba(15, 23, 42, 0.6)" 
        menuColor="#F8FAFC"
        buttonBgColor="#2563EB"
        buttonTextColor="#F8FAFC"
        className="backdrop-blur-xl shadow-none" 
        logo="/mikmain-primary-light.svg"
        logoAlt="MikMain Logo"
      />

      <main className="container mx-auto px-4 pt-32 pb-20 md:pt-48">
        
        <div className="max-w-4xl mx-auto rounded-[30px] border border-white/10 bg-mik-navy/5 dark:bg-white/5 backdrop-blur-xl shadow-2xl p-6 md:p-12 relative overflow-hidden">
          
          <div className="absolute top-20 right-[-100px] w-80 h-80 bg-mik-red/5 rounded-full blur-3xl pointer-events-none"></div>

          <h1 className="text-3xl md:text-5xl font-heading font-bold text-foreground mb-8 relative z-10">
            Allgemeine Geschäftsbedingungen (AGB)
          </h1>
          
          <p className="text-sm text-muted-foreground mb-8">
            Stand: {new Date().getFullYear()} | MikMain
          </p>

          <div className="space-y-8 text-base md:text-lg text-foreground/80 relative z-10 font-sans leading-relaxed">
            
            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">§ 1 Geltungsbereich</h2>
              <p>
                (1) Für alle Geschäftsbeziehungen zwischen <strong>MikMain</strong> (nachfolgend „Anbieter“ oder „wir“) und dem Kunden (nachfolgend „Kunde“) 
                gelten ausschließlich die nachfolgenden Allgemeinen Geschäftsbedingungen in ihrer zum Zeitpunkt der Beauftragung gültigen Fassung.
              </p>
              <p className="mt-2">
                (2) Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">§ 2 Vertragsgegenstand & Kein Online-Shop</h2>
              <p>
                (1) Gegenstand des Vertrages ist die Veredelung und Lieferung von Textilien (Corporate Fashion) nach individuellen Vorgaben des Kunden 
                (z.B. Bestickung, Bedruckung mit Firmenlogo).
              </p>
              <p className="mt-2">
                (2) <strong>Wichtiger Hinweis:</strong> Die Darstellung der Produkte auf der Website stellt kein rechtlich bindendes Angebot dar, sondern dient als Online-Katalog zur Information. 
                Es findet kein direkter Vertragsschluss über die Website statt (kein Warenkorb-System).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">§ 3 Angebot und Vertragsschluss</h2>
              <p>
                (1) Der Kunde stellt über das Kontaktformular oder per E-Mail eine unverbindliche Anfrage.
              </p>
              <p className="mt-2">
                (2) Der Anbieter erstellt daraufhin ein individuelles Angebot in Textform (z.B. per E-Mail oder als PDF), in dem die Details (Textilart, Stückzahl, Veredelung, Preis) aufgeführt sind.
              </p>
              <p className="mt-2">
                (3) Der Vertrag kommt erst zustande, wenn der Kunde dieses Angebot innerhalb der Gültigkeitsdauer annimmt (z.B. durch schriftliche Bestätigung per E-Mail) 
                oder der Anbieter eine explizite Auftragsbestätigung versendet.
              </p>
            </section>

            <section className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
              <h2 className="text-xl font-bold text-red-500 mb-3 flex items-center gap-2">
                § 4 Ausschluss des Widerrufsrechts (WICHTIG)
              </h2>
              <p className="font-medium">
                (1) Für Unternehmer (B2B) besteht grundsätzlich kein gesetzliches Widerrufsrecht.
              </p>
              <p className="mt-4 font-medium">
                (2) Auch für Verbraucher (B2C) besteht <u>kein Widerrufsrecht</u> bei Verträgen zur Lieferung von Waren, die nicht vorgefertigt sind 
                und für deren Herstellung eine individuelle Auswahl oder Bestimmung durch den Verbraucher maßgeblich ist oder die eindeutig auf die persönlichen Bedürfnisse zugeschnitten sind.
              </p>
              <p className="mt-4 italic text-sm">
                Erläuterung: Da wir Textilien speziell für Sie mit Ihrem Logo, Namen oder Design veredeln (sticken/drucken), können diese Waren nicht anderweitig verkauft werden. 
                <strong>Eine Rückgabe oder ein Umtausch wegen Nichtgefallens oder falscher Größe ist bei personalisierter Ware daher ausgeschlossen (§ 312g Abs. 2 Nr. 1 BGB).</strong>
              </p>
              <p className="mt-2 text-sm">
                 Dies gilt nicht bei Vorliegen von Sachmängeln (siehe § 7 Gewährleistung).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">§ 5 Preise und Zahlungsbedingungen</h2>
              <p>
                (1) Sofern im Angebot nicht anders angegeben, verstehen sich alle Preise in Euro netto zuzüglich der gesetzlichen Umsatzsteuer (für Geschäftskunden).
              </p>
              <p className="mt-2">
                (2) Der Rechnungsbetrag ist nach Erhalt der Rechnung und Lieferung der Ware innerhalb des auf der Rechnung ausgewiesenen Zahlungsziels ohne Abzug zu zahlen, sofern nichts anderes vereinbart wurde.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">§ 6 Lieferung und Eigentumsvorbehalt</h2>
              <p>
                (1) Die Lieferzeiten werden im individuellen Angebot genannt. Da es sich um individuelle Anfertigungen handelt, sind Liefertermine nur dann verbindlich, wenn sie ausdrücklich als solche bestätigt wurden.
              </p>
              <p className="mt-2">
                (2) Die gelieferte Ware bleibt bis zur vollständigen Bezahlung aller Forderungen aus dem Liefervertrag im Eigentum des Anbieters.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">§ 7 Gewährleistung (Mängelhaftung)</h2>
              <p>
                (1) Es gelten die gesetzlichen Gewährleistungsrechte. 
              </p>
              <p className="mt-2">
                (2) Handelsübliche oder geringfügige, technisch nicht vermeidbare Abweichungen der Qualität, Farbe, Größe, des Gewichts, der Ausrüstung oder des Designs (z.B. leichte Farbabweichungen beim Stickgarn) stellen keinen Mangel dar.
              </p>
              <p className="mt-2">
                (3) Offensichtliche Mängel sind vom Kunden (sofern Kaufmann) unverzüglich, spätestens jedoch innerhalb von 7 Tagen nach Erhalt der Ware schriftlich anzuzeigen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-3">§ 8 Schlussbestimmungen</h2>
              <p>
                (1) Es gilt das Recht der Bundesrepublik Deutschland.
              </p>
              <p className="mt-2">
                (2) Sofern der Kunde Kaufmann ist, ist der Geschäftssitz des Anbieters (MikMain) Gerichtsstand für alle Streitigkeiten aus diesem Vertrag.
              </p>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}