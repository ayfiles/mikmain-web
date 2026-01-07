"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Customer } from "./customer-data";
import { CustomerCard } from "./customer-card";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomerCarouselProps {
  customers: Customer[];
  onCustomerClick: (customer: Customer) => void;
  className?: string;
}

export function CustomerCarousel({
  customers,
  onCustomerClick,
  className,
}: CustomerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-slide alle 10 Sekunden
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % customers.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [isPaused, customers.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setSwipeOffset(0);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % customers.length);
    setSwipeOffset(0);
  }, [customers.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + customers.length) % customers.length);
    setSwipeOffset(0);
  }, [customers.length]);

  // Touch Events
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    setIsDragging(true);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;
    setSwipeOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    const threshold = 50;
    
    if (Math.abs(swipeOffset) > threshold) {
      if (swipeOffset > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    } else {
      setSwipeOffset(0);
    }
    
    setIsDragging(false);
    setIsPaused(false);
  };

  // Mouse Events
  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    setIsDragging(true);
    setIsPaused(true);
  };


  // Global mouse events für Drag außerhalb des Elements
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const diff = currentX - startXRef.current;
      setSwipeOffset(diff);
    };

    const handleGlobalMouseUp = () => {
      const threshold = 50;
      
      if (Math.abs(swipeOffset) > threshold) {
        if (swipeOffset > 0) {
          goToPrevious();
        } else {
          goToNext();
        }
      } else {
        setSwipeOffset(0);
      }
      
      setIsDragging(false);
      setIsPaused(false);
    };

    document.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, swipeOffset, goToNext, goToPrevious]);

  const currentCustomer = customers[currentIndex];

  return (
    <div
      ref={carouselRef}
      className={cn("relative w-full", className)}
      onMouseEnter={() => !isDragging && setIsPaused(true)}
      onMouseLeave={() => !isDragging && setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
    >
      {/* Carousel Container */}
      <div className="relative w-full max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto overflow-x-hidden px-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ 
              opacity: 1, 
              x: swipeOffset,
            }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ 
              duration: isDragging ? 0 : 0.5, 
              ease: "easeInOut" 
            }}
            className="w-full"
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
          >
            <CustomerCard
              customer={currentCustomer}
              onClick={() => {
                if (!isDragging) {
                  onCustomerClick(currentCustomer);
                }
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={goToPrevious}
          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
          aria-label="Vorherige Referenz"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
        
        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-2">
          {customers.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "w-8 bg-mik-blue"
                  : "bg-white/20 hover:bg-white/40"
              )}
              aria-label={`Gehe zu Slide ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={goToNext}
          className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110"
          aria-label="Nächste Referenz"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
      </div>
    </div>
  );
}

export default CustomerCarousel;

