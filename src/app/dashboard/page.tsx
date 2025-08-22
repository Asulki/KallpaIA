import { PlanetCard } from '@/components/dashboard/planet-card';
import { Button } from '@/components/ui/button';
import { Gamepad2 } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center gap-8">
      <PlanetCard />
      <Button size="lg" className="w-full max-w-sm font-headline bg-primary text-primary-foreground text-lg rounded-full py-3 hover:bg-accent hover:shadow-lg hover:shadow-primary/30 transition-all">
          <Gamepad2 className="mr-2" />
          Videojuegos Vocacionales
      </Button>
    </div>
  );
}
