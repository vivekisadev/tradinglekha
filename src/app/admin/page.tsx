export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-white">Admin Overview</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Platform health, revenue, and active issues.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-1">Total Users</h3>
          <div className="text-3xl font-black text-zinc-900 dark:text-white">2,492</div>
          <p className="text-xs text-emerald-500 mt-2">+120 this week</p>
        </div>
        
        <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-1">MRR</h3>
          <div className="text-3xl font-black text-[#2E5D9F] dark:text-[#5B8DEF]">$12,450</div>
          <p className="text-xs text-emerald-500 mt-2">+5% this month</p>
        </div>

        <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-1">AI Trades Processed</h3>
          <div className="text-3xl font-black text-zinc-900 dark:text-white">84,102</div>
        </div>

        <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-1">Pending Flags</h3>
          <div className="text-3xl font-black text-amber-500">14</div>
          <p className="text-xs text-zinc-500 mt-2">Requires review</p>
        </div>
      </div>
    </div>
  );
}
