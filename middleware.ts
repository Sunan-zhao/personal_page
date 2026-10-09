import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTO_HEADERS = [
  "x-forwarded-proto",
  "x-forwarded-scheme",
  "x-scheme",
  "x-client-scheme",
  "front-end-proto",
  "x-original-proto",
  "eo-connecting-proto",
  "x-forwarded-ssl",
];

/**
 * Force HTTPS: redirect any request that arrived over plain HTTP to https://.
 */
export function middleware(request: NextRequest) {
  const headers = request.headers;

  let detected = "";
  for (const name of PROTO_HEADERS) {
    const value = headers.get(name);
    if (value) {
      detected = value.split(",")[0].trim().toLowerCase();
      break;
    }
  }

  const debug: Record<string, string> = {
    "x-mw-ran": "1",
    "x-mw-detected": detected || "none",
    "x-mw-xfp": headers.get("x-forwarded-proto") ?? "-",
    "x-mw-nexturl": request.nextUrl.protocol,
  };

  if (detected === "http") {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.port = "";
    const redirect = NextResponse.redirect(url, 308);
    for (const [key, value] of Object.entries(debug)) {
      redirect.headers.set(key, value);
    }
    return redirect;
  }

  const response = NextResponse.next();
  for (const [key, value] of Object.entries(debug)) {
    response.headers.set(key, value);
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico).*)"],
};
