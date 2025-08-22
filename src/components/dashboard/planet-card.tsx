import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Zap, BookOpen, BrainCircuit, Gamepad2 } from 'lucide-react';
import { Badge } from '../ui/badge';

export function PlanetCard() {
  return (
    <Card className="bg-glass border border-white/10 shadow-2xl shadow-primary/10 backdrop-blur-lg overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-primary/20 hover:-translate-y-1 rounded-3xl">
      <CardHeader className="p-6">
        <Badge className="bg-yellow-400/10 text-edge-gold border-edge-gold/50 w-fit uppercase tracking-widest font-semibold">Planeta Activo</Badge>
        <CardTitle className="text-3xl font-bold text-text-main font-headline">Planeta Inti – Ciencia</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 grid md:grid-cols-2 gap-6 items-center">
        <div className="relative flex justify-center items-center">
          <div className="absolute w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
          <Image 
            src="https://i.ibb.co/CbfcCvP/condor-ciencia.png"
            alt="Avatar del Cóndor de la Ciencia"
            width={256}
            height={256}
            className="drop-shadow-[0_10px_20px_rgba(124,58,237,0.5)] z-10"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold text-text-muted">HP (Puntos de Habilidad)</span>
              <span className="text-sm font-bold text-text-main">85 / 100</span>
            </div>
            <Progress value={85} className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-art-pink" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <Button variant="outline" className="bg-glass border-secondary/50 text-text-main justify-start">
                <Zap className="mr-2 h-4 w-4 text-logic-yellow"/>
                Tejido Lógico
             </Button>
             <Button variant="outline" className="bg-glass border-secondary/50 text-text-main justify-start">
                <BookOpen className="mr-2 h-4 w-4 text-stem-green"/>
                Bio-estructuras
             </Button>
             <Button variant="outline" className="bg-glass border-secondary/50 text-text-main justify-start">
                <BrainCircuit className="mr-2 h-4 w-4 text-art-pink"/>
                Mente Creativa
             </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-black/20 p-4 flex-col items-center gap-4">
         <Button size="lg" className="w-full max-w-sm font-headline bg-primary text-primary-foreground text-lg rounded-full py-3 hover:bg-accent hover:shadow-lg hover:shadow-primary/30 transition-all">
            <Gamepad2 className="mr-2" />
            Videojuegos Vocacionales
        </Button>
        <p className="text-xs text-center text-text-muted w-full">Interactúa con tu planeta: swipea para más info o toca a tu avatar para ver stats ✨</p>
      </CardFooter>
    </Card>
  );
}
