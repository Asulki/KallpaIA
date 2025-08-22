import "server-only";
import { GoogleGenerativeAI } from "@google/generative-ai";

export type Msg = { role: "system" | "user" | "assistant"; content: string };

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("Falta GEMINI_API_KEY en .env.local");

const modelId = process.env.GEMINI_MODEL || "gemini-1.5-flash";
const genAI = new GoogleGenerativeAI(apiKey);

const SYSTEM = `
Eres KallpaWarmIA, mentora cálida para niñas y jóvenes STEAM (español/quechua).
Responde SIEMPRE breve (≤120 palabras o 4 líneas).
Estructura: 1) Empatía (1 línea). 2) Sugerencia práctica (máx. 2 viñetas). 3) Cierre con 1 pregunta.
0–1 emoji. Si hay desánimo, cita 1 referente STEAM (solo nombre + 1 línea).
Mantén el idioma elegido; sin saludos largos tras el primero.
`.trim();

/** Convierte historial OpenAI-like -> Gemini (user/model) y separa el último user */
function toGemini(messages: Msg[]) {
  const history: { role: "user" | "model"; parts: { text: string }[] }[] = [];
  let lastUser = "";

  // Inserta el system como primer turno "user" si existe
  const hasSystem = messages.find((m) => m.role === "system");
  if (hasSystem) history.push({ role: "user", parts: [{ text: hasSystem.content }] });
  else history.push({ role: "user", parts: [{ text: SYSTEM }] });

  messages.forEach((m, i) => {
    if (m.role === "system") return;
    if (m.role === "user") {
      if (i === messages.length - 1) lastUser = m.content;
      else history.push({ role: "user", parts: [{ text: m.content }] });
    } else {
      history.push({ role: "model", parts: [{ text: m.content }] });
    }
  });

  if (!lastUser) lastUser = "Continuemos.";
  return { history, lastUser };
}

export async function chatOnceGemini(messages: Msg[], temperature = 0.6) {
  const { history, lastUser } = toGemini(messages);
  const model = genAI.getGenerativeModel({
    model: modelId,
    systemInstruction: SYSTEM,
    generationConfig: { temperature, maxOutputTokens: 200, topP: 0.9, topK: 40 },
    // safetySettings: [...] // opcional
  });
  const chat = model.startChat({ history });
  const res = await chat.sendMessage(lastUser);
  return res.response.text();
}

export async function* chatStreamGemini(messages: Msg[], temperature = 0.6) {
  const { history, lastUser } = toGemini(messages);
  const model = genAI.getGenerativeModel({
    model: modelId,
    systemInstruction: SYSTEM,
    generationConfig: { temperature, maxOutputTokens: 200, topP: 0.9, topK: 40 },
  });
  const chat = model.startChat({ history });
  const stream = await chat.sendMessageStream(lastUser);
  for await (const chunk of stream.stream) {
    const text = chunk.text();
    if (text) yield text;
  }
}
