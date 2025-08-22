import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Flame, Palette, PenTool } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className='text-center sm:text-left'>
          <h1 className="text-4xl font-bold text-foreground">Hello Ruha</h1>
          <p className="text-muted-foreground">Good day to learn</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Input placeholder="Search" className="w-full pl-10 bg-white/70 rounded-full" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      <div className="flex flex-wrap justify-center sm:justify-start gap-4">
        <Button variant="outline" className="rounded-full bg-white/70 border-none"><Flame className="mr-2" /> Multimedia</Button>
        <Button variant="outline" className="rounded-full bg-white/70 border-none"><Palette className="mr-2" /> Graphic Design</Button>
        <Button variant="default" className="rounded-full shadow-lg"><PenTool className="mr-2" /> Content Creator</Button>
      </div>
    </header>
  );
}
