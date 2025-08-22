import { z } from 'zod';

export const ChatMessageSchema = z.object({
  role: z.enum(['system', 'user', 'assistant']),
  content: z.string().max(4000),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export const ChatInputSchema = z.object({
  model: z.string().optional().default('KallpaWarmIA'),
  messages: z.array(ChatMessageSchema).max(30),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

export const ChatOutputSchema = z.object({
  content: z.string(),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;
