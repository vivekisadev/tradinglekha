"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lock, Sparkles, ChevronRight, X, Check } from "lucide-react";
import Link from "next/link";
import { MagicCard } from "@/components/ui/magic-card";
import { useState } from "react";

export function ProFeatureLock({ featureName, onUnlock }: { featureName: string, onUnlock?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* The locked feature placeholder/button */}
      <div 
        onClick={() => setIsOpen(true)}
        className="relative group cursor-pointer overflow-hidden rounded-xl border border-border bg-card p-6 flex flex-col items-center justify-center text-center hover:border-sky-500/50 transition-colors h-[200px]"
      >
        <div className="absolute inset-0 bg-secondary/50 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center group-hover:backdrop-blur-sm transition-all">
          <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center shadow-lg mb-3">
            <Lock className="w-5 h-5 text-muted-foreground group-hover:text-sky-500 transition-colors" />
          </div>
          <h4 className="font-bold text-foreground">{featureName}</h4>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1 group-hover:text-sky-500 transition-colors">
            <Sparkles size={12} /> Pro Feature
          </p>
        </div>
      </div>

      {/* The Simulation / Upgrade Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-card border border-border rounded-3xl shadow-2xl overflow-hidden z-50"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors z-20"
              >
                <X size={16} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left: Simulation Preview */}
                <div className="bg-gradient-to-br from-sky-900 to-slate-900 p-8 flex flex-col justify-center relative overflow-hidden">
                  {/* Decorative blur */}
                  <div className="absolute -top-20 -left-20 w-40 h-40 bg-sky-500/30 rounded-full blur-3xl" />
                  
                  <div className="relative z-10">
                    <Sparkles className="w-8 h-8 text-sky-400 mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Unlock {featureName}</h3>
                    <p className="text-sky-100/70 text-sm mb-6">
                      See exactly what's costing you money. Pro users save an average of $450/month just by identifying leaks.
                    </p>
                    
                    {/* Tiny visual simulation */}
                    <div className="bg-black/30 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-white/50 uppercase font-bold">Simulation</span>
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <div className="h-2 w-full bg-white/10 rounded-full mb-3 overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: "75%" }}
                           transition={{ duration: 1.5, ease: "easeOut" }}
                           className="h-full bg-sky-400 rounded-full"
                         />
                      </div>
                      <p className="text-[10px] text-white/70">Analyzing 50+ data points...</p>
                    </div>
                  </div>
                </div>

                {/* Right: Upgrade CTA */}
                <div className="p-8 flex flex-col justify-center">
                  <h4 className="font-bold text-foreground mb-4">Pro Plan Includes:</h4>
                  <ul className="space-y-3 mb-8">
                    {[
                      "AI Vision Trade Logging",
                      "Multi-Currency Dashboards",
                      "Up to 3 Linked Accounts",
                      "Advanced Playbook System"
                    ].map((feat) => (
                      <li key={feat} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-500/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <div className="space-y-3">
                    <Link 
                      href="/#pricing" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center w-full py-3 bg-foreground text-background rounded-xl font-bold hover:bg-foreground/90 transition-colors"
                    >
                      Upgrade to Pro
                    </Link>
                    <Link 
                      href="/pro"
                      className="flex items-center justify-center w-full py-3 bg-secondary text-foreground rounded-xl font-bold hover:bg-secondary/80 transition-colors"
                    >
                      View Pro Showcase <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
