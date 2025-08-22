
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Home, Rocket, BookOpen, MessageSquare, Star, Settings, Bell, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import './dashboard.css';
import { useEffect } from 'react';

const navItems = [
    { href: "/dashboard", icon: <Home className="icn" />, label: "Inicio" },
    { href: "/retos", icon: <Rocket className="icn" />, label: "Retos" },
    { href: "/comic-digitales", icon: <BookOpen className="icn" />, label: "Comic digitales" },
    { href: "/mentoria", icon: <MessageSquare className="icn" />, label: "Mentoría" },
    { href: "/oportunidades", icon: <Star className="icn" />, label: "Oportunidades" },
];

const navTargetBlank = ["/retos", "/comic-digitales", "/mentoria", "/oportunidades", "/chat-ia", "/ajustes"];


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add('kallpa-dashboard');
    
    const ctaButtons = document.querySelectorAll('.kallpa-dashboard .cta');
    ctaButtons.forEach(btn => {
        const pointerDownHandler = (e: PointerEvent) => {
            const button = btn as HTMLElement;
            const r = button.getBoundingClientRect();
            button.style.setProperty('--x', (e.clientX - r.left) + 'px');
            button.style.setProperty('--y', (e.clientY - r.top) + 'px');
        };
        btn.addEventListener('pointerdown', pointerDownHandler as EventListener);
        
        return () => {
            btn.removeEventListener('pointerdown', pointerDownHandler as EventListener);
        }
    });

    return () => {
      document.body.classList.remove('kallpa-dashboard');
    };
  }, []);

  return (
    <>
      <div className="bg-sky" aria-hidden="true"></div>
      <div className="flex min-h-screen w-full flex-col p-4 md:p-6 lg:p-8">
        <header className="flex items-center justify-between gap-4 mb-6">
            <div className="welcome-message">
                <h2 className="text-2xl font-bold text-white">Hola, Wawa 🔥</h2>
                <p className="text-muted">SUBTÍTULO INFORMATIVO</p>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notificaciones</span>
                </Button>
                <Avatar className="h-11 w-11 border-2 border-primary/50">
                    <AvatarImage src="https://i.ibb.co/V3F7499/vicuna-bot.png" alt="@wawa" data-ai-hint="cute robot vicuna avatar" />
                    <AvatarFallback>W</AvatarFallback>
                </Avatar>
            </div>
        </header>
        <div className="grid flex-1 gap-6 lg:grid-cols-[260px_1fr]">
            <aside className="sidebar card-glass hidden lg:flex flex-col p-3 space-y-4">
                <div className="flex items-center gap-3 px-3">
                    <Bot className="h-8 w-8 text-primary" />
                    <span className="text-xl font-bold">KallpaIA</span>
                </div>
                <nav className="flex-1 space-y-1.5">
                  {navItems.map((item) => (
                    <Link 
                        key={item.label} 
                        href={item.href} 
                        className={pathname === item.href ? 'active' : ''}
                        target={navTargetBlank.includes(item.href) ? "_blank" : "_self"}
                        rel={navTargetBlank.includes(item.href) ? "noopener noreferrer" : ""}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <Link href="/chat-ia" className="relative group" target="_blank" rel="noopener noreferrer">
                    <Bot className="icn" />
                    <span>Chat IA</span>
                    <span className="bot-status" aria-label="Online"></span>
                    <div className="tooltip">Abrir chat</div>
                  </Link>
                </nav>
                 <div className="mt-auto p-2">
                    <Link href="/ajustes" className="flex items-center gap-3 text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">
                        <Settings className="icn" />
                        <span>Ajustes</span>
                    </Link>
                </div>
            </aside>
            <main className="flex flex-col gap-6">
                {children}
            </main>
        </div>
      </div>
    </>
  );
}
