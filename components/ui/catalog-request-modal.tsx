"use client";

import { useActionState, useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitCatalogRequest } from "@/app/actions/submit-catalog"; // <--- Neue Action

interface CatalogRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string; // Optional: Falls wir wissen, wofür (z.B. "T-Shirt Premium")
}

const initialState = {
  success: false,
  message: "",
  errors: {} as Record<string, string[]>
};

export default function CatalogRequestModal({ isOpen, onClose, productName }: CatalogRequestModalProps) {
  const [state, formAction, isPending] = useActionState(submitCatalogRequest, initialState);
  const [fileName, setFileName] = useState<string | null>(null);

  // Reset bei schließen/öffnen
  useEffect(() => {
    if(!isOpen) {
       setFileName(null);
       // Man könnte hier auch den State resetten, aber useActionState ist persistent pro Mount
    }
  }, [isOpen]);

  // Wenn erfolgreich gesendet -> Schließe Modal nach 2s (optional) oder zeige Success Screen
  // Hier zeigen wir einen Success Screen im Modal an.

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-mik-navy border border-white/10 text-white rounded-2xl">
        
        {/* Header mit X Button */}
        <div className="relative p-6 pb-2">
            <DialogTitle className="text-2xl font-bold font-heading">
                {productName ? `Anfrage: ${productName}` : "Personalisierter Katalog"}
            </DialogTitle>
            <p className="text-sm text-muted-foreground mt-1">
                Laden Sie Ihr Logo hoch für eine kostenlose Vorschau.
            </p>
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
                <X size={20} className="text-white/70" />
            </button>
        </div>

        {/* Content Area */}
        <div className="p-6 pt-2">
            
            {state.success ? (
                // SUCCESS STATE
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold">Vielen Dank!</h3>
                    <p className="text-muted-foreground text-sm">
                        Wir haben Ihre Daten erhalten und erstellen Ihre Vorschau.
                    </p>
                    <Button onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white mt-4">
                        Schließen
                    </Button>
                </div>
            ) : (
                // FORMULAR
                <form action={formAction} className="space-y-4">
                    
                    {/* Honeypot Field */}
                    <input type="text" name="gh_check_cat" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

                    {/* Name */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Name *</label>
                        <input name="name" required placeholder="Ihr Name" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-mik-blue outline-none transition-all" />
                        {state.errors?.name && <p className="text-red-400 text-xs">{state.errors.name[0]}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-muted-foreground">E-Mail *</label>
                        <input name="email" type="email" required placeholder="name@firma.de" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-mik-blue outline-none transition-all" />
                        {state.errors?.email && <p className="text-red-400 text-xs">{state.errors.email[0]}</p>}
                    </div>

                    {/* Unternehmen */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Unternehmen *</label>
                        <input name="company" required placeholder="Firma GmbH" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-mik-blue outline-none transition-all" />
                        {state.errors?.company && <p className="text-red-400 text-xs">{state.errors.company[0]}</p>}
                    </div>

                    {/* Telefon (Optional) */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Telefon (Optional)</label>
                        <input name="phone" placeholder="+49 ..." className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-mik-blue outline-none transition-all" />
                    </div>

                    {/* Datei Upload (Custom Style) */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Logo (Optional)</label>
                        <div className="relative group">
                            <input 
                                type="file" 
                                name="logo" 
                                accept="image/png, image/jpeg, image/svg+xml"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={(e) => {
                                    if(e.target.files && e.target.files[0]) {
                                        setFileName(e.target.files[0].name);
                                    }
                                }}
                            />
                            <div className={`w-full border border-dashed rounded-lg p-4 flex items-center justify-center gap-2 transition-all ${fileName ? 'border-mik-blue bg-mik-blue/10 text-mik-blue' : 'border-white/20 text-muted-foreground group-hover:border-white/40'}`}>
                                <Upload size={16} />
                                <span className="text-sm truncate max-w-[200px]">
                                    {fileName || "Logo hochladen (Max 5MB)"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Nachricht */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-muted-foreground">Nachricht (Optional)</label>
                        <textarea name="message" rows={2} placeholder="Sonderwünsche?" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-mik-blue outline-none transition-all resize-none" />
                    </div>

                    {/* Global Error */}
                    {state.message && !state.success && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-2 rounded flex items-center gap-2">
                            <AlertCircle size={12} /> {state.message}
                        </div>
                    )}

                    {/* Submit */}
                    <Button 
                        type="submit" 
                        disabled={isPending} 
                        className="w-full bg-mik-blue hover:bg-mik-blue-light text-white font-bold h-10 mt-2"
                    >
                        {isPending ? "Sende..." : "Katalog anfordern"}
                    </Button>

                </form>
            )}
        </div>

      </DialogContent>
    </Dialog>
  );
}