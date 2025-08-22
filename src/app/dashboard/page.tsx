import { DashboardHeader } from '@/components/dashboard/header';
import { Courses } from '@/components/dashboard/courses';
import { Statistics } from '@/components/dashboard/statistics';

export default function Dashboard() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-grow">
        <DashboardHeader />
        <Courses />
      </div>
      <div className="w-full lg:w-[350px] flex-shrink-0">
        <Statistics />
      </div>
    </div>
  );
}
