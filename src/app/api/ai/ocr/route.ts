import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { getUser } from "@/lib/auth";
import { aiRateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Apply strict AI rate limit (1 req per minute)
    const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
    const identifier = user.id ? user.id : ip;
    const { success } = await aiRateLimit.limit(identifier);
    
    if (!success) {
      return NextResponse.json({ error: "Too many requests. Please wait a minute before analyzing another screenshot." }, { status: 429 });
    }

    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    const schema = z.object({
      assetClass: z.enum(["Equity", "F&O", "Commodity", "Crypto"]).describe("The asset class of the trade. Look for CE/PE for F&O, Lot sizes for Commodity."),
      symbol: z.string().describe("The ticker symbol or name of the asset traded (e.g. NIFTY, TSLA, GOLD)"),
      side: z.enum(["LONG", "SHORT"]).describe("The direction of the trade. Did they buy to open (LONG) or sell to open (SHORT)?"),
      currency: z.string().describe("The currency used for the trade (e.g. USD, INR, EUR)"),
      size: z.number().describe("The number of shares, lots, or contracts traded"),
      entryPrice: z.number().describe("The average price the trade was entered at"),
      exitPrice: z.number().optional().describe("The average price the trade was closed at, if available"),
      fees: z.number().optional().describe("Total commissions or fees paid"),
      realizedPnl: z.number().optional().describe("The realized profit or loss. Negative for a loss."),
    });

    const result = await generateObject({
      model: openai("gpt-4o"),
      schema,
      messages: [
        {
          role: "system",
          content: "You are a professional trading assistant. Your job is to extract exact financial data from trading screenshots with zero hallucination. Identify the asset class carefully based on strike prices (F&O) or lot sizes (Commodities). Ensure you capture the correct currency."
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Extract the trade details from this screenshot." },
            { type: "image", image: imageUrl }
          ]
        }
      ]
    });

    return NextResponse.json({ data: result.object });
  } catch (error: any) {
    console.error("AI OCR Error:", error);
    return NextResponse.json({ error: "Failed to process screenshot" }, { status: 500 });
  }
}
