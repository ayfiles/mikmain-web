"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    company: "",
    email: "",
    branch: "",
    budget: "",
    employees: "",
    message: "",
    privacy: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, privacy: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation eines API Calls
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Form Data:", formState);
    setIsSent(true);
    setIsSubmitting(false);
  };

  // Gemeinsame Styles für Inputs/Selects
  const inputClasses = "w-full bg-white/5 border border-border rounded-xl px-4 py-3 outline-none focus:border-mik-blue focus:ring-1 focus:ring-mik-blue/50 transition-all placeholder:text-muted-foreground/50 text-foreground";
  
  // FIX: Expliziter Style für Options, damit sie im Dropdown dunkel sind
  const optionClasses = "bg-[#0a192f] text-white"; 

  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden" id="contact">
      
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-mik-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* TEXT SEITE */}
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

          {/* FORMULAR SEITE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card/50 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[40px] shadow-2xl"
          >
            {isSent ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Anfrage gesendet!</h3>
                <p className="text-muted-foreground mb-6">Vielen Dank. Wir melden uns in Kürze bei Ihnen.</p>
                <Button onClick={() => setIsSent(false)} variant="outline">Neue Anfrage</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name & Firma */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Name *</label>
                    <input 
                      required
                      type="text" 
                      name="name" 
                      placeholder="Max Mustermann" 
                      value={formState.name}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Firma *</label>
                    <input 
                      required
                      type="text" 
                      name="company" 
                      placeholder="Muster GmbH" 
                      value={formState.company}
                      onChange={handleChange}
                      className={inputClasses}
                    />
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
                      value={formState.email}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Branche *</label>
                    <input 
                      required
                      type="text" 
                      name="branch" 
                      placeholder="z.B. Gastronomie" 
                      value={formState.branch}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Budget & Mitarbeiteranzahl */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Budget (Optional)</label>
                    <select 
                      name="budget" 
                      value={formState.budget}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="" disabled className={optionClasses}>Bitte wählen...</option>
                      <option value="< 5k" className={optionClasses}>unter 5.000 €</option>
                      <option value="5k-10k" className={optionClasses}>5.000 € - 10.000 €</option>
                      <option value="10k-50k" className={optionClasses}>10.000 € - 50.000 €</option>
                      <option value="> 50k" className={optionClasses}>über 50.000 €</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Mitarbeiteranzahl</label>
                    <select 
                      name="employees" 
                      value={formState.employees}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="" disabled className={optionClasses}>Bitte wählen...</option>
                      <option value="< 10" className={optionClasses}>Bis 10</option>
                      <option value="10-50" className={optionClasses}>10 - 50</option>
                      <option value="+100" className={optionClasses}>Über 100</option>
                    </select>
                  </div>
                </div>

                {/* Nachricht */}
                <div className="space-y-1">
                   <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Nachricht</label>
                   <textarea 
                     name="message" 
                     rows={4}
                     placeholder="Wie können wir Ihnen helfen?" 
                     value={formState.message}
                     onChange={handleChange}
                     className={`${inputClasses} resize-none`}
                   />
                </div>

                {/* Datenschutz Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input 
                    required
                    type="checkbox" 
                    id="privacy" 
                    name="privacy" 
                    checked={formState.privacy}
                    onChange={handleCheckboxChange}
                    className="mt-1 w-4 h-4 rounded border-border bg-transparent text-mik-blue focus:ring-mik-blue"
                  />
                  <label htmlFor="privacy" className="text-xs text-muted-foreground leading-snug">
                    Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und Zuordnung für eventuelle Rückfragen dauerhaft gespeichert werden. 
                    Hinweis: Diese Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen. 
                    Weitere Informationen finden Sie in der <Link href="/datenschutz" className="underline hover:text-foreground">Datenschutzerklärung</Link>. *
                  </label>
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-12 bg-mik-blue hover:bg-blue-600 text-white font-bold rounded-xl mt-4"
                >
                  {isSubmitting ? "Wird gesendet..." : "Anfrage absenden"}
                  {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                </Button>

              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}