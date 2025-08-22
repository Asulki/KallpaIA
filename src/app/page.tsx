import { Header } from '@/components/landing/header';
import { Hero } from '@/components/landing/hero';
import { About } from '@/components/landing/about';
import { PlanetCarousel } from '@/components/landing/planet-carousel';
import { Testimonials } from '@/components/landing/testimonials';
import { Faq } from '@/components/landing/faq';
import { Footer } from '@/components/landing/footer';
import { SpaceBackground } from '@/components/space-background';

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
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
