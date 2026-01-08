"use client";
import { motion, Variants } from 'motion/react';
import React from 'react';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  onAnimationComplete?: () => void;
}

export const BlurText = ({ text, delay = 200, className = '' }: BlurTextProps) => {
  const words = text.split(' ');

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      filter: 'blur(20px)',
      y: 20,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="relative inline-block">
      {/* SEO & Accessibility: Der volle Text für Screenreader und Bots */}
      <span className="sr-only">{text}</span>
      
      {/* Visuelle Animation */}
      <motion.div
        className={`flex flex-wrap gap-x-4 gap-y-2 justify-start ${className}`}
        variants={container}
        initial="hidden"
        animate="visible"
        aria-hidden="true" // Visuellen Teil vor Screenreadern verstecken, um Dopplung zu vermeiden
      >
        {words.map((word, index) => (
          <motion.span key={index} variants={child} className="inline-block">
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};