import Link from 'next/link';
import { BotIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/50 backdrop-blur-lg border-b border-neutral-800">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BotIcon className="w-8 h-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-white">KallpaIA</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-lg">
          <Link href="#about" className="text-gray-300 hover:text-primary transition-colors">Nosotros</Link>
          <Link href="#ambassadors" className="text-gray-300 hover:text-primary transition-colors">Embajadores</Link>
          <Link href="#testimonials" className="text-gray-300 hover:text-primary transition-colors">Testimonios</Link>
          <Link href="#faq" className="text-gray-300 hover:text-primary transition-colors">FAQ</Link>
        </nav>
        <Button className="font-headline bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all rounded-full px-6 py-3">
          Comienza a Aprender
        </Button>
      </div>
    </header>
  );
}
