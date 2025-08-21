"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState, useRef, MouseEvent } from 'react';
import { cn } from '@/lib/utils';

const avatars = [
  { id: 1, src: 'https://placehold.co/150x150.png', alt: 'Avatar 1', hint: 'female character' },
  { id: 2, src: 'https://placehold.co/150x150.png', alt: 'Avatar 2', hint: 'female character pink hair' },
  { id: 3, src: 'https://placehold.co/150x150.png', alt: 'Avatar 3', hint: 'female character glasses' },
  { id: 4, src: 'https://placehold.co/150x150.png', alt: 'Avatar 4', hint: 'female character blue hair' },
];

const AvatarCard = ({ avatar, isSelected, onSelect }: { avatar: typeof avatars[0], isSelected: boolean, onSelect: (id: number) => void }) => {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const card = cardRef.current;
        if (!card) return;

        const { left, top, width, height } = card.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;

        const rotateX = -y / (height / 2) * 15;
        const rotateY = x / (width / 2) * 15;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (card) {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }
    };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(avatar.id)}
      className={cn(
        'relative rounded-2xl bg-white/10 p-4 transition-all duration-300 ease-out cursor-pointer',
        'transform-style: preserve-3d',
        isSelected ? 'ring-4 ring-primary ring-offset-4 ring-offset-[#F0F4F8]' : 'ring-2 ring-transparent'
      )}
      style={{
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
      }}
    >
      <Image
        src={avatar.src}
        alt={avatar.alt}
        width={150}
        height={150}
        data-ai-hint={avatar.hint}
        className="rounded-full aspect-square object-cover w-full h-auto"
        style={{ transform: 'translateZ(20px)'}}
      />
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F0F4F8] p-4">
      <Card className="w-full max-w-3xl p-6 md:p-8 bg-white/60 backdrop-blur-lg border-none shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">Elige tu Avatar</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-10 my-8 py-4">
            {avatars.map((avatar) => (
                <AvatarCard
                    key={avatar.id}
                    avatar={avatar}
                    isSelected={selectedAvatar === avatar.id}
                    onSelect={handleSelectAvatar}
                />
            ))}
          </div>
          <div className="flex justify-center">
            <Button
                onClick={handleContinue}
                disabled={!selectedAvatar}
                size="lg"
                className="font-headline text-lg rounded-full px-8 py-3"
            >
              Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
