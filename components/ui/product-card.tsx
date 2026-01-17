"use client";

import { cn } from "@/lib/utils";
import { Product, BADGE_CONFIG, BadgeType } from "./product-data";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  // State für Fallback, falls Bild nicht lädt
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
  // State für aktuelle Bildindex (für Galerie)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // Swipe Direction für Animation
  const [direction, setDirection] = useState(0);

  // Alle Bilder (images Array oder nur das Hauptbild)
  const allImages = product.images && product.images.length > 0 
    ? product.images 
    : [product.image];
  
  const hasMultipleImages = allImages.length > 1;

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  };

  const goToNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  }, [allImages.length]);

  const goToPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  }, [allImages.length]);

  // Swipe-Handler
  const handleDragEnd = useCallback(
    (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = 50;
      if (info.offset.x > threshold) {
        goToPrev();
      } else if (info.offset.x < -threshold) {
        goToNext();
      }
    },
    [goToNext, goToPrev]
  );

  // Slide Animation Variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

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
        
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {!imageErrors.has(currentImageIndex) ? (
            <motion.div
              key={currentImageIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag={hasMultipleImages ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="absolute inset-0"
            >
              <Image 
                src={allImages[currentImageIndex]} 
                alt={`${product.name} - Bild ${currentImageIndex + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => handleImageError(currentImageIndex)}
              />
            </motion.div>
          ) : (
            // Fallback Placeholder
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
        </AnimatePresence>

        {/* Navigation Arrows (nur bei mehreren Bildern) */}
        {hasMultipleImages && (
          <>
            <button
              onClick={goToPrev}
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2 z-10",
                "w-8 h-8 rounded-full flex items-center justify-center",
                "bg-black/40 backdrop-blur-sm border border-white/20",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                "hover:bg-black/60 hover:border-white/40"
              )}
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={goToNext}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 z-10",
                "w-8 h-8 rounded-full flex items-center justify-center",
                "bg-black/40 backdrop-blur-sm border border-white/20",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                "hover:bg-black/60 hover:border-white/40"
              )}
              aria-label="Nächstes Bild"
            >
              <ChevronRight className="w-4 h-4 text-white" />
            </button>
          </>
        )}

        {/* Dot Indicators (nur bei mehreren Bildern) */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setDirection(index > currentImageIndex ? 1 : -1);
                  setCurrentImageIndex(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentImageIndex
                    ? "bg-white w-4"
                    : "bg-white/40 hover:bg-white/60"
                )}
                aria-label={`Bild ${index + 1} anzeigen`}
              />
            ))}
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
        <p className="text-xs text-mik-grey/80 font-sans mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Badges */}
        {product.badges && product.badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.badges.map((badge, index) => {
              const config = BADGE_CONFIG[badge];
              return (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
                  style={{ 
                    backgroundColor: `${config.color}20`,
                    color: config.color,
                    border: `1px solid ${config.color}40`
                  }}
                  title={config.label}
                >
                  <span className="text-[9px]">{config.icon}</span>
                  {config.label}
                </motion.span>
              );
            })}
          </div>
        )}

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