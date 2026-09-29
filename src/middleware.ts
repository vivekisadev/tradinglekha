import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const secretKey = process.env.JWT_SECRET_KEY || "tradle_super_secret_key_123!@#";
const key = new TextEncoder().encode(secretKey);

export async function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("tradle_session")?.value;
  let response = NextResponse.next();
  let isAuthenticated = false;
  let payload: any = null;

  if (sessionToken) {
    try {
      const verified = await jwtVerify(sessionToken, key, { algorithms: ["HS256"] });
      payload = verified.payload;
      isAuthenticated = true;

      // Sliding session logic: If token is valid, refresh it if rememberMe is true.
      if (payload.rememberMe) {
        const expiresInMs = 30 * 24 * 60 * 60 * 1000;
        const expires = new Date(Date.now() + expiresInMs);
        payload.expires = expires.toISOString();
        
        const refreshedToken = await new SignJWT(payload)
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("30d")
          .sign(key);

        response.cookies.set({
          name: "tradle_session",
          value: refreshedToken,
          expires: expires,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
        });
      }
    } catch (error) {
      isAuthenticated = false;
    }
  }

  // Protect /dashboard routes
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return response;
  }

  // Redirect from auth pages if already logged in
  if (req.nextUrl.pathname.startsWith("/auth/")) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
