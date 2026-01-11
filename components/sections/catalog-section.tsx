"use client";

import { useActionState } from "react";
// Importiere den Typ mit
import { submitContactForm, ContactFormState } from "@/app/actions/submit-contact"; 
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

// Typisierung hinzufügen und errors initial auf undefined oder leeres Objekt setzen
const initialState: ContactFormState = {
  success: false,
  message: "",
  errors: {} 
};

export function ContactSection() {
  // Der Rest bleibt gleich...
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  
  // ... (dein restlicher Code)
}