import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/auth";

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    const body = await req.json();
    const trade = await prisma.trade.findUnique({ where: { id } });

    if (!trade || trade.userId !== user.id) {
      return NextResponse.json({ error: "Trade not found" }, { status: 404 });
    }

    const updatedTrade = await prisma.trade.update({
      where: { id },
      data: {
        symbol: body.symbol ?? trade.symbol,
        side: body.side ?? trade.side,
        entryPrice: body.entryPrice ?? trade.entryPrice,
        exitPrice: body.exitPrice ?? trade.exitPrice,
        realizedPnl: body.realizedPnl ?? trade.realizedPnl,
      }
    });

    return NextResponse.json(updatedTrade);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const resolvedParams = await params;
  const { id } = resolvedParams;

  try {
    const trade = await prisma.trade.findUnique({ where: { id } });

    if (!trade || trade.userId !== user.id) {
      return NextResponse.json({ error: "Trade not found" }, { status: 404 });
    }

    await prisma.trade.delete({ where: { id } });

    return NextResponse.json({ message: "Trade deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
