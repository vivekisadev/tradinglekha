import { BarChart3, TrendingUp, Calendar, Filter, PieChart, Activity } from "lucide-react";
import { AnimatedBarChart } from "@/components/animated-bar-chart";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Analytics</h1>
          <p className="text-muted-foreground text-sm mt-1">Deep dive into your performance metrics and trading edge.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-all shadow-sm">
            <Calendar size={16} />
            <span>This Month</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:bg-secondary transition-all shadow-sm">
            <Filter size={16} />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-border no-scrollbar">
        <div className="flex space-x-6 px-1">
          <button className="py-3 text-sm font-medium text-primary border-b-2 border-primary whitespace-nowrap">Overview</button>
          <button className="py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Setups & Strategy</button>
          <button className="py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Timing</button>
          <button className="py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Execution</button>
          <button className="py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">Psychology</button>
        </div>
      </div>

      <div className="space-y-6">
        
        {/* KPI Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="text-muted-foreground text-xs font-medium mb-1">Net P&L</div>
            <div className="text-xl font-semibold text-emerald-600 dark:text-emerald-400">+$14,250</div>
            <div className="text-xs text-muted-foreground mt-2">12 green / 4 red days</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="text-muted-foreground text-xs font-medium mb-1">Max Drawdown</div>
            <div className="text-xl font-semibold text-rose-600 dark:text-rose-400">-$2,100</div>
            <div className="text-xs text-muted-foreground mt-2">Deepest on Sep 14</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="text-muted-foreground text-xs font-medium mb-1">Profit Factor</div>
            <div className="text-xl font-semibold text-foreground">2.14</div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">Excellent</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
            <div className="text-muted-foreground text-xs font-medium mb-1">Win Rate</div>
            <div className="text-xl font-semibold text-foreground">64.5%</div>
            <div className="text-xs text-muted-foreground mt-2">Based on 48 trades</div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-foreground">Equity Curve</h3>
                <p className="text-xs text-muted-foreground mt-1">Cumulative net P&L</p>
              </div>
              <Activity className="text-muted-foreground" size={18} />
            </div>
            <div className="h-64 border border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground bg-secondary/20">
               <Activity className="w-8 h-8 mb-2 opacity-50" />
               <span className="text-sm">Chart Placeholder</span>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-semibold text-foreground">Drawdown</h3>
                <p className="text-xs text-muted-foreground mt-1">Distance below peak equity</p>
              </div>
              <TrendingUp className="text-muted-foreground" size={18} />
            </div>
            <div className="h-64 border border-dashed border-border rounded-lg flex flex-col items-center justify-center text-muted-foreground bg-secondary/20">
               <TrendingUp className="w-8 h-8 mb-2 opacity-50" />
               <span className="text-sm">Chart Placeholder</span>
            </div>
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between bg-card">
            <div>
              <h3 className="font-semibold text-foreground">Monthly Performance</h3>
            </div>
            <div className="flex bg-secondary p-1 rounded-lg border border-border">
              <button className="px-3 py-1 text-xs font-medium rounded-md bg-card text-foreground shadow-sm">Bars</button>
              <button className="px-3 py-1 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground">Table</button>
            </div>
          </div>
          
          <div className="p-6">
            <AnimatedBarChart 
              data={[
                { name: 'Apr', value: 44.2, color: 'bg-muted' },
                { name: 'May', value: 55.0, color: 'bg-orange-400' },
                { name: 'Jun', value: 60.3, color: 'bg-muted-foreground/20' },
                { name: 'Jul', value: 64.1, color: 'bg-muted-foreground/20' },
                { name: 'Aug', value: 67.5, color: 'bg-orange-400' },
                { name: 'Sep', value: 70.2, color: 'bg-muted-foreground/20' },
                { name: 'Oct', value: 76.4, color: 'bg-orange-400' },
                { name: 'Nov', value: 95.1, highlight: true }
              ]}
              height={320}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
