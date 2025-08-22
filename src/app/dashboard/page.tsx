import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, Rocket, Star, Gamepad2 } from 'lucide-react';

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

      <div className="mt-8 grid grid-cols-1 gap-8">
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Planeta Activo: Ciencia</CardTitle>
                <CardDescription>Tu aventura actual para dominar los misterios del universo.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-muted-foreground">HP (Puntos de Habilidad)</span>
                    <span className="text-sm font-bold">85 / 100</span>
                </div>
                <Progress value={85} aria-label="85% de habilidad completado" />
            </CardContent>
        </Card>

        <div className="text-center">
            <Button size="lg" className="h-12 px-10 text-lg rounded-full font-bold">
                <Gamepad2 className="mr-2 h-6 w-6" />
                Jugar Videojuegos Vocacionales
            </Button>
        </div>
      </div>
    </>
  );
}
