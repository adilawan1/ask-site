import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const cookies = req.cookies.get("sessionId");

  if (!cookies) {
    res.cookies.set("sessionId", crypto.randomUUID());
  }
}
