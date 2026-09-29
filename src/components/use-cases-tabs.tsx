"use client";

import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  LineChart,
  Target,
  Activity,
  Shield,
  Crosshair,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { id: "tracking", label: "P&L Tracking", icon: LayoutDashboard },
  { id: "analysis", label: "AI Analysis", icon: Sparkles },
  { id: "playbook", label: "Playbook Rules", icon: BookOpen },
  { id: "reporting", label: "Live Reporting", icon: LineChart },
];

const tabContent: Record<string, any> = {
  tracking: {
    title: "Visualize your entire P&L trajectory.",
    points: [
      {
        icon: Target,
        title: "Automated graphs",
        desc: "Your equity curve, win-rate, and R-multiple generated automatically.",
      },
      {
        icon: Activity,
        title: "Drawdown alerts",
        desc: "Visual markers when you're approaching your max daily loss.",
      },
    ],
    visual: (
      <div className="w-full h-full bg-zinc-950 rounded-2xl border border-zinc-800 p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div>
            <div className="text-muted-foreground text-xs uppercase tracking-widest font-semibold mb-1">
              Net P&L
            </div>
            <div className="text-white text-3xl font-bold">$12,450.00</div>
          </div>
          <div className="text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full text-xs font-bold">
            +18.2%
          </div>
        </div>

        {/* Fake Area Chart */}
        <div className="relative w-full h-32 mt-auto z-10">
          <svg
            className="w-full h-full overflow-visible"
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 L0,30 C20,25 30,35 50,15 C70,-5 80,10 100,5 L100,40 Z"
              fill="url(#pnlGradient)"
            />
            <path
              d="M0,30 C20,25 30,35 50,15 C70,-5 80,10 100,5"
              fill="none"
              stroke="#10b981"
              strokeWidth="1"
            />
            <defs>
              <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    ),
  },
  analysis: {
    title: "Discover your edge automatically.",
    points: [
      {
        icon: Sparkles,
        title: "Pattern matching",
        desc: "AI scans your history to find setups with the highest win probability.",
      },
      {
        icon: Shield,
        title: "Leak detection",
        desc: "Automatically highlights time-of-day or assets where you lose money.",
      },
    ],
    visual: (
      <div className="w-full h-full bg-card rounded-2xl border border-border p-6 flex flex-col shadow-2xl relative overflow-hidden">
        <div className="mb-4">
          <div className="text-muted-foreground text-xs font-semibold mb-1 uppercase tracking-widest">
            Edge Discovered
          </div>
          <div className="text-foreground text-xl font-bold">
            ORB on Large Caps
          </div>
        </div>
        <div className="space-y-3 relative z-10">
          <div className="flex justify-between items-center p-3 bg-muted rounded-lg border border-zinc-100 dark:border-zinc-800">
            <span className="text-sm text-muted-foreground">Win Rate</span>
            <span className="text-sm font-bold text-emerald-500">68%</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted rounded-lg border border-zinc-100 dark:border-zinc-800">
            <span className="text-sm text-muted-foreground">Profit Factor</span>
            <span className="text-sm font-bold text-emerald-500">2.4</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-muted rounded-lg border border-zinc-100 dark:border-zinc-800">
            <span className="text-sm text-muted-foreground">Avg Hold Time</span>
            <span className="text-sm font-bold text-blue-500">42m</span>
          </div>
        </div>
      </div>
    ),
  },
  playbook: {
    title: "Enforce rules with dynamic grading.",
    points: [
      {
        icon: BookOpen,
        title: "Setup criteria",
        desc: "Define rules for your setups and grade every trade against them.",
      },
      {
        icon: Crosshair,
        title: "Mistake tracking",
        desc: "Log emotional mistakes like FOMO or revenge trading.",
      },
    ],
    visual: (
      <div className="w-full h-full bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 p-6 flex flex-col justify-center items-center relative overflow-hidden shadow-2xl">
        <div className="w-32 h-32 rounded-full border-8 border-emerald-100 dark:border-emerald-900/50 flex items-center justify-center relative mb-4">
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="#10b981"
              strokeWidth="8"
              strokeDasharray="289"
              strokeDashoffset="40"
              strokeLinecap="round"
            />
          </svg>
          <div className="text-center">
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              A+
            </span>
          </div>
        </div>
        <h4 className="font-bold text-emerald-700 dark:text-emerald-500">
          Flawless Execution
        </h4>
        <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 mt-1">
          All playbook rules followed
        </p>
      </div>
    ),
  },
  reporting: {
    title: "Share your track record.",
    points: [
      {
        icon: LineChart,
        title: "Public profiles",
        desc: "Generate a verified, read-only link to share your performance.",
      },
      {
        icon: LayoutDashboard,
        title: "Data export",
        desc: "Export clean CSVs for taxes or external analysis.",
      },
    ],
    visual: (
      <div className="w-full h-full bg-secondary dark:bg-zinc-900 rounded-2xl border border-border p-6 shadow-2xl flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 shrink-0" />
          <div>
            <div className="text-sm font-bold text-foreground">Alex Trades</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-500" /> Verified Record
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 flex-grow border border-border">
          <div className="w-full h-4 bg-secondary dark:bg-zinc-900 rounded mb-3" />
          <div className="w-2/3 h-4 bg-secondary dark:bg-zinc-900 rounded mb-6" />
          <div className="flex gap-2">
            <div className="w-full h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg" />
            <div className="w-full h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg" />
          </div>
        </div>
      </div>
    ),
  },
};

export function UseCasesTabs() {
  const [activeTab, setActiveTab] = useState("tracking");

  // Auto-play interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = tabs.findIndex((t) => t.id === current);
        const nextIndex = (currentIndex + 1) % tabs.length;
        return tabs[nextIndex].id;
      });
    }, 6000); // cycle every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const content = tabContent[activeTab];

  return (
    <section className=" w-full max-w-[1200px] mx-auto px-6 py-20 font-sans">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          One platform.{" "}
          <span className="text-emerald-500">Every trade it touches.</span>
        </h2>
      </div>

      <div className="bg-secondary rounded-[24px] border border-border p-2 shadow-sm">
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-2 bg-card rounded-[20px] p-2 border border-border shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all shrink-0 min-w-[140px] relative overflow-hidden ${
                activeTab === tab.id
                  ? "bg-muted text-foreground shadow-sm border border-border/50"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <tab.icon className="w-4 h-4 relative z-10" />
              <span className="relative z-10">{tab.label}</span>
              {/* Progress bar indicator for active tab */}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-emerald-500 w-full z-0"
                  initial={{ scaleX: 0, transformOrigin: "left" }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 6, ease: "linear" }}
                  key={`progress-${tab.id}`}
                />
              )}
            </button>
          ))}
        </div>

        <div className="bg-card rounded-[20px] border border-border shadow-sm p-8 md:p-12 min-h-[400px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col md:flex-row gap-12 items-center w-full h-full"
            >
              {/* Content Left */}
              <div className="w-full md:w-1/2 flex flex-col gap-8">
                <h3 className="text-3xl md:text-4xl font-serif text-foreground leading-tight">
                  {content.title}
                </h3>

                <div className="flex flex-col gap-6">
                  {content.points.map((point: any, idx: number) => (
                    <div key={idx} className="flex gap-4">
                      <div className="mt-1">
                        <point.icon className="w-5 h-5 text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground mb-1">
                          {point.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Right */}
              <div className="w-full md:w-1/2 h-[300px] md:h-[350px]">
                {content.visual}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
