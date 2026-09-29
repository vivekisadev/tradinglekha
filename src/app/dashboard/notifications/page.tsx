export default function NotificationsPage() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Notifications</h1>
        <p className="text-muted-foreground">Your recent alerts, messages, and platform updates.</p>
      </div>
      <div className="bg-card dark:bg-[#111111] p-6 rounded-xl border border-border shadow-sm">
        <p className="text-muted-foreground text-center py-8">You have no new notifications.</p>
      </div>
    </div>
  );
}
