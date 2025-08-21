"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useRef, MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Bot, Telescope, Wrench, Palette, Sigma, Heart, Droplet, Star } from 'lucide-react';
import { StellarParticles } from '@/components/landing/stellar-particles';


const avatars = [
    {
    id: 1,
    name: 'Vicuña Matemática',
    mentor: 'Ada Lovelace',
    type: 'Matemática',
    icon: <Sigma className="w-4 h-4" />,
    color: 'text-[#BFF3D1]',
    bgColor: 'bg-green-900/50',
    borderColor: 'border-[#BFF3D1]',
    src: 'https://i.ibb.co/V3F7499/vicuna-bot.png',
    alt: 'Vicuña Matemática, avatar de Matemática',
    hint: 'mathematician vicuña inspired by Ada Lovelace pixel art',
    moves: [
      { name: 'Algoritmo Infinito', type: 'Lógica', value: 40 },
      { name: 'Cálculo Musical', type: 'Creatividad', value: 30 },
    ],
  },
  {
    id: 2,
    name: 'Cóndor del Conocimiento',
    mentor: 'Marie Curie',
    type: 'Ciencia',
    icon: <Telescope className="w-4 h-4" />,
    color: 'text-[#B9A6FF]',
    bgColor: 'bg-purple-900/50',
    borderColor: 'border-[#B9A6FF]',
    src: 'https://i.ibb.co/V3F7499/vicuna-bot.png',
    alt: 'Cóndor del Conocimiento, avatar de Ciencia',
    hint: 'knowledge condor inspired by Marie Curie pixel art',
    moves: [
      { name: 'Rayos del Saber', type: 'Investigación', value: 50 },
      { name: 'Laboratorio Seguro', type: 'Defensa', value: 25 },
    ],
  },
  {
    id: 3,
    name: 'Jaguar Ingeniero',
    mentor: 'Katherine Johnson',
    type: 'Ingeniería',
    icon: <Wrench className="w-4 h-4" />,
    color: 'text-[#FFE08C]',
    bgColor: 'bg-yellow-900/50',
    borderColor: 'border-[#FFE08C]',
    src: 'https://i.ibb.co/V3F7499/vicuna-bot.png',
    alt: 'Jaguar Ingeniero, avatar de Ingeniería',
    hint: 'engineer jaguar inspired by Katherine Johnson pixel art',
    moves: [
      { name: 'Puente del Futuro', type: 'Construcción', value: 45 },
      { name: 'Cálculo Espacial', type: 'Precisión', value: 35 },
    ],
  },
  {
    id: 4,
    name: 'Colibrí Creativo',
    mentor: 'Hipatia de Alejandría',
    type: 'Arte',
    icon: <Palette className="w-4 h-4" />,
    color: 'text-[#FFB3C6]',
    bgColor: 'bg-pink-900/50',
    borderColor: 'border-[#FFB3C6]',
    src: 'https://i.ibb.co/V3F7499/vicuna-bot.png',
    alt: 'Colibrí Creativo, avatar de Arte',
    hint: 'creative hummingbird inspired by Hypatia pixel art',
    moves: [
      { name: 'Inspiración Ancestral', type: 'Arte', value: 30 },
      { name: 'Vuelo Lógico', type: 'Estrategia', value: 40 },
    ],
  },
  {
    id: 5,
    name: 'Astrónoma Inti-Bot',
    mentor: 'Caroline Herschel',
    type: 'Tecnología',
    icon: <Bot className="w-4 h-4" />,
    color: 'text-[#AEE6FF]',
    bgColor: 'bg-sky-900/50',
    borderColor: 'border-[#AEE6FF]',
    src: 'https://i.ibb.co/V3F7499/vicuna-bot.png',
    alt: 'Astrónoma Inti-Bot, avatar de Tecnología',
    hint: 'astronomer robot inspired by Caroline Herschel pixel art',
    moves: [
      { name: 'Mapa de Estrellas', type: 'Observación', value: 35 },
      { name: 'Órbita Segura', type: 'Colaboración', value: 30 },
    ],
  },
];

const AvatarCard = ({ avatar, isSelected, onSelect }: { avatar: typeof avatars[0], isSelected: boolean, onSelect: (id: number) => void }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;

        const { left, top, width, height } = card.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        
        const mouseX = x / width;
        const mouseY = y / height;

        const rotateX = (mouseY - 0.5) * -35;
        const rotateY = (mouseX - 0.5) * 35;
        
        const bgX = mouseX * 100;
        const bgY = mouseY * 100;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        const holo = card.querySelector('.holo-effect') as HTMLDivElement;
        if (holo) {
            holo.style.backgroundPosition = `${bgX}% ${bgY}%`;
            holo.style.opacity = '0.3';
        }
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (card) {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            const holo = card.querySelector('.holo-effect') as HTMLDivElement;
            if (holo) {
                holo.style.backgroundPosition = `50% 50%`;
                holo.style.opacity = '0.2';
            }
        }
    };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(avatar.id)}
      className={cn(
        'relative rounded-3xl p-1 transition-all duration-300 ease-out cursor-pointer w-full aspect-[3/4.5] max-w-[300px]',
        'transform-style-preserve-3d',
        isSelected ? 'ring-4 ring-[#F5D57D] ring-offset-4 ring-offset-background' : 'ring-2 ring-transparent',
        'bg-gradient-to-br from-yellow-300 via-[#F5D57D] to-amber-600'
      )}
    >
        <div className="relative w-full h-full bg-background rounded-[22px] p-4 flex flex-col justify-between overflow-hidden border border-white/20">
            <div 
                className="holo-effect absolute inset-0 opacity-20 transition-opacity duration-300" 
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)',
                    backgroundSize: '200% 200%',
                    mixBlendMode: 'screen',
                }}
            ></div>
            <div className="relative z-10">
                <div className="flex justify-between items-center mb-2">
                    <Badge variant="secondary" className="text-xs font-bold">⭐ Rookie</Badge>
                     <Badge variant="secondary" className="text-xs font-bold">70/100 HP</Badge>
                </div>
                <div className="flex justify-between items-center">
                    <Badge variant="outline" className={cn("border-2 font-bold", avatar.borderColor, avatar.color, avatar.bgColor)}>
                        {avatar.icon}
                        <span className="ml-1.5">{avatar.type}</span>
                    </Badge>
                </div>
            </div>
            <div className="relative z-10 flex-grow flex items-center justify-center my-2">
                 <Image
                    src={avatar.src}
                    alt={avatar.alt}
                    width={220}
                    height={220}
                    data-ai-hint={avatar.hint}
                    className="object-contain w-full h-auto max-h-[240px] drop-shadow-[0_8px_15px_rgba(0,0,0,0.5)]"
                    style={{ transform: 'translateZ(40px)'}}
                />
            </div>
            <div className="relative z-10 text-center">
                 <h3 className="font-headline text-2xl font-bold text-white" style={{ transform: 'translateZ(20px)'}}>{avatar.name}</h3>
                 <p className="text-sm text-gray-400 -mt-1" style={{ transform: 'translateZ(20px)'}}>{avatar.mentor}</p>
            </div>
            <div className="relative z-10 mt-4 space-y-2 text-sm">
                {avatar.moves.map(move => (
                    <div key={move.name} className="bg-black/40 p-2 rounded-md text-white flex justify-between items-center text-xs">
                        <span className="font-semibold">{move.name}</span>
                        <span className={cn('font-bold px-2 py-0.5 rounded-full', avatar.bgColor)}>{move.type} {move.value}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
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
            src="https://i.ibb.co/hFLg8BJk/avatarkar.png"
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
        <div className="relative z-20 text-center mb-10">
            <h1 className="font-headline text-4xl font-bold text-primary">Elige tu Kallpa Card</h1>
            <p className="text-lg text-gray-300 mt-2">Selecciona tu avatar STEAM.</p>
        </div>

        <div className="relative z-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 place-items-center w-full max-w-7xl">
        {avatars.map((avatar) => (
            <AvatarCard
                key={avatar.id}
                avatar={avatar}
                isSelected={selectedAvatar === avatar.id}
                onSelect={handleSelectAvatar}
            />
        ))}
        </div>
        
        <div className="relative z-20 mt-12">
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

    