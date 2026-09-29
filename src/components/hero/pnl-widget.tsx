"use client";
import React, { useEffect, useRef } from "react";
import { animate } from "framer-motion";

interface PnLWidgetProps {
  capital: number;
}

export function PnLWidget({ capital }: PnLWidgetProps) {
  const withSystemRef = useRef<HTMLHeadingElement>(null);
  const withoutSystemRef = useRef<HTMLHeadingElement>(null);

  // Example multipliers to show compounding over time
  const withMultiplier = 4.16; // Significant compounding edge
  const withoutMultiplier = 1.05; // Stagnant or losing to inflation/fees

  const targetWith = capital * withMultiplier;
  const targetWithout = capital * withoutMultiplier;

  useEffect(() => {
    if (withSystemRef.current) {
      animate(0, targetWith, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (withSystemRef.current) {
            withSystemRef.current.textContent = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(latest);
          }
        },
      });
    }

    if (withoutSystemRef.current) {
      animate(0, targetWithout, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (withoutSystemRef.current) {
            withoutSystemRef.current.textContent = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(latest);
          }
        },
      });
    }
  }, [targetWith, targetWithout]);

  // Create an array for the decorative "bar graph" lines
  const bars = Array.from({ length: 45 });

  return (
    <div className="w-full max-w-[450px] overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-950 flex flex-col font-sans">
      
      {/* Top Section: With Tradinglekha */}
      <div className="relative bg-[#8b9ffe] dark:bg-[#5b6be4] p-6 text-black dark:text-white flex flex-col justify-between overflow-hidden">
        {/* Subtle decorative grid/bars */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 opacity-30 h-16">
          {bars.map((_, i) => (
            <div 
              key={i} 
              className="w-[2px] bg-black dark:bg-white" 
              style={{ height: `${Math.max(10, Math.min(100, 10 + Math.pow(i, 1.2)))}%` }}
            />
          ))}
        </div>

        <div className="relative z-10 flex justify-between items-start mb-8">
          <h3 ref={withSystemRef} className="text-4xl md:text-5xl font-bold tracking-tight">$0</h3>
          <span className="text-xs font-semibold uppercase tracking-wider text-black/70 dark:text-white/70 max-w-[120px] text-right mt-1">
            With Tradinglekha System
          </span>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] font-semibold text-black/70 dark:text-white/70">
          <div className="flex items-center gap-1">
            <span className="text-black dark:text-white font-bold">${(capital * 1.5) / 1000}K</span> Add. Edge
          </div>
          <div className="flex items-center gap-1">
            <span className="text-black dark:text-white font-bold">85%</span> Discipline
          </div>
          <div className="flex items-center gap-1">
            <span className="text-black dark:text-white font-bold">5 YRS</span> Projected
          </div>
        </div>
      </div>

      {/* Bottom Section: Without */}
      <div className="bg-[#cdbfa0] dark:bg-[#8b7d5d] p-4 text-black dark:text-white flex justify-between items-center">
        <h4 ref={withoutSystemRef} className="text-2xl font-bold tracking-tight">$0</h4>
        <span className="text-xs font-medium text-black/70 dark:text-white/70">
          Without System
        </span>
      </div>
    </div>
  );
}
