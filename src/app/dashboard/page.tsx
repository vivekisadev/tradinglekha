'use client';
import { useState, useEffect } from "react";
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

const COLORS = ['#10b981', '#f43f5e'];

export default function Home() {
  const [timeframe, setTimeframe] = useState<'90D' | '30D' | '7D'>('90D');
  const [currency, setCurrency] = useState('USD');
  const [stats, setStats] = useState<any>(null);
  const [trades, setTrades] = useState<any[]>([]);

  // Ideally this comes from a global AuthProvider
  const isPro = true; 
  
  // Fetch dynamic stats and trades from our new API route
  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await fetch(`/api/trades/stats?currency=${currency}`);
        const statsData = await statsRes.json();
        if (statsData && !statsData.error) {
          setStats(statsData);
        }

        const tradesRes = await fetch(`/api/trades`);
        const tradesData = await tradesRes.json();
        if (Array.isArray(tradesData)) {
          // Filter by currency
          const filteredTrades = tradesData.filter((t: any) => t.currency === currency);
          setTrades(filteredTrades);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, [currency]);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 pb-12">
      
      {/* Multi-Currency Toggle for Pro Users */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard Overview</h1>
        {isPro ? (
          <div className="flex items-center gap-2 bg-secondary p-1 rounded-lg border border-border">
             <button onClick={() => setCurrency('USD')} className={`px-4 py-1.5 text-xs font-bold rounded shadow-sm transition-all ${currency === 'USD' ? 'bg-card text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>USD</button>
             <button onClick={() => setCurrency('INR')} className={`px-4 py-1.5 text-xs font-bold rounded shadow-sm transition-all ${currency === 'INR' ? 'bg-card text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>INR</button>
          </div>
        ) : (
          <div className="px-4 py-1.5 text-xs font-bold rounded bg-secondary text-muted-foreground border border-border">
            {currency} (Free Plan Locked)
          </div>
        )}
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div variants={item} className="h-full">
          <MagicCard className="p-5 h-full flex flex-col justify-between group bg-card">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                <TrendingUp size={14} className="text-emerald-500" /> Net P/L
              </p>
              <div className="text-3xl font-bold text-foreground">
                {currency === 'USD' ? '$' : '₹'}{stats ? stats.netProfit.toLocaleString() : '0.00'}
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-medium bg-emerald-50 dark:bg-emerald-500/10 w-fit px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-500/20">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              Updated Automatically
            </div>
          </MagicCard>
        </motion.div>

        <motion.div variants={item} className="h-full">
          <MagicCard className="p-5 h-full flex flex-col justify-between group bg-card" glowColor="rgba(16, 185, 129, 0.2)">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                <Activity size={14} className="text-blue-500" /> Gross Profit
              </p>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                +{currency === 'USD' ? '$' : '₹'}{stats ? stats.grossProfit.toLocaleString() : '0.00'}
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground font-medium flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
              {stats ? stats.totalTrades : 0} Total Trades
            </div>
          </MagicCard>
        </motion.div>

        <motion.div variants={item} className="h-full">
          <MagicCard className="p-5 h-full flex flex-col justify-between group bg-card" glowColor="rgba(99, 102, 241, 0.15)">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                <Target size={14} className="text-indigo-500" /> Win Rate
              </p>
              <div className="text-3xl font-bold text-foreground">{stats ? stats.winRate : '0.0'}%</div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-secondary rounded-full h-1.5 overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${stats ? stats.winRate : 0}%` }} 
                  transition={{ duration: 1, delay: 0.5 }}
                  className="bg-indigo-500 dark:bg-indigo-400 h-1.5 rounded-full" 
                />
              </div>
            </div>
          </MagicCard>
        </motion.div>

        <motion.div variants={item} className="h-full grid grid-cols-2 gap-4">
          <MagicCard className="p-4 flex flex-col justify-center items-center text-center bg-card">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Gross Loss</p>
            <div className="text-sm font-bold text-rose-500">
               -{currency === 'USD' ? '$' : '₹'}{stats ? stats.grossLoss.toLocaleString() : '0.00'}
            </div>
          </MagicCard>
          <MagicCard className="p-4 flex flex-col justify-center items-center text-center bg-card">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Profit Factor</p>
            <div className="text-2xl font-bold text-foreground">{stats ? stats.profitFactor : '0.00'}</div>
          </MagicCard>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cumulative Equity Chart */}
        <motion.div variants={item} className="lg:col-span-2">
          <MagicCard className="p-6 h-full flex flex-col bg-card">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground tracking-tight">Cumulative Equity ({currency})</h2>
                <p className="text-xs text-muted-foreground mt-1 font-medium">Realized returns strictly in {currency}</p>
              </div>
              <div className="flex bg-secondary p-1 rounded-lg border border-border">
                <button onClick={() => setTimeframe('90D')} className={`px-3 py-1 text-xs font-semibold rounded shadow-sm transition-all ${timeframe === '90D' ? 'bg-card text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>90D</button>
                <button onClick={() => setTimeframe('30D')} className={`px-3 py-1 text-xs font-semibold rounded shadow-sm transition-all ${timeframe === '30D' ? 'bg-card text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>30D</button>
                <button onClick={() => setTimeframe('7D')} className={`px-3 py-1 text-xs font-semibold rounded shadow-sm transition-all ${timeframe === '7D' ? 'bg-card text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>7D</button>
              </div>
            </div>
            <div className="h-72 w-full mt-auto">
              <EquityChart timeframe={timeframe} trades={trades} />
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
            <p className="text-xs text-muted-foreground mb-6 font-medium">Distribution of closed {currency} trades</p>
            
            <div className="flex-1 min-h-[200px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Wins', value: stats ? Number(stats.winRate) : 50 },
                      { name: 'Losses', value: stats ? 100 - Number(stats.winRate) : 50 }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {[0,1].map((entry, index) => (
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
                 <div className="text-2xl font-bold text-foreground tracking-tighter">{stats ? stats.profitFactor : '0.00'}</div>
                 <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">P. Factor</div>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                 <span className="text-xs font-medium text-muted-foreground">Wins</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                 <span className="text-xs font-medium text-muted-foreground">Losses</span>
              </div>
            </div>
          </MagicCard>
        </motion.div>
      </div>

      <motion.div variants={item}>
        <MagicCard className="flex flex-col bg-card w-full h-[400px]">
          <div className="p-6 pb-4 border-b border-border/50 flex items-center justify-between z-20 bg-card">
            <h3 className="text-lg font-semibold text-foreground tracking-tight">Recent {currency} Activity</h3>
            <Link href="/dashboard/journal" className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center transition-colors">
              View Journal <ChevronRight size={14} className="ml-1" />
            </Link>
          </div>
          <div className="relative flex-1">
            <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-card to-transparent pointer-events-none z-10" />
            <ScrollArea className="w-full h-[320px]">
              <div className="px-6 py-4 flex flex-col gap-2">
                {trades.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground py-8">No recent activity</div>
                ) : trades.slice(0, 10).map((trade) => (
                  <Link href={`/dashboard/journal?trade=${trade.id}`} key={trade.id}>
                    <div className="group flex items-center justify-between p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer border border-transparent hover:border-border/50">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${trade.realizedPnl >= 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          {trade.realizedPnl >= 0 ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-foreground">{trade.symbol}</h4>
                            {trade.setup && <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{trade.setup}</span>}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                            <span className="font-medium">{trade.side}</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span>{trade.entryPrice} &rarr; {trade.exitPrice || 'Open'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className={`text-sm font-bold ${trade.realizedPnl >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                            {trade.realizedPnl >= 0 ? '+' : ''}{currency === 'USD' ? '$' : '₹'}{Math.abs(trade.realizedPnl || 0).toFixed(2)}
                          </div>
                          <div className="flex items-center justify-end gap-1 text-[10px] text-muted-foreground mt-0.5 font-medium">
                            <Clock size={10} /> {new Date(trade.closedAt || trade.openedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <ChevronRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card to-transparent pointer-events-none z-10" />
          </div>
        </MagicCard>
      </motion.div>
    </motion.div>
  );
}
