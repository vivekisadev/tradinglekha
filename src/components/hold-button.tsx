"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Trash2 } from "lucide-react";

interface HoldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onHoldComplete: () => void;
  holdDuration?: number;
  label?: string;
}

export function HoldButton({
  onHoldComplete,
  holdDuration = 1000,
  label = "Hold to delete",
  className = "",
  ...props
}: HoldButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHolding) {
      const startTime = Date.now();
      interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentProgress = Math.min((elapsed / holdDuration) * 100, 100);
        setProgress(currentProgress);
        
        if (currentProgress >= 100) {
          clearInterval(interval);
          setIsHolding(false);
          onHoldComplete();
        }
      }, 16);
    } else {
      setProgress(0);
    }
    return () => clearInterval(interval);
  }, [isHolding, holdDuration, onHoldComplete]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHolding(true);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHolding(false);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <button
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={handleClick}
      onContextMenu={(e) => e.preventDefault()}
      className={`relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors h-8 flex items-center px-3 gap-2 ${className}`}
      {...props}
    >
      <div className="relative z-10 flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <Trash2 size={14} className="text-zinc-700 dark:text-zinc-300" />
      </div>
      <motion.div
        className="absolute inset-0 bg-red-500/20 dark:bg-red-500/30 origin-left z-0"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        transition={{ duration: 0 }}
      />
      {progress >= 100 && (
        <motion.div
          className="absolute inset-0 bg-red-500 z-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Trash2 size={14} className="text-white relative z-10" />
        </motion.div>
      )}
    </button>
  );
}
