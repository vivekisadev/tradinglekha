import { getUser } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { CalendarClient } from "./calendar-client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function CalendarPage() {
  const user = await getUser();
  if (!user) redirect("/auth/login");

  const trades = await prisma.trade.findMany({
    where: { userId: user.id },
    orderBy: { openedAt: 'asc' },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">Calendar</h1>
        <p className="text-muted-foreground">View your trades and P&L by day.</p>
      </div>
      <CalendarClient trades={trades} />
    </div>
  );
}
