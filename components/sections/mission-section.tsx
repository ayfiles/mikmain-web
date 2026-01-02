"use client";

import { motion, useInView, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Scissors, Smartphone, Truck } from "lucide-react";

export function MissionSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax: Der gesamte Karten-Block bewegt sich sanft
  const yCards = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const smoothYCards = useSpring(yCards, { stiffness: 100, damping: 20 });

  const words = "Corporate Fashion war gestern. Wir managen den gesamten Lebenszyklus Ihrer Unternehmenskleidung. Von der Manufaktur-Qualität bis zur Wäschelogistik.";
  const wordsArray = words.split(" ");

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full py-32 bg-[#0a192f] text-white overflow-hidden min-h-[70vh] flex items-center"
    >
      
      {/* Ambient Light Hintergrund (Subtil) */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* CONTAINER: Flexbox statt Grid für besseren Fluss */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-10 relative z-10 flex flex-col lg:flex-row items-center gap-8 xl:gap-16">
        
        {/* --- LINKS: TEXT CONTENT --- 
            flex-1: Nimmt allen Platz, den er kriegen kann (bis zu den Cards).
            min-w-0: Verhindert Flexbox-Overflow-Probleme.
        */}
        <div className="flex-1 min-w-0 flex flex-col items-start text-left">
          
          {/* Label */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-8"
          >
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-widest uppercase text-white/60 backdrop-blur-md">
              The MikMain Standard
            </span>
          </motion.div>

          {/* Headline 
             Wir entfernen max-w, damit der Text bis an die Karten fließen kann.
          */}
          <div ref={textRef} className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-left">
            {wordsArray.map((word, idx) => {
              return (
                <motion.span
                  key={idx}
                  className="inline-block mr-2 md:mr-3"
                  initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                  animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + idx * 0.05,
                    ease: "easeOut",
                  }}
                >
                  {word.includes("gestern") || word.includes("Lebenszyklus") ? (
                      <span className="text-[#991b1b] drop-shadow-lg">{word}</span>
                  ) : (
                      word
                  )}
                </motion.span>
              );
            })}
          </div>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-10 text-white/50 text-lg md:text-xl font-sans"
          >
            Kein Merch. Keine Kompromisse. <br className="hidden md:block"/>
            Echte Mode für echte Profis.
          </motion.p>
        </div>


        {/* --- RECHTS: KARTEN BLOCK --- 
            shrink-0: Verhindert, dass die Karten gequetscht werden.
            hidden lg:flex: Auf Mobile ausblenden (Text steht im Fokus).
        */}
        <motion.div 
            style={{ y: smoothYCards }}
            className="hidden lg:flex flex-none flex-row gap-5 items-center justify-center perspective-1000 shrink-0"
        >
            
            {/* Card 1: Manufaktur */}
            <div className="w-48 h-64 flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl hover:bg-white/10 transition-all hover:-translate-y-2 group">
                <div className="p-4 rounded-full bg-white/10 mb-2 group-hover:scale-110 transition-transform">
                    <Scissors className="w-8 h-8 text-white/80" />
                </div>
                <div className="text-sm font-bold text-white/80 tracking-wide uppercase">Atelier</div>
                <div className="w-16 h-1 bg-white/10 rounded-full" />
                <div className="w-8 h-1 bg-white/10 rounded-full" />
            </div>

            {/* Card 2: Plattform (Hervorgehoben) */}
            <div className="w-48 h-64 flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/20 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md shadow-2xl relative hover:-translate-y-2 transition-all z-10">
                <div className="absolute top-4 right-4 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
                <div className="p-4 rounded-full bg-mik-red/20 mb-2">
                    <Smartphone className="w-8 h-8 text-mik-red" />
                </div>
                <div className="text-sm font-bold text-white tracking-wide uppercase">Digital</div>
                 <div className="w-full px-6 flex justify-center">
                    <div className="w-24 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="w-[60%] h-full bg-mik-red" />
                    </div>
                </div>
            </div>

            {/* Card 3: Logistik */}
            <div className="w-48 h-64 flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl hover:bg-white/10 transition-all hover:-translate-y-2 group">
                <div className="p-4 rounded-full bg-white/10 mb-2 group-hover:scale-110 transition-transform">
                    <Truck className="w-8 h-8 text-white/80" />
                </div>
                <div className="text-sm font-bold text-white/80 tracking-wide uppercase">Logistik</div>
                <div className="w-16 h-1 bg-white/10 rounded-full" />
            </div>

        </motion.div>

      </div>
    </section>
  );
}