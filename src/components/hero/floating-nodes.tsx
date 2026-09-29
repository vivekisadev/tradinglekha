"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { TrendingUp, Shield, Target, Zap, BarChart2, Crosshair } from "lucide-react";

const NODES = [
  { id: 1, icon: TrendingUp, label: "Edge", top: "15%", left: "10%", size: 90, parallaxBase: 0.05 },
  { id: 2, icon: Shield, label: "Risk", top: "25%", left: "80%", size: 110, parallaxBase: -0.08 },
  { id: 3, icon: Target, label: "Discipline", top: "65%", left: "15%", size: 100, parallaxBase: 0.1 },
  { id: 4, icon: Zap, label: "Speed", top: "70%", left: "75%", size: 80, parallaxBase: -0.06 },
  { id: 5, icon: BarChart2, label: "Data", top: "40%", left: "88%", size: 120, parallaxBase: 0.07 },
  { id: 6, icon: Crosshair, label: "Focus", top: "45%", left: "5%", size: 95, parallaxBase: -0.04 },
];

export function FloatingNodes() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1 based on screen center
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {NODES.map((node) => (
        <FloatingNode key={node.id} node={node} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
}

function FloatingNode({ node, mouseX, mouseY }: any) {
  // Smooth out the mouse values
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig) as any;
  const springY = useSpring(mouseY, springConfig) as any;

  // Create parallax movement based on node's specific multiplier
  const moveX = useTransform(springX, [-1, 1], [-200 * node.parallaxBase, 200 * node.parallaxBase]);
  const moveY = useTransform(springY, [-1, 1], [-200 * node.parallaxBase, 200 * node.parallaxBase]);

  const Icon = node.icon;

  return (
    <motion.div
      drag
      dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
      dragElastic={0.2}
      whileDrag={{ scale: 1.1, cursor: "grabbing" }}
      whileHover={{ scale: 1.05 }}
      style={{
        position: "absolute",
        top: node.top,
        left: node.left,
        x: moveX as any,
        y: moveY as any,
        width: node.size,
        height: node.size,
      }}
      className="pointer-events-auto cursor-grab flex flex-col items-center justify-center rounded-full bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-shadow"
    >
      <Icon className="w-1/3 h-1/3 text-zinc-600 dark:text-zinc-400 mb-1" strokeWidth={1.5} />
      <span className="text-[10px] md:text-xs font-semibold text-zinc-500 dark:text-zinc-500 tracking-wider uppercase">{node.label}</span>
    </motion.div>
  );
}
