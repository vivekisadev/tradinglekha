import React from "react";
import {
  Bot,
  Calendar,
  ShieldAlert,
  Activity,
  LineChart,
  Cpu,
  Globe,
} from "lucide-react";

export function BentoFeatures() {
  const smallCards = [
    {
      icon: <Bot className="w-5 h-5" />,
      title: "AI Trade Tagging",
      desc: "Automatically categorize setups without manual entry.",
      badge: "Live",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: "Missed Trades",
      desc: "Log missed opportunities to calculate potential edge.",
    },
    {
      icon: <ShieldAlert className="w-5 h-5" />,
      title: "Risk Guard",
      desc: "Get warned before you hit your daily drawdown limit.",
    },
    {
      icon: <Activity className="w-5 h-5" />,
      title: "Discipline Score",
      desc: "Track your emotional control on every execution.",
    },
    {
      icon: <LineChart className="w-5 h-5" />,
      title: "Custom Metrics",
      desc: "Track data points that matter to your unique strategy.",
    },
  ];

  return (
    <section className="force-light w-full max-w-[1200px] mx-auto px-6 py-24 font-sans overflow-hidden">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold dark:text-white tracking-tight text-foreground">
          Oh yeah, <span className="text-emerald-500">and all this too.</span>
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        {/* Top Row: Two Large Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Card: 1 Column */}
          <div className="lg:col-span-1 bg-white rounded-[2.5rem] p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="bg-[#fafafa] rounded-[2rem] h-full min-h-[400px] border border-border/50 relative overflow-hidden flex flex-col pt-10 px-8 pb-0 group">
              {/* Subtle Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-foreground mb-4 leading-tight">
                  Analyze markets <br /> without headaches.
                </h3>
                <p className="text-sm text-muted-foreground font-medium max-w-[250px]">
                  P&L charts, drawdown metrics, and distribution curves
                  generated automatically.
                </p>
              </div>

              {/* Decorative Graphic (Like the globe in the reference, but trading themed) */}
              <div className="absolute bottom-0 left-0 right-0 h-[220px] bg-gradient-to-b from-[#8b9ffe] to-[#5b6be4] dark:from-[#2a3a7e] dark:to-[#1a233a] rounded-t-3xl mx-6 translate-y-8 group-hover:translate-y-4 transition-transform duration-500">
                <div className="w-full h-full relative overflow-hidden rounded-t-3xl border border-white/20">
                  <div className="absolute top-6 left-6 bg-card/20 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 border border-white/30">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Edge Found
                    </span>
                  </div>
                  {/* Decorative chart lines inside the block */}
                  <svg
                    className="absolute bottom-0 left-0 w-full h-32 opacity-40"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,100 L0,50 Q25,20 50,60 T100,30 L100,100 Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: 2 Columns */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
            <div className="bg-[#fafafa] rounded-[2rem] h-full min-h-[400px] border border-border/50 relative overflow-hidden flex flex-col pt-10 px-8 lg:px-12 pb-0 group">
              {/* Subtle Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

              <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight max-w-lg">
                    Build a playbook that adapts to your style.
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium max-w-md">
                    Tag setups, grade your execution, and track the specific
                    market conditions in real time to refine your edge.
                  </p>
                </div>
              </div>

              {/* Decorative Browser/App Mockup */}
              <div className="flex-grow bg-zinc-950 rounded-t-2xl border border-zinc-800 border-b-0 relative overflow-hidden translate-y-6 group-hover:translate-y-2 transition-transform duration-500 shadow-2xl">
                {/* Browser Top Bar */}
                <div className="h-10 bg-zinc-900 border-b border-zinc-800 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <div className="mx-auto bg-zinc-950/50 rounded-md px-24 py-1 border border-zinc-800/50">
                    <span className="text-[10px] text-muted-foreground font-mono">
                      tradinglekha.com/playbook
                    </span>
                  </div>
                </div>
                {/* Browser Content */}
                <div className="w-full h-full bg-gradient-to-br from-emerald-900/20 via-zinc-950 to-zinc-950 p-6">
                  {/* Fake Dashboard Elements */}
                  <div className="w-1/3 h-6 bg-zinc-800/50 rounded-md mb-4" />
                  <div className="flex gap-4">
                    <div className="w-1/4 h-24 bg-zinc-800/30 rounded-lg border border-zinc-800/50" />
                    <div className="w-1/4 h-24 bg-zinc-800/30 rounded-lg border border-zinc-800/50" />
                    <div className="w-1/4 h-24 bg-zinc-800/30 rounded-lg border border-zinc-800/50" />
                    <div className="w-1/4 h-24 bg-zinc-800/30 rounded-lg border border-zinc-800/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Carousel of Small Cards */}
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          `,
            }}
          />

          {smallCards.map((card, idx) => (
            <div
              key={idx}
              className="min-w-[260px] md:min-w-[280px] snap-start shrink-0 bg-white rounded-[2rem] p-2 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
            >
              <div className="bg-[#fafafa] rounded-[1.5rem] h-full border border-border/50 relative overflow-hidden p-6 flex flex-col">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-8">
                    <div className="p-2.5 bg-background border border-border rounded-xl shadow-sm">
                      {React.cloneElement(
                        card.icon as React.ReactElement<any>,
                        { className: "text-foreground w-5 h-5" },
                      )}
                    </div>
                    {card.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-1 rounded-full flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        {card.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-foreground text-lg mb-2">
                    {card.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-auto">
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
