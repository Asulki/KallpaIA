
"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { StellarParticles } from '@/components/landing/stellar-particles';
import { Palette, Beaker, Wrench, Sigma, Cpu } from 'lucide-react';
import './kallpa-cards.css';

const avatars = [
    {
    id: 1,
    name: 'Vicuña',
    mentor: 'Ada Lovelace',
    type: 'Matemática',
    theme: 'math',
    src: 'https://i.ibb.co/jZ6LNhR/vicuna-matematica.png',
    alt: 'Vicuña — avatar de Matemáticas',
    hint: 'mathematician vicuña inspired by Ada Lovelace pixel art',
    icon: <Sigma size={14} />
  },
  {
    id: 2,
    name: 'Cóndor',
    mentor: 'Marie Curie',
    type: 'Ciencia',
    theme: 'science',
    src: 'https://i.ibb.co/CbfcCvP/condor-ciencia.png', 
    alt: 'Cóndor — avatar de Ciencia',
    hint: 'knowledge condor inspired by Marie Curie pixel art',
    icon: <Beaker size={14} />
  },
  {
    id: 3,
    name: 'Jaguar',
    mentor: 'Katherine Johnson',
    type: 'Ingeniería',
    theme: 'eng',
    src: 'https://i.ibb.co/yQxG4Tj/jaguar-ingenieria.png',
    alt: 'Jaguar — avatar de Ingeniería',
    hint: 'engineer jaguar inspired by Katherine Johnson pixel art',
    icon: <Wrench size={14} />
  },
  {
    id: 4,
    name: 'Colibrí',
    mentor: 'Hipatia de Alejandría',
    type: 'Arte',
    theme: 'art',
    src: 'https://i.ibb.co/8mrL2Dk/colibri-arte.png',
    alt: 'Colibrí — avatar de Arte',
    hint: 'creative hummingbird inspired by Hypatia pixel art',
    icon: <Palette size={14} />
  },
  {
    id: 5,
    name: 'Zorro',
    mentor: 'Hedy Lamarr',
    type: 'Tecnología',
    theme: 'tech',
    src: 'https://i.ibb.co/f22my0B/zorro-tecnologia.png',
    alt: 'Zorro — avatar de Tecnología',
    hint: 'tech fox inspired by Hedy Lamarr pixel art',
    icon: <Cpu size={14} />
  },
];

const AvatarCard = ({ avatar, isSelected, onSelect }: { avatar: typeof avatars[0], isSelected: boolean, onSelect: (id: number) => void }) => {
  return (
    <article 
        className={cn('kcard', `kcard--${avatar.theme}`, { 'kcard--selected': isSelected })}
        onClick={() => onSelect(avatar.id)}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(avatar.id)}}
        aria-roledescription="carta coleccionable"
        aria-label={`Seleccionar a ${avatar.name}, mentora ${avatar.mentor}`}
    >
      <header className="kcard__header">
        <span className="kcard__chip">
            {avatar.icon}
            {avatar.type}
        </span>
      </header>

      <div className="kcard__art">
        <Image src={avatar.src} alt={avatar.alt} width={300} height={300} data-ai-hint={avatar.hint} />
      </div>

      <div className="kcard__title">
        <h3 className="kcard__name">{avatar.name}</h3>
        <p className="kcard__mentor">{avatar.mentor}</p>
      </div>
      
      <footer className="kcard__footer">
        <div className="flex justify-center items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="w-2 h-2 rounded-full bg-white/20"></span>
            <span className="w-2 h-2 rounded-full bg-white/20"></span>
            <span className="w-2 h-2 rounded-full bg-white/20"></span>
            <span className="w-2 h-2 rounded-full bg-white/20"></span>
        </div>
      </footer>
    </article>
  );
}


export default function AvatarSelectionPage() {
  const router = useRouter();
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);

  const handleSelectAvatar = (id: number) => {
    setSelectedAvatar(id);
  };

  const handleContinue = () => {
    if (selectedAvatar) {
        router.push('/quiz');
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black p-4 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
            <Image
            src="https://i.ibb.co/d0PvKQQ/fondo-final.png"
            alt="Pixel art de Machu Picchu como fondo"
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint="pixel art machu picchu background"
            priority
            />
        </div>
        <div className="absolute inset-0 z-10">
             <StellarParticles />
        </div>
        <div className="relative z-20 w-full flex flex-col items-center justify-center flex-grow">
            <div className="text-center mb-10 mt-20">
                <h1 className="font-headline text-4xl font-bold text-primary">Elige tu Kallpa Card</h1>
                <p className="text-lg text-gray-300 mt-2">Selecciona tu avatar STEAM. Haz scroll para ver más.</p>
            </div>

            <section className="kcards w-full max-w-screen-xl">
                <div className="flex gap-5 overflow-x-auto p-4 snap-x snap-mandatory">
                    {avatars.map((avatar) => (
                        <div key={avatar.id} className="snap-center shrink-0">
                            <AvatarCard
                                avatar={avatar}
                                isSelected={selectedAvatar === avatar.id}
                                onSelect={handleSelectAvatar}
                            />
                        </div>
                    ))}
                </div>
            </section>
            
            <div className="my-12">
                <Button
                    onClick={handleContinue}
                    disabled={!selectedAvatar}
                    size="lg"
                    className="font-headline text-lg rounded-full px-10 py-4"
                >
                    Continuar con mi Aventura
                </Button>
            </div>
        </div>
    </div>
  );
}
