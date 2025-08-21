"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { StellarParticles } from '@/components/landing/stellar-particles';
import './avatar-cards.css';

const avatars = [
    {
    id: 1,
    name: 'Vicuña',
    mentor: 'Ada Lovelace',
    type: 'Matemática',
    theme: 'math',
    icon: '∑',
    src: 'https://i.ibb.co/jZ6LNhR/vicuna-matematica.png',
    alt: 'Vicuña — avatar de Matemáticas',
    hint: 'mathematician vicuña inspired by Ada Lovelace pixel art',
    moves: [
      { name: 'Tejido Lógico', value: 40 },
      { name: 'Secuencia Infinita', value: 30 },
    ],
  },
  {
    id: 2,
    name: 'Cóndor',
    mentor: 'Marie Curie',
    type: 'Ciencia',
    theme: 'science',
    icon: '🔭',
    src: 'https://i.ibb.co/V3F7499/vicuna-bot.png', // Placeholder
    alt: 'Cóndor — avatar de Ciencia',
    hint: 'knowledge condor inspired by Marie Curie pixel art',
    moves: [
      { name: 'Alas de la Curie', value: 40 },
      { name: 'Rayo Gamma', value: 25 },
    ],
  },
  {
    id: 3,
    name: 'Jaguar',
    mentor: 'Katherine Johnson',
    type: 'Ingeniería',
    theme: 'eng',
    icon: '🔧',
    src: 'https://i.ibb.co/V3F7499/vicuna-bot.png', // Placeholder
    alt: 'Jaguar — avatar de Ingeniería',
    hint: 'engineer jaguar inspired by Katherine Johnson pixel art',
    moves: [
      { name: 'Circuito Salvaje', value: 50 },
      { name: 'Cálculo Estelar', value: 30 },
    ],
  },
  {
    id: 4,
    name: 'Colibrí',
    mentor: 'Hipatia de Alejandría',
    type: 'Arte',
    theme: 'art',
    icon: '🎨',
    src: 'https://i.ibb.co/V3F7499/vicuna-bot.png', // Placeholder
    alt: 'Colibrí — avatar de Arte',
    hint: 'creative hummingbird inspired by Hypatia pixel art',
    moves: [
      { name: 'Vuelo Inspirador', value: 40 },
      { name: 'Paleta Cósmica', value: 25 },
    ],
  },
  {
    id: 5,
    name: 'Zorro',
    mentor: 'Hedy Lamarr',
    type: 'Tecnología',
    theme: 'tech',
    icon: '💻',
    src: 'https://i.ibb.co/V3F7499/vicuna-bot.png', // Placeholder
    alt: 'Zorro — avatar de Tecnología',
    hint: 'tech fox inspired by Hedy Lamarr pixel art',
    moves: [
        { name: 'Hackeo Ágil', value: 45 },
        { name: 'Señal Secreta', value: 35 },
    ],
  },
];

const AvatarCard = ({ avatar, isSelected, onSelect }: { avatar: typeof avatars[0], isSelected: boolean, onSelect: (id: number) => void }) => {
  return (
    <article 
        className={cn('kcard', `kcard--${avatar.theme}`, { 'kcard--selected': isSelected })}
        onClick={() => onSelect(avatar.id)}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(avatar.id)}}
    >
      <header className="kcard__header">
        <span className="kcard__chip" aria-label={`Planeta ${avatar.type}`}>{avatar.icon} {avatar.type}</span>
        <span className="kcard__hp" aria-label="Energía">100/100 <b>HP</b></span>
      </header>

      <div className="kcard__art">
        <Image src={avatar.src} alt={avatar.alt} width={300} height={400} data-ai-hint={avatar.hint} />
      </div>

      <div className="kcard__title">
        <div className="kcard__name">{avatar.name}</div>
        <div className="kcard__mentor">{avatar.mentor}</div>
      </div>
      
      <footer className="kcard__footer">
        <div className="kcard__moves">
          {avatar.moves.map(move => (
            <span key={move.name}>{move.name} ({move.value})</span>
          ))}
        </div>
        <div className="kcard__actions" aria-hidden="true">
          <button title="Pasar" className="kcard__btn">⟵</button>
          <button title="Elegir" className="kcard__btn kcard__btn--primary">⟶</button>
          <button title="Info" className="kcard__btn">⤴</button>
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
            src="https://i.ibb.co/hFLg8BJ/avatarkar.png"
            alt="Pixel art de una diosa de la sabiduría en una biblioteca"
            fill
            style={{ objectFit: 'cover' }}
            data-ai-hint="pixel art goddess library"
            priority
            />
        </div>
        <div className="absolute inset-0 z-10">
             <StellarParticles />
        </div>
        <div className="relative z-20 text-center mb-10 mt-20">
            <h1 className="font-headline text-4xl font-bold text-primary">Elige tu Kallpa Card</h1>
            <p className="text-lg text-gray-300 mt-2">Selecciona tu avatar STEAM.</p>
        </div>

        <section className="kcards w-full max-w-screen-2xl">
            {avatars.map((avatar) => (
                <AvatarCard
                    key={avatar.id}
                    avatar={avatar}
                    isSelected={selectedAvatar === avatar.id}
                    onSelect={handleSelectAvatar}
                />
            ))}
        </section>
        
        <div className="relative z-20 my-12">
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
  );
}
