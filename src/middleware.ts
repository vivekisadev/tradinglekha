import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET_KEY || "tradle_super_secret_key_123!@#";
const key = new TextEncoder().encode(secretKey);

export async function middleware(req: NextRequest) {
  const session = req.cookies.get("tradle_session")?.value;
  
  // Protect /dashboard routes
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    try {
      await jwtVerify(session, key, { algorithms: ["HS256"] });
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // Redirect from /auth/login or /auth/signup if already logged in
  if (req.nextUrl.pathname.startsWith("/auth/")) {
    if (session) {
      try {
        await jwtVerify(session, key, { algorithms: ["HS256"] });
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch (error) {
        // invalid token, just continue to login page
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
