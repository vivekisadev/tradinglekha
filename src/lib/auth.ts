import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET_KEY || "tradle_super_secret_key_123!@#";
const key = new TextEncoder().encode(secretKey);

export async function signToken(payload: any, rememberMe: boolean = false) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(rememberMe ? "30d" : "1d")
    .sign(key);
}

export async function verifyToken(input: string) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function setSession(userId: string, rememberMe: boolean = false) {
  const expiresInMs = rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
  const expires = new Date(Date.now() + expiresInMs);
  
  const payload = { userId, expires: expires.toISOString(), rememberMe };
  const session = await signToken(payload, rememberMe);

  const cookieStore = await cookies();
  cookieStore.set("tradle_session", session, {
    expires: rememberMe ? expires : undefined, // If undefined, it acts as a session cookie
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("tradle_session")?.value;
  if (!session) return null;
  return await verifyToken(session);
}

export async function getUser() {
  const session = await getSession();
  if (!session || !session.userId) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.userId as string },
      select: {
        id: true,
        email: true,
        fullName: true,
        phoneNumber: true,
        bio: true,
        mailingAddress: true,
        avatarUrl: true,
        role: true,
        disciplineScore: true,
        defaultCurrency: true,
      }
    });

    // Temporary logic: hardcode isPro to false until subscriptions are fully implemented
    const isPro = false;

    return { ...user, isPro };
  } catch (error) {
    return null;
  }
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("tradle_session");
}
