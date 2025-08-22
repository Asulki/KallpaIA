import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const opportunities = [
    { title: 'Beca "Mujeres en Tech"', org: 'Fondo Futuro', type: 'Beca' },
    { title: 'Olimpiada de Robótica', org: 'STEM Global', type: 'Evento' },
    { title: 'Concurso de Astro-fotografía', org: 'Cosmos Foundation', type: 'Evento' },
]

export function OpportunitiesWidget() {
  return (
    <Card className="bg-glass border-white/10 backdrop-blur-lg flex-grow flex flex-col">
      <CardHeader className="p-4">
        <CardTitle className="text-base font-semibold text-text-main">Eventos y Becas</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        {opportunities.map(op => (
            <div key={op.title} className="p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors flex items-center justify-between gap-3">
                <div>
                    <p className="font-semibold text-sm text-text-main">{op.title}</p>
                    <p className="text-xs text-text-muted">{op.org}</p>
                </div>
                <Button size="sm" variant={op.type === 'Beca' ? 'secondary' : 'default'} className={`h-7 text-xs rounded-full ${op.type === 'Beca' ? 'bg-accent' : 'bg-stem-green'}`}>
                    {op.type}
                </Button>
            </div>
        ))}
      </CardContent>
    </Card>
  );
}
