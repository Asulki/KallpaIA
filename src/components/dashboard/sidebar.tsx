"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Bot, Home, Swords, GraduationCap, MessagesSquare, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Inicio' },
  { href: '/dashboard/challenges', icon: Swords, label: 'Retos' },
  { href: '/dashboard/career', icon: GraduationCap, label: 'Info vocacional' },
  { href: '/dashboard/chat', icon: MessagesSquare, label: 'Chat IA' },
  { href: '/dashboard/opportunities', icon: Sparkles, label: 'Oportunidades' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col justify-between bg-card/40 border-r border-white/10 p-6">
      <div>
        <div className="mb-10">
          <Link href="/" className="flex items-center gap-2">
            <Bot className="w-8 h-8 text-primary" />
            <span className="font-headline text-2xl font-bold text-white">KallpaIA</span>
          </Link>
        </div>
        
        <nav className="flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 text-base h-12 px-4",
                    isActive 
                      ? "bg-primary/20 text-primary font-bold border border-primary/50" 
                      : "text-muted-foreground hover:bg-primary/10 hover:text-white"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="flex flex-col gap-2">
         {/* Aquí podría ir un botón de "Cerrar Sesión" o "Configuración" */}
      </div>
    </aside>
  );
}
