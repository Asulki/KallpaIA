import { ChatWidget } from './chat-widget';
import { OpportunitiesWidget } from './opportunities-widget';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function WidgetPanel() {
  return (
    <aside className="hidden lg:flex flex-col gap-6 border-l border-white/10 p-6">
      <ChatWidget />
      
      <Card className="bg-card/35 border-white/10 backdrop-blur-lg">
        <CardContent className="p-4">
          <p className="text-sm font-semibold text-muted-foreground mb-2">Progreso de Colección</p>
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg text-white">2/5</span>
            <Progress value={40} className="flex-1 h-2 bg-muted/50 [&>div]:bg-stem-yellow"/>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Planetas desbloqueados</p>
        </CardContent>
      </Card>

      <OpportunitiesWidget />
    </aside>
  );
}
