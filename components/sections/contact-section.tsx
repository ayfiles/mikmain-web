"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/app/actions/submit-contact"; // Import der Action
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

// Startzustand für das Formular
const initialState = {
  success: false,
  message: "",
  errors: {} as Record<string, string[]>
};

export function ContactSection() {
  // Hook verbindet Formular mit Backend
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  return (
    <section className="relative w-full py-24 px-4 overflow-hidden" id="contact">
      
      {/* Hintergrund-Elemente (bleiben gleich) */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-mik-blue/50 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Starten wir Ihr </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mik-blue to-mik-blue-light">
              Projekt
            </span>
          </h2>
          <p className="text-mik-grey text-lg max-w-2xl mx-auto">
            Erzählen Sie uns von Ihren Anforderungen. Wir entwickeln ein maßgeschneidertes Bekleidungskonzept für Ihr Unternehmen.
          </p>
        </div>

        {/* Das Formular */}
        <div className="bg-mik-navy/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          
          <form action={formAction} className="space-y-6">
            
            {/* Honeypot Feld (Versteckt) */}
            <input 
              type="text" 
              name="company_hp" 
              style={{ display: 'none' }} 
              tabIndex={-1} 
              autoComplete="off"
            />

            {/* Zeile 1: Name & Firma */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-mik-grey">Name *</label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full bg-mik-navy/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-mik-blue/50 focus:ring-1 focus:ring-mik-blue/50 transition-all"
                  placeholder="Max Mustermann"
                />
                {state.errors?.name && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={12}/> {state.errors.name[0]}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-mik-grey">Firma *</label>
                <input
                  id="company"
                  name="company"
                  required
                  className="w-full bg-mik-navy/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-mik-blue/50 focus:ring-1 focus:ring-mik-blue/50 transition-all"
                  placeholder="Muster GmbH"
                />
                {state.errors?.company && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={12}/> {state.errors.company[0]}</p>}
              </div>
            </div>

            {/* Zeile 2: Email & Branche */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-mik-grey">E-Mail *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full bg-mik-navy/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-mik-blue/50 focus:ring-1 focus:ring-mik-blue/50 transition-all"
                  placeholder="max@muster.de"
                />
                {state.errors?.email && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={12}/> {state.errors.email[0]}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="industry" className="text-sm font-medium text-mik-grey">Branche *</label>
                <input
                  id="industry"
                  name="industry"
                  required
                  className="w-full bg-mik-navy/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-mik-blue/50 focus:ring-1 focus:ring-mik-blue/50 transition-all"
                  placeholder="z.B. Gastronomie"
                />
                {state.errors?.industry && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={12}/> {state.errors.industry[0]}</p>}
              </div>
            </div>

            {/* Zeile 3: Budget & Mitarbeiter (Selects) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="budget" className="text-sm font-medium text-mik-grey">Budget (Optional)</label>
                <div className="relative">
                  <select
                    id="budget"
                    name="budget"
                    className="w-full bg-mik-navy/60 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-mik-blue/50 focus:ring-1 focus:ring-mik-blue/50 transition-all cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-mik-navy text-gray-400">Bitte wählen...</option>
                    <option value="under_5k" className="bg-mik-navy">Unter 5.000€</option>
                    <option value="5k_10k" className="bg-mik-navy">5.000€ - 10.000€</option>
                    <option value="10k_50k" className="bg-mik-navy">10.000€ - 50.000€</option>
                    <option value="over_50k" className="bg-mik-navy">Über 50.000€</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="employees" className="text-sm font-medium text-mik-grey">Mitarbeiteranzahl</label>
                <div className="relative">
                  <select
                    id="employees"
                    name="employees"
                    className="w-full bg-mik-navy/60 border border-white/10 rounded-xl px-4 py-3 text-white appearance-none focus:outline-none focus:border-mik-blue/50 focus:ring-1 focus:ring-mik-blue/50 transition-all cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled className="bg-mik-navy text-gray-400">Bitte wählen...</option>
                    <option value="1_10" className="bg-mik-navy">1 - 10</option>
                    <option value="11_50" className="bg-mik-navy">11 - 50</option>
                    <option value="51_200" className="bg-mik-navy">51 - 200</option>
                    <option value="over_200" className="bg-mik-navy">Über 200</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Zeile 4: Nachricht */}
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-mik-grey">Nachricht *</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full bg-mik-navy/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-mik-blue/50 focus:ring-1 focus:ring-mik-blue/50 transition-all resize-none"
                placeholder="Wie können wir Ihnen helfen?"
              />
              {state.errors?.message && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={12}/> {state.errors.message[0]}</p>}
            </div>

            {/* Submit Button & Feedback */}
            <div className="pt-4 flex flex-col items-center gap-4">
              <Button 
                type="submit" 
                size="lg" 
                disabled={isPending}
                className="w-full bg-mik-blue hover:bg-mik-blue-light text-white font-heading font-bold h-14 rounded-xl transition-all hover:scale-[1.02] shadow-[0_0_30px_-5px_#2563EB60]"
              >
                {isPending ? (
                  "Wird gesendet..."
                ) : (
                  <>
                    Anfrage absenden <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>

              {/* Erfolgs-Nachricht */}
              {state.message && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg ${state.success ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                >
                  {state.success ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}
                  {state.message}
                </motion.div>
              )}
            </div>

          </form>

        </div>
      </div>
    </section>
  );
}