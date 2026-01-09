"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/submit-contact"; 
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

// Startzustand für das Formular (für Server Action)
const initialState = {
  success: false,
  message: "",
  errors: {} as Record<string, string[]>
};

export function ContactSection() {
  // Hook verbindet Formular mit Backend
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  // Deine originalen Styles
  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-mik-blue focus:ring-1 focus:ring-mik-blue/50 transition-all placeholder:text-muted-foreground/50 text-foreground";
  const optionClasses = "bg-[#0a192f] text-white"; 

  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden" id="contact">
      
      {/* Background Elements (Dein Original) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-mik-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LINKSE SEITE: TEXT & SCHRITTE (Wie davor) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-foreground">
              Lassen Sie uns <br />
              <span className="text-mik-blue">starten.</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md font-sans leading-relaxed">
              Erzählen Sie uns von Ihrem Vorhaben. Wir erstellen Ihnen ein unverbindliches Konzept für Ihre Corporate Fashion.
            </p>

            <div className="space-y-6">
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full bg-mik-navy/5 dark:bg-white/10 flex items-center justify-center shrink-0 text-mik-blue font-bold text-xl">1</div>
                 <div>
                   <h4 className="font-bold text-foreground text-lg">Analyse & Design</h4>
                   <p className="text-muted-foreground text-sm">Wir verstehen Ihre Marke und entwerfen die passende Kollektion.</p>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full bg-mik-navy/5 dark:bg-white/10 flex items-center justify-center shrink-0 text-mik-blue font-bold text-xl">2</div>
                 <div>
                   <h4 className="font-bold text-foreground text-lg">Produktion & Logistik</h4>
                   <p className="text-muted-foreground text-sm">Hochwertige Fertigung und Lagerung Ihrer Textilien.</p>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-full bg-mik-navy/5 dark:bg-white/10 flex items-center justify-center shrink-0 text-mik-blue font-bold text-xl">3</div>
                 <div>
                   <h4 className="font-bold text-foreground text-lg">Full-Service</h4>
                   <p className="text-muted-foreground text-sm">Wäscheservice, Reparatur und automatisierte Nachbestellung.</p>
                 </div>
               </div>
            </div>
          </motion.div>

          {/* RECHTE SEITE: FORMULAR (Jetzt mit Funktion) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card/50 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[40px] shadow-2xl"
          >
            {/* Success State anzeigen */}
            {state.success ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-[400px] flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_-5px_rgba(34,197,94,0.4)]">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Anfrage gesendet!</h3>
                <p className="text-muted-foreground mb-6">Vielen Dank. Wir melden uns in Kürze bei Ihnen.</p>
                {/* Button lädt die Seite neu oder setzt Formular zurück (optional) */}
                <Button onClick={() => window.location.reload()} variant="outline" className="border-white/10 hover:bg-white/5">
                  Neue Anfrage
                </Button>
              </motion.div>
            ) : (
              <form action={formAction} className="space-y-4">
                
                {/* Honeypot (Versteckt) */}
                <input 
                  type="text" 
                  name="gh_check_88" 
                  style={{ display: 'none' }} 
                  tabIndex={-1} 
                  autoComplete="off"
                />

                {/* Name & Firma */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Name *</label>
                    <input 
                      required
                      type="text" 
                      name="name" 
                      placeholder="Max Mustermann" 
                      className={inputClasses}
                    />
                    {state.errors?.name && <p className="text-red-400 text-xs flex items-center gap-1 mt-1"><AlertCircle size={10}/> {state.errors.name[0]}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Firma *</label>
                    <input 
                      required
                      type="text" 
                      name="company" 
                      placeholder="Muster GmbH" 
                      className={inputClasses}
                    />
                    {state.errors?.company && <p className="text-red-400 text-xs flex items-center gap-1 mt-1"><AlertCircle size={10}/> {state.errors.company[0]}</p>}
                  </div>
                </div>

                {/* E-Mail & Branche */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">E-Mail *</label>
                    <input 
                      required
                      type="email" 
                      name="email" 
                      placeholder="info@muster.de" 
                      className={inputClasses}
                    />
                    {state.errors?.email && <p className="text-red-400 text-xs flex items-center gap-1 mt-1"><AlertCircle size={10}/> {state.errors.email[0]}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Branche *</label>
                    <input 
                      required
                      type="text" 
                      name="industry" // WICHTIG: Hier "industry", nicht "branch"
                      placeholder="z.B. Gastronomie" 
                      className={inputClasses}
                    />
                    {state.errors?.industry && <p className="text-red-400 text-xs flex items-center gap-1 mt-1"><AlertCircle size={10}/> {state.errors.industry[0]}</p>}
                  </div>
                </div>

                {/* Budget & Mitarbeiteranzahl */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Budget (Optional)</label>
                    <div className="relative">
                      <select 
                        name="budget" 
                        defaultValue=""
                        className={inputClasses}
                      >
                        <option value="" disabled className={optionClasses}>Bitte wählen...</option>
                        <option value="< 5k" className={optionClasses}>unter 5.000 €</option>
                        <option value="5k-10k" className={optionClasses}>5.000 € - 10.000 €</option>
                        <option value="10k-50k" className={optionClasses}>10.000 € - 50.000 €</option>
                        <option value="> 50k" className={optionClasses}>über 50.000 €</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Mitarbeiteranzahl</label>
                    <div className="relative">
                      <select 
                        name="employees" 
                        defaultValue=""
                        className={inputClasses}
                      >
                        <option value="" disabled className={optionClasses}>Bitte wählen...</option>
                        <option value="< 10" className={optionClasses}>Bis 10</option>
                        <option value="10-50" className={optionClasses}>10 - 50</option>
                        <option value="+100" className={optionClasses}>Über 100</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Nachricht */}
                <div className="space-y-1">
                   <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Nachricht</label>
                   <textarea 
                     name="message" 
                     required
                     rows={4}
                     placeholder="Wie können wir Ihnen helfen?" 
                     className={`${inputClasses} resize-none`}
                   />
                   {state.errors?.message && <p className="text-red-400 text-xs flex items-center gap-1 mt-1"><AlertCircle size={10}/> {state.errors.message[0]}</p>}
                </div>

                {/* Datenschutz Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input 
                    required
                    type="checkbox" 
                    id="privacy" 
                    name="privacy" 
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-transparent text-mik-blue focus:ring-mik-blue cursor-pointer"
                  />
                  <label htmlFor="privacy" className="text-xs text-muted-foreground leading-snug cursor-pointer select-none">
                    Ich stimme zu, dass meine Angaben zur Kontaktaufnahme gespeichert werden. 
                    Weitere Infos in der <Link href="/datenschutz" className="underline hover:text-white transition-colors">Datenschutzerklärung</Link>. *
                  </label>
                </div>

                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full h-12 bg-mik-blue hover:bg-mik-blue-light text-white font-bold rounded-xl mt-4 transition-all shadow-lg hover:shadow-mik-blue/20"
                >
                  {isPending ? "Wird gesendet..." : "Anfrage absenden"}
                  {!isPending && <ArrowRight className="ml-2 w-5 h-5" />}
                </Button>
                
                {/* Globaler Fehler (falls DB down ist) */}
                {state.message && !state.success && (
                    <p className="text-red-400 text-sm text-center mt-2 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                        {state.message}
                    </p>
                )}

              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}