"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
  href?: string;
  cta?: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl",
      // Glassmorphism-Stil wie die Navbar
      "bg-mik-navy/60 backdrop-blur-xl",
      "border border-white/10",
      "[box-shadow:0_0_40px_-10px_rgba(59,130,246,0.15),inset_0_1px_0_0_rgba(255,255,255,0.05)]",
      // Hover-Effekte: Scale + Border + Shadow
      "hover:scale-[1.03] hover:border-mik-blue/40 hover:[box-shadow:0_0_60px_-10px_rgba(59,130,246,0.3),inset_0_1px_0_0_rgba(255,255,255,0.1)]",
      "transition-all duration-500 transform-gpu",
      className
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-2 p-6 transition-all duration-300">
      <Icon className="h-12 w-12 origin-left transform-gpu text-mik-blue transition-all duration-300 ease-in-out" />
      <h3 className="font-heading text-xl font-bold text-white">
        {name}
      </h3>
      <p className="font-sans max-w-lg text-mik-grey">{description}</p>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-white/[.02]" />
  </div>
);

export { BentoCard, BentoGrid };
