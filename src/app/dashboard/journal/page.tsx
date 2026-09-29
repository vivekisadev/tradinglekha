'use client';
import { useState, useEffect } from "react";
import { Filter, BookOpen, Trash2, FileText, ChevronDown, ChevronUp, TrendingUp, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function JournalContent() {
  const searchParams = useSearchParams();
  const tradeParam = searchParams.get('trade');
  
  const [expandedId, setExpandedId] = useState<string | null>(tradeParam);
  const [trades, setTrades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // When trade param changes, update expanded id
  useEffect(() => {
    if (tradeParam) {
      setExpandedId(tradeParam);
      // Wait for UI to render
      setTimeout(() => {
        const el = document.getElementById(`trade-${tradeParam}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 500);
    }
  }, [tradeParam]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const res = await fetch('/api/trades');
        const data = await res.json();
        if (Array.isArray(data)) {
          setTrades(data);
        }
      } catch (error) {
        console.error("Failed to fetch trades", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrades();
  }, []);

  const toggle = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  // Group trades by date
  const groupedTrades = trades.reduce((acc: any, trade: any) => {
    const date = new Date(trade.openedAt).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    if (!acc[date]) acc[date] = [];
    acc[date].push(trade);
    return acc;
  }, {});

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Trade Journal</h1>
          <p className="text-muted-foreground text-sm mt-1">Review your trade logs, performance, and insights.</p>
        </div>
        <div className="flex gap-3">
          <Button className="font-medium text-foreground bg-secondary hover:bg-secondary/80 border border-border">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button className="font-medium flex items-center bg-primary text-primary-foreground hover:bg-primary/90">
            <BookOpen size={16} className="mr-2" />
            <span>New Entry</span>
          </Button>
        </div>
      </div>

      {/* Diary Entries List */}
      <div className="space-y-10">
        
        {loading ? (
           <div className="flex items-center justify-center py-20 text-muted-foreground">Loading trades...</div>
        ) : trades.length === 0 ? (
           <div className="flex items-center justify-center py-20 text-muted-foreground">No trades found. Start logging!</div>
        ) : (
          Object.keys(groupedTrades).map(dateStr => (
            <section key={dateStr} aria-label={`Entries for ${dateStr}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-medium text-foreground">{dateStr}</h2>
                  <Badge size="sm" color="gray" className="bg-secondary text-secondary-foreground">
                    {groupedTrades[dateStr].length} trades
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                {groupedTrades[dateStr].map((trade: any) => (
                  <div key={trade.id} id={`trade-${trade.id}`} className={`rounded-xl border border-border bg-card p-5 transition-all duration-200 shadow-sm ${expandedId === trade.id ? 'ring-1 ring-border shadow-md' : 'hover:shadow-md'}`}>
                    <div className="flex gap-4 cursor-pointer" onClick={() => toggle(trade.id)}>
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 border ${Number(trade.realizedPnl) >= 0 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'}`}>
                        {Number(trade.realizedPnl) >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
                      </div>
                      
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-lg font-bold text-foreground">{trade.symbol}</span>
                          <Badge size="sm" color={trade.side === 'LONG' ? 'indigo' : 'orange'} className="bg-secondary">
                            {trade.side}
                          </Badge>
                        </div>
                        <p className={`text-sm text-muted-foreground leading-relaxed ${expandedId === trade.id ? '' : 'line-clamp-2'}`}>
                          {trade.aiAnalysis || `Trade executed at ${trade.entryPrice} and exited at ${trade.exitPrice || 'Open'}. Net PnL: ${Number(trade.realizedPnl) >= 0 ? '+' : ''}$${Math.abs(Number(trade.realizedPnl)).toFixed(2)}`}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end justify-center shrink-0">
                        <span className={`text-lg font-bold ${Number(trade.realizedPnl) >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                          {Number(trade.realizedPnl) >= 0 ? '+' : '-'}${Math.abs(Number(trade.realizedPnl)).toFixed(2)}
                        </span>
                        <button className="text-muted-foreground hover:text-foreground pt-2 transition-colors">
                          {expandedId === trade.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                      </div>
                    </div>

                    <AnimatePresence>
                      {expandedId === trade.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="mt-6 pt-6 border-t border-border space-y-6">
                            
                            <h3 className="text-sm font-bold text-foreground mb-4">Trade Details</h3>
                            <div className="rounded-xl border border-border bg-secondary p-5 shadow-inner">
                              <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center font-bold text-xs text-foreground shadow-sm">{trade.symbol}</div>
                                <span className="px-2.5 py-1 rounded-md bg-card text-foreground text-xs font-bold border border-border">{trade.status}</span>
                                <div className="ml-auto text-xs font-medium text-muted-foreground">
                                  {new Date(trade.openedAt).toLocaleTimeString()}
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                                <div className="flex flex-col gap-1.5">
                                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Entry Price</div>
                                  <div className="text-foreground font-medium">${trade.entryPrice}</div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Exit Price</div>
                                  <div className="text-foreground font-medium">{trade.exitPrice ? `$${trade.exitPrice}` : 'Open'}</div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Asset Class</div>
                                  <div className="text-foreground font-medium">{trade.assetClass}</div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Mistakes</div>
                                  <div className="text-foreground font-medium">{trade.mistakes && trade.mistakes.length > 0 ? trade.mistakes.join(', ') : 'None logged'}</div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}

export default function JournalPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-muted-foreground">Loading Journal...</div>}>
      <JournalContent />
    </Suspense>
  );
}
