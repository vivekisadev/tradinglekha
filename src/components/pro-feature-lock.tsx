"use client";

import React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";

export function ProFeatureLock({
  isPro,
  children,
  title = "Unlock Pro",
  description = "This feature requires a Pro subscription to access."
}: {
  isPro: boolean;
  children: React.ReactNode;
  title?: string;
  description?: string;
}) {
  if (isPro) {
    return <>{children}</>;
  }

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden border border-border bg-card">
      <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-40 blur-[6px] grayscale-[50%] overflow-hidden">
        {children}
      </div>
      
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 bg-background/40 backdrop-blur-sm">
        <div className="bg-card border border-border shadow-2xl rounded-2xl p-8 max-w-sm text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-indigo-500/10 text-indigo-500 text-[10px] font-bold uppercase tracking-wider">
            Pro Feature
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-8">
            {description}
          </p>
          <Link
            href="/pricing"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 px-4 rounded-xl transition-colors"
          >
            Upgrade to Pro
          </Link>
        </div>
      </div>
    </div>
  );
}
