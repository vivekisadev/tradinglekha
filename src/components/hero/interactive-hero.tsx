"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FloatingNodes } from "./floating-nodes";
import { PnLWidget } from "./pnl-widget";

export function InteractiveHero() {
  const [capital, setCapital] = useState<number>(50000);

  const capitalOptions = [
    { label: "10K", value: 10000 },
    { label: "50K", value: 50000 },
    { label: "100K", value: 100000 },
  ];

  return (
    <section className="relative w-full min-h-[95vh] flex flex-col pt-32 pb-16 overflow-hidden">
      {/* Parallax Floating Nodes Layer */}
      <FloatingNodes />

      <div className="container mx-auto px-6 lg:px-12 flex-grow flex flex-col justify-center relative z-10">
        
        {/* Main Headline & CTA */}
        <div className="max-w-4xl mx-auto text-center mb-24 mt-8">
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.05] tracking-tight font-sans mb-8 text-foreground">
            Scale your trading account by making your edge <span className="text-emerald-500">impossible to ignore.</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
              <button className="rounded-full bg-green-500 hover:bg-green-400 px-8 py-4 text-sm font-bold tracking-wide text-zinc-950 transition-colors shadow-lg hover:shadow-xl">
                Start Your Subscription
              </button>
            </Link>
            <Link href="#features">
              <button className="rounded-full bg-transparent px-8 py-4 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white underline underline-offset-4 decoration-zinc-300 dark:decoration-zinc-700 transition-colors">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom Interactive Area */}
        <div className="w-full flex flex-col lg:flex-row items-end justify-between gap-12 mt-auto">
          
          {/* Descriptive Text & Toggles */}
          <div className="max-w-md w-full shrink-0">
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
              Tradinglekha is the strategy and discipline system built for traders who want to uncover opportunities faster, track their edge clearly, and scale their accounts.
            </p>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100">
                Starting Capital
              </span>
              <div className="flex gap-2">
                {capitalOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setCapital(opt.value)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                      capital === opt.value
                        ? "bg-[#8b9ffe] dark:bg-[#5b6be4] text-white border-transparent"
                        : "bg-transparent text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 hover:border-zinc-500"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PnL Chart Widget */}
          <div className="w-full max-w-[450px] lg:ml-auto">
            <PnLWidget capital={capital} />
          </div>

        </div>
      </div>
    </section>
  );
}
