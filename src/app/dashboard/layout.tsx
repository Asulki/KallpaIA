import Link from 'next/link';
import { Bot, Bell, Home, Rocket, Library, Settings, UserCircle, Search, Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-card sm:flex">
        <nav className="flex flex-col items-start gap-4 px-4 py-5">
          <Link href="/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary-foreground">
            <Bot className="h-6 w-6" />
            <span className="text-lg font-bold">KallpaIA</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex w-full items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
          >
            <Home className="h-4 w-4" />
            Inicio
          </Link>
          <Link
            href="#"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Rocket className="h-4 w-4" />
            Retos
          </Link>
          <Link
            href="#"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Library className="h-4 w-4" />
            Progreso
          </Link>
          <Link
            href="#"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <MessageSquare className="h-4 w-4" />
            Mentoría
          </Link>
          <Link
            href="#"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Star className="h-4 w-4" />
            Oportunidades
          </Link>
        </nav>
        <div className="mt-auto p-4">
           <Link
            href="#"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Settings className="h-4 w-4" />
            Ajustes
          </Link>
        </div>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
           <div className="relative flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-full rounded-lg bg-muted pl-8 md:w-[200px] lg:w-[320px]"
            />
          </div>
          <div className="flex-1" />
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notificaciones</span>
          </Button>
          <Avatar>
            <AvatarImage src="https://placehold.co/32x32.png" alt="@wawa" />
            <AvatarFallback>W</AvatarFallback>
          </Avatar>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}