"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    quote: "KallpaIA completely changed how I see coding. The pixel art stories made complex topics so much easier to grasp. It feels like playing a game, not studying!",
    name: 'Jasmine K.',
    title: 'High School Student',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'student portrait',
  },
  {
    quote: "As an educator, I'm always looking for engaging resources. KallpaIA is a goldmine. My students are more motivated than ever, and their understanding of STEM concepts has skyrocketed.",
    name: 'David L.',
    title: 'Physics Teacher',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'teacher portrait',
  },
  {
    quote: "I'm a self-taught developer, and I wish I had this when I started. The platform fills in the gaps that many tutorials miss, all while being incredibly fun.",
    name: 'Maria S.',
    title: 'Software Engineer',
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
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">Voices of Our Community</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            See what our learners, educators, and creators are saying about their journey with KallpaIA.
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
