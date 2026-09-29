"use client";

import React, { useState, useEffect } from "react";
import { Upload, Cpu, CheckCircle2, LayoutDashboard, ArrowRight, Image as ImageIcon, Target } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  { id: 1, title: "Image Upload", icon: Upload, desc: "Drag & drop your broker screenshot." },
  { id: 2, title: "AI Analysis", icon: Cpu, desc: "Extracting tickers, entry/exit, & P&L." },
  { id: 3, title: "Manual Review", icon: CheckCircle2, desc: "Confirm data and add your tags." },
  { id: 4, title: "Live Dashboard", icon: LayoutDashboard, desc: "Edge metrics automatically update." },
];

export function AiAnalyzerFlow() {
  const [activeStep, setActiveStep] = useState(1);

  // Auto cycle steps for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 4) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-24 font-sans border-t border-border/50 mt-12">
      <div className="mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          From screenshot <span className="text-emerald-500">to insights.</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl">
          No broker API? No problem. Just drop a screenshot of your execution platform and watch our AI instantly log your trade and update your edge profile.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Left Sidebar Steps */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4 relative">
          {/* Vertical connection line */}
          <div className="absolute left-6 top-10 bottom-10 w-[2px] bg-border z-0 hidden md:block" />
          
          {steps.map((step) => {
            const isActive = step.id === activeStep;
            const isPast = step.id < activeStep;
            
            return (
              <div 
                key={step.id} 
                onClick={() => setActiveStep(step.id)}
                className={`relative z-10 flex gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-card shadow-lg border border-border scale-[1.02]' : 'hover:bg-muted/30'}`}
              >
                <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center border-2 transition-colors duration-300 ${
                  isActive ? 'bg-emerald-500 border-emerald-500 text-white' : 
                  isPast ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' : 
                  'bg-background border-border text-muted-foreground'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`font-bold text-lg transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Dynamic Visualization */}
        <div className="w-full lg:w-2/3 h-[450px] bg-card rounded-[2.5rem] border border-border shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] p-6 relative overflow-hidden flex items-center justify-center">
          
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* STEP 1: Upload */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: activeStep === 1 ? 1 : 0, scale: activeStep === 1 ? 1 : 0.9, zIndex: activeStep === 1 ? 20 : 0 }}
            className="absolute flex flex-col items-center justify-center"
          >
            <div className="w-64 h-48 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center bg-muted/50 dark:bg-zinc-900/50">
              <ImageIcon className="w-12 h-12 text-muted-foreground mb-4" />
              <div className="text-sm font-bold text-muted-foreground dark:text-zinc-300">Drop screenshot here</div>
              <div className="text-xs text-muted-foreground mt-2">PNL.png</div>
            </div>
            <div className="mt-8">
              <div className="px-6 py-2 bg-emerald-500 text-white font-bold rounded-full text-sm shadow-lg shadow-emerald-500/20">
                Processing Upload...
              </div>
            </div>
          </motion.div>

          {/* STEP 2: AI Analysis */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: activeStep === 2 ? 1 : 0, scale: activeStep === 2 ? 1 : 0.9, zIndex: activeStep === 2 ? 20 : 0 }}
            className="absolute w-full max-w-sm"
          >
            <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-[shimmer_2s_infinite]" />
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
              `}} />
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="w-6 h-6 text-emerald-400 animate-pulse" />
                <span className="text-white font-mono text-sm">Vision AI Analyzing...</span>
              </div>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between text-muted-foreground"><span>Ticker found:</span> <span className="text-emerald-400">NVDA</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Direction:</span> <span className="text-emerald-400">LONG</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Entry Price:</span> <span className="text-emerald-400">$118.50</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Exit Price:</span> <span className="text-emerald-400">$121.20</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Net P&L:</span> <span className="text-emerald-400">+$2,450.00</span></div>
              </div>
            </div>
          </motion.div>

          {/* STEP 3: Manual Review */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: activeStep === 3 ? 1 : 0, scale: activeStep === 3 ? 1 : 0.9, zIndex: activeStep === 3 ? 20 : 0 }}
            className="absolute w-full max-w-sm"
          >
            <div className="bg-card rounded-2xl p-6 border border-border shadow-xl">
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> Review Trade Entry</h4>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="text-xs font-semibold text-muted-foreground">Ticker</label>
                    <div className="w-full p-2 bg-muted/50 rounded-lg border border-border text-sm font-bold text-foreground">NVDA</div>
                  </div>
                  <div className="w-1/2">
                    <label className="text-xs font-semibold text-muted-foreground">P&L</label>
                    <div className="w-full p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-sm font-bold text-emerald-600 dark:text-emerald-400">+$2,450.00</div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground mb-1 block">Add Custom Tags</label>
                  <div className="flex gap-2">
                    <span className="text-[10px] px-2 py-1 rounded bg-muted border border-border text-foreground font-medium">Earnings Play</span>
                    <span className="text-[10px] px-2 py-1 rounded bg-muted border border-border text-foreground font-medium">+ Add Tag</span>
                  </div>
                </div>

                <button className="w-full py-3 bg-foreground text-background font-bold rounded-xl text-sm mt-2 hover:opacity-90">
                  Save to Journal
                </button>
              </div>
            </div>
          </motion.div>

          {/* STEP 4: Dashboard Update */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: activeStep === 4 ? 1 : 0, scale: activeStep === 4 ? 1 : 0.9, zIndex: activeStep === 4 ? 20 : 0 }}
            className="absolute w-full max-w-lg"
          >
            <div className="bg-card rounded-2xl p-6 border border-border shadow-2xl">
              <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                <div className="font-serif text-xl text-foreground">Dashboard</div>
                <div className="text-xs text-emerald-500 font-bold bg-emerald-500/10 px-2 py-1 rounded">Live Update</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted/30 rounded-xl border border-border/50 relative overflow-hidden">
                  <div className="text-xs text-muted-foreground mb-1">Total Net P&L</div>
                  <div className="text-2xl font-bold text-foreground relative">
                    <motion.span
                      key="pnl"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="inline-block text-emerald-500"
                    >
                      $45,200
                    </motion.span>
                  </div>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                  <div className="text-xs text-muted-foreground mb-1">Win Rate</div>
                  <div className="text-2xl font-bold text-foreground">68%</div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <Target className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">New Edge Discovered!</div>
                  <div className="text-[10px] text-emerald-600/70 dark:text-emerald-400/70">NVDA plays are highly profitable.</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
