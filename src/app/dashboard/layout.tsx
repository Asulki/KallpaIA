import { DashboardHeader } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative z-10 min-h-screen w-full bg-transparent text-foreground dashboard-theme font-body">
      <div className="grid md:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
