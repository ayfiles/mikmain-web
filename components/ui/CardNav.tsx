"use client";

import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, Menu, X } from 'lucide-react';

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
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const BASE_HEIGHT = 80; 

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 300;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
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

        const padding = 20; 
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return BASE_HEIGHT + contentHeight + padding;
      }
    }
    return 320; 
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: BASE_HEIGHT, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 60, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.5,
      ease
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.2');

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

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[95%] max-w-[1000px] z-[99] top-8 rounded-[30px] ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav block h-[80px] p-0 rounded-[30px] relative overflow-hidden will-change-[height]`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[80px] flex items-center justify-between px-8 z-[2]">
          
          {/* MENU BUTTON (LINKS) */}
          <div
            // HIER GEÄNDERT: 'text-mik-navy' entfernt, dafür style={{ color: menuColor }} eingefügt
            className="cursor-pointer hover:opacity-70 transition-opacity"
            onClick={toggleMenu}
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            style={{ color: menuColor }} 
          >
            {isHamburgerOpen ? <X size={32} /> : <Menu size={32} />}
          </div>
          
          {/* LOGO (MITTE) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center font-heading font-bold text-3xl tracking-tighter text-mik-navy">
             {logo ? <img src={logo} alt={logoAlt} className="h-10 w-auto" /> : <span>MikMain<span className="text-mik-red">.</span></span>}
          </div>

          {/* CTA BUTTON (RECHTS) */}
          <button
            type="button"
            // HIER GEÄNDERT: Farben werden jetzt über Props gesteuert
            className="hidden md:inline-flex rounded-full px-8 py-3 text-base font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Kontakt aufnehmen
          </button>
          
          <div className="md:hidden w-[32px]"></div>

        </div>

        {/* CONTENT */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[90px] bottom-0 p-4 flex flex-col md:flex-row items-stretch gap-4 z-[1] ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card relative flex flex-col justify-between p-8 rounded-[24px] flex-1 min-h-[200px] transition-transform hover:scale-[1.02]"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="text-3xl font-heading font-bold mb-6 opacity-90">
                {item.label}
              </div>
              <div className="flex flex-col gap-3">
                {item.links?.map((lnk, i) => (
                  <a
                    key={`${lnk.label}-${i}`}
                    className="inline-flex items-center gap-3 text-lg font-medium opacity-70 hover:opacity-100 transition-opacity"
                    href={lnk.href}
                  >
                    <ArrowUpRight size={20} />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;