import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Zap, BookOpen, BrainCircuit } from 'lucide-react';

export function PlanetCard() {
  return (
    <Card className="bg-card/35 border border-white/10 shadow-2xl shadow-primary/10 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-primary/20 hover:-translate-y-1">
      <CardHeader className="p-6">
        <CardDescription className="uppercase tracking-widest text-yellow-400 font-semibold">Planeta Activo</CardDescription>
        <CardTitle className="text-3xl font-bold text-white">Planeta Inti – Ciencia</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 grid md:grid-cols-2 gap-6 items-center">
        <div className="relative flex justify-center items-center">
          <div className="absolute w-48 h-48 bg-purple-500/30 rounded-full blur-3xl"></div>
          <Image 
            src="https://i.ibb.co/CbfcCvP/condor-ciencia.png"
            alt="Avatar del Cóndor de la Ciencia"
            width={200}
            height={200}
            className="drop-shadow-[0_10px_20px_rgba(124,58,237,0.5)] z-10"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-semibold text-muted-foreground">HP (Puntos de Habilidad)</span>
              <span className="text-sm font-bold text-white">85 / 100</span>
            </div>
            <Progress value={85} className="h-3 [&>div]:bg-gradient-to-r [&>div]:from-pink-500 [&>div]:to-purple-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <Button variant="outline" className="bg-card/80 border-secondary/50 text-white justify-start">
                <Zap className="mr-2 h-4 w-4 text-yellow-400"/>
                Tejido Lógico
             </Button>
             <Button variant="outline" className="bg-card/80 border-secondary/50 text-white justify-start">
                <BookOpen className="mr-2 h-4 w-4 text-green-400"/>
                Bio-estructuras
             </Button>
             <Button variant="outline" className="bg-card/80 border-secondary/50 text-white justify-start">
                <BrainCircuit className="mr-2 h-4 w-4 text-pink-400"/>
                Mente Creativa
             </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-black/20 p-4 flex justify-center gap-4">
        <p className="text-xs text-center text-muted-foreground">Interactúa con tu planeta: Swipe para más info, click en avatar para ver stats.</p>
      </CardFooter>
    </Card>
  );
}
