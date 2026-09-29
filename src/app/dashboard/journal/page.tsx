'use client';
import { useState } from "react";
import { Filter, BookOpen, Trash2, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

export default function JournalPage() {
  const [expandedId, setExpandedId] = useState<number | null>(1041);

  const toggle = (id: number) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Journal</h1>
          <p className="text-muted-foreground text-sm mt-1">AI readings of your trading notes, grouped by day.</p>
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
        
        <section aria-label="Entries for Today">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium text-foreground">Today, Sep 26</h2>
              <Badge size="sm" color="gray" className="bg-secondary text-secondary-foreground">
                2 entries
              </Badge>
            </div>
            <button className="text-muted-foreground hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-2 rounded-md hover:bg-rose-50 dark:hover:bg-rose-500/10">
              <Trash2 size={16} />
            </button>
          </div>

          <div className="space-y-4">
            
            {/* Entry Card 1042 */}
            <div className={`rounded-xl border border-border bg-card p-5 transition-all duration-200 shadow-sm ${expandedId === 1042 ? 'ring-1 ring-border shadow-md' : 'hover:shadow-md'}`}>
              <div className="flex gap-4 cursor-pointer" onClick={() => toggle(1042)}>
                <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center shrink-0 border border-border">
                  <FileText className="text-muted-foreground" size={24} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-muted-foreground">Entry #1042</span>
                    <Badge size="sm" color="indigo" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">3 trades</Badge>
                  </div>
                  <p className={`text-sm text-foreground leading-relaxed ${expandedId === 1042 ? '' : 'line-clamp-2'}`}>
                    Overall a solid morning session. Caught the NVDA breakout perfectly according to plan, but got chopped up trying to counter-trend AMD later on. Need to remember not to force setups when volume dies down around noon.
                  </p>
                </div>
                
                <button className="text-muted-foreground hover:text-foreground pt-1 shrink-0 transition-colors">
                  {expandedId === 1042 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              <AnimatePresence>
                {expandedId === 1042 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="mt-6 pt-6 border-t border-border text-center text-muted-foreground text-sm font-medium">
                      AI Analysis pending...
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Entry Card 1041 */}
            <div className={`rounded-xl border border-border bg-card p-5 transition-all duration-200 shadow-sm ${expandedId === 1041 ? 'ring-1 ring-border shadow-md' : 'hover:shadow-md'}`}>
              <div className="flex gap-4 cursor-pointer" onClick={() => toggle(1041)}>
                <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center shrink-0 border border-border">
                  <FileText className="text-muted-foreground" size={24} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-muted-foreground">Entry #1041</span>
                    <Badge size="sm" color="indigo" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20">1 trade</Badge>
                  </div>
                  <p className={`text-sm text-foreground leading-relaxed ${expandedId === 1041 ? '' : 'line-clamp-2'}`}>
                    Took a small scalp on TSLA open. Exited quickly when it couldn't break VWAP. Discipline was good here.
                  </p>
                </div>
                
                <button className="text-muted-foreground hover:text-foreground pt-1 shrink-0 transition-colors">
                  {expandedId === 1041 ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>

              <AnimatePresence>
                {expandedId === 1041 && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="mt-6 pt-6 border-t border-border space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            Patterns Identified
                          </h3>
                          <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex gap-2 items-start"><span className="text-emerald-500 font-bold mt-0.5">•</span> Good risk management on VWAP rejection.</li>
                            <li className="flex gap-2 items-start"><span className="text-emerald-500 font-bold mt-0.5">•</span> Hesitation on entry, causing a slightly worse fill.</li>
                          </ul>
                        </div>
                        <div className="bg-secondary/50 rounded-xl p-5 border border-border">
                          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-500" />
                            Improvement Areas
                          </h3>
                          <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex gap-2 items-start"><span className="text-indigo-500 font-bold mt-0.5">•</span> Work on entering immediately when the setup is valid.</li>
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-foreground mb-4">Trade Analysis</h3>
                        <div className="rounded-xl border border-border bg-secondary p-5 shadow-inner">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-card border border-border flex items-center justify-center font-bold text-xs text-foreground shadow-sm">TSLA</div>
                            <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-500/20">Mean Reversion</span>
                            <div className="ml-auto flex items-center gap-2 text-xs font-semibold text-muted-foreground bg-card border border-border px-3 py-1.5 rounded-full shadow-sm">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> High Confidence
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                            <div className="flex flex-col gap-1.5">
                              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Entry Reason</div>
                              <div className="text-foreground font-medium">Overextended at open</div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Exit Reason</div>
                              <div className="text-foreground font-medium">VWAP rejection</div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Emotional State</div>
                              <div className="text-foreground font-medium">Calm</div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">R Multiple</div>
                              <div className="text-emerald-600 dark:text-emerald-400 font-bold text-lg bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-500/20 w-fit">+0.85R</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
