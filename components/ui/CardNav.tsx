"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation"; // <--- NEU: Für Seitenwechsel
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";

// Interfaces
interface NavLink {
  label: string;
  href: string;
  ariaLabel?: string;
}

interface NavItem {
  label: string;
  bgColor?: string;
  textColor?: string;
  links: NavLink[];
}

interface CardNavProps {
  items: NavItem[];
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
  className?: string;
  logo?: string;
  logoAlt?: string;
}

export default function CardNav({
  items,
  baseColor = "rgba(15, 23, 42, 0.6)",
  menuColor = "#F8FAFC",
  buttonBgColor = "#2563EB",
  buttonTextColor = "#F8FAFC",
  className,
  logo,
  logoAlt = "Logo",
}: CardNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // <--- NEU: Router initialisieren

  useOutsideClick(containerRef, () => {
    if (isOpen) setIsOpen(false);
  });

  const toggleMenu = () => setIsOpen(!isOpen);

  // Animationen
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: { duration: 0.2, ease: "easeInOut", when: "afterChildren" },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <nav
      ref={containerRef}
      className={cn(
        "fixed top-4 left-0 right-0 mx-auto z-50 w-[95%] max-w-[1200px] rounded-2xl border border-white/10 px-4 py-3 transition-all duration-300",
        "grid grid-cols-3 items-center", 
        className
      )}
      style={{ backgroundColor: baseColor }}
    >
      
      {/* 1. LINKS: Menü Toggle Button */}
      <div className="flex justify-start">
        <button
          onClick={toggleMenu}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"
          aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={20} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* 2. MITTE: Logo (Zentriert) */}
      <div className="flex justify-center">
        <Link href="/" className="relative block w-32 h-8 md:w-40 md:h-10">
          {logo ? (
            <Image 
              src={logo} 
              alt={logoAlt} 
              fill
              className="object-contain object-center"
              priority 
            />
          ) : (
            <span className="font-bold text-white text-xl">MikMain</span>
          )}
        </Link>
      </div>

      {/* 3. RECHTS: Kontakt Button */}
      <div className="flex justify-end">
        <Link href="#contact">
          <button
            className="px-5 py-2 rounded-xl text-sm font-bold font-heading transition-transform hover:scale-105 active:scale-95 shadow-lg"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Kontakt
          </button>
        </Link>
      </div>

      {/* Fullscreen / Dropdown Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-full left-0 right-0 mt-2 w-full p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 overflow-hidden bg-transparent"
          >
            {items.map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative flex flex-col justify-between p-6 rounded-xl min-h-[160px] overflow-hidden group hover:shadow-xl transition-shadow cursor-pointer"
                style={{ 
                  backgroundColor: item.bgColor || menuColor,
                  color: item.textColor || "#000"
                }}
                onClick={() => {
                   // Logik-Fix: Unterscheidung zwischen Anker (#) und Pfad (/)
                   if(item.links.length > 0) {
                     const link = item.links[0];
                     
                     if (link.href.startsWith("#")) {
                       // Scrollen (nur auf der Startseite möglich)
                       const element = document.querySelector(link.href);
                       if(element) element.scrollIntoView({ behavior: 'smooth' });
                     } else {
                       // Navigieren (z.B. nach /impressum)
                       router.push(link.href);
                     }
                     
                     setIsOpen(false);
                   }
                }}
              >
                <div>
                  <h3 className="text-xl font-bold font-heading mb-4">{item.label}</h3>
                  <div className="flex flex-col gap-2">
                    {item.links.map((link, lIdx) => (
                      <Link
                        key={lIdx}
                        href={link.href}
                        onClick={(e) => {
                          e.stopPropagation(); 
                          setIsOpen(false);
                        }}
                        className="text-sm font-medium opacity-80 hover:opacity-100 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                        aria-label={link.ariaLabel}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Decorative Icon */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}