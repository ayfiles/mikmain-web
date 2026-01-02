"use client";

import { motion } from "framer-motion";
import { 
  Smartphone, 
  BarChart3, 
  RefreshCcw, 
  Shirt, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export function PlatformSection() {
  
  return (
    <section className="w-full py-32 bg-[#f3f4f6] text-[#0a192f] relative overflow-hidden">
      
      {/* Hintergrund-Muster (Technical Grid Pattern) */}
      <div className="absolute inset-0 w-full h-full opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#0a192f 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      <div className="container mx-auto px-6 md:px-10 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-4"
          >
            <div className="w-8 h-[2px] bg-[#991b1b]" />
            <span className="text-sm font-bold uppercase tracking-widest text-[#991b1b]">
              Die Plattform
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-5xl font-bold leading-tight"
          >
            Das Betriebssystem für <br /> Ihre <span className="text-[#991b1b]">Corporate Identity.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-slate-600 max-w-xl"
          >
            Vergessen Sie Excel-Listen und E-Mail-Bestellungen. 
            Unsere Plattform digitalisiert den gesamten Prozess – von der Größenwahl bis zur Budgetfreigabe.
          </motion.p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
          
          {/* Card 1: Main Feature (Groß - Dashboard) */}
          <BentoCard 
            colSpan="md:col-span-2"
            title="Smartes Dashboard"
            description="Behalten Sie Budgets, Bestellungen und Logistik-Status in Echtzeit im Blick."
            delay={0.3}
          >
            {/* Abstrakte UI Darstellung */}
            <div className="absolute inset-x-6 bottom-0 top-24 bg-white rounded-t-xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-200 overflow-hidden flex flex-col p-6 gap-4">
               {/* Fake Chart Header */}
               <div className="flex justify-between items-center mb-2">
                 <div className="flex gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-400" />
                   <div className="w-3 h-3 rounded-full bg-yellow-400" />
                   <div className="w-3 h-3 rounded-full bg-green-400" />
                 </div>
                 <div className="text-xs font-bold text-slate-400 uppercase">Q3 Overview</div>
               </div>
               {/* Fake Bars */}
               <div className="flex items-end gap-2 h-full w-full opacity-80">
                  <motion.div initial={{ height: 0 }} whileInView={{ height: '40%' }} transition={{ duration: 1 }} className="w-full bg-slate-100 rounded-t-md" />
                  <motion.div initial={{ height: 0 }} whileInView={{ height: '70%' }} transition={{ duration: 1, delay: 0.2 }} className="w-full bg-slate-200 rounded-t-md" />
                  <motion.div initial={{ height: 0 }} whileInView={{ height: '50%' }} transition={{ duration: 1, delay: 0.4 }} className="w-full bg-mik-red/20 rounded-t-md relative group">
                      <div className="absolute inset-x-0 bottom-0 top-[20%] bg-mik-red/80 rounded-t-md transition-all group-hover:bg-mik-red" />
                  </motion.div>
                  <motion.div initial={{ height: 0 }} whileInView={{ height: '85%' }} transition={{ duration: 1, delay: 0.6 }} className="w-full bg-slate-200 rounded-t-md" />
               </div>
            </div>
          </BentoCard>

          {/* Card 2: Mitarbeiter App */}
          <BentoCard 
            colSpan="md:col-span-1"
            title="Mitarbeiter App"
            description="Jeder Mitarbeiter bestellt selbst. Größenberater inklusive."
            delay={0.4}
            className="bg-[#0a192f] text-white" // Dunkler Akzent
          >
            <div className="absolute right-[-20px] bottom-[-20px] opacity-20">
              <Smartphone className="w-48 h-48" />
            </div>
            <div className="absolute inset-x-6 bottom-6 top-24 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm p-4 flex flex-col gap-3">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-mik-red flex items-center justify-center">
                    <Shirt className="w-4 h-4 text-white" />
                 </div>
                 <div className="text-xs font-medium text-white/80">Polo Navy <br/><span className="text-white/40">Größe L</span></div>
               </div>
               <div className="w-full h-1 bg-white/10 rounded-full mt-auto">
                 <div className="w-2/3 h-full bg-green-400 rounded-full" />
               </div>
               <div className="text-[10px] text-green-400 font-bold uppercase tracking-wider text-right">In Lieferung</div>
            </div>
          </BentoCard>

          {/* Card 3: Budget Control */}
          <BentoCard 
            colSpan="md:col-span-1"
            title="Budget Control"
            description="Setzen Sie Limits pro Kopf. Keine Überraschungen."
            delay={0.5}
          >
             <div className="absolute top-6 right-6 p-3 bg-red-50 rounded-full text-mik-red">
               <BarChart3 className="w-6 h-6" />
             </div>
             <div className="absolute bottom-6 left-6 right-6">
                <div className="flex justify-between text-sm font-bold mb-2">
                   <span>Verfügbar</span>
                   <span className="text-mik-red">2.400€</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }} 
                     whileInView={{ width: '65%' }} 
                     transition={{ duration: 1.5, ease: "circOut" }}
                     className="h-full bg-[#0a192f]" 
                   />
                </div>
             </div>
          </BentoCard>

          {/* Card 4: Auto-Replenishment */}
          <BentoCard 
            colSpan="md:col-span-2"
            title="Automatischer Kreislauf"
            description="Abgenutzte Kleidung wird automatisch abgeholt und ersetzt. Ein Klick."
            delay={0.6}
          >
             <div className="absolute inset-0 flex items-center justify-center opacity-50 gap-12 md:gap-24">
                {/* Simple Cycle Animation Icons */}
                <StepIcon icon={Shirt} label="Tragen" />
                <ArrowRight className="text-slate-300 w-6 h-6" />
                <StepIcon icon={RefreshCcw} label="Waschen" color="text-mik-red" />
                <ArrowRight className="text-slate-300 w-6 h-6" />
                <StepIcon icon={CheckCircle2} label="Ersetzen" />
             </div>
          </BentoCard>

        </div>

      </div>
    </section>
  );
}

// Helper Components für saubereren Code

function BentoCard({ children, title, description, colSpan = "", className = "", delay = 0 }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`relative group overflow-hidden rounded-3xl p-6 md:p-8 flex flex-col hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
        className ? className : "bg-white border border-slate-200/60 shadow-sm"
      } ${colSpan}`}
    >
      <div className="relative z-10">
        <h3 className="text-xl font-bold font-heading mb-2">{title}</h3>
        <p className={`text-sm leading-relaxed max-w-[90%] ${className.includes("text-white") ? "text-white/60" : "text-slate-500"}`}>
          {description}
        </p>
      </div>
      {children}
    </motion.div>
  )
}

function StepIcon({ icon: Icon, label, color = "text-slate-400" }: any) {
  return (
    <div className="flex flex-col items-center gap-3">
       <div className={`p-4 rounded-full bg-slate-50 ${color === "text-mik-red" ? "bg-red-50" : ""}`}>
         <Icon className={`w-6 h-6 ${color}`} />
       </div>
       <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</span>
    </div>
  )
}