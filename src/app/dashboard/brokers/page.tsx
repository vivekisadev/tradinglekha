'use client';
import { useState } from "react";
import { Download, Copy, Eye, Plug, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/base/input/input";

export default function BrokersPage() {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-10 animate-in fade-in zoom-in-95 duration-500 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Connected accounts</h1>
        <p className="text-muted-foreground">Manage your broker connections, APIs, and CSV imports.</p>
      </div>

      {/* MetaTrader EA Sync Setup */}
      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Plug className="text-indigo-500" size={24} />
              <h2 className="text-xl font-bold text-foreground">MetaTrader EA Sync</h2>
            </div>
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">Recommended</span>
          </div>
          <p className="text-muted-foreground text-sm">Sync your trades instantly directly from MT4/MT5 using our Expert Advisor. Once set up, trades appear in real time.</p>
        </div>

        <div className="p-6 space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Platform</label>
              <div className="flex gap-3">
                <button className="px-4 py-2 border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg text-sm font-semibold transition-colors">MetaTrader 5</button>
                <button className="px-4 py-2 border border-border text-muted-foreground hover:border-border dark:hover:border-zinc-700 rounded-lg text-sm font-medium transition-colors">MetaTrader 4</button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">Your OS</label>
              <div className="flex gap-3">
                <button className="px-4 py-2 border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg text-sm font-semibold transition-colors">Windows</button>
                <button className="px-4 py-2 border border-border text-muted-foreground hover:border-border dark:hover:border-zinc-700 rounded-lg text-sm font-medium transition-colors">macOS</button>
              </div>
            </div>
          </div>

          <div className="bg-muted border border-border rounded-xl p-5">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <Input 
                  label="Your API Key"
                  type="text" 
                  value={showKey ? "tl_live_83hf892h3f8923hf" : "••••••••••••••••••••••••"} 
                  isReadOnly 
                />
              </div>
              <button onClick={() => setShowKey(!showKey)} className="flex items-center gap-2 px-4 py-2 h-[42px] bg-card border border-border text-muted-foreground dark:text-zinc-300 rounded-lg text-sm font-medium hover:bg-muted transition-colors w-24 justify-center">
                <Eye size={16} /> {showKey ? 'Hide' : 'Show'}
              </button>
              <button onClick={handleCopy} className={`flex items-center gap-2 px-4 py-2 bg-card border border-border text-muted-foreground dark:text-zinc-300 rounded-lg text-sm font-medium hover:bg-muted transition-colors w-24 justify-center ${copied ? 'text-emerald-500 dark:text-emerald-500 border-emerald-500 dark:border-emerald-500' : ''}`}>
                <Copy size={16} /> {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">Copy this key and paste it into the "ApiKey" field of the EA's settings when attaching it to your chart.</p>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={handleDownload} className={`flex items-center gap-2 px-6 py-3 text-white rounded-lg font-bold transition-colors ${downloaded ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-indigo-600 hover:bg-indigo-500'}`}>
              <Download size={18} /> {downloaded ? 'Downloaded' : 'Download TradinglekhaSync.ex5'}
            </button>
            <span className="text-sm text-muted-foreground">MetaTrader 5 · Compiled · ~15 KB</span>
          </div>

          <div>
            <div className="flex justify-between items-end mb-4">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest">Setup Guide — MT5 on Windows</label>
              <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Read setup blog guide ↗</button>
            </div>
            <ol className="space-y-3 text-sm text-muted-foreground dark:text-zinc-300">
              <li className="flex gap-3"><span className="w-5 h-5 rounded-full border border-indigo-500 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">1</span> Copy your API Key shown above.</li>
              <li className="flex gap-3"><span className="w-5 h-5 rounded-full border border-indigo-500 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">2</span> Download the compiled EA file below (TradinglekhaSync.ex5).</li>
              <li className="flex gap-3"><span className="w-5 h-5 rounded-full border border-indigo-500 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">3</span> In MT5 go to File → Open Data Folder.</li>
              <li className="flex gap-3"><span className="w-5 h-5 rounded-full border border-indigo-500 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">4</span> Copy TradinglekhaSync.ex5 into the MQL5/Experts/ folder.</li>
              <li className="flex gap-3"><span className="w-5 h-5 rounded-full border border-indigo-500 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">5</span> Drag the EA onto any chart, paste your API Key in the Inputs tab, and enable Algo Trading (the EA is read-only).</li>
              <li className="flex gap-3"><span className="w-5 h-5 rounded-full border border-indigo-500 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">6</span> Go to Tools → Options → Expert Advisors → tick "Allow WebRequest" → add <code className="bg-secondary px-2 py-0.5 rounded text-indigo-600 dark:text-indigo-400 mx-1">https://api.tradinglekha.com</code></li>
              <li className="flex gap-3"><span className="w-5 h-5 rounded-full border border-indigo-500 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0">7</span> Every closed trade now syncs instantly to Tradinglekha.</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Connected Accounts List */}
      <div>
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-xl font-bold text-foreground">Connected accounts</h2>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-border text-muted-foreground dark:text-zinc-300 rounded-lg text-sm font-semibold hover:bg-muted dark:hover:bg-zinc-900 transition-colors">View all accounts</button>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-500 transition-colors">Connect account</button>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="text-indigo-600 dark:text-indigo-400" size={24} />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-foreground">Tradinglekha Demo Account</h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-sm bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Active</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">MT5 · Start: $10,000.00 · Current: $16,482.34 · Last sync: Just now</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border border-border text-muted-foreground dark:text-zinc-300 rounded-lg text-sm font-medium hover:bg-muted dark:hover:bg-zinc-900 transition-colors">Viewing</button>
              <button className="px-4 py-2 border border-border text-muted-foreground dark:text-zinc-300 rounded-lg text-sm font-medium hover:bg-rose-50 dark:hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-500 transition-colors">Disconnect</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
