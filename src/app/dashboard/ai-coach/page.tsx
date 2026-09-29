import { BrainCircuit } from "lucide-react";

import { ProFeatureLock } from "@/components/pro-feature-lock";
import { getUser } from "@/lib/auth";

export default async function AICoachPage() {
  const user = await getUser();
  return (
    <ProFeatureLock isPro={user?.isPro || false} title="AI Trading Coach" description="Unlock the AI Coach to automatically analyze your behavioral leaks and get personalized performance feedback.">
      
    <div className="flex flex-col items-center justify-center h-[70vh] text-center max-w-md mx-auto">
      <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
        <BrainCircuit size={32} />
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-3">AI Trading Coach</h1>
      <p className="text-muted-foreground leading-relaxed mb-8">
        Your personalized AI coach is analyzing your recent trading history. It will soon provide actionable feedback on your sizing, behavioral leaks, and optimal entry windows.
      </p>
      <button className="px-6 py-2.5 bg-zinc-900 dark:bg-card text-white dark:text-black rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
        Run Analysis Now
      </button>
    </div>
    </ProFeatureLock>
  );
}
