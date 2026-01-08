"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Instagram, ArrowUpRight } from "lucide-react";
import Link from "next/link"; // <--- Import hinzugefügt für besseres Routing

const FOOTER_LINKS = {
  company: [
    { label: "Über uns", href: "#" },
    { label: "Karriere", href: "#" },
    { label: "Partner werden", href: "#" },
  ],
  services: [
    { label: "Design", href: "#" },
    { label: "Produktion", href: "#" },
    { label: "Logistik", href: "#" },
    { label: "Wäscheservice", href: "#" },
  ],
  legal: [
    { label: "Impressum", href: "/impressum" }, // <--- HIER GEÄNDERT
    { label: "Datenschutz", href: "#" },
    { label: "AGB", href: "#" },
  ],
};

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 bg-background overflow-x-hidden w-full">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-0" style={{ maxWidth: 'min(95vw, 1200px)' }}>
        
        {/* Main Footer Card - Navbar Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-[40px] backdrop-blur-xl border border-white/10 shadow-lg overflow-hidden"
          style={{ backgroundColor: "rgba(15, 23, 42, 0.6)" }}
        >
          
          {/* Top Section */}
          <div className="p-8 md:p-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              
              {/* Brand Column */}
              <div className="lg:col-span-1">
                <img 
                  src="/mikmain-primary-light.svg" 
                  alt="MikMain Logo" 
                  className="h-10 w-auto mb-4"
                />
                <p className="text-gray-400 font-sans text-sm leading-relaxed mb-6">
                  Ihr Concierge für Corporate Fashion. 
                  Von der Idee bis zum Wäscheservice – alles aus einer Hand.
                </p>
                
                {/* Social Links */}
                <div className="flex gap-4">
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={18} />
                  </a>
                </div>
              </div>

              {/* Links Columns */}
              <div>
                <h4 className="font-heading font-bold text-white text-base mb-4">Unternehmen</h4>
                <ul className="space-y-3">
                  {FOOTER_LINKS.company.map((link, idx) => (
                    <li key={idx}>
                      <a 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                      >
                        {link.label}
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-heading font-bold text-white text-base mb-4">Services</h4>
                <ul className="space-y-2">
                  {FOOTER_LINKS.services.map((link, idx) => (
                    <li key={idx}>
                      <a 
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                      >
                        {link.label}
                        <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Column */}
              <div>
                <h4 className="font-heading font-bold text-white text-base mb-4">Kontakt</h4>
                <ul className="space-y-4">
                  <li>
                    <a 
                      href="mailto:info@mikmain.de"
                      className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-mik-red/20 flex items-center justify-center text-mik-red">
                        <Mail size={18} />
                      </div>
                      info@mikmain.de
                    </a>
                  </li>
                  <li>
                    <a 
                      href="tel:+49123456789"
                      className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-full bg-mik-blue/20 flex items-center justify-center text-mik-blue">
                        <Phone size={18} />
                      </div>
                      +49 123 456 789
                    </a>
                  </li>
                  <li>
                    <div className="text-gray-400 inline-flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0">
                        <MapPin size={18} />
                      </div>
                      <span>
                        Musterstraße 123<br />
                        12345 Musterstadt
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 px-8 md:px-10 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-xs">
                © {currentYear} MikMain. Alle Rechte vorbehalten.
              </p>
              <div className="flex gap-4">
                {FOOTER_LINKS.legal.map((link, idx) => (
                  <Link 
                    key={idx}
                    href={link.href}
                    className="text-gray-500 hover:text-white text-xs transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </motion.div>

        {/* Bottom Spacing */}
        <div className="h-4" />
        
      </div>
    </footer>
  );
}