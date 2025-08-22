import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, Rocket, Lightbulb, ClipboardCheck, Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function DashboardPage() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retos Completados</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntos Kallpa</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,830</div>
            <p className="text-xs text-muted-foreground">Nivel: Pionera</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progreso Semanal</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15%</div>
            <p className="text-xs text-muted-foreground">que la semana pasada</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Racha Actual</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 días</div>
            <p className="text-xs text-muted-foreground">¡Sigue así!</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Próximos Retos</CardTitle>
            <CardDescription>
              Estos son los siguientes pasos en tu aventura de aprendizaje.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Rocket className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Introducción a Python</p>
                  <p className="text-sm text-muted-foreground">Completa 3 módulos básicos.</p>
                </div>
                <Button variant="outline" size="sm">Empezar</Button>
              </li>
               <li className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Quiz: Lógica de Programación</p>
                  <p className="text-sm text-muted-foreground">Pon a prueba tus conocimientos.</p>
                </div>
                <Button variant="outline" size="sm">Resolver</Button>
              </li>
               <li className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500/10 text-green-500">
                  <ClipboardCheck className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Proyecto: Tu Primer Script</p>
                  <p className="text-sm text-muted-foreground">Aplica lo que aprendiste.</p>
                </div>
                <Button variant="outline" size="sm">Iniciar</Button>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center gap-4">
               <Avatar className="h-10 w-10">
                <AvatarImage src="https://placehold.co/40x40.png" alt="Avatar" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Mentora Curie te dejó feedback.</p>
                <p className="text-sm text-muted-foreground">"¡Excelente trabajo en el reto de algoritmos!"</p>
              </div>
            </div>
             <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20">
                    <Star className="h-5 w-5 text-green-500" />
                </div>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Insignia "Pensadora Lógica" obtenida</p>
                  <p className="text-sm text-muted-foreground">Completaste el módulo de lógica.</p>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}