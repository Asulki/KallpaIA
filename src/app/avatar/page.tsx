
"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState, cloneElement, ReactElement } from 'react';
import { cn } from '@/lib/utils';
import { StellarParticles } from '@/components/landing/stellar-particles';
import { Palette, Beaker, Wrench, Sigma, Cpu } from 'lucide-react';
import { VicunaIcon, CondorIcon, JaguarIcon, HummingbirdIcon, FoxIcon } from '@/components/avatar/animal-icons';
import './kallpa-cards.css';

const avatars = [
    {
    id: 1,
    name: 'Vicuña',
    mentor: 'Ada Lovelace',
    type: 'Matemática',
    theme: 'math',
    icon: <Sigma size={14} />,
    animalIcon: <VicunaIcon />
  },
  {
    id: 2,
    name: 'Cóndor',
    mentor: 'Marie Curie',
    type: 'Ciencia',
    theme: 'science',
    icon: <Beaker size={14} />,
    animalIcon: <CondorIcon />
  },
  {
    id: 3,
    name: 'Jaguar',
    mentor: 'Katherine Johnson',
    type: 'Ingeniería',
    theme: 'eng',
    icon: <Wrench size={14} />,
    animalIcon: <JaguarIcon />
  },
  {
    id: 4,
    name: 'Colibrí',
    mentor: 'Hipatia de Alejandría',
    type: 'Arte',
    theme: 'art',
    icon: <Palette size={14} />,
    animalIcon: <HummingbirdIcon />
  },
  {
    id: 5,
    name: 'Zorro',
    mentor: 'Hedy Lamarr',
    type: 'Tecnología',
    theme: 'tech',
    icon: <Cpu size={14} />,
    animalIcon: <FoxIcon />
  },
];

const themeClasses: { [key: string]: string } = {
  math: 'from-emerald-400 to-cyan-400 neon-shadow-math',
  science: 'from-violet-400 to-purple-500 neon-shadow-science',
  eng: 'from-amber-400 to-yellow-500 neon-shadow-eng',
  art: 'from-pink-400 to-rose-400 neon-shadow-art',
  tech: 'from-sky-400 to-blue-500 neon-shadow-tech',
};


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
        {cloneElement(avatar.animalIcon as ReactElement, { 
            className: cn(
              'w-full h-auto max-h-40',
              'gradient-text bg-gradient-to-br',
               themeClasses[avatar.theme]
            ),
             style: {
              filter: `drop-shadow(0 0 12px var(--${avatar.theme}-glow-color, currentColor))`
            }
        })}
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
                <p className="text-lg text-gray-300 mt-2">Selecciona tu avatar STEAM.</p>
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
                    className="font-headline text-lg rounded-full px-10 py-4 bg-primary text-primary-foreground"
                >
                    Continuar con mi Aventura
                </Button>
            </div>
        </div>
    </div>
  );
}
