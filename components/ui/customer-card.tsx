"use client";

import { cn } from "@/lib/utils";
import { Customer } from "./customer-data";

interface CustomerCardProps {
  customer: Customer;
  onClick: () => void;
  className?: string;
}

export function CustomerCard({ customer, onClick, className }: CustomerCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer",
        "border-2 border-white/30 bg-mik-navy/60 backdrop-blur-xl",
        "transition-all duration-300 ease-out",
        "[box-shadow:0_0_40px_-10px_rgba(59,130,246,0.15),inset_0_1px_0_0_rgba(255,255,255,0.15),inset_0_0_0_1px_rgba(255,255,255,0.1)]",
        "hover:scale-[1.02] hover:border-mik-blue/60",
        "hover:[box-shadow:0_0_60px_-10px_rgba(59,130,246,0.3),inset_0_1px_0_0_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.15)]",
        className
      )}
    >
      {/* Video Cover */}
      {customer.coverVideo ? (
        <>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover blur-sm"
          >
            <source src={customer.coverVideo} type="video/mp4" />
          </video>
          {/* Glass Effect Overlay */}
          <div className="absolute inset-0 bg-mik-navy/20 backdrop-blur-[2px]" />
          {/* Overlay für bessere Lesbarkeit - stärker am unteren Rand */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </>
      ) : (
        /* Background Gradient */
        <div className="absolute inset-0 bg-gradient-to-br from-mik-blue/10 via-transparent to-mik-blue/5" />
      )}
      
      {/* Content - Linksbündig am unteren linken Rand */}
      <div className="relative z-10 h-full flex flex-col items-start justify-end p-6 md:p-8">
        {/* Logo */}
        <div className="mb-4">
          <img
            src={customer.logo}
            alt={customer.name}
            className="h-20 md:h-24 w-auto object-contain opacity-90 grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
        
        {/* Name */}
        <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
          {customer.name}
        </h3>
        
        {/* Industry */}
        {customer.industry && (
          <p className="text-base md:text-lg text-mik-grey drop-shadow-md">
            {customer.industry}
          </p>
        )}
      </div>
      
      {/* Hover Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-mik-blue to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

export default CustomerCard;

