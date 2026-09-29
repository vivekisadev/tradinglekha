import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Skiper87 = () => {
  return (
    <div className="bg-card flex h-full w-full flex-col items-center justify-center gap-10 py-10">
      <div className="-mt-10 mb-8 grid content-start justify-items-center gap-6 text-center relative">
        <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
          see the fade while scroll
        </span>
      </div>
      <div className="rounded-xl border border-border w-full max-w-sm relative">
        {/* Fade overlay top */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-card to-transparent pointer-events-none z-10 rounded-t-xl" />
        
        <ScrollArea className="w-full h-72 rounded-xl">
          <div className="space-y-1 p-2 pt-6 pb-6">
            {Array.from({ length: 15 }).map((_, index) => (
              <div
                key={index}
                className="text-foreground/50 hover:bg-foreground/10 bg-secondary/50 flex h-10 w-full items-center gap-2 rounded-lg px-4 transition-colors cursor-pointer"
              >
                <span className="font-mono text-xs">00{index}</span> 
                <div className="bg-foreground/10 h-px flex-1"></div>
                <span className="text-xs text-muted-foreground">Item details</span>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {/* Fade overlay bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent pointer-events-none z-10 rounded-b-xl" />
      </div>
    </div>
  );
};
