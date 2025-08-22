"use client";

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Bot, Send, User } from 'lucide-react';
import type { ChatMessage } from '@/ai/schemas/chat-schemas';

const systemPrompt: ChatMessage = {
    role: 'system' as const,
    content: 'Eres KallpaWarmIA, una IA amigable, sabia y alentadora que guía a las jóvenes en el mundo STEAM. Tu propósito es inspirar curiosidad, explicar conceptos complejos de manera sencilla y siempre mantener un tono positivo y empoderador. Eres una mentora digital. Usa emojis para hacer la conversación más cercana y divertida. Siempre responde en español.'
};

async function chatOnce(messages: ChatMessage[], temperature = 0.7) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, temperature }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data?.error || `Error del servidor: ${response.status}`);
    }
    return data.reply;
}


export function ChatIA() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy KallpaWarmIA, tu mentora digital en el universo STEAM. ¿Qué te gustaría explorar o aprender hoy? ✨',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory: ChatMessage[] = [systemPrompt, ...messages, userMessage];
      const reply = await chatOnce(chatHistory);
      
      const assistantMessage: ChatMessage = { role: 'assistant', content: reply };
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error: any) {
      console.error("Error fetching chat response:", error);
      const errorMessage: ChatMessage = { role: 'assistant', content: `Error: ${error.message}` };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-ia-container card-glass">
        <header className="chat-ia-header">
            <div className="bot-avatar">
                <Bot size={24} color="white" />
            </div>
            <div>
                <h2>Chat con KallpaWarmIA</h2>
                <p>Tu mentora IA para temas STEAM</p>
            </div>
        </header>

        <div className="chat-transcript" ref={transcriptRef} aria-live="polite">
            {messages.map((msg, index) => (
                <div key={index} className={`chat-bubble ${msg.role}`}>
                    <div className="avatar">
                        {msg.role === 'assistant' ? (
                             <div className="w-8 h-8 rounded-full bg-primary grid place-items-center flex-shrink-0">
                                <Bot size={18} color="white" />
                             </div>
                        ) : (
                             <div className="w-8 h-8 rounded-full bg-blue-500 grid place-items-center flex-shrink-0">
                                <User size={18} color="white" />
                             </div>
                        )}
                    </div>
                    <div className="chat-bubble-content">
                        <p>{msg.content}</p>
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="chat-loading">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            )}
        </div>

        <div className="chat-input-area">
            <form onSubmit={handleSubmit} className="chat-input-form">
                <input
                    type="text"
                    className="chat-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu pregunta aquí..."
                    aria-label="Escribe tu pregunta"
                    disabled={isLoading}
                />
                <button type="submit" className="chat-submit-btn" disabled={isLoading || !input.trim()}>
                    <Send size={22} />
                    <span className="sr-only">Enviar mensaje</span>
                </button>
            </form>
        </div>
    </div>
  );
}
