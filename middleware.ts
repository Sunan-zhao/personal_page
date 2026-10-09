import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Force HTTPS: if the request reached us over plain HTTP, send a permanent
 * redirect to the same URL on https://.
 */
export function middleware(request: NextRequest) {
  const proto = (request.headers.get("x-forwarded-proto") ?? "")
    .split(",")[0]
    .trim()
    .toLowerCase();

  if (proto === "http") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
