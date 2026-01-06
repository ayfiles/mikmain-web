"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Customer } from "./customer-data";

interface CustomerModalProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerModal({ customer, isOpen, onClose }: CustomerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);

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

  // Reset asset index when customer changes
  useEffect(() => {
    if (customer) {
      setCurrentAssetIndex(0);
    }
  }, [customer]);

  if (!customer) return null;

  const allAssets = [
    ...customer.assets.images.map((img) => ({ type: "image" as const, src: img })),
    ...(customer.assets.videos || []).map((video) => ({ type: "video" as const, src: video })),
  ];

  const currentAsset = allAssets[currentAssetIndex];
  const hasMultipleAssets = allAssets.length > 1;

  const goToPrevious = () => {
    setCurrentAssetIndex((prev) => (prev - 1 + allAssets.length) % allAssets.length);
  };

  const goToNext = () => {
    setCurrentAssetIndex((prev) => (prev + 1) % allAssets.length);
  };

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
                "relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl",
                "bg-mik-navy/95 backdrop-blur-2xl border border-white/10",
                "[box-shadow:0_0_80px_-20px_rgba(59,130,246,0.3),inset_0_1px_0_0_rgba(255,255,255,0.05)]"
              )}
            >
              {/* Header */}
              <div className="relative h-32 overflow-hidden bg-gradient-to-br from-mik-blue/20 via-mik-blue/10 to-transparent">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                  }} />
                </div>

                <div className="relative z-10 h-full flex items-center justify-between px-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={customer.logo}
                      alt={customer.name}
                      className="h-12 w-auto opacity-90"
                    />
                    <div>
                      <h2 className="font-heading text-2xl font-bold text-white mb-1">
                        {customer.name}
                      </h2>
                      {customer.industry && (
                        <p className="text-sm text-mik-grey">
                          {customer.industry}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className={cn(
                      "p-2 rounded-full",
                      "bg-white/10 backdrop-blur-sm border border-white/20",
                      "hover:bg-white/20 transition-colors"
                    )}
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
                {/* Description */}
                {customer.description && (
                  <p className="text-mik-grey mb-6 leading-relaxed">
                    {customer.description}
                  </p>
                )}

                {/* Assets Gallery */}
                {allAssets.length > 0 ? (
                  <div className="relative">
                    {/* Asset Container */}
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10 mb-4">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentAssetIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="w-full h-full"
                        >
                          {currentAsset.type === "image" ? (
                            <img
                              src={currentAsset.src}
                              alt={`${customer.name} Asset ${currentAssetIndex + 1}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <video
                              src={currentAsset.src}
                              controls
                              className="w-full h-full object-cover"
                            >
                              Ihr Browser unterstützt das Video-Element nicht.
                            </video>
                          )}
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation Arrows */}
                      {hasMultipleAssets && (
                        <>
                          <button
                            onClick={goToPrevious}
                            className={cn(
                              "absolute left-4 top-1/2 -translate-y-1/2",
                              "p-2 rounded-full bg-black/50 backdrop-blur-sm",
                              "hover:bg-black/70 transition-colors",
                              "text-white"
                            )}
                            aria-label="Vorheriges Asset"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={goToNext}
                            className={cn(
                              "absolute right-4 top-1/2 -translate-y-1/2",
                              "p-2 rounded-full bg-black/50 backdrop-blur-sm",
                              "hover:bg-black/70 transition-colors",
                              "text-white"
                            )}
                            aria-label="Nächstes Asset"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Asset Thumbnails */}
                    {hasMultipleAssets && (
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {allAssets.map((asset, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentAssetIndex(index)}
                            className={cn(
                              "flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden",
                              "border-2 transition-all",
                              index === currentAssetIndex
                                ? "border-mik-blue scale-105"
                                : "border-white/20 hover:border-white/40"
                            )}
                          >
                            {asset.type === "image" ? (
                              <img
                                src={asset.src}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-white/10 flex items-center justify-center">
                                <ChevronRight className="w-6 h-6 text-white" />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Asset Counter */}
                    {hasMultipleAssets && (
                      <p className="text-center text-sm text-mik-grey mt-2">
                        {currentAssetIndex + 1} / {allAssets.length}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="w-full aspect-video rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <p className="text-mik-grey">Keine Assets verfügbar</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CustomerModal;

