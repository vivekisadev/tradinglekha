
"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const allData = [
  { date: 'Jul 1', equity: 28400 },
  { date: 'Jul 8', equity: 29100 },
  { date: 'Jul 15', equity: 28800 },
  { date: 'Jul 22', equity: 31200 },
  { date: 'Jul 29', equity: 30800 },
  { date: 'Aug 5', equity: 33400 },
  { date: 'Aug 12', equity: 35100 },
  { date: 'Aug 19', equity: 34200 },
  { date: 'Aug 26', equity: 36800 },
  { date: 'Sep 2', equity: 38900 },
  { date: 'Sep 9', equity: 40100 },
  { date: 'Sep 16', equity: 39500 },
  { date: 'Sep 23', equity: 41812 },
];

export function EquityChart({ timeframe = '90D' }: { timeframe?: '90D' | '30D' | '7D' }) {
  const data = timeframe === '7D' 
    ? allData.slice(-3) 
    : timeframe === '30D' 
      ? allData.slice(-5) 
      : allData;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
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
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <Tooltip 
          contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '12px', color: 'var(--foreground)' }}
          itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
          formatter={(value: any) => [`$${value.toLocaleString()}`, 'Equity']}
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
