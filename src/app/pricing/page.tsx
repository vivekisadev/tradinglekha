import { PricingSection } from "@/components/pricing-section";
import { FaqSection } from "@/components/faq-section";
import { FinalCta } from "@/components/final-cta";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { BarChart3 } from "lucide-react";
import { LogoLink } from "@/components/logo";
import { getUser } from "@/lib/auth";

export default async function PricingPage() {
  const user = await getUser();
  const isLoggedIn = !!user;
  return (
    <div className="min-h-screen bg-[#FDFCF8] dark:bg-[#09090B] selection:bg-emerald-500/30 font-sans text-foreground overflow-x-hidden relative">
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-[1200px] z-50 rounded-full border border-black/5 dark:border-white/10 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl shadow-sm flex items-center justify-between px-6 py-4">
        <LogoLink />
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {isLoggedIn ? (
            <Link href="/dashboard" className="text-[15px] font-medium text-white bg-emerald-500 px-5 py-2.5 rounded-full transition-all">Go to Dashboard</Link>
          ) : (
            <>
              <Link href="/auth/login" className="text-[15px] font-medium text-muted-foreground hover:text-foreground hidden sm:block">Sign In</Link>
              <Link href="/auth/signup" className="text-[15px] font-medium text-white bg-emerald-500 px-5 py-2.5 rounded-full transition-all">Get Started</Link>
            </>
          )}
        </div>
      </header>

      <main className="pt-32 pb-20">
        <PricingSection isLoggedIn={isLoggedIn} isPro={user?.isPro || false} />
        <FaqSection />
        <FinalCta />
      </main>
    </div>
  );
}
