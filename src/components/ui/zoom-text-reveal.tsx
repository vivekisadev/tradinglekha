"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

interface ZoomTextRevealProps {
  text: string;
  children: React.ReactNode;
}

export function ZoomTextReveal({ text, children }: ZoomTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Scale from 1 to 150 so the hole becomes bigger than the screen
  const scale = useTransform(scrollYProgress, [0, 1], [1, 150]);
  
  // Fade out the mask completely at the very end to ensure it doesn't block clicks
  const opacity = useTransform(scrollYProgress, [0.95, 1], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-zinc-950">
        
        {/* Revealed Content Underneath */}
        <div className="absolute inset-0 z-0 h-full w-full">
          {children}
        </div>

        {/* The SVG Mask Overlay */}
        <motion.div 
          className="absolute inset-0 z-10 h-full w-full pointer-events-none text-background"
          style={{ opacity }}
        >
          <svg className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <mask id="text-mask">
                {/* White background means 'show the mask overlay color' */}
                <rect width="100%" height="100%" fill="white" />
                {/* Black text means 'punch a hole here' */}
                <motion.text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="black"
                  className="font-serif text-[16vw] font-black tracking-tighter uppercase"
                  style={{ scale, transformOrigin: "center center" }}
                >
                  {text}
                </motion.text>
                
                {/* Pill border around the text - also scales */}
                <motion.rect
                  x="5%"
                  y="25%"
                  width="90%"
                  height="50%"
                  rx="10vw"
                  fill="none"
                  stroke="black"
                  strokeWidth="2vw"
                  className="hidden md:block"
                  style={{ scale, transformOrigin: "center center" }}
                />
              </mask>
            </defs>
            {/* The actual overlay rectangle that gets colored by text-background */}
            <rect
              width="100%"
              height="100%"
              fill="currentColor"
              mask="url(#text-mask)"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

export function FinalRevealScene() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-[#09090b] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-[#09090b] to-black px-4 text-center">
      {/* Background Graphic/Texture (Subtle grid or pattern) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="z-10 flex max-w-4xl flex-col items-center gap-8">
        <h2 className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-white leading-tight">
          If you're serious about trading, <br className="hidden md:block" />
          <span className="text-zinc-400">you need this.</span>
        </h2>
        
        <p className="max-w-2xl text-lg text-zinc-400">
          Tradinglekha is the strategy and closing system built for traders who want to uncover opportunities faster, track discipline flawlessly, and scale their edge.
        </p>

        <Link href="/auth/signup">
          <button className="mt-4 rounded-full bg-green-500 hover:bg-green-400 px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-colors">
            Start Your Subscription
          </button>
        </Link>
      </div>

      {/* Footer Links */}
      <div className="absolute bottom-8 w-full px-8 flex flex-col md:flex-row items-center justify-between text-xs text-zinc-600 gap-4">
        <div className="flex gap-6">
          <Link href="#" className="hover:text-zinc-300 transition-colors">Disclaimer</Link>
          <Link href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-zinc-300 transition-colors">Terms of Use</Link>
        </div>
        <div>
          <span>support@tradinglekha.com</span>
        </div>
      </div>
    </div>
  );
}
