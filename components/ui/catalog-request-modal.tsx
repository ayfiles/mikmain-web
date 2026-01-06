"use client";

import { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Button } from "./button";

interface CatalogRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
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
  const modalRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<FormData>({
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

  useOutsideClick(modalRef, () => {
    if (isOpen) onClose();
  });

  // ESC zum Schließen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        logo: null,
        privacyAccepted: false,
      });
      setErrors({});
      setLogoPreview(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        logo: "Bitte laden Sie ein PNG, JPG oder SVG Bild hoch.",
      }));
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        logo: "Die Datei darf maximal 5MB groß sein.",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, logo: file }));
    setErrors((prev) => ({ ...prev, logo: undefined }));

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePrivacyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, privacyAccepted: e.target.checked }));
    if (errors.privacyAccepted) {
      setErrors((prev) => ({ ...prev, privacyAccepted: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Bitte geben Sie Ihren Namen ein.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Bitte geben Sie Ihr Unternehmen ein.";
    }

    if (formData.phone && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Bitte geben Sie eine gültige Telefonnummer ein.";
    }

    if (!formData.privacyAccepted) {
      newErrors.privacyAccepted = "Sie müssen die Datenschutzbestimmungen akzeptieren.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // TODO: Backend-Integration
    // Hier würde die Formular-Daten an das Backend gesendet werden
    console.log("Form Data:", formData);

    // Simuliere API-Call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    
    // Success message und Modal schließen
    alert("Vielen Dank! Wir werden uns in Kürze bei Ihnen melden.");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={cn(
                "relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl",
                "bg-mik-navy/95 backdrop-blur-2xl border border-white/10",
                "[box-shadow:0_0_80px_-20px_rgba(59,130,246,0.3),inset_0_1px_0_0_rgba(255,255,255,0.05)]"
              )}
            >
              {/* Header */}
              <div className="relative h-32 overflow-hidden bg-gradient-to-br from-mik-blue/20 via-mik-blue/10 to-transparent">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                  }} />
                </div>

                <div className="relative z-10 h-full flex items-center justify-between px-6">
                  <div>
                    <h2 className="font-heading text-2xl font-bold text-white mb-1">
                      Personalisierten Katalog anfragen
                    </h2>
                    <p className="text-sm text-mik-grey">
                      Wir erstellen Ihnen einen individuellen Produktkatalog
                    </p>
                  </div>

                  <button
                    onClick={onClose}
                    className={cn(
                      "p-2 rounded-full",
                      "bg-white/10 backdrop-blur-sm border border-white/20",
                      "hover:bg-white/20 transition-colors"
                    )}
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                {/* Name */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-white mb-2">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-white/5 border",
                      "text-white placeholder:text-mik-grey/50",
                      "focus:outline-none focus:ring-2 focus:ring-mik-blue/50 focus:border-mik-blue/50",
                      "transition-all",
                      errors.name ? "border-red-400/50" : "border-white/10"
                    )}
                    placeholder="Max Mustermann"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-white mb-2">
                    E-Mail <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-white/5 border",
                      "text-white placeholder:text-mik-grey/50",
                      "focus:outline-none focus:ring-2 focus:ring-mik-blue/50 focus:border-mik-blue/50",
                      "transition-all",
                      errors.email ? "border-red-400/50" : "border-white/10"
                    )}
                    placeholder="max@firma.de"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-white mb-2">
                    Unternehmen <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-white/5 border",
                      "text-white placeholder:text-mik-grey/50",
                      "focus:outline-none focus:ring-2 focus:ring-mik-blue/50 focus:border-mik-blue/50",
                      "transition-all",
                      errors.company ? "border-red-400/50" : "border-white/10"
                    )}
                    placeholder="Firma GmbH"
                  />
                  {errors.company && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.company}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-white mb-2">
                    Telefon <span className="text-mik-grey text-xs">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-white/5 border",
                      "text-white placeholder:text-mik-grey/50",
                      "focus:outline-none focus:ring-2 focus:ring-mik-blue/50 focus:border-mik-blue/50",
                      "transition-all",
                      errors.phone ? "border-red-400/50" : "border-white/10"
                    )}
                    placeholder="+49 123 456789"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Logo Upload */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-white mb-2">
                    Logo hochladen <span className="text-mik-grey text-xs">(Optional)</span>
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  {logoPreview ? (
                    <div className="space-y-3">
                      <div className="relative w-full h-32 rounded-xl overflow-hidden border border-white/10 bg-white/5">
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          className="w-full h-full object-contain p-2"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setLogoPreview(null);
                            setFormData((prev) => ({ ...prev, logo: null }));
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-mik-grey">
                        {formData.logo?.name}
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className={cn(
                        "w-full p-6 rounded-xl border-2 border-dashed",
                        "bg-white/5 border-white/20 hover:border-mik-blue/50",
                        "flex flex-col items-center justify-center gap-2",
                        "transition-all cursor-pointer",
                        errors.logo ? "border-red-400/50" : ""
                      )}
                    >
                      <Upload className="w-6 h-6 text-mik-blue" />
                      <span className="text-sm text-white">
                        Logo auswählen
                      </span>
                      <span className="text-xs text-mik-grey">
                        PNG, JPG oder SVG (max. 5MB)
                      </span>
                    </button>
                  )}
                  {errors.logo && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.logo}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="mb-5">
                  <label className="block text-sm font-medium text-white mb-2">
                    Nachricht <span className="text-mik-grey text-xs">(Optional)</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl bg-white/5 border",
                      "text-white placeholder:text-mik-grey/50",
                      "focus:outline-none focus:ring-2 focus:ring-mik-blue/50 focus:border-mik-blue/50",
                      "transition-all resize-none",
                      "border-white/10"
                    )}
                    placeholder="Haben Sie spezielle Anforderungen oder Fragen?"
                  />
                </div>

                {/* Privacy Checkbox */}
                <div className="mb-6">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.privacyAccepted}
                      onChange={handlePrivacyChange}
                      className={cn(
                        "mt-1 w-5 h-5 rounded border-2",
                        "bg-white/5 border-white/20",
                        "focus:ring-2 focus:ring-mik-blue/50",
                        "checked:bg-mik-blue checked:border-mik-blue",
                        "transition-all cursor-pointer",
                        errors.privacyAccepted ? "border-red-400/50" : ""
                      )}
                    />
                    <span className="text-sm text-white flex-1">
                      Ich akzeptiere die{" "}
                      <a
                        href="#"
                        className="text-mik-blue hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          // TODO: Link zur Datenschutzerklärung
                        }}
                      >
                        Datenschutzbestimmungen
                      </a>
                      <span className="text-red-400"> *</span>
                    </span>
                  </label>
                  {errors.privacyAccepted && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.privacyAccepted}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-mik-blue hover:bg-blue-600 text-white font-heading font-bold h-12 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        Wird gesendet...
                      </>
                    ) : (
                      <>
                        Anfrage senden
                        <FileText className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="flex-1 border-white/20 text-white hover:bg-white/10 font-heading font-bold h-12 rounded-xl"
                  >
                    Abbrechen
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CatalogRequestModal;

