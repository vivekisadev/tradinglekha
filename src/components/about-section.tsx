"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-32 relative z-20">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-20"
      >
        <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-8">
          About Tradinglekha
        </p>
        <h2 className="text-5xl md:text-[72px] lg:text-[88px] leading-[1] font-bold tracking-tighter text-foreground mb-4">
          Trading is psychology.
        </h2>
        <div className="inline-flex mt-2">
          <h2 className="text-5xl md:text-[72px] lg:text-[88px] leading-[1] font-bold tracking-tighter bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-4 md:py-6 rounded-full shadow-2xl">
            The rest is data.
          </h2>
        </div>
        
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mt-10 leading-relaxed font-medium">
          Tradinglekha is an AI-powered trade journal. It automatically syncs your broker data, detects your behavioral leaks, and tells you exactly when to step away from the charts.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Card (Dark) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="bg-[#0f0f11] dark:bg-[#0f0f11] text-white p-10 md:p-12 rounded-[2.5rem] flex flex-col justify-between min-h-[420px]"
        >
          <div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">One journal, not six tools.</h3>
            <p className="text-zinc-400 leading-relaxed font-medium">
              A spreadsheet, a notebook, an analytics dashboard, a screenshot tool, and a habit tracker. Five disconnected apps and nobody mapping your mindset to your P&L. Tradinglekha runs that chain end to end, and the software is the one place you watch it from.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 mt-12 pt-4">
            {['Excel', 'Notion', 'Snipping Tool', 'Habit Tracker', 'Calculator'].map(tag => (
              <span key={tag} className="px-3 py-1.5 rounded-full border border-white/10 text-white/40 text-[11px] font-medium line-through">
                {tag}
              </span>
            ))}
            <ArrowRight size={14} className="text-white/40 mx-2" />
            <span className="px-4 py-1.5 rounded-full bg-emerald-500 text-white text-[13px] font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              Tradinglekha
            </span>
          </div>
        </motion.div>

        {/* Right Card (Light) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 p-10 md:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] flex flex-col justify-between min-h-[420px]"
        >
          <div>
            <p className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-6">
              Who builds it &middot; Remote-First &middot; Since 2024
            </p>
            <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight">Built by traders.</h3>
            <p className="text-muted-foreground leading-relaxed font-medium">
              We build the systems that protect your edge, and we are the ones who answer when a feature breaks. We've felt the pain of a tilted session, which is why we built the platform we actually wanted to use.
            </p>
          </div>
          
          <div className="flex gap-4 md:gap-6 mt-12 overflow-x-auto pb-4 scrollbar-hide">
            {[
              { name: 'Vivek', role: 'Founder', seed: 'Felix' },
              { name: 'Rahul', role: 'Engineering', seed: 'Aneka' },
              { name: 'Sam', role: 'Design', seed: 'Leo' },
              { name: 'Alex', role: 'Data', seed: 'Oliver' },
            ].map((member, i) => (
              <div key={member.name} className="flex flex-col items-start min-w-[70px]">
                <div className={`w-16 h-16 rounded-full border border-black/5 dark:border-white/5 mb-3 overflow-hidden flex items-center justify-center shadow-inner
                  ${i === 0 ? 'bg-orange-100 dark:bg-orange-900/30' : 
                    i === 1 ? 'bg-blue-100 dark:bg-blue-900/30' : 
                    i === 2 ? 'bg-emerald-100 dark:bg-emerald-900/30' : 
                    'bg-purple-100 dark:bg-purple-900/30'}`}>
                  <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${member.seed}&backgroundColor=transparent`} alt={member.name} className="w-14 h-14 object-cover mt-2 scale-110 opacity-90" />
                </div>
                <span className="text-[13px] font-bold text-foreground">{member.name}</span>
                <span className="text-[11px] text-muted-foreground font-medium">{member.role}</span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
