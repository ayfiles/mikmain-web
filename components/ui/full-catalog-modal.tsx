"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { ProductCard } from "./product-card";
import { PRODUCTS } from "./product-data";

interface FullCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullCatalogModal({ isOpen, onClose }: FullCatalogModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  // State für die Ansicht: false = 1 Spalte (Liste), true = 2 Spalten (Grid)
  const [isCompact, setIsCompact] = useState(false);

  // Scroll-Position speichern
  const scrollYRef = useRef<number>(0);

  useOutsideClick(modalRef, () => {
    if (isOpen) onClose();
  });

  // Scroll-Lock für Hintergrund
  useEffect(() => {
    if (isOpen) {
      // Aktuelle Scroll-Position speichern
      scrollYRef.current = window.scrollY;
      
      // Scroll-Lock: Body und HTML blockieren
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
      document.documentElement.style.overflow = "hidden";
    } else {
      // Styles zurücksetzen
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.documentElement.style.overflow = "";
      
      // Scroll-Position wiederherstellen (nur wenn eine gespeichert wurde)
      if (scrollYRef.current > 0) {
        window.scrollTo(0, scrollYRef.current);
        scrollYRef.current = 0;
      }
    }
  }, [isOpen]);

  // ESC zum Schließen (separater Effect)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm touch-none"
            onWheel={(e) => e.stopPropagation()}
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
                "relative w-full max-w-full sm:max-w-3xl lg:max-w-5xl xl:max-w-7xl max-h-full sm:max-h-[90vh] overflow-hidden rounded-none sm:rounded-3xl",
                "bg-mik-navy/95 backdrop-blur-2xl border border-white/10",
                "[box-shadow:0_0_80px_-20px_rgba(59,130,246,0.3),inset_0_1px_0_0_rgba(255,255,255,0.05)]"
              )}
            >
              {/* Header */}
              <div className="relative h-24 sm:h-32 overflow-hidden bg-gradient-to-br from-mik-blue/20 via-mik-blue/10 to-transparent">
                <div className="absolute inset-0 opacity-30">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                      backgroundSize: "24px 24px",
                    }}
                  />
                </div>

                <div className="relative z-10 h-full flex items-center justify-between px-4 sm:px-6">
                  <div>
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-white mb-1">
                      Gesamtkatalog
                    </h2>
                    <p className="text-xs text-mik-grey">
                      Alle Produkte auf einen Blick
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* View Toggle Buttons */}
                    <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-1 border border-white/20">
                      <button
                        onClick={() => setIsCompact(false)}
                        className={cn(
                          "p-1.5 rounded-md transition-all",
                          !isCompact 
                            ? "bg-white/20 text-white shadow-sm" 
                            : "text-white/60 hover:text-white hover:bg-white/10"
                        )}
                        aria-label="Listenansicht (1 Spalte)"
                        title="1 Spalte"
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setIsCompact(true)}
                        className={cn(
                          "p-1.5 rounded-md transition-all",
                          isCompact 
                            ? "bg-white/20 text-white shadow-sm" 
                            : "text-white/60 hover:text-white hover:bg-white/10"
                        )}
                        aria-label="Rasteransicht (2 Spalten)"
                        title="2 Spalten"
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={onClose}
                      className={cn(
                        "p-2 rounded-full",
                        "bg-white/10 backdrop-blur-sm border border-white/20",
                        "hover:bg-white/20 transition-colors"
                      )}
                      aria-label="Modal schließen"
                    >
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content - Scrollable Grid */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-6rem)] sm:max-h-[calc(90vh-8rem)] overscroll-contain">
                <div 
                  className={cn(
                    "grid gap-4 transition-all duration-300",
                    // Hier wird die Basis-Spaltenanzahl (für Mobile) gesteuert:
                    isCompact ? "grid-cols-2" : "grid-cols-1",
                    // Responsive Breakpoints bleiben erhalten:
                    "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                  )}
                >
                  {PRODUCTS.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default FullCatalogModal;