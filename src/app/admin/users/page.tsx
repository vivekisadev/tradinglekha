export default function AdminUsersPage() {
  const USERS = [
    { id: 1, email: "alpha@example.com", name: "Trader Alpha", plan: "Pro", status: "Active", joined: "Oct 12, 2026" },
    { id: 2, email: "beta@example.com", name: "Omega Striker", plan: "Free", status: "Active", joined: "Oct 14, 2026" },
    { id: 3, email: "charlie@example.com", name: "ZenTrader", plan: "Pro", status: "Suspended", joined: "Nov 01, 2026" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-white">User Management</h1>
          <p className="text-zinc-500 dark:text-zinc-400">View and manage all registered users.</p>
        </div>
        <button className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm">
          Export CSV
        </button>
      </div>

      <div className="bg-white dark:bg-[#111111] rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
              <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-widest">User</th>
              <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-widest">Plan</th>
              <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-widest">Status</th>
              <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-widest">Joined</th>
              <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {USERS.map((u) => (
              <tr key={u.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-colors">
                <td className="py-4 px-6">
                  <div className="font-semibold text-zinc-900 dark:text-white">{u.name}</div>
                  <div className="text-xs text-zinc-500">{u.email}</div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 text-xs font-bold rounded ${u.plan === 'Pro' ? 'bg-[#2E5D9F]/10 text-[#2E5D9F] dark:bg-[#5B8DEF]/10 dark:text-[#5B8DEF]' : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>
                    {u.plan}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2 py-1 text-xs font-bold rounded ${u.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`}>
                    {u.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-zinc-700 dark:text-zinc-300">{u.joined}</td>
                <td className="py-4 px-6 text-right">
                  <button className="text-xs font-semibold text-[#2E5D9F] dark:text-[#5B8DEF] hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
