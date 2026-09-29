export default function AdminFlaggedTradesPage() {
  const FLAGGED = [
    { id: "TRD-092", user: "Trader Alpha", issue: "Currency mismatch anomaly", date: "Oct 15, 2026", status: "Pending" },
    { id: "TRD-088", user: "NightOwl", issue: "Unusual quantity scale", date: "Oct 14, 2026", status: "Pending" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-white">Flagged Trades</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Review AI-flagged anomalous entries.</p>
      </div>

      <div className="bg-white dark:bg-[#111111] rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
              <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-widest">Trade ID</th>
              <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-widest">User</th>
              <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-widest">Issue</th>
              <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-widest">Date</th>
              <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {FLAGGED.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-zinc-500">No flagged trades.</td>
              </tr>
            ) : (
              FLAGGED.map((f) => (
                <tr key={f.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                  <td className="py-4 px-6 font-mono text-sm text-zinc-700 dark:text-zinc-300">{f.id}</td>
                  <td className="py-4 px-6 font-semibold text-zinc-900 dark:text-white">{f.user}</td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 text-xs font-bold rounded bg-amber-500/10 text-amber-600 dark:text-amber-500">
                      {f.issue}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-zinc-700 dark:text-zinc-300">{f.date}</td>
                  <td className="py-4 px-6 text-right space-x-3">
                    <button className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 hover:underline">Approve</button>
                    <button className="text-xs font-semibold text-rose-600 dark:text-rose-500 hover:underline">Reject</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
