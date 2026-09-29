
"use client";
import Image from "next/image";

import { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { ComparisonSection } from "@/components/comparison-section";
import { BentoFeatures } from "@/components/bento-features";
import { UseCasesTabs } from "@/components/use-cases-tabs";
import { AiAnalyzerFlow } from "@/components/ai-analyzer-flow";
import { WallOfLove } from "@/components/wall-of-love";
import { PricingSection } from "@/components/pricing-section";
import { FaqSection } from "@/components/faq-section";

import { FinalCta } from "@/components/final-cta";
import { ShapeWaves } from "@/components/shape-waves";
import { AboutSection } from "@/components/about-section";
import { BarChart3, ArrowRight, Play, LayoutDashboard, ChevronRight } from "lucide-react";
import { LogoLink } from "@/components/logo";
import { GradientWaves } from "@/components/gradient-waves";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] dark:bg-[#09090B] selection:bg-emerald-500/30 font-sans text-foreground overflow-x-hidden relative">
      
      {/* Animated Gradient Waves Background for Hero */}
      <div className="absolute top-0 left-0 w-full h-[1100px] z-0 overflow-hidden pointer-events-none">
        <GradientWaves containerClassName="absolute inset-0 w-full h-full" className="opacity-40 dark:opacity-30 mix-blend-normal" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] z-20" />
      </div>

      {/* Floating Premium Navbar */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] z-50 rounded-full border border-black/5 dark:border-white/10 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] flex items-center justify-between px-6 py-4 transition-all">
        <LogoLink />
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-zinc-500 dark:text-zinc-400">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#wall-of-love" className="hover:text-foreground transition-colors">Wall of Love</Link>
            <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
          </nav>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/auth/login" className="text-sm font-bold text-zinc-500 dark:text-zinc-400 hover:text-foreground transition-colors hidden sm:block">Log in</Link>
          <Link href="/auth/signup" className="text-sm font-bold text-white bg-zinc-900 dark:text-zinc-900 dark:bg-white px-5 py-2.5 rounded-full hover:scale-105 transition-transform shadow-md">
            Get Started
          </Link>
        </div>
      </header>

      <main className="w-full flex flex-col items-center pt-48 relative z-10">
        
        {/* Award-Winning Centered Hero */}
        <section className="w-full max-w-[1200px] mx-auto px-6 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Tradinglekha AI 2.0 is live
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-6xl sm:text-7xl md:text-[90px] font-bold tracking-tighter leading-[0.95] text-zinc-900 dark:text-white max-w-5xl mb-8"
          >
            The trading copilot <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400">that never sleeps.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mb-12 leading-relaxed font-medium"
          >
            Log your trades instantly, discover hidden patterns in your data, and let AI tell you exactly when to step away from the charts.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full px-8 py-4 font-bold tracking-tight text-[15px] hover:scale-105 transition-transform shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-2">
              Start Trading Free <ArrowRight size={16} />
            </button>
            <button className="bg-transparent text-zinc-900 dark:text-white rounded-full px-8 py-4 font-bold tracking-tight text-[15px] border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-2">
              <Play size={16} className="fill-current" /> Watch Demo
            </button>
          </motion.div>
        </section>

        {/* Massive Premium Hero Image/Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[1300px] mx-auto px-6 mt-20 relative"
        >
          {/* Ambient Glow behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-emerald-500/20 blur-[120px] rounded-full pointer-events-none" />
          
          {/* The Mockup Container */}
            <div className="relative rounded-[2.5rem] border border-black/5 dark:border-white/10 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-2xl p-2 md:p-4 shadow-[0_20px_50px_rgb(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgb(0,0,0,0.3)]">
              <div className="rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/10 bg-background dark:bg-zinc-950 relative aspect-[16/9] md:aspect-[21/9] flex flex-col">
                
                {/* Browser Header */}
                <div className="h-10 md:h-12 border-b border-border/50 dark:border-white/10 flex items-center px-4 md:px-6 gap-2 bg-secondary/50 dark:bg-zinc-900/50 shrink-0">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  </div>
                  <div className="mx-auto flex items-center justify-center bg-background dark:bg-zinc-950 rounded-md px-4 md:px-32 py-1 border border-border/50 dark:border-white/5">
                    <span className="text-[10px] md:text-[11px] text-muted-foreground font-mono">app.tradinglekha.com</span>
                  </div>
                </div>
                
                {/* Actual Uploaded Mockups */}
                <div className="flex-1 w-full relative">
                  <Image 
                    src="/images/dashboard-light.png" 
                    alt="Tradinglekha Dashboard Light Mode" 
                    fill 
                    className="object-cover object-left-top dark:hidden"
                    priority
                  />
                  <Image 
                    src="/images/dashboard-dark.png" 
                    alt="Tradinglekha Dashboard Dark Mode" 
                    fill 
                    className="object-cover object-left-top hidden dark:block"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>

        {/* Feature Sections */}
        <div id="features" className="mt-40 w-full flex flex-col gap-40 mb-40">
          <ComparisonSection />
          <BentoFeatures />
          <UseCasesTabs />
          <AiAnalyzerFlow />
        </div>
        
        <WallOfLove />
        <PricingSection />
        <FaqSection />
        <AboutSection />
        <FinalCta />
        <ShapeWaves />
      </main>
    </div>
  );
}
