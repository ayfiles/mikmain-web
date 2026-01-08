"use client";

import React from "react";
import CardNav from "@/components/ui/CardNav";

export default function DatenschutzPage() {
  
  const navItems = [
    {
      label: "Services",
      bgColor: "#0a192f", 
      textColor: "#ffffff",
      links: [
        { label: "Zur Section", href: "/#services", ariaLabel: "Services" },
      ]
    },
    {
      label: "Kollektion",
      bgColor: "#0a192f", 
      textColor: "#ffffff",
      links: [
        { label: "Zur Section", href: "/#catalog", ariaLabel: "Kollektion" },
      ]
    },
    {
      label: "Kundenreferenzen",
      bgColor: "#0a192f", 
      textColor: "#ffffff",
      links: [
        { label: "Zur Section", href: "/#references", ariaLabel: "Kundenreferenzen" },
      ]
    },
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
        
        <div className="max-w-3xl mx-auto rounded-[30px] border border-white/10 bg-mik-navy/5 dark:bg-white/5 backdrop-blur-xl shadow-2xl p-6 md:p-12 relative overflow-hidden">
          
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-mik-blue/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* HIER GEÄNDERT: text-foreground */}
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8 relative z-10">
            Datenschutzerklärung
          </h1>

          <div className="space-y-6 text-lg text-foreground/80 relative z-10 font-sans">
            
            <section>
              {/* HIER GEÄNDERT: text-foreground */}
              <h2 className="text-xl font-bold text-foreground mb-2">1. Datenschutz auf einen Blick</h2>
              <h3 className="font-bold mt-4 text-foreground">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
                wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-2">2. Hosting und Content Delivery Networks (CDN)</h2>
              <p>
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:<br />
                [Muster-Hoster]<br />
                Musterweg 123, 90210 Musterstadt
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-2">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              <h3 className="font-bold mt-4 text-foreground">Datenschutz</h3>
              <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. 
                Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften 
                sowie dieser Datenschutzerklärung.
              </p>
              
              <h3 className="font-bold mt-4 text-foreground">Hinweis zur verantwortlichen Stelle</h3>
              <p>
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
                MikMain GmbH<br />
                Musterstraße 123<br />
                12345 Musterstadt<br /><br />
                Telefon: +49 (0) 123 44 55 66<br />
                E-Mail: info@mikmain.com
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-foreground mb-2">4. Datenerfassung auf dieser Website</h2>
              <h3 className="font-bold mt-4 text-foreground">Cookies</h3>
              <p>
                Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an.
                Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
              </p>
              
              <h3 className="font-bold mt-4 text-foreground">Kontaktformular</h3>
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive 
                der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>
            </section>

            <div className="w-full h-px bg-foreground/10 my-8"></div>

            <p className="text-sm opacity-60">
              Hinweis: Dies ist ein Platzhalter-Text für die Datenschutzerklärung. Bitte ersetzen Sie diese Inhalte vor Veröffentlichung durch Ihre rechtskonformen Texte (z.B. von einem Datenschutz-Generator oder Anwalt).
            </p>

          </div>
        </div>
      </main>
    </div>
  );
}