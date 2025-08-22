import { PlanetCard } from '@/components/dashboard/planet-card';
import { OpportunitiesWidget } from '@/components/dashboard/opportunities-widget';
import { QuickAccess } from '@/components/dashboard/quick-access';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <PlanetCard />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OpportunitiesWidget />
        <QuickAccess />
      </div>
    </div>
  );
}
