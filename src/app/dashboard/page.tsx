import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Star, LineChart, BarChart, Gamepad2 } from 'lucide-react';

export default function DashboardPage() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        <Card className="card-glass planet p-6">
            <CardHeader className="p-0 mb-4">
                <CardDescription className="font-semibold text-yellow-400">PLANETA ACTIVO</CardDescription>
                <CardTitle className="text-2xl font-bold">Planeta Inti – Ciencia</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="flex justify-between items-center mb-2 text-sm">
                    <span className="font-medium text-muted">HP (Puntos de Habilidad)</span>
                    <span className="font-bold">85 / 100</span>
                </div>
                <div className="hp-bar">
                  <div className="hp-fill" style={{ width: '85%' }}>
                    <div className="hp-spark" aria-hidden="true"></div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/10 border border-white/20 text-text">Tejido Lógico</span>
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/10 border border-white/20 text-text">Bio-estructuras</span>
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/10 border border-white/20 text-text">Mente Creativa</span>
                </div>
                 <p className="text-xs text-muted mt-3">Completa retos para ganar más puntos de habilidad.</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="kpi card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retos Completados</CardTitle>
            <Rocket className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted">+2 esta semana</p>
          </CardContent>
        </Card>
        <Card className="kpi card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntos Kallpa</CardTitle>
            <Star className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,830</div>
            <p className="text-xs text-muted">Nivel: Pionera</p>
          </CardContent>
        </Card>
        <Card className="kpi card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progreso Semanal</CardTitle>
            <LineChart className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15%</div>
            <p className="text-xs text-muted">que la semana pasada</p>
          </CardContent>
        </Card>
        <Card className="kpi card-glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Racha Actual</CardTitle>
            <BarChart className="h-4 w-4 text-muted" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 días</div>
            <p className="text-xs text-muted">¡Sigue así!</p>
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
