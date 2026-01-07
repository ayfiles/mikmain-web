"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CustomerCarousel } from "@/components/ui/customer-carousel";
import { CustomerModal } from "@/components/ui/customer-modal";
import { CUSTOMERS, Customer } from "@/components/ui/customer-data";

export function ReferencesSection() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedCustomer(null), 300);
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full py-24 md:py-32 overflow-visible bg-background"
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mik-blue/5 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 w-[95%] max-w-[1200px] mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4"
            >
              Kunden{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-mik-blue to-blue-400">
                Referenzen
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Vertrauen Sie auf unsere Expertise. Entdecken Sie, wie wir Unternehmen
              bei ihrer Corporate Fashion unterstützen.
            </motion.p>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10"
        >
          <CustomerCarousel
            customers={CUSTOMERS}
            onCustomerClick={handleCustomerClick}
          />
        </motion.div>
      </section>

      {/* Modal */}
      <CustomerModal
        customer={selectedCustomer}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default ReferencesSection;

