"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    quote: "KallpaIA cambió por completo mi forma de ver la programación. Las historias hicieron que los temas complejos fueran mucho más fáciles de entender. ¡Como mujer en tecnología, me sentí vista e inspirada!",
    name: 'Jasmine K.',
    title: 'Estudiante de Secundaria',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'student portrait',
  },
  {
    quote: "Como educadora, siempre busco recursos que empoderen a mis estudiantes. KallpaIA es una mina de oro para inspirar a las jóvenes a seguir carreras en STEAM. ¡Mis alumnas están más motivadas que nunca!",
    name: 'David L.',
    title: 'Profesora de Física',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'teacher portrait',
  },
  {
    quote: "Soy una desarrolladora autodidacta y ojalá hubiera tenido esto cuando empecé. La plataforma no solo enseña, sino que construye una comunidad donde las mujeres en STEAM podemos prosperar juntas.",
    name: 'Maria S.',
    title: 'Ingeniera de Software',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'developer portrait',
  },
];

export function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="testimonials" className="py-20 sm:py-32 bg-white/5" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">Voces de Nuestra Comunidad</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Descubre lo que nuestras aprendices, educadoras y creadoras dicen sobre su viaje con KallpaIA.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className={`bg-white/5 border-white/10 rounded-2xl p-6 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-0">
                <p className="text-gray-300 text-lg">"{testimonial.quote}"</p>
                <div className="mt-6 flex items-center gap-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    data-ai-hint={testimonial.aiHint}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-primary">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
