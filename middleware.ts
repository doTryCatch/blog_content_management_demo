import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  
  const PUBLIC_PATHS = ["/login", "/register", "/"]; // routes that don't require login
  const isPublic = PUBLIC_PATHS.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // Allow public paths and API routes
  if (isPublic || req.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // If no token and trying to access protected route, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Otherwise, allow request
  return NextResponse.next();
}

// Apply middleware to all routes except API routes if needed
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)", // all paths except Next.js internals
  ],
};
