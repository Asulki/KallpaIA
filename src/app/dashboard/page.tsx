import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, LineChart, Rocket, Star, Gamepad2 } from 'lucide-react';

export default function DashboardPage() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        <Card className="card-glass planet p-6">
            <CardHeader className="p-0 mb-4">
                <CardDescription className="font-semibold text-yellow-400">PLANETA ACTIVO: CIENCIA</CardDescription>
                <CardTitle className="text-2xl font-bold">Tu aventura para dominar los misterios del universo.</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="font-medium text-muted-foreground">HP (Puntos de Habilidad)</span>
                    <span className="font-bold">85 / 100</span>
                </div>
                <div className="hp-bar">
                  <div className="hp-fill" style={{ width: '85%' }}></div>
                  <div className="hp-spark" aria-hidden="true"></div>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="kpi">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retos Completados</CardTitle>
            <Rocket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 esta semana</p>
          </CardContent>
        </Card>
        <Card className="kpi">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntos Kallpa</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,830</div>
            <p className="text-xs text-muted-foreground">Nivel: Pionera</p>
          </CardContent>
        </Card>
        <Card className="kpi">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progreso Semanal</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15%</div>
            <p className="text-xs text-muted-foreground">que la semana pasada</p>
          </CardContent>
        </Card>
        <Card className="kpi">
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

      <div className="mt-auto flex justify-center py-4">
          <button className="cta">
              <Gamepad2 className="h-6 w-6" />
              Jugar Videojuegos Vocacionales
          </button>
      </div>
    </>
  );
}
