"use client";

import React, { useState } from "react";
import { Trophy, Calendar as CalendarIcon, Crown, Medal, Flame, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/base/badges/badges";

const LEADERBOARD_DATA = [
  { rank: 1, name: "Kianna Torff", avatar: "Kianna", winRate: 78.4, totalTrades: 88, pnl: 1420.50, profitFactor: 2.4, streak: 8 },
  { rank: 2, name: "Abram Mango", avatar: "Abram", winRate: 73.0, totalTrades: 100, pnl: 1115.00, profitFactor: 2.1, streak: 4 },
  { rank: 3, name: "Alfonso Lubin", avatar: "Alfonso", winRate: 70.8, totalTrades: 89, pnl: 990.20, profitFactor: 1.9, streak: 2 },
  { rank: 4, name: "Maren Gouse", avatar: "Maren", winRate: 65.5, totalTrades: 90, pnl: 885.00, profitFactor: 1.7, streak: 5 },
  { rank: 5, name: "Desirae Herwitz", avatar: "Desirae", winRate: 61.2, totalTrades: 112, pnl: 760.40, profitFactor: 1.5, streak: 1 },
  { rank: 6, name: "Talan Bator", avatar: "Talan", winRate: 58.0, totalTrades: 76, pnl: 624.00, profitFactor: 1.4, streak: 3 },
  { rank: 7, name: "Max Cooper", avatar: "Max", winRate: 55.4, totalTrades: 97, pnl: 590.80, profitFactor: 1.3, streak: 2 },
  { rank: 8, name: "Zainab Bator", avatar: "Zainab", winRate: 51.8, totalTrades: 54, pnl: 410.00, profitFactor: 1.2, streak: 0 },
  { rank: 9, name: "Livia Bator", avatar: "Livia", winRate: 49.5, totalTrades: 42, pnl: 380.00, profitFactor: 1.1, streak: 1 },
  { rank: 10, name: "Carter Bator", avatar: "Carter", winRate: 48.0, totalTrades: 36, pnl: 150.00, profitFactor: 1.0, streak: 0 },
];

const REWARDS = [
  { place: "1st", amount: 250 },
  { place: "2nd", amount: 200 },
  { place: "3rd", amount: 150 },
  { place: "4th", amount: 100 },
  { place: "5th", amount: 75 },
  { place: "6th", amount: 60 },
  { place: "7th", amount: 50 },
  { place: "8th", amount: 40 },
  { place: "9th", amount: 30 },
  { place: "10th", amount: 25 },
];

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<"monthly" | "allTime">("monthly");
  const getAvatarUrl = (seed: string) => `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=transparent`;

  return (
    <div className="flex flex-col xl:flex-row gap-8 min-h-screen text-foreground pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
      
      {/* Left Column: Leaderboard & Podium */}
      <div className="flex-1 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground flex items-center gap-3">
            <Trophy className="text-amber-500" size={28} />
            Leaderboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">See how you stack up against the top traders this month.</p>
        </div>
        
        {/* Flat Minimalist Podium Section */}
        <div className="w-full max-w-2xl mx-auto flex items-end justify-center gap-4 sm:gap-6 mt-8 mb-8">
          
          {/* 2nd Place */}
          <div className="flex flex-col items-center z-10 w-1/3">
            <div className="flex flex-col items-center mb-3">
              <div className="w-16 h-16 bg-slate-200 dark:bg-slate-800 rounded-2xl mb-3 overflow-hidden shadow-sm p-1 border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center">
                <img src={getAvatarUrl(LEADERBOARD_DATA[1].avatar)} alt="2nd" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-bold text-center text-foreground">{LEADERBOARD_DATA[1].name}</span>
              <span className="text-xs font-semibold text-muted-foreground mt-0.5">Win Rate: {LEADERBOARD_DATA[1].winRate}%</span>
            </div>
            <div className="w-full h-24 bg-card border border-border rounded-t-2xl flex flex-col items-center justify-start pt-3">
               <span className="text-3xl font-black text-muted-foreground/50">2</span>
               <span className="text-sm font-bold text-emerald-500 mt-1">${LEADERBOARD_DATA[1].pnl}</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center z-20 w-[40%] -mt-6">
            <div className="flex flex-col items-center mb-3 relative">
              <div className="absolute -top-7 z-20">
                <Crown size={28} className="text-amber-500 fill-amber-500" />
              </div>
              <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/20 rounded-2xl mb-3 overflow-hidden shadow-md p-1 border-2 border-amber-500 flex items-center justify-center">
                <img src={getAvatarUrl(LEADERBOARD_DATA[0].avatar)} alt="1st" className="w-full h-full object-cover" />
              </div>
              <span className="text-base font-bold text-center text-foreground">{LEADERBOARD_DATA[0].name}</span>
              <span className="text-sm font-semibold text-amber-600 dark:text-amber-500 mt-0.5">Win Rate: {LEADERBOARD_DATA[0].winRate}%</span>
            </div>
            <div className="w-full h-32 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-t-2xl flex flex-col items-center justify-start pt-4 shadow-sm">
              <span className="text-4xl font-black text-amber-500/50">1</span>
              <span className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-1">${LEADERBOARD_DATA[0].pnl}</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center z-10 w-1/3">
            <div className="flex flex-col items-center mb-3">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-2xl mb-3 overflow-hidden shadow-sm p-1 border-2 border-orange-300 dark:border-orange-700 flex items-center justify-center">
                <img src={getAvatarUrl(LEADERBOARD_DATA[2].avatar)} alt="3rd" className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-bold text-center text-foreground">{LEADERBOARD_DATA[2].name}</span>
              <span className="text-xs font-semibold text-muted-foreground mt-0.5">Win Rate: {LEADERBOARD_DATA[2].winRate}%</span>
            </div>
            <div className="w-full h-20 bg-card border border-border rounded-t-2xl flex flex-col items-center justify-start pt-2">
               <span className="text-3xl font-black text-muted-foreground/50">3</span>
               <span className="text-sm font-bold text-emerald-500 mt-1">${LEADERBOARD_DATA[2].pnl}</span>
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <CalendarIcon size={18} className="text-muted-foreground" />
              <h2 className="font-semibold text-lg">Top Performers</h2>
            </div>
            <div className="bg-secondary rounded-lg p-1 flex items-center border border-border">
              <button 
                onClick={() => setTimeframe("monthly")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${timeframe === "monthly" ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setTimeframe("allTime")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${timeframe === "allTime" ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"}`}
              >
                All Time
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {LEADERBOARD_DATA.map((trader) => (
              <div key={trader.rank} className="flex items-center justify-between p-4 bg-background border border-border hover:border-indigo-500/30 transition-colors rounded-xl group shadow-sm">
                
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-xs font-bold text-muted-foreground bg-secondary shrink-0 group-hover:bg-indigo-50 group-hover:text-indigo-600 dark:group-hover:bg-indigo-500/10 dark:group-hover:text-indigo-400 transition-colors">
                    {trader.rank}
                  </div>
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-secondary border border-border shrink-0">
                    <img src={getAvatarUrl(trader.avatar)} alt={trader.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-foreground flex items-center gap-2">
                      {trader.name} 
                      {trader.streak >= 3 && (
                        <span className="flex items-center text-[10px] bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 px-1.5 py-0.5 rounded font-bold border border-rose-200 dark:border-rose-500/20">
                          <Flame size={10} className="mr-0.5 fill-rose-500" /> {trader.streak} Win Streak
                        </span>
                      )}
                    </span>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[11px] text-muted-foreground font-medium">
                        Win Rate: <span className="text-foreground">{trader.winRate}%</span>
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-[11px] text-muted-foreground font-medium">
                        PF: <span className="text-foreground">{trader.profitFactor}</span>
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-[11px] text-muted-foreground font-medium">
                        Trades: <span className="text-foreground">{trader.totalTrades}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Net PNL</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-500 text-lg sm:text-xl">${trader.pnl.toFixed(2)}</span>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Rewards Sidebar */}
      <div className="w-full xl:w-[340px] shrink-0 flex flex-col pt-4">
        <div className="bg-gradient-to-b from-card to-secondary/30 border border-border rounded-2xl p-6 shadow-sm sticky top-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-200 dark:border-amber-500/20">
              <Trophy className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Monthly Prizes</h2>
              <div className="text-muted-foreground text-xs font-medium">Top 10 traders receive USDC</div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 mt-6">
            {REWARDS.map((reward, i) => {
              const isTop3 = i < 3;
              return (
                <div 
                  key={reward.place} 
                  className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                    isTop3 
                      ? "bg-secondary/80 border border-border shadow-sm font-semibold" 
                      : "bg-transparent border border-transparent hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${isTop3 ? "text-foreground font-bold" : "text-muted-foreground font-medium"}`}>
                      {reward.place}
                    </span>
                  </div>
                  <span className={`text-sm ${isTop3 ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-foreground font-medium"}`}>
                    ${reward.amount}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
