'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export function ChatWidget() {
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy tu guía IA. ¿En qué puedo ayudarte a explorar hoy?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: 'user', text: input.trim() }]);
      // Lógica de respuesta del bot aquí
      setInput('');
    }
  };

  return (
    <Card className="bg-card/60 border-white/10 flex-grow flex flex-col">
      <CardHeader className="flex flex-row items-center gap-3 p-4 border-b border-white/10">
        <Bot className="text-primary"/>
        <CardTitle className="text-lg font-semibold text-white">Chat IA Inclusivo</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-grow flex flex-col">
        <ScrollArea className="flex-grow p-4">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-2 ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
                {msg.from === 'bot' && <Avatar_Bot />}
                <div className={`rounded-lg px-3 py-2 max-w-[80%] text-sm ${msg.from === 'bot' ? 'bg-muted text-white' : 'bg-primary text-primary-foreground'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 border-t border-white/10">
          <div className="relative">
            <Input 
              placeholder="Pregúntame algo..." 
              className="bg-input pr-12 h-11"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <Button size="icon" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 w-8" onClick={handleSend}>
              <Send className="h-4 w-4"/>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const Avatar_Bot = () => (
    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center shrink-0">
        <Bot className="w-4 h-4 text-primary-foreground"/>
    </div>
)
