import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const requestedCurrency = searchParams.get("currency");

    // Tiered Access Logic
    // Free users are locked to their default currency
    let targetCurrency = user.defaultCurrency || "USD";
    if (user.isPro && requestedCurrency) {
      targetCurrency = requestedCurrency;
    }

    // Fetch stats strictly isolated by the target currency
    const trades = await prisma.trade.findMany({
      where: {
        userId: user.id,
        currency: targetCurrency,
        status: "CLOSED",
      },
      select: {
        realizedPnl: true,
      },
    });

    const totalTrades = trades.length;
    let totalWins = 0;
    let grossProfit = 0;
    let grossLoss = 0;

    trades.forEach((trade) => {
      const pnl = Number(trade.realizedPnl || 0);
      if (pnl > 0) {
        totalWins++;
        grossProfit += pnl;
      } else if (pnl < 0) {
        grossLoss += Math.abs(pnl);
      }
    });

    const winRate = totalTrades > 0 ? (totalWins / totalTrades) * 100 : 0;
    const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? 999 : 0;

    return NextResponse.json({
      currency: targetCurrency,
      totalTrades,
      winRate: winRate.toFixed(2),
      profitFactor: profitFactor.toFixed(2),
      grossProfit,
      grossLoss,
      netProfit: grossProfit - grossLoss,
    });
  } catch (error: any) {
    console.error("Fetch Stats Error:", error);
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 });
  }
}
