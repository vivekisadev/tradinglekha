"use client";

import { motion } from "framer-motion";
import { Target, Activity, LineChart } from "lucide-react";

export function WallOfLove() {
  return (
    <section
      id="wall-of-love"
      className="force-light w-full max-w-[1200px] mx-auto px-6 py-32 flex flex-col items-center border-t border-border/50"
    >
      <div className="mb-16 max-w-2xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold dark:text-white tracking-tight text-foreground mb-4">
          Less guessing, more{" "}
          <span className="text-emerald-500">consistent profits.</span>
        </h2>
        <p className="text-muted-foreground text-lg">
          Join hundreds of traders who have found their edge with Tradinglekha.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[700px] overflow-hidden relative w-full"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <motion.div
          animate={{ y: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex flex-col gap-6"
        >
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={`col1-${i}`}
              className="bg-card shadow-sm border border-border p-8 rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-6 text-muted-foreground">
                <Target className="w-5 h-5" /> PropDesk
              </div>
              <p className="text-[15px] text-foreground mb-8 leading-relaxed font-medium">
                "Tradinglekha spots my tilt patterns before I even realize them.
                It's saved me thousands by just telling me to walk away."
              </p>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Sarah Mitchell
                </p>
                <p className="text-xs text-muted-foreground">Funded Trader</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          animate={{ y: [-1000, 0] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex flex-col gap-6"
        >
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={`col2-${i}`}
              className="bg-card shadow-sm border border-border p-8 rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-6 text-muted-foreground">
                <Activity className="w-5 h-5" /> AlphaGen
              </div>
              <p className="text-[15px] text-foreground mb-8 leading-relaxed font-medium">
                "I used to spend 2 hours every weekend manually logging trades.
                Now it's instantly synced. The time saved is incredible."
              </p>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Daniel Park
                </p>
                <p className="text-xs text-muted-foreground">
                  Retail Day Trader
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          animate={{ y: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          className="flex flex-col gap-6 hidden md:flex"
        >
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={`col3-${i}`}
              className="bg-card shadow-sm border border-border p-8 rounded-2xl"
            >
              <div className="flex items-center gap-2 mb-6 text-muted-foreground">
                <LineChart className="w-5 h-5" /> ChartPros
              </div>
              <p className="text-[15px] text-foreground mb-8 leading-relaxed font-medium">
                "The analytics showed me I lose money on Fridays. I stopped
                trading Fridays and my equity curve smoothed out perfectly."
              </p>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  James Okafor
                </p>
                <p className="text-xs text-muted-foreground">Swing Trader</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
