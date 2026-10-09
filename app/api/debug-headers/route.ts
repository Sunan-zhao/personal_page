import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** TEMPORARY diagnostic endpoint: echoes the request headers as EdgeOne sees them. */
export function GET(request: Request) {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return NextResponse.json(
    { url: request.url, headers },
    { headers: { "cache-control": "no-store" } }
  );
}
