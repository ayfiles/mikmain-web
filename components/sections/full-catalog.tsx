"use client";

import { motion } from "framer-motion";
import { Briefcase, ChefHat, HardHat, Stethoscope, Shirt, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const CATEGORIES = [
  { id: "all", label: "Alle", icon: Shirt },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "workwear", label: "Workwear", icon: HardHat },
  { id: "gastro", label: "Gastronomie", icon: ChefHat },
  { id: "medical", label: "Medical", icon: Stethoscope },
];

const ALL_PRODUCTS = [
  // Business
  { id: 1, name: "Executive Blazer", category: "business", price: "Ab 89€", image: "https://images.unsplash.com/photo-1594938298603-c8148c47e356?q=80&w=400&auto=format&fit=crop" },
  { id: 2, name: "Corporate Polo", category: "business", price: "Ab 35€", image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=400&auto=format&fit=crop" },
  { id: 3, name: "Business Hemd", category: "business", price: "Ab 45€", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=400&auto=format&fit=crop" },
  { id: 4, name: "Anzughose Classic", category: "business", price: "Ab 65€", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=400&auto=format&fit=crop" },
  
  // Workwear
  { id: 5, name: "Safety Jacket", category: "workwear", price: "Ab 75€", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=400&auto=format&fit=crop" },
  { id: 6, name: "Arbeitshose Pro", category: "workwear", price: "Ab 55€", image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=400&auto=format&fit=crop" },
  { id: 7, name: "Warnweste Hi-Vis", category: "workwear", price: "Ab 25€", image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=400&auto=format&fit=crop" },
  { id: 8, name: "Arbeitshandschuhe", category: "workwear", price: "Ab 15€", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=400&auto=format&fit=crop" },
  
  // Gastronomie
  { id: 9, name: "Chef Jacket Premium", category: "gastro", price: "Ab 59€", image: "https://images.unsplash.com/photo-1595475207225-428b62bda831?q=80&w=400&auto=format&fit=crop" },
  { id: 10, name: "Service Schürze", category: "gastro", price: "Ab 29€", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=400&auto=format&fit=crop" },
  { id: 11, name: "Kellner Weste", category: "gastro", price: "Ab 49€", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
  { id: 12, name: "Koch Mütze Classic", category: "gastro", price: "Ab 12€", image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=400&auto=format&fit=crop" },
  
  // Medical
  { id: 13, name: "Medical Scrubs", category: "medical", price: "Ab 45€", image: "https://images.unsplash.com/photo-1584982751601-97dcc096654c?q=80&w=400&auto=format&fit=crop" },
  { id: 14, name: "Pflege Kasack", category: "medical", price: "Ab 35€", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop" },
  { id: 15, name: "OP Kittel", category: "medical", price: "Ab 55€", image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=400&auto=format&fit=crop" },
  { id: 16, name: "Labor Mantel", category: "medical", price: "Ab 49€", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=400&auto=format&fit=crop" },
];

function ProductCard({ product, index }: { product: typeof ALL_PRODUCTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group"
    >
      <div className="aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button variant="secondary" size="sm">Quick View</Button>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="font-heading font-bold">{product.name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{product.price}</p>
      </div>
    </motion.div>
  );
}

function ProductGrid({ products }: { products: typeof ALL_PRODUCTS }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, idx) => (
        <ProductCard key={product.id} product={product} index={idx} />
      ))}
    </div>
  );
}

export function FullCatalog() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">Vollständiger Katalog</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Entdecken Sie unser gesamtes Sortiment an hochwertiger Corporate Fashion.
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="all" className="w-full">
          
          {/* Tab Buttons + Filter */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <TabsList className="flex-wrap h-auto p-1 bg-background border">
              {CATEGORIES.map((cat) => (
                <TabsTrigger 
                  key={cat.id} 
                  value={cat.id}
                  className="flex items-center gap-2 data-[state=active]:bg-mik-navy data-[state=active]:text-white"
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Search className="w-4 h-4" />
                Suchen
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>

          {/* Tab Content - All */}
          <TabsContent value="all">
            <ProductGrid products={ALL_PRODUCTS} />
          </TabsContent>

          {/* Tab Content - Business */}
          <TabsContent value="business">
            <ProductGrid products={ALL_PRODUCTS.filter(p => p.category === "business")} />
          </TabsContent>

          {/* Tab Content - Workwear */}
          <TabsContent value="workwear">
            <ProductGrid products={ALL_PRODUCTS.filter(p => p.category === "workwear")} />
          </TabsContent>

          {/* Tab Content - Gastronomie */}
          <TabsContent value="gastro">
            <ProductGrid products={ALL_PRODUCTS.filter(p => p.category === "gastro")} />
          </TabsContent>

          {/* Tab Content - Medical */}
          <TabsContent value="medical">
            <ProductGrid products={ALL_PRODUCTS.filter(p => p.category === "medical")} />
          </TabsContent>

        </Tabs>

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            Mehr Produkte laden
          </Button>
        </div>

      </div>
    </section>
  );
}

