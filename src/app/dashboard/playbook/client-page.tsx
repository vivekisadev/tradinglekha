'use client';
import { useState } from "react";
import { Plus, Search, FileText, Settings, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";

export function PlaybookClientPage() {
  const [activeTab, setActiveTab] = useState('describe');

  return (
    
    <div className="flex h-[calc(100vh-80px)] -mt-6 -mx-8 bg-muted dark:bg-[#09090b]">
      
      {/* Sidebar Library */}
      <div className="w-[340px] border-r border-border bg-card dark:bg-[#111111] flex flex-col">
        <div className="p-6 pb-4 border-b border-border">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Edge Library</h3>
              <h2 className="text-2xl font-bold text-foreground">Playbook</h2>
              <p className="text-xs text-muted-foreground">Strategies and tags</p>
            </div>
            <Button size="sm" className="flex items-center gap-1.5 font-semibold">
              <Plus size={14} /> New
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-4 mb-3 font-semibold">3 strategies • All visible</p>
          <Input 
            placeholder="Search strategies..." 
            icon={Search}
          />
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          
          {/* Active Strategy Card */}
          <div className="border border-indigo-500/50 bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors rounded-xl p-4 cursor-pointer">
            <div className="flex items-start gap-3">
              <div className="text-xs font-bold text-indigo-500 mt-1">01</div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-foreground text-sm">London Breakout</h3>
                  <Badge size="sm" color="indigo">64 trades</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Breakout • London</p>
                <p className="text-xs font-bold text-emerald-500">+$4,545.23 <span className="text-muted-foreground font-medium">· 57.8% win</span></p>
              </div>
            </div>
          </div>

          {/* Inactive Strategy Cards */}
          <div className="border border-border bg-card dark:bg-[#151B2B] hover:bg-muted dark:hover:bg-[#151B2B]/80 rounded-xl p-4 cursor-pointer transition-colors">
            <div className="flex items-start gap-3">
              <div className="text-xs font-bold text-muted-foreground mt-1">02</div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-foreground text-sm">Liquidity Sweep</h3>
                  <Badge size="sm" color="gray">24 trades</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Reversal • Liquidity</p>
                <p className="text-xs font-bold text-emerald-500">+$5,852.91 <span className="text-muted-foreground font-medium">· 100.0% win</span></p>
              </div>
            </div>
          </div>

          <div className="border border-border bg-card dark:bg-[#151B2B] hover:bg-muted dark:hover:bg-[#151B2B]/80 rounded-xl p-4 cursor-pointer transition-colors">
            <div className="flex items-start gap-3">
              <div className="text-xs font-bold text-muted-foreground mt-1">03</div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-foreground text-sm">Trend Continuation</h3>
                  <Badge size="sm" color="gray">32 trades</Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Trend • Pullback</p>
                <p className="text-xs font-bold text-emerald-500">+$1,243.94 <span className="text-muted-foreground font-medium">· 53.1% win</span></p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 lg:p-12">
        <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-500">
          
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">London Breakout</h1>
              <p className="text-sm text-muted-foreground">Updated 29 days ago · 64 tagged trades · <span className="text-indigo-500 font-bold hover:underline cursor-pointer">View tagged trades ↗</span></p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-indigo-500/10 text-indigo-500 text-xs font-bold rounded-full border border-indigo-500/20">2 tags</span>
            </div>
          </div>

          {/* Stepper Tabs */}
          <div className="flex border-b border-border pb-1">
            <div onClick={() => setActiveTab('describe')} className={`flex-1 pb-4 cursor-pointer px-2 rounded-t-lg transition-colors ${activeTab === 'describe' ? 'border-b-2 border-indigo-500' : 'hover:bg-muted dark:hover:bg-[#111111]/50 border-b-2 border-transparent'}`}>
              <p className={`text-xs font-bold mb-1 flex items-center gap-2 ${activeTab === 'describe' ? 'text-indigo-500' : 'text-muted-foreground'}`}>
                <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${activeTab === 'describe' ? 'border-indigo-500' : 'border-zinc-400'}`}>1</span>
                Describe
              </p>
              <p className="text-xs text-muted-foreground font-medium pl-7">setup & context</p>
            </div>
            <div onClick={() => setActiveTab('define')} className={`flex-1 pb-4 cursor-pointer px-2 rounded-t-lg transition-colors ${activeTab === 'define' ? 'border-b-2 border-indigo-500' : 'hover:bg-muted dark:hover:bg-[#111111]/50 border-b-2 border-transparent'}`}>
              <p className={`text-xs font-bold mb-1 flex items-center gap-2 ${activeTab === 'define' ? 'text-indigo-500' : 'text-muted-foreground'}`}>
                <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${activeTab === 'define' ? 'border-indigo-500' : 'border-zinc-400'}`}>2</span>
                Define
              </p>
              <p className="text-xs text-muted-foreground font-medium pl-7">entry and exits</p>
            </div>
            <div onClick={() => setActiveTab('checklist')} className={`flex-1 pb-4 cursor-pointer px-2 rounded-t-lg transition-colors ${activeTab === 'checklist' ? 'border-b-2 border-indigo-500' : 'hover:bg-muted dark:hover:bg-[#111111]/50 border-b-2 border-transparent'}`}>
              <p className={`text-xs font-bold mb-1 flex items-center gap-2 ${activeTab === 'checklist' ? 'text-indigo-500' : 'text-muted-foreground'}`}>
                <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${activeTab === 'checklist' ? 'border-indigo-500' : 'border-zinc-400'}`}>3</span>
                Checklist
              </p>
              <p className="text-xs text-muted-foreground font-medium pl-7">rules to follow</p>
            </div>
            <div onClick={() => setActiveTab('review')} className={`flex-1 pb-4 cursor-pointer px-2 rounded-t-lg transition-colors ${activeTab === 'review' ? 'border-b-2 border-indigo-500' : 'hover:bg-muted dark:hover:bg-[#111111]/50 border-b-2 border-transparent'}`}>
              <p className={`text-xs font-bold mb-1 flex items-center gap-2 ${activeTab === 'review' ? 'text-indigo-500' : 'text-muted-foreground'}`}>
                <span className={`w-5 h-5 rounded-full border flex items-center justify-center ${activeTab === 'review' ? 'border-indigo-500' : 'border-zinc-400'}`}>4</span>
                Review
              </p>
              <p className="text-xs text-muted-foreground font-medium pl-7">tag trades</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-12"
            >
              {activeTab === 'describe' && (
                <>
                  {/* Stats Bar */}
                  <div className="grid grid-cols-5 gap-4 py-4 border-b border-border">
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Net P&L</p>
                      <p className="text-xl font-black text-emerald-500">+$4,545.23</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Win Rate</p>
                      <p className="text-xl font-black text-foreground">57.8%</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Profit Factor</p>
                      <p className="text-xl font-black text-foreground">1.74</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Avg Win</p>
                      <p className="text-xl font-black text-emerald-500">+$288.54</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Avg Loss</p>
                      <p className="text-xl font-black text-rose-500">-$227.06</p>
                    </div>
                  </div>

                  {/* Plan Editor & Recent Trades */}
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">Build your plan</h3>
                        <p className="text-sm text-muted-foreground">Write the conditions, trigger, risk and invalidation rules you want to repeat.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-card dark:bg-zinc-900/40 p-5 rounded-xl border border-border/50 min-h-[160px] shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-foreground">Setup & context</h4>
                            <FileText size={14} className="text-muted-foreground" />
                          </div>
                          <p className="text-xs text-muted-foreground italic mb-2">What conditions must be present?</p>
                          <p className="text-sm text-foreground dark:text-zinc-300">Wait for the first 1 hour of the London session to establish a range.</p>
                        </div>
                        
                        <div className="bg-card dark:bg-zinc-900/40 p-5 rounded-xl border border-border/50 min-h-[160px] shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-foreground">Entry trigger</h4>
                            <FileText size={14} className="text-muted-foreground" />
                          </div>
                          <p className="text-xs text-muted-foreground italic mb-2">What exact signal gets you in?</p>
                          <p className="text-sm text-foreground dark:text-zinc-300">15m candle close outside the established 1h range with volume confirmation.</p>
                        </div>
                      </div>
                    </div>

                    <div className="w-full lg:w-[280px]">
                      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Recent Tagged Trades</h3>
                      <div className="space-y-2">
                        {[
                          { symbol: 'XAUUSD', side: 'Sell', pnl: '+$462.38', date: 'Aug 4' },
                          { symbol: 'BTCUSDT', side: 'Buy', pnl: '+$124.09', date: 'Aug 5' },
                          { symbol: 'NAS100', side: 'Sell', pnl: '+$387.30', date: 'Aug 7' },
                          { symbol: 'EURUSD', side: 'Sell', pnl: '-$329.91', date: 'Aug 12', loss: true },
                        ].map((trade, i) => (
                          <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-card dark:bg-zinc-900/30 border border-border/50 hover:border-indigo-500/50 cursor-pointer group transition-colors">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className={`w-0.5 h-4 ${trade.loss ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                                <span className="font-bold text-foreground text-sm">{trade.symbol}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${trade.side === 'Buy' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>{trade.side}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`font-mono text-sm font-bold ${trade.loss ? 'text-rose-500' : 'text-foreground'}`}>{trade.pnl}</p>
                              <p className="text-[10px] text-muted-foreground">{trade.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'define' && (
                <div className="p-8 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
                  Define your exact entry criteria, stop loss placement, and take profit targets here.
                </div>
              )}

              {activeTab === 'checklist' && (
                <div className="p-8 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
                  Create a pre-trade checklist to ensure you don't break your rules.
                </div>
              )}

              {activeTab === 'review' && (
                <div className="p-8 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
                  Filter and review all trades tagged with this strategy to evaluate performance.
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          
        </div>
      </div>
    </div>
  );
}
