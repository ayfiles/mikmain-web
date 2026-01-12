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
        
        <div className="max-w-4xl mx-auto rounded-[30px] border border-white/10 bg-mik-navy/5 dark:bg-white/5 backdrop-blur-xl shadow-2xl p-6 md:p-12 relative overflow-hidden">
          
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-mik-blue/10 rounded-full blur-3xl pointer-events-none"></div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8 relative z-10">
            Datenschutzerklärung
          </h1>

          <div className="space-y-8 text-lg text-foreground/80 relative z-10 font-sans">
            
            {/* 1. Überblick */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-lg font-bold mt-4 text-foreground">Allgemeine Hinweise</h3>
              <p className="mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, 
                wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>
              
              <h3 className="text-lg font-bold mt-4 text-foreground">Datenerfassung auf dieser Website</h3>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Wer ist verantwortlich?</strong> Die Datenverarbeitung erfolgt durch den Websitebetreiber (siehe Impressum).</li>
                <li><strong>Wie erfassen wir Daten?</strong> Automatisch beim Besuch (technische Daten) oder wenn Sie uns diese mitteilen (Kontaktformular).</li>
                <li><strong>Wofür nutzen wir Daten?</strong> Zur Bereitstellung der Website, Kommunikation und Sicherheit.</li>
              </ul>
            </section>

            {/* 2. Hosting */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Hosting und Backend</h2>
              
              <h3 className="text-lg font-bold mt-4 text-foreground">Externes Hosting (Vercel)</h3>
              <p className="mb-4">
                Diese Website wird bei <strong>Vercel Inc.</strong> gehostet (440 N Barranca Ave #4133, Covina, CA 91723, USA).<br />
                Vercel verarbeitet Ihre IP-Adresse und technische Zugriffsdaten, um die Website auszuliefern. Dies erfolgt auf Grundlage unseres berechtigten Interesses an einer sicheren und schnellen Bereitstellung unseres Online-Angebots (Art. 6 Abs. 1 lit. f DSGVO).
              </p>

              <h3 className="text-lg font-bold mt-4 text-foreground">Supabase (Datenbank)</h3>
              <p className="mb-4">
                Wir nutzen <strong>Supabase</strong> (Supabase, Inc., 970 Toa Payoh North #07-04, Singapore 319000) als Datenbank- und Backend-Provider. 
                Wenn Sie Formulare auf unserer Seite nutzen (z. B. Kontakt oder Katalog-Anfrage), werden diese Daten auf Servern von Supabase gespeichert.
                Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (technisch fehlerfreie und sichere Verwaltung von Kundenanfragen).
              </p>
              
              <p className="text-sm italic">
                Wir haben mit beiden Anbietern Verträge zur Auftragsverarbeitung (AVV) abgeschlossen, um den Schutz Ihrer Daten zu gewährleisten.
              </p>
            </section>

            {/* 3. Pflichtinfos */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              
              <h3 className="text-lg font-bold mt-4 text-foreground">Verantwortliche Stelle</h3>
              <div className="bg-foreground/5 p-4 rounded-lg mt-2">
                <p><strong>MIKMAIN</strong></p>
                <p>Mikail Demirci</p>
                <p>Große Gallusstraße 14</p>
                <p>60315 Frankfurt am Main</p>
                <p className="mt-2">Telefon: +49 171 1696958</p>
                <p>E-Mail: info@mikmain.de</p>
              </div>

              <h3 className="text-lg font-bold mt-4 text-foreground">SSL- bzw. TLS-Verschlüsselung</h3>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie am Schloss-Symbol in Ihrer Browserzeile.
              </p>
            </section>

            {/* 4. Datenerfassung */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Datenerfassung auf dieser Website</h2>
              
              <h3 className="text-lg font-bold mt-4 text-foreground">Cookies</h3>
              <p className="mb-4">
                Unsere Internetseiten verwenden „Cookies“. Das sind kleine Textdateien, die Ihr Browser auf Ihrem Endgerät speichert. 
                Technisch notwendige Cookies werden auf Basis von Art. 6 Abs. 1 lit. f DSGVO gespeichert. Für alle anderen Cookies (z. B. Analyse) holen wir Ihre Einwilligung ein.
              </p>
              
              <h3 className="text-lg font-bold mt-4 text-foreground">Kontaktformular & Katalog-Anfrage</h3>
              <p>
                Wenn Sie uns per Kontaktformular oder Katalog-Formular Anfragen zukommen lassen, werden Ihre Angaben inklusive der Kontaktdaten zwecks Bearbeitung der Anfrage bei uns gespeichert. 
                Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung beruht auf Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) oder unserem berechtigten Interesse.
              </p>
            </section>

            {/* 5. Cookiebot NEU HINZUGEFÜGT */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Einwilligung mit Usercentrics (Cookiebot)</h2>
              <p className="mb-4">
                Diese Website nutzt die Consent-Technologie von <strong>Usercentrics A/S</strong> (Havnegade 39, 1058 Kopenhagen, Dänemark, „Cookiebot“), um Ihre Einwilligung zur Speicherung bestimmter Cookies auf Ihrem Endgerät oder zum Einsatz bestimmter Technologien einzuholen und diese datenschutzkonform zu dokumentieren.
              </p>
              <p className="mb-4">
                Wenn Sie unsere Website betreten, wird eine Verbindung zu den Servern von Usercentrics hergestellt, um Ihre Einwilligungen und sonstigen Erklärungen zur Cookie-Nutzung einzuholen. Anschließend speichert Usercentrics einen Cookie in Ihrem Browser, um Ihnen die erteilten Einwilligungen bzw. deren Widerruf zuordnen zu können.
              </p>
              <h3 className="text-lg font-bold mt-4 text-foreground">Verarbeitete Daten</h3>
              <ul className="list-disc pl-5 space-y-1 mb-4">
                <li>Ihre IP-Adresse (anonymisiert)</li>
                <li>Datum und Uhrzeit der Zustimmung</li>
                <li>Browserinformationen</li>
                <li>URL der Webseite</li>
                <li>Einwilligungsstatus (Ja/Nein zu Kategorien)</li>
              </ul>
              <h3 className="text-lg font-bold mt-4 text-foreground">Rechtsgrundlage</h3>
              <p className="mb-4">
                Der Einsatz von Usercentrics erfolgt, um die gesetzlich vorgeschriebenen Einwilligungen für den Einsatz von Cookies einzuholen. Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. c DSGVO (Erfüllung einer rechtlichen Verpflichtung).
              </p>
              <h3 className="text-lg font-bold mt-4 text-foreground">Auftragsverarbeitung</h3>
              <p>
                Wir haben einen Vertrag über Auftragsverarbeitung mit Usercentrics geschlossen. Dieser stellt sicher, dass die Daten unserer Seitenbesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet werden.
              </p>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
}