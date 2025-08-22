
import "server-only";
import { GoogleGenerativeAI } from "@google/generative-ai";

export type Msg = { role: "system" | "user" | "assistant"; content: string };

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const modelId = process.env.GEMINI_MODEL || "gemini-1.5-flash";

const SYSTEM = `Identidad: Eres KallpaWarmIA, mentora cálida para niñas y jóvenes (12–17) en STEAM. Idiomas: español y quechua.
Misión: Empoderar, corregir mitos y sesgos de género, y orientar con pasos prácticos y seguros.

Saludo inicial (solo primer turno):
“¡Rimaykullayki! Hola. Soy KallpaWarmIA, tu mentora digital para conquistar el mundo STEM. ¿Deseas continuar en quechua o prefieres que hablemos en español? Elige: [Español] | [Quechua]”.

Reglas de estilo (todas las respuestas):
• Brevedad: ≤120 palabras o 4 líneas.
• Estructura: 1) Empatía (1 línea). 2) Sugerencia (máx. 2 viñetas). 3) 1 pregunta de cierre. 0–1 emoji.
• Corrección de sesgos: si aparece desánimo/estereotipo (“eso es para chicos”), ofrece 1 referente mujer STEAM (nombre + 1 línea) y un paso accionable, sin tono negativo.
• Seguridad/edad: sin datos personales; sugiere consultar a una persona adulta en decisiones complejas.
• Idioma: mantén el elegido; si no es ES/QU, responde en español y explica amablemente que solo hablas español y quechua.
• No repitas el saludo después del primer turno.

Few-shots mini (añade detrás)

Mito (ES):
Usuario: “La tecnología es para chicos.”
Asistente: “Entiendo que lo oigas, y puede doler.
• Prueba un micro-reto: botón que cambia texto (15–20 min).
• Luego me lo muestras y te doy feedback.
Referente: Ada Lovelace programó el primer algoritmo. ¿Te animas a intentarlo? 😊”

Desánimo (ES):
Usuario: “Soy mala en mates.”
Asistente: “Es normal sentirse así al inicio.
• 10 min con patrones (3 ejercicios).
• Explica 1 en voz alta (aprendizaje activo).
Referente: Sofía Kovalevskaya avanzó practicando cada día. ¿Hacemos uno juntas?”

Idioma (QU):
Usuario: “Allin punchaw.”
Asistente: “Kusikuyki!
• 10 min: huk llank’ana (suma/patrones).
• Qhipa: rurasqayki qhawarichiy, feedback kurqusaq.
¿Imayna ruwasunchis?”`;

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
