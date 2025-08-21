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

const collaborations = [
  { src: "https://placehold.co/800x600.png", alt: "Logo de colaborador 1", hint: "company logo" },
  { src: "https://placehold.co/800x600.png", alt: "Logo de colaborador 2", hint: "organization logo" },
  { src: "https://placehold.co/800x600.png", alt: "Logo de colaborador 3", hint: "tech company logo" },
  { src: "https://placehold.co/800x600.png", alt: "Logo de colaborador 4", hint: "education logo" },
  { src: "https://placehold.co/800x600.png", alt: "Logo de colaborador 5", hint: "science foundation logo" },
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
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">Colaboraciones</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Estamos orgullosos de colaborar con organizaciones y empresas líderes que comparten nuestra visión de un futuro inclusivo en STEAM.
          </p>
        </div>
        <div className="mt-16">
          <Carousel setApi={setApi} className="w-full max-w-5xl mx-auto" opts={{ loop: true }}>
            <CarouselContent>
              {collaborations.map((collab, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-transparent border-0 shadow-none">
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                      <Image
                        src={collab.src}
                        alt={collab.alt}
                        width={800}
                        height={600}
                        data-ai-hint={collab.hint}
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
