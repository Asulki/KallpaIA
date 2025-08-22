
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { askKallpaWarmIA } from "@/ai/flows/chat";

export async function POST(req: Request) {
  try {
    const { messages = [], temperature = 0.7 } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "El campo 'messages' debe ser un array y no puede estar vacío." }, { status: 400 });
    }

    const reply = await askKallpaWarmIA(messages, temperature);
    return NextResponse.json({ reply });
    
  } catch (e: any) {
    const status = e?.status || e?.response?.status || 500;
    let detail = e?.message || "Error desconocido en el servidor.";
    
    // Attempt to get more specific error from Poe/OpenAI response
    try {
      const errorResponse = e?.error?.error; // OpenAI SDK wraps error details here
      if (errorResponse && errorResponse.message) {
          detail = errorResponse.message;
      } else {
        const resText = await e?.response?.text?.();
        if (resText) detail = resText;
      }
    } catch {}

    console.error(`API /chat error: [${status}] ${detail}`);

    return NextResponse.json({ error: detail }, { status });
  }
}
