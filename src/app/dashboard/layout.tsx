import { DashboardHeader } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';
import { WidgetPanel } from '@/components/dashboard/widget-panel';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground dashboard-theme font-body">
      <div className="grid md:grid-cols-[240px_1fr] lg:grid-cols-[240px_1fr_320px] min-h-screen">
        <Sidebar />
        <div className="flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
        <WidgetPanel />
      </div>
    </div>
  );
}
