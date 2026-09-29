export default function DisciplineBoardPage() {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Discipline Board</h1>
        <p className="text-muted-foreground">Track your rule-following behavior and maintain trading consistency.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card dark:bg-[#111111] p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-1">Discipline Score</h3>
          <div className="text-4xl font-black text-emerald-500">92/100</div>
          <p className="text-sm text-muted-foreground mt-2">Excellent consistency this week.</p>
        </div>
        
        <div className="bg-card dark:bg-[#111111] p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-1">Anomalies Flagged</h3>
          <div className="text-4xl font-black text-amber-500">2</div>
          <p className="text-sm text-muted-foreground mt-2">Outsized losses detected.</p>
        </div>
        
        <div className="bg-card dark:bg-[#111111] p-6 rounded-xl border border-border shadow-sm">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-1">Rules Broken</h3>
          <div className="text-4xl font-black text-rose-500">0</div>
          <p className="text-sm text-muted-foreground mt-2">Stop losses respected.</p>
        </div>
      </div>

      <div className="bg-card dark:bg-[#111111] p-6 rounded-xl border border-border shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Anomalies</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <div>
              <p className="font-semibold text-amber-600 dark:text-amber-500">Outsized Loss Warning</p>
              <p className="text-sm text-muted-foreground">Trade on NIFTY50 exceeded maximum 2% risk threshold.</p>
            </div>
            <span className="text-xs font-medium text-muted-foreground">2 days ago</span>
          </div>
          <div className="flex items-center justify-between p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <div>
              <p className="font-semibold text-amber-600 dark:text-amber-500">Revenge Trading Pattern</p>
              <p className="text-sm text-muted-foreground">Multiple entries within 5 minutes after a stopped-out position.</p>
            </div>
            <span className="text-xs font-medium text-muted-foreground">4 days ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
