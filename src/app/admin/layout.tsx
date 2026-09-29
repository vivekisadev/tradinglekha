'use client';
import { Inter } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Flag, Settings, ArrowLeft, Receipt } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoLink } from "@/components/logo";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const NavItem = ({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) => {
    const active = pathname === href;
    return (
      <Link 
        href={href} 
        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
          active 
            ? "bg-[#2E5D9F] text-white dark:bg-[#5B8DEF]/20 dark:text-[#5B8DEF]" 
            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-[#0B0F19]/50"
        }`}
      >
        <span className={active ? "" : "text-zinc-400"}>{icon}</span>
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <div className="bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 h-screen w-full font-sans transition-colors duration-300 flex">
      {/* Desktop Sidebar */}
      <aside className="w-[260px] flex-col hidden md:flex border-r border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-[#09090b] z-20 shrink-0">
        <div className="pt-6 px-5 pb-4">
          <div className="flex items-center gap-2 mb-1"><LogoLink /><span className="text-amber-500 font-bold text-sm bg-amber-500/10 px-2 py-0.5 rounded">Admin</span></div>
        </div>
        
        <nav className="flex-1 px-3 space-y-1 mt-4">
          <NavItem href="/admin" icon={<LayoutDashboard size={16} />} label="Overview" />
          <NavItem href="/admin/users" icon={<Users size={16} />} label="Users & Access" />
          <NavItem href="/admin/flagged" icon={<Flag size={16} />} label="Flagged Trades" />
          <NavItem href="/admin/subscriptions" icon={<Receipt size={16} />} label="Subscriptions" />
          <NavItem href="/admin/settings" icon={<Settings size={16} />} label="Platform Settings" />
        </nav>

        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800/50">
          <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
            <ArrowLeft size={16} />
            Back to App
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10 overflow-hidden bg-zinc-50 dark:bg-[#09090b]">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-end px-4 md:px-8 border-b border-zinc-200 dark:border-zinc-800/50 bg-white/60 dark:bg-[#09090b]/60 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="text-sm font-bold bg-amber-500/10 text-amber-600 dark:text-amber-500 px-3 py-1.5 rounded-md border border-amber-500/20">
              Super Admin
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
