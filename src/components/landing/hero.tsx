import { Button } from '@/components/ui/button';
import { StellarParticles } from '@/components/landing/stellar-particles';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
      <StellarParticles />
      <div className="absolute inset-0 z-0">
        <Image
          src="https://i.ibb.co/d0PvKQQ6/fondo-final.png"
          alt="Pixel art de Machu Picchu"
          layout="fill"
          objectFit="cover"
          className="opacity-100"
          data-ai-hint="pixel art machu picchu"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center">
        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Desbloquea tu Potencial con <br /> <span className="text-primary">KallpaIA</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-200" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
          Explora las fronteras de la ciencia y la tecnología a través de una aventura épica. Tu viaje hacia STEAM comienza ahora.
        </p>
        <div className="mt-10 flex gap-4">
          <Button size="lg" className="font-headline bg-primary text-primary-foreground text-lg rounded-full px-8 py-6 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all">
            Inicia tu Aventura
          </Button>
        </div>
      </div>
    </section>
  );
}
