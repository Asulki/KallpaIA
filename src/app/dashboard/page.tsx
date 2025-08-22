import { PlanetCard } from '@/components/dashboard/planet-card';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <PlanetCard />
      {/* Aquí se pueden añadir más componentes como "Misiones Recientes" o "Progreso de Amigos" */}
    </div>
  );
}
