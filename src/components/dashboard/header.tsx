import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between p-4 sm:p-6 lg:p-8 border-b border-white/10">
      <div>
        <h1 className="font-bold text-2xl text-white">Hola, Wawa 👋</h1>
        <p className="text-muted-foreground uppercase text-xs tracking-widest">SUBTÍTULO INFORMATIVO</p>
      </div>
      <Button variant="ghost" className="h-14 w-14 rounded-full p-0 bg-card/60 border-2 border-primary/50 ring-2 ring-primary/30 ring-offset-2 ring-offset-background">
        <Avatar className="h-full w-full">
          <AvatarImage src="https://i.ibb.co/CbfcCvP/condor-ciencia.png" alt="Avatar de usuario" />
          <AvatarFallback>WA</AvatarFallback>
        </Avatar>
      </Button>
    </header>
  );
}
