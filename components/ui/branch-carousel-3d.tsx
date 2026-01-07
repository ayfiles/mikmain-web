"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react"; // FIX: Import von motion/react
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BranchItem } from "./infinite-branch-cards";

interface BranchCarousel3DProps {
  items: BranchItem[];
  onCardClick?: (item: BranchItem) => void;
  className?: string;
}

type CardPosition = "left" | "center" | "right" | "hidden";

export function BranchCarousel3D({
  items,
  onCardClick,
  className,
}: BranchCarousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const startXRef = useRef<number>(0);
  
  // FIX: Typ auf 'number | null' geändert für Browser-Kompatibilität
  const autoPlayIntervalRef = useRef<number | null>(null);

  // Auto-Play Logic (15 Sekunden, pausiert bei Hover)
  useEffect(() => {
    if (isHovered || isDragging) {
      if (autoPlayIntervalRef.current) {
        window.clearInterval(autoPlayIntervalRef.current);
        autoPlayIntervalRef.current = null;
      }
      return;
    }

    // FIX: window.setInterval erzwingt die Rückgabe einer 'number' (statt NodeJS.Timeout)
    autoPlayIntervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 15000);

    return () => {
      if (autoPlayIntervalRef.current) {
        window.clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isHovered, isDragging, items.length]);

  // Navigation Functions mit Endless Looping
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Touch Events
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    const threshold = 50;

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }

    setIsDragging(false);
    setDragOffset(0);
  };

  // Mouse Events
  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const diff = currentX - startXRef.current;
      setDragOffset(diff);
    };

    const handleMouseUp = () => {
      const threshold = 50;

      if (Math.abs(dragOffset) > threshold) {
        if (dragOffset > 0) {
          goToPrevious();
        } else {
          goToNext();
        }
      }

      setIsDragging(false);
      setDragOffset(0);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset, goToNext, goToPrevious]);

  // Get Card Position basierend auf Index
  const getCardPosition = (index: number): CardPosition => {
    const leftIndex = (currentIndex - 1 + items.length) % items.length;
    const rightIndex = (currentIndex + 1) % items.length;

    if (index === currentIndex) return "center";
    if (index === leftIndex) return "left";
    if (index === rightIndex) return "right";
    return "hidden";
  };

  // Get Transform Styles für 3D-Effekt
  const getCardStyle = (position: CardPosition) => {
    const baseTransform = dragOffset;

    switch (position) {
      case "center":
        return {
          scale: 1,
          x: baseTransform,
          opacity: 1,
        };
      case "left":
        return {
          scale: 0.8,
          x: -200 + baseTransform * 0.5,
          opacity: 0.6,
        };
      case "right":
        return {
          scale: 0.8,
          x: 200 + baseTransform * 0.5,
          opacity: 0.6,
        };
      case "hidden":
        return {
          scale: 0.5,
          x: 0,
          opacity: 0,
        };
    }
  };

  return (
    <div
      className={cn("relative w-full", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      {/* 3D Container mit Perspective */}
      <div
        className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {items.map((item, index) => {
            const position = getCardPosition(index);
            const style = getCardStyle(position);

            if (position === "hidden") return null;

            return (
              <motion.div
                key={`${item.id}-${currentIndex}-${index}`}
                initial={{
                  scale: position === "center" ? 0.9 : style.scale,
                  x: position === "center" ? style.x * 1.2 : style.x,
                  opacity: position === "center" ? 0.8 : style.opacity,
                }}
                animate={{
                  scale: style.scale,
                  x: style.x,
                  opacity: style.opacity,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translateZ(${position === "center" ? 0 : position === "left" ? -100 : position === "right" ? -100 : -200}px)`,
                }}
                transition={{
                  duration: isDragging ? 0.1 : 0.8,
                  ease: [0.16, 1, 0.3, 1], // Custom easing für smooth Animation
                  opacity: {
                    duration: isDragging ? 0.1 : 0.6,
                  },
                }}
                className={cn(
                  "absolute cursor-pointer",
                  position === "center" && "z-30",
                  position === "left" && "z-20",
                  position === "right" && "z-20"
                )}
                onClick={() => {
                  if (!isDragging && position === "center") {
                    onCardClick?.(item);
                  }
                }}
              >
                <BranchCard item={item} position={position} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls - Unterhalb des Carousels */}
      <div className="flex justify-center items-center gap-4 mt-8">
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-50"
          aria-label="Vorherige Card"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-8 bg-mik-blue"
                  : "bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Gehe zu Card ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-50"
          aria-label="Nächste Card"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
}

// Branch Card Component (wiederverwendet aus infinite-branch-cards.tsx)
function BranchCard({
  item,
  position,
}: {
  item: BranchItem;
  position: CardPosition;
}) {
  return (
    <div
      className={cn(
        "relative w-[280px] h-[320px] md:w-[320px] md:h-[380px] rounded-2xl overflow-hidden",
        "border border-white/10 bg-mik-navy/60 backdrop-blur-xl",
        "transition-all duration-300 ease-out",
        "[box-shadow:0_0_40px_-10px_rgba(59,130,246,0.15),inset_0_1px_0_0_rgba(255,255,255,0.05)]",
        position === "center" &&
          "scale-105 border-mik-blue/50 [box-shadow:0_0_60px_-10px_rgba(59,130,246,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)]"
      )}
    >
      {/* Background: Image or Gradient */}
      {item.backgroundImage ? (
        <>
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={item.backgroundImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          {/* Glassmorphism Overlay */}
          <div className="absolute inset-0 bg-mik-navy/60 backdrop-blur-[2px]" />
          {/* Gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-mik-navy/90 via-mik-navy/40 to-transparent" />
        </>
      ) : (
        /* Fallback: Gradient Background */
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-60",
            item.gradient
          )}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full p-6 flex flex-col justify-end">
        {/* Title & Description */}
        <div className="flex-1 flex flex-col justify-end">
          <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-1">
            {item.title}
          </h3>
          <p className="text-sm md:text-base text-mik-grey mb-3">
            {item.subtitle}
          </p>
          <p className="text-sm text-mik-grey/80 line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Bottom: Features Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {item.features.slice(0, 3).map((feature, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs rounded-full bg-white/5 text-mik-grey border border-white/10"
            >
              {feature}
            </span>
          ))}
          {item.features.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-full bg-mik-blue/20 text-mik-blue border border-mik-blue/30">
              +{item.features.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Hover Indicator */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-mik-blue via-mik-blue to-transparent",
          "transform origin-left transition-transform duration-300",
          position === "center" ? "scale-x-100" : "scale-x-0"
        )}
      />
    </div>
  );
}

export default BranchCarousel3D;