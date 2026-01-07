"use client";

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { useOutsideClick } from "@/hooks/use-outside-click"; 

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo?: string;
  logoAlt?: string;
  items: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = 'MikMain',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#ffffff',
  menuColor = '#0a192f',
  buttonBgColor = '#0a192f',
  buttonTextColor = '#ffffff'
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  
  // FIX: Typ auf HTMLAnchorElement geändert, da die Karten <a> Tags sind
  const cardsRef = useRef<HTMLAnchorElement[]>([]);
  
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const baseHeight = isMobile ? 60 : 120;
    
    // Für beide Fälle: Content sichtbar machen, Höhe messen, wieder verstecken
    const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
    if (contentEl) {
      const wasVisible = contentEl.style.visibility;
      const wasPointerEvents = contentEl.style.pointerEvents;
      const wasPosition = contentEl.style.position;
      const wasHeight = contentEl.style.height;

      contentEl.style.visibility = 'visible';
      contentEl.style.pointerEvents = 'auto';
      contentEl.style.position = 'static';
      contentEl.style.height = 'auto';
      contentEl.offsetHeight;

        const padding = 8;
      const contentHeight = contentEl.scrollHeight;

      contentEl.style.visibility = wasVisible;
      contentEl.style.pointerEvents = wasPointerEvents;
      contentEl.style.position = wasPosition;
      contentEl.style.height = wasHeight;

      return baseHeight + contentHeight + padding;
    }
    
    return isMobile ? 200 : 340; 
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
    const baseHeight = isMobile ? 60 : 120;

    gsap.set(navEl, { height: baseHeight, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.5,
      ease
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
        const tl = createTimeline();
        tlRef.current = tl;
    }, navRef);
    return () => ctx.revert();
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;
      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.to(navRef.current, { height: newHeight, duration: 0.2 });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play();
    } else {
      setIsHamburgerOpen(false);
      tl.reverse().then(() => setIsExpanded(false));
    }
  };

  // FIX: Typ auf HTMLAnchorElement geändert
  const setCardRef = (i: number) => (el: HTMLAnchorElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  // Click-Outside Handler
  useOutsideClick(navRef, () => {
    if (isExpanded) {
      const tl = tlRef.current;
      if (tl) {
        setIsHamburgerOpen(false);
        tl.reverse().then(() => setIsExpanded(false));
      }
    }
  });

  return (
    <div
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] z-[99] top-4 rounded-[40px] overflow-x-hidden ${className}`}
      style={{ maxWidth: 'min(95vw, 1200px)' }}
    >
      <nav
        ref={navRef}
        className={`card-nav block h-[60px] md:h-[120px] p-0 rounded-[40px] relative overflow-hidden overflow-x-hidden will-change-[height] backdrop-blur-xl border border-white/10 shadow-lg`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] md:h-[120px] flex items-center justify-between px-4 md:px-10 z-[2]">
          
          {/* MENU BUTTON (LINKS) */}
          <div
            className="cursor-pointer hover:opacity-70 transition-opacity touch-manipulation p-2 -ml-2"
            onClick={toggleMenu}
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            style={{ color: menuColor }} 
          >
            {isHamburgerOpen ? <X size={24} className="sm:w-7 sm:h-7 md:w-9 md:h-9" /> : <Menu size={24} className="sm:w-7 sm:h-7 md:w-9 md:h-9" />}
          </div>
          
          {/* LOGO (MITTE) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center font-heading font-bold text-xl sm:text-2xl md:text-4xl tracking-tighter text-mik-navy">
             {logo ? <img src={logo} alt={logoAlt} className="h-8 sm:h-10 md:h-14 w-auto" /> : <span>MikMain<span className="text-mik-red">.</span></span>}
          </div>

          {/* RECHTS: CTA & THEME TOGGLER */}
          <div className="flex items-center gap-3 md:gap-5">
             
             {/* Der neue Theme Toggler */}
             <div className="hidden md:block scale-100">
               <AnimatedThemeToggler />
             </div>

             <button
               type="button"
               className="hidden md:inline-flex rounded-full px-6 py-3 text-base font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transform duration-200"
               style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
             >
               Kontakt
             </button>
          </div>
          
          {/* Platzhalter Mobile */}
          <div className="md:hidden w-[24px]"></div>

        </div>

        {/* CONTENT */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[65px] md:top-[130px] bottom-0 px-4 md:px-10 py-1 flex flex-col md:flex-row items-center justify-center gap-[9px] z-[1] ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
        >
          {(items || []).map((item, idx) => {
            const firstLink = item.links?.[0];
            return (
              <a
                key={`${item.label}-${idx}`}
                href={firstLink?.href || '#'}
                onClick={() => setIsExpanded(false)}
                className="nav-card relative flex flex-col justify-between p-1 rounded-[12px] h-[45px] md:h-[90px] w-[calc(100%-32px)] md:w-[calc(18.75%-9px)] transition-all duration-300 ease-in-out hover:scale-110 backdrop-blur-xl border border-white/10 shadow-lg cursor-pointer"
                ref={setCardRef(idx)}
                style={{ 
                  backgroundColor: item.bgColor || 'rgba(10, 25, 47, 0.7)', 
                  color: item.textColor || '#F8FAFC',
                  textDecoration: 'none'
                }}
              >
                <div className="text-xs font-heading font-bold mb-0.5 opacity-90">
                  {item.label}
                </div>
                <div className="flex flex-col gap-0.5">
                  {firstLink && (
                    <div className="inline-flex items-center gap-1 text-[8px] font-medium opacity-70">
                      <ArrowUpRight size={8} />
                      {firstLink.label}
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;