'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Plus, Check, Lock, X, Sparkles } from 'lucide-react';
import { Dropdown } from '@/components/base/dropdown/dropdown';
import { Button } from 'react-aria-components';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type Account = {
  id: string;
  name: string;
  type: string;
};

const ACCOUNTS: Account[] = [
  { id: '1', name: 'Main Equity', type: 'Equity' },
  // { id: '2', name: 'Crypto Alpha', type: 'Crypto' },
];

export function AccountSwitcher({ isPro = false }: { isPro?: boolean }) {
  const [activeAccountId, setActiveAccountId] = useState(ACCOUNTS[0].id);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const activeAccount = ACCOUNTS.find(a => a.id === activeAccountId) || ACCOUNTS[0];

  return (
    <>
      <Dropdown.Root>
        <Button className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-muted transition-colors border border-transparent hover:border-border dark:hover:border-zinc-700 outline-none cursor-pointer bg-transparent">
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider leading-none mb-1">Trading Account</span>
            <span className="text-sm font-bold text-foreground leading-none">{activeAccount.name}</span>
          </div>
          <ChevronDown size={14} className="text-muted-foreground ml-1" />
        </Button>

        <Dropdown.Popover className="w-56 p-1 bg-card dark:bg-[#111111] rounded-xl shadow-lg border border-border z-50">
          <div className="px-2 py-1.5 border-b border-zinc-100 dark:border-zinc-800/50 bg-muted dark:bg-transparent mb-1 rounded-t-lg">
            <span className="text-xs font-semibold text-muted-foreground">Switch Account</span>
          </div>
          <Dropdown.Menu className="outline-none">
            {ACCOUNTS.map(acc => (
              <Dropdown.Item 
                key={acc.id} 
                onAction={() => setActiveAccountId(acc.id)}
                unstyled
                className="w-full flex items-center justify-between px-2 py-2 text-sm rounded-md hover:bg-muted transition-colors group cursor-pointer outline-none mb-0.5"
              >
                <div className="flex flex-col items-start">
                  <span className="font-semibold text-foreground group-hover:text-black dark:group-hover:text-white">{acc.name}</span>
                  <span className="text-[10px] text-muted-foreground">{acc.type}</span>
                </div>
                {activeAccountId === acc.id && (
                  <Check size={14} className="text-emerald-500" />
                )}
              </Dropdown.Item>
            ))}
            
            <Dropdown.Separator />
            
            <Dropdown.Item 
              onAction={() => {
                if (!isPro) {
                  setShowUpgradeModal(true);
                } else {
                  // Logic to add account
                }
              }}
              unstyled 
              className="w-full flex items-center justify-between px-2 py-2 text-sm text-muted-foreground hover:text-foreground dark:hover:text-white rounded-md hover:bg-muted transition-colors cursor-pointer outline-none mt-1"
            >
              <div className="flex items-center gap-2">
                <Plus size={14} />
                <span className="font-medium">Add New Account</span>
              </div>
              {!isPro && <Lock size={12} className="text-sky-500" />}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown.Root>

      {/* Upgrade Modal for Basic Users */}
      {mounted && createPortal(
        <AnimatePresence>
          {showUpgradeModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="absolute inset-0 bg-background/80 backdrop-blur-md"
                onClick={() => setShowUpgradeModal(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-card border border-border rounded-3xl shadow-2xl p-8 z-[101] text-center"
              >
                <button 
                  onClick={() => setShowUpgradeModal(false)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>

                <div className="w-12 h-12 rounded-full bg-sky-500/10 flex items-center justify-center mx-auto mb-4 border border-sky-500/20">
                  <Sparkles className="w-6 h-6 text-sky-500" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">Unlock Multiple Accounts</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Basic plan users are limited to 1 Trading Account. Upgrade to Pro to separate your F&O, Commodity, and Crypto trades into distinct ledgers.
                </p>

                <Link 
                  href="/#pricing" 
                  onClick={() => setShowUpgradeModal(false)}
                  className="flex items-center justify-center w-full py-3 bg-foreground text-background rounded-xl font-bold hover:bg-foreground/90 transition-colors mb-2"
                >
                  Upgrade to Pro
                </Link>
                <Link 
                  href="/pro"
                  className="flex items-center justify-center w-full py-3 bg-secondary text-foreground rounded-xl font-bold hover:bg-secondary/80 transition-colors"
                >
                  View Pro Features
                </Link>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
