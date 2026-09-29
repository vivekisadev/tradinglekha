'use client';
import { useState } from "react";
import { Zap, AlertTriangle, ChevronRight, TrendingUp, Target, Activity, CheckCircle2, XCircle, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import Link from "next/link";
import { EquityChart } from "@/components/equity-chart";
import { MagicCard } from "@/components/ui/magic-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, type Variants } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const winLossData = [
  { name: 'Wins', value: 68 },
  { name: 'Losses', value: 32 },
];
const COLORS = ['#10b981', '#f43f5e'];

const recentTrades = [
  { id: 1, ticker: "NVDA", company: "NVIDIA Corp", setup: "VWAP Reclaim", side: "Long", entry: 482.10, exit: 491.50, pnl: 1410.00, time: "2 hours ago" },
  { id: 2, ticker: "TSLA", company: "Tesla, Inc", setup: "Gap & Go", side: "Short", entry: 242.15, exit: 245.50, pnl: -335.00, time: "Yesterday" },
  { id: 3, ticker: "SPY", company: "S&P 500 ETF", setup: "Breakout", side: "Long", entry: 450.02, exit: null, pnl: 820.40, time: "Yesterday" },
  { id: 4, ticker: "AAPL", company: "Apple Inc.", setup: "Support Bounce", side: "Long", entry: 175.25, exit: 178.40, pnl: 420.00, time: "2 days ago" },
  { id: 5, ticker: "AMD", company: "Advanced Micro", setup: "VWAP Reclaim", side: "Long", entry: 105.10, exit: 108.20, pnl: 620.00, time: "2 days ago" },
  { id: 6, ticker: "META", company: "Meta Platforms", setup: "Mean Reversion", side: "Short", entry: 300.50, exit: 295.20, pnl: 1060.00, time: "3 days ago" },
];

export default function Home() {
  const [timeframe, setTimeframe] = useState<'90D' | '30D' | '7D'>('90D');

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12">
      
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div variants={item} className="h-full">
          <MagicCard className="p-5 h-full flex flex-col justify-between group bg-card">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                <TrendingUp size={14} className="text-emerald-500" /> Net P/L
              </p>
              <div className="text-3xl font-bold text-foreground">$12,450.20</div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-500/10 w-fit px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-500/20">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              +12.4% this month
            </div>
          </MagicCard>
        </motion.div>

        <motion.div variants={item} className="h-full">
          <MagicCard className="p-5 h-full flex flex-col justify-between group bg-card" glowColor="rgba(16, 185, 129, 0.2)">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                <Activity size={14} className="text-blue-500" /> Today's P/L
              </p>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">+$450.00</div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
              3 trades executed today
            </div>
          </MagicCard>
        </motion.div>

        <motion.div variants={item} className="h-full">
          <MagicCard className="p-5 h-full flex flex-col justify-between group bg-card" glowColor="rgba(99, 102, 241, 0.15)">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                <Target size={14} className="text-indigo-500" /> Win Rate
              </p>
              <div className="text-3xl font-bold text-foreground">68.4%</div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "68.4%" }} 
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-indigo-500 dark:bg-indigo-400 h-1.5 rounded-full" 
                />
              </div>
            </div>
          </MagicCard>
        </motion.div>

        <motion.div variants={item} className="h-full grid grid-cols-2 gap-4">
          <MagicCard className="p-4 flex flex-col justify-center items-center text-center bg-card">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Avg R</p>
            <div className="text-2xl font-bold text-foreground">2.4</div>
          </MagicCard>
          <MagicCard className="p-4 flex flex-col justify-center items-center text-center bg-card">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Profit Factor</p>
            <div className="text-2xl font-bold text-foreground">1.85</div>
          </MagicCard>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cumulative Equity Chart */}
        <motion.div variants={item} className="lg:col-span-2">
          <MagicCard className="p-6 h-full flex flex-col bg-card">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground tracking-tight">Cumulative Equity</h2>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Realized returns over the selected period</p>
              </div>
              <div className="flex bg-secondary p-1 rounded-lg border border-border">
                <button 
                  onClick={() => setTimeframe('90D')}
                  className={`px-3 py-1 text-xs font-semibold rounded shadow-sm transition-all ${timeframe === '90D' ? 'bg-card text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>90D</button>
                <button 
                  onClick={() => setTimeframe('30D')}
                  className={`px-3 py-1 text-xs font-semibold rounded shadow-sm transition-all ${timeframe === '30D' ? 'bg-card text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>30D</button>
                <button 
                  onClick={() => setTimeframe('7D')}
                  className={`px-3 py-1 text-xs font-semibold rounded shadow-sm transition-all ${timeframe === '7D' ? 'bg-card text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>7D</button>
              </div>
            </div>
            
            <div className="h-72 w-full mt-auto">
              <EquityChart timeframe={timeframe} />
            </div>
          </MagicCard>
        </motion.div>

        {/* Win / Loss Pie Chart */}
        <motion.div variants={item}>
          <MagicCard className="p-6 h-full flex flex-col bg-card" glowColor="rgba(16, 185, 129, 0.15)">
            <div className="flex items-center justify-between mb-4">
               <h2 className="text-lg font-semibold text-foreground tracking-tight">Win / Loss Ratio</h2>
               <Target size={18} className="text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mb-6 font-medium">Distribution of closed trades (last 90 days)</p>
            
            <div className="flex-1 min-h-[200px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={winLossData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {winLossData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '12px' }}
                     itemStyle={{ color: 'var(--foreground)', fontWeight: 'bold' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                 <div className="text-2xl font-bold text-foreground tracking-tighter">2.1</div>
                 <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Ratio</div>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                 <span className="text-xs font-medium text-muted-foreground">Wins (68%)</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                 <span className="text-xs font-medium text-muted-foreground">Losses (32%)</span>
              </div>
            </div>
          </MagicCard>
        </motion.div>
      </div>

      {/* Sleek Fading List (Recent Activity) */}
      <motion.div variants={item}>
        <MagicCard className="flex flex-col bg-card w-full h-[400px]">
          <div className="p-6 pb-4 border-b border-border/50 flex items-center justify-between z-20 bg-card">
            <h3 className="text-lg font-semibold text-foreground tracking-tight">Recent Activity</h3>
            <Link href="/dashboard/journal" className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center transition-colors">
              View Journal <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
          
          <div className="relative flex-1">
            {/* Fade overlay top */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-card to-transparent pointer-events-none z-10" />
            
            <ScrollArea className="w-full h-[320px]">
              <div className="px-6 py-4 flex flex-col gap-2">
                {recentTrades.map((trade) => (
                  <Link href={`/dashboard/journal?trade=${trade.id}`} key={trade.id}>
                    <div className="group flex items-center justify-between p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-border/50">
                      
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${trade.pnl >= 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          {trade.pnl >= 0 ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-foreground">{trade.ticker}</h4>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{trade.setup}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                            <span className="font-medium">{trade.side}</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span>{trade.entry} &rarr; {trade.exit || 'Open'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className={`text-sm font-bold ${trade.pnl >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {trade.pnl >= 0 ? '+' : ''}${Math.abs(trade.pnl).toFixed(2)}
                          </div>
                          <div className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground mt-0.5 font-medium">
                            <Clock size={10} /> {trade.time}
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 transition-transform" />
                      </div>
                      
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>

            {/* Fade overlay bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent pointer-events-none z-10" />
          </div>
        </MagicCard>
      </motion.div>
      
    </motion.div>
  );
}
