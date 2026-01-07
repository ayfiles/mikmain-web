"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { BRANCH_DATA } from "@/components/ui/infinite-branch-cards";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormData {
  name: string;
  company: string;
  email: string;
  branch: string;
  products: string[];
  budget: string;
  message: string;
  privacyAccepted: boolean;
}

interface FormErrors {
  name?: string;
  company?: string;
  email?: string;
  branch?: string;
  products?: string;
  budget?: string;
  privacyAccepted?: string;
}

const BUDGET_OPTIONS = [
  "Unter 5.000€",
  "5.000€ - 10.000€",
  "10.000€ - 25.000€",
  "25.000€ - 50.000€",
  "Über 50.000€",
  "Individuell",
];

const GENERIC_PRODUCTS = [
  "Berufskleidung",
  "Uniformen",
  "Accessoires",
  "Wäscheservice",
  "Individuelle Lösung",
];

export function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    branch: "",
    products: [],
    budget: "",
    message: "",
    privacyAccepted: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedBranch = BRANCH_DATA.find((b) => b.id === formData.branch);
  const availableProducts = selectedBranch
    ? selectedBranch.features
    : formData.branch === "other"
    ? GENERIC_PRODUCTS
    : [];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    
    // Reset products when branch changes
    if (name === "branch") {
      setFormData((prev) => ({ ...prev, products: [] }));
    }
  };

  const handleProductToggle = (product: string) => {
    setFormData((prev) => {
      const products = prev.products.includes(product)
        ? prev.products.filter((p) => p !== product)
        : [...prev.products, product];
      return { ...prev, products };
    });
    if (errors.products) {
      setErrors((prev) => ({ ...prev, products: undefined }));
    }
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

    if (!formData.company.trim()) {
      newErrors.company = "Bitte geben Sie Ihr Unternehmen ein.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Bitte geben Sie Ihre E-Mail-Adresse ein.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    }

    if (!formData.branch) {
      newErrors.branch = "Bitte wählen Sie eine Branche aus.";
    }

    if (formData.products.length === 0) {
      newErrors.products = "Bitte wählen Sie mindestens ein Produkt aus.";
    }

    if (!formData.budget) {
      newErrors.budget = "Bitte wählen Sie ein Budget aus.";
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
    console.log("Form Data:", formData);

    // Simuliere API-Call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        company: "",
        email: "",
        branch: "",
        products: [],
        budget: "",
        message: "",
        privacyAccepted: false,
      });
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-16 bg-background overflow-x-hidden w-full">
      <div className="container mx-auto px-4 sm:px-6 max-w-xl md:max-w-4xl">
        <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-lg">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold mb-4">Kontakt</h2>
            <p className="text-muted-foreground">Lassen Sie uns über Ihre Kollektion sprechen.</p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-bold mb-2">Vielen Dank!</h3>
              <p className="text-muted-foreground">Wir werden uns in Kürze bei Ihnen melden.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Unternehmen */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full p-3 rounded-xl bg-background border transition-all",
                      "focus:ring-2 focus:ring-mik-blue outline-none",
                      errors.name ? "border-red-400" : "border-input"
                    )}
                    placeholder="Max Mustermann"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-2.5 h-2.5" />
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">
                    Unternehmen <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full p-3 rounded-xl bg-background border transition-all",
                      "focus:ring-2 focus:ring-mik-blue outline-none",
                      errors.company ? "border-red-400" : "border-input"
                    )}
                    placeholder="Firma GmbH"
                  />
                  {errors.company && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-2.5 h-2.5" />
                      {errors.company}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full p-3 rounded-xl bg-background border transition-all",
                    "focus:ring-2 focus:ring-mik-blue outline-none",
                    errors.email ? "border-red-400" : "border-input"
                  )}
                  placeholder="max@firma.de"
                />
                {errors.email && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-2.5 h-2.5" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Branche */}
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">
                  Branche <span className="text-red-400">*</span>
                </label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full p-3 rounded-xl bg-background border transition-all",
                    "focus:ring-2 focus:ring-mik-blue outline-none",
                    errors.branch ? "border-red-400" : "border-input"
                  )}
                >
                  <option value="">Bitte wählen...</option>
                  {BRANCH_DATA.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.title}
                    </option>
                  ))}
                  <option value="other">Sonstiges</option>
                </select>
                {errors.branch && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-2.5 h-2.5" />
                    {errors.branch}
                  </p>
                )}
              </div>

              {/* Produkte */}
              {availableProducts.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-bold ml-1">
                    Produkte <span className="text-red-400">*</span>
                    <span className="text-xs text-muted-foreground font-normal ml-2">
                      (Mehrfachauswahl möglich)
                    </span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {availableProducts.map((product) => (
                      <button
                        key={product}
                        type="button"
                        onClick={() => handleProductToggle(product)}
                        className={cn(
                          "p-2 rounded-xl border text-left transition-all",
                          "hover:border-mik-blue/50",
                          formData.products.includes(product)
                            ? "bg-mik-blue/10 border-mik-blue text-mik-blue"
                            : "bg-background border-input text-foreground"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={cn(
                              "w-3.5 h-3.5 rounded border-2 flex items-center justify-center",
                              formData.products.includes(product)
                                ? "bg-mik-blue border-mik-blue"
                                : "border-input"
                            )}
                          >
                            {formData.products.includes(product) && (
                              <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                            )}
                          </div>
                          <span className="text-xs">{product}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.products && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-2.5 h-2.5" />
                      {errors.products}
                    </p>
                  )}
                </div>
              )}

              {/* Budget */}
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">
                  Budget <span className="text-red-400">*</span>
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className={cn(
                    "w-full p-3 rounded-xl bg-background border transition-all",
                    "focus:ring-2 focus:ring-mik-blue outline-none",
                    errors.budget ? "border-red-400" : "border-input"
                  )}
                >
                  <option value="">Bitte wählen...</option>
                  {BUDGET_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.budget && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-2.5 h-2.5" />
                    {errors.budget}
                  </p>
                )}
              </div>

              {/* Nachricht */}
              <div className="space-y-2">
                <label className="text-sm font-bold ml-1">Nachricht</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-3 rounded-xl bg-background border border-input focus:ring-2 focus:ring-mik-blue outline-none transition-all resize-none"
                  placeholder="Wie können wir helfen?"
                />
              </div>

              {/* Datenschutz */}
              <div className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.privacyAccepted}
                    onChange={handlePrivacyChange}
                    className={cn(
                      "mt-1 w-4 h-4 rounded border-2",
                      "bg-background border-input",
                      "focus:ring-2 focus:ring-mik-blue/50",
                      "checked:bg-mik-blue checked:border-mik-blue",
                      "transition-all cursor-pointer",
                      errors.privacyAccepted ? "border-red-400" : ""
                    )}
                  />
                  <span className="text-xs text-foreground flex-1">
                    Ich akzeptiere die{" "}
                    <a
                      href="#"
                      className="text-mik-blue hover:underline"
                      onClick={(e) => e.preventDefault()}
                    >
                      Datenschutzbestimmungen
                    </a>
                    <span className="text-red-400"> *</span>
                  </span>
                </label>
                {errors.privacyAccepted && (
                  <p className="text-xs text-red-400 flex items-center gap-1 ml-7">
                    <AlertCircle className="w-2.5 h-2.5" />
                    {errors.privacyAccepted}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-mik-navy text-white hover:bg-mik-blue h-12 text-base font-heading disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Wird gesendet..." : "Anfrage senden"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
