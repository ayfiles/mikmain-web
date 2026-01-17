"use client";

import { cn } from "@/lib/utils";
import { Customer } from "./customer-data";
import Image from "next/image";

interface CustomerCardProps {
  customer: Customer;
  onClick?: () => void; // Optional gemacht, da wir es vorerst deaktivieren
  className?: string;
}

export function CustomerCard({ customer, onClick, className }: CustomerCardProps) {
  return (
    <div
      // onClick={onClick} <--- HIER DEAKTIVIERT (Kommentar entfernen, um Klick wieder zu aktivieren)
      className={cn(
        "relative w-full aspect-[4/3] rounded-2xl overflow-hidden", // 'cursor-pointer' entfernt
        "border-2 border-white/30 bg-mik-navy/60 backdrop-blur-xl",
        "transition-all duration-300 ease-out",
        // Der Schatten-Effekt bleibt für die Optik, wirkt aber dezenter
        "[box-shadow:0_0_40px_-10px_rgba(59,130,246,0.15),inset_0_1px_0_0_rgba(255,255,255,0.15),inset_0_0_0_1px_rgba(255,255,255,0.1)]",
        "hover:border-mik-blue/60",
        "hover:[box-shadow:0_0_60px_-10px_rgba(59,130,246,0.3),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.15)]",
        className
      )}
    >
      {/* Video Cover Logic (Bleibt aktiv!) */}
      {customer.coverVideo ? (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={customer.coverVideo} />
          </video>
          {/* Overlay für bessere Lesbarkeit */}
          <div className="absolute inset-0 bg-mik-navy/10" />
          {/* Verlauf für bessere Lesbarkeit des Textes */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </>
      ) : (
        /* Fallback Hintergrund, falls kein Video da ist */
        <div className="absolute inset-0 bg-gradient-to-br from-mik-blue/10 via-transparent to-mik-blue/5" />
      )}
      
      {/* Inhalt (Text & Logo) */}
      <div className="relative z-10 h-full flex flex-col items-start justify-end p-6 md:p-8 pointer-events-none">
        {/* Logo */}
        <div className="relative mb-4 h-20 md:h-24 w-40">
          <Image
            src={customer.logo}
            alt={customer.name}
            fill
            className="object-contain object-left opacity-90 transition-all duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        
        {/* Name */}
        <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
          {customer.name}
        </h3>
        
        {/* Branche */}
        {customer.industry && (
          <p className="text-base md:text-lg text-mik-grey drop-shadow-md">
            {customer.industry}
          </p>
        )}
      </div>
      
      {/* Dekorativer Hover-Strich (Bleibt als optisches Highlight) */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-mik-blue to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

export default CustomerCard;