"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function PricingSection({ isLoggedIn = false, isPro = false }: { isLoggedIn?: boolean, isPro?: boolean }) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [activePlan, setActivePlan] = useState<number>(1);

  const plans = [
    {
      name: "Basic",
      desc: "For traders starting their journaling habit.",
      price: { monthly: 0, yearly: 0 },
      features: ["Manual trade logging", "Basic P&L analytics", "Up to 50 trades/month", "Community support"]
    },
    {
      name: "Pro",
      desc: "For serious traders treating it like a business.",
      price: { monthly: 39, yearly: 31 },
      features: ["Automated broker sync", "AI Behavioral leak detection", "Advanced Playbook system", "Unlimited trades & history"]
    },
    {
      name: "Elite",
      desc: "For funded traders and trading desks.",
      price: { monthly: 99, yearly: 79 },
      features: ["Multiple broker connections", "Prop firm integrations", "Custom AI training", "Priority 24/7 support"]
    }
  ];

  return (
    <section id="pricing" className="w-full max-w-[1200px] mx-auto px-6 py-32 border-t border-border/50">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
          Invest in your <span className="text-emerald-500">trading edge.</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mb-10">
          One single tilted trade costs more than a lifetime of Tradinglekha. Start tracking your psychology today.
        </p>

        {/* Elastic Toggle */}
        <div className="bg-muted p-1 rounded-full flex items-center relative border border-border">
          {(['monthly', 'yearly'] as const).map((cycle) => (
            <button
              key={cycle}
              onClick={() => setBillingCycle(cycle)}
              className="relative px-6 py-2.5 text-sm font-semibold capitalize z-10"
            >
              {billingCycle === cycle && (
                <motion.div
                  layoutId="pricing-toggle"
                  className="absolute inset-0 bg-background rounded-full shadow-sm border border-border/50"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className={`relative z-20 flex items-center gap-2 ${billingCycle === cycle ? 'text-foreground' : 'text-muted-foreground hover:text-foreground transition-colors'}`}>
                {cycle} {cycle === 'yearly' && <span className={`text-[10px] px-2 py-0.5 rounded-full ${billingCycle === 'yearly' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-muted-foreground/10 text-muted-foreground'}`}>Save 20%</span>}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-center">
        {plans.map((plan, i) => {
          const isActive = activePlan === i;
          
          return (
            <motion.div
              key={plan.name}
              onClick={() => setActivePlan(i)}
              layout
              animate={{
                scale: isActive ? 1.05 : 0.98,
                opacity: isActive ? 1 : 0.6,
                zIndex: isActive ? 10 : 0
              }}
              whileHover={!isActive ? { opacity: 0.8, scale: 0.99 } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`cursor-pointer rounded-3xl p-8 flex flex-col relative overflow-hidden transition-colors duration-300 ${
                isActive 
                  ? 'bg-gradient-to-b from-sky-100 to-sky-50 border border-sky-200 shadow-2xl shadow-sky-500/10' 
                  : 'bg-card text-foreground border border-border shadow-sm'
              }`}
            >
              {isActive && i === 1 && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">
                  Most Popular
                </div>
              )}
              
              <h3 className={`text-2xl font-bold mb-2 ${isActive ? 'text-sky-950' : 'text-foreground'}`}>{plan.name}</h3>
              <p className={`text-sm mb-6 ${isActive ? 'text-sky-800' : 'text-muted-foreground'}`}>{plan.desc}</p>
              
              {/* Rolling Numbers */}
              <div className="mb-8 flex items-center h-[60px] overflow-hidden">
                <span className={`text-5xl font-bold ${isActive ? 'text-sky-950' : 'text-foreground'}`}>$</span>
                <div className="relative flex items-center h-full overflow-hidden">
                  <AnimatePresence mode="popLayout">
                    {plan.price[billingCycle].toString().split('').map((digit, idx) => (
                      <motion.span
                        key={`${digit}-${idx}`}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-100%", opacity: 0 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
                        className={`text-5xl font-bold inline-block ${isActive ? 'text-sky-950' : 'text-foreground'}`}
                      >
                        {digit}
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
                <span className={`ml-2 ${isActive ? 'text-sky-800' : 'text-muted-foreground'}`}>/mo</span>
              </div>
              
              <ul className="flex flex-col gap-4 mb-10 flex-1">
                {plan.features.map(feature => (
                  <li key={feature} className={`flex items-center gap-3 text-sm ${isActive ? 'text-sky-900' : 'text-muted-foreground'}`}>
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-emerald-500'}`} /> {feature}
                  </li>
                ))}
              </ul>
              
              {(() => {
                let btnText = "Start 14-Day Free Trial";
                let btnHref = "/auth/signup";
                
                if (plan.price[billingCycle] === 0) {
                  if (isLoggedIn) {
                    btnText = isPro ? "Downgrade to Basic" : "Current Plan (Dashboard)";
                    btnHref = "/dashboard";
                  } else {
                    btnText = "Start Free";
                  }
                } else {
                  if (isLoggedIn) {
                    btnText = isPro && plan.name === 'Pro' ? "Current Plan (Dashboard)" : "Upgrade Now";
                    btnHref = isPro && plan.name === 'Pro' ? "/dashboard" : "/checkout";
                  }
                }

                return (
                  <Link 
                    href={btnHref} 
                    className={`w-full py-4 text-center rounded-xl font-bold transition-colors ${
                      isActive 
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20' 
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {btnText}
                  </Link>
                );
              })()}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
