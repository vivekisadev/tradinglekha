"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const [faqTab, setFaqTab] = useState<'general' | 'security' | 'brokers'>('general');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = {
    general: [
      { q: "What is Tradinglekha AI?", a: "Tradinglekha is an advanced AI-powered trading journal that automatically logs your trades, analyzes your behavior, and helps you identify your edge." },
      { q: "How is it different from a standard spreadsheet?", a: "Unlike static spreadsheets, our AI actively finds patterns in your trading, tags setups automatically, and provides actionable psychological feedback." },
      { q: "Do you offer a free trial?", a: "Yes, you can try all Pro features free for 14 days. No credit card required." },
    ],
    security: [
      { q: "Is my trading data secure?", a: "We use bank-level AES-256 encryption. Your data is strictly confidential and never shared with third parties." },
      { q: "Can you execute trades on my behalf?", a: "No. We only require read-only API access to your broker. We physically cannot place or modify trades." },
    ],
    brokers: [
      { q: "Which brokers do you support?", a: "We currently support Interactive Brokers, TD Ameritrade, TradeStation, Webull, and Binance." },
      { q: "Can I import via CSV?", a: "Yes, if your broker isn't supported, you can drag and drop your daily execution exports." },
    ]
  };

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-32 flex flex-col md:flex-row gap-12 md:gap-20 border-t border-border/50">
      <div className="w-full md:w-[45%] flex flex-col items-start">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            Frequently <span className="text-emerald-500">Asked Questions</span>
          </h2>
        <p className="text-muted-foreground text-[15px] leading-relaxed mb-10 max-w-[90%]">
          A quick overview of the most common questions about Tradinglekha AI - from data security to supported brokers.
        </p>
        <div className="flex flex-wrap gap-2 mb-12">
          {(['general', 'security', 'brokers'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { setFaqTab(tab); setOpenFaq(null); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize border ${
                faqTab === tab 
                  ? 'bg-foreground border-foreground text-background shadow-sm' 
                  : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          Still need help? <a href="#" className="text-foreground font-medium hover:underline transition-all">Contact us.</a>
        </p>
      </div>

      <div className="w-full md:w-[55%] flex flex-col gap-3">
        {faqs[faqTab].map((faq, idx) => (
          <div key={idx} className="border border-border rounded-2xl bg-card overflow-hidden transition-colors hover:border-border/80 shadow-sm">
            <button 
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="text-[15px] font-semibold text-foreground">{faq.q}</span>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {openFaq === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed pt-2">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
