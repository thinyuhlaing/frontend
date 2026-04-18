import { config } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const loginResponse = await fetch(
    `${config.odooBaseUrl}/web/session/authenticate`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        params: {
          db: config.odooDB,
          ...body,
        },
      }),
    },
  );
  const loginData = await loginResponse.json();

  const setCookie = loginResponse.headers.get("set-cookie");

  const response = NextResponse.json(loginData, {
    status: 500,
  });

  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}
