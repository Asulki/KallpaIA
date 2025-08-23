"use client";

import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { About } from '@/components/landing/about';
import { PlanetCarousel } from '@/components/landing/planet-carousel';
import { Testimonials } from '@/components/landing/testimonials';
import { Faq } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';
import dynamic from 'next/dynamic';
import { ApiTester } from '@/components/landing/ApiTester';

const SpaceBackground = dynamic(
  () => import('@/components/space-background').then(mod => mod.SpaceBackground),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SpaceBackground />
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <PlanetCarousel />
        <Testimonials />
        <ApiTester />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
