import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: '¿Qué es KallpaIA?',
    answer: 'KallpaIA es una innovadora plataforma en línea dedicada a hacer que la educación en Ciencia, Tecnología, Ingeniería, Arte y Matemáticas (STEAM) sea emocionante y accesible para todas, especialmente para las mujeres jóvenes. Usamos lecciones interactivas y desafíos gamificados para fomentar el amor por el descubrimiento.',
  },
  {
    question: '¿Para quién es KallpaIA?',
    answer: '¡Nuestra plataforma está diseñada para cualquier persona con una mente curiosa! Nuestro objetivo es inspirar a la próxima generación de mujeres líderes en STEAM, desde la secundaria hasta los primeros años de universidad, y también para educadores y padres que buscan recursos innovadores.',
  },
  {
    question: '¿Qué tipo de temas cubren?',
    answer: 'Cubrimos una amplia gama de campos STEAM, incluyendo ciencias de la computación, física, biología, química, principios de ingeniería, arte digital y matemáticas avanzadas. Nuestro plan de estudios se expande constantemente para incluir los últimos avances y tecnologías.',
  },
  {
    question: '¿Tiene algún costo usar KallpaIA?',
    answer: 'Ofrecemos una mezcla de contenido gratuito y premium. Muchos de nuestros cursos introductorios están disponibles de forma gratuita para asegurar que todas tengan la oportunidad de comenzar su viaje en STEAM. Nuestra suscripción premium desbloquea cursos avanzados y rutas de aprendizaje personalizadas.',
  },
  {
    question: '¿Cómo hace KallpaIA que el aprendizaje sea divertido?',
    answer: '¡Creemos que aprender debe ser una aventura! Integramos la narración con un hermoso pixel art, simulaciones interactivas con las que puedes jugar y un sistema de puntos que recompensa tu progreso. Es menos como un libro de texto y más como un videojuego para tu cerebro.',
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">Preguntas Frecuentes</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            ¿Tienes preguntas? Tenemos respuestas. Aquí están algunas de las consultas más comunes que recibimos.
          </p>
        </div>
        <div className="mt-16 max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white/5 border-white/10 rounded-2xl mb-4 px-6">
                <AccordionTrigger className="font-headline text-lg text-left hover:no-underline text-gray-100">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
