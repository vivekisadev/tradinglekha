"use client";

import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function EquityChart({ timeframe = '90D', trades = [] }: { timeframe?: '90D' | '30D' | '7D', trades?: any[] }) {
  const chartData = useMemo(() => {
    if (!trades || trades.length === 0) return [];

    const now = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;
    const daysLimit = timeframe === '7D' ? 7 : timeframe === '30D' ? 30 : 90;
    const cutoffDate = new Date(now.getTime() - daysLimit * msPerDay);

    const validTrades = trades.filter(t => new Date(t.closedAt || t.openedAt) >= cutoffDate);
    
    // Sort chronologically
    validTrades.sort((a, b) => new Date(a.closedAt || a.openedAt).getTime() - new Date(b.closedAt || b.openedAt).getTime());

    // Group by day and calculate daily PnL
    const dailyPnL: Record<string, number> = {};
    validTrades.forEach(t => {
      const dateStr = new Date(t.closedAt || t.openedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (!dailyPnL[dateStr]) dailyPnL[dateStr] = 0;
      dailyPnL[dateStr] += Number(t.realizedPnl) || 0;
    });

    let cumulative = 0;
    const result = Object.keys(dailyPnL).map(date => {
      cumulative += dailyPnL[date];
      return { date, equity: cumulative };
    });

    return result;
  }, [timeframe, trades]);

  if (chartData.length === 0) {
    return <div className="flex items-center justify-center h-full text-sm text-muted-foreground font-medium border border-dashed border-border rounded-xl">Not enough trade data to display chart</div>;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={chartData}
        margin={{
          top: 5,
          right: 5,
          left: -20,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
        <XAxis 
          dataKey="date" 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: '#888888' }}
          dy={10}
        />
        <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: '#888888' }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '12px', color: 'var(--foreground)' }}
          itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
          formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Net PnL']}
        />
        <Line 
          type="monotone" 
          dataKey="equity" 
          stroke="#10b981" 
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6, fill: '#10b981', stroke: 'var(--card)', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
