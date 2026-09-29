"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function GradientWaves({ 
  className = "", 
  children,
  containerClassName = "",
}: { 
  className?: string, 
  children?: React.ReactNode,
  containerClassName?: string
}) {
  return (
    <div className={`relative w-full overflow-hidden ${containerClassName}`}>
      {/* Animated waves background */}
      <div className={`absolute inset-0 -z-10 opacity-[0.25] dark:opacity-[0.15] pointer-events-none mix-blend-multiply dark:mix-blend-screen ${className}`}>
        <svg
          className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%] blur-[60px]"
          viewBox="0 0 1440 800"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Deep blue/indigo wave */}
          <motion.path
            d="M0,400 C320,200 420,600 720,400 C1020,200 1120,600 1440,400 L1440,800 L0,800 Z"
            fill="#3b82f6" // blue-500
            animate={{
              d: [
                "M0,400 C320,200 420,600 720,400 C1020,200 1120,600 1440,400 L1440,800 L0,800 Z",
                "M0,400 C320,500 420,200 720,400 C1020,600 1120,200 1440,400 L1440,800 L0,800 Z",
                "M0,400 C320,200 420,600 720,400 C1020,200 1120,600 1440,400 L1440,800 L0,800 Z",
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {/* Emerald green wave */}
          <motion.path
            d="M0,500 C280,700 480,300 720,500 C960,700 1160,300 1440,500 L1440,800 L0,800 Z"
            fill="#10b981" // emerald-500
            animate={{
              d: [
                "M0,500 C280,700 480,300 720,500 C960,700 1160,300 1440,500 L1440,800 L0,800 Z",
                "M0,500 C280,300 480,700 720,500 C960,300 1160,700 1440,500 L1440,800 L0,800 Z",
                "M0,500 C280,700 480,300 720,500 C960,700 1160,300 1440,500 L1440,800 L0,800 Z",
              ],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {/* Cyan wave */}
          <motion.path
            d="M0,600 C350,800 500,400 800,600 C1100,800 1200,400 1440,600 L1440,800 L0,800 Z"
            fill="#06b6d4" // cyan-500
            animate={{
              d: [
                "M0,600 C350,800 500,400 800,600 C1100,800 1200,400 1440,600 L1440,800 L0,800 Z",
                "M0,600 C350,400 500,800 800,600 C1100,400 1200,800 1440,600 L1440,800 L0,800 Z",
                "M0,600 C350,800 500,400 800,600 C1100,800 1200,400 1440,600 L1440,800 L0,800 Z",
              ],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      </div>
      
      {/* Foreground Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
