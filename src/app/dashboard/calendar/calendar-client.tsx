'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, subMonths, addMonths, isToday, parseISO } from 'date-fns';
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/animated-counter';

export function CalendarClient({ trades }: { trades: any[] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Calculate day stats
  const getDayStats = (date: Date) => {
    const dayTrades = trades.filter(t => isSameDay(new Date(t.openedAt), date));
    if (dayTrades.length === 0) return null;

    const totalPnl = dayTrades.reduce((sum, t) => sum + (Number(t.realizedPnl) || 0), 0);
    const wins = dayTrades.filter(t => (Number(t.realizedPnl) || 0) > 0).length;
    const losses = dayTrades.filter(t => (Number(t.realizedPnl) || 0) < 0).length;
    
    return {
      totalPnl,
      trades: dayTrades,
      winRate: dayTrades.length > 0 ? (wins / dayTrades.length) * 100 : 0,
      wins,
      losses
    };
  };

  const selectedStats = selectedDate ? getDayStats(selectedDate) : null;

  return (
    <div className="flex flex-col xl:flex-row gap-6 items-start animate-in fade-in zoom-in-95 duration-500">
      
      {/* Left: The Heatmap Calendar */}
      <div className="w-full xl:w-2/3 bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{format(currentDate, 'MMMM yyyy')}</h2>
            <p className="text-muted-foreground text-sm">PnL Heatmap</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Days of week */}
        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-muted-foreground uppercase tracking-wider">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 md:gap-3">
          {/* Empty offset days */}
          {Array.from({ length: monthStart.getDay() }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square opacity-0" />
          ))}

          {/* Actual days */}
          {daysInMonth.map(day => {
            const stats = getDayStats(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            
            // Heatmap color logic
            let bgClass = "bg-secondary/50 dark:bg-white/5 border border-transparent";
            let textClass = "text-foreground";
            if (stats) {
              if (stats.totalPnl > 0) {
                bgClass = "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400";
              } else if (stats.totalPnl < 0) {
                bgClass = "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400";
              } else {
                bgClass = "bg-zinc-500/10 border-zinc-500/30";
              }
            }

            if (isSelected) {
              bgClass += " ring-2 ring-sky-500 ring-offset-2 ring-offset-card";
            }

            return (
              <button 
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                className={`aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all hover:scale-105 cursor-pointer ${bgClass}`}
              >
                <span className={`text-sm font-bold ${textClass}`}>
                  {format(day, 'd')}
                </span>
                
                {stats && (
                  <span className={`text-[10px] font-semibold mt-1 hidden md:block ${stats.totalPnl > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stats.totalPnl > 0 ? '+' : ''}${Math.abs(stats.totalPnl).toFixed(0)}
                  </span>
                )}
                
                {isToday(day) && (
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-sky-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Right: Selected Day Details Panel */}
      <div className="w-full xl:w-1/3 bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-6">
        <h3 className="text-xl font-bold text-foreground mb-1">
          {selectedDate ? format(selectedDate, 'EEEE, MMM do') : 'Select a date'}
        </h3>
        
        {!selectedStats ? (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground mt-4 border-2 border-dashed border-border rounded-xl">
            <Clock size={32} className="mb-2 opacity-20" />
            <p>No trades logged on this day.</p>
          </div>
        ) : (
          <div className="mt-6">
            {/* Daily Summary */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-secondary p-4 rounded-xl">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Net PnL</p>
                <div className={`text-2xl font-black ${selectedStats.totalPnl >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  <AnimatedCounter 
                    value={Math.abs(selectedStats.totalPnl)} 
                    prefix={selectedStats.totalPnl >= 0 ? '+$' : '-$'} 
                    decimals={2} 
                  />
                </div>
              </div>
              <div className="bg-secondary p-4 rounded-xl">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Win Rate</p>
                <div className="text-2xl font-black text-foreground">
                  <AnimatedCounter value={selectedStats.winRate} suffix="%" decimals={0} />
                </div>
                <div className="text-xs text-muted-foreground mt-1 font-medium">
                  {selectedStats.wins}W - {selectedStats.losses}L
                </div>
              </div>
            </div>

            {/* Trades List */}
            <h4 className="text-sm font-bold text-foreground mb-3 border-b border-border pb-2">Trade History</h4>
            <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2" data-lenis-prevent="true">
              {selectedStats.trades.map((trade: any) => (
                <div key={trade.id} className="p-3 bg-secondary/50 border border-border rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${trade.side === 'LONG' ? 'bg-sky-500/10 text-sky-500' : 'bg-orange-500/10 text-orange-500'}`}>
                      {trade.side === 'LONG' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{trade.symbol}</div>
                      <div className="text-xs text-muted-foreground">{format(new Date(trade.openedAt), 'h:mm a')}</div>
                    </div>
                  </div>
                  <div className={`font-bold ${Number(trade.realizedPnl) >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {Number(trade.realizedPnl) >= 0 ? '+' : '-'}${Math.abs(Number(trade.realizedPnl)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}
