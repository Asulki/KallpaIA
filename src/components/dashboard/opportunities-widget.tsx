import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const opportunities = [
    { title: 'Beca "Mujeres en Tech"', org: 'Fondo Futuro', type: 'Beca' },
    { title: 'Olimpiada de Robótica', org: 'STEM Global', type: 'Evento' },
]

export function OpportunitiesWidget() {
  return (
    <Card className="bg-card/60 border-white/10">
      <CardHeader className="p-4">
        <CardTitle className="text-base font-semibold text-white">Eventos y Becas</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        {opportunities.map(op => (
            <div key={op.title} className="p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-colors flex items-center justify-between gap-3">
                <div>
                    <p className="font-semibold text-sm text-white">{op.title}</p>
                    <p className="text-xs text-muted-foreground">{op.org}</p>
                </div>
                <Button size="sm" variant="secondary" className="h-7 text-xs rounded-full bg-secondary/70">{op.type}</Button>
            </div>
        ))}
      </CardContent>
    </Card>
  );
}
