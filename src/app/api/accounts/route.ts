import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getUser } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, accountType, currency } = await req.json();

    // Check existing accounts
    const existingAccounts = await prisma.account.count({
      where: { userId: user.id }
    });

    // Enforce limits (Mocked based on subscription logic for now)
    // Free: 1, Pro Monthly: 2, Pro Yearly: 3, Elite Monthly: 3, Elite Yearly: Unlimited
    // Since we don't have full stripe setup, we simulate limits based on isPro
    const accountLimit = user.isPro ? 3 : 1; 

    if (existingAccounts >= accountLimit) {
      return NextResponse.json({ 
        error: `Account limit reached. Your current plan allows up to ${accountLimit} account(s). Please upgrade to add more.`
      }, { status: 403 });
    }

    const newAccount = await prisma.account.create({
      data: {
        userId: user.id,
        name: name || "New Account",
        accountType: accountType || "General",
        currency: currency || user.defaultCurrency || "USD",
      }
    });

    return NextResponse.json(newAccount);

  } catch (error: any) {
    console.error("Create Account Error:", error);
    return NextResponse.json({ error: "Failed to create account" }, { status: 500 });
  }
}
