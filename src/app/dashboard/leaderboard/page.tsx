"use client";

import React, { useState } from "react";
import { Trophy, Calendar as CalendarIcon, Crown, Medal } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const LEADERBOARD_DATA = [
  { rank: 1, name: "Kianna Torff", avatar: "Kianna", wins: 69, total: 88, pnl: 420 },
  { rank: 2, name: "Abram Mango", avatar: "Abram", wins: 73, total: 100, pnl: 415 },
  { rank: 3, name: "Alfonso Lubin", avatar: "Alfonso", wins: 63, total: 89, pnl: 390 },
  { rank: 4, name: "Maren Gouse", avatar: "Maren", wins: 59, total: 90, pnl: 385 },
  { rank: 5, name: "Desirae Herwitz", avatar: "Desirae", wins: 53, total: 112, pnl: 360 },
  { rank: 6, name: "Talan Bator", avatar: "Talan", wins: 24, total: 76, pnl: 324 },
  { rank: 7, name: "Max Cooper", avatar: "Max", wins: 32, total: 97, pnl: 290 },
  { rank: 8, name: "Zainab Bator", avatar: "Zainab", wins: 18, total: 54, pnl: 210 },
  { rank: 9, name: "Livia Bator", avatar: "Livia", wins: 15, total: 42, pnl: 180 },
  { rank: 10, name: "Carter Bator", avatar: "Carter", wins: 12, total: 36, pnl: 150 },
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
    <div className="flex flex-col xl:flex-row gap-8 min-h-screen text-foreground pb-20">
      
      {/* Left Column: Leaderboard & Podium */}
      <div className="flex-1 flex flex-col gap-8">
        <h1 className="text-3xl font-black tracking-tight mb-2">Leaderboard</h1>
        
        {/* Podium Section */}
        <div className="relative w-full max-w-xl mx-auto h-[350px] flex items-end justify-center gap-1 sm:gap-2 mt-12 mb-8">
          
          {/* 2nd Place */}
          <div className="flex flex-col items-center z-10 w-1/3">
            <div className="flex flex-col items-center mb-4">
              <div className="w-14 h-14 bg-[#a855f7] rounded-xl mb-3 overflow-hidden shadow-lg shadow-purple-500/20 p-1 flex items-center justify-center">
                <img src={getAvatarUrl(LEADERBOARD_DATA[1].avatar)} alt="2nd" className="w-12 h-12" />
              </div>
              <span className="text-[11px] font-bold text-center">{LEADERBOARD_DATA[1].name}</span>
              <div className="mt-1 bg-indigo-500/20 text-indigo-400 font-bold px-3 py-1 rounded-md text-xs border border-indigo-500/30">
                ${LEADERBOARD_DATA[1].pnl}
              </div>
            </div>
            <div className="w-full h-32 bg-gradient-to-t from-indigo-900/40 to-indigo-500/40 border-t border-x border-indigo-500/30 rounded-t-lg flex items-start justify-center pt-4 backdrop-blur-sm relative overflow-hidden">
               <div className="absolute inset-0 bg-white/5" style={{boxShadow: "inset 0 2px 10px rgba(255,255,255,0.1)"}} />
               <span className="text-5xl font-black text-white/50 drop-shadow-md z-10">2</span>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center z-20 w-[38%] -mt-10">
            <div className="flex flex-col items-center mb-4 relative">
              <div className="absolute -top-7 z-20">
                <Crown size={28} className="text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
              </div>
              <div className="w-16 h-16 bg-[#06b6d4] rounded-xl mb-3 overflow-hidden shadow-xl shadow-cyan-500/30 p-1 flex items-center justify-center border-2 border-yellow-400/50">
                <img src={getAvatarUrl(LEADERBOARD_DATA[0].avatar)} alt="1st" className="w-14 h-14" />
              </div>
              <span className="text-[12px] font-bold text-center">{LEADERBOARD_DATA[0].name}</span>
              <div className="mt-1 bg-indigo-500/30 text-indigo-300 font-bold px-4 py-1.5 rounded-md text-sm border border-indigo-500/40">
                ${LEADERBOARD_DATA[0].pnl}
              </div>
            </div>
            <div className="w-full h-44 bg-gradient-to-t from-indigo-800/50 to-indigo-400/60 border-t border-x border-indigo-400/50 rounded-t-xl flex items-start justify-center pt-4 backdrop-blur-sm relative shadow-[0_-10px_30px_rgba(99,102,241,0.2)] overflow-hidden">
              <div className="absolute inset-0 bg-white/10" style={{boxShadow: "inset 0 4px 15px rgba(255,255,255,0.2)"}} />
              <span className="text-7xl font-black text-white drop-shadow-lg z-10">1</span>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center z-10 w-1/3">
            <div className="flex flex-col items-center mb-4">
              <div className="w-14 h-14 bg-[#3b82f6] rounded-xl mb-3 overflow-hidden shadow-lg shadow-blue-500/20 p-1 flex items-center justify-center">
                <img src={getAvatarUrl(LEADERBOARD_DATA[2].avatar)} alt="3rd" className="w-12 h-12" />
              </div>
              <span className="text-[11px] font-bold text-center">{LEADERBOARD_DATA[2].name}</span>
              <div className="mt-1 bg-indigo-500/20 text-indigo-400 font-bold px-3 py-1 rounded-md text-xs border border-indigo-500/30">
                ${LEADERBOARD_DATA[2].pnl}
              </div>
            </div>
            <div className="w-full h-24 bg-gradient-to-t from-indigo-900/30 to-indigo-500/30 border-t border-x border-indigo-500/20 rounded-t-lg flex items-start justify-center pt-4 backdrop-blur-sm relative overflow-hidden">
               <div className="absolute inset-0 bg-white/5" style={{boxShadow: "inset 0 2px 10px rgba(255,255,255,0.05)"}} />
               <span className="text-5xl font-black text-white/40 drop-shadow-md z-10">3</span>
            </div>
          </div>
          
          {/* Base shape */}
          <div className="absolute -bottom-8 left-0 right-0 h-12 bg-[#09090b] rounded-[100%] scale-x-[1.2] blur-[8px] z-30" />
        </div>

        {/* List Section */}
        <div className="bg-card/50 dark:bg-zinc-950/50 backdrop-blur-xl border border-border/50 rounded-3xl overflow-hidden p-6 shadow-xl relative z-40">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <CalendarIcon size={18} className="text-muted-foreground" />
              <h2 className="font-semibold text-lg">Monthly Leaderboard</h2>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-1 flex items-center border border-border/50">
              <button 
                onClick={() => setTimeframe("monthly")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${timeframe === "monthly" ? "bg-white dark:bg-zinc-800 text-foreground shadow-sm border border-black/5 dark:border-white/5" : "text-muted-foreground hover:text-foreground"}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setTimeframe("allTime")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors ${timeframe === "allTime" ? "bg-white dark:bg-zinc-800 text-foreground shadow-sm border border-black/5 dark:border-white/5" : "text-muted-foreground hover:text-foreground"}`}
              >
                All Time
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {LEADERBOARD_DATA.map((trader) => (
              <div key={trader.rank} className="flex items-center justify-between p-3.5 bg-white/40 dark:bg-zinc-900/40 hover:bg-white/60 dark:hover:bg-zinc-900/60 transition-colors rounded-2xl border border-white/20 dark:border-white/5 group">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-xs font-bold text-muted-foreground bg-background/50 shrink-0">
                    {trader.rank}
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0">
                    <img src={getAvatarUrl(trader.avatar)} alt={trader.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm text-foreground">{trader.name}</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5">
                      ?? Trades won: <span className="text-emerald-500">? {trader.wins}</span> / {trader.total}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground hidden sm:inline">PnL:</span>
                  <span className="font-black text-indigo-500 dark:text-indigo-400 text-base md:text-lg w-16 text-right">${trader.pnl}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Rewards Sidebar */}
      <div className="w-full xl:w-[380px] shrink-0 flex flex-col pt-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center border border-indigo-500/20">
            <Trophy className="w-7 h-7 text-indigo-400" />
          </div>
          <div>
            <div className="text-indigo-400 text-sm font-semibold tracking-wide">Monthly</div>
            <h2 className="text-3xl font-black text-foreground">Rewards</h2>
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground leading-relaxed mb-8 border-b border-border/50 pb-8">
          At the end of each month, the top 10 winners on our leaderboard receive $USDC rewards based on their ranking.
        </p>

        <div className="flex flex-col gap-3">
          {REWARDS.map((reward, i) => {
            const isTop3 = i < 3;
            return (
              <div 
                key={reward.place} 
                className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                  isTop3 
                    ? "bg-gradient-to-r from-slate-200 to-white dark:from-slate-800 dark:to-slate-700/80 border border-white/50 dark:border-white/10 shadow-lg" 
                    : "bg-transparent border border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-xl font-black ${isTop3 ? "text-foreground" : "text-muted-foreground"}`}>
                    {parseInt(reward.place)}<span className={`text-sm font-semibold ml-0.5 ${isTop3 ? "text-muted-foreground/80" : "text-muted-foreground/50"}`}>{reward.place.replace(/[0-9]/g, '')}</span>
                  </span>
                  <span className={`text-sm ${isTop3 ? "text-muted-foreground font-medium" : "text-muted-foreground/60"}`}>place</span>
                </div>
                <span className={`text-xl font-black ${isTop3 ? "text-foreground drop-shadow-sm" : "text-foreground"}`}>
                  <span className="text-sm mr-1 opacity-70">$</span>{reward.amount}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
