"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

const avatars = [
  { id: 1, src: 'https://placehold.co/150x150.png', alt: 'Avatar 1', hint: 'female character' },
  { id: 2, src: 'https://placehold.co/150x150.png', alt: 'Avatar 2', hint: 'female character pink hair' },
  { id: 3, src: 'https://placehold.co/150x150.png', alt: 'Avatar 3', hint: 'female character glasses' },
  { id: 4, src: 'https://placehold.co/150x150.png', alt: 'Avatar 4', hint: 'female character blue hair' },
];

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
      <Card className="w-full max-w-3xl p-6 md:p-8 bg-white/80 backdrop-blur-lg border-none shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">Elige tu Avatar</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 my-8">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                className={`p-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedAvatar === avatar.id ? 'bg-primary ring-4 ring-primary/50' : 'bg-transparent'
                }`}
                onClick={() => handleSelectAvatar(avatar.id)}
              >
                <Image
                  src={avatar.src}
                  alt={avatar.alt}
                  width={150}
                  height={150}
                  data-ai-hint={avatar.hint}
                  className="rounded-full aspect-square object-cover"
                />
              </div>
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
