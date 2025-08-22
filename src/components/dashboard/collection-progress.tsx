import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lock } from "lucide-react";

const planets = [
    { name: 'Ciencia', color: 'bg-science-planet', unlocked: true },
    { name: 'Tecnología', color: 'bg-tech-planet', unlocked: true },
    { name: 'Ingeniería', color: 'bg-engineering-planet', unlocked: false },
    { name: 'Arte', color: 'bg-art-planet', unlocked: false },
    { name: 'Matemáticas', color: 'bg-math-planet', unlocked: false },
];

export function CollectionProgress() {
    const unlockedCount = planets.filter(p => p.unlocked).length;
    const totalCount = planets.length;
    const progressPercentage = (unlockedCount / totalCount) * 100;

    return (
        <Card className="bg-glass border-white/10 backdrop-blur-lg">
            <CardHeader className="p-4">
                <CardTitle className="text-base font-semibold text-text-main">Progreso de Colección</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-text-muted">Planetas Desbloqueados</p>
                    <p className="font-bold text-text-main">{unlockedCount}/{totalCount}</p>
                </div>
                <Progress value={progressPercentage} className="h-2 bg-muted/50 [&>div]:bg-logic-yellow" />
                <div className="flex justify-between mt-3">
                    {planets.map(planet => (
                        <div key={planet.name} className="relative">
                            <div className={`w-8 h-8 rounded-full ${planet.unlocked ? planet.color : 'bg-muted/50' } flex items-center justify-center`}>
                                {!planet.unlocked && <Lock className="w-4 h-4 text-text-muted" />}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
