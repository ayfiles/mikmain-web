"use client";

import { cn } from "@/lib/utils";
import { Product } from "./product-data";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  // State für Fallback, falls Bild nicht lädt
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className={cn(
        "relative group rounded-2xl overflow-hidden cursor-pointer",
        "bg-mik-navy/40 backdrop-blur-sm border border-white/10",
        "transition-all duration-300 ease-out",
        "[box-shadow:0_0_30px_-10px_rgba(59,130,246,0.1),inset_0_1px_0_0_rgba(255,255,255,0.1)]",
        "hover:scale-[1.02] hover:border-mik-blue/40",
        "hover:[box-shadow:0_0_50px_-10px_rgba(59,130,246,0.2),inset_0_1px_0_0_rgba(255,255,255,0.15)]",
        className
      )}
    >
      {/* Produktbild Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-gradient-to-br from-mik-navy/60 to-mik-navy/40">
        
        {!imageError ? (
          // Optimiertes Next.js Image
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        ) : (
          // Fallback Placeholder (wird nur angezeigt wenn Error true ist)
          <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: product.primaryColor }}
          >
            <div className="text-center p-6">
              <div 
                className="w-24 h-24 mx-auto rounded-lg mb-4 flex items-center justify-center"
                style={{ backgroundColor: product.primaryColor === "#ffffff" ? "#e5e7eb" : "rgba(255,255,255,0.1)" }}
              >
                <span className="text-3xl">👔</span>
              </div>
              <p className="text-white/80 text-sm font-sans">
                {product.name}
              </p>
            </div>
          </div>
        )}
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="p-4 bg-mik-navy/60 backdrop-blur-sm">
        {/* Produktname */}
        <h3 className="font-heading text-base font-bold text-white mb-1 line-clamp-1">
          {product.name}
        </h3>
        
        {/* Beschreibung */}
        <p className="text-xs text-mik-grey/80 font-sans mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Farbvarianten */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-mik-grey/60 font-sans mr-1">Farben:</span>
          <div className="flex items-center gap-2 flex-wrap">
            {product.colorVariants.map((variant, index) => (
              <motion.button
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05, type: "spring", stiffness: 200 }}
                className={cn(
                  "w-5 h-5 rounded-full border-2 transition-all duration-200",
                  "hover:scale-110 hover:border-white/40",
                  variant.hex === "#ffffff" 
                    ? "border-white/30" 
                    : "border-white/20"
                )}
                style={{ 
                  backgroundColor: variant.hex,
                  boxShadow: variant.hex === "#ffffff" 
                    ? "0 0 0 1px rgba(0,0,0,0.1) inset" 
                    : undefined
                }}
                title={variant.name}
                aria-label={`Farbe: ${variant.name}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-mik-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

export default ProductCard;