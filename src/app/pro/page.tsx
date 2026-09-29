"use client";

import { motion } from "framer-motion";
import { Sparkles, BrainCircuit, Globe, Coins, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { MagicCard } from "@/components/ui/magic-card";
import { ZoomTextReveal } from "@/components/ui/zoom-text-reveal";
import { Logo } from "@/components/logo";

export default function ProShowcase() {
  return (
    <div className="min-h-screen bg-background selection:bg-emerald-500/30">
      {/* Navbar Minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border/50">
        <Link href="/"><Logo /></Link>
        <div className="flex items-center gap-4">
          <Link href="/#pricing" className="text-sm font-semibold text-muted-foreground hover:text-foreground">Pricing</Link>
          <Link href="/auth/signup" className="px-4 py-2 text-sm font-bold bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20">
            Upgrade to Pro
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-bold uppercase tracking-wider">
            <Sparkles size={16} /> Tradinglekha Pro
          </div>
          <ZoomTextReveal text="Trade like a machine." className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Eliminate manual data entry. Gain multi-currency insights. Run up to 3 separate trading accounts with AI-powered analytics to identify your exact behavioral leaks.
          </p>
        </motion.div>
      </section>

      {/* Feature Simulations Grid */}
      <section className="px-6 py-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Simulation 1: Multi-Currency */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <MagicCard className="p-8 h-full flex flex-col bg-card" glowColor="rgba(16, 185, 129, 0.15)">
            <Globe className="w-10 h-10 text-emerald-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-foreground">Multi-Currency Dashboard</h3>
            <p className="text-muted-foreground mb-8">
              Seamlessly toggle between USD, INR, and EUR. Your stats are strictly isolated—we never cross-convert and distort your true performance.
            </p>
            {/* Interactive Simulation UI */}
            <div className="mt-auto p-4 rounded-xl bg-secondary/50 border border-border">
              <div className="flex items-center gap-2 mb-4 bg-background p-1.5 rounded-lg border border-border w-max">
                <div className="px-3 py-1 bg-emerald-500 text-white rounded text-xs font-bold shadow-sm">USD</div>
                <div className="px-3 py-1 text-muted-foreground rounded text-xs font-bold">INR</div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">+$4,250.00</div>
              <div className="text-xs text-emerald-500 font-medium">+12.4% Net P/L (USD Ledger)</div>
            </div>
          </MagicCard>
        </motion.div>

        {/* Simulation 2: Tiered Accounts */}
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <MagicCard className="p-8 h-full flex flex-col bg-card" glowColor="rgba(56, 189, 248, 0.15)">
            <Coins className="w-10 h-10 text-sky-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-foreground">Multi-Account Segregation</h3>
            <p className="text-muted-foreground mb-8">
              Keep your F&O, Commodity, and Investment trades entirely separate. Pro Yearly unlocks up to 3 distinct accounts.
            </p>
            {/* Interactive Simulation UI */}
            <div className="mt-auto flex flex-col gap-2">
              {["Day Trading (F&O)", "Swing (Equity)", "Gold (Commodity)"].map((acc, i) => (
                <div key={acc} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500 font-bold">{i + 1}</div>
                    <span className="text-sm font-semibold">{acc}</span>
                  </div>
                  <Check size={16} className="text-emerald-500" />
                </div>
              ))}
            </div>
          </MagicCard>
        </motion.div>

        {/* Simulation 3: AI Vision OCR */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-2">
          <MagicCard className="p-10 bg-card overflow-hidden relative" glowColor="rgba(168, 85, 247, 0.15)">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <BrainCircuit className="w-10 h-10 text-purple-500 mb-6" />
                <h3 className="text-3xl font-bold mb-4 text-foreground">AI Vision OCR Logging</h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Upload a screenshot of your broker. Our GPT-4o Vision model instantly extracts the ticker, entry price, side, size, and even auto-classifies the asset class (F&O vs Commodity).
                </p>
                <Link href="/auth/signup" className="inline-flex items-center gap-2 text-purple-500 font-bold hover:text-purple-600 transition-colors">
                  Try it now <ChevronRight size={18} />
                </Link>
              </div>
              <div className="relative">
                {/* Mock Phone/App UI */}
                <div className="bg-secondary p-4 rounded-2xl border border-border shadow-2xl">
                   <div className="bg-background rounded-xl p-4 border border-border/50 shadow-inner">
                      <div className="animate-pulse flex items-center gap-2 mb-4 text-xs font-bold text-purple-500">
                        <BrainCircuit size={14} /> AI is scanning...
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center border-b border-border/50 pb-2">
                          <span className="text-xs text-muted-foreground">Symbol</span>
                          <span className="text-sm font-bold">NIFTY 21400 CE</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-border/50 pb-2">
                          <span className="text-xs text-muted-foreground">Asset Class</span>
                          <span className="text-sm font-bold text-emerald-500">F&O Detected</span>
                        </div>
                        <div className="flex justify-between items-center pb-2">
                          <span className="text-xs text-muted-foreground">Realized PnL</span>
                          <span className="text-sm font-bold text-emerald-500">+₹8,450.00</span>
                        </div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </MagicCard>
        </motion.div>
        
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">Ready to stop guessing?</h2>
        <Link href="/#pricing" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold bg-foreground text-background rounded-xl hover:scale-105 transition-transform">
          View Pricing Plans
        </Link>
      </section>
    </div>
  );
}
