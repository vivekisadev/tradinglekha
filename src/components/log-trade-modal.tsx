"use client";

import { useState } from "react";
import { Plus, X, UploadCloud, Calendar, DollarSign, Activity } from "lucide-react";

export function LogTradeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState("");
  
  const [symbol, setSymbol] = useState("");
  const [side, setSide] = useState("LONG");
  const [entryPrice, setEntryPrice] = useState("");
  const [exitPrice, setExitPrice] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleAIUpload = () => {
    setIsProcessing(true);
    setProcessStep("Image parsing...");
    setTimeout(() => {
      setProcessStep("Data extraction...");
      setTimeout(() => {
        setProcessStep("Currency detection...");
        setTimeout(() => {
          setIsProcessing(false);
          setProcessStep("");
          // Auto-fill values to simulate AI extraction
          setSymbol('RELIANCE');
          setEntryPrice('2500.50');
          setExitPrice('2550.00');
          setSide('LONG');
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const handleSaveTrade = async () => {
    if (!symbol || !entryPrice || !exitPrice) return alert("Please fill all fields");
    
    setIsSaving(true);
    try {
      const res = await fetch("/api/trades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol, side, entryPrice, exitPrice }),
      });
      
      if (res.ok) {
        setIsOpen(false);
        setSymbol("");
        setEntryPrice("");
        setExitPrice("");
        // Optional: Trigger a router.refresh() if needed, but simple reload is fine for MVP
        window.location.reload();
      } else {
        alert("Failed to save trade.");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving trade.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-[#2E5D9F] dark:hover:bg-[#5B8DEF] text-white rounded-lg text-sm font-semibold transition-all shadow-sm"
      >
        <Plus size={16} />
        <span>Log Trade</span>
      </button>
    );
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-[#2E5D9F] dark:hover:bg-[#5B8DEF] text-white rounded-lg text-sm font-semibold transition-all shadow-sm"
      >
        <Plus size={16} />
        <span>Log Trade</span>
      </button>

      {/* Modal Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
        
        {/* Modal Content */}
        <div className="bg-card dark:bg-[#151B2B] border border-border dark:border-[#26304A] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          
          <div className="px-6 py-4 border-b border-zinc-100 dark:border-[#26304A] flex justify-between items-center bg-muted/50 dark:bg-[#0B0F19]/50">
            <h2 className="text-lg font-semibold text-foreground dark:text-[#E7EAF0]">Log a Trade</h2>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 text-muted-foreground transition-colors">
              <X size={18} />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              
              <div className="col-span-2 sm:col-span-1 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground dark:text-[#98A2B8] mb-1.5 uppercase tracking-wide">Ticker</label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input 
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                      type="text" 
                      placeholder="e.g. AAPL" 
                      className="w-full pl-9 pr-3 py-2 bg-card dark:bg-[#0B0F19] border border-border dark:border-[#26304A] rounded-lg text-sm focus:ring-2 focus:ring-[#2E5D9F] dark:focus:ring-[#5B8DEF] outline-none transition-all text-foreground dark:text-[#E7EAF0]" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-muted-foreground dark:text-[#98A2B8] mb-1.5 uppercase tracking-wide">Side</label>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSide('LONG')}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors border ${side === 'LONG' ? 'bg-[#16A34A]/10 text-[#16A34A] border-[#16A34A]/20' : 'bg-muted text-muted-foreground border-border'}`}
                    >
                      Long
                    </button>
                    <button 
                      onClick={() => setSide('SHORT')}
                      className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors border ${side === 'SHORT' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-muted text-muted-foreground border-border'}`}
                    >
                      Short
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground dark:text-[#98A2B8] mb-1.5 uppercase tracking-wide">Entry Price</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input 
                      value={entryPrice}
                      onChange={(e) => setEntryPrice(e.target.value)}
                      type="number" 
                      placeholder="0.00" 
                      className="w-full pl-9 pr-3 py-2 bg-card dark:bg-[#0B0F19] border border-border dark:border-[#26304A] rounded-lg text-sm focus:ring-2 focus:ring-[#2E5D9F] dark:focus:ring-[#5B8DEF] outline-none transition-all text-foreground dark:text-[#E7EAF0]" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-muted-foreground dark:text-[#98A2B8] mb-1.5 uppercase tracking-wide">Exit Price</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input 
                      value={exitPrice}
                      onChange={(e) => setExitPrice(e.target.value)}
                      type="number" 
                      placeholder="0.00" 
                      className="w-full pl-9 pr-3 py-2 bg-card dark:bg-[#0B0F19] border border-border dark:border-[#26304A] rounded-lg text-sm focus:ring-2 focus:ring-[#2E5D9F] dark:focus:ring-[#5B8DEF] outline-none transition-all text-foreground dark:text-[#E7EAF0]" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="col-span-2 mt-4">
                <div onClick={!isProcessing ? handleAIUpload : undefined} className="border-2 border-dashed border-[#2E5D9F]/30 dark:border-[#5B8DEF]/30 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-[#2E5D9F]/5 dark:hover:bg-[#5B8DEF]/10 transition-colors cursor-pointer group">
                  {isProcessing ? (
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 border-4 border-[#2E5D9F]/30 border-t-[#2E5D9F] dark:border-[#5B8DEF]/30 dark:border-t-[#5B8DEF] rounded-full animate-spin mb-3"></div>
                      <h3 className="text-sm font-semibold text-[#2E5D9F] dark:text-[#5B8DEF]">{processStep}</h3>
                      <p className="text-xs text-muted-foreground mt-1">Please wait...</p>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-[#2E5D9F]/10 dark:bg-[#5B8DEF]/10 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <UploadCloud size={20} className="text-[#2E5D9F] dark:text-[#5B8DEF]" />
                      </div>
                      <h3 className="text-sm font-semibold text-foreground dark:text-[#E7EAF0]">Upload Trade Screenshot</h3>
                      <p className="text-xs text-muted-foreground mt-1">AI Analyzer will extract details automatically</p>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>

          <div className="px-6 py-4 border-t border-zinc-100 dark:border-[#26304A] flex justify-end gap-3 bg-muted/50 dark:bg-[#0B0F19]/50">
            <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-semibold text-muted-foreground dark:text-[#98A2B8] hover:text-foreground dark:hover:text-white transition-colors">Cancel</button>
            <button 
              onClick={handleSaveTrade} 
              disabled={isSaving}
              className="px-5 py-2 bg-[#2E5D9F] dark:bg-[#5B8DEF] text-white rounded-lg text-sm font-semibold hover:bg-[#1F2A44] dark:hover:bg-[#5B8DEF]/80 transition-colors shadow-sm disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Trade"}
            </button>
          </div>
          
        </div>
      </div>
    </>
  );
}
