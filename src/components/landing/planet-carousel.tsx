"use client";

import * as React from "react";
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const planetArt = [
  { src: "https://placehold.co/800x600.png", alt: "Pixel art de un planeta de lava ardiente", hint: "pixel art lava planet" },
  { src: "https://placehold.co/800x600.png", alt: "Pixel art de un exuberante planeta selvático", hint: "pixel art jungle planet" },
  { src: "https://placehold.co/800x600.png", alt: "Pixel art de un planeta de hielo cristalino", hint: "pixel art ice planet" },
  { src: "https://placehold.co/800x600.png", alt: "Pixel art de un planeta ciudad futurista", hint: "pixel art city planet" },
  { src: "https://placehold.co/800x600.png", alt: "Pixel art de un gigante gaseoso arremolinado", hint: "pixel art gas giant" },
];

export function PlanetCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="carousel" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">Mundos Asombrosos</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Viaja a través de nuestra galería de planetas en pixel art, cada uno un escenario potencial para tu próximo gran descubrimiento.
          </p>
        </div>
        <div className="mt-16">
          <Carousel setApi={setApi} className="w-full max-w-5xl mx-auto" opts={{ loop: true }}>
            <CarouselContent>
              {planetArt.map((planet, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-transparent border-0 shadow-none">
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                      <Image
                        src={planet.src}
                        alt={planet.alt}
                        width={800}
                        height={600}
                        data-ai-hint={planet.hint}
                        className="rounded-2xl border-2 border-white/10"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-primary border-primary hover:bg-primary hover:text-primary-foreground" />
            <CarouselNext className="text-primary border-primary hover:bg-primary hover:text-primary-foreground" />
          </Carousel>
          <div className="py-4 text-center text-sm text-muted-foreground flex justify-center gap-2 mt-4">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  current === index ? 'bg-primary scale-125' : 'bg-gray-600'
                }`}
                aria-label={`Ir a la diapositiva ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
