import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getSession } from "@/lib/auth";

const prisma = new PrismaClient();

export async function PATCH(req: Request) {
  try {
    const session = await getSession();
    if (!session || !session.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { fullName, phoneNumber, bio, mailingAddress } = body;

    const user = await prisma.user.update({
      where: { id: session.userId as string },
      data: {
        fullName,
        phoneNumber,
        bio,
        mailingAddress,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
