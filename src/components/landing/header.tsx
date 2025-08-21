import Link from 'next/link';
import { BotIcon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/50 backdrop-blur-lg border-b border-neutral-800">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BotIcon className="w-8 h-8 text-primary" />
          <span className="font-headline text-2xl font-bold text-white">KallpaIA</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-lg">
          <Link href="/#about" className="text-gray-300 hover:text-primary transition-colors">Nosotros</Link>
          <Link href="/#testimonials" className="text-gray-300 hover:text-primary transition-colors">Testimonios</Link>
          <Link href="/#faq" className="text-gray-300 hover:text-primary transition-colors">FAQ</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button asChild size="lg" className="hidden md:flex font-headline bg-primary text-primary-foreground text-lg rounded-full px-8 py-3 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all">
            <Link href="/register">Inicia tu Aventura</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden bg-transparent border-primary text-primary">
                <Menu />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-neutral-900 border-neutral-800">
              <nav className="flex flex-col gap-6 text-lg mt-10">
                <Link href="/#about" className="text-gray-300 hover:text-primary transition-colors">Nosotros</Link>
                <Link href="/#testimonials" className="text-gray-300 hover:text-primary transition-colors">Testimonios</Link>
                <Link href="/#faq" className="text-gray-300 hover:text-primary transition-colors">FAQ</Link>
                 <Button asChild size="lg" className="font-headline bg-primary text-primary-foreground text-lg rounded-full px-8 py-3 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all mt-4">
                    <Link href="/register">Inicia tu Aventura</Link>
                  </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
