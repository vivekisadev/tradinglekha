"use client";
import { motion } from "framer-motion";
import { ShieldAlert, Target, Activity, CheckCircle2, AlertTriangle, XCircle, TrendingUp, AlertOctagon } from "lucide-react";
import { Badge } from "@/components/base/badges/badges";

export default function DisciplineBoardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground flex items-center gap-3">
            <Target className="text-indigo-500" size={28} />
            Discipline Board
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Track your rule-following behavior and maintain trading consistency.</p>
        </div>
        <Badge size="md" color="indigo" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 font-bold uppercase tracking-wider px-4">
          Current Tier: Elite Disciplined
        </Badge>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Score Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 shadow-lg overflow-hidden border border-indigo-400/30">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 opacity-20 pointer-events-none">
            <Target size={120} className="text-white" />
          </div>
          <h3 className="text-indigo-100 font-semibold uppercase tracking-widest text-xs mb-2">Overall Discipline</h3>
          <div className="flex items-end gap-2 mb-4">
            <div className="text-5xl font-black text-white tracking-tighter">92</div>
            <div className="text-indigo-200 font-medium pb-1.5">/ 100</div>
          </div>
          <div className="w-full bg-black/20 rounded-full h-2 mb-2 overflow-hidden backdrop-blur-sm">
            <motion.div initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="bg-white h-full rounded-full" />
          </div>
          <p className="text-indigo-100 text-sm font-medium">Top 5% of all traders this week</p>
        </motion.div>

        {/* Anomalies Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-amber-500" size={16} />
              <h3 className="text-muted-foreground font-semibold uppercase tracking-widest text-xs">Anomalies Flagged</h3>
            </div>
            <div className="text-4xl font-black text-amber-500">2</div>
          </div>
          <p className="text-sm text-muted-foreground font-medium mt-4">Outsized losses detected in the last 7 days.</p>
        </motion.div>

        {/* Rules Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="text-emerald-500" size={16} />
              <h3 className="text-muted-foreground font-semibold uppercase tracking-widest text-xs">Rules Broken</h3>
            </div>
            <div className="text-4xl font-black text-emerald-500">0</div>
          </div>
          <p className="text-sm text-muted-foreground font-medium mt-4">Stop losses respected flawlessly.</p>
        </motion.div>
      </div>

      {/* Actionable Insights & History */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Activity size={20} className="text-muted-foreground" />
            Recent Behavioral Anomalies
          </h2>
          
          <div className="space-y-3">
            <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-card border border-border rounded-xl hover:border-amber-500/50 hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                  <AlertOctagon size={20} className="text-amber-500" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Outsized Risk Warning</h4>
                  <p className="text-sm text-muted-foreground mt-1">Trade on NIFTY50 exceeded your maximum 2% risk threshold. Actual risk taken: 3.5%.</p>
                </div>
              </div>
              <div className="text-xs font-semibold text-muted-foreground bg-secondary px-3 py-1.5 rounded-full shrink-0">
                2 days ago
              </div>
            </div>

            <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-card border border-border rounded-xl hover:border-amber-500/50 hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0">
                  <Activity size={20} className="text-amber-500" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Overtrading Detected</h4>
                  <p className="text-sm text-muted-foreground mt-1">Multiple entries within 5 minutes after a stopped-out position. Potential revenge trading.</p>
                </div>
              </div>
              <div className="text-xs font-semibold text-muted-foreground bg-secondary px-3 py-1.5 rounded-full shrink-0">
                4 days ago
              </div>
            </div>
            
            <div className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-card border border-border rounded-xl hover:border-emerald-500/50 hover:shadow-md transition-all">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={20} className="text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Perfect Execution</h4>
                  <p className="text-sm text-muted-foreground mt-1">Held TSLA winner until profit target. No premature exit.</p>
                </div>
              </div>
              <div className="text-xs font-semibold text-muted-foreground bg-secondary px-3 py-1.5 rounded-full shrink-0">
                1 week ago
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2 mb-4">
            <TrendingUp size={20} className="text-muted-foreground" />
            AI Coach Feedback
          </h2>
          <div className="bg-gradient-to-b from-card to-secondary/20 border border-border rounded-2xl p-6 shadow-sm">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  What you're doing right
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your discipline in respecting stop losses is phenomenal. Over the last 30 trades, you haven't moved a stop loss further away once. This alone is keeping you in the top tier.
                </p>
              </div>
              <div className="h-px bg-border w-full" />
              <div>
                <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  Area of Improvement
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  You tend to size up after a string of losses. The NIFTY50 trade 2 days ago was a 3.5% risk immediately following two losers. Try walking away after 2 consecutive losses.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
