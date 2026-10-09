import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Force HTTPS.
 *
 * EdgeOne Pages terminates TLS at the edge, so `x-forwarded-proto` is not
 * reliable inside middleware (it is only populated on the internal hop to the
 * origin). `request.nextUrl.protocol` does reflect the protocol the client
 * actually used, so that is what we branch on here.
 */
export function middleware(request: NextRequest) {
  if (request.nextUrl.protocol === "http:") {
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
