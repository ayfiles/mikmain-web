"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { BranchItem } from "./infinite-branch-cards";
import { Button } from "./button";

interface BranchModalProps {
  item: BranchItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BranchModal({ item, isOpen, onClose }: BranchModalProps) {
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

  if (!item) return null;

  const Icon = item.icon;

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
                "relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-3xl",
                "bg-mik-navy/95 backdrop-blur-2xl border border-white/10",
                "[box-shadow:0_0_80px_-20px_rgba(59,130,246,0.3),inset_0_1px_0_0_rgba(255,255,255,0.05)]"
              )}
            >
              {/* Header mit Gradient */}
              <div className={cn(
                "relative h-48 overflow-hidden",
                "bg-gradient-to-br",
                item.gradient
              )}>
                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                  }} />
                </div>
                
                {/* Icon groß */}
                <div className="absolute bottom-6 left-6">
                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className={cn(
                    "absolute top-4 right-4 p-2 rounded-full",
                    "bg-white/10 backdrop-blur-sm border border-white/20",
                    "hover:bg-white/20 transition-colors"
                  )}
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-12rem)]">
                {/* Title */}
                <div className="mb-6">
                  <h2 className="font-heading text-3xl font-bold text-white mb-1">
                    {item.title}
                  </h2>
                  <p className="text-mik-blue font-medium">
                    {item.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-mik-grey leading-relaxed mb-8">
                  {item.description}
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="font-heading text-lg font-bold text-white mb-4">
                    Unser Angebot
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {item.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl",
                          "bg-white/5 border border-white/10"
                        )}
                      >
                        <div className="p-1 rounded-full bg-mik-blue/20">
                          <Check className="w-4 h-4 text-mik-blue" />
                        </div>
                        <span className="text-sm text-white/90">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Placeholder Images */}
                <div className="mb-8">
                  <h3 className="font-heading text-lg font-bold text-white mb-4">
                    Impressionen
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className={cn(
                      "aspect-video rounded-xl overflow-hidden",
                      "bg-gradient-to-br",
                      item.gradient,
                      "border border-white/10"
                    )}>
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white/40 text-sm">Bild folgt</span>
                      </div>
                    </div>
                    <div className={cn(
                      "aspect-video rounded-xl overflow-hidden",
                      "bg-gradient-to-br",
                      item.gradient,
                      "border border-white/10"
                    )}>
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white/40 text-sm">Bild folgt</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-4">
                  <Button 
                    className="flex-1 bg-mik-blue hover:bg-blue-600 text-white font-heading font-bold h-12 rounded-xl"
                  >
                    Anfrage stellen
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10 font-heading font-bold h-12 rounded-xl"
                    onClick={onClose}
                  >
                    Schließen
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default BranchModal;

