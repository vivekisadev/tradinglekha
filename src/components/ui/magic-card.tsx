"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

export function MagicCard({
  children,
  className = "",
  glowColor = "rgba(16, 185, 129, 0.15)", // Default emerald glow
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const isDark = resolvedTheme === "dark";
  const adjustedGlow = isDark ? glowColor : "rgba(0, 0, 0, 0.03)";
  const borderGlow = isDark ? glowColor.replace("0.15", "0.4") : "rgba(0, 0, 0, 0.1)";

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_40px_-10px_rgba(0,0,0,0.03)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 ${className}`}
    >
      {/* Background radial gradient (follows mouse) */}
      {mounted && (
        <>
          <div
            className="pointer-events-none absolute -inset-px transition duration-300 z-0"
            style={{
              opacity,
              background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${adjustedGlow}, transparent 40%)`,
            }}
          />
          {/* Border gradient (follows mouse) */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition duration-300 z-0"
            style={{
              opacity,
              background: `radial-gradient(300px circle at ${position.x}px ${position.y}px, ${borderGlow}, transparent 40%)`,
              WebkitMaskImage: "linear-gradient(black, black), linear-gradient(black, black)",
              WebkitMaskClip: "content-box, border-box",
              WebkitMaskComposite: "source-out",
              maskImage: "linear-gradient(black, black), linear-gradient(black, black)",
              maskClip: "content-box, border-box",
              maskComposite: "exclude",
              padding: "1px",
            }}
          />
        </>
      )}
      
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );

}
