"use client";

import { useState, useRef, useEffect, FormEvent } from 'react';
import Image from 'next/image';
import { Bot, Send, User } from 'lucide-react';
import { chat, ChatInput } from '@/ai/flows/chat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const systemPrompt = {
    role: 'system' as const,
    content: 'Eres KallpaWarmIA, una IA amigable, sabia y alentadora que guía a las jóvenes en el mundo STEAM. Tu propósito es inspirar curiosidad, explicar conceptos complejos de manera sencilla y siempre mantener un tono positivo y empoderador. Eres una mentora digital. Usa emojis para hacer la conversación más cercana y divertida. Siempre responde en español.'
};


export function ChatIA() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy KallpaWarmIA, tu mentora digital en el universo STEAM. ¿Qué te gustaría explorar o aprender hoy? ✨',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom of the transcript when messages change
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = [systemPrompt, ...messages, userMessage].map(msg => ({
          role: msg.role,
          content: msg.content
      }));

      const response = await chat({ messages: chatHistory });
      
      const assistantMessage: Message = { role: 'assistant', content: response.content };
      setMessages(prev => [...prev, assistantMessage]);

    } catch (error) {
      console.error("Error fetching chat response:", error);
      const errorMessage: Message = { role: 'assistant', content: 'Ups, algo no salió bien. Por favor, intenta de nuevo. 😥' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-ia-container">
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
                             <Image src="https://i.ibb.co/V3F7499/vicuna-bot.png" alt="KallpaWarmIA" width={32} height={32} />
                        ) : (
                             <Image src="https://i.ibb.co/b2wBv43/user-avatar-placeholder.png" alt="Usuario" width={32} height={32} />
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
