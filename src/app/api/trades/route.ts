import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const trades = await prisma.trade.findMany({
    where: { userId: user.id },
    orderBy: { openedAt: 'desc' },
  });

  return NextResponse.json(trades);
}

export async function POST(req: NextRequest) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { symbol, side, entryPrice, exitPrice, accountId } = body;

    if (!symbol || !side || !entryPrice || !exitPrice) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Default to the first account if none provided
    let targetAccountId = accountId;
    if (!targetAccountId) {
      const account = await prisma.account.findFirst({ where: { userId: user.id } });
      if (account) targetAccountId = account.id;
    }

    // Simple realized PnL calculation for MVP (assuming size=1)
    const entry = parseFloat(entryPrice);
    const exit = parseFloat(exitPrice);
    const realizedPnl = side === 'LONG' ? (exit - entry) : (entry - exit);

    const trade = await prisma.trade.create({
      data: {
        userId: user.id,
        accountId: targetAccountId,
        symbol,
        side,
        entryPrice: entry,
        exitPrice: exit,
        realizedPnl,
        openedAt: new Date(),
        closedAt: new Date(), // for simplicity, assuming immediate close
        status: 'CLOSED',
        assetClass: 'Equity', // Hardcoded for basic plan
        currency: user.defaultCurrency || 'USD',
      }
    });

    return NextResponse.json(trade, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
