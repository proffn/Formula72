import { NextRequest, NextResponse } from "next/server";

type ClientErrorRequest = {
  message?: unknown;
  stack?: unknown;
  source?: unknown;
  line?: unknown;
  column?: unknown;
  url?: unknown;
  userAgent?: unknown;
  timestamp?: unknown;
};

function asString(value: unknown) {
  return typeof value === "string" ? value.slice(0, 8000) : undefined;
}

function asNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export async function POST(request: NextRequest) {
  let body: ClientErrorRequest = {};

  try {
    body = (await request.json()) as ClientErrorRequest;
  } catch {
    body = {};
  }

  console.error("[client-error]", {
    userAgent: asString(body.userAgent) ?? request.headers.get("user-agent") ?? undefined,
    url: asString(body.url),
    message: asString(body.message) ?? "Unknown client error",
    stack: asString(body.stack),
    source: asString(body.source),
    line: asNumber(body.line),
    column: asNumber(body.column),
    timestamp: asString(body.timestamp) ?? new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
