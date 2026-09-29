export default function AdminSubscriptionsPage() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-zinc-900 dark:text-white">Subscriptions & Disputes</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Manage billing issues, refunds, and subscriptions.</p>
      </div>
      <div className="bg-white dark:bg-[#111111] p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <p className="text-zinc-500 text-center py-8">No active disputes.</p>
      </div>
    </div>
  );
}
