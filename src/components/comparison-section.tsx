import React from "react";
import {
  CheckCircle2,
  FileSpreadsheet,
  BookOpen,
  Sparkles,
} from "lucide-react";

export function ComparisonSection() {
  const comparisonData = [
    {
      id: "01",
      title: "Trade Logging",
      col1: "Manual data entry and complex CSV formatting.",
      col2: "Broker sync, but requires manual trade tagging.",
      highlight: "Instant API sync with AI auto-tagging.",
    },
    {
      id: "02",
      title: "Analytics & Charts",
      col1: "Build and maintain your own formulas and charts.",
      col2: "Standard P&L and basic win-rate visualizations.",
      highlight: "Deep behavioral analytics & interactive charting.",
    },
    {
      id: "03",
      title: "Psychology",
      col1: "Type raw notes into a cramped cell.",
      col2: "Basic text fields for emotions and setups.",
      highlight: "AI sentiment analysis on your journal entries.",
    },
    {
      id: "04",
      title: "Edge Discovery",
      col1: "Requires complex pivot tables and data mastery.",
      col2: "Manually filter by tags to find what works.",
      highlight: "AI automatically highlights profitable setups.",
    },
    {
      id: "05",
      title: "Risk Management",
      col1: "Hard to track dynamically in real-time.",
      col2: "Basic R-multiple and drawdown tracking.",
      highlight: "Predictive risk warnings before you tilt.",
    },
  ];

  return (
    <section className="force-light w-full max-w-[1200px] mx-auto px-6 py-24 font-sans">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold dark:text-white tracking-tight text-foreground mb-2">
          Your next trade.
        </h2>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-emerald-500 mb-6">
          Analyzed automatically.
        </h2>
      </div>

      <div className="w-full overflow-x-auto pb-8">
        <div className="min-w-[900px] bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm relative">
          <table className="w-full text-left border-collapse relative z-10">
            <thead>
              <tr className="border-b border-border/50">
                <th className="py-6 pr-6 align-top w-[20%]">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                    From execution
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                    to analysis.
                  </span>
                </th>

                <th className="py-6 px-6 align-top w-[25%]">
                  <FileSpreadsheet className="w-5 h-5 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Spreadsheets
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    You build the formulas
                  </p>
                </th>

                <th className="py-6 px-6 align-top w-[25%]">
                  <BookOpen className="w-5 h-5 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Standard Journals
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    Basic tracking
                  </p>
                </th>

                <th className="py-6 px-6 align-top w-[30%] bg-[#f0f4ff] rounded-t-2xl relative">
                  <div className="absolute inset-0 bg-[#f0f4ff] rounded-t-3xl -z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] dark:shadow-none" />
                  <Sparkles className="w-5 h-5 text-[#5b6be4] mb-4" />
                  <h3 className="text-lg font-black text-foreground tracking-wide mb-1 flex items-center gap-2">
                    TRADINGLEKHA
                  </h3>
                  <p className="text-sm text-[#5b6be4] font-semibold">
                    Your AI trading copilot.
                  </p>
                </th>
              </tr>
            </thead>

            <tbody>
              {comparisonData.map((row, index) => (
                <tr
                  key={row.id}
                  className="border-b border-border/50 last:border-0 group"
                >
                  <td className="py-8 pr-6 align-top">
                    <span className="text-[10px] font-bold text-muted-foreground mb-1 block">
                      {row.id}
                    </span>
                    <h4 className="font-bold text-foreground text-sm">
                      {row.title}
                    </h4>
                  </td>

                  <td className="py-8 px-6 align-top">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {row.col1}
                    </p>
                  </td>

                  <td className="py-8 px-6 align-top">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {row.col2}
                    </p>
                  </td>

                  <td
                    className={`py-8 px-6 align-top relative bg-[#f0f4ff] ${index === comparisonData.length - 1 ? "rounded-b-2xl" : ""}`}
                  >
                    {/* Background extension for the column */}
                    <div
                      className={`absolute inset-0 bg-[#f0f4ff] -z-10 ${index === comparisonData.length - 1 ? "rounded-b-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] dark:shadow-none" : ""}`}
                    />

                    <div className="flex gap-3 relative z-10">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <p className="text-sm font-semibold text-foreground leading-relaxed">
                        {row.highlight}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
