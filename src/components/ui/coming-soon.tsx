"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef, useState, useEffect } from "react";
import {
  ZoomTextReveal,
  FinalRevealScene,
} from "@/components/ui/zoom-text-reveal";
import {
  Camera,
  Brain,
  BarChart3,
  CheckCircle2,
  Trophy,
  Shield,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

type IconProps = {
  icon: React.ElementType;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

const TypewriterText = ({
  text,
  onComplete,
}: {
  text: string;
  onComplete: () => void;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 50); // typing speed
      return () => clearTimeout(timeout);
    } else {
      setTimeout(onComplete, 500);
    }
  }, [index, text, onComplete]);

  return (
    <span className="font-geist text-3xl md:text-5xl font-semibold tracking-tight text-foreground border-r-2 border-zinc-900 pr-1 animate-pulse">
      {displayedText}
    </span>
  );
};

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );

  return (
    <motion.span
      className={cn("inline-block text-foreground", isSpace && "w-4 md:w-8")}
      style={{ x, rotateX }}
    >
      {char}
    </motion.span>
  );
};

const CharacterIconV2 = ({
  icon: Icon,
  index,
  centerIndex,
  scrollYProgress,
}: IconProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 80, 0],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);
  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [Math.abs(distanceFromCenter) * 50, 0],
  );

  return (
    <motion.div
      className="inline-flex mx-2 items-center justify-center p-4 md:p-6 bg-card rounded-2xl md:rounded-3xl shadow-sm border border-border"
      style={{ x, scale, y, transformOrigin: "center" }}
    >
      <Icon
        className="w-10 h-10 md:w-16 md:h-16 text-foreground"
        strokeWidth={1.5}
      />
    </motion.div>
  );
};

const CharacterIconV3 = ({
  icon: Icon,
  index,
  centerIndex,
  scrollYProgress,
}: IconProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 90, 0],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 15, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [-Math.abs(distanceFromCenter) * 20, 0],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

  return (
    <motion.div
      className="inline-flex mx-2 items-center justify-center p-4 md:p-6 bg-zinc-900 rounded-2xl md:rounded-3xl shadow-md border border-zinc-800"
      style={{ x, rotate, y, scale, transformOrigin: "center" }}
    >
      <Icon
        className="w-10 h-10 md:w-16 md:h-16 text-zinc-100"
        strokeWidth={1.5}
      />
    </motion.div>
  );
};

export const ComingSoon = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const targetRef2 = useRef<HTMLDivElement | null>(null);
  const targetRef3 = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ target: targetRef });
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: targetRef2,
  });
  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: targetRef3,
  });

  const [introDone, setIntroDone] = useState(false);
  const text = "DISCIPLINE, TRACKED.";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  const iconsSection2 = [Camera, Brain, BarChart3, CheckCircle2];
  const iconCenterIndex2 = Math.floor(iconsSection2.length / 2);

  const iconsSection3 = [Trophy, Shield, TrendingUp, TrendingDown];
  const iconCenterIndex3 = Math.floor(iconsSection3.length / 2);

  return (
    <ReactLenis root>
      <main className="w-full bg-[#f5f4f3] min-h-screen">
        {/* Intro Section */}
        <div className="flex h-screen w-full flex-col items-center justify-center bg-[#f5f4f3]">
          <TypewriterText
            text="Hello and welcome trader."
            onComplete={() => setIntroDone(true)}
          />
          <AnimatePresence>
            {introDone && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
              >
                <span className="relative max-w-[15ch] text-sm uppercase leading-tight opacity-50 tracking-widest text-center">
                  Scroll down to continue
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Section 1 - Hero */}
        <div
          ref={targetRef}
          className="relative box-border flex h-[210vh] items-center justify-center gap-[2vw] overflow-hidden bg-[#f5f4f3] p-[2vw]"
        >
          <div
            className="font-geist w-full max-w-5xl text-center text-5xl md:text-8xl font-black uppercase tracking-tighter text-foreground"
            style={{ perspective: "500px" }}
          >
            {characters.map((char, index) => (
              <CharacterV1
                key={index}
                char={char}
                index={index}
                centerIndex={centerIndex}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>

        {/* Section 2 - How it works */}
        <div
          ref={targetRef2}
          className="relative -mt-[100vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-[#f5f4f3] p-[2vw]"
        >
          <p className="font-geist flex items-center justify-center gap-3 text-xl md:text-2xl font-medium tracking-tight text-black mb-8">
            <Bracket className="h-8 md:h-12 text-black" />
            <span className="font-geist font-medium">
              log a trade in one screenshot
            </span>
            <Bracket className="h-8 md:h-12 scale-x-[-1] text-black" />
          </p>
          <div className="flex items-center justify-center w-full max-w-4xl">
            {iconsSection2.map((Icon, index) => (
              <CharacterIconV2
                key={index}
                icon={Icon}
                index={index}
                centerIndex={iconCenterIndex2}
                scrollYProgress={scrollYProgress2}
              />
            ))}
          </div>
          <p className="mt-8 md:mt-12 text-center max-w-md text-muted-foreground font-medium leading-relaxed px-4">
            Upload a screenshot. AI reads the entry, exit, size, and P&L. Or
            type it in yourself, your call.
          </p>
        </div>

        {/* Section 3 - What you get */}
        <div
          ref={targetRef3}
          className="relative -mt-[95vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-[#f5f4f3] p-[2vw]"
        >
          <p className="font-geist flex items-center justify-center gap-3 text-xl md:text-2xl font-medium tracking-tight text-black mb-8">
            <Bracket className="h-8 md:h-12 text-black" />
            <span className="font-geist font-medium">see where you stand</span>
            <Bracket className="h-8 md:h-12 scale-x-[-1] text-black" />
          </p>
          <div
            className="flex items-center justify-center w-full max-w-4xl"
            style={{ perspective: "500px" }}
          >
            {iconsSection3.map((Icon, index) => (
              <CharacterIconV3
                key={index}
                icon={Icon}
                index={index}
                centerIndex={iconCenterIndex3}
                scrollYProgress={scrollYProgress3}
              />
            ))}
          </div>
          <p className="mt-8 md:mt-12 text-center max-w-md text-muted-foreground font-medium leading-relaxed px-4">
            Your discipline score isn't a vanity metric, it's built from your
            actual win/loss consistency.
          </p>
        </div>

        {/* Section 4 - CTA */}
        <div className="relative -mt-[50vh] box-border flex min-h-[100vh] flex-col items-center justify-center gap-6 bg-[#f5f4f3] p-[2vw] pb-32">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-foreground text-center">
            be first in
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-md text-center px-4">
            Early access includes a discounted first month.
          </p>
          <div className="flex w-full max-w-md flex-col md:flex-row items-center gap-2 mt-8 px-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-14 w-full rounded-xl border border-border bg-card px-4 py-2 text-base shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition-all"
            />
            <button className="inline-flex h-14 w-full md:w-auto shrink-0 items-center justify-center rounded-xl bg-zinc-900 px-8 text-base font-semibold text-white shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 focus:ring-offset-[FDF5EC] transition-all">
              Notify Me
            </button>
          </div>
          <div className="absolute bottom-8 text-sm font-medium text-muted-foreground">
            Tradinglekha · Launching soon
          </div>
        </div>
      </main>
    </ReactLenis>
  );
};

const Bracket = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 27 78"
      className={className}
    >
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      ></path>
    </svg>
  );
};
