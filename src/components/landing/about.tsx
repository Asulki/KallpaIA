import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScienceIcon, TechIcon, EngineeringIcon, MathIcon } from '@/components/landing/pixel-art-icons';

const stemTopics = [
  {
    icon: <ScienceIcon className="w-16 h-16 mx-auto mb-4 text-primary" />,
    title: 'Science',
    description: 'Explore the universe, from the smallest particles to the largest galaxies. Unravel the mysteries of life and matter.',
  },
  {
    icon: <TechIcon className="w-16 h-16 mx-auto mb-4 text-primary" />,
    title: 'Technology',
    description: 'Shape the future with code. Build innovative apps, design intelligent systems, and power the digital revolution.',
  },
  {
    icon: <EngineeringIcon className="w-16 h-16 mx-auto mb-4 text-primary" />,
    title: 'Engineering',
    description: 'Design and create solutions to real-world problems. From sustainable energy to next-gen robotics, build a better world.',
  },
  {
    icon: <MathIcon className="w-16 h-16 mx-auto mb-4 text-primary" />,
    title: 'Mathematics',
    description: 'Discover the language of the universe. Unlock patterns, solve complex problems, and lay the foundation for all of STEM.',
  },
];

export function About() {
  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
            Our Mission: Powering Future Innovators
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            KallpaIA is dedicated to making STEM education accessible, engaging, and inspiring for everyone. We believe that by providing the right tools and fostering a community of curiosity, we can empower the next generation of scientists, engineers, and creators to solve the world's greatest challenges.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stemTopics.map((topic) => (
            <Card key={topic.title} className="bg-white/5 border-white/10 rounded-2xl text-center transition-all duration-300 hover:bg-white/10 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-2">
              <CardHeader>
                {topic.icon}
                <CardTitle className="font-headline text-2xl text-primary">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
