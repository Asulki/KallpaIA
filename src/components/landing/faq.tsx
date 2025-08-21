import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What is KallpaIA?',
    answer: 'KallpaIA is an innovative online platform dedicated to making Science, Technology, Engineering, and Mathematics (STEM) education exciting and accessible for learners of all ages. We use interactive lessons, pixel art storytelling, and gamified challenges to foster a love for discovery.',
  },
  {
    question: 'Who is KallpaIA for?',
    answer: 'Our platform is designed for anyone with a curious mind! While we focus on students from middle school to early college, our content is valuable for lifelong learners, educators looking for classroom resources, and parents wanting to supplement their children\'s education.',
  },
  {
    question: 'What kind of topics do you cover?',
    answer: 'We cover a wide range of STEM fields, including computer science, physics, biology, chemistry, engineering principles, and advanced mathematics. Our curriculum is constantly expanding to include the latest breakthroughs and technologies.',
  },
  {
    question: 'Is there a cost to use KallpaIA?',
    answer: 'We offer a mix of free and premium content. Many of our introductory courses and resources are available for free to ensure everyone has a chance to start their STEM journey. Our premium subscription unlocks advanced courses, personalized learning paths, and one-on-one mentorship opportunities.',
  },
  {
    question: 'How does KallpaIA make learning fun?',
    answer: 'We believe learning should be an adventure! We integrate storytelling with beautiful pixel art, interactive simulations you can play with, and a points system that rewards your progress. It’s less like a textbook and more like a video game for your brain.',
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-headline text-4xl font-bold text-primary sm:text-5xl">Frequently Asked Questions</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Have questions? We have answers. Here are some of the most common inquiries we receive.
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
