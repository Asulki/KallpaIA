import { CollectionProgress } from '@/components/dashboard/collection-progress';
import { OpportunitiesWidget } from '@/components/dashboard/opportunities-widget';
import { PlanetCard } from '@/components/dashboard/planet-card';
import { QuickAccess } from '@/components/dashboard/quick-access';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <PlanetCard />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <CollectionProgress />
        <OpportunitiesWidget />
        <QuickAccess />
      </div>
    </div>
  );
}
