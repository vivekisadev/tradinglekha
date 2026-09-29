import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }


    // Insert into waitlist using Prisma
    const waitlistEntry = await prisma.waitlist.create({
      data: {
        email: email,
      },
    });

    return NextResponse.json(
      { success: true, message: "Added to waitlist!", entry: waitlistEntry },
      { status: 201 }
    );
  } catch (error: any) {
    // Handle unique constraint violation (P2002)
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email is already on the waitlist." },
        { status: 409 }
      );
    }

    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
