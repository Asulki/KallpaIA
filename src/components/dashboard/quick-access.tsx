import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Gamepad2, Users } from "lucide-react";

export function QuickAccess() {
    return (
        <Card className="bg-glass border-white/10 backdrop-blur-lg">
            <CardHeader className="p-4">
                <CardTitle className="text-base font-semibold text-text-main">Accesos Rápidos</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-24 flex-col gap-2 bg-glass border-primary/30 hover:bg-primary/20">
                    <Gamepad2 className="h-6 w-6 text-primary"/>
                    <span className="text-text-main">Minijuegos</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2 bg-glass border-primary/30 hover:bg-primary/20">
                    <Users className="h-6 w-6 text-primary"/>
                    <span className="text-text-main">Mentoría</span>
                </Button>
            </CardContent>
        </Card>
    )
}
