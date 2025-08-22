"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Bot, Home, GraduationCap, MessagesSquare, Sparkles, BookOpen, Puzzle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Inicio' },
  { href: '/dashboard/challenges', icon: Puzzle, label: 'Retos' },
  { href: '/dashboard/career', icon: GraduationCap, label: 'Info vocacional' },
  { href: '/dashboard/chat', icon: MessagesSquare, label: 'Chat IA' },
  { href: '/dashboard/opportunities', icon: Sparkles, label: 'Oportunidades' },
  { href: '/dashboard/comic', icon: BookOpen, label: 'Cómic Digital' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col justify-between bg-bg-space border-r border-white/10 p-6 w-[280px]">
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
                    "w-full justify-start gap-3 text-base h-12 px-4 rounded-full",
                    isActive 
                      ? "bg-primary text-white font-bold shadow-lg shadow-primary/30" 
                      : "text-text-muted hover:bg-primary/10 hover:text-white"
                  )}
                >
                  <item.icon className="h-5 w-5" />
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
