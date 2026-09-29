"use client";

import { motion } from "framer-motion";
import { Crown, Infinity, Network, ShieldCheck, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { MagicCard } from "@/components/ui/magic-card";
import { ZoomTextReveal } from "@/components/ui/zoom-text-reveal";
import { Logo } from "@/components/logo";

export default function EliteShowcase() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-amber-500/30">
      {/* Navbar Minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10">
        <Link href="/"><Logo /></Link>
        <div className="flex items-center gap-4">
          <Link href="/#pricing" className="text-sm font-semibold text-white/70 hover:text-white">Pricing</Link>
          <Link href="/auth/signup" className="px-4 py-2 text-sm font-bold bg-amber-500 text-black rounded-lg hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20">
            Apply for Elite
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 max-w-5xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-bold uppercase tracking-wider">
            <Crown size={16} /> Tradinglekha Elite
          </div>
          <ZoomTextReveal text="For the top 1%." className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6" />
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Unlimited accounts. Priority broker integrations. Custom AI behavioral training. Built for funded traders, prop firms, and private trading desks who demand absolute edge.
          </p>
        </motion.div>
      </section>

      {/* Feature Simulations Grid */}
      <section className="px-6 py-20 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Simulation 1: Unlimited Accounts */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <MagicCard className="p-8 h-full flex flex-col bg-[#111] border-white/5" glowColor="rgba(245, 158, 11, 0.15)">
            <Infinity className="w-10 h-10 text-amber-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-white">Unlimited Accounts</h3>
            <p className="text-white/60 mb-8">
              Trading for multiple prop firms? Managing different investor capitals? Elite removes all caps. Create infinite accounts across all asset classes.
            </p>
            {/* Interactive Simulation UI */}
            <div className="mt-auto p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-white/50 uppercase">Active Accounts</span>
                <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">&infin; Limitless</span>
              </div>
              <div className="flex flex-col gap-2">
                {["Apex Funded 1", "Topstep 50k", "Personal Crypto", "Long-term Equity"].map((acc) => (
                  <div key={acc} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                    <Check size={14} className="text-amber-500" />
                    <span className="text-sm font-semibold text-white/90">{acc}</span>
                  </div>
                ))}
              </div>
            </div>
          </MagicCard>
        </motion.div>

        {/* Simulation 2: Priority Broker Sync (V2 Preview) */}
        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <MagicCard className="p-8 h-full flex flex-col bg-[#111] border-white/5" glowColor="rgba(245, 158, 11, 0.15)">
            <Network className="w-10 h-10 text-amber-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-white">Priority Broker Sync</h3>
            <p className="text-white/60 mb-8">
              While Basic/Pro users rely on manual entry or AI OCR, Elite users get first access to our upcoming direct broker API integrations.
            </p>
            {/* Interactive Simulation UI */}
            <div className="mt-auto flex flex-wrap gap-3">
              {["Interactive Brokers", "Tradeovate", "Binance", "Zerodha"].map((broker) => (
                <div key={broker} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white/70 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  {broker}
                </div>
              ))}
            </div>
          </MagicCard>
        </motion.div>

        {/* Simulation 3: Custom AI Training */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="md:col-span-2">
          <MagicCard className="p-10 bg-[#111] border-white/5 overflow-hidden relative" glowColor="rgba(245, 158, 11, 0.15)">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <ShieldCheck className="w-10 h-10 text-amber-500 mb-6" />
                <h3 className="text-3xl font-bold mb-4 text-white">Custom AI Behavioral Training</h3>
                <p className="text-lg text-white/60 mb-8">
                  The AI doesn't just read your trades; it learns your specific psychological triggers. Elite gives you a dedicated instance of our behavioral model trained strictly on your journal history.
                </p>
                <Link href="/auth/signup" className="inline-flex items-center gap-2 text-amber-500 font-bold hover:text-amber-400 transition-colors">
                  Join Elite <ChevronRight size={18} />
                </Link>
              </div>
              <div className="relative">
                {/* Mock Phone/App UI */}
                <div className="bg-black/50 p-4 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-md">
                   <div className="bg-white/5 rounded-xl p-4 border border-white/10 shadow-inner">
                      <div className="flex items-center gap-2 mb-4 text-xs font-bold text-amber-500">
                        <Crown size={14} /> Elite Insights
                      </div>
                      <div className="space-y-4">
                        <p className="text-sm text-white/90 leading-relaxed italic border-l-2 border-amber-500 pl-3">
                          "I noticed you tend to size up after 2 consecutive losses. In the past 90 days, revenge trading has cost you $4,120. Switch to the SIM account for the next 2 hours."
                        </p>
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
        <h2 className="text-3xl font-bold mb-6 text-white">Dominate the markets.</h2>
        <Link href="/#pricing" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold bg-amber-500 text-black rounded-xl hover:bg-amber-400 hover:scale-105 transition-all">
          View Pricing Plans
        </Link>
      </section>
    </div>
  );
}
