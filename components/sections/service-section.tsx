"use client";

import { motion } from "framer-motion";
import { Truck, Shirt, RefreshCw, Sparkles, MapPin } from "lucide-react";

export function ServiceSection() {
  return (
    <section className="w-full py-32 bg-white text-[#0a192f] relative overflow-hidden">
      
      {/* Background Decor: Weltkarte/Logistiknetz abstrakt */}
      <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
         <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] border-[40px] border-[#991b1b] rounded-full opacity-20 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-10 relative z-10">
        
        {/* 1. Header Area */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#991b1b]/5 text-[#991b1b] text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3 h-3" />
            <span>Concierge Service</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6"
          >
            Wir kümmern uns um <br />
            <span className="text-[#991b1b]">den Rest.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600"
          >
            Von der Wäschepflege bis zum Schrankfach-Service. 
            MikMain sorgt dafür, dass Ihr Team jeden Tag perfekt aussieht – ohne Aufwand für Sie.
          </motion.p>
        </div>

        {/* 2. The Logistics Connector (Animation) */}
        <div className="relative w-full max-w-5xl mx-auto h-[150px] hidden md:flex items-center justify-between mb-24">
            
            {/* Verbindungslinie */}
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-100 -translate-y-1/2 overflow-hidden">
                {/* Das "Paket" das hin und her fährt */}
                <motion.div 
                    className="w-[20%] h-full bg-gradient-to-r from-transparent via-[#991b1b] to-transparent"
                    animate={{ x: ["-100%", "500%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                />
            </div>

            {/* Station 1: Kunde */}
            <div className="relative z-10 flex flex-col items-center gap-4 bg-white p-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                    <MapPin className="w-8 h-8 text-[#0a192f]" />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Ihr Standort</span>
            </div>

            {/* Station 2: Logistik */}
            <div className="relative z-10 flex flex-col items-center gap-4 bg-white p-4">
                 <div className="w-20 h-20 rounded-full bg-[#991b1b] flex items-center justify-center shadow-[0_10px_30px_-10px_#991b1b]">
                    <Truck className="w-10 h-10 text-white" />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider text-[#991b1b]">24h Express</span>
            </div>

            {/* Station 3: MikMain */}
            <div className="relative z-10 flex flex-col items-center gap-4 bg-white p-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm">
                    <RefreshCw className="w-8 h-8 text-[#0a192f]" />
                </div>
                <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Care Center</span>
            </div>
        </div>

        {/* 3. Feature Cards (Mobile Friendly Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard 
                icon={Sparkles}
                title="Professionelle Reinigung"
                description="Hygienische Aufbereitung nach Industriestandards. Schonend für Gewebe und Farben."
                delay={0.3}
            />
            <ServiceCard 
                icon={Truck}
                title="Schrankfach-Logistik"
                description="Wir liefern direkt in die persönlichen Spinde Ihrer Mitarbeiter. Frisch sortiert."
                delay={0.4}
            />
             <ServiceCard 
                icon={RefreshCw}
                title="Reparatur & Recycling"
                description="Defekte Reißverschlüsse reparieren wir sofort. Altkleider führen wir dem Kreislauf zurück."
                delay={0.5}
            />
        </div>

      </div>
    </section>
  );
}

function ServiceCard({ icon: Icon, title, description, delay }: any) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="flex flex-col items-start p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-[#991b1b]/20 hover:bg-red-50/30 transition-all group"
        >
            <div className="mb-6 p-4 rounded-2xl bg-white shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Icon className="w-8 h-8 text-[#0a192f] group-hover:text-[#991b1b] transition-colors" />
            </div>
            <h3 className="text-xl font-bold font-heading mb-3 text-[#0a192f]">{title}</h3>
            <p className="text-slate-500 leading-relaxed">
                {description}
            </p>
        </motion.div>
    )
}