import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScienceIcon, TechIcon, EngineeringIcon, MathIcon } from '@/components/landing/pixel-art-icons';

const stemTopics = [
  {
    icon: <ScienceIcon className="w-16 h-16 mx-auto mb-4 text-primary" />,
    title: 'Ciencia',
    description: 'Explora el universo, desde las partículas más pequeñas hasta las galaxias más grandes. Desvela los misterios de la vida y la materia.',
  },
  {
    icon: <TechIcon className="w-16 h-16 mx-auto mb-4 text-primary" />,
    title: 'Tecnología',
    description: 'Moldea el futuro con código. Construye aplicaciones innovadoras, diseña sistemas inteligentes e impulsa la revolución digital.',
  },
  {
    icon: <EngineeringIcon className="w-16 h-16 mx-auto mb-4 text-primary" />,
    title: 'Ingeniería',
    description: 'Diseña y crea soluciones a problemas del mundo real. Desde energía sostenible hasta robótica de próxima generación, construye un mundo mejor.',
  },
  {
    icon: <MathIcon className="w-16 h-16 mx-auto mb-4 text-primary" />,
    title: 'Matemáticas',
    description: 'Descubre el lenguaje del universo. Desbloquea patrones, resuelve problemas complejos y sienta las bases para todo en STEM.',
  },
];

export function About() {
  return (
    <section id="about" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">
            Nuestra Misión: Impulsando a los Futuros Innovadores
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            KallpaIA se dedica a hacer que la educación STEM sea accesible, atractiva e inspiradora para todos. Creemos que al proporcionar las herramientas adecuadas y fomentar una comunidad de curiosidad, podemos empoderar a la próxima generación de científicos, ingenieros y creadores para resolver los mayores desafíos del mundo.
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
