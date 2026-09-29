"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export type BarData = {
  name: string;
  value: number;
  color?: string;
  highlight?: boolean;
};

interface AnimatedBarChartProps {
  data: BarData[];
  height?: number;
}

export function AnimatedBarChart({ data, height = 300 }: AnimatedBarChartProps) {
  const [mounted, setMounted] = useState(false);
  const maxValue = Math.max(...data.map((d) => d.value));

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full relative flex items-end justify-between gap-2 sm:gap-4" style={{ height }}>
      {/* Horizontal Grid Lines */}
      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
        {[100, 75, 50, 25, 0].map((tick) => (
          <div key={tick} className="w-full flex items-center border-b border-zinc-800/50 relative h-0">
            <span className="absolute -left-6 text-[10px] text-muted-foreground transform -translate-y-1/2 bg-zinc-950/80 pr-2">
              {tick}
            </span>
          </div>
        ))}
      </div>

      {/* Bars */}
      <div className="absolute inset-0 pl-4 flex items-end justify-between gap-2 sm:gap-4 z-10 pt-4">
        {data.map((item, index) => {
          const percentage = (item.value / (maxValue || 100)) * 100;
          return (
            <div key={item.name} className="flex flex-col items-center flex-1 h-full justify-end group">
              <div className="w-full relative flex items-end justify-center h-full">
                {mounted && (
                  <motion.div
                    initial={{ height: 0, opacity: 0.5 }}
                    animate={{ height: `${percentage}%`, opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 40,
                      damping: 15,
                      delay: index * 0.1,
                      mass: 1,
                    }}
                    className={`w-full max-w-[64px] rounded-t-sm relative flex flex-col items-center transition-all ${
                      item.highlight
                        ? "bg-[#111] border-x border-t border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                        : item.color
                        ? item.color
                        : "bg-secondary"
                    }`}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                      className={`text-center pt-2 sm:pt-3 text-[10px] sm:text-xs font-bold ${
                        item.highlight ? "text-orange-500" : item.color === "bg-zinc-800" ? "text-zinc-300" : "text-foreground"
                      }`}
                    >
                      {item.highlight ? (
                        <div className="bg-card w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center -mt-1 sm:-mt-0">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-black ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      ) : (
                        item.value.toFixed(1)
                      )}
                    </motion.div>
                    
                    {item.highlight && (
                       <div className="mt-auto pb-3 text-orange-500 font-bold text-[10px] sm:text-xs">
                         {item.value.toFixed(1)}
                       </div>
                    )}
                    {!item.highlight && (
                      <div className="flex-1" /> // pushes text to top
                    )}
                  </motion.div>
                )}
              </div>
              <div className="mt-4 text-[10px] sm:text-xs text-muted-foreground text-center font-medium h-6">
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
