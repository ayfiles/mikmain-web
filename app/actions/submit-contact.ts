"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(2, "Name ist zu kurz"),
  company: z.string().min(2, "Firmenname ist zu kurz"),
  email: z.string().email("Ungültige E-Mail Adresse"),
  industry: z.string().min(2, "Branche ist erforderlich"),
  budget: z.string().optional(),
  employees: z.string().optional(),
  message: z.string().min(10, "Nachricht muss mindestens 10 Zeichen lang sein"),
  honeypot: z.string().optional(),
});

// Check ob Keys da sind
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error("ACHTUNG: SUPABASE_SERVICE_ROLE_KEY fehlt!");
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function submitContactForm(prevState: any, formData: FormData) {
  console.log("--- NEUE ANFRAGE GESTARTET ---");
  
  const rawData = {
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    industry: formData.get("industry"),
    budget: formData.get("budget"),
    employees: formData.get("employees"),
    message: formData.get("message"),
    // WICHTIG: Hier haben wir den Namen geändert
    honeypot: formData.get("gh_check_88"), 
  };

  console.log("Empfangene Daten (Honeypot wert):", `'${rawData.honeypot}'`);

  // 1. Security Check: Honeypot
  if (rawData.honeypot && rawData.honeypot !== "") {
    console.log("⛔ HONEYPOT DETECTED! Speicherung abgebrochen (Bot-Schutz).");
    return { success: true, message: "Nachricht gesendet!" }; // Fake Success
  }

  // 2. Validierung
  const validated = ContactSchema.safeParse(rawData);
  
  if (!validated.success) {
    console.log("❌ Validierungs-Fehler:", validated.error.flatten().fieldErrors);
    return { 
      success: false, 
      errors: validated.error.flatten().fieldErrors 
    };
  }

  // 3. Speichern
  console.log("Versuche in Supabase zu speichern...");
  
  const { error } = await supabase
    .from("contact_requests")
    .insert({
      name: validated.data.name,
      company: validated.data.company,
      email: validated.data.email,
      industry: validated.data.industry,
      budget: validated.data.budget,
      employees: validated.data.employees,
      message: validated.data.message,
    });

  if (error) {
    console.error("🔥 SUPABASE ERROR:", error.message, error.details);
    return { success: false, message: "Fehler beim Speichern (siehe Server Logs)." };
  }

  console.log("✅ ERFOLG: Daten in Supabase gespeichert!");
  return { success: true, message: "Vielen Dank! Wir haben Ihre Anfrage erhalten." };
}