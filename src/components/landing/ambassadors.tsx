import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ambassadors = [
  {
    name: 'Ada Lovelace',
    title: 'The First Programmer',
    bio: 'A visionary mathematician who saw the potential of computers beyond mere calculation.',
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'pixel art ada lovelace',
  },
  {
    name: 'Albert Einstein',
    title: 'The Theorist of Relativity',
    bio: 'Revolutionized our understanding of space, time, gravity, and the universe.',
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'pixel art albert einstein',
  },
  {
    name: 'Marie Curie',
    title: 'The Pioneer of Radioactivity',
    bio: 'The first woman to win a Nobel Prize, and the only person to win in two different scientific fields.',
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'pixel art marie curie',
  },
  {
    name: 'Nikola Tesla',
    title: 'The Master of Alternating Current',
    bio: 'An inventor whose work in electricity laid the groundwork for modern power systems.',
    imageUrl: 'https://placehold.co/400x400.png',
    aiHint: 'pixel art nikola tesla',
  },
];

export function Ambassadors() {
  return (
    <section id="ambassadors" className="py-20 sm:py-32 bg-white/5">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">Our Timeless Ambassadors</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            We stand on the shoulders of giants. These historical pioneers of STEM embody the spirit of innovation and curiosity that we strive to instill in our community.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ambassadors.map((ambassador) => (
            <Card key={ambassador.name} className="group relative overflow-hidden bg-neutral-900 border-neutral-800 rounded-2xl">
              <CardHeader className="p-0">
                <Image
                  src={ambassador.imageUrl}
                  alt={ambassador.name}
                  width={400}
                  height={400}
                  data-ai-hint={ambassador.aiHint}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </CardHeader>
              <CardContent className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-2">
                  <CardTitle className="font-headline text-2xl text-primary">{ambassador.name}</CardTitle>
                  <p className="text-sm font-medium text-yellow-200">{ambassador.title}</p>
                  <p className="mt-2 text-gray-300 opacity-0 transition-opacity duration-500 group-hover:opacity-100 h-0 group-hover:h-auto">{ambassador.bio}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
