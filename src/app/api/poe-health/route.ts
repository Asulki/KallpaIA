
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const poeKey = process.env.POE_API_KEY;

  if (poeKey && poeKey.length > 10) {
    return NextResponse.json({ poeKey: "present" });
  } else {
    return NextResponse.json({ poeKey: "missing" }, { status: 500 });
  }
}
