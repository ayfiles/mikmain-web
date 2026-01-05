"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Executive Blazer",
    category: "Business",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c47e356?q=80&w=600&auto=format&fit=crop",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Chef Jacket Premium",
    category: "Gastronomie",
    image: "https://images.unsplash.com/photo-1595475207225-428b62bda831?q=80&w=600&auto=format&fit=crop",
    badge: "Neu",
  },
  {
    id: 3,
    name: "Safety Workwear Set",
    category: "Workwear",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=600&auto=format&fit=crop",
    badge: null,
  },
  {
    id: 4,
    name: "Medical Scrubs",
    category: "Medical & Care",
    image: "https://images.unsplash.com/photo-1584982751601-97dcc096654c?q=80&w=600&auto=format&fit=crop",
    badge: "Beliebt",
  },
  {
    id: 5,
    name: "Corporate Polo",
    category: "Business",
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=600&auto=format&fit=crop",
    badge: null,
  },
  {
    id: 6,
    name: "Service Schürze",
    category: "Gastronomie",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=600&auto=format&fit=crop",
    badge: "Bestseller",
  },
];

export function FeaturedProducts() {
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span className="text-sm font-medium text-amber-600 uppercase tracking-wide">Highlights</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold">Unsere Bestseller</h2>
            <p className="text-muted-foreground mt-2">Die beliebtesten Produkte unserer Kunden.</p>
          </div>
          <Button variant="ghost" className="hidden md:flex">
            Alle ansehen <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>

      </div>

      {/* Horizontal Scroll Carousel */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 px-6 scrollbar-hide cursor-grab active:cursor-grabbing">
          {/* Spacer für Container-Alignment */}
          <div className="shrink-0 w-[calc((100vw-1200px)/2)] max-w-0 lg:max-w-none" />
          
          {FEATURED_PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="snap-center shrink-0 w-72 group"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 relative">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium">
                    {product.badge}
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <Button size="sm" variant="secondary" className="w-full">
                    Details ansehen
                  </Button>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
                <h3 className="font-heading font-bold text-lg mt-1">{product.name}</h3>
              </div>
            </motion.div>
          ))}
          
          {/* Spacer für Container-Alignment */}
          <div className="shrink-0 w-[calc((100vw-1200px)/2)] max-w-0 lg:max-w-none" />
        </div>
        
        {/* Fade-Effekte */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
      </div>

      {/* Mobile Button */}
      <div className="container mx-auto px-6 mt-6 md:hidden">
        <Button className="w-full">
          Alle Produkte ansehen <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </div>
    </section>
  );
}

