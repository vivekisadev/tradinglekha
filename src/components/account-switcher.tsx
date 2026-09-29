'use client';

import { useState } from 'react';
import { ChevronDown, Plus, Check } from 'lucide-react';
import { Dropdown } from '@/components/base/dropdown/dropdown';
import { Button } from 'react-aria-components';

type Account = {
  id: string;
  name: string;
  type: string;
};

const ACCOUNTS: Account[] = [
  { id: '1', name: 'Main Equity', type: 'Equity' },
  { id: '2', name: 'Crypto Alpha', type: 'Crypto' },
];

export function AccountSwitcher() {
  const [activeAccountId, setActiveAccountId] = useState(ACCOUNTS[0].id);

  const activeAccount = ACCOUNTS.find(a => a.id === activeAccountId) || ACCOUNTS[0];

  return (
    <Dropdown.Root>
      <Button className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-muted transition-colors border border-transparent hover:border-border dark:hover:border-zinc-700 outline-none cursor-pointer bg-transparent">
        <div className="flex flex-col items-start">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider leading-none mb-1">Trading Account</span>
          <span className="text-sm font-bold text-foreground leading-none">{activeAccount.name}</span>
        </div>
        <ChevronDown size={14} className="text-muted-foreground ml-1" />
      </Button>

      <Dropdown.Popover className="w-56 p-1 bg-card dark:bg-[#111111] rounded-xl shadow-lg border border-border">
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
          
          <Dropdown.Item unstyled className="w-full flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground hover:text-foreground dark:hover:text-white rounded-md hover:bg-muted transition-colors cursor-pointer outline-none mt-1">
            <Plus size={14} />
            <span className="font-medium">Add New Account</span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown.Root>
  );
}
