"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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

              {/* Content - Scrollable Grid */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(100vh-6rem)] sm:max-h-[calc(90vh-8rem)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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

