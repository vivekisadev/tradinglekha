'use client';

import { useState } from "react";
import Link from "next/link";
import { ZoomTextReveal, FinalRevealScene } from "@/components/ui/zoom-text-reveal";
import { InteractiveHero } from "@/components/hero/interactive-hero";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoLink } from "@/components/logo";
import { ComparisonSection } from "@/components/comparison-section";
import { BentoFeatures } from "@/components/bento-features";
import { UseCasesTabs } from "@/components/use-cases-tabs";
import { AiAnalyzerFlow } from "@/components/ai-analyzer-flow";
import { ChevronRight, ChevronDown, BarChart3, LineChart, Target, Search, Bell, Settings, LayoutDashboard, BookOpen, Presentation, Calendar, Home, ArrowUpRight, Sparkles, Activity, CheckCircle2, Bot, Layers, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LandingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [faqTab, setFaqTab] = useState<'general' | 'security' | 'brokers'>('general');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [featureTab, setFeatureTab] = useState<'triage' | 'resolution' | 'handoff' | 'reporting'>('triage');

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
    <div className="min-h-screen relative flex flex-col items-center bg-background selection:bg-primary selection:text-primary-foreground font-sans text-foreground">
      
      {/* Top Navbar */}
      <header className="w-full flex items-center justify-between px-6 py-6 md:px-12 max-w-[1400px] mx-auto sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <LogoLink />
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-muted-foreground">
          <Link href="#" className="hover:text-foreground transition-colors">Product</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Integrations</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Customers</Link>
          <Link href="#" className="hover:text-foreground transition-colors">Pricing</Link>
        </nav>
        <div className="flex items-center gap-4 md:gap-6">
            <ThemeToggle />
          <Link href="/auth/login" className="text-[15px] font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block">Sign In</Link>
          <Link href="/auth/signup" className="text-[15px] font-medium text-primary-foreground bg-primary hover:opacity-90 px-5 py-2.5 rounded-xl transition-opacity shadow-md">
              Try Tradinglekha
            </Link>
        </div>
      </header>

      <main className="w-full flex flex-col items-center">
        
        <InteractiveHero />

        {/* Parallax Stacking Cards Section */}
        <section className="w-full max-w-[1200px] mx-auto px-6 py-32 relative">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                One journal. Every <span className="text-emerald-500">trade, handled.</span>
              </h2>
          </div>

          <div className="relative w-full flex flex-col gap-12 md:gap-0">
            {/* Card 1 */}
            <div className="sticky top-32 w-full h-[600px] bg-secondary rounded-[32px] border border-border shadow-sm p-12 flex flex-col md:flex-row items-center gap-10 overflow-hidden z-10 transform origin-top transition-transform">
              <div className="w-full md:w-1/2 flex flex-col items-start z-10 relative">
                <h3 className="text-4xl font-sans font-bold tracking-tight text-foreground mb-4 leading-tight">It gets smarter with every trade it sees.</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Tradinglekha learns from your past executions, picking up on your specific patterns and edge cases so its insights get sharper over time.
                </p>
                <div className="flex gap-4">
                  <button className="bg-blue-600 text-white font-medium px-6 py-2.5 rounded-xl flex items-center gap-2 hover:bg-blue-700 transition-colors">
                    <Sparkles className="w-4 h-4" /> See Analytics
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/2 h-full absolute right-0 top-0 bottom-0 pointer-events-none">
                 <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-emerald-50/50 dark:from-blue-900/20 dark:to-emerald-900/20 mix-blend-multiply dark:mix-blend-screen" />
                 <div className="absolute right-[-10%] top-[20%] w-[120%] bg-card rounded-2xl shadow-xl border border-border p-6 transform -rotate-2">
                    <div className="flex justify-between items-center mb-6">
                      <span className="font-semibold text-sm text-foreground">Performance</span>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="flex gap-8 mb-6">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Win Rate</p>
                        <p className="text-3xl font-bold text-foreground">64%</p>
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded inline-block mt-1">↑ 12% this month</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Profit Factor</p>
                        <p className="text-3xl font-bold text-foreground">2.1</p>
                        <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-500/10 px-1.5 py-0.5 rounded inline-block mt-1">↑ 0.4 this month</p>
                      </div>
                    </div>
                    <div className="flex items-end gap-2 h-24">
                      {[30, 50, 40, 70, 60, 90, 80].map((h, i) => (
                        <div key={i} className="flex-1 bg-emerald-100 dark:bg-emerald-900/40 rounded-t-sm" style={{ height: `${h}%` }}>
                          <div className="w-full bg-emerald-500 rounded-t-sm" style={{ height: '60%' }} />
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="sticky top-40 w-full h-[600px] bg-card rounded-[32px] border border-border shadow-sm p-12 flex flex-col md:flex-row items-center gap-10 overflow-hidden z-20 transform origin-top transition-transform">
              <div className="w-full md:w-1/2 h-full absolute left-0 top-0 bottom-0 pointer-events-none overflow-hidden rounded-l-[32px]">
                 <div className="absolute inset-0 bg-gradient-to-tr from-sky-100/60 to-indigo-50/60 dark:from-sky-900/20 dark:to-indigo-900/20 mix-blend-multiply dark:mix-blend-screen" />
                 <div className="absolute left-[10%] top-[20%] w-[80%] bg-card/90 backdrop-blur-xl rounded-2xl shadow-xl border border-border p-5 transform rotate-2">
                    <div className="flex gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <Bot className="text-primary-foreground w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-foreground">AI Coach</span>
                          <span className="text-[10px] text-muted-foreground">12:30 PM</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 bg-secondary p-3 rounded-lg rounded-tl-none border border-border">
                          Hey! I noticed you are tilting. You've taken 3 trades in the last 10 minutes outside your playbook parameters. 
                          <br/><br/>
                          I suggest stepping away. Want me to lock your journal for 2 hours?
                        </div>
                        <div className="flex gap-2 mt-2">
                          <span className="text-[10px] bg-muted px-2 py-1 rounded font-medium text-foreground">Yes, lock it</span>
                          <span className="text-[10px] bg-primary text-primary-foreground px-2 py-1 rounded font-medium">I'm fine, ignore</span>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>

              <div className="w-full md:w-1/2 ml-auto flex flex-col items-start z-10 relative">
                <h3 className="text-4xl font-sans font-bold tracking-tight text-foreground mb-4 leading-tight">It always answers in your trading style.</h3>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Trained on your playbook and past executions, the AI Coach responds in the exact context of your strategy — never robotic, never off-brand.
                </p>
                <button className="bg-primary hover:opacity-90 text-primary-foreground font-medium px-6 py-2.5 rounded-xl flex items-center gap-2 transition-opacity">
                  Configure Playbook
                </button>
              </div>
            </div>
          </div>
        </section>

        <UseCasesTabs />
        <AiAnalyzerFlow />

        <ComparisonSection />
        <BentoFeatures />

        {/* Pricing Section */}
        <section className="w-full max-w-[1200px] mx-auto px-6 py-32 flex flex-col items-center">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                Less guessing, more <span className="text-emerald-500">consistent profits.</span>
              </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[700px] overflow-hidden relative" style={{ maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)' }}>
              <motion.div 
                animate={{ y: [0, -1000] }} 
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
                className="flex flex-col gap-6"
              >
                {[1,2,3,4].map((_, i) => (
                  <div key={i} className="bg-secondary border border-border p-8 rounded-2xl">
                    <div className="flex items-center gap-2 mb-6 text-muted-foreground"><Target className="w-5 h-5"/> PropDesk</div>
                    <p className="text-lg text-foreground mb-8 leading-relaxed font-medium">"Tradinglekha spots my tilt patterns before I even realize them. It's saved me thousands by just telling me to walk away."</p>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Sarah Mitchell</p>
                      <p className="text-xs text-muted-foreground">Funded Trader at TopStep</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div 
                animate={{ y: [-1000, 0] }} 
                transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                className="flex flex-col gap-6"
              >
                {[1,2,3,4].map((_, i) => (
                  <div key={i} className="bg-secondary border border-border p-8 rounded-2xl">
                    <div className="flex items-center gap-2 mb-6 text-muted-foreground"><Activity className="w-5 h-5"/> AlphaGen</div>
                    <p className="text-lg text-foreground mb-8 leading-relaxed font-medium">"I used to spend 2 hours every weekend manually logging trades. Now it's instantly synced. The time saved is incredible."</p>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Daniel Park</p>
                      <p className="text-xs text-muted-foreground">Retail Day Trader</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div 
                animate={{ y: [0, -1000] }} 
                transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
                className="flex flex-col gap-6 hidden md:flex"
              >
                {[1,2,3,4].map((_, i) => (
                  <div key={i} className="bg-secondary border border-border p-8 rounded-2xl">
                    <div className="flex items-center gap-2 mb-6 text-muted-foreground"><LineChart className="w-5 h-5"/> ChartPros</div>
                    <p className="text-lg text-foreground mb-8 leading-relaxed font-medium">"The analytics showed me I lose money on Fridays. I stopped trading Fridays and my equity curve smoothed out perfectly."</p>
                    <div>
                      <p className="text-sm font-semibold text-foreground">James Okafor</p>
                      <p className="text-xs text-muted-foreground">Swing Trader</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section (Reverted to Split Screen Style) */}
        <section className="w-full max-w-[1200px] mx-auto px-6 py-32 flex flex-col md:flex-row gap-12 md:gap-20">
          <div className="w-full md:w-[45%] flex flex-col items-start">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                Frequently <span className="text-emerald-500">Asked Questions</span>
              </h2>
            <p className="text-muted-foreground text-[15px] leading-relaxed mb-10 max-w-[90%]">
              A quick overview of the most common questions about Tradinglekha AI — from data security to supported brokers.
            </p>
            <div className="flex flex-wrap gap-2 mb-12">
              {(['general', 'security', 'brokers'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setFaqTab(tab); setOpenFaq(null); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize border ${
                    faqTab === tab 
                      ? 'bg-primary border-primary text-primary-foreground shadow-sm' 
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

        <ZoomTextReveal text="TRADINGLEKHA">
          <FinalRevealScene />
        </ZoomTextReveal>
      </main>

      {/* Footer */}
      <footer className="w-full bg-secondary px-6 py-16 border-t border-border mt-20">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-16 mb-16">
          <div className="w-full md:w-1/3">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <BarChart3 className="text-primary-foreground w-3 h-3" />
              </div>
              <span className="font-sans font-bold tracking-tight text-foreground text-lg font-bold tracking-tight">Tradinglekha</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
              The AI trading journal that logs trades, finds your edge, and keeps your psychology in check instantly.
            </p>
            <div className="flex gap-4">
              <div className="w-5 h-5 rounded-full bg-muted border border-border" />
              <div className="w-5 h-5 rounded-full bg-muted border border-border" />
              <div className="w-5 h-5 rounded-full bg-muted border border-border" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
            <div className="flex flex-col gap-4">
              <h4 className="font-medium text-foreground mb-2">Product</h4>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Features</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Use Cases</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Integrations</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-medium text-foreground mb-2">Company</h4>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">About</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Customers</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-medium text-foreground mb-2">Resources</h4>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Updates</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">404</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-medium text-foreground mb-2">Legal</h4>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto flex items-center justify-between pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">© 2026 Tradinglekha. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}