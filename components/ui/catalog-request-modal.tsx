"use client";

import { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { X, Upload, FileText, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { submitCatalogRequest } from "@/app/actions/submit-catalog"; // Server Action Import

interface CatalogRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormDataState {
  name: string;
  email: string;
  company: string;
  phone: string;
  message: string;
  logo: File | null;
  privacyAccepted: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  logo?: string;
  privacyAccepted?: string;
}

export function CatalogRequestModal({ isOpen, onClose }: CatalogRequestModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    logo: null,
    privacyAccepted: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset Formular, wenn das Modal geschlossen wird
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setFormData({
            name: "", email: "", company: "", phone: "", message: "", logo: null, privacyAccepted: false
        });
        setErrors({});
        setLogoPreview(null);
        setIsSubmitting(false);
        setShowSuccess(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({ ...prev, logo: "Bitte PNG, JPG oder SVG." }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, logo: "Maximal 5MB erlaubt." }));
      return;
    }

    setFormData((prev) => ({ ...prev, logo: file }));
    setErrors((prev) => ({ ...prev, logo: undefined }));

    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name fehlt.";
    if (!formData.email.trim()) newErrors.email = "E-Mail fehlt.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Ungültige E-Mail.";
    if (!formData.company.trim()) newErrors.company = "Firma fehlt.";
    if (!formData.privacyAccepted) newErrors.privacyAccepted = "Pflichtfeld.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // FormData für die Server Action erstellen
    const submissionData = new FormData();
    submissionData.append("name", formData.name);
    submissionData.append("email", formData.email);
    submissionData.append("company", formData.company);
    submissionData.append("phone", formData.phone);
    submissionData.append("message", formData.message);
    // submissionData.append("gh_check_cat", ""); // Optional: Honeypot im Frontend

    if (formData.logo) {
      submissionData.append("logo", formData.logo);
    }

    try {
      // Server Action aufrufen
      const result = await submitCatalogRequest(null, submissionData);

      if (result.success) {
        setShowSuccess(true);
      } else {
        console.error("Server Error:", result.message);
        alert(result.message || "Fehler beim Senden.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Ein unerwarteter Fehler ist aufgetreten.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className={cn(
            "p-0 overflow-hidden bg-mik-navy border border-white/10 text-white sm:max-w-[600px]",
            // Versteckt das Standard-Kreuz von Radix UI
            "[&>button]:hidden"
        )}
      >
        <DialogTitle className="sr-only">Katalog anfragen</DialogTitle>
        
        {/* Header mit eigenem Schließen-Button */}
        <div className="relative h-28 bg-gradient-to-br from-mik-blue/20 via-mik-blue/10 to-transparent flex items-center justify-between px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:24px_24px] opacity-30" />
            
            <div className="relative z-10">
                <h2 className="font-heading text-2xl font-bold text-white">
                    Katalog anfragen
                </h2>
                <p className="text-mik-grey text-sm mt-1">
                    Wir erstellen Ihr persönliches Konzept.
                </p>
            </div>

            <button 
                onClick={onClose}
                className="relative z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
            >
                <X className="w-5 h-5 text-white" />
            </button>
        </div>

        {/* Content */}
        <div className="p-6">
            {showSuccess ? (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-10 text-center space-y-4"
                >
                    <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center border border-green-500/30 shadow-[0_0_30px_-5px_rgba(34,197,94,0.4)]">
                        <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Anfrage gesendet!</h3>
                    <p className="text-mik-grey max-w-xs">
                        Vielen Dank. Unser Team wird sich schnellstmöglich bei Ihnen melden.
                    </p>
                    <Button onClick={onClose} className="mt-4 bg-white/10 hover:bg-white/20 text-white">
                        Schließen
                    </Button>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-mik-grey ml-1">Name *</label>
                            <input 
                                name="name" 
                                value={formData.name} 
                                onChange={handleInputChange} 
                                className={cn("w-full bg-white/5 border rounded-xl px-4 py-3 text-white outline-none focus:border-mik-blue focus:ring-1 focus:ring-mik-blue/50 transition-all", errors.name ? "border-red-500/50" : "border-white/10")} 
                                placeholder="Max Mustermann"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-mik-grey ml-1">Firma *</label>
                            <input 
                                name="company" 
                                value={formData.company} 
                                onChange={handleInputChange} 
                                className={cn("w-full bg-white/5 border rounded-xl px-4 py-3 text-white outline-none focus:border-mik-blue focus:ring-1 focus:ring-mik-blue/50 transition-all", errors.company ? "border-red-500/50" : "border-white/10")} 
                                placeholder="Muster GmbH"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-mik-grey ml-1">E-Mail *</label>
                            <input 
                                name="email" 
                                type="email"
                                value={formData.email} 
                                onChange={handleInputChange} 
                                className={cn("w-full bg-white/5 border rounded-xl px-4 py-3 text-white outline-none focus:border-mik-blue focus:ring-1 focus:ring-mik-blue/50 transition-all", errors.email ? "border-red-500/50" : "border-white/10")} 
                                placeholder="info@muster.de"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold uppercase text-mik-grey ml-1">Telefon</label>
                            <input 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleInputChange} 
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-mik-blue focus:ring-1 focus:ring-mik-blue/50 transition-all" 
                                placeholder="+49 ..."
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-mik-grey ml-1">Logo (Optional)</label>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                        
                        {logoPreview ? (
                            <div className="relative w-full h-24 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center overflow-hidden group">
                                <img src={logoPreview} alt="Preview" className="h-full object-contain p-2" />
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button type="button" onClick={() => { setLogoPreview(null); setFormData(p => ({...p, logo: null})); }} className="p-2 bg-red-500/80 rounded-full hover:bg-red-500 text-white transition-colors">
                                        <X size={16} />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button type="button" onClick={() => fileInputRef.current?.click()} className={cn("w-full h-24 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-1 transition-all hover:bg-white/5 hover:border-mik-blue/50", errors.logo ? "border-red-500/50 bg-red-500/5" : "border-white/10")}>
                                <Upload size={20} className="text-mik-blue" />
                                <span className="text-xs text-mik-grey">Logo hochladen (Max 5MB)</span>
                            </button>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-mik-grey ml-1">Nachricht (Optional)</label>
                        <textarea 
                            name="message" 
                            rows={3} 
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-mik-blue focus:ring-1 focus:ring-mik-blue/50 transition-all resize-none"
                            placeholder="Ihre Wünsche..."
                        />
                    </div>

                    <div className="flex items-start gap-3">
                        <input type="checkbox" checked={formData.privacyAccepted} onChange={(e) => { setFormData(p => ({...p, privacyAccepted: e.target.checked})); if(errors.privacyAccepted) setErrors(p => ({...p, privacyAccepted: undefined})); }} className="mt-1" />
                        <span className={cn("text-xs text-mik-grey leading-tight", errors.privacyAccepted && "text-red-400")}>
                            Ich stimme der Verarbeitung meiner Daten zu.
                        </span>
                    </div>

                    <div className="pt-2">
                        <Button type="submit" disabled={isSubmitting} className="w-full bg-mik-blue hover:bg-mik-blue-light text-white font-bold h-12 rounded-xl">
                            {isSubmitting ? "Sende..." : "Anfrage absenden"} <FileText className="ml-2 w-4 h-4" />
                        </Button>
                    </div>
                </form>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}