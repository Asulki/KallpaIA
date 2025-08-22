'use server';
/**
 * @fileOverview A chat flow that proxies requests to the Poe API.
 * 
 * - chat - A function that handles the chat completion process.
 */

import { ai } from '@/ai/genkit';
import OpenAI from 'openai';
import { ChatInput, ChatInputSchema, ChatOutput, ChatOutputSchema } from '../schemas/chat-schemas';

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { messages, model } = input;
    const apiKey = process.env.POE_API_KEY;

    if (!apiKey) {
        console.error("Poe API key is not configured.");
        return { content: "La clave de la API de Poe no está configurada. Por favor, configúrala para continuar." };
    }

    const poeClient = new OpenAI({
      apiKey: apiKey,
      baseURL: 'https://api.poe.com/v1',
    });

    try {
      const completion = await poeClient.chat.completions.create({
        model: model,
        messages: messages,
        temperature: 0.7,
        top_p: 1,
      });

      const content = completion.choices[0]?.message?.content ?? '';
      
      return { content };

    } catch (error: any) {
      console.error("Error calling Poe API:", error);
      if (error.status === 401) {
        return { content: "Error de autenticación. Verifica que la clave de la API de Poe sea correcta." };
      }
      if (error.status === 429) {
          return { content: "Se ha alcanzado el límite de solicitudes. Por favor, inténtalo de nuevo más tarde." };
      }
      return { content: "Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, inténtalo de nuevo." };
    }
  }
);

export async function chat(input: ChatInput): Promise<ChatOutput> {
    return chatFlow(input);
}
