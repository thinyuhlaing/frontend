// /app/api/logout/route.ts
import { config } from "@/lib/config";
import { NextResponse } from "next/server";

export async function POST() {
  // Destroy Odoo session
  await fetch(`${config.odooBaseUrl}/web/session/destroy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Send the Odoo session cookie
      Cookie: `session_id=${process.env.USER_SESSION_ID}`,
    },
    body: JSON.stringify({}),
  });

  // Delete Next.js session cookie
  const response = NextResponse.json({ success: true });
  response.cookies.delete("session_id");

  return response;
}
