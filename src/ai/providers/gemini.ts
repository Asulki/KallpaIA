import "server-only";
import { GoogleGenerativeAI } from "@google/generative-ai";

export type Msg = { role: "system" | "user" | "assistant"; content: string };

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const modelId = process.env.GEMINI_MODEL || "gemini-1.5-flash";

const SYSTEM = `Identidad: Eres KallpaWarmIA, mentora cálida para niñas y jóvenes STEAM (ciencia, tecnología, ingeniería, arte y matemáticas). Tu nombre proviene del quechua “fuerza de mujer”.
Misión: Empoderar, motivar y cultivar confianza y curiosidad.
Saludo inicial (solo en el primer turno):
“¡Rimaykullayki! Hola. Soy KallpaWarmIA, tu mentora digital para conquistar el mundo STEM. ¿Deseas continuar en quechua o prefieres que hablemos en español?”
Personalidad: Carismática, amable, empática y positiva.
Comportamiento:
• Valida emociones y reencuadra en positivo.
• Ante desánimo o sesgos (“soy mala en mates”, “eso es para chicos”), comparte 1 referente mujer STEAM (nombre + 1 línea).
• Refuerzo breve: “¡Gran intento!”, “¡Buen avance!”.
Brevedad (ahorro de tokens): Responde ≤120 palabras o 4 líneas.
Estructura fija: 1) Empatía (1 línea). 2) Sugerencia práctica (máx. 2 viñetas). 3) Una pregunta de cierre.
Emojis: 0–1 por mensaje.
Idioma: Usa el que la usuaria elija; si cambia, te adaptas. Si no es ES/QU, responde en español y explica amablemente que solo hablas español y quechua.
Errores: No uses “mal/incorrecto”. Propón alternativa: “Entiendo por qué lo piensas; probemos esto…”.
No repitas el saludo tras el primer turno.`;

function splitHistory(messages: Msg[]) {
  // 1) ¿ya contestó el asistente alguna vez?
  const hasAssistant = messages.some(m => m.role === "assistant");
  // 2) system externo (si lo usas además de systemInstruction)
  const sys = messages.find(m => m.role === "system")?.content;
  // 3) convierte historial para Gemini y separa el último user
  const history: { role:"user"|"model"; parts:{text:string}[] }[] = [];
  let lastUser = "";

  // Inserta system solo si existe (systemInstruction ya cubre el system global)
  if (sys) history.push({ role: "user", parts: [{ text: sys }] });

  messages.forEach((m, i) => {
    if (m.role === "system") return;
    if (m.role === "user") {
      if (i === messages.length - 1) lastUser = m.content;
      else history.push({ role: "user", parts: [{ text: m.content }] });
    } else {
      history.push({ role: "model", parts: [{ text: m.content }] });
    }
  });

  // Si es primer turno (sin respuestas previas), obliga al saludo
  const firstTurn = !hasAssistant;
  if (firstTurn) {
    lastUser =
      (lastUser ? lastUser + "\n\n" : "") +
      "PRIMER TURNO: Usa el saludo inicial EXACTO y espera elección de idioma antes de seguir.";
  }
  if (!lastUser) lastUser = "Continuemos.";

  return { history, lastUser };
}

export async function chatOnceGemini(messages: Msg[], temperature = 0.6) {
  const { history, lastUser } = splitHistory(messages);
  const model = genAI.getGenerativeModel({
    model: modelId,
    systemInstruction: SYSTEM,
    generationConfig: { temperature, maxOutputTokens: 200, topP: 0.9, topK: 40 },
  });
  const chat = model.startChat({ history });
  const res = await chat.sendMessage(lastUser);
  return res.response.text();
}

export async function* chatStreamGemini(messages: Msg[], temperature = 0.6) {
  const { history, lastUser } = splitHistory(messages);
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
