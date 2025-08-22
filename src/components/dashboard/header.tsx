import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="font-headline font-bold text-2xl text-text-main">Hola, Wawita 👋</h1>
        <p className="text-text-muted uppercase text-xs tracking-[.25em]">Exploradora STEM</p>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-text-muted hover:text-text-main">
          <Globe className="h-6 w-6" />
        </Button>
        <Button variant="ghost" className="h-14 w-14 rounded-full p-0 bg-glass border-2 border-primary/50 ring-2 ring-primary/30 ring-offset-2 ring-offset-background">
          <Avatar className="h-full w-full">
            <AvatarImage src="https://i.ibb.co/CbfcCvP/condor-ciencia.png" alt="Avatar de usuario" />
            <AvatarFallback>WA</AvatarFallback>
          </Avatar>
        </Button>
      </div>
    </header>
  );
}
