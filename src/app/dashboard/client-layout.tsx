'use client';
import { useState } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, Calendar as CalendarIcon, BarChart3, BrainCircuit, Link2, Settings, Plus, Search, Bell, Menu, X, Trophy, Target } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoLink } from "@/components/logo";
import { LogTradeModal } from "@/components/log-trade-modal";
import { DotPattern } from "@/components/ui/dot-pattern";
import { AccountSwitcher } from "@/components/account-switcher";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Input } from "@/components/base/input/input";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "react-aria-components";

const inter = Inter({ subsets: ["latin"] });

export function DashboardClientLayout({
  children,
  user,
}: Readonly<{
  children: React.ReactNode;
  user: any;
}>) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLinks = () => (
    <>
      <NavItem href="/dashboard" icon={<LayoutDashboard size={16} />} label="Dashboard" active={pathname === '/dashboard'} onClick={() => setIsMobileMenuOpen(false)} />
      <NavItem href="/dashboard/journal" icon={<BookOpen size={16} />} label="Trade Journal" active={pathname === '/dashboard/journal'} onClick={() => setIsMobileMenuOpen(false)} />
      <NavItem href="/dashboard/playbook" icon={<BookOpen size={16} />} label="Playbook" active={pathname === '/dashboard/playbook'} onClick={() => setIsMobileMenuOpen(false)} isProFeature />
      <NavItem href="/dashboard/calendar" icon={<CalendarIcon size={16} />} label="Calendar" active={pathname === '/dashboard/calendar'} onClick={() => setIsMobileMenuOpen(false)} />
      <NavItem href="/dashboard/analytics" icon={<BarChart3 size={16} />} label="Analytics" active={pathname === '/dashboard/analytics'} onClick={() => setIsMobileMenuOpen(false)} />
      <NavItem href="/dashboard/discipline-board" icon={<Target size={16} />} label="Discipline Board" active={pathname === '/dashboard/discipline-board'} onClick={() => setIsMobileMenuOpen(false)} />
      <NavItem href="/dashboard/leaderboard" icon={<Trophy size={16} />} label="Leaderboard" active={pathname === '/dashboard/leaderboard'} onClick={() => setIsMobileMenuOpen(false)} />
      <NavItem href="/dashboard/ai-coach" icon={<BrainCircuit size={16} />} label="AI Coach" active={pathname === '/dashboard/ai-coach'} onClick={() => setIsMobileMenuOpen(false)} isProFeature />
      <NavItem href="/dashboard/brokers" icon={<Link2 size={16} />} label="Broker Connections" active={pathname === '/dashboard/brokers'} onClick={() => setIsMobileMenuOpen(false)} />
      
      <div className="pt-6 pb-2 px-3">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">System</p>
      </div>
      
      <NavItem href="/dashboard/settings" icon={<Settings size={16} />} label="Settings" active={pathname === '/dashboard/settings'} onClick={() => setIsMobileMenuOpen(false)} />
    </>
  );

  return (
    <div className="bg-background text-foreground h-screen w-full font-sans transition-colors duration-300">
      <div className="flex h-screen overflow-hidden">
        
        {/* Desktop Sidebar */}
        <aside className="w-[260px] flex-col hidden md:flex border-r border-border bg-background z-20 shrink-0">
          <div className="pt-6 px-5 pb-4">
            <LogoLink />
            <div className="inline-flex items-center gap-1.5 bg-secondary border border-border px-2 py-0.5 rounded text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mt-1">
              {/* Dynamic Plan Badge */}
              <div className={`w-1.5 h-1.5 rounded-full ${user?.isPro ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
              {user?.isPro ? 'Pro Tier' : 'Basic Plan'}
            </div>
          </div>
          
          <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar mt-4">
            <NavLinks />
          </nav>
          
          <div className="p-4 border-t border-border bg-secondary/50">
            <LogTradeModal />
          </div>
        </aside>

        {/* Mobile Slide-out Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
            <aside className="relative w-[280px] h-full flex flex-col bg-card border-r border-border shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="p-4 flex items-center justify-between border-b border-border">
                <LogoLink />
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-muted-foreground hover:text-foreground rounded-md">
                  <X size={20} />
                </button>
              </div>
              <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar mt-4">
                <NavLinks />
              </nav>
              <div className="p-4 border-t border-border bg-secondary/50">
                <LogTradeModal />
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col relative z-10 overflow-hidden bg-background">
          <DotPattern width={20} height={20} cx={1} cy={1} cr={1.5} className="opacity-50" />
          
          {/* Topbar */}
          <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-border bg-background/60 backdrop-blur-xl relative z-30">
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Menu size={20} />
              </button>
              
              <div className="hidden sm:block w-[240px] lg:w-[320px]">
                <Input 
                  placeholder="Search trades..." 
                  icon={Search}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4 md:gap-6 relative">
              <div className="hidden lg:block">
                <AccountSwitcher />
              </div>
              <div className="hidden lg:block h-4 w-px bg-border"></div>
              
              <div className="flex items-center gap-3 md:gap-4 relative">
                <ThemeToggle />
                
                {/* Notifications */}
                <Dropdown.Root>
                  <Button className="relative p-1 text-muted-foreground hover:text-foreground transition-colors outline-none cursor-pointer bg-transparent border-none">
                    <Bell size={18} />
                    <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-rose-500 rounded-full border border-card"></span>
                  </Button>
                  <Dropdown.Popover className="w-80 p-0 bg-card rounded-xl shadow-lg border border-border">
                    <div className="p-3 border-b border-border flex justify-between items-center bg-card rounded-t-xl">
  <span className="font-bold text-sm text-foreground">Notifications</span>
  <span className="text-xs text-indigo-500 cursor-pointer hover:underline">Mark all read</span>
</div>
<div className="p-2 bg-card rounded-b-xl max-h-64 overflow-y-auto custom-scrollbar">
<Dropdown.Menu className="p-0 outline-none">
                        <Dropdown.Item className="p-2 mb-1 rounded-lg" unstyled>
                          <p className="text-sm font-semibold text-foreground">EA Sync Successful</p>
                          <p className="text-xs text-muted-foreground mt-0.5">3 new trades imported from MT5</p>
                        </Dropdown.Item>
                        <Dropdown.Item className="p-2 rounded-lg" unstyled>
                          <p className="text-sm font-semibold text-foreground">Risk Alert</p>
                          <p className="text-xs text-muted-foreground mt-0.5">You've hit your daily loss limit.</p>
                        </Dropdown.Item>
</Dropdown.Menu>
</div>
                  </Dropdown.Popover>
                </Dropdown.Root>

                {/* Profile */}
                <Dropdown.Root>
                  <Button className="outline-none cursor-pointer border-none bg-transparent p-0 focus:outline-none">
                    <Avatar 
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" 
                      alt="Avatar" 
                      size="sm"
                      className="cursor-pointer"
                    />
                  </Button>
                  <Dropdown.Popover className="w-56 p-1 bg-card rounded-xl shadow-lg border border-border">
                      <div className="px-2 py-1.5 border-b border-border mb-1">
                        <p className="font-bold text-sm text-foreground">{user?.fullName || "Trader"}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[180px]">{user?.email}</p>
                      </div>
                      <Dropdown.Menu className="outline-none">
                      <Dropdown.Item href="/dashboard/settings" label="Profile Settings" />
                      <Dropdown.Item href="/pricing" label="Billing" />
                      <Dropdown.Separator />
                      <Dropdown.Item href="/auth/login" label="Log out" className="text-rose-600 data-[focused]:bg-rose-50 dark:data-[focused]:bg-rose-500/10 data-[focused]:text-rose-600" />
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown.Root>
                
              </div>
            </div>
          </header>

          {/* Scrollable Page Content */}
          <main className="flex-1 overflow-y-scroll p-4 md:p-8 relative z-10 custom-scrollbar">
            <div className="max-w-[1400px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label, active = false, onClick, isProFeature }: { href: string, icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void, isProFeature?: boolean }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
        active 
          ? "bg-secondary text-foreground" 
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
      }`}
    >
      <span className={`${active ? "text-foreground" : "text-muted-foreground"}`}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
