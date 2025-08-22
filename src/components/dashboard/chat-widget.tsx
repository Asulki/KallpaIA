'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, X, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy tu guía IA. ¿Te reto con algo de Ciencia o prefieres una historia inspiradora?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { from: 'user', text: input.trim() }]);
      // Simulate bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { from: 'bot', text: '¡Esa es una gran idea! Exploremos más sobre eso.'}]);
      }, 1000);
      setInput('');
    }
  };

  const quickReply = (text: string) => {
    setMessages(prev => [...prev, {from: 'user', text}]);
     setTimeout(() => {
        setMessages(prev => [...prev, { from: 'bot', text: `¡Excelente! Hablemos sobre ${text}.`}]);
      }, 1000);
  }


  if (!isOpen) {
    return (
      <Button
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-primary shadow-lg shadow-primary/40 hover:bg-accent hover:shadow-accent/50 transition-all duration-300 transform hover:scale-110"
        aria-label="Abrir chat de IA"
      >
        <Bot className="h-8 w-8" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-[340px] h-[450px] z-50">
        <Card className="bg-glass border-white/10 backdrop-blur-xl h-full w-full flex flex-col rounded-2xl shadow-2xl shadow-primary/20">
             <CardHeader className="flex flex-row items-center justify-between gap-3 p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <Bot className="w-5 h-5 text-primary-foreground"/>
                    </div>
                    <CardTitle className="text-md font-semibold text-text-main">Tu Guía IA</CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                    <X className="h-4 w-4" />
                </Button>
            </CardHeader>
             <CardContent className="p-0 flex-grow flex flex-col">
                <ScrollArea className="flex-grow p-4">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                    <div key={index} className={`flex gap-2 text-sm ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`rounded-lg px-3 py-2 max-w-[85%] ${msg.from === 'bot' ? 'bg-muted/80 text-text-main' : 'bg-primary text-primary-foreground'}`}>
                        {msg.text}
                        </div>
                    </div>
                    ))}
                </div>
                </ScrollArea>
                <div className="p-3 border-t border-white/10 space-y-2">
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs h-7 bg-muted/50" onClick={() => quickReply('Reto')}>Reto</Button>
                        <Button size="sm" variant="outline" className="text-xs h-7 bg-muted/50" onClick={() => quickReply('Historia')}>Historia</Button>
                        <Button size="sm" variant="outline" className="text-xs h-7 bg-muted/50" onClick={() => quickReply('Motivación')}>Motivación</Button>
                    </div>
                    <div className="relative">
                        <Input 
                        placeholder="Escribe un mensaje..." 
                        className="bg-input pr-10 h-10"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                        />
                        <Button size="icon" className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7" onClick={handleSend}>
                        <Send className="h-4 w-4"/>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
