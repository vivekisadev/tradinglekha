"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCta() {
  const features = [
    "Automated Journaling",
    "AI Trade Analysis",
    "Risk Management",
    "Behavioral Leak Detection",
    "Broker Sync",
    "Playbook Management",
    "Performance Analytics",
    "Discipline Board",
    "Equity Curve Tracking",
    "Calendar View",
    "Custom Tags"
  ];

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-32 mb-20 relative z-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-12 lg:gap-24 items-start">
        
        {/* Left Column */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start"
        >
          <h2 className="text-5xl md:text-[56px] lg:text-[64px] leading-[1.1] font-bold tracking-tighter text-foreground mb-8">
            You focus on <br/>
            <span className="text-emerald-500 relative inline-block">
              the trading.
              {/* Hand-drawn SVG underline */}
              <svg 
                className="absolute w-full h-4 -bottom-2 left-0 text-emerald-500" 
                viewBox="0 0 200 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M2.5 9.5C45.5 3.5 125.5 -1.5 197.5 7.5" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  className="animate-[draw_1s_ease-out_forwards]"
                  style={{ strokeDasharray: 300, strokeDashoffset: 300 }}
                />
                <path 
                  d="M10.5 10.5C60.5 4.5 140.5 0.5 190.5 6.5" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  className="animate-[draw_1s_ease-out_0.2s_forwards]"
                  style={{ strokeDasharray: 300, strokeDashoffset: 300, opacity: 0.5 }}
                />
              </svg>
            </span>
          </h2>
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes draw {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}} />
          
          <Link href="/auth/signup">
            <button className="bg-emerald-500 text-white rounded-full px-8 py-4 font-bold tracking-tight text-[15px] hover:scale-105 transition-transform shadow-[0_8px_30px_rgba(16,185,129,0.2)] flex items-center gap-2">
              Start Trading Free <ArrowRight size={16} />
            </button>
          </Link>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-start"
        >
          <h2 className="text-5xl md:text-[56px] lg:text-[64px] leading-[1.1] font-bold tracking-tighter text-foreground mb-8">
            We'll handle <br/>
            <span className="text-emerald-500">
              everything else.
            </span>
          </h2>
          
          <div className="flex flex-wrap gap-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (i * 0.05), type: "spring", stiffness: 300, damping: 24 }}
                className="px-4 py-2 bg-black/5 dark:bg-white/5 text-foreground text-[13px] font-semibold tracking-tight rounded-full border border-black/5 dark:border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-colors cursor-default"
              >
                {feature}
              </motion.div>
            ))}
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
