import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Book, CheckCircle, Flame, MessageSquare, Target } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="grid gap-8">
      {/* KPIs */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Retos Completados</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-green-500">+3 esta semana</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Racha de Días</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-green-500">+2 días</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Puntos Kallpa</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,240</div>
            <p className="text-xs text-muted-foreground">Meta: 1,500</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nivel Actual</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Explorer II</div>
            <p className="text-xs text-muted-foreground">88% para el siguiente nivel</p>
          </CardContent>
        </Card>
      </section>

      {/* Charts */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Progreso Semanal</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
             <div className="h-[250px] w-full flex items-center justify-center text-muted-foreground/50 border rounded-lg">
                [Placeholder para Gráfico de Barras]
              </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Radar de Habilidades</CardTitle>
            <CardDescription>
              Tus puntos fuertes en las áreas STEAM.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full flex items-center justify-center text-muted-foreground/50 border rounded-lg">
                [Placeholder para Gráfico de Radar]
            </div>
          </CardContent>
        </Card>
      </section>
      
      {/* Activity and Mentor */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-4">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Insignia "Cripto Novata"</p>
                  <p className="text-sm text-muted-foreground">Has completado el reto de criptografía básica.</p>
                </div>
            </div>
             <div className="flex items-center gap-4">
                <Rocket className="h-6 w-6 text-primary" />
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">Nuevo Reto: "Red Team Básico"</p>
                  <p className="text-sm text-muted-foreground">Disponible en la sección de retos.</p>
                </div>
            </div>
          </CardContent>
        </Card>

         <Card>
          <CardHeader>
            <CardTitle>Próximos Retos</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
             <div className="flex items-center justify-between">
                <p>SQL Injection 101</p>
                <span className="text-xs text-muted-foreground">Mañana</span>
             </div>
             <div className="flex items-center justify-between">
                <p>CTF Mini: Contraseñas</p>
                <span className="text-xs text-muted-foreground">Viernes</span>
             </div>
             <div className="flex items-center justify-between">
                <p>Quiz de Redes</p>
                <span className="text-xs text-muted-foreground">Lunes</span>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mensaje de tu Mentora</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" />
                <AvatarFallback>S</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                  <p className="text-sm font-medium">Sofía:</p>
                  <p className="text-sm text-muted-foreground">"¡Buen avance! Para el próximo hito, practica 15 min de OWASP Top 10."</p>
              </div>
            </div>
             <button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" /> Abrir Chat
             </button>
          </CardContent>
        </Card>
      </section>

      {/* Resources */}
       <section>
          <h3 className="text-xl font-bold mb-4">Recursos Recomendados</h3>
          <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                    <Book className="h-6 w-6 text-primary" />
                    <CardTitle className="text-base pt-2">¿Qué es un CTF?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Un artículo introductorio para empezar en el mundo de "Capture The Flag".</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                    <Rocket className="h-6 w-6 text-primary" />
                    <CardTitle className="text-base pt-2">Mini-Scanner de Puertos</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Un proyecto práctico en Python para entender los fundamentos de redes y seguridad.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                    <BarChart className="h-6 w-6 text-primary" />
                    <CardTitle className="text-base pt-2">Criptografía Básica</CardTitle>
                </CardHeader>
                 <CardContent>
                    <p className="text-sm text-muted-foreground">Un video de 5 minutos que explica los conceptos clave de la criptografía de forma sencilla.</p>
                </CardContent>
              </Card>
          </div>
       </section>

    </div>
  );
}
