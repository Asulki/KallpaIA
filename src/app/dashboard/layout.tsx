
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, Home, Rocket, Library, Settings, UserCircle, Search, Star, MessageSquare, BookOpen, Bell, Gamepad2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import './dashboard.css';
import { useEffect } from 'react';

const navItems = [
    { href: "/dashboard", icon: <Home className="icn" />, label: "Inicio" },
    { href: "/retos", icon: <Rocket className="icn" />, label: "Retos" },
    { href: "/progreso", icon: <Library className="icn" />, label: "Progreso" },
    { href: "/mentoria", icon: <MessageSquare className="icn" />, label: "Mentoría" },
    { href: "/oportunidades", icon: <Star className="icn" />, label: "Oportunidades" },
    { href: "/comic-digitales", icon: <BookOpen className="icn" />, label: "Comic digitales" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add('kallpa-dashboard');
    
    document.querySelectorAll('.kallpa-dashboard .cta').forEach(b => {
        const btn = b as HTMLElement;
        const pointerDownHandler = (e: PointerEvent) => {
            const r = btn.getBoundingClientRect();
            btn.style.setProperty('--x', (e.clientX - r.left) + 'px');
            btn.style.setProperty('--y', (e.clientY - r.top) + 'px');
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
            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Buscar..."
                    className="search w-full rounded-full bg-muted pl-11 md:w-[280px] lg:w-[380px]"
                />
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="h-11 w-11 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10">
                    <Bell className="h-5 w-5" />
                    <span className="sr-only">Notificaciones</span>
                </Button>
                <Avatar className="h-11 w-11 border-2 border-primary/50">
                    <AvatarImage src="https://placehold.co/44x44.png" alt="@wawa" />
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
                    <Link key={item.label} href={item.href} className={pathname === item.href ? 'active' : ''}>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
                 <div className="mt-auto p-4">
                    <Link href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground">
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
