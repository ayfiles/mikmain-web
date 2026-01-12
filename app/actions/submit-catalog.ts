"use server";

import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// 1. Validierung
const CatalogSchema = z.object({
  name: z.string().min(2, "Name ist zu kurz"),
  email: z.string().email("Ungültige E-Mail Adresse"),
  company: z.string().min(2, "Unternehmen ist erforderlich"),
  phone: z.string().optional(),
  message: z.string().optional(),
  // Änderung: Wir erlauben explizit nullable oder behandeln es unten
  honeypot: z.string().optional(),
});

// Admin-Client für Datenbank & Storage
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function submitCatalogRequest(prevState: any, formData: FormData) {
  console.log("--- KATALOG ANFRAGE START ---");

  // 1. Daten extrahieren
  const file = formData.get("logo") as File | null;
  
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    // WICHTIGE ÄNDERUNG HIER:
    // Wenn formData.get() null zurückgibt (Feld fehlt), machen wir daraus undefined.
    // Das akzeptiert Zod dann problemlos.
    honeypot: formData.get("gh_check_cat")?.toString() || undefined, 
  };

  // 2. Security Check: Honeypot
  if (rawData.honeypot && rawData.honeypot !== "") {
    console.log("⛔ HONEYPOT DETECTED (Catalog)");
    return { success: true, message: "Anfrage gesendet!" };
  }

  // 3. Validierung der Text-Daten
  const validated = CatalogSchema.safeParse(rawData);
  
  if (!validated.success) {
    console.log("❌ Validierungs-Fehler:", validated.error.flatten().fieldErrors);
    return { success: false, errors: validated.error.flatten().fieldErrors };
  }

  let fileUrl = null;

  // 4. Datei-Upload (falls vorhanden)
  if (file && file.size > 0) {
    console.log("📂 Datei erkannt:", file.name, "Größe:", file.size);
    
    // Check: Ist es ein Bild?
    if (!file.type.startsWith("image/")) {
        return { success: false, message: "Bitte nur Bilder hochladen (JPG, PNG, SVG)." };
    }
    // Check: Größe (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        return { success: false, message: "Die Datei ist zu groß (Max 5MB)." };
    }

    // Dateiname sicher machen
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "_")}`;
    
    // Upload in Bucket 'request-uploads'
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("request-uploads")
      .upload(fileName, file, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) {
      console.error("🔥 Upload Fehler:", uploadError);
      return { success: false, message: "Fehler beim Bildupload." };
    }

    // Pfad speichern
    fileUrl = fileName; 
    console.log("✅ Upload erfolgreich:", fileUrl);
  }

  // 5. Datenbank Eintrag
  const { error: dbError } = await supabase
    .from("catalog_requests")
    .insert({
      name: validated.data.name,
      email: validated.data.email,
      company: validated.data.company,
      phone: validated.data.phone,
      message: validated.data.message,
      file_url: fileUrl,
      status: "new"
    });

  if (dbError) {
    console.error("🔥 DB Fehler:", dbError);
    return { success: false, message: "Datenbank Fehler." };
  }

  console.log("✅ KATALOG ANFRAGE ERFOLGREICH GESPEICHERT");
  return { success: true, message: "Anfrage erfolgreich gesendet!" };
}